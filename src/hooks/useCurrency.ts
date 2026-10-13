import { useState, useMemo, useCallback, useContext } from 'react';
import { Currency, GeoDetectionInfo } from '../types/calculator';
import { Language } from '../types';
import {
  formatCurrency,
  getCurrencyConfig,
  CurrencyMetadata,
  SUPPORTED_CURRENCIES,
  detectLocalLocationAndCurrency,
  isUserInTunisia,
  getInitialCurrency,
  mapCountryCodeToCurrency
} from '../utils/geoCurrency';
import {
  getAmountInCurrency as calcAmountInCurrency,
  getExtraPagePrice as calcExtraPagePrice
} from '../utils/calculatorLogic';
import { useGlobalCurrency } from '../context/CurrencyContext';

export interface UseCurrencyOptions {
  lang?: Language;
  initialCurrency?: Currency;
}

export interface UseCurrencyReturn {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggleCurrency: () => void;
  currencyConfig: CurrencyMetadata;
  geoInfo: GeoDetectionInfo;
  isDetecting: boolean;
  isTunisia: boolean;
  formatPrice: (amount: number, overrideCurrency?: Currency) => string;
  getAmountInCurrency: (
    amountEUR: number,
    amountTND: number,
    targetCurrency?: Currency
  ) => number;
  getExtraPagePrice: (targetCurrency?: Currency) => number;
  simulateLocation: (countryCode: string) => Promise<Currency>;
  availableCurrencies: CurrencyMetadata[];
}

/**
 * Custom hook managing currency for the calculator and across the application.
 * Automatic network geo-detection has been completely removed.
 * Default is TND for Tunisia, EUR for Europe & International.
 */
export function useCurrency(options: UseCurrencyOptions = {}): UseCurrencyReturn {
  const { lang = 'fr', initialCurrency } = options;

  let globalCtx: ReturnType<typeof useGlobalCurrency> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    globalCtx = useGlobalCurrency();
  } catch {
    globalCtx = null;
  }

  const [localCurrency, setLocalCurrencyState] = useState<Currency>(() => {
    return initialCurrency || getInitialCurrency();
  });

  const currency = globalCtx ? globalCtx.currency : localCurrency;

  const setCurrency = useCallback((newCurr: Currency) => {
    if (globalCtx) {
      globalCtx.setCurrency(newCurr);
    } else {
      setLocalCurrencyState(newCurr);
    }
  }, [globalCtx]);

  const toggleCurrency = useCallback(() => {
    if (globalCtx) {
      globalCtx.toggleCurrency();
    } else {
      setCurrency(currency === 'TND' ? 'EUR' : 'TND');
    }
  }, [currency, globalCtx, setCurrency]);

  const isTunisia = globalCtx ? globalCtx.isTunisia : (currency === 'TND' || isUserInTunisia());

  // Active currency metadata
  const currencyConfig = useMemo(() => getCurrencyConfig(currency), [currency]);

  const geoInfo = useMemo<GeoDetectionInfo>(() => {
    if (globalCtx) return globalCtx.geoInfo;
    return currency === 'TND' || isTunisia
      ? {
          detectedCountryCode: 'TN',
          detectedCountryName: lang === 'fr' ? 'Tunisie' : 'Tunisia',
          detectedCurrency: 'TND',
          detectionSource: 'locale'
        }
      : {
          detectedCountryCode: 'FR',
          detectedCountryName: lang === 'fr' ? 'France & Zone Euro' : 'Europe & International',
          detectedCurrency: currency,
          detectionSource: 'locale'
        };
  }, [currency, globalCtx, isTunisia, lang]);

  const formatPrice = useCallback(
    (amount: number, overrideCurrency?: Currency): string => {
      const activeCurr = overrideCurrency || currency;
      const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
      return formatCurrency(amount, activeCurr, locale);
    },
    [currency, lang]
  );

  const getAmountInCurrency = useCallback(
    (amountEUR: number, amountTND: number, targetCurrency?: Currency): number => {
      const activeCurr = targetCurrency || currency;
      return calcAmountInCurrency(amountEUR, amountTND, activeCurr);
    },
    [currency]
  );

  const getExtraPagePrice = useCallback(
    (targetCurrency?: Currency): number => {
      const activeCurr = targetCurrency || currency;
      return calcExtraPagePrice(activeCurr);
    },
    [currency]
  );

  const simulateLocation = useCallback(
    async (countryCode: string): Promise<Currency> => {
      const mapped = mapCountryCodeToCurrency(countryCode);
      setCurrency(mapped.currency);
      return mapped.currency;
    },
    [setCurrency]
  );

  return {
    currency,
    setCurrency,
    toggleCurrency,
    currencyConfig,
    geoInfo,
    isDetecting: false,
    isTunisia,
    formatPrice,
    getAmountInCurrency,
    getExtraPagePrice,
    simulateLocation,
    availableCurrencies: SUPPORTED_CURRENCIES
  };
}

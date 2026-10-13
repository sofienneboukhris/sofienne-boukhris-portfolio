import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Currency, GeoDetectionInfo } from '../types/calculator';
import { Language } from '../types';
import {
  CurrencyMetadata,
  SUPPORTED_CURRENCIES,
  getCurrencyConfig,
  formatCurrency,
  isUserInTunisia,
  getInitialCurrency,
  detectLocalLocationAndCurrency,
  fetchIpGeoLocation
} from '../utils/geoCurrency';
import {
  getAmountInCurrency as calcAmountInCurrency,
  getExtraPagePrice as calcExtraPagePrice
} from '../utils/calculatorLogic';
import { useRouter } from './RouterContext';

export interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggleCurrency: () => void;
  currencyConfig: CurrencyMetadata;
  geoInfo: GeoDetectionInfo;
  isTunisia: boolean;
  formatPrice: (amount: number, overrideCurrency?: Currency) => string;
  getAmountInCurrency: (
    amountEUR: number,
    amountTND: number,
    targetCurrency?: Currency
  ) => number;
  getExtraPagePrice: (targetCurrency?: Currency) => number;
  availableCurrencies: CurrencyMetadata[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang } = useRouter();

  // Instant synchronous detection on mount (timezone, locale, and Tunisia check)
  const [currency, setCurrencyState] = useState<Currency>(() => getInitialCurrency());
  const [geoInfo, setGeoInfo] = useState<GeoDetectionInfo>(() => {
    const local = detectLocalLocationAndCurrency(lang);
    return local;
  });

  const isTunisia = useMemo(() => isUserInTunisia() || currency === 'TND', [currency]);

  // Automatic client IP geolocation on connection to determine and apply local currency
  useEffect(() => {
    let isMounted = true;
    const isTunisLocal = isUserInTunisia();

    fetchIpGeoLocation()
      .then((geo) => {
        if (!isMounted || !geo) return;

        // If local environment (timezone or path) is Tunisia, retain TND as authoritative
        if (isTunisLocal && geo.countryCode !== 'TN') {
          return;
        }

        setCurrencyState(geo.currency);
        setGeoInfo({
          detectedCountryCode: geo.countryCode,
          detectedCountryName: geo.countryName,
          detectedCurrency: geo.currency,
          detectionSource: 'ip'
        });
      })
      .catch(() => {
        // Fallback already synchronously configured
      });

    return () => {
      isMounted = false;
    };
  }, [lang]);

  const currencyConfig = useMemo<CurrencyMetadata>(
    () => getCurrencyConfig(currency),
    [currency]
  );

  const setCurrency = useCallback((newCurrency: Currency) => {
    setCurrencyState(newCurrency);
  }, []);

  const toggleCurrency = useCallback(() => {
    setCurrency(currency === 'TND' ? 'EUR' : 'TND');
  }, [currency, setCurrency]);

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

  const value = useMemo<CurrencyContextType>(() => ({
    currency,
    setCurrency,
    toggleCurrency,
    currencyConfig,
    geoInfo,
    isTunisia,
    formatPrice,
    getAmountInCurrency,
    getExtraPagePrice,
    availableCurrencies: SUPPORTED_CURRENCIES
  }), [
    currency,
    setCurrency,
    toggleCurrency,
    currencyConfig,
    geoInfo,
    isTunisia,
    formatPrice,
    getAmountInCurrency,
    getExtraPagePrice
  ]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export function useGlobalCurrency(): CurrencyContextType {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useGlobalCurrency must be used within a CurrencyProvider');
  }
  return ctx;
}

import { ServiceItem, ServiceCurrency, ServicePrices } from '../types';
import { Currency } from '../types/calculator';
import { formatCurrency } from './geoCurrency';

export interface ManagedCurrencyInfo {
  code: ServiceCurrency;
  symbol: string;
  flag: string;
  name: {
    fr: string;
    en: string;
    ar: string;
  };
  description: {
    fr: string;
    en: string;
  };
  tag: {
    fr: string;
    en: string;
  };
  defaultRateFromEUR: number; // 1 EUR = X CURRENCY
}

export const MANAGED_SERVICE_CURRENCIES: ManagedCurrencyInfo[] = [
  {
    code: 'USD',
    symbol: '$',
    flag: '🇺🇸',
    name: {
      fr: 'USD (Dollar américain)',
      en: 'USD (US Dollar)',
      ar: 'دولار أمريكي'
    },
    description: {
      fr: 'Devise par défaut pour les autres pays',
      en: 'Default currency for other countries'
    },
    tag: {
      fr: 'Par défaut (Monde)',
      en: 'Default (Global)'
    },
    defaultRateFromEUR: 1.08
  },
  {
    code: 'TND',
    symbol: 'DT',
    flag: '🇹🇳',
    name: {
      fr: 'TND (Dinar tunisien)',
      en: 'TND (Tunisian Dinar)',
      ar: 'دينار تونسي'
    },
    description: {
      fr: 'Pour la Tunisie',
      en: 'For Tunisia'
    },
    tag: {
      fr: 'Tunisie',
      en: 'Tunisia'
    },
    defaultRateFromEUR: 3.35
  },
  {
    code: 'EUR',
    symbol: '€',
    flag: '🇪🇺',
    name: {
      fr: 'EUR (Euro)',
      en: 'EUR (Euro)',
      ar: 'يورو'
    },
    description: {
      fr: 'Pour les pays de la zone euro',
      en: 'For Eurozone countries'
    },
    tag: {
      fr: 'Zone Euro',
      en: 'Eurozone'
    },
    defaultRateFromEUR: 1.0
  },
  {
    code: 'GBP',
    symbol: '£',
    flag: '🇬🇧',
    name: {
      fr: 'GBP (Livre sterling)',
      en: 'GBP (British Pound)',
      ar: 'جنيه إسترليني'
    },
    description: {
      fr: 'Pour le Royaume-Uni',
      en: 'For United Kingdom'
    },
    tag: {
      fr: 'Royaume-Uni',
      en: 'United Kingdom'
    },
    defaultRateFromEUR: 0.86
  },
  {
    code: 'CAD',
    symbol: '$CA',
    flag: '🇨🇦',
    name: {
      fr: 'CAD (Dollar canadien)',
      en: 'CAD (Canadian Dollar)',
      ar: 'دولار كندي'
    },
    description: {
      fr: 'Pour le Canada',
      en: 'For Canada'
    },
    tag: {
      fr: 'Canada',
      en: 'Canada'
    },
    defaultRateFromEUR: 1.48
  }
];

/**
 * Normalizes any detected currency code to one of the 5 managed service currencies.
 * Rule:
 * - TND -> TND (Tunisie)
 * - EUR -> EUR (Zone euro)
 * - GBP -> GBP (Royaume-Uni)
 * - CAD -> CAD (Canada)
 * - All others -> USD (Dollar américain, devise par défaut pour les autres pays)
 */
export function normalizeToManagedCurrency(currency?: Currency | string): ServiceCurrency {
  if (!currency) return 'USD';
  const c = currency.toUpperCase();
  if (c === 'TND') return 'TND';
  if (c === 'EUR') return 'EUR';
  if (c === 'GBP') return 'GBP';
  if (c === 'CAD') return 'CAD';
  return 'USD'; // Default for all other countries
}

/**
 * Retrieves the configured price and formatted display string for a service
 * based on the client's currency.
 */
export function getServicePriceForCurrency(
  service: ServiceItem,
  targetCurrency?: Currency | string
): {
  amount: number;
  currency: ServiceCurrency;
  symbol: string;
  formatted: string;
} {
  const currency = normalizeToManagedCurrency(targetCurrency);
  const prices = service.prices || {};

  let amount = prices[currency];

  // Fallback to specific legacy or individual fields if not set in prices dictionary
  if (amount === undefined || amount === null || amount <= 0) {
    if (currency === 'USD' && service.priceStartingUSD) amount = service.priceStartingUSD;
    else if (currency === 'TND' && service.priceStartingTND) amount = service.priceStartingTND;
    else if (currency === 'EUR' && service.priceStartingEUR) amount = service.priceStartingEUR;
    else if (currency === 'GBP' && service.priceStartingGBP) amount = service.priceStartingGBP;
    else if (currency === 'CAD' && service.priceStartingCAD) amount = service.priceStartingCAD;
  }

  // If still not defined, compute from EUR using standard conversion multiplier
  if (!amount || amount <= 0) {
    const baseEUR = service.priceStartingEUR || service.prices?.EUR || 650;
    const config = MANAGED_SERVICE_CURRENCIES.find(c => c.code === currency);
    const multiplier = config ? config.defaultRateFromEUR : 1.0;
    
    if (currency === 'TND') {
      amount = Math.round((baseEUR * multiplier) / 50) * 50;
    } else {
      amount = Math.round((baseEUR * multiplier) / 10) * 10;
    }
  }

  const formatted = formatCurrency(amount, currency);
  const meta = MANAGED_SERVICE_CURRENCIES.find(c => c.code === currency);

  return {
    amount,
    currency,
    symbol: meta?.symbol || '$',
    formatted
  };
}

/**
 * Enhanced helper providing comprehensive display data (amount, symbol, flag, label)
 * for a service item based on the detected currency.
 */
export function getServicePricingDisplay(
  service: ServiceItem,
  targetCurrency?: Currency | string,
  lang: 'fr' | 'en' | 'ar' = 'fr'
): {
  amount: number;
  currency: ServiceCurrency;
  symbol: string;
  formatted: string;
  flag: string;
  countryName: string;
  description: string;
} {
  const result = getServicePriceForCurrency(service, targetCurrency);
  const meta = MANAGED_SERVICE_CURRENCIES.find(c => c.code === result.currency) || MANAGED_SERVICE_CURRENCIES[0];

  return {
    ...result,
    flag: meta.flag,
    countryName: meta.tag[lang] || meta.tag.fr,
    description: meta.description[lang] || meta.description.fr
  };
}

/**
 * Helper to auto-calculate suggested prices across all 5 currencies
 * based on a base amount and base currency (useful in admin dashboard).
 */
export function calculateSuggestedServicePrices(
  baseAmount: number,
  baseCurrency: ServiceCurrency = 'EUR'
): ServicePrices {
  const baseConfig = MANAGED_SERVICE_CURRENCIES.find(c => c.code === baseCurrency) || MANAGED_SERVICE_CURRENCIES[2]; // EUR
  // Convert baseAmount to EUR first
  const amountInEUR = baseAmount / baseConfig.defaultRateFromEUR;

  const result: ServicePrices = {};
  for (const m of MANAGED_SERVICE_CURRENCIES) {
    if (m.code === baseCurrency) {
      result[m.code] = baseAmount;
    } else {
      const raw = amountInEUR * m.defaultRateFromEUR;
      if (m.code === 'TND') {
        result[m.code] = Math.max(100, Math.round(raw / 50) * 50);
      } else {
        result[m.code] = Math.max(50, Math.round(raw / 10) * 10);
      }
    }
  }

  return result;
}

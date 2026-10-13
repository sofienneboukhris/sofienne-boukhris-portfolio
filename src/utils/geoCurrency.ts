import { Currency, GeoDetectionInfo } from '../types/calculator';
import { Language, LocalizedString } from '../types';

export interface CurrencyMetadata {
  code: Currency;
  name: LocalizedString;
  symbol: string;
  nativeSymbol?: string;
  flag: string;
  primaryCountryCode: string;
  primaryCountryName: LocalizedString;
  formatExample: string;
  rateFromEUR: number; // 1 EUR = X CURRENCY
}

export const SUPPORTED_CURRENCIES: CurrencyMetadata[] = [
  {
    code: 'TND',
    name: {
      fr: 'Dinar tunisien (DT / د.ت)',
      en: 'Tunisian Dinar (TND / DT)'
    },
    symbol: 'DT',
    nativeSymbol: 'د.ت',
    flag: '🇹🇳',
    primaryCountryCode: 'TN',
    primaryCountryName: {
      fr: 'Tunisie',
      en: 'Tunisia'
    },
    formatExample: '1 800 DT',
    rateFromEUR: 3.35
  },
  {
    code: 'EUR',
    name: {
      fr: 'Euro (€)',
      en: 'Euro (€)'
    },
    symbol: '€',
    flag: '🇪🇺',
    primaryCountryCode: 'FR',
    primaryCountryName: {
      fr: 'France & Zone Euro',
      en: 'Europe / Eurozone'
    },
    formatExample: '650 €',
    rateFromEUR: 1.0
  },
  {
    code: 'USD',
    name: {
      fr: 'Dollar américain ($)',
      en: 'US Dollar ($)'
    },
    symbol: '$',
    flag: '🇺🇸',
    primaryCountryCode: 'US',
    primaryCountryName: {
      fr: 'États-Unis',
      en: 'United States'
    },
    formatExample: '$2,500',
    rateFromEUR: 1.08
  },
  {
    code: 'GBP',
    name: {
      fr: 'Livre sterling (£)',
      en: 'British Pound (£)'
    },
    symbol: '£',
    flag: '🇬🇧',
    primaryCountryCode: 'GB',
    primaryCountryName: {
      fr: 'Royaume-Uni',
      en: 'United Kingdom'
    },
    formatExample: '£2,500',
    rateFromEUR: 0.86
  },
  {
    code: 'CAD',
    name: {
      fr: 'Dollar canadien ($CA)',
      en: 'Canadian Dollar (CAD)'
    },
    symbol: '$CA',
    flag: '🇨🇦',
    primaryCountryCode: 'CA',
    primaryCountryName: {
      fr: 'Canada',
      en: 'Canada'
    },
    formatExample: '$2,500 CAD',
    rateFromEUR: 1.48
  },
  {
    code: 'CHF',
    name: {
      fr: 'Franc suisse (CHF)',
      en: 'Swiss Franc (CHF)'
    },
    symbol: 'CHF',
    flag: '🇨🇭',
    primaryCountryCode: 'CH',
    primaryCountryName: {
      fr: 'Suisse',
      en: 'Switzerland'
    },
    formatExample: '2 500 CHF',
    rateFromEUR: 0.96
  },
  {
    code: 'AED',
    name: {
      fr: 'Dirham des Émirats (AED)',
      en: 'UAE Dirham (AED)'
    },
    symbol: 'AED',
    nativeSymbol: 'د.إ',
    flag: '🇦🇪',
    primaryCountryCode: 'AE',
    primaryCountryName: {
      fr: 'Émirats Arabes Unis',
      en: 'United Arab Emirates'
    },
    formatExample: '2 500 AED',
    rateFromEUR: 3.97
  },
  {
    code: 'SAR',
    name: {
      fr: 'Riyal saoudien (SAR)',
      en: 'Saudi Riyal (SAR)'
    },
    symbol: 'SAR',
    nativeSymbol: 'ر.س',
    flag: '🇸🇦',
    primaryCountryCode: 'SA',
    primaryCountryName: {
      fr: 'Arabie Saoudite',
      en: 'Saudi Arabia'
    },
    formatExample: '2 500 SAR',
    rateFromEUR: 4.05
  },
  {
    code: 'MAD',
    name: {
      fr: 'Dirham marocain (MAD)',
      en: 'Moroccan Dirham (MAD)'
    },
    symbol: 'MAD',
    nativeSymbol: 'د.م.',
    flag: '🇲🇦',
    primaryCountryCode: 'MA',
    primaryCountryName: {
      fr: 'Maroc',
      en: 'Morocco'
    },
    formatExample: '2 500 MAD',
    rateFromEUR: 10.8
  },
  {
    code: 'DZD',
    name: {
      fr: 'Dinar algérien (DZD)',
      en: 'Algerian Dinar (DZD)'
    },
    symbol: 'DZD',
    nativeSymbol: 'د.ج',
    flag: '🇩🇿',
    primaryCountryCode: 'DZ',
    primaryCountryName: {
      fr: 'Algérie',
      en: 'Algeria'
    },
    formatExample: '2 500 DZD',
    rateFromEUR: 145.0
  },
  {
    code: 'AUD',
    name: {
      fr: 'Dollar australien ($AU)',
      en: 'Australian Dollar (AUD)'
    },
    symbol: '$AU',
    flag: '🇦🇺',
    primaryCountryCode: 'AU',
    primaryCountryName: {
      fr: 'Australie',
      en: 'Australia'
    },
    formatExample: '$2,500 AUD',
    rateFromEUR: 1.65
  }
];

// Eurozone country codes mapping
export const EUROZONE_COUNTRIES = new Set([
  'FR', 'DE', 'IT', 'ES', 'BE', 'NL', 'PT', 'IE', 'GR', 'AT', 'FI',
  'LU', 'EE', 'LV', 'LT', 'SK', 'SI', 'CY', 'MT', 'HR', 'MC', 'AD',
  'SM', 'VA', 'ME', 'XK'
]);

// USD-using countries mapping
export const USD_COUNTRIES = new Set([
  'US', 'PR', 'GU', 'VI', 'AS', 'MP', 'EC', 'SV', 'PA', 'ZW', 'TL', 'FM', 'MH', 'PW'
]);

export function getCurrencyConfig(code: Currency): CurrencyMetadata {
  const found = SUPPORTED_CURRENCIES.find((c) => c.code === code);
  return (
    found ||
    SUPPORTED_CURRENCIES.find((c) => c.code === 'EUR') ||
    SUPPORTED_CURRENCIES[0]
  );
}

/**
 * Format price strictly respecting national typographical conventions leveraging Intl.NumberFormat:
 * - Tunisie: 2 500 د.ت
 * - France / Zone Euro: 2 500 €
 * - États-Unis: $2,500
 * - Royaume-Uni: £2,500
 * - Canada: $2,500 CAD
 * - Suisse: 2 500 CHF
 * - Émirats: 2 500 AED
 * - Arabie Saoudite: 2 500 SAR
 */
export function isUserInTunisia(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
    if (tz.includes('tunis')) return true;

    const navLangs = [navigator.language, ...(navigator.languages || [])].filter(Boolean);
    for (const l of navLangs) {
      if (l.toLowerCase().includes('-tn') || l.toLowerCase() === 'tn') return true;
    }

    const currentPath = window.location?.pathname || '';
    if (currentPath.includes('tunisie') || currentPath.includes('sousse')) {
      return true;
    }
  } catch {
    // fallback
  }
  return false;
}

export function getInitialCurrency(): Currency {
  if (typeof window !== 'undefined') {
    try {
      // Clear manual legacy preferences so they never override automatic detection
      localStorage.removeItem('sb_user_currency');

      // Check session-stored detected country
      const cached = sessionStorage.getItem('sb_detected_country');
      if (cached) {
        return mapCountryCodeToCurrency(cached).currency;
      }
    } catch {
      // ignore
    }
  }

  // When in Tunisia (via timezone, locale, or path), strictly TND
  if (isUserInTunisia()) {
    return 'TND';
  }

  // Detect using timezone & locale
  const local = detectLocalLocationAndCurrency('fr');
  return local.detectedCurrency;
}

export function formatCurrency(
  amount: number,
  currency: Currency,
  locale: string = 'fr-FR'
): string {
  const rounded = Math.round(amount);

  switch (currency) {
    case 'TND': {
      // Tunisian Dinar: e.g. 1 800 DT
      const formatted = new Intl.NumberFormat('fr-TN', {
        maximumFractionDigits: 0
      }).format(rounded);
      return `${formatted} DT`;
    }
    case 'EUR': {
      return new Intl.NumberFormat(locale.startsWith('en') ? 'en-IE' : 'fr-FR', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
      }).format(rounded);
    }
    case 'USD': {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(rounded);
    }
    case 'GBP': {
      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        maximumFractionDigits: 0
      }).format(rounded);
    }
    case 'CAD': {
      return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD',
        maximumFractionDigits: 0
      }).format(rounded);
    }
    case 'CHF': {
      return new Intl.NumberFormat('de-CH', {
        style: 'currency',
        currency: 'CHF',
        maximumFractionDigits: 0
      }).format(rounded);
    }
    case 'AUD': {
      return new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        maximumFractionDigits: 0
      }).format(rounded);
    }
    case 'AED': {
      const formatted = new Intl.NumberFormat('fr-FR').format(rounded);
      return `${formatted} AED`;
    }
    case 'SAR': {
      const formatted = new Intl.NumberFormat('fr-FR').format(rounded);
      return `${formatted} SAR`;
    }
    case 'MAD': {
      const formatted = new Intl.NumberFormat('fr-FR').format(rounded);
      return `${formatted} MAD`;
    }
    case 'DZD': {
      const formatted = new Intl.NumberFormat('fr-FR').format(rounded);
      return `${formatted} DZD`;
    }
    default: {
      return new Intl.NumberFormat(locale.startsWith('en') ? 'en-US' : 'fr-FR', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0
      }).format(rounded);
    }
  }
}

/**
 * Maps a country code (2-letter ISO) to the most appropriate supported currency
 */
export function mapCountryCodeToCurrency(countryCode: string): {
  currency: Currency;
  countryName: string;
} {
  const code = (countryCode || '').toUpperCase().trim();

  // 1. Tunisie -> Dinar tunisien (TND)
  if (code === 'TN') {
    return { currency: 'TND', countryName: 'Tunisie' };
  }

  // 2. Pays de la zone euro -> Euro (EUR)
  if (EUROZONE_COUNTRIES.has(code)) {
    const names: Record<string, string> = {
      FR: 'France',
      DE: 'Allemagne',
      IT: 'Italie',
      ES: 'Espagne',
      BE: 'Belgique',
      NL: 'Pays-Bas',
      PT: 'Portugal',
      IE: 'Irlande',
      AT: 'Autriche',
      GR: 'Grèce',
      FI: 'Finlande',
      LU: 'Luxembourg',
      EE: 'Estonie',
      LV: 'Lettonie',
      LT: 'Lituanie',
      SK: 'Slovaquie',
      SI: 'Slovénie',
      CY: 'Chypre',
      MT: 'Malte',
      HR: 'Croatie'
    };
    return { currency: 'EUR', countryName: names[code] || 'Zone Euro' };
  }

  // 3. Royaume-Uni -> Livre sterling (GBP)
  if (code === 'GB' || code === 'UK') {
    return { currency: 'GBP', countryName: 'Royaume-Uni' };
  }

  // 4. Canada -> Dollar canadien (CAD)
  if (code === 'CA') {
    return { currency: 'CAD', countryName: 'Canada' };
  }

  // 5. États-Unis et autres pays -> Dollar américain (USD) par défaut
  return {
    currency: 'USD',
    countryName: code === 'US' ? 'États-Unis' : code ? `International (${code})` : 'International (USD)'
  };
}

/**
 * Synchronous client-side location & currency detection
 * Uses timezone and browser locale for 0ms immediate detection
 */
export function detectLocalLocationAndCurrency(lang: Language): GeoDetectionInfo {
  // 1. Primary check: If in Tunisia or user saved Tunisia
  if (isUserInTunisia()) {
    return {
      detectedCountryCode: 'TN',
      detectedCountryName: lang === 'fr' ? 'Tunisie' : 'Tunisia',
      detectedCurrency: 'TND',
      detectionSource: 'locale'
    };
  }

  // 2. Check browser timezone
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';

    // Tunisia
    if (timeZone.toLowerCase().includes('tunis')) {
      return {
        detectedCountryCode: 'TN',
        detectedCountryName: lang === 'fr' ? 'Tunisie' : 'Tunisia',
        detectedCurrency: 'TND',
        detectionSource: 'timezone'
      };
    }

    // United Kingdom
    if (
      timeZone.includes('London') ||
      timeZone.includes('Belfast') ||
      timeZone === 'Europe/Jersey' ||
      timeZone === 'Europe/Guernsey'
    ) {
      return {
        detectedCountryCode: 'GB',
        detectedCountryName: lang === 'fr' ? 'Royaume-Uni' : 'United Kingdom',
        detectedCurrency: 'GBP',
        detectionSource: 'timezone'
      };
    }

    // USA
    if (
      timeZone.includes('New_York') ||
      timeZone.includes('Chicago') ||
      timeZone.includes('Denver') ||
      timeZone.includes('Los_Angeles') ||
      timeZone.includes('Phoenix') ||
      timeZone.includes('Anchorage') ||
      timeZone.includes('Honolulu') ||
      timeZone.includes('Detroit') ||
      timeZone.includes('Indiana') ||
      timeZone.includes('Boise') ||
      timeZone.startsWith('US/')
    ) {
      return {
        detectedCountryCode: 'US',
        detectedCountryName: lang === 'fr' ? 'États-Unis' : 'United States',
        detectedCurrency: 'USD',
        detectionSource: 'timezone'
      };
    }

    // Canada
    if (
      timeZone.includes('Toronto') ||
      timeZone.includes('Vancouver') ||
      timeZone.includes('Montreal') ||
      timeZone.includes('Edmonton') ||
      timeZone.includes('Winnipeg') ||
      timeZone.includes('Halifax') ||
      timeZone.startsWith('Canada/')
    ) {
      return {
        detectedCountryCode: 'CA',
        detectedCountryName: 'Canada',
        detectedCurrency: 'CAD',
        detectionSource: 'timezone'
      };
    }

    // Eurozone
    if (
      timeZone.includes('Paris') ||
      timeZone.includes('Berlin') ||
      timeZone.includes('Rome') ||
      timeZone.includes('Madrid') ||
      timeZone.includes('Brussels') ||
      timeZone.includes('Amsterdam') ||
      timeZone.includes('Vienna') ||
      timeZone.includes('Athens') ||
      timeZone.includes('Lisbon') ||
      timeZone.includes('Dublin') ||
      timeZone.includes('Helsinki') ||
      timeZone.includes('Luxembourg')
    ) {
      return {
        detectedCountryCode: 'FR',
        detectedCountryName: lang === 'fr' ? 'Zone Euro (France)' : 'Eurozone',
        detectedCurrency: 'EUR',
        detectionSource: 'timezone'
      };
    }
  } catch {
    // Ignore timezone inspection error
  }

  // 2. Check browser locale (e.g. navigator.language / navigator.languages)
  if (typeof navigator !== 'undefined') {
    const navLanguages = [
      navigator.language,
      ...(navigator.languages || [])
    ].filter(Boolean);

    for (const l of navLanguages) {
      const parts = l.split(/[-_]/);
      if (parts.length >= 2) {
        const country = parts[1].toUpperCase();
        if (country === 'TN') {
          return {
            detectedCountryCode: 'TN',
            detectedCountryName: lang === 'fr' ? 'Tunisie' : 'Tunisia',
            detectedCurrency: 'TND',
            detectionSource: 'locale'
          };
        }
        if (EUROZONE_COUNTRIES.has(country)) {
          return {
            detectedCountryCode: country,
            detectedCountryName: lang === 'fr' ? 'Zone Euro' : 'Eurozone',
            detectedCurrency: 'EUR',
            detectionSource: 'locale'
          };
        }
        if (country === 'US') {
          return {
            detectedCountryCode: 'US',
            detectedCountryName: lang === 'fr' ? 'États-Unis' : 'United States',
            detectedCurrency: 'USD',
            detectionSource: 'locale'
          };
        }
        if (country === 'GB') {
          return {
            detectedCountryCode: 'GB',
            detectedCountryName: lang === 'fr' ? 'Royaume-Uni' : 'United Kingdom',
            detectedCurrency: 'GBP',
            detectionSource: 'locale'
          };
        }
        if (country === 'CA') {
          return {
            detectedCountryCode: 'CA',
            detectedCountryName: 'Canada',
            detectedCurrency: 'CAD',
            detectionSource: 'locale'
          };
        }
      }
    }
  }

  // Default fallback: USD for US and all other countries by default as requested
  return {
    detectedCountryCode: 'US',
    detectedCountryName:
      lang === 'fr' ? 'États-Unis et International (USD)' : 'United States & International (USD)',
    detectedCurrency: 'USD',
    detectionSource: 'timezone'
  };
}

/**
 * Automatically detects the client's country via IP and maps it to their local currency.
 * Caches in sessionStorage for session-wide fast reuse with timeout protections.
 */
export async function fetchIpGeoLocation(): Promise<{
  countryCode: string;
  countryName: string;
  currency: Currency;
} | null> {
  if (typeof window === 'undefined') return null;

  // 1. Check session cache first
  try {
    const cached = sessionStorage.getItem('sb_detected_country');
    if (cached) {
      const mapped = mapCountryCodeToCurrency(cached);
      return {
        countryCode: cached,
        countryName: mapped.countryName,
        currency: mapped.currency
      };
    }
  } catch {
    // ignore
  }

  // 2. Primary fast detection: https://api.country.is/ (CORS enabled, lightweight)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch('https://api.country.is/', {
      signal: controller.signal,
      headers: { Accept: 'application/json' }
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.country === 'string' && data.country.trim().length === 2) {
        const countryCode = data.country.toUpperCase().trim();
        try {
          sessionStorage.setItem('sb_detected_country', countryCode);
        } catch {
          // ignore
        }
        const mapped = mapCountryCodeToCurrency(countryCode);
        return {
          countryCode,
          countryName: mapped.countryName,
          currency: mapped.currency
        };
      }
    }
  } catch {
    // fallback to secondary
  }

  // 3. Secondary fallback: https://ipwho.is/
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch('https://ipwho.is/', {
      signal: controller.signal,
      headers: { Accept: 'application/json' }
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.success && typeof data.country_code === 'string' && data.country_code.trim().length === 2) {
        const countryCode = data.country_code.toUpperCase().trim();
        try {
          sessionStorage.setItem('sb_detected_country', countryCode);
        } catch {
          // ignore
        }
        const mapped = mapCountryCodeToCurrency(countryCode);
        return {
          countryCode,
          countryName: mapped.countryName,
          currency: mapped.currency
        };
      }
    }
  } catch {
    // ignore
  }

  return null;
}

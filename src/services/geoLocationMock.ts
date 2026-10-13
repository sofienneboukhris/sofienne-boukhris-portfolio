import { Currency, GeoDetectionInfo } from '../types/calculator';
import { Language, LocalizedString } from '../types';
import {
  mapCountryCodeToCurrency,
  detectLocalLocationAndCurrency,
  SUPPORTED_CURRENCIES
} from '../utils/geoCurrency';

export interface MockLocationProfile {
  countryCode: string;
  countryName: LocalizedString;
  currency: Currency;
  city: string;
  timeZone: string;
  locale: string;
}

export const MOCK_GEO_PROFILES: Record<string, MockLocationProfile> = {
  TN: {
    countryCode: 'TN',
    countryName: { fr: 'Tunisie', en: 'Tunisia' },
    currency: 'TND',
    city: 'Tunis',
    timeZone: 'Africa/Tunis',
    locale: 'fr-TN'
  },
  FR: {
    countryCode: 'FR',
    countryName: { fr: 'France (Zone Euro)', en: 'France (Eurozone)' },
    currency: 'EUR',
    city: 'Paris',
    timeZone: 'Europe/Paris',
    locale: 'fr-FR'
  },
  US: {
    countryCode: 'US',
    countryName: { fr: 'États-Unis', en: 'United States' },
    currency: 'USD',
    city: 'New York',
    timeZone: 'America/New_York',
    locale: 'en-US'
  },
  GB: {
    countryCode: 'GB',
    countryName: { fr: 'Royaume-Uni', en: 'United Kingdom' },
    currency: 'GBP',
    city: 'London',
    timeZone: 'Europe/London',
    locale: 'en-GB'
  },
  CA: {
    countryCode: 'CA',
    countryName: { fr: 'Canada', en: 'Canada' },
    currency: 'CAD',
    city: 'Montreal',
    timeZone: 'America/Toronto',
    locale: 'en-CA'
  },
  CH: {
    countryCode: 'CH',
    countryName: { fr: 'Suisse', en: 'Switzerland' },
    currency: 'CHF',
    city: 'Zurich',
    timeZone: 'Europe/Zurich',
    locale: 'de-CH'
  },
  AE: {
    countryCode: 'AE',
    countryName: { fr: 'Émirats Arabes Unis', en: 'United Arab Emirates' },
    currency: 'AED',
    city: 'Dubai',
    timeZone: 'Asia/Dubai',
    locale: 'ar-AE'
  },
  SA: {
    countryCode: 'SA',
    countryName: { fr: 'Arabie Saoudite', en: 'Saudi Arabia' },
    currency: 'SAR',
    city: 'Riyadh',
    timeZone: 'Asia/Riyadh',
    locale: 'ar-SA'
  },
  MA: {
    countryCode: 'MA',
    countryName: { fr: 'Maroc', en: 'Morocco' },
    currency: 'MAD',
    city: 'Casablanca',
    timeZone: 'Africa/Casablanca',
    locale: 'fr-MA'
  },
  DZ: {
    countryCode: 'DZ',
    countryName: { fr: 'Algérie', en: 'Algeria' },
    currency: 'DZD',
    city: 'Algiers',
    timeZone: 'Africa/Algiers',
    locale: 'fr-DZ'
  },
  AU: {
    countryCode: 'AU',
    countryName: { fr: 'Australie', en: 'Australia' },
    currency: 'AUD',
    city: 'Sydney',
    timeZone: 'Australia/Sydney',
    locale: 'en-AU'
  }
};

export interface GeoLocationDetectOptions {
  mockDelayMs?: number;
  mockCountryCode?: string;
  lang?: Language;
}

/**
 * Geo-Location Detection Mock Service
 * Simulates real-time IP/network geolocation detection with fallbacks
 * to browser timezone and locale information.
 */
export async function detectGeoLocationMock(
  options: GeoLocationDetectOptions = {}
): Promise<GeoDetectionInfo> {
  const { mockDelayMs = 250, mockCountryCode, lang = 'fr' } = options;

  // Simulate network latency for the geo-location detection
  if (mockDelayMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, mockDelayMs));
  }

  // 1. If explicit mock country code is requested (e.g. for testing or simulation)
  if (mockCountryCode) {
    const code = mockCountryCode.toUpperCase();
    const profile = MOCK_GEO_PROFILES[code];
    if (profile) {
      return {
        detectedCountryCode: profile.countryCode,
        detectedCountryName: profile.countryName[lang],
        detectedCurrency: profile.currency,
        detectionSource: 'mock'
      };
    }

    const mapped = mapCountryCodeToCurrency(code);
    return {
      detectedCountryCode: code,
      detectedCountryName: mapped.countryName,
      detectedCurrency: mapped.currency,
      detectionSource: 'mock'
    };
  }

  // 2. Real environment detection via browser timezone & locale
  const local = detectLocalLocationAndCurrency(lang);
  return {
    ...local,
    detectionSource: 'ip'
  };
}

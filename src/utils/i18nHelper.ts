import { Language } from '../types';

/**
 * Robust localized string/array retrieval with fallback to French (default) or English
 */
export function getLocalizedText(
  obj: Record<string, string> | undefined | null,
  lang: Language = 'fr',
  fallback: string = ''
): string {
  if (!obj) return fallback;
  if (obj[lang] && typeof obj[lang] === 'string' && obj[lang].trim() !== '') {
    return obj[lang];
  }
  if (obj['fr'] && typeof obj['fr'] === 'string' && obj['fr'].trim() !== '') {
    return obj['fr'];
  }
  if (obj['en'] && typeof obj['en'] === 'string' && obj['en'].trim() !== '') {
    return obj['en'];
  }
  return fallback;
}

export function getLocalizedArray(
  obj: Record<string, string[]> | undefined | null,
  lang: Language = 'fr',
  fallback: string[] = []
): string[] {
  if (!obj) return fallback;
  if (Array.isArray(obj[lang]) && obj[lang].length > 0) {
    return obj[lang];
  }
  if (Array.isArray(obj['fr']) && obj['fr'].length > 0) {
    return obj['fr'];
  }
  if (Array.isArray(obj['en']) && obj['en'].length > 0) {
    return obj['en'];
  }
  return fallback;
}

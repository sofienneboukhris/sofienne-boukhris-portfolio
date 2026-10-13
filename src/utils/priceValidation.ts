/**
 * Real-time price validation utilities for admin dashboard forms.
 */

export interface ValidationRuleOptions {
  min?: number;
  max?: number;
  allowZero?: boolean;
  required?: boolean;
  integerOnly?: boolean;
}

export interface ValidationStatus {
  isValid: boolean;
  errorMessage: string | null;
  numericValue: number | null;
}

/**
 * Validates a price input string or number in real-time.
 */
export function validatePrice(
  value: string | number | undefined | null,
  options: ValidationRuleOptions = {}
): ValidationStatus {
  const {
    min = 1,
    max = 500000,
    allowZero = false,
    required = true,
    integerOnly = false
  } = options;

  // Handle null / undefined / empty string
  if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
    if (required) {
      return {
        isValid: false,
        errorMessage: 'Prix obligatoire',
        numericValue: null
      };
    }
    return {
      isValid: true,
      errorMessage: null,
      numericValue: allowZero ? 0 : null
    };
  }

  const strValue = typeof value === 'number' ? String(value) : value.trim().replace(/\s+/g, '').replace(',', '.');

  // Check if string contains forbidden characters (only digits and optional single dot)
  if (!/^-?\d+(\.\d+)?$/.test(strValue)) {
    return {
      isValid: false,
      errorMessage: 'Format numérique invalide (chiffres uniquement)',
      numericValue: null
    };
  }

  const num = Number(strValue);

  if (isNaN(num) || !isFinite(num)) {
    return {
      isValid: false,
      errorMessage: 'Nombre invalide',
      numericValue: null
    };
  }

  if (num < 0) {
    return {
      isValid: false,
      errorMessage: 'Le montant ne peut pas être négatif',
      numericValue: num
    };
  }

  if (num === 0 && !allowZero) {
    return {
      isValid: false,
      errorMessage: 'Le montant doit être supérieur à 0',
      numericValue: num
    };
  }

  const effectiveMin = allowZero ? 0 : min;
  if (num < effectiveMin) {
    return {
      isValid: false,
      errorMessage: `Le montant minimum est de ${effectiveMin}`,
      numericValue: num
    };
  }

  if (num > max) {
    return {
      isValid: false,
      errorMessage: `Le montant dépasse le maximum autorisé (${max.toLocaleString()})`,
      numericValue: num
    };
  }

  if (integerOnly && !Number.isInteger(num)) {
    return {
      isValid: false,
      errorMessage: 'Veuillez saisir un nombre entier sans décimales',
      numericValue: num
    };
  }

  return {
    isValid: true,
    errorMessage: null,
    numericValue: num
  };
}

/**
 * Validates an entire ServicePrices dictionary.
 * Returns true only if all 5 currencies are valid positive numbers.
 */
export function validateServicePrices(
  prices: Record<string, string | number | undefined | null>
): {
  isValid: boolean;
  errors: Record<string, string | null>;
} {
  const currencies = ['USD', 'TND', 'EUR', 'GBP', 'CAD'];
  const errors: Record<string, string | null> = {};
  let allValid = true;

  for (const curr of currencies) {
    const val = prices[curr];
    const result = validatePrice(val, { min: 1, allowZero: false, required: true });
    errors[curr] = result.errorMessage;
    if (!result.isValid) {
      allValid = false;
    }
  }

  return {
    isValid: allValid,
    errors
  };
}

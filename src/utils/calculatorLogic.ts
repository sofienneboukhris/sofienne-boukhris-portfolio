import {
  CalculatorState,
  CostBreakdown,
  Currency,
  ProjectTypeOption,
  FeatureOption
} from '../types/calculator';
import {
  PROJECT_TYPES,
  FEATURES,
  DESIGN_LEVELS,
  TIMELINES,
  SUPPORT_LEVELS,
  PRICE_PER_EXTRA_PAGE_EUR,
  PRICE_PER_EXTRA_PAGE_TND
} from '../data/calculatorConfig';
import { formatCurrency, getCurrencyConfig } from './geoCurrency';

/**
 * Converts EUR and TND benchmark prices to target currency with clean rounding
 */
export function getAmountInCurrency(
  amountEUR: number,
  amountTND: number,
  currency: Currency
): number {
  if (currency === 'EUR') return amountEUR;
  if (currency === 'TND') return amountTND;

  const config = getCurrencyConfig(currency);
  const rate = config.rateFromEUR;
  const raw = amountEUR * rate;

  // Commercial rounding for clean figures
  if (raw >= 1000) {
    return Math.round(raw / 25) * 25;
  } else if (raw >= 100) {
    return Math.round(raw / 10) * 10;
  } else {
    return Math.max(5, Math.round(raw / 5) * 5);
  }
}

import { DesignLevelOption, TimelineOption, SupportLevelOption } from '../types/calculator';

export interface DynamicCalculatorConfig {
  projectTypes?: ProjectTypeOption[];
  features?: FeatureOption[];
  designLevels?: DesignLevelOption[];
  timelines?: TimelineOption[];
  supportLevels?: SupportLevelOption[];
  pricePerExtraPageUSD?: number;
  pricePerExtraPageTND?: number;
  pricePerExtraPageEUR?: number;
  pricePerExtraPageGBP?: number;
  pricePerExtraPageCAD?: number;
}

/**
 * Returns unit price for an extra page in the selected currency
 */
export function getExtraPagePrice(
  currency: Currency,
  priceEUR: number = PRICE_PER_EXTRA_PAGE_EUR,
  priceTND: number = PRICE_PER_EXTRA_PAGE_TND
): number {
  return getAmountInCurrency(priceEUR, priceTND, currency);
}

export function calculateCostBreakdown(
  state: CalculatorState,
  dynamicConfig?: DynamicCalculatorConfig
): CostBreakdown {
  const currency = state.currency;
  const typesPool = dynamicConfig?.projectTypes || PROJECT_TYPES;
  const featuresPool = dynamicConfig?.features || FEATURES;
  const designPool = dynamicConfig?.designLevels || DESIGN_LEVELS;
  const timelinePool = dynamicConfig?.timelines || TIMELINES;
  const supportPool = dynamicConfig?.supportLevels || SUPPORT_LEVELS;
  const pagePrice = dynamicConfig?.[`pricePerExtraPage${currency}` as keyof DynamicCalculatorConfig] as number ?? 35;

  const projectType = typesPool.find((p) => p.id === state.projectType);

  if (!projectType) {
    return {
      baseProjectPrice: 0,
      extraPagesCount: 0,
      extraPagesCost: 0,
      featuresCost: 0,
      designSurcharge: 0,
      timelineSurcharge: 0,
      supportCost: 0,
      subtotal: 0,
      total: 0,
      currency
    };
  }

  // 1. Base project price in active currency
  const baseProjectPrice = projectType[`basePrice${currency}` as keyof typeof projectType] as number;

  // 2. Extra pages in active currency
  const basePages = projectType.basePages;
  const extraPagesCount = Math.max(0, state.pageCount - basePages);
  const costPerPage = pagePrice;
  const extraPagesCost = extraPagesCount * costPerPage;

  // 3. Features cost in active currency
  const featuresCost = state.selectedFeatures.reduce((acc, featId) => {
    const feat = featuresPool.find((f) => f.id === featId);
    if (!feat) return acc;
    const featCost = feat[`price${currency}` as keyof typeof feat] as number;
    return acc + featCost;
  }, 0);

  // Subtotal for core production
  const coreTotal = baseProjectPrice + extraPagesCost + featuresCost;

  // 4. Design level surcharge
  const designOption = designPool.find((d) => d.id === state.designLevel);
  const designMultiplier = designOption?.multiplier ?? 1.0;
  const designSurcharge = Math.round(coreTotal * (designMultiplier - 1));

  // 5. Timeline urgency surcharge
  const timelineOption = timelinePool.find((t) => t.id === state.timeline);
  const timelineMultiplier = timelineOption?.multiplier ?? 1.0;
  const timelineSurcharge = Math.round(
    (coreTotal + designSurcharge) * (timelineMultiplier - 1)
  );

  // 6. Support & Training in active currency
  const supportOption = supportPool.find((s) => s.id === state.supportLevel);
  const supportCost = supportOption
    ? supportOption[`price${currency}` as keyof typeof supportOption] as number
    : 0;

  const subtotal = coreTotal + designSurcharge + timelineSurcharge;
  const total = subtotal + supportCost;

  return {
    baseProjectPrice,
    extraPagesCount,
    extraPagesCost,
    featuresCost,
    designSurcharge,
    timelineSurcharge,
    supportCost,
    subtotal,
    total,
    currency
  };
}

export function formatPrice(amount: number, currency: Currency): string {
  return formatCurrency(amount, currency);
}

export function getDualPriceEstimate(amount: number, fromCurrency: Currency): {
  primary: string;
  secondary: string;
} {
  const primary = formatPrice(amount, fromCurrency);
  let convertedAmount = 0;
  let toCurrency: Currency = 'EUR';

  if (fromCurrency === 'TND') {
    convertedAmount = Math.round(amount / 3.35);
    toCurrency = 'EUR';
  } else if (fromCurrency === 'EUR') {
    convertedAmount = Math.round(amount * 3.35);
    toCurrency = 'TND';
  } else {
    const config = getCurrencyConfig(fromCurrency);
    convertedAmount = Math.round(amount / (config.rateFromEUR || 1));
    toCurrency = 'EUR';
  }

  const secondary = formatPrice(convertedAmount, toCurrency);
  return { primary, secondary };
}

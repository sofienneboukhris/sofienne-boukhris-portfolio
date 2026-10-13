import { Language, LocalizedString } from '../types';

export type Currency =
  | 'TND'
  | 'EUR'
  | 'USD'
  | 'GBP'
  | 'CAD'
  | 'CHF'
  | 'AED'
  | 'SAR'
  | 'MAD'
  | 'DZD'
  | 'AUD';

export interface GeoDetectionInfo {
  detectedCountryCode: string;
  detectedCountryName: string;
  detectedCurrency: Currency;
  detectionSource: 'ip' | 'timezone' | 'locale' | 'mock';
}

export type ProjectTypeId =
  | 'vitrine'
  | 'ecommerce'
  | 'webapp'
  | 'landing'
  | 'institutionnel'
  | 'refonte'
  | 'sur-mesure';

export type DesignLevelId = 'template' | 'custom' | 'artistic';

export type TimelineId = 'standard' | 'fast' | 'express';

export type SupportLevelId = 'doc' | 'training' | 'vip';

export type FeatureCategoryId = 'core' | 'commerce' | 'content' | 'marketing' | 'tech';

export interface ProjectTypeOption {
  id: ProjectTypeId;
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  icon: string;
  basePriceUSD: number;
  basePriceTND: number;
  basePriceEUR: number;
  basePriceGBP: number;
  basePriceCAD: number;
  basePages: number;
  popular?: boolean;
  active?: boolean;
}

export interface FeatureOption {
  id: string;
  category: FeatureCategoryId;
  title: LocalizedString;
  description: LocalizedString;
  icon: string;
  priceUSD: number;
  priceTND: number;
  priceEUR: number;
  priceGBP: number;
  priceCAD: number;
  recommendedFor?: ProjectTypeId[];
  active?: boolean;
}

export interface DesignLevelOption {
  id: DesignLevelId;
  title: LocalizedString;
  description: LocalizedString;
  multiplier: number; // e.g. 1.0, 1.25, 1.5
  badge?: LocalizedString;
}

export interface TimelineOption {
  id: TimelineId;
  title: LocalizedString;
  deliveryTime: LocalizedString;
  description: LocalizedString;
  multiplier: number; // e.g. 1.0, 1.2, 1.4
  badge?: LocalizedString;
}

export interface SupportLevelOption {
  id: SupportLevelId;
  title: LocalizedString;
  description: LocalizedString;
  priceUSD: number;
  priceTND: number;
  priceEUR: number;
  priceGBP: number;
  priceCAD: number;
}

export interface CalculatorState {
  currentStep: number;
  currency: Currency;
  geoInfo?: GeoDetectionInfo;
  projectType: ProjectTypeId | null;
  selectedFeatures: string[];
  pageCount: number;
  designLevel: DesignLevelId;
  timeline: TimelineId;
  supportLevel: SupportLevelId;
  clientInfo: {
    fullName: string;
    email: string;
    phone: string;
    company: string;
    websiteOrFigma: string;
    notes: string;
  };
}

export interface CostBreakdown {
  baseProjectPrice: number;
  extraPagesCount: number;
  extraPagesCost: number;
  featuresCost: number;
  designSurcharge: number;
  timelineSurcharge: number;
  supportCost: number;
  subtotal: number;
  total: number;
  currency: Currency;
}

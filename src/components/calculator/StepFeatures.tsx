import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, Filter, RotateCcw } from 'lucide-react';
import { Language } from '../../types';
import { FeatureCategoryId, Currency, ProjectTypeId } from '../../types/calculator';

import { useData } from '../../context/DataContext';
import { CalculatorIcon } from './CalculatorIcon';
import { formatPrice, getAmountInCurrency } from '../../utils/calculatorLogic';

interface StepFeaturesProps {
  selectedFeatures: string[];
  onToggleFeature: (featId: string) => void;
  onClearFeatures: () => void;
  projectType: ProjectTypeId | null;
  lang: Language;
  currency: Currency;
}

export const StepFeatures: React.FC<StepFeaturesProps> = ({
  selectedFeatures,
  onToggleFeature,
  onClearFeatures,
  projectType,
  lang,
  currency
}) => {
  const { calculatorConfig } = useData();
  const featuresList = calculatorConfig.features;
  const [activeCategory, setActiveCategory] = useState<FeatureCategoryId | 'all'>('all');

  const categories: { id: FeatureCategoryId | 'all'; label: Record<Language, string> }[] = [
    { id: 'all', label: { fr: 'Toutes', en: 'All', ar: 'الكل' } },
    { id: 'core', label: { fr: 'Essentielles', en: 'Core', ar: 'أساسية' } },
    { id: 'commerce', label: { fr: 'E-commerce & Vente', en: 'Commerce', ar: 'تجارة إلكترونية' } },
    { id: 'content', label: { fr: 'Contenu & CMS', en: 'Content & CMS', ar: 'محتوى و CMS' } },
    { id: 'marketing', label: { fr: 'Marketing & SEO', en: 'Marketing & SEO', ar: 'تسويق و SEO' } },
    { id: 'tech', label: { fr: 'Technique & Intégration', en: 'Tech & Integrations', ar: 'تقني وتكامل' } }
  ];

  const filteredFeatures = featuresList.filter((feat) => {
    if (activeCategory === 'all') return true;
    return feat.category === activeCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto space-y-6 sm:space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#02162B] border border-[#0a3d54] text-xs font-mono text-[#70ba65]">
          <span>{lang === 'fr' ? 'Étape 2 sur 5 • Modules & Options' : 'Step 2 of 5 • Modules & Add-ons'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          {lang === 'fr'
            ? 'Quelles fonctionnalités souhaitez-vous intégrer ?'
            : 'Which features do you need?'}
        </h2>
        <p className="text-sm sm:text-base text-[#919ca1] max-w-xl mx-auto">
          {lang === 'fr'
            ? 'Cochez les briques indispensables à votre activité. Le calcul du prix s’actualise en direct à chaque sélection.'
            : 'Select the building blocks you need. Your total price updates instantaneously with every option.'}
        </p>
      </div>

      {/* Category Filter Chips & Selection Counter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-[#0a3d54] pb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none w-full sm:w-auto py-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-[#70ba65] text-[#00151F] font-bold shadow-sm'
                  : 'bg-[#00283A] text-[#dedee0] hover:text-white border border-[#0a3d54]'
              }`}
            >
              {cat.label[lang]}
            </button>
          ))}
        </div>

        {selectedFeatures.length > 0 && (
          <div className="flex items-center gap-3 self-end sm:self-center">
            <span className="text-xs font-mono text-[#70ba65]">
              {selectedFeatures.length} {lang === 'fr' ? 'sélectionnée(s)' : 'selected'}
            </span>
            <button
              type="button"
              onClick={onClearFeatures}
              className="text-xs font-mono text-[#919ca1] hover:text-white flex items-center gap-1 hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{lang === 'fr' ? 'Réinitialiser' : 'Reset'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFeatures.map((feat) => {
          const isSelected = selectedFeatures.includes(feat.id);
          const isRecommended =
            projectType && feat.recommendedFor?.includes(projectType);
          const price = getAmountInCurrency(feat.priceEUR, feat.priceTND, currency);

          return (
            <div
              key={feat.id}
              onClick={() => onToggleFeature(feat.id)}
              className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between group select-none ${
                isSelected
                  ? 'bg-[#02162B] border-[#70ba65] shadow-[0_0_20px_rgba(112,186,101,0.15)] scale-[1.01]'
                  : 'bg-[#00283A] hover:bg-[#02162B] border-[#0a3d54] hover:border-[#70ba65]/50'
              }`}
            >
              {/* Recommended Badge */}
              {isRecommended && (
                <div className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full bg-[#70ba65]/20 border border-[#70ba65]/40 text-[#70ba65] text-[10px] font-mono font-bold uppercase tracking-wider">
                  {lang === 'fr' ? 'Conseillé pour votre projet' : 'Recommended for you'}
                </div>
              )}

              <div className="space-y-3">
                {/* Header: Icon & Checkbox */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#70ba65] text-[#00151F]'
                        : 'bg-[#02162B] border border-[#0a3d54] text-[#70ba65] group-hover:border-[#70ba65]/50'
                    }`}
                  >
                    <CalculatorIcon name={feat.icon} className="w-5 h-5" />
                  </div>

                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-[#70ba65] border-[#70ba65] text-[#00151F]'
                        : 'border-[#0a3d54] bg-[#00151F] text-transparent group-hover:border-[#70ba65]/50'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#70ba65] transition-colors leading-snug">
                  {feat.title[lang]}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#919ca1] leading-relaxed">
                  {feat.description[lang]}
                </p>
              </div>

              {/* Bottom Price Tag */}
              <div className="pt-3 mt-3 border-t border-[#0a3d54]/60 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-[#919ca1]">
                  {lang === 'fr' ? 'Option' : 'Add-on'}
                </span>
                <span className="font-mono font-bold text-[#70ba65]">
                  +{formatPrice(price, currency)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

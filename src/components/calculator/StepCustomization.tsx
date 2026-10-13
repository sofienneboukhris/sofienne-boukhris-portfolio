import React from 'react';
import { motion } from 'motion/react';
import { Check, Layers, Palette, Clock, Award, Plus, Minus } from 'lucide-react';
import { Language } from '../../types';
import {
  DesignLevelId,
  TimelineId,
  SupportLevelId,
  Currency,
  ProjectTypeId
} from '../../types/calculator';
import { useData } from '../../context/DataContext';
import {
  formatPrice,
  getExtraPagePrice,
  getAmountInCurrency
} from '../../utils/calculatorLogic';

interface StepCustomizationProps {
  pageCount: number;
  onPageCountChange: (count: number) => void;
  designLevel: DesignLevelId;
  onDesignLevelChange: (level: DesignLevelId) => void;
  timeline: TimelineId;
  onTimelineChange: (tl: TimelineId) => void;
  supportLevel: SupportLevelId;
  onSupportLevelChange: (s: SupportLevelId) => void;
  projectType: ProjectTypeId | null;
  lang: Language;
  currency: Currency;
}

export const StepCustomization: React.FC<StepCustomizationProps> = ({

  pageCount,
  onPageCountChange,
  designLevel,
  onDesignLevelChange,
  timeline,
  onTimelineChange,
  supportLevel,
  onSupportLevelChange,
  projectType,
  lang,
  currency
}) => {
  const { calculatorConfig } = useData();
  const DESIGN_LEVELS = calculatorConfig.designLevels;
  const TIMELINES = calculatorConfig.timelines;
  const SUPPORT_LEVELS = calculatorConfig.supportLevels;
  const PROJECT_TYPES = calculatorConfig.projectTypes;

  const currentProjectType = PROJECT_TYPES.find((p) => p.id === projectType);
  const basePages = currentProjectType?.basePages ?? 5;
  const extraPages = Math.max(0, pageCount - basePages);
  const costPerPage = getExtraPagePrice(currency, calculatorConfig.pricePerExtraPageEUR, calculatorConfig.pricePerExtraPageTND);
  const extraPagesCost = extraPages * costPerPage;

  const pagePresets = [
    { label: '1 p.', value: 1 },
    { label: '5 p.', value: 5 },
    { label: '8 p.', value: 8 },
    { label: '12 p.', value: 12 },
    { label: '20 p.', value: 20 },
    { label: '30 p.', value: 30 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto space-y-8 sm:space-y-10"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#02162B] border border-[#0a3d54] text-xs font-mono text-[#70ba65]">
          <span>{lang === 'fr' ? 'Étape 3 sur 5 • Calibrage' : 'Step 3 of 5 • Parameters'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          {lang === 'fr'
            ? 'Personnalisation & Paramètres du projet'
            : 'Customization & Project Specifications'}
        </h2>
        <p className="text-sm sm:text-base text-[#919ca1] max-w-xl mx-auto">
          {lang === 'fr'
            ? 'Ajustez le volume de pages, l’exigence visuelle et le rythme de livraison pour coller au plus près à votre calendrier.'
            : 'Adjust page volume, visual polish, and delivery deadlines to match your launch schedule.'}
        </p>
      </div>

      {/* 1. Page Count Stepper & Slider */}
      <div className="p-6 rounded-2xl bg-[#00283A] border border-[#0a3d54] space-y-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#02162B] border border-[#0a3d54] flex items-center justify-center text-[#70ba65]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {lang === 'fr' ? 'Volume estimé de pages' : 'Estimated Page Volume'}
              </h3>
              <p className="text-xs text-[#919ca1]">
                {lang === 'fr'
                  ? `Votre type de projet inclut ${basePages} pages de base.`
                  : `Your project type includes ${basePages} base pages.`}
              </p>
            </div>
          </div>

          {/* Stepper Display */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            <button
              type="button"
              onClick={() => onPageCountChange(Math.max(1, pageCount - 1))}
              disabled={pageCount <= 1}
              className="w-9 h-9 rounded-lg bg-[#02162B] border border-[#0a3d54] text-[#dedee0] hover:text-white hover:border-[#70ba65]/50 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>

            <div className="w-20 text-center py-1.5 px-3 rounded-lg bg-[#00151F] border border-[#0a3d54] font-mono font-bold text-lg text-white">
              {pageCount} <span className="text-xs text-[#919ca1]">{lang === 'fr' ? 'p.' : 'pg.'}</span>
            </div>

            <button
              type="button"
              onClick={() => onPageCountChange(Math.min(50, pageCount + 1))}
              disabled={pageCount >= 50}
              className="w-9 h-9 rounded-lg bg-[#02162B] border border-[#0a3d54] text-[#dedee0] hover:text-white hover:border-[#70ba65]/50 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min={1}
            max={35}
            value={pageCount}
            onChange={(e) => onPageCountChange(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-[#00151F] rounded-lg appearance-none cursor-pointer accent-[#70ba65]"
          />
          <div className="flex justify-between text-[11px] font-mono text-[#919ca1]">
            <span>1 {lang === 'fr' ? 'page' : 'page'}</span>
            <span>10 pages</span>
            <span>20 pages</span>
            <span>35+ pages</span>
          </div>
        </div>

        {/* Preset chips & Extra cost breakdown */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#0a3d54]/60 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-mono text-[#919ca1] mr-1">
              {lang === 'fr' ? 'Raccourcis :' : 'Presets :'}
            </span>
            {pagePresets.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => onPageCountChange(preset.value)}
                className={`px-2.5 py-1 rounded-md font-mono text-[11px] transition-colors cursor-pointer ${
                  pageCount === preset.value
                    ? 'bg-[#70ba65] text-[#00151F] font-bold'
                    : 'bg-[#02162B] text-[#dedee0] border border-[#0a3d54] hover:text-white hover:border-[#70ba65]/40'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className="font-mono text-xs">
            {extraPages > 0 ? (
              <span className="text-[#70ba65]">
                +{extraPages} {lang === 'fr' ? 'page(s) extra' : 'extra page(s)'} : +
                {formatPrice(extraPagesCost, currency)}
              </span>
            ) : (
              <span className="text-[#919ca1]">
                {lang === 'fr' ? 'Inclus dans la base du projet' : 'Included in base package'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Design Level Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#70ba65]" />
          <h3 className="text-base sm:text-lg font-bold text-white">
            {lang === 'fr' ? 'Niveau d’exigence graphique & UI/UX' : 'UI/UX Design Polish Level'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DESIGN_LEVELS.map((level) => {
            const isSelected = designLevel === level.id;

            return (
              <div
                key={level.id}
                onClick={() => onDesignLevelChange(level.id)}
                className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-[#02162B] border-[#70ba65] shadow-[0_0_20px_rgba(112,186,101,0.15)] scale-[1.01]'
                    : 'bg-[#00283A] hover:bg-[#02162B] border-[#0a3d54] hover:border-[#70ba65]/50'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-[#70ba65] text-[#00151F]'
                          : 'bg-[#00151F] text-[#70ba65] border border-[#0a3d54]'
                      }`}
                    >
                      {level.badge?.[lang] || 'Option'}
                    </span>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                        isSelected
                          ? 'bg-[#70ba65] border-[#70ba65] text-[#00151F]'
                          : 'border-[#0a3d54] bg-[#00151F] text-transparent group-hover:border-[#70ba65]/50'
                      }`}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#70ba65] transition-colors">
                    {level.title[lang]}
                  </h4>

                  <p className="text-xs text-[#919ca1] leading-relaxed">
                    {level.description[lang]}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#0a3d54]/60 text-right">
                  <span className="text-xs font-mono text-[#dedee0]">
                    {level.multiplier === 1
                      ? lang === 'fr'
                        ? 'Base incluse'
                        : 'Base included'
                      : `+${Math.round((level.multiplier - 1) * 100)}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Timeline & Delivery Speed */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#70ba65]" />
          <h3 className="text-base sm:text-lg font-bold text-white">
            {lang === 'fr' ? 'Rythme de livraison souhaité' : 'Desired Delivery Timeline'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TIMELINES.map((item) => {
            const isSelected = timeline === item.id;

            return (
              <div
                key={item.id}
                onClick={() => onTimelineChange(item.id)}
                className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-[#02162B] border-[#70ba65] shadow-[0_0_20px_rgba(112,186,101,0.15)] scale-[1.01]'
                    : 'bg-[#00283A] hover:bg-[#02162B] border-[#0a3d54] hover:border-[#70ba65]/50'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-[#70ba65] text-[#00151F]'
                          : 'bg-[#00151F] text-[#70ba65] border border-[#0a3d54]'
                      }`}
                    >
                      {item.deliveryTime[lang]}
                    </span>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                        isSelected
                          ? 'bg-[#70ba65] border-[#70ba65] text-[#00151F]'
                          : 'border-[#0a3d54] bg-[#00151F] text-transparent group-hover:border-[#70ba65]/50'
                      }`}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#70ba65] transition-colors">
                    {item.title[lang]}
                  </h4>

                  <p className="text-xs text-[#919ca1] leading-relaxed">
                    {item.description[lang]}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#0a3d54]/60 text-right">
                  <span className="text-xs font-mono text-[#dedee0]">
                    {item.multiplier === 1
                      ? lang === 'fr'
                        ? 'Délai standard'
                        : 'Standard delivery'
                      : `+${Math.round((item.multiplier - 1) * 100)}% sprint`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Support & Training */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#70ba65]" />
          <h3 className="text-base sm:text-lg font-bold text-white">
            {lang === 'fr' ? 'Accompagnement, formation & support' : 'Handover, Training & Support'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SUPPORT_LEVELS.map((sup) => {
            const isSelected = supportLevel === sup.id;
            const price = getAmountInCurrency(sup.priceEUR, sup.priceTND, currency);

            return (
              <div
                key={sup.id}
                onClick={() => onSupportLevelChange(sup.id)}
                className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-[#02162B] border-[#70ba65] shadow-[0_0_20px_rgba(112,186,101,0.15)] scale-[1.01]'
                    : 'bg-[#00283A] hover:bg-[#02162B] border-[#0a3d54] hover:border-[#70ba65]/50'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-[#70ba65] text-[#00151F]'
                          : 'bg-[#00151F] text-[#70ba65] border border-[#0a3d54]'
                      }`}
                    >
                      {price === 0
                        ? lang === 'fr'
                          ? 'Inclus'
                          : 'Included'
                        : `+${formatPrice(price, currency)}`}
                    </span>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                        isSelected
                          ? 'bg-[#70ba65] border-[#70ba65] text-[#00151F]'
                          : 'border-[#0a3d54] bg-[#00151F] text-transparent group-hover:border-[#70ba65]/50'
                      }`}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#70ba65] transition-colors">
                    {sup.title[lang]}
                  </h4>

                  <p className="text-xs text-[#919ca1] leading-relaxed">
                    {sup.description[lang]}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#0a3d54]/60 text-right">
                  <span className="text-xs font-mono text-[#dedee0]">
                    {price === 0
                      ? lang === 'fr'
                        ? 'Sans supplément'
                        : 'No extra charge'
                      : `+${formatPrice(price, currency)}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

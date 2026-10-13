import React from 'react';
import { Check } from 'lucide-react';
import { Language } from '../../types';
import { Currency, GeoDetectionInfo } from '../../types/calculator';
import { getCurrencyConfig } from '../../utils/geoCurrency';
import { useGlobalCurrency } from '../../context/CurrencyContext';

interface CalculatorProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  lang: Language;
  currency: Currency;
  geoInfo?: GeoDetectionInfo;
}

export const CalculatorProgressBar: React.FC<CalculatorProgressBarProps> = ({
  currentStep,
  totalSteps,
  onStepClick,
  lang,
  currency
}) => {
  const { currency: globalCurrency } = useGlobalCurrency();
  const activeCfg = getCurrencyConfig(globalCurrency || currency);

  // Step definitions (excluding step 0: intro)
  const steps = [
    { num: 1, label: lang === 'fr' ? 'Type' : 'Type' },
    { num: 2, label: lang === 'fr' ? 'Options' : 'Features' },
    { num: 3, label: lang === 'fr' ? 'Personnalisation' : 'Customization' },
    { num: 4, label: lang === 'fr' ? 'Récapitulatif' : 'Summary' },
    { num: 5, label: lang === 'fr' ? 'Devis' : 'Quote' }
  ];

  const progressPercent = Math.min(
    100,
    Math.max(0, (currentStep / (totalSteps - 1)) * 100)
  );

  return (
    <div className="w-full bg-[#00283A] border-b border-[#0a3d54] py-2.5 sm:py-3 px-4 sm:px-6 sticky top-[65px] z-30 shadow-md backdrop-blur-md bg-[#00283A]/95">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Step indicator badges */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
          {steps.map((s) => {
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            const isClickable = currentStep > s.num;

            return (
              <button
                key={s.num}
                type="button"
                disabled={!isClickable}
                onClick={() => onStepClick(s.num)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
                  isCurrent
                    ? 'bg-[#70ba65] text-[#00151F] font-bold shadow-md shadow-[#70ba65]/20 scale-105'
                    : isCompleted
                    ? 'bg-[#02162B] text-[#70ba65] border border-[#70ba65]/30 hover:bg-[#70ba65]/10 cursor-pointer'
                    : 'bg-[#00151F] text-[#919ca1] border border-[#0a3d54] opacity-70 cursor-not-allowed'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    isCurrent
                      ? 'bg-[#00151F] text-[#70ba65]'
                      : isCompleted
                      ? 'bg-[#70ba65]/20 text-[#70ba65]'
                      : 'bg-[#02162B] text-[#919ca1]'
                  }`}
                >
                  {isCompleted ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : s.num}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Automatically detected local currency badge (read-only) */}
        <div className="flex items-center gap-2 shrink-0 ml-auto">
          <div
            title={lang === 'fr' ? `Devise locale détectée : ${activeCfg.name[lang]}` : `Detected local currency: ${activeCfg.name[lang]}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#00151F] border border-[#0a3d54] text-xs font-mono text-white shadow-sm"
          >
            <span className="text-sm">{activeCfg.flag}</span>
            <span className="font-bold text-white">{activeCfg.code}</span>
            <span className="text-[11px] text-[#70ba65]">({activeCfg.symbol})</span>
          </div>
        </div>
      </div>

      {/* Visual progress bar line */}
      <div className="max-w-5xl mx-auto mt-2 sm:mt-2.5 w-full bg-[#00151F] h-1 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#70ba65]/70 to-[#70ba65] h-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

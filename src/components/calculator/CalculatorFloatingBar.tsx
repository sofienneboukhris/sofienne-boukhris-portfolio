import React from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';
import { Language } from '../../types';
import { Currency } from '../../types/calculator';
import { formatPrice, getDualPriceEstimate } from '../../utils/calculatorLogic';

interface CalculatorFloatingBarProps {
  currentStep: number;
  totalSteps: number;
  totalPrice: number;
  currency: Currency;
  projectTypeName?: string;
  pageCount: number;
  featuresCount: number;
  onBack: () => void;
  onNext: () => void;
  canProceed: boolean;
  lang: Language;
}

export const CalculatorFloatingBar: React.FC<CalculatorFloatingBarProps> = ({
  currentStep,
  totalSteps,
  totalPrice,
  currency,
  projectTypeName,
  pageCount,
  featuresCount,
  onBack,
  onNext,
  canProceed,
  lang
}) => {
  if (currentStep === 0 || currentStep >= totalSteps) {
    return null;
  }

  const dual = getDualPriceEstimate(totalPrice, currency);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#00283A]/95 border-t border-[#0a3d54] backdrop-blur-lg shadow-[0_-10px_30px_rgba(0,0,0,0.5)] px-4 sm:px-6 py-3 sm:py-3.5">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Summary & Live Price */}
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#919ca1] uppercase tracking-wider">
              <span>{lang === 'fr' ? 'Estimation actuelle' : 'Current estimate'}</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[#70ba65]">
                <ShieldCheck className="w-3 h-3" />
                {lang === 'fr' ? 'Sans engagement' : 'No obligation'}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold font-mono text-[#70ba65] tracking-tight">
                {formatPrice(totalPrice, currency)}
              </span>
              <span className="text-xs font-mono text-[#919ca1] hidden md:inline">
                (≈ {dual.secondary})
              </span>
            </div>
          </div>

          {/* Quick specs pills (desktop) */}
          {projectTypeName && (
            <div className="hidden lg:flex items-center gap-2 border-l border-[#0a3d54] pl-6 text-xs text-[#dedee0]">
              <span className="px-2 py-0.5 rounded bg-[#02162B] border border-[#0a3d54] font-medium text-[#70ba65]">
                {projectTypeName}
              </span>
              <span className="text-[#919ca1]">•</span>
              <span className="font-mono text-[#dedee0]">
                {pageCount} {pageCount > 1 ? (lang === 'fr' ? 'pages' : 'pages') : 'page'}
              </span>
              {featuresCount > 0 && (
                <>
                  <span className="text-[#919ca1]">•</span>
                  <span className="font-mono text-[#919ca1]">
                    {featuresCount} {lang === 'fr' ? 'option(s)' : 'option(s)'}
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Right: Navigation Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-xl bg-[#02162B] border border-[#0a3d54] text-xs sm:text-sm font-medium text-[#dedee0] hover:text-white hover:border-[#70ba65]/50 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{lang === 'fr' ? 'Précédent' : 'Back'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onNext}
            disabled={!canProceed}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg cursor-pointer ${
              canProceed
                ? 'bg-[#70ba65] text-[#00151F] hover:bg-[#86efac] hover:shadow-[#70ba65]/20 hover:scale-[1.02]'
                : 'bg-[#0a3d54]/60 text-[#919ca1] cursor-not-allowed border border-[#0a3d54]'
            }`}
          >
            <span>
              {currentStep === 4
                ? lang === 'fr'
                  ? 'Recevoir mon devis'
                  : 'Get Official Quote'
                : lang === 'fr'
                ? 'Continuer'
                : 'Next Step'}
            </span>
            {currentStep === 4 ? (
              <ArrowRight className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

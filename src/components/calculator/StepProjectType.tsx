import React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, Layers } from 'lucide-react';
import { Language } from '../../types';
import { ProjectTypeId, Currency } from '../../types/calculator';

import { useData } from '../../context/DataContext';
import { CalculatorIcon } from './CalculatorIcon';
import { formatPrice, getAmountInCurrency } from '../../utils/calculatorLogic';

interface StepProjectTypeProps {
  selectedType: ProjectTypeId | null;
  onSelect: (typeId: ProjectTypeId) => void;
  lang: Language;
  currency: Currency;
}

export const StepProjectType: React.FC<StepProjectTypeProps> = ({
  selectedType,
  onSelect,
  lang,
  currency
}) => {
  const { calculatorConfig } = useData();
  const projectTypesList = calculatorConfig.projectTypes;

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
          <span>{lang === 'fr' ? 'Étape 1 sur 5 • Structure' : 'Step 1 of 5 • Architecture'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          {lang === 'fr'
            ? 'Quel type de projet souhaitez-vous concevoir ?'
            : 'What type of project are you building?'}
        </h2>
        <p className="text-sm sm:text-base text-[#919ca1] max-w-xl mx-auto">
          {lang === 'fr'
            ? 'Choisissez la fondation technique adaptée à vos ambitions. Vous pourrez personnaliser le nombre de pages et les options lors des étapes suivantes.'
            : 'Select the foundation that matches your goals. You can fine-tune pages and features in the upcoming steps.'}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectTypesList.map((type) => {
          const isSelected = selectedType === type.id;
          const basePrice = getAmountInCurrency(
            0, 0,
            currency
          );

          return (
            <div
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={`relative p-5 sm:p-6 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between group ${
                isSelected
                  ? 'bg-[#02162B] border-[#70ba65] shadow-[0_0_25px_rgba(112,186,101,0.18)] scale-[1.01]'
                  : 'bg-[#00283A] hover:bg-[#02162B] border-[#0a3d54] hover:border-[#70ba65]/50'
              }`}
            >
              {/* Popular / Recommended Tag */}
              {type.popular && (
                <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#70ba65] text-[#00151F] text-[10px] font-mono font-bold uppercase tracking-wider shadow">
                  {lang === 'fr' ? 'Populaire' : 'Popular'}
                </div>
              )}

              <div className="space-y-4">
                {/* Top bar: Icon & Check indicator */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#70ba65] text-[#00151F]'
                        : 'bg-[#02162B] border border-[#0a3d54] text-[#70ba65] group-hover:border-[#70ba65]/50'
                    }`}
                  >
                    <CalculatorIcon name={type.icon} className="w-6 h-6" />
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-[#70ba65] border-[#70ba65] text-[#00151F]'
                        : 'border-[#0a3d54] bg-[#00151F] text-transparent group-hover:border-[#70ba65]/50'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#70ba65] transition-colors leading-snug">
                    {type.title[lang]}
                  </h3>
                  <p className="text-xs font-mono text-[#70ba65] mt-0.5">
                    {type.subtitle[lang]}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#919ca1] leading-relaxed">
                  {type.description[lang]}
                </p>
              </div>

              {/* Bottom footer: Base pages & Starting price */}
              <div className="pt-4 mt-4 border-t border-[#0a3d54]/60 flex items-center justify-between text-xs">
                <div className="inline-flex items-center gap-1 font-mono text-[#919ca1]">
                  <Layers className="w-3.5 h-3.5 text-[#70ba65]" />
                  <span>
                    {type.basePages} {lang === 'fr' ? 'pages incluses' : 'pages included'}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#919ca1] block">
                    {lang === 'fr' ? 'Dès' : 'From'}
                  </span>
                  <span className="text-sm sm:text-base font-bold font-mono text-white">
                    {formatPrice(basePrice, currency)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

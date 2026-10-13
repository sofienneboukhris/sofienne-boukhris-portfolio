import React from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  Edit3,
  ShieldCheck,
  ArrowRight,
  FileSpreadsheet,
  Layers,
  Palette,
  Clock,
  Award,
  Sparkles,
  HelpCircle,
  Eye
} from 'lucide-react';
import { Language } from '../../types';
import { CalculatorState, CostBreakdown } from '../../types/calculator';

import { useData } from '../../context/DataContext';
import {
  formatPrice,
  getDualPriceEstimate,
  getAmountInCurrency
} from '../../utils/calculatorLogic';
import { CalculatorIcon } from './CalculatorIcon';

interface StepSummaryProps {
  state: CalculatorState;
  breakdown: CostBreakdown;
  onEditStep: (stepNumber: number) => void;
  onProceedToContact: () => void;
  onOpenModal?: () => void;
  lang: Language;
}

export const StepSummary: React.FC<StepSummaryProps> = ({

  state,
  breakdown,
  onEditStep,
  onProceedToContact,
  onOpenModal,
  lang
}) => {
  const { calculatorConfig } = useData();
  const DESIGN_LEVELS = calculatorConfig.designLevels;
  const TIMELINES = calculatorConfig.timelines;
  const SUPPORT_LEVELS = calculatorConfig.supportLevels;

    const projectTypesList = calculatorConfig.projectTypes;
  const featuresList = calculatorConfig.features;

  const projectType = projectTypesList.find((p) => p.id === state.projectType);
  const designOption = DESIGN_LEVELS.find((d) => d.id === state.designLevel);
  const timelineOption = TIMELINES.find((t) => t.id === state.timeline);
  const supportOption = SUPPORT_LEVELS.find((s) => s.id === state.supportLevel);

  const selectedFeatureObjects = featuresList.filter((f) =>
    state.selectedFeatures.includes(f.id)
  );

  const dual = getDualPriceEstimate(breakdown.total, state.currency);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#02162B] border border-[#0a3d54] text-xs font-mono text-[#70ba65]">
          <span>{lang === 'fr' ? 'Étape 4 sur 5 • Synthèse' : 'Step 4 of 5 • Review'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          {lang === 'fr'
            ? 'Récapitulatif de votre estimation de projet'
            : 'Detailed Project Estimate Summary'}
        </h2>
        <p className="text-sm sm:text-base text-[#919ca1] max-w-xl mx-auto">
          {lang === 'fr'
            ? 'Passez en revue l’ensemble des caractéristiques sélectionnées. Tout est modifiable avant de générer votre devis.'
            : 'Review the full breakdown of your configured project. Every detail can be adjusted before requesting your quote.'}
        </p>
      </div>

      {/* Project Overview Card */}
      <div className="p-6 rounded-2xl bg-[#00283A] border border-[#0a3d54] shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0a3d54]/70 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#02162B] border border-[#0a3d54] flex items-center justify-center text-[#70ba65]">
              <CalculatorIcon name={projectType?.icon || 'Globe'} className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-[#70ba65] uppercase tracking-wider block">
                {lang === 'fr' ? 'Base projet sélectionnée' : 'Selected Project Base'}
              </span>
              <h3 className="text-xl font-bold text-white">
                {projectType?.title[lang]}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#02162B] border border-[#0a3d54] text-xs font-mono text-[#919ca1] hover:text-[#70ba65] hover:border-[#70ba65]/40 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Changer de type' : 'Change type'}</span>
          </button>
        </div>

        {/* 4 Summary Specs Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-[#02162B] border border-[#0a3d54]/50">
            <span className="text-[10px] font-mono text-[#919ca1] block">
              {lang === 'fr' ? 'Volume' : 'Volume'}
            </span>
            <span className="text-sm font-bold text-white flex items-center gap-1 mt-0.5">
              <Layers className="w-3.5 h-3.5 text-[#70ba65]" />
              {state.pageCount} {lang === 'fr' ? 'pages' : 'pages'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#02162B] border border-[#0a3d54]/50">
            <span className="text-[10px] font-mono text-[#919ca1] block">
              {lang === 'fr' ? 'Design' : 'Design'}
            </span>
            <span className="text-sm font-bold text-white flex items-center gap-1 mt-0.5 truncate">
              <Palette className="w-3.5 h-3.5 text-[#70ba65] shrink-0" />
              <span className="truncate">{designOption?.title[lang]}</span>
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#02162B] border border-[#0a3d54]/50">
            <span className="text-[10px] font-mono text-[#919ca1] block">
              {lang === 'fr' ? 'Délai' : 'Timeline'}
            </span>
            <span className="text-sm font-bold text-white flex items-center gap-1 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-[#70ba65]" />
              {timelineOption?.deliveryTime[lang]}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#02162B] border border-[#0a3d54]/50">
            <span className="text-[10px] font-mono text-[#919ca1] block">
              {lang === 'fr' ? 'Formation' : 'Training'}
            </span>
            <span className="text-sm font-bold text-white flex items-center gap-1 mt-0.5 truncate">
              <Award className="w-3.5 h-3.5 text-[#70ba65] shrink-0" />
              <span className="truncate">{supportOption?.title[lang]}</span>
            </span>
          </div>
        </div>

        {/* Selected Features Chips */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#919ca1] uppercase tracking-wider">
              {lang === 'fr' ? 'Options & fonctionnalités incluses :' : 'Included features & modules :'} (
              {selectedFeatureObjects.length})
            </span>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="text-xs font-mono text-[#70ba65] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3 h-3" />
              <span>{lang === 'fr' ? 'Modifier' : 'Edit'}</span>
            </button>
          </div>

          {selectedFeatureObjects.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedFeatureObjects.map((feat) => (
                <div
                  key={feat.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00151F] border border-[#0a3d54] text-xs text-[#dedee0]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#70ba65]" />
                  <span>{feat.title[lang]}</span>
                  <span className="text-[11px] font-mono text-[#919ca1] ml-1">
                    (+{formatPrice(getAmountInCurrency(feat.priceEUR, feat.priceTND, state.currency), state.currency)})
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#919ca1] italic">
              {lang === 'fr'
                ? 'Aucun module additionnel sélectionné (uniquement le socle de base).'
                : 'No optional modules selected (base project foundation only).'}
            </p>
          )}
        </div>
      </div>

      {/* Itemized Cost Breakdown Table */}
      <div className="p-6 rounded-2xl bg-[#00283A] border border-[#0a3d54] space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#0a3d54]/70 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-[#70ba65]" />
            <span>{lang === 'fr' ? 'Ventilation détaillée des coûts' : 'Cost Breakdown'}</span>
          </h3>
          <button
            type="button"
            onClick={() => onEditStep(3)}
            className="text-xs font-mono text-[#70ba65] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Edit3 className="w-3 h-3" />
            <span>{lang === 'fr' ? 'Ajuster paramètres' : 'Adjust parameters'}</span>
          </button>
        </div>

        <div className="space-y-2.5 text-xs sm:text-sm font-mono">
          {/* Base Project */}
          <div className="flex justify-between items-center py-1">
            <span className="text-[#dedee0]">
              {lang === 'fr' ? 'Base technique' : 'Technical foundation'} : {projectType?.title[lang]} ({projectType?.basePages} {lang === 'fr' ? 'pages incl.' : 'pages inc.'})
            </span>
            <span className="text-white font-bold">
              {formatPrice(breakdown.baseProjectPrice, state.currency)}
            </span>
          </div>

          {/* Extra pages */}
          {breakdown.extraPagesCount > 0 && (
            <div className="flex justify-between items-center py-1">
              <span className="text-[#dedee0]">
                {breakdown.extraPagesCount} {lang === 'fr' ? 'page(s) supplémentaire(s)' : 'extra page(s)'}
              </span>
              <span className="text-white font-bold">
                +{formatPrice(breakdown.extraPagesCost, state.currency)}
              </span>
            </div>
          )}

          {/* Features */}
          {breakdown.featuresCost > 0 && (
            <div className="flex justify-between items-center py-1">
              <span className="text-[#dedee0]">
                {selectedFeatureObjects.length} {lang === 'fr' ? 'fonctionnalité(s) additionnelle(s)' : 'extra feature(s)'}
              </span>
              <span className="text-white font-bold">
                +{formatPrice(breakdown.featuresCost, state.currency)}
              </span>
            </div>
          )}

          {/* Design Tier */}
          {breakdown.designSurcharge > 0 && (
            <div className="flex justify-between items-center py-1">
              <span className="text-[#dedee0]">
                {lang === 'fr' ? 'Personnalisation graphique' : 'Design tier'} : {designOption?.title[lang]}
              </span>
              <span className="text-white font-bold">
                +{formatPrice(breakdown.designSurcharge, state.currency)}
              </span>
            </div>
          )}

          {/* Timeline Sprint */}
          {breakdown.timelineSurcharge > 0 && (
            <div className="flex justify-between items-center py-1">
              <span className="text-[#dedee0]">
                {lang === 'fr' ? 'Sprint livraison' : 'Sprint delivery'} : {timelineOption?.title[lang]}
              </span>
              <span className="text-white font-bold">
                +{formatPrice(breakdown.timelineSurcharge, state.currency)}
              </span>
            </div>
          )}

          {/* Support */}
          {breakdown.supportCost > 0 && (
            <div className="flex justify-between items-center py-1">
              <span className="text-[#dedee0]">
                {lang === 'fr' ? 'Accompagnement & formation' : 'Support & training'} : {supportOption?.title[lang]}
              </span>
              <span className="text-white font-bold">
                +{formatPrice(breakdown.supportCost, state.currency)}
              </span>
            </div>
          )}
        </div>

        {/* Total Highlight Bar */}
        <div className="pt-4 border-t-2 border-[#70ba65]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#02162B] p-4 rounded-xl">
          <div>
            <span className="text-xs font-mono text-[#919ca1] uppercase tracking-wider block">
              {lang === 'fr' ? 'Montant estimatif total' : 'Total Estimated Budget'}
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-4xl font-bold font-mono text-[#70ba65] tracking-tight">
                {formatPrice(breakdown.total, state.currency)}
              </span>
              <span className="text-xs sm:text-sm font-mono text-[#919ca1]">
                (≈ {dual.secondary})
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-mono text-[#919ca1] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#70ba65]" />
              {lang === 'fr' ? 'Prix indicatif hors taxes' : 'Indicative net price'}
            </span>
          </div>
        </div>
      </div>

      {/* Reassurance Notice */}
      <div className="p-4 rounded-xl bg-[#02162B]/70 border border-[#0a3d54] text-xs text-[#919ca1] flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-[#70ba65] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {lang === 'fr'
            ? 'Cette simulation constitue une première estimation transparente. Lors de notre échange, un devis formel et contractuel reprenant le calendrier précis et vos spécificités vous sera remis gratuitement.'
            : 'This estimate offers a clear preliminary calculation. Following our initial discussion, you will receive an official contractual quote matching your exact timeline and requirements.'}
        </p>
      </div>

      {/* Action Buttons to Modal or Step 5 */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        {onOpenModal && (
          <button
            type="button"
            onClick={onOpenModal}
            id="calculator-summary-modal-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#02162B] text-white border border-[#0a3d54] hover:border-[#70ba65] font-mono text-sm sm:text-base hover:bg-[#00283A] transition-all cursor-pointer shadow-lg"
          >
            <Eye className="w-5 h-5 text-[#70ba65]" />
            <span>{lang === 'fr' ? 'Afficher la synthèse en popup' : 'View Summary in Modal'}</span>
          </button>
        )}

        <button
          type="button"
          onClick={onProceedToContact}
          id="calculator-summary-proceed-btn"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#70ba65] text-[#00151F] font-bold text-sm sm:text-base hover:bg-[#86efac] hover:shadow-[0_0_30px_rgba(112,186,101,0.35)] hover:scale-[1.02] transition-all cursor-pointer shadow-xl group"
        >
          <span>{lang === 'fr' ? 'Finaliser et recevoir mon devis' : 'Finalize & Request My Quote'}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

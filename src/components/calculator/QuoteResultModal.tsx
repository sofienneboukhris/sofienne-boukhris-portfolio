import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  Copy,
  Check,
  Send,
  Printer,
  ShieldCheck,
  Layers,
  Palette,
  Clock,
  Award,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Language } from '../../types';
import { CalculatorState, CostBreakdown } from '../../types/calculator';

import { useData } from '../../context/DataContext';
import {
  formatPrice,
  getDualPriceEstimate,
  getAmountInCurrency
} from '../../utils/calculatorLogic';
import { getCurrencyConfig } from '../../utils/geoCurrency';
import { CalculatorIcon } from './CalculatorIcon';

interface QuoteResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: CalculatorState;
  breakdown: CostBreakdown;
  lang: Language;
  onProceedToContact?: () => void;
}

export const QuoteResultModal: React.FC<QuoteResultModalProps> = ({

  isOpen,
  onClose,
  state,
  breakdown,
  lang,
  onProceedToContact
}) => {
  const { calculatorConfig } = useData();
  const DESIGN_LEVELS = calculatorConfig.designLevels;
  const TIMELINES = calculatorConfig.timelines;
  const SUPPORT_LEVELS = calculatorConfig.supportLevels;

    const projectTypesList = calculatorConfig.projectTypes;
  const featuresList = calculatorConfig.features;

  const [copied, setCopied] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const projectType = projectTypesList.find((p) => p.id === state.projectType);
  const designOption = DESIGN_LEVELS.find((d) => d.id === state.designLevel);
  const timelineOption = TIMELINES.find((t) => t.id === state.timeline);
  const supportOption = SUPPORT_LEVELS.find((s) => s.id === state.supportLevel);
  const selectedFeatureObjects = featuresList.filter((f) =>
    state.selectedFeatures.includes(f.id)
  );

  const currencyConfig = getCurrencyConfig(state.currency);
  const dual = getDualPriceEstimate(breakdown.total, state.currency);

  // Generate plain-text quote for copy or WhatsApp
  const generateTextSummary = () => {
    const lines = [
      `📋 DEVIS ESTIMATIF EN LIGNE - SOFIENNE BOUKHRIS`,
      `---------------------------------------------`,
      `Type de projet : ${projectType?.title[lang] || 'Site Web'}`,
      `Volume : ${state.pageCount} page(s)`,
      `Design & UI : ${designOption?.title[lang] || 'Standard'}`,
      `Délai souhaité : ${timelineOption?.title[lang] || 'Standard'} (${timelineOption?.deliveryTime[lang] || ''})`,
      `Formation/Support : ${supportOption?.title[lang] || 'Inclus'}`,
      ``,
      `Fonctionnalités incluses (${selectedFeatureObjects.length}) :`,
      ...selectedFeatureObjects.map(
        (f) =>
          `- ${f.title[lang]} (+${formatPrice(
            getAmountInCurrency(f.priceEUR, f.priceTND, state.currency),
            state.currency
          )})`
      ),
      ``,
      `MONTANT TOTAL ESTIMÉ : ${formatPrice(breakdown.total, state.currency)}`,
      `Devise locale détectée : ${currencyConfig.flag} ${currencyConfig.name[lang]}`,
      `---------------------------------------------`,
      `Garanties : Code source 100% propriétaire, optimisation SEO & Core Web Vitals, garantie 30 jours.`
    ];
    return lines.join('\n');
  };

  const handleCopyQuote = async () => {
    try {
      await navigator.clipboard.writeText(generateTextSummary());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API restricted
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `Bonjour Sofienne, j'ai simulé mon projet sur votre calculateur :\n\n` +
      `• Projet : ${projectType?.title[lang] || 'Projet Web'}\n` +
      `• Volume : ${state.pageCount} pages\n` +
      `• Budget estimé : ${formatPrice(breakdown.total, state.currency)}\n\n` +
      `Pouvons-nous en discuter ?`
  );

  return (
    <AnimatePresence>
      <div
        id="quote-result-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
      >
        {/* Blurred Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#000d14]/80 backdrop-blur-md transition-opacity cursor-pointer"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl bg-[#001E2B] border border-[#0a3d54] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh] text-[#dedee0]"
        >
          {/* Top Bar: Title, Local Currency Badge & Close Button */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 border-b border-[#0a3d54] bg-[#02162B]/90 sticky top-0 z-20 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#70ba65]/15 border border-[#70ba65]/40 flex items-center justify-center text-[#70ba65]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                  {lang === 'fr'
                    ? 'Résultats de votre estimation'
                    : 'Your Project Cost Estimate'}
                </h3>
                {/* Automatic Local Currency Indicator */}
                <div className="flex items-center gap-1.5 text-xs text-[#919ca1] mt-0.5 font-mono">
                  <span>{currencyConfig.flag}</span>
                  <span className="text-[#70ba65] font-medium">
                    {currencyConfig.name[lang]}
                  </span>
                  <span className="text-[10px] text-[#919ca1] hidden sm:inline">
                    ({lang === 'fr' ? 'détectée automatiquement' : 'auto-detected'})
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              id="quote-modal-close-btn"
              aria-label={lang === 'fr' ? 'Fermer la modal' : 'Close modal'}
              className="w-8 h-8 rounded-lg bg-[#00151F] border border-[#0a3d54] flex items-center justify-center text-[#919ca1] hover:text-white hover:border-[#70ba65]/60 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-5 sm:p-7 space-y-6 overflow-y-auto">
            {/* Project Base Header Banner */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#00151F] border border-[#0a3d54] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#02162B] border border-[#0a3d54] flex items-center justify-center text-[#70ba65] shrink-0">
                  <CalculatorIcon
                    name={projectType?.icon || 'Globe'}
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#70ba65] uppercase tracking-wider block">
                    {lang === 'fr'
                      ? 'Type de projet configuré'
                      : 'Configured project foundation'}
                  </span>
                  <h4 className="text-lg font-bold text-white">
                    {projectType?.title[lang] || 'Site Web'}
                  </h4>
                  <p className="text-xs text-[#919ca1] mt-0.5 line-clamp-1">
                    {projectType?.subtitle[lang]}
                  </p>
                </div>
              </div>

              <div className="sm:text-right border-t sm:border-t-0 border-[#0a3d54]/50 pt-3 sm:pt-0">
                <span className="text-[10px] font-mono text-[#919ca1] block uppercase tracking-wider">
                  {lang === 'fr' ? 'Base technique' : 'Base tier'}
                </span>
                <span className="text-lg font-mono font-bold text-white">
                  {formatPrice(breakdown.baseProjectPrice, state.currency)}
                </span>
                <span className="text-[11px] font-mono text-[#70ba65] block">
                  {projectType?.basePages} {lang === 'fr' ? 'pages incl.' : 'pages inc.'}
                </span>
              </div>
            </div>

            {/* 4 Pillars Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#02162B] border border-[#0a3d54]/60">
                <span className="text-[10px] font-mono text-[#919ca1] block uppercase tracking-wider">
                  {lang === 'fr' ? 'Volume' : 'Volume'}
                </span>
                <div className="flex items-center gap-1.5 mt-1 font-bold text-white">
                  <Layers className="w-3.5 h-3.5 text-[#70ba65]" />
                  <span>
                    {state.pageCount} {lang === 'fr' ? 'pages' : 'pages'}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#02162B] border border-[#0a3d54]/60">
                <span className="text-[10px] font-mono text-[#919ca1] block uppercase tracking-wider">
                  {lang === 'fr' ? 'Design' : 'Design'}
                </span>
                <div className="flex items-center gap-1.5 mt-1 font-bold text-white truncate">
                  <Palette className="w-3.5 h-3.5 text-[#70ba65] shrink-0" />
                  <span className="truncate">{designOption?.title[lang]}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#02162B] border border-[#0a3d54]/60">
                <span className="text-[10px] font-mono text-[#919ca1] block uppercase tracking-wider">
                  {lang === 'fr' ? 'Délai' : 'Timeline'}
                </span>
                <div className="flex items-center gap-1.5 mt-1 font-bold text-white">
                  <Clock className="w-3.5 h-3.5 text-[#70ba65]" />
                  <span>{timelineOption?.deliveryTime[lang]}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#02162B] border border-[#0a3d54]/60">
                <span className="text-[10px] font-mono text-[#919ca1] block uppercase tracking-wider">
                  {lang === 'fr' ? 'Support' : 'Support'}
                </span>
                <div className="flex items-center gap-1.5 mt-1 font-bold text-white truncate">
                  <Award className="w-3.5 h-3.5 text-[#70ba65] shrink-0" />
                  <span className="truncate">{supportOption?.title[lang]}</span>
                </div>
              </div>
            </div>

            {/* Itemized Cost Breakdown Table */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#00151F] border border-[#0a3d54] space-y-3">
              <div className="flex items-center justify-between border-b border-[#0a3d54]/60 pb-2.5">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  {lang === 'fr' ? 'Détail chiffré des prestations' : 'Itemized Cost Breakdown'}
                </span>
                <span className="text-[11px] font-mono text-[#70ba65]">
                  {state.currency}
                </span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm font-mono">
                {/* 1. Base project */}
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#a8b4b9]">
                    {lang === 'fr' ? 'Socle technique' : 'Base Architecture'} :{' '}
                    <strong className="text-white font-normal">{projectType?.title[lang]}</strong>
                  </span>
                  <span className="text-white font-bold">
                    {formatPrice(breakdown.baseProjectPrice, state.currency)}
                  </span>
                </div>

                {/* 2. Extra Pages */}
                {breakdown.extraPagesCount > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[#a8b4b9]">
                      +{breakdown.extraPagesCount} {lang === 'fr' ? 'page(s) supplémentaire(s)' : 'extra page(s)'}
                    </span>
                    <span className="text-[#70ba65] font-bold">
                      +{formatPrice(breakdown.extraPagesCost, state.currency)}
                    </span>
                  </div>
                )}

                {/* 3. Features detail */}
                {selectedFeatureObjects.map((feat) => {
                  const featPrice = getAmountInCurrency(
                    feat.priceEUR,
                    feat.priceTND,
                    state.currency
                  );
                  return (
                    <div
                      key={feat.id}
                      className="flex justify-between items-center py-1 pl-2 border-l border-[#70ba65]/30"
                    >
                      <span className="text-[#a8b4b9] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#70ba65] shrink-0" />
                        <span className="line-clamp-1">{feat.title[lang]}</span>
                      </span>
                      <span className="text-[#70ba65] font-bold shrink-0 ml-2">
                        +{formatPrice(featPrice, state.currency)}
                      </span>
                    </div>
                  );
                })}

                {/* 4. Design tier surcharge */}
                {breakdown.designSurcharge > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[#a8b4b9]">
                      {lang === 'fr' ? 'Niveau graphique' : 'Design tier'} : {designOption?.title[lang]}
                    </span>
                    <span className="text-[#70ba65] font-bold">
                      +{formatPrice(breakdown.designSurcharge, state.currency)}
                    </span>
                  </div>
                )}

                {/* 5. Timeline sprint surcharge */}
                {breakdown.timelineSurcharge > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[#a8b4b9]">
                      {lang === 'fr' ? 'Option sprint' : 'Timeline sprint'} : {timelineOption?.title[lang]}
                    </span>
                    <span className="text-[#70ba65] font-bold">
                      +{formatPrice(breakdown.timelineSurcharge, state.currency)}
                    </span>
                  </div>
                )}

                {/* 6. Support & Training */}
                {breakdown.supportCost > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[#a8b4b9]">
                      {lang === 'fr' ? 'Accompagnement' : 'Handover & training'} : {supportOption?.title[lang]}
                    </span>
                    <span className="text-[#70ba65] font-bold">
                      +{formatPrice(breakdown.supportCost, state.currency)}
                    </span>
                  </div>
                )}
              </div>

              {/* Total Box */}
              <div className="pt-3.5 mt-3 border-t-2 border-[#70ba65]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#02162B] p-4 rounded-xl">
                <div>
                  <span className="text-[10px] font-mono text-[#919ca1] uppercase tracking-wider block">
                    {lang === 'fr' ? 'Montant Total Estimatif :' : 'Total Estimated Budget :'}
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl sm:text-4xl font-bold font-mono text-[#70ba65] tracking-tight">
                      {formatPrice(breakdown.total, state.currency)}
                    </span>
                    <span className="text-xs font-mono text-[#919ca1]">
                      (≈ {dual.secondary})
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[11px] font-mono text-[#919ca1] flex items-center gap-1.5 sm:justify-end">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#70ba65]" />
                    {lang === 'fr'
                      ? 'Tarif net forfaitaire · Aucun frais caché'
                      : 'Fixed net pricing · No hidden fees'}
                  </span>
                  <span className="text-[10px] font-mono text-[#70ba65] block mt-0.5">
                    {lang === 'fr'
                      ? 'Devis contractuel gratuit sous 24h'
                      : 'Official quote delivered within 24h'}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Reassurances & Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#919ca1]">
              <div className="p-3 rounded-lg bg-[#02162B]/60 border border-[#0a3d54]/60 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#70ba65] shrink-0" />
                <span>
                  {lang === 'fr'
                    ? '100% Code propriétaire sans abonnement captif'
                    : '100% Proprietary code ownership'}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#02162B]/60 border border-[#0a3d54]/60 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#70ba65] shrink-0" />
                <span>
                  {lang === 'fr'
                    ? 'Garantie de bon fonctionnement 30 jours offerte'
                    : '30-day post-launch warranty included'}
                </span>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Actions Bar */}
          <div className="p-4 sm:p-6 border-t border-[#0a3d54] bg-[#02162B]/95 sticky bottom-0 z-20 space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Primary: Proceed to contact with prefill */}
              <button
                type="button"
                id="modal-primary-contact-btn"
                onClick={() => {
                  onClose();
                  if (onProceedToContact) {
                    onProceedToContact();
                  } else {
                    const params = new URLSearchParams({
                      projectType: state.projectType || '',
                      budget: breakdown.total.toString(),
                      currency: state.currency,
                      pages: state.pageCount.toString()
                    });
                    window.location.href = `${
                      lang === 'fr' ? '/contact' : '/en/contact'
                    }?${params.toString()}`;
                  }
                }}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#70ba65] hover:bg-[#86efac] text-[#00151F] font-bold text-xs sm:text-sm font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_25px_rgba(112,186,101,0.35)] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>
                  {lang === 'fr'
                    ? 'Valider & recevoir mon devis'
                    : 'Request My Official Quote'}
                </span>
              </button>

              {/* Secondary: WhatsApp direct chat */}
              <a
                href={`https://wa.me/21650399127?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                id="modal-whatsapp-btn"
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#00151F] font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 shadow"
              >
                <span>WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* Tertiary: Copy summary */}
              <button
                type="button"
                id="modal-copy-btn"
                onClick={handleCopyQuote}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-[#00151F] hover:bg-[#00283A] text-[#dedee0] border border-[#0a3d54] hover:border-[#70ba65]/60 text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#70ba65]" />
                    <span className="text-[#70ba65]">
                      {lang === 'fr' ? 'Copié !' : 'Copied!'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#919ca1]" />
                    <span>
                      {lang === 'fr' ? 'Copier' : 'Copy'}
                    </span>
                  </>
                )}
              </button>

              {/* Quaternary: Print / Save PDF */}
              <button
                type="button"
                id="modal-print-btn"
                onClick={handlePrint}
                className="hidden md:flex py-3 px-3 rounded-xl bg-[#00151F] hover:bg-[#00283A] text-[#919ca1] hover:text-white border border-[#0a3d54] hover:border-[#70ba65]/60 text-xs font-mono items-center justify-center transition-all cursor-pointer shrink-0"
                title={lang === 'fr' ? 'Imprimer / Exporter PDF' : 'Print / Export PDF'}
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

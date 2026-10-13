import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
  FileSpreadsheet,
  MapPin
} from 'lucide-react';
import { Language } from '../../types';
import { Currency, GeoDetectionInfo } from '../../types/calculator';
import { getCurrencyConfig } from '../../utils/geoCurrency';
import { useGlobalCurrency } from '../../context/CurrencyContext';

interface StepIntroProps {
  customTitle?: { fr: string; en: string };
  customSubtitle?: { fr: string; en: string };
  onStart: () => void;
  lang: Language;
  currency: Currency;
  geoInfo?: GeoDetectionInfo;
}

export const StepIntro: React.FC<StepIntroProps> = ({
  customTitle,
  customSubtitle,
  onStart,
  lang,
  currency,
  geoInfo
}) => {
  const { currency: globalCurrency } = useGlobalCurrency();
  const activeCurrencyConfig = getCurrencyConfig(globalCurrency || currency);

  const highlights = [
    {
      icon: Clock,
      title: lang === 'fr' ? 'Moins de 2 minutes' : 'Under 2 minutes',
      desc:
        lang === 'fr'
          ? 'Parcours guidé et intuitif en 5 étapes rapides'
          : 'Intuitive 5-step guided journey'
    },
    {
      icon: Sparkles,
      title: lang === 'fr' ? 'Calcul dynamique en direct' : 'Live dynamic pricing',
      desc:
        lang === 'fr'
          ? 'Chaque option sélectionnée ajuste le prix instantanément'
          : 'Every selection updates your estimate in real-time'
    },
    {
      icon: ShieldCheck,
      title: lang === 'fr' ? '100% Sans engagement' : '100% No obligation',
      desc:
        lang === 'fr'
          ? 'Simulez plusieurs configurations en toute liberté'
          : 'Freely compare configurations without constraints'
    },
    {
      icon: FileSpreadsheet,
      title:
        lang === 'fr'
          ? 'Devis détaillé & transparent'
          : 'Detailed transparent breakdown',
      desc:
        lang === 'fr'
          ? 'Ventilation complète des coûts et synthèse exportable'
          : 'Full cost breakdown and exportable summary'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="max-w-4xl mx-auto space-y-8 sm:space-y-10 py-4 sm:py-6"
    >
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#70ba65]/10 border border-[#70ba65]/30 text-xs font-mono text-[#70ba65]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {lang === 'fr'
              ? 'Simulateur de Devis Interactif'
              : 'Interactive Quote Calculator'}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          {customTitle ? (
            customTitle[lang]
          ) : lang === 'fr' ? (
            <>
              Estimez le coût de votre{' '}
              <span className="text-[#70ba65]">projet web</span> en direct
            </>
          ) : (
            <>
              Estimate your <span className="text-[#70ba65]">web project</span>{' '}
              cost in real-time
            </>
          )}
        </h1>

        <p className="text-[#919ca1] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {customSubtitle ? (
            customSubtitle[lang]
          ) : lang === 'fr'
            ? 'Sélectionnez votre architecture technique, vos fonctionnalités et vos options de personnalisation pour obtenir une estimation budgétaire précise et transparente.'
            : 'Configure technical foundations, modules, and customization options to explore a clear, itemized project investment.'}
        </p>
      </div>

      {/* Currency Selection & Display (Automatic) */}
      <div className="max-w-2xl mx-auto p-4 sm:p-5 rounded-2xl bg-[#00283A] border border-[#0a3d54] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-[#dedee0]">
            <span className="w-8 h-8 rounded-xl bg-[#02162B] border border-[#70ba65]/30 flex items-center justify-center text-[#70ba65] shrink-0">
              <MapPin className="w-4 h-4" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[#919ca1] font-mono">
                  {lang === 'fr'
                    ? 'Devise locale détectée :'
                    : 'Detected local currency :'}
                </span>
                <span className="font-bold text-white flex items-center gap-1.5 font-mono">
                  <span>{activeCurrencyConfig.flag}</span>
                  <span>{activeCurrencyConfig.primaryCountryName[lang]}</span>
                  <span className="text-[#70ba65]">
                    ({activeCurrencyConfig.code} - {activeCurrencyConfig.symbol})
                  </span>
                </span>
              </div>
              <div className="text-[11px] text-[#919ca1] mt-0.5 font-mono flex items-center gap-2">
                <span>
                  {lang === 'fr'
                    ? 'Affichage des prix :'
                    : 'Price format :'}
                </span>
                <strong className="text-white font-mono font-bold">
                  {activeCurrencyConfig.formatExample}
                </strong>
              </div>
            </div>
          </div>

          {/* Automatic detection indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#02162B] border border-[#0a3d54] text-xs font-mono text-[#70ba65] shrink-0 self-start sm:self-auto shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#70ba65] animate-pulse" />
            <span>{lang === 'fr' ? 'Détection automatique' : 'Automatic detection'}</span>
          </div>
        </div>
      </div>

      {/* Value highlights grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {highlights.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#00283A] border border-[#0a3d54] hover:border-[#70ba65]/40 transition-colors space-y-2.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#02162B] border border-[#0a3d54] flex items-center justify-center text-[#70ba65] group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#70ba65] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#919ca1] leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Call to Action: Start button */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onStart}
          id="calculator-start-btn"
          className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#70ba65] text-[#00151F] font-bold text-base sm:text-lg hover:bg-[#86efac] hover:shadow-[0_0_35px_rgba(112,186,101,0.35)] hover:scale-[1.02] transition-all cursor-pointer shadow-xl group"
        >
          <span>
            {lang === 'fr'
              ? 'Commencer la simulation'
              : 'Launch Simulation'}
          </span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-xs text-[#919ca1] mt-3 font-mono">
          {lang === 'fr'
            ? 'Durée estimée : 2 minutes • Tarification transparente • Sans engagement'
            : 'Estimated time: 2 mins • Transparent pricing • No obligation'}
        </p>
      </div>
    </motion.div>
  );
};

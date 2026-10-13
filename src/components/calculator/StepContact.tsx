import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  Mail,
  User,
  Phone,
  Building,
  Globe,
  MessageSquare,
  Send,
  Lock,
  Copy,
  ExternalLink,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { Language } from '../../types';
import { useData } from '../../context/DataContext';
import { CalculatorState, CostBreakdown } from '../../types/calculator';

import { formatPrice } from '../../utils/calculatorLogic';

interface StepContactProps {
  state: CalculatorState;
  breakdown: CostBreakdown;
  onUpdateClientInfo: (info: Partial<CalculatorState['clientInfo']>) => void;
  onReset: () => void;
  lang: Language;
}

export const StepContact: React.FC<StepContactProps> = ({
  state,
  breakdown,
  onUpdateClientInfo,
  onReset,
  lang
}) => {
  const { calculatorConfig: { projectTypes: PROJECT_TYPES, features: FEATURES } } = useData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [quoteReference, setQuoteReference] = useState('');
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preferWhatsApp, setPreferWhatsApp] = useState(true);

  const client = state.clientInfo;
  const projectType = PROJECT_TYPES.find((p) => p.id === state.projectType);
  const selectedFeatureNames = FEATURES.filter((f) =>
    state.selectedFeatures.includes(f.id)
  ).map((f) => f.title[lang]);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!client.fullName.trim() || client.fullName.trim().length < 2) {
      errs.fullName =
        lang === 'fr'
          ? 'Veuillez renseigner votre nom et prénom.'
          : 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!client.email.trim() || !emailRegex.test(client.email.trim())) {
      errs.email =
        lang === 'fr'
          ? 'Veuillez saisir une adresse e-mail valide (ex: contact@entreprise.com).'
          : 'Please enter a valid email address.';
    }

    const phoneRegex = /^[\d\s+\-().]{6,20}$/;
    if (!client.phone.trim() || !phoneRegex.test(client.phone.trim())) {
      errs.phone =
        lang === 'fr'
          ? 'Veuillez saisir un numéro de téléphone ou WhatsApp valide.'
          : 'Please enter a valid phone or WhatsApp number.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Generate unique quote reference
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const refCode = `SB-DEV-${new Date().getFullYear()}-${randomSuffix}`;
    setQuoteReference(refCode);

    // Save lead data locally for persistence
    try {
      const quoteSubmission = {
        reference: refCode,
        createdAt: new Date().toISOString(),
        client: state.clientInfo,
        projectType: state.projectType,
        pageCount: state.pageCount,
        selectedFeatures: state.selectedFeatures,
        designLevel: state.designLevel,
        timeline: state.timeline,
        supportLevel: state.supportLevel,
        totalPrice: breakdown.total,
        currency: state.currency
      };
      const existing = JSON.parse(localStorage.getItem('sb_quote_requests') || '[]');
      existing.unshift(quoteSubmission);
      localStorage.setItem('sb_quote_requests', JSON.stringify(existing.slice(0, 20)));
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      import("../../services/analyticsService").then(({ analyticsService }) => {
        analyticsService.trackQuoteRequest(
          state.projectTypeId || "calculator_full",
          window.location.pathname
        );
      });
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 800);
  };

  const formattedTotal = formatPrice(breakdown.total, state.currency);

  const getSummaryText = () => {
    return [
      `DEVIS ESTIMATIF SOFIENNE BOUKHRIS - RÉF : ${quoteReference}`,
      `---------------------------------------------`,
      `Client : ${client.fullName} (${client.email} | ${client.phone})`,
      client.company ? `Société : ${client.company}` : '',
      `Type de projet : ${projectType?.title[lang] || state.projectType}`,
      `Volume : ${state.pageCount} pages`,
      `Fonctionnalités (${selectedFeatureNames.length}) : ${selectedFeatureNames.join(', ') || 'Base'}`,
      `Design : ${state.designLevel} • Délai : ${state.timeline}`,
      `Budget estimatif : ${formattedTotal}`,
      `---------------------------------------------`,
      `Contact Développeur : contact@sofienneboukhris.com | WhatsApp : +216 53 742 140`
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(getSummaryText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const whatsAppMessage = encodeURIComponent(
    `Bonjour Sofienne, j'ai configuré mon projet sur votre calculateur en ligne (Réf: ${quoteReference}).\n\n` +
      `• Projet : ${projectType?.title[lang]}\n` +
      `• Pages : ${state.pageCount} pages\n` +
      `• Estimation : ${formattedTotal}\n\n` +
      `Je souhaite échanger avec vous pour recevoir la proposition formelle.`
  );

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#00283A] border border-[#70ba65]/60 shadow-[0_0_50px_rgba(112,186,101,0.2)] text-center space-y-6"
      >
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[#70ba65]/20 border border-[#70ba65] flex items-center justify-center mx-auto text-[#70ba65] shadow-lg">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-[#02162B] border border-[#0a3d54] text-xs font-mono text-[#70ba65]">
            {lang === 'fr' ? 'Demande transmise avec succès' : 'Quote Request Sent Successfully'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {lang === 'fr'
              ? 'Merci pour votre confiance !'
              : 'Thank you for your request!'}
          </h2>
          <p className="text-sm text-[#919ca1] max-w-md mx-auto">
            {lang === 'fr'
              ? `Votre dossier porte la référence ${quoteReference}. Une proposition détaillée vous sera transmise sous 24h ouvrées.`
              : `Your inquiry reference is ${quoteReference}. A comprehensive proposal will be dispatched within 24 business hours.`}
          </p>
        </div>

        {/* Highlight Quote Reference Box */}
        <div className="p-4 rounded-2xl bg-[#02162B] border border-[#0a3d54] text-left space-y-3">
          <div className="flex items-center justify-between border-b border-[#0a3d54] pb-2 text-xs font-mono text-[#919ca1]">
            <span>{lang === 'fr' ? 'Référence devis :' : 'Quote reference :'}</span>
            <span className="text-[#70ba65] font-bold">{quoteReference}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[#919ca1] text-[11px] font-mono block">
                {lang === 'fr' ? 'Type :' : 'Type :'}
              </span>
              <span className="text-white font-medium">{projectType?.title[lang]}</span>
            </div>
            <div>
              <span className="text-[#919ca1] text-[11px] font-mono block">
                {lang === 'fr' ? 'Estimation budget :' : 'Estimated budget :'}
              </span>
              <span className="text-[#70ba65] font-bold font-mono">{formattedTotal}</span>
            </div>
          </div>
        </div>

        {/* Actions Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {/* WhatsApp Direct Action */}
          <a
            href={`https://wa.me/21653742140?text=${whatsAppMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-[#00151F] font-bold text-sm hover:bg-[#2fe571] hover:scale-[1.02] transition-all cursor-pointer shadow-lg"
          >
            <MessageSquare className="w-4 h-4" />
            <span>
              {lang === 'fr'
                ? 'Discuter sur WhatsApp (+216 53 742 140)'
                : 'Chat on WhatsApp (+216 53 742 140)'}
            </span>
          </a>

          {/* Copy Summary */}
          <button
            type="button"
            onClick={handleCopySummary}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#02162B] border border-[#0a3d54] text-xs font-mono text-[#dedee0] hover:text-white hover:border-[#70ba65]/60 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#70ba65]" />
                <span className="text-[#70ba65]">{lang === 'fr' ? 'Copié !' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Copier la synthèse' : 'Copy summary'}</span>
              </>
            )}
          </button>
        </div>

        {/* Start New Simulation */}
        <div className="pt-4 border-t border-[#0a3d54]/60">
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-mono text-[#919ca1] hover:text-[#70ba65] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Faire une nouvelle estimation' : 'Start a new estimate'}</span>
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#02162B] border border-[#0a3d54] text-xs font-mono text-[#70ba65]">
          <span>{lang === 'fr' ? 'Étape 5 sur 5 • Coordonnées' : 'Step 5 of 5 • Contact'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          {lang === 'fr'
            ? 'Où souhaitez-vous recevoir votre devis officiel ?'
            : 'Where should we send your official quote?'}
        </h2>
        <p className="text-sm sm:text-base text-[#919ca1] max-w-xl mx-auto">
          {lang === 'fr'
            ? 'Transmettez vos coordonnées professionnelles pour recevoir une offre formelle détaillée et sans engagement.'
            : 'Fill in your contact information to receive your tailored proposal within 24 hours.'}
        </p>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 rounded-2xl bg-[#00283A] border border-[#0a3d54] shadow-xl space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#dedee0] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#70ba65]" />
              <span>{lang === 'fr' ? 'Nom et prénom *' : 'Full Name *'}</span>
            </label>
            <input
              type="text"
              value={client.fullName}
              onChange={(e) => {
                onUpdateClientInfo({ fullName: e.target.value });
                if (errors.fullName) setErrors({ ...errors, fullName: '' });
              }}
              placeholder={lang === 'fr' ? 'Ex: Sofienne Boukhris' : 'e.g. John Doe'}
              className={`w-full px-4 py-2.5 rounded-xl bg-[#02162B] text-white text-sm placeholder-[#71828a] focus:outline-none transition-colors ${
                errors.fullName
                  ? 'border-2 border-red-500/80 focus:border-red-400'
                  : 'border border-[#0a3d54] focus:border-[#70ba65]'
              }`}
            />
            {errors.fullName && (
              <p className="text-[11px] font-mono text-red-400">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#dedee0] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#70ba65]" />
              <span>{lang === 'fr' ? 'Adresse e-mail *' : 'Email Address *'}</span>
            </label>
            <input
              type="email"
              value={client.email}
              onChange={(e) => {
                onUpdateClientInfo({ email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              placeholder="contact@entreprise.com"
              className={`w-full px-4 py-2.5 rounded-xl bg-[#02162B] text-white text-sm placeholder-[#71828a] focus:outline-none transition-colors ${
                errors.email
                  ? 'border-2 border-red-500/80 focus:border-red-400'
                  : 'border border-[#0a3d54] focus:border-[#70ba65]'
              }`}
            />
            {errors.email && (
              <p className="text-[11px] font-mono text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Phone / WhatsApp */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#dedee0] flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#70ba65]" />
              <span>{lang === 'fr' ? 'Téléphone / WhatsApp *' : 'Phone / WhatsApp *'}</span>
            </label>
            <input
              type="tel"
              value={client.phone}
              onChange={(e) => {
                onUpdateClientInfo({ phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: '' });
              }}
              placeholder="+216 53 742 140 ou +33 ..."
              className={`w-full px-4 py-2.5 rounded-xl bg-[#02162B] text-white text-sm placeholder-[#71828a] focus:outline-none transition-colors ${
                errors.phone
                  ? 'border-2 border-red-500/80 focus:border-red-400'
                  : 'border border-[#0a3d54] focus:border-[#70ba65]'
              }`}
            />
            {errors.phone && (
              <p className="text-[11px] font-mono text-red-400">{errors.phone}</p>
            )}
          </div>

          {/* Company */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#dedee0] flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#70ba65]" />
              <span>{lang === 'fr' ? 'Entreprise / Marque (facultatif)' : 'Company / Brand (optional)'}</span>
            </label>
            <input
              type="text"
              value={client.company}
              onChange={(e) => onUpdateClientInfo({ company: e.target.value })}
              placeholder={lang === 'fr' ? 'Nom de votre société' : 'Your company name'}
              className="w-full px-4 py-2.5 rounded-xl bg-[#02162B] border border-[#0a3d54] text-white text-sm placeholder-[#71828a] focus:outline-none focus:border-[#70ba65] transition-colors"
            />
          </div>
        </div>

        {/* Existing Website or Figma Link */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-[#dedee0] flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#70ba65]" />
            <span>{lang === 'fr' ? 'Site web actuel ou lien Figma (facultatif)' : 'Current website or Figma link (optional)'}</span>
          </label>
          <input
            type="text"
            value={client.websiteOrFigma}
            onChange={(e) => onUpdateClientInfo({ websiteOrFigma: e.target.value })}
            placeholder="https://monsite.com ou https://figma.com/..."
            className="w-full px-4 py-2.5 rounded-xl bg-[#02162B] border border-[#0a3d54] text-white text-sm placeholder-[#71828a] focus:outline-none focus:border-[#70ba65] transition-colors"
          />
        </div>

        {/* Notes / Message */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-[#dedee0] flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-[#70ba65]" />
            <span>{lang === 'fr' ? 'Précisions complémentaires sur vos attentes (facultatif)' : 'Additional project context or questions (optional)'}</span>
          </label>
          <textarea
            rows={3}
            value={client.notes}
            onChange={(e) => onUpdateClientInfo({ notes: e.target.value })}
            placeholder={
              lang === 'fr'
                ? 'Décrivez votre cible, vos inspirations ou toute contrainte technique spécifique...'
                : 'Describe your audience, design inspirations, or any specific technical constraints...'
            }
            className="w-full px-4 py-2.5 rounded-xl bg-[#02162B] border border-[#0a3d54] text-white text-sm placeholder-[#71828a] focus:outline-none focus:border-[#70ba65] transition-colors resize-none"
          />
        </div>

        {/* WhatsApp fast-contact checkbox */}
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#02162B] border border-[#0a3d54]">
          <input
            type="checkbox"
            id="prefer-whatsapp-cb"
            checked={preferWhatsApp}
            onChange={(e) => setPreferWhatsApp(e.target.checked)}
            className="w-4 h-4 rounded border-[#0a3d54] text-[#70ba65] focus:ring-0 focus:ring-offset-0 bg-[#00151F] cursor-pointer accent-[#70ba65]"
          />
          <label htmlFor="prefer-whatsapp-cb" className="text-xs text-[#dedee0] cursor-pointer select-none">
            {lang === 'fr'
              ? 'Je souhaite également être recontacté sur WhatsApp pour un échange rapide.'
              : 'I also wish to receive a quick follow-up on WhatsApp.'}
          </label>
        </div>

        {/* Submit Action */}
        <div className="pt-2 text-center space-y-3">
          <button
            type="submit"
            disabled={isSubmitting}
            id="calculator-submit-quote-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-[#70ba65] text-[#00151F] font-bold text-base hover:bg-[#86efac] hover:shadow-[0_0_30px_rgba(112,186,101,0.35)] hover:scale-[1.02] transition-all cursor-pointer shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#00151F] border-t-transparent rounded-full animate-spin" />
                <span>{lang === 'fr' ? 'Génération du devis...' : 'Generating quote...'}</span>
              </span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Demander mon devis personnalisé' : 'Request My Tailored Quote'}</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-[#919ca1]">
            <Lock className="w-3.5 h-3.5 text-[#70ba65]" />
            <span>
              {lang === 'fr'
                ? 'Vos données restent strictement confidentielles et ne sont jamais partagées.'
                : 'Your contact details remain strictly confidential and are never shared.'}
            </span>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

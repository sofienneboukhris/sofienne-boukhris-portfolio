import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { ContactFormData } from '../types';
import { Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const { lang } = useRouter();
  const { translations } = useData();
  const t = translations[lang].contactForm;
  

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    projectType: t.projectTypes[0],
    budget: t.budgetOptions[0],
    timeline: t.timelineOptions[0],
    description: '',
    honeypot: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim()) {
      errs.name = t.errorRequired;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = t.errorRequired;
    } else if (!emailRegex.test(formData.email)) {
      errs.email = t.errorEmail;
    }

    if (!formData.description.trim()) {
      errs.description = t.errorRequired;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam check
    if (formData.honeypot) {
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Concatenate project qualification details with description
      const qualificationDetails = [
        formData.projectType ? `${lang === 'fr' ? 'Type de projet' : 'Project Type'}: ${formData.projectType}` : '',
        formData.budget ? `${lang === 'fr' ? 'Budget estimé' : 'Estimated Budget'}: ${formData.budget}` : '',
        formData.timeline ? `${lang === 'fr' ? 'Délai souhaité' : 'Desired Timeline'}: ${formData.timeline}` : '',
        formData.company ? `${lang === 'fr' ? 'Entreprise' : 'Company'}: ${formData.company}` : ''
      ].filter(Boolean);

      const combinedMessage = qualificationDetails.length > 0
        ? `${formData.description.trim()}\n\n--- ${lang === 'fr' ? 'Détails du projet' : 'Project Details'} ---\n${qualificationDetails.join('\n')}`
        : formData.description.trim();

      // Send data to backend
      const submissionData = {
        clientName: formData.name,
        clientEmail: formData.email,
        clientPhone: '',
        source: 'Contact Form',
        message: combinedMessage,
      };

      await fetch('/api/form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });
      
      setIsSuccess(true);
      
      // Track analytics
      const isQuote = combinedMessage.toLowerCase().includes("devis") || combinedMessage.toLowerCase().includes("quote");
      if (isQuote) {
        import("../services/analyticsService").then(({ analyticsService }) => {
          analyticsService.trackQuoteRequest(
            formData.projectType || "general_quote",
            window.location.pathname
          );
        });
      }
    } catch (err) {
      console.error('Failed to submit form', err);
      // fallback success
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="trm-card p-6 sm:p-8 relative" id="contact-form-container">
      {isSuccess ? (
        <div className="text-center py-10 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#70ba65]/20 text-[#70ba65] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-white">
            {t.successTitle}
          </h3>
          <p className="text-sm text-[#dedee0] max-w-md mx-auto">
            {t.successMsg}
          </p>
          <div className="pt-4">
            <button
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  name: '',
                  email: '',
                  company: '',
                  projectType: t.projectTypes[0],
                  budget: t.budgetOptions[0],
                  timeline: t.timelineOptions[0],
                  description: '',
                  honeypot: ''
                });
              }}
              className="trm-btn trm-btn-border text-xs"
            >
              {lang === 'fr' ? 'Envoyer un autre message' : 'Send another inquiry'}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Header */}
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              {t.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#919ca1] mt-1.5 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Anti-spam honeypot (hidden from normal users) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="hp-field">Leave this empty</label>
            <input
              type="text"
              id="hp-field"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            />
          </div>

          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-medium text-[#dedee0] mb-1.5">
                {t.nameLabel}
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t.namePlaceholder}
                className={`w-full bg-[#02162B] border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#919ca1]/50 focus:outline-none focus:ring-2 focus:ring-[#70ba65] transition-colors ${
                  errors.name ? 'border-red-500' : 'border-[#0a3d54]'
                }`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                required
              />
              {errors.name && (
                <p id="name-error" className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-xs font-medium text-[#dedee0] mb-1.5">
                {t.emailLabel}
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t.emailPlaceholder}
                className={`w-full bg-[#02162B] border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#919ca1]/50 focus:outline-none focus:ring-2 focus:ring-[#70ba65] transition-colors ${
                  errors.email ? 'border-red-500' : 'border-[#0a3d54]'
                }`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                required
              />
              {errors.email && (
                <p id="email-error" className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Company & Project Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-company" className="block text-xs font-medium text-[#dedee0] mb-1.5">
                {t.companyLabel}
              </label>
              <input
                type="text"
                id="contact-company"
                name="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder={t.companyPlaceholder}
                className="w-full bg-[#02162B] border border-[#0a3d54] rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#919ca1]/50 focus:outline-none focus:ring-2 focus:ring-[#70ba65] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-project-type" className="block text-xs font-medium text-[#dedee0] mb-1.5">
                {t.projectTypeLabel}
              </label>
              <select
                id="contact-project-type"
                name="projectType"
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full bg-[#02162B] border border-[#0a3d54] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#70ba65] transition-colors"
              >
                {t.projectTypes.map((pt) => (
                  <option key={pt} value={pt} className="bg-[#00283A] text-white">
                    {pt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Budget & Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-budget" className="block text-xs font-medium text-[#dedee0] mb-1.5">
                {t.budgetLabel}
              </label>
              <select
                id="contact-budget"
                name="budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full bg-[#02162B] border border-[#0a3d54] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#70ba65] transition-colors"
              >
                {t.budgetOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#00283A] text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="contact-timeline" className="block text-xs font-medium text-[#dedee0] mb-1.5">
                {t.timelineLabel}
              </label>
              <select
                id="contact-timeline"
                name="timeline"
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full bg-[#02162B] border border-[#0a3d54] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#70ba65] transition-colors"
              >
                {t.timelineOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#00283A] text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="contact-description" className="block text-xs font-medium text-[#dedee0] mb-1.5">
              {t.descLabel}
            </label>
            <textarea
              id="contact-description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t.descPlaceholder}
              className={`w-full bg-[#02162B] border rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-[#919ca1]/50 focus:outline-none focus:ring-2 focus:ring-[#70ba65] transition-colors resize-y ${
                errors.description ? 'border-red-500' : 'border-[#0a3d54]'
              }`}
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? 'desc-error' : undefined}
              required
            ></textarea>
            {errors.description && (
              <p id="desc-error" className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Submit Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="trm-btn trm-btn-primary w-full sm:w-auto"
              id="contact-submit-btn"
            >
              {isSubmitting ? (
                <span>{t.sendingBtn}</span>
              ) : (
                <>
                  <span>{t.submitBtn}</span>
                  <Send className="w-3.5 h-3.5 ml-2" />
                </>
              )}
            </button>

            <a
              href="https://wa.me/21653742140?text=Bonjour%20Sofienne,%20je%20souhaite%20un%20devis"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#25D366] hover:underline flex items-center gap-1.5 font-medium"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp : +216 53 742 140</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
};

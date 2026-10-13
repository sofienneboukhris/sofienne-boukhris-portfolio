import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { subscribeToNewsletter, validateEmail } from '../services/newsletterService';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface NewsletterProps {
  className?: string;
  variant?: 'card' | 'compact';
}

export const Newsletter: React.FC<NewsletterProps> = ({ 
  className = '',
  variant = 'card'
}) => {
  const { lang } = useRouter();
  const { translations } = useData();
  const t = translations[lang];
  const nl = t.newsletter;

  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successEmail, setSuccessEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();

    // Client-side validation
    if (!trimmed) {
      setError(nl.errorRequired);
      return;
    }

    if (!validateEmail(trimmed)) {
      setError(nl.errorInvalid);
      return;
    }

    setIsLoading(true);

    try {
      const res = await subscribeToNewsletter(trimmed, lang, honeypot);

      if (res.success) {
        setIsSuccess(true);
        setSuccessEmail(trimmed);
        setEmail('');
        setHoneypot('');
        setError(null);
      } else {
        if (res.error === 'ALREADY_SUBSCRIBED') {
          setError(nl.errorAlreadySubscribed);
        } else if (res.error === 'INVALID_EMAIL') {
          setError(nl.errorInvalid);
        } else {
          setError(res.message || nl.errorRequired);
        }
      }
    } catch {
      setError(
        lang === 'fr' 
          ? 'Une erreur réseau est survenue. Veuillez réessayer.' 
          : 'A network error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSuccessEmail('');
    setEmail('');
    setHoneypot('');
    setError(null);
  };

  return (
    <div 
      id="newsletter-section"
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#02162B] via-[#001E2B] to-[#01141e] border border-[#0a3d54] p-6 sm:p-8 transition-all duration-300 shadow-xl ${className}`}
    >
      {/* Decorative ambient radial glow */}
      <div 
        className="absolute -top-20 -right-20 w-64 h-64 bg-[#70ba65]/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative z-10">
        {isSuccess ? (
          /* SUCCESS CONFIRMATION STATE */
          <div 
            className="flex flex-col items-center text-center py-4 space-y-4 animate-fadeIn"
            role="status"
            aria-live="polite"
          >
            <div className="w-14 h-14 rounded-full bg-[#70ba65]/10 border border-[#70ba65]/30 flex items-center justify-center text-[#70ba65] shadow-lg shadow-[#70ba65]/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1.5 max-w-lg">
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-wide">
                {nl.successTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#dedee0] leading-relaxed">
                {nl.successMessage}
              </p>
              <div className="inline-block mt-2 px-3 py-1 rounded-full bg-[#0a3d54]/40 border border-[#0a3d54] text-xs font-mono text-[#70ba65]">
                {successEmail}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                id="newsletter-reset-btn"
                className="inline-flex items-center gap-1.5 text-xs text-[#919ca1] hover:text-white transition-colors py-1.5 px-3 rounded-lg border border-transparent hover:border-[#0a3d54]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{nl.anotherEmail}</span>
              </button>
            </div>
          </div>
        ) : (
          /* DEFAULT FORM STATE */
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
            {/* Text & Pitch Column */}
            <div className="max-w-xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#70ba65]/10 border border-[#70ba65]/30 text-[11px] font-mono font-semibold text-[#70ba65]">
                <Sparkles className="w-3 h-3" />
                <span>{nl.badge}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-wide">
                {nl.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#919ca1] leading-relaxed">
                {nl.subtitle}
              </p>
            </div>

            {/* Form Input Column */}
            <div className="w-full lg:w-auto lg:min-w-[420px] shrink-0">
              <form 
                onSubmit={handleSubmit} 
                noValidate 
                className="space-y-2"
                id="newsletter-form"
              >
                {/* Hidden Honeypot Field for anti-spam protection */}
                <div
                  className="opacity-0 absolute -left-[9999px] -top-[9999px] w-0 h-0 overflow-hidden pointer-events-none"
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  <label htmlFor="newsletter-hp-field">Website URL (leave empty)</label>
                  <input
                    type="text"
                    id="newsletter-hp-field"
                    name="website_hp"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="relative flex flex-col sm:flex-row items-stretch gap-2 bg-[#001E2B] p-1.5 rounded-xl border border-[#0a3d54] focus-within:border-[#70ba65] transition-colors shadow-inner">
                  <div className="relative flex-1 flex items-center pl-3">
                    <Mail className="w-4 h-4 text-[#919ca1] shrink-0" aria-hidden="true" />
                    <input
                      type="email"
                      id="newsletter-email-input"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      disabled={isLoading}
                      placeholder={nl.placeholder}
                      aria-label={nl.placeholder}
                      aria-invalid={!!error}
                      aria-describedby={error ? "newsletter-error-message" : "newsletter-privacy-notice"}
                      className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-[#607274] px-3 py-2.5 sm:py-2 focus:outline-none disabled:opacity-60 font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    id="newsletter-submit-btn"
                    disabled={isLoading}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#70ba65] hover:bg-[#5da353] text-[#001E2B] text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed shrink-0 focus:outline-none focus:ring-2 focus:ring-[#70ba65]/50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>{nl.subscribing}</span>
                      </>
                    ) : (
                      <>
                        <span>{nl.button}</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {/* Inline Validation Error Message */}
                {error && (
                  <div 
                    id="newsletter-error-message"
                    className="flex items-center gap-1.5 text-xs text-rose-400 pl-1 pt-0.5 animate-fadeIn"
                    role="alert"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Privacy & Anti-Spam Notice */}
                <div 
                  id="newsletter-privacy-notice" 
                  className="flex items-center gap-1.5 text-[11px] text-[#919ca1] pl-1 pt-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#70ba65] shrink-0" />
                  <span>{nl.privacy}</span>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { SidebarCard } from '../components/SidebarCard';
import { ContactForm } from '../components/ContactForm';
import { useData } from '../context/DataContext';
import { Mail, Phone, MapPin, Clock, MessageSquare, Video, ShieldCheck } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { lang, navigate } = useRouter();
  const { translations } = useData();
  const t = translations[lang];

  return (
    <>
      <SEOHead
        title={lang === 'fr' ? 'Contactez Sofienne Boukhris | Devis Gratuit' : 'Contact Sofienne Boukhris | Free Quote'}
        description={lang === 'fr'
          ? "Contactez Sofienne Boukhris, développeur web freelance à Sousse (Tunisie). Demandez un devis gratuit pour votre site vitrine, e-commerce, WordPress ou application sur mesure."
          : "Get in touch with Sofienne Boukhris, freelance full-stack web developer in Sousse, Tunisia. Request a free quote for showcase websites, e-commerce, or web apps."
        }
        canonicalPath={lang === 'fr' ? '/contact' : '/en/contact'}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <SidebarCard />

          <main className="flex-1 w-full space-y-10">
            <Breadcrumbs
              items={[
                { label: lang === 'fr' ? 'Contact' : 'Contact' }
              ]}
            />

            {/* Header */}
            <div className="trm-card p-6 sm:p-10 relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#02162B] border border-[#0a3d54] text-[11px] font-mono text-[#70ba65] mb-4 uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? 'Contact & Échange Direct' : 'Direct Contact & Inquiries'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
                {lang === 'fr' ? (
                  <>Donnons vie à votre <span className="text-[#70ba65]">projet web</span></>
                ) : (
                  <>Let’s build your <span className="text-[#70ba65]">web project</span></>
                )}
              </h1>

              <p className="text-sm sm:text-base text-[#a8b4b9] leading-relaxed max-w-3xl">
                {lang === 'fr'
                  ? "Vous avez une idée en tête, un cahier des charges rédigé ou un site existant à faire évoluer ? Contactez-moi par formulaire, email ou WhatsApp. Je vous réponds sous 24h ouvrées."
                  : "Have a new concept, a detailed specification sheet, or an existing platform that needs modernizing? Reach out via the form, direct email, or WhatsApp. I respond within 24 business hours."}
              </p>
            </div>

            {/* Direct Contact Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Email */}
              <div className="trm-card p-5 space-y-2">
                <Mail className="w-5 h-5 text-[#70ba65]" />
                <div className="text-xs text-[#919ca1]">{lang === 'fr' ? 'Email direct :' : 'Direct Email:'}</div>
                <a
                  href="mailto:hello@sofienneboukhris.com"
                  className="text-xs font-semibold text-white hover:text-[#70ba65] transition-colors break-all"
                >
                  hello@sofienneboukhris.com
                </a>
              </div>

              {/* Phone / WhatsApp */}
              <div className="trm-card p-5 space-y-2">
                <Phone className="w-5 h-5 text-[#25D366]" />
                <div className="text-xs text-[#919ca1]">{lang === 'fr' ? 'Téléphone & WhatsApp :' : 'Phone & WhatsApp:'}</div>
                <a
                  href="https://wa.me/21653742140"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#25D366] hover:underline"
                >
                  +216 53 742 140
                </a>
              </div>

              {/* Location & Visio */}
              <div className="trm-card p-5 space-y-2">
                <MapPin className="w-5 h-5 text-[#70ba65]" />
                <div className="text-xs text-[#919ca1]">{lang === 'fr' ? 'Localisation & Visio :' : 'Location & Meetings:'}</div>
                <div className="text-xs font-semibold text-white">
                  Sousse, Tunisie · Google Meet
                </div>
              </div>

            </div>

            {/* Trust points */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#02162B] border border-[#0a3d54] text-xs text-[#dedee0]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#70ba65]" />
                <span>{lang === 'fr' ? 'Réponse garantie sous 24h ouvrées' : 'Guaranteed reply within 24h'}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#70ba65]" />
                <span>{lang === 'fr' ? 'Devis gratuit & sans engagement' : 'Free quote with zero obligation'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-[#70ba65]" />
                <span>{lang === 'fr' ? 'Visioconférence possible sur rendez-vous' : 'Video call available on request'}</span>
              </div>
            </div>

            {/* Calculator prompt banner */}
            <div className="p-4 rounded-xl bg-[#001E2B] border border-[#0a3d54] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-[#a8b4b9]">
                <span className="font-semibold text-white">
                  {lang === 'fr' ? 'Besoin d’estimer votre budget au préalable ?' : 'Want to estimate your budget first?'}
                </span>{' '}
                {lang === 'fr'
                  ? 'Configurez votre type de site et modules sur notre simulateur en direct.'
                  : 'Configure your project type and modules with our live simulator.'}
              </div>
              <button
                type="button"
                onClick={() => navigate(lang === 'fr' ? '/calculateur' : '/en/calculator')}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#70ba65] hover:underline shrink-0"
              >
                <span>{lang === 'fr' ? 'Ouvrir le calculateur' : 'Open Calculator'}</span>
                <span>→</span>
              </button>
            </div>

            {/* The Form */}
            <ContactForm />

          </main>
        </div>
      </div>
    </>
  );
};

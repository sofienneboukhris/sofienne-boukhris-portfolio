import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2, Award, Printer } from 'lucide-react';

export const SidebarCard: React.FC = () => {
  const { lang, navigate } = useRouter();
  const { translations } = useData();
  const t = translations[lang].profileCard;
  

  const keySkills = [
    'React & TypeScript',
    'Laravel & PHP',
    'WordPress & Custom Themes',
    'Shopify & Liquid',
    'WooCommerce',
    'NestJS & REST APIs',
    'SEO Technique & Core Web Vitals'
  ];

  return (
    <aside id="profile-sidebar" className="w-full lg:w-[320px] shrink-0" aria-label="Profil Sofienne Boukhris">
      <div className="trm-card p-6 sticky top-28 space-y-6">
        
        {/* Header with Avatar and Name */}
        <div className="text-center pb-6 border-b border-[#0a3d54]/60">
          <div className="relative inline-block mb-4">
            <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-[#70ba65] p-1 bg-[#02162B] shadow-xl">
              <img
                src="https://sofienneboukhris.com/wp-content/uploads/2025/10/Sofienne-Boukhris-Freelancer-Web-Developper-121x104.webp"
                alt="Sofienne Boukhris - Freelance Full-Stack Web Developer"
                className="w-full h-full object-cover rounded-full"
                width={121}
                height={104}
                loading="eager"
              />
            </div>
            {/* Availability Dot */}
            <span className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-[#25D366] border-2 border-[#00283A] shadow-md" title={t.status}></span>
          </div>

          <h2 className="text-xl font-serif font-bold text-white tracking-wide">
            Sofienne Boukhris
          </h2>
          <p className="text-xs text-[#70ba65] font-mono uppercase tracking-wider font-semibold mt-1">
            {t.role}
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#02162B] border border-[#0a3d54] text-[11px] text-[#919ca1]">
            <MapPin className="w-3 h-3 text-[#70ba65]" />
            <span>{t.location}</span>
          </div>

          <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#25D366] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping"></span>
            <span>{t.status}</span>
          </div>
        </div>

        {/* Contact Specs */}
        <div className="space-y-3 text-xs pb-6 border-b border-[#0a3d54]/60">
          <div className="flex items-center justify-between text-[#919ca1]">
            <span>Expérience :</span>
            <span className="text-white font-medium flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#70ba65]" />
              {t.experienceBadge}
            </span>
          </div>
          <div className="flex items-center justify-between text-[#919ca1]">
            <span>Email :</span>
            <a href="mailto:hello@sofienneboukhris.com" className="text-[#dedee0] hover:text-[#70ba65] font-medium transition-colors">
              hello@sofienneboukhris.com
            </a>
          </div>
          <div className="flex items-center justify-between text-[#919ca1]">
            <span>WhatsApp :</span>
            <a href="https://wa.me/21653742140" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline font-medium">
              +216 53 742 140
            </a>
          </div>
        </div>

        {/* Skills List */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#70ba65] font-semibold mb-3">
            {t.skillsTitle}
          </h3>
          <ul className="space-y-2 text-xs">
            {keySkills.map((skill) => (
              <li key={skill} className="flex items-center gap-2 text-[#dedee0]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#70ba65] shrink-0" />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTAs */}
        <div className="pt-2 space-y-2.5">
          <button
            onClick={() => navigate(lang === 'fr' ? '/contact' : '/en/contact')}
            className="trm-btn trm-btn-primary w-full text-center text-xs py-3"
            id="sidebar-cta-quote-btn"
          >
            <Send className="w-3.5 h-3.5 mr-2" />
            {t.actionQuote}
          </button>

          <a
            href="https://wa.me/21653742140?text=Bonjour%20Sofienne,%20je%20souhaite%20un%20devis%20pour%20mon%20site"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-[#25D366]/40 text-[#25D366] text-xs font-bold hover:bg-[#25D366]/10 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t.actionWhatsapp}</span>
          </a>

          <button
            onClick={() => window.print()}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-full border border-[#0a3d54] text-[#a8b4b9] text-xs hover:text-white hover:border-[#70ba65] transition-colors print:hidden"
            id="sidebar-print-btn"
            title={lang === 'fr' ? 'Imprimer la fiche profil (PDF)' : 'Print profile sheet (PDF)'}
          >
            <Printer className="w-3.5 h-3.5 text-[#70ba65]" />
            <span>{lang === 'fr' ? 'Imprimer la fiche (PDF)' : 'Print Sheet (PDF)'}</span>
          </button>
        </div>

      </div>
    </aside>
  );
};

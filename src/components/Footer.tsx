import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Newsletter } from './Newsletter';
import { Mail, Phone, MapPin, Globe, ArrowUpRight, MessageCircle, Linkedin, Facebook, Instagram, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, navigate } = useRouter();
  const { translations } = useData();
  const t = (translations as any)[lang] || (translations as any).fr;

  const handleLink = (path: string) => {
    navigate(path);
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sofienneboukhris',
      icon: Linkedin,
      hoverClass: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10 hover:shadow-[#0A66C2]/20',
      ariaLabel: 'LinkedIn - Sofienne Boukhris'
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/sofienneboukhris',
      icon: Facebook,
      hoverClass: 'hover:text-[#1877F2] hover:border-[#1877F2]/60 hover:bg-[#1877F2]/10 hover:shadow-[#1877F2]/20',
      ariaLabel: 'Facebook - Sofienne Boukhris'
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/sofienneboukhris',
      icon: Instagram,
      hoverClass: 'hover:text-[#E4405F] hover:border-[#E4405F]/60 hover:bg-[#E4405F]/10 hover:shadow-[#E4405F]/20',
      ariaLabel: 'Instagram - Sofienne Boukhris'
    }
  ];

  return (
    <footer id="site-footer" className="bg-[#001E2B] border-t border-[#0a3d54] text-[#919ca1] text-sm pt-16 pb-12 mt-20 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Subscription Banner */}
        <div className="mb-14">
          <Newsletter />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#0a3d54]/60">
          
          {/* Col 1: Identity & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-[#00151F] border border-[#70ba65]/40 flex items-center justify-center flex-shrink-0 shadow-md">
                <img 
                  src="/assets/logo.webp" 
                  alt="Sofienne Boukhris Logo" 
                  width="44" 
                  height="44" 
                  className="w-full h-full object-cover"
                  loading="lazy" 
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-white font-serif font-bold text-lg tracking-wide">
                  <span>Sofienne Boukhris</span>
                  <span className="w-2 h-2 rounded-full bg-[#70ba65]"></span>
                </div>
                <p className="text-[11px] text-[#70ba65] font-mono uppercase tracking-wider font-semibold">
                  Freelance Full-Stack Developer
                </p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-[#919ca1]">
              {t.footer.roleText}
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/21653742140?text=Bonjour%20Sofienne,%20je%20souhaite%20créer%20un%20site%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/10 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/30"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>+216 53 742 140 (WhatsApp)</span>
              </a>
            </div>

            {/* Social Media Section */}
            <div className="pt-3 border-t border-[#0a3d54]/40">
              <h4 className="text-white font-serif font-semibold text-xs mb-3 tracking-wide uppercase font-mono text-[#70ba65]">
                {t.footer.socialTitle}
              </h4>
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel}
                      title={social.name}
                      className={`group relative flex items-center justify-center w-9 h-9 rounded-lg bg-[#082b3b] border border-[#0a3d54] text-[#919ca1] ${social.hoverClass} shadow-sm transition-all duration-200`}
                    >
                      <Icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="text-white font-serif font-semibold text-sm mb-4 tracking-wide uppercase font-mono text-[#70ba65]">
              {t.footer.servicesTitle}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleLink('/services/creation-site-web')} className="hover:text-[#70ba65] transition-colors text-left">
                  {lang === 'fr' ? 'Création site web sur mesure' : 'Custom Website Creation'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/services/site-vitrine')} className="hover:text-[#70ba65] transition-colors text-left">
                  {lang === 'fr' ? 'Site vitrine professionnel' : 'Showcase Website'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/services/site-e-commerce')} className="hover:text-[#70ba65] transition-colors text-left">
                  {lang === 'fr' ? 'Site e-commerce & boutique en ligne' : 'E-Commerce Store'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/services/wordpress')} className="hover:text-[#70ba65] transition-colors text-left">
                  {lang === 'fr' ? 'Développement WordPress' : 'WordPress Development'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/services/site-e-commerce/shopify')} className="hover:text-[#70ba65] transition-colors text-left">
                  Shopify & Liquid
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/services/developpement-laravel')} className="hover:text-[#70ba65] transition-colors text-left">
                  Laravel & PHP
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/services/application-web')} className="hover:text-[#70ba65] transition-colors text-left">
                  {lang === 'fr' ? 'Application web sur mesure' : 'Custom Web App'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/services/optimisation-performance')} className="hover:text-[#70ba65] transition-colors text-left">
                  {lang === 'fr' ? 'Optimisation performance & Core Web Vitals' : 'Core Web Vitals & Speed'}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/services/maintenance-site-web')} className="hover:text-[#70ba65] transition-colors text-left">
                  {lang === 'fr' ? 'Maintenance de site web' : 'Website Maintenance'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation & Local SEO */}
          <div>
            <h3 className="text-white font-serif font-semibold text-sm mb-4 tracking-wide uppercase font-mono text-[#70ba65]">
              {t.footer.navigationTitle}
            </h3>
            <ul className="space-y-2 text-xs mb-6">
              <li>
                <button onClick={() => handleLink(lang === 'fr' ? '/realisations' : '/en/projects')} className="hover:text-[#70ba65] transition-colors">
                  {t.nav.projects}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink(lang === 'fr' ? '/tarifs' : '/en/pricing')} className="hover:text-[#70ba65] transition-colors">
                  {t.nav.pricing}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink(lang === 'fr' ? '/calculateur' : '/en/calculator')} className="hover:text-[#70ba65] transition-colors flex items-center gap-1.5 font-medium text-[#70ba65]">
                  <span>{lang === 'fr' ? 'Calculateur de devis' : 'Cost Calculator'}</span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#70ba65]/20 text-[#70ba65] border border-[#70ba65]/30">Live</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleLink(lang === 'fr' ? '/a-propos' : '/en/about')} className="hover:text-[#70ba65] transition-colors">
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink(lang === 'fr' ? '/faq' : '/en/faq')} className="hover:text-[#70ba65] transition-colors">
                  {t.nav.faq}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink(lang === 'fr' ? '/blog' : '/en/blog')} className="hover:text-[#70ba65] transition-colors">
                  {t.nav.blog}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink(lang === 'fr' ? '/contact' : '/en/contact')} className="hover:text-[#70ba65] transition-colors">
                  {t.nav.contact}
                </button>
              </li>
            </ul>

            <h4 className="text-white font-serif font-semibold text-xs mb-2 tracking-wide uppercase font-mono text-[#70ba65]">
              {t.footer.localTitle}
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => handleLink('/developpeur-web-tunisie')} className="hover:text-[#70ba65] transition-colors flex items-center gap-1">
                  <span>Développeur Web en Tunisie</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('/developpeur-web-sousse')} className="hover:text-[#70ba65] transition-colors flex items-center gap-1">
                  <span>Développeur Web à Sousse</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Coordinates */}
          <div className="space-y-4">
            <h3 className="text-white font-serif font-semibold text-sm mb-4 tracking-wide uppercase font-mono text-[#70ba65]">
              {t.footer.contactTitle}
            </h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#70ba65] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">Sousse, Tunisie</div>
                  <div className="text-[11px] text-[#919ca1]">Disponible à distance (FR, BE, CH, CA, Monde)</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#70ba65] shrink-0" />
                <a href="mailto:hello@sofienneboukhris.com" className="text-[#dedee0] hover:text-[#70ba65] transition-colors">
                  hello@sofienneboukhris.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#70ba65] shrink-0" />
                <a href="tel:+21653742140" className="text-[#dedee0] hover:text-[#70ba65] transition-colors">
                  +216 53 742 140
                </a>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => handleLink(lang === 'fr' ? '/contact' : '/en/contact')}
                className="trm-btn trm-btn-border text-[10px] w-full py-2.5"
              >
                {lang === 'fr' ? 'Demander un devis' : 'Request a Quote'}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-[#919ca1] text-center md:text-left">
            © {new Date().getFullYear()} {t.footer.copyright}
          </div>

          {/* Central Language Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#919ca1] hidden sm:inline">Lang:</span>
            <LanguageSwitcher variant="compact" id="footer-language-switcher" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[#919ca1]">
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => handleLink(lang === 'fr' ? '/a-propos' : '/en/about')}>
              {t.footer.legalNotice}
            </span>
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => handleLink('/sitemap.xml')}>
              Sitemap
            </span>
            <button
              type="button"
              onClick={() => handleLink('/admin')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#02162B] border border-[#0a3d54] text-[#70ba65] hover:border-[#70ba65] text-[11px] font-mono transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Administration</span>
            </button>
            <span className="text-[#70ba65] font-mono text-[11px]">
              Clean Code & Performance
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

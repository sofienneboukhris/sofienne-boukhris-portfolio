import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SearchModal } from './SearchModal';
import { Menu, X, ChevronDown, MessageSquare, Search, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const { path, lang, navigate } = useRouter();
  const { translations } = useData();
  const t = (translations as any)[lang] || (translations as any).fr;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Global keyboard shortcut to trigger real-time search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      // Slash key when not typing in an input
      if (
        e.key === '/' &&
        !searchOpen &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          (e.target as HTMLElement).isContentEditable
        )
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const isCurrent = (targetPath: string) => {
    if (targetPath === '/' && (path === '/' || path === '/en' || path === '/en/')) return true;
    return path.startsWith(targetPath) && targetPath !== '/';
  };

  const navLinks = [
    { label: t.nav.home, to: lang === 'fr' ? '/' : '/en/' },
    {
      label: t.nav.services,
      to: lang === 'fr' ? '/services' : '/en/services',
      hasDropdown: true
    },
    { label: t.nav.projects, to: lang === 'fr' ? '/realisations' : '/en/projects' },
    { label: t.nav.pricing, to: lang === 'fr' ? '/tarifs' : '/en/pricing' },
    { label: lang === 'fr' ? 'Calculateur' : 'Calculator', to: lang === 'fr' ? '/calculateur' : '/en/calculator' },
    { label: t.nav.about, to: lang === 'fr' ? '/a-propos' : '/en/about' },
    { label: t.nav.blog, to: lang === 'fr' ? '/blog' : '/en/blog' },
    { label: t.nav.faq, to: lang === 'fr' ? '/faq' : '/en/faq' },
    { label: t.nav.contact, to: lang === 'fr' ? '/contact' : '/en/contact' }
  ];

  const serviceSubLinks = [
    { title: lang === 'fr' ? 'Création site web sur mesure' : 'Custom Website', to: '/services/creation-site-web' },
    { title: lang === 'fr' ? 'Site vitrine' : 'Showcase Website', to: '/services/site-vitrine' },
    { title: lang === 'fr' ? 'Site e-commerce' : 'E-Commerce Store', to: '/services/site-e-commerce' },
    { title: 'WooCommerce', to: '/services/site-e-commerce/woocommerce' },
    { title: 'Shopify', to: '/services/site-e-commerce/shopify' },
    { title: 'WordPress sur mesure', to: '/services/wordpress' },
    { title: lang === 'fr' ? 'Application web' : 'Web Applications', to: '/services/application-web' },
    { title: 'Laravel & PHP', to: '/services/developpement-laravel' },
    { title: lang === 'fr' ? 'Refonte de site web' : 'Website Redesign', to: '/services/refonte-site-web' },
    { title: lang === 'fr' ? 'Maintenance de site web' : 'Website Maintenance', to: '/services/maintenance-site-web' },
    { title: lang === 'fr' ? 'Optimisation performance & SEO' : 'Speed Optimization & SEO', to: '/services/optimisation-performance' }
  ];

  const handleNavigate = (targetPath: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    navigate(targetPath);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetPath: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    handleNavigate(targetPath);
  };

  return (
    <header id="site-header" className="sticky top-0 z-50 bg-[#00283A] border-b border-[#0a3d54]/60 shadow-lg transition-colors print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <a 
          href={lang === 'fr' ? '/' : '/en/'}
          onClick={(e) => handleLinkClick(e, lang === 'fr' ? '/' : '/en/')} 
          className="flex items-center gap-3 cursor-pointer group select-none no-underline"
          id="site-logo-brand"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-[#00151F] border border-[#70ba65]/40 flex items-center justify-center group-hover:border-[#70ba65] group-hover:shadow-[0_0_15px_rgba(112,186,101,0.3)] transition-all flex-shrink-0">
            <img 
              src="/assets/logo.webp" 
              alt="Sofienne Boukhris Logo" 
              width="44"
              height="44"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform"
              loading="eager"
            />
          </div>
          <div>
            <div className="text-white font-serif font-bold text-base sm:text-lg tracking-wide group-hover:text-[#70ba65] transition-colors flex items-center gap-1.5">
              Sofienne Boukhris
              <span className="inline-block w-2 h-2 rounded-full bg-[#70ba65]"></span>
            </div>
            <div className="text-[11px] text-[#919ca1] font-mono uppercase tracking-wider">
              {lang === 'fr' ? 'Freelance Full-Stack' : 'Freelance Developer'}
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div 
                  key={link.to} 
                  className="relative group"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <a
                    href={link.to}
                    onClick={(e) => handleLinkClick(e, link.to)}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors py-2 no-underline ${
                      isCurrent('/services') || isCurrent('/en/services')
                        ? 'text-[#70ba65] font-semibold'
                        : 'text-[#dedee0] hover:text-[#70ba65]'
                    }`}
                    aria-expanded={servicesDropdownOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
                  </a>

                  {/* Dropdown Menu */}
                  {servicesDropdownOpen && (
                    <div className="absolute top-full left-0 w-72 bg-[#00283A] border border-[#0a3d54] rounded-lg shadow-2xl py-2 mt-1 z-50 animate-fadeIn">
                      <div className="px-3 py-1.5 text-[10px] font-mono tracking-widest text-[#70ba65] uppercase border-b border-[#0a3d54]/40">
                        {lang === 'fr' ? 'Nos Prestations' : 'Our Services'}
                      </div>
                      {serviceSubLinks.map((sub) => (
                        <a
                          key={sub.to}
                          href={sub.to}
                          onClick={(e) => handleLinkClick(e, sub.to)}
                          className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center justify-between no-underline hover:bg-[#02162B] hover:text-[#70ba65] ${
                            path === sub.to ? 'text-[#70ba65] bg-[#02162B]/50 font-medium' : 'text-[#dedee0]'
                          }`}
                        >
                          <span>{sub.title}</span>
                          <span className="text-[10px] text-[#919ca1]">→</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a
                key={link.to}
                href={link.to}
                onClick={(e) => handleLinkClick(e, link.to)}
                className={`text-sm font-medium transition-colors no-underline ${
                  isCurrent(link.to)
                    ? 'text-[#70ba65] font-semibold'
                    : 'text-[#dedee0] hover:text-[#70ba65]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action Area */}
        <div className="hidden sm:flex items-center gap-3 lg:gap-4">
          {/* Real-time Site Search Trigger (Desktop/Tablet) */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            id="header-search-btn-desktop"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#02162B] border border-[#0a3d54] text-xs text-[#919ca1] hover:text-white hover:border-[#70ba65]/60 transition-all cursor-pointer group shadow-inner"
            aria-label={lang === 'fr' ? 'Rechercher sur le site (⌘K)' : 'Search site (⌘K)'}
            title={lang === 'fr' ? 'Rechercher un projet, article, techno (⌘K)' : 'Search projects, posts, tech (⌘K)'}
          >
            <Search className="w-3.5 h-3.5 text-[#70ba65] group-hover:scale-110 transition-transform" />
            <span className="font-sans text-[#dedee0] group-hover:text-white hidden md:inline">
              {lang === 'fr' ? 'Rechercher...' : 'Search...'}
            </span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#00151F] border border-[#0a3d54] text-[10px] font-mono text-[#919ca1] group-hover:text-[#dedee0]">
              <span className="text-[11px]">⌘</span>K
            </kbd>
          </button>

          {/* Language Switcher */}
          <LanguageSwitcher variant="pills" showIcon={true} id="header-language-switcher-desktop" />

          {/* Admin Dashboard shortcut */}
          <a
            href="/admin"
            onClick={(e) => handleLinkClick(e, '/admin')}
            className="p-2 rounded-lg bg-[#02162B] border border-[#0a3d54] text-[#919ca1] hover:text-[#70ba65] hover:border-[#70ba65]/60 transition-colors cursor-pointer no-underline inline-flex items-center justify-center"
            title="Dashboard Administrateur"
            aria-label="Dashboard Administrateur"
          >
            <ShieldCheck className="w-4 h-4" />
          </a>

          {/* Primary CTA Button */}
          <a
            href={lang === 'fr' ? '/contact' : '/en/contact'}
            onClick={(e) => handleLinkClick(e, lang === 'fr' ? '/contact' : '/en/contact')}
            className="trm-btn trm-btn-primary shadow-md text-xs tracking-wider no-underline inline-flex items-center justify-center"
            id="header-cta-quote-btn"
          >
            {t.nav.ctaQuote}
          </a>
        </div>

        {/* Mobile menu trigger & mobile search */}
        <div className="flex items-center gap-2 xl:hidden">
          {/* Mobile Search Button */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-lg bg-[#02162B] border border-[#0a3d54] text-[#dedee0] hover:text-white hover:border-[#70ba65]/60 transition-colors cursor-pointer"
            aria-label={lang === 'fr' ? 'Rechercher sur le site' : 'Search site'}
            id="header-search-btn-mobile"
          >
            <Search className="w-4 h-4 text-[#70ba65]" />
          </button>

          {/* Mobile Language switch */}
          <LanguageSwitcher variant="compact" id="header-language-switcher-mobile" className="mr-1" />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg bg-[#02162B] border border-[#0a3d54] text-[#dedee0] hover:text-white cursor-pointer"
            aria-label={mobileMenuOpen ? (lang === 'fr' ? 'Fermer le menu' : 'Close navigation menu') : (lang === 'fr' ? 'Ouvrir le menu' : 'Open navigation menu')}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav"
          role="region"
          aria-label={lang === 'fr' ? 'Menu de navigation mobile' : 'Mobile navigation menu'}
          className="xl:hidden bg-[#00283A] border-b border-[#0a3d54] px-4 pt-2 pb-6 space-y-2 shadow-2xl animate-fadeIn"
        >
          {/* Quick Search inside Mobile Menu */}
          <div className="pb-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#02162B] border border-[#0a3d54] text-xs text-[#919ca1] hover:text-white hover:border-[#70ba65]/60 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#70ba65]" />
                <span>{lang === 'fr' ? 'Rechercher projets, articles...' : 'Search projects, posts...'}</span>
              </div>
              <kbd className="text-[10px] font-mono bg-[#00151F] px-1.5 py-0.5 rounded border border-[#0a3d54] text-[#70ba65]">
                ⌘K
              </kbd>
            </button>
          </div>
          {navLinks.map((link) => (
            <div key={link.to}>
              <a
                href={link.to}
                onClick={(e) => handleLinkClick(e, link.to)}
                className={`block w-full text-left py-2.5 px-3 rounded-md text-sm font-medium transition-colors no-underline ${
                  isCurrent(link.to)
                    ? 'bg-[#02162B] text-[#70ba65] font-semibold'
                    : 'text-[#dedee0] hover:bg-[#02162B]'
                }`}
              >
                {link.label}
              </a>

              {link.hasDropdown && (
                <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-[#0a3d54] ml-3 mt-1">
                  {serviceSubLinks.slice(0, 5).map((sub) => (
                    <a
                      key={sub.to}
                      href={sub.to}
                      onClick={(e) => handleLinkClick(e, sub.to)}
                      className="block w-full text-left py-1 text-xs text-[#919ca1] hover:text-[#70ba65] no-underline"
                    >
                      • {sub.title}
                    </a>
                  ))}
                  <a
                    href={lang === 'fr' ? '/services' : '/en/services'}
                    onClick={(e) => handleLinkClick(e, lang === 'fr' ? '/services' : '/en/services')}
                    className="block w-full text-left py-1 text-xs text-[#70ba65] font-medium no-underline"
                  >
                    {lang === 'fr' ? '→ Voir tous les services' : '→ View all services'}
                  </a>
                </div>
              )}
            </div>
          ))}

          <div className="pt-4 border-t border-[#0a3d54]/60 flex flex-col gap-2">
            <a
              href="/admin"
              onClick={(e) => handleLinkClick(e, '/admin')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#02162B] border border-[#0a3d54] text-xs font-mono text-[#70ba65] hover:border-[#70ba65] transition-colors no-underline"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Panneau d'Administration</span>
            </a>
            <a
              href={lang === 'fr' ? '/contact' : '/en/contact'}
              onClick={(e) => handleLinkClick(e, lang === 'fr' ? '/contact' : '/en/contact')}
              className="trm-btn trm-btn-primary w-full text-center py-3 no-underline inline-flex items-center justify-center"
            >
              {t.nav.ctaQuote}
            </a>
            <a
              href="https://wa.me/21653742140?text=Bonjour%20Sofienne,%20je%20souhaite%20discuter%20d'un%20projet%20web"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-xs font-semibold py-2.5 px-4 rounded-full border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 transition-colors no-underline"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp: +216 53 742 140
            </a>
          </div>
        </div>
      )}

      {/* Real-Time Site Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </header>
  );
};

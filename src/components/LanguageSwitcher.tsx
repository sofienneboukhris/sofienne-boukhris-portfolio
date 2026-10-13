import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { Language } from '../types';
import { Globe, Check, ChevronDown, Languages } from 'lucide-react';

export interface LanguageSwitcherProps {
  /**
   * Visual layout variant:
   * - 'pills': Segmented switch with pill highlights (ideal for headers and navbars)
   * - 'compact': Smaller pills for tight spaces or mobile headers
   * - 'dropdown': Dropdown select with full language labels & checkmarks
   * - 'toggle': Single compact click-to-toggle button with Globe icon
   * - 'minimal': Text-only links
   */
  variant?: 'pills' | 'compact' | 'dropdown' | 'toggle' | 'minimal';
  /**
   * Optional custom wrapper class name
   */
  className?: string;
  /**
   * Whether to display the Globe icon next to or within the control
   */
  showIcon?: boolean;
  /**
   * Unique ID for testing and styling
   */
  id?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'pills',
  className = '',
  showIcon = false,
  id = 'language-switcher'
}) => {
  const { lang, setLang, toggleLang, getEquivalentRoute } = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isEn = lang === 'en';

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropdownOpen]);

  // Handle keyboard escape for dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dropdownOpen) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dropdownOpen]);

  const targetPathFr = getEquivalentRoute('fr');
  const targetPathEn = getEquivalentRoute('en');
  const targetPathAr = getEquivalentRoute('ar');

  // DROPDOWN VARIANT
  if (variant === 'dropdown') {
    return (
      <div 
        ref={dropdownRef} 
        className={`relative inline-block text-left ${className}`}
        id={id}
      >
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
          aria-label={lang === 'ar' ? 'اختر اللغة' : isEn ? 'Select language' : 'Sélectionner la langue'}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#02162B] border border-[#0a3d54] text-[#dedee0] hover:text-white hover:border-[#70ba65]/60 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#70ba65]"
        >
          <Globe className="w-3.5 h-3.5 text-[#70ba65]" />
          <span className="uppercase font-mono tracking-wider">{lang}</span>
          <ChevronDown className={`w-3 h-3 text-[#919ca1] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {dropdownOpen && (
          <div 
            className="absolute right-0 mt-2 w-44 rounded-xl bg-[#00283A] border border-[#0a3d54] shadow-2xl py-1.5 z-50 animate-fadeIn focus:outline-none"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="px-3 py-1 text-[10px] font-mono uppercase text-[#919ca1] border-b border-[#0a3d54]/60">
              {lang === 'ar' ? 'اللغات المتاحة' : isEn ? 'Select Language' : 'Choisir la langue'}
            </div>

            <button
              onClick={() => {
                setLang('fr');
                setDropdownOpen(false);
              }}
              role="menuitem"
              className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors ${
                lang === 'fr'
                  ? 'bg-[#02162B] text-[#70ba65] font-bold'
                  : 'text-[#dedee0] hover:bg-[#02162B] hover:text-white'
              }`}
              title={`Passer en Français (${targetPathFr})`}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#0a3d54] text-white">FR</span>
                <span>Français</span>
              </div>
              {lang === 'fr' && <Check className="w-3.5 h-3.5 text-[#70ba65]" />}
            </button>

            <button
              onClick={() => {
                setLang('en');
                setDropdownOpen(false);
              }}
              role="menuitem"
              className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors ${
                lang === 'en'
                  ? 'bg-[#02162B] text-[#70ba65] font-bold'
                  : 'text-[#dedee0] hover:bg-[#02162B] hover:text-white'
              }`}
              title={`Switch to English (${targetPathEn})`}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#0a3d54] text-white">EN</span>
                <span>English</span>
              </div>
              {lang === 'en' && <Check className="w-3.5 h-3.5 text-[#70ba65]" />}
            </button>

            <button
              onClick={() => {
                setLang('ar');
                setDropdownOpen(false);
              }}
              role="menuitem"
              className={`w-full flex items-center justify-between px-3.5 py-2 text-xs transition-colors ${
                lang === 'ar'
                  ? 'bg-[#02162B] text-[#70ba65] font-bold'
                  : 'text-[#dedee0] hover:bg-[#02162B] hover:text-white'
              }`}
              title={`التحويل إلى العربية (${targetPathAr})`}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#0a3d54] text-white">AR</span>
                <span>العربية</span>
              </div>
              {lang === 'ar' && <Check className="w-3.5 h-3.5 text-[#70ba65]" />}
            </button>
          </div>
        )}
      </div>
    );
  }

  // SINGLE TOGGLE BUTTON VARIANT
  if (variant === 'toggle') {
    const order: Language[] = ['fr', 'en', 'ar'];
    const nextLang = order[(order.indexOf(lang) + 1) % order.length];

    return (
      <button
        type="button"
        id={id}
        onClick={toggleLang}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#02162B] border border-[#0a3d54] hover:border-[#70ba65] text-xs font-mono font-semibold transition-all group shadow-sm focus:outline-none focus:ring-2 focus:ring-[#70ba65] ${className}`}
        title={`Passer à ${nextLang.toUpperCase()}`}
        aria-label="Toggle language"
      >
        <Languages className="w-3.5 h-3.5 text-[#70ba65] group-hover:rotate-12 transition-transform" />
        <span className="text-[#dedee0] group-hover:text-white">
          <strong className="text-white">{lang.toUpperCase()}</strong>
          <span className="text-[#919ca1] mx-1">/</span>
          <span className="text-[#919ca1] group-hover:text-[#70ba65]">{nextLang.toUpperCase()}</span>
        </span>
      </button>
    );
  }

  // MINIMAL TEXT LINKS VARIANT
  if (variant === 'minimal') {
    return (
      <div 
        id={id} 
        className={`inline-flex items-center gap-2 text-xs font-mono ${className}`}
        role="group"
        aria-label="Language selection"
      >
        {showIcon && <Globe className="w-3.5 h-3.5 text-[#70ba65]" />}
        <button
          onClick={() => setLang('fr')}
          className={`transition-colors uppercase tracking-wider ${
            lang === 'fr' 
              ? 'text-[#70ba65] font-bold border-b border-[#70ba65]' 
              : 'text-[#919ca1] hover:text-white'
          }`}
          aria-pressed={lang === 'fr'}
          title="Français"
        >
          FR
        </button>
        <span className="text-[#0a3d54]">|</span>
        <button
          onClick={() => setLang('en')}
          className={`transition-colors uppercase tracking-wider ${
            lang === 'en' 
              ? 'text-[#70ba65] font-bold border-b border-[#70ba65]' 
              : 'text-[#919ca1] hover:text-white'
          }`}
          aria-pressed={lang === 'en'}
          title="English"
        >
          EN
        </button>
        <span className="text-[#0a3d54]">|</span>
        <button
          onClick={() => setLang('ar')}
          className={`transition-colors tracking-wider ${
            lang === 'ar' 
              ? 'text-[#70ba65] font-bold border-b border-[#70ba65]' 
              : 'text-[#919ca1] hover:text-white'
          }`}
          aria-pressed={lang === 'ar'}
          title="العربية"
        >
          عربي
        </button>
      </div>
    );
  }

  // COMPACT PILLS VARIANT (Ideal for mobile headers or tight spaces)
  if (variant === 'compact') {
    return (
      <div
        id={id}
        className={`inline-flex items-center bg-[#02162B] border border-[#0a3d54] rounded-full p-0.5 text-xs ${className}`}
        role="group"
        aria-label="Language switcher"
      >
        <button
          type="button"
          onClick={() => setLang('fr')}
          aria-pressed={lang === 'fr'}
          aria-current={lang === 'fr' ? 'true' : undefined}
          className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold transition-all focus:outline-none ${
            lang === 'fr'
              ? 'bg-[#70ba65] text-[#001E2B] shadow-sm'
              : 'text-[#919ca1] hover:text-white'
          }`}
          title="Français"
        >
          FR
        </button>
        <button
          type="button"
          onClick={() => setLang('en')}
          aria-pressed={lang === 'en'}
          aria-current={lang === 'en' ? 'true' : undefined}
          className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold transition-all focus:outline-none ${
            lang === 'en'
              ? 'bg-[#70ba65] text-[#001E2B] shadow-sm'
              : 'text-[#919ca1] hover:text-white'
          }`}
          title="English"
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setLang('ar')}
          aria-pressed={lang === 'ar'}
          aria-current={lang === 'ar' ? 'true' : undefined}
          className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold transition-all focus:outline-none ${
            lang === 'ar'
              ? 'bg-[#70ba65] text-[#001E2B] shadow-sm'
              : 'text-[#919ca1] hover:text-white'
          }`}
          title="العربية"
        >
          AR
        </button>
      </div>
    );
  }

  // DEFAULT 'pills' VARIANT (Desktop header, prominent & accessible)
  return (
    <div
      id={id}
      className={`inline-flex items-center gap-1 bg-[#02162B] border border-[#0a3d54] rounded-full p-1 text-xs shadow-inner ${className}`}
      role="group"
      aria-label="Language switcher"
    >
      {showIcon && (
        <span className="pl-1.5 text-[#70ba65] select-none" aria-hidden="true">
          <Globe className="w-3.5 h-3.5" />
        </span>
      )}

      <button
        type="button"
        onClick={() => setLang('fr')}
        aria-pressed={lang === 'fr'}
        aria-current={lang === 'fr' ? 'true' : undefined}
        className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold tracking-wide transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#70ba65] ${
          lang === 'fr'
            ? 'bg-[#70ba65] text-[#001E2B] shadow-sm font-extrabold'
            : 'text-[#919ca1] hover:text-white hover:bg-[#0a3d54]/30'
        }`}
        title="Passer en Français"
      >
        FR
      </button>

      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        aria-current={lang === 'en' ? 'true' : undefined}
        className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold tracking-wide transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#70ba65] ${
          lang === 'en'
            ? 'bg-[#70ba65] text-[#001E2B] shadow-sm font-extrabold'
            : 'text-[#919ca1] hover:text-white hover:bg-[#0a3d54]/30'
        }`}
        title="Switch to English"
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => setLang('ar')}
        aria-pressed={lang === 'ar'}
        aria-current={lang === 'ar' ? 'true' : undefined}
        className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold tracking-wide transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#70ba65] ${
          lang === 'ar'
            ? 'bg-[#70ba65] text-[#001E2B] shadow-sm font-extrabold'
            : 'text-[#919ca1] hover:text-white hover:bg-[#0a3d54]/30'
        }`}
        title="التحويل إلى العربية"
      >
        AR
      </button>
    </div>
  );
};

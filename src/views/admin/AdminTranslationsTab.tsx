import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Language } from '../../types';
import {
  Languages,
  Search,
  Save,
  Check,
  Globe,
  Layers,
  ChevronDown,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const AdminTranslationsTab: React.FC = () => {
  const { translations, updateTranslationText, updateWholeTranslations } = useData();

  const [activeLang, setActiveLang] = useState<Language>('fr');
  const [selectedSection, setSelectedSection] = useState<string>('hero');
  const [searchQuery, setSearchQuery] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const sections = [
    { key: 'nav', label: 'Navigation & En-tête', count: 9 },
    { key: 'hero', label: 'Hero / Bannière Principale', count: 10 },
    { key: 'calculator', label: 'Calculateur de Devis', count: 15 },
    { key: 'common', label: 'Boutons & Textes Communs', count: 8 },
    { key: 'footer', label: 'Pied de page & Légal', count: 6 },
    { key: 'contact', label: 'Formulaire de Contact', count: 8 }
  ];

  // Retrieve current translations dictionary safely
  const currentLangData = (translations as any)[activeLang] || {};
  const sectionContent = currentLangData[selectedSection] || {};

  // For comparison, get default French text
  const frenchData = (translations as any).fr?.[selectedSection] || {};

  // Handle single key text update
  const handleTextChange = (subKey: string, val: string) => {
    updateTranslationText(activeLang, selectedSection, subKey, val);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 1500);
  };

  // Filter keys by search query
  const matchingKeys = Object.keys(frenchData).filter(key => {
    const frVal = String(frenchData[key] || '');
    const currentVal = String(sectionContent[key] || '');
    const query = searchQuery.toLowerCase();
    return (
      key.toLowerCase().includes(query) ||
      frVal.toLowerCase().includes(query) ||
      currentVal.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Info & Language Selector */}
      <div className="bg-[#00283A] border border-[#0a3d54] p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#70ba65]/10 border border-[#70ba65]/30 text-[#70ba65] text-xs font-mono mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>Français défini comme langue par défaut</span>
          </div>
          <h2 className="text-base font-bold text-white">
            Gestion Centralisée des Traductions (FR / EN / AR)
          </h2>
          <p className="text-xs text-[#919ca1] mt-0.5">
            Modifiez en direct les textes du site. Les changements sont immédiatement appliqués sur le front-end.
          </p>
        </div>

        {/* Language selector tabs */}
        <div className="flex items-center gap-1.5 bg-[#00151F] border border-[#0a3d54] p-1.5 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveLang('fr')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
              activeLang === 'fr'
                ? 'bg-[#70ba65] text-[#00151F] shadow-sm'
                : 'text-[#919ca1] hover:text-white'
            }`}
          >
            🇫🇷 Français (Défaut)
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('en')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
              activeLang === 'en'
                ? 'bg-[#70ba65] text-[#00151F] shadow-sm'
                : 'text-[#919ca1] hover:text-white'
            }`}
          >
            🇬🇧 English
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('ar')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
              activeLang === 'ar'
                ? 'bg-[#70ba65] text-[#00151F] shadow-sm'
                : 'text-[#919ca1] hover:text-white'
            }`}
          >
            🇹🇳 العربية
          </button>
        </div>
      </div>

      {/* Main Translation Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sections Sidebar */}
        <div className="bg-[#00283A] border border-[#0a3d54] rounded-xl p-3 space-y-1 self-start">
          <div className="text-[11px] font-mono font-bold uppercase text-[#919ca1] px-3 py-2">
            Modules du site
          </div>
          {sections.map(sec => (
            <button
              key={sec.key}
              onClick={() => setSelectedSection(sec.key)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-all ${
                selectedSection === sec.key
                  ? 'bg-[#70ba65] text-[#00151F] font-bold shadow-sm'
                  : 'text-[#dedee0] hover:bg-[#02162B] hover:text-white'
              }`}
            >
              <span>{sec.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  selectedSection === sec.key
                    ? 'bg-[#00151F]/20 text-[#00151F]'
                    : 'bg-[#00151F] text-[#919ca1]'
                }`}
              >
                {sec.key}
              </span>
            </button>
          ))}
        </div>

        {/* Translation editor */}
        <div className="lg:col-span-3 bg-[#00283A] border border-[#0a3d54] rounded-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#0a3d54] pb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Languages className="w-4 h-4 text-[#70ba65]" />
                <span>
                  Section : {sections.find(s => s.key === selectedSection)?.label} ({activeLang.toUpperCase()})
                </span>
              </h3>
              <p className="text-xs text-[#919ca1] mt-0.5">
                {activeLang === 'fr'
                  ? 'Modification des textes sources de référence.'
                  : `Traductions pour la langue ${activeLang === 'en' ? 'Anglaise' : 'Arabe'}.`}
              </p>
            </div>

            {/* Search bar */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#919ca1]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Filtrer une clé..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white placeholder-[#919ca1] focus:outline-none focus:border-[#70ba65]"
              />
            </div>
          </div>

          {/* Toast feedback */}
          {saveToast && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#70ba65]/10 border border-[#70ba65]/30 text-[#70ba65] text-xs font-mono rounded-lg">
              <Check className="w-3.5 h-3.5" />
              <span>Texte mis à jour et synchronisé avec le front-end !</span>
            </div>
          )}

          {/* Keys list */}
          <div className="space-y-4">
            {matchingKeys.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#919ca1]">
                Aucune clé de traduction ne correspond à votre recherche.
              </div>
            ) : (
              matchingKeys.map(key => {
                const frDefault = String(frenchData[key] || '');
                const currentVal = String(sectionContent[key] ?? frDefault);
                const isLong = currentVal.length > 60 || frDefault.length > 60;

                return (
                  <div
                    key={key}
                    className="p-4 rounded-xl bg-[#02162B] border border-[#0a3d54] space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#70ba65]">
                        {selectedSection}.{key}
                      </span>
                      {activeLang !== 'fr' && (
                        <span className="text-[10px] font-mono text-[#919ca1]">
                          Référence FR : <em className="text-[#dedee0] not-italic">"{frDefault.slice(0, 40)}{frDefault.length > 40 ? '...' : ''}"</em>
                        </span>
                      )}
                    </div>

                    {isLong ? (
                      <textarea
                        rows={3}
                        value={currentVal}
                        onChange={e => handleTextChange(key, e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none transition-colors"
                        dir={activeLang === 'ar' ? 'rtl' : 'ltr'}
                      />
                    ) : (
                      <input
                        type="text"
                        value={currentVal}
                        onChange={e => handleTextChange(key, e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none transition-colors"
                        dir={activeLang === 'ar' ? 'rtl' : 'ltr'}
                      />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

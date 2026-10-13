import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { ProjectTypeOption, FeatureOption, ProjectTypeId, FeatureCategoryId } from '../../types/calculator';
import { Language } from '../../types';
import { validatePrice } from '../../utils/priceValidation';
import {
  Calculator,
  Plus,
  Edit2,
  Trash2,
  Save,
  Check,
  Globe,
  Sliders,
  Sparkles,
  Layers,
  DollarSign,
  AlertCircle,
  Eye,
  EyeOff,
  X
} from 'lucide-react';

export const AdminCalculatorTab: React.FC = () => {
  const {
    projectTypes,
    updateProjectType,
    addProjectType,
    deleteProjectType,
    toggleProjectTypeActive,
    features,
    updateFeature,
    addFeature,
    deleteFeature,
    toggleFeatureActive,
    pricingConfig,
    updatePricingConfig
  } = useData();

  const [activeSection, setActiveSection] = useState<'types' | 'features' | 'pricing'>('types');
  const [activeLang, setActiveLang] = useState<Language>('fr');

  // Rate & Extra Page Pricing Form state
  const [pricingRaw, setPricingRaw] = useState({
    pricePerExtraPageUSD: String(pricingConfig.pricePerExtraPageUSD || 40),
    pricePerExtraPageTND: String(pricingConfig.pricePerExtraPageTND || 100),
    pricePerExtraPageEUR: String(pricingConfig.pricePerExtraPageEUR || 35),
    pricePerExtraPageGBP: String(pricingConfig.pricePerExtraPageGBP || 30),
    pricePerExtraPageCAD: String(pricingConfig.pricePerExtraPageCAD || 50),
  });
  const [pricingSaved, setPricingSaved] = useState(false);

  useEffect(() => {
    setPricingRaw({
      pricePerExtraPageUSD: String(pricingConfig.pricePerExtraPageUSD || 40),
      pricePerExtraPageTND: String(pricingConfig.pricePerExtraPageTND || 100),
      pricePerExtraPageEUR: String(pricingConfig.pricePerExtraPageEUR || 35),
      pricePerExtraPageGBP: String(pricingConfig.pricePerExtraPageGBP || 30),
      pricePerExtraPageCAD: String(pricingConfig.pricePerExtraPageCAD || 50),
    });
  }, [pricingConfig]);


  const epUSD = validatePrice(pricingRaw.pricePerExtraPageUSD, { min: 0, max: 5000, allowZero: true, required: true });
  const epTND = validatePrice(pricingRaw.pricePerExtraPageTND, { min: 0, max: 50000, allowZero: true, required: true });
  const epEUR = validatePrice(pricingRaw.pricePerExtraPageEUR, { min: 0, max: 5000, allowZero: true, required: true });
  const epGBP = validatePrice(pricingRaw.pricePerExtraPageGBP, { min: 0, max: 5000, allowZero: true, required: true });
  const epCAD = validatePrice(pricingRaw.pricePerExtraPageCAD, { min: 0, max: 5000, allowZero: true, required: true });
  const isPricingConfigValid = epUSD.isValid && epTND.isValid && epEUR.isValid && epGBP.isValid && epCAD.isValid;
  const extraPageEurValidation = epEUR;
  const extraPageTndValidation = epTND;
  const rateValidation = { isValid: true };

  // Edit ProjectType Modal state
  const [editingType, setEditingType] = useState<ProjectTypeOption | null>(null);
  const [typePriceRaw, setTypePriceRaw] = useState({
    basePriceUSD: '',
    basePriceEUR: '',
    basePriceTND: '',
    basePriceGBP: '',
    basePriceCAD: '',
    basePages: ''
  });
  const [typeModalOpen, setTypeModalOpen] = useState(false);

  // Real-time validation for Project Type
  const typeUsdValidation = validatePrice(typePriceRaw.basePriceUSD, { min: 1, allowZero: false, required: true });
  const typeEurValidation = validatePrice(typePriceRaw.basePriceEUR, { min: 1, allowZero: false, required: true });
  const typeTndValidation = validatePrice(typePriceRaw.basePriceTND, { min: 1, allowZero: false, required: true });
  const typeGbpValidation = validatePrice(typePriceRaw.basePriceGBP, { min: 1, allowZero: false, required: true });
  const typeCadValidation = validatePrice(typePriceRaw.basePriceCAD, { min: 1, allowZero: false, required: true });
  const typePagesValidation = validatePrice(typePriceRaw.basePages, {
    min: 1, max: 1000, integerOnly: true, allowZero: false, required: true
  });
  const isTypeValid =
    typeUsdValidation.isValid && typeEurValidation.isValid && typeTndValidation.isValid && typeGbpValidation.isValid && typeCadValidation.isValid &&
    typePagesValidation.isValid && Boolean(editingType?.title?.fr?.trim());

  // Edit Feature Modal state
  const [editingFeature, setEditingFeature] = useState<FeatureOption | null>(null);
  const [featurePriceRaw, setFeaturePriceRaw] = useState({
    priceUSD: '',
    priceEUR: '',
    priceTND: '',
    priceGBP: '',
    priceCAD: ''
  });
  const [featureModalOpen, setFeatureModalOpen] = useState(false);

  // Real-time validation for Feature
  const featUsd = validatePrice(featurePriceRaw.priceUSD, { min: 0, allowZero: true, required: true });
  const featureEurValidation = validatePrice(featurePriceRaw.priceEUR, { min: 0, allowZero: true, required: true });
  const featureTndValidation = validatePrice(featurePriceRaw.priceTND, { min: 0, allowZero: true, required: true });
  const featGbp = validatePrice(featurePriceRaw.priceGBP, { min: 0, allowZero: true, required: true });
  const featCad = validatePrice(featurePriceRaw.priceCAD, { min: 0, allowZero: true, required: true });
  const isFeatureValid =
    featUsd.isValid && featureEurValidation.isValid && featureTndValidation.isValid && featGbp.isValid && featCad.isValid &&
    Boolean(editingFeature?.title?.fr?.trim());

  // Save Pricing Config
  const handleSavePricingConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPricingConfigValid) return;

    updatePricingConfig({
      pricePerExtraPageUSD: epUSD.numericValue ?? 40,
      pricePerExtraPageTND: epTND.numericValue ?? 100,
      pricePerExtraPageEUR: epEUR.numericValue ?? 35,
      pricePerExtraPageGBP: epGBP.numericValue ?? 30,
      pricePerExtraPageCAD: epCAD.numericValue ?? 50,
    });
    setPricingSaved(true);
    setTimeout(() => setPricingSaved(false), 2000);
  };

  // Open Edit Type
  const handleEditType = (t: ProjectTypeOption) => {
    setEditingType({ ...t });
    setTypePriceRaw({
      basePriceUSD: String(t.basePriceUSD || 0),
      basePriceEUR: String(t.basePriceEUR || 0),
      basePriceTND: String(t.basePriceTND || 0),
      basePriceGBP: String(t.basePriceGBP || 0),
      basePriceCAD: String(t.basePriceCAD || 0),
      basePages: String(t.basePages)
    });
    setTypeModalOpen(true);
  };

  // Save Type
  const handleSaveType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingType || !isTypeValid) return;

    updateProjectType(editingType.id, {
      ...editingType,
      basePriceUSD: typeUsdValidation.numericValue ?? 550,
      basePriceEUR: typeEurValidation.numericValue ?? 500,
      basePriceTND: typeTndValidation.numericValue ?? 1500,
      basePriceGBP: typeGbpValidation.numericValue ?? 450,
      basePriceCAD: typeCadValidation.numericValue ?? 750,
      basePages: typePagesValidation.numericValue ?? 1
    });
    setTypeModalOpen(false);
  };

  // Open Edit Feature
  const handleEditFeature = (f: FeatureOption) => {
    setEditingFeature({ ...f });
    setFeaturePriceRaw({
      priceEUR: String(f.priceEUR),
      priceTND: String(f.priceTND)
    });
    setFeatureModalOpen(true);
  };

  // Open New Feature
  const handleNewFeature = () => {
    const newId = `feat-${Date.now()}`;
    setEditingFeature({
      id: newId,
      category: 'core',
      title: { fr: '', en: '', ar: '' },
      description: { fr: '', en: '', ar: '' },
      icon: 'Sparkles',
      priceEUR: 150,
      priceTND: 450,
      active: true
    });
    setFeaturePriceRaw({
      priceEUR: '150',
      priceTND: '450'
    });
    setFeatureModalOpen(true);
  };

  // Save Feature
  const handleSaveFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFeature || !isFeatureValid) return;

    const payload: FeatureOption = {
      ...editingFeature,
      priceEUR: featureEurValidation.numericValue ?? 0,
      priceTND: featureTndValidation.numericValue ?? 0
    };

    const exists = features.some(f => f.id === payload.id);
    if (exists) {
      updateFeature(payload.id, payload);
    } else {
      addFeature(payload);
    }
    setFeatureModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#00283A] border border-[#0a3d54] p-3 rounded-xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSection('types')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSection === 'types'
                ? 'bg-[#70ba65] text-[#00151F] shadow-sm'
                : 'text-[#dedee0] hover:text-white hover:bg-[#02162B]'
            }`}
          >
            Types de Projets ({projectTypes.length})
          </button>
          <button
            onClick={() => setActiveSection('features')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSection === 'features'
                ? 'bg-[#70ba65] text-[#00151F] shadow-sm'
                : 'text-[#dedee0] hover:text-white hover:bg-[#02162B]'
            }`}
          >
            Modules & Add-ons ({features.length})
          </button>
          <button
            onClick={() => setActiveSection('pricing')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSection === 'pricing'
                ? 'bg-[#70ba65] text-[#00151F] shadow-sm'
                : 'text-[#dedee0] hover:text-white hover:bg-[#02162B]'
            }`}
          >
            Tarification Pages & Devises
          </button>
        </div>

        {/* Language switch for previews */}
        <div className="flex items-center gap-1 bg-[#00151F] border border-[#0a3d54] p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveLang('fr')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold ${
              activeLang === 'fr' ? 'bg-[#70ba65] text-[#00151F]' : 'text-[#919ca1]'
            }`}
          >
            FR
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('en')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold ${
              activeLang === 'en' ? 'bg-[#70ba65] text-[#00151F]' : 'text-[#919ca1]'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('ar')}
            className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold ${
              activeLang === 'ar' ? 'bg-[#70ba65] text-[#00151F]' : 'text-[#919ca1]'
            }`}
          >
            AR
          </button>
        </div>
      </div>

      {/* SECTION 1: PROJECT TYPES */}
      {activeSection === 'types' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Types de Projets Disponibles dans le Calculator
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectTypes.map(pt => (
              <div
                key={pt.id}
                className={`bg-[#00283A] border rounded-xl p-5 transition-all shadow-md ${
                  pt.active !== false ? 'border-[#0a3d54]' : 'border-red-500/30 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">
                        {pt.title[activeLang] || pt.title.fr}
                      </span>
                      {pt.popular && (
                        <span className="text-[10px] font-mono bg-[#70ba65]/20 text-[#70ba65] px-1.5 py-0.5 rounded border border-[#70ba65]/30">
                          Populaire
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#919ca1] mt-0.5">
                      {pt.subtitle[activeLang] || pt.subtitle.fr}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleProjectTypeActive(pt.id)}
                      className={`p-1.5 rounded-lg border text-xs ${
                        pt.active !== false
                          ? 'border-[#70ba65]/40 text-[#70ba65] bg-[#70ba65]/10'
                          : 'border-red-400/40 text-red-400 bg-red-400/10'
                      }`}
                      title={pt.active !== false ? 'Actif dans le calculateur' : 'Désactivé'}
                    >
                      {pt.active !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleEditType(pt)}
                      className="p-1.5 rounded-lg border border-[#0a3d54] text-[#dedee0] hover:text-[#70ba65] hover:border-[#70ba65] bg-[#02162B]"
                      title="Modifier les tarifs & descriptions"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-[#919ca1] mt-3 line-clamp-2 leading-relaxed">
                  {pt.description[activeLang] || pt.description.fr}
                </p>

                <div className="mt-4 pt-3 border-t border-[#0a3d54]/60 flex items-center justify-between text-xs font-mono">
                  <div className="text-[#919ca1]">
                    Base : <strong className="text-white">{pt.basePages} pages incluses</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-white font-bold">{pt.basePriceEUR} €</span>
                    <span className="text-[#70ba65] font-bold ml-2">/ {pt.basePriceTND} DT</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: FEATURES & ADD-ONS */}
      {activeSection === 'features' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Modules Complémentaires & Options du Calculator
              </h3>
              <p className="text-xs text-[#919ca1] mt-0.5">
                Chaque module peut être activé, désactivé ou réévalué en prix (EUR et TND).
              </p>
            </div>
            <button
              onClick={handleNewFeature}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#70ba65] text-[#00151F] font-bold text-xs rounded-lg hover:bg-[#70ba65]/90 transition-colors shadow-sm shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Module</span>
            </button>
          </div>

          <div className="bg-[#00283A] border border-[#0a3d54] rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#dedee0]">
                <thead className="bg-[#02162B] border-b border-[#0a3d54] text-[11px] font-mono uppercase text-[#919ca1]">
                  <tr>
                    <th className="px-4 py-3">Statut</th>
                    <th className="px-4 py-3">Nom du Module ({activeLang.toUpperCase()})</th>
                    <th className="px-4 py-3">Catégorie</th>
                    <th className="px-4 py-3 text-right">Tarif EUR</th>
                    <th className="px-4 py-3 text-right">Tarif TND</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0a3d54]/50">
                  {features.map(f => (
                    <tr key={f.id} className="hover:bg-[#02162B]/50 transition-colors">
                      <td className="px-4 py-2.5">
                        <button
                          onClick={() => toggleFeatureActive(f.id)}
                          className={`p-1 rounded text-xs ${
                            f.active !== false
                              ? 'text-[#70ba65] hover:text-[#70ba65]/80'
                              : 'text-red-400 hover:text-red-300'
                          }`}
                          title={f.active !== false ? 'Actif' : 'Désactivé'}
                        >
                          {f.active !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="font-semibold text-white">
                          {f.title[activeLang] || f.title.fr}
                        </div>
                        <div className="text-[11px] text-[#919ca1] truncate max-w-sm">
                          {f.description[activeLang] || f.description.fr}
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="px-2 py-0.5 rounded bg-[#00151F] border border-[#0a3d54] font-mono text-[10px] uppercase text-[#dedee0]">
                          {f.category}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono font-bold text-white">
                        +{f.priceEUR} €
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono font-bold text-[#70ba65]">
                        +{f.priceTND} DT
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleEditFeature(f)}
                            className="p-1 rounded bg-[#00151F] border border-[#0a3d54] hover:border-[#70ba65] text-[#dedee0] hover:text-[#70ba65]"
                            title="Modifier le module"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteFeature(f.id)}
                            className="p-1 rounded bg-[#00151F] border border-[#0a3d54] hover:border-red-500 text-[#dedee0] hover:text-red-400"
                            title="Supprimer le module"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: PRICING & DEVISES CONFIG */}
      {activeSection === 'pricing' && (
        <form onSubmit={handleSavePricingConfig} className="bg-[#00283A] border border-[#0a3d54] rounded-xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#0a3d54] pb-4">
            <div>
              <h3 className="text-base font-bold text-white">Tarifs des Pages Supplémentaires & Taux</h3>
              <p className="text-xs text-[#919ca1] mt-0.5">
                Ces montants s'appliquent immédiatement dans les calculs automatiques du devis en ligne.
              </p>
            </div>
            {pricingSaved && (
              <span className="flex items-center gap-1.5 text-xs text-[#70ba65] font-bold bg-[#70ba65]/10 px-3 py-1 rounded-full border border-[#70ba65]/30">
                <Check className="w-3.5 h-3.5" />
                <span>Enregistré avec succès !</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-white mb-2">
                Prix par page supplémentaire (EUR €)
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={pricingRaw.pricePerExtraPageEUR}
                  onChange={e =>
                    setPricingRaw(prev => ({ ...prev, pricePerExtraPageEUR: e.target.value }))
                  }
                  className={`w-full px-3 py-2 text-sm font-mono font-bold bg-[#00151F] border rounded-lg text-white focus:outline-none transition-colors ${
                    !extraPageEurValidation.isValid
                      ? 'border-red-500 bg-red-950/20 text-red-300'
                      : 'border-[#0a3d54] focus:border-[#70ba65]'
                  }`}
                  placeholder="35"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#919ca1] font-mono">
                  EUR
                </span>
              </div>
              {!extraPageEurValidation.isValid ? (
                <p className="text-[11px] text-red-400 font-mono mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{extraPageEurValidation.errorMessage}</span>
                </p>
              ) : (
                <p className="text-[11px] text-[#919ca1] mt-1">Valeur actuelle : {pricingConfig.pricePerExtraPageEUR} €</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-white mb-2">
                Prix par page supplémentaire (TND DT)
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={pricingRaw.pricePerExtraPageTND}
                  onChange={e =>
                    setPricingRaw(prev => ({ ...prev, pricePerExtraPageTND: e.target.value }))
                  }
                  className={`w-full px-3 py-2 text-sm font-mono font-bold bg-[#00151F] border rounded-lg text-white focus:outline-none transition-colors ${
                    !extraPageTndValidation.isValid
                      ? 'border-red-500 bg-red-950/20 text-red-300'
                      : 'border-[#0a3d54] focus:border-[#70ba65]'
                  }`}
                  placeholder="100"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#919ca1] font-mono">
                  DT
                </span>
              </div>
              {!extraPageTndValidation.isValid ? (
                <p className="text-[11px] text-red-400 font-mono mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{extraPageTndValidation.errorMessage}</span>
                </p>
              ) : (
                <p className="text-[11px] text-[#919ca1] mt-1">Valeur actuelle : {pricingConfig.pricePerExtraPageTND} DT</p>
              )}
            </div>

            
          </div>

          {!isPricingConfigValid && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Veuillez renseigner des montants numériques valides pour tous les tarifs avant d'appliquer les modifications.</span>
            </div>
          )}

          <div className="pt-4 border-t border-[#0a3d54] flex justify-end">
            <button
              type="submit"
              disabled={!isPricingConfigValid}
              className={`inline-flex items-center gap-2 px-5 py-2.5 font-bold text-xs rounded-lg transition-colors shadow-md ${
                isPricingConfigValid
                  ? 'bg-[#70ba65] text-[#00151F] hover:bg-[#70ba65]/90 cursor-pointer'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed border border-gray-600 opacity-60'
              }`}
              title={!isPricingConfigValid ? "Saisie numérique invalide" : undefined}
            >
              <Save className="w-4 h-4" />
              <span>Appliquer les tarifs au Calculator</span>
            </button>
          </div>
        </form>
      )}

      {/* EDIT PROJECT TYPE MODAL */}
      {typeModalOpen && editingType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#00283A] border border-[#0a3d54] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-[#02162B] border-b border-[#0a3d54]">
              <h3 className="text-sm font-bold text-white">
                Modifier le Type de Projet : {editingType.title.fr}
              </h3>
              <button
                onClick={() => setTypeModalOpen(false)}
                className="p-1 rounded-lg text-[#919ca1] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveType} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="block text-xs font-bold text-white mb-1">Base USD ($)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={typePriceRaw.basePriceUSD}
                    onChange={e =>
                      setTypePriceRaw(prev => ({ ...prev, basePriceUSD: e.target.value }))
                    }
                    className={`w-full px-3 py-2 text-xs font-mono font-bold bg-[#00151F] border rounded-lg text-[#70ba65] focus:outline-none transition-colors ${
                      !typeUsdValidation.isValid
                        ? 'border-red-500 bg-red-950/20 text-red-300'
                        : 'border-[#0a3d54] focus:border-[#70ba65]'
                    }`}
                    placeholder="500"
                  />
                  {!typeUsdValidation.isValid && (
                    <p className="text-[10px] text-red-400 font-mono mt-1 flex items-center gap-1">
                      <AlertCircle className="w-2.5 h-2.5 shrink-0" />
                      <span>{typeUsdValidation.errorMessage}</span>
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-white mb-1">Base EUR (€)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={typePriceRaw.basePriceEUR}
                    onChange={e =>
                      setTypePriceRaw(prev => ({ ...prev, basePriceEUR: e.target.value }))
                    }
                    className={`w-full px-3 py-2 text-xs font-mono font-bold bg-[#00151F] border rounded-lg text-[#70ba65] focus:outline-none transition-colors ${
                      !typeEurValidation.isValid
                        ? 'border-red-500 bg-red-950/20 text-red-300'
                        : 'border-[#0a3d54] focus:border-[#70ba65]'
                    }`}
                    placeholder="500"
                  />
                  {!typeEurValidation.isValid && (
                    <p className="text-[10px] text-red-400 font-mono mt-1 flex items-center gap-1">
                      <AlertCircle className="w-2.5 h-2.5 shrink-0" />
                      <span>{typeEurValidation.errorMessage}</span>
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-white mb-1">Base TND (DT)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={typePriceRaw.basePriceTND}
                    onChange={e =>
                      setTypePriceRaw(prev => ({ ...prev, basePriceTND: e.target.value }))
                    }
                    className={`w-full px-3 py-2 text-xs font-mono font-bold bg-[#00151F] border rounded-lg text-[#70ba65] focus:outline-none transition-colors ${
                      !typeTndValidation.isValid
                        ? 'border-red-500 bg-red-950/20 text-red-300'
                        : 'border-[#0a3d54] focus:border-[#70ba65]'
                    }`}
                    placeholder="500"
                  />
                  {!typeTndValidation.isValid && (
                    <p className="text-[10px] text-red-400 font-mono mt-1 flex items-center gap-1">
                      <AlertCircle className="w-2.5 h-2.5 shrink-0" />
                      <span>{typeTndValidation.errorMessage}</span>
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-white mb-1">Base GBP (£)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={typePriceRaw.basePriceGBP}
                    onChange={e =>
                      setTypePriceRaw(prev => ({ ...prev, basePriceGBP: e.target.value }))
                    }
                    className={`w-full px-3 py-2 text-xs font-mono font-bold bg-[#00151F] border rounded-lg text-[#70ba65] focus:outline-none transition-colors ${
                      !typeGbpValidation.isValid
                        ? 'border-red-500 bg-red-950/20 text-red-300'
                        : 'border-[#0a3d54] focus:border-[#70ba65]'
                    }`}
                    placeholder="500"
                  />
                  {!typeGbpValidation.isValid && (
                    <p className="text-[10px] text-red-400 font-mono mt-1 flex items-center gap-1">
                      <AlertCircle className="w-2.5 h-2.5 shrink-0" />
                      <span>{typeGbpValidation.errorMessage}</span>
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-white mb-1">Base CAD (C$)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={typePriceRaw.basePriceCAD}
                    onChange={e =>
                      setTypePriceRaw(prev => ({ ...prev, basePriceCAD: e.target.value }))
                    }
                    className={`w-full px-3 py-2 text-xs font-mono font-bold bg-[#00151F] border rounded-lg text-[#70ba65] focus:outline-none transition-colors ${
                      !typeCadValidation.isValid
                        ? 'border-red-500 bg-red-950/20 text-red-300'
                        : 'border-[#0a3d54] focus:border-[#70ba65]'
                    }`}
                    placeholder="500"
                  />
                  {!typeCadValidation.isValid && (
                    <p className="text-[10px] text-red-400 font-mono mt-1 flex items-center gap-1">
                      <AlertCircle className="w-2.5 h-2.5 shrink-0" />
                      <span>{typeCadValidation.errorMessage}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">Pages de base incluses</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={typePriceRaw.basePages}
                  onChange={e =>
                    setTypePriceRaw(prev => ({ ...prev, basePages: e.target.value }))
                  }
                  className={`w-full px-3 py-2 text-xs font-mono bg-[#00151F] border rounded-lg text-white focus:outline-none transition-colors ${
                    !typePagesValidation.isValid
                      ? 'border-red-500 bg-red-950/20 text-red-300'
                      : 'border-[#0a3d54] focus:border-[#70ba65]'
                  }`}
                  placeholder="1"
                />
                {!typePagesValidation.isValid && (
                  <p className="text-[10px] text-red-400 font-mono mt-1 flex items-center gap-1">
                    <AlertCircle className="w-2.5 h-2.5 shrink-0" />
                    <span>{typePagesValidation.errorMessage}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">Titre (Français) *</label>
                <input
                  type="text"
                  value={editingType.title.fr}
                  onChange={e =>
                    setEditingType({
                      ...editingType,
                      title: { ...editingType.title, fr: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">Titre (English)</label>
                <input
                  type="text"
                  value={editingType.title.en || ''}
                  onChange={e =>
                    setEditingType({
                      ...editingType,
                      title: { ...editingType.title, en: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">Titre (العربية)</label>
                <input
                  type="text"
                  value={editingType.title.ar || ''}
                  onChange={e =>
                    setEditingType({
                      ...editingType,
                      title: { ...editingType.title, ar: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                  dir="rtl"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-white">
                  <input
                    type="checkbox"
                    checked={editingType.popular || false}
                    onChange={e => setEditingType({ ...editingType, popular: e.target.checked })}
                    className="w-4 h-4 rounded accent-[#70ba65]"
                  />
                  <span>Afficher le badge "Populaire"</span>
                </label>
              </div>

              {(!typeEurValidation.isValid || !typeTndValidation.isValid || !typePagesValidation.isValid) && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Prix ou nombre de pages invalide. Veuillez renseigner des nombres positifs valides.</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#0a3d54]">
                <button
                  type="button"
                  onClick={() => setTypeModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#dedee0] bg-[#02162B] border border-[#0a3d54] rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={!isTypeValid}
                  className={`px-4 py-2 text-xs font-bold rounded-lg shadow-sm transition-colors ${
                    isTypeValid
                      ? 'text-[#00151F] bg-[#70ba65] hover:bg-[#70ba65]/90 cursor-pointer'
                      : 'text-gray-400 bg-gray-700 cursor-not-allowed border border-gray-600 opacity-60'
                  }`}
                  title={!isTypeValid ? "Veuillez renseigner un titre et des montants valides" : undefined}
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT FEATURE MODAL */}
      {featureModalOpen && editingFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#00283A] border border-[#0a3d54] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-[#02162B] border-b border-[#0a3d54]">
              <h3 className="text-sm font-bold text-white">
                {features.some(f => f.id === editingFeature.id)
                  ? 'Modifier le Module'
                  : 'Nouveau Module'}
              </h3>
              <button
                onClick={() => setFeatureModalOpen(false)}
                className="p-1 rounded-lg text-[#919ca1] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFeature} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white mb-1">Prix (EUR €)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={featurePriceRaw.priceEUR}
                    onChange={e =>
                      setFeaturePriceRaw(prev => ({ ...prev, priceEUR: e.target.value }))
                    }
                    className={`w-full px-3 py-2 text-xs font-mono font-bold bg-[#00151F] border rounded-lg text-[#70ba65] focus:outline-none transition-colors ${
                      !featureEurValidation.isValid
                        ? 'border-red-500 bg-red-950/20 text-red-300'
                        : 'border-[#0a3d54] focus:border-[#70ba65]'
                    }`}
                    placeholder="150"
                  />
                  {!featureEurValidation.isValid && (
                    <p className="text-[10px] text-red-400 font-mono mt-1 flex items-center gap-1">
                      <AlertCircle className="w-2.5 h-2.5 shrink-0" />
                      <span>{featureEurValidation.errorMessage}</span>
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-white mb-1">Prix (TND DT)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={featurePriceRaw.priceTND}
                    onChange={e =>
                      setFeaturePriceRaw(prev => ({ ...prev, priceTND: e.target.value }))
                    }
                    className={`w-full px-3 py-2 text-xs font-mono font-bold bg-[#00151F] border rounded-lg text-[#70ba65] focus:outline-none transition-colors ${
                      !featureTndValidation.isValid
                        ? 'border-red-500 bg-red-950/20 text-red-300'
                        : 'border-[#0a3d54] focus:border-[#70ba65]'
                    }`}
                    placeholder="450"
                  />
                  {!featureTndValidation.isValid && (
                    <p className="text-[10px] text-red-400 font-mono mt-1 flex items-center gap-1">
                      <AlertCircle className="w-2.5 h-2.5 shrink-0" />
                      <span>{featureTndValidation.errorMessage}</span>
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">Catégorie</label>
                <select
                  value={editingFeature.category}
                  onChange={e =>
                    setEditingFeature({
                      ...editingFeature,
                      category: e.target.value as FeatureCategoryId
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:outline-none"
                >
                  <option value="core">Fonctionnalités Essentielles</option>
                  <option value="commerce">Commerce & Vente</option>
                  <option value="content">Contenu & Médias</option>
                  <option value="marketing">Marketing & Acquisition</option>
                  <option value="tech">Technique & Sécurité</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">Titre (Français) *</label>
                <input
                  type="text"
                  required
                  value={editingFeature.title.fr}
                  onChange={e =>
                    setEditingFeature({
                      ...editingFeature,
                      title: { ...editingFeature.title, fr: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">Titre (English)</label>
                <input
                  type="text"
                  value={editingFeature.title.en || ''}
                  onChange={e =>
                    setEditingFeature({
                      ...editingFeature,
                      title: { ...editingFeature.title, en: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">Titre (العربية)</label>
                <input
                  type="text"
                  value={editingFeature.title.ar || ''}
                  onChange={e =>
                    setEditingFeature({
                      ...editingFeature,
                      title: { ...editingFeature.title, ar: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1">Description (Français)</label>
                <textarea
                  rows={2}
                  value={editingFeature.description.fr}
                  onChange={e =>
                    setEditingFeature({
                      ...editingFeature,
                      description: { ...editingFeature.description, fr: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:outline-none"
                />
              </div>

              {(!featureEurValidation.isValid || !featureTndValidation.isValid) && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Prix invalide. Veuillez renseigner un montant numérique positif ou nul (gratuit).</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#0a3d54]">
                <button
                  type="button"
                  onClick={() => setFeatureModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#dedee0] bg-[#02162B] border border-[#0a3d54] rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={!isFeatureValid}
                  className={`px-4 py-2 text-xs font-bold rounded-lg shadow-sm transition-colors ${
                    isFeatureValid
                      ? 'text-[#00151F] bg-[#70ba65] hover:bg-[#70ba65]/90 cursor-pointer'
                      : 'text-gray-400 bg-gray-700 cursor-not-allowed border border-gray-600 opacity-60'
                  }`}
                  title={!isFeatureValid ? "Veuillez renseigner un titre et des tarifs valides" : undefined}
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

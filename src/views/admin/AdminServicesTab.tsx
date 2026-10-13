import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ServiceItem, Language, ServiceCurrency, ServicePrices } from '../../types';
import {
  MANAGED_SERVICE_CURRENCIES,
  getServicePriceForCurrency,
  calculateSuggestedServicePrices
} from '../../utils/servicePricing';
import { ServicePriceFields } from './ServicePriceFields';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  Globe,
  Tag,
  DollarSign,
  AlertTriangle,
  AlertCircle,
  Eye,
  EyeOff,
  Layers,
  Coins,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { validatePrice } from '../../utils/priceValidation';

interface AdminServicesTabProps {
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  editingService: ServiceItem | null;
  setEditingService: (service: ServiceItem | null) => void;
}

export const AdminServicesTab: React.FC<AdminServicesTabProps> = ({
  isModalOpen,
  onOpenModal,
  onCloseModal,
  editingService,
  setEditingService
}) => {
  const { services, addService, updateService, updateServicePrice, deleteService, toggleServiceActive } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currencyView, setCurrencyView] = useState<'all' | ServiceCurrency>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Quick edit state in table
  const [quickEditingId, setQuickEditingId] = useState<string | null>(null);
  const [quickPrices, setQuickPrices] = useState<ServicePrices>({ USD: 0, TND: 0, EUR: 0, GBP: 0, CAD: 0 });
  const [quickRawPrices, setQuickRawPrices] = useState<Record<ServiceCurrency, string>>({
    USD: '700',
    TND: '1800',
    EUR: '650',
    GBP: '560',
    CAD: '950'
  });
  const [quickSavedFeedback, setQuickSavedFeedback] = useState<string | null>(null);

  // Real-time price validation for modal
  const [isPricesValid, setIsPricesValid] = useState(true);
  const [priceErrors, setPriceErrors] = useState<Record<ServiceCurrency, string | null>>({
    USD: null,
    TND: null,
    EUR: null,
    GBP: null,
    CAD: null
  });

  // Form State
  const [activeLangTab, setActiveLangTab] = useState<Language>('fr');
  const [formData, setFormData] = useState<Partial<ServiceItem>>({
    id: '',
    slug: '',
    title: { fr: '', en: '', ar: '' },
    shortDescription: { fr: '', en: '', ar: '' },
    fullDescription: { fr: '', en: '', ar: '' },
    iconName: 'Globe',
    category: 'web',
    technologies: [],
    deliverables: { fr: [], en: [], ar: [] },
    benefits: { fr: [], en: [], ar: [] },
    prices: {
      USD: 700,
      TND: 1800,
      EUR: 650,
      GBP: 560,
      CAD: 950
    },
    priceStartingUSD: 700,
    priceStartingTND: 1800,
    priceStartingEUR: 650,
    priceStartingGBP: 560,
    priceStartingCAD: 950,
    active: true
  });

  const [techInput, setTechInput] = useState('');
  const [deliverableInput, setDeliverableInput] = useState('');
  const [benefitInput, setBenefitInput] = useState('');

  const handleOpenCreate = () => {
    setEditingService(null);
    const initialPrices: ServicePrices = {
      USD: 700,
      TND: 1800,
      EUR: 650,
      GBP: 560,
      CAD: 950
    };
    setFormData({
      id: `service-${Date.now()}`,
      slug: '',
      title: { fr: '', en: '', ar: '' },
      shortDescription: { fr: '', en: '', ar: '' },
      fullDescription: { fr: '', en: '', ar: '' },
      iconName: 'Globe',
      category: 'web',
      technologies: ['React', 'WordPress', 'Tailwind CSS'],
      deliverables: {
        fr: ['Architecture sur-mesure', 'Responsive mobile'],
        en: ['Custom architecture', 'Mobile responsive'],
        ar: ['هندسة مخصصة', 'متوافق مع الهواتف']
      },
      benefits: {
        fr: ['Code propre', 'Performance'],
        en: ['Clean code', 'Performance'],
        ar: ['كود نظيف', 'سرعة وأداء']
      },
      prices: initialPrices,
      priceStartingUSD: initialPrices.USD,
      priceStartingTND: initialPrices.TND,
      priceStartingEUR: initialPrices.EUR,
      priceStartingGBP: initialPrices.GBP,
      priceStartingCAD: initialPrices.CAD,
      active: true
    });
    setTechInput('');
    setDeliverableInput('');
    setBenefitInput('');
    onOpenModal();
  };

  const handleOpenEdit = (service: ServiceItem) => {
    setEditingService(service);
    const eur = Number(service.prices?.EUR || service.priceStartingEUR) || 650;
    const tnd = Number(service.prices?.TND || service.priceStartingTND) || 1800;
    const usd = Number(service.prices?.USD || service.priceStartingUSD) || Math.round((eur * 1.08) / 10) * 10;
    const gbp = Number(service.prices?.GBP || service.priceStartingGBP) || Math.round((eur * 0.86) / 10) * 10;
    const cad = Number(service.prices?.CAD || service.priceStartingCAD) || Math.round((eur * 1.48) / 10) * 10;

    const resolvedPrices: ServicePrices = {
      USD: Number(service.prices?.USD) || usd,
      TND: Number(service.prices?.TND) || tnd,
      EUR: Number(service.prices?.EUR) || eur,
      GBP: Number(service.prices?.GBP) || gbp,
      CAD: Number(service.prices?.CAD) || cad
    };

    setFormData({
      ...service,
      prices: resolvedPrices,
      priceStartingUSD: resolvedPrices.USD,
      priceStartingTND: resolvedPrices.TND,
      priceStartingEUR: resolvedPrices.EUR,
      priceStartingGBP: resolvedPrices.GBP,
      priceStartingCAD: resolvedPrices.CAD,
      title: { fr: service.title.fr, en: service.title.en || '', ar: service.title.ar || '' },
      shortDescription: { fr: service.shortDescription.fr, en: service.shortDescription.en || '', ar: service.shortDescription.ar || '' },
      fullDescription: { fr: service.fullDescription.fr, en: service.fullDescription.en || '', ar: service.fullDescription.ar || '' },
      deliverables: {
        fr: service.deliverables?.fr || [],
        en: service.deliverables?.en || [],
        ar: service.deliverables?.ar || []
      },
      benefits: {
        fr: service.benefits?.fr || [],
        en: service.benefits?.en || [],
        ar: service.benefits?.ar || []
      }
    });
    setTechInput('');
    setDeliverableInput('');
    setBenefitInput('');
    onOpenModal();
  };

  const handleChangeFormPrice = (currency: ServiceCurrency, amount: number) => {
    const cleanAmount = Math.max(0, amount);
    setFormData(prev => {
      const currentPrices = prev.prices || { USD: 700, TND: 1800, EUR: 650, GBP: 560, CAD: 950 };
      const updated: ServicePrices = {
        ...currentPrices,
        [currency]: cleanAmount
      };
      return {
        ...prev,
        prices: updated,
        priceStartingUSD: currency === 'USD' ? cleanAmount : (prev.priceStartingUSD || updated.USD),
        priceStartingTND: currency === 'TND' ? cleanAmount : (prev.priceStartingTND || updated.TND),
        priceStartingEUR: currency === 'EUR' ? cleanAmount : (prev.priceStartingEUR || updated.EUR),
        priceStartingGBP: currency === 'GBP' ? cleanAmount : (prev.priceStartingGBP || updated.GBP),
        priceStartingCAD: currency === 'CAD' ? cleanAmount : (prev.priceStartingCAD || updated.CAD)
      };
    });
  };

  const handleAutoCalculatePrices = (baseCurrency: 'EUR' | 'USD') => {
    const baseValue = Number(
      formData.prices?.[baseCurrency] ||
      (baseCurrency === 'EUR' ? formData.priceStartingEUR : formData.priceStartingUSD)
    ) || (baseCurrency === 'EUR' ? 650 : 700);

    const calculated = calculateSuggestedServicePrices(baseValue, baseCurrency);
    setFormData(prev => ({
      ...prev,
      prices: calculated,
      priceStartingUSD: calculated.USD,
      priceStartingTND: calculated.TND,
      priceStartingEUR: calculated.EUR,
      priceStartingGBP: calculated.GBP,
      priceStartingCAD: calculated.CAD
    }));
  };

  const handleStartQuickEdit = (service: ServiceItem) => {
    const eur = Number(service.prices?.EUR || service.priceStartingEUR) || 650;
    const tnd = Number(service.prices?.TND || service.priceStartingTND) || 1800;
    const usd = Number(service.prices?.USD || service.priceStartingUSD) || Math.round((eur * 1.08) / 10) * 10;
    const gbp = Number(service.prices?.GBP || service.priceStartingGBP) || Math.round((eur * 0.86) / 10) * 10;
    const cad = Number(service.prices?.CAD || service.priceStartingCAD) || Math.round((eur * 1.48) / 10) * 10;

    const initialPrices: ServicePrices = {
      USD: Number(service.prices?.USD) || usd,
      TND: Number(service.prices?.TND) || tnd,
      EUR: Number(service.prices?.EUR) || eur,
      GBP: Number(service.prices?.GBP) || gbp,
      CAD: Number(service.prices?.CAD) || cad
    };

    setQuickPrices(initialPrices);
    setQuickRawPrices({
      USD: String(initialPrices.USD),
      TND: String(initialPrices.TND),
      EUR: String(initialPrices.EUR),
      GBP: String(initialPrices.GBP),
      CAD: String(initialPrices.CAD)
    });
    setQuickEditingId(service.id);
  };

  const handleQuickPriceChange = (currency: ServiceCurrency, text: string) => {
    setQuickRawPrices(prev => ({ ...prev, [currency]: text }));
    const result = validatePrice(text, { min: 1, allowZero: false, required: true });
    if (result.isValid && result.numericValue !== null) {
      setQuickPrices(prev => ({ ...prev, [currency]: result.numericValue! }));
    }
  };

  const isQuickPricesValid = MANAGED_SERVICE_CURRENCIES.every(curr => {
    const result = validatePrice(quickRawPrices[curr.code], { min: 1, allowZero: false, required: true });
    return result.isValid;
  });

  const handleSaveQuickPrices = (serviceId: string) => {
    if (!isQuickPricesValid) return;

    const finalPrices: ServicePrices = {
      USD: Number(quickRawPrices.USD),
      TND: Number(quickRawPrices.TND),
      EUR: Number(quickRawPrices.EUR),
      GBP: Number(quickRawPrices.GBP),
      CAD: Number(quickRawPrices.CAD)
    };

    updateService(serviceId, {
      prices: finalPrices,
      priceStartingUSD: finalPrices.USD,
      priceStartingTND: finalPrices.TND,
      priceStartingEUR: finalPrices.EUR,
      priceStartingGBP: finalPrices.GBP,
      priceStartingCAD: finalPrices.CAD
    });
    setQuickEditingId(null);
    setQuickSavedFeedback(serviceId);
    setTimeout(() => setQuickSavedFeedback(null), 2500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.fr) {
      alert('Veuillez entrer au moins le titre en français.');
      return;
    }

    if (!isPricesValid) {
      alert('Veuillez corriger les montants de prix invalides avant d\'enregistrer.');
      return;
    }

    const finalSlug = formData.slug || formData.title.fr.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const finalPrices: ServicePrices = {
      USD: Number(formData.prices?.USD || formData.priceStartingUSD) || 700,
      TND: Number(formData.prices?.TND || formData.priceStartingTND) || 1800,
      EUR: Number(formData.prices?.EUR || formData.priceStartingEUR) || 650,
      GBP: Number(formData.prices?.GBP || formData.priceStartingGBP) || 560,
      CAD: Number(formData.prices?.CAD || formData.priceStartingCAD) || 950
    };

    const servicePayload: ServiceItem = {
      id: formData.id || `service-${Date.now()}`,
      slug: finalSlug,
      title: {
        fr: formData.title.fr,
        en: formData.title.en || formData.title.fr,
        ar: formData.title.ar || formData.title.fr
      },
      shortDescription: {
        fr: formData.shortDescription?.fr || '',
        en: formData.shortDescription?.en || formData.shortDescription?.fr || '',
        ar: formData.shortDescription?.ar || formData.shortDescription?.fr || ''
      },
      fullDescription: {
        fr: formData.fullDescription?.fr || '',
        en: formData.fullDescription?.en || formData.fullDescription?.fr || '',
        ar: formData.fullDescription?.ar || formData.fullDescription?.fr || ''
      },
      iconName: formData.iconName || 'Globe',
      category: formData.category || 'web',
      technologies: formData.technologies || [],
      deliverables: {
        fr: formData.deliverables?.fr || [],
        en: formData.deliverables?.en || formData.deliverables?.fr || [],
        ar: formData.deliverables?.ar || formData.deliverables?.fr || []
      },
      benefits: {
        fr: formData.benefits?.fr || [],
        en: formData.benefits?.en || formData.benefits?.fr || [],
        ar: formData.benefits?.ar || formData.benefits?.fr || []
      },
      prices: finalPrices,
      priceStartingUSD: finalPrices.USD,
      priceStartingTND: finalPrices.TND,
      priceStartingEUR: finalPrices.EUR,
      priceStartingGBP: finalPrices.GBP,
      priceStartingCAD: finalPrices.CAD,
      active: formData.active !== false
    };

    if (editingService) {
      updateService(editingService.id, servicePayload);
    } else {
      addService(servicePayload);
    }

    onCloseModal();
  };

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    const current = formData.technologies || [];
    if (!current.includes(techInput.trim())) {
      setFormData({ ...formData, technologies: [...current, techInput.trim()] });
    }
    setTechInput('');
  };

  const handleRemoveTech = (tech: string) => {
    setFormData({
      ...formData,
      technologies: (formData.technologies || []).filter(t => t !== tech)
    });
  };

  const handleAddDeliverable = () => {
    if (!deliverableInput.trim()) return;
    const currentList = (formData.deliverables as any)?.[activeLangTab] || [];
    setFormData({
      ...formData,
      deliverables: {
        ...(formData.deliverables as any),
        [activeLangTab]: [...currentList, deliverableInput.trim()]
      }
    });
    setDeliverableInput('');
  };

  const handleRemoveDeliverable = (index: number) => {
    const currentList = (formData.deliverables as any)?.[activeLangTab] || [];
    setFormData({
      ...formData,
      deliverables: {
        ...(formData.deliverables as any),
        [activeLangTab]: currentList.filter((_: any, i: number) => i !== index)
      }
    });
  };

  // Filter services
  const filteredServices = services.filter(service => {
    const matchesSearch =
      service.title.fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.title.en && service.title.en.toLowerCase().includes(searchTerm.toLowerCase())) ||
      service.technologies.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = categoryFilter === 'all' || service.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Header with Search & Add */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#00283A] border border-[#0a3d54] p-4 rounded-xl">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#919ca1]" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Rechercher par titre ou technologie..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white placeholder-[#919ca1] focus:outline-none focus:border-[#70ba65]"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-[#dedee0] focus:outline-none focus:border-[#70ba65]"
          >
            <option value="all">Toutes catégories</option>
            <option value="web">Web & Sur-mesure</option>
            <option value="ecommerce">E-Commerce</option>
            <option value="cms">CMS & WordPress</option>
            <option value="custom">Applications Métier</option>
            <option value="perf">Performance & SEO</option>
          </select>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#70ba65] text-[#00151F] font-bold text-xs rounded-lg hover:bg-[#70ba65]/90 transition-colors shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Service</span>
        </button>
      </div>

      {/* Currency View Selector Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#00283A] border border-[#0a3d54] p-3.5 rounded-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#00151F] border border-[#0a3d54] flex items-center justify-center text-[#70ba65]">
            <Coins className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>Gestion des devises</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-[#70ba65]/10 text-[#70ba65] border border-[#70ba65]/30">
                5 pays & zones
              </span>
            </div>
            <div className="text-[11px] text-[#919ca1]">
              Filtrer ou vérifier les tarifs configurés pour chaque marché :
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setCurrencyView('all')}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${
              currencyView === 'all'
                ? 'bg-[#70ba65] text-[#00151F] font-bold shadow-sm'
                : 'bg-[#00151F] text-[#dedee0] hover:bg-[#0a3d54]/60 border border-[#0a3d54]'
            }`}
          >
            Toutes les devises
          </button>
          {MANAGED_SERVICE_CURRENCIES.map(curr => (
            <button
              key={curr.code}
              onClick={() => setCurrencyView(curr.code)}
              className={`px-2.5 py-1.5 text-xs font-mono rounded-lg transition-colors flex items-center gap-1.5 ${
                currencyView === curr.code
                  ? 'bg-[#70ba65] text-[#00151F] font-bold shadow-sm'
                  : 'bg-[#00151F] text-[#dedee0] hover:bg-[#0a3d54]/60 border border-[#0a3d54]'
              }`}
              title={`${curr.name.fr} - ${curr.description.fr}`}
            >
              <span>{curr.flag}</span>
              <span className="font-bold">{curr.code}</span>
              <span className="text-[10px] opacity-75">({curr.symbol})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Services List Table */}
      <div className="bg-[#00283A] border border-[#0a3d54] rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#dedee0]">
            <thead className="bg-[#02162B] border-b border-[#0a3d54] text-[11px] font-mono uppercase text-[#919ca1]">
              <tr>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Titre (FR / EN / AR)</th>
                <th className="px-4 py-3">Catégorie</th>
                <th className="px-4 py-3">Technologies</th>
                <th className="px-4 py-3 text-right">
                  {currencyView === 'all' ? (
                    <span>Tarifs (5 devises gérées)</span>
                  ) : (
                    <span>Tarif {currencyView}</span>
                  )}
                </th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0a3d54]/50">
              {filteredServices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#919ca1]">
                    Aucun service ne correspond à vos critères.
                  </td>
                </tr>
              ) : (
                filteredServices.map(service => {
                  const eur = Number(service.prices?.EUR || service.priceStartingEUR) || 650;
                  const tnd = Number(service.prices?.TND || service.priceStartingTND) || 1800;
                  const usd = Number(service.prices?.USD || service.priceStartingUSD) || Math.round((eur * 1.08) / 10) * 10;
                  const gbp = Number(service.prices?.GBP || service.priceStartingGBP) || Math.round((eur * 0.86) / 10) * 10;
                  const cad = Number(service.prices?.CAD || service.priceStartingCAD) || Math.round((eur * 1.48) / 10) * 10;

                  const pricesMap: ServicePrices = {
                    USD: Number(service.prices?.USD) || usd,
                    TND: Number(service.prices?.TND) || tnd,
                    EUR: Number(service.prices?.EUR) || eur,
                    GBP: Number(service.prices?.GBP) || gbp,
                    CAD: Number(service.prices?.CAD) || cad
                  };

                  const isQuickEditing = quickEditingId === service.id;
                  const hasRecentlySaved = quickSavedFeedback === service.id;

                  return (
                    <tr key={service.id} className="hover:bg-[#02162B]/50 transition-colors">
                      {/* Status toggle */}
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleServiceActive(service.id)}
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                            service.active !== false
                              ? 'bg-[#70ba65]/10 text-[#70ba65] border border-[#70ba65]/30'
                              : 'bg-red-400/10 text-red-400 border border-red-400/30'
                          }`}
                          title="Cliquer pour changer le statut"
                        >
                          {service.active !== false ? (
                            <>
                              <Eye className="w-3 h-3" />
                              <span>Actif</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3" />
                              <span>Masqué</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Title */}
                      <td className="px-4 py-3">
                        <div className="font-semibold text-white">{service.title.fr}</div>
                        <div className="text-[11px] text-[#919ca1] mt-0.5">
                          <span className="font-mono text-[9px] px-1 rounded bg-[#0a3d54] text-white mr-1">EN</span>
                          {service.title.en || '—'}
                        </div>
                        {service.title.ar && (
                          <div className="text-[11px] text-[#70ba65]/90 mt-0.5" dir="rtl">
                            <span className="font-mono text-[9px] px-1 rounded bg-[#0a3d54] text-white ml-1" dir="ltr">AR</span>
                            {service.title.ar}
                          </div>
                        )}
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded bg-[#00151F] border border-[#0a3d54] font-mono text-[10px] text-[#dedee0] uppercase">
                          {service.category}
                        </span>
                      </td>

                      {/* Technologies */}
                      <td className="px-4 py-3 max-w-[180px]">
                        <div className="flex flex-wrap gap-1">
                          {service.technologies.slice(0, 3).map(tech => (
                            <span
                              key={tech}
                              className="px-1.5 py-0.2 rounded bg-[#02162B] text-[10px] text-[#919ca1] border border-[#0a3d54]/60"
                            >
                              {tech}
                            </span>
                          ))}
                          {service.technologies.length > 3 && (
                            <span className="text-[10px] text-[#919ca1]">
                              +{service.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Pricing per currency */}
                      <td className="px-4 py-3 text-right">
                        {isQuickEditing ? (
                          <div className="flex flex-col items-end gap-2 p-2.5 rounded-lg bg-[#00151F] border border-[#70ba65]/70 shadow-lg">
                            <div className="flex items-center justify-between w-full">
                              <div className="text-[10px] font-mono text-[#70ba65] font-bold uppercase tracking-wider flex items-center gap-1">
                                <Coins className="w-3 h-3" />
                                <span>Tarifs rapides (5 devises)</span>
                              </div>
                              {!isQuickPricesValid && (
                                <span className="text-[9px] font-mono text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/30 flex items-center gap-1">
                                  <AlertCircle className="w-2.5 h-2.5" />
                                  <span>Format invalide</span>
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 w-full min-w-[280px]">
                              {MANAGED_SERVICE_CURRENCIES.map(curr => {
                                const status = validatePrice(quickRawPrices[curr.code], { min: 1, allowZero: false, required: true });
                                const hasError = !status.isValid;

                                return (
                                  <div key={curr.code} className="flex flex-col">
                                    <div
                                      className={`flex items-center bg-[#02162B] border rounded px-1.5 py-1 transition-colors ${
                                        hasError
                                          ? 'border-red-500 bg-red-950/20'
                                          : 'border-[#0a3d54] focus-within:border-[#70ba65]'
                                      }`}
                                    >
                                      <span className="text-[10px] mr-1">{curr.flag}</span>
                                      <span className="text-[9px] font-mono font-bold text-white mr-1">{curr.code}</span>
                                      <input
                                        type="text"
                                        inputMode="numeric"
                                        value={quickRawPrices[curr.code] ?? ''}
                                        onChange={e => handleQuickPriceChange(curr.code, e.target.value)}
                                        className={`w-full text-right bg-transparent text-[11px] font-mono font-bold focus:outline-none ${
                                          hasError ? 'text-red-300' : 'text-[#70ba65]'
                                        }`}
                                        placeholder="0"
                                      />
                                    </div>
                                    {hasError && (
                                      <span className="text-[8px] text-red-400 font-mono mt-0.5 leading-tight text-left">
                                        {status.errorMessage}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            <div className="flex items-center gap-1.5 mt-1">
                              <button
                                onClick={() => setQuickEditingId(null)}
                                className="px-2.5 py-1 text-[10px] rounded bg-[#02162B] text-[#919ca1] hover:text-white border border-[#0a3d54]"
                              >
                                Annuler
                              </button>
                              <button
                                onClick={() => handleSaveQuickPrices(service.id)}
                                disabled={!isQuickPricesValid}
                                className={`inline-flex items-center gap-1 px-3 py-1 text-[10px] font-bold rounded transition-colors shadow-sm ${
                                  isQuickPricesValid
                                    ? 'bg-[#70ba65] text-[#00151F] hover:bg-[#70ba65]/90 cursor-pointer'
                                    : 'bg-gray-700 text-gray-400 cursor-not-allowed border border-gray-600 opacity-60'
                                }`}
                                title={!isQuickPricesValid ? 'Format numérique invalide sur certains prix' : 'Enregistrer'}
                              >
                                <Check className="w-3 h-3" />
                                <span>Enregistrer</span>
                              </button>
                            </div>
                          </div>
                        ) : currencyView === 'all' ? (
                          <div className="flex flex-col items-end gap-1 font-mono">
                            {/* 5 Currencies Badges */}
                            <div className="flex flex-wrap justify-end gap-1.5 max-w-[280px]">
                              <span
                                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#02162B] border border-[#0a3d54] text-[11px] text-white"
                                title="USD ($) - Par défaut pour tous les autres pays"
                              >
                                <span className="text-[10px]">🇺🇸</span>
                                <span className="text-amber-400 font-bold">${pricesMap.USD}</span>
                              </span>
                              <span
                                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#02162B] border border-[#0a3d54] text-[11px] text-white"
                                title="TND (DT) - Pour la Tunisie"
                              >
                                <span className="text-[10px]">🇹🇳</span>
                                <span className="text-[#70ba65] font-bold">{pricesMap.TND} DT</span>
                              </span>
                              <span
                                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#02162B] border border-[#0a3d54] text-[11px] text-white"
                                title="EUR (€) - Pour la Zone Euro"
                              >
                                <span className="text-[10px]">🇪🇺</span>
                                <span className="font-bold">{pricesMap.EUR} €</span>
                              </span>
                              <span
                                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#02162B] border border-[#0a3d54] text-[11px] text-white"
                                title="GBP (£) - Pour le Royaume-Uni"
                              >
                                <span className="text-[10px]">🇬🇧</span>
                                <span className="text-[#dedee0] font-bold">£{pricesMap.GBP}</span>
                              </span>
                              <span
                                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#02162B] border border-[#0a3d54] text-[11px] text-white"
                                title="CAD ($) - Pour le Canada"
                              >
                                <span className="text-[10px]">🇨🇦</span>
                                <span className="text-[#dedee0] font-bold">${pricesMap.CAD} CA</span>
                              </span>
                            </div>

                            {hasRecentlySaved && (
                              <div className="text-[10px] text-[#70ba65] flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Prix enregistrés</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          /* Specific currency selected */
                          <div className="flex flex-col items-end font-mono">
                            <div className="text-sm font-bold text-white flex items-center gap-1">
                              {currencyView === 'USD' && <span className="text-amber-400">${pricesMap.USD} USD</span>}
                              {currencyView === 'TND' && <span className="text-[#70ba65]">{pricesMap.TND} DT</span>}
                              {currencyView === 'EUR' && <span>{pricesMap.EUR} €</span>}
                              {currencyView === 'GBP' && <span>£{pricesMap.GBP}</span>}
                              {currencyView === 'CAD' && <span>${pricesMap.CAD} CAD</span>}
                            </div>
                            <div className="text-[10px] text-[#919ca1]">
                              {currencyView === 'USD' && 'Par défaut (Monde)'}
                              {currencyView === 'TND' && 'Pour la Tunisie'}
                              {currencyView === 'EUR' && 'Zone Euro'}
                              {currencyView === 'GBP' && 'Royaume-Uni'}
                              {currencyView === 'CAD' && 'Canada'}
                            </div>
                            {hasRecentlySaved && (
                              <div className="text-[10px] text-[#70ba65] flex items-center gap-1 mt-0.5">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Mis à jour</span>
                              </div>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleStartQuickEdit(service)}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              isQuickEditing
                                ? 'bg-[#70ba65] text-[#00151F] border-[#70ba65]'
                                : 'bg-[#00151F] border-[#0a3d54] hover:border-[#70ba65] text-[#70ba65]'
                            }`}
                            title="Modifier rapidement les prix par devise"
                          >
                            <Coins className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(service)}
                            className="p-1.5 rounded-lg bg-[#00151F] border border-[#0a3d54] hover:border-[#70ba65] text-[#dedee0] hover:text-[#70ba65] transition-colors"
                            title="Modifier tous les champs du service"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(service.id)}
                            className="p-1.5 rounded-lg bg-[#00151F] border border-[#0a3d54] hover:border-red-500 text-[#dedee0] hover:text-red-400 transition-colors"
                            title="Supprimer le service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-[#00283A] border border-red-500/40 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-white text-base">Confirmer la suppression</h3>
            </div>
            <p className="text-xs text-[#dedee0] leading-relaxed">
              Êtes-vous sûr de vouloir supprimer définitivement ce service ? Cette action sera immédiatement synchronisée avec le site public.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 text-xs text-[#dedee0] hover:text-white bg-[#02162B] border border-[#0a3d54] rounded-lg"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  deleteService(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm"
              >
                Confirmer la suppression
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#00283A] border border-[#0a3d54] rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-[#02162B] border-b border-[#0a3d54]">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#70ba65]" />
                <span>{editingService ? 'Modifier le Service' : 'Ajouter un Nouveau Service'}</span>
              </h3>
              <button
                onClick={onCloseModal}
                className="p-1 rounded-lg text-[#919ca1] hover:text-white hover:bg-[#00151F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Language Selector for fields */}
              <div className="flex items-center justify-between bg-[#02162B] p-2 rounded-xl border border-[#0a3d54]">
                <span className="text-xs font-medium text-[#919ca1] px-2 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#70ba65]" />
                  <span>Langue d'édition :</span>
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveLangTab('fr')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                      activeLangTab === 'fr'
                        ? 'bg-[#70ba65] text-[#00151F]'
                        : 'text-[#919ca1] hover:text-white'
                    }`}
                  >
                    Français (Défaut)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLangTab('en')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                      activeLangTab === 'en'
                        ? 'bg-[#70ba65] text-[#00151F]'
                        : 'text-[#919ca1] hover:text-white'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLangTab('ar')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                      activeLangTab === 'ar'
                        ? 'bg-[#70ba65] text-[#00151F]'
                        : 'text-[#919ca1] hover:text-white'
                    }`}
                  >
                    العربية
                  </button>
                </div>
              </div>

              {/* Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Titre du Service ({activeLangTab.toUpperCase()}) *
                  </label>
                  <input
                    type="text"
                    required={activeLangTab === 'fr'}
                    value={(formData.title as any)?.[activeLangTab] || ''}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        title: { ...(formData.title as any), [activeLangTab]: e.target.value }
                      })
                    }
                    placeholder="Ex: Création de site web sur mesure"
                    className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                    dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Slug URL (identifiant web)
                  </label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="creation-site-web"
                    className="w-full px-3 py-2 text-xs font-mono bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                  />
                </div>
              </div>

              {/* Short & Full Description */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Description courte ({activeLangTab.toUpperCase()})
                  </label>
                  <textarea
                    rows={2}
                    value={(formData.shortDescription as any)?.[activeLangTab] || ''}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        shortDescription: {
                          ...(formData.shortDescription as any),
                          [activeLangTab]: e.target.value
                        }
                      })
                    }
                    placeholder="Description concise pour les cartes et aperçus..."
                    className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                    dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Description détaillée ({activeLangTab.toUpperCase()})
                  </label>
                  <textarea
                    rows={4}
                    value={(formData.fullDescription as any)?.[activeLangTab] || ''}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        fullDescription: {
                          ...(formData.fullDescription as any),
                          [activeLangTab]: e.target.value
                        }
                      })
                    }
                    placeholder="Explication détaillée de la méthode, des enjeux et de la valeur ajoutée..."
                    className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                    dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="bg-[#02162B] p-3.5 rounded-xl border border-[#0a3d54]">
                <label className="block text-xs font-bold text-white mb-1.5">Catégorie de prestation</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                >
                  <option value="web">Web & Sur-mesure</option>
                  <option value="ecommerce">E-Commerce</option>
                  <option value="cms">CMS & WordPress</option>
                  <option value="custom">Applications Métier</option>
                  <option value="perf">Performance & SEO</option>
                </select>
              </div>

              {/* Multi-Currency Pricing Manager */}
              <ServicePriceFields
                prices={
                  formData.prices || {
                    USD: Number(formData.priceStartingUSD) || 700,
                    TND: Number(formData.priceStartingTND) || 1800,
                    EUR: Number(formData.priceStartingEUR) || 650,
                    GBP: Number(formData.priceStartingGBP) || 560,
                    CAD: Number(formData.priceStartingCAD) || 950
                  }
                }
                onChangePrice={handleChangeFormPrice}
                onAutoCalculate={handleAutoCalculatePrices}
                onValidationChange={(isValid, errors) => {
                  setIsPricesValid(isValid);
                  setPriceErrors(errors);
                }}
              />

              {/* Technologies Tag Input */}
              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  Technologies associées
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTech();
                      }
                    }}
                    placeholder="Ex: Next.js, Stripe, Tailwind..."
                    className="flex-1 px-3 py-1.5 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddTech}
                    className="px-3 py-1.5 bg-[#0a3d54] hover:bg-[#70ba65] hover:text-[#00151F] text-xs font-bold text-white rounded-lg transition-colors"
                  >
                    Ajouter
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(formData.technologies || []).map(tech => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#00151F] border border-[#0a3d54] text-xs text-white"
                    >
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(tech)}
                        className="text-[#919ca1] hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Deliverables List for current language */}
              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  Livrables inclus ({activeLangTab.toUpperCase()})
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={deliverableInput}
                    onChange={e => setDeliverableInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddDeliverable();
                      }
                    }}
                    placeholder="Ex: Intégration responsive mobile & desktop"
                    className="flex-1 px-3 py-1.5 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                    dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                  />
                  <button
                    type="button"
                    onClick={handleAddDeliverable}
                    className="px-3 py-1.5 bg-[#0a3d54] hover:bg-[#70ba65] hover:text-[#00151F] text-xs font-bold text-white rounded-lg transition-colors"
                  >
                    Ajouter
                  </button>
                </div>
                <ul className="space-y-1">
                  {((formData.deliverables as any)?.[activeLangTab] || []).map(
                    (del: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between p-2 rounded bg-[#00151F] border border-[#0a3d54]/60 text-xs text-[#dedee0]"
                      >
                        <span dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}>{del}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveDeliverable(idx)}
                          className="text-[#919ca1] hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#02162B] border border-[#0a3d54]">
                <div>
                  <div className="text-xs font-bold text-white">Statut d'affichage</div>
                  <div className="text-[11px] text-[#919ca1]">
                    Rendre ce service visible immédiatement sur le site public.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.active !== false}
                  onChange={e => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 rounded text-[#70ba65] focus:ring-[#70ba65] accent-[#70ba65]"
                />
              </div>

              {/* Real-time validation warning message */}
              {!isPricesValid && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <div className="flex-1">
                    <span className="font-bold">Format numérique invalide : </span>
                    Certains tarifs par devise sont incorrects ou vides. Veuillez corriger tous les champs surlignés en rouge avant de pouvoir enregistrer.
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#0a3d54]">
                <button
                  type="button"
                  onClick={onCloseModal}
                  className="px-4 py-2 rounded-lg bg-[#02162B] border border-[#0a3d54] text-xs text-[#dedee0] hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={!isPricesValid || !formData.title?.fr}
                  className={`px-5 py-2 rounded-lg font-bold text-xs transition-colors shadow-md flex items-center gap-2 ${
                    !isPricesValid || !formData.title?.fr
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed border border-gray-600 opacity-60'
                      : 'bg-[#70ba65] text-[#00151F] hover:bg-[#70ba65]/90'
                  }`}
                  title={!isPricesValid ? "Format numérique invalide sur un ou plusieurs tarifs" : undefined}
                >
                  {editingService ? 'Enregistrer les modifications' : 'Créer le service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

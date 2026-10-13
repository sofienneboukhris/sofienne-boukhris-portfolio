import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ServiceItem, ProjectItem, BlogPostItem, Language, ServiceCurrency, ServicePrices } from '../types';
import { ProjectTypeOption, FeatureOption, ProjectTypeId, DesignLevelOption, TimelineOption, SupportLevelOption } from '../types/calculator';
import { DynamicCalculatorConfig } from '../utils/calculatorLogic';
import { SERVICES as DEFAULT_SERVICES } from '../data/services';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/projects';
import { BLOG_POSTS as DEFAULT_BLOG_POSTS } from '../data/blog';
import {
  PROJECT_TYPES as DEFAULT_PROJECT_TYPES,
  FEATURES as DEFAULT_FEATURES,
  PRICE_PER_EXTRA_PAGE_EUR as DEFAULT_PAGE_EUR,
  PRICE_PER_EXTRA_PAGE_TND as DEFAULT_PAGE_TND,
  EUR_TO_TND_RATE as DEFAULT_RATE
} from '../data/calculatorConfig';
import { TRANSLATIONS as DEFAULT_TRANSLATIONS } from '../data/translations';
import { DESIGN_LEVELS as DEFAULT_DESIGN_LEVELS, TIMELINES as DEFAULT_TIMELINES, SUPPORT_LEVELS as DEFAULT_SUPPORT_LEVELS } from '../data/calculatorConfig';

export interface PricingConfig {
  pricePerExtraPageUSD: number;
  pricePerExtraPageTND: number;
  pricePerExtraPageEUR: number;
  pricePerExtraPageGBP: number;
  pricePerExtraPageCAD: number;
}

export interface StoredDataSchema {
  services: ServiceItem[];
  projects: ProjectItem[];
  blogPosts: BlogPostItem[];
  projectTypes: ProjectTypeOption[];
  features: FeatureOption[];
  designLevels: DesignLevelOption[];
  timelines: TimelineOption[];
  supportLevels: SupportLevelOption[];
  pricingConfig: PricingConfig;
  translations: typeof DEFAULT_TRANSLATIONS;
  lastUpdated?: string;
}

interface DataContextType {
  // Services
  services: ServiceItem[];
  addService: (service: ServiceItem) => void;
  updateService: (id: string, updates: Partial<ServiceItem>) => void;
  updateServicePrice: (id: string, currency: ServiceCurrency, amount: number) => void;
  deleteService: (id: string) => void;
  toggleServiceActive: (id: string) => void;

  // Projects
  projects: ProjectItem[];
  addProject: (project: ProjectItem) => void;
  updateProject: (id: string, updates: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  toggleProjectPublished: (id: string) => void;

  // Blog Posts
  blogPosts: BlogPostItem[];
  addBlogPost: (post: BlogPostItem) => void;
  updateBlogPost: (slug: string, updates: Partial<BlogPostItem>) => void;
  deleteBlogPost: (slug: string) => void;
  toggleBlogPostPublished: (slug: string) => void;

  // Calculator
  projectTypes: ProjectTypeOption[];
  updateProjectType: (id: ProjectTypeId, updates: Partial<ProjectTypeOption>) => void;
  addProjectType: (type: ProjectTypeOption) => void;
  deleteProjectType: (id: ProjectTypeId) => void;
  toggleProjectTypeActive: (id: ProjectTypeId) => void;

  features: FeatureOption[];
  updateFeature: (id: string, updates: Partial<FeatureOption>) => void;
  addFeature: (feat: FeatureOption) => void;
  deleteFeature: (id: string) => void;
  toggleFeatureActive: (id: string) => void;

  pricingConfig: PricingConfig;
  updatePricingConfig: (config: Partial<PricingConfig>) => void;

  calculatorConfig: DynamicCalculatorConfig;

  // Translations
  translations: typeof DEFAULT_TRANSLATIONS;
  updateTranslationText: (lang: Language, sectionKey: string, subKey: string, value: string) => void;
  updateWholeTranslations: (newTrans: typeof DEFAULT_TRANSLATIONS) => void;

  // Global actions
  resetToDefaults: () => void;
  exportJSON: () => void;
  importJSON: (jsonString: string) => boolean;
  saveStatus: 'saved' | 'saving' | 'error';
}

const STORAGE_KEY = 'sb_admin_dashboard_data_v2';

function mergeTranslations(defaultTrans: any, storedTrans: any) {
  if (!storedTrans) return defaultTrans;
  const merged = JSON.parse(JSON.stringify(defaultTrans));
  for (const lang of Object.keys(merged)) {
    if (storedTrans[lang]) {
      for (const section of Object.keys(merged[lang])) {
        if (storedTrans[lang][section] !== undefined) {
          if (Array.isArray(merged[lang][section])) {
             merged[lang][section] = storedTrans[lang][section];
          } else if (typeof merged[lang][section] === 'object') {
             merged[lang][section] = { ...merged[lang][section], ...storedTrans[lang][section] };
          } else {
             merged[lang][section] = storedTrans[lang][section];
          }
        }
      }
    }
  }
  return merged;
}


// Helper to guarantee multi-currency price synchronization across USD, TND, EUR, GBP, CAD
export const enrichServiceItemWithPrices = (s: any, idx: number = 0): ServiceItem => {
  const defaultEUR = Number(s.prices?.EUR || s.priceStartingEUR) || [650, 600, 1250, 1200, 1100, 750, 850, 2200, 2000, 350, 450][idx] || 500;
  const defaultTND = Number(s.prices?.TND || s.priceStartingTND) || [1800, 1700, 3600, 3500, 3300, 2200, 2500, 6500, 6000, 1000, 1300][idx] || Math.round((defaultEUR * 3.35) / 50) * 50;
  const defaultUSD = Number(s.prices?.USD || s.priceStartingUSD) || Math.round((defaultEUR * 1.08) / 10) * 10;
  const defaultGBP = Number(s.prices?.GBP || s.priceStartingGBP) || Math.round((defaultEUR * 0.86) / 10) * 10;
  const defaultCAD = Number(s.prices?.CAD || s.priceStartingCAD) || Math.round((defaultEUR * 1.48) / 10) * 10;

  const prices: ServicePrices = {
    USD: Number(s.prices?.USD || s.priceStartingUSD) || defaultUSD,
    TND: Number(s.prices?.TND || s.priceStartingTND) || defaultTND,
    EUR: Number(s.prices?.EUR || s.priceStartingEUR) || defaultEUR,
    GBP: Number(s.prices?.GBP || s.priceStartingGBP) || defaultGBP,
    CAD: Number(s.prices?.CAD || s.priceStartingCAD) || defaultCAD
  };

  return {
    ...s,
    active: s.active !== false,
    priceStartingEUR: prices.EUR,
    priceStartingTND: prices.TND,
    priceStartingUSD: prices.USD,
    priceStartingGBP: prices.GBP,
    priceStartingCAD: prices.CAD,
    prices,
    title: { ...s.title, ar: s.title?.ar || s.title?.fr },
    shortDescription: { ...s.shortDescription, ar: s.shortDescription?.ar || s.shortDescription?.fr },
    fullDescription: { ...s.fullDescription, ar: s.fullDescription?.ar || s.fullDescription?.fr }
  };
};

// Helper to guarantee `ar` fallback on initial items
const enrichWithArabic = <T extends Record<string, any>>(items: T[], titleKey: string = 'title'): T[] => {
  return items.map(item => {
    const copy: any = { ...item };
    if (copy[titleKey] && typeof copy[titleKey] === 'object') {
      if (!copy[titleKey].ar) {
        copy[titleKey] = {
          ...copy[titleKey],
          ar: copy[titleKey].fr || copy[titleKey].en || ''
        };
      }
    }
    return copy as T;
  });
};

const getInitialData = (): StoredDataSchema => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.services && parsed.projects && parsed.blogPosts && parsed.projectTypes) {
          return {
            services: (parsed.services as any[]).map((s, idx) => enrichServiceItemWithPrices(s, idx)),
            projects: parsed.projects,
            blogPosts: parsed.blogPosts,
            projectTypes: parsed.projectTypes,
            features: parsed.features || DEFAULT_FEATURES,
            designLevels: parsed.designLevels || DEFAULT_DESIGN_LEVELS,
            timelines: parsed.timelines || DEFAULT_TIMELINES,
            supportLevels: parsed.supportLevels || DEFAULT_SUPPORT_LEVELS,
            pricingConfig: parsed.pricingConfig || {
              pricePerExtraPageUSD: 40,
              pricePerExtraPageTND: 100,
              pricePerExtraPageEUR: 35,
              pricePerExtraPageGBP: 30,
              pricePerExtraPageCAD: 50,
            },
            translations: parsed.translations || DEFAULT_TRANSLATIONS,
            lastUpdated: parsed.lastUpdated
          };
        }
      }
    } catch (err) {
      console.error('Error parsing stored initial data:', err);
    }
  }

  // Fallback to defaults
  return {
    services: DEFAULT_SERVICES,
    projects: DEFAULT_PROJECTS,
    blogPosts: DEFAULT_BLOG_POSTS,
    projectTypes: DEFAULT_PROJECT_TYPES,
    designLevels: DEFAULT_DESIGN_LEVELS,
    timelines: DEFAULT_TIMELINES,
    supportLevels: DEFAULT_SUPPORT_LEVELS,
    features: DEFAULT_FEATURES,
    pricingConfig: {
      pricePerExtraPageUSD: 40,
      pricePerExtraPageTND: 100,
      pricePerExtraPageEUR: 35,
      pricePerExtraPageGBP: 30,
      pricePerExtraPageCAD: 50,
    },
    translations: DEFAULT_TRANSLATIONS,
    lastUpdated: new Date().toISOString()
  };
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<StoredDataSchema>(getInitialData());
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');


  // Fetch initial data from DB on mount
  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(dbData => {
        if (dbData && dbData.services && dbData.projects) {
           setData({
             services: dbData.services,
             projects: dbData.projects,
             blogPosts: dbData.blogPosts,
             projectTypes: dbData.projectTypes || getInitialData().projectTypes,
             designLevels: dbData.designLevels || getInitialData().designLevels,
             timelines: dbData.timelines || getInitialData().timelines,
             supportLevels: dbData.supportLevels || getInitialData().supportLevels,
             features: dbData.features || getInitialData().features,
             pricingConfig: dbData.pricingConfig || getInitialData().pricingConfig,
             translations: dbData.translations || getInitialData().translations
           });
        }
        setIsLoadingData(false);
      })
      .catch(err => {
        console.error("Failed to load config from DB", err);
        setIsLoadingData(false);
      });
  }, []);

  // Persist to DB whenever data changes (debounce or save directly)
  const isFirstRender = React.useRef(true);
  useEffect(() => {
    if (isFirstRender.current || isLoadingData) {
      if (!isLoadingData) isFirstRender.current = false;
      return;
    }
    
    setSaveStatus('saving');
    
    const token = localStorage.getItem('admin_token');
    if (!token) return; // Only admin can save

    const timeout = setTimeout(() => {
      fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
      .then(res => {
        if (res.ok) {
          setSaveStatus('saved');
        } else {
          setSaveStatus('error');
        }
      })
      .catch(err => {
        console.error('Error persisting admin data:', err);
        setSaveStatus('error');
      });
    }, 1000); // Debounce saves

    return () => clearTimeout(timeout);
  }, [data, isLoadingData]);


  // Sync state across browser tabs in real-time
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          // Only update if it has actually changed to avoid infinite loops
          if (parsed.lastUpdated && parsed.lastUpdated !== data.lastUpdated) {
            setData((prev) => ({
              ...prev,
              services: parsed.services || prev.services,
              projects: parsed.projects || prev.projects,
              blogPosts: parsed.blogPosts || prev.blogPosts,
              projectTypes: parsed.projectTypes || prev.projectTypes,
              features: parsed.features || prev.features,
              pricingConfig: parsed.pricingConfig || prev.pricingConfig,
              translations: parsed.translations || prev.translations,
              lastUpdated: parsed.lastUpdated
            }));
          }
        } catch (err) {
          console.error('Error parsing storage event data:', err);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [data.lastUpdated]);

  // SERVICES CRUD
  const addService = useCallback((newService: ServiceItem) => {
    const prepared = enrichServiceItemWithPrices(newService);
    setData(prev => ({
      ...prev,
      services: [prepared, ...prev.services]
    }));
  }, []);

  const updateService = useCallback((id: string, updates: Partial<ServiceItem>) => {
    setData(prev => ({
      ...prev,
      services: prev.services.map(s => {
        if (s.id !== id) return s;
        const updated: ServiceItem = { ...s, ...updates };

        // Synchronize prices dictionary and individual price fields
        if (
          updates.prices ||
          updates.priceStartingEUR !== undefined ||
          updates.priceStartingTND !== undefined ||
          updates.priceStartingUSD !== undefined ||
          updates.priceStartingGBP !== undefined ||
          updates.priceStartingCAD !== undefined
        ) {
          const mergedPrices: ServicePrices = {
            ...(s.prices || {}),
            ...(updates.prices || {})
          };
          if (updates.priceStartingEUR !== undefined) mergedPrices.EUR = Number(updates.priceStartingEUR);
          if (updates.priceStartingTND !== undefined) mergedPrices.TND = Number(updates.priceStartingTND);
          if (updates.priceStartingUSD !== undefined) mergedPrices.USD = Number(updates.priceStartingUSD);
          if (updates.priceStartingGBP !== undefined) mergedPrices.GBP = Number(updates.priceStartingGBP);
          if (updates.priceStartingCAD !== undefined) mergedPrices.CAD = Number(updates.priceStartingCAD);

          updated.prices = mergedPrices;
          updated.priceStartingEUR = mergedPrices.EUR;
          updated.priceStartingTND = mergedPrices.TND;
          updated.priceStartingUSD = mergedPrices.USD;
          updated.priceStartingGBP = mergedPrices.GBP;
          updated.priceStartingCAD = mergedPrices.CAD;
        }

        return updated;
      })
    }));
  }, []);

  const updateServicePrice = useCallback((id: string, currency: ServiceCurrency, amount: number) => {
    setData(prev => ({
      ...prev,
      services: prev.services.map(s => {
        if (s.id !== id) return s;
        const numAmount = Math.max(0, Number(amount) || 0);
        const newPrices: ServicePrices = {
          ...(s.prices || {}),
          [currency]: numAmount
        };
        return {
          ...s,
          prices: newPrices,
          priceStartingEUR: currency === 'EUR' ? numAmount : (s.priceStartingEUR || newPrices.EUR),
          priceStartingTND: currency === 'TND' ? numAmount : (s.priceStartingTND || newPrices.TND),
          priceStartingUSD: currency === 'USD' ? numAmount : (s.priceStartingUSD || newPrices.USD),
          priceStartingGBP: currency === 'GBP' ? numAmount : (s.priceStartingGBP || newPrices.GBP),
          priceStartingCAD: currency === 'CAD' ? numAmount : (s.priceStartingCAD || newPrices.CAD)
        };
      })
    }));
  }, []);

  const deleteService = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  }, []);

  const toggleServiceActive = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      services: prev.services.map(s => (s.id === id ? { ...s, active: !s.active } : s))
    }));
  }, []);

  // PROJECTS CRUD
  const addProject = useCallback((newProject: ProjectItem) => {
    setData(prev => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<ProjectItem>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...p, ...updates } : p))
    }));
  }, []);

  const deleteProject = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  }, []);

  const toggleProjectPublished = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...p, published: !p.published } : p))
    }));
  }, []);

  // BLOG POSTS CRUD
  const addBlogPost = useCallback((newPost: BlogPostItem) => {
    setData(prev => ({
      ...prev,
      blogPosts: [newPost, ...prev.blogPosts]
    }));
  }, []);

  const updateBlogPost = useCallback((slug: string, updates: Partial<BlogPostItem>) => {
    setData(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.map(b => (b.slug === slug ? { ...b, ...updates } : b))
    }));
  }, []);

  const deleteBlogPost = useCallback((slug: string) => {
    setData(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.filter(b => b.slug !== slug)
    }));
  }, []);

  const toggleBlogPostPublished = useCallback((slug: string) => {
    setData(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.map(b => (b.slug === slug ? { ...b, published: !b.published } : b))
    }));
  }, []);

  // CALCULATOR CRUD
  const updateProjectType = useCallback((id: ProjectTypeId, updates: Partial<ProjectTypeOption>) => {
    setData(prev => ({
      ...prev,
      projectTypes: prev.projectTypes.map(t => (t.id === id ? { ...t, ...updates } : t))
    }));
  }, []);

  const addProjectType = useCallback((type: ProjectTypeOption) => {
    setData(prev => ({
      ...prev,
      projectTypes: [...prev.projectTypes, type]
    }));
  }, []);

  const deleteProjectType = useCallback((id: ProjectTypeId) => {
    setData(prev => ({
      ...prev,
      projectTypes: prev.projectTypes.filter(t => t.id !== id)
    }));
  }, []);

  const toggleProjectTypeActive = useCallback((id: ProjectTypeId) => {
    setData(prev => ({
      ...prev,
      projectTypes: prev.projectTypes.map(t => (t.id === id ? { ...t, active: !t.active } : t))
    }));
  }, []);

  const updateFeature = useCallback((id: string, updates: Partial<FeatureOption>) => {
    setData(prev => ({
      ...prev,
      features: prev.features.map(f => (f.id === id ? { ...f, ...updates } : f))
    }));
  }, []);

  const addFeature = useCallback((feat: FeatureOption) => {
    setData(prev => ({
      ...prev,
      features: [...prev.features, feat]
    }));
  }, []);

  const deleteFeature = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      features: prev.features.filter(f => f.id !== id)
    }));
  }, []);

  const toggleFeatureActive = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      features: prev.features.map(f => (f.id === id ? { ...f, active: !f.active } : f))
    }));
  }, []);

  const updatePricingConfig = useCallback((config: Partial<PricingConfig>) => {
    setData(prev => ({
      ...prev,
      pricingConfig: { ...prev.pricingConfig, ...config }
    }));
  }, []);

  // TRANSLATIONS
  const updateTranslationText = useCallback((lang: Language, sectionKey: string, subKey: string, value: string) => {
    setData(prev => {
      const currentLangTrans = (prev.translations as any)[lang] || {};
      const currentSection = currentLangTrans[sectionKey] || {};
      return {
        ...prev,
        translations: {
          ...prev.translations,
          [lang]: {
            ...currentLangTrans,
            [sectionKey]: {
              ...currentSection,
              [subKey]: value
            }
          }
        }
      };
    });
  }, []);

  const updateWholeTranslations = useCallback((newTrans: typeof DEFAULT_TRANSLATIONS) => {
    setData(prev => ({
      ...prev,
      translations: newTrans
    }));
  }, []);

  // RESET & EXPORT / IMPORT
  const resetToDefaults = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    setData(getInitialData());
  }, []);

  const exportJSON = useCallback(() => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `sofienne-boukhris-backup-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (e) {
      console.error('Export failed', e);
    }
  }, [data]);

  const importJSON = useCallback((jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.services && parsed.projects && parsed.blogPosts) {
        setData({
          services: parsed.services,
          projects: parsed.projects,
          blogPosts: parsed.blogPosts,
          projectTypes: parsed.projectTypes || DEFAULT_PROJECT_TYPES,
          designLevels: parsed.designLevels || DEFAULT_DESIGN_LEVELS,
          timelines: parsed.timelines || DEFAULT_TIMELINES,
          supportLevels: parsed.supportLevels || DEFAULT_SUPPORT_LEVELS,
          features: parsed.features || DEFAULT_FEATURES,
          pricingConfig: parsed.pricingConfig || {
            pricePerExtraPageUSD: 40,
            pricePerExtraPageEUR: 35,
            pricePerExtraPageTND: 100,
            pricePerExtraPageGBP: 30,
            pricePerExtraPageCAD: 50,
          },
          translations: mergeTranslations(DEFAULT_TRANSLATIONS, parsed.translations),
          lastUpdated: new Date().toISOString()
        });
        return true;
      }
      return false;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        services: data.services,
        addService,
        updateService,
        updateServicePrice,
        deleteService,
        toggleServiceActive,

        projects: data.projects,
        addProject,
        updateProject,
        deleteProject,
        toggleProjectPublished,

        blogPosts: data.blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        toggleBlogPostPublished,

        projectTypes: data.projectTypes,
        updateProjectType,
        addProjectType,
        deleteProjectType,
        toggleProjectTypeActive,

        features: data.features,
        updateFeature,
        addFeature,
        deleteFeature,
        toggleFeatureActive,

        pricingConfig: data.pricingConfig,
        updatePricingConfig,

        calculatorConfig: {
          projectTypes: data.projectTypes,
          features: data.features,
          designLevels: data.designLevels,
          timelines: data.timelines,
          supportLevels: data.supportLevels,
          pricePerExtraPageUSD: data.pricingConfig.pricePerExtraPageUSD,
          pricePerExtraPageTND: data.pricingConfig.pricePerExtraPageTND,
          pricePerExtraPageEUR: data.pricingConfig.pricePerExtraPageEUR,
          pricePerExtraPageGBP: data.pricingConfig.pricePerExtraPageGBP,
          pricePerExtraPageCAD: data.pricingConfig.pricePerExtraPageCAD
        },

        translations: data.translations,
        updateTranslationText,
        updateWholeTranslations,

        resetToDefaults,
        exportJSON,
        importJSON,
        saveStatus
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

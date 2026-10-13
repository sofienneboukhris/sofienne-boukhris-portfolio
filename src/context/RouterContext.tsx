import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface RouterContextType {
  path: string;
  lang: Language;
  navigate: (to: string) => void;
  setLang: (newLang: Language) => void;
  toggleLang: () => void;
  getEquivalentRoute: (targetLang: Language, fromPath?: string) => string;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

// Static mapping between French and English route equivalents
const ROUTE_MAP_FR_TO_EN: Record<string, string> = {
  '/': '/en/',
  '/services': '/en/services',
  '/services/': '/en/services',
  '/realisations': '/en/projects',
  '/realisations/': '/en/projects',
  '/tarifs': '/en/pricing',
  '/tarifs/': '/en/pricing',
  '/a-propos': '/en/about',
  '/a-propos/': '/en/about',
  '/faq': '/en/faq',
  '/faq/': '/en/faq',
  '/contact': '/en/contact',
  '/contact/': '/en/contact',
  '/calculateur': '/en/calculator',
  '/calculateur/': '/en/calculator',
  '/devis': '/en/calculator',
  '/devis/': '/en/calculator',
  '/blog': '/en/blog',
  '/blog/': '/en/blog',
  '/developpeur-web-tunisie': '/en/services',
  '/developpeur-web-sousse': '/en/services'
};

const ROUTE_MAP_EN_TO_FR: Record<string, string> = {
  '/en': '/',
  '/en/': '/',
  '/en/services': '/services',
  '/en/services/': '/services',
  '/en/projects': '/realisations',
  '/en/projects/': '/realisations',
  '/en/pricing': '/tarifs',
  '/en/pricing/': '/tarifs',
  '/en/about': '/a-propos',
  '/en/about/': '/a-propos',
  '/en/faq': '/faq',
  '/en/faq/': '/faq',
  '/en/contact': '/contact',
  '/en/contact/': '/contact',
  '/en/calculator': '/calculateur',
  '/en/calculator/': '/calculateur',
  '/en/quote': '/calculateur',
  '/en/quote/': '/calculateur',
  '/en/blog': '/blog',
  '/en/blog/': '/blog'
};

/**
 * Calculates the exact equivalent route when switching between FR and EN
 */
export function calculateEquivalentRoute(currentPath: string, targetLang: Language): string {
  const normalized = currentPath.trim();
  const cleanPath = normalized.length > 1 && normalized.endsWith('/') ? normalized.slice(0, -1) : normalized;

  // Preserve admin routes intact
  if (cleanPath.startsWith('/admin')) {
    return cleanPath;
  }

  // Extract base path by removing language prefix
  let basePath = cleanPath;
  if (basePath.startsWith('/en')) {
    basePath = basePath.replace(/^\/en/, '') || '/';
    // Translate EN path names back to canonical French route if known
    if (ROUTE_MAP_EN_TO_FR[basePath]) {
      basePath = ROUTE_MAP_EN_TO_FR[basePath];
    } else if (ROUTE_MAP_EN_TO_FR[`/en${basePath}`]) {
      basePath = ROUTE_MAP_EN_TO_FR[`/en${basePath}`];
    }
  } else if (basePath.startsWith('/ar')) {
    basePath = basePath.replace(/^\/ar/, '') || '/';
  }

  if (targetLang === 'fr') {
    return basePath === '' ? '/' : basePath;
  }

  if (targetLang === 'en') {
    if (ROUTE_MAP_FR_TO_EN[basePath]) {
      return ROUTE_MAP_FR_TO_EN[basePath];
    }
    if (basePath.startsWith('/realisations/')) {
      const slug = basePath.replace(/^\/realisations\//, '');
      return `/en/projects/${slug}`;
    }
    if (basePath.startsWith('/services/')) {
      const slug = basePath.replace(/^\/services\//, '');
      return `/en/services/${slug}`;
    }
    if (basePath.startsWith('/blog/')) {
      const slug = basePath.replace(/^\/blog\//, '');
      return `/en/blog/${slug}`;
    }
    return basePath === '/' ? '/en/' : `/en${basePath}`;
  }

  // targetLang === 'ar'
  return basePath === '/' ? '/ar' : `/ar${basePath}`;
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const getLangFromPath = (p: string): Language => {
    if (p.startsWith('/en') || p.startsWith('/en/')) return 'en';
    if (p.startsWith('/ar') || p.startsWith('/ar/')) return 'ar';
    return 'fr'; // Default is French
  };

  const [lang, setInternalLang] = useState<Language>(() => getLangFromPath(path));

  // Sync lang when path changes
  useEffect(() => {
    // If not in admin, detect from path prefix
    if (!path.startsWith('/admin')) {
      setInternalLang(getLangFromPath(path));
    }
  }, [path]);

  // Synchronize document.documentElement.lang and dir (RTL for Arabic)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  }, [lang]);

  useEffect(() => {
    const handlePopState = () => {
      const nextPath = window.location.pathname || '/';
      setPath(nextPath);
      if (!nextPath.startsWith('/admin')) {
        setInternalLang(getLangFromPath(nextPath));
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (to === path) return;
    window.history.pushState({}, '', to);
    setPath(to);
    if (!to.startsWith('/admin')) {
      setInternalLang(getLangFromPath(to));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getEquivalentRoute = (targetLang: Language, fromPath?: string): string => {
    return calculateEquivalentRoute(fromPath || path, targetLang);
  };

  const setLang = (newLang: Language) => {
    if (newLang === lang) return;
    if (path.startsWith('/admin')) {
      setInternalLang(newLang);
      return;
    }
    const targetPath = calculateEquivalentRoute(path, newLang);
    navigate(targetPath);
  };

  const toggleLang = () => {
    const order: Language[] = ['fr', 'en', 'ar'];
    const currentIndex = order.indexOf(lang);
    const nextLang = order[(currentIndex + 1) % order.length];
    setLang(nextLang);
  };

  return (
    <RouterContext.Provider value={{ path, lang, navigate, setLang, toggleLang, getEquivalentRoute }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

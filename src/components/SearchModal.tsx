import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { Language } from '../types';
import {
  Search,
  X,
  BookOpen,
  Briefcase,
  Layers,
  ArrowRight,
  Clock,
  Tag,
  ExternalLink,
  CornerDownLeft,
  Sparkles
} from 'lucide-react';

export type SearchCategoryFilter = 'all' | 'projects' | 'blog' | 'services';

export interface SearchResultItem {
  id: string;
  type: 'project' | 'blog' | 'service';
  title: string;
  description: string;
  category: string;
  url: string;
  tags?: string[];
  meta?: string;
  score?: number;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Normalize diacritics / accents for flexible search matching (e.g. "création" matches "creation")
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { projects: PROJECTS, blogPosts: BLOG_POSTS, services: SERVICES } = useData();
  const { lang, navigate } = useRouter();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategoryFilter>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Focus input automatically when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveCategory('all');
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Lock body scroll when search modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K and / when not in inputs)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Toggle on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled outside or via trigger
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, onClose]);

  // Build unified search index
  const allSearchableItems: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    // 1. Projects
    PROJECTS.forEach((project) => {
      const title = project.title;
      const desc = project.description[lang] || '';
      const cat = project.categoryLabel[lang] || project.category;
      const url = lang === 'fr' ? `/realisations/${project.slug}` : `/en/projects/${project.slug}`;

      items.push({
        id: `project-${project.id || project.slug}`,
        type: 'project',
        title,
        description: desc,
        category: cat,
        url,
        tags: project.technologies || [],
        meta: project.domain
      });
    });

    // 2. Blog Posts
    BLOG_POSTS.forEach((post) => {
      const title = post.title[lang] || '';
      const desc = post.excerpt[lang] || '';
      const cat = post.categoryLabel[lang] || post.category;
      const url = lang === 'fr' ? `/blog/${post.slug}` : `/en/blog/${post.slug}`;
      const postTags = post.tags?.[lang] || [];

      items.push({
        id: `blog-${post.slug}`,
        type: 'blog',
        title,
        description: desc,
        category: cat,
        url,
        tags: postTags,
        meta: `${post.readTime} • ${post.publishDate}`
      });
    });

    // 3. Services
    SERVICES.forEach((service) => {
      const title = service.title[lang] || '';
      const desc = service.shortDescription[lang] || '';
      const cat = lang === 'fr' ? 'Prestation & Service' : 'Service & Solution';
      const url = `/services/${service.slug}`;

      items.push({
        id: `service-${service.id || service.slug}`,
        type: 'service',
        title,
        description: desc,
        category: cat,
        url,
        tags: service.technologies || []
      });
    });

    // 4. Calculator & Interactive Tools
    items.push({
      id: 'tool-calculator',
      type: 'service',
      title: lang === 'fr' ? 'Calculateur de devis & coût de site web' : 'Interactive Website Cost Calculator',
      description:
        lang === 'fr'
          ? 'Estimez le budget de votre projet web (site vitrine, e-commerce, application web sur-mesure) en 2 minutes en Euros (€) et Dinars Tunisiens (DT).'
          : 'Instant live estimation for showcase sites, e-commerce stores, and custom web applications in EUR (€) and TND (DT).',
      category: lang === 'fr' ? 'Outil interactif' : 'Interactive Tool',
      url: lang === 'fr' ? '/calculateur' : '/en/calculator',
      tags: [
        'devis',
        'calculateur',
        'prix',
        'estimation',
        'cout',
        'budget',
        'tarif',
        'calculator',
        'quote',
        'cost',
        'pricing'
      ],
      meta: lang === 'fr' ? 'Simulation en temps réel' : 'Live simulator'
    });

    return items;
  }, [lang]);

  // Real-time filtering & ranking
  const filteredResults = useMemo(() => {
    const cleanQuery = normalizeText(query.trim());

    // When empty, show top curated recommendations
    if (!cleanQuery) {
      if (activeCategory === 'projects') {
        return allSearchableItems.filter((i) => i.type === 'project').slice(0, 6);
      }
      if (activeCategory === 'blog') {
        return allSearchableItems.filter((i) => i.type === 'blog').slice(0, 6);
      }
      if (activeCategory === 'services') {
        return allSearchableItems.filter((i) => i.type === 'service').slice(0, 6);
      }
      // Top mixed recommendations (2 projects, 2 blog posts, 2 services)
      const topProjects = allSearchableItems.filter((i) => i.type === 'project').slice(0, 3);
      const topBlog = allSearchableItems.filter((i) => i.type === 'blog').slice(0, 3);
      const topServices = allSearchableItems.filter((i) => i.type === 'service').slice(0, 2);
      return [...topProjects, ...topBlog, ...topServices];
    }

    const queryTerms = cleanQuery.split(/\s+/).filter(Boolean);

    const scored = allSearchableItems
      .filter((item) => {
        if (activeCategory !== 'all') {
          if (activeCategory === 'projects' && item.type !== 'project') return false;
          if (activeCategory === 'blog' && item.type !== 'blog') return false;
          if (activeCategory === 'services' && item.type !== 'service') return false;
        }

        const normTitle = normalizeText(item.title);
        const normDesc = normalizeText(item.description);
        const normCategory = normalizeText(item.category);
        const normTags = (item.tags || []).map(normalizeText).join(' ');
        const normMeta = normalizeText(item.meta || '');

        const fullText = `${normTitle} ${normDesc} ${normCategory} ${normTags} ${normMeta}`;

        // Every keyword term must match somewhere in the entity
        return queryTerms.every((term) => fullText.includes(term));
      })
      .map((item) => {
        let score = 0;
        const normTitle = normalizeText(item.title);
        const normDesc = normalizeText(item.description);
        const normTags = (item.tags || []).map(normalizeText);

        queryTerms.forEach((term) => {
          if (normTitle === term) score += 100;
          else if (normTitle.startsWith(term)) score += 50;
          else if (normTitle.includes(term)) score += 30;

          if (normTags.some((t) => t.includes(term))) score += 25;
          if (normDesc.includes(term)) score += 10;
        });

        return { ...item, score };
      });

    return scored.sort((a, b) => (b.score || 0) - (a.score || 0));
  }, [allSearchableItems, query, activeCategory]);

  // Counts by category
  const categoryCounts = useMemo(() => {
    const cleanQuery = normalizeText(query.trim());
    if (!cleanQuery) {
      return {
        all: allSearchableItems.length,
        projects: allSearchableItems.filter((i) => i.type === 'project').length,
        blog: allSearchableItems.filter((i) => i.type === 'blog').length,
        services: allSearchableItems.filter((i) => i.type === 'service').length
      };
    }

    const queryTerms = cleanQuery.split(/\s+/).filter(Boolean);
    const matchesItem = (item: SearchResultItem) => {
      const normTitle = normalizeText(item.title);
      const normDesc = normalizeText(item.description);
      const normCategory = normalizeText(item.category);
      const normTags = (item.tags || []).map(normalizeText).join(' ');
      const normMeta = normalizeText(item.meta || '');
      const fullText = `${normTitle} ${normDesc} ${normCategory} ${normTags} ${normMeta}`;
      return queryTerms.every((term) => fullText.includes(term));
    };

    const matching = allSearchableItems.filter(matchesItem);
    return {
      all: matching.length,
      projects: matching.filter((i) => i.type === 'project').length,
      blog: matching.filter((i) => i.type === 'blog').length,
      services: matching.filter((i) => i.type === 'service').length
    };
  }, [allSearchableItems, query]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults.length, activeCategory]);

  // Handle keyboard navigation within results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
      scrollSelectedIntoView();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
      scrollSelectedIntoView();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const scrollSelectedIntoView = () => {
    setTimeout(() => {
      const selectedEl = resultsContainerRef.current?.querySelector('[data-selected="true"]');
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }, 10);
  };

  const handleSelect = (item: SearchResultItem) => {
    onClose();
    navigate(item.url);
  };

  // Helper to highlight matched query keywords
  const highlightMatches = (text: string) => {
    if (!query.trim()) return text;
    const terms = query.trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return text;

    try {
      // Escape special characters for regex
      const pattern = terms
        .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('|');
      const regex = new RegExp(`(${pattern})`, 'gi');
      const parts = text.split(regex);

      return parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-[#70ba65]/25 text-[#86efac] font-medium rounded-sm px-0.5"
          >
            {part}
          </mark>
        ) : (
          part
        )
      );
    } catch {
      return text;
    }
  };

  const popularTags = [
    'WordPress',
    'WooCommerce',
    'E-commerce',
    'Core Web Vitals',
    'SEO',
    'React',
    'Laravel',
    'Refonte'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-start justify-center p-3 sm:p-4 md:pt-16 lg:pt-20 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'fr' ? 'Recherche sur le site' : 'Site search'}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#00151F]/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#00283A] border border-[#0a3d54] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col max-h-[85vh] z-10"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Input Bar */}
            <div className="relative flex items-center px-4 py-3.5 border-b border-[#0a3d54]/70 bg-[#02162B]">
              <Search className="w-5 h-5 text-[#70ba65] shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  lang === 'fr'
                    ? 'Rechercher un projet, article, techno (ex: WooCommerce, SEO, Vitesse)...'
                    : 'Search projects, blog posts, tech (e.g. WooCommerce, SEO, Speed)...'
                }
                className="w-full bg-transparent border-none text-white placeholder-[#71828a] text-sm sm:text-base focus:outline-none focus:ring-0 font-sans"
                id="site-search-modal-input"
                autoComplete="off"
                spellCheck="false"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="p-1 rounded-md text-[#919ca1] hover:text-white hover:bg-[#00283A] transition-colors mr-2 cursor-pointer"
                  aria-label={lang === 'fr' ? 'Effacer la recherche' : 'Clear search'}
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="px-2 py-1 rounded bg-[#00151F] border border-[#0a3d54] text-[11px] font-mono text-[#919ca1] hover:text-white hover:border-[#70ba65]/60 transition-colors cursor-pointer"
                title={lang === 'fr' ? 'Fermer (Échap)' : 'Close (Esc)'}
              >
                ESC
              </button>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#00283A] border-b border-[#0a3d54]/50 overflow-x-auto scrollbar-none text-xs">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === 'all'
                    ? 'bg-[#70ba65] text-[#00151F] font-bold shadow-sm'
                    : 'bg-[#02162B] text-[#dedee0] hover:text-white border border-[#0a3d54]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? 'Tous' : 'All'}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                  activeCategory === 'all' ? 'bg-[#00151F]/20 text-[#00151F]' : 'bg-[#00151F] text-[#919ca1]'
                }`}>
                  {categoryCounts.all}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('projects')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === 'projects'
                    ? 'bg-[#70ba65] text-[#00151F] font-bold shadow-sm'
                    : 'bg-[#02162B] text-[#dedee0] hover:text-white border border-[#0a3d54]'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? 'Projets' : 'Projects'}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                  activeCategory === 'projects' ? 'bg-[#00151F]/20 text-[#00151F]' : 'bg-[#00151F] text-[#919ca1]'
                }`}>
                  {categoryCounts.projects}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('blog')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === 'blog'
                    ? 'bg-[#70ba65] text-[#00151F] font-bold shadow-sm'
                    : 'bg-[#02162B] text-[#dedee0] hover:text-white border border-[#0a3d54]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? 'Articles Blog' : 'Blog Posts'}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                  activeCategory === 'blog' ? 'bg-[#00151F]/20 text-[#00151F]' : 'bg-[#00151F] text-[#919ca1]'
                }`}>
                  {categoryCounts.blog}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('services')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === 'services'
                    ? 'bg-[#70ba65] text-[#00151F] font-bold shadow-sm'
                    : 'bg-[#02162B] text-[#dedee0] hover:text-white border border-[#0a3d54]'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? 'Services' : 'Services'}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] ${
                  activeCategory === 'services' ? 'bg-[#00151F]/20 text-[#00151F]' : 'bg-[#00151F] text-[#919ca1]'
                }`}>
                  {categoryCounts.services}
                </span>
              </button>
            </div>

            {/* Popular tags quick bar if query is empty */}
            {!query.trim() && (
              <div className="px-4 py-2 bg-[#02162B]/50 border-b border-[#0a3d54]/40 flex items-center gap-2 overflow-x-auto scrollbar-none text-[11px]">
                <span className="text-[#919ca1] font-mono whitespace-nowrap flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#70ba65]" />
                  {lang === 'fr' ? 'Tendances :' : 'Popular :'}
                </span>
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setQuery(tag);
                      inputRef.current?.focus();
                    }}
                    className="px-2 py-0.5 rounded bg-[#02162B] hover:bg-[#70ba65]/20 hover:text-[#70ba65] text-[#dedee0] border border-[#0a3d54] whitespace-nowrap transition-colors cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}

            {/* Results List */}
            <div
              ref={resultsContainerRef}
              className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1.5 max-h-[50vh] scrollbar-thin scrollbar-thumb-[#0a3d54] scrollbar-track-transparent"
            >
              {filteredResults.length > 0 ? (
                filteredResults.map((item, index) => {
                  const isSelected = index === selectedIndex;

                  return (
                    <div
                      key={item.id}
                      data-selected={isSelected}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`group relative p-3 sm:p-3.5 rounded-xl transition-all cursor-pointer border flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#02162B] border-[#70ba65] shadow-md'
                          : 'bg-[#00283A] hover:bg-[#02162B] border-transparent hover:border-[#0a3d54]'
                      }`}
                    >
                      <div className="flex-1 min-w-0 space-y-1">
                        {/* Type & Category Header */}
                        <div className="flex items-center gap-2 text-[11px] font-mono">
                          {item.type === 'project' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[#70ba65] bg-[#70ba65]/10 border border-[#70ba65]/30">
                              <Briefcase className="w-3 h-3" />
                              <span>{lang === 'fr' ? 'Projet' : 'Project'}</span>
                            </span>
                          )}
                          {item.type === 'blog' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/30">
                              <BookOpen className="w-3 h-3" />
                              <span>Blog</span>
                            </span>
                          )}
                          {item.type === 'service' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[#a78bfa] bg-[#a78bfa]/10 border border-[#a78bfa]/30">
                              <Tag className="w-3 h-3" />
                              <span>Service</span>
                            </span>
                          )}

                          <span className="text-[#919ca1] truncate">
                            {item.category}
                          </span>

                          {item.meta && (
                            <span className="text-[#71828a] hidden sm:inline truncate">
                              • {item.meta}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#70ba65] transition-colors leading-snug">
                          {highlightMatches(item.title)}
                        </h4>

                        {/* Description / Excerpt */}
                        <p className="text-xs text-[#919ca1] line-clamp-2 leading-relaxed">
                          {highlightMatches(item.description)}
                        </p>

                        {/* Tags / Tech Chips */}
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {item.tags.slice(0, 4).map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00151F] text-[#dedee0] border border-[#0a3d54]"
                              >
                                {highlightMatches(tag)}
                              </span>
                            ))}
                            {item.tags.length > 4 && (
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-[#919ca1]">
                                +{item.tags.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Right Arrow / Return Action Icon */}
                      <div className="shrink-0 self-center pt-1">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-[#70ba65] text-[#00151F] scale-105'
                              : 'bg-[#02162B] text-[#919ca1] group-hover:text-white'
                          }`}
                        >
                          <CornerDownLeft className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                /* Empty state when no items match query */
                <div className="py-12 px-4 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#02162B] border border-[#0a3d54] flex items-center justify-center mx-auto text-[#919ca1]">
                    <Search className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {lang === 'fr'
                        ? `Aucun résultat pour « ${query} »`
                        : `No results found for "${query}"`}
                    </p>
                    <p className="text-xs text-[#919ca1] max-w-sm mx-auto mt-1">
                      {lang === 'fr'
                        ? 'Essayez avec un mot-clé plus court, un nom de CMS (WordPress, Shopify) ou un domaine (e-commerce, SEO).'
                        : 'Try searching for a CMS (WordPress, Shopify), service type, or a technology like React or Laravel.'}
                    </p>
                  </div>
                  {activeCategory !== 'all' && (
                    <button
                      type="button"
                      onClick={() => setActiveCategory('all')}
                      className="text-xs font-mono text-[#70ba65] hover:underline"
                    >
                      {lang === 'fr' ? 'Élargir à toutes les catégories' : 'Expand to all categories'}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer keyboard helpers */}
            <div className="px-4 py-2.5 bg-[#02162B] border-t border-[#0a3d54]/60 flex flex-wrap items-center justify-between text-[11px] font-mono text-[#919ca1] select-none">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[#00151F] border border-[#0a3d54] text-[10px]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-[#00151F] border border-[#0a3d54] text-[10px]">↓</kbd>
                  <span>{lang === 'fr' ? 'Naviguer' : 'Navigate'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-[#00151F] border border-[#0a3d54] text-[10px]">↵</kbd>
                  <span>{lang === 'fr' ? 'Ouvrir' : 'Open'}</span>
                </span>
              </div>

              <div className="text-[10px] text-[#70ba65]">
                {filteredResults.length} {lang === 'fr' ? 'résultat(s)' : 'result(s)'}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

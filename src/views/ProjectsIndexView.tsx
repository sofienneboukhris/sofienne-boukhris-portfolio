import React, { useState, useMemo } from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { ProjectCard } from '../components/ProjectCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { SidebarCard } from '../components/SidebarCard';
import { ProjectStats } from '../components/ProjectStats';
import { ProjectItem } from '../types';
import { 
  Sparkles, 
  ArrowUpDown, 
  Search, 
  X, 
  RotateCcw, 
  SlidersHorizontal,
  Code2,
  CheckCircle2, Filter
} from 'lucide-react';

type SortOption = 'default' | 'title-asc' | 'title-desc' | 'techs-desc';

export const ProjectsIndexView: React.FC = () => {
  const { lang } = useRouter();
  const { projects } = useData();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const allTechs = useMemo(() => {
    const techSet = new Set<string>();
    projects.filter(p => p.published !== false).forEach((p) => {
      p.technologies.forEach((t) => techSet.add(t));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const publishedProjects = useMemo(
    () => projects.filter((p) => p.published !== false),
    [projects]
  );

  // Filter definitions with localized labels
  const filterCategories = useMemo(() => [
    { id: 'all', label: lang === 'fr' ? 'Tous les projets' : 'All Projects' },
    { id: 'react', label: 'React' },
    { id: 'wordpress', label: 'WordPress' },
    { id: 'shopify', label: 'Shopify' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'vitrine', label: lang === 'fr' ? 'Sites Vitrines' : 'Showcase' },
    { id: 'formation', label: lang === 'fr' ? 'Formation' : 'Education' }
  ], [lang]);

  // Determine if a project matches a given filter ID
  const matchesFilter = (project: ProjectItem, filterId: string): boolean => {
    if (filterId === 'all') return true;

    if (filterId === 'react') {
      return (
        project.technologies.some((t) => /react|next/i.test(t)) ||
        /react|next/i.test(project.categoryLabel.fr) ||
        /react|next/i.test(project.categoryLabel.en)
      );
    }

    if (filterId === 'wordpress') {
      return project.technologies.some((t) => /wordpress|woocommerce/i.test(t));
    }

    if (filterId === 'shopify') {
      return project.technologies.some((t) => /shopify|liquid/i.test(t));
    }

    if (filterId === 'ecommerce') {
      return (
        project.category === 'ecommerce' ||
        project.technologies.some((t) => /woocommerce|shopify/i.test(t))
      );
    }

    if (filterId === 'vitrine') {
      return project.category === 'vitrine' || project.category === 'institutionnel';
    }

    if (filterId === 'formation') {
      return project.category === 'formation';
    }

    return true;
  };

  // Pre-calculate count for each filter button badge
  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of filterCategories) {
      counts[cat.id] = publishedProjects.filter((p) => matchesFilter(p, cat.id)).length;
    }
    return counts;
  }, [filterCategories, publishedProjects]);

  // Filter and sort projects dynamically
  const sortedAndFilteredProjects = useMemo(() => {
    // 1. Filter by category
    let result = publishedProjects.filter((p) => matchesFilter(p, activeFilter));

    // 1.5 Filter by selected technologies
    if (selectedTechs.length > 0) {
      result = result.filter((p) =>
        selectedTechs.some((t) => p.technologies.includes(t))
      );
    }
    // 2. Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.domain.toLowerCase().includes(q) ||
          p.description[lang].toLowerCase().includes(q) ||
          p.categoryLabel[lang].toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    }

    // 3. Dynamic sorting
    const sorted = [...result];
    if (sortBy === 'title-asc') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'title-desc') {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'techs-desc') {
      sorted.sort((a, b) => b.technologies.length - a.technologies.length);
    }
    // 'default' preserves natural curated order

    return sorted;
  }, [activeFilter, searchQuery, sortBy, lang]);

  const hasActiveFilters = activeFilter !== 'all' || searchQuery.trim() !== '' || sortBy !== 'default' || selectedTechs.length > 0;

  const handleResetFilters = () => {
    setActiveFilter('all');
    setSearchQuery('');
    setSortBy('default');
    setSelectedTechs([]);
  };

  return (
    <>
      <SEOHead
        title={lang === 'fr' ? 'Réalisations & Portfolio Projets Web' : 'Selected Projects & Portfolio'}
        description={
          lang === 'fr'
            ? "Découvrez les réalisations de Sofienne Boukhris : applications React, boutiques Shopify, sites e-commerce WooCommerce et plateformes sur mesure avec résultats concrets."
            : "Discover projects built by Sofienne Boukhris: React web apps, custom Shopify stores, WooCommerce platforms, and high-performance websites."
        }
        canonicalPath={lang === 'fr' ? '/realisations' : '/en/projects'}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <SidebarCard />

          <main className="flex-1 w-full space-y-8">
            <Breadcrumbs
              items={[
                { label: lang === 'fr' ? 'Réalisations' : 'Projects' }
              ]}
            />

            {/* Header Card */}
            <div className="trm-card p-6 sm:p-10 relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#02162B] border border-[#0a3d54] text-[11px] font-mono text-[#70ba65] mb-4 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? 'Portfolio Vérifié' : 'Verified Portfolio'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
                {lang === 'fr' ? (
                  <>Mes réalisations <span className="text-[#70ba65]">récentes</span></>
                ) : (
                  <>Selected <span className="text-[#70ba65]">Client Work</span></>
                )}
              </h1>

              <p className="text-sm sm:text-base text-[#a8b4b9] leading-relaxed max-w-3xl">
                {lang === 'fr'
                  ? "Explorez une sélection de projets en production : applications web React, boutiques Shopify personnalisées et plateformes WordPress/WooCommerce développées avec rigueur et performances optimales."
                  : "Explore production client work across React web applications, custom Shopify stores, and tailored WordPress/WooCommerce platforms engineered for speed, clean code, and business conversion."}
              </p>
            </div>

            {/* Project Statistics (Recharts Donut Chart) */}
            <ProjectStats
              onSelectCategory={(catId) => setActiveFilter(catId)}
              activeFilter={activeFilter}
            />

            {/* Category Filter Buttons */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-[#919ca1] uppercase tracking-wider">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#70ba65]" />
                  <span>{lang === 'fr' ? 'Filtrer par catégorie & stack' : 'Filter by category & stack'}</span>
                </div>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1.5 text-xs text-[#70ba65] hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{lang === 'fr' ? 'Réinitialiser' : 'Reset all'}</span>
                  </button>
                )}
              </div>

              {/* Category Filter Buttons Grid */}
              <div 
                className="flex flex-wrap gap-2 sm:gap-2.5" 
                role="group" 
                aria-label={lang === 'fr' ? 'Filtres de projets' : 'Project category filters'}
              >
                {filterCategories.map((f) => {
                  const isSelected = activeFilter === f.id;
                  const count = filterCounts[f.id] || 0;

                  return (
                    <button
                      key={f.id}
                      type="button"
                      id={`filter-btn-${f.id}`}
                      onClick={() => setActiveFilter(f.id)}
                      aria-pressed={isSelected}
                      className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#70ba65]/40 ${
                        isSelected
                          ? 'bg-[#70ba65] text-[#001E2B] border-[#70ba65] font-bold shadow-lg shadow-[#70ba65]/20 scale-102'
                          : 'bg-[#00283A] text-[#919ca1] border-[#0a3d54] hover:text-white hover:border-[#70ba65]/60 hover:bg-[#02162B]'
                      }`}
                    >
                      <span>{f.label}</span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full transition-colors ${
                          isSelected
                            ? 'bg-[#001E2B]/20 text-[#001E2B] font-bold'
                            : 'bg-[#02162B] text-[#70ba65] border border-[#0a3d54]'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Search & Sort Control Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-xl bg-[#02162B] border border-[#0a3d54]">
              {/* Live search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#919ca1] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  id="project-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    lang === 'fr'
                      ? 'Rechercher par mot-clé, techno, CMS...'
                      : 'Search by keyword, technology, CMS...'
                  }
                  className="w-full bg-[#001E2B] border border-[#0a3d54] rounded-lg pl-9 pr-8 py-2 text-xs sm:text-sm text-white placeholder-[#607274] focus:outline-none focus:border-[#70ba65] transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#919ca1] hover:text-white p-1"
                    title={lang === 'fr' ? 'Effacer la recherche' : 'Clear search'}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Dynamic Sort Dropdown */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-[#919ca1] font-mono shrink-0 pl-1">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#70ba65]" />
                  <span className="hidden md:inline">{lang === 'fr' ? 'Trier :' : 'Sort :'}</span>
                </div>
                <select
                  id="project-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  aria-label={lang === 'fr' ? 'Trier les projets' : 'Sort projects'}
                  className="bg-[#001E2B] border border-[#0a3d54] text-xs font-semibold text-[#dedee0] rounded-lg px-3 py-2 focus:outline-none focus:border-[#70ba65] transition-colors cursor-pointer"
                >
                  <option value="default">
                    {lang === 'fr' ? '✨ Ordre par défaut' : '✨ Featured order'}
                  </option>
                  <option value="title-asc">
                    {lang === 'fr' ? '🔤 Nom (A → Z)' : '🔤 Project Name (A → Z)'}
                  </option>
                  <option value="title-desc">
                    {lang === 'fr' ? '🔤 Nom (Z → A)' : '🔤 Project Name (Z → A)'}
                  </option>
                  <option value="techs-desc">
                    {lang === 'fr' ? '⚡ Stack la plus riche' : '⚡ Tech Stack Depth'}
                  </option>
                </select>
              </div>
            </div>

            {/* Results Counter & Active Filter Indicators */}
            <div className="flex items-center justify-between text-xs text-[#919ca1] px-1">
              <div>
                <span>{lang === 'fr' ? 'Affichage de ' : 'Showing '}</span>
                <strong className="text-white font-mono">{sortedAndFilteredProjects.length}</strong>
                <span>{lang === 'fr' ? ` sur ${publishedProjects.length} projets` : ` of ${publishedProjects.length} projects`}</span>
              </div>

              {activeFilter !== 'all' && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a3d54]/40 border border-[#0a3d54] text-[11px] text-[#70ba65]">
                  <span>{filterCategories.find((c) => c.id === activeFilter)?.label}</span>
                  <button
                    type="button"
                    onClick={() => setActiveFilter('all')}
                    className="hover:text-white transition-colors"
                    title={lang === 'fr' ? 'Retirer le filtre' : 'Remove filter'}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Projects Grid or Empty State */}
            {sortedAndFilteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                {sortedAndFilteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="trm-card p-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#02162B] border border-[#0a3d54] flex items-center justify-center mx-auto text-[#70ba65]">
                  <Search className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-serif font-bold text-white">
                    {lang === 'fr'
                      ? 'Aucun projet ne correspond à votre sélection'
                      : 'No projects match your current selection'}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#919ca1] max-w-md mx-auto">
                    {lang === 'fr'
                      ? 'Essayez de modifier votre terme de recherche ou sélectionnez une autre catégorie.'
                      : 'Try adjusting your search keywords or select another stack category.'}
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#70ba65] text-[#001E2B] text-xs font-mono font-bold uppercase tracking-wider hover:bg-[#5da353] transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{lang === 'fr' ? 'Réinitialiser les filtres' : 'Reset all filters'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Technical Commitment Banner */}
            <div className="p-6 rounded-2xl bg-[#001E2B] border border-[#0a3d54] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#70ba65]/10 border border-[#70ba65]/30 flex items-center justify-center text-[#70ba65] shrink-0">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-white">
                    {lang === 'fr' ? 'Développement rigoureux & mesurable' : 'Measurable Engineering Quality'}
                  </h4>
                  <p className="text-xs text-[#919ca1]">
                    {lang === 'fr'
                      ? 'Chaque réalisation respecte les scores Core Web Vitals, le SEO technique et les standards d’accessibilité.'
                      : 'Every project adheres to Google Core Web Vitals, technical SEO, and clean code standards.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#25D366] shrink-0">
                <CheckCircle2 className="w-4 h-4" />
                <span>100% Code Propriétaire</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

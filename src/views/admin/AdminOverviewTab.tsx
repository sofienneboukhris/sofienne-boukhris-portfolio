import React from 'react';
import { useData } from '../../context/DataContext';
import { useRouter } from '../../context/RouterContext';
import {
  Briefcase,
  Calculator,
  FileText,
  FolderKanban,
  Languages,
  Plus,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AdminOverviewTabProps {
  onSelectTab: (tab: string) => void;
  onOpenNewService: () => void;
  onOpenNewProject: () => void;
  onOpenNewBlog: () => void;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({
  onSelectTab,
  onOpenNewService,
  onOpenNewProject,
  onOpenNewBlog
}) => {
  const { services, projects, blogPosts, projectTypes, features, pricingConfig, saveStatus } = useData();
  const { navigate } = useRouter();

  const activeServices = services.filter(s => s.active !== false).length;
  const publishedProjects = projects.filter(p => p.published !== false).length;
  const publishedBlogPosts = blogPosts.filter(b => b.published !== false).length;
  const activeFeatures = features.filter(f => f.active !== false).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome & Sync Status banner */}
      <div className="bg-gradient-to-r from-[#00283A] to-[#02162B] border border-[#0a3d54] rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#70ba65]/10 border border-[#70ba65]/30 text-[#70ba65] text-xs font-mono mb-3">
              <span className="w-2 h-2 rounded-full bg-[#70ba65] animate-pulse" />
              <span>Système synchronisé en temps réel avec le front-end</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Tableau de bord Administrateur
            </h1>
            <p className="text-[#919ca1] text-sm mt-1 max-w-2xl">
              Gérez facilement l'ensemble des services, options du calculateur de devis, articles du blog, projets réalisés et traductions multilingues (FR, EN, AR).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00151F] border border-[#0a3d54] text-xs font-semibold text-[#dedee0] hover:text-white hover:border-[#70ba65] transition-colors"
            >
              <span>Voir le site public</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#70ba65]" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Services Card */}
        <div
          onClick={() => onSelectTab('services')}
          className="bg-[#00283A] border border-[#0a3d54] hover:border-[#70ba65]/60 rounded-xl p-5 cursor-pointer transition-all hover:-translate-y-1 shadow-md group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-[#02162B] flex items-center justify-center text-[#70ba65] group-hover:scale-110 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-[#70ba65] bg-[#70ba65]/10 px-2 py-0.5 rounded-full">
              {activeServices} actifs
            </span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-white">{services.length}</div>
            <div className="text-xs text-[#919ca1] mt-0.5 font-medium">Services & Prestations</div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#919ca1] border-t border-[#0a3d54]/60 pt-2">
            <span>Gérer les prix & livrables</span>
            <ArrowRight className="w-3 h-3 text-[#70ba65] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Calculator Card */}
        <div
          onClick={() => onSelectTab('calculator')}
          className="bg-[#00283A] border border-[#0a3d54] hover:border-[#70ba65]/60 rounded-xl p-5 cursor-pointer transition-all hover:-translate-y-1 shadow-md group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-[#02162B] flex items-center justify-center text-[#70ba65] group-hover:scale-110 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-[#70ba65] bg-[#70ba65]/10 px-2 py-0.5 rounded-full">
              {activeFeatures} add-ons
            </span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-white">{projectTypes.length} types</div>
            <div className="text-xs text-[#919ca1] mt-0.5 font-medium">Options du Calculator</div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#919ca1] border-t border-[#0a3d54]/60 pt-2">
            <span>Base {pricingConfig.pricePerExtraPageEUR}€ / {pricingConfig.pricePerExtraPageTND} DT/p</span>
            <ArrowRight className="w-3 h-3 text-[#70ba65] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Blog Posts Card */}
        <div
          onClick={() => onSelectTab('blog')}
          className="bg-[#00283A] border border-[#0a3d54] hover:border-[#70ba65]/60 rounded-xl p-5 cursor-pointer transition-all hover:-translate-y-1 shadow-md group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-[#02162B] flex items-center justify-center text-[#70ba65] group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-[#70ba65] bg-[#70ba65]/10 px-2 py-0.5 rounded-full">
              {publishedBlogPosts} publiés
            </span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-white">{blogPosts.length}</div>
            <div className="text-xs text-[#919ca1] mt-0.5 font-medium">Articles & Conseils</div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#919ca1] border-t border-[#0a3d54]/60 pt-2">
            <span>Rédiger & publier</span>
            <ArrowRight className="w-3 h-3 text-[#70ba65] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Projects Card */}
        <div
          onClick={() => onSelectTab('projects')}
          className="bg-[#00283A] border border-[#0a3d54] hover:border-[#70ba65]/60 rounded-xl p-5 cursor-pointer transition-all hover:-translate-y-1 shadow-md group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-lg bg-[#02162B] flex items-center justify-center text-[#70ba65] group-hover:scale-110 transition-transform">
              <FolderKanban className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-[#70ba65] bg-[#70ba65]/10 px-2 py-0.5 rounded-full">
              {publishedProjects} en ligne
            </span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-white">{projects.length}</div>
            <div className="text-xs text-[#919ca1] mt-0.5 font-medium">Projets Réalisés</div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#919ca1] border-t border-[#0a3d54]/60 pt-2">
            <span>Portfolio & Métriques</span>
            <ArrowRight className="w-3 h-3 text-[#70ba65] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="bg-[#00283A] border border-[#0a3d54] rounded-xl p-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#70ba65]" />
          <span>Actions Rapides d'Édition</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={onOpenNewService}
            className="flex items-center gap-3 p-3 rounded-lg bg-[#02162B] border border-[#0a3d54] hover:border-[#70ba65] text-left transition-colors group"
          >
            <div className="p-2 rounded bg-[#70ba65]/10 text-[#70ba65] group-hover:bg-[#70ba65] group-hover:text-[#00151F] transition-colors">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Nouveau Service</div>
              <div className="text-[11px] text-[#919ca1]">Ajouter une prestation</div>
            </div>
          </button>

          <button
            onClick={() => onSelectTab('calculator')}
            className="flex items-center gap-3 p-3 rounded-lg bg-[#02162B] border border-[#0a3d54] hover:border-[#70ba65] text-left transition-colors group"
          >
            <div className="p-2 rounded bg-[#70ba65]/10 text-[#70ba65] group-hover:bg-[#70ba65] group-hover:text-[#00151F] transition-colors">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Tarifs Calculator</div>
              <div className="text-[11px] text-[#919ca1]">Ajuster prix base & options</div>
            </div>
          </button>

          <button
            onClick={onOpenNewBlog}
            className="flex items-center gap-3 p-3 rounded-lg bg-[#02162B] border border-[#0a3d54] hover:border-[#70ba65] text-left transition-colors group"
          >
            <div className="p-2 rounded bg-[#70ba65]/10 text-[#70ba65] group-hover:bg-[#70ba65] group-hover:text-[#00151F] transition-colors">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Nouvel Article</div>
              <div className="text-[11px] text-[#919ca1]">Rédiger pour le blog</div>
            </div>
          </button>

          <button
            onClick={onOpenNewProject}
            className="flex items-center gap-3 p-3 rounded-lg bg-[#02162B] border border-[#0a3d54] hover:border-[#70ba65] text-left transition-colors group"
          >
            <div className="p-2 rounded bg-[#70ba65]/10 text-[#70ba65] group-hover:bg-[#70ba65] group-hover:text-[#00151F] transition-colors">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Ajouter un Projet</div>
              <div className="text-[11px] text-[#919ca1]">Mettre à jour le portfolio</div>
            </div>
          </button>
        </div>
      </div>

      {/* Synchronized Front-End Previews list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Services preview */}
        <div className="bg-[#00283A] border border-[#0a3d54] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#70ba65]" />
              <span>Services Récents</span>
            </h4>
            <button
              onClick={() => onSelectTab('services')}
              className="text-xs text-[#70ba65] hover:underline"
            >
              Gérer tout ({services.length})
            </button>
          </div>
          <div className="space-y-2">
            {services.slice(0, 4).map(service => (
              <div
                key={service.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#02162B] border border-[#0a3d54]/60"
              >
                <div className="min-w-0 pr-3">
                  <div className="text-xs font-semibold text-white truncate">
                    {service.title.fr}
                  </div>
                  <div className="text-[11px] text-[#919ca1] truncate">
                    {service.technologies?.slice(0, 3).join(', ')}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-mono font-bold text-[#70ba65]">
                    dès {service.priceStartingEUR || 650} € / {service.priceStartingTND || 1800} DT
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      service.active !== false ? 'bg-[#70ba65]' : 'bg-red-400'
                    }`}
                    title={service.active !== false ? 'Actif' : 'Inactif'}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Projects preview */}
        <div className="bg-[#00283A] border border-[#0a3d54] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-[#70ba65]" />
              <span>Derniers Projets Portfolio</span>
            </h4>
            <button
              onClick={() => onSelectTab('projects')}
              className="text-xs text-[#70ba65] hover:underline"
            >
              Gérer tout ({projects.length})
            </button>
          </div>
          <div className="space-y-2">
            {projects.slice(0, 4).map(project => (
              <div
                key={project.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#02162B] border border-[#0a3d54]/60"
              >
                <div className="min-w-0 pr-3">
                  <div className="text-xs font-semibold text-white truncate">
                    {project.title}
                  </div>
                  <div className="text-[11px] text-[#919ca1] truncate">
                    {project.domain} · {project.categoryLabel.fr}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      project.published !== false
                        ? 'bg-[#70ba65]/10 text-[#70ba65] border border-[#70ba65]/30'
                        : 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                    }`}
                  >
                    {project.published !== false ? 'Publié' : 'Masqué'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

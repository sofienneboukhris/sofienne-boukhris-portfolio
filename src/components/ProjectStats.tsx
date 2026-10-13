import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { 
  PieChart as PieIcon, 
  ShoppingBag, 
  Building2, 
  GraduationCap, 
  Globe, 
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

interface ProjectStatsProps {
  onSelectCategory?: (categoryId: string) => void;
  activeFilter?: string;
}

interface StatCategory {
  id: string;
  name: { fr: string; en: string };
  filterKey: string;
  value: number;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  description: { fr: string; en: string };
}

export const ProjectStats: React.FC<ProjectStatsProps> = ({ onSelectCategory, activeFilter }) => {
  const { projects } = useData();
  const { lang } = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Compute category distributions
  const totalProjects = projects.length;

  const ecommerceCount = projects.filter((p) => p.category === 'ecommerce').length;
  const formationCount = projects.filter((p) => p.category === 'formation').length;
  const corporateCount = projects.filter(
    (p) => p.category === 'institutionnel' || p.category === 'vitrine'
  ).length;
  const portalCount = projects.filter((p) => p.category === 'portal').length;

  const statsData: StatCategory[] = [
    {
      id: 'formation',
      name: {
        fr: 'Formation & E-Learning',
        en: 'Education & Training'
      },
      filterKey: 'formation',
      value: formationCount,
      color: '#f59e0b', // warm amber
      icon: GraduationCap,
      description: {
        fr: 'Centres de formation, catalogues et pré-inscriptions en ligne',
        en: 'Training centers, course catalogs and online registrations'
      }
    },
    {
      id: 'ecommerce',
      name: {
        fr: 'E-Commerce & Boutiques',
        en: 'E-Commerce & Online Stores'
      },
      filterKey: 'ecommerce',
      value: ecommerceCount,
      color: '#70ba65', // brand emerald
      icon: ShoppingBag,
      description: {
        fr: 'WooCommerce & Shopify avec passerelles de paiement sécurisées',
        en: 'WooCommerce & Shopify with multi-currency secure checkout'
      }
    },
    {
      id: 'corporate',
      name: {
        fr: 'Corporate & Applications Web',
        en: 'Corporate & Web Applications'
      },
      filterKey: 'vitrine',
      value: corporateCount,
      color: '#38bdf8', // sky blue
      icon: Building2,
      description: {
        fr: 'Sites institutionnels, dashboards React et solutions SaaS',
        en: 'Institutional websites, React dashboards and SaaS tools'
      }
    },
    {
      id: 'portal',
      name: {
        fr: 'Portails Web & Médias',
        en: 'Web Portals & Media Guides'
      },
      filterKey: 'all',
      value: portalCount,
      color: '#a78bfa', // purple
      icon: Globe,
      description: {
        fr: 'Guides locaux, plateformes d’actualités et annuaires interactifs',
        en: 'Local city guides, news platforms and interactive directories'
      }
    }
  ];

  // Data formatted for Recharts
  const chartData = statsData.map((item) => ({
    name: item.name[lang],
    value: item.value,
    color: item.color,
    id: item.id,
    filterKey: item.filterKey,
    percentage: ((item.value / totalProjects) * 100).toFixed(1)
  }));

  // Custom tooltip for clean dark aesthetic
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#001E2B]/95 backdrop-blur-md border border-[#0a3d54] p-3 rounded-xl shadow-2xl z-50 text-left min-w-[160px]">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: data.color }}
            />
            <span className="text-xs font-semibold text-white">{data.name}</span>
          </div>
          <p className="text-base font-mono font-bold text-[#70ba65]">
            {data.value} {data.value > 1 ? (lang === 'fr' ? 'projets' : 'projects') : (lang === 'fr' ? 'projet' : 'project')}
            <span className="text-xs font-normal text-[#919ca1] ml-2">({data.percentage}%)</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section 
      id="project-statistics-section"
      className="trm-card p-6 sm:p-8 rounded-2xl border border-[#0a3d54] bg-[#00283A]/60 relative overflow-hidden"
    >
      {/* Background ambient decorative glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#70ba65]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#02162B] border border-[#0a3d54] text-[11px] font-mono text-[#70ba65] mb-2 uppercase tracking-wider">
            <PieIcon className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Statistiques des projets' : 'Project Statistics'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            {lang === 'fr' ? (
              <>Répartition des <span className="text-[#70ba65]">types de projets</span></>
            ) : (
              <>Distribution of <span className="text-[#70ba65]">Project Types</span></>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-[#919ca1] mt-1 max-w-2xl">
            {lang === 'fr'
              ? 'Aperçu analytique des solutions digitales conçues et livrées en production par catégorie d’activité.'
              : 'Analytical overview of digital web solutions engineered and deployed across distinct project categories.'}
          </p>
        </div>

        {/* Global summary badge */}
        <div className="flex items-center gap-3 self-start sm:self-center px-3.5 py-2 rounded-xl bg-[#02162B] border border-[#0a3d54]">
          <TrendingUp className="w-4 h-4 text-[#70ba65]" />
          <div className="text-left">
            <div className="text-[10px] font-mono uppercase text-[#919ca1]">
              {lang === 'fr' ? 'Total Réalisé' : 'Total Deployed'}
            </div>
            <div className="text-sm font-mono font-bold text-white">
              {totalProjects} {lang === 'fr' ? 'Projets Actifs' : 'Active Projects'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Visual Content: Donut Chart + Interactive Category Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Donut Chart Container */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative w-full h-64 sm:h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip content={<CustomTooltip />} />
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  animationDuration={900}
                  onMouseEnter={(_, index) => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={(entry: any, index: number) => {
                    const key = entry?.filterKey || entry?.payload?.filterKey || chartData[index]?.filterKey;
                    if (onSelectCategory && key) {
                      onSelectCategory(key);
                    }
                  }}
                  cursor="pointer"
                >
                  {chartData.map((entry, index) => {
                    const isHovered = hoveredIndex === index;
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="#001E2B"
                        strokeWidth={2}
                        opacity={hoveredIndex === null || isHovered ? 1 : 0.6}
                        className="transition-all duration-300"
                      />
                    );
                  })}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Centered Donut Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-serif font-bold text-white tracking-tight">
                {totalProjects}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#919ca1]">
                {lang === 'fr' ? 'Projets' : 'Projects'}
              </span>
              <span className="text-[10px] text-[#70ba65] font-mono flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" />
                100% Livrés
              </span>
            </div>
          </div>

          <p className="text-[11px] text-[#607274] text-center font-mono">
            {lang === 'fr'
              ? '💡 Cliquez sur un segment pour filtrer la grille'
              : '💡 Click any segment to filter the project grid'}
          </p>
        </div>

        {/* Right: Category Distribution Breakdown */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {statsData.map((cat, idx) => {
            const Icon = cat.icon;
            const percentage = ((cat.value / totalProjects) * 100).toFixed(1);
            const isSelected = activeFilter === cat.filterKey;
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory && onSelectCategory(cat.filterKey)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left ${
                  isSelected || isHovered
                    ? 'bg-[#02162B] border-[#70ba65] shadow-md shadow-[#70ba65]/10 -translate-y-0.5'
                    : 'bg-[#02162B]/80 border-[#0a3d54] hover:border-[#0a3d54]/90 hover:bg-[#02162B]'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectCategory && onSelectCategory(cat.filterKey);
                  }
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${cat.color}20`,
                        color: cat.color
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white leading-tight">
                        {cat.name[lang]}
                      </h4>
                      <div className="text-[10px] text-[#919ca1] font-mono">
                        {percentage}% {lang === 'fr' ? 'du total' : 'of portfolio'}
                      </div>
                    </div>
                  </div>

                  <span
                    className="text-xs font-mono font-bold px-2 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: `${cat.color}15`,
                      borderColor: `${cat.color}40`,
                      color: cat.color
                    }}
                  >
                    {cat.value}
                  </span>
                </div>

                <p className="text-[11px] text-[#919ca1] leading-relaxed line-clamp-2">
                  {cat.description[lang]}
                </p>

                {/* Progress bar visual */}
                <div className="w-full bg-[#001E2B] rounded-full h-1.5 mt-3 overflow-hidden border border-[#0a3d54]/40">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: cat.color
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

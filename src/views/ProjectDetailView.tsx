import React from 'react';
import { useRouter } from '../context/RouterContext';
import { ProjectItem } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { SidebarCard } from '../components/SidebarCard';
import { EmbeddedCalculator } from '../components/calculator/EmbeddedCalculator';
import { ProjectTimeline } from '../components/ProjectTimeline';
import { PrintHeader } from '../components/PrintHeader';
import { PrintFooter } from '../components/PrintFooter';
import { ExternalLink, CheckCircle2, ArrowRight, ShieldCheck, Zap, Printer } from 'lucide-react';

interface ProjectDetailViewProps {
  project: ProjectItem;
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ project }) => {
  const { lang, navigate } = useRouter();

  return (
    <>
      <SEOHead
        title={`${project.title} - Étude de cas`}
        description={project.description[lang]}
        canonicalPath={`/realisations/${project.slug}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <SidebarCard />

          <main className="flex-1 w-full space-y-12">
            <PrintHeader 
              documentType="project" 
              projectTitle={project.title} 
              projectDomain={project.domain} 
            />

            <div className="print:hidden">
              <Breadcrumbs
                items={[
                  { label: lang === 'fr' ? 'Réalisations' : 'Projects', to: lang === 'fr' ? '/realisations' : '/en/projects' },
                  { label: project.title }
                ]}
              />
            </div>

            {/* Main Project Hero */}
            <div className="trm-card overflow-hidden">
              <div className="relative aspect-[16/9] bg-[#02162B] overflow-hidden border-b border-[#0a3d54]/60">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00283A] via-transparent to-transparent opacity-90"></div>
                
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-white bg-[#00283A]/90 backdrop-blur-sm px-3 py-1 rounded-full border border-[#0a3d54]">
                    {project.categoryLabel[lang]}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 flex items-center gap-2 print:hidden">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-white bg-[#00283A]/90 backdrop-blur-sm px-3.5 py-2 rounded-full border border-[#0a3d54] hover:border-[#70ba65] transition-colors"
                    id="project-print-hero-btn"
                    title={lang === 'fr' ? 'Imprimer l’étude de cas (PDF)' : 'Print case study (PDF)'}
                  >
                    <Printer className="w-3.5 h-3.5 text-[#70ba65]" />
                    <span>{lang === 'fr' ? 'Imprimer PDF' : 'Print PDF'}</span>
                  </button>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00283A] bg-[#70ba65] px-4 py-2 rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <span>{lang === 'fr' ? 'Visiter le site en direct' : 'Visit Live Website'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="p-6 sm:p-10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2">
                      {project.title}
                    </h1>
                    <p className="text-xs font-mono text-[#70ba65] font-semibold">
                      {project.domain}
                    </p>

                    {/* Explicit URL display for printed paper */}
                    <div className="hidden print:block text-[9pt] font-mono text-gray-700 mt-1">
                      <span className="font-semibold text-black">{lang === 'fr' ? 'Lien en ligne : ' : 'Live link : '}</span>
                      <span className="text-[#15803d] font-bold underline">{project.liveUrl}</span>
                    </div>
                  </div>

                  {/* Print Action Button for desktop/mobile views */}
                  <div className="print:hidden shrink-0">
                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#70ba65] bg-[#02162B] hover:bg-[#00283A] px-3.5 py-2 rounded-full border border-[#0a3d54] hover:border-[#70ba65] transition-colors"
                      id="project-print-header-btn"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>{lang === 'fr' ? 'Imprimer cette étude' : 'Print Case Study'}</span>
                    </button>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#dedee0] leading-relaxed">
                  {project.description[lang]}
                </p>

                {/* Tech Stack Strip */}
                <div className="pt-4 border-t border-[#0a3d54]/60 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono uppercase text-[#70ba65] mr-2">
                    {lang === 'fr' ? 'Technologies :' : 'Technologies :'}
                  </span>
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-xs text-white bg-[#02162B] px-3 py-1 rounded-full border border-[#0a3d54]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Step-by-Step Project Timeline */}
            <ProjectTimeline project={project} />

            {/* Features & Key Highlights */}
            {project.features && (
              <div className="trm-card p-6 sm:p-8 space-y-4">
                <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#70ba65]" />
                  <span>{lang === 'fr' ? 'Fonctionnalités & Réalisations clés' : 'Key Features & Deliverables'}</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {project.features[lang].map((feat, i) => (
                    <div key={i} className="bg-[#02162B] p-4 rounded-xl border border-[#0a3d54] flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#70ba65] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#dedee0] leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>

                {project.verifiedResults && (
                  <div className="mt-4 p-4 rounded-xl bg-[#70ba65]/10 border border-[#70ba65]/30 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#70ba65] shrink-0" />
                    <span className="text-xs text-[#dedee0] font-medium">
                      {project.verifiedResults[lang]}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Call To Action Box */}
            <div className="trm-card p-6 sm:p-8 text-center space-y-4 print:hidden">
              <h3 className="text-xl font-serif font-bold text-white">
                {lang === 'fr' ? 'Vous avez un projet similaire ?' : 'Planning a Similar Project?'}
              </h3>
              <p className="text-xs sm:text-sm text-[#919ca1] max-w-xl mx-auto">
                {lang === 'fr'
                  ? "Bénéficiez d'une analyse personnalisée et d'un chiffrage transparent sans engagement."
                  : "Get a clear technical breakdown and a tailored estimate with zero obligation."}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('project-calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="trm-btn trm-btn-primary"
                >
                  {lang === 'fr' ? 'Estimer un projet similaire' : 'Estimate Similar Project'}
                </button>
              </div>
            </div>

            {/* Live Calculator Section */}
            <div id="project-calculator" className="space-y-6 pt-4 print:hidden">
              <EmbeddedCalculator
                customTitle={{
                  fr: `Estimer un projet similaire à « ${project.title} »`,
                  en: `Estimate a project similar to "${project.title}"`
                }}
                customSubtitle={{
                  fr: 'Simulez les coûts techniques avec une transparence totale en Dinars Tunisiens (TND) ou en Euros (EUR).',
                  en: 'Simulate technical costs with full transparency in Tunisian Dinars (TND) or Euros (EUR).'
                }}
                contextProjectSlug={project.slug}
              />
            </div>

            {/* Internal Links mesh */}
            <div className="p-6 rounded-2xl bg-[#00283A] border border-[#0a3d54] flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-serif font-bold text-white">
                  {lang === 'fr' ? 'Explorer d’autres réalisations & services' : 'Explore more case studies & services'}
                </h4>
                <p className="text-xs text-[#919ca1]">
                  {lang === 'fr' 
                    ? 'Découvrez toutes nos références clients ou consultez les détails tarifaires complets.'
                    : 'Check our full client portfolio or review detailed service packages.'}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate(lang === 'fr' ? '/realisations' : '/en/projects')}
                  className="trm-btn trm-btn-border text-xs py-2 px-3"
                >
                  {lang === 'fr' ? 'Toutes les réalisations' : 'All Projects'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(lang === 'fr' ? '/services' : '/en/services')}
                  className="trm-btn trm-btn-border text-xs py-2 px-3"
                >
                  {lang === 'fr' ? 'Nos services' : 'Services'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(lang === 'fr' ? '/tarifs' : '/en/pricing')}
                  className="trm-btn trm-btn-border text-xs py-2 px-3"
                >
                  {lang === 'fr' ? 'Consulter les tarifs' : 'View Pricing'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(lang === 'fr' ? '/contact' : '/en/contact')}
                  className="trm-btn trm-btn-primary text-xs py-2 px-3"
                >
                  {lang === 'fr' ? 'Contact direct' : 'Contact Me'}
                </button>
              </div>
            </div>

            {/* Official Print Footer */}
            <PrintFooter />

          </main>
        </div>
      </div>
    </>
  );
};

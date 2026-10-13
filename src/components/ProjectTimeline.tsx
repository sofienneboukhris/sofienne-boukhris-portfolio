import React from 'react';
import { ProjectItem } from '../types';
import { useRouter } from '../context/RouterContext';
import { 
  Compass, 
  Palette, 
  Code2, 
  Rocket, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Clock,
  Layers
} from 'lucide-react';

interface ProjectTimelineProps {
  project: ProjectItem;
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ project }) => {
  const { lang } = useRouter();

  // 4 Core Project Stages
  const stages = [
    {
      id: 'discovery',
      number: '01',
      icon: Compass,
      color: '#38bdf8', // sky blue
      badge: {
        fr: 'Phase 1 • Cadrage & Stratégie',
        en: 'Phase 1 • Discovery & Scope'
      },
      title: {
        fr: 'Discovery, Audit & Expression des Besoins',
        en: 'Strategic Discovery & Technical Scoping'
      },
      summary: project.context[lang],
      pointsTitle: {
        fr: 'Objectifs validés lors du cadrage :',
        en: 'Validated Phase Objectives :'
      },
      points: project.objectives ? project.objectives[lang] : [
        lang === 'fr' ? 'Analyse concurrentielle et benchmarks sectoriels' : 'Competitive landscape and functional benchmarking',
        lang === 'fr' ? 'Arborescence des contenus et parcours utilisateurs cibles' : 'Information architecture and user journey mapping',
        lang === 'fr' ? 'Validation du cahier des charges technique et des délais' : 'Technical requirements specification and timeline signoff'
      ],
      status: {
        fr: 'Cadrage Validé',
        en: 'Scope Approved'
      }
    },
    {
      id: 'design',
      number: '02',
      icon: Palette,
      color: '#a78bfa', // soft purple
      badge: {
        fr: 'Phase 2 • Ergonomie & Direction Visuelle',
        en: 'Phase 2 • UX/UI & Prototyping'
      },
      title: {
        fr: 'Conception Graphique, UI & Expérience Utilisateur (UX)',
        en: 'UI/UX Design, Typography & Interaction Flow'
      },
      summary: lang === 'fr'
        ? `Élaboration d'une identité visuelle sur mesure pour ${project.title}. Conception de maquettes responsives adaptées aux smartphones, tablettes et écrans larges, garantissant un parcours d'achat ou de contact limpide.`
        : `Crafting a bespoke visual layout for ${project.title}. Designed responsive layouts optimized for mobile screens, tablets, and desktops, ensuring zero friction across customer journeys.`,
      pointsTitle: {
        fr: 'Livrables de conception :',
        en: 'Design Deliverables :'
      },
      points: [
        lang === 'fr' ? 'Système de design cohérent (typographies, palette de couleurs, contrastes WCAG)' : 'Cohesive design tokens (accessible typography pairing, WCAG color contrast)',
        lang === 'fr' ? 'Conception mobile-first pour une navigation tactile sans effort' : 'Mobile-first interfaces built for natural thumb-driven interaction',
        lang === 'fr' ? 'Optimisation des formulaires et appels à l’action (CTA)' : 'High-conversion call-to-action placement and frictionless form fields',
        lang === 'fr' ? 'Validation des prototypes interactifs avec le client' : 'Interactive prototype review and stakeholder signoff'
      ],
      status: {
        fr: 'Design Validé',
        en: 'Design Approved'
      }
    },
    {
      id: 'development',
      number: '03',
      icon: Code2,
      color: '#70ba65', // emerald green
      badge: {
        fr: 'Phase 3 • Développement & Intégration',
        en: 'Phase 3 • Full-Stack Development'
      },
      title: {
        fr: 'Développement Full-Stack & Intégration Technique',
        en: 'Full-Stack Engineering & Modular Architecture'
      },
      summary: project.role 
        ? `${project.role[lang]}. Développement rigoureux selon les meilleures pratiques du web moderne.`
        : (lang === 'fr' 
          ? `Développement modulaire du projet ${project.title} avec stack technique optimisée.` 
          : `Modular code implementation for ${project.title} built on high-performance web standards.`),
      pointsTitle: {
        fr: 'Solutions et briques techniques implémentées :',
        en: 'Key Engineering Solutions Implemented :'
      },
      points: project.solution ? project.solution[lang] : [
        lang === 'fr' ? 'Développement de composants modulaires et réutilisables' : 'Bespoke modular component architecture',
        lang === 'fr' ? 'Intégration d’APIs et sécurisation des échanges de données' : 'RESTful API integration and secure communication pipelines',
        lang === 'fr' ? 'Base de données optimisée et temps de réponse ultra-rapides' : 'Clean database schema and query tuning'
      ],
      technologies: project.technologies,
      status: {
        fr: 'Code Déployé',
        en: 'Code Implemented'
      }
    },
    {
      id: 'deployment',
      number: '04',
      icon: Rocket,
      color: '#25D366', // active green
      badge: {
        fr: 'Phase 4 • Recette & Mise en Ligne',
        en: 'Phase 4 • Testing & Production Launch'
      },
      title: {
        fr: 'Recette QA, Optimisation de Vitesse & Déploiement en Production',
        en: 'Quality Assurance, Speed Tuning & Production Deployment'
      },
      summary: project.verifiedResults 
        ? project.verifiedResults[lang]
        : (lang === 'fr'
          ? "Site testé et validé sur tous les navigateurs, optimisé pour Google Core Web Vitals et mis en ligne avec certificat SSL sécurisé."
          : "Full cross-browser QA, Core Web Vitals performance tuning, and zero-downtime production deployment with SSL."),
      pointsTitle: {
        fr: 'Contrôles qualité avant bascule finale :',
        en: 'Launch Checklist & Quality Signoff :'
      },
      points: [
        lang === 'fr' ? 'Audit de performance Google Lighthouse (Score > 90/100)' : 'Google Lighthouse speed diagnostics (Score > 90/100)',
        lang === 'fr' ? 'Vérification SEO technique (balises meta, OpenGraph, sitemap XML, robots.txt)' : 'Technical SEO audit (meta tags, social cards, XML sitemaps, robots.txt)',
        lang === 'fr' ? 'Configuration DNS, certificat SSL HTTPS et mise en cache CDN' : 'Production DNS routing, TLS/SSL encryption, and CDN asset caching',
        lang === 'fr' ? 'Formation du client à l’administration autonome du site' : 'Client handoff and autonomous management walkthrough'
      ],
      isFinal: true,
      status: {
        fr: 'En Ligne & Vérifié',
        en: 'Live & Verified'
      }
    }
  ];

  return (
    <section 
      id="project-timeline-section"
      className="trm-card p-6 sm:p-10 rounded-2xl border border-[#0a3d54] bg-[#00283A]/50 relative overflow-hidden"
    >
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#70ba65]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#0a3d54]/60">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#02162B] border border-[#0a3d54] text-[11px] font-mono text-[#70ba65] mb-2 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Chronologie du Projet' : 'Project Timeline'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            {lang === 'fr' ? (
              <>Étapes & <span className="text-[#70ba65]">Processus de Réalisation</span></>
            ) : (
              <>Step-by-Step <span className="text-[#70ba65]">Execution Timeline</span></>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-[#919ca1] mt-1.5 max-w-2xl">
            {lang === 'fr'
              ? `Visualisation chronologique des 4 phases méthodologiques ayant permis de mener à bien le projet ${project.title}.`
              : `Chronological walkthrough of the 4 key delivery stages executed to bring ${project.title} to production.`}
          </p>
        </div>

        {/* Live Site Link Pill */}
        <div className="shrink-0 self-start sm:self-center print:hidden">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#001E2B] bg-[#70ba65] px-4 py-2 rounded-full shadow-lg hover:bg-[#5da353] hover:text-white transition-all duration-200"
          >
            <span>{lang === 'fr' ? 'Voir le résultat final' : 'View Live Outcome'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Vertical Timeline Structure */}
      <div className="relative">
        {/* Continuous Connecting Line */}
        <div 
          className="absolute left-4 sm:left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#38bdf8] via-[#70ba65] to-[#25D366] opacity-60"
          aria-hidden="true"
        />

        <div className="space-y-8 sm:space-y-12">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            const isFinal = stage.isFinal;

            return (
              <div 
                key={stage.id} 
                className="relative flex items-start gap-4 sm:gap-8 group stage-item"
              >
                {/* Node Icon Circle */}
                <div className="relative z-10 flex items-center justify-center shrink-0">
                  <div
                    className="w-8 h-8 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 shadow-lg"
                    style={{
                      backgroundColor: '#02162B',
                      borderColor: stage.color,
                      color: stage.color,
                      boxShadow: `0 0 20px ${stage.color}25`
                    }}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  {/* Number Tag in node */}
                  <span 
                    className="absolute -bottom-2 -right-1 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-[#001E2B] border border-[#0a3d54] text-white"
                  >
                    {stage.number}
                  </span>
                </div>

                {/* Timeline Content Card */}
                <div className="flex-1 bg-[#02162B]/85 border border-[#0a3d54] rounded-2xl p-5 sm:p-7 hover:border-[#70ba65]/50 transition-all duration-300 shadow-md">
                  {/* Card Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border"
                        style={{
                          backgroundColor: `${stage.color}15`,
                          borderColor: `${stage.color}40`,
                          color: stage.color
                        }}
                      >
                        {stage.badge[lang]}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#25D366] bg-[#001E2B] px-2.5 py-1 rounded-full border border-[#0a3d54] self-start sm:self-auto">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{stage.status[lang]}</span>
                    </div>
                  </div>

                  {/* Stage Title */}
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-2">
                    {stage.title[lang]}
                  </h3>

                  {/* Stage Summary */}
                  <p className="text-xs sm:text-sm text-[#a8b4b9] leading-relaxed mb-4">
                    {stage.summary}
                  </p>

                  {/* Tech stack badges if development stage */}
                  {stage.technologies && stage.technologies.length > 0 && (
                    <div className="mb-4 pt-2 pb-2 border-y border-[#0a3d54]/40">
                      <div className="text-[11px] font-mono uppercase text-[#70ba65] mb-2 flex items-center gap-1.5">
                        <Layers className="w-3 h-3" />
                        <span>{lang === 'fr' ? 'Technologies mobilisées :' : 'Technologies Mobilized :'}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {stage.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono text-white bg-[#001E2B] px-2.5 py-0.5 rounded-full border border-[#0a3d54]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Deliverables / Checkpoints */}
                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-[#70ba65]" />
                      <span>{stage.pointsTitle[lang]}</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {stage.points.map((pt, i) => (
                        <div 
                          key={i} 
                          className="flex items-start gap-2 text-xs text-[#dedee0] bg-[#001E2B]/80 p-2.5 rounded-lg border border-[#0a3d54]/60"
                        >
                          <span 
                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" 
                            style={{ backgroundColor: stage.color }}
                          />
                          <span className="leading-snug">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verified outcome banner on the final stage */}
                  {isFinal && project.verifiedResults && (
                    <div className="mt-5 p-3.5 rounded-xl bg-[#70ba65]/10 border border-[#70ba65]/30 flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-[#70ba65] shrink-0" />
                        <span className="text-xs text-[#dedee0] font-medium">
                          {project.verifiedResults[lang]}
                        </span>
                      </div>

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono text-[#70ba65] hover:underline flex items-center gap-1 shrink-0 ml-auto"
                      >
                        <span>{project.domain}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

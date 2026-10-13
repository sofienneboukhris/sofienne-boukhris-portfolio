import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { FAQS } from '../data/faq';
import { SidebarCard } from '../components/SidebarCard';
import { ServiceCard } from '../components/ServiceCard';
import { ProjectCard } from '../components/ProjectCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { EmbeddedCalculator } from '../components/calculator/EmbeddedCalculator';
import { Testimonials } from '../components/Testimonials';
import { SEOHead } from '../components/SEOHead';
import { StatsBanner } from '../components/StatsBanner';
import { PrintHeader } from '../components/PrintHeader';
import { PrintFooter } from '../components/PrintFooter';
import { 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  Sparkles, 
  Shield, 
  Zap, 
  Globe2, 
  Terminal, 
  Layers, 
  ExternalLink 
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { lang, navigate } = useRouter();
  const { services, projects, translations } = useData();
  const t = (translations as any)[lang] || (translations as any).fr;

  const activeServices = services.filter((s) => s.active !== false);
  const activeProjects = projects.filter((p) => p.published !== false);

  return (
    <>
      <SEOHead
        title={lang === 'fr' ? 'Développeur Web Freelance en Tunisie' : 'Freelance Full-Stack Web Developer in Tunisia'}
        description={lang === 'fr'
          ? "Sofienne Boukhris, Développeur Web Freelance Full-Stack à Sousse, Tunisie. Création de sites web sur mesure, vitrine, e-commerce, WordPress, Shopify, Laravel, React et SEO technique."
          : "Sofienne Boukhris, Freelance Full-Stack Web Developer based in Sousse, Tunisia. Bespoke websites, e-commerce, WordPress, Shopify, Laravel, React, and technical SEO."
        }
        schemaType="website"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Left / Desktop Sticky Sidebar Card (Trueman Portfolio Identity) */}
          <SidebarCard />

          {/* Right Main Content Stream */}
          <main className="flex-1 w-full space-y-16">
            <PrintHeader documentType="general" />
            
            {/* HERO SECTION */}
            <section className="trm-card p-6 sm:p-10 relative overflow-hidden" aria-label="Introduction">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#70ba65]/5 rounded-full blur-3xl pointer-events-none"></div>
              
              {/* Tag / Category Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#02162B] border border-[#0a3d54] text-[11px] font-mono text-[#70ba65] mb-6 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.hero.tag}</span>
              </div>

              {/* Main Heading H1 */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] mb-4">
                {lang === 'fr' ? (
                  <>
                    Développeur Web Freelance <br className="hidden sm:block" />
                    <span className="text-[#70ba65]">Full-Stack & Intégrateur</span> à Sousse
                  </>
                ) : (
                  <>
                    Freelance Full-Stack <br className="hidden sm:block" />
                    <span className="text-[#70ba65]">Web Developer</span> in Tunisia
                  </>
                )}
              </h1>

              {/* Tagline / Subtitle */}
              <p className="text-sm sm:text-base text-[#a8b4b9] max-w-2xl leading-relaxed mb-8">
                {t.hero.tagline}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate(lang === 'fr' ? '/contact' : '/en/contact')}
                  className="trm-btn trm-btn-primary shadow-xl"
                  id="hero-cta-quote-btn"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </button>

                <button
                  onClick={() => navigate(lang === 'fr' ? '/calculateur' : '/en/calculator')}
                  className="trm-btn trm-btn-border"
                  id="hero-cta-calc-btn"
                >
                  {lang === 'fr' ? 'Simulateur de Devis' : 'Quote Calculator'}
                </button>

                <button
                  onClick={() => navigate(lang === 'fr' ? '/realisations' : '/en/projects')}
                  className="trm-btn trm-btn-border"
                  id="hero-cta-projects-btn"
                >
                  {t.hero.ctaSecondary}
                </button>
              </div>
            </section>

            {/* KEY METRICS & STATS BANNER (Animated On Scroll) */}
            <StatsBanner showHeading={true} />

            {/* SECTION 01: QUI SUIS-JE / MY STORY */}
            <section id="my-story" className="space-y-6" aria-labelledby="heading-story">
              <div className="trm-section-divider">
                <span className="text-xs font-mono font-bold text-[#70ba65] bg-[#02162B] px-3 py-1 rounded-full border border-[#0a3d54]">
                  {t.sections.storyNumber}
                </span>
                <h2 id="heading-story" className="text-2xl font-serif font-bold text-white tracking-wide">
                  {t.sections.storyTitle}
                </h2>
                <div className="trm-section-divider-line"></div>
              </div>

              <div className="trm-card p-6 sm:p-8 space-y-5">
                <blockquote className="border-l-2 border-[#70ba65] pl-4 italic text-base sm:text-lg text-[#dedee0] font-serif leading-relaxed">
                  "{t.story?.quote || ''}"
                </blockquote>
                <p className="text-xs sm:text-sm text-[#a8b4b9] leading-relaxed">
                  {t.story?.p1}
                </p>
                <p className="text-xs sm:text-sm text-[#a8b4b9] leading-relaxed">
                  {t.story?.p2}
                </p>
                <p className="text-xs sm:text-sm text-[#a8b4b9] leading-relaxed">
                  {t.story?.p3}
                </p>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={() => navigate(lang === 'fr' ? '/a-propos' : '/en/about')}
                    className="text-xs font-bold uppercase tracking-wider text-[#70ba65] hover:underline flex items-center gap-1.5"
                  >
                    <span>{lang === 'fr' ? 'En savoir plus sur mon parcours' : 'Learn more about my background'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </section>

            {/* SECTION 02: SERVICES PRINCIPAUX / WHAT I DO */}
            <section id="services" className="space-y-6" aria-labelledby="heading-services">
              <div className="trm-section-divider">
                <span className="text-xs font-mono font-bold text-[#70ba65] bg-[#02162B] px-3 py-1 rounded-full border border-[#0a3d54]">
                  {t.sections.servicesNumber}
                </span>
                <h2 id="heading-services" className="text-2xl font-serif font-bold text-white tracking-wide">
                  {t.sections.servicesTitle}
                </h2>
                <div className="trm-section-divider-line"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeServices.slice(0, 6).map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => navigate(lang === 'fr' ? '/services' : '/en/services')}
                  className="trm-btn trm-btn-border text-xs"
                >
                  {lang === 'fr' ? 'Consulter l’ensemble des prestations' : 'View all services'}
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </button>
                <button
                  onClick={() => navigate(lang === 'fr' ? '/tarifs' : '/en/pricing')}
                  className="trm-btn trm-btn-border text-xs"
                >
                  {lang === 'fr' ? 'Voir la grille des tarifs' : 'View pricing grid'}
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </button>
                <button
                  onClick={() => navigate(lang === 'fr' ? '/calculateur' : '/en/calculator')}
                  className="trm-btn trm-btn-primary text-xs"
                >
                  {lang === 'fr' ? 'Calculer mon devis en direct' : 'Calculate live quote'}
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </button>
              </div>
            </section>

            {/* SECTION 03: TECH STACK & TOOLS */}
            <section className="space-y-6" aria-labelledby="heading-tech">
              <div className="trm-section-divider">
                <span className="text-xs font-mono font-bold text-[#70ba65] bg-[#02162B] px-3 py-1 rounded-full border border-[#0a3d54]">
                  {t.sections.techNumber}
                </span>
                <h2 id="heading-tech" className="text-2xl font-serif font-bold text-white tracking-wide">
                  {t.sections.techTitle}
                </h2>
                <div className="trm-section-divider-line"></div>
              </div>

              <div className="trm-card p-6 sm:p-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {[
                    { name: 'React & TypeScript', type: 'Frontend Moderne', icon: Code2 },
                    { name: 'Laravel & PHP 8+', type: 'Backend Robuste', icon: Terminal },
                    { name: 'WordPress', type: 'CMS Sur Mesure', icon: Layers },
                    { name: 'WooCommerce', type: 'E-commerce Ouvert', icon: Globe2 },
                    { name: 'Shopify & Liquid', type: 'E-commerce Clé en main', icon: Globe2 },
                    { name: 'NestJS & Node.js', type: 'APIs & Microservices', icon: Terminal },
                    { name: 'Tailwind CSS', type: 'Intégration Fluide', icon: Layers },
                    { name: 'SEO & Web Vitals', type: 'Performance Google', icon: Zap }
                  ].map((tech) => (
                    <div
                      key={tech.name}
                      className="bg-[#02162B] p-4 rounded-xl border border-[#0a3d54]/60 hover:border-[#70ba65]/40 transition-colors text-center sm:text-left"
                    >
                      <tech.icon className="w-5 h-5 text-[#70ba65] mb-2 mx-auto sm:mx-0" />
                      <div className="text-xs font-bold text-white">{tech.name}</div>
                      <div className="text-[10px] text-[#919ca1] mt-0.5">{tech.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 04: REALISATIONS RECENTES / PORTFOLIO */}
            <section id="realisations" className="space-y-6" aria-labelledby="heading-projects">
              <div className="trm-section-divider">
                <span className="text-xs font-mono font-bold text-[#70ba65] bg-[#02162B] px-3 py-1 rounded-full border border-[#0a3d54]">
                  {t.sections.portfolioNumber}
                </span>
                <h2 id="heading-projects" className="text-2xl font-serif font-bold text-white tracking-wide">
                  {t.sections.portfolioTitle}
                </h2>
                <div className="trm-section-divider-line"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeProjects.slice(0, 4).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => navigate(lang === 'fr' ? '/realisations' : '/en/projects')}
                  className="trm-btn trm-btn-border text-xs"
                >
                  {lang === 'fr' ? 'Voir toutes mes réalisations' : 'View all projects'}
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </button>
                <button
                  onClick={() => navigate(lang === 'fr' ? '/tarifs' : '/en/pricing')}
                  className="trm-btn trm-btn-border text-xs"
                >
                  {lang === 'fr' ? 'Consulter les tarifs' : 'View pricing'}
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </button>
              </div>
            </section>

            {/* SECTION 05: TÉMOIGNAGES & AVIS CLIENTS / SOCIAL PROOF */}
            <section id="testimonials" className="space-y-6" aria-labelledby="heading-testimonials">
              <div className="trm-section-divider">
                <span className="text-xs font-mono font-bold text-[#70ba65] bg-[#02162B] px-3 py-1 rounded-full border border-[#0a3d54]">
                  {t.sections.testimonialsNumber}
                </span>
                <h2 id="heading-testimonials" className="text-2xl font-serif font-bold text-white tracking-wide">
                  {t.sections.testimonialsTitle}
                </h2>
                <div className="trm-section-divider-line"></div>
              </div>

              <Testimonials initialMode="slider" />
            </section>

            {/* SECTION 06: POURQUOI TRAVAILLER AVEC MOI / WHY WORK WITH ME */}
            <section className="space-y-6" aria-labelledby="heading-why">
              <div className="trm-section-divider">
                <span className="text-xs font-mono font-bold text-[#70ba65] bg-[#02162B] px-3 py-1 rounded-full border border-[#0a3d54]">
                  {t.sections.whyNumber}
                </span>
                <h2 id="heading-why" className="text-2xl font-serif font-bold text-white tracking-wide">
                  {t.sections.whyTitle}
                </h2>
                <div className="trm-section-divider-line"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {t.whyWorkWithMe.map((item, idx) => (
                  <div key={idx} className="trm-card p-6 space-y-3">
                    <div className="w-9 h-9 rounded-lg bg-[#02162B] border border-[#70ba65]/30 text-[#70ba65] flex items-center justify-center font-mono font-bold text-xs">
                      0{idx + 1}
                    </div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#919ca1] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 06: PROCESSUS DE TRAVAIL */}
            <section className="space-y-6" aria-labelledby="heading-process">
              <div className="trm-section-divider">
                <span className="text-xs font-mono font-bold text-[#70ba65] bg-[#02162B] px-3 py-1 rounded-full border border-[#0a3d54]">
                  {t.sections.processNumber}
                </span>
                <h2 id="heading-process" className="text-2xl font-serif font-bold text-white tracking-wide">
                  {t.sections.processTitle}
                </h2>
                <div className="trm-section-divider-line"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {t.process.map((step) => (
                  <div key={step.step} className="trm-card p-5 relative group hover:border-[#70ba65]/50 transition-colors">
                    <span className="text-2xl font-serif font-bold text-[#70ba65]/40 group-hover:text-[#70ba65] transition-colors">
                      {step.step}
                    </span>
                    <h3 className="text-sm font-serif font-bold text-white mt-2 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#919ca1] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 07: FAQ COURTE */}
            <section className="space-y-6" aria-labelledby="heading-faq">
              <div className="trm-section-divider">
                <span className="text-xs font-mono font-bold text-[#70ba65] bg-[#02162B] px-3 py-1 rounded-full border border-[#0a3d54]">
                  {t.sections.faqNumber}
                </span>
                <h2 id="heading-faq" className="text-2xl font-serif font-bold text-white tracking-wide">
                  {t.sections.faqTitle}
                </h2>
                <div className="trm-section-divider-line"></div>
              </div>

              <FAQAccordion items={FAQS.slice(0, 5)} />

              <div className="text-center pt-2">
                <button
                  onClick={() => navigate(lang === 'fr' ? '/faq' : '/en/faq')}
                  className="text-xs font-bold uppercase tracking-wider text-[#70ba65] hover:underline"
                >
                  {lang === 'fr' ? 'Consulter toutes les questions fréquentes →' : 'View all frequently asked questions →'}
                </button>
              </div>
            </section>

            {/* SECTION 08: SIMULATEUR DE BUDGET & ESTIMATION EN DIRECT */}
            <section id="calculateur-section" className="space-y-6 print:hidden" aria-labelledby="heading-calculator">
              <div className="trm-section-divider">
                <span className="text-xs font-mono font-bold text-[#70ba65] bg-[#02162B] px-3 py-1 rounded-full border border-[#0a3d54]">
                  08
                </span>
                <h2 id="heading-calculator" className="text-2xl font-serif font-bold text-white tracking-wide">
                  {lang === 'fr' ? 'Simulateur de Budget Projet' : 'Interactive Project Cost Calculator'}
                </h2>
                <div className="trm-section-divider-line"></div>
              </div>

              <EmbeddedCalculator
                customTitle={{
                  fr: 'Calculez en direct le coût de votre futur site web',
                  en: 'Calculate your future website budget in real time'
                }}
                customSubtitle={{
                  fr: 'Sélectionnez votre type de projet et vos fonctionnalités. Devis transparent en DT (Tunisie) ou en € (International).',
                  en: 'Choose your project type and preferred modules. Transparent pricing in TND (Tunisia) or EUR (International).'
                }}
              />
            </section>

            {/* Official Print Footer */}
            <PrintFooter />

          </main>
        </div>
      </div>
    </>
  );
};

import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { SidebarCard } from '../components/SidebarCard';
import { EmbeddedCalculator } from '../components/calculator/EmbeddedCalculator';
import { StatsBanner } from '../components/StatsBanner';
import { PrintHeader } from '../components/PrintHeader';
import { PrintFooter } from '../components/PrintFooter';
import { useData } from '../context/DataContext';
import { Award, Code2, MapPin, Terminal, CheckCircle2, HeartHandshake, ShieldCheck, Printer } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { lang, navigate } = useRouter();
  const { translations } = useData();
  const t = translations[lang];

  return (
    <>
      <SEOHead
        title={lang === 'fr' ? 'À propos de Sofienne Boukhris' : 'About Sofienne Boukhris'}
        description={lang === 'fr'
          ? "Découvrez le profil, l’expérience et les méthodes de travail de Sofienne Boukhris, développeur web freelance full-stack basé à Sousse, Tunisie."
          : "Learn about the experience, technical mindset, and background of Sofienne Boukhris, freelance full-stack web developer in Tunisia."
        }
        canonicalPath={lang === 'fr' ? '/a-propos' : '/en/about'}
        schemaType="about"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <SidebarCard />

          <main className="flex-1 w-full space-y-12">
            <PrintHeader documentType="resume" />

            <div className="print:hidden">
              <Breadcrumbs
                items={[
                  { label: lang === 'fr' ? 'À propos' : 'About' }
                ]}
              />
            </div>

            {/* Header */}
            <div className="trm-card p-6 sm:p-10 relative overflow-hidden space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#02162B] border border-[#0a3d54] text-[11px] font-mono text-[#70ba65] uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>{lang === 'fr' ? 'Profil & Parcours' : 'Background & Bio'}</span>
                </div>

                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#70ba65] bg-[#02162B] hover:bg-[#00283A] px-3.5 py-1.5 rounded-full border border-[#0a3d54] hover:border-[#70ba65] transition-colors print:hidden self-start sm:self-auto"
                  id="about-print-btn"
                  title={lang === 'fr' ? 'Imprimer le CV & Profil (PDF)' : 'Print Resume & Bio (PDF)'}
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{lang === 'fr' ? 'Imprimer CV / Profil' : 'Print Resume / Bio'}</span>
                </button>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                {lang === 'fr' ? (
                  <>Développeur Web Freelance <br /><span className="text-[#70ba65]">Rigoureux & Passionné</span></>
                ) : (
                  <>Passionate & Disciplined <br /><span className="text-[#70ba65]">Full-Stack Web Developer</span></>
                )}
              </h1>

              <p className="text-sm sm:text-base text-[#dedee0] leading-relaxed">
                {lang === 'fr'
                  ? "Bonjour, je suis Sofienne Boukhris. Développeur web full-stack et intégrateur avec plus de 5 ans d'expérience dans la conception et l'optimisation de sites internet et d'applications sur mesure."
                  : "Hello, I am Sofienne Boukhris. A full-stack web developer and UI integrator with over 5 years of experience architecting and delivering high-performance websites and bespoke web applications."}
              </p>
            </div>

            {/* In-depth background narrative */}
            <div className="trm-card p-6 sm:p-8 space-y-5">
              <h2 className="text-xl font-serif font-bold text-white">
                {lang === 'fr' ? 'Mon parcours en quelques mots' : 'My Background in Brief'}
              </h2>

              <p className="text-xs sm:text-sm text-[#a8b4b9] leading-relaxed">
                {lang === 'fr'
                  ? "Après avoir exercé plusieurs années au sein d'agences web, où j'ai géré des dizaines de projets variés (vitrines corporate, boutiques WooCommerce et Shopify, plateformes WordPress sur mesure, applications de gestion métier), j'ai choisi d'exercer en tant que freelance indépendant pour apporter une valeur directe à mes clients."
                  : "Following several years in fast-paced digital web agencies managing multifaceted projects (corporate showcases, high-converting WooCommerce and Shopify storefronts, bespoke WordPress platforms, and business applications), I transitioned to independent freelancing to provide uncompromised, direct engineering access to my clients."}
              </p>

              <p className="text-xs sm:text-sm text-[#a8b4b9] leading-relaxed">
                {lang === 'fr'
                  ? "Cette expérience m'a appris une vérité essentielle : la technique n'a de valeur que si elle répond concrètement aux objectifs de l'entreprise. Un beau site qui met 8 secondes à charger ou dont le code est impossible à modifier n'apporte rien. C'est pourquoi je mets un point d'honneur à livrer du code propre, léger, sécurisé et documenté."
                  : "Agency life taught me a fundamental lesson: technology only creates value when it reliably achieves business outcomes. A website that takes 8 seconds to load or relies on fragile, unmaintainable code fails its purpose. That is why I prioritize clean, lightweight, secure, and well-structured code."}
              </p>
            </div>

            {/* Proven Key Metrics Banner */}
            <StatsBanner showHeading={true} />

            {/* Core Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: lang === 'fr' ? 'Communication Directe' : 'Direct Communication',
                  desc: lang === 'fr'
                    ? "Aucun intermédiaire. Vous échangez en direct avec le développeur qui programme votre solution."
                    : "Zero intermediaries. You communicate directly with the engineer coding your platform.",
                  icon: HeartHandshake
                },
                {
                  title: lang === 'fr' ? 'Code & Propriété' : 'Full Code Ownership',
                  desc: lang === 'fr'
                    ? "Vous restez propriétaire à 100% de votre code source, de vos accès d'hébergement et de vos données."
                    : "You retain 100% ownership of your source code, deployment credentials, and client data.",
                  icon: ShieldCheck
                },
                {
                  title: lang === 'fr' ? 'Performance Google' : 'Performance Standards',
                  desc: lang === 'fr'
                    ? "Optimisation rigoureuse des Core Web Vitals, temps de chargement réduits et respect des normes SEO."
                    : "Rigorous Core Web Vitals optimization, rapid load speeds, and strict semantic SEO hygiene.",
                  icon: Terminal
                }
              ].map((val, i) => (
                <div key={i} className="trm-card p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#02162B] border border-[#0a3d54] text-[#70ba65] flex items-center justify-center">
                    <val.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-white">{val.title}</h3>
                  <p className="text-xs text-[#919ca1] leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>

            {/* Location & Remote Availability */}
            <div className="trm-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#70ba65]" />
                <h2 className="text-xl font-serif font-bold text-white">
                  {lang === 'fr' ? 'Basé à Sousse, Tunisie · Actif à l’international' : 'Based in Sousse, Tunisia · Working Globally'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#a8b4b9] leading-relaxed">
                {lang === 'fr'
                  ? "Installé à Sousse sur la côte tunisienne, je travaille avec souplesse sur les fuseaux horaires européens (CET / UTC+1). Je collabore aussi bien avec des entrepreneurs locaux en Tunisie qu'avec des clients réguliers en France, en Belgique, en Suisse, au Canada et ailleurs dans le monde."
                  : "Located in Sousse on the Tunisian coast, I operate seamlessly within European time zones (CET / UTC+1). I collaborate with local Tunisian enterprises as well as regular international partners across France, Belgium, Switzerland, Canada, and worldwide."}
              </p>
            </div>

            {/* Calculator Section */}
            <div id="about-calculator" className="space-y-6 pt-4 print:hidden">
              <EmbeddedCalculator
                customTitle={{
                  fr: 'Simuler votre futur projet avec Sofienne',
                  en: 'Simulate your web project with Sofienne'
                }}
                customSubtitle={{
                  fr: 'Découvrez instantanément un ordre de prix précis en Dinars Tunisiens (TND) ou en Euros (EUR).',
                  en: 'Instantly calculate an accurate price in Tunisian Dinars (TND) or Euros (EUR).'
                }}
              />
            </div>

            {/* Navigation & Internal Links */}
            <div className="p-6 rounded-2xl bg-[#00283A] border border-[#0a3d54] flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-serif font-bold text-white">
                  {lang === 'fr' ? 'Consulter mes services et réalisations' : 'Browse my services and projects'}
                </h4>
                <p className="text-xs text-[#919ca1]">
                  {lang === 'fr' 
                    ? 'Découvrez en détail mes expertises, mes tarifs clairs ou mes travaux récents.'
                    : 'Explore technical expertise, transparent pricing, or recent client projects.'}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate(lang === 'fr' ? '/services' : '/en/services')}
                  className="trm-btn trm-btn-border text-xs py-2 px-3"
                >
                  {lang === 'fr' ? 'Les Services' : 'Services'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(lang === 'fr' ? '/tarifs' : '/en/pricing')}
                  className="trm-btn trm-btn-border text-xs py-2 px-3"
                >
                  {lang === 'fr' ? 'Les Tarifs' : 'Pricing'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(lang === 'fr' ? '/realisations' : '/en/projects')}
                  className="trm-btn trm-btn-border text-xs py-2 px-3"
                >
                  {lang === 'fr' ? 'Réalisations' : 'Projects'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(lang === 'fr' ? '/contact' : '/en/contact')}
                  className="trm-btn trm-btn-primary text-xs py-2 px-3"
                >
                  {lang === 'fr' ? 'Prendre contact' : 'Contact Me'}
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

import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { SidebarCard } from '../components/SidebarCard';
import { EmbeddedCalculator } from '../components/calculator/EmbeddedCalculator';
import { useData } from '../context/DataContext';
import { ServiceCard } from '../components/ServiceCard';
import { MapPin, CheckCircle2, Globe2, Sparkles, Shield, Clock } from 'lucide-react';

interface LocalLandingProps {
  locationKey: 'tunisie' | 'sousse';
}

export const LocalLandingView: React.FC<LocalLandingProps> = ({ locationKey }) => {
  const { services } = useData();
  const { lang, navigate } = useRouter();

  const isSousse = locationKey === 'sousse';

  const title = isSousse
    ? (lang === 'fr' ? 'Développeur Web Freelance à Sousse' : 'Freelance Web Developer in Sousse')
    : (lang === 'fr' ? 'Développeur Web Freelance en Tunisie' : 'Freelance Web Developer in Tunisia');

  const metaDesc = isSousse
    ? (lang === 'fr'
        ? "Développeur Web Freelance à Sousse, Tunisie. Création de sites vitrines, e-commerce, WordPress, Shopify, Laravel et référencement Google pour entreprises à Sousse et au Sahel."
        : "Freelance web developer located in Sousse, Tunisia. High performance showcase sites, e-commerce stores, WordPress, and custom web apps.")
    : (lang === 'fr'
        ? "Développeur Web Freelance en Tunisie. Conception de sites internet sur mesure, boutiques en ligne Shopify & WooCommerce, développement WordPress et Laravel pour entreprises locales et internationales."
        : "Freelance full-stack web developer in Tunisia. Tailored web solutions, WordPress, WooCommerce, Shopify, and Laravel development.");

  const localAdvantages = [
    {
      title: lang === 'fr' ? 'Tarifs compétitifs sans intermédiaire' : 'Competitive Direct Rates',
      desc: lang === 'fr'
        ? "Bénéficiez d'une qualité technique équivalente ou supérieure aux standards européens à des tarifs freelance directs, sans marge d'agence."
        : "Receive senior European-standard technical quality directly at independent freelance rates with zero agency markups."
    },
    {
      title: lang === 'fr' ? 'Fuseau horaire & Réactivité' : 'Aligned Time Zone (CET / UTC+1)',
      desc: lang === 'fr'
        ? "Situé sur le même fuseau horaire que la France, la Belgique et la Suisse, ce qui permet des échanges instantanés en journée."
        : "Operating in the CET / UTC+1 timezone, ensuring real-time daily coordination with European teams."
    },
    {
      title: lang === 'fr' ? 'Parfaite maîtrise du Français & Anglais' : 'Bilingual French & English',
      desc: lang === 'fr'
        ? "Cahier des charges, documentation technique et visioconférences menés avec fluidité et précision."
        : "Seamless verbal and written technical communication across project scopes, documentation, and meetings."
    },
    {
      title: lang === 'fr' ? 'Proximité & Disponibilité sur place' : 'Local Proximity in Sousse',
      desc: isSousse
        ? (lang === 'fr'
            ? "Pour les entreprises de Sousse, Monastir, Mahdia et du Sahel, des rencontres en personne sont possibles pour cadrer le projet."
            : "For enterprises across Sousse and the Sahel region, in-person discovery meetings are easily arranged.")
        : (lang === 'fr'
            ? "Disponible pour des réunions de cadrage et un accompagnement de proximité partout en Tunisie."
            : "Available for scoping meetings and dedicated technical advisory across Tunisia.")
    }
  ];

  return (
    <>
      <SEOHead
        title={title}
        description={metaDesc}
        canonicalPath={isSousse ? '/developpeur-web-sousse' : '/developpeur-web-tunisie'}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <SidebarCard />

          <main className="flex-1 w-full space-y-12">
            <Breadcrumbs
              items={[
                { label: isSousse ? 'Développeur Web Sousse' : 'Développeur Web Tunisie' }
              ]}
            />

            {/* Header */}
            <div className="trm-card p-6 sm:p-10 relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#02162B] border border-[#0a3d54] text-[11px] font-mono text-[#70ba65] mb-4 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>{isSousse ? 'Sousse · Sahel · Tunisie' : 'Tunisie & Collaboration Internationale'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4 leading-tight">
                {isSousse ? (
                  <>Développeur Web Freelance à <span className="text-[#70ba65]">Sousse</span></>
                ) : (
                  <>Développeur Web Freelance en <span className="text-[#70ba65]">Tunisie</span></>
                )}
              </h1>

              <p className="text-sm sm:text-base text-[#a8b4b9] leading-relaxed max-w-3xl mb-6">
                {isSousse
                  ? (lang === 'fr'
                      ? "Vous êtes une entreprise, un commerce, un hôtel ou un professionnel indépendant basé à Sousse ou dans la région du Sahel ? Je vous accompagne dans la création de votre site internet professionnel avec une approche technique personnalisée."
                      : "Are you a business, merchant, hospitality provider, or startup based in Sousse or the Sahel? I help you build and scale high-performance web platforms with direct senior engineering.")
                  : (lang === 'fr'
                      ? "Vous cherchez un développeur web indépendant compétent en Tunisie pour créer votre site ou externaliser vos développements ? Que vous soyez basé à Tunis, Sousse, Sfax ou à l'étranger (France, Belgique, Suisse, Canada), bénéficiez d'un accompagnement sur mesure."
                      : "Looking for an experienced independent web engineer in Tunisia to craft your website or outsource technical development? Partner with a dedicated senior developer.")}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    const el = document.getElementById('local-contact-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="trm-btn trm-btn-primary"
                >
                  {lang === 'fr' ? 'Demander un devis gratuit' : 'Request a Free Quote'}
                </button>
              </div>
            </div>

            {/* Advantages Grid */}
            <div className="space-y-6">
              <div className="trm-section-divider">
                <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
                  {lang === 'fr' ? 'Pourquoi collaborer avec moi ?' : 'Why Partner With Me?'}
                </h2>
                <div className="trm-section-divider-line"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {localAdvantages.map((adv, idx) => (
                  <div key={idx} className="trm-card p-6 space-y-3">
                    <div className="w-8 h-8 rounded-lg bg-[#02162B] border border-[#70ba65]/40 text-[#70ba65] flex items-center justify-center font-mono font-bold text-xs">
                      0{idx + 1}
                    </div>
                    <h3 className="text-base font-serif font-bold text-white">{adv.title}</h3>
                    <p className="text-xs text-[#919ca1] leading-relaxed">{adv.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Local Services */}
            <div className="space-y-6">
              <div className="trm-section-divider">
                <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
                  {lang === 'fr' ? 'Services les plus demandés' : 'Most In-Demand Services'}
                </h2>
                <div className="trm-section-divider-line"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.slice(0, 4).map((s) => (
                  <ServiceCard key={s.id} service={s} />
                ))}
              </div>
            </div>

            {/* Local Calculator Section */}
            <div id="local-calculator" className="space-y-6 pt-4">
              <EmbeddedCalculator
                customTitle={{
                  fr: isSousse
                    ? 'Simulateur de Devis Web à Sousse'
                    : 'Simulateur de Devis Web en Tunisie',
                  en: isSousse
                    ? 'Website Cost Calculator in Sousse'
                    : 'Website Cost Calculator in Tunisia'
                }}
                customSubtitle={{
                  fr: 'Tarification claire et directe en Dinars Tunisiens (TND / DT) pour les entreprises locales, ou en Euros (EUR).',
                  en: 'Clear local pricing in Tunisian Dinars (TND) or Euros (EUR).'
                }}
              />
            </div>

            {/* Local Internal Links Mesh */}
            <div className="p-6 rounded-2xl bg-[#00283A] border border-[#0a3d54] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-serif font-bold text-white">
                  {lang === 'fr' 
                    ? (isSousse ? 'Découvrir nos projets en Tunisie' : 'Explorer nos compétences et réalisations')
                    : 'Explore projects & services in Tunisia'}
                </h4>
                <p className="text-xs text-[#919ca1]">
                  {lang === 'fr'
                    ? 'Consultez notre catalogue complet de prestations, nos tarifs transparents ou prenez contact.'
                    : 'Check our service catalog, transparent pricing, or get in touch directly.'}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate(lang === 'fr' ? '/services' : '/en/services')}
                  className="trm-btn trm-btn-border text-xs py-2 px-3"
                >
                  {lang === 'fr' ? 'Tous les Services' : 'All Services'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(lang === 'fr' ? '/tarifs' : '/en/pricing')}
                  className="trm-btn trm-btn-border text-xs py-2 px-3"
                >
                  {lang === 'fr' ? 'Grille des Tarifs' : 'Pricing Grid'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(lang === 'fr' ? '/realisations' : '/en/projects')}
                  className="trm-btn trm-btn-border text-xs py-2 px-3"
                >
                  {lang === 'fr' ? 'Réalisations' : 'Portfolio'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(lang === 'fr' ? '/contact' : '/en/contact')}
                  className="trm-btn trm-btn-primary text-xs py-2 px-3"
                >
                  {lang === 'fr' ? 'Contact Direct' : 'Direct Contact'}
                </button>
              </div>
            </div>

          </main>
        </div>
      </div>
    </>
  );
};

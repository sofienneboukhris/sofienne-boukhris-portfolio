import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useGlobalCurrency } from '../context/CurrencyContext';
import { getServicePricingDisplay } from '../utils/servicePricing';
import { ServiceItem } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { SidebarCard } from '../components/SidebarCard';
import { EmbeddedCalculator } from '../components/calculator/EmbeddedCalculator';
import { useData } from '../context/DataContext';
import { FAQS } from '../data/faq';
import { FAQAccordion } from '../components/FAQAccordion';
import { 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Layers, 
  Cpu, 
  HelpCircle,
  MessageSquare,
  Coins
} from 'lucide-react';

interface ServiceDetailViewProps {
  service: ServiceItem;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ service }) => {
  const { lang, navigate } = useRouter();
  const { currency } = useGlobalCurrency();
  const priceDisplay = getServicePricingDisplay(service, currency, lang);

  // Related services
  const { services } = useData();
  const relatedServices = services.filter((s) => s.id !== service.id).slice(0, 3);

  // Relevant FAQs
  const relevantFaqs = FAQS.slice(0, 4);

  return (
    <>
      <SEOHead
        title={service.title[lang]}
        description={service.shortDescription[lang]}
        canonicalPath={`/services/${service.slug}`}
        schemaType="service"
        schemaData={{
          name: service.title[lang],
          description: service.shortDescription[lang]
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <SidebarCard />

          <main className="flex-1 w-full space-y-12">
            <Breadcrumbs
              items={[
                { label: lang === 'fr' ? 'Services' : 'Services', to: lang === 'fr' ? '/services' : '/en/services' },
                { label: service.title[lang] }
              ]}
            />

            {/* Service Hero Card */}
            <div className="trm-card p-6 sm:p-10 relative overflow-hidden">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#02162B] border border-[#0a3d54] text-[11px] font-mono text-[#70ba65] uppercase tracking-wider">
                  <span>{service.category}</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00151F] border border-[#70ba65]/40 text-xs font-mono text-white shadow-sm">
                  <span className="text-sm" role="img" aria-label={priceDisplay.currency}>
                    {priceDisplay.flag}
                  </span>
                  <span className="text-[#919ca1]">
                    {lang === 'fr' ? 'À partir de :' : 'Starting from :'}
                  </span>
                  <span className="text-[#70ba65] font-bold">
                    {priceDisplay.formatted}
                  </span>
                  <span className="text-[10px] text-[#919ca1] border-l border-[#0a3d54] pl-2">
                    {priceDisplay.countryName}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
                {service.title[lang]}
              </h1>

              <p className="text-sm sm:text-base text-[#dedee0] leading-relaxed mb-8 max-w-3xl">
                {service.fullDescription[lang]}
              </p>

              {/* Technologies strip */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#0a3d54]/60">
                <span className="text-xs font-mono uppercase text-[#70ba65] mr-2">
                  {lang === 'fr' ? 'Stack technique :' : 'Tech Stack :'}
                </span>
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs text-white bg-[#02162B] px-3 py-1 rounded-full border border-[#0a3d54]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    const el = document.getElementById('service-quote-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="trm-btn trm-btn-primary"
                >
                  <span>{lang === 'fr' ? 'Demander un devis pour ce service' : 'Request a Quote for this Service'}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </button>

                <a
                  href={`https://wa.me/21653742140?text=Bonjour%20Sofienne,%20je%20suis%20intéressé%20par%20votre%20prestation%20:${encodeURIComponent(service.title?.[lang] || service.title?.fr || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="trm-btn trm-btn-border"
                >
                  <MessageSquare className="w-3.5 h-3.5 mr-2 text-[#25D366]" />
                  <span>WhatsApp direct</span>
                </a>
              </div>
            </div>

            {/* Benefits & Deliverables Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Key Benefits */}
              <div className="trm-card p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 text-white font-serif font-bold text-lg">
                  <div className="w-9 h-9 rounded-lg bg-[#02162B] border border-[#0a3d54] text-[#70ba65] flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <h3>{lang === 'fr' ? 'Avantages & Valeur ajoutée' : 'Key Benefits & Value'}</h3>
                </div>
                {service.benefits && service.benefits[lang] ? (
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#dedee0]">
                    {service.benefits[lang].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#70ba65] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs sm:text-sm text-[#a8b4b9] leading-relaxed">
                    {lang === 'fr' 
                      ? 'Accompagnement personnalisé, code propre et disponibilité directe.'
                      : 'Dedicated guidance, clean source code, and direct availability.'}
                  </p>
                )}
              </div>

              {/* Deliverables */}
              <div className="trm-card p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 text-white font-serif font-bold text-lg">
                  <div className="w-9 h-9 rounded-lg bg-[#02162B] border border-[#0a3d54] text-[#70ba65] flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3>{lang === 'fr' ? 'Ce qui est inclus (Livrables)' : 'What is Included (Deliverables)'}</h3>
                </div>
                {service.deliverables && service.deliverables[lang] ? (
                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#dedee0]">
                    {service.deliverables[lang].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#70ba65] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs sm:text-sm text-[#a8b4b9] leading-relaxed">
                    {lang === 'fr'
                      ? 'Développement, intégration responsive, tests et mise en ligne complète.'
                      : 'Full development, responsive integration, testing, and production deployment.'}
                  </p>
                )}
              </div>

            </div>

            {/* Related FAQs */}
            <div className="space-y-6">
              <div className="trm-section-divider">
                <span className="text-xs font-mono font-bold text-[#70ba65] bg-[#02162B] px-3 py-1 rounded-full border border-[#0a3d54]">
                  FAQ
                </span>
                <h2 className="text-xl font-serif font-bold text-white tracking-wide">
                  {lang === 'fr' ? 'Questions fréquentes sur ce service' : 'Frequently Asked Questions'}
                </h2>
                <div className="trm-section-divider-line"></div>
              </div>

              <FAQAccordion items={relevantFaqs} />
            </div>

            {/* Other Services */}
            <div className="space-y-6">
              <div className="trm-section-divider">
                <h2 className="text-lg font-serif font-bold text-white tracking-wide">
                  {lang === 'fr' ? 'Autres prestations complémentaires' : 'Other Complementary Services'}
                </h2>
                <div className="trm-section-divider-line"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedServices.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => navigate(`/services/${rel.slug}`)}
                    className="trm-card p-4 cursor-pointer hover:border-[#70ba65]/60 transition-colors group"
                  >
                    <h4 className="text-xs font-bold text-white group-hover:text-[#70ba65] transition-colors mb-1">
                      {rel.title[lang]}
                    </h4>
                    <p className="text-[11px] text-[#919ca1] line-clamp-2">
                      {rel.shortDescription[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Calculator Section */}
            <div id="service-calculator-section" className="space-y-6 pt-4">
              <EmbeddedCalculator
                id="service-calculator"
                initialProjectTypeId={
                  service.slug === 'site-vitrine'
                    ? 'vitrine'
                    : service.slug === 'site-e-commerce'
                    ? 'ecommerce'
                    : service.slug === 'application-web'
                    ? 'webapp'
                    : service.slug === 'refonte-optimisation'
                    ? 'refonte'
                    : 'vitrine'
                }
                customTitle={{
                  fr: `Estimer le coût : ${service.title?.fr || service.title?.[lang] || ''}`,
                  en: `Calculate estimate: ${service.title?.en || service.title?.[lang] || ''}`
                }}
                customSubtitle={{
                  fr: 'Simulez le budget adapté à votre besoin avec tarification transparente en Dinars Tunisiens (TND) ou en Euros (EUR).',
                  en: 'Simulate your project budget with transparent pricing in Tunisian Dinars (TND) or Euros (EUR).'
                }}
                contextServiceSlug={service.slug}
              />
            </div>

            {/* Internal Navigation Mesh */}
            <div className="p-6 rounded-2xl bg-[#00283A] border border-[#0a3d54] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-serif font-bold text-white">
                  {lang === 'fr' ? 'Poursuivre votre découverte' : 'Explore further'}
                </h4>
                <p className="text-xs text-[#919ca1]">
                  {lang === 'fr' 
                    ? 'Découvrez nos réalisations concrètes, nos tarifs détaillés ou contactez-moi directement.'
                    : 'Check out client case studies, detailed pricing, or contact me directly.'}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate(lang === 'fr' ? '/tarifs' : '/en/pricing')}
                  className="trm-btn trm-btn-border text-xs py-2 px-3"
                >
                  {lang === 'fr' ? 'Grille des tarifs' : 'Pricing Grid'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(lang === 'fr' ? '/realisations' : '/en/projects')}
                  className="trm-btn trm-btn-border text-xs py-2 px-3"
                >
                  {lang === 'fr' ? 'Études de cas' : 'Case Studies'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(lang === 'fr' ? '/contact' : '/en/contact')}
                  className="trm-btn trm-btn-primary text-xs py-2 px-3"
                >
                  {lang === 'fr' ? 'Me contacter' : 'Contact Me'}
                </button>
              </div>
            </div>

          </main>
        </div>
      </div>
    </>
  );
};

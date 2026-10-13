import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useGlobalCurrency } from '../context/CurrencyContext';
import { useData } from '../context/DataContext';
import { getServicePricingDisplay, MANAGED_SERVICE_CURRENCIES } from '../utils/servicePricing';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { SidebarCard } from '../components/SidebarCard';
import { EmbeddedCalculator } from '../components/calculator/EmbeddedCalculator';
import { CheckCircle2, ArrowRight, Shield, DollarSign, ExternalLink, Globe, MapPin } from 'lucide-react';

export const PricingView: React.FC = () => {
  const { lang, navigate } = useRouter();
  const { currency, setCurrency, geoInfo, formatPrice, isTunisia } = useGlobalCurrency();
  const { services } = useData();

  // Find matching live services
  const vitrineService = services.find(s => s.slug === 'site-vitrine' || s.category === 'web') || services[0];
  const ecommerceService = services.find(s => s.slug === 'site-e-commerce' || s.slug === 'boutique-en-ligne' || s.category === 'ecommerce') || services[1];
  const webappService = services.find(s => s.slug === 'application-web' || s.category === 'custom') || services[2];

  const vitrinePricing = vitrineService ? getServicePricingDisplay(vitrineService, currency, lang) : null;
  const ecommercePricing = ecommerceService ? getServicePricingDisplay(ecommerceService, currency, lang) : null;
  const webappPricing = webappService ? getServicePricingDisplay(webappService, currency, lang) : null;

  const currentCurrencyMeta = MANAGED_SERVICE_CURRENCIES.find(c => c.code === (currency as any)) || MANAGED_SERVICE_CURRENCIES[0];

  const pricingTiers = [
    {
      id: 'vitrine',
      name: lang === 'fr' ? 'Site Vitrine Professionnel' : 'Professional Showcase Website',
      category: lang === 'fr' ? 'Artisans, PME, Indépendants' : 'Small Businesses & Professionals',
      servicePath: lang === 'fr' ? '/services/site-vitrine' : '/en/services/showcase-website',
      priceGuide: vitrinePricing
        ? (lang === 'fr' ? `À partir de ${vitrinePricing.formatted}` : `Starting from ${vitrinePricing.formatted}`)
        : (currency === 'TND' ? 'À partir de 1 800 DT' : 'À partir de 650 €'),
      currencyInfo: vitrinePricing,
      description: lang === 'fr'
        ? "Idéal pour présenter votre activité, vos services et générer des prises de contact qualifiées."
        : "Ideal for presenting your brand, services, and capturing qualified incoming client leads.",
      features: [
        lang === 'fr' ? 'De 1 à 6 pages sur mesure' : '1 to 6 custom designed pages',
        lang === 'fr' ? 'Design responsive (Mobile / Tablette / Desktop)' : 'Fully responsive on all screen sizes',
        lang === 'fr' ? 'Formulaire de contact & bouton WhatsApp' : 'Contact form & direct WhatsApp button',
        lang === 'fr' ? 'Balisage SEO technique & Search Console' : 'Technical SEO tags & Google indexing',
        lang === 'fr' ? 'Hébergement & domaine configurés' : 'Domain & hosting deployment',
        lang === 'fr' ? 'Formation à l’administration' : 'Administrative training walkthrough'
      ],
      cta: lang === 'fr' ? 'Calculer mon devis vitrine' : 'Calculate Showcase Quote'
    },
    {
      id: 'ecommerce',
      name: lang === 'fr' ? 'Boutique E-Commerce' : 'E-Commerce Storefront',
      category: 'WooCommerce / Shopify',
      servicePath: lang === 'fr' ? '/services/site-e-commerce' : '/en/services/e-commerce',
      priceGuide: ecommercePricing
        ? (lang === 'fr' ? `À partir de ${ecommercePricing.formatted}` : `Starting from ${ecommercePricing.formatted}`)
        : (currency === 'TND' ? 'À partir de 3 600 DT' : 'À partir de 1 250 €'),
      currencyInfo: ecommercePricing,
      highlighted: true,
      description: lang === 'fr'
        ? "Pour vendre vos produits physiques ou dématérialisés avec paiement sécurisé et gestion des commandes."
        : "Sell physical or digital items online with reliable payment gateways and streamlined inventory.",
      features: [
        lang === 'fr' ? 'Catalogue produits & gestion des stocks' : 'Product catalog & inventory controls',
        lang === 'fr' ? 'Passerelle de paiement en ligne sécurisée' : 'Secure online credit card payments',
        lang === 'fr' ? 'Livraison & calcul des frais de port' : 'Automated shipping calculation',
        lang === 'fr' ? 'Tunnel d’achat optimisé pour la conversion' : 'Conversion-tuned checkout funnel',
        lang === 'fr' ? 'Gestion des promotions & codes promo' : 'Coupons & discount rules engine',
        lang === 'fr' ? 'Analytics e-commerce configuré' : 'E-commerce analytics tracking'
      ],
      cta: lang === 'fr' ? 'Calculer mon devis e-commerce' : 'Calculate E-Commerce Quote'
    },
    {
      id: 'webapp',
      name: lang === 'fr' ? 'Sur Mesure & Web App' : 'Custom App & Laravel',
      category: 'Laravel / React / Portails',
      servicePath: lang === 'fr' ? '/services/application-web' : '/en/services/web-applications',
      priceGuide: webappPricing
        ? (lang === 'fr' ? `À partir de ${webappPricing.formatted}` : `Starting from ${webappPricing.formatted}`)
        : (currency === 'TND' ? 'À partir de 5 400 DT (sur mesure)' : 'À partir de 1 850 € (custom scope)'),
      currencyInfo: webappPricing,
      description: lang === 'fr'
        ? "Pour les besoins spécifiques nécessitant une logique métier avancée, une base de données sur mesure ou des API."
        : "Engineered for advanced enterprise operations, bespoke business databases, or client dashboards.",
      features: [
        lang === 'fr' ? 'Architecture Laravel / React / TypeScript' : 'Laravel / React / TypeScript architecture',
        lang === 'fr' ? 'Espace client, rôles & permissions' : 'User roles, permissions & client portals',
        lang === 'fr' ? 'Interconnexion API & ERP/CRM' : 'API, CRM & payment gateway integrations',
        lang === 'fr' ? 'Base de données optimisée & sécurisée' : 'Scalable database schema & query tuning',
        lang === 'fr' ? 'Tests & assurance qualité' : 'Automated tests & quality assurance',
        lang === 'fr' ? 'Documentation technique complète' : 'Complete technical code documentation'
      ],
      cta: lang === 'fr' ? 'Calculer mon devis web app' : 'Calculate Custom Quote'
    }
  ];

  return (
    <>
      <SEOHead
        title={lang === 'fr' ? 'Tarifs & Devis Création Site Web' : 'Website Development Pricing & Estimates'}
        description={lang === 'fr'
          ? "Grille tarifaire et estimations pour la création de site web vitrine, e-commerce WooCommerce, boutique Shopify ou application sur mesure par Sofienne Boukhris."
          : "Transparent pricing guide and estimates for showcase websites, WooCommerce, Shopify stores, and custom web applications by Sofienne Boukhris."
        }
        canonicalPath={lang === 'fr' ? '/tarifs' : '/en/pricing'}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <SidebarCard />

          <main className="flex-1 w-full space-y-12">
            <Breadcrumbs
              items={[
                { label: lang === 'fr' ? 'Tarifs' : 'Pricing' }
              ]}
            />

            {/* Header */}
            <div className="trm-card p-6 sm:p-10 relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#02162B] border border-[#0a3d54] text-[11px] font-mono text-[#70ba65] mb-4 uppercase tracking-wider">
                <DollarSign className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? 'Transparence & Rigueur' : 'Transparency & Rigor'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
                {lang === 'fr' ? (
                  <>Tarifs & Estimations de <span className="text-[#70ba65]">développement web</span></>
                ) : (
                  <>Transparent <span className="text-[#70ba65]">Pricing & Estimates</span></>
                )}
              </h1>

              <p className="text-sm sm:text-base text-[#a8b4b9] leading-relaxed max-w-3xl">
                {lang === 'fr'
                  ? "Chaque projet étant unique, le coût final est calculé sur la base de vos besoins réels sans frais superflus. Voici des repères indicatifs pour vous aider à budgétiser vos travaux."
                  : "Because every digital project is unique, final costs are based purely on your concrete requirements. Below are indicative benchmarks to help shape your budget planning."}
              </p>
            </div>

            {/* Interactive Calculator Spotlight Banner */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#00283A] via-[#02162B] to-[#00283A] border-2 border-[#70ba65]/60 shadow-[0_0_35px_rgba(112,186,101,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#70ba65]/20 text-[#70ba65] text-xs font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#70ba65] animate-ping" />
                  <span>{lang === 'fr' ? 'Nouveau • Simulateur de Devis Interactif' : 'New • Interactive Quote Calculator'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {lang === 'fr'
                    ? 'Estimez précisément le tarif de votre projet en direct'
                    : 'Get an instant, itemized estimate for your project'}
                </h2>
                <p className="text-xs sm:text-sm text-[#919ca1] leading-relaxed">
                  {lang === 'fr'
                    ? 'Site vitrine, boutique e-commerce ou application sur mesure : simulez vos fonctionnalités et découvrez un tarif transparent et adapté (Dinars Tunisiens DT en Tunisie, Euros € pour la France & International).'
                    : 'Showcase site, e-commerce store, or custom web application: configure your modules and get a clear, transparent estimate (TND in Tunisia, EUR internationally).'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('pricing-calculator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#70ba65] text-[#00151F] font-bold text-sm hover:bg-[#86efac] hover:shadow-lg hover:shadow-[#70ba65]/20 hover:scale-[1.02] transition-all cursor-pointer shrink-0 shadow-md"
              >
                <span>{lang === 'fr' ? 'Accéder au simulateur ci-dessous' : 'Jump to Live Calculator'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Automatic Geolocation Currency Notice & Selector */}
            <div className="bg-[#00283A] border border-[#0a3d54] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#02162B] border border-[#0a3d54] text-[#70ba65] flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {lang === 'fr' ? 'Devise appliquée automatiquement :' : 'Auto-detected local currency :'}
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#70ba65]/10 text-[#70ba65] border border-[#70ba65]/30 flex items-center gap-1">
                      <span>{currentCurrencyMeta.flag}</span>
                      <span>{currentCurrencyMeta.code} ({currentCurrencyMeta.symbol})</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-[#919ca1] mt-0.5">
                    {currentCurrencyMeta.description[lang] || currentCurrencyMeta.description.fr}
                  </p>
                </div>
              </div>

              {/* Currency Switcher Removed */}
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className={`trm-card p-6 sm:p-7 flex flex-col justify-between relative ${
                    tier.highlighted ? 'border-[#70ba65] shadow-2xl' : ''
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#70ba65] text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                      {lang === 'fr' ? 'Le plus demandé' : 'Most Popular'}
                    </div>
                  )}

                  <div>
                    <div className="text-[11px] font-mono uppercase text-[#70ba65] mb-1">
                      {tier.category}
                    </div>
                    <h2 className="text-xl font-serif font-bold text-white mb-3">
                      {tier.name}
                    </h2>
                    <div className="text-lg font-mono font-bold text-[#70ba65] mb-2 flex items-center gap-1.5">
                      <span>{tier.priceGuide}</span>
                      {tier.currencyInfo && (
                        <span className="text-sm" role="img" aria-label={tier.currencyInfo.currency}>
                          {tier.currencyInfo.flag}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#919ca1] leading-relaxed mb-4">
                      {tier.description}
                    </p>

                    {/* Link to dedicated service page */}
                    <div className="mb-4">
                      <button
                        type="button"
                        onClick={() => navigate(tier.servicePath)}
                        className="inline-flex items-center gap-1 text-xs text-[#70ba65] hover:underline font-medium"
                      >
                        <span>{lang === 'fr' ? 'Découvrir cette prestation en détail' : 'View service details'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="space-y-2.5 border-t border-[#0a3d54]/50 pt-5 mb-8">
                      {tier.features.map((feat, fidx) => (
                        <div key={fidx} className="flex items-start gap-2 text-xs text-[#dedee0]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#70ba65] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('pricing-calculator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`trm-btn w-full text-xs py-3 cursor-pointer ${
                      tier.highlighted ? 'trm-btn-primary' : 'trm-btn-border'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              ))}
            </div>

            {/* Why Fixed Quote Box */}
            <div className="trm-card p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#70ba65]" />
                <span>{lang === 'fr' ? 'La garantie d’un devis forfaitaire sans surprise' : 'Guaranteed Fixed Scope Pricing'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#a8b4b9] leading-relaxed">
                {lang === 'fr'
                  ? "Avant de commencer, nous définissons ensemble le cahier des charges précis. Vous recevez un devis détaillé avec un prix forfaitaire fixe et un calendrier de livraison. Vous savez exactement ce que vous payez et quand votre site sera prêt."
                  : "Before engineering begins, we agree on an explicit specification sheet. You receive a comprehensive fixed-cost quote and milestone delivery schedule with zero surprises."}
              </p>
            </div>

            {/* Live Embedded Calculator (Replacing former ContactForm) */}
            <div id="pricing-calculator" className="space-y-6 pt-4">
              <EmbeddedCalculator
                customTitle={{
                  fr: 'Simulateur & Calculateur de Devis Personnalisé',
                  en: 'Interactive Project Cost & Scope Calculator'
                }}
                customSubtitle={{
                  fr: 'Ajustez le type de projet, le nombre de pages et les modules désirés pour estimer précisément votre investissement.',
                  en: 'Adjust your project type, page count, and modules to accurately project your investment.'
                }}
              />
            </div>

          </main>
        </div>
      </div>
    </>
  );
};

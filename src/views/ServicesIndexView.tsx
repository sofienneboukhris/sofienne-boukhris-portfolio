import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { ServiceCard } from '../components/ServiceCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { SidebarCard } from '../components/SidebarCard';
import { Sparkles, Layers, CheckCircle } from 'lucide-react';

export const ServicesIndexView: React.FC = () => {
  const { lang } = useRouter();
  const { services } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const activeServices = services.filter((s) => s.active !== false);

  const categories = [
    { id: 'all', label: lang === 'fr' ? `Toutes les prestations (${activeServices.length})` : `All Services (${activeServices.length})` },
    { id: 'websites', label: lang === 'fr' ? 'Sites & Vitrines' : 'Websites' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'cms', label: 'CMS & Plateformes' },
    { id: 'apps', label: lang === 'fr' ? 'Apps & Backends' : 'Apps & Backends' },
    { id: 'perf', label: lang === 'fr' ? 'Maintenance & SEO' : 'Maintenance & SEO' }
  ];

  const filteredServices = activeServices.filter((s) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'websites') return ['creation-site-web', 'site-vitrine', 'refonte-site-web'].includes(s.slug);
    if (selectedCategory === 'ecommerce') return ['site-e-commerce', 'site-e-commerce-woocommerce', 'site-e-commerce-shopify'].includes(s.slug);
    if (selectedCategory === 'cms') return ['wordpress', 'site-e-commerce-woocommerce', 'site-e-commerce-shopify'].includes(s.slug);
    if (selectedCategory === 'apps') return ['application-web', 'developpement-laravel'].includes(s.slug);
    if (selectedCategory === 'perf') return ['maintenance-site-web', 'optimisation-performance'].includes(s.slug);
    return true;
  });

  return (
    <>
      <SEOHead
        title={lang === 'fr' ? 'Services de Développement Web & E-Commerce' : 'Web Development & E-Commerce Services'}
        description={lang === 'fr'
          ? "Prestations complètes de développement web par Sofienne Boukhris : création de site vitrine, e-commerce WooCommerce & Shopify, développement WordPress, Laravel et optimisation SEO."
          : "Full-stack web development services by Sofienne Boukhris: showcase websites, WooCommerce & Shopify stores, WordPress, Laravel engineering, and speed optimization."
        }
        canonicalPath={lang === 'fr' ? '/services' : '/en/services'}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <SidebarCard />

          <main className="flex-1 w-full space-y-10">
            <Breadcrumbs
              items={[
                { label: lang === 'fr' ? 'Services' : 'Services' }
              ]}
            />

            {/* Header Banner */}
            <div className="trm-card p-6 sm:p-10 relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#02162B] border border-[#0a3d54] text-[11px] font-mono text-[#70ba65] mb-4 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? 'Prestations & Compétences' : 'Services & Expertise'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
                {lang === 'fr' ? (
                  <>Services de développement web <span className="text-[#70ba65]">sur mesure</span></>
                ) : (
                  <>Bespoke <span className="text-[#70ba65]">Web Engineering</span> Services</>
                )}
              </h1>

              <p className="text-sm sm:text-base text-[#a8b4b9] leading-relaxed max-w-3xl mb-6">
                {lang === 'fr'
                  ? "Que vous ayez besoin d'un premier site vitrine élégant, d'une boutique e-commerce à fort trafic, d'un thème WordPress sur mesure ou d'une application métier sous Laravel, découvrez l'ensemble de mes domaines d'intervention."
                  : "Whether you require a pristine showcase presence, a scalable e-commerce store, a bespoke WordPress theme, or an enterprise Laravel portal, explore my complete engineering capabilities."}
              </p>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#0a3d54]/60">
                {[
                  lang === 'fr' ? 'Code 100% propriétaire' : '100% Code Ownership',
                  lang === 'fr' ? 'Mobile-First & Rapide' : 'Mobile-First & Blazing Fast',
                  lang === 'fr' ? 'SEO technique intégré' : 'Built-in Technical SEO'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#dedee0]">
                    <CheckCircle className="w-4 h-4 text-[#70ba65] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#70ba65] text-white border-[#70ba65] shadow-md'
                      : 'bg-[#00283A] text-[#919ca1] border-[#0a3d54] hover:text-white hover:border-[#70ba65]/50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

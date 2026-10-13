import React from 'react';
import { useRouter } from '../context/RouterContext';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { EmbeddedCalculator } from '../components/calculator/EmbeddedCalculator';

export const CalculatorView: React.FC = () => {
  const { lang } = useRouter();

  const seoTitle =
    lang === 'fr'
      ? 'Calculateur de Devis Site Web Interactif | Sofienne Boukhris'
      : 'Interactive Web Project Cost Calculator | Sofienne Boukhris';

  const seoDesc =
    lang === 'fr'
      ? 'Estimez le coût de votre site vitrine, e-commerce ou application web. Détection automatique de votre devise locale (TND / د.ت, EUR €, USD $, GBP £, CAD, CHF, AED).'
      : 'Estimate your website or web app budget in real-time. Automatic local currency detection (TND, EUR, USD, GBP, CAD, CHF, AED).';

  return (
    <div className="flex-1 bg-[#00151F] text-[#dedee0] pb-28">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        canonicalUrl={lang === 'fr' ? '/calculateur' : '/en/calculator'}
      />

      {/* Breadcrumbs */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <Breadcrumbs
          items={[
            {
              label: lang === 'fr' ? 'Accueil' : 'Home',
              to: lang === 'fr' ? '/' : '/en/'
            },
            {
              label:
                lang === 'fr' ? 'Calculateur de Devis' : 'Cost Calculator'
            }
          ]}
        />
      </div>

      {/* The Unified Multi-Step Calculator */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <EmbeddedCalculator />
      </main>
    </div>
  );
};

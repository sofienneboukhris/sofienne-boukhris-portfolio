import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { SidebarCard } from '../components/SidebarCard';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundView: React.FC = () => {
  const { lang, navigate } = useRouter();

  return (
    <>
      <SEOHead
        title="Page non trouvée (404)"
        description="La page demandée n'existe pas ou a été déplacée."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <SidebarCard />

          <main className="flex-1 w-full">
            <div className="trm-card p-8 sm:p-14 text-center space-y-6 max-w-2xl mx-auto">
              <div className="text-6xl sm:text-7xl font-serif font-bold text-[#70ba65]">
                404
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {lang === 'fr' ? 'Page introuvable' : 'Page Not Found'}
              </h1>

              <p className="text-sm text-[#919ca1] leading-relaxed">
                {lang === 'fr'
                  ? "La page que vous recherchez n'existe pas ou a été déplacée. Vous pouvez retourner à l'accueil ou explorer nos prestations."
                  : "The page you are looking for does not exist or has been moved. You can return to the homepage or explore available services."}
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => navigate(lang === 'fr' ? '/' : '/en/')}
                  className="trm-btn trm-btn-primary"
                >
                  <Home className="w-4 h-4 mr-2" />
                  <span>{lang === 'fr' ? 'Retour à l’accueil' : 'Return to Home'}</span>
                </button>

                <button
                  onClick={() => navigate(lang === 'fr' ? '/services' : '/en/services')}
                  className="trm-btn trm-btn-border"
                >
                  {lang === 'fr' ? 'Voir les services' : 'Explore Services'}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

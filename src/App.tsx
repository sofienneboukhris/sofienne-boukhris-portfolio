import React, { useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { DataProvider, useData } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ScrollProgress } from './components/ScrollProgress';
import { AnalyticsTracker } from './components/AnalyticsTracker';
import { HomeView } from './views/HomeView';

// Code-split views with React.lazy to drastically minimize initial JS bundle
const ServicesIndexView = lazy(() => import('./views/ServicesIndexView').then(m => ({ default: m.ServicesIndexView })));
const ServiceDetailView = lazy(() => import('./views/ServiceDetailView').then(m => ({ default: m.ServiceDetailView })));
const ProjectsIndexView = lazy(() => import('./views/ProjectsIndexView').then(m => ({ default: m.ProjectsIndexView })));
const ProjectDetailView = lazy(() => import('./views/ProjectDetailView').then(m => ({ default: m.ProjectDetailView })));
const PricingView = lazy(() => import('./views/PricingView').then(m => ({ default: m.PricingView })));
const AboutView = lazy(() => import('./views/AboutView').then(m => ({ default: m.AboutView })));
const FAQView = lazy(() => import('./views/FAQView').then(m => ({ default: m.FAQView })));
const ContactView = lazy(() => import('./views/ContactView').then(m => ({ default: m.ContactView })));
const CalculatorView = lazy(() => import('./views/CalculatorView').then(m => ({ default: m.CalculatorView })));
const LocalLandingView = lazy(() => import('./views/LocalLandingView').then(m => ({ default: m.LocalLandingView })));
const BlogIndexView = lazy(() => import('./views/BlogIndexView').then(m => ({ default: m.BlogIndexView })));
const BlogPostView = lazy(() => import('./views/BlogPostView').then(m => ({ default: m.BlogPostView })));
const NotFoundView = lazy(() => import('./views/NotFoundView').then(m => ({ default: m.NotFoundView })));
const AdminDashboardView = lazy(() => import('./views/admin/AdminDashboardView').then(m => ({ default: m.AdminDashboardView })));
const AdminRegisterView = lazy(() => import('./views/admin/AdminRegisterView').then(m => ({ default: m.AdminRegisterView })));

const PageLoadingFallback: React.FC = () => (
  <div className="w-full flex-1 min-h-[50vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-[#0a3d54] border-t-[#70ba65] animate-spin" />
      <span className="text-xs font-mono text-[#919ca1]">Chargement...</span>
    </div>
  </div>
);

const AppRoutes: React.FC = () => {
  const { path } = useRouter();
  const { services, projects, blogPosts } = useData();
  const shouldReduceMotion = useReducedMotion();

  // Normalize path by stripping trailing slash (unless root "/")
  const cleanPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;

  // Scroll to top immediately upon route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cleanPath]);

  // Admin Dashboard view
  if (cleanPath === '/admin/register') {
    return (
      <Suspense fallback={<PageLoadingFallback />}>
        <AdminRegisterView />
      </Suspense>
    );
  }
  if (cleanPath === '/admin' || cleanPath.startsWith('/admin/')) {
    return (
      <ProtectedRoute>
        <Suspense fallback={<PageLoadingFallback />}>
          <AdminDashboardView />
        </Suspense>
      </ProtectedRoute>
    );
  }

  const renderCurrentView = () => {
    // Root Homepage (FR, EN, AR)
    if (cleanPath === '' || cleanPath === '/' || cleanPath === '/en' || cleanPath === '/ar') {
      return <HomeView />;
    }

    // Services Index
    if (
      cleanPath === '/services' ||
      cleanPath === '/en/services' ||
      cleanPath === '/ar/services'
    ) {
      return <ServicesIndexView />;
    }

    // Service Detail (/services/:slug, /en/services/:slug, /ar/services/:slug)
    if (
      cleanPath.startsWith('/services/') ||
      cleanPath.startsWith('/en/services/') ||
      cleanPath.startsWith('/ar/services/')
    ) {
      const rawSlug = cleanPath
        .replace(/^\/en\/services\//, '')
        .replace(/^\/ar\/services\//, '')
        .replace(/^\/services\//, '');

      // Support nested slugs such as "site-e-commerce/shopify" -> "site-e-commerce-shopify"
      const normalizedSlug = rawSlug.replace(/\//g, '-');
      const service = services.find(
        (s) => s.slug === rawSlug || s.slug === normalizedSlug || s.slug.endsWith(rawSlug)
      );

      if (service) {
        return <ServiceDetailView service={service} />;
      }
    }

    // Projects Index
    if (
      cleanPath === '/realisations' ||
      cleanPath === '/en/projects' ||
      cleanPath === '/ar/projects' ||
      cleanPath === '/ar/realisations'
    ) {
      return <ProjectsIndexView />;
    }

    // Project Detail
    if (
      cleanPath.startsWith('/realisations/') ||
      cleanPath.startsWith('/en/projects/') ||
      cleanPath.startsWith('/ar/projects/') ||
      cleanPath.startsWith('/ar/realisations/')
    ) {
      const slug = cleanPath
        .replace(/^\/en\/projects\//, '')
        .replace(/^\/ar\/projects\//, '')
        .replace(/^\/ar\/realisations\//, '')
        .replace(/^\/realisations\//, '');

      const project = projects.find((p) => p.slug === slug);
      if (project) {
        return <ProjectDetailView project={project} />;
      }
    }

    // Pricing
    if (
      cleanPath === '/tarifs' ||
      cleanPath === '/en/pricing' ||
      cleanPath === '/ar/pricing' ||
      cleanPath === '/ar/tarifs'
    ) {
      return <PricingView />;
    }

    // About
    if (
      cleanPath === '/a-propos' ||
      cleanPath === '/en/about' ||
      cleanPath === '/ar/about' ||
      cleanPath === '/ar/a-propos'
    ) {
      return <AboutView />;
    }

    // FAQ
    if (cleanPath === '/faq' || cleanPath === '/en/faq' || cleanPath === '/ar/faq') {
      return <FAQView />;
    }

    // Contact
    if (
      cleanPath === '/contact' ||
      cleanPath === '/en/contact' ||
      cleanPath === '/ar/contact'
    ) {
      return <ContactView />;
    }

    // Cost Calculator / Devis
    if (
      cleanPath === '/calculateur' ||
      cleanPath === '/en/calculator' ||
      cleanPath === '/ar/calculator' ||
      cleanPath === '/ar/calculateur' ||
      cleanPath === '/devis' ||
      cleanPath === '/en/quote' ||
      cleanPath === '/ar/quote'
    ) {
      return <CalculatorView />;
    }

    // Local SEO Pages
    if (cleanPath === '/developpeur-web-tunisie') {
      return <LocalLandingView locationKey="tunisie" />;
    }
    if (cleanPath === '/developpeur-web-sousse') {
      return <LocalLandingView locationKey="sousse" />;
    }

    // Blog Index
    if (cleanPath === '/blog' || cleanPath === '/en/blog' || cleanPath === '/ar/blog') {
      return <BlogIndexView />;
    }

    // Blog Post
    if (
      cleanPath.startsWith('/blog/') ||
      cleanPath.startsWith('/en/blog/') ||
      cleanPath.startsWith('/ar/blog/')
    ) {
      const slug = cleanPath
        .replace(/^\/en\/blog\//, '')
        .replace(/^\/ar\/blog\//, '')
        .replace(/^\/blog\//, '');

      const post = blogPosts.find((b) => b.slug === slug);
      if (post) {
        return <BlogPostView post={post} />;
      }
    }

    // Fallback 404
    return <NotFoundView />;
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={cleanPath}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
        transition={{
          duration: shouldReduceMotion ? 0.12 : 0.24,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="motion-route-container w-full flex-1 flex flex-col"
      >
        <Suspense fallback={<PageLoadingFallback />}>
          {renderCurrentView()}
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

const MainLayout: React.FC = () => {
  const { path } = useRouter();
  const isAdmin = path === '/admin' || path.startsWith('/admin/');

  if (isAdmin) {
    return <AppRoutes />;
  }

  return (
    <div className="min-h-screen bg-[#00151F] text-[#dedee0] flex flex-col font-sans selection:bg-[#70ba65] selection:text-white">
      <ScrollProgress />
      <Header />
      <div className="flex-1 flex flex-col">
        <AppRoutes />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <AuthProvider>
        <DataProvider>
          <CurrencyProvider>
            <AnalyticsTracker />
            <MainLayout />
          </CurrencyProvider>
        </DataProvider>
      </AuthProvider>
    </RouterProvider>
  );
}

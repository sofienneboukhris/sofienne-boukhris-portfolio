import React, { useEffect, useMemo } from 'react';
import { useRouter } from '../context/RouterContext';
import { ChevronRight, Home } from 'lucide-react';
import { useData } from '../context/DataContext';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className = '',
  showHome = true
}) => {
  const { services, projects, blogPosts } = useData();
  const { path, lang, navigate } = useRouter();

  // Dynamically resolve breadcrumbs if not provided via props
  const resolvedItems = useMemo<BreadcrumbItem[]>(() => {
    if (items && items.length > 0) {
      return items;
    }

    const cleanPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
    const isEn = lang === 'en';

    // 1. Services
    if (cleanPath === '/services' || cleanPath === '/en/services') {
      return [{ label: isEn ? 'Services' : 'Services' }];
    }

    if (cleanPath.startsWith('/services/') || cleanPath.startsWith('/en/services/')) {
      const rawSlug = cleanPath.replace(/^\/en\/services\//, '').replace(/^\/services\//, '');
      const normalizedSlug = rawSlug.replace(/\//g, '-');
      const service = services.find(
        (s) => s.slug === rawSlug || s.slug === normalizedSlug || s.slug.endsWith(rawSlug)
      );

      return [
        { label: isEn ? 'Services' : 'Services', to: isEn ? '/en/services' : '/services' },
        { label: service ? service.title[lang] : rawSlug }
      ];
    }

    // 2. Projects / Réalisations
    if (cleanPath === '/realisations' || cleanPath === '/en/projects') {
      return [{ label: isEn ? 'Projects' : 'Réalisations' }];
    }

    if (cleanPath.startsWith('/realisations/') || cleanPath.startsWith('/en/projects/')) {
      const slug = cleanPath.replace(/^\/en\/projects\//, '').replace(/^\/realisations\//, '');
      const project = projects.find((p) => p.slug === slug);

      return [
        { label: isEn ? 'Projects' : 'Réalisations', to: isEn ? '/en/projects' : '/realisations' },
        { label: project ? project.title : slug }
      ];
    }

    // 3. Blog
    if (cleanPath === '/blog' || cleanPath === '/en/blog') {
      return [{ label: isEn ? 'Blog' : 'Blog' }];
    }

    if (cleanPath.startsWith('/blog/') || cleanPath.startsWith('/en/blog/')) {
      const slug = cleanPath.replace(/^\/en\/blog\//, '').replace(/^\/blog\//, '');
      const post = blogPosts.find((b) => b.slug === slug);

      return [
        { label: isEn ? 'Blog' : 'Blog', to: isEn ? '/en/blog' : '/blog' },
        { label: post ? post.title[lang] : slug }
      ];
    }

    // 4. Tarifs / Pricing
    if (cleanPath === '/tarifs' || cleanPath === '/en/pricing') {
      return [{ label: isEn ? 'Pricing' : 'Tarifs' }];
    }

    // 5. About
    if (cleanPath === '/a-propos' || cleanPath === '/en/about') {
      return [{ label: isEn ? 'About' : 'À Propos' }];
    }

    // 6. FAQ
    if (cleanPath === '/faq' || cleanPath === '/en/faq') {
      return [{ label: isEn ? 'FAQ' : 'FAQ' }];
    }

    // 7. Contact
    if (cleanPath === '/contact' || cleanPath === '/en/contact') {
      return [{ label: isEn ? 'Contact' : 'Contact' }];
    }

    // 8. Local Landing Pages
    if (cleanPath === '/developpeur-web-tunisie') {
      return [
        { label: isEn ? 'Services' : 'Services', to: isEn ? '/en/services' : '/services' },
        { label: isEn ? 'Developer Tunisia' : 'Développeur Tunisie' }
      ];
    }

    if (cleanPath === '/developpeur-web-sousse') {
      return [
        { label: isEn ? 'Services' : 'Services', to: isEn ? '/en/services' : '/services' },
        { label: isEn ? 'Developer Sousse' : 'Développeur Sousse' }
      ];
    }

    return [];
  }, [items, path, lang]);

  // Generate dynamic Schema.org BreadcrumbList JSON-LD for rich snippets in Google Search
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const scriptId = 'breadcrumbs-schema-jsonld';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (script) {
      script.remove();
    }

    const homeUrl = `https://sofienneboukhris.com${lang === 'en' ? '/en/' : '/'}`;
    const homeLabel = lang === 'fr' ? 'Accueil' : 'Home';

    const itemListElement: Array<{
      '@type': string;
      position: number;
      name: string;
      item?: string;
    }> = [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: homeUrl
      }
    ];

    resolvedItems.forEach((item, index) => {
      const position = index + 2;
      const fullUrl = item.to
        ? `https://sofienneboukhris.com${item.to.startsWith('/') ? item.to : `/${item.to}`}`
        : `https://sofienneboukhris.com${path}`;

      itemListElement.push({
        '@type': 'ListItem',
        position,
        name: item.label,
        item: fullUrl
      });
    });

    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement
    };

    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(breadcrumbJsonLd);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, [resolvedItems, path, lang]);

  // Don't render empty breadcrumb bar on root homepage if there are no subpages
  if (resolvedItems.length === 0 && (path === '/' || path === '/en' || path === '/en/')) {
    return null;
  }

  const homePath = lang === 'fr' ? '/' : '/en/';

  return (
    <nav
      aria-label={lang === 'fr' ? 'Fil d’Ariane' : 'Breadcrumb'}
      className={`mb-6 flex items-center text-xs text-[#919ca1] flex-wrap gap-1.5 ${className}`}
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      {showHome && (
        <span
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="inline-flex items-center"
        >
          <button
            onClick={() => navigate(homePath)}
            className="flex items-center gap-1 hover:text-[#70ba65] transition-colors focus:outline-none focus:ring-1 focus:ring-[#70ba65]/50 rounded px-1 -mx-1"
            title={lang === 'fr' ? 'Accueil' : 'Home'}
            itemProp="item"
          >
            <Home className="w-3.5 h-3.5 text-[#70ba65]/90" />
            <span itemProp="name">{lang === 'fr' ? 'Accueil' : 'Home'}</span>
          </button>
          <meta itemProp="position" content="1" />
        </span>
      )}

      {resolvedItems.map((item, index) => {
        const isLast = index === resolvedItems.length - 1;
        const position = index + 2;

        return (
          <React.Fragment key={`${item.label}-${index}`}>
            <ChevronRight className="w-3 h-3 text-[#0a3d54] shrink-0" aria-hidden="true" />
            <span
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="inline-flex items-center min-w-0"
            >
              {isLast || !item.to ? (
                <span
                  itemProp="name"
                  className="text-[#dedee0] font-medium truncate max-w-[200px] sm:max-w-[340px] md:max-w-none"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => item.to && navigate(item.to)}
                  className="hover:text-[#70ba65] transition-colors truncate max-w-[150px] sm:max-w-[260px] focus:outline-none focus:ring-1 focus:ring-[#70ba65]/50 rounded px-1 -mx-1"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </button>
              )}
              <meta itemProp="position" content={String(position)} />
            </span>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

import React, { useEffect } from 'react';
import { useRouter } from '../context/RouterContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  keywords?: string[] | string;
  schemaType?: 'website' | 'service' | 'faq' | 'about' | 'project' | 'article';
  schemaData?: Record<string, any>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath,
  keywords,
  schemaType = 'website',
  schemaData
}) => {
  const { path, lang } = useRouter();

  const defaultTitle = lang === 'fr'
    ? 'Développeur Web Freelance en Tunisie | Sofienne Boukhris'
    : 'Freelance Full-Stack Web Developer in Tunisia | Sofienne Boukhris';

  const defaultDescription = lang === 'fr'
    ? "Sofienne Boukhris, Développeur Web Freelance Full-Stack à Sousse, Tunisie. Création de sites web sur mesure, vitrine, e-commerce, WordPress, Shopify, Laravel, React et SEO technique."
    : "Sofienne Boukhris, Freelance Full-Stack Web Developer in Sousse, Tunisia. Bespoke websites, e-commerce, WordPress, Shopify, Laravel, React, and technical SEO.";

  const finalTitle = title ? `${title} | Sofienne Boukhris` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalCanonical = `https://sofienneboukhris.com${canonicalPath || path}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = finalTitle;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', finalDescription);

    // 3. Update Canonical Tag
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', finalCanonical);

    // 4. Update OpenGraph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', finalTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', finalDescription);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', finalCanonical);

    // 5. Update Keywords Meta Tag
    const formattedKeywords = Array.isArray(keywords) ? keywords.join(', ') : keywords;
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (formattedKeywords) {
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', formattedKeywords);
    } else if (metaKeywords) {
      metaKeywords.remove();
    }

    // 6. Update HTML lang attribute
    document.documentElement.lang = lang;

    // 7. Schema.org JSON-LD injection
    const scriptId = 'schema-org-jsonld';
    let existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';

    let jsonLd: Record<string, any> = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': 'https://sofienneboukhris.com/#person',
          name: 'Sofienne Boukhris',
          jobTitle: 'Freelance Full-Stack Web Developer',
          url: 'https://sofienneboukhris.com',
          sameAs: [
            'https://www.linkedin.com/in/sofienneboukhris',
            'https://www.facebook.com/sofienneboukhris',
            'https://www.instagram.com/sofienneboukhris'
          ],
          image: 'https://sofienneboukhris.com/og-image.webp',
          email: 'hello@sofienneboukhris.com',
          telephone: '+21653742140',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Sousse',
            addressCountry: 'TN'
          },
          knowsAbout: [
            'Web Development',
            'Full-Stack Development',
            'WordPress',
            'Shopify',
            'Laravel',
            'PHP',
            'React',
            'TypeScript',
            'WooCommerce',
            'SEO Technique'
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5.0',
            reviewCount: '6',
            bestRating: '5',
            worstRating: '1'
          }
        },
        {
          '@type': 'WebSite',
          '@id': 'https://sofienneboukhris.com/#website',
          url: 'https://sofienneboukhris.com',
          name: 'Sofienne Boukhris',
          inLanguage: ['fr-TN', 'fr-FR', 'en-US'],
          publisher: {
            '@id': 'https://sofienneboukhris.com/#person'
          }
        }
      ]
    };

    if (schemaType === 'service' && schemaData) {
      jsonLd['@graph'].push({
        '@type': 'Service',
        name: schemaData.name || finalTitle,
        description: schemaData.description || finalDescription,
        provider: {
          '@id': 'https://sofienneboukhris.com/#person'
        },
        areaServed: ['TN', 'FR', 'BE', 'CH', 'CA', 'Worldwide']
      });
    }

    if (schemaType === 'article' && schemaData) {
      jsonLd['@graph'].push({
        '@type': 'BlogPosting',
        headline: schemaData.headline || finalTitle,
        description: schemaData.description || finalDescription,
        author: {
          '@type': 'Person',
          name: schemaData.author || 'Sofienne Boukhris',
          url: 'https://sofienneboukhris.com'
        },
        publisher: {
          '@id': 'https://sofienneboukhris.com/#person'
        },
        datePublished: schemaData.datePublished,
        keywords: schemaData.keywords || formattedKeywords || undefined,
        articleSection: schemaData.articleSection || undefined,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': finalCanonical
        }
      });
    }

    if (schemaType === 'faq' && schemaData?.faqs) {
      jsonLd['@graph'].push({
        '@type': 'FAQPage',
        mainEntity: schemaData.faqs.map((f: any) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
      });
    }

    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, [finalTitle, finalDescription, finalCanonical, lang, schemaType, schemaData, keywords]);

  return null;
};

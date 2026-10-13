import { BlogPostItem, Language } from '../types';

export const BLOG_POSTS: BlogPostItem[] = [
  {
    slug: 'cout-creation-site-web',
    title: {
      fr: "Combien coûte la création d'un site web en Tunisie et à l'international ?",
      en: "How Much Does It Cost to Build a Website in 2026?"
    },
    excerpt: {
      fr: "Comprendre les composantes réelles du prix d'un site web : design, développement, CMS, hébergement et maintenance, sans promesses trompeuses.",
      en: "A transparent breakdown of what drives website costs: design scope, custom development, CMS vs custom frameworks, and ongoing maintenance."
    },
    content: {
      fr: [
        "Le coût d'un site internet varie considérablement selon la nature du projet : un simple site vitrine de 5 pages ne requiert évidemment pas le même investissement qu'une boutique e-commerce avec gestion de stocks ou une application web métier avec base de données.",
        "Plusieurs critères déterminent le devis final : l'architecture technique (WordPress, Shopify, solution sur mesure en Laravel ou React), le niveau de personnalisation graphique, les intégrations spécifiques (passerelles de paiement, CRM, liaisons ERP) et le travail d'optimisation pour le référencement naturel.",
        "En pratique, un site vitrine professionnel commence généralement autour de 800 à 1 500 DT en Tunisie (ou 1 200 à 2 500 € pour l'Europe), tandis qu'un e-commerce complet se situe entre 2 000 et 5 000 DT (ou 3 000 à 8 000 €). Les applications sur mesure et plateformes SaaS nécessitent quant à elles un chiffrage par jalons et sprints agiles.",
        "Méfiez-vous des offres 'site complet à 200 €' : elles masquent souvent des thèmes piratés sans mises à jour de sécurité, aucun travail de rédaction ou de SEO, et une absence totale de maintenance contractuelle.",
        "Faire appel à un développeur freelance expérimenté permet d'obtenir un accompagnement technique direct et sur mesure, sans les frais de structure souvent élevés des agences traditionnelles, tout en bénéficiant d'un code pérenne et soigné."
      ],
      en: [
        "Website pricing hinges entirely on project requirements: a clean 5-page showcase site requires vastly different engineering than an enterprise e-commerce storefront or a bespoke web application with custom relational databases.",
        "Key determinants of project cost include platform selection (WordPress, Shopify, custom Laravel/React), unique feature engineering, third-party API connections (payment processors, CRM, ERP sync), and technical SEO architecture.",
        "In practice, a professional showcase website typically starts around 1,200 to 2,500 EUR, whereas comprehensive e-commerce architectures range from 3,000 to 8,000 EUR. Custom web apps and SaaS portals require modular estimation across development sprints.",
        "Be wary of low-budget turn-key promises: they frequently rely on outdated nulled themes, offer zero SEO foundational structure, and lack ongoing maintenance commitments.",
        "Partnering with a specialized senior freelance engineer gives you direct technical access and bespoke craftsmanship without agency overhead, ensuring long-term code quality you actually own."
      ]
    },
    category: 'creation-site-web',
    categoryLabel: {
      fr: 'Création de site',
      en: 'Web Development'
    },
    readTime: '5 min',
    publishDate: '2026-03-10',
    author: 'Sofienne Boukhris',
    tags: {
      fr: ['Tarifs Site Web', 'Devis Freelance', 'Création Site Tunisie', 'Budget Web', 'WordPress vs Sur-Mesure'],
      en: ['Website Cost', 'Freelance Quote', 'Web Development Tunisia', 'Web Budget', 'WordPress vs Custom']
    }
  },
  {
    slug: 'wordpress-ou-shopify',
    title: {
      fr: 'WordPress (WooCommerce) ou Shopify : quelle solution choisir ?',
      en: 'WooCommerce vs Shopify: Which E-Commerce Platform Fits You?'
    },
    excerpt: {
      fr: 'Comparatif technique et stratégique entre l’indépendance open-source de WooCommerce et la simplicité hébergée de Shopify.',
      en: 'A pragmatic comparison between the open-source sovereignty of WooCommerce and the managed convenience of Shopify.'
    },
    content: {
      fr: [
        "Le choix entre WooCommerce et Shopify est une question récurrente chez les créateurs d'entreprises et commerçants. Les deux plateformes sont d'excellents outils, mais répondent à des philosophies différentes.",
        "Shopify excelle pour les commerçants souhaitant une infrastructure entièrement gérée où l'hébergement, la sécurité et les mises à jour sont inclus dans un abonnement mensuel. En contrepartie, la personnalisation est contrainte par le langage Liquid, et chaque fonctionnalité avancée nécessite souvent une application payante récurrente, en plus des commissions sur le chiffre d'affaires.",
        "WooCommerce, adossé à WordPress, offre quant à lui une liberté totale : aucune commission prélevée sur vos ventes par la plateforme, propriété intégrale de vos bases de données clients et possibilité infinie de personnalisation en code sur mesure (PHP, REST API, React).",
        "Côté passerelles de paiement, WooCommerce s'adapte parfaitement aux marchés locaux et internationaux (Stripe, PayPal, passerelles bancaires tunisiennes comme GPG, ClicToPay, Konnect ou Flouci), tandis que Shopify peut restreindre certaines intégrations régionales sans frais additionnels.",
        "En résumé : choisissez Shopify pour tester rapidement un catalogue standard sans compétences techniques, et optez pour WooCommerce dès lors que vous visez la souveraineté de vos données, l'absence de redevances sur vos ventes et une boutique personnalisée durable."
      ],
      en: [
        "Choosing between WooCommerce and Shopify is a pivotal decision for online merchants. Both systems are market leaders, yet they serve distinct operational philosophies.",
        "Shopify offers managed convenience where hosting, server uptime, and security patches are bundled into a monthly subscription. The trade-off lies in proprietary Liquid templates, mandatory transaction fees unless using Shopify Payments, and accumulating app subscriptions.",
        "WooCommerce offers absolute digital sovereignty: no mandatory platform sales commissions, 100% data ownership, and unrestricted customization capabilities through custom PHP, REST API hooks, and headless React storefronts.",
        "When integrating payment gateways, WooCommerce supports international standards (Stripe, PayPal) as well as regional processors seamlessly, avoiding the penalty fees Shopify levies on third-party gateways.",
        "In summary: launch with Shopify for rapid prototyping without code, but invest in WooCommerce when long-term margin preservation, full database ownership, and bespoke brand experiences are paramount."
      ]
    },
    category: 'e-commerce',
    categoryLabel: {
      fr: 'E-commerce',
      en: 'E-Commerce'
    },
    readTime: '4 min',
    publishDate: '2026-02-18',
    author: 'Sofienne Boukhris',
    tags: {
      fr: ['WooCommerce', 'Shopify', 'E-commerce', 'Vente en Ligne', 'Boutique WordPress', 'Comparatif CMS'],
      en: ['WooCommerce', 'Shopify', 'E-Commerce', 'Online Store', 'WordPress E-commerce', 'CMS Comparison']
    }
  },
  {
    slug: 'ameliorer-vitesse-wordpress-core-web-vitals',
    title: {
      fr: 'Comment améliorer la vitesse d’un site WordPress et ses Core Web Vitals ?',
      en: 'How to Optimize WordPress Speed and Core Web Vitals'
    },
    excerpt: {
      fr: 'Les techniques concrètes pour accélérer un site WordPress : compression WebP, nettoyage de code et cache serveur.',
      en: 'Proven technical strategies to accelerate WordPress: WebP/AVIF imagery, eliminating render-blocking assets, and caching.'
    },
    content: {
      fr: [
        "La lenteur d'un site WordPress provient rarement du CMS lui-même, mais plutôt de l'accumulation de thèmes lourds, de constructeurs de pages mal optimisés (Divi, Elementor surchargé), de plugins redondants et de médias non compressés.",
        "Pour atteindre d'excellents scores aux Core Web Vitals (LCP, INP, CLS), plusieurs chantiers sont prioritaires. Le Largest Contentful Paint (LCP) s'améliore en préchargeant l'image vedette en format moderne (WebP ou AVIF) et en supprimant le temps de réponse serveur (TTFB) grâce à un cache Redis ou LiteSpeed.",
        "Voici un extrait de configuration serveur pour activer les en-têtes de mise en cache navigateur et la compression Gzip/Brotli pour vos fichiers statiques :",
        "```apache\n# Mise en cache navigateur longue durée (.htaccess)\n<IfModule mod_expires.c>\n  ExpiresActive On\n  ExpiresDefault \"access plus 1 month\"\n  ExpiresByType image/webp \"access plus 1 year\"\n  ExpiresByType image/avif \"access plus 1 year\"\n  ExpiresByType text/css \"access plus 1 year\"\n  ExpiresByType application/javascript \"access plus 1 year\"\n</IfModule>\n```",
        "L'Interaction to Next Paint (INP), qui a remplacé le FID, mesure la réactivité aux clics de l'utilisateur. Il est impératif d'ajourner l'exécution des scripts JavaScript tiers non indispensables (pixels publicitaires, widgets de chat) et de ne jamais bloquer le thread principal du navigateur.",
        "Pour le Cumulative Layout Shift (CLS), attribuez systématiquement des dimensions width et height explicites à chaque image, bannière et conteneur publicitaire pour éviter tout saut brutal de mise en page pendant le rendu.",
        "Un site rapide retient davantage ses visiteurs sur mobile, diminue le taux de rebond de 30 à 50 % et bénéficie d'un signal positif direct dans l'algorithme de classement de Google."
      ],
      en: [
        "Slow WordPress sites rarely stem from the core CMS itself; rather, sluggishness is driven by bloated multipurpose themes, excessive page-builder DOM nodes, uncompressed imagery, and conflicting plugins.",
        "Achieving green Core Web Vitals scores requires focused engineering. Largest Contentful Paint (LCP) is tackled by preloading hero assets in AVIF/WebP formats, hosting fonts locally with modern font-display rules, and slashing server TTFB with Redis or LiteSpeed caching.",
        "Here is an optimized server caching rule to serve aggressive Cache-Control headers for your assets:",
        "```apache\n# Long-term browser caching (.htaccess)\n<IfModule mod_expires.c>\n  ExpiresActive On\n  ExpiresDefault \"access plus 1 month\"\n  ExpiresByType image/webp \"access plus 1 year\"\n  ExpiresByType image/avif \"access plus 1 year\"\n  ExpiresByType text/css \"access plus 1 year\"\n  ExpiresByType application/javascript \"access plus 1 year\"\n</IfModule>\n```",
        "Interaction to Next Paint (INP) gauges click responsiveness on actual user devices. Deferring heavy non-critical JavaScript trackers (marketing pixels, chat embeds) keeps the main browser execution thread unblocked and fluid.",
        "To eliminate Cumulative Layout Shift (CLS), always declare explicit width and height aspect-ratio attributes on images, video embeds, and dynamic banners to prevent layout jumps during progressive rendering.",
        "A blazing fast website drastically curbs mobile bounce rates, elevates user satisfaction, and earns distinct organic ranking dividends across Google search algorithms."
      ]
    },
    category: 'wordpress',
    categoryLabel: {
      fr: 'WordPress & Tech',
      en: 'WordPress & Performance'
    },
    readTime: '4 min',
    publishDate: '2026-01-25',
    author: 'Sofienne Boukhris',
    tags: {
      fr: ['Core Web Vitals', 'Vitesse WordPress', 'Optimisation WebP', 'Performance Web', 'Cache & CDN', 'LCP Google'],
      en: ['Core Web Vitals', 'WordPress Speed', 'WebP Optimization', 'Web Performance', 'Caching & CDN', 'Google LCP']
    }
  },
  {
    slug: 'refonte-site-web-preserver-seo',
    title: {
      fr: 'Refonte de site web : comment préserver son référencement Google ?',
      en: 'Website Redesign: How to Protect Your Google SEO Rankings'
    },
    excerpt: {
      fr: 'La méthode rigoureuse pour moderniser son site sans subir d’effondrement de trafic organique grâce aux redirections 301.',
      en: 'A step-by-step checklist to modernize your website without losing organic traffic via strict 301 redirect mapping.'
    },
    content: {
      fr: [
        "Refondre un site web est une opportunité formidable pour rafraîchir son image et améliorer ses conversions. Cependant, si le changement d'architecture d'URLs n'est pas scrupuleusement anticipé, Google se heurtera à des pages d'erreur 404 et déclassera irrémédiablement le site.",
        "La règle d'or consiste à établir un plan de redirection 301 exhaustif avant la mise en production : chaque ancienne URL indexée doit pointer de manière permanente vers sa nouvelle page équivalente la plus pertinente.",
        "Voici la syntaxe recommandée dans votre fichier .htaccess pour implémenter des redirections permanentes préservant le 'link juice' et le PageRank :",
        "```apache\n# Plan de redirections 301 (.htaccess)\nRewriteEngine On\n\n# Redirection d'une ancienne page vers la nouvelle structure\nRewriteRule ^anciennes-prestations/?$ /services [R=301,L]\nRewriteRule ^contact-devis/?$ /contact [R=301,L]\nRewriteRule ^portfolio/projet-([0-9]+)/?$ /realisations/projet-$1 [R=301,L]\n```",
        "Avant toute migration, réalisez un crawl complet du site existant avec Screaming Frog pour exporter l'ensemble des URLs recevant du trafic organique et des backlinks externes.",
        "Veillez également à préserver les balises Title, les structures H1/H2 pertinentes et la profondeur de contenu textuel sur les pages stratégiques qui drainent déjà l'essentiel de vos positions SEO.",
        "Enfin, surveillez la Google Search Console durant les 30 jours suivant la mise en ligne pour identifier d'éventuelles erreurs 404 imprévues et soumettre votre nouveau sitemap XML sans délai."
      ],
      en: [
        "A website redesign offers a prime opportunity to elevate your brand and lift conversions. Yet without diligent URL mapping, search engines encounter dead 404 ends and drop keyword positions.",
        "The fundamental requirement is constructing an exhaustive 301 redirection blueprint prior to deployment: every legacy indexed URL must route permanently to its closest modern counterpart.",
        "Here is the standard syntax for Apache servers to ensure seamless link equity transfer:",
        "```apache\n# 301 Permanent Redirect Mapping (.htaccess)\nRewriteEngine On\n\n# Legacy page rewrites to modern route equivalents\nRewriteRule ^legacy-services/?$ /en/services [R=301,L]\nRewriteRule ^request-quote/?$ /en/contact [R=301,L]\nRewriteRule ^portfolio/project-([0-9]+)/?$ /en/projects/project-$1 [R=301,L]\n```",
        "Before deploying, perform a full crawl with tools like Screaming Frog to catalogue every existing URL receiving organic search impressions or authoritative external backlinks.",
        "Ensure vital on-page elements (Title tags, semantic H1/H2 structures, schema markups, and core content depth) are thoughtfully carried over to the redesigned templates rather than stripped away.",
        "Closely monitor Google Search Console for 30 days post-launch to catch 404 spikes, resubmit updated XML sitemaps, and guarantee crawl budget remains unhindered."
      ]
    },
    category: 'seo',
    categoryLabel: {
      fr: 'SEO Technique',
      en: 'Technical SEO'
    },
    readTime: '4 min',
    publishDate: '2025-12-14',
    author: 'Sofienne Boukhris',
    tags: {
      fr: ['Refonte Web', 'Redirections 301', 'SEO Technique', 'Migration Site', 'Trafic Organique', 'Erreurs 404'],
      en: ['Website Redesign', '301 Redirects', 'Technical SEO', 'Site Migration', 'Organic Traffic', '404 Errors']
    }
  }
];

export interface ReadingTimeResult {
  minutes: number;
  wordCount: number;
  formatted: string;
}

/**
 * Calculates estimated reading time dynamically based on word count
 * (standard 200 words per minute reading pace)
 */
export function calculateReadingTime(
  post: BlogPostItem,
  lang: Language = 'fr',
  wordsPerMinute: number = 200
): ReadingTimeResult {
  const title = (post.title as any)?.[lang] || post.title?.fr || '';
  const excerpt = (post.excerpt as any)?.[lang] || post.excerpt?.fr || '';
  const paragraphs = (post.content as any)?.[lang] || post.content?.fr || [];
  
  const fullText = [title, excerpt, ...paragraphs].join(' ');
  const words = fullText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  const formatted = lang === 'fr' 
    ? `${minutes} min de lecture` 
    : lang === 'ar'
    ? `${minutes} دقائق قراءة`
    : `${minutes} min read`;

  return {
    minutes,
    wordCount,
    formatted
  };
}

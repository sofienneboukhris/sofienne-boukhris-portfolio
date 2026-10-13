import { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'creation-site-web',
    slug: 'creation-site-web',
    title: {
      fr: 'Création de site web sur mesure',
      en: 'Custom Website Development'
    },
    shortDescription: {
      fr: 'Conception et développement de sites internet modernes, rapides, responsive et pensés pour convertir vos visiteurs.',
      en: 'End-to-end engineering of modern, fast, responsive websites structured to convert your audience.'
    },
    fullDescription: {
      fr: "Que vous partiez d'une idée neuve ou d'un cahier des charges précis, je développe votre site web sur mesure en respectant les standards du web moderne. Chaque ligne de code est écrite pour assurer performance, sécurité, évolutivité et lisibilité maximale sur tous les écrans.",
      en: "From initial concept to production launch, I build bespoke websites respecting modern web standards. Every line of code is crafted to guarantee speed, rock-solid security, maintainability, and seamless responsiveness."
    },
    iconName: 'Globe',
    category: 'web',
    technologies: ['React', 'TypeScript', 'PHP', 'HTML5', 'Tailwind CSS', 'WordPress', 'Laravel'],
    deliverables: {
      fr: [
        'Architecture technique adaptée à vos objectifs réels',
        'Intégration responsive mobile, tablette et desktop',
        'Optimisation SEO On-Page (balises sémantiques, meta, sitemap)',
        'Temps de chargement rapides et respect des Core Web Vitals',
        'Sécurisation SSL, formulaires anti-spam et conformité'
      ],
      en: [
        'Technical architecture matched to your business needs',
        'Fully responsive mobile, tablet, and desktop layout',
        'On-page SEO setup (semantic tags, metadata, XML sitemap)',
        'Lightning fast loading speeds meeting Core Web Vitals',
        'HTTPS security, anti-spam validation, and clean code'
      ]
    },
    benefits: {
      fr: [
        'Interlocuteur unique du premier échange à la mise en ligne',
        'Aucun intermédiaire commercial inutile',
        'Code propre et indépendant, vous restez propriétaire de votre site'
      ],
      en: [
        'Direct collaboration with the senior developer from day one',
        'No agency overhead or sales intermediaries',
        'Clean, open code you fully own without proprietary lock-in'
      ]
    }
  },
  {
    id: 'site-vitrine',
    slug: 'site-vitrine',
    title: {
      fr: 'Création de site vitrine',
      en: 'Business Showcase Website'
    },
    shortDescription: {
      fr: 'Mettez en valeur votre entreprise, vos services et votre savoir-faire avec un site vitrine sobre, élégant et crédible.',
      en: 'Establish a credible, elegant digital presence that clearly presents your company, services, and expertise.'
    },
    fullDescription: {
      fr: "Un site vitrine n'est pas une simple carte de visite numérique : c'est le reflet de votre crédibilité et votre premier levier pour rassurer vos futurs clients. Je conçois des sites vitrines épurés, rapides et ergonomiques qui incitent vos prospects à vous contacter directement.",
      en: "A showcase website is your primary trust anchor. I design minimalist, high-speed, and structured corporate websites that clearly communicate your value and compel prospective clients to reach out."
    },
    iconName: 'Layout',
    category: 'web',
    technologies: ['WordPress', 'HTML5', 'Tailwind CSS', 'JavaScript', 'PHP', 'SEO Local'],
    deliverables: {
      fr: [
        'Pages essentielles : Accueil, Services, Réalisations, À propos, Contact',
        'Formulaires de devis ou prise de contact sécurisés',
        'Liaison directe avec WhatsApp et appel en un clic',
        'Balises locales pour le référencement géographique (Tunisie, Sousse, France, etc.)',
        'Formation pour administrer vos textes et visuels en autonomie'
      ],
      en: [
        'Core pages: Home, Services, Portfolio, About, Contact',
        'Secure quote and contact inquiry workflows',
        'Direct WhatsApp and 1-tap call integrations',
        'Local SEO tags tailored to target geographic areas',
        'Personalized walkthrough so you can easily update content'
      ]
    },
    benefits: {
      fr: [
        'Transmettez une image professionnelle dès la première seconde',
        'Permettez aux prospects de trouver rapidement vos coordonnées',
        'Structure légère sans maintenance lourde'
      ],
      en: [
        'Project professional credibility from the very first second',
        'Ensure prospective clients find your direct contact effortlessly',
        'Lightweight build with minimal maintenance friction'
      ]
    }
  },
  {
    id: 'site-e-commerce',
    slug: 'site-e-commerce',
    title: {
      fr: 'Création de site e-commerce',
      en: 'E-Commerce Store Development'
    },
    shortDescription: {
      fr: 'Lancez ou développez votre boutique en ligne avec un parcours d’achat fluide, sécurisé et pensé pour les ventes.',
      en: 'Launch or scale your online store with a friction-free checkout, secure payments, and high conversion flow.'
    },
    fullDescription: {
      fr: "Vendre en ligne exige une expérience sans friction : recherche produit intuitive, fiches détaillées, panier clair, modes de paiement adaptés et processus de commande sans distraction. Que vous vendiez en Tunisie ou à l'international, je développe votre boutique e-commerce sur mesure.",
      en: "Successful online commerce demands total clarity: intuitive catalog search, rich product detail pages, crystal-clear carts, localized payment gateways, and checkout with zero distractions. I engineer robust e-commerce solutions for domestic and international markets."
    },
    iconName: 'ShoppingBag',
    category: 'ecommerce',
    technologies: ['WooCommerce', 'Shopify', 'PHP', 'Liquid', 'Stripe / Konnect / ClicToPay', 'MySQL'],
    deliverables: {
      fr: [
        'Architecture de catalogue et variantes (tailles, couleurs, options)',
        'Intégration des passerelles de paiement adaptées (carte bancaire, paiement à la livraison, passerelles tunisiennes ou internationales)',
        'Gestion des frais de livraison et transporteurs',
        'Système de notification automatique des commandes (email & SMS/WhatsApp)',
        'Optimisation mobile du tunnel de conversion'
      ],
      en: [
        'Multi-variant product catalog (sizes, colors, custom attributes)',
        'Payment gateway integration (Cards, Cash on Delivery, Stripe, local Tunisian gateways)',
        'Shipping zones and courier rates configuration',
        'Automated order confirmation alerts (Email, WhatsApp/SMS)',
        'Mobile checkout optimization to minimize cart abandonment'
      ]
    },
    benefits: {
      fr: [
        'Parcours d’achat limpide augmentant le taux de conversion',
        'Back-office simple pour gérer vos commandes et stocks',
        'Sécurisation des transactions et conformité des données clients'
      ],
      en: [
        'Frictionless user flow driving higher checkout conversion',
        'Straightforward administrative back-office for orders and inventory',
        'Secure payment handling and customer privacy compliance'
      ]
    }
  },
  {
    id: 'site-e-commerce/woocommerce',
    slug: 'site-e-commerce/woocommerce',
    title: {
      fr: 'Développement WooCommerce',
      en: 'WooCommerce Store Development'
    },
    shortDescription: {
      fr: 'Créez une boutique WooCommerce sur mesure, flexible et sans abonnement mensuel propriétaire récurrent.',
      en: 'Build an open-source, scalable WooCommerce store without proprietary SaaS vendor lock-in.'
    },
    fullDescription: {
      fr: "WooCommerce est la solution e-commerce la plus populaire au monde, offrant une liberté totale sur votre hébergement, vos données et vos fonctionnalités. Je développe des boutiques WooCommerce légères et optimisées, évitant l'accumulation de plugins superflus qui ralentissent les sites.",
      en: "WooCommerce gives you complete sovereignty over your data, hosting, and custom workflows. I craft lightweight WooCommerce stores built with bespoke templates, avoiding the plugin bloat that drags down performance."
    },
    iconName: 'ShoppingCart',
    category: 'ecommerce',
    technologies: ['WordPress', 'WooCommerce', 'PHP', 'MySQL', 'REST API', 'JavaScript'],
    deliverables: {
      fr: [
        'Développement de thème WooCommerce sur mesure ou adaptation avancée',
        'Personnalisation du tunnel de commande (Checkout One-Page possible)',
        'Intégration des paiements locaux et internationaux (Konnect, Flouci, ClicToPay, Stripe, PayPal)',
        'Gestion des stocks, alertes et export comptable',
        'Optimisation de la vitesse et de la base de données'
      ],
      en: [
        'Bespoke WooCommerce theme development or tailored child-theme',
        'Custom checkout engineering (streamlined one-page checkout available)',
        'Integration with local and global payment gateways',
        'Inventory threshold notifications and export flows',
        'Database query optimization and caching setup'
      ]
    },
    benefits: {
      fr: [
        'Contrôle total : vous êtes propriétaire de votre base de données et de vos clients',
        'Coûts d’exploitation maîtrisés sans commissions de plateforme arbitraires',
        'Évolutivité infinie grâce à l’écosystème open-source'
      ],
      en: [
        'Complete ownership of your store database, products, and customer records',
        'Zero mandatory platform commission fees on your revenues',
        'Infinite customization possibilities via modern PHP & open APIs'
      ]
    }
  },
  {
    id: 'site-e-commerce/shopify',
    slug: 'site-e-commerce/shopify',
    title: {
      fr: 'Développement Shopify',
      en: 'Shopify Store Development'
    },
    shortDescription: {
      fr: 'Boutiques Shopify sur mesure, personnalisation de thèmes Liquid et intégration d’applications métier.',
      en: 'Custom Shopify stores, bespoke Liquid theme crafting, and seamless business app integrations.'
    },
    fullDescription: {
      fr: "Pour les marques et commerçants privilégiant un écosystème e-commerce clé en main et hautement fiable, Shopify est une référence. J'interviens pour concevoir votre boutique, personnaliser votre thème en code Liquid, connecter vos outils et optimiser votre expérience client.",
      en: "For merchants seeking a dependable, turnkey managed e-commerce infrastructure, Shopify offers high availability. I engineer custom Shopify storefronts, build custom Liquid sections, configure essential integrations, and optimize mobile buying journeys."
    },
    iconName: 'Store',
    category: 'ecommerce',
    technologies: ['Shopify', 'Liquid', 'JSON Templates', 'Shopify App Store', 'JavaScript', 'CSS3'],
    deliverables: {
      fr: [
        'Configuration complète de votre boutique Shopify',
        'Développement de sections personnalisées en Liquid',
        'Configuration du catalogue, variantes et filtres de collection',
        'Intégration d’applications indispensables (avis vérifiés, WhatsApp, livraison)',
        'Optimisation du score de performance Shopify'
      ],
      en: [
        'Full Shopify store setup and deployment',
        'Custom Liquid section architecture and styling',
        'Collection filtering and variant management setup',
        'Essential app connections (verified reviews, WhatsApp, logistics)',
        'Shopify speed score diagnostics and asset optimization'
      ]
    },
    benefits: {
      fr: [
        'Hébergement sécurisé et géré directement par Shopify',
        'Stabilité garantie lors des pics de ventes et campagnes promotionnelles',
        'Interface d’administration intuitive pour votre équipe'
      ],
      en: [
        'Managed cloud hosting with built-in enterprise reliability',
        'Proven uptime stability during traffic spikes and marketing campaigns',
        'Intuitive back-office dashboard for your fulfillment staff'
      ]
    }
  },
  {
    id: 'wordpress',
    slug: 'wordpress',
    title: {
      fr: 'Développement WordPress sur mesure',
      en: 'Custom WordPress Development'
    },
    shortDescription: {
      fr: 'Sites WordPress sur mesure, sécurisés, légers et faciles à mettre à jour, sans surcharge de constructeurs lourds.',
      en: 'Secure, clean, custom-built WordPress websites designed for effortless editing without slow visual builder bloat.'
    },
    fullDescription: {
      fr: "WordPress propulse plus de 40% du web mondial. Lorsqu'il est développé avec rigueur et des standards de code professionnels, il offre une combinaison imbattable de flexibilité et d'autonomie pour vos équipes. Je développe des sites WordPress sur mesure, rapides et sécurisés.",
      en: "WordPress powers over 40% of the web. When built with clean code and professional standards, it delivers unmatched editorial freedom combined with enterprise performance. I build lean, bulletproof WordPress systems tailored to your workflow."
    },
    iconName: 'FileCode',
    category: 'cms',
    technologies: ['WordPress', 'PHP 8+', 'ACF / Custom Fields', 'JavaScript', 'MySQL', 'REST API'],
    deliverables: {
      fr: [
        'Développement de thèmes WordPress légers et modulaires',
        'Champs personnalisés (Custom Post Types & ACF) adaptés à votre métier',
        'Sécurisation approfondie (pare-feu, masquage des failles, 2FA)',
        'Mise en place de sauvegardes automatiques',
        'Code optimisé pour un score de performance élevé'
      ],
      en: [
        'Lightweight bespoke WordPress themes tailored to your brand',
        'Custom Post Types and custom fields matched to your content structure',
        'Hardened security configuration (firewalls, hardened headers, 2FA)',
        'Automated scheduled off-site backup routines',
        'Clean code scoring high marks on Google PageSpeed'
      ]
    },
    benefits: {
      fr: [
        'Vos collaborateurs modifient facilement textes, photos et articles',
        'Pas de dépendance envers un constructeur visuel lent ou instable',
        'Architecture pérenne et évolutive dans le temps'
      ],
      en: [
        'Non-technical team members update text and media with ease',
        'Zero dependence on fragile, bloated visual site builders',
        'Robust, sustainable codebase built to evolve cleanly over time'
      ]
    }
  },
  {
    id: 'application-web',
    slug: 'application-web',
    title: {
      fr: 'Développement d’application web sur mesure',
      en: 'Custom Web Application Development'
    },
    shortDescription: {
      fr: 'Conception de dashboards, espaces clients, portails métiers et plateformes web sur mesure en React et backend moderne.',
      en: 'Engineering custom client dashboards, portals, and interactive web platforms with React and modern APIs.'
    },
    fullDescription: {
      fr: "Lorsque les CMS classiques atteignent leurs limites, une application web sur mesure est la solution idéale pour digitaliser vos processus d'entreprise. Je conçois des plateformes réactives, robustes et sécurisées répondant exactement à vos règles métier.",
      en: "When standard off-the-shelf CMS solutions fall short, a custom web application empowers your team to automate workflows. I develop reactive, robust, and secure web applications designed specifically around your exact business requirements."
    },
    iconName: 'Cpu',
    category: 'custom',
    technologies: ['React', 'TypeScript', 'NestJS', 'Laravel', 'Node.js', 'PostgreSQL / MySQL', 'REST APIs'],
    deliverables: {
      fr: [
        'Architecture Single-Page Application (SPA) ultra-rapide',
        'Gestion des rôles et permissions utilisateurs (RBAC)',
        'Espaces clients / back-offices d’administration personnalisés',
        'Connexion à des API tierces (ERP, CRM, paiements, emails transactionnels)',
        'Documentation technique et base de données structurée'
      ],
      en: [
        'Ultra-fast Single Page Application (SPA) architecture',
        'Role-based access control and user permission management (RBAC)',
        'Custom business administration back-offices and client portals',
        'Third-party API integrations (ERP, CRM, payment systems, notifications)',
        'Structured database schemas and comprehensive technical documentation'
      ]
    },
    benefits: {
      fr: [
        'Outil développé pour votre organisation, sans compromis',
        'Fluidité d’utilisation immédiate pour vos équipes et clients',
        'Évolutivité modulaire pour accompagner votre croissance'
      ],
      en: [
        'Software tailored specifically to your workflows without compromise',
        'Immediate, app-like speed and desktop responsiveness',
        'Modular scalability ready to support business growth'
      ]
    }
  },
  {
    id: 'developpement-laravel',
    slug: 'developpement-laravel',
    title: {
      fr: 'Développement Laravel & PHP',
      en: 'Laravel & PHP Backend Development'
    },
    shortDescription: {
      fr: 'Développement backend robuste avec Laravel, le framework PHP de référence pour les applications fiables et sécurisées.',
      en: 'Robust backend development using Laravel, the leading PHP framework for secure and maintainable software.'
    },
    fullDescription: {
      fr: "Laravel est reconnu pour son élégance, sa robustesse architecturale et son niveau de sécurité natif. En tant que développeur PHP expérimenté spécialisé dans Laravel, je réalise des API performantes, des back-offices sur mesure et des applications d'entreprise pérennes.",
      en: "Laravel is renowned for its architectural discipline, expressive syntax, and robust security. As a specialized Laravel and PHP engineer, I build high-performance APIs, administrative dashboards, and resilient enterprise applications."
    },
    iconName: 'Terminal',
    category: 'custom',
    technologies: ['Laravel', 'PHP 8+', 'Eloquent ORM', 'MySQL', 'Redis', 'REST API', 'Docker'],
    deliverables: {
      fr: [
        'Architecture MVC propre respectant les bonnes pratiques du framework',
        'Conception d’API REST sécurisées (JWT / Sanctum)',
        'Modélisation relationnelle de bases de données et migrations versionnées',
        'Systèmes d’authentification, réinitialisation de mot de passe et sécurité CSRF',
        'Automatisation de tâches récurrentes (Queues & Cron jobs)'
      ],
      en: [
        'Clean MVC architecture adhering strictly to Laravel design patterns',
        'Secure RESTful APIs built with Laravel Sanctum authentication',
        'Relational database migrations, models, and indexing',
        'Hardened user authentication, password resets, and CSRF protection',
        'Background queue workers and scheduled automated cron jobs'
      ]
    },
    benefits: {
      fr: [
        'Une base de code saine, facile à faire évoluer par n’importe quel développeur',
        'Sécurité de niveau entreprise contre les attaques courantes (injections, failles XSS)',
        'Excellentes performances de traitement de données'
      ],
      en: [
        'Maintainable codebase easily handed over or extended by any senior developer',
        'Enterprise-grade defense against common vulnerabilities (SQL injection, XSS)',
        'Reliable throughput and efficient data processing'
      ]
    }
  },
  {
    id: 'refonte-site-web',
    slug: 'refonte-site-web',
    title: {
      fr: 'Refonte de site web',
      en: 'Website Redesign & Modernization'
    },
    shortDescription: {
      fr: 'Modernisez votre site web obsolète tout en préservant scrupuleusement vos positions et votre historique SEO acquis sur Google.',
      en: 'Upgrade your outdated website while diligently preserving your hard-earned Google SEO rankings and equity.'
    },
    fullDescription: {
      fr: "Un site vieillissant fait perdre des clients et dégrade votre image de marque. Cependant, une refonte mal préparée peut détruire des années de référencement naturel. J'assure une refonte complète : design moderne, code neuf, responsive parfait, tout en mettant en place un plan de redirection 301 rigoureux pour protéger votre trafic.",
      en: "An outdated site drives away potential clients and harms brand perception. However, a careless redesign risks wrecking your historical search rankings. I carry out complete redesigns with modern UI and clean code, backed by strict 301 redirection mapping to protect your traffic."
    },
    iconName: 'RefreshCw',
    category: 'web',
    technologies: ['Plan de Redirection 301', 'Audit UX/UI', 'Google Search Console', 'WordPress', 'Laravel / React'],
    deliverables: {
      fr: [
        'Audit technique et ergonomique du site existant',
        'Plan de maillage et de redirections 301 URL par URL',
        'Refonte visuelle moderne et responsive respectant votre ADN',
        'Migration sécurisée des contenus, articles et bases de données',
        'Suivi post-lancement sur Google Search Console'
      ],
      en: [
        'Comprehensive UX and technical audit of your existing site',
        'Strict URL-by-URL 301 redirect map preventing 404 traffic loss',
        'Modern, mobile-first responsive redesign true to your identity',
        'Secure migration of articles, media assets, and customer records',
        'Post-launch Search Console monitoring and indexing verification'
      ]
    },
    benefits: {
      fr: [
        'Repartez sur des bases techniques saines et pérennes',
        'Améliorez votre taux de conversion sans risquer votre trafic existant',
        'Offrez une expérience contemporaine à vos utilisateurs'
      ],
      en: [
        'Start fresh with a clean, lightweight, and modern codebase',
        'Elevate conversion rates without jeopardizing existing organic visits',
        'Deliver a contemporary experience that positions you ahead of competitors'
      ]
    }
  },
  {
    id: 'maintenance-site-web',
    slug: 'maintenance-site-web',
    title: {
      fr: 'Maintenance de site web',
      en: 'Website Maintenance & Support'
    },
    shortDescription: {
      fr: 'Gardez votre site sécurisé, à jour, surveillé et opérationnel sans vous soucier des pannes techniques.',
      en: 'Keep your web property secure, updated, monitored, and fully operational without technical headaches.'
    },
    fullDescription: {
      fr: "Un site web non maintenu devient vulnérable aux failles de sécurité, aux bugs d'incompatibilité et aux ralentissements. Je prends en charge la maintenance technique préventive et corrective de votre site afin que vous puissiez vous concentrer sur le développement de votre activité.",
      en: "An unmaintained website inevitably accumulates security vulnerabilities, plugin conflicts, and performance regressions. I provide ongoing preventative and corrective technical care so you can focus entirely on running your business."
    },
    iconName: 'ShieldCheck',
    category: 'perf',
    technologies: ['WordPress', 'PHP', 'Sauvegardes Cloud', 'Monitoring Uptime', 'Patchs Sécurité'],
    deliverables: {
      fr: [
        'Mises à jour sécurisées du noyau, des thèmes et des extensions',
        'Sauvegardes automatiques régulières stockées hors-serveur',
        'Monitoring de disponibilité (Uptime) et alertes en cas d’anomalie',
        'Corrections de bugs, incompatibilités et résolutions d’erreurs',
        'Assistance technique directe par WhatsApp et email'
      ],
      en: [
        'Safe, tested updates for core engines, themes, and dependencies',
        'Automated regular off-site backups with instant restoration protocols',
        'Continuous uptime monitoring and instant incident notification',
        'Rapid bug fixing, conflict resolution, and browser compatibility patches',
        'Direct developer support via WhatsApp and dedicated email'
      ]
    },
    benefits: {
      fr: [
        'Sérénité totale : votre outil de travail est protégé en continu',
        'Intervention rapide par un développeur qui connaît votre code',
        'Prévention des pannes coûteuses avant qu’elles n’affectent vos clients'
      ],
      en: [
        'Total peace of mind knowing your digital business is safeguarded',
        'Direct resolution by the developer who actually understands your system',
        'Early prevention of costly downtime before it impacts paying customers'
      ]
    }
  },
  {
    id: 'optimisation-performance',
    slug: 'optimisation-performance',
    title: {
      fr: 'Optimisation des performances web & Core Web Vitals',
      en: 'Speed Optimization & Core Web Vitals'
    },
    shortDescription: {
      fr: 'Accélérez votre site web, améliorez vos Core Web Vitals (LCP, INP, CLS) et gagnez des positions sur Google.',
      en: 'Accelerate your page speed, conquer Core Web Vitals (LCP, INP, CLS), and win better Google search visibility.'
    },
    fullDescription: {
      fr: "Chaque seconde de chargement supplémentaire coûte des visiteurs et fait baisser vos conversions, tout en dégradant votre classement sur Google. J'audite votre site en profondeur et j'applique des optimisations techniques concrètes : compression WebP/AVIF, lazy loading, nettoyage JavaScript/CSS et configuration de cache.",
      en: "Every additional second of load time bleeds visitors and hurts organic ranking. Google explicitly evaluates Core Web Vitals as ranking factors. I audit your website thoroughly and execute targeted speed optimizations: modern image formats, lazy loading, asset minification, and advanced caching."
    },
    iconName: 'Zap',
    category: 'perf',
    technologies: ['WebP / AVIF', 'Core Web Vitals (LCP, INP, CLS)', 'Cache Serveur & Navigateur', 'Minification JS/CSS', 'CDN'],
    deliverables: {
      fr: [
        'Audit complet des Core Web Vitals (LCP, INP, CLS)',
        'Conversion et compression des images aux formats modernes (WebP, AVIF)',
        'Mise en place du lazy loading natif sur les images et iframes',
        'Minification et élimination du JavaScript et CSS non utilisés',
        'Configuration du cache navigateur, compression Gzip/Brotli et headers HTTP'
      ],
      en: [
        'Complete Core Web Vitals audit and diagnostic report',
        'Image compression and conversion to next-gen WebP/AVIF formats',
        'Native lazy-loading for off-screen images and embedded media',
        'Minification and cleanup of render-blocking JavaScript and CSS',
        'Browser caching, Gzip/Brotli compression, and optimized HTTP headers'
      ]
    },
    benefits: {
      fr: [
        'Expérience utilisateur ultra-fluide, particulièrement sur smartphones 4G',
        'Impact direct et mesurable sur le référencement naturel Google',
        'Réduction du taux de rebond et augmentation des conversions'
      ],
      en: [
        'Snappy user experience, especially on mobile devices on mobile connections',
        'Direct, positive impact on organic Google ranking signals',
        'Lower bounce rates and improved inquiry conversion percentages'
      ]
    }
  }
];

import {
  ProjectTypeOption,
  FeatureOption,
  DesignLevelOption,
  TimelineOption,
  SupportLevelOption,
  Currency
} from '../types/calculator';

export const PRICE_PER_EXTRA_PAGE_EUR = 50;
export const PRICE_PER_EXTRA_PAGE_TND = 160;

export const EUR_TO_TND_RATE = 3.35;

export const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: 'vitrine',
    title: {
      fr: 'Site Vitrine Professionnel',
      en: 'Showcase Website'
    },
    subtitle: {
      fr: 'Présentation & Notoriété',
      en: 'Brand Presence & Trust'
    },
    description: {
      fr: 'Idéal pour présenter votre entreprise, vos services, crédibiliser votre marque et générer des prises de contact qualifiées.',
      en: 'Ideal for establishing a credible company presence, showcasing services, and generating qualified inquiries.'
    },
    icon: 'Globe',
    basePriceUSD: Math.round(650 * 1.1),
    basePriceTND: 1800,
    basePriceEUR: 650,
    basePriceGBP: Math.round(650 * 0.85),
    basePriceCAD: Math.round(650 * 1.45),
    basePages: 5,
    popular: true
  },
  {
    id: 'ecommerce',
    title: {
      fr: 'Boutique E-Commerce',
      en: 'E-Commerce Store'
    },
    subtitle: {
      fr: 'Vente en ligne & Paiement',
      en: 'Online Sales & Gateways'
    },
    description: {
      fr: 'Catalogue de produits, panier d’achat, passerelles de paiement sécurisées (Stripe, Konnect, ClicToPay) et gestion des commandes.',
      en: 'Complete online catalog, shopping cart, secure payment gateways, inventory sync, and conversion-focused checkout.'
    },
    icon: 'ShoppingBag',
    basePriceUSD: Math.round(1250 * 1.1),
    basePriceTND: 3600,
    basePriceEUR: 1250,
    basePriceGBP: Math.round(1250 * 0.85),
    basePriceCAD: Math.round(1250 * 1.45),
    basePages: 8,
    popular: true
  },
  {
    id: 'webapp',
    title: {
      fr: 'Application Web / SaaS',
      en: 'Custom Web App / SaaS'
    },
    subtitle: {
      fr: 'Logique métier & Plateforme',
      en: 'Bespoke Logic & Portals'
    },
    description: {
      fr: 'Plateforme sur mesure avec espace client, tableaux de bord interactifs, base de données relationnelle et logique métier avancée.',
      en: 'Tailored application with authenticated portals, dynamic dashboards, relational database, and custom business logic.'
    },
    icon: 'Cpu',
    basePriceUSD: Math.round(1850 * 1.1),
    basePriceTND: 5400,
    basePriceEUR: 1850,
    basePriceGBP: Math.round(1850 * 0.85),
    basePriceCAD: Math.round(1850 * 1.45),
    basePages: 6
  },
  {
    id: 'landing',
    title: {
      fr: 'Landing Page Haute Conversion',
      en: 'High-Converting Landing Page'
    },
    subtitle: {
      fr: 'Page unique & Campagnes',
      en: 'Single Page & Ads'
    },
    description: {
      fr: 'Une page unique ultra-percutante conçue pour maximiser le taux de conversion de vos campagnes publicitaires ou le lancement d’un produit.',
      en: 'A high-impact, single-page experience crafted to maximize conversion rates for marketing campaigns or product launches.'
    },
    icon: 'Target',
    basePriceUSD: Math.round(450 * 1.1),
    basePriceTND: 1300,
    basePriceEUR: 450,
    basePriceGBP: Math.round(450 * 0.85),
    basePriceCAD: Math.round(450 * 1.45),
    basePages: 1
  },
  {
    id: 'institutionnel',
    title: {
      fr: 'Site Institutionnel & Corporate',
      en: 'Corporate & Institutional Portal'
    },
    subtitle: {
      fr: 'Grande structure & Multi-services',
      en: 'Enterprises & Organizations'
    },
    description: {
      fr: 'Pour organisations, groupes et PME nécessitant une hiérarchie poussée, gouvernance, espace presse et fiches de présentation denses.',
      en: 'Engineered for larger organizations requiring structured governance, press releases, multi-branch directories, and compliance.'
    },
    icon: 'Building2',
    basePriceUSD: Math.round(1450 * 1.1),
    basePriceTND: 4200,
    basePriceEUR: 1450,
    basePriceGBP: Math.round(1450 * 0.85),
    basePriceCAD: Math.round(1450 * 1.45),
    basePages: 10
  },
  {
    id: 'refonte',
    title: {
      fr: 'Refonte & Modernisation Web',
      en: 'Website Redesign & Speedup'
    },
    subtitle: {
      fr: 'Optimisation & Performance',
      en: 'Performance & Visual Upgrade'
    },
    description: {
      fr: 'Modernisation complète de votre site existant : nouveau design responsive, accélération du temps de chargement et correction du SEO.',
      en: 'Complete visual and technical overhaul of an existing site: modern responsive design, ultra-fast loading, and SEO fix.'
    },
    icon: 'RefreshCw',
    basePriceUSD: Math.round(750 * 1.1),
    basePriceTND: 2200,
    basePriceEUR: 750,
    basePriceGBP: Math.round(750 * 0.85),
    basePriceCAD: Math.round(750 * 1.45),
    basePages: 6
  },
  {
    id: 'sur-mesure',
    title: {
      fr: 'Projet Spécifique & Sur-Mesure',
      en: 'Bespoke Custom Solution'
    },
    subtitle: {
      fr: 'Cahier des charges libre',
      en: 'Tailored Specifications'
    },
    description: {
      fr: 'Projet atypique ou nécessitant des intégrations complexes, des connexions API tierces ou un développement full-stack propriétaire.',
      en: 'Complex requirements requiring custom third-party API orchestration, ERP connections, or proprietary full-stack development.'
    },
    icon: 'Sparkles',
    basePriceUSD: Math.round(1600 * 1.1),
    basePriceTND: 4800,
    basePriceEUR: 1600,
    basePriceGBP: Math.round(1600 * 0.85),
    basePriceCAD: Math.round(1600 * 1.45),
    basePages: 6
  }
];

export const FEATURES: FeatureOption[] = [
  {
    id: 'contact_form_advanced',
    category: 'core',
    title: {
      fr: 'Formulaire de devis / contact avancé',
      en: 'Advanced Quote & Contact Form'
    },
    description: {
      fr: 'Champs conditionnels dynamiques, validation temps réel, notifications par email et protection anti-spam sans captcha intrusif.',
      en: 'Dynamic conditional logic, real-time input validation, automated email notifications, and invisible anti-spam.'
    },
    icon: 'Mail',
    priceUSD: Math.round(80 * 1.1),
    priceTND: 250,
    priceEUR: 80,
    priceGBP: Math.round(80 * 0.85),
    priceCAD: Math.round(80 * 1.45),
    recommendedFor: ['vitrine', 'institutionnel', 'landing']
  },
  {
    id: 'blog_seo',
    category: 'content',
    title: {
      fr: 'Blog & Stratégie de contenu SEO',
      en: 'SEO Blog & Editorial Engine'
    },
    description: {
      fr: 'Module d’articles avec catégories, recherche, pagination, balisage Schema.org pour le référencement et partage réseaux sociaux.',
      en: 'Blog system with categories, search, pagination, OpenGraph social cards, and Schema.org structured data for SEO.'
    },
    icon: 'BookOpen',
    priceUSD: Math.round(190 * 1.1),
    priceTND: 550,
    priceEUR: 190,
    priceGBP: Math.round(190 * 0.85),
    priceCAD: Math.round(190 * 1.45),
    recommendedFor: ['vitrine', 'ecommerce', 'institutionnel']
  },
  {
    id: 'booking_calendar',
    category: 'core',
    title: {
      fr: 'Système de réservation & Rendez-vous',
      en: 'Online Appointment & Booking'
    },
    description: {
      fr: 'Calendrier interactif synchronisé avec Google Calendar / Calendly pour prise de rendez-vous en ligne automatique.',
      en: 'Interactive booking calendar synced with Google Calendar / Calendly for automatic appointment management.'
    },
    icon: 'Calendar',
    priceUSD: Math.round(220 * 1.1),
    priceTND: 650,
    priceEUR: 220,
    priceGBP: Math.round(220 * 0.85),
    priceCAD: Math.round(220 * 1.45)
  },
  {
    id: 'payment_gateway',
    category: 'commerce',
    title: {
      fr: 'Paiement en ligne sécurisé',
      en: 'Secure Online Payment Gateway'
    },
    description: {
      fr: 'Intégration Stripe, PayPal, Konnect, ClicToPay ou Flouci avec confirmation automatique de transaction et reçus par e-mail.',
      en: 'Integration of Stripe, PayPal, Konnect, ClicToPay, or Flouci with instant webhooks and receipt dispatch.'
    },
    icon: 'CreditCard',
    priceUSD: Math.round(280 * 1.1),
    priceTND: 800,
    priceEUR: 280,
    priceGBP: Math.round(280 * 0.85),
    priceCAD: Math.round(280 * 1.45),
    recommendedFor: ['ecommerce', 'webapp']
  },
  {
    id: 'member_area',
    category: 'tech',
    title: {
      fr: 'Espace membre & Authentification',
      en: 'Member Portal & Auth System'
    },
    description: {
      fr: 'Comptes utilisateurs, connexion sécurisée, profils personnalisés, réinitialisation de mot de passe et contenus restreints.',
      en: 'User accounts, secure authentication, password reset flows, custom profile pages, and gated content.'
    },
    icon: 'UserCheck',
    priceUSD: Math.round(360 * 1.1),
    priceTND: 1100,
    priceEUR: 360,
    priceGBP: Math.round(360 * 0.85),
    priceCAD: Math.round(360 * 1.45),
    recommendedFor: ['webapp', 'institutionnel']
  },
  {
    id: 'multilingual',
    category: 'core',
    title: {
      fr: 'Site Multilingue (FR / EN / AR)',
      en: 'Multilingual Support (FR / EN / AR)'
    },
    description: {
      fr: 'Structure bilingue ou trilingue avec sélecteur de langue intuitif, URL dédiées et balises hreflang optimisées pour le SEO international.',
      en: 'Bilingual or trilingual setup with seamless language switcher, localized URLs, and hreflang meta tags for international SEO.'
    },
    icon: 'Languages',
    priceUSD: Math.round(240 * 1.1),
    priceTND: 700,
    priceEUR: 240,
    priceGBP: Math.round(240 * 0.85),
    priceCAD: Math.round(240 * 1.45),
    recommendedFor: ['vitrine', 'ecommerce', 'institutionnel']
  },
  {
    id: 'cms_admin',
    category: 'content',
    title: {
      fr: 'CMS Administrable en totale autonomie',
      en: 'Self-Managed CMS Admin Panel'
    },
    description: {
      fr: 'Interface de gestion intuitive (WordPress sur mesure ou Headless CMS) vous permettant de modifier textes, images et prix sans code.',
      en: 'User-friendly back-office (custom WordPress or Headless CMS) allowing you to edit texts, images, and pricing without coding.'
    },
    icon: 'Layers',
    priceUSD: Math.round(250 * 1.1),
    priceTND: 750,
    priceEUR: 250,
    priceGBP: Math.round(250 * 0.85),
    priceCAD: Math.round(250 * 1.45),
    recommendedFor: ['vitrine', 'ecommerce', 'institutionnel']
  },
  {
    id: 'advanced_animations',
    category: 'tech',
    title: {
      fr: 'Animations avancées & Micro-interactions',
      en: 'Fluid Animations & Motion UI'
    },
    description: {
      fr: 'Transitions de pages fluides, animations de défilement immersives (scroll reveal, typographie animée) pour un rendu haut de gamme.',
      en: 'Smooth page transitions, immersive scroll reveal effects, and refined micro-interactions for a high-end luxury feel.'
    },
    icon: 'Sparkles',
    priceUSD: Math.round(210 * 1.1),
    priceTND: 600,
    priceEUR: 210,
    priceGBP: Math.round(210 * 0.85),
    priceCAD: Math.round(210 * 1.45)
  },
  {
    id: 'api_integration',
    category: 'tech',
    title: {
      fr: 'Intégration API & Synchronisation CRM',
      en: 'API Integrations & CRM Sync'
    },
    description: {
      fr: 'Connexion de votre site à des outils tiers : HubSpot, Mailchimp, ERP de facturation, WhatsApp API ou bases de données externes.',
      en: 'Connect your website to third-party tools: HubSpot, Mailchimp, accounting ERP, WhatsApp Business API, or external databases.'
    },
    icon: 'Share2',
    priceUSD: Math.round(320 * 1.1),
    priceTND: 950,
    priceEUR: 320,
    priceGBP: Math.round(320 * 0.85),
    priceCAD: Math.round(320 * 1.45),
    recommendedFor: ['webapp', 'ecommerce']
  },
  {
    id: 'advanced_seo',
    category: 'marketing',
    title: {
      fr: 'SEO Technique Avancé & Core Web Vitals',
      en: 'Advanced Technical SEO & Speed Audit'
    },
    description: {
      fr: 'Optimisation poussée des performances (score Google 90+), sitemap XML, robots.txt, balisage Schema.org et structure sémantique.',
      en: 'Extreme performance optimization (90+ Google score), XML sitemap, schema markup, and optimized semantic structure.'
    },
    icon: 'TrendingUp',
    priceUSD: Math.round(260 * 1.1),
    priceTND: 750,
    priceEUR: 260,
    priceGBP: Math.round(260 * 0.85),
    priceCAD: Math.round(260 * 1.45),
    recommendedFor: ['vitrine', 'ecommerce', 'refonte']
  },
  {
    id: 'newsletter_capture',
    category: 'marketing',
    title: {
      fr: 'Capture de leads & Newsletter',
      en: 'Lead Magnet & Email Newsletter'
    },
    description: {
      fr: 'Formulaires d’inscription élégants connectés à Brevo (Sendinblue), Mailchimp ou ActiveCampaign avec email de bienvenue automatisé.',
      en: 'Polished opt-in forms connected to Brevo, Mailchimp, or ActiveCampaign with automated welcome email workflow.'
    },
    icon: 'Send',
    priceUSD: Math.round(120 * 1.1),
    priceTND: 350,
    priceEUR: 120,
    priceGBP: Math.round(120 * 0.85),
    priceCAD: Math.round(120 * 1.45)
  },
  {
    id: 'live_search',
    category: 'tech',
    title: {
      fr: 'Moteur de recherche instantané',
      en: 'Real-Time Instant Site Search'
    },
    description: {
      fr: 'Recherche rapide en direct avec palette de commande (Cmd+K), filtres par catégories et mise en surbrillance des mots-clés.',
      en: 'Fast real-time search with command palette (Cmd+K), category filters, and instant keyword highlighting.'
    },
    icon: 'Search',
    priceUSD: Math.round(150 * 1.1),
    priceTND: 450,
    priceEUR: 150,
    priceGBP: Math.round(150 * 0.85),
    priceCAD: Math.round(150 * 1.45)
  }
];

export const DESIGN_LEVELS: DesignLevelOption[] = [
  {
    id: 'template',
    title: {
      fr: 'Design Moderne Standard',
      en: 'Modern Standard Design'
    },
    description: {
      fr: 'Base moderne et propre avec personnalisation soignée de votre charte graphique (couleurs, typographies, logo).',
      en: 'Clean, modern foundation customized with your brand palette, fonts, and imagery.'
    },
    multiplier: 1.0,
    badge: {
      fr: 'Inclus',
      en: 'Included'
    }
  },
  {
    id: 'custom',
    title: {
      fr: 'Design Sur-Mesure Haute Définition',
      en: 'Bespoke High-Definition UI/UX'
    },
    description: {
      fr: 'Conception personnalisée avec maquettage préalable (Figma), travail d’ergonomie UI/UX et identité visuelle affirmée.',
      en: 'Fully custom UI/UX design with Figma wireframing, bespoke layout composition, and refined ergonomics.'
    },
    multiplier: 1.25,
    badge: {
      fr: '+25% • Recommandé',
      en: '+25% • Recommended'
    }
  },
  {
    id: 'artistic',
    title: {
      fr: 'Direction Artistique Premium & 3D',
      en: 'Luxury Art Direction & Motion'
    },
    description: {
      fr: 'Expérience visuelle exclusive digne des meilleurs studios : typographie d’exception, micro-interactions complexes et direction artistique haut de gamme.',
      en: 'Exclusive agency-grade visual design: exceptional typography, bespoke vectors, and motion art direction.'
    },
    multiplier: 1.45,
    badge: {
      fr: '+45% • Exclusif',
      en: '+45% • Exclusive'
    }
  }
];

export const TIMELINES: TimelineOption[] = [
  {
    id: 'standard',
    title: {
      fr: 'Délai Standard',
      en: 'Standard Timeline'
    },
    deliveryTime: {
      fr: '4 à 6 semaines',
      en: '4 to 6 weeks'
    },
    description: {
      fr: 'Rythme optimal permettant un cadrage soigné, des retours réguliers et un contrôle qualité rigoureux avant la mise en ligne.',
      en: 'Optimal pace ensuring thoughtful iterations, client feedback cycles, and thorough QA prior to launch.'
    },
    multiplier: 1.0,
    badge: {
      fr: 'Recommandé',
      en: 'Recommended'
    }
  },
  {
    id: 'fast',
    title: {
      fr: 'Délai Accéléré',
      en: 'Fast-Track Sprint'
    },
    deliveryTime: {
      fr: '2 à 3 semaines',
      en: '2 to 3 weeks'
    },
    description: {
      fr: 'Planning resserré avec créneaux de travail prioritaires pour les projets devant être déployés rapidement.',
      en: 'Tight schedule with dedicated development hours for time-sensitive launches.'
    },
    multiplier: 1.2,
    badge: {
      fr: '+20% sprint',
      en: '+20% sprint'
    }
  },
  {
    id: 'express',
    title: {
      fr: 'Sprint Urgent Express',
      en: 'Express Priority Launch'
    },
    deliveryTime: {
      fr: '7 à 12 jours',
      en: '7 to 12 days'
    },
    description: {
      fr: 'Priorité absolue sur le planning, disponibilité continue et livraisons quotidiennes pour un lancement immédiat.',
      en: 'Top priority queue, non-stop development focus, and daily checkpoints for emergency launches.'
    },
    multiplier: 1.4,
    badge: {
      fr: '+40% urgent',
      en: '+40% urgent'
    }
  }
];

export const SUPPORT_LEVELS: SupportLevelOption[] = [
  {
    id: 'doc',
    title: {
      fr: 'Documentation Vidéo & Guide de Prise en Main',
      en: 'Video Tutorials & Handover Guide'
    },
    description: {
      fr: 'Tutoriels vidéo sur mesure (Loom) et guide pas à pas pour administrer votre site en toute tranquillité.',
      en: 'Bespoke Loom video walkthroughs and a step-by-step PDF guide to effortlessly operate your website.'
    },
    priceUSD: Math.round(0 * 1.1),
    priceTND: 0,
    priceEUR: 0,
    priceGBP: Math.round(0 * 0.85),
    priceCAD: Math.round(0 * 1.45)
  },
  {
    id: 'training',
    title: {
      fr: 'Formation Visio Dédiée (2h) + Support 30 Jours',
      en: 'Live 1-on-1 Video Training (2h) + 30 Days Support'
    },
    description: {
      fr: 'Session de formation en direct en visio pour votre équipe avec questions-réponses et support prioritaire 30 jours après la mise en ligne.',
      en: 'Live video training call for you and your staff with Q&A and priority bugfix support for 30 days.'
    },
    priceUSD: Math.round(150 * 1.1),
    priceTND: 450,
    priceEUR: 150,
    priceGBP: Math.round(150 * 0.85),
    priceCAD: Math.round(150 * 1.45)
  },
  {
    id: 'vip',
    title: {
      fr: 'Accompagnement VIP & Maintenance 3 Mois',
      en: 'VIP Guidance & 3-Month Maintenance'
    },
    description: {
      fr: 'Support prioritaire par WhatsApp / Téléphone, sauvegardes hebdomadaires, mises à jour techniques et assistance continue pendant 3 mois.',
      en: 'Direct phone & WhatsApp hotline, weekly backups, security patches, and hands-on assistance for 3 months.'
    },
    priceUSD: Math.round(390 * 1.1),
    priceTND: 1200,
    priceEUR: 390,
    priceGBP: Math.round(390 * 0.85),
    priceCAD: Math.round(390 * 1.45)
  }
];

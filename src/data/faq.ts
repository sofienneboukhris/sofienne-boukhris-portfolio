import { FAQItem } from '../types';

export const FAQS: FAQItem[] = [
  {
    question: {
      fr: "Combien coûte la création d'un site web et quel est votre tarif freelance (TJM ou forfait) ?",
      en: "How much does a website cost and what is your freelance rate (TJM or fixed price)?"
    },
    answer: {
      fr: "Le coût dépend de la complexité du projet : nombre de pages, fonctionnalités sur mesure, CMS choisi (WordPress, Shopify, application Laravel/React) et intégrations tierces. Je travaille principalement au forfait fixe avec un devis détaillé sans frais cachés (ex. site vitrine à partir de 600€, e-commerce dès 1200€). Pour les missions de renfort technique ou les régies au long cours, mon Taux Journalier Moyen (TJM) est adapté à la durée du contrat.",
      en: "Cost depends on project scope: total pages, bespoke features, tech stack (WordPress, Shopify, custom Laravel/React), and third-party integrations. I predominantly work on a transparent fixed-price quote with zero hidden fees (e.g. showcase sites from €600, e-commerce from €1,200). For ongoing engineering sprints or contract reinforcement, my Daily Rate (TJM) is tailored to the project duration."
    },
    category: 'tarifs'
  },
  {
    question: {
      fr: "Pourquoi faire appel à un développeur web freelance plutôt qu'à une agence web ?",
      en: "Why hire a freelance web developer instead of a digital agency?"
    },
    answer: {
      fr: "Faire appel à un freelance senior offre trois atouts majeurs : 1. Un interlocuteur unique et direct sans intermédiaire (chef de projet junior ou commercial), 2. Des tarifs 30% à 50% plus compétitifs grâce à des frais de structure réduits, 3. Une réactivité et une flexibilité maximales pour adapter votre projet en temps réel.",
      en: "Partnering with an independent senior developer provides three key advantages: 1. A single direct technical contact without bureaucratic account managers, 2. Transparent rates 30% to 50% lower due to zero agency overhead, 3. High agility and responsiveness to adapt requirements quickly."
    },
    category: 'process'
  },
  {
    question: {
      fr: "Combien de temps faut-il pour créer et mettre en ligne un site web ?",
      en: "How long does it take to deliver and launch a website?"
    },
    answer: {
      fr: "Pour un site vitrine professionnel sur mesure, comptez généralement entre 2 et 3 semaines. Pour une boutique en ligne e-commerce (Shopify ou WooCommerce), le délai moyen est de 3 à 6 semaines. Pour une application web sur mesure (Laravel, React, API), le planning est découpé en jalons itératifs de 4 à 8 semaines avec validation progressive.",
      en: "A professional showcase website is typically delivered within 2 to 3 weeks. An e-commerce store (Shopify or WooCommerce) averages 3 to 6 weeks. For a custom web application (Laravel, React, REST APIs), the timeline is structured into iterative 4 to 8-week delivery milestones."
    },
    category: 'general'
  },
  {
    question: {
      fr: "Suis-je propriétaire à 100% de mon site web et de son code source ?",
      en: "Do I own 100% of my website, database, and source code?"
    },
    answer: {
      fr: "Oui, à 100%. Contrairement aux plateformes propriétaires fermées (Wix, Squarespace) ou certaines agences qui facturent des licences captives, vous êtes l'unique propriétaire de votre nom de domaine, de vos fichiers sources, de votre base de données et de vos accès administrateurs, sans engagement ni abonnement forcé.",
      en: "Yes, 100%. Unlike closed proprietary platforms (Wix, Squarespace) or restrictive agency retainer lock-ins, you possess full intellectual property rights, source code, database dumps, and root admin credentials with zero vendor lock-in."
    },
    category: 'process'
  },
  {
    question: {
      fr: "WordPress, Shopify ou développement sur mesure (Laravel / React) : comment choisir ?",
      en: "WordPress, Shopify, or Custom Stack (Laravel / React): how to choose?"
    },
    answer: {
      fr: "Le choix dépend de vos objectifs : WordPress est idéal pour les sites vitrines, blogs et portails de contenu évolutifs avec autonomie d'administration. Shopify ou WooCommerce conviennent aux boutiques marchandes avec paiements sécurisés et gestion de stocks. Laravel et React sont recommandés pour les applications SaaS, portails clients, back-offices métiers et projets exigeant des fonctionnalités uniques.",
      en: "The right choice depends on your business goals: WordPress is ideal for content-heavy showcase sites and blogs with easy admin autonomy. Shopify and WooCommerce power robust e-commerce stores with localized payments. Laravel and React excel for SaaS apps, client portals, internal dashboards, and complex logic."
    },
    category: 'technical'
  },
  {
    question: {
      fr: "Comment garantissez-vous le bon référencement naturel (SEO technique) et la visibilité sur Google ?",
      en: "How do you guarantee technical SEO and high visibility on Google?"
    },
    answer: {
      fr: "Le SEO technique est intégré nativement dès la première ligne de code : balisage sémantique HTML5 (H1, H2, H3), meta-titres et descriptions personnalisés, balisage Schema.org JSON-LD (FAQPage, Person, WebSite, Service), sitemap XML dynamique, configuration robots.txt, compression d'images WebP et optimisation du crawl Googlebot.",
      en: "Technical SEO is built into the architecture from ground zero: semantic HTML5 hierarchies, tailored meta descriptions, Schema.org JSON-LD microdata (FAQPage, Person, WebSite, Service), dynamic XML sitemaps, robots.txt directives, WebP compression, and optimal crawl budget efficiency."
    },
    category: 'seo'
  },
  {
    question: {
      fr: "Comment optimisez-vous la vitesse de chargement et les scores Google Core Web Vitals ?",
      en: "How do you optimize page speed and Google Core Web Vitals scores?"
    },
    answer: {
      fr: "J'applique les meilleures pratiques de performance web : réduction et minification des scripts CSS/JS, élimination des ressources qui bloquent le rendu (LCP), optimisation de l'interactivité (INP), mise en cache serveur avancée (Redis/OPcache/Varnish), formats d'images nouvelle génération (WebP/AVIF) et dimensionnement strict pour éviter les décalages de mise en page (CLS < 0.1).",
      en: "I implement cutting-edge performance best practices: script minification, elimination of render-blocking CSS/JS to boost LCP, interaction optimization for INP, server-side caching (Redis/OPcache), next-gen image compression (WebP/AVIF), and layout shift prevention (CLS < 0.1)."
    },
    category: 'seo'
  },
  {
    question: {
      fr: "Travaillez-vous avec des clients en France, en Belgique, en Suisse et à l'international ?",
      en: "Do you work with clients in France, Belgium, Switzerland, and internationally?"
    },
    answer: {
      fr: "Oui, la majorité de mes clients sont situés en France, en Belgique, en Suisse et au Canada. Grâce au même fuseau horaire (CET / UTC+1) et à une maîtrise parfaite du français et de l'anglais, la collaboration à distance est fluide via Google Meet, Slack, WhatsApp, Trello et GitHub.",
      en: "Yes, the majority of my clients are located in France, Belgium, Switzerland, and Canada. Operating on the European timezone (CET / UTC+1) with bilingual fluency in French and English, remote coordination runs seamlessly via Google Meet, Slack, WhatsApp, and GitHub."
    },
    category: 'process'
  },
  {
    question: {
      fr: "Quelles sont les étapes d'un projet de développement web, du devis à la mise en ligne ?",
      en: "What are the stages of a web development project, from quote to launch?"
    },
    answer: {
      fr: "Mon processus se déroule en 5 étapes rigoureuses : 1. Cadrage technique et cahier des charges, 2. Wireframes et maquettes UI/UX, 3. Développement et intégration responsive sur serveur de préproduction, 4. Tests qualité, recette client et optimisation SEO, 5. Déploiement en production, configuration DNS et formation à l'administration.",
      en: "My process follows 5 proven phases: 1. Technical scoping & specification requirements, 2. UI/UX wireframes & design mockups, 3. Responsive coding on a staging sandbox, 4. Quality assurance, cross-device testing & SEO checklist, 5. Production deployment, DNS cutover & admin training."
    },
    category: 'process'
  },
  {
    question: {
      fr: "Comment assurez-vous la sécurité contre le piratage et les failles web ?",
      en: "How do you protect websites against hacking and security vulnerabilities?"
    },
    answer: {
      fr: "La sécurité est primordiale : certificats SSL/HTTPS systématiques, protection contre les attaques par force brute et injections SQL, validation CSRF/XSS, masquage des versions serveur, pare-feu applicatif (WAF), mots de passe hachés (bcrypt/Argon2) et sélection stricte d'extensions vérifiées et maintenues.",
      en: "Security is non-negotiable: mandatory SSL/HTTPS certificates, protection against brute-force and SQL injection attacks, CSRF/XSS token validation, server header masking, Web Application Firewalls (WAF), secure bcrypt/Argon2 hashing, and strict auditing of third-party plugins."
    },
    category: 'support'
  },
  {
    question: {
      fr: "Proposez-vous un contrat de maintenance technique et de sauvegarde après le lancement ?",
      en: "Do you offer technical maintenance and backup agreements after launch?"
    },
    answer: {
      fr: "Oui. Je propose des formules de maintenance mensuelle ou annuelle incluant les sauvegardes externalisées quotidiennes, la surveillance de disponibilité 24/7 (uptime monitoring), les mises à jour du CMS et des plugins avec tests de non-régression, et une assistance prioritaire en cas d'urgence.",
      en: "Yes. I provide monthly or annual maintenance agreements covering daily off-site cloud backups, 24/7 uptime monitoring, non-breaking core & plugin security updates, and priority developer troubleshooting."
    },
    category: 'support'
  },
  {
    question: {
      fr: "Pouvez-vous reprendre, déboguer et moderniser un site web existant ?",
      en: "Can you take over, debug, and modernize an existing website?"
    },
    answer: {
      fr: "Oui. J'interviens régulièrement pour réaliser un audit de code sur des sites existants, corriger des erreurs PHP ou JavaScript, améliorer la sécurité, accélérer les temps de chargement ou ajouter de nouvelles fonctionnalités sans devoir tout reconstruire à zéro.",
      en: "Yes. I routinely conduct code audits on legacy websites to resolve PHP/JavaScript errors, patch security vulnerabilities, accelerate page load times, or introduce new features without necessarily rebuilding from scratch."
    },
    category: 'technical'
  },
  {
    question: {
      fr: "Le site sera-t-il parfaitement responsive et optimisé pour mobile et tablette ?",
      en: "Will the website be fully responsive across mobile, tablet, and desktop?"
    },
    answer: {
      fr: "Oui, absolument. Tous les sites sont conçus selon l'approche 'Mobile-First'. Ils sont rigoureusement testés sur iPhone, Android, iPad et grands écrans pour garantir une ergonomie tactile parfaite, des polices lisibles et des menus fluides sans zoom nécessaire.",
      en: "Yes, absolutely. All websites follow a strict Mobile-First design methodology and are thoroughly tested across iOS, Android, tablets, and high-resolution displays to guarantee touch-friendly ergonomics, fluid typography, and snappy navigation."
    },
    category: 'technical'
  },
  {
    question: {
      fr: "Pouvez-vous développer des API REST et des tableaux de bord sur mesure (Laravel / React) ?",
      en: "Can you develop custom REST APIs and back-office portals (Laravel / React)?"
    },
    answer: {
      fr: "Oui. Au-delà des CMS, je conçois des architectures full-stack complètes : API REST sécurisées avec Laravel (Sanctum/Passport), bases de données relationnelles PostgreSQL/MySQL optimisées, et interfaces React dynamiques avec TypeScript et Tailwind CSS.",
      en: "Yes. Beyond CMS platforms, I architect full-stack solutions: secure REST APIs built with Laravel (Sanctum/Passport), optimized relational PostgreSQL/MySQL schemas, and reactive TypeScript/Tailwind interfaces."
    },
    category: 'technical'
  }
];


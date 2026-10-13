import { Language } from '../types';

export const TRANSLATIONS = {
  fr: {
    nav: {
      home: 'Accueil',
      services: 'Services',
      projects: 'Réalisations',
      pricing: 'Tarifs',
      about: 'À propos',
      faq: 'FAQ',
      contact: 'Contact',
      blog: 'Blog',
      localTunisie: 'Tunisie',
      localSousse: 'Sousse',
      ctaQuote: 'Demander un devis'
    },
    hero: {
      tag: 'Full-Stack Development · Web Integration · WordPress · Shopify · Laravel',
      greeting: 'Bonjour, je suis',
      name: 'Sofienne Boukhris',
      role: 'Freelance Full-Stack Web Developer',
      tagline: 'Je conçois et développe des sites web et applications sur mesure, rapides, accessibles et optimisés pour le référencement.',
      location: 'Sousse, Tunisie · Disponible à distance',
      availability: 'Disponible pour de nouveaux projets',
      ctaPrimary: 'Demander un devis',
      ctaSecondary: 'Voir mes réalisations',
      ctaDiscuss: 'Discuter de mon projet'
    },
    profileCard: {
      role: 'Freelance Web Developer',
      location: 'Sousse, Tunisie',
      status: 'Disponible pour nouveaux projets',
      email: 'hello@sofienneboukhris.com',
      phone: '+216 53 742 140',
      whatsapp: 'WhatsApp direct',
      experienceBadge: '5+ ans d’expérience',
      skillsTitle: 'Compétences clés',
      actionQuote: 'Demander un devis',
      actionWhatsapp: 'Discuter sur WhatsApp'
    },
    sections: {
      storyNumber: '01',
      storyTitle: 'Mon approche & profil',
      servicesNumber: '02',
      servicesTitle: 'Ce que je fais',
      techNumber: '03',
      techTitle: 'Technologies & Outils',
      portfolioNumber: '04',
      portfolioTitle: 'Réalisations récentes',
      testimonialsNumber: '05',
      testimonialsTitle: 'Témoignages & Avis Clients',
      whyNumber: '06',
      whyTitle: 'Pourquoi travailler avec moi',
      processNumber: '07',
      processTitle: 'Mon processus de travail',
      faqNumber: '08',
      faqTitle: 'Questions fréquentes',
      contactNumber: '09',
      contactTitle: 'Parler de votre projet'
    },
    story: {
      quote: "Un développeur directement impliqué dans votre projet, avec une approche technique, personnalisée et orientée résultats.",
      p1: "Développeur Web Full-Stack expérimenté (React, NestJS, Laravel, PHP, JavaScript) et intégrateur web rigoureux (HTML/CSS/JS, responsive design, accessibilité).",
      p2: "Spécialiste WordPress, Shopify, WooCommerce et développement orienté SEO technique. Avec plus de 5 ans d’expérience dans des environnements d'agences web, j’accompagne des entreprises, entrepreneurs et organisations dans la concrétisation de leurs ambitions numériques.",
      p3: "Basé à Sousse en Tunisie, je collabore aussi bien avec des acteurs locaux qu'avec des clients en France, en Belgique, en Suisse, au Canada et à l'international, en assurant une communication directe, claire et fluide."
    },
    whyWorkWithMe: [
      {
        title: 'Interlocuteur technique direct',
        description: 'Vous échangez directement avec la personne qui code votre site. Pas de chef de projet intermédiaire, pas de malentendus techniques, une communication limpide.'
      },
      {
        title: 'Développement sur mesure & code propre',
        description: 'Chaque site est développé pour vos besoins spécifiques. Pas de templates lourds pré-remplis de scripts inutiles : du code optimisé, évolutif et facile à maintenir.'
      },
      {
        title: 'Performance & SEO technique intégrés',
        description: 'La rapidité de chargement et le respect des Core Web Vitals de Google ne sont pas des options ajoutées après coup : ils sont intégrés dès la première ligne de code.'
      },
      {
        title: 'Accompagnement durable & indépendance',
        description: 'Vous restez propriétaire à 100% de votre code, de votre nom de domaine et de vos données. Je vous forme pour administrer votre site en toute sérénité.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Découverte & Cadrage',
        description: 'Nous analysons votre besoin, vos objectifs commerciaux, vos cibles et les contraintes techniques pour définir un périmètre clair sans zone d’ombre.'
      },
      {
        step: '02',
        title: 'Architecture & Conception',
        description: 'Choix de la stack technologique adaptée (WordPress, Shopify, Laravel ou React), structure des pages, parcours utilisateur et arborescence SEO.'
      },
      {
        step: '03',
        title: 'Développement & Tests',
        description: 'Développement méticuleux du code, intégration responsive mobile-first, tests multi-navigateurs, optimisation de la vitesse et sécurisation.'
      },
      {
        step: '04',
        title: 'Mise en ligne & Suivi',
        description: 'Déploiement sur votre hébergement, configuration DNS/SSL, soumission aux moteurs de recherche (Search Console) et prise en main de l’interface.'
      }
    ],
    stats: [
      { value: '5+', label: 'Ans d’expérience en agence & freelance' },
      { value: '100%', label: 'Implication directe & code sur mesure' },
      { value: 'Sousse', label: 'Tunisie & Clients à l’international' }
    ],
    contactForm: {
      title: 'Démarrons votre projet ensemble',
      subtitle: 'Expliquez-moi votre besoin. Je vous réponds sous 24h ouvrées avec une première analyse technique et une estimation.',
      nameLabel: 'Votre nom *',
      namePlaceholder: 'ex. Mohamed Ben Salem / Jean Dupont',
      emailLabel: 'Adresse email *',
      emailPlaceholder: 'ex. contact@monentreprise.com',
      companyLabel: 'Nom de votre entreprise (optionnel)',
      companyPlaceholder: 'ex. New Box SARL',
      projectTypeLabel: 'Type de projet *',
      projectTypes: [
        'Site vitrine sur mesure',
        'Site e-commerce / boutique en ligne',
        'Développement WordPress',
        'Boutique Shopify',
        'Développement WooCommerce',
        'Application web / Dashboard',
        'Développement Laravel / PHP',
        'Refonte de site web existant',
        'Maintenance & Sécurité',
        'Optimisation des performances / SEO',
        'Autre besoin spécifique'
      ],
      budgetLabel: 'Budget estimé (optionnel)',
      budgetOptions: [
        'À définir ensemble',
        'Moins de 1 000 DT / 500 €',
        '1 000 DT – 3 000 DT / 500 € – 1 200 €',
        '3 000 DT – 7 000 DT / 1 200 € – 2 500 €',
        'Plus de 7 000 DT / 2 500 € +'
      ],
      timelineLabel: 'Délai souhaité',
      timelineOptions: [
        'Dès que possible',
        'Dans le mois à venir',
        'Dans les 2 à 3 mois',
        'Projet en cours de réflexion'
      ],
      descLabel: 'Description de votre projet *',
      descPlaceholder: 'Parlez-moi de vos objectifs, des fonctionnalités souhaitées, des éventuels exemples de sites qui vous inspirent...',
      submitBtn: 'Envoyer ma demande',
      sendingBtn: 'Transmission en cours...',
      successTitle: 'Demande bien reçue !',
      successMsg: 'Merci pour votre message. Je vous répondrai personnellement dans les plus brefs délais.',
      whatsappDirect: 'Vous préférez échanger tout de suite ? Contactez-moi directement sur WhatsApp au +216 53 742 140.',
      errorRequired: 'Veuillez renseigner ce champ obligatoire.',
      errorEmail: 'Veuillez renseigner une adresse email valide.'
    },
    footer: {
      roleText: 'Freelance Full-Stack Web Developer basé à Sousse, Tunisie. Accompagnement technique sur mesure pour entreprises locales et internationales.',
      navigationTitle: 'Navigation',
      servicesTitle: 'Services principaux',
      localTitle: 'Développeur Web Local',
      contactTitle: 'Contact direct',
      socialTitle: 'Réseaux sociaux',
      copyright: 'Sofienne Boukhris. Tous droits réservés.',
      legalNotice: 'Mentions légales & Confidentialité'
    },
    newsletter: {
      badge: 'Veille Technique & Conseils Web',
      title: 'Restez informé des meilleures pratiques web',
      subtitle: 'Recevez directement mes retours d’expérience : performance, SEO technique, React et architecture e-commerce.',
      placeholder: 'Votre adresse email professionnelle...',
      button: "S'abonner",
      subscribing: 'Inscription...',
      successTitle: 'Inscription confirmée !',
      successMessage: 'Merci pour votre confiance. Vous recevrez les prochains articles et guides techniques.',
      anotherEmail: 'Inscrire un autre email',
      privacy: 'Zéro spam. Désabonnement simple en 1 clic.',
      errorRequired: 'Veuillez saisir une adresse email.',
      errorInvalid: 'Veuillez renseigner un format email valide (ex: contact@domaine.com).',
      errorAlreadySubscribed: 'Cette adresse email est déjà inscrite à la veille technique.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      projects: 'Projects',
      pricing: 'Pricing',
      about: 'About',
      faq: 'FAQ',
      contact: 'Contact',
      blog: 'Blog',
      localTunisie: 'Tunisia',
      localSousse: 'Sousse',
      ctaQuote: 'Request a Quote'
    },
    hero: {
      tag: 'Full-Stack Development · Web Integration · WordPress · Shopify · Laravel',
      greeting: 'Hello, I am',
      name: 'Sofienne Boukhris',
      role: 'Freelance Full-Stack Web Developer',
      tagline: 'I design and develop custom websites and web applications that are fast, accessible, and optimized for search engine performance.',
      location: 'Sousse, Tunisia · Available Remotely',
      availability: 'Available for new projects',
      ctaPrimary: 'Request a Quote',
      ctaSecondary: 'View My Projects',
      ctaDiscuss: 'Discuss My Project'
    },
    profileCard: {
      role: 'Freelance Web Developer',
      location: 'Sousse, Tunisia',
      status: 'Available for new projects',
      email: 'hello@sofienneboukhris.com',
      phone: '+216 53 742 140',
      whatsapp: 'Direct WhatsApp',
      experienceBadge: '5+ years experience',
      skillsTitle: 'Key Tech Skills',
      actionQuote: 'Request a Quote',
      actionWhatsapp: 'Chat on WhatsApp'
    },
    sections: {
      storyNumber: '01',
      storyTitle: 'My Story & Mindset',
      servicesNumber: '02',
      servicesTitle: 'What I Do',
      techNumber: '03',
      techTitle: 'Tech Stack & Skills',
      portfolioNumber: '04',
      portfolioTitle: 'Selected Projects',
      testimonialsNumber: '05',
      testimonialsTitle: 'Client Reviews & Feedback',
      whyNumber: '06',
      whyTitle: 'Why Work With Me',
      processNumber: '07',
      processTitle: 'Work Process',
      faqNumber: '08',
      faqTitle: 'Frequently Asked Questions',
      contactNumber: '09',
      contactTitle: 'Let’s Discuss Your Project'
    },
    story: {
      quote: "A dedicated senior developer directly involved in your project with a technical, customized, and results-oriented mindset.",
      p1: "Experienced Full-Stack Web Developer (React, NestJS, Laravel, PHP, JavaScript) and web integrator (HTML/CSS/JS, responsive layouts, accessibility).",
      p2: "Specialist in WordPress, Shopify, WooCommerce, and SEO-friendly web development. With over 5 years of experience in web agencies, I help entrepreneurs and organizations build, modernize, and maintain reliable digital platforms.",
      p3: "Based in Sousse, Tunisia, I work closely with local businesses as well as international clients in France, Belgium, Switzerland, Canada, and beyond via seamless remote communication."
    },
    whyWorkWithMe: [
      {
        title: 'Direct Technical Communication',
        description: 'You communicate directly with the engineer who builds your software. No junior account managers, no game of telephone, zero friction.'
      },
      {
        title: 'Tailored Clean Code',
        description: 'Every project is engineered around your specific operational needs. No fragile one-size-fits-all templates bloated with unnecessary dependencies.'
      },
      {
        title: 'Built-in Performance & SEO',
        description: 'Speed and Core Web Vitals adherence are baked in from day one, not treated as an afterthought patch.'
      },
      {
        title: 'Full Ownership & Long-Term Care',
        description: 'You hold complete ownership of your domain, codebase, and data. I provide clear guidance so you can operate with peace of mind.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Discovery & Scoping',
        description: 'We review your goals, commercial requirements, and technical constraints to establish a clear project scope without ambiguities.'
      },
      {
        step: '02',
        title: 'Architecture & Design',
        description: 'Selecting the optimal technology stack (WordPress, Shopify, Laravel, or React), outlining the user journeys, and structuring the SEO hierarchy.'
      },
      {
        step: '03',
        title: 'Development & QA',
        description: 'Clean coding, mobile-first responsive integration, cross-browser compatibility testing, and asset speed optimization.'
      },
      {
        step: '04',
        title: 'Deployment & Support',
        description: 'Production server release, DNS/SSL configuration, Google Search Console indexing, and administrative training.'
      }
    ],
    stats: [
      { value: '5+', label: 'Years agency & freelance experience' },
      { value: '100%', label: 'Direct senior involvement' },
      { value: 'Sousse', label: 'Tunisia & Global remote clients' }
    ],
    contactForm: {
      title: 'Let’s Start Your Project',
      subtitle: 'Share your requirements with me. I will reply within 24 business hours with an initial technical breakdown and estimate.',
      nameLabel: 'Your Name *',
      namePlaceholder: 'e.g. John Smith',
      emailLabel: 'Email Address *',
      emailPlaceholder: 'e.g. contact@mycompany.com',
      companyLabel: 'Company Name (optional)',
      companyPlaceholder: 'e.g. Acme Corp',
      projectTypeLabel: 'Project Type *',
      projectTypes: [
        'Custom Business Showcase Website',
        'E-Commerce Store',
        'WordPress Development',
        'Shopify Store',
        'WooCommerce Development',
        'Custom Web App / Portal',
        'Laravel / PHP Backend',
        'Website Redesign',
        'Maintenance & Security',
        'Speed Optimization / SEO',
        'Other Custom Need'
      ],
      budgetLabel: 'Estimated Budget (optional)',
      budgetOptions: [
        'To be determined',
        'Under $1,000 / €900',
        '$1,000 – $2,500 / €900 – €2,300',
        '$2,500 – $5,000 / €2,300 – €4,500',
        '$5,000+ / €4,500+'
      ],
      timelineLabel: 'Desired Timeline',
      timelineOptions: [
        'As soon as possible',
        'Within the next month',
        'Within 2-3 months',
        'Exploratory phase'
      ],
      descLabel: 'Project Description *',
      descPlaceholder: 'Tell me about your business goals, target audience, desired features, or reference websites...',
      submitBtn: 'Send Inquiry',
      sendingBtn: 'Sending...',
      successTitle: 'Inquiry Received!',
      successMsg: 'Thank you for reaching out. I will review your requirements and reply personally as soon as possible.',
      whatsappDirect: 'Prefer an immediate discussion? Reach out directly via WhatsApp at +216 53 742 140.',
      errorRequired: 'Please complete this required field.',
      errorEmail: 'Please provide a valid email address.'
    },
    footer: {
      roleText: 'Freelance Full-Stack Web Developer based in Sousse, Tunisia. Dedicated engineering for local and international businesses.',
      navigationTitle: 'Navigation',
      servicesTitle: 'Core Services',
      localTitle: 'Local Web Developer',
      contactTitle: 'Direct Contact',
      socialTitle: 'Follow & Connect',
      copyright: 'Sofienne Boukhris. All rights reserved.',
      legalNotice: 'Legal Notice & Privacy'
    },
    newsletter: {
      badge: 'Engineering Insights & Web Tips',
      title: 'Stay ahead with modern web engineering',
      subtitle: 'Receive practical case studies: web speed, technical SEO, scalable React architecture, and e-commerce growth.',
      placeholder: 'Your work email address...',
      button: 'Subscribe',
      subscribing: 'Subscribing...',
      successTitle: 'Subscription confirmed!',
      successMessage: 'Thank you for connecting. You will receive upcoming case studies and technical tutorials.',
      anotherEmail: 'Subscribe another email',
      privacy: 'Zero spam guarantee. Easy 1-click unsubscribe.',
      errorRequired: 'Please enter an email address.',
      errorInvalid: 'Please enter a valid email address (e.g. contact@domain.com).',
      errorAlreadySubscribed: 'This email address is already subscribed to engineering updates.'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من أنا',
      services: 'الخدمات',
      projects: 'الأعمال',
      pricing: 'الأسعار',
      blog: 'المدونة',
      faq: 'الأسئلة الشائعة',
      contact: 'اتصل بي',
      ctaQuote: 'طلب تقدير سعر'
    },
    profileCard: {
      role: 'مطور ويب متكامل مستقل',
      location: 'سوسة، تونس',
      status: 'متاح للمشاريع الجديدة',
      email: 'hello@sofienneboukhris.com',
      phone: '+216 53 742 140',
      whatsapp: 'واتساب مباشر',
      experienceBadge: '+5 سنوات خبرة',
      skillsTitle: 'المهارات الأساسية',
      actionQuote: 'طلب تقدير سعر',
      actionWhatsapp: 'محادثة عبر واتساب'
    },
    hero: {
      badge: 'متاح للتعاقد الحر والمشاريع',
      title: 'تطوير مواقع وتطبيقات ويب سريعة وحديثة تدفع نمو أعمالك',
      highlight: 'حلول مخصصة فائقة الأداء',
      subtitle: 'أساعد الشركات الناشئة، المتاجر والمؤسسات على بناء مواقع ويب قوية، متوافقة مع محركات البحث وتجربة مستخدم لا تضاهى.',
      ctaProjects: 'استعراض الأعمال',
      ctaContact: 'بدء مشروع جديد',
      availability: 'متاح فوراً',
      experience: 'خبرة تقنية +5 سنوات',
      completedProjects: '+25 مشروع ناجح'
    },
    sections: {
      servicesTitle: 'الخدمات المتخصصة',
      servicesSubtitle: 'حلول تطوير وتصميم ويب هندسية متكاملة مصممة خصيصاً لتحقيق نتائج ملموسة',
      servicesViewAll: 'استعراض كافة الخدمات',
      projectsTitle: 'أحدث المشاريع المنجزة',
      projectsSubtitle: 'أعمال حقيقية تم تسليمها بجودة عالية وأرقام أداء معتمدة',
      projectsViewAll: 'استعراض جميع الأعمال',
      timelineTitle: 'منهجية العمل',
      timelineSubtitle: 'مراحل واضحة وشفافة لضمان نجاح مشروعك من الفكرة حتى الإطلاق',
      whyTitle: 'لماذا تختار العمل معي؟',
      whySubtitle: 'المزايا التنافسية للتعاون المباشر مع مهندس ويب أول',
      processTitle: 'خطوات إنجاز المشروع',
      processSubtitle: 'منهجية دقيقة ومثبتة للمشاريع الرقمية',
      testimonialsTitle: 'آراء العملاء',
      testimonialsSubtitle: 'ما يقوله أصحاب الأعمال والمؤسسات عن العمل معي',
      pricingTitle: 'تقدير التكاليف',
      pricingSubtitle: 'شفافية كاملة في الأسعار والخيارات المتاحة لكل مشروع',
      faqTitle: 'الأسئلة المتكررة',
      faqSubtitle: 'إجابات واضحة عن التكاليف، الآجال، التقنيات وحقوق الملكية',
      blogTitle: 'مقالات ونصائح تقنية',
      blogSubtitle: 'دليل عملي لتطوير الويب، تحسين محركات البحث وسرعة المواقع',
      blogViewAll: 'جميع المقالات'
    },
    whyWorkWithMe: [
      {
        title: 'تواصل تقني مباشر بدون وسطاء',
        description: 'تتواصل مباشرة مع المهندس الذي يبني موقعك دون مدراء حسابات أو بطء في نقل المعلومات.'
      },
      {
        title: 'برمجة نظيفة ومخصصة',
        description: 'كل سطر كود مبني وفق متطلباتك الدقيقة، بعيداً عن القوالب الجاهزة البطيئة.'
      },
      {
        title: 'سرعة قياسية وتحسين SEO مدمج',
        description: 'أضمن سرعة تحميل عالية وتوافقاً كاملاً مع متطلبات جوجل Core Web Vitals منذ اليوم الأول.'
      },
      {
        title: 'ملكية تامة وضمان بعد التسليم',
        description: 'تمتلك كافة الأكواد والدومين والبيانات بنسبة 100% مع تدريب ودعم فني مستمر.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'الاستكشاف والتحليل',
        description: 'دراسة دقيقة لأهداف عملك واحتياجاتك التقنية وتحديد نطاق العمل بوضوح تام.'
      },
      {
        step: '02',
        title: 'الهيكلة والتصميم',
        description: 'اختيار البنية التقنية المثلى، وتخطيط واجهة وتجربة المستخدم وهيكل تحسين محركات البحث.'
      },
      {
        step: '03',
        title: 'التطوير والاختبار',
        description: 'كتابة أكواد نظيفة، تجاوب كامل مع الهواتف، واختبار شامل للأداء والأمان.'
      },
      {
        step: '04',
        title: 'الإطلاق والدعم',
        description: 'نشر الموقع على السيرفر، ربط النطاق وشهادة SSL، وتقديم التدريب الإداري.'
      }
    ],
    stats: [
      { value: '+5', label: 'سنوات خبرة في تطوير الويب' },
      { value: '100%', label: 'إشراف وتطوير شخصي مباشر' },
      { value: 'سوسة', label: 'تونس وعملاء دوليون عن بُعد' }
    ],
    contactForm: {
      title: 'دعنا نبدأ مشروعك الآن',
      subtitle: 'أخبرني بتفاصيل مشروعك وسأرد عليك خلال 24 ساعة عمل مع تحليل أولي وتقدير للتكلفة.',
      nameLabel: 'الاسم الكامل *',
      namePlaceholder: 'مثال: محمد علي',
      emailLabel: 'البريد الإلكتروني *',
      emailPlaceholder: 'contact@domain.com',
      companyLabel: 'اسم الشركة (اختياري)',
      companyPlaceholder: 'اسم المؤسسة أو المشروع',
      projectTypeLabel: 'نوع المشروع *',
      projectTypes: [
        'موقع تعريفي للشركة / فيترين',
        'متجر إلكتروني متكامل',
        'تطوير موقع ووردبريس',
        'متجر شوبيفاي احترافي',
        'متجر ووكومرس مخصص',
        'تطبيق ويب مخصص / منصة SaaS',
        'تطوير خادم لارافيل / PHP',
        'إعادة تصميم وتحديث موقع قديم',
        'صيانة وأمان وسرعة للموقع',
        'تحسين محركات البحث SEO',
        'طلب مخصص آخر'
      ],
      budgetLabel: 'الميزانية التقريبية (اختياري)',
      budgetOptions: [
        'قيد التحديد',
        'أقل من 3,000 د.ت / 900 €',
        '3,000 – 7,500 د.ت / 900 € – 2,300 €',
        '7,500 – 15,000 د.ت / 2,300 € – 4,500 €',
        'أكثر من 15,000 د.ت / 4,500 €+'
      ],
      timelineLabel: 'المدة الزمنية المستهدفة',
      timelineOptions: [
        'في أسرع وقت ممكن',
        'خلال الشهر القادم',
        'خلال 2 إلى 3 أشهر',
        'مرحلة استكشافية وتخطيط'
      ],
      descLabel: 'وصف المشروع ومتطلباتك *',
      descPlaceholder: 'صف لي أهداف المشروع، الفئة المستهدفة، والميزات المطلوبة أو نماذج لمواقع تعجبك...',
      submitBtn: 'إرسال طلب المشروع',
      sendingBtn: 'جاري الإرسال...',
      successTitle: 'تم استلام طلبك بنجاح!',
      successMsg: 'شكراً لتواصلك. سأراجع متطلباتك وأرد عليك شخصياً في أقرب وقت ممكن.',
      whatsappDirect: 'تفضل محادثة فورية؟ تواصل معي مباشرة عبر واتساب على الرقم 21653742140+.',
      errorRequired: 'يرجى ملء هذا الحقل الإجباري.',
      errorEmail: 'يرجى إدخال بريد إلكتروني صحيح.'
    },
    footer: {
      roleText: 'مطور ويب متكامل مستقل في سوسة، تونس. تطوير برمجيات احترافية للشركات المحلية والدولية.',
      navigationTitle: 'التنقل في الموقع',
      servicesTitle: 'الخدمات الرئيسية',
      localTitle: 'مطور ويب في تونس',
      contactTitle: 'تواصل مباشر',
      socialTitle: 'تابعني وتواصل',
      copyright: 'سفيان بوخريص. جميع الحقوق محفوظة.',
      legalNotice: 'الشروط القانونية والخصوصية'
    },
    newsletter: {
      badge: 'نصائح ومقالات في تطوير الويب',
      title: 'ابق على اطلاع بأحدث تقنيات الويب والأداء',
      subtitle: 'احصل على دراسات حالة عملية: سرعة المواقع، السيو التقني، وبناء منصات التجارة الإلكترونية الناجحة.',
      placeholder: 'بريدك الإلكتروني المهني...',
      button: 'اشتراك',
      subscribing: 'جاري الاشتراك...',
      successTitle: 'تم تأكيد اشتراكك بنجاح!',
      successMessage: 'شكراً لانضمامك. ستتلقى قريباً أفضل المقالات والدروس التقنية المتخصصة.',
      anotherEmail: 'تسجيل بريد آخر',
      privacy: 'نلتزم بعدم إرسال رسائل مزعجة إطلاقاً. يمكنك إلغاء الاشتراك بضغطة واحدة.',
      errorRequired: 'يرجى إدخال عنوان البريد الإلكتروني.',
      errorInvalid: 'يرجى إدخال بريد إلكتروني صالح (مثال: contact@domain.com).',
      errorAlreadySubscribed: 'هذا البريد الإلكتروني مسجل مسبقاً في قائمتنا البريدية.'
    }
  }
};

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { useRouter } from '../context/RouterContext';
import { 
  FolderCheck, 
  HeartHandshake, 
  Award, 
  Star, 
  Sparkles,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

interface StatsBannerProps {
  className?: string;
  showHeading?: boolean;
  variant?: 'card' | 'standalone' | 'compact';
}

interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: { fr: string; en: string };
  description: { fr: string; en: string };
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

// Smooth animated number counter component
const Counter: React.FC<{ target: number; suffix: string; active: boolean }> = ({
  target,
  suffix,
  active
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    const duration = 1600; // ms
    const startTime = performance.now();

    const frame = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out exponential curve
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(ease * target);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setDisplayValue(target);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [active, target]);

  return (
    <span className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
};

export const StatsBanner: React.FC<StatsBannerProps> = ({
  className = '',
  showHeading = false,
  variant = 'card'
}) => {
  const { lang } = useRouter();
  const bannerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(bannerRef, { once: true, margin: '-60px' });

  // Key performance metrics
  const stats: StatItem[] = [
    {
      id: 'projects-completed',
      value: 50,
      suffix: '+',
      label: {
        fr: 'Projets Réalisés',
        en: 'Projects Completed'
      },
      description: {
        fr: 'Sites vitrines, boutiques e-commerce & applications web',
        en: 'Showcase sites, e-commerce stores & custom web apps'
      },
      icon: FolderCheck,
      color: '#70ba65' // signature emerald
    },
    {
      id: 'happy-clients',
      value: 35,
      suffix: '+',
      label: {
        fr: 'Clients Satisfaits',
        en: 'Happy Clients'
      },
      description: {
        fr: 'Entreprises, commerçants & porteurs de projets en Tunisie & Europe',
        en: 'Businesses, merchants & entrepreneurs in Tunisia & Europe'
      },
      icon: HeartHandshake,
      color: '#38bdf8' // sky blue
    },
    {
      id: 'years-experience',
      value: 5,
      suffix: '+',
      label: {
        fr: 'Années d’Expérience',
        en: 'Years of Experience'
      },
      description: {
        fr: 'Expertise continue en agences digitales & pratique freelance',
        en: 'Continuous expertise in digital agencies & freelance consulting'
      },
      icon: Award,
      color: '#f59e0b' // amber
    },
    {
      id: 'satisfaction-rate',
      value: 100,
      suffix: '%',
      label: {
        fr: 'Code Propriétaire & Délais',
        en: 'On-Time & Clean Code'
      },
      description: {
        fr: 'Zéro dépendance propriétaire obscure, accompagnement humain direct',
        en: 'Zero opaque vendor lock-in with direct technical advisory'
      },
      icon: Star,
      color: '#a78bfa' // purple
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <div
      ref={bannerRef}
      id="stats-banner"
      className={`relative overflow-hidden transition-all ${
        variant === 'card'
          ? 'trm-card p-6 sm:p-8 rounded-2xl border border-[#0a3d54] bg-[#00283A]/70'
          : variant === 'compact'
          ? 'p-4 rounded-xl border border-[#0a3d54] bg-[#02162B]/80'
          : 'py-6'
      } ${className}`}
    >
      {/* Subtle ambient decorative backdrop */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-[#70ba65]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-[#38bdf8]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Optional Heading */}
      {showHeading && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-b border-[#0a3d54]/60">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#02162B] border border-[#0a3d54] text-[11px] font-mono text-[#70ba65] mb-1.5 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'fr' ? 'Indicateurs Clés' : 'Key Metrics'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              {lang === 'fr' ? 'Chiffres clés & engagements concrets' : 'Proven Track Record in Numbers'}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#25D366] bg-[#02162B] px-3 py-1.5 rounded-full border border-[#0a3d54] self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Résultats Vérifiés' : 'Verified Results'}</span>
          </div>
        </div>
      )}

      {/* Animated Metrics Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              className="bg-[#02162B]/85 border border-[#0a3d54] hover:border-[#70ba65]/60 p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#70ba65]/5 group flex flex-col justify-between"
            >
              <div>
                {/* Icon & Color Badge Header */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${stat.color}18`,
                      color: stat.color,
                      border: `1px solid ${stat.color}35`
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: stat.color }}
                    aria-hidden="true"
                  />
                </div>

                {/* Animated Metric Value */}
                <div
                  className="text-3xl sm:text-4xl font-serif font-bold mb-1 tracking-tight"
                  style={{ color: stat.color }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} active={isInView} />
                </div>

                {/* Metric Label */}
                <h4 className="text-sm font-semibold text-white group-hover:text-[#70ba65] transition-colors leading-snug">
                  {stat.label[lang]}
                </h4>
              </div>

              {/* Metric Subtitle / Context */}
              <p className="text-[11px] text-[#919ca1] mt-2 pt-2 border-t border-[#0a3d54]/40 leading-relaxed">
                {stat.description[lang]}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

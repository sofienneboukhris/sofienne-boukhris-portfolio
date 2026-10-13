import React from 'react';
import { ServiceItem } from '../types';
import { useRouter } from '../context/RouterContext';
import { useGlobalCurrency } from '../context/CurrencyContext';
import { getServicePricingDisplay } from '../utils/servicePricing';
import { Globe, Layout, ShoppingBag, ShoppingCart, Store, FileCode, Cpu, Terminal, RefreshCw, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceItem;
}

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6 text-[#70ba65]" />,
  Layout: <Layout className="w-6 h-6 text-[#70ba65]" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6 text-[#70ba65]" />,
  ShoppingCart: <ShoppingCart className="w-6 h-6 text-[#70ba65]" />,
  Store: <Store className="w-6 h-6 text-[#70ba65]" />,
  FileCode: <FileCode className="w-6 h-6 text-[#70ba65]" />,
  Cpu: <Cpu className="w-6 h-6 text-[#70ba65]" />,
  Terminal: <Terminal className="w-6 h-6 text-[#70ba65]" />,
  RefreshCw: <RefreshCw className="w-6 h-6 text-[#70ba65]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#70ba65]" />,
  Zap: <Zap className="w-6 h-6 text-[#70ba65]" />
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { lang, navigate } = useRouter();
  const { currency } = useGlobalCurrency();
  const priceDisplay = getServicePricingDisplay(service, currency, lang);

  const handleDetail = () => {
    navigate(`/services/${service.slug}`);
  };

  return (
    <div className="trm-card p-6 sm:p-7 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
      <div>
        {/* Icon & Category Tag */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#02162B] border border-[#0a3d54] flex items-center justify-center group-hover:border-[#70ba65]/60 transition-colors shadow-inner">
            {iconMap[service.iconName] || <Globe className="w-6 h-6 text-[#70ba65]" />}
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#70ba65] bg-[#70ba65]/10 px-2.5 py-1 rounded-full border border-[#70ba65]/20">
            {service.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-2.5 group-hover:text-[#70ba65] transition-colors">
          {service.title[lang]}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[#919ca1] leading-relaxed mb-5">
          {service.shortDescription[lang]}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {service.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] text-[#dedee0] bg-[#02162B] px-2 py-0.5 rounded border border-[#0a3d54]/60"
            >
              {tech}
            </span>
          ))}
          {service.technologies.length > 4 && (
            <span className="text-[10px] text-[#70ba65] bg-[#02162B] px-1.5 py-0.5 rounded">
              +{service.technologies.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Action link & Dynamic Currency Price */}
      <div className="pt-4 border-t border-[#0a3d54]/40 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-[#919ca1] block uppercase tracking-wider font-mono">
            {lang === 'fr' ? 'À partir de' : 'Starting from'}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-mono font-bold text-[#70ba65]">
              {priceDisplay.formatted}
            </span>
            <span className="text-[11px]" role="img" aria-label={priceDisplay.currency}>
              {priceDisplay.flag}
            </span>
          </div>
        </div>

        <button
          onClick={handleDetail}
          className="text-xs font-bold uppercase tracking-wider text-[#dedee0] group-hover:text-[#70ba65] flex items-center gap-1.5 transition-colors shrink-0"
        >
          <span>{lang === 'fr' ? 'Détails' : 'Details'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

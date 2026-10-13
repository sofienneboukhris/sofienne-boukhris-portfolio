import React from 'react';
import { useRouter } from '../context/RouterContext';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const { lang, path } = useRouter();

  const isCalculatorPage = path.includes('/calculateur') || path.includes('/calculator') || path.includes('/devis') || path.includes('/quote');

  const label = lang === 'fr' ? 'Discuter sur WhatsApp' : 'Start a Conversation';
  const prefilledText = lang === 'fr'
    ? encodeURIComponent("Bonjour Sofienne 👋\n\nJe souhaite créer ou améliorer mon site web.\nMerci de me contacter pour un devis gratuit et sans engagement.\n\nNom :\nEntreprise :\nBesoin :")
    : encodeURIComponent("Hello Sofienne 👋\n\nI would like to discuss building or improving my website.\nPlease contact me for a free quote.\n\nName:\nCompany:\nProject details:");

  const waUrl = `https://wa.me/21653742140?text=${prefilledText}`;

  return (
    <aside aria-label="WhatsApp direct contact" className="print:hidden">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed right-5 ${isCalculatorPage ? 'bottom-20 md:bottom-5' : 'bottom-5'} z-50 flex items-center gap-3 no-underline group transition-all duration-300`}
        id="floating-whatsapp-btn"
        title={label}
      >
        <span className="hidden md:inline-block bg-white text-[#333] py-2.5 px-4 rounded-full text-xs font-semibold shadow-xl border border-black/10 group-hover:bg-[#fcfcfe] transition-all transform group-hover:-translate-x-1">
          {label}
        </span>
        <div className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl wa-pulse-animation group-hover:scale-110 transition-transform">
          <MessageCircle className="w-7 h-7 fill-white" />
        </div>
      </a>
    </aside>
  );
};

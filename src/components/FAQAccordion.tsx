import React, { useState } from 'react';
import { FAQItem } from '../types';
import { useRouter } from '../context/RouterContext';
import { ChevronDown } from 'lucide-react';

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const { lang } = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const qId = `faq-question-${index}`;
        const aId = `faq-answer-${index}`;

        return (
          <div
            key={index}
            className="trm-card overflow-hidden border border-[#0a3d54]/70 transition-colors"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-[#70ba65]"
              aria-expanded={isOpen}
              aria-controls={aId}
              id={qId}
            >
              <span className="text-sm sm:text-base font-serif font-semibold text-white">
                {item.question[lang]}
              </span>
              <div className={`w-7 h-7 rounded-full bg-[#02162B] flex items-center justify-center text-[#70ba65] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#70ba65] text-white' : ''}`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div
                id={aId}
                role="region"
                aria-labelledby={qId}
                className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#a8b4b9] leading-relaxed border-t border-[#0a3d54]/30 animate-fadeIn"
              >
                <p>{item.answer[lang]}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

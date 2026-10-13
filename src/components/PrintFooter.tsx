import React from 'react';
import { useRouter } from '../context/RouterContext';

export const PrintFooter: React.FC = () => {
  const { lang } = useRouter();

  return (
    <footer 
      id="print-document-footer" 
      className="hidden print:block mt-8 pt-4 border-t border-gray-300 text-[8.5pt] text-gray-600 font-sans"
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="font-bold text-gray-900">Sofienne Boukhris</span> — {lang === 'fr' ? 'Développeur Web Freelance' : 'Freelance Web Developer'} • Sousse, Tunisie
        </div>
        <div className="font-mono text-[#15803d]">
          https://sofienneboukhris.com
        </div>
      </div>
      <div className="text-[7.5pt] text-gray-400 mt-1">
        {lang === 'fr' 
          ? 'Document officiel édité pour impression / consultation PDF. Retrouvez l’ensemble des études de cas détaillées et les démos en direct sur le site web.'
          : 'Official document generated for print / PDF review. Access interactive live demos, client outcomes, and complete case studies at the website.'}
      </div>
    </footer>
  );
};

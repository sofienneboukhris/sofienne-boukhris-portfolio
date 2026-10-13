import React from 'react';
import { useRouter } from '../context/RouterContext';

interface PrintHeaderProps {
  documentType?: 'project' | 'resume' | 'general';
  projectTitle?: string;
  projectDomain?: string;
}

export const PrintHeader: React.FC<PrintHeaderProps> = ({
  documentType = 'general',
  projectTitle,
  projectDomain
}) => {
  const { lang } = useRouter();

  const formattedDate = new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header 
      id="print-letterhead" 
      className="hidden print:block mb-6 pb-4 border-b-2 border-[#15803d]"
      aria-label="En-tête d'impression professionnelle"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="text-2xl font-serif font-bold text-black tracking-tight">
            Sofienne Boukhris
          </div>
          <div className="text-xs font-mono font-bold text-[#15803d] uppercase tracking-wider mt-0.5">
            {lang === 'fr' 
              ? 'Développeur Web Freelance Full-Stack & Intégrateur UI' 
              : 'Freelance Full-Stack Web Developer & UI Integrator'}
          </div>
          <div className="text-[10pt] text-gray-700 mt-2 space-y-0.5 font-sans">
            <div>
              <span className="font-semibold text-gray-900">Localisation :</span> Sousse, Tunisie • Projets en Tunisie, France, Europe & International
            </div>
            <div className="text-[9pt] text-gray-600">
              <span className="font-semibold text-gray-900">Contact direct :</span> hello@sofienneboukhris.com &nbsp;|&nbsp; +216 53 742 140 &nbsp;|&nbsp; <span className="text-[#15803d] font-mono">https://sofienneboukhris.com</span>
            </div>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="inline-block text-[9pt] font-mono font-bold uppercase bg-gray-100 text-gray-800 px-3 py-1 rounded border border-gray-300">
            {documentType === 'project' 
              ? (lang === 'fr' ? 'Étude de Cas Projet' : 'Project Case Study')
              : documentType === 'resume'
              ? (lang === 'fr' ? 'Curriculum Vitae & Bio' : 'Curriculum Vitae & Bio')
              : (lang === 'fr' ? 'Fiche Professionnelle' : 'Professional Sheet')}
          </span>

          {projectTitle && (
            <div className="text-sm font-bold text-black mt-1.5 max-w-[240px] truncate">
              {projectTitle}
            </div>
          )}

          {projectDomain && (
            <div className="text-[9pt] font-mono text-[#15803d] font-bold">
              {projectDomain}
            </div>
          )}

          <div className="text-[8pt] text-gray-500 mt-1 font-mono">
            {formattedDate}
          </div>
        </div>
      </div>
    </header>
  );
};

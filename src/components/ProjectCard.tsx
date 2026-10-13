import React from 'react';
import { ProjectItem } from '../types';
import { useRouter } from '../context/RouterContext';
import { ExternalLink, ArrowRight, CheckCircle } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { lang, navigate } = useRouter();

  const handleDetail = () => {
    navigate(lang === 'fr' ? `/realisations/${project.slug}` : `/en/projects/${project.slug}`);
  };

  return (
    <div className="trm-card overflow-hidden group flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
      <div>
        {/* Project Image Preview */}
        <div className="relative aspect-[16/10] bg-[#02162B] overflow-hidden border-b border-[#0a3d54]/60">
          <img
            src={project.imageUrl}
            alt={`${project.title} - ${project.domain}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              // fallback if remote image has issues
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00283A] via-transparent to-transparent opacity-80"></div>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white bg-[#00283A]/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#0a3d54]">
              {project.categoryLabel[lang]}
            </span>
          </div>

          {/* External domain pill */}
          <div className="absolute bottom-3 right-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-[#70ba65] bg-[#02162B]/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#70ba65]/30 hover:bg-[#70ba65] hover:text-white transition-colors"
              title={`Visiter ${project.domain}`}
            >
              <span>{project.domain}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <h3 
            onClick={handleDetail}
            className="text-lg sm:text-xl font-serif font-bold text-white mb-2 cursor-pointer group-hover:text-[#70ba65] transition-colors"
          >
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#919ca1] leading-relaxed mb-4 line-clamp-3">
            {project.description[lang]}
          </p>

          {/* Key Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[10px] text-[#dedee0] bg-[#02162B] px-2 py-0.5 rounded border border-[#0a3d54]/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer link to study case */}
      <div className="px-6 pb-6 pt-3 border-t border-[#0a3d54]/30 flex items-center justify-between">
        <button
          onClick={handleDetail}
          className="text-xs font-bold uppercase tracking-wider text-[#dedee0] group-hover:text-[#70ba65] flex items-center gap-1.5 transition-colors"
        >
          <span>{lang === 'fr' ? 'Étude de cas détaillée' : 'View Case Study'}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>

        <span className="text-[11px] text-[#25D366] flex items-center gap-1 font-mono">
          <CheckCircle className="w-3 h-3" />
          <span>Actif</span>
        </span>
      </div>
    </div>
  );
};

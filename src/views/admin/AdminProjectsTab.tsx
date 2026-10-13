import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ProjectItem, Language } from '../../types';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Globe,
  FolderKanban,
  AlertTriangle,
  Eye,
  EyeOff,
  X,
  Sparkles,
  Layers,
  Image as ImageIcon
} from 'lucide-react';

interface AdminProjectsTabProps {
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  editingProject: ProjectItem | null;
  setEditingProject: (project: ProjectItem | null) => void;
}

export const AdminProjectsTab: React.FC<AdminProjectsTabProps> = ({
  isModalOpen,
  onOpenModal,
  onCloseModal,
  editingProject,
  setEditingProject
}) => {
  const { projects, addProject, updateProject, deleteProject, toggleProjectPublished } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [activeLangTab, setActiveLangTab] = useState<Language>('fr');
  const [formData, setFormData] = useState<Partial<ProjectItem>>({
    id: '',
    slug: '',
    title: '',
    domain: '',
    liveUrl: '',
    category: 'ecommerce',
    categoryLabel: { fr: 'E-Commerce', en: 'E-Commerce', ar: 'تجارة إلكترونية' },
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    description: { fr: '', en: '', ar: '' },
    context: { fr: '', en: '', ar: '' },
    objectives: { fr: [], en: [], ar: [] },
    solution: { fr: [], en: [], ar: [] },
    technologies: ['React', 'WordPress', 'WooCommerce'],
    role: {
      fr: 'Développeur Full-Stack Freelance',
      en: 'Freelance Full-Stack Developer',
      ar: 'مطور ويب متكامل مستقل'
    },
    published: true
  });

  const [techInput, setTechInput] = useState('');
  const [objectiveInput, setObjectiveInput] = useState('');
  const [solutionInput, setSolutionInput] = useState('');

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({
      id: `project-${Date.now()}`,
      slug: '',
      title: '',
      domain: 'mon-client.com',
      liveUrl: 'https://mon-client.com',
      category: 'ecommerce',
      categoryLabel: { fr: 'E-Commerce', en: 'E-Commerce', ar: 'تجارة إلكترونية' },
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      description: { fr: '', en: '', ar: '' },
      context: { fr: '', en: '', ar: '' },
      objectives: { fr: ['Augmenter les ventes en ligne', 'Chargement mobile < 1s'], en: ['Increase online conversions', 'Sub-second mobile speed'], ar: ['زيادة المبيعات الإلكترونية', 'سرعة تحميل فائقة على الهواتف'] },
      solution: { fr: ['Développement sur-mesure performant', 'Paiement sécurisé'], en: ['Bespoke fast development', 'Secure payment gateway'], ar: ['تطوير مخصص فائق الأداء', 'بوابة دفع آمنة وموثوقة'] },
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      role: {
        fr: 'Développeur Web Full-Stack Freelance',
        en: 'Freelance Full-Stack Developer',
        ar: 'مطور ويب متكامل مستقل'
      },
      published: true
    });
    setTechInput('');
    setObjectiveInput('');
    setSolutionInput('');
    onOpenModal();
  };

  const handleOpenEdit = (project: ProjectItem) => {
    setEditingProject(project);
    setFormData({
      ...project,
      description: {
        fr: project.description.fr,
        en: project.description.en || '',
        ar: project.description.ar || ''
      },
      context: {
        fr: project.context?.fr || '',
        en: project.context?.en || '',
        ar: project.context?.ar || ''
      },
      objectives: {
        fr: project.objectives?.fr || [],
        en: project.objectives?.en || [],
        ar: project.objectives?.ar || []
      },
      solution: {
        fr: project.solution?.fr || [],
        en: project.solution?.en || [],
        ar: project.solution?.ar || []
      },
      role: {
        fr: project.role?.fr || '',
        en: project.role?.en || '',
        ar: project.role?.ar || ''
      },
      categoryLabel: {
        fr: project.categoryLabel?.fr || project.category,
        en: project.categoryLabel?.en || project.category,
        ar: project.categoryLabel?.ar || project.category
      }
    });
    setTechInput('');
    setObjectiveInput('');
    setSolutionInput('');
    onOpenModal();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      alert('Veuillez entrer le nom du projet.');
      return;
    }

    const finalSlug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const projectPayload: ProjectItem = {
      id: formData.id || `project-${Date.now()}`,
      slug: finalSlug,
      title: formData.title,
      domain: formData.domain || 'example.com',
      liveUrl: formData.liveUrl || `https://${formData.domain || 'example.com'}`,
      category: formData.category || 'ecommerce',
      categoryLabel: {
        fr: formData.categoryLabel?.fr || formData.category || 'Projet',
        en: formData.categoryLabel?.en || formData.category || 'Project'
      },
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      description: {
        fr: formData.description?.fr || '',
        en: formData.description?.en || formData.description?.fr || ''
      },
      context: {
        fr: formData.context?.fr || '',
        en: formData.context?.en || formData.context?.fr || ''
      },
      objectives: {
        fr: formData.objectives?.fr || [],
        en: formData.objectives?.en || formData.objectives?.fr || []
      },
      solution: {
        fr: formData.solution?.fr || [],
        en: formData.solution?.en || formData.solution?.fr || []
      },
      technologies: formData.technologies || [],
      role: {
        fr: formData.role?.fr || 'Développeur Full-Stack Freelance',
        en: formData.role?.en || 'Freelance Full-Stack Developer'
      },
      features: {
        fr: formData.features?.fr || [],
        en: formData.features?.en || []
      },
      verifiedResults: {
        fr: formData.verifiedResults?.fr || 'Performance & conversion optimisées',
        en: formData.verifiedResults?.en || 'Optimized speed and conversions'
      },
      published: formData.published !== false
    };

    if (editingProject) {
      updateProject(editingProject.id, projectPayload);
    } else {
      addProject(projectPayload);
    }

    onCloseModal();
  };

  const handleAddTech = () => {
    if (!techInput.trim()) return;
    const current = formData.technologies || [];
    if (!current.includes(techInput.trim())) {
      setFormData({ ...formData, technologies: [...current, techInput.trim()] });
    }
    setTechInput('');
  };

  const handleRemoveTech = (tech: string) => {
    setFormData({
      ...formData,
      technologies: (formData.technologies || []).filter(t => t !== tech)
    });
  };

  const handleAddObjective = () => {
    if (!objectiveInput.trim()) return;
    const current = (formData.objectives as any)?.[activeLangTab] || [];
    setFormData({
      ...formData,
      objectives: {
        ...(formData.objectives as any),
        [activeLangTab]: [...current, objectiveInput.trim()]
      }
    });
    setObjectiveInput('');
  };

  const handleRemoveObjective = (index: number) => {
    const current = (formData.objectives as any)?.[activeLangTab] || [];
    setFormData({
      ...formData,
      objectives: {
        ...(formData.objectives as any),
        [activeLangTab]: current.filter((_: any, i: number) => i !== index)
      }
    });
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = categoryFilter === 'all' || project.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Search & Add Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#00283A] border border-[#0a3d54] p-4 rounded-xl">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#919ca1]" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Rechercher par nom, domaine, technologie..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white placeholder-[#919ca1] focus:outline-none focus:border-[#70ba65]"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-[#dedee0] focus:outline-none focus:border-[#70ba65]"
          >
            <option value="all">Toutes catégories</option>
            <option value="ecommerce">E-Commerce</option>
            <option value="showcase">Site Vitrine</option>
            <option value="custom">Application Sur-mesure</option>
            <option value="realestate">Immobilier</option>
            <option value="corporate">Corporate</option>
          </select>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#70ba65] text-[#00151F] font-bold text-xs rounded-lg hover:bg-[#70ba65]/90 transition-colors shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter une Réalisation</span>
        </button>
      </div>

      {/* Projects Grid / Table */}
      <div className="bg-[#00283A] border border-[#0a3d54] rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#dedee0]">
            <thead className="bg-[#02162B] border-b border-[#0a3d54] text-[11px] font-mono uppercase text-[#919ca1]">
              <tr>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Projet & Client</th>
                <th className="px-4 py-3">Catégorie</th>
                <th className="px-4 py-3">Technologies</th>
                <th className="px-4 py-3">Lien direct</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0a3d54]/50">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#919ca1]">
                    Aucune réalisation ne correspond à vos filtres.
                  </td>
                </tr>
              ) : (
                filteredProjects.map(project => (
                  <tr key={project.id} className="hover:bg-[#02162B]/50 transition-colors">
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleProjectPublished(project.id)}
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                          project.published !== false
                            ? 'bg-[#70ba65]/10 text-[#70ba65] border border-[#70ba65]/30'
                            : 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                        }`}
                        title="Cliquer pour changer le statut"
                      >
                        {project.published !== false ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Publié</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Masqué</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-10 h-7 object-cover rounded bg-[#00151F] border border-[#0a3d54]"
                        />
                        <div>
                          <div className="font-semibold text-white">{project.title}</div>
                          <div className="text-[11px] text-[#919ca1]">{project.domain}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-[#00151F] border border-[#0a3d54] font-mono text-[10px] text-[#dedee0]">
                        {project.categoryLabel.fr}
                      </span>
                    </td>

                    <td className="px-4 py-3 max-w-[200px]">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map(tech => (
                          <span
                            key={tech}
                            className="px-1.5 py-0.2 rounded bg-[#02162B] text-[10px] text-[#919ca1] border border-[#0a3d54]/60"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-[10px] text-[#919ca1]">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-[#70ba65] hover:underline"
                      >
                        <span>Visiter</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>

                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(project)}
                          className="p-1.5 rounded-lg bg-[#00151F] border border-[#0a3d54] hover:border-[#70ba65] text-[#dedee0] hover:text-[#70ba65] transition-colors"
                          title="Modifier le projet"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(project.id)}
                          className="p-1.5 rounded-lg bg-[#00151F] border border-[#0a3d54] hover:border-red-500 text-[#dedee0] hover:text-red-400 transition-colors"
                          title="Supprimer le projet"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-[#00283A] border border-red-500/40 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-white text-base">Supprimer ce projet ?</h3>
            </div>
            <p className="text-xs text-[#dedee0] leading-relaxed">
              Êtes-vous certain de vouloir supprimer cette réalisation ? Les modifications seront appliquées instantanément au portfolio en ligne.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 text-xs text-[#dedee0] bg-[#02162B] border border-[#0a3d54] rounded-lg"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  deleteProject(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm"
              >
                Confirmer la suppression
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#00283A] border border-[#0a3d54] rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-[#02162B] border-b border-[#0a3d54]">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-[#70ba65]" />
                <span>{editingProject ? 'Modifier la Réalisation' : 'Ajouter une Nouvelle Réalisation'}</span>
              </h3>
              <button
                onClick={onCloseModal}
                className="p-1 rounded-lg text-[#919ca1] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Language Selection Bar */}
              <div className="flex items-center justify-between bg-[#02162B] p-2 rounded-xl border border-[#0a3d54]">
                <span className="text-xs font-medium text-[#919ca1] px-2 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#70ba65]" />
                  <span>Langue d'édition des contenus :</span>
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveLangTab('fr')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                      activeLangTab === 'fr'
                        ? 'bg-[#70ba65] text-[#00151F]'
                        : 'text-[#919ca1] hover:text-white'
                    }`}
                  >
                    Français (Défaut)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLangTab('en')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                      activeLangTab === 'en'
                        ? 'bg-[#70ba65] text-[#00151F]'
                        : 'text-[#919ca1] hover:text-white'
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLangTab('ar')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                      activeLangTab === 'ar'
                        ? 'bg-[#70ba65] text-[#00151F]'
                        : 'text-[#919ca1] hover:text-white'
                    }`}
                  >
                    العربية
                  </button>
                </div>
              </div>

              {/* Title & Domain */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white mb-1">Nom du Projet / Client *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: New Box Tunisie"
                    className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1">Nom de domaine</label>
                  <input
                    type="text"
                    value={formData.domain}
                    onChange={e => setFormData({ ...formData, domain: e.target.value })}
                    placeholder="newbox.com.tn"
                    className="w-full px-3 py-2 text-xs font-mono bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                  />
                </div>
              </div>

              {/* Live URL & Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white mb-1">Lien du site en ligne (URL)</label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://newbox.com.tn"
                    className="w-full px-3 py-2 text-xs font-mono bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1">Slug URL</label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="newbox"
                    className="w-full px-3 py-2 text-xs font-mono bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                  />
                </div>
              </div>

              {/* Image URL & Preview */}
              <div>
                <label className="block text-xs font-bold text-white mb-1">Image / Mockup URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-2 text-xs font-mono bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                  />
                  {formData.imageUrl && (
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-14 h-9 object-cover rounded-lg border border-[#0a3d54]"
                    />
                  )}
                </div>
              </div>

              {/* Category & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#02162B] p-4 rounded-xl border border-[#0a3d54]">
                <div>
                  <label className="block text-xs font-bold text-white mb-1">Catégorie</label>
                  <select
                    value={formData.category}
                    onChange={e => {
                      const cat = e.target.value;
                      const labels: Record<string, { fr: string; en: string; ar: string }> = {
                        ecommerce: { fr: 'E-Commerce', en: 'E-Commerce', ar: 'تجارة إلكترونية' },
                        showcase: { fr: 'Site Vitrine', en: 'Showcase Website', ar: 'موقع تعريفي' },
                        custom: { fr: 'Application Sur-mesure', en: 'Custom Web App', ar: 'تطبيق ويب مخصص' },
                        realestate: { fr: 'Immobilier', en: 'Real Estate', ar: 'عقارات' },
                        corporate: { fr: 'Corporate', en: 'Corporate Portal', ar: 'موقع مؤسساتي' }
                      };
                      setFormData({
                        ...formData,
                        category: cat,
                        categoryLabel: labels[cat] || { fr: cat, en: cat, ar: cat }
                      });
                    }}
                    className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:outline-none"
                  >
                    <option value="ecommerce">E-Commerce</option>
                    <option value="showcase">Site Vitrine</option>
                    <option value="custom">Application Sur-mesure</option>
                    <option value="realestate">Immobilier</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Rôle exercé ({activeLangTab.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={(formData.role as any)?.[activeLangTab] || ''}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        role: { ...(formData.role as any), [activeLangTab]: e.target.value }
                      })
                    }
                    placeholder="Ex: Développeur Web Full-Stack Freelance"
                    className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:outline-none"
                    dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              {/* Description & Contexte */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Description du Projet ({activeLangTab.toUpperCase()})
                  </label>
                  <textarea
                    rows={2}
                    value={(formData.description as any)?.[activeLangTab] || ''}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        description: {
                          ...(formData.description as any),
                          [activeLangTab]: e.target.value
                        }
                      })
                    }
                    placeholder="Description synthétique des réalisations..."
                    className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                    dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Contexte & Problématique Client ({activeLangTab.toUpperCase()})
                  </label>
                  <textarea
                    rows={3}
                    value={(formData.context as any)?.[activeLangTab] || ''}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        context: {
                          ...(formData.context as any),
                          [activeLangTab]: e.target.value
                        }
                      })
                    }
                    placeholder="Quels étaient les besoins initiaux du client..."
                    className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                    dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              {/* Technologies List */}
              <div>
                <label className="block text-xs font-bold text-white mb-1">Technologies de la réalisation</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTech();
                      }
                    }}
                    placeholder="Ex: WooCommerce, Tailwind, React..."
                    className="flex-1 px-3 py-1.5 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddTech}
                    className="px-3 py-1.5 bg-[#0a3d54] hover:bg-[#70ba65] hover:text-[#00151F] text-xs font-bold text-white rounded-lg transition-colors"
                  >
                    Ajouter
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(formData.technologies || []).map(tech => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#00151F] border border-[#0a3d54] text-xs text-white"
                    >
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(tech)}
                        className="text-[#919ca1] hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Objectives List */}
              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  Objectifs du projet ({activeLangTab.toUpperCase()})
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={objectiveInput}
                    onChange={e => setObjectiveInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddObjective();
                      }
                    }}
                    placeholder="Ex: Vitesse de chargement mobile < 1 seconde"
                    className="flex-1 px-3 py-1.5 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:outline-none"
                    dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                  />
                  <button
                    type="button"
                    onClick={handleAddObjective}
                    className="px-3 py-1.5 bg-[#0a3d54] hover:bg-[#70ba65] hover:text-[#00151F] text-xs font-bold text-white rounded-lg transition-colors"
                  >
                    Ajouter
                  </button>
                </div>
                <ul className="space-y-1">
                  {((formData.objectives as any)?.[activeLangTab] || []).map(
                    (obj: string, idx: number) => (
                      <li
                        key={idx}
                        className="flex items-center justify-between p-2 rounded bg-[#00151F] border border-[#0a3d54]/60 text-xs text-[#dedee0]"
                      >
                        <span dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}>{obj}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveObjective(idx)}
                          className="text-[#919ca1] hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Published switch */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#02162B] border border-[#0a3d54]">
                <div>
                  <div className="text-xs font-bold text-white">Afficher sur le portfolio public</div>
                  <div className="text-[11px] text-[#919ca1]">
                    Rendre ce projet visible sur la page d'accueil et la galerie de réalisations.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.published !== false}
                  onChange={e => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 rounded text-[#70ba65] focus:ring-[#70ba65] accent-[#70ba65]"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#0a3d54]">
                <button
                  type="button"
                  onClick={onCloseModal}
                  className="px-4 py-2 text-xs text-[#dedee0] bg-[#02162B] border border-[#0a3d54] rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-[#00151F] bg-[#70ba65] rounded-lg shadow-md"
                >
                  {editingProject ? 'Enregistrer les modifications' : 'Ajouter le projet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BlogPostItem, Language } from '../../types';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  Globe,
  FileText,
  Calendar,
  Clock,
  User,
  AlertTriangle,
  Eye,
  EyeOff,
  Image as ImageIcon
} from 'lucide-react';

interface AdminBlogTabProps {
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  editingPost: BlogPostItem | null;
  setEditingPost: (post: BlogPostItem | null) => void;
}

export const AdminBlogTab: React.FC<AdminBlogTabProps> = ({
  isModalOpen,
  onOpenModal,
  onCloseModal,
  editingPost,
  setEditingPost
}) => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, toggleBlogPostPublished } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [deleteConfirmSlug, setDeleteConfirmSlug] = useState<string | null>(null);

  // Form State
  const [activeLangTab, setActiveLangTab] = useState<Language>('fr');
  const [formData, setFormData] = useState<Partial<BlogPostItem>>({
    slug: '',
    title: { fr: '', en: '', ar: '' },
    excerpt: { fr: '', en: '', ar: '' },
    content: { fr: [], en: [], ar: [] },
    category: 'creation-site-web',
    categoryLabel: { fr: 'Création de site', en: 'Web Development', ar: 'تطوير المواقع' },
    readTime: '5 min',
    publishDate: new Date().toISOString().slice(0, 10),
    author: 'Sofienne Boukhris',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    tags: { fr: [], en: [], ar: [] },
    published: true
  });

  const [paragraphInput, setParagraphInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  const handleOpenCreate = () => {
    setEditingPost(null);
    setFormData({
      slug: '',
      title: { fr: '', en: '', ar: '' },
      excerpt: { fr: '', en: '', ar: '' },
      content: { fr: ['Premier paragraphe de votre article...'], en: ['First paragraph of your post...'], ar: ['الفقرة الأولى من مقالك...'] },
      category: 'creation-site-web',
      categoryLabel: { fr: 'Création de site', en: 'Web Development', ar: 'تطوير المواقع' },
      readTime: '5 min',
      publishDate: new Date().toISOString().slice(0, 10),
      author: 'Sofienne Boukhris',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      tags: { fr: ['Web', 'SEO', 'Freelance'], en: ['Web', 'SEO', 'Freelance'], ar: ['ويب', 'سيو', 'فريلانس'] },
      published: true
    });
    setParagraphInput('');
    setTagInput('');
    onOpenModal();
  };

  const handleOpenEdit = (post: BlogPostItem) => {
    setEditingPost(post);
    setFormData({
      ...post,
      title: { fr: post.title.fr, en: post.title.en || '', ar: post.title.ar || '' },
      excerpt: { fr: post.excerpt.fr, en: post.excerpt.en || '', ar: post.excerpt.ar || '' },
      content: {
        fr: post.content?.fr || [],
        en: post.content?.en || [],
        ar: post.content?.ar || []
      },
      categoryLabel: {
        fr: post.categoryLabel?.fr || post.category,
        en: post.categoryLabel?.en || post.category,
        ar: post.categoryLabel?.ar || post.category
      },
      tags: {
        fr: post.tags?.fr || [],
        en: post.tags?.en || [],
        ar: post.tags?.ar || []
      }
    });
    setParagraphInput('');
    setTagInput('');
    onOpenModal();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.fr) {
      alert('Veuillez renseigner au moins le titre en français.');
      return;
    }

    const finalSlug = formData.slug || formData.title.fr.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const postPayload: BlogPostItem = {
      slug: finalSlug,
      title: {
        fr: formData.title.fr,
        en: formData.title.en || formData.title.fr,
        ar: formData.title.ar || formData.title.fr
      },
      excerpt: {
        fr: formData.excerpt?.fr || '',
        en: formData.excerpt?.en || formData.excerpt?.fr || '',
        ar: formData.excerpt?.ar || formData.excerpt?.fr || ''
      },
      content: {
        fr: (formData.content as any)?.fr?.length ? (formData.content as any).fr : ['Contenu en rédaction...'],
        en: (formData.content as any)?.en?.length ? (formData.content as any).en : (formData.content as any)?.fr || [],
        ar: (formData.content as any)?.ar?.length ? (formData.content as any).ar : (formData.content as any)?.fr || []
      },
      category: formData.category || 'creation-site-web',
      categoryLabel: {
        fr: formData.categoryLabel?.fr || 'Création de site',
        en: formData.categoryLabel?.en || 'Web Development',
        ar: formData.categoryLabel?.ar || 'تطوير المواقع'
      },
      readTime: formData.readTime || '5 min',
      publishDate: formData.publishDate || new Date().toISOString().slice(0, 10),
      author: formData.author || 'Sofienne Boukhris',
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      tags: {
        fr: (formData.tags as any)?.fr || [],
        en: (formData.tags as any)?.en || [],
        ar: (formData.tags as any)?.ar || []
      },
      published: formData.published !== false
    };

    if (editingPost) {
      updateBlogPost(editingPost.slug, postPayload);
    } else {
      addBlogPost(postPayload);
    }

    onCloseModal();
  };

  const handleAddParagraph = () => {
    if (!paragraphInput.trim()) return;
    const current = (formData.content as any)?.[activeLangTab] || [];
    setFormData({
      ...formData,
      content: {
        ...(formData.content as any),
        [activeLangTab]: [...current, paragraphInput.trim()]
      }
    });
    setParagraphInput('');
  };

  const handleRemoveParagraph = (index: number) => {
    const current = (formData.content as any)?.[activeLangTab] || [];
    setFormData({
      ...formData,
      content: {
        ...(formData.content as any),
        [activeLangTab]: current.filter((_: any, i: number) => i !== index)
      }
    });
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const current = (formData.tags as any)?.[activeLangTab] || [];
    if (!current.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: {
          ...(formData.tags as any),
          [activeLangTab]: [...current, tagInput.trim()]
        }
      });
    }
    setTagInput('');
  };

  const handleRemoveTag = (tag: string) => {
    const current = (formData.tags as any)?.[activeLangTab] || [];
    setFormData({
      ...formData,
      tags: {
        ...(formData.tags as any),
        [activeLangTab]: current.filter((t: string) => t !== tag)
      }
    });
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch =
      post.title.fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.title.en && post.title.en.toLowerCase().includes(searchTerm.toLowerCase())) ||
      post.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'all' || post.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Search & New Post Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#00283A] border border-[#0a3d54] p-4 rounded-xl">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#919ca1]" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Rechercher par titre ou slug..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white placeholder-[#919ca1] focus:outline-none focus:border-[#70ba65]"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-[#dedee0] focus:outline-none focus:border-[#70ba65]"
          >
            <option value="all">Toutes catégories</option>
            <option value="creation-site-web">Création de site web</option>
            <option value="wordpress">WordPress</option>
            <option value="e-commerce">E-Commerce</option>
            <option value="seo">SEO & Référencement</option>
          </select>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#70ba65] text-[#00151F] font-bold text-xs rounded-lg hover:bg-[#70ba65]/90 transition-colors shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Rédiger un Article</span>
        </button>
      </div>

      {/* Posts Table */}
      <div className="bg-[#00283A] border border-[#0a3d54] rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#dedee0]">
            <thead className="bg-[#02162B] border-b border-[#0a3d54] text-[11px] font-mono uppercase text-[#919ca1]">
              <tr>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Article (Titre FR / EN / AR)</th>
                <th className="px-4 py-3">Catégorie</th>
                <th className="px-4 py-3">Date & Lecture</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0a3d54]/50">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-[#919ca1]">
                    Aucun article trouvé.
                  </td>
                </tr>
              ) : (
                filteredPosts.map(post => (
                  <tr key={post.slug} className="hover:bg-[#02162B]/50 transition-colors">
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleBlogPostPublished(post.slug)}
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                          post.published !== false
                            ? 'bg-[#70ba65]/10 text-[#70ba65] border border-[#70ba65]/30'
                            : 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                        }`}
                        title="Cliquer pour changer le statut"
                      >
                        {post.published !== false ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Publié</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Brouillon</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-semibold text-white">{post.title.fr}</div>
                      <div className="text-[11px] text-[#919ca1] mt-0.5">
                        <span className="font-mono text-[9px] px-1 rounded bg-[#0a3d54] text-white mr-1">EN</span>
                        {post.title.en || '—'}
                      </div>
                      {post.title.ar && (
                        <div className="text-[11px] text-[#70ba65]/90 mt-0.5" dir="rtl">
                          <span className="font-mono text-[9px] px-1 rounded bg-[#0a3d54] text-white ml-1" dir="ltr">AR</span>
                          {post.title.ar}
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-[#00151F] border border-[#0a3d54] font-mono text-[10px] text-[#dedee0]">
                        {post.categoryLabel?.fr || post.category}
                      </span>
                    </td>

                    <td className="px-4 py-3 font-mono text-[11px] text-[#919ca1] whitespace-nowrap">
                      <div>{post.publishDate}</div>
                      <div className="text-[#dedee0]">{post.readTime}</div>
                    </td>

                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(post)}
                          className="p-1.5 rounded-lg bg-[#00151F] border border-[#0a3d54] hover:border-[#70ba65] text-[#dedee0] hover:text-[#70ba65] transition-colors"
                          title="Modifier l'article"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmSlug(post.slug)}
                          className="p-1.5 rounded-lg bg-[#00151F] border border-[#0a3d54] hover:border-red-500 text-[#dedee0] hover:text-red-400 transition-colors"
                          title="Supprimer l'article"
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
      {deleteConfirmSlug && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-[#00283A] border border-red-500/40 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-white text-base">Supprimer cet article ?</h3>
            </div>
            <p className="text-xs text-[#dedee0] leading-relaxed">
              Voulez-vous vraiment supprimer cet article de blog ? Il ne sera plus accessible sur le site public.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmSlug(null)}
                className="px-3 py-1.5 text-xs text-[#dedee0] bg-[#02162B] border border-[#0a3d54] rounded-lg"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  deleteBlogPost(deleteConfirmSlug);
                  setDeleteConfirmSlug(null);
                }}
                className="px-3 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-[#00283A] border border-[#0a3d54] rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-[#02162B] border-b border-[#0a3d54]">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#70ba65]" />
                <span>{editingPost ? "Modifier l'Article" : 'Rédiger un Nouvel Article'}</span>
              </h3>
              <button
                onClick={onCloseModal}
                className="p-1 rounded-lg text-[#919ca1] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              {/* Language Selector */}
              <div className="flex items-center justify-between bg-[#02162B] p-2 rounded-xl border border-[#0a3d54]">
                <span className="text-xs font-medium text-[#919ca1] px-2 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#70ba65]" />
                  <span>Langue d'édition de l'article :</span>
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

              {/* Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white mb-1">
                    Titre ({activeLangTab.toUpperCase()}) *
                  </label>
                  <input
                    type="text"
                    required={activeLangTab === 'fr'}
                    value={(formData.title as any)?.[activeLangTab] || ''}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        title: { ...(formData.title as any), [activeLangTab]: e.target.value }
                      })
                    }
                    placeholder="Ex: Pourquoi choisir un développeur freelance..."
                    className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                    dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1">Slug URL</label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="pourquoi-choisir-developpeur-freelance"
                    className="w-full px-3 py-2 text-xs font-mono bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  Extrait / Chapeau ({activeLangTab.toUpperCase()})
                </label>
                <textarea
                  rows={2}
                  value={(formData.excerpt as any)?.[activeLangTab] || ''}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      excerpt: { ...(formData.excerpt as any), [activeLangTab]: e.target.value }
                    })
                  }
                  placeholder="Résumé percutant affiché sur la liste du blog..."
                  className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                  dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>

              {/* Meta information */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-[#02162B] p-4 rounded-xl border border-[#0a3d54]">
                <div>
                  <label className="block text-[11px] font-bold text-white mb-1">Catégorie</label>
                  <select
                    value={formData.category}
                    onChange={e => {
                      const cat = e.target.value;
                      const labels: Record<string, { fr: string; en: string; ar: string }> = {
                        'creation-site-web': { fr: 'Création de site', en: 'Web Development', ar: 'تطوير المواقع' },
                        wordpress: { fr: 'WordPress', en: 'WordPress', ar: 'ووردبريس' },
                        'e-commerce': { fr: 'E-Commerce', en: 'E-Commerce', ar: 'تجارة إلكترونية' },
                        seo: { fr: 'SEO & Visibilité', en: 'SEO & Search', ar: 'تحسين محركات البحث' }
                      };
                      setFormData({
                        ...formData,
                        category: cat,
                        categoryLabel: labels[cat] || { fr: cat, en: cat, ar: cat }
                      });
                    }}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:outline-none"
                  >
                    <option value="creation-site-web">Création de site</option>
                    <option value="wordpress">WordPress</option>
                    <option value="e-commerce">E-Commerce</option>
                    <option value="seo">SEO & Visibilité</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-white mb-1">Temps de lecture</label>
                  <input
                    type="text"
                    value={formData.readTime || '5 min'}
                    onChange={e => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-white mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.publishDate}
                    onChange={e => setFormData({ ...formData, publishDate: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-white mb-1">Auteur</label>
                  <input
                    type="text"
                    value={formData.author || 'Sofienne Boukhris'}
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-bold text-white mb-1">Image de couverture (URL)</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.imageUrl || ''}
                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-2 text-xs font-mono bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                  />
                  {formData.imageUrl && (
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-12 h-9 object-cover rounded-lg border border-[#0a3d54]"
                    />
                  )}
                </div>
              </div>

              {/* Content Paragraphs list */}
              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  Paragraphes de l'article ({activeLangTab.toUpperCase()})
                </label>
                <div className="space-y-2 mb-2">
                  <textarea
                    rows={3}
                    value={paragraphInput}
                    onChange={e => setParagraphInput(e.target.value)}
                    placeholder="Ajouter un nouveau paragraphe au texte..."
                    className="w-full px-3 py-2 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:border-[#70ba65] focus:outline-none"
                    dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                  />
                  <button
                    type="button"
                    onClick={handleAddParagraph}
                    className="px-3 py-1.5 bg-[#0a3d54] hover:bg-[#70ba65] hover:text-[#00151F] text-xs font-bold text-white rounded-lg transition-colors"
                  >
                    + Ajouter le paragraphe
                  </button>
                </div>

                <div className="space-y-2 mt-3">
                  {((formData.content as any)?.[activeLangTab] || []).map(
                    (p: string, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-[#00151F] border border-[#0a3d54]/60 text-xs text-[#dedee0] relative group"
                      >
                        <button
                          type="button"
                          onClick={() => handleRemoveParagraph(idx)}
                          className="absolute top-2 right-2 text-[#919ca1] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Supprimer ce paragraphe"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <span className="font-mono text-[10px] text-[#70ba65] block mb-1">
                          § Paragraphe {idx + 1}
                        </span>
                        <p className="leading-relaxed" dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}>
                          {p}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Tags Input */}
              <div>
                <label className="block text-xs font-bold text-white mb-1">
                  Tags & Mots-clés ({activeLangTab.toUpperCase()})
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="Ex: Conseil Web, SEO Tunisie..."
                    className="flex-1 px-3 py-1.5 text-xs bg-[#00151F] border border-[#0a3d54] rounded-lg text-white focus:outline-none"
                    dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 py-1.5 bg-[#0a3d54] hover:bg-[#70ba65] hover:text-[#00151F] text-xs font-bold text-white rounded-lg transition-colors"
                  >
                    Ajouter Tag
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {((formData.tags as any)?.[activeLangTab] || []).map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#00151F] border border-[#0a3d54] text-xs text-white"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-[#919ca1] hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Published switch */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#02162B] border border-[#0a3d54]">
                <div>
                  <div className="text-xs font-bold text-white">Publier immédiatement</div>
                  <div className="text-[11px] text-[#919ca1]">
                    Si désactivé, l'article sera conservé en brouillon non visible sur le site.
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
                  {editingPost ? 'Enregistrer les modifications' : "Publier l'article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

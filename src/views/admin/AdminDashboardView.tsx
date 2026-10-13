import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Activity,
  Search,
  Briefcase,
  Calculator,
  FileText,
  FolderKanban,
  Languages,
  Settings,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  ShieldAlert,
  Sparkles,
  ArrowLeft,
  LogOut,
  MessageSquare,
  Users
} from 'lucide-react';
import { AdminOverviewTab } from './AdminOverviewTab';
import { AdminServicesTab } from './AdminServicesTab';
import { AdminCalculatorTab } from './AdminCalculatorTab';
import { AdminAnalyticsTab } from './AdminAnalyticsTab';
import { AdminSEOAuditTab } from './AdminSEOAuditTab';
import { AdminBlogTab } from './AdminBlogTab';
import { AdminProjectsTab } from './AdminProjectsTab';
import { AdminTranslationsTab } from './AdminTranslationsTab';
import { AdminSettingsTab } from './AdminSettingsTab';
import { AdminCalculatorLeadsTab } from './AdminCalculatorLeadsTab';
import { AdminFormSubmissionsTab } from './AdminFormSubmissionsTab';
import { ServiceItem, BlogPostItem, ProjectItem } from '../../types';

export const AdminDashboardView: React.FC = () => {
  const { navigate } = useRouter();
  const { signOut } = useAuth();
  const { saveStatus } = useData();

  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals state across tabs
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPostItem | null>(null);

  const navItems = [
    { id: 'overview', label: 'Vue Globale', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'seo-audit', label: 'Audit SEO', icon: Search },
    { id: 'services', label: 'Services & Prestations', icon: Briefcase },
    { id: 'calculator', label: 'Config. Calculator', icon: Calculator },
    { id: 'calculator-leads', label: 'Demandes Calculator', icon: Users },
    { id: 'form-submissions', label: 'Formulaires & Messages', icon: MessageSquare },
    { id: 'translations', label: 'Traductions (FR/EN/AR)', icon: Languages },
    { id: 'blog', label: 'Articles de Blog', icon: FileText },
    { id: 'projects', label: 'Portfolio Réalisations', icon: FolderKanban },
    { id: 'settings', label: 'Sauvegardes & Données', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#00151F] text-[#dedee0] flex flex-col font-sans">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 bg-[#00283A] border-b border-[#0a3d54] px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-[#02162B] border border-[#0a3d54] text-[#dedee0] md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#00151F] border border-[#70ba65]/40 flex items-center justify-center flex-shrink-0">
              <img 
                src="/assets/logo.webp" 
                alt="Sofienne Boukhris Logo" 
                width="32" 
                height="32" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <div className="text-xs font-bold text-white tracking-wide flex items-center gap-2">
                <span>Sofienne Boukhris</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#70ba65]/10 text-[#70ba65] border border-[#70ba65]/30 hidden sm:inline-block">
                  Admin v2.0
                </span>
              </div>
              <div className="text-[10px] text-[#919ca1] font-mono">
                Panneau d'administration en direct
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Sync indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#02162B] border border-[#0a3d54] text-[11px] font-mono">
            <span
              className={`w-2 h-2 rounded-full ${
                saveStatus === 'saved' ? 'bg-[#70ba65]' : 'bg-amber-400 animate-pulse'
              }`}
            />
            <span className={saveStatus === 'saved' ? 'text-[#70ba65]' : 'text-amber-400'}>
              {saveStatus === 'saved' ? 'Synchronisé au site' : 'Enregistrement...'}
            </span>
          </div>

          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#02162B] border border-[#0a3d54] hover:border-[#70ba65] text-xs font-semibold text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#70ba65]" />
            <span className="hidden sm:inline">Retour au site public</span>
            <span className="sm:hidden">Site</span>
          </button>
          
          <button
            onClick={async () => {
              await signOut();
              navigate('/admin');
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-xs font-semibold text-red-400 transition-colors"
            title="Déconnexion"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace Container */}
      <div className="flex-1 flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4 lg:px-8 py-6 gap-6">
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden md:block w-64 shrink-0 space-y-1">
          <div className="bg-[#00283A] border border-[#0a3d54] rounded-xl p-3 space-y-1 sticky top-20 shadow-md">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#919ca1] px-3 py-2">
              Navigation Admin
            </div>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#70ba65] text-[#00151F] font-bold shadow-sm'
                      : 'text-[#dedee0] hover:bg-[#02162B] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#00283A] border border-[#0a3d54] rounded-xl p-3 space-y-1 shadow-xl mb-4">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#70ba65] text-[#00151F] font-bold shadow-sm'
                      : 'text-[#dedee0] hover:bg-[#02162B] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        )}

        {/* Dynamic Tab Content Area */}
        <main className="flex-1 min-w-0">
          {currentTab === 'overview' && (
            <AdminOverviewTab
              onSelectTab={tab => setCurrentTab(tab)}
              onOpenNewService={() => {
                setEditingService(null);
                setServiceModalOpen(true);
                setCurrentTab('services');
              }}
              onOpenNewProject={() => {
                setEditingProject(null);
                setProjectModalOpen(true);
                setCurrentTab('projects');
              }}
              onOpenNewBlog={() => {
                setEditingBlogPost(null);
                setBlogModalOpen(true);
                setCurrentTab('blog');
              }}
            />
          )}

          {currentTab === 'services' && (
            <AdminServicesTab
              isModalOpen={serviceModalOpen}
              onOpenModal={() => setServiceModalOpen(true)}
              onCloseModal={() => {
                setServiceModalOpen(false);
                setEditingService(null);
              }}
              editingService={editingService}
              setEditingService={setEditingService}
            />
          )}
          {currentTab === 'calculator' && <AdminCalculatorTab />}
          {currentTab === 'calculator-leads' && <AdminCalculatorLeadsTab />}
          {currentTab === 'form-submissions' && <AdminFormSubmissionsTab />}
          {currentTab === 'analytics' && <AdminAnalyticsTab />}
          {currentTab === 'seo-audit' && <AdminSEOAuditTab />}
          {currentTab === 'translations' && <AdminTranslationsTab />}

          {currentTab === 'blog' && (
            <AdminBlogTab
              isModalOpen={blogModalOpen}
              onOpenModal={() => setBlogModalOpen(true)}
              onCloseModal={() => {
                setBlogModalOpen(false);
                setEditingBlogPost(null);
              }}
              editingPost={editingBlogPost}
              setEditingPost={setEditingBlogPost}
            />
          )}

          {currentTab === 'projects' && (
            <AdminProjectsTab
              isModalOpen={projectModalOpen}
              onOpenModal={() => setProjectModalOpen(true)}
              onCloseModal={() => {
                setProjectModalOpen(false);
                setEditingProject(null);
              }}
              editingProject={editingProject}
              setEditingProject={setEditingProject}
            />
          )}

          {currentTab === 'settings' && <AdminSettingsTab />}
        </main>
      </div>
    </div>
  );
};

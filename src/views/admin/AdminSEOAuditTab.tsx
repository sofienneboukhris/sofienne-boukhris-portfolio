import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { Search, AlertTriangle, CheckCircle, Info, RefreshCw, XCircle, FileText, Briefcase, FolderKanban, ChevronDown, ChevronUp } from 'lucide-react';

type IssueType = 'error' | 'warning' | 'success';

interface SEOIssue {
  type: IssueType;
  message: string;
  element: string;
}

interface PageAuditResult {
  id: string;
  type: 'blog' | 'project' | 'service';
  title: string;
  url: string;
  issues: SEOIssue[];
  score: number;
}

export const AdminSEOAuditTab: React.FC = () => {
  const { blogPosts, projects, services } = useData();
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<PageAuditResult[] | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const validPaths = useMemo(() => {
    const paths = new Set<string>();
    const basePaths = ['/', '/services', '/realisations', '/tarifs', '/a-propos', '/faq', '/contact', '/calculateur', '/blog'];
    const langs = ['', '/en', '/ar'];
    
    langs.forEach(l => {
      basePaths.forEach(bp => {
        paths.add(l + bp);
        if (bp === '/' && l !== '') paths.add(l); 
      });
    });

    services.forEach(s => {
      paths.add(`/services/${s.slug}`);
      paths.add(`/en/services/${s.slug}`);
      paths.add(`/ar/services/${s.slug}`);
    });
    projects.forEach(p => {
      paths.add(`/realisations/${p.slug}`);
      paths.add(`/en/projects/${p.slug}`);
      paths.add(`/ar/projects/${p.slug}`);
    });
    blogPosts.forEach(b => {
      paths.add(`/blog/${b.slug}`);
      paths.add(`/en/blog/${b.slug}`);
      paths.add(`/ar/blog/${b.slug}`);
    });
    
    return paths;
  }, [blogPosts, projects, services]);

  const scanContent = (content: string, url: string, issues: SEOIssue[]) => {
    if (!content) return;
    
    // Markdown Images: ![alt](url)
    const mdImageRegex = /!\[(.*?)\]\((.*?)\)/g;
    let match;
    while ((match = mdImageRegex.exec(content)) !== null) {
      const alt = match[1];
      const imgUrl = match[2];
      if (!alt || alt.trim() === '') {
        issues.push({ type: 'warning', element: 'Image Alt', message: `Image sans balise alt détectée : ${imgUrl}` });
      }
    }

    // HTML Images: <img src="..." alt="...">
    const htmlImageRegex = /<img([^>]+)>/gi;
    while ((match = htmlImageRegex.exec(content)) !== null) {
      const imgTag = match[1];
      const altMatch = imgTag.match(/alt=["'](.*?)["']/i);
      if (!altMatch || !altMatch[1] || altMatch[1].trim() === '') {
        issues.push({ type: 'warning', element: 'Image Alt', message: 'Image HTML sans balise alt détectée' });
      }
    }

    // Markdown Links: [text](url)
    const mdLinkRegex = /(?<!!)\[(.*?)\]\((.*?)\)/g;
    while ((match = mdLinkRegex.exec(content)) !== null) {
      const linkUrl = match[2];
      if (linkUrl.startsWith('/')) {
        const urlWithoutHash = linkUrl.split('#')[0];
        if (urlWithoutHash !== '/' && urlWithoutHash !== '' && !validPaths.has(urlWithoutHash)) {
           issues.push({ type: 'error', element: 'Lien Interne', message: `Lien interne cassé détecté : ${linkUrl}` });
        }
      }
    }
    
    // HTML Links: <a href="...">
    const htmlLinkRegex = /<a[^>]+href=["'](.*?)["'][^>]*>/gi;
    while ((match = htmlLinkRegex.exec(content)) !== null) {
      const linkUrl = match[1];
      if (linkUrl.startsWith('/')) {
        const urlWithoutHash = linkUrl.split('#')[0];
        if (urlWithoutHash !== '/' && urlWithoutHash !== '' && !validPaths.has(urlWithoutHash)) {
           issues.push({ type: 'error', element: 'Lien Interne', message: `Lien interne cassé détecté : ${linkUrl}` });
        }
      }
    }
  };

  const runScan = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      const newResults: PageAuditResult[] = [];

      // Scan Blog Posts
      blogPosts.forEach(post => {
        const issues: SEOIssue[] = [];
        
        // Meta description
        if (!post.excerpt?.fr || post.excerpt.fr.trim() === '') {
          issues.push({ type: 'error', element: 'Meta Description', message: 'Meta description manquante (FR)' });
        } else if (post.excerpt.fr.length < 50) {
          issues.push({ type: 'warning', element: 'Meta Description', message: 'Meta description potentiellement trop courte (FR)' });
        } else if (post.excerpt.fr.length > 160) {
          issues.push({ type: 'warning', element: 'Meta Description', message: 'Meta description trop longue (> 160 chars) (FR)' });
        }

        scanContent(post.content?.fr?.join('\n') || '', `/blog/${post.slug}`, issues);

        if (issues.length === 0) issues.push({ type: 'success', element: 'SEO', message: 'Aucun problème détecté sur cette page.' });
        
        const errors = issues.filter(i => i.type === 'error').length;
        const warnings = issues.filter(i => i.type === 'warning').length;
        let score = 100 - (errors * 20) - (warnings * 5);
        if (score < 0) score = 0;

        newResults.push({
          id: `blog-${post.slug}`,
          type: 'blog',
          title: post.title.fr,
          url: `/blog/${post.slug}`,
          issues,
          score
        });
      });

      // Scan Projects
      projects.forEach(project => {
        const issues: SEOIssue[] = [];
        
        if (!project.description?.fr || project.description.fr.trim() === '') {
          issues.push({ type: 'error', element: 'Meta Description', message: 'Description SEO manquante (FR)' });
        }
        
        const projectContent = [
          project.context?.fr || '',
          ...(project.objectives?.fr || []),
          ...(project.solution?.fr || []),
          ...(project.features?.fr || []),
          project.verifiedResults?.fr || '',
          project.role?.fr || ''
        ].join('\n');
        
        scanContent(projectContent, `/realisations/${project.slug}`, issues);

        if (issues.length === 0) issues.push({ type: 'success', element: 'SEO', message: 'Aucun problème détecté sur cette page.' });

        const errors = issues.filter(i => i.type === 'error').length;
        const warnings = issues.filter(i => i.type === 'warning').length;
        let score = 100 - (errors * 20) - (warnings * 5);
        if (score < 0) score = 0;

        newResults.push({
          id: `proj-${project.id}`,
          type: 'project',
          title: project.title,
          url: `/realisations/${project.slug}`,
          issues,
          score
        });
      });

      // Scan Services
      services.forEach(service => {
        const issues: SEOIssue[] = [];
        
        if (!service.shortDescription?.fr || service.shortDescription.fr.trim() === '') {
          issues.push({ type: 'error', element: 'Meta Description', message: 'Description courte manquante (FR)' });
        }
        
        scanContent(service.fullDescription?.fr || '', `/services/${service.slug}`, issues);

        if (issues.length === 0) issues.push({ type: 'success', element: 'SEO', message: 'Aucun problème détecté sur cette page.' });

        const errors = issues.filter(i => i.type === 'error').length;
        const warnings = issues.filter(i => i.type === 'warning').length;
        let score = 100 - (errors * 20) - (warnings * 5);
        if (score < 0) score = 0;

        newResults.push({
          id: `srv-${service.id}`,
          type: 'service',
          title: service.title.fr,
          url: `/services/${service.slug}`,
          issues,
          score
        });
      });

      // Sort by score ascending (worst first)
      newResults.sort((a, b) => a.score - b.score);

      setResults(newResults);
      setIsScanning(false);
    }, 1200);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-[#70ba65] bg-[#70ba65]/10 border-[#70ba65]/30';
    if (score >= 70) return 'text-[#e28743] bg-[#e28743]/10 border-[#e28743]/30';
    return 'text-[#ff4a4a] bg-[#ff4a4a]/10 border-[#ff4a4a]/30';
  };

  const getIssueIcon = (type: IssueType) => {
    switch (type) {
      case 'error': return <XCircle className="w-4 h-4 text-[#ff4a4a]" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-[#e28743]" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-[#70ba65]" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'blog': return <FileText className="w-4 h-4 text-[#919ca1]" />;
      case 'service': return <Briefcase className="w-4 h-4 text-[#919ca1]" />;
      case 'project': return <FolderKanban className="w-4 h-4 text-[#919ca1]" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#00283A] p-4 rounded-xl border border-[#0a3d54]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#70ba65]/10 rounded-lg">
            <Search className="w-5 h-5 text-[#70ba65]" />
          </div>
          <div>
            <h2 className="text-white font-bold text-sm">Audit SEO Automatisé</h2>
            <p className="text-xs text-[#919ca1]">Scannez vos pages pour détecter les problèmes de référencement (Balises manquantes, Liens cassés)</p>
          </div>
        </div>
        
        <button 
          onClick={runScan}
          disabled={isScanning}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#70ba65] text-[#00151F] font-bold text-xs font-mono uppercase tracking-wider rounded-lg hover:bg-[#86efac] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isScanning ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyse en cours...</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>Lancer un Audit</span>
            </>
          )}
        </button>
      </div>

      {/* Results View */}
      {results && !isScanning && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#00283A] p-4 rounded-xl border border-[#0a3d54] flex flex-col gap-1">
              <span className="text-[#919ca1] text-xs font-bold uppercase tracking-wider">Score Global Moyen</span>
              <div className="text-3xl font-bold text-white font-mono">
                {Math.round(results.reduce((acc, r) => acc + r.score, 0) / (results.length || 1))}/100
              </div>
            </div>
            <div className="bg-[#00283A] p-4 rounded-xl border border-[#0a3d54] flex flex-col gap-1">
              <span className="text-[#919ca1] text-xs font-bold uppercase tracking-wider">Erreurs critiques</span>
              <div className="text-3xl font-bold text-[#ff4a4a] font-mono">
                {results.reduce((acc, r) => acc + r.issues.filter(i => i.type === 'error').length, 0)}
              </div>
            </div>
            <div className="bg-[#00283A] p-4 rounded-xl border border-[#0a3d54] flex flex-col gap-1">
              <span className="text-[#919ca1] text-xs font-bold uppercase tracking-wider">Avertissements</span>
              <div className="text-3xl font-bold text-[#e28743] font-mono">
                {results.reduce((acc, r) => acc + r.issues.filter(i => i.type === 'warning').length, 0)}
              </div>
            </div>
          </div>

          <div className="bg-[#00283A] border border-[#0a3d54] rounded-xl overflow-hidden">
            {results.map((result, idx) => {
              const isExpanded = expandedId === result.id;
              
              return (
                <div key={result.id} className={`border-b border-[#0a3d54] last:border-b-0 ${idx % 2 === 0 ? 'bg-[#00151F]/40' : 'bg-transparent'}`}>
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#02162B] transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : result.id)}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`px-2 py-1 rounded text-xs font-bold border ${getScoreColor(result.score)} min-w-[50px] text-center`}>
                        {result.score}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(result.type)}
                          <span className="text-white font-bold text-sm">{result.title}</span>
                        </div>
                        <span className="text-[#919ca1] text-xs font-mono">{result.url}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex items-center gap-3">
                        {result.issues.filter(i => i.type === 'error').length > 0 && (
                          <div className="flex items-center gap-1 text-[#ff4a4a] text-xs font-bold bg-[#ff4a4a]/10 px-2 py-0.5 rounded">
                            <XCircle className="w-3 h-3" /> {result.issues.filter(i => i.type === 'error').length} err
                          </div>
                        )}
                        {result.issues.filter(i => i.type === 'warning').length > 0 && (
                          <div className="flex items-center gap-1 text-[#e28743] text-xs font-bold bg-[#e28743]/10 px-2 py-0.5 rounded">
                            <AlertTriangle className="w-3 h-3" /> {result.issues.filter(i => i.type === 'warning').length} warn
                          </div>
                        )}
                      </div>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-[#919ca1]" /> : <ChevronDown className="w-5 h-5 text-[#919ca1]" />}
                    </div>
                  </div>

                  {/* Expanded Issues Details */}
                  {isExpanded && (
                    <div className="p-4 bg-[#00151F] border-t border-[#0a3d54]">
                      <ul className="space-y-3">
                        {result.issues.map((issue, iIndex) => (
                          <li key={iIndex} className="flex items-start gap-3">
                            <div className="mt-0.5 shrink-0">{getIssueIcon(issue.type)}</div>
                            <div>
                              <span className="text-white text-sm font-bold block mb-0.5">{issue.element}</span>
                              <span className="text-[#919ca1] text-xs">{issue.message}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State / Initial State */}
      {!results && !isScanning && (
        <div className="text-center py-16 bg-[#00283A] border border-[#0a3d54] rounded-xl">
          <Search className="w-12 h-12 text-[#919ca1] mx-auto mb-4 opacity-50" />
          <h3 className="text-white font-bold mb-2">Prêt pour l'audit</h3>
          <p className="text-[#919ca1] text-sm max-w-md mx-auto">
            L'audit SEO analyse la présence des balises alt sur vos images, vérifie la présence et longueur de vos méta-descriptions et détecte les liens internes cassés dans vos pages.
          </p>
        </div>
      )}
    </div>
  );
};

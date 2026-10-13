import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { SidebarCard } from '../components/SidebarCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { FAQS } from '../data/faq';
import { 
  HelpCircle, 
  Search, 
  Code2, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const FAQView: React.FC = () => {
  const { lang, navigate, path } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showSchemaViewer, setShowSchemaViewer] = useState(false);
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: 'all', label: lang === 'fr' ? 'Toutes les questions' : 'All Questions' },
    { id: 'tarifs', label: lang === 'fr' ? 'Tarifs & TJM' : 'Pricing & Rates' },
    { id: 'technical', label: lang === 'fr' ? 'Technologies & CMS' : 'Tech & CMS' },
    { id: 'process', label: lang === 'fr' ? 'Process & Collaboration' : 'Process & Workflow' },
    { id: 'seo', label: lang === 'fr' ? 'SEO & Performance' : 'SEO & Performance' },
    { id: 'support', label: lang === 'fr' ? 'Maintenance & Sécurité' : 'Maintenance & Security' },
    { id: 'general', label: lang === 'fr' ? 'Général & Délais' : 'General & Timelines' }
  ];

  const quickSearchKeywords = [
    { label: lang === 'fr' ? 'Tarif & TJM' : 'Pricing & TJM', query: 'tarif' },
    { label: lang === 'fr' ? 'Freelance vs Agence' : 'Freelance vs Agency', query: 'agence' },
    { label: lang === 'fr' ? 'WordPress vs Shopify' : 'WordPress vs Shopify', query: 'wordpress' },
    { label: lang === 'fr' ? 'Code source propriétaire' : 'Full Code Ownership', query: 'propriétaire' },
    { label: lang === 'fr' ? 'SEO & Core Web Vitals' : 'SEO & Web Vitals', query: 'seo' },
    { label: lang === 'fr' ? 'Maintenance 24/7' : 'Maintenance', query: 'maintenance' }
  ];

  const filteredFaqs = FAQS.filter((f) => {
    const matchesCategory = selectedCategory === 'all' || f.category === selectedCategory;
    const matchesSearch = searchTerm.trim() === '' || 
      f.question[lang].toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer[lang].toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const schemaFaqs = FAQS.map(f => ({
    question: f.question[lang],
    answer: f.answer[lang]
  }));

  const canonicalUrl = `https://sofienneboukhris.com${lang === 'fr' ? '/faq' : '/en/faq'}`;

  const generatedJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faqpage`,
    url: canonicalUrl,
    name: lang === 'fr' 
      ? 'Foire Aux Questions (FAQ) Développement Web | Sofienne Boukhris'
      : 'Web Development FAQ & Common Queries | Sofienne Boukhris',
    description: lang === 'fr'
      ? "Réponses transparentes aux questions fréquentes sur la création de sites web, les tarifs TJM, WordPress, Shopify, Laravel et le SEO technique par Sofienne Boukhris."
      : "Transparent answers to common questions regarding website creation, freelance rates, WordPress, Shopify, Laravel, and technical SEO by Sofienne Boukhris.",
    inLanguage: lang === 'fr' ? 'fr-FR' : 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://sofienneboukhris.com/#website',
      name: 'Sofienne Boukhris | Développeur Web Freelance',
      url: 'https://sofienneboukhris.com'
    },
    author: {
      '@type': 'Person',
      '@id': 'https://sofienneboukhris.com/#person',
      name: 'Sofienne Boukhris',
      jobTitle: 'Freelance Full-Stack Web Developer',
      url: 'https://sofienneboukhris.com'
    },
    mainEntity: schemaFaqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer
      }
    }))
  };

  const handleCopyJsonLd = () => {
    navigator.clipboard.writeText(JSON.stringify(generatedJsonLd, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <SEOHead
        title={lang === 'fr' ? 'Foire Aux Questions (FAQ) Développement Web' : 'Web Development FAQ'}
        description={lang === 'fr'
          ? "Réponses à toutes vos questions sur la création de site web, les délais, les prix, WordPress, Shopify, Laravel et le SEO par Sofienne Boukhris."
          : "Answers to common questions about web development, timelines, pricing, WordPress, Shopify, Laravel, and SEO by Sofienne Boukhris."
        }
        canonicalPath={lang === 'fr' ? '/faq' : '/en/faq'}
        schemaType="faq"
        schemaData={{ faqs: schemaFaqs }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <SidebarCard />

          <main className="flex-1 w-full space-y-10">
            <Breadcrumbs
              items={[
                { label: lang === 'fr' ? 'FAQ' : 'FAQ' }
              ]}
            />

            {/* Header */}
            <div className="trm-card p-6 sm:p-10 relative overflow-hidden">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#02162B] border border-[#0a3d54] text-[11px] font-mono text-[#70ba65] uppercase tracking-wider">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'fr' ? 'Questions Fréquentes' : 'Frequently Asked Questions'}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#70ba65]/10 border border-[#70ba65]/30 text-[11px] font-mono text-[#70ba65]">
                  <Sparkles className="w-3 h-3" />
                  <span>{lang === 'fr' ? 'Balisage JSON-LD actif' : 'JSON-LD Schema Active'}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
                {lang === 'fr' ? (
                  <>Toutes les réponses à vos <span className="text-[#70ba65]">questions</span></>
                ) : (
                  <>Answers to your <span className="text-[#70ba65]">technical questions</span></>
                )}
              </h1>

              <p className="text-sm sm:text-base text-[#a8b4b9] leading-relaxed max-w-3xl mb-6">
                {lang === 'fr'
                  ? "Vous préparez un projet de site web ou de refonte ? Retrouvez ici les réponses transparentes aux questions les plus courantes concernant les tarifs, les délais, les technologies et le suivi technique."
                  : "Planning a website creation or redesign? Here are clear, transparent answers regarding timelines, pricing, technologies, and technical maintenance."}
              </p>

              {/* Search Bar */}
              <div className="relative max-w-lg mb-4">
                <Search className="w-4 h-4 text-[#919ca1] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={lang === 'fr' ? 'Rechercher une question (ex. WordPress, prix, SEO, TJM)...' : 'Search questions (e.g. WordPress, pricing, SEO, TJM)...'}
                  className="w-full bg-[#02162B] border border-[#0a3d54] rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#919ca1]/50 focus:outline-none focus:ring-2 focus:ring-[#70ba65] transition-colors"
                />
              </div>

              {/* Quick Query Suggestions */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] text-[#919ca1] font-medium">
                  {lang === 'fr' ? 'Requêtes fréquentes :' : 'Popular queries:'}
                </span>
                {quickSearchKeywords.map((kw, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchTerm(kw.query);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded bg-[#02162B] hover:bg-[#0a3d54] border border-[#0a3d54] text-[#a8b4b9] hover:text-[#70ba65] transition-colors"
                  >
                    {kw.label}
                  </button>
                ))}
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-[11px] text-[#e06c75] hover:underline ml-1"
                  >
                    {lang === 'fr' ? 'Effacer la recherche' : 'Clear search'}
                  </button>
                )}
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#70ba65] text-white border-[#70ba65] shadow-md'
                      : 'bg-[#00283A] text-[#919ca1] border-[#0a3d54] hover:text-white hover:border-[#70ba65]/50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Accordion Component */}
            {filteredFaqs.length > 0 ? (
              <FAQAccordion items={filteredFaqs} />
            ) : (
              <div className="trm-card p-8 text-center text-[#919ca1] text-sm">
                {lang === 'fr' ? 'Aucune question ne correspond à votre recherche.' : 'No matching questions found.'}
              </div>
            )}

            {/* JSON-LD Schema Markup Inspection Card for Developers & SEO Auditors */}
            <div className="trm-card p-6 sm:p-8 space-y-4 border border-[#0a3d54]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#70ba65]" />
                    <h3 className="text-base font-serif font-bold text-white">
                      {lang === 'fr' ? 'Données structurées Schema.org FAQPage (JSON-LD)' : 'Schema.org FAQPage Structured Data (JSON-LD)'}
                    </h3>
                  </div>
                  <p className="text-xs text-[#a8b4b9]">
                    {lang === 'fr'
                      ? 'Ce balisage sémantique est nativement injecté dans l’en-tête de la page pour activer les résultats enrichis Google (Rich Snippets) et l’indexation vocale.'
                      : 'This semantic markup is embedded in the page header to trigger Google Rich Snippets and improve voice search indexing for common developer queries.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setShowSchemaViewer(!showSchemaViewer)}
                    className="trm-btn trm-btn-border text-xs flex items-center gap-1.5 py-1.5 px-3"
                  >
                    <span>{showSchemaViewer ? (lang === 'fr' ? 'Masquer le JSON-LD' : 'Hide JSON-LD') : (lang === 'fr' ? 'Inspecter le JSON-LD' : 'Inspect JSON-LD')}</span>
                    {showSchemaViewer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <a
                    href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(canonicalUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="trm-btn trm-btn-border text-xs flex items-center gap-1.5 py-1.5 px-3 text-[#70ba65]"
                    title="Google Rich Results Test"
                  >
                    <span>Google Test</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                <span className="px-2.5 py-1 rounded bg-[#02162B] border border-[#0a3d54] text-[#a8b4b9]">
                  @type: <strong className="text-white">FAQPage</strong>
                </span>
                <span className="px-2.5 py-1 rounded bg-[#02162B] border border-[#0a3d54] text-[#a8b4b9]">
                  Questions: <strong className="text-[#70ba65]">{schemaFaqs.length}</strong>
                </span>
                <span className="px-2.5 py-1 rounded bg-[#02162B] border border-[#0a3d54] text-[#a8b4b9]">
                  Standard: <strong className="text-white">Schema.org / Google Search Central</strong>
                </span>
                <span className="px-2.5 py-1 rounded bg-[#02162B] border border-[#0a3d54] text-[#a8b4b9] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#70ba65]" />
                  <span>Validé</span>
                </span>
              </div>

              {/* Expandable JSON-LD Code Block */}
              {showSchemaViewer && (
                <div className="relative mt-4 pt-3 border-t border-[#0a3d54]/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-[#919ca1]">
                      &lt;script type=&quot;application/ld+json&quot;&gt;
                    </span>
                    <button
                      onClick={handleCopyJsonLd}
                      className="text-xs flex items-center gap-1.5 text-[#70ba65] hover:text-white transition-colors bg-[#02162B] px-3 py-1 rounded border border-[#0a3d54]"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#70ba65]" />
                          <span>{lang === 'fr' ? 'Copié !' : 'Copied!'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{lang === 'fr' ? 'Copier le JSON-LD' : 'Copy JSON-LD'}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="bg-[#01111d] p-4 rounded-lg border border-[#0a3d54] text-[11px] font-mono text-[#70ba65] overflow-x-auto max-h-72 overflow-y-auto leading-relaxed">
                    <code>{JSON.stringify(generatedJsonLd, null, 2)}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Contact Prompt */}
            <div className="trm-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#70ba65]/40">
              <div>
                <h3 className="text-lg font-serif font-bold text-white mb-1">
                  {lang === 'fr' ? 'Une question spécifique à votre projet ?' : 'Have a specific question about your project?'}
                </h3>
                <p className="text-xs sm:text-sm text-[#919ca1]">
                  {lang === 'fr' ? 'Je vous réponds directement et en toute transparence sous 24h.' : 'I respond directly and transparently within 24 hours.'}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => navigate(lang === 'fr' ? '/contact' : '/en/contact')}
                  className="trm-btn trm-btn-primary text-xs"
                >
                  {lang === 'fr' ? 'Poser ma question' : 'Ask a Question'}
                </button>
              </div>
            </div>

          </main>
        </div>
      </div>
    </>
  );
};


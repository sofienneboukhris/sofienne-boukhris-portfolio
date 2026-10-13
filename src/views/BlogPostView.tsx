import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';
import { useRouter } from '../context/RouterContext';
import { BlogPostItem } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { SidebarCard } from '../components/SidebarCard';
import { EmbeddedCalculator } from '../components/calculator/EmbeddedCalculator';
import { CodeBlock } from '../components/CodeBlock';
import { calculateReadingTime } from '../data/blog';
import { useData } from '../context/DataContext';
import { Calendar, Clock, ArrowLeft, ArrowRight, User, Share2, BookOpen, Tag } from 'lucide-react';

interface BlogPostViewProps {
  post: BlogPostItem;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({ post }) => {
  const { lang, navigate } = useRouter();
  const { scrollYProgress } = useScroll();
  const [readingProgress, setReadingProgress] = useState<number>(0);
  const articleRef = useRef<HTMLElement>(null);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setReadingProgress(Math.round(latest * 100));
  });

  // Dynamically calculate reading time based on total word count and language
  const readingEstimate = useMemo(() => {
    return calculateReadingTime(post, lang);
  }, [post, lang]);

  // Ensure any dynamically injected or raw <pre><code> blocks also receive a 'Copy Code' button
  useEffect(() => {
    if (!articleRef.current) return;

    const preElements = articleRef.current.querySelectorAll<HTMLPreElement>('pre');
    preElements.forEach((pre) => {
      // If already handled by our React CodeBlock component or already tagged, skip
      if (pre.closest('[data-code-block="true"]') || pre.dataset.hasCopyBtn === 'true') {
        return;
      }

      pre.dataset.hasCopyBtn = 'true';
      pre.classList.add('relative', 'group/native-pre', 'rounded-xl', 'p-4', 'bg-[#02162B]', 'border', 'border-[#0a3d54]');

      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#00283A] text-[#a8b4b9] hover:text-white border border-[#0a3d54] hover:border-[#70ba65] transition-all print:hidden z-10 cursor-pointer shadow';
      copyBtn.innerHTML = `
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
        <span>${lang === 'fr' ? 'Copier le code' : 'Copy Code'}</span>
      `;

      copyBtn.onclick = async () => {
        const codeElement = pre.querySelector('code') || pre;
        const textToCopy = (codeElement.textContent || '').trim();

        let success = false;
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(textToCopy);
            success = true;
          }
        } catch (err) {
          console.warn('Clipboard write failed, using fallback:', err);
        }

        if (!success) {
          try {
            const ta = document.createElement('textarea');
            ta.value = textToCopy;
            ta.style.position = 'fixed';
            ta.style.left = '-999999px';
            document.body.appendChild(ta);
            ta.select();
            success = document.execCommand('copy');
            document.body.removeChild(ta);
          } catch (e) {
            console.error(e);
          }
        }

        if (success) {
          copyBtn.className = 'absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#70ba65]/20 text-[#70ba65] border border-[#70ba65]/60 transition-all print:hidden z-10';
          copyBtn.innerHTML = `
            <svg class="w-3.5 h-3.5 text-[#70ba65]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span class="font-bold">${lang === 'fr' ? 'Copié !' : 'Copied!'}</span>
          `;
          setTimeout(() => {
            copyBtn.className = 'absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#00283A] text-[#a8b4b9] hover:text-white border border-[#0a3d54] hover:border-[#70ba65] transition-all print:hidden z-10 cursor-pointer shadow';
            copyBtn.innerHTML = `
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
              <span>${lang === 'fr' ? 'Copier le code' : 'Copy Code'}</span>
            `;
          }, 2400);
        }
      };

      pre.appendChild(copyBtn);
    });
  }, [post, lang]);

  // Helper to render article paragraphs and code snippets
  const renderParagraph = (paragraph: string, idx: number) => {
    // If paragraph contains markdown-style code block ```lang\ncode\n```
    if (paragraph.includes('```')) {
      const parts = paragraph.split(/(```[\s\S]*?```)/g);
      return (
        <div key={idx} className="space-y-4">
          {parts.map((part, pIdx) => {
            if (part.startsWith('```') && part.endsWith('```')) {
              const trimmed = part.trim();
              const firstLineEnd = trimmed.indexOf('\n');
              let language = 'code';
              let codeBody = '';
              if (firstLineEnd !== -1) {
                language = trimmed.slice(3, firstLineEnd).trim() || 'code';
                codeBody = trimmed.slice(firstLineEnd + 1, trimmed.length - 3).trim();
              } else {
                codeBody = trimmed.slice(3, -3).trim();
              }
              return (
                <CodeBlock
                  key={pIdx}
                  code={codeBody}
                  language={language}
                  lang={lang}
                />
              );
            }
            if (!part.trim()) return null;
            return (
              <p key={pIdx} className="leading-relaxed">
                {part.trim()}
              </p>
            );
          })}
        </div>
      );
    }

    // If paragraph contains HTML <pre><code>...</code></pre>
    if (paragraph.includes('<pre>') && paragraph.includes('<code>')) {
      const codeMatch = paragraph.match(/<pre[^>]*><code(?:\s+class="language-([^"]+)")?>([\s\S]*?)<\/code><\/pre>/i);
      if (codeMatch) {
        const language = codeMatch[1] || 'code';
        const rawCode = codeMatch[2]
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"');
        return (
          <CodeBlock
            key={idx}
            code={rawCode.trim()}
            language={language}
            lang={lang}
          />
        );
      }
    }

    // Standard text paragraph
    return (
      <p key={idx} className="leading-relaxed">
        {paragraph}
      </p>
    );
  };

  const { blogPosts } = useData();
  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug && p.published).slice(0, 2);

  return (
    <>
      <SEOHead
        title={post.title[lang]}
        description={post.excerpt[lang]}
        canonicalPath={`/blog/${post.slug}`}
        keywords={post.tags?.[lang]}
        schemaType="article"
        schemaData={{
          headline: post.title[lang],
          description: post.excerpt[lang],
          author: post.author,
          datePublished: post.publishDate,
          category: post.categoryLabel[lang],
          keywords: post.tags?.[lang]?.join(', '),
          wordCount: readingEstimate.wordCount,
          timeRequired: `PT${readingEstimate.minutes}M`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <SidebarCard />

          <main className="flex-1 w-full space-y-10">
            <Breadcrumbs
              items={[
                { label: lang === 'fr' ? 'Blog' : 'Blog', to: lang === 'fr' ? '/blog' : '/en/blog' },
                { label: post.title[lang] }
              ]}
            />

            {/* Post Card */}
            <article ref={articleRef} className="trm-card p-6 sm:p-10 space-y-8">
              <div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#919ca1] mb-4">
                  <span className="text-[11px] font-mono uppercase text-[#70ba65] bg-[#02162B] px-3 py-1 rounded-full border border-[#0a3d54]">
                    {post.categoryLabel[lang]}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.publishDate}</span>
                  </div>
                  <div 
                    className="flex items-center gap-1.5"
                    title={lang === 'fr' 
                      ? `Temps de lecture estimé : ${readingEstimate.minutes} min basé sur ${readingEstimate.wordCount} mots (~200 mots/min)`
                      : `Estimated reading time: ${readingEstimate.minutes} min based on ${readingEstimate.wordCount} words (~200 wpm)`
                    }
                  >
                    <Clock className="w-3.5 h-3.5 text-[#70ba65]" />
                    <span className="font-medium text-[#dedee0]">{readingEstimate.formatted}</span>
                    <span className="text-[10px] text-[#919ca1] font-mono">({readingEstimate.wordCount} {lang === 'fr' ? 'mots' : 'words'})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>{post.author}</span>
                  </div>

                  {readingProgress > 1 && (
                    <div className="inline-flex items-center gap-1 text-[11px] font-mono text-[#70ba65] bg-[#02162B] px-2.5 py-0.5 rounded-full border border-[#70ba65]/30 animate-fade-in">
                      <BookOpen className="w-3 h-3" />
                      <span>{Math.round(readingProgress)}% {lang === 'fr' ? 'lu' : 'read'}</span>
                    </div>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
                  {post.title[lang]}
                </h1>
              </div>

              {/* Lead Excerpt */}
              <div className="p-4 rounded-xl bg-[#02162B] border-l-4 border-[#70ba65] text-sm text-[#dedee0] italic leading-relaxed">
                {post.excerpt[lang]}
              </div>

              {/* Article Paragraphs & Code Blocks */}
              <div className="space-y-5 text-sm sm:text-base text-[#a8b4b9] leading-relaxed">
                {post.content[lang].map((paragraph, idx) => renderParagraph(paragraph, idx))}
              </div>

              {/* Tags & Topics Section */}
              {post.tags && post.tags[lang] && post.tags[lang].length > 0 && (
                <div id="blog-post-tags" className="pt-6 border-t border-[#0a3d54]/60 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#70ba65]">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{lang === 'fr' ? 'Mots-clés & Thématiques' : 'Tags & Topics'}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags[lang].map((tag, idx) => (
                      <span
                        key={idx}
                        onClick={() => navigate(lang === 'fr' ? '/blog' : '/en/blog')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-[#dedee0] bg-[#02162B] border border-[#0a3d54] hover:border-[#70ba65] hover:text-[#70ba65] transition-all cursor-pointer shadow-sm group"
                        title={lang === 'fr' ? `Explorer les articles sur ${tag}` : `Explore articles on ${tag}`}
                      >
                        <span className="text-[#70ba65] font-bold group-hover:scale-110 transition-transform">#</span>
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Footer Box */}
              <div className="pt-6 border-t border-[#0a3d54]/60 flex items-center justify-between">
                <button
                  onClick={() => navigate(lang === 'fr' ? '/blog' : '/en/blog')}
                  className="text-xs font-bold uppercase tracking-wider text-[#70ba65] flex items-center gap-1.5 hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{lang === 'fr' ? 'Retour aux articles' : 'Back to all articles'}</span>
                </button>
              </div>
            </article>

            {/* Other Reads */}
            <div className="space-y-4">
              <div className="trm-section-divider">
                <h3 className="text-lg font-serif font-bold text-white tracking-wide">
                  {lang === 'fr' ? 'Articles complémentaires' : 'Related Reads'}
                </h3>
                <div className="trm-section-divider-line"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {otherPosts.map((op) => (
                  <div
                    key={op.slug}
                    onClick={() => navigate(lang === 'fr' ? `/blog/${op.slug}` : `/en/blog/${op.slug}`)}
                    className="trm-card p-5 cursor-pointer hover:border-[#70ba65]/60 transition-colors group"
                  >
                    <span className="text-[10px] font-mono text-[#70ba65] uppercase">
                      {op.categoryLabel[lang]}
                    </span>
                    <h4 className="text-sm font-serif font-bold text-white group-hover:text-[#70ba65] transition-colors mt-1 mb-2">
                      {op.title[lang]}
                    </h4>
                    <p className="text-xs text-[#919ca1] line-clamp-2">
                      {op.excerpt[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculator CTA */}
            <div id="blog-calculator" className="pt-4">
              <EmbeddedCalculator
                customTitle={{
                  fr: 'Concrétiser vos projets web & digitaux',
                  en: 'Bring your web projects to life'
                }}
                customSubtitle={{
                  fr: 'Besoin d’un site vitrine, e-commerce ou sur mesure ? Estimez votre budget avec tarifs clairs en DT (Tunisie) ou en € (International).',
                  en: 'Need a showcase site, online shop, or web application? Calculate your budget with clear rates in TND or EUR.'
                }}
              />
            </div>

            {/* Internal Navigation Mesh */}
            <div className="p-6 rounded-2xl bg-[#00283A] border border-[#0a3d54] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-serif font-bold text-white">
                  {lang === 'fr' ? 'Aller plus loin' : 'Take the next step'}
                </h4>
                <p className="text-xs text-[#919ca1]">
                  {lang === 'fr' 
                    ? 'Découvrez nos offres, nos réalisations ou demandez un accompagnement personnalisé.'
                    : 'Discover our packages, case studies, or request custom advisory.'}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate(lang === 'fr' ? '/services' : '/en/services')}
                  className="trm-btn trm-btn-border text-xs py-2 px-3"
                >
                  {lang === 'fr' ? 'Prestations' : 'Services'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(lang === 'fr' ? '/tarifs' : '/en/pricing')}
                  className="trm-btn trm-btn-border text-xs py-2 px-3"
                >
                  {lang === 'fr' ? 'Tarifs' : 'Pricing'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(lang === 'fr' ? '/realisations' : '/en/projects')}
                  className="trm-btn trm-btn-border text-xs py-2 px-3"
                >
                  {lang === 'fr' ? 'Réalisations' : 'Projects'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(lang === 'fr' ? '/contact' : '/en/contact')}
                  className="trm-btn trm-btn-primary text-xs py-2 px-3"
                >
                  {lang === 'fr' ? 'Contact' : 'Contact'}
                </button>
              </div>
            </div>

          </main>
        </div>
      </div>
    </>
  );
};

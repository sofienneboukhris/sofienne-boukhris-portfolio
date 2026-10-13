import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { SidebarCard } from '../components/SidebarCard';
import { calculateReadingTime } from '../data/blog';
import { BookOpen, Calendar, Clock, ArrowRight, User } from 'lucide-react';

export const BlogIndexView: React.FC = () => {
  const { lang, navigate } = useRouter();
  const { blogPosts } = useData();

  const publishedPosts = blogPosts.filter((p) => p.published !== false);

  const handlePost = (slug: string) => {
    navigate(lang === 'fr' ? `/blog/${slug}` : `/en/blog/${slug}`);
  };

  return (
    <>
      <SEOHead
        title={lang === 'fr' ? 'Blog Développement Web & Conseils Techniques' : 'Technical Web Development Blog'}
        description={lang === 'fr'
          ? "Articles, guides techniques et conseils sur la création de sites web, WooCommerce, Shopify, la performance Core Web Vitals et le SEO par Sofienne Boukhris."
          : "Practical articles, tech tutorials, and insights on web creation, WooCommerce, Shopify, Core Web Vitals, and SEO by Sofienne Boukhris."
        }
        canonicalPath={lang === 'fr' ? '/blog' : '/en/blog'}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          <SidebarCard />

          <main className="flex-1 w-full space-y-10">
            <Breadcrumbs
              items={[
                { label: lang === 'fr' ? 'Blog' : 'Blog' }
              ]}
            />

            {/* Header */}
            <div className="trm-card p-6 sm:p-10 relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#02162B] border border-[#0a3d54] text-[11px] font-mono text-[#70ba65] mb-4 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? 'Conseils & Retours d’Expérience' : 'Engineering Insights'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
                {lang === 'fr' ? (
                  <>Guides & Réflexions sur le <span className="text-[#70ba65]">web moderne</span></>
                ) : (
                  <>Insights on <span className="text-[#70ba65]">Modern Web Craft</span></>
                )}
              </h1>

              <p className="text-sm sm:text-base text-[#a8b4b9] leading-relaxed max-w-3xl">
                {lang === 'fr'
                  ? "Des analyses pragmatiques sans jargon marketing pour vous aider à prendre les meilleures décisions techniques pour votre projet web : coûts réels, choix de plateformes et optimisation SEO."
                  : "Pragmatic breakdowns with zero marketing fluff to guide your technology decisions: transparent cost structures, platform comparisons, and Core Web Vitals hygiene."}
              </p>
            </div>

            {/* Blog Posts List */}
            <div className="space-y-6">
              {publishedPosts.map((post) => (
                <article
                  key={post.slug}
                  onClick={() => handlePost(post.slug)}
                  className="trm-card p-6 sm:p-8 cursor-pointer group hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#919ca1] mb-3">
                    <span className="text-[11px] font-mono uppercase text-[#70ba65] bg-[#02162B] px-2.5 py-1 rounded-full border border-[#0a3d54]">
                      {post.categoryLabel[lang] || post.categoryLabel.fr}
                    </span>
                    <div className="flex items-center gap-1">
                       <Clock className="w-3.5 h-3.5 text-[#70ba65]" />
                      <span>{calculateReadingTime(post, lang).formatted}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.publishDate}</span>
                    </div>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-[#70ba65] transition-colors mb-3">
                    {post.title[lang] || post.title.fr}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#dedee0] leading-relaxed mb-4">
                    {post.excerpt[lang] || post.excerpt.fr}
                  </p>

                  {/* Post Tags Preview */}
                  {post.tags && post.tags[lang] && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {post.tags[lang].slice(0, 4).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#02162B] text-[#919ca1] border border-[#0a3d54] group-hover:border-[#70ba65]/40 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center text-xs font-bold uppercase tracking-wider text-[#70ba65]">
                    <span>{lang === 'fr' ? 'Lire l’article complet' : 'Read Full Guide'}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              ))}
            </div>

          </main>
        </div>
      </div>
    </>
  );
};

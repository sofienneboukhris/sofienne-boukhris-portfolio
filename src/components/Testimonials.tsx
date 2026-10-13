import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { TESTIMONIALS } from '../data/testimonials';
import { TestimonialItem } from '../types';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  BadgeCheck, 
  LayoutGrid, 
  SlidersHorizontal,
  ExternalLink,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface TestimonialsProps {
  initialMode?: 'slider' | 'grid';
  className?: string;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  initialMode = 'slider',
  className = ''
}) => {
  const { lang, navigate } = useRouter();
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>(initialMode);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const isEn = lang === 'en';
  const total = TESTIMONIALS.length;

  // Auto-advance in slider mode when not paused
  useEffect(() => {
    if (viewMode !== 'slider' || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6000);

    return () => clearInterval(timer);
  }, [viewMode, isPaused, total]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <div className={`space-y-6 ${className}`} id="testimonials-component">
      {/* Social Proof Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#02162B] p-4 rounded-xl border border-[#0a3d54]">
        {/* Rating summary & Verified Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#001E2B] px-3 py-1.5 rounded-lg border border-[#0a3d54]">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-white ml-1 font-mono">5.0 / 5.0</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#919ca1]">
            <BadgeCheck className="w-4 h-4 text-[#70ba65]" />
            <span className="font-medium text-[#dedee0]">
              {isEn ? '100% Verified Client Feedback' : '100% Avis Clients Vérifiés'}
            </span>
          </div>
        </div>

        {/* View Mode Switcher (Slider vs Grid) */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-[#001E2B] p-1 rounded-lg border border-[#0a3d54]/70">
          <button
            onClick={() => setViewMode('slider')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md transition-all ${
              viewMode === 'slider'
                ? 'bg-[#70ba65] text-[#001E2B] font-bold shadow'
                : 'text-[#919ca1] hover:text-white'
            }`}
            aria-label={isEn ? 'Switch to Carousel view' : 'Basculer en vue carrousel'}
            id="testimonials-slider-toggle"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{isEn ? 'Slider' : 'Carrousel'}</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md transition-all ${
              viewMode === 'grid'
                ? 'bg-[#70ba65] text-[#001E2B] font-bold shadow'
                : 'text-[#919ca1] hover:text-white'
            }`}
            aria-label={isEn ? 'Switch to Grid view' : 'Basculer en vue grille'}
            id="testimonials-grid-toggle"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{isEn ? 'Grid' : 'Grille'}</span>
          </button>
        </div>
      </div>

      {/* SLIDER VIEW */}
      {viewMode === 'slider' && (
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="trm-card p-6 sm:p-10 relative overflow-hidden transition-all duration-300">
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#70ba65]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Top row: Quote icon + Stars + Highlight Metric */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#02162B] border border-[#0a3d54] flex items-center justify-center text-[#70ba65]">
                  <Quote className="w-5 h-5" />
                </div>
                <div className="flex text-amber-400">
                  {[...Array(activeTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {activeTestimonial.highlightMetric && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#70ba65]/10 border border-[#70ba65]/30 text-xs font-mono font-medium text-[#70ba65]">
                  <Sparkles className="w-3 h-3" />
                  <span>{activeTestimonial.highlightMetric[lang]}</span>
                </div>
              )}
            </div>

            {/* Quote content */}
            <blockquote className="text-base sm:text-lg lg:text-xl text-[#dedee0] font-serif leading-relaxed italic mb-8 min-h-[90px] sm:min-h-[80px]">
              "{activeTestimonial.feedback[lang]}"
            </blockquote>

            {/* Client Profile and Project Reference */}
            <div className="pt-6 border-t border-[#0a3d54]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Stylized Avatar with Initials */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0a3d54] to-[#02162B] border border-[#70ba65]/50 flex items-center justify-center text-white font-serif font-bold text-base shadow-sm shrink-0">
                  {activeTestimonial.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-white text-base">
                      {activeTestimonial.name}
                    </span>
                    <BadgeCheck className="w-4 h-4 text-[#70ba65]" title={isEn ? 'Verified Client' : 'Client Vérifié'} />
                  </div>
                  <div className="text-xs text-[#919ca1]">
                    <span className="text-[#dedee0]">{activeTestimonial.role[lang]}</span>
                    {' · '}
                    <span className="text-[#70ba65] font-medium">{activeTestimonial.company}</span>
                  </div>
                  <div className="text-[11px] text-[#919ca1]/80 mt-0.5">
                    {activeTestimonial.location[lang]}
                  </div>
                </div>
              </div>

              {/* Verified Project Case Study Link */}
              {activeTestimonial.projectSlug && activeTestimonial.projectTitle && (
                <button
                  onClick={() =>
                    navigate(
                      isEn
                        ? `/en/projects/${activeTestimonial.projectSlug}`
                        : `/realisations/${activeTestimonial.projectSlug}`
                    )
                  }
                  className="inline-flex items-center gap-1.5 text-xs text-[#70ba65] hover:text-[#88d97b] bg-[#02162B] hover:bg-[#082b3b] border border-[#0a3d54] hover:border-[#70ba65]/40 px-3 py-1.5 rounded-lg transition-colors self-start sm:self-auto group"
                  title={isEn ? 'View real project case study' : 'Voir l’étude de cas du projet'}
                >
                  <span>
                    {isEn ? 'Project: ' : 'Projet : '}
                    <strong className="font-semibold text-white group-hover:text-[#70ba65]">
                      {activeTestimonial.projectTitle[lang]}
                    </strong>
                  </span>
                  <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </button>
              )}
            </div>
          </div>

          {/* Slider Navigation & Pagination Controls */}
          <div className="flex items-center justify-between mt-4 px-1">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? 'w-8 bg-[#70ba65]'
                      : 'w-2 bg-[#0a3d54] hover:bg-[#70ba65]/50'
                  }`}
                  aria-label={`${isEn ? 'Go to slide' : 'Aller au témoignage'} ${idx + 1}`}
                />
              ))}
            </div>

            {/* Counter + Prev / Next Arrows */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#919ca1] mr-2">
                <strong className="text-white">{currentIndex + 1}</strong> / {total}
              </span>
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-lg bg-[#02162B] border border-[#0a3d54] hover:border-[#70ba65] text-[#919ca1] hover:text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-1 focus:ring-[#70ba65]"
                aria-label={isEn ? 'Previous review' : 'Avis précédent'}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-lg bg-[#02162B] border border-[#0a3d54] hover:border-[#70ba65] text-[#919ca1] hover:text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-1 focus:ring-[#70ba65]"
                aria-label={isEn ? 'Next review' : 'Avis suivant'}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="trm-card p-6 flex flex-col justify-between hover:border-[#70ba65]/40 transition-all duration-200"
              itemScope
              itemType="https://schema.org/Review"
            >
              <div>
                {/* Top: Stars + Metric */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex text-amber-400" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                    <meta itemProp="ratingValue" content={String(testimonial.rating)} />
                    <meta itemProp="bestRating" content="5" />
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {testimonial.highlightMetric && (
                    <span className="text-[10px] font-mono text-[#70ba65] bg-[#70ba65]/10 border border-[#70ba65]/30 px-2 py-0.5 rounded-full font-medium">
                      {testimonial.highlightMetric[lang]}
                    </span>
                  )}
                </div>

                {/* Feedback body */}
                <blockquote
                  className="text-xs sm:text-sm text-[#dedee0] leading-relaxed italic mb-6"
                  itemProp="reviewBody"
                >
                  "{testimonial.feedback[lang]}"
                </blockquote>
              </div>

              {/* Author info */}
              <div className="pt-4 border-t border-[#0a3d54]/60">
                <div className="flex items-start justify-between gap-2">
                  <div itemProp="author" itemScope itemType="https://schema.org/Person">
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif font-bold text-white text-sm" itemProp="name">
                        {testimonial.name}
                      </span>
                      <BadgeCheck className="w-3.5 h-3.5 text-[#70ba65]" />
                    </div>
                    <div className="text-[11px] text-[#919ca1]">
                      {testimonial.role[lang]} · <span className="text-[#70ba65]">{testimonial.company}</span>
                    </div>
                  </div>

                  {testimonial.projectSlug && (
                    <button
                      onClick={() =>
                        navigate(
                          isEn
                            ? `/en/projects/${testimonial.projectSlug}`
                            : `/realisations/${testimonial.projectSlug}`
                        )
                      }
                      className="text-[#70ba65] hover:text-[#88d97b] transition-colors p-1"
                      title={isEn ? 'View project' : 'Voir le projet'}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trust Guarantee Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        {[
          { label: isEn ? 'Satisfied Clients' : 'Clients Satisfaits', val: '100%' },
          { label: isEn ? 'On-Time Delivery' : 'Respect des Délais', val: '99%' },
          { label: isEn ? 'Average Rating' : 'Note Moyenne', val: '5.0 / 5' },
          { label: isEn ? 'Direct Support' : 'Support Réactif', val: '7j / 7' }
        ].map((item, i) => (
          <div key={i} className="bg-[#02162B] p-3 rounded-xl border border-[#0a3d54]/60 text-center">
            <div className="text-base sm:text-lg font-serif font-bold text-[#70ba65]">{item.val}</div>
            <div className="text-[11px] text-[#919ca1] mt-0.5">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

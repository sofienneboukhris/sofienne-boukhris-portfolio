import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  // Physics-based spring smoothing for fluid, jitter-free bar filling
  const springScaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  const scaleX = shouldReduceMotion ? scrollYProgress : springScaleX;

  return (
    <div
      id="global-scroll-progress"
      className="fixed top-0 left-0 right-0 z-[100] h-[3.5px] pointer-events-none print:hidden"
      role="progressbar"
      aria-label="Reading & scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Background track */}
      <div className="absolute inset-0 bg-[#00151F]/40 backdrop-blur-[1px]" />

      {/* Main progress bar with vibrant brand emerald gradient and neon glow */}
      <motion.div
        className="h-full bg-gradient-to-r from-[#15803d] via-[#70ba65] to-[#86efac] shadow-[0_0_10px_rgba(112,186,101,0.85)]"
        style={{
          scaleX,
          transformOrigin: '0%',
        }}
      />
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronDown, Sparkles, Calendar, Stars } from 'lucide-react';
import { anniversaryContent } from '../data/anniversaryContent';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  const content = anniversaryContent.hero;

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 overflow-hidden">
      {/* Cinematic ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-wine/35 via-blush/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto flex flex-col items-center z-10">
        
        {/* Anniversary Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-burgundy-900/80 border border-gold/40 shadow-gold-glow mb-6 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-gold animate-spin" style={{ animationDuration: '6s' }} />
          <span className="font-serif tracking-widest text-xs uppercase text-gold font-semibold">
            {content.badge}
          </span>
          <Sparkles className="w-4 h-4 text-gold animate-spin" style={{ animationDuration: '6s' }} />
        </motion.div>

        {/* Main Heading: Hafna Sherin ❤️ */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-cream mb-4 drop-shadow-lg text-glow"
        >
          {content.mainHeading}
        </motion.h1>

        {/* Subheading: My Finu. My favorite person. My forever story. */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-xl sm:text-3xl text-blush font-serif italic mb-6 font-medium"
        >
          {content.subheading}
        </motion.h2>

        {/* Date Milestone pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-burgundy-950/70 border border-wine/50 text-gold font-serif text-sm sm:text-base mb-8 shadow-inner"
        >
          <Calendar className="w-4 h-4 text-blush" />
          <span className="tracking-wide font-semibold">{content.dateRange}</span>
        </motion.div>

        {/* Emotional Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="max-w-2xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-burgundy-900/40 via-burgundy-900/80 to-burgundy-900/40 border border-gold/25 backdrop-blur-sm mb-10 shadow-romantic"
        >
          <p className="font-serif text-lg sm:text-2xl text-cream/95 leading-relaxed italic">
            "{content.emotionalLine}"
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="w-8 h-[1px] bg-gold/40" />
            <span className="text-xs uppercase tracking-widest text-gold/80 font-sans">
              From Kaakooka with all his love
            </span>
            <span className="w-8 h-[1px] bg-gold/40" />
          </div>
        </motion.div>

        {/* Quick Highlights / Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-xl mb-12"
        >
          {content.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-4 rounded-xl bg-burgundy-900/50 border border-gold/20 flex flex-col items-center justify-center backdrop-blur-sm"
            >
              <span className="font-serif font-bold text-base sm:text-xl text-gold">
                {stat.value}
              </span>
              <span className="text-[11px] sm:text-xs text-cream/70 text-center mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Pulsing Central Heart & Explore Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              filter: [
                'drop-shadow(0 0 10px rgba(244,185,202,0.4))',
                'drop-shadow(0 0 25px rgba(214,177,109,0.8))',
                'drop-shadow(0 0 10px rgba(244,185,202,0.4))',
              ],
            }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="w-12 h-12 rounded-full bg-wine flex items-center justify-center border border-gold/60 cursor-pointer shadow-wine-glow"
            onClick={onExploreClick}
          >
            <Heart className="w-6 h-6 text-cream fill-blush" />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05, y: 2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onExploreClick}
            className="group flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-wine to-burgundy-700 hover:from-wine-600 hover:to-wine text-cream font-serif font-medium border border-gold/50 shadow-romantic transition-all duration-300"
          >
            <span>{content.ctaButton}</span>
            <ChevronDown className="w-4 h-4 text-gold group-hover:translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

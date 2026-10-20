import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Award, HeartHandshake } from 'lucide-react';
import { anniversaryContent } from '../data/anniversaryContent';
import { triggerRomanticConfetti } from '../utils/confetti';

export const SaidYesMilestone: React.FC = () => {
  const content = anniversaryContent.theYesDay;

  return (
    <section id="said-yes" className="relative py-28 px-4 overflow-hidden bg-gradient-to-b from-burgundy-950 via-burgundy-900 to-burgundy-950">
      {/* Background glowing light bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-wine/30 via-gold/15 to-wine/30 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-wine/60 border border-gold/40 text-gold text-xs font-serif uppercase tracking-widest mb-6 backdrop-blur-md shadow-gold-glow"
        >
          <Award className="w-3.5 h-3.5 text-blush" />
          <span>{content.tag}</span>
        </motion.div>

        {/* Big Heading: THE DAY MY FINU SAID YES. ❤️ */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-cream tracking-tight mb-6 drop-shadow-lg text-glow"
        >
          THE DAY MY FINU SAID YES. ❤️
        </motion.h2>

        {/* The Glowing Date Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          onClick={() => triggerRomanticConfetti()}
          className="group relative inline-block my-8 cursor-pointer select-none"
        >
          {/* Outer glow ring */}
          <div className="absolute -inset-1 bg-gradient-to-r from-gold via-blush to-gold rounded-3xl blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse" />
          
          <div className="relative px-8 sm:px-14 py-6 rounded-3xl bg-burgundy-950 border-2 border-gold/70 shadow-2xl flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest text-blush font-sans mb-1 font-semibold">
              {content.gradeBadge} • Our Official Anniversary Date
            </span>
            <span className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-wider gold-shimmer">
              {content.date}
            </span>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-gold/80">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>Tap for romantic sparkles</span>
              <Sparkles className="w-3 h-3 text-gold" />
            </div>
          </div>
        </motion.div>

        {/* Narrative lines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="max-w-2xl mx-auto space-y-4 my-8 text-cream/90 text-lg sm:text-xl font-serif leading-relaxed"
        >
          {content.descriptionLines.map((line, idx) => (
            <p key={idx} className={idx === 1 ? "text-blush font-semibold text-2xl" : ""}>
              {line}
            </p>
          ))}
        </motion.div>

        {/* Emotional Quotes Highlight Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto p-6 rounded-3xl bg-burgundy-900/60 border border-gold/30 space-y-3 mb-12 shadow-romantic"
        >
          {content.emotionalQuotes.map((quote, qIdx) => (
            <p
              key={qIdx}
              className={`font-serif italic text-base sm:text-lg ${
                qIdx === 2 ? 'text-gold font-bold text-lg sm:text-xl pt-1' : 'text-blush'
              }`}
            >
              "{quote}"
            </p>
          ))}
        </motion.div>

        {/* Milestone Card */}
        <div className="max-w-xl mx-auto text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-wine/40 via-burgundy-900/70 to-burgundy-950 border border-gold/40 backdrop-blur-md shadow-romantic relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-wine flex items-center justify-center border border-gold/50">
                <HeartHandshake className="w-5 h-5 text-gold" />
              </div>
              <span className="font-serif text-sm uppercase tracking-wider text-gold font-semibold">
                Sacred Love Milestone
              </span>
            </div>

            <p className="font-serif text-2xl sm:text-3xl text-cream font-medium leading-snug">
              "{content.milestoneCard}"
            </p>

            <div className="mt-6 pt-4 border-t border-gold/20 flex items-center justify-between text-xs text-cream/70 font-sans">
              <span>Hafna Sherin (Finu)</span>
              <span>❤️</span>
              <span>Mohammed Nasim (Kaakooka)</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

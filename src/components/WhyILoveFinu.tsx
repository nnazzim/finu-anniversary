import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Sparkles,
  CalendarHeart,
  Smile,
  Crown,
  Compass,
  Infinity as InfinityIcon,
  Flame,
} from 'lucide-react';
import { anniversaryContent, LoveReason } from '../data/anniversaryContent';
import { triggerRomanticConfetti } from '../utils/confetti';

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-6 h-6 text-blush fill-blush/60" />,
  Sparkles: <Sparkles className="w-6 h-6 text-gold" />,
  CalendarHeart: <CalendarHeart className="w-6 h-6 text-blush" />,
  Smile: <Smile className="w-6 h-6 text-gold" />,
  Crown: <Crown className="w-6 h-6 text-gold" />,
  Compass: <Compass className="w-6 h-6 text-blush" />,
  Infinity: <InfinityIcon className="w-6 h-6 text-gold" />,
};

export const WhyILoveFinu: React.FC = () => {
  const content = anniversaryContent.whyILoveFinu;
  const [loveCount, setLoveCount] = useState(777);

  const handleSendHeart = () => {
    setLoveCount((c) => c + 1);
    triggerRomanticConfetti();
  };

  return (
    <section id="why-i-love" className="relative py-28 px-4 overflow-hidden bg-burgundy-950/40">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-wine/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-burgundy-900/80 border border-gold/40 text-gold text-xs font-serif uppercase tracking-widest mb-4 shadow-gold-glow">
            <Heart className="w-3.5 h-3.5 text-blush fill-blush" />
            <span>Forever Reasons</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream tracking-tight mb-4">
            {content.heading}
          </h2>

          <p className="text-blush text-base sm:text-lg font-serif italic">
            "{content.subheading}"
          </p>
        </div>

        {/* 7 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {content.reasons.map((item: LoveReason, idx: number) => {
            const isLast = idx === content.reasons.length - 1;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-burgundy-900/90 via-wine/20 to-burgundy-950/90 border border-gold/30 shadow-romantic transition-all duration-300 hover:border-gold/70 group ${
                  isLast ? 'md:col-span-2 lg:col-span-3 lg:max-w-xl lg:mx-auto w-full' : ''
                }`}
              >
                {/* Number badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-burgundy-950 border border-gold/40 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    {iconMap[item.iconName] || <Heart className="w-6 h-6 text-gold" />}
                  </div>
                  <span className="font-serif text-xs font-bold text-gold/70 px-2.5 py-1 rounded-full bg-burgundy-950/80 border border-gold/20">
                    Reason #{item.id}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream mb-2 group-hover:text-gold transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                {item.description && (
                  <p className="text-cream/80 text-sm sm:text-base font-sans leading-relaxed">
                    {item.description}
                  </p>
                )}

                {/* Bottom decorative bar */}
                <div className="mt-5 pt-3 border-t border-gold/15 flex items-center justify-between text-xs text-blush/70 font-script text-lg">
                  <span>Forever & always</span>
                  <span>❤️</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sweet Interactive Finu Love Counter */}
        <div className="mt-16 text-center flex flex-col items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendHeart}
            className="flex items-center gap-3 px-8 py-3.5 rounded-full bg-wine/80 hover:bg-wine text-cream border border-gold/50 shadow-gold-glow font-serif text-base transition-all cursor-pointer"
          >
            <Flame className="w-5 h-5 text-gold animate-bounce" />
            <span>Send Kaakooka's Love to Finu</span>
            <span className="bg-burgundy-950 px-2.5 py-0.5 rounded-full text-gold font-mono font-bold text-xs border border-gold/30">
              {loveCount} Hearts
            </span>
          </motion.button>
          <span className="text-[11px] text-cream/50 mt-2">
            Tap to send extra love to Finu's heart ✨
          </span>
        </div>

      </div>
    </section>
  );
};

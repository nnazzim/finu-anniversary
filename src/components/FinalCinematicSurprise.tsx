import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RotateCcw, Lock, Unlock } from 'lucide-react';
import { anniversaryContent } from '../data/anniversaryContent';
import { triggerAnniversaryFireworks, triggerRomanticConfetti } from '../utils/confetti';

interface FinalCinematicSurpriseProps {
  onReplayStory: () => void;
}

export const FinalCinematicSurprise: React.FC<FinalCinematicSurpriseProps> = ({
  onReplayStory,
}) => {
  const final = anniversaryContent.finalSurprise;
  const [showSecretPromise, setShowSecretPromise] = useState(false);
  const [hasTriggeredCelebration, setHasTriggeredCelebration] = useState(false);

  const handleRevealPromise = () => {
    setShowSecretPromise(true);
    triggerAnniversaryFireworks();
  };

  return (
    <section
      id="grand-finale"
      className="relative min-h-screen py-32 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-burgundy-950 via-[#230711] to-burgundy-950 text-center overflow-hidden"
    >
      {/* Cinematic bloom glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-gradient-to-r from-wine/30 via-gold/20 to-wine/30 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Pulsing Central Heart Beacon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          onViewportEnter={() => {
            if (!hasTriggeredCelebration) {
              setHasTriggeredCelebration(true);
              triggerRomanticConfetti();
            }
          }}
          className="relative mb-12"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-wine via-[#A82B4D] to-blush flex items-center justify-center border-4 border-gold shadow-gold-glow">
            <Heart className="w-12 h-12 text-cream fill-blush animate-pulse" />
          </div>
          {/* Rotating halo */}
          <div className="absolute -inset-3 rounded-full border border-dashed border-gold/40 animate-spin" style={{ animationDuration: '20s' }} />
        </motion.div>

        {/* Story Lines (Revealed Sequentially Line by Line) */}
        <div className="space-y-4 mb-16 max-w-2xl">
          {final.storyRevealLines.map((line, idx) => {
            const isHighlight =
              line.includes("21 October 2019") ||
              line.includes("His heart kept finding its way back") ||
              line.includes("Hafna Sherin");

            return (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className={`font-serif text-xl sm:text-3xl leading-relaxed ${
                  isHighlight
                    ? 'text-gold font-bold text-2xl sm:text-4xl py-1 gold-shimmer'
                    : 'text-cream/90'
                }`}
              >
                {line}
              </motion.p>
            );
          })}
        </div>

        {/* Big Climax Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="my-10 p-8 sm:p-14 rounded-3xl bg-burgundy-950/80 border-2 border-gold/60 shadow-romantic-lg backdrop-blur-xl w-full max-w-3xl"
        >
          <div className="space-y-4 mb-8">
            {final.bigMilestone.map((text, idx) => (
              <h3
                key={idx}
                className={`font-serif font-extrabold tracking-tight ${
                  idx === 0
                    ? 'text-3xl sm:text-5xl lg:text-6xl gold-shimmer text-glow'
                    : 'text-2xl sm:text-4xl text-cream'
                }`}
              >
                {text}
              </h3>
            ))}
          </div>

          <div className="h-[1px] w-2/3 mx-auto bg-gradient-to-r from-transparent via-gold/60 to-transparent my-6" />

          {/* Final Signoff */}
          <div className="space-y-2">
            <p className="font-serif text-xl sm:text-3xl font-semibold text-blush">
              {final.anniversarySignoff}
            </p>
            <p className="font-script text-2xl sm:text-3xl text-gold">
              "{final.fromLine}"
            </p>
          </div>
        </motion.div>

        {/* Secret Promise Reveal Accordion */}
        <div className="w-full max-w-2xl my-6 flex flex-col items-center">
          {!showSecretPromise ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleRevealPromise}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-wine to-burgundy-700 hover:from-wine-600 hover:to-wine text-cream font-serif font-semibold text-lg border-2 border-gold/60 shadow-wine-glow flex items-center gap-3 transition-all"
            >
              <Lock className="w-5 h-5 text-gold" />
              <span>{final.secretPromiseButton}</span>
              <Sparkles className="w-5 h-5 text-blush animate-pulse" />
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full p-8 rounded-3xl bg-[#FFFDF9] text-burgundy-950 border-4 border-amber-900/30 shadow-2xl text-left relative"
            >
              <div className="flex items-center gap-2 mb-4 text-wine font-serif font-bold text-sm uppercase tracking-wider">
                <Unlock className="w-4 h-4 text-wine" />
                <span>Kaakooka's Secret Forever Promise</span>
              </div>

              <p className="font-serif text-lg sm:text-xl text-stone-800 leading-relaxed italic">
                "{final.secretPromiseText}"
              </p>

              <div className="mt-6 pt-4 border-t border-amber-900/10 flex items-center justify-between text-xs text-stone-500 font-sans">
                <span>Customizable in <code className="bg-amber-100 px-1.5 py-0.5 rounded text-wine">anniversaryContent.ts</code></span>
                <span className="font-script text-xl text-wine">Forever & Always ❤️</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Replay Our Story Button */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onReplayStory}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-burgundy-900/80 hover:bg-burgundy-900 border border-gold/40 text-gold hover:text-cream font-serif text-sm transition-all shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{final.replayButton}</span>
          </motion.button>

          <p className="text-xs text-cream/40 font-sans">
            Created with all my heart by Mohammed Nasim for Hafna Sherin (Finu)
          </p>
        </div>

      </div>
    </section>
  );
};

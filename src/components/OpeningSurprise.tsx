import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, MailOpen } from 'lucide-react';
import { anniversaryContent } from '../data/anniversaryContent';
import { triggerRomanticConfetti } from '../utils/confetti';

interface OpeningSurpriseProps {
  onOpen: () => void;
}

export const OpeningSurprise: React.FC<OpeningSurpriseProps> = ({ onOpen }) => {
  const [stage, setStage] = useState<number>(0);
  const [isOpening, setIsOpening] = useState(false);
  const content = anniversaryContent.opening;

  useEffect(() => {
    // Stage 1: "Hey, Finu... ❤️"
    const t1 = setTimeout(() => setStage(1), 500);
    // Stage 2: "I have a little something for my favorite girl."
    const t2 = setTimeout(() => setStage(2), 2200);
    // Stage 3: "Before you open this, remember one thing..." + "I made every little part of this with you in my heart."
    const t3 = setTimeout(() => setStage(3), 4200);
    // Stage 4: Reveal the interactive envelope / button
    const t4 = setTimeout(() => setStage(4), 6200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleOpenClick = () => {
    setIsOpening(true);
    triggerRomanticConfetti();
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isOpening ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#1A040B] via-[#310A18] to-[#140309] overflow-hidden px-4 text-center select-none"
    >
      {/* Background celestial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-wine/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-blush/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative framing elements */}
      <div className="relative max-w-xl w-full p-8 md:p-12 rounded-3xl border border-gold/30 bg-burgundy-950/60 backdrop-blur-xl shadow-romantic-lg flex flex-col items-center">
        
        {/* Soft glowing icon badge */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-wine to-blush/40 flex items-center justify-center border border-gold/50 shadow-gold-glow mb-6"
        >
          <Heart className="w-8 h-8 text-cream fill-blush/80 animate-pulse" />
        </motion.div>

        {/* Line 1: Hey, Finu... ❤️ */}
        <AnimatePresence>
          {stage >= 1 && (
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-cream mb-4 drop-shadow-md"
            >
              {content.greeting}
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Line 2: I have a little something for my favorite girl */}
        <AnimatePresence>
          {stage >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-lg sm:text-2xl text-blush font-light italic mb-6 max-w-md font-serif"
            >
              "{content.teaser}"
            </motion.p>
          )}
        </AnimatePresence>

        {/* Line 3 & 4: Before you open this... */}
        <AnimatePresence>
          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="space-y-2 py-4 px-6 rounded-2xl bg-burgundy-900/60 border border-wine/40 max-w-md mb-8"
            >
              <p className="text-sm sm:text-base text-cream/80 font-medium">
                {content.pauseNoteLine1}
              </p>
              <p className="text-sm sm:text-base text-gold font-script text-xl sm:text-2xl tracking-wide">
                "{content.pauseNoteLine2}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stage 4: Envelope & Glow Button */}
        <AnimatePresence>
          {stage >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="w-full flex flex-col items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(214, 177, 109, 0.6)" }}
                whileTap={{ scale: 0.96 }}
                onClick={handleOpenClick}
                disabled={isOpening}
                className="relative group overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-wine via-[#942644] to-wine text-cream font-serif font-semibold text-lg sm:text-xl border border-gold/70 shadow-wine-glow transition-all duration-300 flex items-center gap-3 cursor-pointer"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform pointer-events-none" />

                <MailOpen className="w-6 h-6 text-gold group-hover:rotate-12 transition-transform duration-300" />
                <span>{content.buttonText}</span>
                <Sparkles className="w-5 h-5 text-blush animate-pulse" />
              </motion.button>

              <p className="text-xs text-cream/50 mt-4 tracking-wider uppercase font-sans">
                A 7-Year Love Journey • 21 Oct 2026
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip button for quick review if desired */}
        {stage < 4 && (
          <button
            onClick={() => setStage(4)}
            className="absolute bottom-3 right-4 text-[11px] text-cream/40 hover:text-cream/80 transition-colors uppercase tracking-widest"
          >
            Skip Intro →
          </button>
        )}
      </div>
    </motion.div>
  );
};

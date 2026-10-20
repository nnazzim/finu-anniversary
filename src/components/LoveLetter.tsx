import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, RotateCcw, Heart, Sparkles, Feather } from 'lucide-react';
import { anniversaryContent } from '../data/anniversaryContent';
import { triggerRomanticConfetti } from '../utils/confetti';

export const LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [showAllImmediately, setShowAllImmediately] = useState(false);

  const letter = anniversaryContent.letter;
  const paragraphs = letter.paragraphs;

  // Handle open envelope
  const handleOpen = () => {
    setIsOpen(true);
    setDisplayedIndex(0);
    triggerRomanticConfetti();
  };

  // Replay letter
  const handleReplay = () => {
    setShowAllImmediately(false);
    setDisplayedIndex(0);
  };

  // Sequential reveal of paragraphs
  useEffect(() => {
    if (!isOpen || showAllImmediately) return;

    if (displayedIndex < paragraphs.length) {
      const timer = setTimeout(() => {
        setDisplayedIndex((prev) => prev + 1);
      }, 1400); // Reveals each paragraph smoothly
      return () => clearTimeout(timer);
    }
  }, [isOpen, displayedIndex, paragraphs.length, showAllImmediately]);

  // Check reduced motion setting
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShowAllImmediately(true);
    }
  }, []);

  return (
    <section id="letter" className="relative py-28 px-4 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-wine/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-burgundy-900/80 border border-gold/40 text-gold text-xs font-serif uppercase tracking-widest mb-4 shadow-gold-glow">
            <Feather className="w-3.5 h-3.5 text-blush" />
            <span>A Letter From Your Kaakooka 💌</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream tracking-tight mb-3">
            {letter.envelopeTeaser}
          </h2>
          <p className="text-blush text-sm sm:text-base font-serif italic">
            Straight from Mohammed Nasim's heart to his Finu.
          </p>
        </div>

        {/* Closed Envelope Interactive State */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleOpen}
            className="w-full max-w-lg cursor-pointer group"
          >
            <div className="relative rounded-3xl bg-gradient-to-br from-burgundy-900 via-wine to-burgundy-950 p-8 sm:p-12 border-2 border-gold/50 shadow-romantic-lg flex flex-col items-center text-center">
              
              {/* Wax Seal with pulsating heart */}
              <div className="w-20 h-20 rounded-full bg-wine-600 border-4 border-gold shadow-gold-glow flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-10 h-10 text-cream fill-blush" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream mb-2">
                For My Finu
              </h3>
              <p className="font-script text-2xl text-gold mb-6">
                Sealed on 21 October 2026 • 7 Years of Love
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen();
                }}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold via-amber-400 to-gold text-burgundy-950 font-serif font-bold text-base shadow-gold-glow flex items-center gap-2 group-hover:shadow-xl transition-all"
              >
                <MailOpen className="w-5 h-5" />
                <span>{letter.envelopeButton}</span>
              </button>

              <span className="text-xs text-cream/60 mt-4">
                Click anywhere on the envelope to open
              </span>
            </div>
          </motion.div>
        )}

        {/* Open Letter State (Parchment Document) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-3xl"
            >
              <div className="relative rounded-3xl bg-[#FFFDF9] text-burgundy-950 p-8 sm:p-14 shadow-2xl border-4 border-amber-900/20">
                {/* Scrapbook Tape / Wax mark */}
                <div className="scrapbook-tape" />

                {/* Letter Controls Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-amber-800/15 mb-8">
                  <div className="flex items-center gap-2">
                    <Feather className="w-4 h-4 text-wine" />
                    <span className="font-serif text-xs uppercase tracking-wider text-wine/80 font-semibold">
                      Private Letter From Kaakooka
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowAllImmediately(!showAllImmediately)}
                      className="text-xs px-3 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-burgundy-950 transition-colors font-medium"
                    >
                      {showAllImmediately ? "Enable Typing Reveal" : "Show Full Letter"}
                    </button>
                    <button
                      onClick={handleReplay}
                      title="Replay animation"
                      className="p-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-burgundy-950 transition-colors"
                      aria-label="Replay letter typing animation"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Salutation */}
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-wine mb-6">
                  {letter.salutation}
                </h3>

                {/* Letter Paragraphs */}
                <div className="space-y-5 font-serif text-lg sm:text-xl text-stone-800 leading-relaxed">
                  {paragraphs.map((para, idx) => {
                    const isVisible = showAllImmediately || idx <= displayedIndex;

                    if (!isVisible) return null;

                    const isHighlight =
                      para.includes("My heart still chooses you") ||
                      para.includes("Happy 7th Love Anniversary") ||
                      para.includes("Farook College for me") ||
                      para.includes("Our story was never only about being in the same place");

                    return (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={
                          isHighlight
                            ? "font-bold text-wine text-xl sm:text-2xl pt-2"
                            : ""
                        }
                      >
                        {para}
                      </motion.p>
                    );
                  })}
                </div>

                {/* Letter Closing & Signature */}
                {(showAllImmediately || displayedIndex >= paragraphs.length) && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-10 pt-8 border-t border-amber-800/15 flex flex-col items-end"
                  >
                    <p className="font-script text-3xl sm:text-4xl text-wine whitespace-pre-line text-right leading-tight">
                      {letter.closing}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

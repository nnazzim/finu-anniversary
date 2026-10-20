import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Sparkles, Heart, CheckCircle2, RotateCcw, Award } from 'lucide-react';
import { anniversaryContent } from '../data/anniversaryContent';
import { triggerRomanticConfetti, triggerAnniversaryFireworks } from '../utils/confetti';

export const LoveQuiz: React.FC = () => {
  const quiz = anniversaryContent.quiz;
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = quiz.questions[currentQIndex];

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
    triggerRomanticConfetti();
  };

  const handleNext = () => {
    if (currentQIndex < quiz.questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
      triggerAnniversaryFireworks();
    }
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsCompleted(false);
  };

  return (
    <section id="quiz" className="relative py-28 px-4 overflow-hidden">
      {/* Glow elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-wine/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-burgundy-900/80 border border-gold/40 text-gold text-xs font-serif uppercase tracking-widest mb-4 shadow-gold-glow">
            <Sparkles className="w-3.5 h-3.5 text-blush" />
            <span>{quiz.badge}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream tracking-tight mb-3">
            {quiz.heading}
          </h2>

          <p className="text-blush text-sm sm:text-base font-serif italic">
            "{quiz.subheading}"
          </p>
        </div>

        {/* Main Quiz Card */}
        <div className="w-full bg-gradient-to-br from-burgundy-900/90 via-burgundy-950/95 to-wine/20 border-2 border-gold/40 rounded-3xl p-6 sm:p-10 shadow-romantic-lg backdrop-blur-md">
          
          {!isCompleted ? (
            <div>
              {/* Question Progress bar */}
              <div className="flex items-center justify-between text-xs text-gold font-serif mb-6">
                <span>
                  Question {currentQIndex + 1} of {quiz.questions.length}
                </span>
                <div className="flex gap-1.5">
                  {quiz.questions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === currentQIndex
                          ? 'w-8 bg-gold'
                          : i < currentQIndex
                          ? 'w-3 bg-wine'
                          : 'w-3 bg-burgundy-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question Text */}
              <motion.h3
                key={currentQ.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-serif text-2xl sm:text-3xl font-bold text-cream mb-8 leading-snug text-center"
              >
                "{currentQ.question}"
              </motion.h3>

              {/* Options */}
              <div className="space-y-4">
                {currentQ.options.map((opt, idx) => {
                  const isChosen = selectedOption === idx;

                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 sm:p-5 rounded-2xl text-left font-serif text-lg sm:text-xl border transition-all flex items-center justify-between ${
                        isChosen
                          ? 'bg-gradient-to-r from-wine to-burgundy-700 border-gold shadow-gold-glow text-cream'
                          : 'bg-burgundy-950/70 border-gold/25 hover:border-gold/60 text-cream/90 hover:bg-burgundy-900/50'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-burgundy-950 border border-gold/40 flex items-center justify-center text-xs font-bold text-gold">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt.text}</span>
                      </span>

                      {isChosen && (
                        <CheckCircle2 className="w-6 h-6 text-gold shrink-0 animate-scale" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Affectionate Response Box */}
              <AnimatePresence>
                {selectedOption !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 p-5 rounded-2xl bg-burgundy-950/90 border border-blush/40 flex flex-col items-center text-center space-y-4"
                  >
                    <div className="flex items-center gap-2 text-gold font-script text-2xl">
                      <Heart className="w-5 h-5 text-blush fill-blush" />
                      <span>A message from Kaakooka:</span>
                    </div>

                    <p className="font-serif text-base sm:text-lg text-cream/95 leading-relaxed">
                      "{currentQ.options[selectedOption].response}"
                    </p>

                    <button
                      onClick={handleNext}
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-gold via-amber-400 to-gold text-burgundy-950 font-serif font-bold text-base shadow-gold-glow hover:shadow-xl transition-all"
                    >
                      {currentQIndex < quiz.questions.length - 1
                        ? "Next Question →"
                        : "Reveal Final Result 👑"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Quiz Completed Final Verdict */
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center py-6"
            >
              <div className="w-20 h-20 rounded-full bg-wine border-4 border-gold shadow-gold-glow flex items-center justify-center mb-6">
                <Award className="w-10 h-10 text-gold" />
              </div>

              <h3 className="font-serif text-3xl sm:text-5xl font-extrabold text-gold mb-3 text-glow">
                {quiz.finalVerdict}
              </h3>

              <p className="font-serif text-lg sm:text-xl text-cream/90 max-w-lg mb-8 leading-relaxed">
                Whether you answered in 1 second or laughed through every option, you already won 100% of your Kaakooka's heart forever.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-burgundy-950 border border-gold/40 text-gold hover:border-gold transition-colors font-serif text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Play Again With Kaakooka</span>
                </button>
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
};

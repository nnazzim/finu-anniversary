import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Sparkles, MessageCircleHeart } from 'lucide-react';
import { anniversaryContent } from '../data/anniversaryContent';
import { triggerRomanticConfetti } from '../utils/confetti';

export const SecretMessageModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const secret = anniversaryContent.secretMessage;

  const handleOpen = () => {
    setIsOpen(true);
    triggerRomanticConfetti();
  };

  return (
    <>
      {/* Floating Discreet Heart Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <motion.button
          whileHover={{ scale: 1.15, rotate: 6 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleOpen}
          aria-label="Open secret message from Kaakooka"
          className="relative group p-3.5 rounded-full bg-gradient-to-tr from-wine to-burgundy-700 text-cream border-2 border-gold/70 shadow-romantic-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gold"
        >
          {/* Pulsing ring */}
          <span className="absolute -inset-1 rounded-full bg-gold opacity-40 animate-ping pointer-events-none" />

          <Heart className="w-6 h-6 text-cream fill-blush/90" />

          {/* Tooltip on hover */}
          <span className="absolute bottom-14 right-0 hidden group-hover:block whitespace-nowrap bg-burgundy-950 text-gold text-xs px-3 py-1.5 rounded-full border border-gold/40 shadow-lg pointer-events-none font-serif">
            {secret.buttonTooltip} 💌
          </span>
        </motion.button>
      </div>

      {/* Secret Message Dialog Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full rounded-3xl bg-gradient-to-br from-burgundy-900 via-wine/90 to-burgundy-950 border-2 border-gold/60 p-8 text-center shadow-romantic-lg overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close secret message"
                className="absolute top-4 right-4 p-2 rounded-full bg-burgundy-950/70 text-cream/70 hover:text-gold hover:bg-burgundy-950 transition-colors border border-gold/30"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Heart Icon Header */}
              <div className="w-16 h-16 rounded-full bg-burgundy-950 border-2 border-gold/60 mx-auto flex items-center justify-center shadow-gold-glow mb-5">
                <MessageCircleHeart className="w-8 h-8 text-blush" />
              </div>

              {/* Secret Title */}
              <h3 className="font-serif text-3xl font-bold text-cream mb-4">
                {secret.title}
              </h3>

              {/* Secret Note Body */}
              <div className="p-4 rounded-2xl bg-burgundy-950/60 border border-gold/20 mb-6">
                <p className="font-serif text-lg text-cream/95 leading-relaxed whitespace-pre-line">
                  {secret.message}
                </p>
              </div>

              {/* Signoff */}
              <p className="font-script text-2xl text-gold mb-6">
                — {secret.signoff} ❤️
              </p>

              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-2.5 rounded-full bg-gold text-burgundy-950 font-serif font-bold text-sm shadow-gold-glow hover:bg-amber-300 transition-colors"
              >
                Keep in My Heart ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Heart, Sparkles, X, ChevronLeft, ChevronRight, Flower2, PlusCircle } from 'lucide-react';
import { anniversaryContent } from '../data/anniversaryContent';
import { usePhotos } from '../context/PhotoContext';

export const WeddingMemoriesSection: React.FC = () => {
  const wedding = anniversaryContent.weddingsSection;
  const { weddingPhotos: slots, setIsAdminOpen } = usePhotos();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="wedding-memories" className="relative py-28 px-4 overflow-hidden bg-burgundy-950/70">
      {/* Background soft golden floral glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-wine/20 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-burgundy-900/80 border border-gold/40 text-gold text-xs font-serif uppercase tracking-widest mb-4 shadow-gold-glow">
            <Flower2 className="w-3.5 h-3.5 text-blush" />
            <span>Friends' Wedding Keepsakes</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-cream tracking-tight mb-4">
            {wedding.heading}
          </h2>

          <p className="text-blush text-base sm:text-lg font-serif italic mb-6">
            "{wedding.subheading}"
          </p>

          <div className="max-w-2xl mx-auto space-y-3 text-cream/90 font-serif text-base sm:text-lg leading-relaxed">
            {wedding.narrative.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-wine/80 hover:bg-wine text-cream text-xs font-serif font-bold border border-gold/50 shadow-gold-glow transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5 text-gold" />
              <span>Add Wedding Pictures 📸</span>
            </button>
          </div>
        </div>

        {/* Wedding Photo Slots (3 Elegantly Styled Floral/Gold Frames) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {slots.map((slot, idx) => {
            const hasError = imageErrors[slot.id];

            return (
              <motion.div
                key={slot.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setSelectedIdx(idx)}
                className="relative bg-[#FFFDF9] p-4 pt-5 pb-6 rounded-3xl shadow-romantic-lg border-2 border-gold/40 cursor-pointer group flex flex-col items-center"
              >
                {/* Gold floral stamp badge */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-wine to-burgundy-900 border border-gold/60 text-gold text-[11px] font-serif shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <Heart className="w-3 h-3 text-blush fill-blush" />
                  <span>Wedding Memory #{slot.id}</span>
                </div>

                {/* Photo Display / Elegant Fallback Card */}
                <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-burgundy-900/10 relative flex flex-col items-center justify-center border border-stone-200 mt-2">
                  {!hasError ? (
                    <img
                      src={slot.image}
                      alt={slot.caption}
                      onError={() => handleImageError(slot.id)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : null}

                  {/* Elegant Placeholder Card */}
                  {hasError && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-burgundy-900/20 via-wine/10 to-blush/30 p-6 flex flex-col items-center justify-center text-center">
                      <div className="w-14 h-14 rounded-full bg-wine/30 border border-gold/50 flex items-center justify-center mb-3 shadow-inner">
                        <Camera className="w-7 h-7 text-wine" />
                      </div>
                      <p className="font-serif font-bold text-wine text-base sm:text-lg leading-tight">
                        {wedding.placeholderLabel}
                      </p>
                      <p className="text-xs text-stone-500 font-mono mt-2">
                        {slot.image.split('/').pop()}
                      </p>
                      <span className="text-[10px] text-stone-400 font-sans mt-3 bg-stone-100 px-2 py-0.5 rounded">
                        Drop photo in public/images/friends-weddings/
                      </span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-wine/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span className="px-3.5 py-1.5 rounded-full bg-burgundy-950/90 text-gold text-xs font-serif border border-gold/50 shadow-gold-glow flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blush" />
                      View Full Size
                    </span>
                  </div>
                </div>

                {/* Caption & Date */}
                <div className="mt-4 px-2 text-center w-full">
                  <p className="font-script text-2xl text-burgundy-950 line-clamp-1">
                    {slot.caption}
                  </p>
                  <p className="text-[11px] font-serif text-stone-500 mt-0.5">
                    {slot.date}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal for Wedding Memories */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setSelectedIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-burgundy-950 border border-gold/40 rounded-3xl p-6 sm:p-8 shadow-romantic-lg overflow-hidden flex flex-col items-center text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIdx(null)}
                aria-label="Close wedding photo view"
                className="absolute top-4 right-4 p-2 rounded-full bg-wine/60 text-cream hover:bg-wine hover:text-gold transition-colors border border-gold/30 z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev & Next */}
              <button
                onClick={() =>
                  setSelectedIdx((prev) => (prev !== null ? (prev - 1 + slots.length) % slots.length : 0))
                }
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-burgundy-900/80 text-cream hover:text-gold border border-gold/30 transition-colors z-20"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setSelectedIdx((prev) => (prev !== null ? (prev + 1) % slots.length : 0))
                }
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-burgundy-900/80 text-cream hover:text-gold border border-gold/30 transition-colors z-20"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image in Modal */}
              <div className="w-full max-h-[60vh] aspect-[4/5] rounded-2xl overflow-hidden bg-burgundy-900/60 border border-gold/20 flex items-center justify-center relative mb-5">
                {!imageErrors[slots[selectedIdx].id] ? (
                  <img
                    src={slots[selectedIdx].image}
                    alt={slots[selectedIdx].caption}
                    onError={() => handleImageError(slots[selectedIdx].id)}
                    className="max-h-full max-w-full object-contain rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center max-w-md">
                    <div className="w-16 h-16 rounded-full bg-wine/50 border border-gold/50 flex items-center justify-center mb-3">
                      <Camera className="w-8 h-8 text-gold" />
                    </div>
                    <p className="font-serif text-2xl text-cream font-bold mb-2">
                      {wedding.placeholderLabel}
                    </p>
                    <p className="text-xs text-blush/90 mb-3">
                      Save your real photo at <code className="bg-wine/60 px-2 py-0.5 rounded text-gold">public{slots[selectedIdx].image}</code>
                    </p>
                    <span className="text-xs text-cream/60">
                      Wedding Photo Slot #{slots[selectedIdx].id} of {slots.length}
                    </span>
                  </div>
                )}
              </div>

              {/* Caption */}
              <p className="font-serif text-xl sm:text-2xl text-cream font-medium">
                "{slots[selectedIdx].caption}"
              </p>
              <p className="text-xs text-gold/80 font-serif mt-1">
                {slots[selectedIdx].date}
              </p>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

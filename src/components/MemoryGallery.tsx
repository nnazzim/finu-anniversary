import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Heart, Sparkles, Filter, Info, PlusCircle } from 'lucide-react';
import { anniversaryContent, MemoryItem } from '../data/anniversaryContent';
import { usePhotos } from '../context/PhotoContext';

export const MemoryGallery: React.FC = () => {
  const { galleryPhotos: memories, setIsAdminOpen } = usePhotos();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Photos (10th+)' },
    { id: 'class-10', label: 'Class 10 (MMET)' },
    { id: 'class-11', label: 'Class 11 (Panakkad)' },
    { id: 'class-12', label: 'Class 12 (Panakkad)' },
    { id: 'college', label: 'College Days' },
    { id: 'weddings', label: 'Friends\' Weddings' },
    { id: 'other', label: 'Special Memories' },
  ];

  const filteredMemories =
    activeCategory === 'all'
      ? memories
      : memories.filter((m) => m.category === activeCategory);

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIdx(null);
      if (e.key === 'ArrowRight') {
        setSelectedIdx((prev) => (prev !== null ? (prev + 1) % filteredMemories.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIdx((prev) => (prev !== null ? (prev - 1 + filteredMemories.length) % filteredMemories.length : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, filteredMemories.length]);

  return (
    <section id="gallery" className="relative py-28 px-4 overflow-hidden bg-burgundy-950/60">
      {/* Background celestial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-wine/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-burgundy-900/80 border border-gold/40 text-gold text-xs font-serif uppercase tracking-widest mb-4 shadow-gold-glow">
            <Camera className="w-3.5 h-3.5 text-blush" />
            <span>Real Couple Photographs</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-cream tracking-tight mb-4">
            {anniversaryContent.galleryHeading}
          </h2>

          <p className="text-blush text-base sm:text-lg font-serif italic max-w-2xl mx-auto mb-6">
            "{anniversaryContent.gallerySubtitle}"
          </p>

          {/* Prominent Photo Rule Banner */}
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-burgundy-900/70 border border-gold/30 text-xs sm:text-sm text-gold/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-left shadow-inner">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-gold shrink-0" />
              <div>
                <span className="font-semibold text-cream block mb-0.5">
                  Real Photographs Begin from 10th Standard
                </span>
                <span>
                  Early school years (2nd–9th Std) are immortalized through our timeline story & illustrations.
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-wine hover:bg-wine-600 text-cream text-xs font-serif font-bold border border-gold/60 shadow-md transition-all whitespace-nowrap"
            >
              <PlusCircle className="w-3.5 h-3.5 text-gold" />
              <span>Add Pictures</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedIdx(null);
              }}
              className={`px-4 py-2 rounded-full text-xs font-serif transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-wine to-burgundy-700 text-cream border border-gold shadow-gold-glow font-bold'
                  : 'bg-burgundy-900/60 hover:bg-burgundy-900 text-cream/70 hover:text-gold border border-gold/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredMemories.map((item, idx) => {
            const hasError = imageErrors[item.id];
            const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-3', 'rotate-3'];
            const rotClass = rotations[idx % rotations.length];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
                whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
                onClick={() => setSelectedIdx(idx)}
                className={`relative bg-cream p-3.5 pt-4 pb-5 rounded-2xl shadow-romantic cursor-pointer transition-all duration-300 group border border-amber-900/20 ${rotClass}`}
              >
                {/* Scrapbook Tape detail */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-blush/60 border-l border-r border-dashed border-amber-800/40 rotate-1 shadow-sm pointer-events-none" />

                {/* Photo Display or Fallback Placeholder */}
                <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-burgundy-900/10 relative flex flex-col items-center justify-center border border-stone-200">
                  {!hasError ? (
                    <img
                      src={item.image}
                      alt={item.caption}
                      onError={() => handleImageError(item.id)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : null}

                  {/* Elegant Placeholder Card */}
                  {hasError && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-burgundy-900/20 via-wine/10 to-blush/30 p-4 flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 rounded-full bg-wine/30 border border-gold/40 flex items-center justify-center mb-2 shadow-inner">
                        <Camera className="w-6 h-6 text-wine" />
                      </div>
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-wine/80 bg-blush/40 px-2 py-0.5 rounded-full mb-1">
                        {item.stageLabel}
                      </span>
                      <p className="font-serif font-bold text-wine text-xs sm:text-sm leading-tight">
                        Our memory goes here ❤️
                      </p>
                      <p className="text-[10px] text-stone-500 font-mono mt-1">
                        {item.image.replace('/images/', '')}
                      </p>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-wine/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span className="px-3 py-1.5 rounded-full bg-burgundy-950/90 text-gold text-xs font-serif border border-gold/40 shadow-gold-glow flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blush" />
                      View Memory
                    </span>
                  </div>
                </div>

                {/* Polaroid Caption & Stage Info */}
                <div className="mt-3 px-1">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-wine/70">
                      {item.stageLabel}
                    </span>
                    {item.date && (
                      <span className="text-[10px] font-serif text-stone-500">
                        {item.date}
                      </span>
                    )}
                  </div>
                  <p className="font-script text-xl sm:text-2xl text-burgundy-950 line-clamp-1 leading-snug">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && filteredMemories[selectedIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setSelectedIdx(null)}
          >
            {/* Modal Dialog Content */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-burgundy-950 border border-gold/40 rounded-3xl p-6 sm:p-8 shadow-romantic-lg overflow-hidden flex flex-col items-center text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIdx(null)}
                aria-label="Close photo view"
                className="absolute top-4 right-4 p-2 rounded-full bg-wine/60 text-cream hover:bg-wine hover:text-gold transition-colors border border-gold/30 z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev Button */}
              <button
                onClick={() =>
                  setSelectedIdx((prev) => (prev !== null ? (prev - 1 + filteredMemories.length) % filteredMemories.length : 0))
                }
                aria-label="Previous memory"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-burgundy-900/80 text-cream hover:text-gold border border-gold/30 transition-colors z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={() =>
                  setSelectedIdx((prev) => (prev !== null ? (prev + 1) % filteredMemories.length : 0))
                }
                aria-label="Next memory"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-burgundy-900/80 text-cream hover:text-gold border border-gold/30 transition-colors z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Memory Image in Lightbox */}
              <div className="w-full max-h-[60vh] aspect-[4/3] rounded-2xl overflow-hidden bg-burgundy-900/60 border border-gold/20 flex items-center justify-center relative mb-5">
                {!imageErrors[filteredMemories[selectedIdx].id] ? (
                  <img
                    src={filteredMemories[selectedIdx].image}
                    alt={filteredMemories[selectedIdx].caption}
                    onError={() => handleImageError(filteredMemories[selectedIdx].id)}
                    className="max-h-full max-w-full object-contain rounded-xl"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center max-w-md">
                    <div className="w-16 h-16 rounded-full bg-wine/50 border border-gold/50 flex items-center justify-center mb-3">
                      <Camera className="w-8 h-8 text-gold" />
                    </div>
                    <span className="text-xs uppercase font-serif text-blush tracking-wider mb-1 font-semibold">
                      {filteredMemories[selectedIdx].stageLabel}
                    </span>
                    <p className="font-serif text-2xl text-cream font-bold mb-2">
                      Our memory goes here ❤️
                    </p>
                    <p className="text-sm text-blush/90 mb-3">
                      Drop your photo at <code className="bg-wine/60 px-2 py-0.5 rounded text-gold">public{filteredMemories[selectedIdx].image}</code>
                    </p>
                    {filteredMemories[selectedIdx].description && (
                      <p className="text-xs text-cream/70 italic">
                        "{filteredMemories[selectedIdx].description}"
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Lightbox Caption & Details */}
              <div className="max-w-xl">
                <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-wider text-gold mb-2">
                  <Heart className="w-3.5 h-3.5 fill-blush text-blush" />
                  <span>
                    Photo {selectedIdx + 1} of {filteredMemories.length}
                  </span>
                  <span>•</span>
                  <span>{filteredMemories[selectedIdx].stageLabel}</span>
                  {filteredMemories[selectedIdx].date && (
                    <>
                      <span>•</span>
                      <span>{filteredMemories[selectedIdx].date}</span>
                    </>
                  )}
                </div>

                <p className="font-serif text-xl sm:text-2xl text-cream font-medium">
                  "{filteredMemories[selectedIdx].caption}"
                </p>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Camera, Bookmark, Pencil } from 'lucide-react';
import { anniversaryContent } from '../data/anniversaryContent';

export const ChildhoodBeginning: React.FC = () => {
  const content = anniversaryContent.beginning;

  return (
    <section id="beginning" className="relative py-24 px-4 overflow-hidden">
      {/* Warm nostalgic lighting glow */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-gold/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-wine/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Tag */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-burgundy-900/80 border border-gold/30 text-gold text-xs font-serif tracking-widest uppercase">
            <Bookmark className="w-3.5 h-3.5 text-blush" />
            {content.tag}
          </span>
        </div>

        {/* Nostalgic Notebook Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="relative rounded-3xl notebook-paper text-burgundy-950 p-6 sm:p-12 shadow-2xl border-4 border-amber-900/20 rotate-[-0.5deg]"
        >
          {/* Scrapbook Tape details at top & bottom corners */}
          <div className="scrapbook-tape" />
          <div className="absolute -top-3 right-8 w-24 h-6 bg-blush/60 rotate-3 shadow-sm border-l border-r border-dashed border-amber-800/40 pointer-events-none" />
          <div className="absolute -bottom-3 left-8 w-24 h-6 bg-gold/40 -rotate-2 shadow-sm border-l border-r border-dashed border-amber-800/40 pointer-events-none" />

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-wine tracking-tight">
              {content.heading}
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="h-[2px] w-12 bg-wine/30" />
              <Heart className="w-4 h-4 text-wine fill-blush" />
              <span className="h-[2px] w-12 bg-wine/30" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Story text */}
            <div className="md:col-span-7 space-y-5 text-burgundy-900 leading-relaxed font-sans text-base sm:text-lg">
              {content.paragraphs.map((p, idx) => (
                <p key={idx} className="font-normal text-slate-800">
                  {p}
                </p>
              ))}

              {/* Special Highlight Line */}
              <div className="relative p-5 rounded-2xl bg-blush-100/90 border-2 border-wine/30 shadow-inner mt-6">
                <p className="font-serif font-bold text-xl sm:text-2xl text-wine text-center leading-snug">
                  "{content.highlightLine}"
                </p>
                <div className="flex justify-center mt-2">
                  <span className="font-script text-xl text-wine/80">
                    — From your Kaakooka's childhood heart
                  </span>
                </div>
              </div>

              {/* Cute handwritten doodle note */}
              <div className="pt-2 flex items-center gap-2 text-wine/75 font-script text-xl sm:text-2xl">
                <Pencil className="w-4 h-4 text-wine shrink-0" />
                <span>{content.noteDoodle}</span>
              </div>
            </div>

            {/* Polaroid Photo Placeholder */}
            <div className="md:col-span-5 flex justify-center">
              <motion.div
                whileHover={{ rotate: 1, scale: 1.02 }}
                className="w-full max-w-[280px] bg-white p-4 pt-4 pb-6 rounded-lg shadow-xl border border-stone-200 rotate-2 flex flex-col items-center"
              >
                {/* Photo frame area */}
                <div className="w-full aspect-[4/5] bg-gradient-to-tr from-stone-100 via-blush-50 to-stone-50 rounded border border-dashed border-stone-300 flex flex-col items-center justify-center p-4 text-center group cursor-pointer relative overflow-hidden">
                  <div className="w-14 h-14 rounded-full bg-blush/30 flex items-center justify-center mb-3">
                    <Camera className="w-7 h-7 text-wine/70" />
                  </div>
                  <p className="font-serif font-semibold text-wine text-sm">
                    {content.photoPlaceholderTitle}
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    {content.photoPlaceholderSub}
                  </p>
                  <span className="mt-3 text-[10px] text-stone-400 font-mono uppercase tracking-wider bg-stone-100 px-2 py-0.5 rounded">
                    Photo Placeholder
                  </span>
                </div>

                {/* Polaroid Caption */}
                <p className="font-script text-2xl text-slate-800 mt-4 text-center">
                  2nd Standard Memories ❤️
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

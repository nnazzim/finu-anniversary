import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Calendar, Camera, BookOpen } from 'lucide-react';
import { anniversaryContent, TimelineChapter } from '../data/anniversaryContent';

export const ChaptersTimeline: React.FC = () => {
  const chapters = anniversaryContent.chapters;

  return (
    <section id="chapters" className="relative py-28 px-4 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-wine/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gold/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-burgundy-900/80 border border-gold/40 text-gold text-xs font-serif uppercase tracking-widest mb-4 shadow-gold-glow"
          >
            <BookOpen className="w-3.5 h-3.5 text-blush" />
            <span>The Seven Milestones of Us</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl sm:text-6xl font-bold text-cream tracking-tight mb-4"
          >
            Seven Chapters of Our Love
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-blush text-base sm:text-lg font-serif italic"
          >
            A romantic journey across time — from a schoolboy's courage to our forever story.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical central glowing line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-8 -translate-x-1/2 w-1 bg-gradient-to-b from-gold/30 via-wine to-gold/30 rounded-full shadow-gold-glow pointer-events-none" />

          {/* Chapters loop */}
          <div className="space-y-16">
            {chapters.map((chapter: TimelineChapter, index: number) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Marker */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="w-12 h-12 rounded-full bg-gradient-to-tr from-burgundy-900 to-wine border-2 border-gold flex items-center justify-center shadow-gold-glow cursor-pointer"
                    >
                      <span className="font-serif text-xs font-bold text-gold">
                        0{chapter.chapterNumber}
                      </span>
                    </motion.div>
                  </div>

                  {/* Spacer for desktop layout */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                      isEven ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-burgundy-900/80 via-burgundy-950/90 to-burgundy-900/70 border border-gold/30 backdrop-blur-md shadow-romantic transition-all duration-300 hover:border-gold/60 group">
                      
                      {/* Meta header: Tag & Date */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        {chapter.tag && (
                          <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-blush bg-wine/50 px-3 py-1 rounded-full border border-blush/30">
                            {chapter.tag}
                          </span>
                        )}
                        {chapter.date && (
                          <div className="flex items-center gap-1.5 text-xs text-gold font-serif">
                            <Calendar className="w-3.5 h-3.5 text-blush" />
                            <span>{chapter.date}</span>
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream mb-3 group-hover:text-gold transition-colors">
                        Chapter {chapter.chapterNumber}: {chapter.title}
                      </h3>

                      {/* Description */}
                      <p className="text-cream/85 font-sans leading-relaxed text-sm sm:text-base mb-6">
                        {chapter.description}
                      </p>

                      {/* Polaroid-style photo preview / placeholder */}
                      <div className="pt-2">
                        <div className="relative rounded-2xl bg-burgundy-950/90 border border-gold/25 p-3 flex items-center gap-4 hover:border-gold/50 transition-colors">
                          <div className="w-16 h-16 rounded-xl bg-wine/40 border border-dashed border-gold/40 flex items-center justify-center shrink-0">
                            <Camera className="w-6 h-6 text-gold/80" />
                          </div>
                          <div>
                            <p className="font-serif text-xs font-semibold text-cream">
                              Memory Snapshot #{chapter.chapterNumber}
                            </p>
                            <p className="text-[11px] text-blush/80 mt-0.5">
                              {chapter.image ? `Assigned to ${chapter.image.split('/').pop()}` : "Ready for your photograph"}
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

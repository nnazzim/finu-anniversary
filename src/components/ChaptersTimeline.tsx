import React from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Sparkles,
  Calendar,
  Camera,
  BookOpen,
  Award,
  GraduationCap,
  Coffee,
  FileText,
  Bookmark,
  Cake,
  Eye,
  MapPin,
} from 'lucide-react';
import { anniversaryContent, TimelineChapter } from '../data/anniversaryContent';
import { usePhotos } from '../context/PhotoContext';

const stageBadges: Record<string, { label: string; color: string }> = {
  childhood: { label: "Childhood • 2nd–7th Std", color: "bg-amber-900/60 text-amber-200 border-amber-600/40" },
  school: { label: "High School • MMET", color: "bg-wine/60 text-blush border-wine-500/40" },
  'higher-secondary': { label: "Higher Secondary • Panakkad", color: "bg-emerald-950/60 text-emerald-200 border-emerald-600/40" },
  college: { label: "College & Distance", color: "bg-blue-950/60 text-blue-200 border-blue-500/40" },
  today: { label: "Seven Years & Forever", color: "bg-gold/20 text-gold border-gold/50" },
};

export const ChaptersTimeline: React.FC = () => {
  const chapters = anniversaryContent.chapters;
  const { galleryPhotos, weddingPhotos } = usePhotos();

  // Helper to find matching custom photo for a chapter
  const getChapterPhoto = (chNum: number) => {
    if (chNum === 6) {
      return galleryPhotos.find((p) => p.category === 'class-10' && (p.isCustom || (typeof p.image === 'string' && p.image.startsWith('data:'))));
    }
    if (chNum === 7) {
      return galleryPhotos.find((p) => (p.category === 'class-11' || p.category === 'class-12') && (p.isCustom || (typeof p.image === 'string' && p.image.startsWith('data:'))));
    }
    if (chNum === 8 || chNum === 9) {
      return galleryPhotos.find((p) => p.category === 'college' && (p.isCustom || (typeof p.image === 'string' && p.image.startsWith('data:'))));
    }
    if (chNum === 10) {
      return weddingPhotos.find((w) => w.isCustom || (typeof w.image === 'string' && w.image.startsWith('data:')));
    }
    return null;
  };

  return (
    <section id="chapters" className="relative py-28 px-4 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-wine/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gold/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-burgundy-900/80 border border-gold/40 text-gold text-xs font-serif uppercase tracking-widest mb-4 shadow-gold-glow"
          >
            <BookOpen className="w-3.5 h-3.5 text-blush" />
            <span>Our Real Journey Chronology</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl sm:text-6xl font-bold text-cream tracking-tight mb-4"
          >
            Twelve Chapters of Our Love
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-blush text-base sm:text-lg font-serif italic max-w-2xl mx-auto"
          >
            From Munduparamba School competitions to Farook College and Government College — every step that made you my Finu and me your Kaakooka.
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
              const stage = stageBadges[chapter.schoolStage] || stageBadges.childhood;

              return (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 0.05 }}
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
                        {chapter.chapterNumber < 10 ? `0${chapter.chapterNumber}` : chapter.chapterNumber}
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
                    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-burgundy-900/85 via-burgundy-950/90 to-burgundy-900/75 border border-gold/30 backdrop-blur-md shadow-romantic transition-all duration-300 hover:border-gold/60 group">
                      
                      {/* Meta header: Stage & Period */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className={`text-[10px] font-sans font-semibold uppercase tracking-wider px-3 py-1 rounded-full border ${stage.color}`}>
                          {stage.label}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-gold font-serif">
                          <Calendar className="w-3.5 h-3.5 text-blush" />
                          <span>{chapter.period}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream mb-2 group-hover:text-gold transition-colors">
                        Chapter {chapter.chapterNumber}: {chapter.title}
                      </h3>

                      {/* Headline Quote */}
                      <p className="font-script text-xl sm:text-2xl text-gold/90 mb-4">
                        "{chapter.headlineQuote}"
                      </p>

                      {/* Narrative Paragraphs */}
                      <div className="space-y-3 text-cream/85 font-sans leading-relaxed text-sm sm:text-base mb-6">
                        {chapter.narrative.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>

                      {/* Highlighted Emotional Quote Box */}
                      <div className="p-4 rounded-2xl bg-burgundy-950/80 border border-gold/25 mb-5 shadow-inner">
                        <p className="font-serif italic text-blush text-sm sm:text-base leading-relaxed">
                          "{chapter.emotionalText}"
                        </p>
                      </div>

                      {/* Visual Component / Scene Type */}
                      <div className="pt-2">
                        {/* Chapters 1 to 5: Custom Illustrated Memory Cards (clearly distinguished) */}
                        {chapter.imageType === 'illustration' && (
                          <div className="p-3 rounded-2xl bg-burgundy-950/90 border border-gold/20 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-wine/40 border border-gold/40 flex items-center justify-center shrink-0">
                              <Bookmark className="w-6 h-6 text-gold" />
                            </div>
                            <div>
                              <p className="font-serif text-xs font-semibold text-cream">
                                AMUP Munduparamba Memories
                              </p>
                              <p className="text-[11px] text-blush/80">
                                Illustrated Classroom Memory • (No photos 2nd–9th std)
                              </p>
                            </div>
                          </div>
                        )}

                        {chapter.imageType === 'scrapbook' && (
                          <div className="p-3 rounded-2xl bg-burgundy-950/90 border border-gold/20 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-wine/40 border border-gold/40 flex items-center justify-center shrink-0">
                              <Cake className="w-6 h-6 text-blush" />
                            </div>
                            <div>
                              <p className="font-serif text-xs font-semibold text-cream">
                                Dairy Milk Chocolate Exchange
                              </p>
                              <p className="text-[11px] text-blush/80">
                                6th standard friendship turning point
                              </p>
                            </div>
                          </div>
                        )}

                        {chapter.imageType === 'autograph' && (
                          <div className="p-3 rounded-2xl bg-burgundy-950/90 border border-gold/20 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-wine/40 border border-gold/40 flex items-center justify-center shrink-0">
                              <FileText className="w-6 h-6 text-gold" />
                            </div>
                            <div>
                              <p className="font-serif text-xs font-semibold text-cream">
                                Autograph Book Proposal
                              </p>
                              <p className="text-[11px] text-blush/80">
                                "I Need You, I Miss You, I Love You"
                              </p>
                            </div>
                          </div>
                        )}

                        {chapter.imageType === 'talent' && (
                          <div className="p-3 rounded-2xl bg-burgundy-950/90 border border-gold/20 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-wine/40 border border-gold/40 flex items-center justify-center shrink-0">
                              <Award className="w-6 h-6 text-gold" />
                            </div>
                            <div>
                              <p className="font-serif text-xs font-semibold text-cream">
                                Talent Certificate Admission to MMET
                              </p>
                              <p className="text-[11px] text-blush/80">
                                Miraculously grouped in the same 8th standard class
                              </p>
                            </div>
                          </div>
                        )}

                        {chapter.imageType === 'milestone' && (
                          <div className="p-3 rounded-2xl bg-gradient-to-r from-wine/50 to-burgundy-950/90 border border-gold/40 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-wine flex items-center justify-center shrink-0 border border-gold/50 shadow-gold-glow">
                              <Heart className="w-6 h-6 text-cream fill-blush" />
                            </div>
                            <div>
                              <p className="font-serif text-xs font-bold text-gold">
                                Sacred Turning Point
                              </p>
                              <p className="text-[11px] text-cream/90">
                                The Day My Finu Said YES • 21 Oct 2019
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Real Photo Slot for 10th standard onwards */}
                        {chapter.imageType === 'photo-placeholder' && (
                          <div className="p-3 rounded-2xl bg-burgundy-950/90 border border-gold/30 flex items-center gap-3 hover:border-gold/60 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-wine/30 border border-dashed border-gold/50 flex items-center justify-center shrink-0">
                              <Camera className="w-6 h-6 text-gold" />
                            </div>
                            <div>
                              <p className="font-serif text-xs font-semibold text-cream">
                                Real Photograph Slot ({chapter.period})
                              </p>
                              <p className="text-[11px] text-blush/80">
                                Folder: <code className="bg-wine/40 px-1 rounded text-gold">public/images/{chapter.photoSlot}/</code>
                              </p>
                            </div>
                          </div>
                        )}
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

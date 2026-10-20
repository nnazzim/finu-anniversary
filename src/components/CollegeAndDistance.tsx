import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Heart, Sparkles, MapPin, Compass, Eye, Moon, Sun } from 'lucide-react';
import { anniversaryContent } from '../data/anniversaryContent';

export const CollegeAndDistance: React.FC = () => {
  const colleges = anniversaryContent.collegesSection;
  const glances = anniversaryContent.glancesSection;

  return (
    <div id="colleges-and-distance" className="relative py-24 px-4 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-wine/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-24">
        
        {/* ============================================================= */}
        {/* PART 1: TWO COLLEGES, ONE LOVE                                */}
        {/* ============================================================= */}
        <div>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-burgundy-900/80 border border-gold/40 text-gold text-xs font-serif uppercase tracking-widest mb-4 shadow-gold-glow"
            >
              <GraduationCap className="w-3.5 h-3.5 text-blush" />
              <span>A New Chapter Beyond School</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-3xl sm:text-5xl font-bold text-cream tracking-tight mb-4"
            >
              {colleges.heading}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-blush text-base sm:text-lg font-serif italic"
            >
              "{colleges.subheading}"
            </motion.p>
          </div>

          {/* Two Distinct Campus Cards with Connecting Heart Bridge */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
            
            {/* Center connecting line & heart on desktop */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-burgundy-900 to-wine border-2 border-gold shadow-gold-glow flex items-center justify-center animate-pulse">
                  <Heart className="w-6 h-6 text-cream fill-blush" />
                </div>
                <div className="absolute -left-12 top-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent to-gold" />
                <div className="absolute -right-12 top-1/2 w-12 h-[2px] bg-gradient-to-l from-transparent to-gold" />
              </div>
            </div>

            {/* Campus 1: Mohammed Nasim — Farook College */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-burgundy-900/90 via-wine/30 to-burgundy-950/90 border border-gold/40 shadow-romantic relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-serif uppercase tracking-widest text-gold/80 px-3 py-1 rounded-full bg-burgundy-950 border border-gold/30">
                    His Campus
                  </span>
                  <MapPin className="w-4 h-4 text-blush" />
                </div>

                <h3 className="font-serif text-3xl font-bold text-cream mb-2">
                  {colleges.hisCampus.name}
                </h3>
                <p className="font-script text-2xl text-gold mb-4">
                  {colleges.hisCampus.person}
                </p>

                <p className="text-cream/80 text-sm leading-relaxed mb-6">
                  {colleges.hisCampus.details}
                </p>
              </div>

              <div className="pt-4 border-t border-gold/20 flex items-center gap-2 text-xs text-blush/80">
                <Compass className="w-3.5 h-3.5 text-gold" />
                <span>Across the distance, always thinking of her</span>
              </div>
            </motion.div>

            {/* Campus 2: Hafna Sherin (Finu) — Government College, Malappuram */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-burgundy-900/90 via-wine/30 to-burgundy-950/90 border border-gold/40 shadow-romantic relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blush/10 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-serif uppercase tracking-widest text-blush px-3 py-1 rounded-full bg-burgundy-950 border border-blush/30">
                    Her Campus
                  </span>
                  <MapPin className="w-4 h-4 text-gold" />
                </div>

                <h3 className="font-serif text-3xl font-bold text-cream mb-2">
                  {colleges.herCampus.name}
                </h3>
                <p className="font-script text-2xl text-blush mb-4">
                  {colleges.herCampus.person}
                </p>

                <p className="text-cream/80 text-sm leading-relaxed mb-6">
                  {colleges.herCampus.details}
                </p>
              </div>

              <div className="pt-4 border-t border-gold/20 flex items-center gap-2 text-xs text-gold/80">
                <Heart className="w-3.5 h-3.5 text-blush fill-blush" />
                <span>Her Kaakooka's girl, wherever she goes</span>
              </div>
            </motion.div>

          </div>

          {/* Narrative Paragraphs */}
          <div className="max-w-3xl mx-auto mt-12 space-y-4 text-center">
            {colleges.narrativeParagraphs.map((para, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`font-serif text-lg sm:text-xl leading-relaxed ${
                  idx === 3 ? 'text-gold font-bold text-xl sm:text-2xl pt-2' : 'text-cream/90'
                }`}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>

        {/* ============================================================= */}
        {/* PART 2: THE ROADS, THE DISTANCE, AND THOSE LITTLE GLANCES ❤️ */}
        {/* ============================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative rounded-3xl bg-gradient-to-b from-burgundy-900/90 via-[#220712] to-burgundy-950 p-8 sm:p-14 border-2 border-gold/40 shadow-romantic-lg overflow-hidden"
        >
          {/* Golden hour dusk glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-wine/30 rounded-full blur-[120px] pointer-events-none" />

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-burgundy-950 border border-gold/40 text-gold text-xs font-serif uppercase tracking-widest mb-4">
              <Eye className="w-3.5 h-3.5 text-blush" />
              <span>Glances Across the Roads</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-5xl font-bold text-cream tracking-tight mb-3">
              {glances.heading}
            </h3>
            <p className="font-script text-2xl text-gold">
              "Those little moments that made an ordinary day stay in my heart."
            </p>
          </div>

          {/* Illustrated Road & Distant Silhouettes Scene */}
          <div className="relative my-8 p-6 rounded-2xl bg-burgundy-950/70 border border-gold/25 overflow-hidden">
            {/* Dusk Road Graphic & Ambience */}
            <div className="h-44 sm:h-56 w-full rounded-xl bg-gradient-to-b from-[#1F0814] via-[#351020] to-[#12030A] relative flex flex-col justify-between p-4 overflow-hidden border border-gold/20">
              
              {/* Sky with evening stars and dusk moon */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-1.5 text-xs text-gold/80 font-serif">
                  <Moon className="w-4 h-4 text-gold" />
                  <span>Dusk along the Malappuram roads</span>
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-blush animate-pulse" />
                  <span className="text-[10px] text-cream/50 uppercase tracking-widest font-mono">
                    Artistic Scene • Longing & Love
                  </span>
                </div>
              </div>

              {/* The connecting perspective road */}
              <div className="relative w-full flex justify-center items-end h-28">
                {/* Perspective road lines */}
                <div className="w-4/5 h-20 border-b-2 border-dashed border-gold/40 flex justify-center items-center">
                  <div className="w-full flex justify-between px-8 text-xs font-serif text-blush/90">
                    <span className="flex items-center gap-1 bg-burgundy-950/80 px-3 py-1 rounded-full border border-gold/30">
                      Farook Road
                    </span>
                    <Heart className="w-5 h-5 text-gold fill-blush animate-bounce" />
                    <span className="flex items-center gap-1 bg-burgundy-950/80 px-3 py-1 rounded-full border border-gold/30">
                      Govt College Road
                    </span>
                  </div>
                </div>
              </div>

              {/* Caption under scene */}
              <p className="text-[11px] text-center text-cream/60 italic font-serif">
                "Noticing each other from a distance... those long glances across the street."
              </p>
            </div>
          </div>

          {/* Narrative text */}
          <div className="max-w-2xl mx-auto space-y-4 text-center my-6">
            {glances.narrative.map((line, idx) => (
              <p key={idx} className="font-serif text-lg sm:text-xl text-cream/90 leading-relaxed">
                "{line}"
              </p>
            ))}
          </div>

          {/* Closing Quote Banner */}
          <div className="mt-8 pt-6 border-t border-gold/20 text-center">
            <p className="font-serif font-bold text-2xl sm:text-3xl text-gold gold-shimmer">
              "{glances.closingQuote}"
            </p>
          </div>

        </motion.div>

      </div>
    </div>
  );
};

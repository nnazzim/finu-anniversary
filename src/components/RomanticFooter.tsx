import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { anniversaryContent } from '../data/anniversaryContent';

export const RomanticFooter: React.FC = () => {
  const couples = anniversaryContent.couples;

  return (
    <footer className="relative py-12 px-4 bg-burgundy-950 border-t border-gold/20 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        <div className="flex items-center gap-2 mb-4">
          <span className="w-12 h-[1px] bg-gold/30" />
          <Heart className="w-4 h-4 text-wine fill-blush" />
          <span className="w-12 h-[1px] bg-gold/30" />
        </div>

        <h4 className="font-serif text-xl sm:text-2xl font-bold text-cream mb-2">
          {couples.herName} & {couples.hisName}
        </h4>

        <p className="font-script text-2xl text-gold mb-4">
          "{couples.herNickname} & her {couples.hisNickname} — Forever & Always"
        </p>

        <p className="text-xs text-cream/60 max-w-md mx-auto leading-relaxed">
          Celebrating 7 beautiful years since {couples.acceptanceDate}. From a childhood proposal in 2nd standard to a love that grows sweeter every single day.
        </p>

        <div className="mt-8 pt-6 border-t border-gold/10 w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-cream/40">
          <span>{couples.anniversaryMilestone} • 21 October 2026</span>
          <span className="mt-2 sm:mt-0">Made with ❤️ by your Kaakooka</span>
        </div>

      </div>
    </footer>
  );
};

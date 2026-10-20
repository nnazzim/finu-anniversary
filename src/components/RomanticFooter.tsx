import React from 'react';
import { Heart, Lock } from 'lucide-react';
import { anniversaryContent } from '../data/anniversaryContent';
import { usePhotos } from '../context/PhotoContext';

export const RomanticFooter: React.FC = () => {
  const couples = anniversaryContent.couples;
  const { setIsAdminOpen } = usePhotos();

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
          
          <div className="flex items-center gap-3 mt-2 sm:mt-0">
            <span>Made with ❤️ by your Kaakooka</span>
            <span>•</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-gold/70 hover:text-gold transition-colors flex items-center gap-1 font-serif underline decoration-gold/40"
              title="Open Kaakooka's Photo Admin Panel"
            >
              <Lock className="w-3 h-3" />
              <span>Kaakooka Vault (Add Photos)</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Music, Disc3, Sparkles } from 'lucide-react';
import { anniversaryContent } from '../data/anniversaryContent';
import { romanticSynth } from '../utils/romanticSynth';

export const BackgroundMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isUsingSynth, setIsUsingSynth] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioSrc = anniversaryContent.audio.audioSrc;

  // Safe play helper
  const startPlaying = useCallback(async () => {
    if (audioRef.current && !isUsingSynth) {
      try {
        audioRef.current.volume = 0.75;
        await audioRef.current.play();
        setIsPlaying(true);
        return true;
      } catch (err) {
        console.warn("Audio autoplay blocked or waiting for user gesture:", err);
        return false;
      }
    } else {
      romanticSynth.start();
      setIsPlaying(true);
      return true;
    }
  }, [isUsingSynth]);

  // Handle toggling play / pause
  const togglePlay = async () => {
    if (isPlaying) {
      // Pause
      if (audioRef.current && !isUsingSynth) {
        audioRef.current.pause();
      }
      romanticSynth.stop();
      setIsPlaying(false);
    } else {
      // Play
      const success = await startPlaying();
      if (!success && !isUsingSynth) {
        // Fallback to synth if audio completely fails
        setIsUsingSynth(true);
        romanticSynth.start();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    if (!isMuted) {
      romanticSynth.setVolume(0);
    } else {
      romanticSynth.setVolume(0.35);
    }
    setIsMuted(!isMuted);
  };

  // Autoplay as soon as website opens or on first user interaction
  useEffect(() => {
    let hasStarted = false;

    const attemptAutoplay = async () => {
      if (hasStarted) return;
      const started = await startPlaying();
      if (started) {
        hasStarted = true;
        cleanupListeners();
      }
    };

    const handleFirstGesture = async () => {
      if (hasStarted) return;
      await startPlaying();
      hasStarted = true;
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('start-romantic-music', handleFirstGesture);
    };

    // 1. Try immediate autoplay
    attemptAutoplay();

    // 2. Fallback on any user touch/click/event
    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });
    window.addEventListener('start-romantic-music', handleFirstGesture);

    return () => {
      cleanupListeners();
      romanticSynth.stop();
    };
  }, [startPlaying]);

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        onError={() => {
          // File missing or failed -> enable romantic synth fallback
          setIsUsingSynth(true);
        }}
      />

      <div className="flex items-center gap-2 bg-burgundy-900/90 backdrop-blur-md border border-gold/30 px-3 py-2 rounded-full shadow-romantic transition-all duration-300 hover:border-gold/60">
        <button
          onClick={togglePlay}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="flex items-center gap-2.5 text-cream hover:text-gold transition-colors focus:outline-none focus:ring-2 focus:ring-gold/60 rounded-full pr-1"
          aria-label={isPlaying ? "Pause romantic music" : "Play romantic music"}
          title={isPlaying ? "Pause music" : "Play romantic melody"}
        >
          <div className="relative w-8 h-8 rounded-full bg-wine/80 flex items-center justify-center border border-gold/40 shadow-inner">
            <Disc3
              className={`w-5 h-5 text-blush transition-transform ${
                isPlaying ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '4s' }}
            />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold"></span>
              </span>
            )}
          </div>

          <div className="text-left hidden sm:block">
            <p className="text-xs font-serif font-semibold text-cream leading-tight">
              {isPlaying ? anniversaryContent.audio.trackTitle : "Play Our Music"}
            </p>
            <p className="text-[10px] text-blush/80 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-gold" />
              {isUsingSynth ? "Music Box Melody" : anniversaryContent.audio.artist}
            </p>
          </div>
        </button>

        {isPlaying && (
          <button
            onClick={toggleMute}
            className="p-1.5 text-cream/70 hover:text-gold transition-colors focus:outline-none focus:ring-1 focus:ring-gold/50 rounded-full"
            aria-label={isMuted ? "Unmute music" : "Mute music"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        )}
      </div>

      {showTooltip && (
        <div className="absolute bottom-14 left-0 w-56 bg-burgundy-950/95 border border-gold/40 p-2.5 rounded-lg text-xs text-cream/90 shadow-romantic-lg pointer-events-none">
          <p className="font-semibold text-gold flex items-center gap-1">
            <Music className="w-3.5 h-3.5" />
            {anniversaryContent.audio.trackTitle}
          </p>
          <p className="mt-1 text-[11px] text-cream/80">
            {isUsingSynth
              ? "Playing ambient lullaby chime."
              : "Playing your special romantic song for Finu ❤️"}
          </p>
        </div>
      )}
    </div>
  );
};

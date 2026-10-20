import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { OpeningSurprise } from './components/OpeningSurprise';
import { PetalsAndHearts } from './components/PetalsAndHearts';
import { BackgroundMusicPlayer } from './components/BackgroundMusicPlayer';
import { SecretMessageModal } from './components/SecretMessageModal';
import { RomanticNavbar } from './components/RomanticNavbar';
import { HeroSection } from './components/HeroSection';
import { ChildhoodBeginning } from './components/ChildhoodBeginning';
import { SaidYesMilestone } from './components/SaidYesMilestone';
import { ChaptersTimeline } from './components/ChaptersTimeline';
import { MemoryGallery } from './components/MemoryGallery';
import { LoveLetter } from './components/LoveLetter';
import { WhyILoveFinu } from './components/WhyILoveFinu';
import { LoveQuiz } from './components/LoveQuiz';
import { FinalCinematicSurprise } from './components/FinalCinematicSurprise';
import { RomanticFooter } from './components/RomanticFooter';
import { triggerRomanticConfetti } from './utils/confetti';

export function App() {
  const [hasOpened, setHasOpened] = useState(false);

  const handleOpenSurprise = () => {
    setHasOpened(true);
    triggerRomanticConfetti();
  };

  const handleExploreClick = () => {
    const el = document.getElementById('beginning');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplayStory = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    triggerRomanticConfetti();
  };

  return (
    <div className="relative min-h-screen bg-[#140309] text-[#FFF5EA] overflow-x-hidden selection:bg-[#781D36] selection:text-[#FFF5EA]">
      {/* Opening Full-screen Surprise Gate */}
      <AnimatePresence>
        {!hasOpened && (
          <OpeningSurprise onOpen={handleOpenSurprise} />
        )}
      </AnimatePresence>

      {/* Floating Canvas Petals & Hearts Background */}
      <PetalsAndHearts intensity="normal" />

      {/* Persistent Optional Music Player */}
      <BackgroundMusicPlayer />

      {/* Discreet Floating Secret Message from Kaakooka */}
      <SecretMessageModal />

      {/* Main Website Content (visible once opened, or gracefully staged) */}
      <div className={`transition-opacity duration-1000 ${hasOpened ? 'opacity-100' : 'opacity-0'}`}>
        <RomanticNavbar />

        <main id="main-content">
          {/* Hero Section */}
          <HeroSection onExploreClick={handleExploreClick} />

          {/* Section 2: Childhood Beginning (2nd Standard) */}
          <ChildhoodBeginning />

          {/* Section 3: Said Yes Milestone (21 October 2019) */}
          <SaidYesMilestone />

          {/* Section 4: Seven Chapters of Our Love */}
          <ChaptersTimeline />

          {/* Section 5: Finu's Memory Gallery */}
          <MemoryGallery />

          {/* Section 6: Love Letter from Kaakooka */}
          <LoveLetter />

          {/* Section 7: Why I Love My Finu */}
          <WhyILoveFinu />

          {/* Section 8: Cute Love Quiz */}
          <LoveQuiz />

          {/* Section 9: Final Cinematic Surprise */}
          <FinalCinematicSurprise onReplayStory={handleReplayStory} />
        </main>

        <RomanticFooter />
      </div>
    </div>
  );
}

export default App;

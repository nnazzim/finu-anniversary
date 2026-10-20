import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { OpeningSurprise } from './components/OpeningSurprise';
import { PetalsAndHearts } from './components/PetalsAndHearts';
import { BackgroundMusicPlayer } from './components/BackgroundMusicPlayer';
import { SecretMessageModal } from './components/SecretMessageModal';
import { RomanticNavbar } from './components/RomanticNavbar';
import { HeroSection } from './components/HeroSection';
import { ChildhoodBeginning } from './components/ChildhoodBeginning';
import { SaidYesMilestone } from './components/SaidYesMilestone';
import { ChaptersTimeline } from './components/ChaptersTimeline';
import { CollegeAndDistance } from './components/CollegeAndDistance';
import { WeddingMemoriesSection } from './components/WeddingMemoriesSection';
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

      {/* Main Website Content */}
      <div className={`transition-opacity duration-1000 ${hasOpened ? 'opacity-100' : 'opacity-0'}`}>
        <RomanticNavbar />

        <main id="main-content">
          {/* 1. Hero Section */}
          <HeroSection onExploreClick={handleExploreClick} />

          {/* 2. Childhood Beginning (2nd Standard at AMUP Munduparamba) */}
          <ChildhoodBeginning />

          {/* 3. The Day Finu Said Yes (21 October 2019 at MMET) */}
          <SaidYesMilestone />

          {/* 4. Complete 12-Chapter Real Love Timeline */}
          <ChaptersTimeline />

          {/* 5. Two Colleges, One Love & The Roads Glances */}
          <CollegeAndDistance />

          {/* 6. Friends' Weddings Memories Gallery */}
          <WeddingMemoriesSection />

          {/* 7. Categorized Real Photo Gallery (10th Standard Onwards) */}
          <MemoryGallery />

          {/* 8. Love Letter from Kaakooka (with Real Journey Passage) */}
          <LoveLetter />

          {/* 9. Why I Love My Finu */}
          <WhyILoveFinu />

          {/* 10. Cute Love Quiz */}
          <LoveQuiz />

          {/* 11. Final Cinematic Surprise (Full Journey Climax) */}
          <FinalCinematicSurprise onReplayStory={handleReplayStory} />
        </main>

        <RomanticFooter />
      </div>
    </div>
  );
}

export default App;

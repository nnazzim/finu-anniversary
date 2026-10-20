import confetti from 'canvas-confetti';

/**
 * Fires a romantic heart-themed confetti shower with gold and blush colors.
 */
export const triggerRomanticConfetti = () => {
  const count = 70;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#F4B9CA', '#781D36', '#D6B16D', '#FFF5EA', '#E89EB3'],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

/**
 * Fireworks style confetti for the grand anniversary milestone!
 */
export const triggerAnniversaryFireworks = () => {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#F4B9CA', '#D6B16D', '#781D36', '#FFFFFF', '#FFD1DC'];

  const interval: any = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / duration);
    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    });
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    });
  }, 250);
};

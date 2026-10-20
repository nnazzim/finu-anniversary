import React, { useEffect, useRef } from 'react';

interface PetalsAndHeartsProps {
  intensity?: 'low' | 'normal' | 'high';
}

export const PetalsAndHearts: React.FC<PetalsAndHeartsProps> = ({ intensity = 'normal' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const counts = intensity === 'low' ? 20 : intensity === 'high' ? 60 : 38;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotSpeed: number;
      type: 'petal' | 'heart' | 'star';
      color: string;
      opacity: number;
      pulseSpeed: number;
    }

    const particles: Particle[] = [];
    const colors = [
      'rgba(244, 185, 202, ', // Blush pink
      'rgba(214, 177, 109, ', // Soft gold
      'rgba(232, 158, 179, ', // Rose gold
      'rgba(255, 245, 234, ', // Warm cream
      'rgba(176, 48, 83, ',   // Gentle wine
    ];

    for (let i = 0; i < counts; i++) {
      const typeRand = Math.random();
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 0.7 + 0.3,
        speedX: (Math.random() - 0.5) * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        type: typeRand < 0.45 ? 'petal' : typeRand < 0.75 ? 'heart' : 'star',
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.45 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const drawHeart = (x: number, y: number, size: number, color: string, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.fillStyle = `${color}${alpha})`;
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      // top left curve
      ctx.bezierCurveTo(
        -size / 2, -topCurveHeight,
        -size, size / 3,
        0, size
      );
      // top right curve
      ctx.bezierCurveTo(
        size, size / 3,
        size / 2, -topCurveHeight,
        0, topCurveHeight
      );
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawPetal = (x: number, y: number, size: number, rot: number, color: string, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.fillStyle = `${color}${alpha})`;
      ctx.ellipse(0, 0, size * 0.6, size * 1.2, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawStar = (x: number, y: number, size: number, color: string, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = `${color}${alpha})`;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 0.01;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(tick + i) * 0.3;
        p.rotation += p.rotSpeed;

        // Wrap around screen
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        const currentAlpha = p.opacity + Math.sin(tick * 3 + i) * 0.12;
        const safeAlpha = Math.max(0.1, Math.min(0.8, currentAlpha));

        if (p.type === 'heart') {
          drawHeart(p.x, p.y, p.size, p.color, safeAlpha);
        } else if (p.type === 'petal') {
          drawPetal(p.x, p.y, p.size, p.rotation, p.color, safeAlpha);
        } else {
          drawStar(p.x, p.y, p.size, p.color, safeAlpha);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-10 opacity-75"
    />
  );
};

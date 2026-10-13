import React, { useEffect, useRef } from 'react';

/**
 * Ancient Manuscript Background:
 * Realistic aged parchment texture, natural paper grain, faded ink spots,
 * softly burned page perimeter edges, and peaceful warm dust particles drifting
 * like sacred manuscript dust.
 */
export const ManuscriptBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle definition for gentle floating manuscript dust / golden motes
    interface DustParticle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
    }

    const colors = [
      'rgba(181, 138, 67, 0.45)', // Antique Gold
      'rgba(199, 168, 120, 0.35)', // Burnt Parchment
      'rgba(243, 231, 204, 0.3)',  // Faded Ivory
      'rgba(140, 56, 40, 0.25)',   // Muted Vermilion ember
    ];

    const particleCount = Math.min(35, Math.floor(width / 35));
    const particles: DustParticle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.3 + 0.1),
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const checkReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw dust particles drifting upward gently
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!checkReducedMotion) {
          p.y += p.speedY;
          p.x += p.speedX;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#B58A43';
        ctx.shadowBlur = p.size * 2;
        ctx.fill();
      }

      if (!checkReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Base Ancient Parchment & Deep Folio Background */}
      <div 
        className="absolute inset-0 bg-[#160e08]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 15%, rgba(45, 29, 18, 0.85) 0%, rgba(26, 17, 10, 0.95) 50%, rgba(16, 10, 6, 1) 100%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)' opacity='0.035'/%3E%3C/svg%3E")
          `
        }}
      />

      {/* Subtle Ancient Sacred Palm Leaf Vein & Watermark Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 28px,
              rgba(181, 138, 67, 0.4) 28px,
              rgba(181, 138, 67, 0.4) 29px
            )
          `
        }}
      />

      {/* Burned Page Perimeter Vignette (Authentic Burned Manuscript Edges) */}
      <div 
        className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(8,5,3,0.95),inset_0_0_240px_rgba(20,12,7,0.7)]"
      />

      {/* Drifting Sacred Golden Dust Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

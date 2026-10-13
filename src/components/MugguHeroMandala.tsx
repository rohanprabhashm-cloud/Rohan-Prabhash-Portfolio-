import React, { useState, useEffect } from 'react';
import { RotateCcw, CheckCircle2, Play } from 'lucide-react';

interface MugguHeroMandalaProps {
  className?: string;
  onAnimationComplete?: () => void;
}

/**
 * Authentic South Indian Muggu / Kolam Interactive Line-Drawing Mandala:
 * Progressively draws dots (chukkalu), weaving curved lines, 8-fold geometric loops,
 * unfolding lotus petals, and a central respectful ॐ focal point.
 */
export const MugguHeroMandala: React.FC<MugguHeroMandalaProps> = ({
  className = '',
  onAnimationComplete,
}) => {
  const [animationKey, setAnimationKey] = useState(0);
  const [stage, setStage] = useState<'dots' | 'loops' | 'petals' | 'om' | 'complete'>('dots');
  const [isInstant, setIsInstant] = useState(false);

  // Check user preference for reduced motion
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsInstant(true);
      setStage('complete');
    }
  }, []);

  // Choreographed animation stage progression
  useEffect(() => {
    if (isInstant) {
      setStage('complete');
      onAnimationComplete?.();
      return;
    }

    setStage('dots');

    const t1 = setTimeout(() => setStage('loops'), 1200);
    const t2 = setTimeout(() => setStage('petals'), 3200);
    const t3 = setTimeout(() => setStage('om'), 5200);
    const t4 = setTimeout(() => {
      setStage('complete');
      onAnimationComplete?.();
    }, 7000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [animationKey, isInstant, onAnimationComplete]);

  const handleReplay = () => {
    setIsInstant(false);
    setAnimationKey((prev) => prev + 1);
  };

  const handleInstantToggle = () => {
    setIsInstant(!isInstant);
    if (!isInstant) {
      setStage('complete');
    } else {
      setAnimationKey((prev) => prev + 1);
    }
  };

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Kolam Canvas Frame */}
      <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] flex items-center justify-center p-3">
        {/* Soft Parchment Halo / Warm Golden Illumination */}
        <div
          className={`absolute inset-4 rounded-full transition-opacity duration-1000 pointer-events-none ${
            stage === 'complete'
              ? 'opacity-85 shadow-[0_0_80px_rgba(181,138,67,0.35)] bg-gradient-to-tr from-[#8C3828]/10 via-[#B58A43]/15 to-[#F3E7CC]/10'
              : 'opacity-20'
          }`}
        />

        {/* Outer Circular Astrological / Manuscript Rim */}
        <svg
          key={`mandala-${animationKey}`}
          viewBox="-160 -160 320 320"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] select-none"
        >
          <defs>
            {/* Antique Gold Metallic Gradient */}
            <linearGradient id="goldInk" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2CDA5" />
              <stop offset="50%" stopColor="#B58A43" />
              <stop offset="100%" stopColor="#8C3828" />
            </linearGradient>

            {/* Muted Vermilion Accent */}
            <linearGradient id="vermilionInk" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8C3828" />
              <stop offset="100%" stopColor="#B58A43" />
            </linearGradient>

            <filter id="inkGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ============================================================== */}
          {/* STAGE 1: Traditional South Indian Kolam Dots Grid (Chukkalu)   */}
          {/* ============================================================== */}
          <g className="transition-opacity duration-700">
            {/* Center concentric dot rings */}
            {[
              { x: 0, y: 0, r: 2.4, color: '#8C3828' },
              // Inner ring (r = 30)
              ...[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                return { x: Math.cos(rad) * 32, y: Math.sin(rad) * 32, r: 2.0, color: '#B58A43' };
              }),
              // Middle ring (r = 65)
              ...[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                return { x: Math.cos(rad) * 65, y: Math.sin(rad) * 65, r: 2.2, color: '#C7A878' };
              }),
              // Middle offset ring (r = 95)
              ...[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                return { x: Math.cos(rad) * 95, y: Math.sin(rad) * 95, r: 2.0, color: '#8C3828' };
              }),
              // Outer ring points (r = 130)
              ...[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                return { x: Math.cos(rad) * 130, y: Math.sin(rad) * 130, r: 2.2, color: '#B58A43' };
              }),
            ].map((dot, idx) => (
              <circle
                key={`dot-${idx}`}
                cx={dot.x}
                cy={dot.y}
                r={dot.r}
                fill={dot.color}
                className={isInstant ? 'opacity-90' : 'animate-[dotPulse_0.6s_ease-out_forwards]'}
                style={{
                  animationDelay: isInstant ? '0s' : `${(idx * 0.03).toFixed(2)}s`,
                }}
              />
            ))}
          </g>

          {/* ============================================================== */}
          {/* STAGE 2: Geometric Sikku Kolam Weaving Curves                 */}
          {/* ============================================================== */}
          {(stage !== 'dots' || isInstant) && (
            <g className="transition-opacity duration-1000">
              {/* 8 Symmetrical Intertwining Infinity Loops */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                <g key={`loop-${angle}`} transform={`rotate(${angle})`}>
                  <path
                    d="M0 0 C 18 12, 32 30, 42 16 C 52 2, 45 -18, 28 -18 C 12 -18, 0 0, 0 0 Z"
                    fill="none"
                    stroke="url(#goldInk)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: isInstant ? 'none' : '300',
                      strokeDashoffset: isInstant ? '0' : '300',
                      animation: isInstant
                        ? 'none'
                        : `kolamLineDraw 2.4s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                      animationDelay: isInstant ? '0s' : `${0.2 + idx * 0.12}s`,
                    }}
                  />
                  {/* Fine interior vermilion thread */}
                  <path
                    d="M10 5 C 20 18, 30 14, 25 2 C 20 -10, 10 0, 10 5 Z"
                    fill="none"
                    stroke="url(#vermilionInk)"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                    opacity="0.8"
                  />
                </g>
              ))}

              {/* Inner Concentric Kolam Diamond Grid */}
              <circle
                cx="0"
                cy="0"
                r="32"
                fill="none"
                stroke="#B58A43"
                strokeWidth="1.2"
                strokeDasharray="4 2"
                className="opacity-75"
              />
            </g>
          )}

          {/* ============================================================== */}
          {/* STAGE 3 & 4: Unfolding Lotus Petals & Outer Mandala Borders   */}
          {/* ============================================================== */}
          {(stage === 'petals' || stage === 'om' || stage === 'complete' || isInstant) && (
            <g className="transition-opacity duration-1000">
              {/* Outer 8-Petal Classical Lotus Motif */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                <g key={`petal-${angle}`} transform={`rotate(${angle})`}>
                  {/* Classical Lotus Point */}
                  <path
                    d="M0 65 C 20 80, 32 110, 0 130 C -32 110, -20 80, 0 65 Z"
                    fill="none"
                    stroke="url(#goldInk)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: isInstant ? 'none' : '400',
                      strokeDashoffset: isInstant ? '0' : '400',
                      animation: isInstant
                        ? 'none'
                        : `kolamLineDraw 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
                      animationDelay: isInstant ? '0s' : `${0.1 + idx * 0.1}s`,
                    }}
                  />
                  {/* Decorative teardrop finial */}
                  <circle cx="0" cy="130" r="2.2" fill="#B58A43" />
                  <path
                    d="M0 130 L 0 138"
                    stroke="#8C3828"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <circle cx="0" cy="140" r="1.5" fill="#8C3828" />

                  {/* Inter-petal side loops */}
                  <path
                    d="M12 90 C 28 98, 38 98, 48 85"
                    fill="none"
                    stroke="#C7A878"
                    strokeWidth="1"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                </g>
              ))}

              {/* Concentric Manuscript Geometry Circles */}
              <circle
                cx="0"
                cy="0"
                r="65"
                fill="none"
                stroke="#B58A43"
                strokeWidth="1"
                opacity="0.8"
              />
              <circle
                cx="0"
                cy="0"
                r="112"
                fill="none"
                stroke="#8C3828"
                strokeWidth="0.9"
                strokeDasharray="3 3"
                opacity="0.7"
              />
              <circle
                cx="0"
                cy="0"
                r="148"
                fill="none"
                stroke="#B58A43"
                strokeWidth="1.5"
                opacity="0.9"
              />
              <circle
                cx="0"
                cy="0"
                r="153"
                fill="none"
                stroke="#8C3828"
                strokeWidth="0.75"
                strokeDasharray="2 4"
                opacity="0.6"
              />
            </g>
          )}

          {/* ============================================================== */}
          {/* STAGE 5: Sacred ॐ Focal Point at the Center                    */}
          {/* ============================================================== */}
          {(stage === 'om' || stage === 'complete' || isInstant) && (
            <g
              className={
                isInstant
                  ? 'opacity-100'
                  : 'animate-[sacredOmGlow_1.8s_cubic-bezier(0.16,1,0.3,1)_forwards]'
              }
            >
              {/* Central Sacred Sun Disc */}
              <circle
                cx="0"
                cy="0"
                r="22"
                fill="#211810"
                stroke="#B58A43"
                strokeWidth="1.8"
              />
              <circle
                cx="0"
                cy="0"
                r="19"
                fill="none"
                stroke="#8C3828"
                strokeWidth="0.8"
                strokeDasharray="2 1.5"
              />

              {/* Sacred ॐ Symbol (Rendered with classical Sanskrit calligraphic curve) */}
              <text
                x="0"
                y="7"
                textAnchor="middle"
                fontSize="22"
                fontFamily="Georgia, serif"
                fontWeight="bold"
                fill="#F3E7CC"
                filter="url(#inkGlow)"
                className="select-none pointer-events-none"
              >
                ॐ
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Animation Status & Interactive Controls */}
      <div className="flex items-center gap-3 mt-4 text-xs font-serif text-[#C7A878]">
        {/* Stage Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 bg-[#24170e]/80 border border-[#B58A43]/40 rounded-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B58A43] animate-pulse" />
          <span className="font-cinzel tracking-wider text-[11px] text-[#E2CDA5]">
            {stage === 'dots' && 'Step I: Chukkalu (Dots Grid)'}
            {stage === 'loops' && 'Step II: Sikku Kolam (Geometric Weaving)'}
            {stage === 'petals' && 'Step III: Padmam (Lotus Unfurling)'}
            {stage === 'om' && 'Step IV: Pranava (Sacred Center)'}
            {stage === 'complete' && 'Muggu Mandala Complete'}
          </span>
        </div>

        {/* Replay Button */}
        <button
          onClick={handleReplay}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1e130b] hover:bg-[#2c1b10] border border-[#B58A43]/40 text-[#E2CDA5] hover:text-[#F3E7CC] transition-colors rounded-sm cursor-pointer"
          title="Replay South Indian Muggu Line-Drawing"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#B58A43]" />
          <span className="font-cinzel text-[11px] tracking-wider">Replay</span>
        </button>

        {/* Skip to complete / instant toggle */}
        <button
          onClick={handleInstantToggle}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1e130b] hover:bg-[#2c1b10] border border-[#8C3828]/40 text-[#C7A878] hover:text-[#E2CDA5] transition-colors rounded-sm cursor-pointer"
          title={isInstant ? 'Enable Drawing Animation' : 'View Full Pattern'}
        >
          {isInstant ? (
            <>
              <Play className="w-3 h-3 text-[#B58A43]" />
              <span className="font-cinzel text-[11px]">Animate</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3 h-3 text-[#8C3828]" />
              <span className="font-cinzel text-[11px]">Complete</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

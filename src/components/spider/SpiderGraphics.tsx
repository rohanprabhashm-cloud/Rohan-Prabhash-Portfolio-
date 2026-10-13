import React from 'react';

interface SpiderWebCornerProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}

export const SpiderWebCorner: React.FC<SpiderWebCornerProps> = ({
  position = 'top-left',
  className = '',
  size = 180,
}) => {
  const rotationClass = {
    'top-left': '',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }[position];

  return (
    <div
      className={`pointer-events-none select-none transition-opacity duration-300 ${rotationClass} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-30 text-white"
      >
        {/* Radial structural web threads */}
        <line x1="0" y1="0" x2="160" y2="0" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="0" y1="0" x2="0" y2="160" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="0" y1="0" x2="155" y2="35" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 2" />
        <line x1="0" y1="0" x2="140" y2="70" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="0" y1="0" x2="115" y2="115" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" />
        <line x1="0" y1="0" x2="70" y2="140" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="0" y1="0" x2="35" y2="155" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 2" />

        {/* Concentric spiral webs */}
        <path d="M 28 0 Q 22 14 20 20 Q 14 22 0 28" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" fill="none" />
        <path d="M 55 0 Q 48 24 38 38 Q 24 48 0 55" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" fill="none" />
        <path d="M 85 0 Q 72 38 60 60 Q 38 72 0 85" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.6" fill="none" />
        <path d="M 120 0 Q 102 52 85 85 Q 52 102 0 120" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" fill="none" />
        <path d="M 155 0 Q 130 68 110 110 Q 68 130 0 155" stroke="currentColor" strokeWidth="1.4" strokeOpacity="0.4" fill="none" />

        {/* Crimson nexus node */}
        <circle cx="0" cy="0" r="3.5" fill="#F02030" />
      </svg>
    </div>
  );
};

export const AtmosphericRedGlow: React.FC<{
  className?: string;
  intensity?: 'subtle' | 'medium' | 'intense';
}> = ({ className = '', intensity = 'medium' }) => {
  const opacityMap = {
    subtle: 'opacity-15',
    medium: 'opacity-25',
    intense: 'opacity-40',
  }[intensity];

  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-[100px] bg-[#F02030] ${opacityMap} ${className}`}
      aria-hidden="true"
    />
  );
};

export const SpiderDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="h-0.5 w-16 bg-[#F02030]" />
    <div className="h-0.5 w-6 bg-white/20" />
    <div className="h-0.5 w-2 bg-[#F02030]" />
  </div>
);

export const SpiderBadge: React.FC<{
  children: React.ReactNode;
  variant?: 'red' | 'dark' | 'outline';
  className?: string;
}> = ({ children, variant = 'dark', className = '' }) => {
  const styles = {
    red: 'bg-[#F02030] text-white font-bold',
    dark: 'bg-[#161616] border border-[#2a2a2a] text-neutral-300 font-medium',
    outline: 'border border-[#F02030]/60 text-[#F02030] bg-[#F02030]/5 font-semibold',
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-xs tracking-wider uppercase rounded-md ${styles} ${className}`}
    >
      {children}
    </span>
  );
};

// Backwards compatibility aliases for existing imports if any
export const ComicTag = SpiderBadge;
export const RedAccentSlash = SpiderDivider;
export const ComicHalftonePattern: React.FC = () => null;

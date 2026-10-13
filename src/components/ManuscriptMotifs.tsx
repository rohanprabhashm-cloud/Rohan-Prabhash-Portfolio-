import React from 'react';

/**
 * Traditional Indian Manuscript Corner Ornament (Antique Gold / Manuscript Ink)
 */
export const ManuscriptCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}> = ({ position, className = '', size = 28 }) => {
  const rotationClass = {
    'top-left': '',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }[position];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none transition-transform duration-300 ${rotationClass} ${className}`}
      aria-hidden="true"
    >
      {/* Outer corner L bracket */}
      <path
        d="M2 30V4C2 2.89543 2.89543 2 4 2H30"
        stroke="#B58A43"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Inner fine accent bracket */}
      <path
        d="M6 26V7C6 6.44772 6.44772 6 7 6H26"
        stroke="#8C3828"
        strokeWidth="0.8"
        strokeDasharray="2 2"
      />
      {/* Corner circular kolam dot / stud */}
      <circle cx="10" cy="10" r="2.5" fill="#B58A43" />
      <circle cx="10" cy="10" r="1" fill="#38251B" />
      {/* Delicate floral petal flourish */}
      <path
        d="M10 13C12 17 17 19 23 18"
        stroke="#B58A43"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M13 10C17 12 19 17 18 23"
        stroke="#B58A43"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Traditional Kolam / Muggu Symmetrical Center Divider
 */
export const KolamDivider: React.FC<{
  className?: string;
  centerSymbol?: 'om' | 'lotus' | 'sun' | 'knot';
}> = ({ className = '', centerSymbol = 'lotus' }) => {
  return (
    <div className={`flex items-center justify-center gap-3 my-8 opacity-90 ${className}`} aria-hidden="true">
      {/* Left ornamental thread */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#B58A43] to-[#8C3828]" />
      
      {/* Center Traditional Motif */}
      <div className="relative flex items-center justify-center px-2">
        <svg width="48" height="24" viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Kolam loops */}
          <path
            d="M8 16C16 8 24 24 32 16C40 8 48 24 56 16"
            stroke="#B58A43"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M8 16C16 24 24 8 32 16C40 24 48 8 56 16"
            stroke="#8C3828"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          {/* Grid dots */}
          <circle cx="16" cy="16" r="1.5" fill="#38251B" />
          <circle cx="32" cy="16" r="2.2" fill="#8C3828" />
          <circle cx="48" cy="16" r="1.5" fill="#38251B" />
          <circle cx="32" cy="16" r="1" fill="#F3E7CC" />
        </svg>
      </div>

      {/* Right ornamental thread */}
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#B58A43] to-[#8C3828]" />
    </div>
  );
};

/**
 * Chapter Heading Component:
 * Stylized ancient manuscript chapter banner with Roman numeral, Sanskrit invocation,
 * classical serif title, and kolam flourish.
 */
export const ChapterHeading: React.FC<{
  chapterNumber: string;
  sanskritTitle?: string;
  title: string;
  subtitle?: string;
  className?: string;
}> = ({ chapterNumber, sanskritTitle, title, subtitle, className = '' }) => {
  return (
    <div className={`text-center max-w-3xl mx-auto mb-12 relative ${className}`}>
      {/* Chapter Numeral and Traditional Seal */}
      <div className="inline-flex items-center gap-2 mb-2">
        <span className="h-[1px] w-8 bg-[#B58A43]" />
        <span className="font-cinzel text-xs tracking-[0.25em] uppercase text-[#8C3828] font-semibold bg-[#8C3828]/10 px-3 py-0.5 rounded-sm border border-[#8C3828]/30">
          {chapterNumber}
        </span>
        {sanskritTitle && (
          <span className="font-serif italic text-sm text-[#B58A43] tracking-wider px-1">
            • {sanskritTitle}
          </span>
        )}
        <span className="h-[1px] w-8 bg-[#B58A43]" />
      </div>

      {/* Main Chapter Title */}
      <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-[#211810] dark:text-[#E2CDA5] mt-2 mb-3">
        {title}
      </h2>

      {/* Chapter Subtitle */}
      {subtitle && (
        <p className="font-serif text-base sm:text-lg text-[#5A3E2B] dark:text-[#C7A878] italic max-w-2xl mx-auto leading-relaxed">
          "{subtitle}"
        </p>
      )}

      {/* Ornamental Kolam Underline */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <div className="w-12 h-[1px] bg-[#B58A43]/50" />
        <div className="w-1.5 h-1.5 rotate-45 bg-[#8C3828]" />
        <div className="w-2.5 h-2.5 rotate-45 border border-[#B58A43] bg-[#E2CDA5]" />
        <div className="w-1.5 h-1.5 rotate-45 bg-[#8C3828]" />
        <div className="w-12 h-[1px] bg-[#B58A43]/50" />
      </div>
    </div>
  );
};

/**
 * Traditional Vermilion & Gold Sanskrit Seal
 */
export const ManuscriptSeal: React.FC<{
  text?: string;
  size?: number;
  className?: string;
}> = ({ text = 'ॐ', size = 44, className = '' }) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center rounded-full bg-[#8C3828] border-2 border-[#B58A43] shadow-md ${className}`}
      title="Sacred Seal"
    >
      <div className="absolute inset-1 rounded-full border border-dashed border-[#F3E7CC]/60 pointer-events-none" />
      <span className="font-serif font-bold text-[#F3E7CC] text-lg select-none">
        {text}
      </span>
    </div>
  );
};

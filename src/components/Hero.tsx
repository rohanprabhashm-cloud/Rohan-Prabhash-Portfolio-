import React from 'react';
import { BookOpen, Scroll, Sparkles, Feather, ArrowDown, ExternalLink } from 'lucide-react';
import { ProfileData } from '../types/portfolio';
import { MugguHeroMandala } from './MugguHeroMandala';
import { ManuscriptCorner, KolamDivider } from './ManuscriptMotifs';

interface HeroProps {
  profile: ProfileData;
  onOpenEditModal: () => void;
  onOpenResumeModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenEditModal, onOpenResumeModal }) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Ancient Manuscript Book Cover Frame */}
      <div className="w-full max-w-6xl mx-auto relative z-10">
        
        {/* Book Cover Enclosure: Heavy Aged Leather & Parchment Folio */}
        <div className="relative rounded-lg p-6 sm:p-10 md:p-14 parchment-sheet-dark border-2 border-[#B58A43]/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),inset_0_0_80px_rgba(33,24,16,0.95)]">
          
          {/* Traditional Ornamental Corners */}
          <ManuscriptCorner position="top-left" className="absolute top-3 left-3" size={36} />
          <ManuscriptCorner position="top-right" className="absolute top-3 right-3" size={36} />
          <ManuscriptCorner position="bottom-left" className="absolute bottom-3 left-3" size={36} />
          <ManuscriptCorner position="bottom-right" className="absolute bottom-3 right-3" size={36} />

          {/* Inner Dashed Gold Border */}
          <div className="absolute inset-4 sm:inset-6 rounded border border-dashed border-[#B58A43]/40 pointer-events-none" />

          {/* Top Traditional Invocation Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-6 border-b border-[#B58A43]/30 text-xs text-[#C7A878]">
            <div className="flex items-center gap-2">
              <span className="font-serif italic text-sm text-[#E2CDA5]">
                ॥ विद्या ददाति विनयं ॥
              </span>
              <span className="text-[#B58A43]/60 hidden sm:inline">•</span>
              <span className="font-cinzel tracking-widest uppercase text-[11px] text-[#B58A43]">
                Purana Folio of Digital Craft
              </span>
            </div>

            {/* Scribe Status / Availability */}
            <div className="flex items-center gap-3">
              <span className="ink-stamp-gold text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B58A43] animate-pulse" />
                {profile.availability || 'Available for Apprenticeships & Collaborative Works'}
              </span>
              <button
                onClick={onOpenEditModal}
                className="font-cinzel text-[11px] text-[#C7A878] hover:text-[#F3E7CC] underline underline-offset-4 cursor-pointer transition-colors"
                title="Edit folio details"
              >
                [Edit]
              </button>
            </div>
          </div>

          {/* Main Cover Content: Grid Layout with Typographic Title & Animated Muggu Mandala */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mt-6">
            
            {/* Left Folio: Name, Heading, Subtitle & Ancient Manuscript Description */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Author Identification */}
              <div className="space-y-1">
                <div className="font-cinzel tracking-[0.3em] uppercase text-xs text-[#B58A43] font-semibold flex items-center justify-center lg:justify-start gap-2">
                  <span className="w-6 h-[1px] bg-[#B58A43]" />
                  <span>The Living Manuscript of</span>
                  <span className="w-6 h-[1px] bg-[#B58A43] lg:hidden" />
                </div>
                
                <h1 className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#F3E7CC] tracking-tight leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  ROHAN PRABHASH
                </h1>
              </div>

              {/* Main Heading as requested */}
              <div className="font-cinzel text-xl sm:text-2xl md:text-3xl font-semibold text-[#E2CDA5] tracking-wide leading-snug">
                "An Explorer of Ideas. A Builder of Possibilities."
              </div>

              {/* Subtitle as requested */}
              <p className="font-serif text-lg sm:text-xl text-[#C7A878] italic leading-relaxed max-w-xl mx-auto lg:mx-0">
                Where ancient inspiration meets artificial intelligence, software, and imagination.
              </p>

              {/* Classical Palm-Leaf Introduction Excerpt */}
              <div className="parchment-sheet p-4 rounded text-left border border-[#B58A43]/50 text-sm sm:text-base text-[#38251B] leading-relaxed shadow-inner">
                <span className="manuscript-dropcap">A</span>
                s an undergraduate in Computer Science with specialization in Artificial Intelligence and Machine Learning, this living manuscript records the systems I have engineered, the knowledge I have synthesized, and the memories gathered across hackathons and journeys.
              </div>

              {/* Cover Call-To-Action Scroll Controls */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#chapter-person"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 border border-[#B58A43] shadow-[0_4px_16px_rgba(140,56,40,0.4)] hover:shadow-[0_6px_22px_rgba(140,56,40,0.6)] cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#E2CDA5]" />
                  <span>Open the Manuscript</span>
                  <ArrowDown className="w-3.5 h-3.5 text-[#E2CDA5] animate-bounce" />
                </a>

                {onOpenResumeModal && (
                  <button
                    onClick={onOpenResumeModal}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded bg-[#24170E] hover:bg-[#322013] text-[#E2CDA5] hover:text-[#F3E7CC] font-cinzel text-xs sm:text-sm tracking-wider transition-all duration-200 border border-[#B58A43]/60 cursor-pointer"
                  >
                    <Scroll className="w-4 h-4 text-[#B58A43]" />
                    <span>View Archival Folio (Résumé)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Folio: Symmetrical Traditional South Indian Muggu / Kolam Mandala */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              
              {/* Sacred Inscribed Frame for the Muggu */}
              <div className="relative p-2 rounded-full border border-[#B58A43]/30 bg-[#160e08]/60 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
                {/* Traditional Muggu Line-Drawing Animation Component */}
                <MugguHeroMandala />
              </div>

              <p className="mt-3 text-center font-serif italic text-xs text-[#C7A878]/90 max-w-xs">
                Sacred South Indian Muggu pattern progressively woven with dots, interlaced loops, lotus petals, and the pranava ॐ.
              </p>
            </div>
          </div>

          {/* Bottom Manuscript Chapter Navigation Bar */}
          <div className="mt-10 pt-6 border-t border-[#B58A43]/30 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-cinzel text-[#C7A878]">
            <span className="text-[#8C3828] font-bold">CHAPTERS:</span>
            <a href="#chapter-person" className="hover:text-[#F3E7CC] transition-colors">I. The Person</a>
            <span>•</span>
            <a href="#chapter-journey" className="hover:text-[#F3E7CC] transition-colors">II. The Journey</a>
            <span>•</span>
            <a href="#chapter-creations" className="hover:text-[#F3E7CC] transition-colors">III. The Creations</a>
            <span>•</span>
            <a href="#chapter-artifacts" className="hover:text-[#F3E7CC] transition-colors">IV. The Artifacts</a>
            <span>•</span>
            <a href="#chapter-knowledge" className="hover:text-[#F3E7CC] transition-colors">V. The Knowledge</a>
            <span>•</span>
            <a href="#chapter-milestones" className="hover:text-[#F3E7CC] transition-colors">VI. The Milestones</a>
            <span>•</span>
            <a href="#chapter-connection" className="hover:text-[#F3E7CC] transition-colors">VII. The Connection</a>
          </div>

        </div>
      </div>
    </section>
  );
};

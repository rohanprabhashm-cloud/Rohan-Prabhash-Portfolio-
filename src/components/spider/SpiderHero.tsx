import React, { useState } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles, Terminal, Zap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { SpiderWebCorner, AtmosphericRedGlow, SpiderDivider } from './SpiderGraphics';
import { SpiderHeroPortrait } from './SpiderHeroPortrait';
import { SpiderResumeModal } from './SpiderResumeModal';

interface SpiderHeroProps {
  onExploreProjects: () => void;
  onContactClick?: () => void;
}

export const SpiderHero: React.FC<SpiderHeroProps> = ({ onExploreProjects }) => {
  const { profile } = PORTFOLIO_DATA;
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <>
      <section
        id="home"
        className="relative min-h-[94vh] flex items-center justify-center pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-[#080808] text-white overflow-hidden border-b border-[#1c1c1c]"
      >
        {/* Subtle Fine Spider-Web Corner Backdrops */}
        <SpiderWebCorner position="top-left" size={200} className="absolute top-0 left-0 text-white/20 z-0" />
        <SpiderWebCorner position="top-right" size={200} className="absolute top-0 right-0 text-[#F02030]/25 z-0" />
        <SpiderWebCorner position="bottom-left" size={170} className="absolute bottom-0 left-0 text-[#F02030]/15 z-0" />
        <SpiderWebCorner position="bottom-right" size={180} className="absolute bottom-0 right-0 text-white/15 z-0" />

        {/* Cinematic Atmospheric Red Illumination Glows */}
        <AtmosphericRedGlow intensity="medium" className="top-1/4 right-1/4 w-[500px] h-[500px]" />
        <AtmosphericRedGlow intensity="subtle" className="bottom-1/3 left-10 w-[400px] h-[400px]" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          
          {/* Asymmetrical 2-Column Hero Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Bold Cinematic Typography & Narrative */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Availability Status Badge */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#141414] border border-[#262626] text-xs font-semibold text-neutral-300 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#F02030] shadow-[0_0_8px_#F02030] animate-pulse" />
                <span>{profile.availability}</span>
                <span className="text-neutral-600">·</span>
                <span className="text-[#F02030] font-mono text-[11px]">EARTH-2028</span>
              </div>

              {/* Small Uppercase Introductory Label strictly matching prompt:
                  "CREATIVE DEVELOPER / AI & ML" */}
              <p className="text-xs sm:text-sm font-bold tracking-widest text-[#F02030] uppercase mb-3 flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 bg-[#F02030] rounded-full shadow-[0_0_6px_#F02030]" />
                CREATIVE DEVELOPER / AI & ML
              </p>

              {/* Main Heading:
                  ROHAN
                  PRABHASH.
                  Large, bold, high-contrast white & vivid red typography */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.92] mb-5">
                ROHAN<br />
                <span className="text-[#F02030] drop-shadow-[0_0_35px_rgba(240,32,48,0.4)]">
                  PRABHASH.
                </span>
              </h1>

              {/* Elegant divider */}
              <SpiderDivider className="mb-6" />

              {/* Subtitle strictly matching prompt:
                  AI/ML STUDENT · DEVELOPER · BUILDER */}
              <p className="text-sm sm:text-lg font-bold tracking-wider text-neutral-300 uppercase mb-4">
                AI/ML STUDENT · DEVELOPER · BUILDER
              </p>

              {/* Short Introduction */}
              <p className="text-base sm:text-lg text-[#A0A0A0] max-w-xl font-normal leading-relaxed mb-8">
                I turn ideas into intelligent products through code, creativity, and experimentation. Specializing in autonomous AI systems, dynamic route optimization, and full-stack applications.
              </p>

              {/* Call-To-Action Buttons:
                  - EXPLORE PROJECTS (vivid red)
                  - DOWNLOAD RESUME (cinematic dark charcoal) */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                {/* 1. Red EXPLORE PROJECTS button */}
                <button
                  onClick={onExploreProjects}
                  className="px-6 py-3.5 bg-[#F02030] hover:bg-[#d01827] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_25px_rgba(240,32,48,0.35)] hover:shadow-[0_0_35px_rgba(240,32,48,0.5)] cursor-pointer flex items-center gap-2 group"
                >
                  <span>EXPLORE PROJECTS</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                {/* 2. Dark DOWNLOAD RESUME button */}
                <button
                  onClick={() => setIsResumeModalOpen(true)}
                  className="px-6 py-3.5 bg-[#141414] hover:bg-[#1c1c1c] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl border border-[#2a2a2a] hover:border-[#F02030]/60 transition-all cursor-pointer flex items-center gap-2.5 group"
                >
                  <Download className="w-4 h-4 text-[#F02030] transition-transform group-hover:-translate-y-0.5" />
                  <span>DOWNLOAD RESUME</span>
                </button>
              </div>

              {/* Minimal Social Dispatch Links */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mr-2">
                  DISPATCH CHANNELS
                </span>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#F02030] hover:text-[#F02030] flex items-center justify-center text-neutral-300 transition-all shadow-sm"
                  aria-label="GitHub Profile"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#F02030] hover:text-[#F02030] flex items-center justify-center text-neutral-300 transition-all shadow-sm"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="w-10 h-10 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#F02030] hover:text-[#F02030] flex items-center justify-center text-neutral-300 transition-all shadow-sm"
                  aria-label="Email"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

            </div>

            {/* Right Column: High-Quality Superhero Portrait */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <SpiderHeroPortrait onExploreProjects={onExploreProjects} />
            </div>

          </div>

        </div>
      </section>

      {/* Spider-Verse Dossier / Resume Modal */}
      <SpiderResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </>
  );
};

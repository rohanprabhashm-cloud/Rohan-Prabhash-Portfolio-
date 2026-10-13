import React from 'react';
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Code2, Bot, ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

interface HeroProps {
  onExploreProjects: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProjects, onContactClick }) => {
  const { profile } = PORTFOLIO_DATA;

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto w-full text-center flex flex-col items-center">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800 dark:bg-neutral-900/90 dark:text-neutral-300 border border-black/5 dark:border-white/10 mb-8 transition-transform hover:scale-[1.02]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{profile.availability}</span>
        </div>

        {/* Profile Avatar Frame (Replaceable Placeholder) */}
        <div className="relative mb-8 group">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 bg-gradient-to-b from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-900 shadow-xl border border-black/5 dark:border-white/10 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full rounded-[22px] bg-neutral-100 dark:bg-neutral-950 flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-[1.03] transition-transform duration-300">
              {/* Minimal Apple Profile Silhouette SVG */}
              <svg className="w-16 h-16 text-neutral-400 dark:text-neutral-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              <span className="absolute bottom-1 text-[9px] font-mono text-neutral-500 dark:text-neutral-500">
                RP
              </span>
            </div>
          </div>
        </div>

        {/* Typographic Kicker */}
        <p className="text-sm sm:text-base font-medium text-[#0071e3] dark:text-[#2997ff] tracking-tight mb-2">
          {profile.kicker}
        </p>

        {/* Main Name Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
          {profile.name}
        </h1>

        {/* Subtitle / Focus */}
        <p className="text-lg sm:text-xl font-medium text-neutral-700 dark:text-neutral-300 tracking-tight max-w-2xl mb-5">
          {profile.headline}
        </p>

        {/* Short Introduction */}
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mb-10 leading-relaxed font-normal">
          {profile.shortBio}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          <button
            onClick={onExploreProjects}
            className="px-6 py-3 rounded-full text-sm font-semibold bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2 group whitespace-nowrap"
          >
            <span>Explore My Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>

          <button
            onClick={onContactClick}
            className="px-6 py-3 rounded-full text-sm font-semibold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white border border-black/8 dark:border-white/10 transition-colors duration-200 cursor-pointer whitespace-nowrap"
          >
            Contact Me
          </button>
        </div>

        {/* Social / Direct Channels */}
        <div className="flex items-center gap-5 text-neutral-500 dark:text-neutral-400">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white transition-colors"
            aria-label="GitHub Profile"
            title="GitHub Profile"
          >
            <Github className="w-5 h-5" />
          </a>

          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white transition-colors"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="p-2.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white transition-colors"
            aria-label="Send Email"
            title="Send Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={onExploreProjects}
          className="mt-14 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors cursor-pointer"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>

      </div>
    </section>
  );
};

import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const SpiderFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { profile } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[#060606] text-white border-t border-[#181818]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand Wordmark */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-[#F02030] text-white font-black text-xs flex items-center justify-center">
              RP
            </span>
            <span className="text-sm font-bold tracking-wider uppercase text-white">
              {profile.name}
            </span>
          </div>

          <span className="hidden sm:inline text-neutral-700">/</span>
          <span className="text-xs text-neutral-400 font-medium uppercase tracking-wider">
            EARTH-2028 DEVELOPER PORTFOLIO
          </span>
          <span className="hidden sm:inline text-neutral-700">/</span>
          <span className="text-xs text-neutral-500 font-mono">
            © {currentYear} ALL RIGHTS RESERVED
          </span>
        </div>

        {/* Social Links & Back To Top */}
        <div className="flex items-center gap-3">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-[#121212] border border-[#222222] hover:border-[#F02030] hover:text-[#F02030] text-neutral-400 flex items-center justify-center transition-all"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-xl bg-[#121212] border border-[#222222] hover:border-[#F02030] hover:text-[#F02030] text-neutral-400 flex items-center justify-center transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="w-9 h-9 rounded-xl bg-[#121212] border border-[#222222] hover:border-[#F02030] hover:text-[#F02030] text-neutral-400 flex items-center justify-center transition-all"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#181818] hover:bg-[#F02030] text-neutral-300 hover:text-white text-xs font-semibold uppercase tracking-wider border border-[#282828] hover:border-[#F02030] transition-all cursor-pointer ml-2"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

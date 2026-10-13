import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { profile } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-black/5 dark:border-white/5 bg-neutral-50/50 dark:bg-black/50 text-xs text-neutral-500 dark:text-neutral-400">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand & Message */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-semibold text-neutral-900 dark:text-white">
            {profile.name}
          </span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span>Designed and built with care.</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span>© {currentYear}</span>
        </div>

        {/* Right: Social Links & Back to Top */}
        <div className="flex items-center gap-4">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-1.5 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer ml-2"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

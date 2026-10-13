import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Scroll } from 'lucide-react';
import { ProfileData } from '../types/portfolio';
import { KolamDivider, ManuscriptSeal } from './ManuscriptMotifs';

interface FooterProps {
  profile: ProfileData;
  onOpenResumeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ profile, onOpenResumeModal }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#B58A43]/50 bg-[#140C07] py-14 text-[#C7A878] text-xs font-serif relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          
          {/* Brand & Manuscript Colophon */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#8C3828] border border-[#B58A43] flex items-center justify-center text-[#F3E7CC] font-serif font-bold text-sm">
                ॐ
              </div>
              <span className="font-cinzel font-bold text-[#F3E7CC] tracking-wider text-base">
                {profile.name}
              </span>
            </div>
            
            <p className="text-sm text-[#C7A878] italic leading-relaxed max-w-sm">
              An Ancient Book of Knowledge, Reimagined as a Living Digital Portfolio. Where traditional Indian art and philosophical reverence meet artificial intelligence, algorithmic optimization, and modern software craftsmanship.
            </p>

            <div className="font-serif italic text-xs text-[#E2CDA5]">
              ॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥
            </div>
          </div>

          {/* Chapters Navigation */}
          <div className="md:col-span-4 space-y-2">
            <div className="font-cinzel text-xs uppercase tracking-widest text-[#B58A43] font-bold">
              The Seven Chapters
            </div>
            <ul className="space-y-1 font-cinzel text-xs text-[#E2CDA5]">
              <li>
                <a href="#chapter-person" className="hover:text-[#F3E7CC] transition-colors">
                  Chapter I — The Person
                </a>
              </li>
              <li>
                <a href="#chapter-journey" className="hover:text-[#F3E7CC] transition-colors">
                  Chapter II — The Journey
                </a>
              </li>
              <li>
                <a href="#chapter-creations" className="hover:text-[#F3E7CC] transition-colors">
                  Chapter III — The Creations
                </a>
              </li>
              <li>
                <a href="#chapter-artifacts" className="hover:text-[#F3E7CC] transition-colors">
                  Chapter IV — The Artifacts
                </a>
              </li>
              <li>
                <a href="#chapter-knowledge" className="hover:text-[#F3E7CC] transition-colors">
                  Chapter V — The Knowledge
                </a>
              </li>
              <li>
                <a href="#chapter-milestones" className="hover:text-[#F3E7CC] transition-colors">
                  Chapter VI — The Milestones
                </a>
              </li>
              <li>
                <a href="#chapter-connection" className="hover:text-[#F3E7CC] transition-colors">
                  Chapter VII — The Connection
                </a>
              </li>
            </ul>
          </div>

          {/* Social Coordinates & Scroll To Top */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-cinzel text-xs uppercase tracking-widest text-[#B58A43] font-bold">
              External Scrolls
            </div>

            <div className="flex flex-col gap-2 font-cinzel text-xs text-[#E2CDA5]">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#F3E7CC] flex items-center gap-2"
              >
                <Github className="w-3.5 h-3.5 text-[#8C3828]" />
                <span>GitHub Repositories</span>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#F3E7CC] flex items-center gap-2"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#8C3828]" />
                <span>LinkedIn Network</span>
              </a>

              <button
                onClick={onOpenResumeModal}
                className="text-left hover:text-[#F3E7CC] flex items-center gap-2 cursor-pointer"
              >
                <Scroll className="w-3.5 h-3.5 text-[#B58A43]" />
                <span>Archival Résumé Folio</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#24170E] hover:bg-[#342114] text-[#E2CDA5] hover:text-[#F3E7CC] border border-[#B58A43]/50 font-cinzel text-xs transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#B58A43]" />
                <span>Return to Folio Cover</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-6 border-t border-[#B58A43]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#A68864]">
          <div>
            © {currentYear} {profile.name}. Inscribed as a Living Digital Purana.
          </div>
          <div className="font-serif italic">
            Crafted with South Indian Muggu geometry & Vedic bookbinding aesthetics.
          </div>
        </div>

      </div>
    </footer>
  );
};

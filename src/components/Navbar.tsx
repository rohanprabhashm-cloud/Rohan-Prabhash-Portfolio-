import React, { useState, useEffect } from 'react';
import { Menu, X, Scroll, Feather, Database, Lock, Unlock, Sparkles } from 'lucide-react';
import { ProfileData } from '../types/portfolio';

interface NavbarProps {
  profile: ProfileData;
  onOpenEditModal: () => void;
  onOpenResumeModal: () => void;
  onOpenArchiveModal: () => void;
  onOpenAdminAuth: () => void;
  isAdmin: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenEditModal,
  onOpenResumeModal,
  onOpenArchiveModal,
  onOpenAdminAuth,
  isAdmin,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const chapterLinks = [
    { num: 'I', label: 'The Person', href: '#chapter-person' },
    { num: 'II', label: 'The Journey', href: '#chapter-journey' },
    { num: 'III', label: 'Creations', href: '#chapter-creations' },
    { num: 'IV', label: 'Chronicles', href: '#chapter-chronicles' },
    { num: 'V', label: 'Knowledge', href: '#chapter-knowledge' },
    { num: 'VI', label: 'Artifacts', href: '#chapter-artifacts' },
    { num: 'VII', label: 'Credentials', href: '#chapter-milestones' },
    { num: 'VIII', label: 'Connection', href: '#chapter-connection' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#180f08]/95 backdrop-blur-md border-b border-[#B58A43]/50 shadow-[0_8px_24px_rgba(0,0,0,0.8)] py-2.5'
          : 'bg-[#160e08]/75 backdrop-blur-sm border-b border-[#B58A43]/20 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          
          {/* Brand Seal / Ancient Manuscript Monogram */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-2.5 group whitespace-nowrap shrink-0"
            aria-label="Rohan Prabhash - Purana Folio"
          >
            <div className="w-8 h-8 rounded-full bg-[#8C3828] border border-[#B58A43] flex items-center justify-center shadow-md">
              <span className="font-serif font-bold text-[#F3E7CC] text-sm">ॐ</span>
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-sm sm:text-base font-bold text-[#F3E7CC] tracking-wider group-hover:text-[#B58A43] transition-colors">
                {profile.name || 'ROHAN PRABHASH'}
              </span>
              <span className="font-serif text-[10px] text-[#C7A878] italic hidden sm:inline -mt-0.5">
                Living Digital Purana
              </span>
            </div>
          </a>

          {/* Desktop Manuscript Chapters Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {chapterLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="px-2 py-1 rounded text-[11px] font-cinzel text-[#E2CDA5] hover:text-[#F3E7CC] hover:bg-[#8C3828]/20 border border-transparent hover:border-[#B58A43]/40 transition-all cursor-pointer whitespace-nowrap"
              >
                <span className="text-[#8C3828] font-bold mr-1">{item.num}.</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Scribe Ledger, Archive & Security Actions */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Scribe Sanctum Toggle (Admin Mode Indicator) */}
            <button
              onClick={onOpenAdminAuth}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-cinzel tracking-wider border transition-all cursor-pointer ${
                isAdmin
                  ? 'bg-[#8C3828] border-[#B58A43] text-[#F3E7CC] shadow-[0_0_12px_rgba(181,138,67,0.4)] font-bold'
                  : 'bg-[#24170E] hover:bg-[#342114] text-[#C7A878] hover:text-[#F3E7CC] border-[#B58A43]/40'
              }`}
              title={isAdmin ? 'Scribe Mode Active (Click to Lock)' : 'Unlock Scribe Mode with Passkey'}
            >
              {isAdmin ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-[#E2CDA5]" />
                  <span>Scribe Active</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-[#B58A43]" />
                  <span>Scribe Key</span>
                </>
              )}
            </button>

            {/* Archive Manager (JSON Export / Import) */}
            <button
              onClick={onOpenArchiveModal}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#24170E] hover:bg-[#342114] text-[#E2CDA5] hover:text-[#F3E7CC] border border-[#B58A43]/40 text-xs font-cinzel tracking-wider transition-colors cursor-pointer"
              title="Archive Management & JSON Export/Import"
            >
              <Database className="w-3.5 h-3.5 text-[#B58A43]" />
              <span className="hidden md:inline">Archive JSON</span>
            </button>

            {/* Résumé Modal Button */}
            <button
              onClick={onOpenResumeModal}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#24170E] hover:bg-[#342114] text-[#E2CDA5] hover:text-[#F3E7CC] border border-[#B58A43]/40 text-xs font-cinzel tracking-wider transition-colors cursor-pointer"
              title="View Archival Résumé"
            >
              <Scroll className="w-3.5 h-3.5 text-[#B58A43]" />
              <span>Résumé</span>
            </button>

            {/* Profile Edit Button */}
            {isAdmin && (
              <button
                onClick={onOpenEditModal}
                className="inline-flex items-center gap-1 px-2 py-1.5 rounded text-[#C7A878] hover:text-[#F3E7CC] text-xs font-cinzel transition-colors cursor-pointer"
                title="Edit Profile"
              >
                <Feather className="w-3.5 h-3.5 text-[#8C3828]" />
                <span>Profile</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              onClick={onOpenAdminAuth}
              className={`p-1.5 rounded border text-xs ${
                isAdmin
                  ? 'bg-[#8C3828] border-[#B58A43] text-white'
                  : 'bg-[#24170E] border-[#B58A43]/40 text-[#B58A43]'
              }`}
              title="Scribe Key"
            >
              {isAdmin ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded bg-[#24170E] border border-[#B58A43]/40 text-[#E2CDA5] hover:text-[#F3E7CC]"
              aria-label="Toggle Manuscript Chapters Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#180f08]/98 border-b border-[#B58A43]/60 px-4 pt-3 pb-5 space-y-2.5">
          <div className="grid grid-cols-2 gap-1.5 pb-3 border-b border-[#B58A43]/30">
            {chapterLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="px-2.5 py-1.5 rounded text-xs font-cinzel text-[#E2CDA5] hover:text-[#F3E7CC] hover:bg-[#8C3828]/20 flex items-center gap-1.5"
              >
                <span className="text-[#8C3828] font-bold">{item.num}.</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 font-cinzel text-xs">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="px-3 py-1.5 rounded bg-[#24170E] border border-[#B58A43]/50 text-[#E2CDA5] flex items-center gap-1.5"
            >
              <Scroll className="w-3.5 h-3.5 text-[#B58A43]" />
              <span>Résumé</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenArchiveModal();
              }}
              className="px-3 py-1.5 rounded bg-[#24170E] border border-[#B58A43]/50 text-[#E2CDA5] flex items-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5 text-[#B58A43]" />
              <span>Archive JSON</span>
            </button>
            {isAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEditModal();
                }}
                className="px-3 py-1.5 rounded bg-[#24170E] border border-[#B58A43]/50 text-[#E2CDA5] flex items-center gap-1.5"
              >
                <Feather className="w-3.5 h-3.5 text-[#8C3828]" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

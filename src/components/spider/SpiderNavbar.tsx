import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Zap } from 'lucide-react';

export const SpiderNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'education', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home', id: 'home' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'SKILLS', href: '#skills', id: 'skills' },
    { label: 'PROJECTS', href: '#projects', id: 'projects' },
    { label: 'ACHIEVEMENTS', href: '#achievements', id: 'achievements' },
    { label: 'EDUCATION', href: '#education', id: 'education' },
    { label: 'CONTACT', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080808]/90 backdrop-blur-md border-b border-[#222222] py-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.8)]'
          : 'bg-[#080808]/60 backdrop-blur-sm border-b border-[#181818] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          
          {/* Logo / Wordmark: "RP. / DEVELOPER PORTFOLIO" */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group text-white select-none shrink-0"
            aria-label="Rohan Prabhash Portfolio"
          >
            <div className="w-9 h-9 rounded-lg bg-[#111111] border border-[#2a2a2a] group-hover:border-[#F02030] flex items-center justify-center transition-colors relative overflow-hidden">
              <span className="font-black text-sm tracking-tighter text-[#F02030] group-hover:text-white transition-colors">
                RP.
              </span>
              <div className="absolute inset-0 bg-[#F02030] opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase group-hover:text-neutral-200 transition-colors">
                ROHAN PRABHASH
              </span>
              <span className="text-[10px] font-semibold text-[#F02030] tracking-widest uppercase -mt-0.5">
                DEVELOPER PORTFOLIO
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links: Clean, modern, unboxed with active glowing underline */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold tracking-wider transition-colors uppercase whitespace-nowrap ${
                    isActive
                      ? 'text-[#F02030]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#F02030] rounded-full shadow-[0_0_8px_#F02030]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Let's Connect */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#F02030] hover:bg-[#d01827] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-[0_0_20px_rgba(240,32,48,0.35)] hover:shadow-[0_0_25px_rgba(240,32,48,0.5)] cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>LET'S CONNECT</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#111111] border border-[#2a2a2a] text-neutral-300 hover:text-white hover:border-[#F02030] transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#222222] bg-[#0d0d0d] px-4 py-6 shadow-2xl">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2.5 text-xs font-bold tracking-wider uppercase rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#181818] text-[#F02030] border-l-2 border-[#F02030]'
                      : 'text-neutral-400 hover:text-white hover:bg-[#141414]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-4 border-t border-[#1f1f1f] mt-2">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full text-center block px-4 py-2.5 bg-[#F02030] text-white text-xs font-bold uppercase tracking-wider rounded-lg"
              >
                LET'S CONNECT
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

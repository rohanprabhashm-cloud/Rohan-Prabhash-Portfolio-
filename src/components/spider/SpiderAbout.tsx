import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { SpiderWebCorner, SpiderDivider, AtmosphericRedGlow } from './SpiderGraphics';
import { Sparkles, Terminal, Award, Target, BookOpen, ShieldCheck } from 'lucide-react';

export const SpiderAbout: React.FC = () => {
  const { profile, aboutCards } = PORTFOLIO_DATA;

  const infoTags = [
    'AI & Machine Learning',
    'Full-Stack Development',
    'Hackathon Competitor',
    'Future AI Engineer',
  ];

  return (
    <section
      id="about"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0B0B0B] text-white border-b border-[#1c1c1c] overflow-hidden"
    >
      {/* Subtle Spider-Web Corner Graphics */}
      <SpiderWebCorner position="top-right" size={160} className="absolute top-0 right-0 text-white/15" />
      <SpiderWebCorner position="bottom-left" size={140} className="absolute bottom-0 left-0 text-[#F02030]/20" />

      {/* Atmospheric Glow */}
      <AtmosphericRedGlow intensity="subtle" className="top-1/3 left-1/4 w-[450px] h-[450px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading: "THE PERSON BEHIND THE CODE." */}
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#F02030] mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#F02030] rounded-full shadow-[0_0_6px_#F02030]" />
            DOSSIER // IDENTITY
          </p>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            THE PERSON BEHIND<br />
            <span className="text-[#F02030] drop-shadow-[0_0_25px_rgba(240,32,48,0.35)]">
              THE CODE.
            </span>
          </h2>

          <SpiderDivider className="mt-4" />
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Biography & Information Tags */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Lead Narrative Container */}
            <div className="p-7 sm:p-8 rounded-2xl bg-[#121212] border border-[#222222] mb-8 relative shadow-xl">
              <span className="absolute -top-3 left-6 bg-[#1A1A1A] border border-[#333333] text-[#F02030] px-3 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded-md">
                TRANSMISSION LOG
              </span>

              <p className="text-lg sm:text-xl font-semibold text-white leading-relaxed mb-4">
                "I'm a third-year B.Tech Computer Science student specializing in Artificial Intelligence and Machine Learning at Lendi Institute of Engineering and Technology. I enjoy creating software, experimenting with AI, participating in hackathons, and turning ambitious ideas into working products."
              </p>

              <p className="text-sm sm:text-base text-[#A0A0A0] font-normal leading-relaxed">
                Whether formulating multi-order route optimization heuristics, engineering agentic itinerary planners, or testing voice assistant architectures, my objective is always the same: develop rigorous, pragmatic tools that solve tangible problems with clarity and speed.
              </p>
            </div>

            {/* Information Tags */}
            <div className="w-full">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-3">
                CORE AFFILIATIONS & ATTRIBUTES
              </span>
              <div className="flex flex-wrap gap-2">
                {infoTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide bg-[#161616] border border-[#282828] text-neutral-200 hover:border-[#F02030]/60 hover:text-white transition-colors cursor-default"
                  >
                    <span className="w-1.5 h-1.5 bg-[#F02030] rounded-full mr-2" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sleek Emblem / Superhero Insignia */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            <div className="relative group">
              
              {/* Outer Crimson Glow Ring */}
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-[#2a2a2a] p-3 bg-[#111111] shadow-[0_0_50px_rgba(240,32,48,0.25)] flex items-center justify-center relative overflow-hidden transition-transform duration-500 group-hover:scale-105 group-hover:border-[#F02030]/60">
                
                {/* Circular Mask / Avatar Graphic */}
                <div className="w-full h-full rounded-full bg-[#0A0A0C] border border-[#222222] relative flex items-center justify-center overflow-hidden">
                  
                  {/* Subtle Web Overlay */}
                  <svg className="absolute inset-0 w-full h-full opacity-35 text-white/50" viewBox="0 0 100 100">
                    <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.8" />
                    <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.8" />
                    <line x1="15" y1="15" x2="85" y2="85" stroke="currentColor" strokeWidth="0.8" />
                    <line x1="85" y1="15" x2="15" y2="85" stroke="currentColor" strokeWidth="0.8" />
                    <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.8" fill="none" strokeDasharray="2 2" />
                    <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.8" fill="none" strokeDasharray="2 2" />
                  </svg>

                  {/* Stylized Developer Superhero Insignia */}
                  <svg className="w-36 h-36 drop-shadow-[0_0_20px_rgba(240,32,48,0.7)]" viewBox="0 0 100 100" fill="none">
                    <path
                      d="M 50 15 C 32 15 25 30 25 50 C 25 75 40 90 50 95 C 60 90 75 75 75 50 C 75 30 68 15 50 15 Z"
                      fill="#121216"
                      stroke="#F02030"
                      strokeWidth="2.5"
                    />
                    {/* Glowing Eye Lenses */}
                    <path d="M 35 45 C 38 42 44 44 47 51 C 45 55 38 54 35 45 Z" fill="#FFFFFF" stroke="#000" strokeWidth="1.5" />
                    <path d="M 65 45 C 62 42 56 44 53 51 C 55 55 62 54 65 45 Z" fill="#FFFFFF" stroke="#000" strokeWidth="1.5" />
                  </svg>

                  {/* Bottom Ribbon */}
                  <div className="absolute bottom-3 inset-x-0 text-center">
                    <span className="inline-block bg-[#F02030] text-white px-3 py-0.5 text-[9px] font-black uppercase tracking-widest rounded shadow-md">
                      ROHAN PRABHASH
                    </span>
                  </div>
                </div>

              </div>

              {/* Minimal Universe Badge */}
              <div className="absolute -bottom-2 -right-1 bg-[#161616] border border-[#2e2e2e] text-[#F02030] px-3 py-1 text-xs font-mono font-bold uppercase rounded-lg shadow-lg">
                EARTH-2028
              </div>

            </div>

          </div>

        </div>

        {/* 4 Themed Dossier Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {aboutCards.map((card) => (
            <div
              key={card.id}
              className="p-6 rounded-2xl bg-[#111111] border border-[#222222] hover:border-[#F02030]/60 transition-all duration-300 hover:shadow-[0_8px_30px_-6px_rgba(240,32,48,0.2)] hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-[#202020] pb-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F02030]">
                    {card.title}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-[#F02030] transition-colors" />
                </div>
                <h3 className="text-base font-bold text-white uppercase mb-1.5">
                  {card.subtitle}
                </h3>
                <p className="text-xs text-[#A0A0A0] font-normal leading-relaxed">
                  {card.description}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500 uppercase">METRIC</span>
                <span className="text-[#F02030] font-bold text-sm">{card.metric}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

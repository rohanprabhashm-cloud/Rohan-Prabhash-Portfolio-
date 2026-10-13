import React from 'react';
import { GraduationCap, Calendar, MapPin, BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { SpiderWebCorner, SpiderDivider, AtmosphericRedGlow } from './SpiderGraphics';

export const SpiderEducation: React.FC = () => {
  const { education } = PORTFOLIO_DATA;

  return (
    <section
      id="education"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0B0B0B] text-white border-b border-[#1c1c1c] overflow-hidden"
    >
      {/* Spider-Web Corner */}
      <SpiderWebCorner position="top-right" size={160} className="absolute top-0 right-0 text-white/15" />
      <SpiderWebCorner position="bottom-left" size={140} className="absolute bottom-0 left-0 text-[#F02030]/20" />

      {/* Atmospheric Glow */}
      <AtmosphericRedGlow intensity="subtle" className="top-1/3 left-1/4 w-[450px] h-[450px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#F02030] mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#F02030] rounded-full shadow-[0_0_6px_#F02030]" />
            ACADEMIC ACADEMY // FOUNDATION
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            EDUCATION & <span className="text-[#F02030] drop-shadow-[0_0_25px_rgba(240,32,48,0.35)]">ACADEMICS.</span>
          </h2>

          <SpiderDivider className="mt-4 mb-4" />

          <p className="text-sm sm:text-base text-[#A0A0A0] max-w-xl font-normal leading-relaxed">
            Rigorous algorithmic coursework, foundational mathematics, and specialized AI/ML systems research at Lendi Institute.
          </p>
        </div>

        {/* Large Dark Timeline Panel */}
        <div className="bg-[#111111] border border-[#222222] rounded-2xl p-8 sm:p-10 shadow-xl hover:border-[#F02030]/60 transition-all duration-300 relative">
          
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#202020] pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#F02030] uppercase tracking-wider mb-2">
                <GraduationCap className="w-4 h-4 text-[#F02030]" />
                <span>{education.currentYear}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-1">
                {education.degree}
              </h3>
              <p className="text-base font-semibold text-neutral-300">
                {education.institution}
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-2 text-xs uppercase">
              <span className="px-3 py-1 bg-[#181818] text-[#F02030] border border-[#2a2a2a] rounded-lg font-mono font-bold">
                EST. GRADUATION: {education.expectedGraduation}
              </span>
              <span className="flex items-center gap-1.5 text-neutral-400 font-medium mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#F02030]" />
                <span>{education.location}</span>
              </span>
            </div>
          </div>

          {/* Academic Focus Statement */}
          <p className="text-base text-neutral-200 font-medium leading-relaxed mb-8">
            {education.academicFocus}
          </p>

          {/* Key Coursework Badges */}
          <div>
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#F02030]" />
              <span>CORE SYLLABUS & DISCIPLINES</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <span
                  key={course}
                  className="px-3 py-1.5 bg-[#161616] text-neutral-300 border border-[#262626] rounded-lg text-xs font-medium tracking-wide hover:border-[#F02030]/60 hover:text-white transition-colors cursor-default"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

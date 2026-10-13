import React from 'react';
import { ArrowUpRight, Target, Zap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { SpiderWebCorner, SpiderDivider, AtmosphericRedGlow } from './SpiderGraphics';

export const SpiderCareerGoals: React.FC = () => {
  const { careerGoals } = PORTFOLIO_DATA;

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#080808] text-white border-b border-[#1c1c1c] overflow-hidden">
      {/* Spider-Web Corner */}
      <SpiderWebCorner position="top-left" size={150} className="absolute top-0 left-0 text-[#F02030]/20" />
      <SpiderWebCorner position="bottom-right" size={150} className="absolute bottom-0 right-0 text-white/15" />

      {/* Atmospheric Glow */}
      <AtmosphericRedGlow intensity="subtle" className="top-1/4 right-1/4 w-[500px] h-[500px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#F02030] mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#F02030] rounded-full shadow-[0_0_6px_#F02030]" />
            FUTURE TRAJECTORY // ROADMAP
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            WHAT'S <span className="text-[#F02030] drop-shadow-[0_0_25px_rgba(240,32,48,0.35)]">NEXT?</span>
          </h2>

          <SpiderDivider className="mt-4 mb-4" />

          <p className="text-sm sm:text-base text-[#A0A0A0] max-w-xl font-normal leading-relaxed">
            Strategic milestones guiding software engineering progression, real-world deployment, and advanced AI systems research.
          </p>
        </div>

        {/* 4 Themed Mission Roadmap Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {careerGoals.map((item, idx) => (
            <div
              key={item.id}
              className="bg-[#111111] border border-[#222222] rounded-2xl p-7 shadow-xl hover:border-[#F02030] hover:shadow-[0_8px_30px_-6px_rgba(240,32,48,0.25)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#202020] pb-3.5 mb-4">
                  <span className="text-xs font-mono font-bold text-[#F02030]">
                    OBJECTIVE // 0{idx + 1}
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase bg-[#181818] text-neutral-300 rounded border border-[#262626]">
                    {item.timeframe}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-neutral-100 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A0A0A0] font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-3.5 border-t border-[#1C1C1C] flex items-center justify-between text-xs font-mono uppercase">
                <span className="text-neutral-500">TACTICAL PRIORITY</span>
                <span className="flex items-center gap-1 text-[#F02030] font-bold group-hover:translate-x-1 transition-transform">
                  <span>ENGAGE</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

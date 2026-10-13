import React, { useState } from 'react';
import { Trophy, Calendar, User, ExternalLink, Award, FileText, CheckCircle2, X } from 'lucide-react';
import { AchievementItem, PORTFOLIO_DATA } from '../../data/portfolioData';
import { SpiderWebCorner, SpiderDivider, AtmosphericRedGlow } from './SpiderGraphics';

export const SpiderAchievements: React.FC = () => {
  const { achievements } = PORTFOLIO_DATA;
  const [selectedItem, setSelectedItem] = useState<AchievementItem | null>(null);

  return (
    <section
      id="achievements"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#080808] text-white border-b border-[#1c1c1c] overflow-hidden"
    >
      {/* Spider-Web Graphics */}
      <SpiderWebCorner position="top-left" size={160} className="absolute top-0 left-0 text-white/15" />
      <SpiderWebCorner position="bottom-right" size={160} className="absolute bottom-0 right-0 text-[#F02030]/20" />

      {/* Atmospheric Glow */}
      <AtmosphericRedGlow intensity="subtle" className="top-1/3 right-1/4 w-[480px] h-[480px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#F02030] mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#F02030] rounded-full shadow-[0_0_6px_#F02030]" />
            TRACK RECORD // BATTLES & HACKATHONS
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            ACHIEVEMENTS & <span className="text-[#F02030] drop-shadow-[0_0_25px_rgba(240,32,48,0.35)]">EXPEDITIONS.</span>
          </h2>

          <SpiderDivider className="mt-4 mb-4" />

          <p className="text-sm sm:text-base text-[#A0A0A0] max-w-xl font-normal leading-relaxed">
            Sprint hackathons, rapid prototyping challenges, and rigorous problem statement investigations.
          </p>
        </div>

        {/* 3 Themed Hackathon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="bg-[#111111] border border-[#222222] rounded-2xl p-7 shadow-xl hover:border-[#F02030] hover:shadow-[0_8px_30px_-6px_rgba(240,32,48,0.25)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Year & Status Header */}
                <div className="flex items-center justify-between border-b border-[#202020] pb-3.5 mb-5">
                  <span className="text-xs font-mono text-neutral-400">
                    CYCLE // {item.year}
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase bg-[#F02030]/20 text-[#F02030] rounded border border-[#F02030]/40">
                    {item.status}
                  </span>
                </div>

                {/* Event Name */}
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-1.5 group-hover:text-neutral-100 transition-colors">
                  {item.eventName}
                </h3>

                {/* Related Project */}
                <p className="text-xs font-bold text-[#F02030] uppercase tracking-wider mb-3">
                  PROJECT: {item.projectName}
                </p>

                {/* Role */}
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-400 uppercase mb-4">
                  <User className="w-3.5 h-3.5 text-neutral-500" />
                  <span>ROLE: {item.role}</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#A0A0A0] font-normal leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Technology Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[11px] font-medium uppercase bg-[#181818] border border-[#262626] text-neutral-300 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Detail Inspect Button */}
              <div className="pt-4 border-t border-[#1F1F1F]">
                <button
                  onClick={() => setSelectedItem(item)}
                  className="w-full py-2.5 bg-[#161616] hover:bg-[#F02030] text-neutral-300 hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl border border-[#282828] hover:border-[#F02030] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <Trophy className="w-3.5 h-3.5 text-[#F02030] group-hover:text-white" />
                  <span>VIEW DOSSIER NOTES</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Modal for detailed hackathon dossier notes */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedItem(null);
            }}
          >
            <div className="relative w-full max-w-lg bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-white">
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-5 right-5 p-1.5 rounded-lg bg-[#181818] text-neutral-400 hover:text-white hover:bg-[#252525] border border-[#262626] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#F02030]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F02030]">
                  EXPEDITION LOG // {selectedItem.year}
                </span>
              </div>

              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1">
                {selectedItem.eventName}
              </h3>

              <p className="text-xs font-bold text-[#F02030] uppercase mb-4">
                PROJECT SUBMISSION: {selectedItem.projectName}
              </p>

              <div className="p-4 rounded-xl bg-[#161616] border border-[#262626] mb-4">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                  OFFICIAL STATUS & RECORD
                </span>
                <p className="text-xs font-semibold text-neutral-200 leading-relaxed">
                  {selectedItem.resultDetails}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#A0A0A0] font-normal leading-relaxed mb-6">
                {selectedItem.description}
              </p>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-5 py-2.5 bg-[#F02030] hover:bg-[#d01827] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                >
                  DISMISS LOG
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

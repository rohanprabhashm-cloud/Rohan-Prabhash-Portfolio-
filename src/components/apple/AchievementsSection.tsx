import React, { useState } from 'react';
import { Trophy, Calendar, User, ExternalLink, Award, FileText, CheckCircle2, X } from 'lucide-react';
import { AchievementItem, PORTFOLIO_DATA } from '../../data/portfolioData';

export const AchievementsSection: React.FC = () => {
  const { achievements } = PORTFOLIO_DATA;
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);

  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-black/5 dark:border-white/5">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold text-[#0071e3] dark:text-[#2997ff] uppercase tracking-wider mb-2">
            Competitions & Expeditions
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3">
            Achievements & Hackathons
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
            Structured innovation sprints, problem statement investigations, and collegiate technical competitions.
          </p>
        </div>

        {/* Polished Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-black/8 dark:border-white/10 apple-card-glow flex flex-col justify-between"
            >
              <div>
                {/* Year & Status Header */}
                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-3 font-mono">
                  <span>{item.year}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium text-[11px]">
                    {item.status}
                  </span>
                </div>

                {/* Event Name */}
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
                  {item.eventName}
                </h3>

                {/* Project Name */}
                <p className="text-xs font-semibold text-[#0071e3] dark:text-[#2997ff] mb-2">
                  {item.projectName}
                </p>

                {/* Role */}
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                  <User className="w-3.5 h-3.5" />
                  <span>Role: {item.role}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
                <span className="text-[11px] text-neutral-400 truncate max-w-[140px]">
                  {item.resultDetails}
                </span>

                <button
                  onClick={() => setSelectedAchievement(item)}
                  className="font-medium text-[#0071e3] dark:text-[#2997ff] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Details</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Certificate / Details Modal */}
        {selectedAchievement && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 ios-modal-backdrop"
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedAchievement(null);
            }}
          >
            <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 p-6 shadow-2xl text-neutral-900 dark:text-white">
              <div className="flex items-center justify-between pb-4 border-b border-black/5 dark:border-white/10 mb-4">
                <div>
                  <span className="text-[11px] font-mono text-[#0071e3] dark:text-[#2997ff]">
                    {selectedAchievement.year} · {selectedAchievement.status}
                  </span>
                  <h3 className="text-lg font-bold">{selectedAchievement.eventName}</h3>
                </div>
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-semibold text-neutral-400 uppercase tracking-wider mb-1">Project</h4>
                  <p className="text-sm font-medium">{selectedAchievement.projectName}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-neutral-400 uppercase tracking-wider mb-1">Scope & Technical Summary</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{selectedAchievement.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-neutral-400 uppercase tracking-wider mb-1">Official Result Record</h4>
                  <p className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono">
                    {selectedAchievement.resultDetails}
                  </p>
                </div>

                {/* Certificate placeholder illustration */}
                <div className="p-4 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 flex flex-col items-center justify-center text-center text-neutral-400">
                  <Award className="w-8 h-8 text-[#0071e3] dark:text-[#2997ff] mb-2" />
                  <span className="font-medium text-neutral-600 dark:text-neutral-300">Participation Certificate Record</span>
                  <span className="text-[10px] mt-0.5">Physical/digital verification document slot</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

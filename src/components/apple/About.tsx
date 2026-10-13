import React from 'react';
import { GraduationCap, Sparkles, Trophy, Target, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const About: React.FC = () => {
  const { profile, aboutCards, personalGoals } = PORTFOLIO_DATA;

  const cardIcons = {
    edu: GraduationCap,
    interests: Sparkles,
    innovation: Trophy,
    career: Target,
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-black/5 dark:border-white/5">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold text-[#0071e3] dark:text-[#2997ff] uppercase tracking-wider mb-2">
            Overview
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
            About Me
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
            {profile.fullBio}
          </p>
        </div>

        {/* Compact Apple Information Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {aboutCards.map((card) => {
            const Icon = cardIcons[card.id as keyof typeof cardIcons] || Sparkles;
            return (
              <div
                key={card.id}
                className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/70 border border-black/5 dark:border-white/10 apple-card-glow flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-200/80 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white mb-4">
                    <Icon className="w-5 h-5 text-[#0071e3] dark:text-[#2997ff]" />
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-2">
                    {card.subtitle}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5">
                  <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                    {card.metric}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Personal Goals Section */}
        <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/40 border border-black/5 dark:border-white/10">
          <div className="mb-6">
            <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white mb-1">
              Personal Goals
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Key milestones driving my development journey and ongoing technical focus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {personalGoals.map((goal, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 leading-snug">
                  {goal}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

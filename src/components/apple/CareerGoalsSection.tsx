import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const CareerGoalsSection: React.FC = () => {
  const { careerGoals } = PORTFOLIO_DATA;

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-black/5 dark:border-white/5">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold text-[#0071e3] dark:text-[#2997ff] uppercase tracking-wider mb-2">
            Forward Path
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3">
            What's Next?
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
            Key priorities shaping my upcoming engineering milestones, career focus, and academic pursuits.
          </p>
        </div>

        {/* Minimal Apple Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {careerGoals.map((item, idx) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-black/5 dark:border-white/10 apple-card-glow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-3">
                  <span>0{idx + 1}</span>
                  <span className="text-[#0071e3] dark:text-[#2997ff]">{item.timeframe}</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-neutral-500">
                <span>Strategic Priority</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

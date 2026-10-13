import React from 'react';
import {
  Code,
  Cpu,
  Globe,
  Sparkles,
  Bot,
  Database,
  GitBranch,
  Zap,
  Cloud,
  Layers,
  Box,
  Search,
  Terminal,
  BookOpen,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const { skills, currentlyLearning } = PORTFOLIO_DATA;

  const iconMap: Record<string, React.ElementType> = {
    code: Code,
    cpu: Cpu,
    globe: Globe,
    sparkles: Sparkles,
    bot: Bot,
    database: Database,
    'git-branch': GitBranch,
    zap: Zap,
    cloud: Cloud,
    layers: Layers,
    box: Box,
    search: Search,
    terminal: Terminal,
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-black/5 dark:border-white/5">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold text-[#0071e3] dark:text-[#2997ff] uppercase tracking-wider mb-2">
            Technical Stack
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3">
            Skills & Competencies
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
            Clean, proven tools and frameworks applied in practical projects. No inflated progress bars or arbitrary scores.
          </p>
        </div>

        {/* Primary Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {skills.map((skill) => {
            const IconComponent = iconMap[skill.iconKey] || Code;
            return (
              <div
                key={skill.name}
                className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-black/5 dark:border-white/10 apple-card-glow flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-800 shadow-sm flex items-center justify-center shrink-0 text-[#0071e3] dark:text-[#2997ff]">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                      {skill.category}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dedicated "Currently Learning" Area */}
        <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/40 border border-black/5 dark:border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-[#0071e3] dark:text-[#2997ff]" />
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Currently Learning & Deepening
            </h3>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
            Active topics currently being explored through coursework, tutorials, and prototype projects.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentlyLearning.map((item) => {
              const IconComp = iconMap[item.iconKey] || Terminal;
              return (
                <div
                  key={item.name}
                  className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/5 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <IconComp className="w-4 h-4 text-[#0071e3] dark:text-[#2997ff]" />
                    <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">
                      {item.name}
                    </h4>
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal">
                    {item.focus}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

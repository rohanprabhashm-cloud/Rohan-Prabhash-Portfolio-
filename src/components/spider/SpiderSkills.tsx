import React from 'react';
import {
  Code,
  Terminal,
  Cpu,
  Layers,
  Globe,
  Database,
  GitBranch,
  Cloud,
  Box,
  Zap,
  Sparkles,
} from 'lucide-react';
import { SpiderWebCorner, SpiderDivider, AtmosphericRedGlow } from './SpiderGraphics';

interface SkillGroup {
  category: string;
  badge: string;
  skills: { name: string; tag: string; icon: React.ElementType }[];
}

export const SpiderSkills: React.FC = () => {
  const skillGroups: SkillGroup[] = [
    {
      category: 'PROGRAMMING',
      badge: 'SYNTAX & LOGIC',
      skills: [
        { name: 'Python', tag: 'CORE / ML', icon: Terminal },
        { name: 'C', tag: 'SYSTEMS / MEMORY', icon: Code },
      ],
    },
    {
      category: 'DEVELOPMENT',
      badge: 'FULL-STACK SUITE',
      skills: [
        { name: 'HTML5', tag: 'SEMANTIC WEB', icon: Globe },
        { name: 'CSS3 / Tailwind', tag: 'LAYOUT & STYLES', icon: Layers },
        { name: 'JavaScript', tag: 'CLIENT RUNTIME', icon: Code },
        { name: 'React', tag: 'REACTIVE UI', icon: Box },
        { name: 'FastAPI', tag: 'ASYNC BACKEND', icon: Zap },
      ],
    },
    {
      category: 'AI & DATA',
      badge: 'INTELLIGENCE CORE',
      skills: [
        { name: 'Artificial Intelligence', tag: 'HEURISTICS & AGENTS', icon: Cpu },
        { name: 'Machine Learning', tag: 'MODELS & PIPELINES', icon: Sparkles },
        { name: 'SQL', tag: 'RELATIONAL DATA', icon: Database },
      ],
    },
    {
      category: 'TOOLS & INFRASTRUCTURE',
      badge: 'DEPLOYMENT & VCS',
      skills: [
        { name: 'Git', tag: 'VERSION CONTROL', icon: GitBranch },
        { name: 'GitHub', tag: 'COLLABORATION', icon: GitBranch },
        { name: 'Cloud Infrastructure', tag: 'GCP / HOSTING', icon: Cloud },
        { name: 'DevOps Essentials', tag: 'CI/CD & RUNTIMES', icon: Terminal },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#080808] text-white border-b border-[#1c1c1c] overflow-hidden"
    >
      {/* Spider-Web Corner Graphics */}
      <SpiderWebCorner position="top-left" size={160} className="absolute top-0 left-0 text-[#F02030]/20" />
      <SpiderWebCorner position="bottom-right" size={160} className="absolute bottom-0 right-0 text-white/15" />

      {/* Atmospheric Glow */}
      <AtmosphericRedGlow intensity="subtle" className="top-1/4 right-1/4 w-[500px] h-[500px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading: "MY SUPERPOWERS." */}
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#F02030] mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#F02030] rounded-full shadow-[0_0_6px_#F02030]" />
            ARSENAL // TECH STACK
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            MY <span className="text-[#F02030] drop-shadow-[0_0_25px_rgba(240,32,48,0.35)]">SUPERPOWERS.</span>
          </h2>

          <SpiderDivider className="mt-4 mb-4" />

          <p className="text-sm sm:text-base text-[#A0A0A0] max-w-xl font-normal leading-relaxed">
            Clean, proven tools, algorithmic foundations, and modern frameworks applied in real builds without arbitrary power bars or vanity stats.
          </p>
        </div>

        {/* 4 Themed Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="bg-[#111111] border border-[#222222] rounded-2xl p-7 shadow-xl hover:border-[#F02030]/60 hover:shadow-[0_8px_30px_-6px_rgba(240,32,48,0.2)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#202020] pb-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#F02030] shadow-[0_0_6px_#F02030]" />
                    <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                      {group.category}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 bg-[#181818] px-2.5 py-1 rounded-md border border-[#282828]">
                    {group.badge}
                  </span>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {group.skills.map((skill) => {
                    const IconComponent = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        className="p-3.5 rounded-xl bg-[#161616] border border-[#262626] hover:border-[#F02030]/50 hover:bg-[#1A1A1A] transition-all flex items-center gap-3 group/item cursor-default"
                      >
                        <div className="w-9 h-9 rounded-lg bg-[#202020] text-neutral-300 group-hover/item:text-[#F02030] group-hover/item:bg-[#28181a] flex items-center justify-center border border-[#2e2e2e] transition-colors shrink-0">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-white uppercase tracking-wider block truncate group-hover/item:text-neutral-100">
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#F02030] block tracking-tight -mt-0.5">
                            {skill.tag}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-xs font-mono text-neutral-500 uppercase">
                <span>CATEGORY DISCIPLINE</span>
                <span className="text-neutral-400 font-semibold">ACTIVE CORE</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

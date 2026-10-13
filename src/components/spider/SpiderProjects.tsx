import React, { useState, useMemo } from 'react';
import { ProjectItem, PORTFOLIO_DATA } from '../../data/portfolioData';
import { SpiderProjectCard } from './SpiderProjectCard';
import { SpiderWebCorner, SpiderDivider, AtmosphericRedGlow } from './SpiderGraphics';
import { ProjectDetailsModal } from '../apple/ProjectDetailsModal';

export const SpiderProjects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'AI & Machine Learning', 'AI Agents', 'Web Development'];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PORTFOLIO_DATA.projects;
    return PORTFOLIO_DATA.projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="projects"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0B0B0B] text-white border-b border-[#1c1c1c] overflow-hidden"
    >
      {/* Spider-Web Corner Graphics */}
      <SpiderWebCorner position="top-right" size={170} className="absolute top-0 right-0 text-[#F02030]/20" />
      <SpiderWebCorner position="bottom-left" size={150} className="absolute bottom-0 left-0 text-white/15" />

      {/* Atmospheric Glow */}
      <AtmosphericRedGlow intensity="medium" className="top-1/2 left-1/3 w-[550px] h-[550px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#F02030] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#F02030] rounded-full shadow-[0_0_6px_#F02030]" />
              PORTFOLIO // FIELD ARTIFACTS
            </p>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight">
              FEATURED <span className="text-[#F02030] drop-shadow-[0_0_25px_rgba(240,32,48,0.35)]">PROJECTS.</span>
            </h2>

            <SpiderDivider className="mt-4 mb-4" />

            <p className="text-sm sm:text-base text-[#A0A0A0] max-w-xl font-normal leading-relaxed">
              Practical software systems, combinatorial route optimization engines, and agentic assistants built through code, creativity, and experimentation.
            </p>
          </div>

          {/* Clean Segmented Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#141414] border border-[#242424] rounded-xl self-start lg:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg cursor-pointer transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#F02030] text-white shadow-[0_0_12px_rgba(240,32,48,0.4)]'
                    : 'text-neutral-400 hover:text-white hover:bg-[#1C1C1C]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <SpiderProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(p) => setActiveProject(p)}
            />
          ))}
        </div>

        {/* Interactive Blueprint & Simulation Modal */}
        {activeProject && (
          <ProjectDetailsModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}

      </div>
    </section>
  );
};

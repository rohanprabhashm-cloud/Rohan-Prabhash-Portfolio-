import React, { useState, useMemo } from 'react';
import { ProjectItem, PORTFOLIO_DATA } from '../../data/portfolioData';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import { Sparkles } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'AI & Machine Learning', 'AI Agents', 'Web Development'];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PORTFOLIO_DATA.projects;
    return PORTFOLIO_DATA.projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-black/5 dark:border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-semibold text-[#0071e3] dark:text-[#2997ff] uppercase tracking-wider mb-2">
              Featured Work
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3">
              Projects Showcase
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
              Practical software engineering, artificial intelligence experiments, and agentic workflows designed to solve real-world problems.
            </p>
          </div>

          {/* iOS Segmented Filter Control */}
          <div className="inline-flex p-1 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/10 self-start md:self-auto overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Apple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(proj) => setActiveProject(proj)}
            />
          ))}
        </div>

        {/* Project Details Modal */}
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

import React from 'react';
import { ExternalLink, Github, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { ProjectItem } from '../../data/portfolioData';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  // Render clean vector artwork preview matching Apple minimalism
  const renderThumbnail = () => {
    if (project.simulationType === 'oyee') {
      return (
        <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span className="font-mono text-[11px] text-[#2997ff]">ROUTE OPTIMIZATION</span>
            <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded text-white font-mono">BATCH #104</span>
          </div>

          {/* Abstract Delivery Vector Map */}
          <div className="my-auto py-2">
            <svg className="w-full h-24 stroke-neutral-700" viewBox="0 0 200 80" fill="none">
              <path d="M 20 40 Q 60 10, 100 40 T 180 30" stroke="#0071e3" strokeWidth="2.5" strokeDasharray="3 3" />
              {/* Drop Points */}
              <circle cx="20" cy="40" r="4.5" fill="#2997ff" />
              <circle cx="70" cy="22" r="3.5" fill="#ffffff" />
              <circle cx="120" cy="48" r="3.5" fill="#ffffff" />
              <circle cx="180" cy="30" r="4.5" fill="#10b981" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
            <span>3 Stops · 18 min</span>
            <span className="text-emerald-400">Privacy QR Active</span>
          </div>
        </div>
      );
    }

    if (project.simulationType === 'oye_assistant') {
      return (
        <div className="w-full h-full bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span className="font-mono text-[11px] text-[#2997ff]">VOICE INTELLIGENCE</span>
            <span className="text-[11px] text-neutral-500 font-mono">SPEECH TO TASK</span>
          </div>

          {/* Minimal Sound Wave Pulse */}
          <div className="flex items-center justify-center my-auto gap-1.5 py-4">
            <div className="w-1.5 h-6 bg-[#2997ff] rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <div className="w-1.5 h-12 bg-white rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
            <div className="w-1.5 h-16 bg-[#2997ff] rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            <div className="w-1.5 h-10 bg-white rounded-full animate-pulse" style={{ animationDelay: '450ms' }} />
            <div className="w-1.5 h-5 bg-[#2997ff] rounded-full animate-pulse" style={{ animationDelay: '600ms' }} />
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
            <span>Listening & Synthesizing</span>
            <span className="text-[#2997ff]">Voice I/O</span>
          </div>
        </div>
      );
    }

    // RoamAgent Travel Concierge
    return (
      <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span className="font-mono text-[11px] text-[#2997ff]">AGENTIC CONCIERGE</span>
          <span className="text-[11px] text-neutral-500 font-mono">ADAPTIVE PLANNER</span>
        </div>

        {/* Abstract Multi-day flight and travel path */}
        <div className="my-auto py-2">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <span className="block text-[10px] text-neutral-400">DAY 1</span>
              <span className="font-medium text-white text-xs">Arrival</span>
            </div>
            <div className="p-2 rounded-lg bg-[#0071e3]/20 border border-[#2997ff]/30">
              <span className="block text-[10px] text-[#2997ff]">DAY 2</span>
              <span className="font-medium text-white text-xs">Explore</span>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <span className="block text-[10px] text-neutral-400">DAY 3</span>
              <span className="font-medium text-white text-xs">Depart</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
          <span>Budget & Weather Adaptive</span>
          <span className="text-[#2997ff]">Autonomous</span>
        </div>
      </div>
    );
  };

  return (
    <div
      onClick={() => onOpenDetails(project)}
      className="group relative rounded-3xl bg-neutral-50 dark:bg-neutral-900/80 border border-black/8 dark:border-white/10 overflow-hidden apple-card-glow flex flex-col cursor-pointer transition-all duration-300"
    >
      {/* Thumbnail Container with Desktop Hover Scale */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden border-b border-black/5 dark:border-white/5">
        <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105">
          {renderThumbnail()}
        </div>

        {/* Hover Overlay Reveal on Desktop */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center p-6 backdrop-blur-[2px]">
          <div className="text-center text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-white text-black shadow-lg">
              <Eye className="w-3.5 h-3.5" />
              <span>View Details</span>
            </span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Status */}
          <div className="flex items-center justify-between gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-2">
            <span>{project.category}</span>
            <span className="text-[11px] font-mono text-neutral-400">Project</span>
          </div>

          {/* Project Title */}
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1.5 group-hover:text-[#0071e3] dark:group-hover:text-[#2997ff] transition-colors flex items-center justify-between">
            <span>{project.name}</span>
            <ArrowRight className="w-4 h-4 text-neutral-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div>
          {/* Clean Unboxed Technology Tags (Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400 pt-3 border-t border-black/5 dark:border-white/5 mb-4 font-mono">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <React.Fragment key={tech}>
                <span>{tech}</span>
                {i < Math.min(project.technologies.length, 4) - 1 && (
                  <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Links and Actions */}
          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                title="GitHub Repository (Placeholder)"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  title="Live Demo (Placeholder)"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Demo</span>
                </a>
              )}
            </div>

            <button
              onClick={() => onOpenDetails(project)}
              className="font-medium text-[#0071e3] dark:text-[#2997ff] hover:underline flex items-center gap-1 text-xs"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

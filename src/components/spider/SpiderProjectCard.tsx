import React from 'react';
import { ExternalLink, Github, ArrowRight, Eye, Play, Sparkles } from 'lucide-react';
import { ProjectItem } from '../../data/portfolioData';

interface SpiderProjectCardProps {
  project: ProjectItem;
  onOpenDetails: (project: ProjectItem) => void;
}

export const SpiderProjectCard: React.FC<SpiderProjectCardProps> = ({ project, onOpenDetails }) => {
  // Cinematic dark artwork preview with red neon accents
  const renderArtwork = () => {
    if (project.simulationType === 'oyee') {
      return (
        <div className="w-full h-full bg-[#0E0E10] p-5 flex flex-col justify-between relative overflow-hidden group">
          {/* Subtle red illumination gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#F02030_0%,transparent_70%)] opacity-25" />
          
          <div className="flex items-center justify-between relative z-10 text-xs">
            <span className="bg-[#18181A] text-neutral-300 px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded border border-white/10">
              ROUTE OPTIMIZATION
            </span>
            <span className="bg-[#F02030]/20 text-[#F02030] px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded border border-[#F02030]/40">
              DYNAMIC BATCH
            </span>
          </div>

          {/* Web Path Vector Map Simulation */}
          <div className="my-auto py-2 relative z-10">
            <svg className="w-full h-24 stroke-white" viewBox="0 0 200 80" fill="none">
              <line x1="20" y1="40" x2="80" y2="20" stroke="#F02030" strokeWidth="2.5" />
              <line x1="80" y1="20" x2="140" y2="55" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
              <line x1="140" y1="55" x2="185" y2="30" stroke="#F02030" strokeWidth="2.5" />
              
              <circle cx="20" cy="40" r="5" fill="#FFFFFF" stroke="#000" strokeWidth="2" filter="drop-shadow(0 0 6px #fff)" />
              <circle cx="80" cy="20" r="5" fill="#F02030" stroke="#000" strokeWidth="2" filter="drop-shadow(0 0 8px #F02030)" />
              <circle cx="140" cy="55" r="5" fill="#FFFFFF" stroke="#000" strokeWidth="2" />
              <circle cx="185" cy="30" r="6" fill="#F02030" stroke="#FFFFFF" strokeWidth="2" filter="drop-shadow(0 0 8px #F02030)" />
            </svg>
          </div>

          <div className="flex items-center justify-between relative z-10 text-[11px] font-mono text-neutral-400 uppercase">
            <span>MULTI-STOP OPTIMIZER</span>
            <span className="text-[#F02030]">QR PRIVACY LOCK</span>
          </div>
        </div>
      );
    }

    if (project.simulationType === 'oye_assistant') {
      return (
        <div className="w-full h-full bg-[#0E0E10] p-5 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#F02030_0%,transparent_75%)] opacity-25" />

          <div className="flex items-center justify-between relative z-10 text-xs">
            <span className="bg-[#18181A] text-neutral-300 px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded border border-white/10">
              AI CONVERSATIONAL CORE
            </span>
            <span className="bg-[#F02030]/20 text-[#F02030] px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded border border-[#F02030]/40">
              VOICE I/O
            </span>
          </div>

          {/* Audio Wave Visualizer Graphic */}
          <div className="flex items-center justify-center my-auto gap-2 py-3 relative z-10">
            <div className="w-1.5 h-6 bg-[#F02030] rounded-full animate-pulse shadow-[0_0_8px_#F02030]" />
            <div className="w-1.5 h-12 bg-white rounded-full animate-pulse" style={{ animationDelay: '100ms' }} />
            <div className="w-1.5 h-16 bg-[#F02030] rounded-full animate-pulse shadow-[0_0_12px_#F02030]" style={{ animationDelay: '250ms' }} />
            <div className="w-1.5 h-10 bg-white rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
            <div className="w-1.5 h-5 bg-[#F02030] rounded-full animate-pulse shadow-[0_0_8px_#F02030]" style={{ animationDelay: '550ms' }} />
          </div>

          <div className="flex items-center justify-between relative z-10 text-[11px] font-mono text-neutral-400 uppercase">
            <span>VOICE QUERY INGESTION</span>
            <span className="text-[#F02030]">DESKTOP AGENT</span>
          </div>
        </div>
      );
    }

    // Default / RoamAgent
    return (
      <div className="w-full h-full bg-[#0E0E10] p-5 flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#F02030_0%,transparent_70%)] opacity-25" />

        <div className="flex items-center justify-between relative z-10 text-xs">
          <span className="bg-[#18181A] text-neutral-300 px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded border border-white/10">
            AGENTIC TRAVEL CONCIERGE
          </span>
          <span className="bg-[#F02030]/20 text-[#F02030] px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded border border-[#F02030]/40">
            HACKATHON BUILD
          </span>
        </div>

        {/* Dynamic Flight / Itinerary Graph */}
        <div className="my-auto py-2 relative z-10 flex items-center justify-center">
          <svg className="w-full h-24 stroke-white" viewBox="0 0 200 80" fill="none">
            <path d="M 20 60 C 60 10, 140 10, 180 60" stroke="#F02030" strokeWidth="2.5" filter="drop-shadow(0 0 8px #F02030)" />
            <circle cx="20" cy="60" r="4.5" fill="#FFFFFF" stroke="#000" strokeWidth="1.5" />
            <circle cx="100" cy="22" r="5.5" fill="#F02030" stroke="#FFF" strokeWidth="1.5" filter="drop-shadow(0 0 8px #F02030)" />
            <circle cx="180" cy="60" r="4.5" fill="#FFFFFF" stroke="#000" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="flex items-center justify-between relative z-10 text-[11px] font-mono text-neutral-400 uppercase">
          <span>BUDGET & SCHEDULE AGENT</span>
          <span className="text-[#F02030]">ADAPTIVE PLANS</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#111111] border border-[#222222] rounded-2xl shadow-xl hover:border-[#F02030] hover:shadow-[0_8px_35px_-6px_rgba(240,32,48,0.25)] transition-all duration-300 flex flex-col justify-between group overflow-hidden">
      
      {/* Visual Header / Artwork Container */}
      <div className="h-48 w-full border-b border-[#202020] overflow-hidden">
        {renderArtwork()}
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Subtitle / Category Tag */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F02030]">
              {project.category}
            </span>
            <span className="text-[10px] font-mono text-neutral-400 uppercase bg-[#181818] px-2 py-0.5 rounded border border-[#282828]">
              ACTIVE DRAFT
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mb-1.5 group-hover:text-neutral-100 transition-colors">
            {project.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs font-bold text-neutral-300 mb-3 uppercase tracking-wide">
            {project.subtitle}
          </p>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#A0A0A0] font-normal leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 bg-[#181818] border border-[#262626] rounded-md text-[11px] font-medium text-neutral-300 uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons: Inspect Details & GitHub */}
        <div className="pt-4 border-t border-[#1F1F1F] flex items-center justify-between gap-3">
          <button
            onClick={() => onOpenDetails(project)}
            className="flex-1 py-2.5 px-3.5 bg-[#F02030] hover:bg-[#d01827] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(240,32,48,0.3)] hover:shadow-[0_0_20px_rgba(240,32,48,0.45)] cursor-pointer flex items-center justify-center gap-2"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>INSPECT BLUEPRINT</span>
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 bg-[#181818] hover:bg-[#222222] hover:border-[#F02030]/60 text-neutral-300 hover:text-white text-xs font-bold uppercase tracking-wider rounded-xl border border-[#282828] transition-all flex items-center justify-center"
            title="GitHub Repository"
            aria-label="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import {
  ExternalLink,
  Github,
  Play,
  ArrowRight,
  Info,
  Compass,
  Bot,
  Navigation,
  Sparkles,
  Edit3,
  Copy,
  Trash2,
  ChevronUp,
  ChevronDown,
  EyeOff,
  Video,
} from 'lucide-react';
import { Project } from '../../types/portfolio';
import { ManuscriptCorner } from '../ManuscriptMotifs';

/**
 * Ancient Cartographic & Sacred Geometry Cover Art for OYEE
 */
export const OyeeFullCoverArt: React.FC = () => (
  <svg
    className="w-full h-full object-cover select-none"
    viewBox="0 0 600 450"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="oyee-ancient-bg" cx="50%" cy="45%" r="65%">
        <stop offset="0%" stopColor="#3A2417" />
        <stop offset="60%" stopColor="#25160D" />
        <stop offset="100%" stopColor="#140C07" />
      </radialGradient>
      <radialGradient id="gold-core" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#E2CDA5" stopOpacity="0.45" />
        <stop offset="60%" stopColor="#B58A43" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#B58A43" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="600" height="450" fill="url(#oyee-ancient-bg)" />
    <circle cx="300" cy="225" r="180" fill="url(#gold-core)" />
    <circle cx="300" cy="225" r="150" fill="none" stroke="#B58A43" strokeWidth="1" strokeDasharray="3 6" opacity="0.6" />
    <circle cx="300" cy="225" r="105" fill="none" stroke="#8C3828" strokeWidth="1.2" opacity="0.5" />
    <circle cx="300" cy="225" r="60" fill="none" stroke="#E2CDA5" strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />

    <g stroke="#B58A43" strokeWidth="0.75" opacity="0.25">
      <line x1="0" y1="225" x2="600" y2="225" />
      <line x1="300" y1="0" x2="300" y2="450" />
      <line x1="120" y1="0" x2="480" y2="450" strokeDasharray="2 4" />
      <line x1="480" y1="0" x2="120" y2="450" strokeDasharray="2 4" />
    </g>

    <path
      d="M 90,350 C 160,290 200,270 270,225 S 360,160 440,140 S 510,120 540,90"
      fill="none"
      stroke="#B58A43"
      strokeWidth="2.8"
      strokeLinecap="round"
    />
    <path
      d="M 140,130 Q 220,180 300,225 T 460,330"
      fill="none"
      stroke="#8C3828"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="6 4"
      opacity="0.85"
    />

    <circle cx="300" cy="225" r="20" fill="#211810" stroke="#B58A43" strokeWidth="2" />
    <circle cx="300" cy="225" r="8" fill="#8C3828" />
    <circle cx="90" cy="350" r="7" fill="#B58A43" />
    <circle cx="270" cy="225" r="5" fill="#E2CDA5" />
    <circle cx="440" cy="140" r="8" fill="#8C3828" stroke="#B58A43" strokeWidth="1.5" />
    <circle cx="540" cy="90" r="9" fill="#211810" stroke="#B58A43" strokeWidth="2" />

    <text x="300" y="275" textAnchor="middle" fill="#E2CDA5" fontSize="12" fontFamily="'Cinzel', serif" letterSpacing="3">
      OPTIMAL WAYFINDING
    </text>
  </svg>
);

/**
 * Ancient Yantra & Knowledge Core Vector Cover Art for Oye Assistant
 */
export const OyeAssistantFullCoverArt: React.FC = () => (
  <svg
    className="w-full h-full object-cover select-none"
    viewBox="0 0 600 450"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="oye-core-bg" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stopColor="#321D13" />
        <stop offset="60%" stopColor="#21120B" />
        <stop offset="100%" stopColor="#110905" />
      </radialGradient>
      <radialGradient id="yantra-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#B58A43" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#8C3828" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="600" height="450" fill="url(#oye-core-bg)" />
    <circle cx="300" cy="225" r="160" fill="url(#yantra-glow)" />

    <g stroke="#B58A43" strokeWidth="1.5" fill="none">
      <polygon points="300,95 410,290 190,290" opacity="0.8" />
      <polygon points="300,355 190,160 410,160" opacity="0.8" />
      <circle cx="300" cy="225" r="130" strokeDasharray="4 4" opacity="0.5" />
      <circle cx="300" cy="225" r="95" stroke="#8C3828" opacity="0.6" />
    </g>

    <circle cx="300" cy="225" r="32" fill="#211810" stroke="#B58A43" strokeWidth="2" />
    <circle cx="300" cy="225" r="14" fill="#8C3828" stroke="#E2CDA5" strokeWidth="1" />
    <circle cx="300" cy="225" r="5" fill="#F3E7CC" />

    <text x="300" y="380" textAnchor="middle" fill="#E2CDA5" fontSize="12" fontFamily="'Cinzel', serif" letterSpacing="4">
      COGNITIVE VIDYA ENGINE
    </text>
  </svg>
);

/**
 * Ancient Travel Mandala & Itinerary Folio for RoamAgent
 */
export const RoamAgentFullCoverArt: React.FC = () => (
  <svg
    className="w-full h-full object-cover select-none"
    viewBox="0 0 600 450"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="roam-ancient-bg" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stopColor="#352014" />
        <stop offset="70%" stopColor="#1E1109" />
        <stop offset="100%" stopColor="#120904" />
      </radialGradient>
    </defs>
    <rect width="600" height="450" fill="url(#roam-ancient-bg)" />

    <g transform="translate(300, 225)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <g key={deg} transform={`rotate(${deg})`}>
          <path
            d="M 0 30 C 25 60, 40 100, 0 130 C -40 100, -25 60, 0 30 Z"
            fill="none"
            stroke="#B58A43"
            strokeWidth="1.2"
            opacity="0.75"
          />
          <circle cx="0" cy="130" r="3" fill="#8C3828" />
        </g>
      ))}

      <circle cx="0" cy="0" r="45" fill="#211810" stroke="#B58A43" strokeWidth="2" />
      <circle cx="0" cy="0" r="22" fill="#8C3828" opacity="0.9" />
      <circle cx="0" cy="0" r="8" fill="#F3E7CC" />
    </g>

    <text x="300" y="380" textAnchor="middle" fill="#E2CDA5" fontSize="12" fontFamily="'Cinzel', serif" letterSpacing="4">
      AUTONOMOUS ITINERARY CHARTER
    </text>
  </svg>
);

/**
 * Generic Manuscript Treatise Art Fallback
 */
export const GenericManuscriptCoverArt: React.FC<{ title: string }> = ({ title }) => (
  <svg
    className="w-full h-full object-cover select-none"
    viewBox="0 0 600 450"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="generic-treatise-bg" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stopColor="#2D1A10" />
        <stop offset="70%" stopColor="#1C1008" />
        <stop offset="100%" stopColor="#100804" />
      </radialGradient>
    </defs>
    <rect width="600" height="450" fill="url(#generic-treatise-bg)" />
    
    <circle cx="300" cy="225" r="140" fill="none" stroke="#B58A43" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.5" />
    <circle cx="300" cy="225" r="110" fill="none" stroke="#8C3828" strokeWidth="1" opacity="0.4" />
    <circle cx="300" cy="225" r="80" fill="none" stroke="#B58A43" strokeWidth="2" opacity="0.7" />
    
    <g transform="translate(300, 225)">
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <g key={deg} transform={`rotate(${deg})`}>
          <line x1="0" y1="0" x2="0" y2="80" stroke="#B58A43" strokeWidth="1" opacity="0.6" />
          <circle cx="0" cy="80" r="3" fill="#8C3828" />
        </g>
      ))}
      <circle cx="0" cy="0" r="28" fill="#211810" stroke="#B58A43" strokeWidth="2" />
      <text x="0" y="6" textAnchor="middle" fill="#E2CDA5" fontSize="18" fontFamily="'Cinzel', serif">
        ॐ
      </text>
    </g>

    <text x="300" y="385" textAnchor="middle" fill="#E2CDA5" fontSize="11" fontFamily="'Cinzel', serif" letterSpacing="3">
      ILLUMINATED TECHNICAL FOLIO
    </text>
  </svg>
);

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails: (project: Project) => void;
  onLaunchSimulation?: (project: Project) => void;
  onGithubClick?: (e: React.MouseEvent, project: Project) => void;
  isAdmin?: boolean;
  onEdit?: (project: Project) => void;
  onDuplicate?: (projectId: string) => void;
  onDelete?: (project: Project) => void;
  onMoveUp?: (projectId: string) => void;
  onMoveDown?: (projectId: string) => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onViewDetails,
  onLaunchSimulation,
  onGithubClick,
  isAdmin = false,
  onEdit,
  onDuplicate,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst = false,
  isLast = false,
}) => {
  const [isRevealedMobile, setIsRevealedMobile] = useState(false);

  const formatCategoryName = (cat: string) => {
    switch (cat) {
      case 'ai_ml':
        return 'AI & Machine Learning';
      case 'ai_agents':
        return 'AI Agents';
      case 'web_dev':
        return 'Web Development';
      case 'mobile_apps':
        return 'Mobile Applications';
      case 'hackathon_projects':
        return 'Hackathon Project';
      case 'experiments':
        return 'Experimental Artifact';
      case 'fullstack':
        return 'Route Architecture';
      case 'agentic':
        return 'Autonomous Agent';
      case 'ai':
        return 'Conversational AI';
      default:
        return 'Technical Folio';
    }
  };

  const statusBadgeStyle: Record<string, string> = {
    Completed: 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50',
    'In Development': 'bg-[#180f08]/90 text-[#E2CDA5] border-[#B58A43]/60',
    Planning: 'bg-indigo-950/80 text-indigo-300 border-indigo-600/50',
    Published: 'bg-[#8C3828]/90 text-[#F3E7CC] border-[#B58A43]',
    'Hackathon Project': 'bg-amber-950/80 text-amber-300 border-amber-600/50',
  };

  return (
    <div
      onClick={() => setIsRevealedMobile(!isRevealedMobile)}
      className="group relative rounded-lg overflow-hidden border-2 border-[#B58A43]/60 hover:border-[#B58A43] bg-[#24170E] shadow-[0_12px_32px_rgba(0,0,0,0.7)] hover:shadow-[0_0_35px_rgba(181,138,67,0.35)] transition-all duration-400 flex flex-col h-[470px] cursor-pointer"
    >
      {/* Corner Ornaments */}
      <ManuscriptCorner position="top-left" className="absolute top-2 left-2 z-30 opacity-70 group-hover:opacity-100 transition-opacity" size={24} />
      <ManuscriptCorner position="top-right" className="absolute top-2 right-2 z-30 opacity-70 group-hover:opacity-100 transition-opacity" size={24} />
      <ManuscriptCorner position="bottom-left" className="absolute bottom-2 left-2 z-30 opacity-70 group-hover:opacity-100 transition-opacity" size={24} />
      <ManuscriptCorner position="bottom-right" className="absolute bottom-2 right-2 z-30 opacity-70 group-hover:opacity-100 transition-opacity" size={24} />

      {/* Dashed Border Inset */}
      <div className="absolute inset-2.5 rounded border border-dashed border-[#B58A43]/30 pointer-events-none z-20 transition-colors group-hover:border-[#B58A43]/60" />

      {/* 1. Cover Image or Vector Treatise Art */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#160e08]">
        {project.imageUrl || project.coverImage ? (
          <img
            src={project.imageUrl || project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : null}

        {!(project.imageUrl || project.coverImage) && (
          <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
            {project.simulationType === 'oyee' ? (
              <OyeeFullCoverArt />
            ) : project.simulationType === 'oye_assistant' ? (
              <OyeAssistantFullCoverArt />
            ) : project.simulationType === 'roam_agent' ? (
              <RoamAgentFullCoverArt />
            ) : (
              <GenericManuscriptCoverArt title={project.title} />
            )}
          </div>
        )}
      </div>

      {/* 2. Top Header Bar: Folio Number, Draft Indicator & Status */}
      <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="font-cinzel text-[10px] font-bold tracking-widest px-2.5 py-1 rounded bg-[#180f08]/90 border border-[#B58A43]/60 text-[#E2CDA5]">
            CREATION 0{index + 1}
          </span>
          {!project.isPublished && (
            <span className="px-2 py-0.5 rounded bg-amber-900/90 border border-amber-500 text-amber-200 font-cinzel text-[9px] font-bold tracking-wider flex items-center gap-1">
              <EyeOff className="w-2.5 h-2.5" />
              <span>DRAFT</span>
            </span>
          )}
        </div>

        <span className={`ink-stamp text-[9px] ${statusBadgeStyle}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#8C3828] animate-pulse" />
          <span>{project.status || project.statusLabel || 'Active'}</span>
        </span>
      </div>

      {/* Admin Action Controls Bar (Only visible when Scribe mode is authenticated) */}
      {isAdmin && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-12 right-4 z-40 flex items-center gap-1 p-1 bg-[#180f08]/95 border border-[#B58A43] rounded shadow-lg"
        >
          {onMoveUp && !isFirst && (
            <button
              onClick={() => onMoveUp(project.id)}
              className="p-1 text-[#E2CDA5] hover:text-white hover:bg-[#8C3828]/40 rounded"
              title="Move Earlier in Folio"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          )}
          {onMoveDown && !isLast && (
            <button
              onClick={() => onMoveDown(project.id)}
              className="p-1 text-[#E2CDA5] hover:text-white hover:bg-[#8C3828]/40 rounded"
              title="Move Later in Folio"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          )}
          {onDuplicate && (
            <button
              onClick={() => onDuplicate(project.id)}
              className="p-1 text-[#E2CDA5] hover:text-white hover:bg-[#8C3828]/40 rounded"
              title="Duplicate Creation"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(project)}
              className="p-1 text-[#E2CDA5] hover:text-white hover:bg-[#8C3828]/40 rounded"
              title="Edit Creation Dossier"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(project)}
              className="p-1 text-red-400 hover:text-red-200 hover:bg-red-950/60 rounded"
              title="Strike Creation from Archive"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* 3. Resting Scrim (Shows Title and Category while Image is Main) */}
      <div
        className={`absolute inset-x-0 bottom-0 p-5 z-20 bg-gradient-to-t from-[#160e08] via-[#160e08]/90 to-transparent transition-opacity duration-300 pointer-events-none ${
          isRevealedMobile ? 'opacity-0' : 'group-hover:opacity-0'
        }`}
      >
        <div className="flex items-end justify-between">
          <div className="pr-2">
            <div className="font-cinzel text-[11px] font-semibold text-[#B58A43] tracking-widest uppercase mb-1">
              {formatCategoryName(project.category)}
            </div>
            <h4 className="font-cinzel text-xl font-bold text-[#F3E7CC] tracking-wide">
              {project.title}
            </h4>
            <p className="font-serif italic text-xs text-[#C7A878] line-clamp-1 mt-0.5">
              {project.tagline || project.shortDescription}
            </p>
          </div>
          <span className="text-xs font-cinzel text-[#B58A43] whitespace-nowrap shrink-0 hidden sm:inline">
            Unfold Folio →
          </span>
        </div>
      </div>

      {/* 4. Full Manuscript Reveal Overlay (Revealed on Hover on desktop & Tap on mobile) */}
      <div
        className={`absolute inset-0 z-30 p-6 flex flex-col justify-end bg-gradient-to-t from-[#160e08] via-[#21140B]/95 to-[#160e08]/80 transition-all duration-400 ${
          isRevealedMobile
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0'
        }`}
      >
        {/* Category Label */}
        <div className="font-cinzel text-[11px] font-bold text-[#B58A43] tracking-widest uppercase">
          {formatCategoryName(project.category)}
        </div>

        {/* Title & Tagline */}
        <h3 className="font-cinzel text-2xl font-bold text-[#F3E7CC] tracking-wide mt-1">
          {project.title}
        </h3>
        <p className="font-serif italic text-sm text-[#E2CDA5] mt-0.5 line-clamp-1">
          {project.tagline || project.shortDescription}
        </p>

        {/* Description or Problem Statement Snippet */}
        <p className="font-serif text-xs sm:text-sm text-[#C7A878] line-clamp-3 leading-relaxed mt-2">
          {project.problemStatement
            ? `Problem: ${project.problemStatement}`
            : project.description}
        </p>

        {/* Technologies Inscription */}
        <div className="flex flex-wrap gap-1.5 pt-3">
          {(project.tags || project.technologies || []).slice(0, 4).map((tag) => (
            <span key={tag} className="ink-stamp-gold text-[10px]">
              {tag}
            </span>
          ))}
          {(project.tags || project.technologies || []).length > 4 && (
            <span className="text-[10px] font-cinzel text-[#C7A878] self-center">
              +{(project.tags || project.technologies || []).length - 4} more
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="pt-4 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => onViewDetails(project)}
            className="flex-1 py-2.5 px-3 rounded bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs font-semibold tracking-wider border border-[#B58A43] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Explore Project</span>
          </button>

          {project.simulationType && project.simulationType !== 'none' && onLaunchSimulation && (
            <button
              type="button"
              onClick={() => onLaunchSimulation(project)}
              className="py-2.5 px-3 rounded bg-[#24170E] hover:bg-[#342114] text-[#E2CDA5] hover:text-[#F3E7CC] border border-[#B58A43]/60 text-xs font-cinzel transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Launch Interactive Simulation"
            >
              <Play className="w-3.5 h-3.5 text-[#B58A43]" />
              <span className="hidden sm:inline">Simulate</span>
            </button>
          )}

          {project.demoVideoUrl && (
            <a
              href={project.demoVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded bg-[#24170E] hover:bg-[#342114] text-[#E2CDA5] hover:text-[#F3E7CC] border border-[#B58A43]/60 transition-colors cursor-pointer"
              title="Watch Demo Video"
            >
              <Video className="w-4 h-4 text-[#B58A43]" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => onGithubClick && onGithubClick(e, project)}
              className="p-2.5 rounded bg-[#24170E] hover:bg-[#342114] text-[#E2CDA5] hover:text-[#F3E7CC] border border-[#B58A43]/60 transition-colors cursor-pointer"
              title={project.isGithubPlaceholder ? 'Repository placeholder' : 'Open Repository'}
            >
              <Github className="w-4 h-4" />
            </a>
          )}

          {project.demoUrl && !project.isDemoPlaceholder && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded bg-[#24170E] hover:bg-[#342114] text-[#E2CDA5] hover:text-[#F3E7CC] border border-[#B58A43]/60 transition-colors cursor-pointer"
              title="Open Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

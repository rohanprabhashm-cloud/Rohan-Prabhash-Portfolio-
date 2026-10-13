import React, { useEffect } from 'react';
import {
  X,
  Trophy,
  Calendar,
  MapPin,
  Users,
  Award,
  ExternalLink,
  Github,
  Play,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  BookOpen,
  Feather,
  Sparkles,
} from 'lucide-react';
import { HackathonAchievement, HackathonResultStatus } from '../types/portfolio';
import { ManuscriptCorner } from './ManuscriptMotifs';

interface HackathonModalProps {
  hackathon: HackathonAchievement | null;
  onClose: () => void;
  onEdit?: (hackathon: HackathonAchievement) => void;
  isAdmin?: boolean;
}

export const HackathonModal: React.FC<HackathonModalProps> = ({
  hackathon,
  onClose,
  onEdit,
  isAdmin = false,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && hackathon) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hackathon, onClose]);

  if (!hackathon) return null;

  const resultColorClass: Record<HackathonResultStatus, string> = {
    Winner: 'bg-amber-600/20 text-amber-900 border-amber-600/50',
    Finalist: 'bg-[#8C3828]/15 text-[#8C3828] border-[#8C3828]/50',
    Shortlisted: 'bg-emerald-700/15 text-emerald-900 border-emerald-700/50',
    Submitted: 'bg-blue-700/15 text-blue-900 border-blue-700/50',
    Participating: 'bg-purple-700/15 text-purple-900 border-purple-700/50',
    Registered: 'bg-slate-700/15 text-slate-800 border-slate-700/50',
    'Completed without an award': 'bg-[#38251B]/15 text-[#38251B] border-[#38251B]/40',
    'Research / Preparation': 'bg-teal-700/15 text-teal-900 border-teal-700/50',
    Draft: 'bg-stone-600/15 text-stone-800 border-stone-600/40',
  };
  const currentBadgeClass = resultColorClass[hackathon.resultStatus] || 'bg-[#B58A43]/20 text-[#211810] border-[#B58A43]';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl parchment-sheet border-2 border-[#B58A43] rounded-lg shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#211810]">
        <ManuscriptCorner position="top-left" size={26} className="absolute top-2 left-2 opacity-80" />
        <ManuscriptCorner position="top-right" size={26} className="absolute top-2 right-2 opacity-80" />

        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-[#B58A43]/50 flex items-start justify-between bg-[#E2CDA5]/70">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-cinzel text-[#8C3828] uppercase tracking-widest font-bold mb-1">
              <span>HACKATHON CHRONICLE • CHAPTER EXPEDITION</span>
              <span className="text-[#B58A43]">/</span>
              <span className={`px-2 py-0.5 rounded border ${currentBadgeClass}`}>
                {hackathon.resultStatus}
              </span>
              {!hackathon.isPublished && (
                <span className="bg-amber-900/20 text-amber-900 px-2 py-0.5 rounded border border-amber-600/40">
                  DRAFT
                </span>
              )}
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#211810]">
              {hackathon.title || hackathon.hackathonName}
            </h3>
            <p className="font-serif italic text-xs text-[#8C3828] mt-0.5">
              Organized by {hackathon.event || hackathon.organizer} • {hackathon.date || hackathon.eventDate}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && onEdit && (
              <button
                onClick={() => onEdit(hackathon)}
                className="px-3 py-1.5 rounded bg-[#24170E] hover:bg-[#342114] text-[#E2CDA5] font-cinzel text-xs border border-[#B58A43] cursor-pointer flex items-center gap-1"
              >
                <Feather className="w-3.5 h-3.5 text-[#B58A43]" />
                <span className="hidden sm:inline">Edit Chronicle</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#5A3E2B] hover:text-[#8C3828] rounded cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 font-serif text-sm">
          {/* Metadata Highlights Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#FAF4E5] rounded border border-[#B58A43]/40 text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#8C3828] shrink-0" />
              <div>
                <span className="font-cinzel text-[10px] text-[#8C3828] block">Date</span>
                <span className="font-semibold text-[#211810]">{hackathon.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#8C3828] shrink-0" />
              <div>
                <span className="font-cinzel text-[10px] text-[#8C3828] block">Location</span>
                <span className="font-semibold text-[#211810]">{hackathon.location || 'Virtual / Hybrid'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#8C3828] shrink-0" />
              <div>
                <span className="font-cinzel text-[10px] text-[#8C3828] block">Team</span>
                <span className="font-semibold text-[#211810]">{hackathon.teamName || 'Solo Expedition'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#B58A43] shrink-0" />
              <div>
                <span className="font-cinzel text-[10px] text-[#8C3828] block">Verified Result</span>
                <span className="font-semibold text-[#8C3828]">{hackathon.awardTitle || hackathon.result}</span>
              </div>
            </div>
          </div>

          {/* Verified Award Showcase if applicable */}
          {hackathon.awardTitle && (
            <div className="p-4 rounded-lg bg-[#E2CDA5]/70 border-2 border-[#B58A43] flex items-center gap-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#8C3828] border border-[#B58A43] flex items-center justify-center text-[#F3E7CC] shrink-0 shadow">
                <Trophy className="w-5 h-5 text-[#E2CDA5]" />
              </div>
              <div>
                <span className="font-cinzel text-[10px] tracking-wider text-[#8C3828] uppercase font-bold">
                  Verified Honor & Placement
                </span>
                <h4 className="font-cinzel text-base font-bold text-[#211810]">{hackathon.awardTitle}</h4>
                <p className="text-xs text-[#5A3E2B]">
                  Formally recognized by {hackathon.event || hackathon.organizer} for technical execution and design merit.
                </p>
              </div>
            </div>
          )}

          {/* Project Submitted & Description */}
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-[#B58A43]/40">
              <h4 className="font-cinzel text-sm font-bold text-[#8C3828] tracking-wider uppercase">
                The Submission: {hackathon.projectSubmitted || hackathon.title}
              </h4>
            </div>
            <p className="text-[#38251B] leading-relaxed text-sm sm:text-base">
              {hackathon.description}
            </p>
          </div>

          {/* Problem Statement / Challenge Track */}
          {hackathon.problemStatement && (
            <div className="p-4 bg-[#FAF4E5] rounded border border-[#B58A43]/40 space-y-1.5">
              <h5 className="font-cinzel text-xs font-bold text-[#8C3828] tracking-wider uppercase">
                Challenge Track & Problem Statement
              </h5>
              <p className="text-xs sm:text-sm text-[#38251B] leading-relaxed italic">
                "{hackathon.problemStatement}"
              </p>
            </div>
          )}

          {/* My Individual Contribution & Team Roster */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hackathon.myRoleAndContribution && (
              <div className="p-4 rounded bg-[#E2CDA5]/50 border border-[#B58A43]/40 space-y-1.5">
                <h5 className="font-cinzel text-xs font-bold text-[#211810] tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#8C3828]" />
                  <span>My Individual Contribution</span>
                </h5>
                <p className="text-xs sm:text-sm text-[#38251B] leading-relaxed">
                  {hackathon.myRoleAndContribution}
                </p>
              </div>
            )}

            {hackathon.teamMembers && hackathon.teamMembers.length > 0 && (
              <div className="p-4 rounded bg-[#E2CDA5]/50 border border-[#B58A43]/40 space-y-1.5">
                <h5 className="font-cinzel text-xs font-bold text-[#211810] tracking-wider uppercase flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#8C3828]" />
                  <span>Team Members & Roles</span>
                </h5>
                <div className="space-y-1">
                  {hackathon.teamMembers.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-0.5 border-b border-[#B58A43]/20 last:border-0">
                      <span className="font-bold text-[#211810]">{m.name}</span>
                      <span className="text-[#8C3828] italic">{m.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Technologies Used */}
          {((hackathon.tags && hackathon.tags.length > 0) || (hackathon.technologies && hackathon.technologies.length > 0)) && (
            <div className="space-y-2">
              <h5 className="font-cinzel text-xs font-bold text-[#8C3828] tracking-wider uppercase">
                Technologies & Tools Deployed
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {(hackathon.tags || hackathon.technologies || []).map((t, idx) => (
                  <span key={idx} className="ink-stamp-gold text-[10px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notes & Learnings */}
          {hackathon.notesAndLearnings && (
            <div className="p-4 rounded bg-[#FAF4E5] border border-[#B58A43]/50 space-y-1.5">
              <h5 className="font-cinzel text-xs font-bold text-[#8C3828] tracking-wider uppercase flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#8C3828]" />
                <span>Notes & Lessons Learned from the Sprint</span>
              </h5>
              <p className="text-xs sm:text-sm text-[#38251B] leading-relaxed">
                {hackathon.notesAndLearnings}
              </p>
            </div>
          )}

          {/* Event Photos */}
          {hackathon.eventPhotos && hackathon.eventPhotos.length > 0 && (
            <div className="space-y-2">
              <h5 className="font-cinzel text-xs font-bold text-[#8C3828] tracking-wider uppercase flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#8C3828]" />
                <span>Photos from the Event</span>
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {hackathon.eventPhotos.map((photo, pIdx) => (
                  <div key={pIdx} className="rounded border border-[#B58A43] overflow-hidden aspect-video bg-black/10">
                    <img src={photo} alt={`Event photo ${pIdx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Links Bar */}
          <div className="pt-4 border-t border-[#B58A43]/40 flex flex-wrap items-center gap-2.5">
            {hackathon.certificateUrl && (
              <a
                href={hackathon.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded bg-[#24170E] hover:bg-[#38251B] text-[#E2CDA5] font-cinzel text-xs border border-[#B58A43] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-[#B58A43]" />
                <span>View Certificate</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}

            {hackathon.pitchDeckUrl && (
              <a
                href={hackathon.pitchDeckUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded bg-[#24170E] hover:bg-[#38251B] text-[#E2CDA5] font-cinzel text-xs border border-[#B58A43] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#B58A43]" />
                <span>Pitch Deck / Slides</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}

            {hackathon.demoVideoUrl && (
              <a
                href={hackathon.demoVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded bg-[#24170E] hover:bg-[#38251B] text-[#E2CDA5] font-cinzel text-xs border border-[#B58A43] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-[#B58A43]" />
                <span>Demo Video</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}

            {hackathon.projectRepoUrl && (
              <a
                href={hackathon.projectRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded bg-[#24170E] hover:bg-[#38251B] text-[#E2CDA5] font-cinzel text-xs border border-[#B58A43] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Github className="w-3.5 h-3.5 text-[#B58A43]" />
                <span>Code Repository</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}

            <button
              onClick={onClose}
              className="ml-auto px-4 py-2 rounded text-xs font-cinzel text-[#5A3E2B] hover:text-[#211810] cursor-pointer"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

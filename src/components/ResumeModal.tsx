import React, { useState } from 'react';
import { X, Printer, ExternalLink, Scroll, GraduationCap, Briefcase, Award } from 'lucide-react';
import { ProfileData, Skill, Project, HackathonAchievement, ExperienceItem, CertificationItem } from '../types/portfolio';
import { ManuscriptCorner, KolamDivider } from './ManuscriptMotifs';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  skills: Skill[];
  projects: Project[];
  hackathons: HackathonAchievement[];
  experience?: ExperienceItem[];
  certifications?: CertificationItem[];
  onUpdateResumeUrl: (url: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
  skills,
  projects,
  hackathons,
  experience,
  certifications,
  onUpdateResumeUrl,
}) => {
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [resumeUrlInput, setResumeUrlInput] = useState(profile.resumeUrl);

  React.useEffect(() => {
    setResumeUrlInput(profile.resumeUrl);
  }, [profile.resumeUrl]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateResumeUrl(resumeUrlInput.trim());
    setIsEditingUrl(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const isPlaceholder = !profile.resumeUrl || profile.resumeUrl.includes('.placeholder') || profile.resumeUrl.includes('resume.pdf');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl parchment-sheet border-2 border-[#B58A43] rounded-lg shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#211810]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#B58A43]/50 flex items-center justify-between bg-[#E2CDA5]/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#8C3828] border border-[#B58A43] text-[#F3E7CC]">
              <Scroll className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-cinzel text-[#8C3828] uppercase tracking-widest font-bold">
                <span>ARCHIVAL SHASANA • CURRICULUM VITAE</span>
                <span className="text-[#B58A43]" aria-hidden="true">·</span>
                <span className="text-[#38251B]">
                  {isPlaceholder ? 'Inscribed Folio View' : 'Custom PDF Linked'}
                </span>
              </div>
              <h3 id="resume-title" className="font-cinzel text-lg font-bold text-[#211810]">
                {profile.name} — B.Tech CSE (AI & ML)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isPlaceholder && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded bg-[#8C3828] text-[#F3E7CC] text-xs font-cinzel flex items-center gap-1.5 border border-[#B58A43]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Open PDF</span>
              </a>
            )}
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded bg-[#24170E] hover:bg-[#342114] text-[#E2CDA5] text-xs font-cinzel flex items-center gap-1.5 border border-[#B58A43]/50 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#B58A43]" />
              <span className="hidden sm:inline">Print / Save Folio</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#5A3E2B] hover:text-[#8C3828] transition-colors cursor-pointer"
              aria-label="Close résumé dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* URL Notice & Customizer */}
        <div className="px-6 py-2 bg-[#FAF4E5] border-b border-[#B58A43]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-serif text-[#5A3E2B]">
          <div className="flex items-center gap-2">
            <span className="font-cinzel text-[10px] text-[#8C3828] font-bold">PDF INSCRIBED URL:</span>
            <span className="truncate max-w-xs text-[#211810]">{profile.resumeUrl}</span>
          </div>
          <button
            onClick={() => setIsEditingUrl(!isEditingUrl)}
            className="font-cinzel text-[11px] text-[#8C3828] hover:underline cursor-pointer"
          >
            {isEditingUrl ? '[Cancel]' : '[Configure PDF Link]'}
          </button>
        </div>

        {isEditingUrl && (
          <form onSubmit={handleSaveUrl} className="px-6 py-3 bg-[#E2CDA5] border-b border-[#B58A43] flex items-center gap-3 text-xs font-serif">
            <input
              type="url"
              required
              placeholder="https://..."
              value={resumeUrlInput}
              onChange={(e) => setResumeUrlInput(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-[#8C3828] text-[#F3E7CC] font-cinzel text-xs font-bold rounded cursor-pointer"
            >
              Save URL
            </button>
          </form>
        )}

        {/* Document Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 font-serif">
          
          {/* Header block */}
          <div className="border-b border-[#B58A43]/50 pb-5 space-y-1.5 text-center sm:text-left">
            <h1 className="font-cinzel text-2xl sm:text-3xl font-black text-[#211810]">
              {profile.name}
            </h1>
            <p className="font-serif italic text-base text-[#8C3828]">
              {profile.headline}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#5A3E2B] pt-1">
              <span>{profile.email}</span>
              <span>•</span>
              <span>{profile.location}</span>
              <span>•</span>
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-[#8C3828] underline">
                GitHub
              </a>
              <span>•</span>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-[#8C3828] underline">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#8C3828] flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>EDUCATION & ACADEMICS</span>
            </h2>
            <div className="p-4 rounded bg-[#FAF4E5] border border-[#B58A43]/40 space-y-1">
              <div className="flex flex-wrap items-center justify-between text-sm font-bold text-[#211810] font-cinzel">
                <span>{profile.education.degree}</span>
                <span className="text-xs text-[#8C3828]">{profile.education.graduationYear} (Expected)</span>
              </div>
              <p className="text-sm text-[#8C3828] italic">
                {profile.education.specialization}
              </p>
              <p className="text-xs text-[#5A3E2B]">
                {profile.education.institution} {profile.education.cgpaOrGrade && `— Cumulative: ${profile.education.cgpaOrGrade}`}
              </p>
              <div className="pt-1 text-xs text-[#38251B]">
                <strong className="font-cinzel text-[11px] text-[#211810]">Coursework: </strong>
                {profile.education.keyCourses.join(', ')}
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div className="space-y-3">
            <h2 className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#8C3828] flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              <span>FEATURED SOFTWARE CREATIONS</span>
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded bg-[#FAF4E5] border border-[#B58A43]/40 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between text-sm font-bold text-[#211810] font-cinzel">
                    <span>{proj.title}</span>
                    <span className="text-xs text-[#8C3828] italic">{proj.category}</span>
                  </div>
                  <p className="text-xs text-[#8C3828] italic">{proj.tagline}</p>
                  <p className="text-xs sm:text-sm text-[#38251B] leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.tags.map((t) => (
                      <span key={t} className="ink-stamp-gold text-[9px]">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hackathons & Honors */}
          {hackathons.length > 0 && (
            <div className="space-y-2">
              <h2 className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#8C3828] flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>HACKATHONS & MILESTONES</span>
              </h2>
              <div className="space-y-2">
                {hackathons.map((h) => (
                  <div key={h.id} className="p-3 rounded bg-[#FAF4E5] border border-[#B58A43]/40">
                    <div className="flex justify-between items-center text-xs font-cinzel font-bold text-[#211810]">
                      <span>{h.title}</span>
                      <span className="ink-stamp text-[9px]">{h.result}</span>
                    </div>
                    <p className="text-xs text-[#8C3828] italic">{h.event} • {h.date}</p>
                    <p className="text-xs text-[#38251B] mt-1">{h.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

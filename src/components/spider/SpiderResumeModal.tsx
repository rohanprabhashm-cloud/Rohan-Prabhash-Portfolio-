import React, { useEffect } from 'react';
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin, Award, BookOpen, Code2, Briefcase, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

interface SpiderResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpiderResumeModal: React.FC<SpiderResumeModalProps> = ({ isOpen, onClose }) => {
  const { profile, education, skills, projects, achievements } = PORTFOLIO_DATA;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const textContent = `
==============================================================
ROHAN PRABHASH - DOSSIER / CURRICULUM VITAE
==============================================================
Role: AI/ML Student · Developer · Builder
Education: ${education.degree} - ${education.institution} (${education.currentYear}, Exp. ${education.expectedGraduation})
Email: ${profile.email}
GitHub: ${profile.githubUrl}
LinkedIn: ${profile.linkedinUrl}

PROFILE SUMMARY:
${profile.fullBio}

KEY SKILLS:
- Languages: Python, C, JavaScript
- Web Development: React, FastAPI, HTML5, CSS3, Tailwind CSS
- AI & Data: Machine Learning, Artificial Intelligence, SQL
- Tools: Git, GitHub, Cloud Deployments

FEATURED PROJECTS:
${projects.map((p) => `- ${p.name}: ${p.description} (Tech: ${p.technologies.join(', ')})`).join('\n')}

HACKATHON ACHIEVEMENTS:
${achievements.map((a) => `- ${a.eventName} (${a.year}): ${a.status} - ${a.projectName}. ${a.resultDetails}`).join('\n')}
==============================================================
`;
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Rohan_Prabhash_Resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-[#111111] border border-[#2A2A2A] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.95)] my-auto overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dossier Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0D0D0D] border-b border-[#222222]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F02030] shadow-[0_0_8px_#F02030]" />
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#F02030]">
                CURRICULUM VITAE // DOSSIER
              </span>
              <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white">
                ROHAN PRABHASH
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 bg-[#181818] hover:bg-[#222222] text-neutral-300 hover:text-white rounded-lg border border-[#2a2a2a] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Print to PDF"
            >
              <Printer className="w-4 h-4 text-[#F02030]" />
              <span className="hidden sm:inline">PRINT / PDF</span>
            </button>

            <button
              onClick={handleDownload}
              className="p-2 bg-[#F02030] hover:bg-[#d01827] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-[0_0_12px_rgba(240,32,48,0.35)]"
              title="Download text dossier"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">DOWNLOAD</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-[#181818] hover:bg-[#242424] text-neutral-400 hover:text-white flex items-center justify-center border border-[#2a2a2a] cursor-pointer ml-1"
              aria-label="Close resume modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dossier Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-7 bg-[#111111]">
          {/* Identity Header */}
          <div className="border-b border-[#222222] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight uppercase text-white">
                ROHAN PRABHASH
              </h1>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F02030] mt-1">
                AI/ML STUDENT · DEVELOPER · BUILDER
              </p>
              <p className="text-xs text-[#A0A0A0] font-normal max-w-xl mt-2 leading-relaxed">
                {profile.fullBio}
              </p>
            </div>

            <div className="flex flex-col gap-1.5 text-xs font-medium text-neutral-300 sm:border-l border-[#222222] sm:pl-4">
              <span className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F02030]" />
                {profile.email}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F02030]" />
                {profile.location}
              </span>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-300 hover:text-[#F02030]"
              >
                <Code2 className="w-3.5 h-3.5 text-[#F02030]" />
                GitHub: rohanprabhash
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-neutral-300 hover:text-[#F02030]"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#F02030]" />
                LinkedIn: rohanprabhash
              </a>
            </div>
          </div>

          {/* Education Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-[#F02030]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                EDUCATION
              </h3>
            </div>
            <div className="bg-[#161616] border border-[#242424] rounded-xl p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                <span className="font-bold text-sm text-white uppercase">
                  {education.degree}
                </span>
                <span className="text-xs font-mono text-[#F02030] uppercase">
                  {education.currentYear} • Exp. {education.expectedGraduation}
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-medium">{education.institution} — {education.location}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {education.coursework.map((course) => (
                  <span
                    key={course}
                    className="px-2.5 py-0.5 bg-[#1C1C1C] text-[10px] font-medium text-neutral-300 rounded border border-[#2A2A2A]"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#F02030]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                TECHNICAL SKILLS
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-[#161616] border border-[#242424] rounded-xl p-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F02030] block mb-1">
                  PROGRAMMING LANGUAGES
                </span>
                <p className="text-xs font-normal text-neutral-300">
                  Python, C, JavaScript, HTML5, CSS3
                </p>
              </div>

              <div className="bg-[#161616] border border-[#242424] rounded-xl p-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F02030] block mb-1">
                  FULL-STACK & FRAMEWORKS
                </span>
                <p className="text-xs font-normal text-neutral-300">
                  React, FastAPI, Tailwind CSS, Responsive Web Design
                </p>
              </div>

              <div className="bg-[#161616] border border-[#242424] rounded-xl p-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F02030] block mb-1">
                  AI & MACHINE LEARNING
                </span>
                <p className="text-xs font-normal text-neutral-300">
                  Artificial Intelligence, Machine Learning models, Agent Workflows, SQL
                </p>
              </div>

              <div className="bg-[#161616] border border-[#242424] rounded-xl p-3.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F02030] block mb-1">
                  DEVELOPER TOOLS
                </span>
                <p className="text-xs font-normal text-neutral-300">
                  Git, GitHub, VS Code, REST APIs, Linux CLI
                </p>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-4 h-4 text-[#F02030]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                SELECTED PROJECTS
              </h3>
            </div>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#161616] border border-[#242424] rounded-xl p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-sm uppercase text-white">{proj.name}</span>
                    <span className="text-[11px] font-mono text-[#F02030] uppercase">{proj.category}</span>
                  </div>
                  <p className="text-xs text-[#A0A0A0] font-normal mb-2.5">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-[#202020] text-neutral-300 text-[10px] font-medium rounded border border-[#2c2c2c]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hackathons & Accolades */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-[#F02030]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                HACKATHONS & ACHIEVEMENTS
              </h3>
            </div>
            <div className="space-y-3">
              {achievements.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#161616] border border-[#242424] rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs uppercase text-white">{item.eventName}</span>
                    <span className="text-[10px] font-mono font-bold uppercase bg-[#F02030]/20 text-[#F02030] px-2 py-0.5 rounded border border-[#F02030]/40">
                      {item.status} ({item.year})
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-normal">{item.resultDetails}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#0D0D0D] border-t border-[#222222] flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase text-neutral-500">
            DOSSIER RECORD // EARTH-2028
          </span>
          <button
            onClick={handleDownload}
            className="px-5 py-2 rounded-xl bg-[#F02030] hover:bg-[#d01827] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 shadow-[0_0_15px_rgba(240,32,48,0.3)]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD DOSSIER</span>
          </button>
        </div>
      </div>
    </div>
  );
};

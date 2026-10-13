import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Play,
  RefreshCw,
  CheckCircle2,
  ShieldAlert,
  MapPin,
  Navigation,
  Send,
  Bot,
  Calendar,
  DollarSign,
  Compass,
  ArrowRight,
  ExternalLink,
  Code2,
  Layers,
  Cpu,
  GitFork,
  SlidersHorizontal,
  Image as ImageIcon,
  Upload,
  Check,
  Sparkles,
  Trophy,
  Video,
  Feather,
  BookOpen,
} from 'lucide-react';
import { Project } from '../types/portfolio';
import { OyeeFullCoverArt, OyeAssistantFullCoverArt, RoamAgentFullCoverArt, GenericManuscriptCoverArt } from './common/ProjectCard';
import { ManuscriptCorner } from './ManuscriptMotifs';
import { uploadImageApi } from '../services/portfolioApi';

interface ProjectModalProps {
  project: Project | null;
  initialTab?: 'details' | 'simulation' | 'edit';
  onClose: () => void;
  onUpdateProject: (projectId: string, updated: Partial<Project>) => void;
  isAdmin?: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  initialTab = 'details',
  onClose,
  onUpdateProject,
  isAdmin = false,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'simulation' | 'edit'>(initialTab);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);

  // Edit fields state
  const [editTitle, setEditTitle] = useState(project?.title || '');
  const [editTagline, setEditTagline] = useState(project?.tagline || project?.shortDescription || '');
  const [editDescription, setEditDescription] = useState(project?.description || '');
  const [editFullDescription, setEditFullDescription] = useState(project?.fullDescription || project?.description || '');
  const [editProblem, setEditProblem] = useState(project?.problemStatement || '');
  const [editSolution, setEditSolution] = useState(project?.proposedSolution || '');
  const [editTags, setEditTags] = useState((project?.tags || project?.technologies || []).join(', '));
  const [editImageUrl, setEditImageUrl] = useState(project?.imageUrl || project?.coverImage || '');
  const [editGithub, setEditGithub] = useState(project?.githubUrl || '');
  const [editDemo, setEditDemo] = useState(project?.demoUrl || '');
  const [editVideo, setEditVideo] = useState(project?.demoVideoUrl || '');
  const [editRole, setEditRole] = useState(project?.roleAndContributions || '');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (project) {
      setActiveTab(initialTab);
      setEditTitle(project.title);
      setEditTagline(project.tagline || project.shortDescription || '');
      setEditDescription(project.description);
      setEditFullDescription(project.fullDescription || project.description);
      setEditProblem(project.problemStatement || '');
      setEditSolution(project.proposedSolution || '');
      setEditTags((project.tags || project.technologies || []).join(', '));
      setEditImageUrl(project.imageUrl || project.coverImage || '');
      setEditGithub(project.githubUrl);
      setEditDemo(project.demoUrl);
      setEditVideo(project.demoVideoUrl || '');
      setEditRole(project.roleAndContributions || '');
      setSaveSuccess(false);
      setSelectedGalleryImage(null);
    }
  }, [project, initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedGalleryImage) {
          setSelectedGalleryImage(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, selectedGalleryImage]);

  if (!project) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = async (event) => {
        const result = event.target?.result as string;
        if (result) {
          const res = await uploadImageApi(result, file.name);
          setEditImageUrl(res?.url || result);
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTags = editTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onUpdateProject(project.id, {
      title: editTitle.trim(),
      tagline: editTagline.trim(),
      shortDescription: editTagline.trim(),
      description: editDescription.trim(),
      fullDescription: editFullDescription.trim(),
      problemStatement: editProblem.trim() || undefined,
      proposedSolution: editSolution.trim() || undefined,
      roleAndContributions: editRole.trim() || undefined,
      tags: updatedTags.length > 0 ? updatedTags : project.tags,
      technologies: updatedTags.length > 0 ? updatedTags : project.tags,
      imageUrl: editImageUrl.trim() || undefined,
      coverImage: editImageUrl.trim() || undefined,
      githubUrl: editGithub.trim(),
      demoUrl: editDemo.trim(),
      demoVideoUrl: editVideo.trim() || undefined,
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setActiveTab('details');
    }, 900);
  };

  const hasSimulation = project.simulationType && project.simulationType !== 'none';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl parchment-sheet border-2 border-[#B58A43] rounded-lg shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col text-[#211810]">
        <ManuscriptCorner position="top-left" size={26} className="absolute top-2 left-2 opacity-80" />
        <ManuscriptCorner position="top-right" size={26} className="absolute top-2 right-2 opacity-80" />

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#B58A43]/50 flex items-start justify-between bg-[#E2CDA5]/70">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-cinzel text-[#8C3828] uppercase tracking-widest font-bold">
              <span>CREATION DOSSIER • ILLUMINATED TECHNICAL FOLIO</span>
              <span className="text-[#B58A43]" aria-hidden="true">/</span>
              <span className="ink-stamp text-[9px] bg-[#180f08]/90 text-[#E2CDA5]">
                {project.status || project.statusLabel || 'Completed'}
              </span>
              {!project.isPublished && (
                <span className="px-2 py-0.5 rounded bg-amber-900/30 text-amber-900 border border-amber-600/40 text-[9px]">
                  DRAFT
                </span>
              )}
            </div>
            <h3 id="modal-project-title" className="font-cinzel text-xl sm:text-2xl font-bold text-[#211810] flex items-center gap-2 mt-1">
              <span>{project.title}</span>
            </h3>
            <p className="font-serif italic text-xs text-[#8C3828] mt-0.5">
              {project.tagline || project.shortDescription}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5A3E2B] hover:text-[#8C3828] rounded transition-colors cursor-pointer"
            aria-label="Close project details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Strip */}
        <div className="px-6 pt-2 border-b border-[#B58A43]/40 bg-[#FAF4E5] flex flex-wrap items-center justify-between gap-2 font-cinzel text-xs">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-3.5 py-2 font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'details'
                  ? 'border-[#8C3828] text-[#8C3828] font-bold'
                  : 'border-transparent text-[#5A3E2B] hover:text-[#211810]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#8C3828]" />
              <span>Treatise & Architecture</span>
            </button>

            {hasSimulation && (
              <button
                onClick={() => setActiveTab('simulation')}
                className={`px-3.5 py-2 font-medium border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'simulation'
                    ? 'border-[#8C3828] text-[#8C3828] font-bold'
                    : 'border-transparent text-[#5A3E2B] hover:text-[#211810]'
                }`}
              >
                <Play className="w-3.5 h-3.5 text-[#B58A43]" />
                <span>Interactive Simulator</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('edit')}
              className={`px-3.5 py-2 font-medium border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'edit'
                  ? 'border-[#8C3828] text-[#8C3828] font-bold'
                  : 'border-transparent text-[#5A3E2B] hover:text-[#211810]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B58A43]" />
              <span>Customize Specs</span>
            </button>
          </div>

          {(project.startDate || project.completionDate) && (
            <div className="text-[11px] font-serif text-[#8C3828] italic">
              Period: {project.startDate || 'Started'} — {project.completionDate || 'Ongoing'}
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 font-serif">
          
          {/* TAB 1: ARCHITECTURE & DETAILS */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              
              {/* Cover Image / Illustration Banner Preview */}
              <div className="relative h-56 sm:h-64 rounded-lg overflow-hidden border-2 border-[#B58A43]/60 bg-[#160e08] shadow-inner group">
                {project.imageUrl || project.coverImage ? (
                  <img
                    src={project.imageUrl || project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full">
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

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="ink-stamp-gold text-[10px] bg-black/80">
                    {project.imageUrl || project.coverImage ? 'Custom Archival Screenshot' : 'Sacred Vector Yantra Artwork'}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  {project.demoVideoUrl && (
                    <a
                      href={project.demoVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] text-xs font-cinzel flex items-center gap-1.5 border border-[#B58A43] shadow"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Watch Demo Video</span>
                    </a>
                  )}
                  <button
                    onClick={() => setActiveTab('edit')}
                    className="px-3 py-1.5 rounded bg-[#24170E]/90 hover:bg-[#342114] text-[#E2CDA5] text-xs font-cinzel flex items-center gap-1.5 border border-[#B58A43]/70 transition-colors cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-[#B58A43]" />
                    <span>Change Cover</span>
                  </button>
                </div>
              </div>

              {/* Related Hackathon Banner if linked */}
              {project.relatedHackathon && (
                <div className="p-3.5 rounded bg-[#E2CDA5]/70 border border-[#B58A43] flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-[#8C3828]">
                    <Trophy className="w-4 h-4 text-[#B58A43] shrink-0" />
                    <span>
                      <strong>Hackathon Origin:</strong> Built and demonstrated during{' '}
                      <span className="font-cinzel font-bold">{project.relatedHackathon}</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Problem Statement & Proposed Solution Folios */}
              {(project.problemStatement || project.proposedSolution) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.problemStatement && (
                    <div className="p-4 rounded-lg bg-[#FAF4E5] border border-[#8C3828]/40 space-y-2">
                      <div className="font-cinzel text-xs font-bold text-[#8C3828] uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#8C3828]" />
                        <span>The Problem Statement</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#38251B] leading-relaxed">
                        {project.problemStatement}
                      </p>
                    </div>
                  )}

                  {project.proposedSolution && (
                    <div className="p-4 rounded-lg bg-[#FAF4E5] border border-[#B58A43]/50 space-y-2">
                      <div className="font-cinzel text-xs font-bold text-[#211810] uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#B58A43]" />
                        <span>The Proposed Solution</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#38251B] leading-relaxed">
                        {project.proposedSolution}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Full Detailed Description Treatise */}
              <div className="p-5 rounded-lg bg-[#FAF4E5] border border-[#B58A43]/40 space-y-2">
                <div className="font-cinzel text-xs font-bold text-[#8C3828] uppercase tracking-wider">
                  Full Technical Treatise
                </div>
                <p className="text-sm text-[#38251B] leading-relaxed whitespace-pre-line">
                  {project.fullDescription || project.description}
                </p>
              </div>

              {/* Core Features & Architectural Innovations */}
              {((project.features && project.features.length > 0) ||
                (project.architectureHighlights && project.architectureHighlights.length > 0)) && (
                <div className="space-y-3">
                  <div className="font-cinzel text-xs font-bold text-[#211810] tracking-wider uppercase flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#8C3828]" />
                    <span>Key Architectural Innovations & System Capabilities</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(project.features || project.architectureHighlights || []).map((feature, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded bg-[#FAF4E5] border border-[#B58A43]/30 flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#8C3828] shrink-0 mt-0.5" />
                        <p className="text-xs text-[#38251B] leading-relaxed">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Role and Individual Contributions */}
              {project.roleAndContributions && (
                <div className="p-4 rounded-lg bg-[#E2CDA5]/50 border border-[#B58A43]/50 space-y-1.5">
                  <div className="font-cinzel text-xs font-bold text-[#8C3828] uppercase tracking-wider flex items-center gap-1.5">
                    <Feather className="w-3.5 h-3.5 text-[#8C3828]" />
                    <span>My Role & Engineering Contributions</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#38251B] leading-relaxed">
                    {project.roleAndContributions}
                  </p>
                </div>
              )}

              {/* Tech Stack Breakdown */}
              <div className="space-y-2">
                <div className="font-cinzel text-xs font-bold text-[#211810] uppercase tracking-wider flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#8C3828]" />
                  <span>Technologies & Frameworks Inscribed</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  {(project.tags || project.technologies || []).map((tag) => (
                    <span key={tag} className="ink-stamp-gold text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Additional Gallery Screenshots Lightbox */}
              {project.galleryImages && project.galleryImages.length > 0 && (
                <div className="space-y-2">
                  <div className="font-cinzel text-xs font-bold text-[#8C3828] uppercase tracking-wider flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#8C3828]" />
                    <span>Additional Folio Screenshots & Architectural Schematics</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {project.galleryImages.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedGalleryImage(img)}
                        className="rounded border border-[#B58A43] overflow-hidden aspect-video bg-black/10 cursor-pointer hover:border-[#8C3828] hover:shadow-md transition-all"
                      >
                        <img src={img} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Simulation Banner (if project has simulation) */}
              {hasSimulation && (
                <div className="p-4 rounded-lg bg-[#24170E] border-2 border-[#B58A43] text-[#F3E7CC] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
                  <div className="space-y-1">
                    <div className="font-cinzel text-sm font-bold text-[#F3E7CC] flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#B58A43]" />
                      <span>Experience the Living Prototype</span>
                    </div>
                    <p className="text-xs text-[#E2CDA5]/80">
                      Interact with the running algorithm state machine and visual routing logic in real-time.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('simulation')}
                    className="px-4 py-2 bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs font-bold rounded border border-[#B58A43] flex items-center gap-1.5 shrink-0 shadow-md transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Launch Simulator</span>
                  </button>
                </div>
              )}

              {/* Repository & Demo Action Bar */}
              <div className="p-4 rounded-lg bg-[#FAF4E5] border border-[#B58A43]/50 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#24170E] hover:bg-[#342114] text-[#E2CDA5] font-cinzel text-xs border border-[#B58A43] transition-colors"
                    >
                      <GitFork className="w-3.5 h-3.5 text-[#B58A43]" />
                      <span>GitHub Repository</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}

                  {project.demoUrl && !project.isDemoPlaceholder && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs border border-[#B58A43] transition-colors"
                    >
                      <span>Live Deployment</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {project.demoVideoUrl && (
                    <a
                      href={project.demoVideoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#24170E] hover:bg-[#342114] text-[#E2CDA5] font-cinzel text-xs border border-[#B58A43] transition-colors"
                    >
                      <Video className="w-3.5 h-3.5 text-[#B58A43]" />
                      <span>Demo Video</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setActiveTab('edit')}
                  className="font-cinzel text-[#8C3828] hover:underline cursor-pointer flex items-center gap-1 font-bold"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Customize Folio Specs</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: INTERACTIVE LIVE SIMULATION */}
          {activeTab === 'simulation' && (
            <div className="space-y-4">
              <div className="text-xs text-[#5A3E2B] flex items-center justify-between font-cinzel">
                <span>Interactive prototype environment:</span>
                <button
                  onClick={() => setActiveTab('details')}
                  className="text-[#8C3828] hover:underline cursor-pointer font-bold"
                >
                  ← Back to Architecture Dossier
                </button>
              </div>

              {project.simulationType === 'oyee' && <OyeeSimulator />}
              {project.simulationType === 'oye_assistant' && <OyeAssistantSimulator />}
              {project.simulationType === 'roam_agent' && <RoamAgentSimulator />}
            </div>
          )}

          {/* TAB 3: EDIT PROJECT SPECS & MEDIA */}
          {activeTab === 'edit' && (
            <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-serif">
              <div className="p-4 rounded bg-[#E2CDA5]/70 border border-[#B58A43] flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-cinzel text-sm font-bold text-[#211810] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8C3828]" />
                    <span>Customize Creation Dossier & Folio Assets</span>
                  </h4>
                  <p className="text-xs text-[#5A3E2B] mt-1">
                    Update the title, tagline, descriptions, problem formulation, solution, technology tags, and repository links. Changes persist permanently to server storage.
                  </p>
                </div>
                {saveSuccess && (
                  <span className="px-3 py-1 rounded bg-emerald-900 text-emerald-100 font-cinzel text-xs font-bold flex items-center gap-1 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-cinzel font-bold text-[#38251B] mb-1">Creation Title</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
                  />
                </div>

                <div>
                  <label className="block font-cinzel font-bold text-[#38251B] mb-1">Tagline / Summary</label>
                  <input
                    type="text"
                    required
                    value={editTagline}
                    onChange={(e) => setEditTagline(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
                  />
                </div>
              </div>

              {/* Cover Image Upload / URL */}
              <div className="p-3.5 rounded bg-[#FAF4E5] border border-[#B58A43]/50 space-y-2">
                <label className="block font-cinzel font-bold text-[#38251B]">
                  Cover Screenshot or Illustration URL
                </label>
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                  <input
                    type="text"
                    value={editImageUrl}
                    onChange={(e) => setEditImageUrl(e.target.value)}
                    placeholder="https://... or upload local image below"
                    className="flex-1 px-3 py-2 bg-[#F3E7CC] border border-[#B58A43] rounded text-[#211810] text-xs w-full"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-3 py-2 rounded bg-[#24170E] hover:bg-[#342114] text-[#E2CDA5] font-cinzel text-xs border border-[#B58A43] cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#B58A43]" />
                    <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                  </button>
                  {editImageUrl && (
                    <button
                      type="button"
                      onClick={() => setEditImageUrl('')}
                      className="px-2.5 py-2 rounded bg-[#FAF4E5] text-[#8C3828] border border-[#8C3828]/50 text-xs font-cinzel"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Problem & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-cinzel font-bold text-[#8C3828] mb-1">Problem Statement</label>
                  <textarea
                    rows={3}
                    value={editProblem}
                    onChange={(e) => setEditProblem(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
                  />
                </div>
                <div>
                  <label className="block font-cinzel font-bold text-[#B58A43] mb-1">Proposed Solution</label>
                  <textarea
                    rows={3}
                    value={editSolution}
                    onChange={(e) => setEditSolution(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
                  />
                </div>
              </div>

              {/* Full Treatise */}
              <div>
                <label className="block font-cinzel font-bold text-[#38251B] mb-1">Detailed Treatise Text</label>
                <textarea
                  rows={3}
                  value={editFullDescription}
                  onChange={(e) => setEditFullDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
                />
              </div>

              {/* Role & Technologies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-cinzel font-bold text-[#38251B] mb-1">My Role & Contributions</label>
                  <input
                    type="text"
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
                  />
                </div>
                <div>
                  <label className="block font-cinzel font-bold text-[#38251B] mb-1">Technologies (Comma-separated)</label>
                  <input
                    type="text"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
                  />
                </div>
              </div>

              {/* Repository, Demo & Video */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-cinzel font-bold text-[#38251B] mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={editGithub}
                    onChange={(e) => setEditGithub(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
                  />
                </div>
                <div>
                  <label className="block font-cinzel font-bold text-[#38251B] mb-1">Live Demo URL</label>
                  <input
                    type="text"
                    value={editDemo}
                    onChange={(e) => setEditDemo(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
                  />
                </div>
                <div>
                  <label className="block font-cinzel font-bold text-[#38251B] mb-1">Demo Video URL</label>
                  <input
                    type="text"
                    value={editVideo}
                    onChange={(e) => setEditVideo(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#B58A43]/40 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className="px-4 py-2 font-cinzel text-xs text-[#5A3E2B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs font-bold border border-[#B58A43] shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Specifications</span>
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Gallery Image Lightbox Overlay */}
        {selectedGalleryImage && (
          <div
            className="fixed inset-0 z-60 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setSelectedGalleryImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh]">
              <img
                src={selectedGalleryImage}
                alt="Enlarged schematic"
                className="max-w-full max-h-[85vh] object-contain rounded border-2 border-[#B58A43]"
              />
              <button
                onClick={() => setSelectedGalleryImage(null)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-[#8C3828]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};


/* --- OYEE Multi-Order Routing Simulator --- */
const OyeeSimulator: React.FC = () => {
  const [orders, setOrders] = useState([
    { id: 'ORD-101', customer: 'Apartment Complex A', x: 28, y: 35, status: 'batched', eta: '14 min' },
    { id: 'ORD-102', customer: 'Tech Park Campus B', x: 65, y: 25, status: 'batched', eta: '22 min' },
    { id: 'ORD-103', customer: 'Residential Enclave C', x: 75, y: 70, status: 'batched', eta: '31 min' },
  ]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimized, setOptimized] = useState(true);

  const handleAddOrder = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    const newId = `ORD-${Math.floor(100 + Math.random() * 900)}`;
    setOrders((prev) => [
      ...prev,
      { id: newId, customer: `Customer Zone #${prev.length + 1}`, x, y, status: 'pending', eta: 'TBD' },
    ]);
    setOptimized(false);
  };

  const runOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setOptimized(true);
    }, 600);
  };

  const resetMap = () => {
    setOrders([
      { id: 'ORD-101', customer: 'Apartment Complex A', x: 28, y: 35, status: 'batched', eta: '14 min' },
      { id: 'ORD-102', customer: 'Tech Park Campus B', x: 65, y: 25, status: 'batched', eta: '22 min' },
      { id: 'ORD-103', customer: 'Residential Enclave C', x: 75, y: 70, status: 'batched', eta: '31 min' },
    ]);
    setOptimized(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <p className="text-[#38251B]">
          <strong className="text-[#8C3828] font-cinzel">Interactive Cartographic Grid:</strong> Click anywhere on the map grid below to inscribe customer delivery waypoints. Run route optimization to cluster nodes.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={resetMap}
            className="px-2.5 py-1.5 bg-[#24170E] hover:bg-[#342114] text-[#E2CDA5] rounded flex items-center gap-1 cursor-pointer font-cinzel text-xs border border-[#B58A43]/50"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#B58A43]" />
            <span>Reset</span>
          </button>
          <button
            onClick={runOptimization}
            disabled={isOptimizing}
            className="px-3 py-1.5 bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs font-semibold rounded flex items-center gap-1 cursor-pointer border border-[#B58A43]"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isOptimizing ? 'Calculating TSP...' : 'Optimize Route'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Map Visualizer */}
      <div className="relative h-64 sm:h-72 rounded-lg bg-[#160e08] border-2 border-[#B58A43]/60 overflow-hidden cursor-crosshair select-none">
        <svg className="w-full h-full" onClick={handleAddOrder}>
          {/* Central Kitchen Hub */}
          <circle cx="15%" cy="80%" r="8" fill="#8C3828" stroke="#B58A43" strokeWidth="2" />
          <text x="15%" y="90%" fill="#E2CDA5" fontSize="10" textAnchor="middle" fontFamily="'Cinzel', serif">
            KITCHEN HUB
          </text>

          {/* Optimized Route Polyline */}
          {optimized && orders.length > 0 && (
            <polyline
              points={`15,80 ${orders.map((o) => `${o.x},${o.y}`).join(' ')}`}
              fill="none"
              stroke="#B58A43"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
          )}

          {/* Delivery Nodes */}
          {orders.map((ord, idx) => (
            <g key={ord.id}>
              <circle
                cx={`${ord.x}%`}
                cy={`${ord.y}%`}
                r="6"
                fill="#211810"
                stroke="#B58A43"
                strokeWidth="2"
              />
              <circle cx={`${ord.x}%`} cy={`${ord.y}%`} r="3" fill="#8C3828" />
              <text
                x={`${ord.x}%`}
                y={`${ord.y - 3}%`}
                fill="#F3E7CC"
                fontSize="10"
                textAnchor="middle"
                fontFamily="'Cinzel', serif"
              >
                #{idx + 1} {ord.id}
              </text>
            </g>
          ))}
        </svg>

        <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-[#24170E]/90 rounded border border-[#B58A43]/60 text-[10px] font-cinzel text-[#E2CDA5]">
          Tap anywhere to add delivery waypoint
        </div>
      </div>

      {/* Safety & Metrics Console */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3 rounded bg-[#FAF4E5] border border-[#B58A43]/40">
          <span className="text-[#8C3828] font-cinzel block mb-1">Batched Orders:</span>
          <span className="text-[#211810] font-cinzel text-base font-bold">
            {orders.length} Active Drops
          </span>
        </div>
        <div className="p-3 rounded bg-[#FAF4E5] border border-[#B58A43]/40">
          <span className="text-[#8C3828] font-cinzel block mb-1">Route Cluster Efficiency:</span>
          <span className="text-[#B58A43] font-cinzel text-base font-bold">
            {optimized ? '+28.4% Transit Saved' : 'Pending Calculation'}
          </span>
        </div>
        <div className="p-3 rounded bg-[#FAF4E5] border border-[#B58A43]/40">
          <span className="text-[#8C3828] font-cinzel block mb-1">Rider Safety Protocol:</span>
          <span className="text-emerald-700 font-cinzel text-sm font-bold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Enforced & Monitored</span>
          </span>
        </div>
      </div>
    </div>
  );
};

/* --- Oye AI Assistant Simulator --- */
const OyeAssistantSimulator: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; action?: string }>>([
    {
      role: 'assistant',
      text: "Namaste! I am the Oye AI Assistant daemon. Ready to demonstrate conversational research, desktop scripting, or coding tasks.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const quickPrompts = [
    "Summarize CNN Backpropagation",
    "Inspect local project workspace",
    "Generate Python route cluster script",
    "List upcoming hackathon deliverables",
  ];

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;
    const q = userText.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: q }]);
    setIsProcessing(true);

    setTimeout(() => {
      let reply = "";
      let actionTag = "";

      if (q.toLowerCase().includes('cnn') || q.toLowerCase().includes('backpropagation')) {
        reply = "Backpropagation calculates gradients of the loss function with respect to layer weights using the chain rule. In CNNs, gradients flow back through pooling and convolutional feature maps.";
        actionTag = "Intent: AI/ML Vidya Retrieval";
      } else if (q.toLowerCase().includes('route') || q.toLowerCase().includes('python')) {
        reply = "Synthesized Python waypoint cluster module using scipy.spatial and Dijkstra priority queues with clean time-complexity bounds.";
        actionTag = "Intent: Code Generation & Execution";
      } else if (q.toLowerCase().includes('hackathon') || q.toLowerCase().includes('deliverable')) {
        reply = "Checked schedule: 1) Refine OYEE route algorithm demo, 2) Prepare presentation slide deck for finals, 3) Verify portfolio deployment.";
        actionTag = "Intent: Task Planning & Schedule";
      } else {
        reply = `Understood: "${q}". Intent parsed and routed through local memory context. Assistant state ready for command pipeline.`;
        actionTag = "Intent: Conversational Assistant";
      }

      setMessages((prev) => [...prev, { role: 'assistant', text: reply, action: actionTag }]);
      setIsProcessing(false);
    }, 500);
  };

  return (
    <div className="space-y-4 font-serif">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-[#5A3E2B]">Try prompt inquiries:</span>
        {quickPrompts.map((p) => (
          <button
            key={p}
            onClick={() => handleSend(p)}
            className="px-2.5 py-1 rounded bg-[#24170E] hover:bg-[#342114] text-[11px] font-cinzel text-[#E2CDA5] transition-colors cursor-pointer border border-[#B58A43]/40"
          >
            {p}
          </button>
        ))}
      </div>

      <div className="h-64 sm:h-72 rounded-lg bg-[#160e08] border-2 border-[#B58A43]/60 p-4 overflow-y-auto space-y-3 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <span className="text-[10px] font-cinzel text-[#B58A43] mb-0.5">
              {m.role === 'user' ? 'YOU' : 'OYE_ASSISTANT'}
            </span>
            <div
              className={`p-3 rounded-lg max-w-[85%] leading-relaxed ${
                m.role === 'user'
                  ? 'bg-[#8C3828] text-[#F3E7CC] border border-[#B58A43]'
                  : 'bg-[#24170E] text-[#E2CDA5] border border-[#B58A43]/40'
              }`}
            >
              <p>{m.text}</p>
              {m.action && (
                <div className="mt-2 pt-1 border-t border-[#B58A43]/30 text-[10px] font-cinzel text-[#B58A43]">
                  {m.action}
                </div>
              )}
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="text-xs text-[#B58A43] animate-pulse font-cinzel">
            Oye Assistant is parsing cognitive intent...
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Inscribe message to Oye AI Assistant..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
          className="flex-1 px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] text-xs outline-none"
        />
        <button
          onClick={() => handleSend(input)}
          className="px-3.5 py-2 bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel font-semibold rounded text-xs flex items-center gap-1 cursor-pointer border border-[#B58A43]"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};

/* --- RoamAgent Travel Concierge Simulator --- */
const RoamAgentSimulator: React.FC = () => {
  const [destination, setDestination] = useState('Kyoto & Tokyo, Japan');
  const [days, setDays] = useState(4);
  const [budgetTier, setBudgetTier] = useState<'Moderate' | 'Budget' | 'Luxury'>('Moderate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<Array<{ day: number; title: string; activities: string[]; budgetEst: string }>>([
    {
      day: 1,
      title: 'Arrival & Shibuya Cyber Pulse',
      activities: ['Airport express transit to Shibuya', 'Shibuya Sky Observatory', 'Ramen tasting in Omoide Yokocho'],
      budgetEst: '$95',
    },
    {
      day: 2,
      title: 'Cultural Heritage & Akihabara Tech',
      activities: ['Senso-ji Temple early morning', 'Ueno Park walk', 'Akihabara electronics exploration'],
      budgetEst: '$80',
    },
    {
      day: 3,
      title: 'Bullet Train Transit to Kyoto',
      activities: ['Shinkansen bullet train', 'Fushimi Inari Taisha torii gates', 'Gion evening walking tour'],
      budgetEst: '$160',
    },
    {
      day: 4,
      title: 'Arashiyama Bamboo & Zen Return',
      activities: ['Arashiyama bamboo grove sunrise', 'Tenryu-ji zen temple gardens', 'Return departure staging'],
      budgetEst: '$70',
    },
  ]);

  const generateItinerary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setItinerary([
        {
          day: 1,
          title: `Arrival & City Center Orientation in ${destination}`,
          activities: ['Rapid transit to lodging', 'Local market walking tour', 'Welcome dinner at top-rated local bistro'],
          budgetEst: budgetTier === 'Budget' ? '$45' : budgetTier === 'Moderate' ? '$85' : '$190',
        },
        {
          day: 2,
          title: 'Signature Historic Landmarks & Architecture',
          activities: ['Historic museum / palace visit', 'Scenic botanical garden stroll', 'Sunset photography vantage point'],
          budgetEst: budgetTier === 'Budget' ? '$35' : budgetTier === 'Moderate' ? '$70' : '$150',
        },
        {
          day: 3,
          title: 'Culinary & Culture Exploration',
          activities: ['Art gallery & design district', 'Coffee & street food sampling', 'Evening walking tour'],
          budgetEst: budgetTier === 'Budget' ? '$40' : budgetTier === 'Moderate' ? '$75' : '$170',
        },
        ...(days >= 4
          ? [
              {
                day: 4,
                title: 'Day Excursion & Nature Retreat',
                activities: ['Transit to nearby coastal/mountain trail', 'Panoramic lunch', 'Evening market souvenir stop'],
                budgetEst: budgetTier === 'Budget' ? '$50' : budgetTier === 'Moderate' ? '$95' : '$220',
              },
            ]
          : []),
      ]);
    }, 600);
  };

  return (
    <div className="space-y-4 text-xs font-serif">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3.5 rounded bg-[#FAF4E5] border border-[#B58A43]/50">
        <div>
          <label className="block text-[#38251B] font-cinzel mb-1">Destination</label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-[#F3E7CC] border border-[#B58A43] rounded text-[#211810]"
          >
            <option value="Kyoto & Tokyo, Japan">Kyoto & Tokyo, Japan</option>
            <option value="Zurich & Interlaken, Switzerland">Zurich & Interlaken, Switzerland</option>
            <option value="Bengaluru & Coorg, India">Bengaluru & Coorg, India</option>
            <option value="San Francisco & Yosemite, USA">San Francisco & Yosemite, USA</option>
          </select>
        </div>

        <div>
          <label className="block text-[#38251B] font-cinzel mb-1">Trip Duration</label>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full px-2.5 py-1.5 bg-[#F3E7CC] border border-[#B58A43] rounded text-[#211810]"
          >
            <option value={3}>3 Days</option>
            <option value={4}>4 Days</option>
            <option value={5}>5 Days</option>
          </select>
        </div>

        <div>
          <label className="block text-[#38251B] font-cinzel mb-1">Budget Tier</label>
          <select
            value={budgetTier}
            onChange={(e) => setBudgetTier(e.target.value as any)}
            className="w-full px-2.5 py-1.5 bg-[#F3E7CC] border border-[#B58A43] rounded text-[#211810]"
          >
            <option value="Budget">Student / Budget</option>
            <option value="Moderate">Balanced / Moderate</option>
            <option value="Luxury">Premium / Luxury</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={generateItinerary}
            disabled={isGenerating}
            className="w-full py-1.5 px-3 bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs font-semibold rounded flex items-center justify-center gap-1.5 cursor-pointer border border-[#B58A43]"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'Synthesizing...' : 'Synthesize Charter'}</span>
          </button>
        </div>
      </div>

      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
        {itinerary.map((item) => (
          <div
            key={item.day}
            className="p-3.5 rounded bg-[#FAF4E5] border border-[#B58A43]/40 space-y-1.5"
          >
            <div className="flex items-center justify-between font-cinzel">
              <span className="text-[#8C3828] font-bold">
                Day 0{item.day}: {item.title}
              </span>
              <span className="text-[#38251B] font-semibold">
                Est. Daily Budget: {item.budgetEst}
              </span>
            </div>
            <ul className="space-y-1 text-[#38251B] text-[11px] list-disc list-inside">
              {item.activities.map((act, i) => (
                <li key={i}>{act}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

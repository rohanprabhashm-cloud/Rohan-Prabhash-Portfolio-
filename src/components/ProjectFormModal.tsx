import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Save,
  Eye,
  Edit3,
  Upload,
  Plus,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Github,
  Play,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Project, ProjectCategory, ProjectStatus } from '../types/portfolio';
import { ManuscriptCorner } from './ManuscriptMotifs';
import { uploadImageApi } from '../services/portfolioApi';

interface ProjectFormModalProps {
  isOpen: boolean;
  project?: Project | null; // null means adding a new project
  onClose: () => void;
  onSave: (projectData: Partial<Project>) => Promise<void> | void;
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  isOpen,
  project,
  onClose,
  onSave,
}) => {
  const isEditing = Boolean(project);

  // Form State
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [proposedSolution, setProposedSolution] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('ai_ml');
  const [status, setStatus] = useState<ProjectStatus>('In Development');
  const [startDate, setStartDate] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [demoVideoUrl, setDemoVideoUrl] = useState('');
  const [relatedHackathon, setRelatedHackathon] = useState('');
  const [roleAndContributions, setRoleAndContributions] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  // Features List
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');

  // Technologies / Tags
  const [tagsStr, setTagsStr] = useState('');

  // Additional Gallery Images
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  const [isUploading, setIsUploading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (project) {
      setTitle(project.title || '');
      setTagline(project.tagline || project.shortDescription || '');
      setDescription(project.description || '');
      setFullDescription(project.fullDescription || project.description || '');
      setProblemStatement(project.problemStatement || '');
      setProposedSolution(project.proposedSolution || '');
      setCategory(project.category || 'ai_ml');
      setStatus(project.status || 'In Development');
      setStartDate(project.startDate || '');
      setCompletionDate(project.completionDate || '');
      setGithubUrl(project.githubUrl || '');
      setDemoUrl(project.demoUrl || '');
      setDemoVideoUrl(project.demoVideoUrl || '');
      setRelatedHackathon(project.relatedHackathon || '');
      setRoleAndContributions(project.roleAndContributions || '');
      setCoverImageUrl(project.imageUrl || project.coverImage || '');
      setIsPublished(project.isPublished !== undefined ? project.isPublished : true);
      setFeatures(project.features || project.architectureHighlights || []);
      setTagsStr((project.tags || project.technologies || []).join(', '));
      setGalleryImages(project.galleryImages || []);
    } else {
      // Defaults for new project
      setTitle('');
      setTagline('');
      setDescription('');
      setFullDescription('');
      setProblemStatement('');
      setProposedSolution('');
      setCategory('ai_ml');
      setStatus('In Development');
      setStartDate('');
      setCompletionDate('');
      setGithubUrl('https://github.com/rohanprabhash/');
      setDemoUrl('');
      setDemoVideoUrl('');
      setRelatedHackathon('');
      setRoleAndContributions('');
      setCoverImageUrl('');
      setIsPublished(true);
      setFeatures([]);
      setTagsStr('Python, React, TypeScript, AI/ML');
      setGalleryImages([]);
    }
    setActiveTab('form');
    setValidationError(null);
  }, [project, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        const uploadResult = await uploadImageApi(dataUrl, file.name);
        if (uploadResult?.url) {
          setCoverImageUrl(uploadResult.url);
        } else {
          setCoverImageUrl(dataUrl);
        }
      }
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleAddGalleryImage = () => {
    if (newGalleryUrl.trim()) {
      setGalleryImages([...galleryImages, newGalleryUrl.trim()]);
      setNewGalleryUrl('');
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      setValidationError('Project Title is required.');
      return;
    }
    if (!description.trim() && !tagline.trim()) {
      setValidationError('Please provide at least a short description or tagline.');
      return;
    }

    const tags = tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const projectPayload: Partial<Project> = {
      title: title.trim(),
      tagline: tagline.trim() || title.trim(),
      shortDescription: tagline.trim() || description.trim().slice(0, 120),
      description: description.trim() || tagline.trim(),
      fullDescription: fullDescription.trim() || description.trim(),
      problemStatement: problemStatement.trim(),
      proposedSolution: proposedSolution.trim(),
      features: features.length > 0 ? features : undefined,
      architectureHighlights: features.length > 0 ? features : undefined,
      tags: tags.length > 0 ? tags : ['Software Engineering'],
      technologies: tags.length > 0 ? tags : ['Software Engineering'],
      category,
      status,
      statusLabel: status,
      startDate: startDate.trim() || undefined,
      completionDate: completionDate.trim() || undefined,
      githubUrl: githubUrl.trim(),
      demoUrl: demoUrl.trim(),
      demoVideoUrl: demoVideoUrl.trim() || undefined,
      relatedHackathon: relatedHackathon.trim() || undefined,
      roleAndContributions: roleAndContributions.trim() || undefined,
      imageUrl: coverImageUrl.trim() || undefined,
      coverImage: coverImageUrl.trim() || undefined,
      galleryImages: galleryImages.length > 0 ? galleryImages : undefined,
      isPublished,
      isGithubPlaceholder: !githubUrl || githubUrl.includes('.placeholder'),
      isDemoPlaceholder: !demoUrl || demoUrl.includes('.placeholder'),
    };

    await onSave(projectPayload);
    onClose();
  };

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

        {/* Header */}
        <div className="px-6 py-4 border-b border-[#B58A43]/50 flex items-center justify-between bg-[#E2CDA5]/70">
          <div>
            <div className="font-cinzel text-[10px] text-[#8C3828] uppercase tracking-widest font-bold">
              SCRIBE SANCTUM • ARCHIVE ENTRY
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#211810]">
              {isEditing ? `Edit Creation: ${project?.title}` : 'Inscribe New Creation Artifact'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5A3E2B] hover:text-[#8C3828] rounded cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Strip: Form vs Live Preview */}
        <div className="px-6 pt-2 border-b border-[#B58A43]/40 bg-[#FAF4E5] flex items-center justify-between font-cinzel text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('form')}
              className={`px-3.5 py-2 font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'form'
                  ? 'border-[#8C3828] text-[#8C3828] font-bold'
                  : 'border-transparent text-[#5A3E2B] hover:text-[#211810]'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Dossier Fields</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3.5 py-2 font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'preview'
                  ? 'border-[#8C3828] text-[#8C3828] font-bold'
                  : 'border-transparent text-[#5A3E2B] hover:text-[#211810]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Folio Preview</span>
            </button>
          </div>

          <div className="flex items-center gap-2 pb-1">
            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-serif text-[#38251B]">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="rounded accent-[#8C3828]"
              />
              <span className={isPublished ? 'font-bold text-[#8C3828]' : 'text-[#8C3828]/70 italic'}>
                {isPublished ? 'Published to Public' : 'Saved as Private Draft'}
              </span>
            </label>
          </div>
        </div>

        {/* Form Body */}
        {activeTab === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 font-serif text-xs sm:text-sm">
            {validationError && (
              <div className="p-3 rounded bg-red-100/90 border border-red-300 text-red-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-700" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Section 1: Title, Category & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-6 space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. OYEE Route Engine"
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] focus:ring-1 focus:ring-[#8C3828] outline-none"
                />
              </div>

              <div className="sm:col-span-3 space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Archival Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] focus:ring-1 focus:ring-[#8C3828] outline-none"
                >
                  <option value="ai_ml">AI & Machine Learning</option>
                  <option value="ai_agents">AI Agents</option>
                  <option value="web_dev">Web Development</option>
                  <option value="mobile_apps">Mobile Applications</option>
                  <option value="hackathon_projects">Hackathon Projects</option>
                  <option value="experiments">Other Experiments</option>
                </select>
              </div>

              <div className="sm:col-span-3 space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Current Status *
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] focus:ring-1 focus:ring-[#8C3828] outline-none"
                >
                  <option value="Planning">Planning</option>
                  <option value="In Development">In Development</option>
                  <option value="Completed">Completed</option>
                  <option value="Published">Published</option>
                  <option value="Hackathon Project">Hackathon Project</option>
                </select>
              </div>
            </div>

            {/* Short Tagline / Hook */}
            <div className="space-y-1">
              <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                Short Tagline / Summary (Shown on Card Front) *
              </label>
              <input
                type="text"
                required
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Intelligent Multi-Order Route Optimization Platform"
                className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] focus:ring-1 focus:ring-[#8C3828] outline-none"
              />
            </div>

            {/* Summary & Detailed Treatise */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Brief Overview *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Concise overview of what this creation accomplishes..."
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] focus:ring-1 focus:ring-[#8C3828] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Full Detailed Treatise
                </label>
                <textarea
                  rows={3}
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  placeholder="In-depth explanation of internal systems, architecture, and theoretical formulation..."
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] focus:ring-1 focus:ring-[#8C3828] outline-none"
                />
              </div>
            </div>

            {/* Problem Statement & Proposed Solution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#8C3828]">
                  Problem Statement
                </label>
                <textarea
                  rows={3}
                  value={problemStatement}
                  onChange={(e) => setProblemStatement(e.target.value)}
                  placeholder="What friction, algorithmic bottleneck, or real-world challenge was this designed to solve?"
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] focus:ring-1 focus:ring-[#8C3828] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#B58A43]">
                  Proposed Solution
                </label>
                <textarea
                  rows={3}
                  value={proposedSolution}
                  onChange={(e) => setProposedSolution(e.target.value)}
                  placeholder="How does your architecture, algorithm, or interface resolve this problem?"
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] focus:ring-1 focus:ring-[#8C3828] outline-none"
                />
              </div>
            </div>

            {/* Key Features List */}
            <div className="space-y-2">
              <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                Key Architectural Features
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                  placeholder="e.g. Dynamic waypoint clustering with Dijkstra approximation"
                  className="flex-1 px-3 py-1.5 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-3 py-1.5 rounded bg-[#24170E] hover:bg-[#38251B] text-[#E2CDA5] font-cinzel text-xs border border-[#B58A43] cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {features.length > 0 && (
                <ul className="space-y-1.5 mt-2 bg-[#FAF4E5] p-2.5 rounded border border-[#B58A43]/40">
                  {features.map((feat, idx) => (
                    <li key={idx} className="flex items-center justify-between text-xs text-[#38251B] py-0.5">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8C3828]" />
                        <span>{feat}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-[#8C3828] hover:text-red-700 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Technologies Used (Tags) & Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Technologies Used (Comma-separated)
                </label>
                <input
                  type="text"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  placeholder="Python, React, Node.js, PyTorch, Tailwind CSS"
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  My Role & Contributions
                </label>
                <input
                  type="text"
                  value={roleAndContributions}
                  onChange={(e) => setRoleAndContributions(e.target.value)}
                  placeholder="e.g. Lead Algorithmic Engineer & Full-Stack Architect"
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] text-xs"
                />
              </div>
            </div>

            {/* Dates & Related Hackathon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Start Date
                </label>
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="e.g. Jul 2024"
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Completion Date
                </label>
                <input
                  type="text"
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                  placeholder="e.g. Present or Oct 2024"
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Related Hackathon (Optional)
                </label>
                <input
                  type="text"
                  value={relatedHackathon}
                  onChange={(e) => setRelatedHackathon(e.target.value)}
                  placeholder="e.g. National Smart Mobility Hackathon"
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] text-xs"
                />
              </div>
            </div>

            {/* Links & URLs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  GitHub Repository URL
                </label>
                <input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/rohanprabhash/..."
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Live Demo URL
                </label>
                <input
                  type="text"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://... (or demo placeholder)"
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Demo Video URL (YouTube/Loom)
                </label>
                <input
                  type="text"
                  value={demoVideoUrl}
                  onChange={(e) => setDemoVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/... or loom.com/..."
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] text-xs"
                />
              </div>
            </div>

            {/* Cover Image & File Upload */}
            <div className="space-y-2 p-3.5 bg-[#FAF4E5] rounded border border-[#B58A43]/50">
              <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                Cover Image or Screenshot
              </label>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <input
                  type="text"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  placeholder="Paste image URL (https://...) or upload an image below"
                  className="flex-1 px-3 py-2 bg-[#F3E7CC] border border-[#B58A43] rounded text-[#211810] text-xs w-full"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-3 py-2 rounded bg-[#24170E] hover:bg-[#38251B] text-[#E2CDA5] font-cinzel text-xs border border-[#B58A43] cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <Upload className="w-3.5 h-3.5 text-[#B58A43]" />
                  <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
                </button>
              </div>

              {coverImageUrl && (
                <div className="mt-2 relative w-32 h-20 rounded border border-[#B58A43] overflow-hidden bg-black/20">
                  <img src={coverImageUrl} alt="Cover preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setCoverImageUrl('')}
                    className="absolute top-1 right-1 bg-black/70 text-white rounded p-0.5 hover:bg-red-700"
                    title="Remove image"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Additional Gallery Screenshots */}
            <div className="space-y-2">
              <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                Additional Screenshots & Diagrams (Optional)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newGalleryUrl}
                  onChange={(e) => setNewGalleryUrl(e.target.value)}
                  placeholder="Add screenshot URL..."
                  className="flex-1 px-3 py-1.5 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddGalleryImage}
                  className="px-3 py-1.5 rounded bg-[#24170E] text-[#E2CDA5] font-cinzel text-xs border border-[#B58A43] cursor-pointer"
                >
                  Add Image
                </button>
              </div>

              {galleryImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {galleryImages.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-14 rounded border border-[#B58A43] overflow-hidden">
                      <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(idx)}
                        className="absolute top-0.5 right-0.5 bg-black/70 text-white rounded p-0.5 hover:bg-red-700"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#B58A43]/50">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-cinzel text-[#5A3E2B] hover:text-[#211810] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs font-bold border border-[#B58A43] shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Save Changes' : 'Inscribe Creation'}</span>
              </button>
            </div>
          </form>
        ) : (
          /* Live Preview Tab */
          <div className="p-6 overflow-y-auto space-y-6">
            <div className="p-4 bg-[#FAF4E5] rounded border border-[#B58A43]/60 text-xs font-serif text-[#5A3E2B] flex items-center justify-between">
              <span>This is how your creation card and treatise folio appear in the archive.</span>
              <button
                type="button"
                onClick={() => setActiveTab('form')}
                className="font-cinzel text-[#8C3828] underline font-bold"
              >
                Return to Editor
              </button>
            </div>

            {/* Preview Card Mock */}
            <div className="max-w-md mx-auto rounded-lg overflow-hidden border-2 border-[#B58A43] bg-[#24170E] text-[#F3E7CC] p-5 shadow-2xl relative">
              <div className="flex items-center justify-between text-[10px] font-cinzel text-[#B58A43] mb-2">
                <span className="ink-stamp-gold">{category.replace('_', ' ').toUpperCase()}</span>
                <span className="ink-stamp">{status}</span>
              </div>
              <h4 className="font-cinzel text-xl font-bold text-[#F3E7CC]">{title || 'Untitled Creation'}</h4>
              <p className="font-serif italic text-xs text-[#E2CDA5] mt-1">{tagline || 'Short summary...'}</p>
              <p className="font-serif text-xs text-[#C7A878] mt-2 line-clamp-2">{description}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {tagsStr.split(',').filter(Boolean).map((t, i) => (
                  <span key={i} className="ink-stamp-gold text-[9px]">{t.trim()}</span>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#B58A43]/40">
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded bg-[#8C3828] text-[#F3E7CC] font-cinzel text-xs font-bold border border-[#B58A43] flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Approve & Inscribe</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

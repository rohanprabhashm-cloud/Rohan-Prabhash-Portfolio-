import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Save,
  Trophy,
  Calendar,
  MapPin,
  Users,
  Award,
  Link as LinkIcon,
  Upload,
  Plus,
  Trash2,
  AlertCircle,
  Eye,
  Edit3,
} from 'lucide-react';
import { HackathonAchievement, HackathonResultStatus, TeamMember } from '../types/portfolio';
import { ManuscriptCorner } from './ManuscriptMotifs';
import { uploadImageApi } from '../services/portfolioApi';

interface HackathonFormModalProps {
  isOpen: boolean;
  hackathon?: HackathonAchievement | null; // null means adding a new hackathon
  onClose: () => void;
  onSave: (data: Partial<HackathonAchievement>) => Promise<void> | void;
}

export const HackathonFormModal: React.FC<HackathonFormModalProps> = ({
  isOpen,
  hackathon,
  onClose,
  onSave,
}) => {
  const isEditing = Boolean(hackathon);
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  // Form Fields
  const [title, setTitle] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [projectSubmitted, setProjectSubmitted] = useState('');
  const [teamName, setTeamName] = useState('');
  const [myRoleAndContribution, setMyRoleAndContribution] = useState('');
  const [tagsStr, setTagsStr] = useState('');
  const [resultStatus, setResultStatus] = useState<HackathonResultStatus>('Participating');
  const [awardTitle, setAwardTitle] = useState('');
  const [description, setDescription] = useState('');
  const [certificateUrl, setCertificateUrl] = useState('');
  const [pitchDeckUrl, setPitchDeckUrl] = useState('');
  const [demoVideoUrl, setDemoVideoUrl] = useState('');
  const [projectRepoUrl, setProjectRepoUrl] = useState('');
  const [notesAndLearnings, setNotesAndLearnings] = useState('');
  const [isVerified, setIsVerified] = useState(true);
  const [isPublished, setIsPublished] = useState(true);

  // Dynamic Team Members & Roles
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');

  // Photos from the event
  const [eventPhotos, setEventPhotos] = useState<string[]>([]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  const [validationError, setValidationError] = useState<string | null>(null);
  const certFileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (hackathon) {
      setTitle(hackathon.title || hackathon.hackathonName || '');
      setOrganizer(hackathon.event || hackathon.organizer || '');
      setEventDate(hackathon.date || hackathon.eventDate || '');
      setLocation(hackathon.location || '');
      setProblemStatement(hackathon.problemStatement || '');
      setProjectSubmitted(hackathon.projectSubmitted || '');
      setTeamName(hackathon.teamName || '');
      setMyRoleAndContribution(hackathon.myRoleAndContribution || '');
      setTagsStr((hackathon.tags || hackathon.technologies || []).join(', '));
      setResultStatus(hackathon.resultStatus || 'Participating');
      setAwardTitle(hackathon.awardTitle || (hackathon.result !== 'Participating' ? hackathon.result : ''));
      setDescription(hackathon.description || '');
      setCertificateUrl(hackathon.certificateUrl || '');
      setPitchDeckUrl(hackathon.pitchDeckUrl || '');
      setDemoVideoUrl(hackathon.demoVideoUrl || '');
      setProjectRepoUrl(hackathon.projectRepoUrl || '');
      setNotesAndLearnings(hackathon.notesAndLearnings || '');
      setIsVerified(hackathon.isVerified !== undefined ? hackathon.isVerified : true);
      setIsPublished(hackathon.isPublished !== undefined ? hackathon.isPublished : true);
      setTeamMembers(hackathon.teamMembers || []);
      setEventPhotos(hackathon.eventPhotos || []);
    } else {
      // Defaults for new entry
      setTitle('');
      setOrganizer('');
      setEventDate('');
      setLocation('Online / Virtual');
      setProblemStatement('');
      setProjectSubmitted('');
      setTeamName('Team Vidyut');
      setMyRoleAndContribution('');
      setTagsStr('Python, React, Rapid Prototyping');
      setResultStatus('Participating');
      setAwardTitle('');
      setDescription('');
      setCertificateUrl('');
      setPitchDeckUrl('');
      setDemoVideoUrl('');
      setProjectRepoUrl('');
      setNotesAndLearnings('');
      setIsVerified(true);
      setIsPublished(true);
      setTeamMembers([{ name: 'Rohan Prabhash', role: 'Lead Developer' }]);
      setEventPhotos([]);
    }
    setActiveTab('form');
    setValidationError(null);
  }, [hackathon, isOpen]);

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

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      setTeamMembers([
        ...teamMembers,
        {
          name: newMemberName.trim(),
          role: newMemberRole.trim() || 'Contributor',
        },
      ]);
      setNewMemberName('');
      setNewMemberRole('');
    }
  };

  const handleRemoveMember = (idx: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== idx));
  };

  const handleAddPhoto = () => {
    if (newPhotoUrl.trim()) {
      setEventPhotos([...eventPhotos, newPhotoUrl.trim()]);
      setNewPhotoUrl('');
    }
  };

  const handleRemovePhoto = (idx: number) => {
    setEventPhotos(eventPhotos.filter((_, i) => i !== idx));
  };

  const handleCertUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        const uploadResult = await uploadImageApi(dataUrl, file.name);
        setCertificateUrl(uploadResult?.url || dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setValidationError('Hackathon Name is required.');
      return;
    }
    if (!organizer.trim()) {
      setValidationError('Organizer / Host Entity is required.');
      return;
    }

    const tags = tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    // Format display result string
    const resultDisplay = awardTitle.trim() || resultStatus;

    const payload: Partial<HackathonAchievement> = {
      title: title.trim(),
      hackathonName: title.trim(),
      event: organizer.trim(),
      organizer: organizer.trim(),
      date: eventDate.trim() || '2024',
      eventDate: eventDate.trim() || '2024',
      location: location.trim() || undefined,
      problemStatement: problemStatement.trim() || undefined,
      projectSubmitted: projectSubmitted.trim() || undefined,
      teamName: teamName.trim() || undefined,
      teamMembers: teamMembers.length > 0 ? teamMembers : undefined,
      myRoleAndContribution: myRoleAndContribution.trim() || undefined,
      technologies: tags,
      tags,
      result: resultDisplay,
      resultStatus,
      awardTitle: awardTitle.trim() || undefined,
      description: description.trim(),
      certificateUrl: certificateUrl.trim() || undefined,
      pitchDeckUrl: pitchDeckUrl.trim() || undefined,
      demoVideoUrl: demoVideoUrl.trim() || undefined,
      projectRepoUrl: projectRepoUrl.trim() || undefined,
      eventPhotos: eventPhotos.length > 0 ? eventPhotos : undefined,
      notesAndLearnings: notesAndLearnings.trim() || undefined,
      isVerified,
      isPublished,
    };

    await onSave(payload);
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
              SCRIBE SANCTUM • HACKATHON CHRONICLES
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#211810]">
              {isEditing ? `Edit Expedition: ${hackathon?.title}` : 'Inscribe New Hackathon Expedition'}
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
              <span>Chronicle Ledger</span>
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
              <span>Timeline Preview</span>
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
                {isPublished ? 'Published to Timeline' : 'Saved as Private Draft'}
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

            {/* Row 1: Name, Organizer, Date */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-6 space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Hackathon / Sprint Name *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. National Smart Mobility & Logistics Hackathon"
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] focus:ring-1 focus:ring-[#8C3828] outline-none"
                />
              </div>

              <div className="sm:col-span-4 space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Organizer / Host Entity *
                </label>
                <input
                  type="text"
                  required
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                  placeholder="e.g. Smart India / Innovation Council"
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] focus:ring-1 focus:ring-[#8C3828] outline-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Date
                </label>
                <input
                  type="text"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  placeholder="e.g. Oct 2024"
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] focus:ring-1 focus:ring-[#8C3828] outline-none"
                />
              </div>
            </div>

            {/* Row 2: Location & Result Status */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-4 space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Location or Format
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bengaluru, India or Virtual"
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] focus:ring-1 focus:ring-[#8C3828] outline-none"
                />
              </div>

              <div className="sm:col-span-4 space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#8C3828]">
                  Verified Result Classification *
                </label>
                <select
                  value={resultStatus}
                  onChange={(e) => setResultStatus(e.target.value as HackathonResultStatus)}
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#8C3828] rounded text-[#211810] focus:ring-1 focus:ring-[#8C3828] outline-none font-semibold"
                >
                  <option value="Winner">Winner</option>
                  <option value="Finalist">Finalist</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Participating">Participating</option>
                  <option value="Registered">Registered</option>
                  <option value="Completed without an award">Completed without an award</option>
                </select>
              </div>

              <div className="sm:col-span-4 space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#B58A43]">
                  Explicit Verified Award Title (Optional)
                </label>
                <input
                  type="text"
                  value={awardTitle}
                  onChange={(e) => setAwardTitle(e.target.value)}
                  placeholder="e.g. 1st Place or Top 10 Showcase"
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] focus:ring-1 focus:ring-[#8C3828] outline-none"
                />
              </div>
            </div>

            {/* Problem Statement & Project Submitted */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Problem Statement / Challenge Track
                </label>
                <textarea
                  rows={2}
                  value={problemStatement}
                  onChange={(e) => setProblemStatement(e.target.value)}
                  placeholder="Challenge track guidelines or specific sprint problem statement..."
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] text-xs outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Project Submitted
                </label>
                <input
                  type="text"
                  value={projectSubmitted}
                  onChange={(e) => setProjectSubmitted(e.target.value)}
                  placeholder="e.g. OYEE Route Engine"
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] text-xs outline-none mb-1"
                />
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Executive summary of sprint demonstration..."
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] text-xs outline-none"
                />
              </div>
            </div>

            {/* Team Roster & Individual Contribution */}
            <div className="p-3.5 rounded bg-[#FAF4E5] border border-[#B58A43]/40 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="sm:w-1/3 space-y-1">
                  <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. Team Vidyut or Solo Expedition"
                    className="w-full px-3 py-1.5 bg-[#F3E7CC] border border-[#B58A43] rounded text-[#211810] text-xs"
                  />
                </div>

                <div className="sm:w-2/3 space-y-1">
                  <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                    My Individual Contribution *
                  </label>
                  <input
                    type="text"
                    value={myRoleAndContribution}
                    onChange={(e) => setMyRoleAndContribution(e.target.value)}
                    placeholder="e.g. Formulated the multi-drop TSP algorithm and led backend dispatch API"
                    className="w-full px-3 py-1.5 bg-[#F3E7CC] border border-[#B58A43] rounded text-[#211810] text-xs"
                  />
                </div>
              </div>

              {/* Dynamic Team Members */}
              <div className="space-y-2 pt-2 border-t border-[#B58A43]/30">
                <span className="font-cinzel text-xs font-semibold text-[#38251B] block">
                  Team Members & Roles
                </span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Member Name"
                    className="px-3 py-1.5 bg-[#F3E7CC] border border-[#B58A43] rounded text-[#211810] text-xs sm:w-1/2"
                  />
                  <input
                    type="text"
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value)}
                    placeholder="Role (e.g. Frontend / UI Designer)"
                    className="px-3 py-1.5 bg-[#F3E7CC] border border-[#B58A43] rounded text-[#211810] text-xs sm:w-1/2"
                  />
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="px-3 py-1.5 rounded bg-[#24170E] hover:bg-[#342114] text-[#E2CDA5] font-cinzel text-xs cursor-pointer shrink-0"
                  >
                    Add Member
                  </button>
                </div>

                {teamMembers.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {teamMembers.map((m, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#E2CDA5] border border-[#B58A43] text-xs text-[#211810]"
                      >
                        <span className="font-bold">{m.name}</span>
                        <span className="text-[#8C3828]">({m.role})</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(idx)}
                          className="text-[#8C3828] hover:text-black ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Technologies Used (Tags) */}
            <div className="space-y-1">
              <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                Technologies & Skills Used (Comma-separated)
              </label>
              <input
                type="text"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                placeholder="Python, Dijkstra, TSP, React, Node.js"
                className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] text-xs"
              />
            </div>

            {/* URLs & Media: Certificate, Pitch Deck, Video, Repo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Certificate URL / Image
                </label>
                <div className="flex gap-1">
                  <input
                    type="text"
                    value={certificateUrl}
                    onChange={(e) => setCertificateUrl(e.target.value)}
                    placeholder="https://... or upload"
                    className="w-full px-2 py-1.5 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] text-xs"
                  />
                  <input
                    ref={certFileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleCertUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => certFileInputRef.current?.click()}
                    className="p-1.5 bg-[#24170E] text-[#E2CDA5] rounded border border-[#B58A43] shrink-0"
                    title="Upload certificate file"
                  >
                    <Upload className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Presentation / Pitch Deck URL
                </label>
                <input
                  type="text"
                  value={pitchDeckUrl}
                  onChange={(e) => setPitchDeckUrl(e.target.value)}
                  placeholder="https://... (Pitch deck)"
                  className="w-full px-2 py-1.5 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Demo Video URL
                </label>
                <input
                  type="text"
                  value={demoVideoUrl}
                  onChange={(e) => setDemoVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/..."
                  className="w-full px-2 py-1.5 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-cinzel font-bold text-xs text-[#38251B]">
                  Project Repository URL
                </label>
                <input
                  type="text"
                  value={projectRepoUrl}
                  onChange={(e) => setProjectRepoUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full px-2 py-1.5 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] text-xs"
                />
              </div>
            </div>

            {/* Notes & Lessons Learned */}
            <div className="space-y-1">
              <label className="block font-cinzel font-bold text-xs text-[#8C3828]">
                Notes & Lessons Learned (Retrospective Insights)
              </label>
              <textarea
                rows={2}
                value={notesAndLearnings}
                onChange={(e) => setNotesAndLearnings(e.target.value)}
                placeholder="What architectural breakthroughs, scoping decisions, or team dynamics did this sprint teach you?"
                className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] text-xs outline-none"
              />
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
                <span>{isEditing ? 'Save Expedition' : 'Inscribe Chronicle'}</span>
              </button>
            </div>
          </form>
        ) : (
          /* Timeline Preview */
          <div className="p-6 overflow-y-auto space-y-6">
            <div className="p-4 bg-[#FAF4E5] rounded border border-[#B58A43]/60 text-xs font-serif text-[#5A3E2B] flex items-center justify-between">
              <span>Preview of this expedition in the chronological timeline.</span>
              <button
                type="button"
                onClick={() => setActiveTab('form')}
                className="font-cinzel text-[#8C3828] underline font-bold"
              >
                Return to Editor
              </button>
            </div>

            <div className="parchment-sheet p-6 rounded-lg border-2 border-[#B58A43] shadow-xl relative max-w-xl mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="ink-stamp text-[10px]">{resultStatus}</span>
                <span className="font-cinzel text-xs text-[#8C3828]">{eventDate || 'Ongoing'}</span>
              </div>
              <h4 className="font-cinzel text-lg font-bold text-[#211810]">{title || 'Untitled Sprint'}</h4>
              <p className="font-serif italic text-xs text-[#8C3828]">{organizer} • {location}</p>
              <p className="font-serif text-sm text-[#38251B] mt-2">{description || 'Sprint description...'}</p>
              {awardTitle && (
                <div className="mt-3 p-2 bg-[#E2CDA5] rounded text-xs font-cinzel font-bold text-[#8C3828] flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-[#B58A43]" />
                  <span>{awardTitle}</span>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4 border-t border-[#B58A43]/40">
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded bg-[#8C3828] text-[#F3E7CC] font-cinzel text-xs font-bold border border-[#B58A43] flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Approve & Inscribe Chronicle</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

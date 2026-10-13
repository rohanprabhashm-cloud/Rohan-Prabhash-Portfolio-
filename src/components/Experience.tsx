import React, { useState } from 'react';
import { Briefcase, Plus, Calendar, MapPin, ExternalLink, Trash2, Edit3, X, Check } from 'lucide-react';
import { ExperienceItem } from '../types/portfolio';
import { SectionContainer, EmptyState } from './common';

interface ExperienceProps {
  experience: ExperienceItem[];
  onAddExperience: (item: Omit<ExperienceItem, 'id'>) => void;
  onUpdateExperience: (id: string, item: Partial<ExperienceItem>) => void;
  onDeleteExperience: (id: string) => void;
}

export const Experience: React.FC<ExperienceProps> = ({
  experience,
  onAddExperience,
  onUpdateExperience,
  onDeleteExperience,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [period, setPeriod] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<ExperienceItem['type']>('internship');
  const [description, setDescription] = useState('');
  const [techInput, setTechInput] = useState('');
  const [link, setLink] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setRole('');
    setCompany('');
    setPeriod('');
    setLocation('');
    setType('internship');
    setDescription('');
    setTechInput('');
    setLink('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: ExperienceItem) => {
    setEditingId(item.id);
    setRole(item.role);
    setCompany(item.company);
    setPeriod(item.period);
    setLocation(item.location || '');
    setType(item.type);
    setDescription(item.description);
    setTechInput(item.technologies.join(', '));
    setLink(item.link || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const technologies = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingId) {
      onUpdateExperience(editingId, {
        role,
        company,
        period,
        location,
        type,
        description,
        technologies,
        link,
      });
    } else {
      onAddExperience({
        role,
        company,
        period,
        location,
        type,
        description,
        technologies,
        link,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <SectionContainer
      id="experience"
      kicker="Work & Research"
      icon={Briefcase}
      title="Experience & Internships"
      subtitle="Applied software engineering roles, research labs, and technical internships."
      action={
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 hover:border-cyan-500/40 rounded-xl transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <Plus className="w-3.5 h-3.5 text-cyan-400" />
          <span>Add Experience</span>
        </button>
      }
    >
      {experience.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No experience records added yet"
          description="Currently seeking AI/ML and Software Engineering internships. Add any past roles or student research engagements here."
          actionLabel="Add First Role"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="space-y-6">
          {experience.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-slate-900/40 border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 relative group"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {item.role}
                    </h3>
                    <span className="text-slate-600 hidden sm:inline" aria-hidden="true">·</span>
                    <span className="text-cyan-400 font-semibold text-sm">
                      {item.company}
                    </span>
                  </div>

                  {/* Clean unboxed metadata */}
                  <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400 font-mono">
                    <span className="capitalize text-slate-300">{item.type}</span>
                    <span className="text-slate-600" aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {item.period}
                    </span>
                    {item.location && (
                      <>
                        <span className="text-slate-600" aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          {item.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Edit & Link Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-400 hover:text-cyan-300 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                      title="Visit link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                    title="Edit experience"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteExperience(item.id)}
                    className="p-2 text-slate-400 hover:text-red-400 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                    title="Delete experience"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-slate-300 leading-relaxed max-w-4xl">
                {item.description}
              </p>

              {/* Technologies */}
              {item.technologies.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded bg-slate-950/80 border border-white/10 text-[11px] font-mono text-cyan-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal for Add / Edit Experience */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={editingId ? 'Edit Experience' : 'Add Experience'}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-lg bg-[#0b0f19] border border-white/10 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {editingId ? 'Edit Experience' : 'Add Experience / Internship'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Role / Title *</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. AI/ML Engineering Intern"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Company / Lab *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Tech / University Lab"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Period *</label>
                  <input
                    type="text"
                    required
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    placeholder="Summer 2024"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Remote / City"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-2.5 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  >
                    <option value="internship">Internship</option>
                    <option value="research">Research</option>
                    <option value="fellowship">Fellowship</option>
                    <option value="part-time">Part-Time</option>
                    <option value="full-time">Full-Time</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary of responsibilities, technologies built, and impact..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Python, PyTorch, React, FastApi"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Website or Project URL</label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{editingId ? 'Save Changes' : 'Add Experience'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SectionContainer>
  );
};

import React, { useState } from 'react';
import { Award, Plus, Calendar, ExternalLink, Trash2, Edit3, X, Check, ShieldCheck } from 'lucide-react';
import { CertificationItem } from '../types/portfolio';
import { SectionContainer, EmptyState } from './common';

interface CertificationsProps {
  certifications: CertificationItem[];
  onAddCertification: (item: Omit<CertificationItem, 'id'>) => void;
  onUpdateCertification: (id: string, item: Partial<CertificationItem>) => void;
  onDeleteCertification: (id: string) => void;
}

export const Certifications: React.FC<CertificationsProps> = ({
  certifications,
  onAddCertification,
  onUpdateCertification,
  onDeleteCertification,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [issuer, setIssuer] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [credentialUrl, setCredentialUrl] = useState('');
  const [credentialId, setCredentialId] = useState('');
  const [skillsInput, setSkillsInput] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setName('');
    setIssuer('');
    setIssueDate('');
    setCredentialUrl('');
    setCredentialId('');
    setSkillsInput('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: CertificationItem) => {
    setEditingId(item.id);
    setName(item.name);
    setIssuer(item.issuer);
    setIssueDate(item.issueDate);
    setCredentialUrl(item.credentialUrl || '');
    setCredentialId(item.credentialId || '');
    setSkillsInput(item.skills.join(', '));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skills = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingId) {
      onUpdateCertification(editingId, {
        name,
        issuer,
        issueDate,
        credentialUrl,
        credentialId,
        skills,
      });
    } else {
      onAddCertification({
        name,
        issuer,
        issueDate,
        credentialUrl,
        credentialId,
        skills,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <SectionContainer
      id="certifications"
      kicker="Credentials & Learning"
      icon={Award}
      title="Certifications & Specializations"
      subtitle="Verified technical credentials, online specializations, and validated course tracks."
      action={
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 hover:border-cyan-500/40 rounded-xl transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <Plus className="w-3.5 h-3.5 text-cyan-400" />
          <span>Add Certification</span>
        </button>
      }
    >
      {certifications.length === 0 ? (
        <EmptyState
          icon={Award}
          title="No certifications listed yet"
          description="Complete and verify coursework to showcase your technical credentials here."
          actionLabel="Add Certification"
          onAction={handleOpenAdd}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl bg-slate-900/40 border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {cert.name}
                      </h3>
                      <div className="text-xs text-cyan-400 font-medium">
                        {cert.issuer}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleOpenEdit(cert)}
                      className="p-1.5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                      title="Edit certification"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteCertification(cert.id)}
                      className="p-1.5 text-slate-400 hover:text-red-400 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                      title="Delete certification"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Clean unboxed metadata */}
                <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {cert.issueDate}
                  </span>
                  {cert.credentialId && (
                    <>
                      <span className="text-slate-600" aria-hidden="true">·</span>
                      <span>ID: {cert.credentialId}</span>
                    </>
                  )}
                </div>

                {/* Skills tags */}
                {cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-white/10 text-[10px] font-mono text-cyan-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Credential Link */}
              {cert.credentialUrl && (
                <div className="pt-4 mt-4 border-t border-white/[0.06]">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-300 font-medium transition-colors"
                  >
                    <span>View Certificate Credential</span>
                    <ExternalLink className="w-3 h-3 text-cyan-400" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal for Add / Edit Certification */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={editingId ? 'Edit Certification' : 'Add Certification'}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="relative w-full max-w-lg bg-[#0b0f19] border border-white/10 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {editingId ? 'Edit Certification' : 'Add Certification'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Certification Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Deep Learning Specialization"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Issuing Organization *</label>
                  <input
                    type="text"
                    required
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                    placeholder="e.g. DeepLearning.AI / Coursera"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Issue Date *</label>
                  <input
                    type="text"
                    required
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    placeholder="e.g. 2024"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Credential ID (Optional)</label>
                  <input
                    type="text"
                    value={credentialId}
                    onChange={(e) => setCredentialId(e.target.value)}
                    placeholder="e.g. CERT-12345"
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Credential URL</label>
                  <input
                    type="text"
                    value={credentialUrl}
                    onChange={(e) => setCredentialUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  Skills Validated (comma-separated)
                </label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="Neural Networks, PyTorch, Model Evaluation"
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
                  <span>{editingId ? 'Save Changes' : 'Add Certification'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SectionContainer>
  );
};

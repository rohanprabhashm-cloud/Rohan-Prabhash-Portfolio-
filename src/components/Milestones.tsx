import React, { useState } from 'react';
import { Award, ShieldCheck, Plus, Trash2, Edit3, ExternalLink, Calendar, X, Check, Trophy } from 'lucide-react';
import { HackathonAchievement, CertificationItem } from '../types/portfolio';
import { ChapterHeading, ManuscriptCorner, KolamDivider } from './ManuscriptMotifs';

interface MilestonesProps {
  hackathons: HackathonAchievement[];
  onAddHackathon: (item: Omit<HackathonAchievement, 'id'>) => void;
  onDeleteHackathon: (id: string) => void;
  onUpdateHackathon: (id: string, updated: Partial<HackathonAchievement>) => void;
  certifications: CertificationItem[];
  onAddCertification: (item: Omit<CertificationItem, 'id'>) => void;
  onUpdateCertification: (id: string, item: Partial<CertificationItem>) => void;
  onDeleteCertification: (id: string) => void;
  isAdmin?: boolean;
}

export const Milestones: React.FC<MilestonesProps> = ({
  hackathons,
  certifications,
  onAddCertification,
  onUpdateCertification,
  onDeleteCertification,
  isAdmin = false,
}) => {
  // Certification Modal state
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [certName, setCertName] = useState('');
  const [certIssuer, setCertIssuer] = useState('');
  const [certDate, setCertDate] = useState('');
  const [certUrl, setCertUrl] = useState('');
  const [certId, setCertId] = useState('');
  const [certSkills, setCertSkills] = useState('');

  // Certification handlers
  const handleOpenAddCert = () => {
    setEditingCertId(null);
    setCertName('');
    setCertIssuer('');
    setCertDate('');
    setCertUrl('');
    setCertId('');
    setCertSkills('');
    setIsCertModalOpen(true);
  };

  const handleOpenEditCert = (item: CertificationItem) => {
    setEditingCertId(item.id);
    setCertName(item.name);
    setCertIssuer(item.issuer);
    setCertDate(item.issueDate);
    setCertUrl(item.credentialUrl || '');
    setCertId(item.credentialId || '');
    setCertSkills(item.skills.join(', '));
    setIsCertModalOpen(true);
  };

  const handleSubmitCert = (e: React.FormEvent) => {
    e.preventDefault();
    const skills = certSkills.split(',').map((s) => s.trim()).filter(Boolean);
    if (editingCertId) {
      onUpdateCertification(editingCertId, {
        name: certName,
        issuer: certIssuer,
        issueDate: certDate,
        credentialUrl: certUrl || undefined,
        credentialId: certId || undefined,
        skills,
      });
    } else {
      onAddCertification({
        name: certName,
        issuer: certIssuer,
        issueDate: certDate,
        credentialUrl: certUrl || undefined,
        credentialId: certId || undefined,
        skills,
      });
    }
    setIsCertModalOpen(false);
  };

  return (
    <section id="chapter-milestones" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Chapter VII Heading */}
        <ChapterHeading
          chapterNumber="CHAPTER VII"
          sanskritTitle="सप्तम अध्याय • प्रमाणपत्राणि"
          title="THE CREDENTIALS & ATTESTATIONS"
          subtitle="Formally verified technical certifications, foundational accreditations, and sealed credentials in Machine Learning and Algorithm Engineering."
        />

        {/* Section: Technical Certifications & Sealed Credentials */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#B58A43]/40 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#24170E] border border-[#B58A43] flex items-center justify-center text-[#B58A43]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-cinzel text-xl font-bold text-[#F3E7CC]">
                Certifications & Sealed Credentials
              </h3>
            </div>

            {isAdmin && (
              <button
                onClick={handleOpenAddCert}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#24170E] hover:bg-[#342114] text-[#E2CDA5] hover:text-[#F3E7CC] font-cinzel text-xs border border-[#B58A43]/70 transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Inscribe Credential</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="parchment-sheet p-5 rounded-lg border border-[#B58A43]/60 relative flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="ink-stamp-gold text-[9px]">
                        {cert.issuer}
                      </span>
                      <h4 className="font-cinzel text-base font-bold text-[#211810] mt-1">
                        {cert.name}
                      </h4>
                      <p className="font-serif italic text-xs text-[#8C3828]">
                        Issued {cert.issueDate}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 text-[#8C3828] hover:text-[#521c13]"
                          title="Verify credential"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {isAdmin && (
                        <>
                          <button
                            onClick={() => handleOpenEditCert(cert)}
                            className="p-1 text-[#5A3E2B] hover:text-[#8C3828]"
                            title="Edit credential"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteCertification(cert.id)}
                            className="p-1 text-[#5A3E2B] hover:text-[#8C3828]"
                            title="Delete credential"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {cert.credentialId && (
                    <div className="text-[10px] font-mono text-[#5A3E2B] mt-2">
                      ID: {cert.credentialId}
                    </div>
                  )}
                </div>

                {cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-3 mt-2 border-t border-[#B58A43]/30">
                    {cert.skills.map((s, idx) => (
                      <span key={idx} className="ink-stamp-gold text-[8px]">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <KolamDivider className="mt-16" />
      </div>

      {/* Certification Add/Edit Modal */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg parchment-sheet p-6 rounded-lg border-2 border-[#B58A43] shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#B58A43]/40">
              <h3 className="font-cinzel text-lg font-bold text-[#211810]">
                {editingCertId ? 'Edit Credential' : 'Inscribe Technical Certification'}
              </h3>
              <button
                onClick={() => setIsCertModalOpen(false)}
                className="text-[#5A3E2B] hover:text-[#8C3828]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitCert} className="space-y-3 font-serif">
              <div>
                <label className="block text-xs font-cinzel text-[#38251B] mb-1">Certification Name</label>
                <input
                  type="text"
                  value={certName}
                  onChange={(e) => setCertName(e.target.value)}
                  placeholder="e.g. Deep Learning Specialization"
                  className="w-full p-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-sm text-[#211810]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-cinzel text-[#38251B] mb-1">Issuer</label>
                  <input
                    type="text"
                    value={certIssuer}
                    onChange={(e) => setCertIssuer(e.target.value)}
                    placeholder="e.g. DeepLearning.AI / Coursera"
                    className="w-full p-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-sm text-[#211810]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-cinzel text-[#38251B] mb-1">Issue Date</label>
                  <input
                    type="text"
                    value={certDate}
                    onChange={(e) => setCertDate(e.target.value)}
                    placeholder="e.g. Aug 2024"
                    className="w-full p-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-sm text-[#211810]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-cinzel text-[#38251B] mb-1">Credential URL (optional)</label>
                <input
                  type="url"
                  value={certUrl}
                  onChange={(e) => setCertUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-sm text-[#211810]"
                />
              </div>

              <div>
                <label className="block text-xs font-cinzel text-[#38251B] mb-1">Credential ID (optional)</label>
                <input
                  type="text"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  placeholder="e.g. CERT-74921"
                  className="w-full p-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-sm text-[#211810]"
                />
              </div>

              <div>
                <label className="block text-xs font-cinzel text-[#38251B] mb-1">Skills Verified (comma separated)</label>
                <input
                  type="text"
                  value={certSkills}
                  onChange={(e) => setCertSkills(e.target.value)}
                  placeholder="CNNs, Transformers, Vector Search"
                  className="w-full p-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-sm text-[#211810]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCertModalOpen(false)}
                  className="px-4 py-2 text-xs font-cinzel text-[#5A3E2B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#8C3828] text-[#F3E7CC] text-xs font-cinzel border border-[#B58A43]"
                >
                  Inscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

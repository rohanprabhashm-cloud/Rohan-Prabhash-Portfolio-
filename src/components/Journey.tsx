import React, { useState } from 'react';
import { GraduationCap, Briefcase, Calendar, MapPin, ExternalLink, Plus, Edit3, Trash2, X, Compass, Award } from 'lucide-react';
import { EducationInfo, ExperienceItem } from '../types/portfolio';
import { ChapterHeading, ManuscriptCorner, KolamDivider } from './ManuscriptMotifs';

interface JourneyProps {
  education: EducationInfo;
  onUpdateEducation: (updated: EducationInfo) => void;
  experience: ExperienceItem[];
  onAddExperience: (item: Omit<ExperienceItem, 'id'>) => void;
  onUpdateExperience: (id: string, item: Partial<ExperienceItem>) => void;
  onDeleteExperience: (id: string) => void;
}

export const Journey: React.FC<JourneyProps> = ({
  education,
  onUpdateEducation,
  experience,
  onAddExperience,
  onUpdateExperience,
  onDeleteExperience,
}) => {
  // Education editing state
  const [isEditingEdu, setIsEditingEdu] = useState(false);
  const [institution, setInstitution] = useState(education.institution);
  const [degree, setDegree] = useState(education.degree);
  const [specialization, setSpecialization] = useState(education.specialization);
  const [graduationYear, setGraduationYear] = useState(education.graduationYear);
  const [cgpa, setCgpa] = useState(education.cgpaOrGrade || '');

  // Experience modal state
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [period, setPeriod] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<ExperienceItem['type']>('internship');
  const [description, setDescription] = useState('');
  const [techInput, setTechInput] = useState('');
  const [link, setLink] = useState('');

  const handleSaveEdu = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateEducation({
      ...education,
      institution,
      degree,
      specialization,
      graduationYear,
      cgpaOrGrade: cgpa,
    });
    setIsEditingEdu(false);
  };

  const handleOpenAddExp = () => {
    setEditingExpId(null);
    setRole('');
    setCompany('');
    setPeriod('');
    setLocation('');
    setType('internship');
    setDescription('');
    setTechInput('');
    setLink('');
    setIsExpModalOpen(true);
  };

  const handleOpenEditExp = (item: ExperienceItem) => {
    setEditingExpId(item.id);
    setRole(item.role);
    setCompany(item.company);
    setPeriod(item.period);
    setLocation(item.location || '');
    setType(item.type);
    setDescription(item.description);
    setTechInput(item.technologies.join(', '));
    setLink(item.link || '');
    setIsExpModalOpen(true);
  };

  const handleSubmitExp = (e: React.FormEvent) => {
    e.preventDefault();
    const technologies = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingExpId) {
      onUpdateExperience(editingExpId, {
        role,
        company,
        period,
        location: location || undefined,
        type,
        description,
        technologies,
        link: link || undefined,
      });
    } else {
      onAddExperience({
        role,
        company,
        period,
        location: location || undefined,
        type,
        description,
        technologies,
        link: link || undefined,
      });
    }
    setIsExpModalOpen(false);
  };

  return (
    <section id="chapter-journey" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Chapter II Banner */}
        <ChapterHeading
          chapterNumber="CHAPTER II"
          sanskritTitle="द्वितीय अध्याय • यात्रा"
          title="THE JOURNEY"
          subtitle="Education, learning journey, applied apprenticeships, and evolutionary milestones."
        />

        {/* Section 1: Academic Chronicle Folio */}
        <div className="parchment-sheet p-6 sm:p-10 rounded-lg border-2 border-[#B58A43]/70 mb-10 relative">
          <ManuscriptCorner position="top-left" className="absolute top-2 left-2" size={28} />
          <ManuscriptCorner position="top-right" className="absolute top-2 right-2" size={28} />
          <ManuscriptCorner position="bottom-left" className="absolute bottom-2 left-2" size={28} />
          <ManuscriptCorner position="bottom-right" className="absolute bottom-2 right-2" size={28} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#B58A43]/40 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#8C3828] border border-[#B58A43] flex items-center justify-center text-[#F3E7CC] shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold text-[#211810]">
                  Academic Chronicle
                </h3>
                <span className="font-serif italic text-xs text-[#8C3828]">
                  Formal University Training & Theoretical Rigor
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsEditingEdu(!isEditingEdu)}
              className="font-cinzel text-xs text-[#8C3828] hover:text-[#521c13] transition-colors underline underline-offset-4 cursor-pointer self-start sm:self-auto"
            >
              {isEditingEdu ? '[Cancel Editing]' : '[Edit Academic Record]'}
            </button>
          </div>

          {/* Edit Form or Display */}
          {isEditingEdu ? (
            <form onSubmit={handleSaveEdu} className="p-4 rounded bg-[#E2CDA5]/50 border border-[#B58A43] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-cinzel text-[#38251B] mb-1">Institution</label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full p-2 bg-[#F3E7CC] border border-[#B58A43] rounded text-sm text-[#211810]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-cinzel text-[#38251B] mb-1">Degree</label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full p-2 bg-[#F3E7CC] border border-[#B58A43] rounded text-sm text-[#211810]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-cinzel text-[#38251B] mb-1">Specialization</label>
                  <input
                    type="text"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="w-full p-2 bg-[#F3E7CC] border border-[#B58A43] rounded text-sm text-[#211810]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-cinzel text-[#38251B] mb-1">Expected Completion</label>
                  <input
                    type="text"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    className="w-full p-2 bg-[#F3E7CC] border border-[#B58A43] rounded text-sm text-[#211810]"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingEdu(false)}
                  className="px-3 py-1.5 text-xs font-cinzel text-[#5A3E2B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#8C3828] text-[#F3E7CC] text-xs font-cinzel border border-[#B58A43]"
                >
                  Save Inscription
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="ink-stamp text-[10px]">
                    {education.year || '3rd Year Undergraduate'}
                  </span>
                  <span className="font-serif italic text-sm text-[#8C3828]">
                    Expected Completion: {education.graduationYear}
                  </span>
                </div>
                <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-[#211810]">
                  {education.degree} in {education.specialization}
                </h4>
                <p className="font-serif text-base sm:text-lg text-[#5A3E2B]">
                  {education.institution}
                </p>
                {education.cgpaOrGrade && (
                  <div className="text-xs font-cinzel text-[#8C3828] font-bold">
                    Academic Standing: {education.cgpaOrGrade}
                  </div>
                )}
              </div>

              <div className="md:col-span-4 p-4 rounded bg-[#E2CDA5]/50 border border-[#B58A43]/40 space-y-2">
                <div className="font-cinzel text-xs font-bold uppercase text-[#8C3828] tracking-wider">
                  Core Foundations
                </div>
                <ul className="text-xs font-serif text-[#38251B] space-y-1">
                  <li>• Data Structures & Analysis of Algorithms</li>
                  <li>• Deep Learning & Neural Network Architectures</li>
                  <li>• Computational Mathematics & Linear Algebra</li>
                  <li>• Distributed & Agentic Systems</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Applied Experiences & Internships */}
        <div className="parchment-sheet p-6 sm:p-10 rounded-lg border-2 border-[#B58A43]/70 mb-10 relative">
          <ManuscriptCorner position="top-left" className="absolute top-2 left-2" size={28} />
          <ManuscriptCorner position="top-right" className="absolute top-2 right-2" size={28} />
          <ManuscriptCorner position="bottom-left" className="absolute bottom-2 left-2" size={28} />
          <ManuscriptCorner position="bottom-right" className="absolute bottom-2 right-2" size={28} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#B58A43]/40 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#8C3828] border border-[#B58A43] flex items-center justify-center text-[#F3E7CC] shadow-sm">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinzel text-xl font-bold text-[#211810]">
                  Applied Experiences & Internships
                </h3>
                <span className="font-serif italic text-xs text-[#8C3828]">
                  Practical Engagements & Production Engineering
                </span>
              </div>
            </div>

            <button
              onClick={handleOpenAddExp}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs border border-[#B58A43] transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record New Experience</span>
            </button>
          </div>

          {experience.length === 0 ? (
            <div className="p-8 text-center rounded bg-[#E2CDA5]/40 border border-dashed border-[#B58A43]/60 text-[#5A3E2B] font-serif italic">
              "No outside internships recorded yet. As new chapters unfold, add your professional apprenticeships here."
            </div>
          ) : (
            <div className="space-y-6">
              {experience.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded bg-[#FAF4E5] border border-[#B58A43]/50 hover:border-[#8C3828] transition-all space-y-3 relative group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="ink-stamp text-[10px] capitalize">
                          {item.type}
                        </span>
                        <span className="font-serif italic text-xs text-[#8C3828]">
                          {item.period}
                        </span>
                      </div>
                      <h4 className="font-cinzel text-lg font-bold text-[#211810] mt-1">
                        {item.role} <span className="font-serif italic text-base text-[#8C3828]">at {item.company}</span>
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 text-[#8C3828] hover:text-[#521c13]"
                          title="View verified link"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => handleOpenEditExp(item)}
                        className="p-1 text-[#5A3E2B] hover:text-[#8C3828]"
                        title="Edit entry"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteExperience(item.id)}
                        className="p-1 text-[#5A3E2B] hover:text-[#8C3828]"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="font-serif text-sm sm:text-base text-[#38251B] leading-relaxed">
                    {item.description}
                  </p>

                  {item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.technologies.map((t, idx) => (
                        <span key={idx} className="ink-stamp-gold text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 3: Learning Path & Career Horizon */}
        <div className="parchment-sheet-dark p-6 sm:p-10 rounded-lg border-2 border-[#B58A43]/60 relative text-[#E2CDA5]">
          <ManuscriptCorner position="top-left" className="absolute top-2 left-2" size={24} />
          <ManuscriptCorner position="top-right" className="absolute top-2 right-2" size={24} />
          <ManuscriptCorner position="bottom-left" className="absolute bottom-2 left-2" size={24} />
          <ManuscriptCorner position="bottom-right" className="absolute bottom-2 right-2" size={24} />

          <div className="flex items-center gap-3 mb-4">
            <Compass className="w-5 h-5 text-[#B58A43]" />
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#F3E7CC]">
              Career Direction & Horizon of Research
            </h3>
          </div>

          <p className="font-serif text-base sm:text-lg leading-relaxed text-[#C7A878]">
            My trajectory centers on advancing robust AI systems: bridging algorithmic intelligence with tangible real-world deployment. Moving forward, I am dedicating my efforts toward agentic workflows, dynamic route graph optimization, real-time multi-modal inference, and building elegant, accessible interfaces that turn complex machine learning into empowering human tools.
          </p>
        </div>

      </div>

      {/* Experience Add/Edit Modal */}
      {isExpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg parchment-sheet p-6 rounded-lg border-2 border-[#B58A43] shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#B58A43]/40">
              <h3 className="font-cinzel text-lg font-bold text-[#211810]">
                {editingExpId ? 'Edit Apprenticeship Entry' : 'Inscribe New Experience'}
              </h3>
              <button
                onClick={() => setIsExpModalOpen(false)}
                className="text-[#5A3E2B] hover:text-[#8C3828]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitExp} className="space-y-3 font-serif">
              <div>
                <label className="block text-xs font-cinzel text-[#38251B] mb-1">Role / Title</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. AI Research Intern"
                  className="w-full p-2 bg-[#F3E7CC] border border-[#B58A43] rounded text-sm text-[#211810]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-cinzel text-[#38251B] mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Labs / Startup / Academic Lab"
                  className="w-full p-2 bg-[#F3E7CC] border border-[#B58A43] rounded text-sm text-[#211810]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-cinzel text-[#38251B] mb-1">Period</label>
                  <input
                    type="text"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    placeholder="e.g. Jun 2024 - Aug 2024"
                    className="w-full p-2 bg-[#F3E7CC] border border-[#B58A43] rounded text-sm text-[#211810]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-cinzel text-[#38251B] mb-1">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as ExperienceItem['type'])}
                    className="w-full p-2 bg-[#F3E7CC] border border-[#B58A43] rounded text-sm text-[#211810]"
                  >
                    <option value="internship">Internship</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="research">Research</option>
                    <option value="freelance">Freelance</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-cinzel text-[#38251B] mb-1">Description & Key Contributions</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full p-2 bg-[#F3E7CC] border border-[#B58A43] rounded text-sm text-[#211810]"
                  placeholder="Detail systems built, models trained, or impact achieved..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-cinzel text-[#38251B] mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Python, PyTorch, FastAPI, React"
                  className="w-full p-2 bg-[#F3E7CC] border border-[#B58A43] rounded text-sm text-[#211810]"
                />
              </div>

              <div>
                <label className="block text-xs font-cinzel text-[#38251B] mb-1">Verification / Project URL (optional)</label>
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2 bg-[#F3E7CC] border border-[#B58A43] rounded text-sm text-[#211810]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsExpModalOpen(false)}
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

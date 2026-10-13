import React, { useState } from 'react';
import { CheckCircle2, Clock, Plus, Trash2, Code, Brain, Globe, Wrench, X, Sparkles, BookOpen } from 'lucide-react';
import { Skill, SkillStatus } from '../types/portfolio';
import { ChapterHeading, ManuscriptCorner, KolamDivider } from './ManuscriptMotifs';

interface SkillsProps {
  skills: Skill[];
  onAddSkill: (skill: Omit<Skill, 'id'>) => void;
  onDeleteSkill: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export const Skills: React.FC<SkillsProps> = ({
  skills,
  onAddSkill,
  onDeleteSkill,
  onToggleStatus,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'programming' | 'aiml' | 'web' | 'tools'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'learning'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New skill form state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState<'programming' | 'aiml' | 'web' | 'tools'>('programming');
  const [newSkillStatus, setNewSkillStatus] = useState<SkillStatus>('verified');
  const [newSkillProficiency, setNewSkillProficiency] = useState(80);
  const [newSkillNote, setNewSkillNote] = useState('');

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesStatus = statusFilter === 'all' || skill.status === statusFilter;
    return matchesCategory && matchesStatus;
  });

  const verifiedCount = skills.filter((s) => s.status === 'verified').length;
  const learningCount = skills.filter((s) => s.status === 'learning').length;

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    onAddSkill({
      name: newSkillName.trim(),
      category: newSkillCategory,
      status: newSkillStatus,
      proficiency: newSkillProficiency,
      note: newSkillNote.trim() || undefined,
    });
    setNewSkillName('');
    setNewSkillNote('');
    setShowAddModal(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'programming':
        return <Code className="w-4 h-4 text-[#8C3828]" />;
      case 'aiml':
        return <Brain className="w-4 h-4 text-[#B58A43]" />;
      case 'web':
        return <Globe className="w-4 h-4 text-[#8C3828]" />;
      case 'tools':
      default:
        return <Wrench className="w-4 h-4 text-[#B58A43]" />;
    }
  };

  return (
    <section id="chapter-knowledge" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Chapter V Heading */}
        <ChapterHeading
          chapterNumber="CHAPTER V"
          sanskritTitle="पञ्चम अध्याय • विद्याः"
          title="THE KNOWLEDGE"
          subtitle="Programming languages, algorithmic arts, artificial intelligence models, and developer tools."
        />

        {/* Top Control Ribbons: Metrics & Inscribe Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#B58A43]/40 gap-4">
          <div className="flex items-center gap-3 text-xs font-cinzel text-[#C7A878]">
            <span className="ink-stamp-gold text-[10px]">
              {verifiedCount} Mastered Vidyas
            </span>
            <span>•</span>
            <span className="ink-stamp text-[10px]">
              {learningCount} In Deep Study
            </span>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs border border-[#B58A43] transition-colors cursor-pointer self-start sm:self-auto shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Inscribe New Knowledge</span>
          </button>
        </div>

        {/* Category Filters Styled Like Ancient Palm-Leaf Ribbons */}
        <div className="flex items-center gap-2 p-1.5 bg-[#24170E]/80 border border-[#B58A43]/40 rounded-lg overflow-x-auto max-w-full mb-8 scrollbar-none">
          {[
            { key: 'all', label: 'All Lore' },
            { key: 'programming', label: 'Languages' },
            { key: 'aiml', label: 'Intelligence & AI' },
            { key: 'web', label: 'Systems & Web' },
            { key: 'tools', label: 'Developer Tools' },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key as any)}
              className={`px-3.5 py-1.5 text-xs font-cinzel rounded whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-[#8C3828] text-[#F3E7CC] border border-[#B58A43] font-bold shadow-sm'
                  : 'text-[#C7A878] hover:text-[#F3E7CC] hover:bg-[#342114]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid Styled as Inscribed Parchment Tablets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="parchment-sheet p-5 rounded-lg border border-[#B58A43]/60 hover:border-[#8C3828] transition-all relative group flex flex-col justify-between"
            >
              <ManuscriptCorner position="top-left" className="absolute top-1 left-1 opacity-60" size={16} />
              <ManuscriptCorner position="bottom-right" className="absolute bottom-1 right-1 opacity-60" size={16} />

              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-[#E2CDA5] border border-[#B58A43]/60">
                      {getCategoryIcon(skill.category)}
                    </div>
                    <h4 className="font-cinzel text-lg font-bold text-[#211810]">
                      {skill.name}
                    </h4>
                  </div>

                  <button
                    onClick={() => onDeleteSkill(skill.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-[#8C3828] hover:text-[#521c13] transition-opacity cursor-pointer"
                    title="Remove skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {skill.note && (
                  <p className="font-serif italic text-xs text-[#5A3E2B] line-clamp-2 mt-1 mb-3">
                    "{skill.note}"
                  </p>
                )}
              </div>

              {/* Status Toggle & Proficiency Gauge */}
              <div className="pt-3 border-t border-[#B58A43]/30 flex items-center justify-between text-xs font-serif mt-2">
                <button
                  onClick={() => onToggleStatus(skill.id)}
                  className="cursor-pointer"
                  title="Click to toggle between Mastered and In Deep Study"
                >
                  {skill.status === 'verified' ? (
                    <span className="ink-stamp text-[9px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8C3828]" />
                      Mastered
                    </span>
                  ) : (
                    <span className="ink-stamp-gold text-[9px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B58A43]" />
                      In Study
                    </span>
                  )}
                </button>

                {skill.proficiency && (
                  <span className="font-cinzel text-[11px] text-[#8C3828] font-bold">
                    {skill.proficiency}% Lore
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <KolamDivider className="mt-16" />
      </div>

      {/* Inscribe Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-md parchment-sheet p-6 rounded-lg border-2 border-[#B58A43] shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#B58A43]/40">
              <h3 className="font-cinzel text-lg font-bold text-[#211810]">
                Inscribe New Vidya
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#5A3E2B] hover:text-[#8C3828]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSkill} className="space-y-4 font-serif">
              <div>
                <label className="block text-xs font-cinzel text-[#38251B] mb-1">Vidya / Technology Name</label>
                <input
                  type="text"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g. PyTorch, TypeScript, FastAPI"
                  className="w-full p-2 bg-[#F3E7CC] border border-[#B58A43] rounded text-sm text-[#211810]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-cinzel text-[#38251B] mb-1">Category</label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value as any)}
                  className="w-full p-2 bg-[#F3E7CC] border border-[#B58A43] rounded text-sm text-[#211810]"
                >
                  <option value="programming">Languages & Algorithms</option>
                  <option value="aiml">AI & Neural Architectures</option>
                  <option value="web">Systems & Web</option>
                  <option value="tools">Developer Implements</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-cinzel text-[#38251B] mb-1">Status</label>
                <select
                  value={newSkillStatus}
                  onChange={(e) => setNewSkillStatus(e.target.value as SkillStatus)}
                  className="w-full p-2 bg-[#F3E7CC] border border-[#B58A43] rounded text-sm text-[#211810]"
                >
                  <option value="verified">Mastered / Project Verified</option>
                  <option value="learning">In Active Study</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-cinzel text-[#38251B] mb-1">
                  Proficiency Estimation ({newSkillProficiency}%)
                </label>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={newSkillProficiency}
                  onChange={(e) => setNewSkillProficiency(Number(e.target.value))}
                  className="w-full accent-[#8C3828]"
                />
              </div>

              <div>
                <label className="block text-xs font-cinzel text-[#38251B] mb-1">Study Note / Context (optional)</label>
                <input
                  type="text"
                  value={newSkillNote}
                  onChange={(e) => setNewSkillNote(e.target.value)}
                  placeholder="e.g. Applied in graph routing engines..."
                  className="w-full p-2 bg-[#F3E7CC] border border-[#B58A43] rounded text-sm text-[#211810]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
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

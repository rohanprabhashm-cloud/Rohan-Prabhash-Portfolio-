import React, { useState, useMemo } from 'react';
import {
  Trophy,
  Calendar,
  MapPin,
  Users,
  Award,
  ExternalLink,
  Plus,
  Trash2,
  Edit3,
  Copy,
  ChevronUp,
  ChevronDown,
  Search,
  Filter,
  EyeOff,
  Sparkles,
  Github,
  Play,
  FileText,
  Info,
  CheckCircle2,
  FolderPlus,
} from 'lucide-react';
import { HackathonAchievement, HackathonResultStatus } from '../types/portfolio';
import { ChapterHeading, KolamDivider, ManuscriptCorner } from './ManuscriptMotifs';
import { HackathonModal } from './HackathonModal';
import { HackathonFormModal } from './HackathonFormModal';
import { DeleteConfirmModal } from './common/DeleteConfirmModal';

interface HackathonsProps {
  hackathons: HackathonAchievement[];
  onAddHackathon: (item: Partial<HackathonAchievement>) => void;
  onDeleteHackathon: (id: string) => void;
  onUpdateHackathon: (id: string, updated: Partial<HackathonAchievement>) => void;
  onDuplicateHackathon: (id: string) => void;
  onReorderHackathons: (orderedIds: string[]) => void;
  isAdmin: boolean;
  onOpenAdminAuth: () => void;
}

export const Hackathons: React.FC<HackathonsProps> = ({
  hackathons,
  onAddHackathon,
  onDeleteHackathon,
  onUpdateHackathon,
  onDuplicateHackathon,
  onReorderHackathons,
  isAdmin,
  onOpenAdminAuth,
}) => {
  // Modal states
  const [selectedHackathon, setSelectedHackathon] = useState<HackathonAchievement | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingHackathon, setEditingHackathon] = useState<HackathonAchievement | null>(null);
  const [deletingHackathon, setDeletingHackathon] = useState<HackathonAchievement | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResultStatus, setSelectedResultStatus] = useState<string>('all');

  const resultStatusFilters = [
    { id: 'all', label: 'All Chronicles' },
    { id: 'Winner', label: 'Winners' },
    { id: 'Finalist', label: 'Finalists' },
    { id: 'Shortlisted', label: 'Shortlisted' },
    { id: 'Submitted', label: 'Submitted' },
    { id: 'Participating', label: 'Participating' },
    { id: 'Draft', label: 'Drafts' },
    { id: 'Research / Preparation', label: 'Research / Prep' },
    { id: 'Completed without an award', label: 'Completed' },
  ];

  const filteredHackathons = useMemo(() => {
    return hackathons.filter((h) => {

      // Result filter
      if (selectedResultStatus !== 'all') {
        if (h.resultStatus !== selectedResultStatus) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = (h.title || h.hackathonName || '').toLowerCase().includes(q);
        const inOrg = (h.event || h.organizer || '').toLowerCase().includes(q);
        const inProblem = (h.problemStatement || '').toLowerCase().includes(q);
        const inProject = (h.projectSubmitted || '').toLowerCase().includes(q);
        const inDesc = (h.description || '').toLowerCase().includes(q);
        const inTags = (h.tags || h.technologies || []).some((t) => t.toLowerCase().includes(q));
        if (!inTitle && !inOrg && !inProblem && !inProject && !inDesc && !inTags) {
          return false;
        }
      }

      return true;
    });
  }, [hackathons, isAdmin, selectedResultStatus, searchQuery]);

  const handleOpenAddNew = () => {
    if (!isAdmin) {
      onOpenAdminAuth();
      return;
    }
    setEditingHackathon(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (h: HackathonAchievement) => {
    setEditingHackathon(h);
    setIsFormModalOpen(true);
  };

  const handleSaveFromForm = async (data: Partial<HackathonAchievement>) => {
    if (editingHackathon) {
      onUpdateHackathon(editingHackathon.id, data);
    } else {
      onAddHackathon(data);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingHackathon) {
      onDeleteHackathon(deletingHackathon.id);
      setDeletingHackathon(null);
      if (selectedHackathon?.id === deletingHackathon.id) {
        setSelectedHackathon(null);
      }
    }
  };

  const handleMoveUp = (id: string) => {
    const idx = hackathons.findIndex((h) => h.id === id);
    if (idx > 0) {
      const copy = [...hackathons];
      const temp = copy[idx - 1];
      copy[idx - 1] = copy[idx];
      copy[idx] = temp;
      onReorderHackathons(copy.map((h) => h.id));
    }
  };

  const handleMoveDown = (id: string) => {
    const idx = hackathons.findIndex((h) => h.id === id);
    if (idx >= 0 && idx < hackathons.length - 1) {
      const copy = [...hackathons];
      const temp = copy[idx + 1];
      copy[idx + 1] = copy[idx];
      copy[idx] = temp;
      onReorderHackathons(copy.map((h) => h.id));
    }
  };

  const getResultTag = (status: HackathonResultStatus, awardTitle?: string) => {
    switch (status) {
      case 'Winner':
        return (
          <span className="ink-stamp-gold text-[10px] bg-amber-900/40 text-[#E2CDA5] border-amber-600/60 font-bold flex items-center gap-1">
            <Trophy className="w-3 h-3 text-[#B58A43]" />
            <span>Winner {awardTitle ? `• ${awardTitle}` : ''}</span>
          </span>
        );
      case 'Finalist':
        return (
          <span className="ink-stamp text-[10px] bg-[#8C3828]/20 text-[#8C3828] border-[#8C3828] font-bold flex items-center gap-1">
            <Trophy className="w-3 h-3 text-[#8C3828]" />
            <span>Finalist {awardTitle ? `• ${awardTitle}` : ''}</span>
          </span>
        );
      case 'Shortlisted':
        return (
          <span className="ink-stamp text-[10px] bg-emerald-900/20 text-emerald-800 border-emerald-700 font-bold">
            Shortlisted
          </span>
        );
      case 'Submitted':
        return (
          <span className="ink-stamp-gold text-[10px] bg-blue-900/20 text-blue-900 border-blue-600">
            Submission Verified
          </span>
        );
      case 'Participating':
        return (
          <span className="ink-stamp-gold text-[10px]">
            In Progress
          </span>
        );
      case 'Registered':
        return (
          <span className="ink-stamp text-[10px]">
            Registered
          </span>
        );
      case 'Completed without an award':
      default:
        return (
          <span className="ink-stamp text-[10px] text-[#5A3E2B] border-[#5A3E2B]/40">
            Completed Expedition
          </span>
        );
    }
  };

  return (
    <section id="chapter-chronicles" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Chapter IV Banner */}
        <ChapterHeading
          chapterNumber="CHAPTER IV"
          sanskritTitle="चतुर्थ अध्याय • रणकथाः"
          title="THE HACKATHON CHRONICLES"
          subtitle="A chronological timeline of intensive build sprints, competitive hackathons, algorithmic tournaments, and innovation challenges. Every entry represents verified problem formulations, team roles, and tangible project deliverables."
        />

        {/* Chronological Controls Bar */}
        <div className="mb-12 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search expeditions by name, organizer, track, tech..."
                className="w-full pl-9 pr-8 py-2.5 bg-[#24170E] border border-[#B58A43]/50 focus:border-[#B58A43] rounded text-sm text-[#F3E7CC] placeholder-[#C7A878]/60 outline-none"
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-[#B58A43]" />
            </div>

            {/* Add Hackathon Action */}
            <button
              type="button"
              onClick={handleOpenAddNew}
              className="px-4 py-2.5 rounded bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs font-semibold tracking-wider border border-[#B58A43] shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
              title={isAdmin ? 'Inscribe Hackathon Expedition' : 'Unlock Scribe Mode to Add Expedition'}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Inscribe Hackathon Expedition</span>
              {!isAdmin && <span className="text-[10px] opacity-75 font-serif">(Scribe)</span>}
            </button>
          </div>

          {/* Result Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {resultStatusFilters.map((tab) => {
              const isSelected = selectedResultStatus === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedResultStatus(tab.id)}
                  className={`px-3 py-1.5 rounded text-xs font-cinzel whitespace-nowrap transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#8C3828] text-[#F3E7CC] border-[#B58A43] shadow-md font-bold'
                      : 'bg-[#24170E]/80 text-[#C7A878] hover:text-[#F3E7CC] hover:bg-[#342114] border-[#B58A43]/30'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs font-cinzel text-[#C7A878]">
            <span>Showing {filteredHackathons.length} of {hackathons.length} historical expeditions</span>
            {isAdmin && <span className="ink-stamp-gold text-[9px]">Scribe Mode Active</span>}
          </div>
        </div>

        {/* Chronological Timeline Container */}
        {filteredHackathons.length === 0 ? (
          <div className="parchment-sheet p-12 rounded-lg border-2 border-[#B58A43]/60 text-center font-serif text-[#5A3E2B] space-y-3">
            <Trophy className="w-10 h-10 mx-auto text-[#8C3828]" />
            <h4 className="font-cinzel text-lg font-bold text-[#211810]">
              No hackathon chronicles recorded under this query.
            </h4>
            <p className="text-xs sm:text-sm text-[#5A3E2B] italic max-w-md mx-auto">
              Reset your search inquiry or use the "Inscribe Hackathon Expedition" action above to record your competitive achievements.
            </p>
          </div>
        ) : (
          <div className="relative border-l-2 border-[#B58A43]/40 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
            {filteredHackathons.map((item, index) => (
              <div key={item.id} className="relative group">
                
                {/* Timeline Golden Mandala Node Marker */}
                <div className="absolute -left-[33px] sm:-left-[49px] top-4 w-5 h-5 rounded-full bg-[#24170E] border-2 border-[#B58A43] group-hover:bg-[#8C3828] group-hover:border-[#E2CDA5] group-hover:shadow-[0_0_16px_rgba(181,138,67,0.8)] transition-all flex items-center justify-center z-20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E2CDA5]" />
                </div>

                {/* Timeline Event Card (Parchment Folio) */}
                <div className="parchment-sheet p-6 sm:p-7 rounded-lg border-2 border-[#B58A43]/60 hover:border-[#B58A43] transition-all relative shadow-xl space-y-4">
                  <ManuscriptCorner position="top-left" size={20} className="absolute top-1.5 left-1.5 opacity-60" />
                  <ManuscriptCorner position="bottom-right" size={20} className="absolute bottom-1.5 right-1.5 opacity-60" />

                  {/* Top Bar: Event Name, Date & Result Badge */}
                  <div className="flex flex-wrap items-start justify-between gap-2.5 pb-2 border-b border-[#B58A43]/30">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-cinzel text-[11px] font-bold text-[#8C3828] tracking-widest uppercase">
                          {item.event || item.organizer}
                        </span>
                        <span className="text-[#B58A43]" aria-hidden="true">•</span>
                        <span className="font-serif italic text-xs text-[#5A3E2B]">
                          {item.date || item.eventDate}
                        </span>
                        {item.location && (
                          <>
                            <span className="text-[#B58A43]" aria-hidden="true">•</span>
                            <span className="font-serif text-xs text-[#5A3E2B]">
                              {item.location}
                            </span>
                          </>
                        )}
                        {!item.isPublished && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-900/30 text-amber-900 border border-amber-600/40 text-[9px] font-cinzel font-bold">
                            DRAFT
                          </span>
                        )}
                      </div>

                      <h3
                        onClick={() => setSelectedHackathon(item)}
                        className="font-cinzel text-xl sm:text-2xl font-bold text-[#211810] group-hover:text-[#8C3828] transition-colors cursor-pointer"
                      >
                        {item.title || item.hackathonName}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      {getResultTag(item.resultStatus, item.awardTitle)}

                      {/* Admin Controls */}
                      {isAdmin && (
                        <div className="flex items-center gap-1 bg-[#24170E]/80 p-1 rounded border border-[#B58A43]/50">
                          {index > 0 && (
                            <button
                              onClick={() => handleMoveUp(item.id)}
                              className="p-1 text-[#E2CDA5] hover:text-white"
                              title="Move Earlier"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {index < filteredHackathons.length - 1 && (
                            <button
                              onClick={() => handleMoveDown(item.id)}
                              className="p-1 text-[#E2CDA5] hover:text-white"
                              title="Move Later"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => onDuplicateHackathon(item.id)}
                            className="p-1 text-[#E2CDA5] hover:text-white"
                            title="Duplicate Entry"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1 text-[#E2CDA5] hover:text-white"
                            title="Edit Chronicle"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeletingHackathon(item)}
                            className="p-1 text-red-400 hover:text-red-200"
                            title="Strike from Timeline"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submission & Problem Summary */}
                  <div className="space-y-2 font-serif">
                    {item.projectSubmitted && (
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-cinzel font-bold text-[#8C3828]">Project Submitted:</span>
                        <span className="px-2 py-0.5 rounded bg-[#FAF4E5] border border-[#B58A43]/40 font-semibold text-[#211810]">
                          {item.projectSubmitted}
                        </span>
                      </div>
                    )}

                    <p className="text-sm text-[#38251B] leading-relaxed">
                      {item.description}
                    </p>

                    {item.myRoleAndContribution && (
                      <div className="p-3 rounded bg-[#E2CDA5]/40 border border-[#B58A43]/30 text-xs">
                        <span className="font-cinzel font-bold text-[#8C3828] block mb-0.5">
                          My Individual Contribution:
                        </span>
                        <p className="text-[#38251B]">{item.myRoleAndContribution}</p>
                      </div>
                    )}
                  </div>

                  {/* Technologies Tags */}
                  {((item.tags && item.tags.length > 0) || (item.technologies && item.technologies.length > 0)) && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(item.tags || item.technologies || []).map((t, idx) => (
                        <span key={idx} className="ink-stamp-gold text-[9px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Bar */}
                  <div className="pt-3 border-t border-[#B58A43]/30 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedHackathon(item)}
                      className="px-3.5 py-1.5 rounded bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs font-semibold border border-[#B58A43] flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Unfold Chronicle Dossier</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {item.certificateUrl && (
                        <a
                          href={item.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded bg-[#24170E] hover:bg-[#342114] text-[#E2CDA5] font-cinzel text-[11px] border border-[#B58A43]/50 flex items-center gap-1"
                        >
                          <Award className="w-3 h-3 text-[#B58A43]" />
                          <span>Certificate</span>
                        </a>
                      )}
                      {item.pitchDeckUrl && (
                        <a
                          href={item.pitchDeckUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded bg-[#24170E] hover:bg-[#342114] text-[#E2CDA5] font-cinzel text-[11px] border border-[#B58A43]/50 flex items-center gap-1"
                        >
                          <FileText className="w-3 h-3 text-[#B58A43]" />
                          <span>Pitch Deck</span>
                        </a>
                      )}
                      {item.projectRepoUrl && (
                        <a
                          href={item.projectRepoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded bg-[#24170E] hover:bg-[#342114] text-[#E2CDA5] font-cinzel text-[11px] border border-[#B58A43]/50 flex items-center gap-1"
                        >
                          <Github className="w-3 h-3 text-[#B58A43]" />
                          <span>Repo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        <KolamDivider className="mt-16" />
      </div>

      {/* Hackathon Detail Modal */}
      {selectedHackathon && (
        <HackathonModal
          hackathon={selectedHackathon}
          onClose={() => setSelectedHackathon(null)}
          onEdit={(h) => {
            setSelectedHackathon(null);
            handleOpenEdit(h);
          }}
          isAdmin={isAdmin}
        />
      )}

      {/* Hackathon Form Modal */}
      <HackathonFormModal
        isOpen={isFormModalOpen}
        hackathon={editingHackathon}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingHackathon(null);
        }}
        onSave={handleSaveFromForm}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingHackathon)}
        title="Strike Hackathon Chronicle"
        itemName={deletingHackathon?.title || deletingHackathon?.hackathonName || ''}
        itemType="chronicle"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingHackathon(null)}
      />
    </section>
  );
};

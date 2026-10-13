import React, { useState, useMemo } from 'react';
import {
  FolderPlus,
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  Sparkles,
  SlidersHorizontal,
  X,
  Layers,
  BookOpen,
} from 'lucide-react';
import { Project, ProjectCategory } from '../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { ProjectCard } from './common/ProjectCard';
import { ChapterHeading, KolamDivider } from './ManuscriptMotifs';
import { ProjectFormModal } from './ProjectFormModal';
import { DeleteConfirmModal } from './common/DeleteConfirmModal';

export { OyeeFullCoverArt, OyeAssistantFullCoverArt, RoamAgentFullCoverArt } from './common/ProjectCard';

interface ProjectsProps {
  projects: Project[];
  onAddProject: (project: Partial<Project>) => void;
  onUpdateProject: (projectId: string, updated: Partial<Project>) => void;
  onDeleteProject: (projectId: string) => void;
  onDuplicateProject: (projectId: string) => void;
  onReorderProjects: (orderedIds: string[]) => void;
  isAdmin: boolean;
  onOpenAdminAuth: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onDuplicateProject,
  onReorderProjects,
  isAdmin,
  onOpenAdminAuth,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<'details' | 'simulation' | 'edit'>('details');

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'status' | 'title'>('newest');

  // Admin Modals State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);

  // Categories definitions
  const categories: Array<{ id: string; label: string; sanskrit: string }> = [
    { id: 'all', label: 'All Folios', sanskrit: 'सर्व' },
    { id: 'ai_ml', label: 'AI & Machine Learning', sanskrit: 'यन्त्रज्ञान' },
    { id: 'ai_agents', label: 'AI Agents', sanskrit: 'दूत' },
    { id: 'web_dev', label: 'Web Development', sanskrit: 'जाल' },
    { id: 'mobile_apps', label: 'Mobile Applications', sanskrit: 'सञ्चार' },
    { id: 'hackathon_projects', label: 'Hackathon Projects', sanskrit: 'रणरचना' },
    { id: 'experiments', label: 'Other Experiments', sanskrit: 'प्रयोग' },
  ];

  // Filter & Sort Logic
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {

      // Category filter
      if (selectedCategory !== 'all') {
        const cat = p.category as string;
        // Aliases check
        if (selectedCategory === 'ai_ml' && cat !== 'ai_ml' && cat !== 'aiml') return false;
        if (selectedCategory === 'ai_agents' && cat !== 'ai_agents' && cat !== 'agentic') return false;
        if (selectedCategory === 'web_dev' && cat !== 'web_dev' && cat !== 'fullstack' && cat !== 'web') return false;
        if (selectedCategory === 'mobile_apps' && cat !== 'mobile_apps') return false;
        if (selectedCategory === 'hackathon_projects' && cat !== 'hackathon_projects' && !p.relatedHackathon) return false;
        if (selectedCategory === 'experiments' && cat !== 'experiments') return false;
      }

      // Status filter
      if (selectedStatus !== 'all') {
        if (p.status !== selectedStatus) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = p.title.toLowerCase().includes(query);
        const inTagline = (p.tagline || '').toLowerCase().includes(query);
        const inDesc = (p.description || '').toLowerCase().includes(query);
        const inProblem = (p.problemStatement || '').toLowerCase().includes(query);
        const inTags = (p.tags || p.technologies || []).some((t) => t.toLowerCase().includes(query));
        if (!inTitle && !inTagline && !inDesc && !inProblem && !inTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return (a.order || 0) - (b.order || 0);
      }
      if (sortBy === 'oldest') {
        return (b.order || 0) - (a.order || 0);
      }
      if (sortBy === 'status') {
        return (a.status || '').localeCompare(b.status || '');
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [projects, isAdmin, selectedCategory, selectedStatus, searchQuery, sortBy]);

  const handleOpenDetails = (project: Project) => {
    setSelectedProject(project);
    setModalInitialTab('details');
  };

  const handleOpenSimulation = (project: Project) => {
    setSelectedProject(project);
    setModalInitialTab('simulation');
  };

  const handleGithubClick = (e: React.MouseEvent, project: Project) => {
    if (project.isGithubPlaceholder || !project.githubUrl || project.githubUrl.includes('.placeholder')) {
      e.preventDefault();
      setSelectedProject(project);
      setModalInitialTab('details');
    }
  };

  const handleOpenAddNew = () => {
    if (!isAdmin) {
      onOpenAdminAuth();
      return;
    }
    setEditingProject(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setIsFormModalOpen(true);
  };

  const handleSaveFromForm = async (data: Partial<Project>) => {
    if (editingProject) {
      onUpdateProject(editingProject.id, data);
    } else {
      onAddProject(data);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingProject) {
      onDeleteProject(deletingProject.id);
      setDeletingProject(null);
      if (selectedProject?.id === deletingProject.id) {
        setSelectedProject(null);
      }
    }
  };

  // Reorder helpers
  const handleMoveUp = (id: string) => {
    const idx = projects.findIndex((p) => p.id === id);
    if (idx > 0) {
      const copy = [...projects];
      const temp = copy[idx - 1];
      copy[idx - 1] = copy[idx];
      copy[idx] = temp;
      onReorderProjects(copy.map((p) => p.id));
    }
  };

  const handleMoveDown = (id: string) => {
    const idx = projects.findIndex((p) => p.id === id);
    if (idx >= 0 && idx < projects.length - 1) {
      const copy = [...projects];
      const temp = copy[idx + 1];
      copy[idx + 1] = copy[idx];
      copy[idx] = temp;
      onReorderProjects(copy.map((p) => p.id));
    }
  };

  return (
    <section id="chapter-creations" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Chapter III Banner */}
        <ChapterHeading
          chapterNumber="CHAPTER III"
          sanskritTitle="तृतीय अध्याय • रचना संग्रहः"
          title="THE CREATION ARCHIVE"
          subtitle="An illustrated manuscript archive of intelligent systems, autonomous agents, and full-stack software. Each folio captures architectural formulated treatises, problem statements, and live interactive simulations."
        />

        {/* Archival Controls Bar: Search, Category Filters, Sorting, and Add Project */}
        <div className="mb-10 space-y-4">
          
          {/* Top Row: Search + Status + Sort + Scribe Action */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, technology, problem statement..."
                className="w-full pl-9 pr-8 py-2.5 bg-[#24170E] border border-[#B58A43]/50 focus:border-[#B58A43] rounded text-sm text-[#F3E7CC] placeholder-[#C7A878]/60 outline-none transition-colors"
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-[#B58A43]" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-[#C7A878] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns & Add Button */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Status Filter */}
              <div className="flex items-center gap-1.5 bg-[#24170E] border border-[#B58A43]/40 rounded px-2.5 py-1.5 text-xs text-[#E2CDA5]">
                <Filter className="w-3.5 h-3.5 text-[#B58A43]" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-transparent text-[#F3E7CC] font-cinzel text-xs outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#24170E]">All Statuses</option>
                  <option value="Completed" className="bg-[#24170E]">Completed</option>
                  <option value="In Development" className="bg-[#24170E]">In Development</option>
                  <option value="Planning" className="bg-[#24170E]">Planning</option>
                  <option value="Published" className="bg-[#24170E]">Published</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-1.5 bg-[#24170E] border border-[#B58A43]/40 rounded px-2.5 py-1.5 text-xs text-[#E2CDA5]">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#B58A43]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-[#F3E7CC] font-cinzel text-xs outline-none cursor-pointer"
                >
                  <option value="newest" className="bg-[#24170E]">Newest First</option>
                  <option value="oldest" className="bg-[#24170E]">Oldest First</option>
                  <option value="status" className="bg-[#24170E]">By Status</option>
                  <option value="title" className="bg-[#24170E]">Alphabetical</option>
                </select>
              </div>

              {/* Add Project Button */}
              <button
                type="button"
                onClick={handleOpenAddNew}
                className="px-3.5 py-2 rounded bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs font-semibold tracking-wider border border-[#B58A43] shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
                title={isAdmin ? 'Add New Creation' : 'Unlock Scribe Mode to Add Creation'}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Creation</span>
                {!isAdmin && <span className="text-[10px] opacity-75 font-serif">(Scribe)</span>}
              </button>
            </div>
          </div>

          {/* Bottom Row: Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none pt-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded text-xs font-cinzel whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-[#8C3828] text-[#F3E7CC] border-[#B58A43] shadow-md font-bold'
                      : 'bg-[#24170E]/80 text-[#C7A878] hover:text-[#F3E7CC] hover:bg-[#342114] border-[#B58A43]/30'
                  }`}
                >
                  <span className="text-[10px] opacity-70 font-telugu">{cat.sanskrit}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Archive Status Count & Reset Filter Indicator */}
          <div className="flex items-center justify-between text-xs font-cinzel text-[#C7A878] pt-1">
            <div>
              <span>Displaying </span>
              <strong className="text-[#F3E7CC]">{filteredProjects.length}</strong>
              <span> of {projects.length} recorded folios</span>
              {isAdmin && (
                <span className="ml-2 ink-stamp-gold text-[9px]">Scribe Mode Active</span>
              )}
            </div>

            {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                }}
                className="text-[#8C3828] hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Projects Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="parchment-sheet p-12 rounded-lg border-2 border-[#B58A43]/60 text-center font-serif text-[#5A3E2B] space-y-3">
            <FolderPlus className="w-10 h-10 mx-auto text-[#8C3828]" />
            <h4 className="font-cinzel text-lg font-bold text-[#211810]">
              No creation folios match the active inquiry.
            </h4>
            <p className="text-xs sm:text-sm text-[#5A3E2B] italic max-w-md mx-auto">
              Clear your search parameters or use the "Add Creation" button to inscribe a new software artifact into the archive.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="mt-2 px-4 py-1.5 rounded bg-[#8C3828] text-[#F3E7CC] font-cinzel text-xs cursor-pointer inline-block"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onViewDetails={handleOpenDetails}
                onLaunchSimulation={handleOpenSimulation}
                onGithubClick={handleGithubClick}
                isAdmin={isAdmin}
                onEdit={handleOpenEdit}
                onDuplicate={onDuplicateProject}
                onDelete={(p) => setDeletingProject(p)}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
                isFirst={idx === 0}
                isLast={idx === filteredProjects.length - 1}
              />
            ))}
          </div>
        )}

        <KolamDivider className="mt-16" />
      </div>

      {/* Illuminated Project Detail Folio Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onUpdateProject={onUpdateProject}
          initialTab={modalInitialTab}
          isAdmin={isAdmin}
        />
      )}

      {/* Add / Edit Project Modal */}
      <ProjectFormModal
        isOpen={isFormModalOpen}
        project={editingProject}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveFromForm}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingProject)}
        title="Strike Creation Record"
        itemName={deletingProject?.title || ''}
        itemType="creation"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingProject(null)}
      />
    </section>
  );
};

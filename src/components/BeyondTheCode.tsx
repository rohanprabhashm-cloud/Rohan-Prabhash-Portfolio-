import React, { useState } from 'react';
import { Camera, SlidersHorizontal, AlertCircle, Plus, BookOpen, Feather } from 'lucide-react';
import { GalleryPhoto } from '../types/portfolio';
import { PhotoLightbox } from './PhotoLightbox';
import { ManagePhotosModal } from './ManagePhotosModal';
import { PhotoGallery } from './common/PhotoGallery';
import { ChapterHeading, KolamDivider } from './ManuscriptMotifs';

interface BeyondTheCodeProps {
  photos: GalleryPhoto[];
  onUpdatePhotos: (photos: GalleryPhoto[]) => void;
  onResetPhotos: () => void;
}

export const BeyondTheCode: React.FC<BeyondTheCodeProps> = ({
  photos,
  onUpdatePhotos,
  onResetPhotos,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);

  const handleOpenPhoto = (photo: GalleryPhoto) => {
    setSelectedPhoto(photo);
  };

  const handleLightboxNavigate = (index: number) => {
    if (photos[index]) {
      setSelectedPhoto(photos[index]);
    }
  };

  const handleEditFromLightbox = (photo: GalleryPhoto) => {
    setSelectedPhoto(null);
    setEditingPhotoId(photo.id);
    setIsManageModalOpen(true);
  };

  const handleOpenManageModal = () => {
    setEditingPhotoId(null);
    setIsManageModalOpen(true);
  };

  return (
    <section id="chapter-artifacts" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Chapter IV Heading */}
        <ChapterHeading
          chapterNumber="CHAPTER IV"
          sanskritTitle="चतुर्थ अध्याय • संस्मरणानि"
          title="THE ARTIFACTS"
          subtitle="Beyond the code: personal memories, hackathon late-nights, campus chronicles, and travel folios."
        />

        {/* Travel Journal Guidance & Manage Action Banner */}
        <div className="mb-8 p-4 rounded-lg parchment-sheet border border-[#B58A43]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-serif text-[#38251B]">
          <div className="flex items-start sm:items-center gap-3">
            <BookOpen className="w-4 h-4 text-[#8C3828] shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong className="font-cinzel text-xs text-[#211810]">Preserve Your Own Memories: </strong>
              Sample illustrations are placeholders. Mount your portrait, college life, hackathons, and travels anytime via <strong className="text-[#8C3828]">Manage Journal</strong> or <code className="px-1 py-0.5 rounded bg-[#E2CDA5] text-[#211810] font-mono text-[11px]">public/photos/</code>.
            </span>
          </div>

          <button
            onClick={handleOpenManageModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs border border-[#B58A43] transition-colors cursor-pointer shrink-0 shadow-sm"
            title="Add photos, replace sample placeholders, or customize captions"
          >
            <Feather className="w-3.5 h-3.5" />
            <span>Manage Journal</span>
          </button>
        </div>

        {/* Reusable Photo Gallery with ancient journal styling */}
        <PhotoGallery
          photos={photos}
          onSelectPhoto={handleOpenPhoto}
          onOpenManage={handleOpenManageModal}
        />

        <KolamDivider className="mt-16" />
      </div>

      {/* Full-Screen Archival Lightbox Viewer */}
      {selectedPhoto && (
        <PhotoLightbox
          photo={selectedPhoto}
          photos={photos}
          onClose={() => setSelectedPhoto(null)}
          onNavigate={handleLightboxNavigate}
          onEdit={handleEditFromLightbox}
        />
      )}

      {/* Scribe Photo Manager Modal */}
      {isManageModalOpen && (
        <ManagePhotosModal
          photos={photos}
          isOpen={isManageModalOpen}
          onClose={() => setIsManageModalOpen(false)}
          onSavePhotos={onUpdatePhotos}
          onResetDefaults={onResetPhotos}
          editingPhotoId={editingPhotoId}
        />
      )}
    </section>
  );
};

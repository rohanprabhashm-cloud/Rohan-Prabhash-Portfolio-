import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Edit3, MapPin, Calendar, AlertCircle } from 'lucide-react';
import { GalleryPhoto } from '../types/portfolio';
import { ManuscriptCorner } from './ManuscriptMotifs';

interface PhotoLightboxProps {
  photo: GalleryPhoto | null;
  photos: GalleryPhoto[];
  onClose: () => void;
  onNavigate: (index: number) => void;
  onEdit?: (photo: GalleryPhoto) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  photos,
  onClose,
  onNavigate,
  onEdit,
}) => {
  const currentIndex = photo ? photos.findIndex((p) => p.id === photo.id) : -1;
  const total = photos.length;

  const handlePrev = useCallback(() => {
    if (!photo || total <= 1) return;
    const prevIndex = (currentIndex - 1 + total) % total;
    onNavigate(prevIndex);
  }, [currentIndex, total, onNavigate, photo]);

  const handleNext = useCallback(() => {
    if (!photo || total <= 1) return;
    const nextIndex = (currentIndex + 1) % total;
    onNavigate(nextIndex);
  }, [currentIndex, total, onNavigate, photo]);

  // Keyboard controls
  useEffect(() => {
    if (!photo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, onClose, handlePrev, handleNext]);

  // Prevent page scroll when open
  useEffect(() => {
    if (!photo) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [photo]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo viewer: ${photo.caption || 'Archival photo'}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Top Bar with Counter & Close */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex items-center gap-3">
          <span className="ink-stamp-gold text-xs">
            FOLIO {currentIndex + 1} / {total}
          </span>
          <span className="font-cinzel text-xs text-[#E2CDA5] uppercase tracking-wider hidden sm:inline">
            {photo.category}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {onEdit && (
            <button
              onClick={() => onEdit(photo)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#24170E] hover:bg-[#342114] text-[#E2CDA5] border border-[#B58A43]/50 text-xs font-cinzel transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#B58A43]" />
              <span className="hidden sm:inline">Edit Inscription</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2 text-[#E2CDA5] hover:text-[#F3E7CC] bg-[#24170E] hover:bg-[#342114] border border-[#B58A43]/50 rounded transition-colors cursor-pointer"
            aria-label="Close viewer (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Arrow Left */}
      {total > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-3 sm:left-6 z-20 p-3 sm:p-4 text-[#E2CDA5] hover:text-[#F3E7CC] bg-[#24170E]/80 hover:bg-[#24170E] border border-[#B58A43]/60 rounded-full transition-transform hover:scale-105 cursor-pointer shadow-lg"
          aria-label="Previous photo (Left Arrow)"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Main Image Display inside Antique Frame */}
      <div className="relative max-w-5xl max-h-[82vh] w-full px-4 sm:px-12 flex flex-col items-center justify-center z-10">
        <div className="relative overflow-hidden rounded-lg bg-[#24170E] border-2 border-[#B58A43] shadow-[0_0_50px_rgba(0,0,0,0.9)] max-h-[68vh] flex items-center justify-center p-1">
          <ManuscriptCorner position="top-left" className="absolute top-1 left-1 opacity-80" size={24} />
          <ManuscriptCorner position="top-right" className="absolute top-1 right-1 opacity-80" size={24} />
          <ManuscriptCorner position="bottom-left" className="absolute bottom-1 left-1 opacity-80" size={24} />
          <ManuscriptCorner position="bottom-right" className="absolute bottom-1 right-1 opacity-80" size={24} />

          <img
            src={photo.url}
            alt={photo.altText || photo.caption || 'Archival folio'}
            className="max-h-[66vh] w-auto max-w-full object-contain select-none"
          />

          {photo.isSamplePlaceholder && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-[#180f08]/90 border border-[#8C3828] rounded text-[10px] font-cinzel text-[#E2CDA5]">
              <AlertCircle className="w-3 h-3 text-[#8C3828] shrink-0" />
              <span>Sample Placeholder</span>
            </div>
          )}
        </div>

        {/* Caption & Metadata Footer */}
        <div className="w-full max-w-2xl mt-4 text-center space-y-1.5">
          {photo.caption && (
            <p className="font-serif italic text-base sm:text-lg text-[#F3E7CC] leading-relaxed">
              "{photo.caption}"
            </p>
          )}

          <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-1 text-xs font-serif text-[#C7A878]">
            <span className="ink-stamp-gold text-[9px] uppercase">{photo.category}</span>
            {photo.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#B58A43]" />
                <span>{photo.location}</span>
              </span>
            )}
            {photo.year && (
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#8C3828]" />
                <span>{photo.year}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrow Right */}
      {total > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-3 sm:right-6 z-20 p-3 sm:p-4 text-[#E2CDA5] hover:text-[#F3E7CC] bg-[#24170E]/80 hover:bg-[#24170E] border border-[#B58A43]/60 rounded-full transition-transform hover:scale-105 cursor-pointer shadow-lg"
          aria-label="Next photo (Right Arrow)"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

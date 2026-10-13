import React, { useState, useMemo } from 'react';
import { Camera } from 'lucide-react';
import { GalleryPhoto, PhotoCategory } from '../../types/portfolio';
import { PhotoCard } from './PhotoCard';

export interface PhotoGalleryProps {
  photos: GalleryPhoto[];
  onSelectPhoto: (photo: GalleryPhoto) => void;
  onOpenManage?: () => void;
  initialCategory?: PhotoCategory;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  onSelectPhoto,
  onOpenManage,
  initialCategory = 'all',
}) => {
  const [activeCategory, setActiveCategory] = useState<PhotoCategory>(initialCategory);

  const categories: { key: PhotoCategory; label: string }[] = [
    { key: 'all', label: 'All Artifacts' },
    { key: 'portrait', label: 'Portraits' },
    { key: 'campus', label: 'Campus & Studies' },
    { key: 'hackathon', label: 'Hackathons' },
    { key: 'projects', label: 'Build Moments' },
    { key: 'travel', label: 'Travel Journals' },
    { key: 'life', label: 'Life & Solitude' },
  ];

  const filteredPhotos = useMemo(() => {
    if (activeCategory === 'all') return photos;
    return photos.filter((p) => p.category === activeCategory);
  }, [photos, activeCategory]);

  return (
    <div className="space-y-8">
      {/* Ancient Inscribed Category Filter Ribbons */}
      <div className="flex items-center gap-1.5 p-1.5 bg-[#24170E]/80 border border-[#B58A43]/40 rounded-lg overflow-x-auto max-w-full scrollbar-none">
        {categories.map((cat) => {
          const count =
            cat.key === 'all'
              ? photos.length
              : photos.filter((p) => p.category === cat.key).length;
          if (count === 0 && cat.key !== 'all') return null;

          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3.5 py-1.5 text-xs font-cinzel rounded whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#8C3828] text-[#F3E7CC] border border-[#B58A43] shadow-md font-bold'
                  : 'text-[#C7A878] hover:text-[#F3E7CC] hover:bg-[#342114]'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`ml-1.5 text-[10px] ${
                  isActive ? 'text-[#E2CDA5]' : 'text-[#8C3828]'
                }`}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Journal Artifacts */}
      {filteredPhotos.length === 0 ? (
        <div className="p-12 text-center parchment-sheet rounded-lg border border-[#B58A43]/50 font-serif italic text-[#5A3E2B]">
          "No photographs preserved under this scroll category."
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-5 sm:gap-6">
          {filteredPhotos.map((photo, idx) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={idx}
              onSelect={onSelectPhoto}
            />
          ))}
        </div>
      )}
    </div>
  );
};

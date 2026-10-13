import React from 'react';
import { Maximize2, MapPin, Calendar, AlertCircle } from 'lucide-react';
import { GalleryPhoto } from '../../types/portfolio';
import { ManuscriptCorner } from '../ManuscriptMotifs';

export interface PhotoCardProps {
  photo: GalleryPhoto;
  index: number;
  onSelect: (photo: GalleryPhoto) => void;
  className?: string;
}

export const getGridSpanClass = (aspect: GalleryPhoto['aspect'], index: number): string => {
  switch (aspect) {
    case 'featured':
      return 'col-span-12 md:col-span-8 lg:col-span-8 aspect-[16/10] sm:aspect-[16/9]';
    case 'portrait':
      return 'col-span-12 sm:col-span-6 lg:col-span-4 aspect-[3/4]';
    case 'landscape':
      return 'col-span-12 sm:col-span-6 lg:col-span-6 aspect-[16/10]';
    case 'square':
      return 'col-span-12 sm:col-span-6 lg:col-span-4 aspect-square sm:aspect-[4/3]';
    default:
      return index % 3 === 0
        ? 'col-span-12 sm:col-span-6 lg:col-span-6 aspect-[16/10]'
        : 'col-span-12 sm:col-span-6 lg:col-span-4 aspect-[4/3]';
  }
};

/**
 * Ancient Travel Journal Memory Card
 * Resembles a preserved photograph mounted onto an ancient manuscript folio.
 */
export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  index,
  onSelect,
  className = '',
}) => {
  const spanClass = getGridSpanClass(photo.aspect, index);

  return (
    <div
      className={`group relative rounded-lg overflow-hidden bg-[#24170E] border-2 border-[#B58A43]/60 hover:border-[#B58A43] transition-all duration-400 shadow-[0_10px_30px_rgba(0,0,0,0.65)] hover:shadow-[0_0_30px_rgba(181,138,67,0.3)] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#B58A43] ${spanClass} ${className}`}
      onClick={() => onSelect(photo)}
      role="button"
      tabIndex={0}
      aria-label={`View archival memory: ${photo.caption || photo.category}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(photo);
        }
      }}
    >
      {/* Antique Manuscript Corner Brackets */}
      <ManuscriptCorner position="top-left" className="absolute top-1.5 left-1.5 z-20 opacity-70 group-hover:opacity-100 transition-opacity" size={20} />
      <ManuscriptCorner position="top-right" className="absolute top-1.5 right-1.5 z-20 opacity-70 group-hover:opacity-100 transition-opacity" size={20} />
      <ManuscriptCorner position="bottom-left" className="absolute bottom-1.5 left-1.5 z-20 opacity-70 group-hover:opacity-100 transition-opacity" size={20} />
      <ManuscriptCorner position="bottom-right" className="absolute bottom-1.5 right-1.5 z-20 opacity-70 group-hover:opacity-100 transition-opacity" size={20} />

      {/* Photo Image with Gentle Hover Zoom */}
      <img
        src={photo.url}
        alt={photo.altText || photo.caption || 'Archival photograph'}
        className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%2324170E"/%3E%3Ctext x="200" y="150" fill="%23C7A878" font-family="serif" font-size="16" text-anchor="middle"%3E[ Archival Photo Placeholder ]%3C/text%3E%3C/svg%3E';
        }}
      />

      {/* Top Archival Tag / Category */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <span className="ink-stamp-gold text-[9px] bg-[#180f08]/90">
          {photo.category.toUpperCase()}
        </span>

        {photo.isSamplePlaceholder && (
          <span className="ink-stamp text-[9px] bg-[#180f08]/90">
            Sample Placeholder
          </span>
        )}
      </div>

      {/* Atmospheric Scrim for Journal Inscriptions */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 bg-gradient-to-t from-[#160e08]/98 via-[#21140B]/80 to-transparent flex flex-col justify-end">
        {photo.caption && (
          <p className="font-serif italic text-base sm:text-lg text-[#F3E7CC] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-2">
            "{photo.caption}"
          </p>
        )}

        <div className="flex items-center justify-between pt-2 text-xs font-serif text-[#C7A878]">
          <div className="flex items-center gap-3">
            {photo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#B58A43]" />
                <span>{photo.location}</span>
              </span>
            )}
            {photo.year && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#8C3828]" />
                <span>{photo.year}</span>
              </span>
            )}
          </div>

          <span className="text-[11px] font-cinzel text-[#B58A43] group-hover:text-[#F3E7CC] flex items-center gap-1 transition-colors">
            Inspect <Maximize2 className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};

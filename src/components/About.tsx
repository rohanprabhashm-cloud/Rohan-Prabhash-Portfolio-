import React from 'react';
import { User, MapPin, Mail, Phone, Compass, Sparkles, Feather, BookOpen, Heart } from 'lucide-react';
import { ProfileData } from '../types/portfolio';
import { ChapterHeading, ManuscriptCorner, KolamDivider, ManuscriptSeal } from './ManuscriptMotifs';

interface AboutProps {
  profile: ProfileData;
  onOpenEditModal: () => void;
}

export const About: React.FC<AboutProps> = ({ profile, onOpenEditModal }) => {
  return (
    <section id="chapter-person" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Chapter Heading Banner */}
        <ChapterHeading
          chapterNumber="CHAPTER I"
          sanskritTitle="प्रथम अध्याय • स्वरूपम्"
          title="THE PERSON"
          subtitle="An intimate introduction, personal background, intellectual curiosity, and aspirations."
        />

        {/* Illuminated Manuscript Folio */}
        <div className="relative rounded-lg p-6 sm:p-10 md:p-12 parchment-sheet border-2 border-[#B58A43]/70 text-[#211810]">
          
          {/* Ornamental Brass Corners */}
          <ManuscriptCorner position="top-left" className="absolute top-2 left-2" size={32} />
          <ManuscriptCorner position="top-right" className="absolute top-2 right-2" size={32} />
          <ManuscriptCorner position="bottom-left" className="absolute bottom-2 left-2" size={32} />
          <ManuscriptCorner position="bottom-right" className="absolute bottom-2 right-2" size={32} />

          {/* Inner Dashed Border */}
          <div className="absolute inset-3 sm:inset-5 rounded border border-dashed border-[#8C3828]/25 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
            
            {/* Left Column: Classical Narrative with Drop Cap */}
            <div className="lg:col-span-7 space-y-5 text-base sm:text-lg leading-relaxed text-[#38251B]">
              
              {/* Short Bio Banner */}
              <div className="p-4 rounded bg-[#E2CDA5]/50 border-l-4 border-[#8C3828] font-serif italic text-lg text-[#211810]">
                "{profile.bioShort}"
              </div>

              {/* Bio Paragraphs */}
              {profile.bioLong.map((paragraph, idx) => (
                <div key={idx} className="font-serif leading-relaxed">
                  {idx === 0 ? (
                    <div>
                      <span className="manuscript-dropcap">{paragraph.charAt(0)}</span>
                      <span>{paragraph.slice(1)}</span>
                    </div>
                  ) : (
                    <p>{paragraph}</p>
                  )}
                </div>
              ))}

              {/* Personal Philosophical Pillars / Interests */}
              <div className="pt-6 border-t border-[#B58A43]/40 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded bg-[#E2CDA5]/40 border border-[#B58A43]/40 space-y-1">
                  <div className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#8C3828] flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#8C3828]" />
                    <span>Inquiry & Purpose</span>
                  </div>
                  <p className="text-sm font-serif text-[#38251B] leading-normal">
                    Driven by an ancient thirst for understanding: bridging fundamental mathematics, graph theory, and modern neural architectures.
                  </p>
                </div>

                <div className="p-4 rounded bg-[#E2CDA5]/40 border border-[#B58A43]/40 space-y-1">
                  <div className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#B58A43] flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-[#8C3828]" />
                    <span>Craft & Dedication</span>
                  </div>
                  <p className="text-sm font-serif text-[#38251B] leading-normal">
                    Viewing software engineering not merely as code, but as digital manuscript illumination—clean, reproducible, and enduring.
                  </p>
                </div>
              </div>

              {/* Scribe Edit Link */}
              <div className="pt-2">
                <button
                  onClick={onOpenEditModal}
                  className="font-cinzel text-xs text-[#8C3828] hover:text-[#521c13] transition-colors underline underline-offset-4 cursor-pointer"
                >
                  [ Edit personal narrative, portrait & details ]
                </button>
              </div>
            </div>

            {/* Right Column: Profile Portrait in Classical Manuscript Frame & Details */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Portrait Frame */}
              <div className="relative p-4 rounded bg-[#E2CDA5]/60 border-2 border-[#B58A43] shadow-md text-center">
                <ManuscriptCorner position="top-left" className="absolute top-1 left-1" size={20} />
                <ManuscriptCorner position="top-right" className="absolute top-1 right-1" size={20} />
                <ManuscriptCorner position="bottom-left" className="absolute bottom-1 left-1" size={20} />
                <ManuscriptCorner position="bottom-right" className="absolute bottom-1 right-1" size={20} />

                {/* Portrait Image or Calligraphic Monogram */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-full overflow-hidden border-4 border-[#B58A43] shadow-[0_4px_15px_rgba(56,37,27,0.3)] bg-[#211810]">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#F3E7CC] font-serif">
                      <span className="text-3xl font-bold">RP</span>
                      <span className="text-[11px] font-cinzel text-[#B58A43] tracking-widest mt-1">SCRIBE</span>
                    </div>
                  )}
                </div>

                {/* Name & Academic Rank */}
                <div className="mt-4">
                  <h3 className="font-cinzel text-xl font-bold text-[#211810] tracking-wide">
                    {profile.name}
                  </h3>
                  <div className="font-serif italic text-sm text-[#8C3828] font-medium">
                    {profile.headline}
                  </div>
                  <div className="font-cinzel text-[11px] text-[#5A3E2B] tracking-wider mt-1">
                    B.Tech CSE (AI & ML) • 3rd Year
                  </div>
                </div>

                {/* Seal of Authenticity */}
                <div className="mt-3 flex items-center justify-center">
                  <span className="ink-stamp text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C3828]" />
                    Verified Student & Builder
                  </span>
                </div>
              </div>

              {/* Folio Metadata Registry */}
              <div className="p-4 rounded bg-[#FAF4E5] border border-[#B58A43]/50 space-y-3 text-sm font-serif">
                <div className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#8C3828] pb-1 border-b border-[#B58A43]/30">
                  Archival Details
                </div>

                <div className="flex items-center gap-2.5 text-[#38251B]">
                  <MapPin className="w-4 h-4 text-[#8C3828] shrink-0" />
                  <span>{profile.location}</span>
                </div>

                <div className="flex items-center gap-2.5 text-[#38251B]">
                  <Mail className="w-4 h-4 text-[#8C3828] shrink-0" />
                  <a
                    href={`mailto:${profile.email}`}
                    className="hover:text-[#8C3828] transition-colors underline decoration-[#B58A43]/40"
                  >
                    {profile.email}
                  </a>
                </div>

                {profile.phone && (
                  <div className="flex items-center gap-2.5 text-[#38251B]">
                    <Phone className="w-4 h-4 text-[#8C3828] shrink-0" />
                    <span>{profile.phone}</span>
                  </div>
                )}
              </div>

            </div>

          </div>

          <KolamDivider className="mt-8 mb-2" />
        </div>

      </div>
    </section>
  );
};

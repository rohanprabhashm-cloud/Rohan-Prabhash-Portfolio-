import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  UploadCloud, 
  User, 
  Shield, 
  Sliders, 
  Layers, 
  Eye, 
  Palette,
  RotateCcw
} from 'lucide-react';

interface SpiderHeroPortraitProps {
  onExploreProjects?: () => void;
}

interface MaskPreset {
  id: string;
  name: string;
  badge: string;
  themeColor: string;
  secondaryColor: string;
}

const MASK_PRESETS: MaskPreset[] = [
  {
    id: 'classic_red',
    name: 'Classic Crimson',
    badge: 'EARTH-616',
    themeColor: '#F02030',
    secondaryColor: '#080808',
  },
  {
    id: 'miles_morales',
    name: 'Shadow Stealth',
    badge: 'EARTH-1610',
    themeColor: '#141416',
    secondaryColor: '#F02030',
  },
  {
    id: 'iron_spider',
    name: 'Nanotech Armor',
    badge: 'STARK TECH',
    themeColor: '#B91C1C',
    secondaryColor: '#EAB308',
  },
  {
    id: 'spider_2099',
    name: 'Cyber 2099',
    badge: 'NUEVA YORK',
    themeColor: '#1E3A8A',
    secondaryColor: '#F02030',
  },
  {
    id: 'symbiote',
    name: 'Midnight Venom',
    badge: 'KLYNTAR',
    themeColor: '#0A0A0B',
    secondaryColor: '#FFFFFF',
  },
];

export const SpiderHeroPortrait: React.FC<SpiderHeroPortraitProps> = () => {
  const DEFAULT_MASK_ASSET = '/photos/superhero_portrait.svg';
  const DEFAULT_PLACEHOLDER_ASSET = '/photos/civilian_placeholder.svg';

  // Persisted custom uploaded superhero mask
  const [customMaskImage, setCustomMaskImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('rp_custom_mask') || null;
    } catch {
      return null;
    }
  });

  const [activeMaskPreset, setActiveMaskPreset] = useState<string>(() => {
    try {
      return localStorage.getItem('rp_active_mask_preset') || 'classic_red';
    } catch {
      return 'classic_red';
    }
  });

  // Persisted civilian portrait
  const [uploadedPortrait, setUploadedPortrait] = useState<string | null>(() => {
    try {
      return localStorage.getItem('rp_custom_portrait') || null;
    } catch {
      return null;
    }
  });

  // Active view: 'mask' or 'portrait'
  const [activeView, setActiveView] = useState<'mask' | 'portrait'>('mask');
  const [isHovered, setIsHovered] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [studioTab, setStudioTab] = useState<'portrait' | 'mask'>('portrait');

  // Overlay mode
  const [isOverlayMode, setIsOverlayMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('rp_mask_overlay_mode') === 'true';
    } catch {
      return false;
    }
  });

  const [maskScale, setMaskScale] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('rp_mask_scale')) || 100;
    } catch {
      return 100;
    }
  });

  const [maskOffsetY, setMaskOffsetY] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('rp_mask_offset_y')) || 0;
    } catch {
      return 0;
    }
  });

  const portraitInputRef = useRef<HTMLInputElement>(null);
  const maskInputRef = useRef<HTMLInputElement>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handlePortraitUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFeedback({ type: 'error', message: 'Please select a valid image file (JPG, PNG, or WebP).' });
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setFeedback({ type: 'error', message: 'Image exceeds 8MB size limit.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setUploadedPortrait(dataUrl);
      try {
        localStorage.setItem('rp_custom_portrait', dataUrl);
      } catch {}
      setFeedback({ type: 'success', message: 'Civilian portrait updated successfully!' });
      setActiveView('portrait');
    };
    reader.readAsDataURL(file);
  };

  const handleMaskUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFeedback({ type: 'error', message: 'Please select an image file for the mask.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setCustomMaskImage(dataUrl);
      setActiveMaskPreset('custom');
      try {
        localStorage.setItem('rp_custom_mask', dataUrl);
        localStorage.setItem('rp_active_mask_preset', 'custom');
      } catch {}
      setFeedback({ type: 'success', message: 'Custom superhero mask loaded!' });
      setActiveView('mask');
    };
    reader.readAsDataURL(file);
  };

  const handleResetPortrait = () => {
    setUploadedPortrait(null);
    try {
      localStorage.removeItem('rp_custom_portrait');
    } catch {}
    setFeedback({ type: 'success', message: 'Reset to default avatar.' });
  };

  const handleResetMask = () => {
    setCustomMaskImage(null);
    setActiveMaskPreset('classic_red');
    try {
      localStorage.removeItem('rp_custom_mask');
      localStorage.setItem('rp_active_mask_preset', 'classic_red');
    } catch {}
    setFeedback({ type: 'success', message: 'Reset to Classic Crimson suit.' });
  };

  const toggleView = () => {
    setActiveView((prev) => (prev === 'mask' ? 'portrait' : 'mask'));
  };

  // Determine if civilian portrait should show
  const showCivilianLayer = isHovered ? activeView === 'mask' : activeView === 'portrait';

  // Render superhero mask layer
  const renderMaskGraphic = () => {
    if (customMaskImage && activeMaskPreset === 'custom') {
      return (
        <img
          src={customMaskImage}
          alt="Custom Superhero Mask"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
      );
    }

    if (activeMaskPreset === 'miles_morales') {
      return (
        <div className="w-full h-full bg-[#0a0a0c] relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#F02030_0%,transparent_60%)] opacity-30" />
          <svg className="w-full h-full p-8" viewBox="0 0 400 500" fill="none">
            {/* Geometric web pattern */}
            <path d="M 200 80 Q 200 420 200 420" stroke="#F02030" strokeWidth="2.5" opacity="0.8" />
            <path d="M 120 180 Q 200 240 280 180" stroke="#F02030" strokeWidth="2" opacity="0.7" />
            <path d="M 100 260 Q 200 330 300 260" stroke="#F02030" strokeWidth="2" opacity="0.7" />
            <path d="M 80 150 C 70 280 140 400 200 430 C 260 400 330 280 320 150 C 310 90 200 80 200 80 C 200 80 90 90 80 150 Z" fill="#111114" stroke="#F02030" strokeWidth="3" />
            {/* Eyes */}
            <path d="M 130 210 C 145 190 175 200 185 240 C 170 250 140 245 130 210 Z" fill="#FFFFFF" stroke="#000" strokeWidth="3" filter="drop-shadow(0 0 8px rgba(255,255,255,0.8))" />
            <path d="M 270 210 C 255 190 225 200 215 240 C 230 250 260 245 270 210 Z" fill="#FFFFFF" stroke="#000" strokeWidth="3" filter="drop-shadow(0 0 8px rgba(255,255,255,0.8))" />
          </svg>
        </div>
      );
    }

    if (activeMaskPreset === 'iron_spider') {
      return (
        <div className="w-full h-full bg-[#140507] relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#EAB308_0%,transparent_65%)] opacity-30" />
          <svg className="w-full h-full p-8" viewBox="0 0 400 500" fill="none">
            <path d="M 80 150 C 70 280 140 400 200 430 C 260 400 330 280 320 150 C 310 90 200 80 200 80 C 200 80 90 90 80 150 Z" fill="#991B1B" stroke="#EAB308" strokeWidth="3" />
            <path d="M 125 210 C 145 190 175 195 185 235 C 170 245 140 245 125 210 Z" fill="#FEF08A" stroke="#000" strokeWidth="2.5" />
            <path d="M 275 210 C 255 190 225 195 215 235 C 230 245 260 245 275 210 Z" fill="#FEF08A" stroke="#000" strokeWidth="2.5" />
          </svg>
        </div>
      );
    }

    if (activeMaskPreset === 'spider_2099') {
      return (
        <div className="w-full h-full bg-[#050B1A] relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#F02030_0%,transparent_65%)] opacity-35" />
          <svg className="w-full h-full p-8" viewBox="0 0 400 500" fill="none">
            <path d="M 80 150 C 70 280 140 400 200 430 C 260 400 330 280 320 150 C 310 90 200 80 200 80 C 200 80 90 90 80 150 Z" fill="#0C1B33" stroke="#F02030" strokeWidth="3.5" />
            <path d="M 130 215 L 175 235 L 180 255 L 140 245 Z" fill="#F02030" filter="drop-shadow(0 0 10px #F02030)" />
            <path d="M 270 215 L 225 235 L 220 255 L 260 245 Z" fill="#F02030" filter="drop-shadow(0 0 10px #F02030)" />
          </svg>
        </div>
      );
    }

    if (activeMaskPreset === 'symbiote') {
      return (
        <div className="w-full h-full bg-[#050506] relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#ffffff_0%,transparent_70%)] opacity-20" />
          <svg className="w-full h-full p-8" viewBox="0 0 400 500" fill="none">
            <path d="M 80 150 C 70 280 140 400 200 430 C 260 400 330 280 320 150 C 310 90 200 80 200 80 C 200 80 90 90 80 150 Z" fill="#0B0B0E" stroke="#ffffff" strokeWidth="2.5" opacity="0.9" />
            <path d="M 120 200 C 145 175 180 190 190 245 C 165 260 130 250 120 200 Z" fill="#FFFFFF" filter="drop-shadow(0 0 12px rgba(255,255,255,0.9))" />
            <path d="M 280 200 C 255 175 220 190 210 245 C 235 260 270 250 280 200 Z" fill="#FFFFFF" filter="drop-shadow(0 0 12px rgba(255,255,255,0.9))" />
          </svg>
        </div>
      );
    }

    // Default: Classic Spidey SVG
    return (
      <img
        src={DEFAULT_MASK_ASSET}
        alt="Classic Spider-Verse Hero Cowl"
        className="w-full h-full object-cover object-center"
        referrerPolicy="no-referrer"
      />
    );
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hidden file inputs */}
      <input
        ref={portraitInputRef}
        type="file"
        accept="image/*"
        onChange={handlePortraitUpload}
        className="hidden"
      />
      <input
        ref={maskInputRef}
        type="file"
        accept="image/*"
        onChange={handleMaskUpload}
        className="hidden"
      />

      {/* Hero Portrait Frame: Spacious, cinematic, dark border with red ambient illumination */}
      <div className="relative group w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[450px]">
        
        {/* Atmospheric Crimson Glow behind portrait */}
        <div className="absolute -inset-4 bg-[#F02030]/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

        {/* Main Artwork Container */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={toggleView}
          className="relative aspect-[3/4] w-full rounded-2xl bg-[#0B0B0B] border border-[#262626] group-hover:border-[#F02030]/60 transition-all duration-300 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] cursor-pointer select-none"
        >
          {/* Subtle Corner Spider-Web Accent */}
          <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-20 z-20">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-white">
              <path d="M 100 0 L 0 0" strokeWidth="1" />
              <path d="M 100 0 L 100 100" strokeWidth="1" />
              <path d="M 100 0 L 20 80" strokeWidth="1" />
              <path d="M 100 30 Q 70 70 30 100" strokeWidth="0.8" />
              <path d="M 100 60 Q 80 80 60 100" strokeWidth="0.8" />
            </svg>
          </div>

          {/* Layer 1: Superhero Mask Layer */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              showCivilianLayer ? 'opacity-0 pointer-events-none' : 'opacity-100 z-10'
            }`}
          >
            {renderMaskGraphic()}
          </div>

          {/* Layer 2: Civilian Portrait Layer (Uploaded or Default) */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out bg-[#0E0E0E] ${
              showCivilianLayer ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
            }`}
          >
            {uploadedPortrait ? (
              <img
                src={uploadedPortrait}
                alt="Rohan Prabhash Civilian Portrait"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full relative flex flex-col items-center justify-center p-6 bg-[#0E0E0E]">
                <img
                  src={DEFAULT_PLACEHOLDER_ASSET}
                  alt="Default Civilian Placeholder"
                  className="w-full h-full object-cover object-center opacity-85"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-6 text-center">
                  <span className="text-xs text-neutral-300 font-medium">
                    Hover or click to toggle · Click Customize to upload your photo
                  </span>
                </div>
              </div>
            )}

            {/* Optional Overlay Mask on Real Face */}
            {isOverlayMode && (
              <div
                className="absolute inset-x-0 pointer-events-none transition-transform"
                style={{
                  top: `${maskOffsetY}%`,
                  transform: `scale(${maskScale / 100})`,
                }}
              >
                <div className="w-40 h-40 mx-auto opacity-90 drop-shadow-[0_0_15px_#F02030]">
                  {renderMaskGraphic()}
                </div>
              </div>
            )}
          </div>

          {/* Gradient Scrim at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent z-20 pointer-events-none" />

          {/* Clean Floating Status Ribbon */}
          <div className="absolute bottom-4 inset-x-4 z-30 flex items-center justify-between text-xs font-semibold">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-white shadow-lg">
              <span className={`w-2 h-2 rounded-full ${showCivilianLayer ? 'bg-white' : 'bg-[#F02030] shadow-[0_0_8px_#F02030]'}`} />
              <span className="tracking-wide">
                {showCivilianLayer ? 'CIVILIAN IDENTITY' : 'HERO COWL ACTIVE'}
              </span>
            </div>

            <span className="text-[11px] font-mono text-neutral-400 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
              HOVER TO REVEAL
            </span>
          </div>
        </div>

        {/* Minimal Control Pill Bar Below Portrait */}
        <div className="mt-4 flex items-center justify-between gap-2 px-1">
          <button
            onClick={toggleView}
            className="flex-1 py-2 px-3 rounded-lg bg-[#141414] hover:bg-[#1C1C1C] text-neutral-300 hover:text-white border border-[#262626] text-xs font-semibold tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Eye className="w-3.5 h-3.5 text-[#F02030]" />
            <span>TOGGLE VIEW</span>
          </button>

          <button
            onClick={() => setIsStudioOpen(true)}
            className="py-2 px-4 rounded-lg bg-[#F02030]/10 hover:bg-[#F02030] text-[#F02030] hover:text-white border border-[#F02030]/40 text-xs font-bold tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>CUSTOMIZE</span>
          </button>
        </div>

        {/* Toast Feedback Notification */}
        {feedback && (
          <div
            className={`mt-3 p-3 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${
              feedback.type === 'success'
                ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
                : 'bg-red-950/80 border border-red-500/40 text-red-300'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

      </div>

      {/* Cinematic Customization Studio Modal */}
      {isStudioOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsStudioOpen(false);
          }}
        >
          <div className="relative w-full max-w-lg bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-white">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#222222] pb-4 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#F02030] flex items-center justify-center text-white">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">PORTRAIT & MASK STUDIO</h3>
                  <p className="text-xs text-neutral-400">Personalize civilian headshot or superhero cowl</p>
                </div>
              </div>

              <button
                onClick={() => setIsStudioOpen(false)}
                className="p-1.5 rounded-lg bg-[#1A1A1A] text-neutral-400 hover:text-white hover:bg-[#252525] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Studio Tabs */}
            <div className="flex items-center gap-2 p-1 bg-[#181818] rounded-xl mb-6">
              <button
                onClick={() => setStudioTab('portrait')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                  studioTab === 'portrait'
                    ? 'bg-[#242424] text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>MY CIVILIAN PHOTO</span>
              </button>
              <button
                onClick={() => setStudioTab('mask')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                  studioTab === 'mask'
                    ? 'bg-[#242424] text-[#F02030] shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>SUPERHERO COWL</span>
              </button>
            </div>

            {/* Tab 1: Civilian Portrait Controls */}
            {studioTab === 'portrait' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#161616] border border-[#242424]">
                  <p className="text-xs text-neutral-300 font-medium leading-relaxed mb-3">
                    Upload your real portrait to appear behind the hero cowl when visitors hover over the hero image.
                  </p>
                  
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      onClick={() => portraitInputRef.current?.click()}
                      className="px-4 py-2.5 rounded-lg bg-[#F02030] hover:bg-[#d01827] text-white text-xs font-bold tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>UPLOAD YOUR PHOTO</span>
                    </button>

                    {uploadedPortrait && (
                      <button
                        onClick={handleResetPortrait}
                        className="px-3.5 py-2.5 rounded-lg bg-[#222222] hover:bg-[#2A2A2A] text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>RESET</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Face Overlay Mode Option */}
                <div className="p-4 rounded-xl bg-[#161616] border border-[#242424] space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">Wear Cowl on Real Face</span>
                      <span className="text-[11px] text-neutral-400">Overlay superhero mask over civilian photo</span>
                    </div>
                    <button
                      onClick={() => {
                        const next = !isOverlayMode;
                        setIsOverlayMode(next);
                        try {
                          localStorage.setItem('rp_mask_overlay_mode', String(next));
                        } catch {}
                      }}
                      className={`w-11 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
                        isOverlayMode ? 'bg-[#F02030] justify-end' : 'bg-[#2A2A2A] justify-start'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-white block shadow" />
                    </button>
                  </div>

                  {isOverlayMode && (
                    <div className="pt-3 border-t border-[#222222] space-y-2.5 text-xs">
                      <div>
                        <div className="flex justify-between text-neutral-400 mb-1">
                          <span>Mask Scale Size</span>
                          <span className="font-mono text-white">{maskScale}%</span>
                        </div>
                        <input
                          type="range"
                          min="60"
                          max="140"
                          value={maskScale}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setMaskScale(val);
                            try {
                              localStorage.setItem('rp_mask_scale', String(val));
                            } catch {}
                          }}
                          className="w-full accent-[#F02030]"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-neutral-400 mb-1">
                          <span>Vertical Offset</span>
                          <span className="font-mono text-white">{maskOffsetY}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="50"
                          value={maskOffsetY}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setMaskOffsetY(val);
                            try {
                              localStorage.setItem('rp_mask_offset_y', String(val));
                            } catch {}
                          }}
                          className="w-full accent-[#F02030]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Superhero Mask Controls */}
            {studioTab === 'mask' && (
              <div className="space-y-4">
                {/* Cowl Presets */}
                <div>
                  <span className="text-xs font-bold text-neutral-300 block mb-2.5 uppercase tracking-wider">
                    Select Hero Suit Cowl
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {MASK_PRESETS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setActiveMaskPreset(p.id);
                          setCustomMaskImage(null);
                          try {
                            localStorage.setItem('rp_active_mask_preset', p.id);
                            localStorage.removeItem('rp_custom_mask');
                          } catch {}
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          activeMaskPreset === p.id && !customMaskImage
                            ? 'bg-[#1D1214] border-[#F02030] text-white shadow-[0_0_15px_rgba(240,32,48,0.2)]'
                            : 'bg-[#161616] border-[#262626] text-neutral-400 hover:text-white hover:border-[#383838]'
                        }`}
                      >
                        <span className="text-xs font-bold block text-white">{p.name}</span>
                        <span className="text-[10px] font-mono text-[#F02030]">{p.badge}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload Custom Mask File */}
                <div className="p-4 rounded-xl bg-[#161616] border border-[#242424]">
                  <span className="text-xs font-bold text-white block mb-1">
                    Upload Custom Superhero Mask
                  </span>
                  <p className="text-[11px] text-neutral-400 mb-3">
                    Upload any PNG, SVG, or JPG mask file to use as your hero cowl.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => maskInputRef.current?.click()}
                      className="px-4 py-2 rounded-lg bg-[#242424] hover:bg-[#2C2C2C] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <UploadCloud className="w-3.5 h-3.5 text-[#F02030]" />
                      <span>BROWSE MASK FILE</span>
                    </button>
                    <button
                      onClick={handleResetMask}
                      className="px-3 py-2 rounded-lg bg-[#1A1A1A] hover:bg-[#222222] text-neutral-400 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      RESTORE DEFAULT
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-[#222222] flex justify-end">
              <button
                onClick={() => setIsStudioOpen(false)}
                className="px-5 py-2.5 rounded-lg bg-[#F02030] hover:bg-[#d01827] text-white text-xs font-bold tracking-wider transition-colors cursor-pointer"
              >
                DONE
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

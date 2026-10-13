import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, Check, RotateCcw, AlertCircle, Sparkles } from 'lucide-react';
import { GalleryPhoto, PhotoCategory, PhotoAspect } from '../types/portfolio';

interface ManagePhotosModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: GalleryPhoto[];
  onSavePhotos: (photos: GalleryPhoto[]) => void;
  onResetDefaults: () => void;
  editingPhotoId?: string | null;
}

export const ManagePhotosModal: React.FC<ManagePhotosModalProps> = ({
  isOpen,
  onClose,
  photos,
  onSavePhotos,
  onResetDefaults,
  editingPhotoId,
}) => {
  const [photoList, setPhotoList] = useState<GalleryPhoto[]>([]);
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

  // New photo form state
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newCategory, setNewCategory] = useState<PhotoCategory>('projects');
  const [newAspect, setNewAspect] = useState<PhotoAspect>('landscape');
  const [newLocation, setNewLocation] = useState('');
  const [newYear, setNewYear] = useState(new Date().getFullYear().toString());

  // Edit inline photo state
  const [editUrl, setEditUrl] = useState('');
  const [editCaption, setEditCaption] = useState('');
  const [editCategory, setEditCategory] = useState<PhotoCategory>('projects');
  const [editAspect, setEditAspect] = useState<PhotoAspect>('landscape');
  const [editLocation, setEditLocation] = useState('');
  const [editYear, setEditYear] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPhotoList([...photos]);
      if (editingPhotoId) {
        setSelectedPhotoId(editingPhotoId);
        const target = photos.find((p) => p.id === editingPhotoId);
        if (target) {
          setEditUrl(target.url);
          setEditCaption(target.caption);
          setEditCategory(target.category);
          setEditAspect(target.aspect);
          setEditLocation(target.location || '');
          setEditYear(target.year || '');
        }
      } else if (photos.length > 0) {
        const first = photos[0];
        setSelectedPhotoId(first.id);
        setEditUrl(first.url);
        setEditCaption(first.caption);
        setEditCategory(first.category);
        setEditAspect(first.aspect);
        setEditLocation(first.location || '');
        setEditYear(first.year || '');
      }
    }
  }, [isOpen, photos, editingPhotoId]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectToEdit = (photo: GalleryPhoto) => {
    setSelectedPhotoId(photo.id);
    setEditUrl(photo.url);
    setEditCaption(photo.caption);
    setEditCategory(photo.category);
    setEditAspect(photo.aspect);
    setEditLocation(photo.location || '');
    setEditYear(photo.year || '');
    setActiveTab('list');
  };

  const handleApplyEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPhotoId) return;

    const updated = photoList.map((p) => {
      if (p.id !== selectedPhotoId) return p;
      return {
        ...p,
        url: editUrl.trim() || p.url,
        caption: editCaption.trim(),
        category: editCategory,
        aspect: editAspect,
        location: editLocation.trim(),
        year: editYear.trim(),
        isSamplePlaceholder: editUrl.startsWith('data:image/svg+xml') && editUrl === p.url ? p.isSamplePlaceholder : false,
      };
    });

    setPhotoList(updated);
    onSavePhotos(updated);
    setSaveSuccessMsg('Photo details saved!');
    setTimeout(() => setSaveSuccessMsg(''), 2500);
  };

  const handleAddNewPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim()) return;

    const newPhoto: GalleryPhoto = {
      id: `photo_${Date.now()}`,
      url: newUrl.trim(),
      caption: newCaption.trim(),
      category: newCategory,
      aspect: newAspect,
      location: newLocation.trim(),
      year: newYear.trim(),
      isSamplePlaceholder: false,
      altText: newCaption.trim() || `${newCategory} photograph`,
    };

    const updated = [newPhoto, ...photoList];
    setPhotoList(updated);
    onSavePhotos(updated);

    // Reset add form
    setNewUrl('');
    setNewCaption('');
    setNewLocation('');
    setActiveTab('list');
    setSelectedPhotoId(newPhoto.id);
    setSaveSuccessMsg('New photo added successfully!');
    setTimeout(() => setSaveSuccessMsg(''), 2500);
  };

  const handleDeletePhoto = (id: string) => {
    const updated = photoList.filter((p) => p.id !== id);
    setPhotoList(updated);
    onSavePhotos(updated);
    if (selectedPhotoId === id) {
      if (updated.length > 0) {
        handleSelectToEdit(updated[0]);
      } else {
        setSelectedPhotoId(null);
      }
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= photoList.length) return;

    const copy = [...photoList];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    setPhotoList(copy);
    onSavePhotos(copy);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Personal Photo Gallery Manager"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col parchment-sheet border-2 border-[#B58A43] rounded-lg shadow-2xl overflow-hidden text-[#211810]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#B58A43]/50 bg-[#E2CDA5]/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-cinzel uppercase tracking-widest text-[#8C3828] font-bold">
                Archival Journal Registry
              </span>
              <span className="text-[#B58A43]" aria-hidden="true">·</span>
              <span className="text-xs font-serif text-[#38251B]">{photoList.length} Folios</span>
            </div>
            <h3 className="font-cinzel text-xl font-bold text-[#211810] tracking-tight mt-0.5">
              Personalize "Beyond the Code" Artifacts
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#5A3E2B] hover:text-[#8C3828] rounded transition-colors cursor-pointer"
            aria-label="Close modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Helpful Guidance Notice */}
        <div className="px-6 py-2.5 bg-[#FAF4E5] border-b border-[#B58A43]/40 flex items-start gap-3 font-serif">
          <AlertCircle className="w-4 h-4 text-[#8C3828] shrink-0 mt-0.5" />
          <div className="text-xs text-[#38251B] leading-relaxed">
            <span className="font-semibold text-[#8C3828]">Mount your real photographs: </span>
            Drop image files into <code className="px-1.5 py-0.5 rounded bg-[#E2CDA5] text-[#211810] font-mono">public/photos/</code> (e.g. <code className="px-1 py-0.5 rounded bg-[#E2CDA5] text-[#211810] font-mono">/photos/portrait.jpg</code>) or paste any image URL.
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-6 pt-3 border-b border-[#B58A43]/30 bg-[#FAF4E5] font-cinzel">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors cursor-pointer ${
                activeTab === 'list'
                  ? 'bg-[#E2CDA5] text-[#8C3828] border-t-2 border-[#8C3828]'
                  : 'text-[#5A3E2B] hover:text-[#211810]'
              }`}
            >
              Archival Folios ({photoList.length})
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-t-lg transition-colors cursor-pointer ${
                activeTab === 'add'
                  ? 'bg-[#E2CDA5] text-[#8C3828] border-t-2 border-[#8C3828]'
                  : 'text-[#5A3E2B] hover:text-[#211810]'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Inscribe New Memory</span>
            </button>
          </div>

          <button
            onClick={() => {
              if (confirm('Reset gallery to default sample placeholders?')) {
                onResetDefaults();
                onClose();
              }
            }}
            className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-300 transition-colors pb-2"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {saveSuccessMsg && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
              <Check className="w-4 h-4 shrink-0" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}

          {activeTab === 'add' ? (
            /* Add Photo Form */
            <form onSubmit={handleAddNewPhoto} className="space-y-4 max-w-xl mx-auto py-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  Image URL or Path <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="/photos/my-photo.jpg or https://..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
                <p className="text-[11px] text-slate-500">
                  Path relative to public directory (e.g. <code className="text-slate-400">/photos/portrait.jpg</code>) or full web URL.
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  Caption (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell the story or context behind this photo..."
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as PhotoCategory)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                  >
                    <option value="portrait">Portrait / Headshot</option>
                    <option value="campus">Campus & University</option>
                    <option value="hackathon">Hackathon & Team</option>
                    <option value="projects">Projects & Hardware Lab</option>
                    <option value="travel">Travel & Outdoor</option>
                    <option value="life">Community & Meetup</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Card Aspect Ratio</label>
                  <select
                    value={newAspect}
                    onChange={(e) => setNewAspect(e.target.value as PhotoAspect)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
                  >
                    <option value="portrait">Portrait (3:4)</option>
                    <option value="landscape">Landscape (16:10)</option>
                    <option value="featured">Featured Hero (Wide)</option>
                    <option value="square">Square (1:1)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Location Tag (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Bangalore, Campus Quad"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Year</label>
                  <input
                    type="text"
                    placeholder="2025"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Gallery</span>
                </button>
              </div>
            </form>
          ) : (
            /* Photos List & Reorder / Edit Section */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Photo List & Reordering */}
              <div className="lg:col-span-5 space-y-2">
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Gallery Order & Selection
                </div>

                {photoList.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500 border border-dashed border-white/10 rounded-xl">
                    No photos currently in gallery. Click "Add New Photo" to add one.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                    {photoList.map((photo, index) => {
                      const isSelected = photo.id === selectedPhotoId;
                      return (
                        <div
                          key={photo.id}
                          className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                            isSelected
                              ? 'bg-cyan-950/30 border-cyan-500/40 text-white'
                              : 'bg-slate-900/40 border-white/[0.06] text-slate-300 hover:border-white/20'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => handleSelectToEdit(photo)}
                            className="flex items-center gap-3 text-left flex-1 min-w-0"
                          >
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-950 border border-white/10 shrink-0 flex items-center justify-center">
                              <img
                                src={photo.url}
                                alt=""
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-medium truncate">
                                {photo.caption || `${photo.category} photo`}
                              </div>
                              <div className="text-[10px] text-slate-500 flex items-center gap-1.5 capitalize">
                                <span>{photo.category}</span>
                                <span>·</span>
                                <span>{photo.aspect}</span>
                                {photo.isSamplePlaceholder && (
                                  <>
                                    <span>·</span>
                                    <span className="text-cyan-400 font-mono">Sample</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </button>

                          {/* Reorder and Delete actions */}
                          <div className="flex items-center gap-1 shrink-0 ml-2">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={() => handleMove(index, 'up')}
                              className="p-1 text-slate-400 hover:text-white disabled:opacity-20 transition-colors"
                              title="Move photo earlier"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={index === photoList.length - 1}
                              onClick={() => handleMove(index, 'down')}
                              className="p-1 text-slate-400 hover:text-white disabled:opacity-20 transition-colors"
                              title="Move photo later"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeletePhoto(photo.id)}
                              className="p-1 text-slate-500 hover:text-red-400 transition-colors ml-1"
                              title="Delete photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column: Inline Editor for Selected Photo */}
              <div className="lg:col-span-7 bg-slate-900/60 border border-white/[0.08] rounded-xl p-5 space-y-4">
                {selectedPhotoId ? (
                  <form onSubmit={handleApplyEdit} className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                      <div className="text-xs font-semibold text-white uppercase tracking-wider">
                        Edit Selected Photo
                      </div>
                      <span className="text-[11px] font-mono text-cyan-400">
                        ID: {selectedPhotoId}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-300">
                        Image File Path or URL
                      </label>
                      <input
                        type="text"
                        value={editUrl}
                        onChange={(e) => setEditUrl(e.target.value)}
                        placeholder="/photos/my-photo.jpg or https://..."
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-300">
                        Photo Caption
                      </label>
                      <textarea
                        rows={2}
                        value={editCaption}
                        onChange={(e) => setEditCaption(e.target.value)}
                        placeholder="Context or story behind the photo..."
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-300">Category</label>
                        <select
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value as PhotoCategory)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                        >
                          <option value="portrait">Portrait</option>
                          <option value="campus">Campus</option>
                          <option value="hackathon">Hackathon</option>
                          <option value="projects">Projects & Lab</option>
                          <option value="travel">Travel</option>
                          <option value="life">Meetup & Community</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-300">Card Aspect Ratio</label>
                        <select
                          value={editAspect}
                          onChange={(e) => setEditAspect(e.target.value as PhotoAspect)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                        >
                          <option value="portrait">Portrait (3:4)</option>
                          <option value="landscape">Landscape (16:10)</option>
                          <option value="featured">Featured Wide</option>
                          <option value="square">Square (1:1)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-300">Location Tag</label>
                        <input
                          type="text"
                          value={editLocation}
                          onChange={(e) => setEditLocation(e.target.value)}
                          placeholder="e.g. Bangalore, Lab 3"
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-300">Year</label>
                        <input
                          type="text"
                          value={editYear}
                          onChange={(e) => setEditYear(e.target.value)}
                          placeholder="2025"
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleDeletePhoto(selectedPhotoId)}
                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete this photo</span>
                      </button>

                      <button
                        type="submit"
                        className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                      >
                        Save Photo Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="py-12 text-center text-xs text-slate-500">
                    Select a photo from the left to edit its details.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.08] bg-slate-900/50">
          <div className="text-xs text-slate-400">
            Changes are saved to browser storage and update immediately.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white bg-white/10 hover:bg-white/15 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

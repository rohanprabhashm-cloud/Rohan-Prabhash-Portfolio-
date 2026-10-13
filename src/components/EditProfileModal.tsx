import React, { useState } from 'react';
import { X, Save, RotateCcw, Feather, Check } from 'lucide-react';
import { ProfileData } from '../types/portfolio';
import { ManuscriptCorner } from './ManuscriptMotifs';

interface EditProfileModalProps {
  profile: ProfileData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: ProfileData) => void;
  onReset: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profile,
  isOpen,
  onClose,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<ProfileData>({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setFormData({ ...profile });
    }
  }, [isOpen, profile]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (field: keyof ProfileData, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleEducationChange = (field: string, val: string) => {
    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [field]: val,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl parchment-sheet border-2 border-[#B58A43] rounded-lg shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col text-[#211810]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#B58A43]/50 flex items-center justify-between bg-[#E2CDA5]/70">
          <div className="flex items-center gap-2.5">
            <Feather className="w-5 h-5 text-[#8C3828]" />
            <div>
              <h3 id="edit-profile-title" className="font-cinzel text-lg font-bold text-[#211810]">
                Scribe Ledger • Customize Details
              </h3>
              <p className="font-serif italic text-xs text-[#5A3E2B]">
                Update identity, availability, coordinates, and educational records. Persists in local parchment storage.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#5A3E2B] hover:text-[#8C3828] cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs font-serif">
          
          {/* Personal & Headline */}
          <div className="space-y-3">
            <div className="font-cinzel text-xs font-bold text-[#8C3828] uppercase tracking-wider">
              Primary Identity
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#38251B] font-medium mb-1">Display Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
                />
              </div>

              <div>
                <label className="block text-[#38251B] font-medium mb-1">Availability Label</label>
                <input
                  type="text"
                  required
                  value={formData.availability}
                  onChange={(e) => handleChange('availability', e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#38251B] font-medium mb-1">Main Headline</label>
              <input
                type="text"
                required
                value={formData.headline}
                onChange={(e) => handleChange('headline', e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
              />
            </div>

            <div>
              <label className="block text-[#38251B] font-medium mb-1">Supporting Text</label>
              <textarea
                rows={2}
                required
                value={formData.supportingText}
                onChange={(e) => handleChange('supportingText', e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810] resize-none"
              />
            </div>

            <div>
              <label className="block text-[#38251B] font-medium mb-1">Portrait / Profile Photo URL</label>
              <input
                type="text"
                placeholder="/photos/portrait.jpg or https://..."
                value={formData.avatarUrl || ''}
                onChange={(e) => handleChange('avatarUrl', e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
              />
            </div>
          </div>

          {/* Contact Coordinates */}
          <div className="space-y-3 pt-3 border-t border-[#B58A43]/40">
            <div className="font-cinzel text-xs font-bold text-[#8C3828] uppercase tracking-wider">
              Contact Coordinates
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#38251B] font-medium mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
                />
              </div>

              <div>
                <label className="block text-[#38251B] font-medium mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#38251B] font-medium mb-1">GitHub URL</label>
                <input
                  type="url"
                  required
                  value={formData.github}
                  onChange={(e) => handleChange('github', e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
                />
              </div>

              <div>
                <label className="block text-[#38251B] font-medium mb-1">LinkedIn URL</label>
                <input
                  type="url"
                  required
                  value={formData.linkedin}
                  onChange={(e) => handleChange('linkedin', e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
                />
              </div>
            </div>
          </div>

          {/* Academics */}
          <div className="space-y-3 pt-3 border-t border-[#B58A43]/40">
            <div className="font-cinzel text-xs font-bold text-[#8C3828] uppercase tracking-wider">
              Academic Record
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#38251B] font-medium mb-1">Institution</label>
                <input
                  type="text"
                  required
                  value={formData.education.institution}
                  onChange={(e) => handleEducationChange('institution', e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
                />
              </div>

              <div>
                <label className="block text-[#38251B] font-medium mb-1">Specialization</label>
                <input
                  type="text"
                  required
                  value={formData.education.specialization}
                  onChange={(e) => handleEducationChange('specialization', e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF4E5] border border-[#B58A43] rounded text-[#211810]"
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#B58A43]/50 flex items-center justify-between">
            <button
              type="button"
              onClick={onReset}
              className="px-3 py-2 rounded bg-[#FAF4E5] hover:bg-[#F3E7CC] text-[#8C3828] font-cinzel text-xs flex items-center gap-1.5 border border-[#B58A43]/60 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-cinzel text-xs text-[#5A3E2B]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs font-bold border border-[#B58A43] flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Inscribed!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

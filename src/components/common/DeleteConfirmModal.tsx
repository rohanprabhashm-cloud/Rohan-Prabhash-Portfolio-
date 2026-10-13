import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { ManuscriptCorner } from '../ManuscriptMotifs';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  itemName: string;
  itemType: 'creation' | 'chronicle' | 'record';
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  title,
  itemName,
  itemType,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="relative w-full max-w-md parchment-sheet border-2 border-[#8C3828] rounded-lg shadow-2xl p-6 text-[#211810]">
        <ManuscriptCorner position="top-left" size={24} className="absolute top-2 left-2 opacity-80" />
        <ManuscriptCorner position="top-right" size={24} className="absolute top-2 right-2 opacity-80" />
        <ManuscriptCorner position="bottom-left" size={24} className="absolute bottom-2 left-2 opacity-80" />
        <ManuscriptCorner position="bottom-right" size={24} className="absolute bottom-2 right-2 opacity-80" />

        <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#B58A43]/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#8C3828]/15 border border-[#8C3828] flex items-center justify-center text-[#8C3828]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="font-cinzel text-[10px] tracking-widest text-[#8C3828] uppercase font-bold">
                Irreversible Action
              </span>
              <h3 className="font-cinzel text-lg font-bold text-[#211810]">{title}</h3>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1 text-[#5A3E2B] hover:text-[#8C3828] rounded transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 font-serif text-sm text-[#38251B] leading-relaxed space-y-2">
          <p>
            Are you certain you wish to strike this {itemType} permanently from the sacred folio?
          </p>
          <div className="p-3 bg-[#E2CDA5]/60 border border-[#B58A43]/60 rounded font-cinzel font-semibold text-xs text-[#211810]">
            "{itemName}"
          </div>
          <p className="text-xs text-[#8C3828] italic">
            A safety backup is automatically stored in server logs, but this record will no longer appear in the active archive.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#B58A43]/40">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded text-xs font-cinzel font-semibold text-[#5A3E2B] hover:text-[#211810] hover:bg-[#E2CDA5]/40 transition-colors cursor-pointer"
          >
            Preserve in Folio
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-[#8C3828] hover:bg-[#A1402F] text-[#F3E7CC] font-cinzel text-xs font-bold tracking-wider border border-[#B58A43] shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Strike from Archive</span>
          </button>
        </div>
      </div>
    </div>
  );
};

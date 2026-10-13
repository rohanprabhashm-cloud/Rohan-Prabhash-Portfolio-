import React, { useState, useEffect } from 'react';
import { KeyRound, ShieldCheck, Lock, Unlock, X, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { ManuscriptCorner } from './ManuscriptMotifs';

interface AdminAuthModalProps {
  isOpen: boolean;
  isAdmin: boolean;
  onClose: () => void;
  onLogin: (passkey: string) => Promise<{ success: boolean; error?: string }>;
  onLogout: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  isAdmin,
  onClose,
  onLogin,
  onLogout,
}) => {
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPasskey('');
      setError(null);
      setSuccessMsg(null);
    }
  }, [isOpen]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey.trim()) {
      setError('Please enter the sacred Scribe Passphrase.');
      return;
    }
    setIsLoading(true);
    setError(null);

    const res = await onLogin(passkey.trim());
    setIsLoading(false);

    if (res.success) {
      setSuccessMsg('Scribe Sanctum unlocked. Sovereign folio controls are now active.');
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      setError(res.error || 'Invalid Scribe Passphrase.');
    }
  };

  const handleDeauthenticate = () => {
    onLogout();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg parchment-sheet border-2 border-[#B58A43] rounded-lg shadow-2xl p-6 sm:p-7 text-[#211810]">
        <ManuscriptCorner position="top-left" size={26} className="absolute top-2 left-2 opacity-80" />
        <ManuscriptCorner position="top-right" size={26} className="absolute top-2 right-2 opacity-80" />
        <ManuscriptCorner position="bottom-left" size={26} className="absolute bottom-2 left-2 opacity-80" />
        <ManuscriptCorner position="bottom-right" size={26} className="absolute bottom-2 right-2 opacity-80" />

        {/* Header */}
        <div className="flex items-start justify-between pb-4 mb-4 border-b border-[#B58A43]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#8C3828] border border-[#B58A43] flex items-center justify-center text-[#F3E7CC] shadow-md">
              {isAdmin ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <div className="font-cinzel text-[10px] tracking-widest text-[#8C3828] uppercase font-bold">
                Archival Security & Sovereign Access
              </div>
              <h3 className="font-cinzel text-xl font-bold text-[#211810]">
                {isAdmin ? 'Scribe Sanctum • Active' : 'Scribe Sanctum • Locked'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#5A3E2B] hover:text-[#8C3828] rounded transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isAdmin ? (
          <div className="space-y-4 font-serif text-sm text-[#38251B]">
            <div className="p-4 rounded bg-[#E2CDA5]/70 border border-[#B58A43]/60 space-y-2">
              <div className="flex items-center gap-2 text-[#8C3828] font-cinzel text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>You are Authenticated as Rohan Prabhash (Master Scribe)</span>
              </div>
              <p className="text-xs text-[#5A3E2B] leading-relaxed">
                You currently possess sovereign modification rights across all Creation Treatises and Hackathon Chronicles. You can add new records, edit details, upload cover art, duplicate entries, reorder cards, and toggle draft/published states.
              </p>
            </div>

            <div className="text-xs text-[#5A3E2B] space-y-1 bg-[#FAF4E5] p-3 rounded border border-[#B58A43]/30">
              <span className="font-cinzel font-semibold text-[#8C3828] block">Public Visitor Protection:</span>
              <p>
                When you deploy or share this portfolio publicly, anonymous visitors only see published records in view-only mode. Your administrative controls remain locked until this passphrase is submitted.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#B58A43]/40">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-cinzel text-[#5A3E2B] hover:text-[#211810] cursor-pointer"
              >
                Keep Scribe Mode Active
              </button>
              <button
                type="button"
                onClick={handleDeauthenticate}
                className="px-4 py-2 rounded bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs font-bold border border-[#B58A43] shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Lock Scribe Sanctum (Public View)</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-serif text-sm text-[#38251B]">
            <p className="text-xs sm:text-sm leading-relaxed text-[#5A3E2B]">
              Enter the sacred Scribe Passphrase to unlock modification privileges, publish unpublished works, manage the Project Archive, and record Hackathon Expeditions.
            </p>

            <div className="space-y-1.5">
              <label className="block text-xs font-cinzel font-bold text-[#38251B]">
                Scribe Passphrase
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  placeholder="Enter passphrase (default: rohan2025)"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#FAF4E5] border border-[#B58A43] rounded text-sm text-[#211810] focus:ring-2 focus:ring-[#8C3828] focus:border-[#8C3828] outline-none"
                  autoFocus
                />
                <KeyRound className="w-4 h-4 absolute left-3 top-3 text-[#B58A43]" />
              </div>
              <p className="text-[11px] text-[#8C3828] italic">
                * Default passkey is <span className="font-mono font-bold font-sans">rohan2025</span>. Configurable via server environment.
              </p>
            </div>

            {error && (
              <div className="p-2.5 rounded bg-red-100/80 border border-red-300 text-red-800 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-2.5 rounded bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#B58A43]/40">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-cinzel text-[#5A3E2B] hover:text-[#211810] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 rounded bg-[#8C3828] hover:bg-[#9E3F2E] text-[#F3E7CC] font-cinzel text-xs font-bold border border-[#B58A43] shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>{isLoading ? 'Verifying Seal...' : 'Inscribe Seal & Unlock'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

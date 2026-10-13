import React from 'react';
import { LucideIcon, Plus, FolderPlus } from 'lucide-react';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/**
 * Reusable EmptyState Component
 * Displays an honest, sensible message when a section has no entries yet,
 * providing a clear action button to add content without faking data.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = FolderPlus,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`p-10 sm:p-14 text-center rounded-2xl bg-slate-900/30 border border-dashed border-white/10 space-y-4 max-w-xl mx-auto my-6 ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
        <Icon className="w-6 h-6" />
      </div>

      <div className="space-y-1.5">
        <h4 className="text-base sm:text-lg font-semibold text-white tracking-tight">
          {title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-medium text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400/50 transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>{actionLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface SectionContainerProps {
  id: string;
  kicker?: string;
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  headerMeta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

/**
 * Reusable Section Container
 * Standardizes section spacing, typographic hierarchy, container width,
 * hairline borders, and anchor scroll offsets across the entire portfolio.
 */
export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  kicker,
  icon: Icon,
  title,
  subtitle,
  action,
  headerMeta,
  children,
  className = '',
  contentClassName = '',
}) => {
  return (
    <section
      id={id}
      className={`py-20 md:py-28 relative border-t border-white/[0.06] scroll-mt-24 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            {kicker && (
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                {Icon && <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                <span>{kicker}</span>
              </div>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
                {subtitle}
              </p>
            )}
          </div>

          {/* Action or Meta Slots */}
          {(action || headerMeta) && (
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {headerMeta}
              {action}
            </div>
          )}
        </div>

        {/* Section Content */}
        <div className={contentClassName}>
          {children}
        </div>

      </div>
    </section>
  );
};

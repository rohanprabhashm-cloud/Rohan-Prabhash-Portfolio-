import React from 'react';
import { GraduationCap, Calendar, MapPin, BookOpen, Award } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const EducationSection: React.FC = () => {
  const { education } = PORTFOLIO_DATA;

  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-black/5 dark:border-white/5">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold text-[#0071e3] dark:text-[#2997ff] uppercase tracking-wider mb-2">
            Academic Background
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white mb-3">
            Education
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Foundational computer science principles, algorithmic coursework, and machine learning specialization.
          </p>
        </div>

        {/* Apple Timeline Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-black/8 dark:border-white/10 apple-card-glow relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#0071e3] dark:text-[#2997ff] mb-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>{education.currentYear}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-1">
                {education.degree}
              </h3>
              <p className="text-base font-medium text-neutral-700 dark:text-neutral-300">
                {education.institution}
              </p>
            </div>

            <div className="flex sm:flex-col items-start sm:items-end gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="px-3 py-1 rounded-full bg-neutral-200/70 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium">
                Graduation: {education.expectedGraduation}
              </span>
              <span className="flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{education.location}</span>
              </span>
            </div>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
            {education.academicFocus}
          </p>

          {/* Key Coursework Tags */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#0071e3] dark:text-[#2997ff]" />
              <span>Core Academic Coursework</span>
            </h4>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-neutral-700 dark:text-neutral-300 font-mono">
              {education.coursework.map((course, i) => (
                <React.Fragment key={course}>
                  <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-800/80 border border-black/5 dark:border-white/5">
                    {course}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

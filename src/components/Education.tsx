import React, { useState } from 'react';
import { GraduationCap, BookOpen, Calendar, Edit3, CheckCircle2 } from 'lucide-react';
import { EducationInfo } from '../types/portfolio';
import { SectionContainer } from './common';

interface EducationProps {
  education: EducationInfo;
  onUpdateEducation: (updated: EducationInfo) => void;
}

export const Education: React.FC<EducationProps> = ({ education, onUpdateEducation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [institution, setInstitution] = useState(education.institution);
  const [graduationYear, setGraduationYear] = useState(education.graduationYear);
  const [degree, setDegree] = useState(education.degree);
  const [specialization, setSpecialization] = useState(education.specialization);
  const [cgpa, setCgpa] = useState(education.cgpaOrGrade || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateEducation({
      ...education,
      institution,
      graduationYear,
      degree,
      specialization,
      cgpaOrGrade: cgpa,
    });
    setIsEditing(false);
  };

  return (
    <SectionContainer
      id="education"
      kicker="Academic Foundations"
      icon={GraduationCap}
      title="Education & Coursework"
      subtitle="Rigorous undergraduate training in computer science, machine learning foundations, algorithms, and computational theory."
      action={
        !isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Details</span>
          </button>
        ) : undefined
      }
    >

        {/* Education Highlight Card */}
        <div className="glass-panel rounded-2xl border border-white/[0.08] p-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
                <GraduationCap className="w-4 h-4" />
                <span>{education.year}</span>
                <span className="text-slate-600" aria-hidden="true">·</span>
                <span>Expected Graduation: {education.graduationYear}</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {education.degree}
              </h3>
              <p className="text-cyan-300 font-medium text-base">
                {education.specialization}
              </p>
              <p className="text-slate-300 text-sm">
                {education.institution}
              </p>
              {education.cgpaOrGrade && (
                <p className="text-xs font-mono text-slate-400 pt-1">
                  Cumulative Score: <span className="text-cyan-300 font-bold">{education.cgpaOrGrade}</span>
                </p>
              )}
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3.5 py-2 rounded-lg bg-slate-900 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Institution Details'}</span>
            </button>
          </div>

          {/* Inline Edit Form */}
          {isEditing && (
            <form onSubmit={handleSave} className="p-5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-4 text-xs">
              <div className="text-slate-300 font-semibold text-sm">
                Update Institution & Graduation Details
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Institution Name</label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Expected Graduation Year</label>
                  <input
                    type="text"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Degree</label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">CGPA / Grade (Optional)</label>
                  <input
                    type="text"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg"
                >
                  Save Education Info
                </button>
              </div>
            </form>
          )}

          {/* Key Coursework Grid */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Core Academic Coursework</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {education.keyCourses.map((course) => (
                <div
                  key={course}
                  className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.06] text-xs text-slate-200 flex items-center gap-2.5"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span>{course}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Academic Milestones
            </div>
            <div className="space-y-2">
              {education.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
    </SectionContainer>
  );
};

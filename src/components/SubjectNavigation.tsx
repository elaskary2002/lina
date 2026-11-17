import React from 'react';
import { CURRICULUM_SUBJECTS } from '../data/curriculumData';
import { Subject, TermType, TrackType } from '../types';
import { BookOpen, Calculator, Atom, Feather, Globe, Monitor, CheckCircle2 } from 'lucide-react';
import { ProgressData, calculateSubjectProgress } from '../utils/progressTracker';

interface SubjectNavigationProps {
  selectedSubjectId: string;
  onSelectSubject: (subjectId: string) => void;
  currentTerm: TermType;
  currentTrack: TrackType;
  progress: ProgressData;
}

export const SubjectNavigation: React.FC<SubjectNavigationProps> = ({
  selectedSubjectId,
  onSelectSubject,
  currentTerm,
  currentTrack,
  progress,
}) => {
  const getSubjectIcon = (category: string) => {
    switch (category) {
      case 'english': return <BookOpen className="w-5 h-5" />;
      case 'math': return <Calculator className="w-5 h-5" />;
      case 'science': return <Atom className="w-5 h-5" />;
      case 'arabic': return <Feather className="w-5 h-5" />;
      case 'social': return <Globe className="w-5 h-5" />;
      case 'ict': return <Monitor className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <section id="subjects" className="bg-slate-50 border-b border-slate-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
              <span>المواد الدراسية المقررة</span>
              <span aria-hidden="true">·</span>
              <span>الشهادة الإعدادية</span>
              <span aria-hidden="true">·</span>
              <span>{currentTerm === 1 ? 'الترم الأول' : 'الترم الثاني'}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              اختر المادة لتصفح المنهج ومتابعة نسبة إنجازك
            </h2>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            محتوى مخصص لـ {currentTrack === 'languages' ? 'طلاب اللغات والتجريبي والمسار الإنجليزي' : 'طلاب المدارس الحكومية والعامة'}
          </div>
        </div>

        {/* Subjects Horizontal Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {CURRICULUM_SUBJECTS.map((subject: Subject) => {
            const isSelected = subject.id === selectedSubjectId;
            const termUnits = subject.units.filter(u => u.term === currentTerm);
            const termResources = subject.resources.filter(r => r.term === currentTerm);
            const progressRes = calculateSubjectProgress(subject, currentTerm, progress);

            return (
              <button
                key={subject.id}
                onClick={() => onSelectSubject(subject.id)}
                className={`relative text-right p-4 rounded-xl border transition-all text-slate-800 flex flex-col justify-between min-h-[150px] ${
                  isSelected
                    ? 'bg-white border-sky-600 shadow-md ring-2 ring-sky-500/20'
                    : 'bg-white/70 hover:bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="p-2 rounded-lg text-slate-700"
                      style={{ backgroundColor: `${subject.accentColor}18`, color: subject.accentColor }}
                    >
                      {getSubjectIcon(subject.category)}
                    </span>
                    <span className="text-[11px] font-extrabold text-sky-700 tabular-nums">
                      {progressRes.percentage}%
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                    {subject.nameAr}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5" dir="ltr">
                    {subject.name}
                  </p>
                </div>

                {/* Progress bar + Units counter */}
                <div className="border-t border-slate-100 pt-2 space-y-1.5">
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full bg-sky-600 rounded-full transition-all duration-300"
                      style={{ width: `${progressRes.percentage}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-500 flex items-center justify-between">
                    <span>{progressRes.completedUnitsCount} من {progressRes.totalUnitsCount} وحدات</span>
                    <span className="text-slate-400">{termResources.length} ملفات</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

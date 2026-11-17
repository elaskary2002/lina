import React from 'react';
import { Search, GraduationCap } from 'lucide-react';
import { TrackType, TermType } from '../types';

interface HeaderProps {
  currentTrack: TrackType;
  setTrack: (track: TrackType) => void;
  currentTerm: TermType;
  setTerm: (term: TermType) => void;
  onOpenSearch: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenQuickQuiz: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTrack,
  setTrack,
  currentTerm,
  setTerm,
  onOpenSearch,
  onNavigateSection,
  onOpenQuickQuiz,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Universal Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            <GraduationCap className="w-6 h-6" />
          </div>
          <button 
            onClick={() => onNavigateSection('hero')} 
            className="text-right text-slate-900 hover:text-sky-700 transition-colors"
          >
            <span className="text-lg font-extrabold tracking-tight block whitespace-nowrap leading-tight">
              منصة التفوق 3Prep
            </span>
            <span className="text-xs text-slate-500 block font-normal whitespace-nowrap">
              الشهادة الإعدادية · المسار المصري واللغات
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600">
          <button 
            onClick={() => onNavigateSection('subjects')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            المواد
          </button>
          <button 
            onClick={() => onNavigateSection('progress-dashboard')}
            className="hover:text-sky-700 transition-colors whitespace-nowrap shrink-0 font-semibold"
          >
            الإنجاز %
          </button>
          <button 
            onClick={() => onNavigateSection('study-schedule')}
            className="hover:text-sky-700 transition-colors whitespace-nowrap shrink-0 font-semibold text-amber-700"
          >
            جدول المذاكرة
          </button>
          <button 
            onClick={() => onNavigateSection('daily-quizzes')}
            className="hover:text-sky-700 transition-colors whitespace-nowrap shrink-0 font-semibold text-emerald-700"
          >
            الاختبارات اليومية
          </button>
          <button 
            onClick={() => onNavigateSection('downloads')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            المذكرات
          </button>
          <button 
            onClick={() => onNavigateSection('exams')}
            className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
          >
            الامتحانات
          </button>
        </nav>

        {/* Zone 3: 1 primary action button + Quick Search & Mode Toggles */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Term Switcher Segmented Control */}
          <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setTerm(1)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                currentTerm === 1
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              الترم الأول
            </button>
            <button
              onClick={() => setTerm(2)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                currentTerm === 2
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              الترم الثاني
            </button>
          </div>

          {/* Languages / General Track Toggle */}
          <button
            onClick={() => setTrack(currentTrack === 'languages' ? 'general' : 'languages')}
            className="hidden md:inline-flex items-center text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md border border-slate-200 transition-colors whitespace-nowrap"
            title="التبديل بين مسار اللغات (English Math/Science) والمسار العام"
          >
            {currentTrack === 'languages' ? 'مسار اللغات (English)' : 'المسار العام (حكومي)'}
          </button>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            title="بحث في المذكرات والدروس والامتحانات"
            aria-label="Search curriculum"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenQuickQuiz}
            className="px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0"
          >
            ابدأ اختباراً دورياً
          </button>
        </div>

      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { Search, Download, CheckCircle2, PlayCircle, BookOpen } from 'lucide-react';
import { TrackType, TermType } from '../types';

interface HeroProps {
  currentTrack: TrackType;
  currentTerm: TermType;
  onSearchSubmit: (query: string) => void;
  onSelectSubject: (subjectId: string) => void;
  onStartQuizDirect: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentTrack,
  currentTerm,
  onSearchSubmit,
  onSelectSubject,
  onStartQuizDirect,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
    }
  };

  return (
    <section id="hero" className="relative bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (Text & Search in RTL) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Unboxed Metadata Header (Anti-Pill Rule) */}
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 tracking-wide">
              <span>وزارة التربية والتعليم والتعليم الفني</span>
              <span aria-hidden="true">·</span>
              <span>الشهادة الإعدادية 2025/2026</span>
              <span aria-hidden="true">·</span>
              <span>{currentTerm === 1 ? 'الفصل الدراسي الأول' : 'الفصل الدراسي الثاني'}</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight" style={{ textWrap: 'balance' }}>
              منصة الصف الثالث الإعدادي الشاملة
              <span className="block text-sky-600 mt-1">
                {currentTrack === 'languages' ? 'المسار المصري ومدارس اللغات (English)' : 'المسار المصري للتعليم العام'}
              </span>
            </h1>

            {/* Descriptive Body */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              كل ما يحتاجه طالب الشهادة الإعدادية في مكان واحد: الكتب المدرسية الرسمية، أفضل شروحات الفيديو المختارة لكل وحدة دراسية، مذكرات وملخصات وقوانين قابلة للتحميل المباشر الفوري، مع اختبارات تفاعلية دورية تقيس استيعابك وتمنحك شهادة تفوق معتمدة.
            </p>

            {/* Search Input Bar */}
            <form onSubmit={handleSearch} className="max-w-xl">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="ابحث عن درس، قاعدة، قانون، ملخص، أو اسم محافظة (مثال: المنادى، Cartesian Product، المرايا)..."
                  className="w-full pl-28 pr-11 py-3 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                />
                <Search className="w-5 h-5 text-slate-400 absolute right-3 pointer-events-none" />
                <button
                  type="submit"
                  className="absolute left-1.5 px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors"
                >
                  بحث فوري
                </button>
              </div>
            </form>

            {/* Quick Action Badges / Features without pill slop */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">كتب الوزارة الأصلية</h4>
                  <p className="text-[11px] text-slate-500">طبعة العام الدراسي الحالي</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <PlayCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">شروحات فيديو تفاعلية</h4>
                  <p className="text-[11px] text-slate-500">لكل وحدة ودرس بالتفصيل</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Download className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">تحميل مباشر للملفات</h4>
                  <p className="text-[11px] text-slate-500">PDF ومذكرات جاهزة للطباعة</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">اختبارات دورية وشهادات</h4>
                  <p className="text-[11px] text-slate-500">تصحيح فوري وتوضيح الإجابة</p>
                </div>
              </div>
            </div>

            {/* Subject Quick Jump Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">انتقال سريع:</span>
              <button
                onClick={() => onSelectSubject('english')}
                className="text-xs px-3 py-1 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 rounded-md border border-slate-200 transition-colors"
              >
                English (New Hello!)
              </button>
              <button
                onClick={() => onSelectSubject('math')}
                className="text-xs px-3 py-1 bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-slate-700 rounded-md border border-slate-200 transition-colors"
              >
                Math (الرياضيات بالإنجليزية)
              </button>
              <button
                onClick={() => onSelectSubject('science')}
                className="text-xs px-3 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 rounded-md border border-slate-200 transition-colors"
              >
                Science (العلوم باللغات)
              </button>
              <button
                onClick={() => onSelectSubject('arabic')}
                className="text-xs px-3 py-1 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 rounded-md border border-slate-200 transition-colors"
              >
                اللغة العربية
              </button>
              <button
                onClick={() => onSelectSubject('social')}
                className="text-xs px-3 py-1 bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-slate-700 rounded-md border border-slate-200 transition-colors"
              >
                الدراسات الاجتماعية
              </button>
              <button
                onClick={() => onSelectSubject('ict')}
                className="text-xs px-3 py-1 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-md border border-slate-200 transition-colors"
              >
                الحاسب الآلي (ICT)
              </button>
            </div>

          </div>

          {/* Right Column: Hero Visual Image Anchor */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
              <img
                src="/src/assets/images/hero_prep3_study_1791657697929.jpg"
                alt="مكتب طالب الشهادة الإعدادية مع كتب الوزارة والملاحظات"
                className="w-full h-72 sm:h-80 lg:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-2 text-xs text-sky-300 font-semibold mb-1">
                  <span>منهج 2025/2026</span>
                  <span aria-hidden="true">·</span>
                  <span>المسار المصري المعتمد</span>
                </div>
                <h3 className="text-xl font-bold leading-snug">
                  طريقك نحو المجموع الكلي (280 من 280)
                </h3>
                <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                  فيديوهات شرح احترافية، مذكرات تلخيص بضغطة زر واحدة، واختبارات دورية لكل وحدة دراسية.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={onStartQuizDirect}
                    className="px-4 py-2 text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg transition-colors whitespace-nowrap"
                  >
                    بدء اختبار قياس المستوى
                  </button>
                  <button
                    onClick={() => onSelectSubject('math')}
                    className="px-3 py-2 text-xs font-semibold bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-xs transition-colors whitespace-nowrap"
                  >
                    تصفح المواد
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

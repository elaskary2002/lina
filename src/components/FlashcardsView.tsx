import React, { useState } from 'react';
import { FlashCard } from '../types';
import { RotateCw, Check, ArrowRight, ArrowLeft, Lightbulb, Sparkles } from 'lucide-react';

interface FlashcardsViewProps {
  flashcards: FlashCard[];
  subjectNameAr: string;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  flashcards,
  subjectNameAr,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});

  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="py-12 text-center text-slate-500 text-sm">
        لا توجد بطاقات استذكار متاحة حالياً لهذه المادة.
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];
  const isMastered = masteredCards[currentCard.id];

  const handleNext = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const toggleMastered = () => {
    setMasteredCards((prev) => ({
      ...prev,
      [currentCard.id]: !prev[currentCard.id],
    }));
  };

  const masteredCount = Object.values(masteredCards).filter(Boolean).length;

  return (
    <div className="space-y-6">
      
      {/* Header with Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-700">
            <Sparkles className="w-3.5 h-3.5" />
            <span>مذاكرة سريعة وتثبيت المعلومة</span>
            <span aria-hidden="true">·</span>
            <span>{subjectNameAr}</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">
            بطاقات الاستذكار التفاعلية (Flashcards)
          </h3>
          <p className="text-xs text-slate-500">
            انقر على البطاقة لقلبها وإظهار الإجابة والقاعدة النموذجية
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="text-right">
            <span className="text-slate-500">البطاقة: </span>
            <strong className="text-slate-900 tabular-nums">{currentIndex + 1}</strong> من <strong className="text-slate-900 tabular-nums">{flashcards.length}</strong>
          </div>
          <div className="text-right">
            <span className="text-slate-500">تم حفظها: </span>
            <strong className="text-emerald-700 tabular-nums">{masteredCount}</strong>
          </div>
        </div>
      </div>

      {/* Main Flashcard Flip Area */}
      <div className="max-w-xl mx-auto">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className={`min-h-[260px] p-8 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between select-none relative shadow-md ${
            isFlipped
              ? 'bg-sky-50/90 border-sky-400 text-slate-900'
              : 'bg-white hover:bg-slate-50/80 border-slate-200 text-slate-800'
          }`}
        >
          {/* Card Top Category & Flip Hint */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-500 px-2 py-0.5 rounded-md bg-slate-100">
              {currentCard.category}
            </span>
            <span className="text-slate-400 flex items-center gap-1 hover:text-sky-600 transition-colors">
              <RotateCw className="w-3.5 h-3.5" />
              <span>انقر للقلب</span>
            </span>
          </div>

          {/* Card Center Content */}
          <div className="py-6 text-center">
            {!isFlipped ? (
              <div>
                <span className="text-xs font-bold text-sky-700 block mb-2">السؤال / المفهوم:</span>
                <p className="text-lg sm:text-xl font-extrabold text-slate-900 leading-relaxed" dir="auto">
                  {currentCard.front}
                </p>
                {currentCard.hint && showHint && (
                  <p className="text-xs text-amber-700 mt-4 bg-amber-50 p-2 rounded-lg border border-amber-200 inline-block">
                    💡 تلميح: {currentCard.hint}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <span className="text-xs font-bold text-emerald-700 block mb-2">الإجابة والحل النموذجي:</span>
                <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed" dir="auto">
                  {currentCard.back}
                </p>
              </div>
            )}
          </div>

          {/* Card Bottom Actions */}
          <div className="flex items-center justify-between text-xs pt-4 border-t border-slate-200/60">
            {currentCard.hint && !isFlipped ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowHint(!showHint);
                }}
                className="text-amber-700 hover:text-amber-800 flex items-center gap-1 font-semibold"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showHint ? 'إخفاء التلميح' : 'إظهار تلميح'}</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMastered();
              }}
              className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                isMastered
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isMastered ? 'تم الحفظ بنجاح' : 'تحديد كـ محفوظ'}</span>
            </button>
          </div>
        </div>

        {/* Carousel Prev/Next Controls */}
        <div className="flex items-center justify-between mt-6 px-2">
          <button
            onClick={handlePrev}
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <ArrowRight className="w-4 h-4" />
            <span>البطاقة السابقة</span>
          </button>

          <span className="text-xs font-semibold text-slate-500">
            {currentIndex + 1} / {flashcards.length}
          </span>

          <button
            onClick={handleNext}
            className="px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <span>البطاقة التالية</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};

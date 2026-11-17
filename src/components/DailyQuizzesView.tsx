import React, { useState } from 'react';
import { Subject, QuizQuestion } from '../types';
import { Award, CheckCircle2, XCircle, RotateCcw, Flame, Sparkles, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

interface DailyQuizzesViewProps {
  subjects: Subject[];
}

export const DailyQuizzesView: React.FC<DailyQuizzesViewProps> = ({ subjects }) => {
  // Extract a pool of questions from all subjects to build a Daily Challenge
  const allQuestions: { question: QuizQuestion; subjectName: string; subjectId: string }[] = [];
  subjects.forEach((subj) => {
    subj.quizzes.forEach((quiz) => {
      quiz.questions.forEach((q) => {
        allQuestions.push({
          question: q,
          subjectName: subj.nameAr,
          subjectId: subj.id,
        });
      });
    });
  });

  // Pick 4 daily challenge questions deterministically or pseudo-randomly based on today's date
  const todayStr = new Date().toDateString();
  let seed = 0;
  for (let i = 0; i < todayStr.length; i++) {
    seed += todayStr.charCodeAt(i);
  }

  const dailyQuestions = [];
  for (let i = 0; i < Math.min(4, allQuestions.length); i++) {
    const idx = (seed + i * 7) % allQuestions.length;
    dailyQuestions.push(allQuestions[idx]);
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [streakCount, setStreakCount] = useState(3); // Daily streak simulation

  const currentItem = dailyQuestions[currentIndex];
  const userSelectedOption = selectedAnswers[currentIndex];
  const isAnswered = userSelectedOption !== undefined;

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optIdx,
    }));
  };

  const handleSubmitDailyQuiz = () => {
    setIsSubmitted(true);
    setStreakCount((prev) => prev + 1);
  };

  const handleResetDailyQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
  };

  const correctCount = dailyQuestions.reduce((acc, item, idx) => {
    return selectedAnswers[idx] === item.question.correctAnswerIndex ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((correctCount / dailyQuestions.length) * 100);

  if (!currentItem) {
    return null;
  }

  return (
    <section id="daily-quizzes" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 mb-3">
            <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>تحدي الاختبار اليومي · احافظ على حماسك المتواصل</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            سؤال وجواب اليوم لتنشيط الذاكرة وتثبيت المعلومات
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            4 أسئلة مختارة بعناية من مختلف المواد الدراسية كل يوم لتختبر بها جاهزيتك لامتحانات الشهادة الإعدادية.
          </p>
        </div>

        {/* Daily Streak & Status Bar */}
        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>تاريخ اليوم: {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-800 bg-amber-100/70 px-3 py-1 rounded-lg border border-amber-200">
            <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>سلسلة التحدي: {streakCount} أيام متتالية من التفوق</span>
          </div>
        </div>

        {/* Quiz Box */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          {!isSubmitted ? (
            <div className="space-y-6">
              
              {/* Question Progress & Subject Tag */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                <span className="font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                  مادة: {currentItem.subjectName}
                </span>
                <span className="text-slate-500 font-mono">
                  السؤال {currentIndex + 1} من {dailyQuestions.length}
                </span>
              </div>

              {/* Question Text */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed mb-1" dir="auto">
                  {currentItem.question.questionAr || currentItem.question.question}
                </h3>
                {currentItem.question.questionAr && currentItem.question.question && (
                  <p className="text-xs text-slate-400" dir="ltr">
                    {currentItem.question.question}
                  </p>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {(currentItem.question.optionsAr || currentItem.question.options).map((opt, optIdx) => {
                  const isSelected = userSelectedOption === optIdx;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-right p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-sky-50 border-sky-600 text-sky-950 ring-2 ring-sky-500/20 shadow-xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                          isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span dir="auto">{opt}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-sky-600 bg-sky-600' : 'border-slate-300'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>السؤال السابق</span>
                </button>

                {currentIndex < dailyQuestions.length - 1 ? (
                  <button
                    disabled={!isAnswered}
                    onClick={() => setCurrentIndex((prev) => Math.min(dailyQuestions.length - 1, prev + 1))}
                    className="px-5 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 disabled:opacity-50 disabled:pointer-events-none rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <span>السؤال التالي</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    disabled={Object.keys(selectedAnswers).length < dailyQuestions.length}
                    onClick={handleSubmitDailyQuiz}
                    className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none rounded-xl transition-colors shadow-xs"
                  >
                    إنهاء وتصحيح التحدي اليومي
                  </button>
                )}
              </div>

            </div>
          ) : (
            /* Results View */
            <div className="text-center space-y-6 py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-100 text-sky-700 font-extrabold text-2xl mb-1">
                {percentage}%
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                  {percentage >= 75 ? 'أداء رائع في تحدي اليوم! حافظت على سلسلة تفوقك 🏆' : 'محاولة طيبة! راجع الإجابات لتثبيت المعلومة'}
                </h3>
                <p className="text-xs text-slate-600">
                  أجبت بشكل صحيح على <strong className="text-slate-900">{correctCount}</strong> من أصل <strong className="text-slate-900">{dailyQuestions.length}</strong> أسئلة اليوم.
                </p>
              </div>

              {/* Review answers breakdown */}
              <div className="space-y-3 text-right max-w-2xl mx-auto pt-2">
                {dailyQuestions.map((item, idx) => {
                  const userAns = selectedAnswers[idx];
                  const isCorrect = userAns === item.question.correctAnswerIndex;
                  const opts = item.question.optionsAr || item.question.options;

                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border text-xs ${
                        isCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900">
                          {idx + 1}. {item.question.questionAr || item.question.question}
                        </span>
                        <span className={`font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {isCorrect ? 'إجابة صحيحة' : 'إجابة خاطئة'}
                        </span>
                      </div>
                      <p className="text-slate-600 mb-1">
                        إجابتك: <strong className={isCorrect ? 'text-emerald-800' : 'text-rose-800'}>{userAns !== undefined ? opts[userAns] : 'لم تتم الإجابة'}</strong>
                      </p>
                      {!isCorrect && (
                        <p className="text-emerald-800 mb-1">
                          الإجابة النموذجية: <strong>{opts[item.question.correctAnswerIndex]}</strong>
                        </p>
                      )}
                      <p className="text-slate-500 text-[11px] bg-white/80 p-2 rounded-md border border-slate-200/60 mt-1">
                        {item.question.explanationAr || item.question.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={handleResetDailyQuiz}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>إعادة تحدي اليوم</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

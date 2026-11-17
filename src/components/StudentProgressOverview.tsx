import React from 'react';
import { CURRICULUM_SUBJECTS } from '../data/curriculumData';
import { TermType } from '../types';
import { ProgressData, calculateSubjectProgress, calculateOverallProgress } from '../utils/progressTracker';
import { CheckCircle2, TrendingUp, Award, BookOpen, RotateCcw } from 'lucide-react';

interface StudentProgressOverviewProps {
  currentTerm: TermType;
  progress: ProgressData;
  onSelectSubject: (subjectId: string) => void;
  onResetProgress: () => void;
}

export const StudentProgressOverview: React.FC<StudentProgressOverviewProps> = ({
  currentTerm,
  progress,
  onSelectSubject,
  onResetProgress,
}) => {
  const overall = calculateOverallProgress(CURRICULUM_SUBJECTS, currentTerm, progress);

  const getProgressColor = (percent: number) => {
    if (percent >= 80) return 'bg-emerald-500';
    if (percent >= 50) return 'bg-sky-500';
    if (percent >= 20) return 'bg-amber-500';
    return 'bg-slate-300';
  };

  const getMotivationalMessage = (percent: number) => {
    if (percent === 100) return 'ألف مبروك! أتممت منهج الترم بالكامل وأنت جاهز لحصد المركز الأول على المحافظة! 🎉';
    if (percent >= 75) return 'رائع جداً! قاربت على إنهاء كامل وحدات الفصل الدراسي، استمر بهذا الإصرار! 🚀';
    if (percent >= 50) return 'ممتاز! قطعت نصف الطريق نحو إنهاء المنهج، راجع ما فاتك وأكمل باقي الوحدات. 👏';
    if (percent >= 20) return 'بداية طيبة! واصل إنهاء الوحدات وخوض الاختبارات الدورية لقياس مستواك. 📖';
    return 'ابدأ الآن بإنهاء أول وحدة دراسية وحددها كمكتملة لمتابعة مسار تفوقك اليومي. ✨';
  };

  return (
    <section id="progress-dashboard" className="bg-white border-b border-slate-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Container */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8">
          
          {/* Header Strip */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 mb-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>نظام متابعة التحصيل الدراسي</span>
                <span aria-hidden="true">·</span>
                <span>الصف الثالث الإعدادي</span>
                <span aria-hidden="true">·</span>
                <span>{currentTerm === 1 ? 'الترم الأول' : 'الترم الثاني'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                مؤشر إنجاز الطالب في إنهاء الوحدات التعليمية
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                {getMotivationalMessage(overall.overallPercentage)}
              </p>
            </div>

            {/* Overall Percentage Badge & Counter */}
            <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs self-start md:self-auto">
              <div className="text-right">
                <div className="text-[11px] text-slate-500 font-medium">الإنجاز الإجمالي:</div>
                <div className="text-2xl font-extrabold text-sky-700 tabular-nums">
                  {overall.overallPercentage}%
                </div>
              </div>

              <div className="border-r border-slate-200 pr-3 text-xs text-slate-600 space-y-0.5">
                <div>
                  <strong className="text-slate-900 tabular-nums">{overall.totalUnitsCompleted}</strong> من <span className="tabular-nums">{overall.totalUnitsTotal}</span> وحدات
                </div>
                <div>
                  <strong className="text-emerald-700 tabular-nums">{overall.totalQuizzesPassed}</strong> اختبارات مجتازة
                </div>
              </div>
            </div>
          </div>

          {/* Overall Global Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${getProgressColor(overall.overallPercentage)}`}
                style={{ width: `${overall.overallPercentage}%` }}
              />
            </div>
          </div>

          {/* Subjects Grid Progress Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CURRICULUM_SUBJECTS.map((subject) => {
              const res = calculateSubjectProgress(subject, currentTerm, progress);
              const barColor = getProgressColor(res.percentage);

              return (
                <div
                  key={subject.id}
                  onClick={() => onSelectSubject(subject.id)}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-sky-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-slate-900 line-clamp-1">
                        {subject.nameAr}
                      </span>
                      <span className="text-xs font-extrabold text-sky-700 tabular-nums">
                        {res.percentage}%
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mb-3" dir="ltr">
                      {subject.name}
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-3">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${barColor}`}
                        style={{ width: `${res.percentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-600 border-t border-slate-100 pt-2">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{res.completedUnitsCount} من {res.totalUnitsCount} وحدات</span>
                    </span>
                    <span className="text-sky-600 font-semibold hover:underline">
                      تصفح المادة ←
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reset Progress escaped button */}
          <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
            <span>
              * يتم حفظ تقدمك تلقائياً على جهازك دون الحاجة لتسجيل دخول، ويمكنك وضع علامة تم الإنهاء على أي وحدة بنقرة واحدة.
            </span>
            <button
              onClick={onResetProgress}
              className="text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors whitespace-nowrap"
              title="إعادة ضبط تقدم الطالب"
            >
              <RotateCcw className="w-3 h-3" />
              <span>إعادة ضبط المؤشر</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

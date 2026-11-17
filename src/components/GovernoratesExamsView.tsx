import React, { useState } from 'react';
import { GOVERNORATE_EXAMS } from '../data/examsData';
import { GovernorateExam, TermType } from '../types';
import { Download, FileText, CheckCircle2, Search, Printer, MapPin } from 'lucide-react';
import { triggerExamDownload } from '../utils/downloadHelper';

interface GovernoratesExamsViewProps {
  currentTerm: TermType;
}

export const GovernoratesExamsView: React.FC<GovernoratesExamsViewProps> = ({
  currentTerm,
}) => {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const filteredExams = GOVERNORATE_EXAMS.filter((exam) => {
    const matchesSubject = selectedSubjectFilter === 'all' || exam.subjectId === selectedSubjectFilter;
    const matchesTerm = exam.term === currentTerm;
    return matchesSubject && matchesTerm;
  });

  const handleDownloadExam = (exam: GovernorateExam) => {
    triggerExamDownload(exam);
    setDownloadSuccessId(exam.id);
    setTimeout(() => setDownloadSuccessId(null), 3000);
  };

  return (
    <section id="exams" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 mb-1">
              <span>امتحانات الشهادة الإعدادية السابقة</span>
              <span aria-hidden="true">·</span>
              <span>نماذج الإجابة وتوزيع الدرجات</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              بنك امتحانات المحافظات الرسمية مع نماذج الإجابة
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              أوراق امتحانات السنوات السابقة لمديريات التربية والتعليم (القاهرة، الجيزة، الإسكندرية، الدقهلية...) متوفرة للتحميل المباشر مع خطوات الحل المعتمدة.
            </p>
          </div>

          {/* Subject Filter Buttons */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 self-start md:self-auto overflow-x-auto">
            <button
              onClick={() => setSelectedSubjectFilter('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                selectedSubjectFilter === 'all'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              جميع المواد
            </button>
            <button
              onClick={() => setSelectedSubjectFilter('math')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                selectedSubjectFilter === 'math'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Math (الرياضيات)
            </button>
            <button
              onClick={() => setSelectedSubjectFilter('science')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                selectedSubjectFilter === 'science'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Science (العلوم)
            </button>
            <button
              onClick={() => setSelectedSubjectFilter('english')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                selectedSubjectFilter === 'english'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedSubjectFilter('arabic')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                selectedSubjectFilter === 'arabic'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              اللغة العربية
            </button>
          </div>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => {
            const isDownloaded = downloadSuccessId === exam.id;

            return (
              <div
                key={exam.id}
                className="p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <MapPin className="w-3.5 h-3.5 text-sky-600" />
                      {exam.governorateNameAr}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{exam.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{exam.fileSize}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    امتحان {exam.subjectNameAr} - {exam.governorateNameAr}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3" dir="ltr">
                    {exam.governorateName} · {exam.subjectNameEn}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {exam.contentSummary}
                  </p>

                  <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-600 mb-4">
                    <div className="flex items-center justify-between">
                      <span>الدرجة الكلية:</span>
                      <strong className="text-slate-900 tabular-nums">{exam.totalMarks} درجة</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>نموذج الإجابة الرسمي:</span>
                      <strong className="text-emerald-700 font-semibold">مرفق بالكامل مع خطوات الحل</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400">
                    جاهز للطباعة الفورية
                  </span>

                  <button
                    onClick={() => handleDownloadExam(exam)}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg transition-all ${
                      isDownloaded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-sky-600 hover:bg-sky-700 text-white shadow-2xs'
                    }`}
                  >
                    {isDownloaded ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>تم التحميل!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>تحميل الامتحان والحل</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { CURRICULUM_SUBJECTS } from '../data/curriculumData';
import { GOVERNORATE_EXAMS } from '../data/examsData';
import { ResourceFile, VideoLesson, UnitQuiz, GovernorateExam, FlashCard } from '../types';
import { Search, X, BookOpen, Video, Download, Award, MapPin, Sparkles, ExternalLink } from 'lucide-react';
import { triggerDirectDownload } from '../utils/downloadHelper';

interface QuickSearchModalProps {
  initialQuery?: string;
  onClose: () => void;
  onSelectVideo: (video: VideoLesson, subjectNameAr: string) => void;
  onSelectQuiz: (quiz: UnitQuiz) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  initialQuery = '',
  onClose,
  onSelectVideo,
  onSelectQuiz,
}) => {
  const [query, setQuery] = useState(initialQuery);

  const cleanQuery = query.trim().toLowerCase();

  // Search resources
  const matchedResources: { resource: ResourceFile; subjectName: string }[] = [];
  const matchedVideos: { video: VideoLesson; subjectName: string }[] = [];
  const matchedQuizzes: UnitQuiz[] = [];
  const matchedExams: GovernorateExam[] = [];
  const matchedFlashcards: { flashcard: FlashCard; subjectName: string }[] = [];

  if (cleanQuery.length >= 2) {
    CURRICULUM_SUBJECTS.forEach((subject) => {
      // Check resources
      subject.resources.forEach((res) => {
        if (
          res.title.toLowerCase().includes(cleanQuery) ||
          res.titleAr.includes(cleanQuery) ||
          res.descriptionAr.includes(cleanQuery) ||
          subject.nameAr.includes(cleanQuery)
        ) {
          matchedResources.push({ resource: res, subjectName: subject.nameAr });
        }
      });

      // Check videos
      subject.videos.forEach((vid) => {
        if (
          vid.title.toLowerCase().includes(cleanQuery) ||
          vid.titleAr.includes(cleanQuery) ||
          vid.teacherName.includes(cleanQuery) ||
          vid.summaryNoteAr.includes(cleanQuery)
        ) {
          matchedVideos.push({ video: vid, subjectName: subject.nameAr });
        }
      });

      // Check quizzes
      subject.quizzes.forEach((quiz) => {
        if (
          quiz.title.toLowerCase().includes(cleanQuery) ||
          quiz.titleAr.includes(cleanQuery) ||
          quiz.unitTitleAr.includes(cleanQuery)
        ) {
          matchedQuizzes.push(quiz);
        }
      });

      // Check flashcards
      subject.flashcards?.forEach((fc) => {
        if (
          fc.front.toLowerCase().includes(cleanQuery) ||
          fc.back.toLowerCase().includes(cleanQuery) ||
          fc.category.toLowerCase().includes(cleanQuery)
        ) {
          matchedFlashcards.push({ flashcard: fc, subjectName: subject.nameAr });
        }
      });
    });

    // Check exams
    GOVERNORATE_EXAMS.forEach((exam) => {
      if (
        exam.governorateNameAr.includes(cleanQuery) ||
        exam.subjectNameAr.includes(cleanQuery) ||
        exam.contentSummary.includes(cleanQuery)
      ) {
        matchedExams.push(exam);
      }
    });
  }

  const totalResults =
    matchedResources.length +
    matchedVideos.length +
    matchedQuizzes.length +
    matchedExams.length +
    matchedFlashcards.length;

  const liveYoutubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `شرح ${query} الصف الثالث الاعدادي 2026`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="بحث فوري ومستمر في جميع المناهج، الشروحات، القوانين، والبطاقات..."
            className="w-full bg-transparent text-sm font-medium text-slate-900 focus:outline-hidden placeholder:text-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* In-app Search Status Banner */}
        {cleanQuery.length >= 2 && (
          <div className="bg-sky-50 px-4 py-2 border-b border-sky-100 flex items-center justify-between text-xs text-sky-800">
            <span>البحث الفوري في الشروحات ومناهج وزارة التربية والتعليم:</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>مشاهدة فورية داخل المنصة</span>
            </span>
          </div>
        )}

        {/* Results Area */}
        <div className="p-4 max-h-[70vh] overflow-y-auto space-y-4">
          {cleanQuery.length < 2 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              ابدأ بكتابة حرفين على الأقل للبحث السريع في بنك الأسئلة والشروحات والبطاقات...
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs space-y-3">
              <p>لم نعثر على نتائج مباشرة لـ "{query}" داخل الملفات المخزنة.</p>
              <p className="text-slate-400 text-[11px]">جرب البحث بكلمات أخرى مثل اسم المادة أو رقم الوحدة.</p>
            </div>
          ) : (
            <>
              <div className="text-xs font-semibold text-slate-500 pb-1 border-b border-slate-100 flex items-center justify-between">
                <span>عثرنا على {totalResults} نتيجة مطابقة:</span>
                <span className="text-emerald-700 font-bold">تحديث مستمر 2026</span>
              </div>

              {/* Matched Flashcards (Diverse Learning) */}
              {matchedFlashcards.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>بطاقات الاستذكار السريع والقوانين:</span>
                  </span>
                  {matchedFlashcards.map(({ flashcard, subjectName }, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-amber-200/80 bg-amber-50/50 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-slate-900">{flashcard.front}</strong>
                        <span className="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded-sm">
                          {subjectName}
                        </span>
                      </div>
                      <p className="text-slate-700 text-[11px]">{flashcard.back}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Matched Quizzes */}
              {matchedQuizzes.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-sky-700 block">الاختبارات التفاعلية:</span>
                  {matchedQuizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-sky-50/50 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-sky-600 shrink-0" />
                        <div>
                          <strong className="text-slate-900 block">{quiz.titleAr}</strong>
                          <span className="text-slate-500">{quiz.unitTitleAr} · {quiz.timeLimitMinutes} دقيقة</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onSelectQuiz(quiz);
                          onClose();
                        }}
                        className="px-3 py-1 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors whitespace-nowrap"
                      >
                        بدء الاختبار
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Matched Resources / Downloads */}
              {matchedResources.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-emerald-700 block">المذكرات والكتب القابلة للتحميل:</span>
                  {matchedResources.map(({ resource, subjectName }) => (
                    <div
                      key={resource.id}
                      className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50/50 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <strong className="text-slate-900 block">{resource.titleAr}</strong>
                          <span className="text-slate-500">{subjectName} · {resource.fileSize}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => triggerDirectDownload(resource, subjectName)}
                        className="px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-md transition-colors whitespace-nowrap"
                      >
                        تحميل مباشر
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Matched Videos */}
              {matchedVideos.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-purple-700 block">شروحات الفيديو:</span>
                  {matchedVideos.map(({ video, subjectName }) => (
                    <div
                      key={video.id}
                      className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-purple-50/50 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-purple-600 shrink-0" />
                        <div>
                          <strong className="text-slate-900 block">{video.titleAr}</strong>
                          <span className="text-slate-500">{video.teacherName} · {video.duration}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onSelectVideo(video, subjectName);
                          onClose();
                        }}
                        className="px-3 py-1 text-xs font-bold text-purple-700 bg-purple-100 hover:bg-purple-200 rounded-md transition-colors whitespace-nowrap"
                      >
                        مشاهدة
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Matched Exams */}
              {matchedExams.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-amber-700 block">امتحانات المحافظات:</span>
                  {matchedExams.map((exam) => (
                    <div
                      key={exam.id}
                      className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-amber-50/50 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                        <div>
                          <strong className="text-slate-900 block">امتحان {exam.governorateNameAr} - {exam.subjectNameAr}</strong>
                          <span className="text-slate-500">عام {exam.year} · {exam.fileSize}</span>
                        </div>
                      </div>
                      <span className="text-amber-800 font-bold text-[11px]">مع الإجابة الرسمية</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};

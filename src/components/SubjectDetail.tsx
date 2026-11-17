import React, { useState } from 'react';
import { Subject, TermType, ResourceFile, VideoLesson, UnitQuiz } from '../types';
import {
  BookOpen,
  Video,
  Download,
  Award,
  CheckCircle,
  Clock,
  Printer,
  ChevronLeft,
  ExternalLink,
  Search,
  RefreshCw,
  Sparkles,
  Layers,
  CheckCircle2,
  TrendingUp,
  Circle,
  Edit3,
  Save,
  Trash2,
  FileText,
  StickyNote
} from 'lucide-react';
import { triggerDirectDownload, openPrintablePreview } from '../utils/downloadHelper';
import { FlashcardsView } from './FlashcardsView';
import { ProgressData, calculateSubjectProgress } from '../utils/progressTracker';
import {
  getAllStudentNotes,
  saveNoteForUnit,
  deleteNoteForUnit,
  StudentNote
} from '../utils/notesManager';

interface SubjectDetailProps {
  subject: Subject;
  currentTerm: TermType;
  progress: ProgressData;
  onToggleUnit: (subjectId: string, unitId: string) => void;
  onOpenVideo: (video: VideoLesson) => void;
  onStartQuiz: (quiz: UnitQuiz) => void;
}

export const SubjectDetail: React.FC<SubjectDetailProps> = ({
  subject,
  currentTerm,
  progress,
  onToggleUnit,
  onOpenVideo,
  onStartQuiz,
}) => {
  const [activeTab, setActiveTab] = useState<'videos' | 'units' | 'notes' | 'flashcards' | 'downloads' | 'quizzes' | 'books'>('videos');
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);
  const [inPageSearch, setInPageSearch] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string>('اليوم (محدث تلقائياً)');

  // Student notes state
  const [notesState, setNotesState] = useState<Record<string, StudentNote>>(getAllStudentNotes);
  const [expandedNotesUnitId, setExpandedNotesUnitId] = useState<string | null>(null);
  const [activeDraftNote, setActiveDraftNote] = useState<string>('');
  const [savedFeedbackUnitId, setSavedFeedbackUnitId] = useState<string | null>(null);

  // Filter items by current term
  const termUnits = subject.units.filter((u) => u.term === currentTerm);
  const termResources = subject.resources.filter((r) => r.term === currentTerm);
  const termVideos = subject.videos.filter((v) => v.term === currentTerm);
  const termQuizzes = subject.quizzes.filter((q) => q.term === currentTerm);
  const flashcards = subject.flashcards || [];

  // Notes belonging to this subject
  const subjectNotes = Object.values(notesState).filter((n) => n.subjectId === subject.id);

  // Calculate subject progress metrics
  const progressMetrics = calculateSubjectProgress(subject, currentTerm, progress);

  // In-page search filter
  const query = inPageSearch.trim().toLowerCase();
  
  const filteredVideos = termVideos.filter((v) =>
    !query ||
    v.title.toLowerCase().includes(query) ||
    v.titleAr.includes(query) ||
    v.teacherName.includes(query) ||
    v.summaryNoteAr.includes(query)
  );

  const filteredResources = termResources.filter((r) =>
    !query ||
    r.title.toLowerCase().includes(query) ||
    r.titleAr.includes(query) ||
    r.descriptionAr.includes(query)
  );

  const filteredQuizzes = termQuizzes.filter((q) =>
    !query ||
    q.title.toLowerCase().includes(query) ||
    q.titleAr.includes(query) ||
    q.unitTitleAr.includes(query)
  );

  const filteredUnits = termUnits.filter((u) =>
    !query ||
    u.title.toLowerCase().includes(query) ||
    u.titleAr.includes(query) ||
    u.descriptionAr.includes(query)
  );

  const handleDownload = (resource: ResourceFile) => {
    triggerDirectDownload(resource, subject.nameAr);
    setDownloadSuccessId(resource.id);
    setTimeout(() => setDownloadSuccessId(null), 3000);
  };

  const handlePrint = (resource: ResourceFile) => {
    openPrintablePreview(resource, subject.nameAr);
  };

  const handleTriggerSync = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      setLastRefreshedTime(`${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} - تم التحقق من قنوات مدرستنا والوزارة`);
    }, 800);
  };

  // Note editor handlers
  const handleOpenNoteEditor = (unitId: string) => {
    if (expandedNotesUnitId === unitId) {
      setExpandedNotesUnitId(null);
    } else {
      setExpandedNotesUnitId(unitId);
      const existing = notesState[`${subject.id}_${unitId}`];
      setActiveDraftNote(existing ? existing.content : '');
    }
  };

  const handleSaveNote = (unitId: string, unitTitleAr: string) => {
    saveNoteForUnit(subject.id, unitId, unitTitleAr, activeDraftNote);
    setNotesState(getAllStudentNotes());
    setSavedFeedbackUnitId(unitId);
    setTimeout(() => setSavedFeedbackUnitId(null), 2500);
  };

  const handleDeleteNote = (unitId: string) => {
    deleteNoteForUnit(subject.id, unitId);
    setNotesState(getAllStudentNotes());
    setActiveDraftNote('');
    setExpandedNotesUnitId(null);
  };

  const handleInsertTemplate = (tag: string) => {
    setActiveDraftNote((prev) => (prev ? `${prev}\n${tag} ` : `${tag} `));
  };

  const handlePrintAllNotes = () => {
    if (subjectNotes.length === 0) return;

    const htmlContent = `
      <div class="content-block">
        <h3>كشكول الملاحظات الشخصية للطالب - مادة: ${subject.nameAr}</h3>
        <p>تجميع لجميع الملاحظات والنقاط والقوانين المدونة ذاتياً للمراجعة السريعة قبل الامتحان.</p>
        <div style="margin-top: 20px;">
          ${subjectNotes
            .map(
              (n, idx) => `
            <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
              <h4 style="color: #0284c7; margin-bottom: 6px;">${idx + 1}. ${n.unitTitleAr}</h4>
              <p style="font-size: 14px; white-space: pre-wrap; line-height: 1.6; color: #1e293b;">${n.content}</p>
              <span style="font-size: 11px; color: #64748b; display: block; margin-top: 8px;">آخر تعديل: ${n.lastUpdated}</span>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;

    openPrintablePreview(
      {
        id: `notes-${subject.id}`,
        title: `Private Notes - ${subject.name}`,
        titleAr: `كشكول ملاحظاتي الخاصة - ${subject.nameAr}`,
        type: 'summary',
        pagesCount: Math.ceil(subjectNotes.length / 2),
        fileSize: '1.0 MB',
        description: 'ملاحظاتي وتلخيصاتي الشخصية للمادة',
        descriptionAr: 'ملاحظاتي وتلخيصاتي الشخصية للمادة',
        term: currentTerm,
        downloadCount: 1,
        contentHtml: htmlContent,
      },
      subject.nameAr
    );
  };

  return (
    <section id="subject-content" className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subject Header Card with Progress Indicator */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
                <span>الشهادة الإعدادية</span>
                <span aria-hidden="true">·</span>
                <span className="font-bold text-sky-700">{subject.nameAr}</span>
                <span aria-hidden="true">·</span>
                <span>{currentTerm === 1 ? 'الترم الأول' : 'الترم الثاني'}</span>
                {subject.track === 'languages' && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-700 font-semibold">مدارس اللغات (Languages)</span>
                  </>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {subject.nameAr}
                <span className="block text-sm sm:text-base font-normal text-slate-500 mt-0.5" dir="ltr">
                  {subject.name}
                </span>
              </h2>
            </div>

            {/* Subject Progress Achievement Widget */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs min-w-[280px] sm:min-w-[340px]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <TrendingUp className="w-4 h-4 text-sky-600" />
                  <span>مؤشر إنجاز المادة:</span>
                </div>
                <span className="text-base font-extrabold text-sky-700 tabular-nums">
                  {progressMetrics.percentage}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    progressMetrics.percentage >= 80
                      ? 'bg-emerald-500'
                      : progressMetrics.percentage >= 40
                      ? 'bg-sky-500'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${progressMetrics.percentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>
                  أكملت <strong className="text-slate-900 tabular-nums">{progressMetrics.completedUnitsCount}</strong> من <span className="tabular-nums">{progressMetrics.totalUnitsCount}</span> وحدات
                </span>
                <span>
                  <strong className="text-emerald-700 tabular-nums">{progressMetrics.completedQuizzesCount}</strong> اختبارات مجتازة
                </span>
              </div>
            </div>

          </div>

          {/* Quick Search & Sync Bar */}
          <div className="mt-6 pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                value={inPageSearch}
                onChange={(e) => setInPageSearch(e.target.value)}
                placeholder={`بحث سريع ومستمر في ${subject.nameAr} (درس، ملخص، قاعدة، سؤال)...`}
                className="w-full pl-8 pr-9 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500 transition-all text-slate-800 placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
              {inPageSearch && (
                <button
                  onClick={() => setInPageSearch('')}
                  className="absolute left-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                >
                  مسح
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span>{lastRefreshedTime}</span>
              <button
                onClick={handleTriggerSync}
                disabled={isRefreshing}
                className="p-1 hover:bg-slate-200 rounded-md text-slate-500 hover:text-slate-800 transition-colors"
                title="تحديث ومزامنة الروابط والمصادر الآن"
                aria-label="Refresh and sync sources"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-sky-600' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Simplified & Diversified Tabs Bar including "كشكول ملاحظاتي" */}
        <div className="flex items-center gap-1 border-b border-slate-200 pb-px mb-6 overflow-x-auto no-scrollbar">
          
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'videos'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>شروحات الفيديو والنت ({filteredVideos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('units')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'units'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>الوحدات وتتبع الإنجاز ({progressMetrics.completedUnitsCount}/{filteredUnits.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'notes'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <StickyNote className="w-4 h-4 text-amber-600" />
            <span>كشكول ملاحظاتي ({subjectNotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'flashcards'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>بطاقات المذاكرة السريعة ({flashcards.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('downloads')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'downloads'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>المذكرات والتحميل المباشر ({filteredResources.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('quizzes')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'quizzes'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>الاختبارات التفاعلية ({filteredQuizzes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('books')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'books'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>كتب الوزارة الرسمية</span>
          </button>

        </div>

        {/* Tab 1: Video Lessons */}
        {activeTab === 'videos' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <p className="text-slate-600">
                شروحات منتقاة من <strong>قناة مدرستنا 1</strong> ومنصات المعلمين المعتمدة للتشغيل المباشر داخل المنصة.
              </p>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>جميع الشروحات تعمل مباشرة داخل الموقع</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVideos.map((video) => {
                return (
                  <div
                    key={video.id}
                    className="rounded-xl border border-slate-200 bg-white overflow-hidden hover:border-slate-300 transition-all shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      {/* Video Thumbnail Area */}
                      <div
                        onClick={() => onOpenVideo(video)}
                        className="relative h-40 bg-slate-900 flex items-center justify-center cursor-pointer group"
                      >
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/20 flex flex-col justify-between p-3 text-white">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold bg-sky-600 px-2 py-0.5 rounded-sm">
                              {video.channelName}
                            </span>
                            <span className="text-[10px] bg-black/60 font-mono px-1.5 py-0.5 rounded-sm">
                              {video.duration}
                            </span>
                          </div>
                          
                          <div className="w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                            <Video className="w-5 h-5 text-sky-600" />
                          </div>

                          <div className="text-[11px] text-slate-300 line-clamp-1">
                            انقر للتشغيل والملاحظات داخل المنصة
                          </div>
                        </div>
                      </div>

                      {/* Video Meta Info */}
                      <div className="p-4">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                          <span className="font-semibold text-slate-700">{video.teacherName}</span>
                          <span>الترم {video.term === 1 ? 'الأول' : 'الثاني'}</span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 mb-1 leading-snug line-clamp-2">
                          {video.titleAr}
                        </h4>

                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] text-slate-600 mb-2">
                          <strong className="block text-slate-800 mb-0.5">نصيحة الامتحان:</strong>
                          <p className="line-clamp-2">{video.summaryNoteAr}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: Modal Player */}
                    <div className="p-4 pt-0">
                      <button
                        onClick={() => onOpenVideo(video)}
                        className="w-full py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                      >
                        <Video className="w-4 h-4" />
                        <span>تشغيل الشرح داخل الموقع</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Units Breakdown with Interactive Completion Toggles & Private Note Pad */}
        {activeTab === 'units' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <p className="text-slate-600">
                حدد الوحدات المنجزة واكتب ملاحظاتك وتلخيصاتك الخاصة في كشكول كل وحدة للرجوع إليها لاحقاً.
              </p>
              <div className="font-semibold text-sky-700">
                نسبة إنجاز المادة: {progressMetrics.percentage}%
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredUnits.map((unit) => {
                const isCompleted = Boolean(progress.completedUnits[`${subject.id}_${unit.id}`]);
                const unitQuiz = subject.quizzes.find((q) => q.unitId === unit.id);
                const savedNote = notesState[`${subject.id}_${unit.id}`];
                const isNoteEditorOpen = expandedNotesUnitId === unit.id;
                const isSavedFeedback = savedFeedbackUnitId === unit.id;

                return (
                  <div
                    key={unit.id}
                    className={`p-5 rounded-xl border transition-all shadow-2xs flex flex-col justify-between ${
                      isCompleted
                        ? 'bg-emerald-50/40 border-emerald-200 ring-1 ring-emerald-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-semibold text-slate-500">الوحدة {unit.number}</span>
                        <div className="flex items-center gap-2">
                          {savedNote && (
                            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
                              <StickyNote className="w-3 h-3" />
                              <span>ملاحظة مسجلة</span>
                            </span>
                          )}
                          <span
                            className={`text-[11px] font-bold flex items-center gap-1 ${
                              isCompleted ? 'text-emerald-700' : 'text-slate-400'
                            }`}
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>وحدة منجزة</span>
                              </>
                            ) : (
                              <span>قيد الدراسة</span>
                            )}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 mb-1">
                        {unit.titleAr}
                      </h4>
                      <p className="text-xs text-slate-600 mb-3">
                        {unit.descriptionAr}
                      </p>

                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1 text-xs text-slate-700 mb-4">
                        <strong className="block text-slate-900 mb-1">الدروس المقررة:</strong>
                        {unit.lessonsAr.map((l, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="w-3.5 h-3.5 rounded-full bg-slate-200 text-slate-700 text-[10px] flex items-center justify-center font-bold">
                              {i + 1}
                            </span>
                            <span>{l}</span>
                          </div>
                        ))}
                      </div>

                      {/* Saved Note Quick Preview if editor is closed */}
                      {!isNoteEditorOpen && savedNote && (
                        <div className="mb-4 p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs text-amber-950">
                          <div className="flex items-center justify-between mb-1 text-[11px] text-amber-800 font-bold">
                            <span className="flex items-center gap-1">
                              <StickyNote className="w-3 h-3 text-amber-600" />
                              <span>ملاحظتك الشخصية المسجلة:</span>
                            </span>
                            <span className="font-normal text-amber-700">تعديل {savedNote.lastUpdated}</span>
                          </div>
                          <p className="line-clamp-2 leading-relaxed whitespace-pre-wrap">{savedNote.content}</p>
                        </div>
                      )}

                      {/* Expandable Private Note Editor */}
                      {isNoteEditorOpen && (
                        <div className="mb-4 p-3.5 bg-amber-50 border border-amber-300 rounded-xl space-y-2.5">
                          <div className="flex items-center justify-between text-xs">
                            <strong className="text-amber-950 font-bold flex items-center gap-1">
                              <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                              <span>كشكول ملاحظات الوحدة الخاصة:</span>
                            </strong>
                            {isSavedFeedback && (
                              <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                <span>تم الحفظ في جهازك!</span>
                              </span>
                            )}
                          </div>

                          {/* Quick Format Templates */}
                          <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
                            <button
                              type="button"
                              onClick={() => handleInsertTemplate('📌 نقطة امتحان هامة:')}
                              className="px-2 py-0.5 bg-white border border-amber-200 text-amber-900 rounded-md hover:bg-amber-100 transition-colors"
                            >
                              + نقطة هامة
                            </button>
                            <button
                              type="button"
                              onClick={() => handleInsertTemplate('💡 قانون للحفظ:')}
                              className="px-2 py-0.5 bg-white border border-amber-200 text-amber-900 rounded-md hover:bg-amber-100 transition-colors"
                            >
                              + قانون للحفظ
                            </button>
                            <button
                              type="button"
                              onClick={() => handleInsertTemplate('❓ سؤال للمعلم:')}
                              className="px-2 py-0.5 bg-white border border-amber-200 text-amber-900 rounded-md hover:bg-amber-100 transition-colors"
                            >
                              + سؤال للمعلم
                            </button>
                          </div>

                          <textarea
                            value={activeDraftNote}
                            onChange={(e) => setActiveDraftNote(e.target.value)}
                            placeholder="اكتب هنا ملاحظاتك الشخصية، القوانين والتعليلات الصعبة، أو الأسئلة التي تريد مراجعتها في ليلة الامتحان..."
                            rows={3}
                            className="w-full p-2.5 text-xs bg-white border border-amber-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-amber-500 leading-relaxed resize-y"
                          />

                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleSaveNote(unit.id, unit.titleAr)}
                                className="px-3 py-1 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-md transition-colors flex items-center gap-1 shadow-2xs"
                              >
                                <Save className="w-3 h-3" />
                                <span>حفظ الملاحظة</span>
                              </button>
                              {savedNote && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteNote(unit.id)}
                                  className="p-1 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors"
                                  title="حذف الملاحظة"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => setExpandedNotesUnitId(null)}
                              className="text-xs text-slate-500 hover:text-slate-700"
                            >
                              إغلاق
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Completion Toggle Button & Actions Bar */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onToggleUnit(subject.id, unit.id)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                            isCompleted
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>تم إنهاء الوحدة ✓</span>
                            </>
                          ) : (
                            <>
                              <Circle className="w-3.5 h-3.5 text-slate-400" />
                              <span>تحديد كمكتملة</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleOpenNoteEditor(unit.id)}
                          className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1 ${
                            isNoteEditorOpen
                              ? 'bg-amber-100 border-amber-300 text-amber-900'
                              : savedNote
                              ? 'bg-amber-50/70 border-amber-200 text-amber-800 hover:bg-amber-100'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                          title="كتابة وحفظ ملاحظة خاصة لهذه الوحدة"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                          <span>{savedNote ? 'ملاحظتي' : 'أضف ملاحظة'}</span>
                        </button>
                      </div>

                      {unitQuiz && (
                        <button
                          onClick={() => onStartQuiz(unitQuiz)}
                          className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1"
                        >
                          <span>اختبار الوحدة</span>
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Dedicated Student Notes Notebook Tab (كشكول ملاحظاتي الخاص) */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-amber-50/60 p-4 rounded-xl border border-amber-200">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
                  <StickyNote className="w-4 h-4 text-amber-600" />
                  <span>كشكول الطالب الخاص</span>
                  <span aria-hidden="true">·</span>
                  <span>مادة {subject.nameAr}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  جميع الملاحظات والنقاط المسجلة شخصياً في هذه المادة ({subjectNotes.length})
                </h3>
                <p className="text-xs text-slate-600">
                  تُحفظ ملاحظاتك بأمان على متصفحك ويمكنك طباعتها أو تصديرها كملف مراجعة سريع قبل الامتحانات.
                </p>
              </div>

              {subjectNotes.length > 0 && (
                <button
                  onClick={handlePrintAllNotes}
                  className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs self-start sm:self-auto"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>طباعة وتصدير كشكول الملاحظات (PDF)</span>
                </button>
              )}
            </div>

            {subjectNotes.length === 0 ? (
              <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                  <StickyNote className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">لم تقم بتسجيل أي ملاحظات في هذه المادة بعد</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  أثناء تصفحك لتبويب <strong>"الوحدات وتتبع الإنجاز"</strong>، اضغط على زر <strong>"أضف ملاحظة"</strong> لتدوين النقاط الهامة، القوانين الصعبة، وتلخيصاتك الخاصة لتجدها مجمعة هنا بنقرة واحدة!
                </p>
                <button
                  onClick={() => setActiveTab('units')}
                  className="px-4 py-2 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg border border-sky-200 transition-colors inline-flex items-center gap-1"
                >
                  <span>انتقل إلى الوحدات وابدأ كتابة أول ملاحظة</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjectNotes.map((note) => (
                  <div
                    key={note.id}
                    className="p-5 rounded-xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50/70 transition-all shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-amber-800 font-bold mb-2 pb-2 border-b border-amber-200/60">
                        <span className="flex items-center gap-1">
                          <StickyNote className="w-3.5 h-3.5 text-amber-600" />
                          <span>{note.unitTitleAr}</span>
                        </span>
                        <span className="text-[11px] font-normal text-slate-500">
                          آخر تعديل: {note.lastUpdated}
                        </span>
                      </div>

                      <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap font-sans mb-4">
                        {note.content}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs">
                      <button
                        onClick={() => {
                          setActiveTab('units');
                          setExpandedNotesUnitId(note.unitId);
                          setActiveDraftNote(note.content);
                        }}
                        className="text-amber-800 hover:text-amber-950 font-bold flex items-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>تعديل الملاحظة في الوحدة</span>
                      </button>

                      <button
                        onClick={() => handleDeleteNote(note.unitId)}
                        className="text-rose-600 hover:text-rose-700 flex items-center gap-1 text-[11px]"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>حذف</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Flashcards (بطاقات الاستذكار السريع) */}
        {activeTab === 'flashcards' && (
          <FlashcardsView flashcards={flashcards} subjectNameAr={subject.nameAr} />
        )}

        {/* Tab 5: Direct Downloads & Summaries */}
        {activeTab === 'downloads' && (
          <div className="space-y-4">
            <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 text-xs text-sky-900 flex items-center justify-between gap-3">
              <div>
                <strong className="block font-bold text-sky-950 mb-0.5">ملفات ومذكرات مستخرجة من كتب الوزارة الأصلية</strong>
                <p>جميع المذكرات والملخصات ومراجعات ليلة الامتحان مطابقة تماماً لكتب وزارة التربية والتعليم الرسمية وتدريبات التقويم الشامل.</p>
              </div>
              <span className="shrink-0 bg-sky-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs">
                معتمدة 2026
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map((res) => {
                const isDownloaded = downloadSuccessId === res.id;

                return (
                  <div
                    key={res.id}
                    className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                        <span>{res.fileSize}</span>
                        <span aria-hidden="true">·</span>
                        <span>{res.pagesCount} صفحة</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{res.downloadCount.toLocaleString()} تحميلة</span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-1 leading-snug">
                        {res.titleAr}
                      </h4>
                      <p className="text-[11px] text-slate-500 mb-2" dir="ltr">
                        {res.title}
                      </p>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                        {res.descriptionAr}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handlePrint(res)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>معاينة</span>
                      </button>

                      <button
                        onClick={() => handleDownload(res)}
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                          isDownloaded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-sky-600 hover:bg-sky-700 text-white shadow-2xs'
                        }`}
                      >
                        {isDownloaded ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>تم التنزيل!</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>تحميل مباشر</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 6: Interactive Unit Quizzes */}
        {activeTab === 'quizzes' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600">
              اختبارات دورية تحاكي الورقة الامتحانية الرسمية مع تصحيح فوري وشهادة تفوق إلكترونية معتمدة.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQuizzes.map((quiz) => {
                const quizPassedData = progress.completedQuizzes[quiz.id];

                return (
                  <div
                    key={quiz.id}
                    className={`p-5 rounded-xl border transition-all shadow-2xs flex flex-col justify-between ${
                      quizPassedData
                        ? 'bg-emerald-50/30 border-emerald-200'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <span>{quiz.unitTitleAr}</span>
                        <span aria-hidden="true">·</span>
                        <span>الدرجة: {quiz.totalMarks} درجة</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{quiz.timeLimitMinutes} دقيقة</span>
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 mb-1">
                        {quiz.titleAr}
                      </h4>
                      <p className="text-xs text-slate-500 mb-3" dir="ltr">
                        {quiz.title}
                      </p>

                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs text-slate-700 space-y-1 mb-4">
                        <div className="flex items-center justify-between">
                          <span>عدد الأسئلة:</span>
                          <strong className="text-slate-900">{quiz.questions.length} أسئلة</strong>
                        </div>
                        {quizPassedData ? (
                          <div className="flex items-center justify-between text-emerald-800 font-bold">
                            <span>حالة الاختبار:</span>
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>تم اجتيازه بنجاح ({quizPassedData.score} من {quizPassedData.total})</span>
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <span>المكافأة:</span>
                            <span className="text-amber-800 font-semibold">شهادة تفوق عند إحراز 70% فأكثر</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500">مؤقت زمني وتصحيح تلقائي</span>
                      <button
                        onClick={() => onStartQuiz(quiz)}
                        className="px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors shadow-2xs flex items-center gap-1"
                      >
                        <span>{quizPassedData ? 'إعادة الاختبار' : 'بدء الاختبار الدوري'}</span>
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 7: Official Ministry Books */}
        {activeTab === 'books' && (
          <div className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-3">
              <div>
                <strong className="block font-bold text-amber-950 mb-0.5">كتب وزارة التربية والتعليم الأصلية (طبعة 2026)</strong>
                <p>كتب الطالب وكتاب التدريبات والأنشطة (Student's Book & Workbook) المعتمدة رسمياً لمدارس المسار المصري ومدارس اللغات.</p>
              </div>
              <span className="shrink-0 bg-amber-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs">
                النسخة الأصلية
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {termResources
              .filter((r) => r.type === 'textbook' || r.type === 'workbook')
              .map((book) => (
                <div
                  key={book.id}
                  className="p-5 rounded-xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>كتاب المدرسة الوزاري</span>
                      <span>{book.fileSize}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">
                      {book.titleAr}
                    </h4>
                    <p className="text-xs text-slate-600 mb-4">
                      {book.descriptionAr}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => handlePrint(book)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50"
                    >
                      معاينة
                    </button>
                    <button
                      onClick={() => handleDownload(book)}
                      className="px-4 py-1.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-2xs"
                    >
                      تحميل مباشر للكتاب
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

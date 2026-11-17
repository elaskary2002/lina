import React, { useState } from 'react';
import { VideoLesson } from '../types';
import { X, Play, Clock, User, Download, FileText, ExternalLink, Search, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { triggerDirectDownload } from '../utils/downloadHelper';

interface VideoPlayerModalProps {
  video: VideoLesson;
  subjectNameAr: string;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  subjectNameAr,
  onClose,
}) => {
  const [activeTeacherIndex, setActiveTeacherIndex] = useState(0);
  const [embedFailed, setEmbedFailed] = useState(false);

  // Generate direct search URL for YouTube
  const currentQuery =
    activeTeacherIndex === 0
      ? video.youtubeSearchQuery || `${video.titleAr} الصف الثالث الاعدادي 2026`
      : video.alternativeTeachers?.[activeTeacherIndex - 1]?.searchQuery || video.youtubeSearchQuery;

  const currentTeacherName =
    activeTeacherIndex === 0
      ? video.teacherName
      : video.alternativeTeachers?.[activeTeacherIndex - 1]?.teacherName || video.teacherName;

  const currentChannelName =
    activeTeacherIndex === 0
      ? video.channelName || 'قناة مدرستنا 1 (التعليمية)'
      : video.alternativeTeachers?.[activeTeacherIndex - 1]?.channelName || 'منصة البث المباشر - الوزارة';

  const youtubeDirectSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(currentQuery)}`;

  const handleDownloadLessonNotes = () => {
    triggerDirectDownload(
      {
        id: `note-${video.id}`,
        title: `Lesson Notes - ${video.title}`,
        titleAr: `ملخص وتفريغ محاضرة: ${video.titleAr}`,
        type: 'summary',
        pagesCount: 4,
        fileSize: '1.2 MB',
        description: video.summaryNoteAr,
        descriptionAr: video.summaryNoteAr,
        term: video.term,
        downloadCount: 1,
        contentHtml: `
          <div class="content-block">
            <h3>ملخص وتفريغ المحاضرة التعليمية الرسمية:</h3>
            <p><strong>المحاضر:</strong> ${currentTeacherName}</p>
            <p><strong>القناة:</strong> ${currentChannelName}</p>
            <p><strong>المدة:</strong> ${video.duration}</p>
            <div class="highlight-card">
              <h4>أهم المفاهيم والقواعد المشروحة في الدرس:</h4>
              <ul>
                ${video.keyTopicsAr.map((t) => `<li>${t}</li>`).join('')}
              </ul>
            </div>
            <h3>القاعدة الذهبية وملاحظة الامتحان:</h3>
            <p>${video.summaryNoteAr}</p>
            <div class="footer-tips">
              <p>تم استخراج هذا التفريغ من منصة التفوق التعليمية للشهادة الإعدادية (مناهج 2025/2026).</p>
            </div>
          </div>
        `,
      },
      subjectNameAr
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden my-6">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700">
              <span>{subjectNameAr}</span>
              <span aria-hidden="true">·</span>
              <span>شرح الفيديو والدروس</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-bold">تحديث 2025/2026</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1">
              {video.titleAr}
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مشاهدة آمنة داخل المنصة</span>
            </span>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Container (Inside Website) */}
        <div className="relative aspect-video bg-slate-950 w-full overflow-hidden flex flex-col items-center justify-center text-center">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={video.titleAr}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Live Channel / Teacher Selector */}
        <div className="bg-slate-100 p-3 px-6 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-slate-700 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-sky-600" />
              <span>المصدر والمعلم:</span>
            </span>
            <button
              onClick={() => setActiveTeacherIndex(0)}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                activeTeacherIndex === 0
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              {video.teacherName}
            </button>
            {video.alternativeTeachers?.map((alt, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTeacherIndex(idx + 1)}
                className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                  activeTeacherIndex === idx + 1
                    ? 'bg-sky-600 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200'
                }`}
              >
                {alt.teacherName}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">
              مشاهدة مباشرة بدون إعلانات مزعجة
            </span>
          </div>
        </div>

        {/* Lesson Details & Summaries */}
        <div className="p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <span className="font-semibold text-slate-900">
                القناة: {currentChannelName}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {video.duration}
              </span>
              <span aria-hidden="true">·</span>
              <span>الترم {video.term === 1 ? 'الأول' : 'الثاني'}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadLessonNotes}
                className="px-4 py-2 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg border border-sky-200 transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Download className="w-4 h-4" />
                <span>تحميل مذكرة وملخص الدرس (PDF)</span>
              </button>
            </div>
          </div>

          {/* Topics Covered */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-2">أهم نقاط ومحاور الدرس المشروحة:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {video.keyTopicsAr.map((topic, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700">
                  <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher's Golden Rule / Exam Tip */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
            <strong className="block text-amber-950 font-bold mb-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              <span>القاعدة الذهبية وسؤال الامتحان المتكرر:</span>
            </strong>
            <p className="leading-relaxed">{video.summaryNoteAr}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

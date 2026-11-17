import React, { useState } from 'react';
import { CURRICULUM_SUBJECTS } from './data/curriculumData';
import { Subject, TrackType, TermType, UnitQuiz, VideoLesson } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SubjectNavigation } from './components/SubjectNavigation';
import { StudentProgressOverview } from './components/StudentProgressOverview';
import { StudySchedulePlanner } from './components/StudySchedulePlanner';
import { DailyQuizzesView } from './components/DailyQuizzesView';
import { SubjectDetail } from './components/SubjectDetail';
import { GovernoratesExamsView } from './components/GovernoratesExamsView';
import { CurriculumGuideView } from './components/CurriculumGuideView';
import { QuizModal } from './components/QuizModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { CertificateModal } from './components/CertificateModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { Footer } from './components/Footer';
import {
  getStoredProgress,
  toggleUnitCompletion,
  markQuizCompleted,
  saveProgress,
  ProgressData
} from './utils/progressTracker';

export default function App() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('english');
  const [currentTrack, setCurrentTrack] = useState<TrackType>('languages');
  const [currentTerm, setCurrentTerm] = useState<TermType>(1);

  // Student completion progress state (persisted in localStorage)
  const [progress, setProgress] = useState<ProgressData>(getStoredProgress);

  // Modals state
  const [activeQuiz, setActiveQuiz] = useState<UnitQuiz | null>(null);
  const [activeVideo, setActiveVideo] = useState<{ video: VideoLesson; subjectNameAr: string } | null>(null);
  const [certificateData, setCertificateData] = useState<{
    studentName: string;
    score: number;
    total: number;
    quizTitle: string;
  } | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');

  // Selected subject
  const currentSubject: Subject =
    CURRICULUM_SUBJECTS.find((s) => s.id === selectedSubjectId) || CURRICULUM_SUBJECTS[0];

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'downloads' || sectionId === 'quizzes') {
      const el = document.getElementById('subject-content');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenSearchWithQuery = (query: string) => {
    setSearchInitialQuery(query);
    setIsSearchOpen(true);
  };

  const handleStartQuickQuiz = () => {
    // Pick the first available quiz from the currently selected subject
    const quiz = currentSubject.quizzes.find((q) => q.term === currentTerm) || currentSubject.quizzes[0];
    if (quiz) {
      setActiveQuiz(quiz);
    }
  };

  const handleOpenVideo = (video: VideoLesson) => {
    setActiveVideo({ video, subjectNameAr: currentSubject.nameAr });
  };

  const handleViewCertificate = (studentName: string, score: number, total: number, quizTitle: string) => {
    setCertificateData({ studentName, score, total, quizTitle });
  };

  const handleToggleUnit = (subjectId: string, unitId: string) => {
    toggleUnitCompletion(subjectId, unitId);
    setProgress(getStoredProgress());
  };

  const handleQuizCompleted = (quizId: string, score: number, total: number) => {
    markQuizCompleted(quizId, score, total);
    setProgress(getStoredProgress());
  };

  const handleResetProgress = () => {
    if (window.confirm('هل تريد إعادة ضبط مؤشر تقدم جميع المواد؟')) {
      saveProgress({ completedUnits: {}, completedQuizzes: {}, watchedVideos: {} });
      setProgress(getStoredProgress());
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans" dir="rtl">
      
      {/* Universal Top Bar Contract */}
      <Header
        currentTrack={currentTrack}
        setTrack={setCurrentTrack}
        currentTerm={currentTerm}
        setTerm={setCurrentTerm}
        onOpenSearch={() => {
          setSearchInitialQuery('');
          setIsSearchOpen(true);
        }}
        onNavigateSection={handleNavigateSection}
        onOpenQuickQuiz={handleStartQuickQuiz}
      />

      {/* Hero Section */}
      <Hero
        currentTrack={currentTrack}
        currentTerm={currentTerm}
        onSearchSubmit={handleOpenSearchWithQuery}
        onSelectSubject={(id) => {
          setSelectedSubjectId(id);
          handleNavigateSection('subjects');
        }}
        onStartQuizDirect={handleStartQuickQuiz}
      />

      {/* Main Subjects Grid Selector with Progress Percentages */}
      <SubjectNavigation
        selectedSubjectId={selectedSubjectId}
        onSelectSubject={setSelectedSubjectId}
        currentTerm={currentTerm}
        currentTrack={currentTrack}
        progress={progress}
      />

      {/* Student Completion Progress Dashboard */}
      <StudentProgressOverview
        currentTerm={currentTerm}
        progress={progress}
        onSelectSubject={(id) => {
          setSelectedSubjectId(id);
          handleNavigateSection('subject-content');
        }}
        onResetProgress={handleResetProgress}
      />

      {/* Smart Weekly Study Schedule Planner */}
      <StudySchedulePlanner
        subjects={CURRICULUM_SUBJECTS}
        currentTerm={currentTerm}
        progress={progress}
      />

      {/* Subject Detail - 6 Comprehensive Components, Direct Downloads & Progress Toggles */}
      <main className="flex-1">
        <SubjectDetail
          subject={currentSubject}
          currentTerm={currentTerm}
          progress={progress}
          onToggleUnit={handleToggleUnit}
          onOpenVideo={handleOpenVideo}
          onStartQuiz={setActiveQuiz}
        />

        {/* Daily Quizzes Challenge Hub */}
        <DailyQuizzesView subjects={CURRICULUM_SUBJECTS} />

        {/* Governorates Official Past Exams View */}
        <GovernoratesExamsView currentTerm={currentTerm} />

        {/* Curriculum Guide & Study Plan Schedule */}
        <CurriculumGuideView />
      </main>

      {/* Quiet Footer */}
      <Footer
        onSelectSubject={(id) => {
          setSelectedSubjectId(id);
          window.scrollTo({ top: 400, behavior: 'smooth' });
        }}
        onNavigateSection={handleNavigateSection}
      />

      {/* Interactive Quiz Modal */}
      {activeQuiz && (
        <QuizModal
          quiz={activeQuiz}
          onClose={() => setActiveQuiz(null)}
          onViewCertificate={handleViewCertificate}
          onQuizCompleted={handleQuizCompleted}
        />
      )}

      {/* Video Player & Notes Modal */}
      {activeVideo && (
        <VideoPlayerModal
          video={activeVideo.video}
          subjectNameAr={activeVideo.subjectNameAr}
          onClose={() => setActiveVideo(null)}
        />
      )}

      {/* Academic Excellence Certificate Modal */}
      {certificateData && (
        <CertificateModal
          studentName={certificateData.studentName}
          score={certificateData.score}
          totalMarks={certificateData.total}
          quizTitle={certificateData.quizTitle}
          onClose={() => setCertificateData(null)}
        />
      )}

      {/* Quick Search across all subjects Modal */}
      {isSearchOpen && (
        <QuickSearchModal
          initialQuery={searchInitialQuery}
          onClose={() => setIsSearchOpen(false)}
          onSelectVideo={(video, subjectNameAr) => {
            setActiveVideo({ video, subjectNameAr });
          }}
          onSelectQuiz={(quiz) => {
            setActiveQuiz(quiz);
          }}
        />
      )}

    </div>
  );
}

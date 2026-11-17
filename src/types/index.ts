export type TrackType = 'languages' | 'general';
export type TermType = 1 | 2;

export interface ResourceFile {
  id: string;
  title: string;
  titleAr: string;
  type: 'textbook' | 'workbook' | 'summary' | 'formula_sheet' | 'exam_model' | 'guide';
  pagesCount: number;
  fileSize: string;
  description: string;
  descriptionAr: string;
  term: TermType;
  unitId?: string;
  downloadCount: number;
  contentHtml?: string; // Rich printable content for direct download generator
}

export interface VideoLesson {
  id: string;
  title: string;
  titleAr: string;
  teacherName: string;
  channelName: string;
  duration: string;
  youtubeId: string;
  youtubeSearchQuery: string;
  unitId: string;
  term: TermType;
  keyTopics: string[];
  keyTopicsAr: string[];
  summaryNote: string;
  summaryNoteAr: string;
  alternativeTeachers?: {
    teacherName: string;
    channelName: string;
    searchQuery: string;
  }[];
}

export interface FlashCard {
  id: string;
  front: string;
  back: string;
  category: string;
  unitId?: string;
  hint?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionAr?: string;
  options: string[];
  optionsAr?: string[];
  correctAnswerIndex: number;
  explanation: string;
  explanationAr: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UnitQuiz {
  id: string;
  unitId: string;
  unitTitle: string;
  unitTitleAr: string;
  title: string;
  titleAr: string;
  term: TermType;
  timeLimitMinutes: number;
  totalMarks: number;
  questions: QuizQuestion[];
}

export interface StudyUnit {
  id: string;
  number: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  term: TermType;
  lessons: string[];
  lessonsAr: string[];
  keyGrammarOrTheorems?: string[];
}

export interface Subject {
  id: string;
  name: string;
  nameAr: string;
  track: TrackType;
  category: 'english' | 'math' | 'science' | 'arabic' | 'social' | 'ict';
  icon: string;
  accentColor: string;
  bgLight: string;
  description: string;
  descriptionAr: string;
  units: StudyUnit[];
  resources: ResourceFile[];
  videos: VideoLesson[];
  quizzes: UnitQuiz[];
  flashcards: FlashCard[];
}

export interface GovernorateExam {
  id: string;
  governorateName: string;
  governorateNameAr: string;
  subjectId: string;
  subjectNameAr: string;
  subjectNameEn: string;
  year: string;
  term: TermType;
  fileSize: string;
  totalMarks: number;
  questionsCount: number;
  answersIncluded: boolean;
  contentSummary: string;
}

export interface UserQuizResult {
  quizId: string;
  quizTitle: string;
  subjectName: string;
  score: number;
  totalMarks: number;
  percentage: number;
  completedAt: string;
  studentName?: string;
}

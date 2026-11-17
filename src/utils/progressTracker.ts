import { Subject, TermType } from '../types';

const STORAGE_KEY = 'prep3_student_progress_v1';

export interface ProgressData {
  completedUnits: Record<string, boolean>; // `${subjectId}_${unitId}` -> true
  completedQuizzes: Record<string, { score: number; total: number; passedAt: string }>; // quizId -> data
  watchedVideos: Record<string, boolean>; // videoId -> true
}

export function getStoredProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error loading progress from localStorage', e);
  }
  return {
    completedUnits: {},
    completedQuizzes: {},
    watchedVideos: {},
  };
}

export function saveProgress(data: ProgressData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving progress to localStorage', e);
  }
}

export function isUnitCompleted(subjectId: string, unitId: string): boolean {
  const data = getStoredProgress();
  return Boolean(data.completedUnits[`${subjectId}_${unitId}`]);
}

export function toggleUnitCompletion(subjectId: string, unitId: string): boolean {
  const data = getStoredProgress();
  const key = `${subjectId}_${unitId}`;
  const newState = !data.completedUnits[key];
  data.completedUnits[key] = newState;
  saveProgress(data);
  return newState;
}

export function markQuizCompleted(quizId: string, score: number, total: number): void {
  const data = getStoredProgress();
  data.completedQuizzes[quizId] = {
    score,
    total,
    passedAt: new Date().toISOString(),
  };
  saveProgress(data);
}

export function markVideoWatched(videoId: string): void {
  const data = getStoredProgress();
  data.watchedVideos[videoId] = true;
  saveProgress(data);
}

export function calculateSubjectProgress(
  subject: Subject,
  term: TermType,
  progress: ProgressData
): {
  percentage: number;
  completedUnitsCount: number;
  totalUnitsCount: number;
  completedQuizzesCount: number;
  totalQuizzesCount: number;
} {
  const termUnits = subject.units.filter((u) => u.term === term);
  const termQuizzes = subject.quizzes.filter((q) => q.term === term);

  if (termUnits.length === 0) {
    return {
      percentage: 0,
      completedUnitsCount: 0,
      totalUnitsCount: 0,
      completedQuizzesCount: 0,
      totalQuizzesCount: 0,
    };
  }

  let completedUnitsCount = 0;
  termUnits.forEach((unit) => {
    if (progress.completedUnits[`${subject.id}_${unit.id}`]) {
      completedUnitsCount++;
    }
  });

  let completedQuizzesCount = 0;
  termQuizzes.forEach((quiz) => {
    if (progress.completedQuizzes[quiz.id]) {
      completedQuizzesCount++;
    }
  });

  // Calculate weighted percentage: 70% based on units completed, 30% on quizzes passed
  // If no quizzes exist for term, 100% on units
  let percentage = 0;
  if (termQuizzes.length > 0) {
    const unitRatio = completedUnitsCount / termUnits.length;
    const quizRatio = completedQuizzesCount / termQuizzes.length;
    percentage = Math.round((unitRatio * 0.7 + quizRatio * 0.3) * 100);
  } else {
    percentage = Math.round((completedUnitsCount / termUnits.length) * 100);
  }

  return {
    percentage: Math.min(100, percentage),
    completedUnitsCount,
    totalUnitsCount: termUnits.length,
    completedQuizzesCount,
    totalQuizzesCount: termQuizzes.length,
  };
}

export function calculateOverallProgress(
  subjects: Subject[],
  term: TermType,
  progress: ProgressData
): {
  overallPercentage: number;
  totalUnitsCompleted: number;
  totalUnitsTotal: number;
  totalQuizzesPassed: number;
} {
  let totalUnits = 0;
  let completedUnits = 0;
  let quizzesPassed = 0;

  subjects.forEach((subj) => {
    const res = calculateSubjectProgress(subj, term, progress);
    totalUnits += res.totalUnitsCount;
    completedUnits += res.completedUnitsCount;
    quizzesPassed += res.completedQuizzesCount;
  });

  const overallPercentage = totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;

  return {
    overallPercentage,
    totalUnitsCompleted: completedUnits,
    totalUnitsTotal: totalUnits,
    totalQuizzesPassed: quizzesPassed,
  };
}

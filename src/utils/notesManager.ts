const NOTES_STORAGE_KEY = 'prep3_student_notes_v1';

export interface StudentNote {
  id: string; // `${subjectId}_${unitId}` or `${subjectId}_${unitId}_${lessonIndex}`
  subjectId: string;
  unitId: string;
  unitTitleAr: string;
  content: string;
  lastUpdated: string;
}

export function getAllStudentNotes(): Record<string, StudentNote> {
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error loading notes from localStorage', e);
  }
  return {};
}

export function getNoteForUnit(subjectId: string, unitId: string): StudentNote | null {
  const notes = getAllStudentNotes();
  const key = `${subjectId}_${unitId}`;
  return notes[key] || null;
}

export function saveNoteForUnit(
  subjectId: string,
  unitId: string,
  unitTitleAr: string,
  content: string
): StudentNote {
  const notes = getAllStudentNotes();
  const key = `${subjectId}_${unitId}`;
  const updatedNote: StudentNote = {
    id: key,
    subjectId,
    unitId,
    unitTitleAr,
    content: content.trim(),
    lastUpdated: new Date().toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };

  if (!content.trim()) {
    delete notes[key];
  } else {
    notes[key] = updatedNote;
  }

  try {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  } catch (e) {
    console.error('Error saving notes to localStorage', e);
  }

  return updatedNote;
}

export function deleteNoteForUnit(subjectId: string, unitId: string): void {
  const notes = getAllStudentNotes();
  const key = `${subjectId}_${unitId}`;
  delete notes[key];
  try {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  } catch (e) {
    console.error('Error deleting note from localStorage', e);
  }
}

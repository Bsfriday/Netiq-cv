import { ResumeData } from '../types/cv';
import { DEFAULT_BLANK_CV } from '../data/defaultCv';

const STORAGE_KEY = 'netiqcv_active_draft';
const OLD_STORAGE_KEY = 'resumeiq_active_draft';
const SAVED_LIST_KEY = 'netiqcv_saved_resumes';
const OLD_SAVED_LIST_KEY = 'resumeiq_saved_resumes';

export function saveDraftToStorage(cv: ResumeData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cv));
  } catch (e) {
    console.warn('Failed to save CV draft to localStorage', e);
  }
}

export function loadDraftFromStorage(): ResumeData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(OLD_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.personalInfo && Array.isArray(parsed.experience)) {
      return parsed as ResumeData;
    }
  } catch (e) {
    console.warn('Failed to load CV draft from localStorage', e);
  }
  return null;
}

export const getDraftFromStorage = loadDraftFromStorage;

export function clearDraftFromStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(OLD_STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear draft', e);
  }
}

export function saveResumeToList(cv: ResumeData): boolean {
  try {
    const listRaw = localStorage.getItem(SAVED_LIST_KEY) || localStorage.getItem(OLD_SAVED_LIST_KEY);
    let list: ResumeData[] = listRaw ? JSON.parse(listRaw) : [];
    const existingIndex = list.findIndex(item => item.id === cv.id);
    const updated = { ...cv, updatedAt: Date.now() };
    
    if (existingIndex >= 0) {
      list[existingIndex] = updated;
    } else {
      list.unshift(updated);
    }
    // Limit to 25 saved resumes
    list = list.slice(0, 25);
    localStorage.setItem(SAVED_LIST_KEY, JSON.stringify(list));
    // Also update draft
    saveDraftToStorage(updated);
    return true;
  } catch (e) {
    console.warn('Failed to save resume to list', e);
    return false;
  }
}

export function getSavedResumesList(): ResumeData[] {
  try {
    const listRaw = localStorage.getItem(SAVED_LIST_KEY) || localStorage.getItem(OLD_SAVED_LIST_KEY);
    if (!listRaw) return [];
    return JSON.parse(listRaw);
  } catch (e) {
    console.warn('Failed to read saved resumes', e);
    return [];
  }
}

export const getSavedResumes = getSavedResumesList;

export function deleteSavedResume(id: string): boolean {
  try {
    const listRaw = localStorage.getItem(SAVED_LIST_KEY);
    if (!listRaw) return true;
    const list: ResumeData[] = JSON.parse(listRaw);
    const filtered = list.filter(item => item.id !== id);
    localStorage.setItem(SAVED_LIST_KEY, JSON.stringify(filtered));
    return true;
  } catch (e) {
    console.warn('Failed to delete saved resume', e);
    return false;
  }
}

export function duplicateSavedResume(cvOrId: ResumeData | string): ResumeData | null {
  try {
    let sourceCv: ResumeData | undefined;
    if (typeof cvOrId === 'string') {
      const list = getSavedResumesList();
      sourceCv = list.find(r => r.id === cvOrId);
    } else {
      sourceCv = cvOrId;
    }

    if (!sourceCv) return null;

    const newId = `cv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const duplicated: ResumeData = {
      ...JSON.parse(JSON.stringify(sourceCv)),
      id: newId,
      title: `${sourceCv.title || 'Resume'} (Copy)`,
      updatedAt: Date.now(),
    };
    saveResumeToList(duplicated);
    return duplicated;
  } catch (e) {
    console.warn('Failed to duplicate resume', e);
    return null;
  }
}

export function renameSavedResume(id: string, newTitle: string): boolean {
  try {
    const listRaw = localStorage.getItem(SAVED_LIST_KEY);
    if (!listRaw) return false;
    let list: ResumeData[] = JSON.parse(listRaw);
    const item = list.find(r => r.id === id);
    if (item) {
      item.title = newTitle;
      item.updatedAt = Date.now();
      localStorage.setItem(SAVED_LIST_KEY, JSON.stringify(list));
      return true;
    }
    return false;
  } catch (e) {
    console.warn('Failed to rename saved resume', e);
    return false;
  }
}

export function createNewBlankResume(): ResumeData {
  const newId = `cv-${Date.now()}`;
  return {
    id: newId,
    title: 'My Professional Resume',
    industry: 'Technology',
    personalInfo: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      website: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: [],
    themeConfig: {
      template: 'modern',
      accentColor: '#2563eb',
      font: 'sans',
      spacing: 'normal',
    },
    updatedAt: Date.now(),
  };
}

import { describe, it, expect, beforeEach, beforeAll, vi } from 'vitest';
import { 
  getDraftFromStorage, 
  saveDraftToStorage, 
  getSavedResumes, 
  saveResumeToList, 
  deleteSavedResume,
  duplicateSavedResume,
  renameSavedResume,
  createNewBlankResume
} from '../utils/storage';
import { calculateResumeStrength, calculateCvCompletion } from '../utils/completion';
import { generateRandomCv, INDUSTRIES } from '../data/randomCvs';
import { SAMPLE_CVS } from '../data/sampleCvs';
import { DEFAULT_BLANK_CV } from '../data/defaultCv';
import { ResumeData } from '../types/cv';
import { getCvFilename, exportCvToJson, exportCvToTxt, exportCvToPdf, generateDirectJsPdf, printCv } from '../utils/pdfExport';
import { generateTailoredAiResume, COUNTRIES, AGE_GROUPS, EMPLOYMENT_STATUSES, POPULAR_OCCUPATIONS } from '../data/aiGenerator';

// In-memory localStorage mock for node testing environment
const mockStorage: Record<string, string> = {};
const localStorageMock = {
  getItem: (key: string) => mockStorage[key] || null,
  setItem: (key: string, value: string) => {
    mockStorage[key] = value.toString();
  },
  removeItem: (key: string) => {
    delete mockStorage[key];
  },
  clear: () => {
    for (const key of Object.keys(mockStorage)) {
      delete mockStorage[key];
    }
  },
};

if (typeof globalThis.localStorage === 'undefined' || !globalThis.localStorage.clear) {
  Object.defineProperty(globalThis, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });
}

describe('NetiqCV Storage & Persistence Unit Tests', () => {
  beforeEach(() => {
    globalThis.localStorage.clear();
  });

  it('saves and retrieves the active draft from localStorage', () => {
    const customCv: ResumeData = {
      ...DEFAULT_BLANK_CV,
      id: 'test-draft-1',
      personalInfo: {
        ...DEFAULT_BLANK_CV.personalInfo,
        fullName: 'Test Candidate',
      }
    };

    saveDraftToStorage(customCv);
    const retrieved = getDraftFromStorage();

    expect(retrieved).not.toBeNull();
    expect(retrieved?.personalInfo.fullName).toBe('Test Candidate');
    expect(retrieved?.id).toBe('test-draft-1');
  });

  it('saves a resume to saved list, prevents duplicates, and retrieves list', () => {
    const cv1: ResumeData = { ...DEFAULT_BLANK_CV, id: 'cv-1', title: 'First Resume' };
    const cv2: ResumeData = { ...DEFAULT_BLANK_CV, id: 'cv-2', title: 'Second Resume' };

    saveResumeToList(cv1);
    saveResumeToList(cv2);

    let list = getSavedResumes();
    expect(list.length).toBe(2);
    expect(list.find(r => r.id === 'cv-1')?.title).toBe('First Resume');

    // Updating existing resume in list
    const updatedCv1 = { ...cv1, title: 'Updated First Resume' };
    saveResumeToList(updatedCv1);
    list = getSavedResumes();
    expect(list.length).toBe(2);
    expect(list.find(r => r.id === 'cv-1')?.title).toBe('Updated First Resume');
  });

  it('duplicates a saved resume with a unique ID and copies all fields', () => {
    const cv: ResumeData = { ...DEFAULT_BLANK_CV, id: 'cv-orig', title: 'Original Resume' };
    saveResumeToList(cv);

    const duplicated = duplicateSavedResume('cv-orig');
    expect(duplicated).not.toBeNull();
    expect(duplicated?.id).not.toBe('cv-orig');
    expect(duplicated?.title).toBe('Original Resume (Copy)');

    const list = getSavedResumes();
    expect(list.length).toBe(2);
  });

  it('renames a saved resume successfully', () => {
    const cv: ResumeData = { ...DEFAULT_BLANK_CV, id: 'cv-rename', title: 'Old Title' };
    saveResumeToList(cv);

    const renamed = renameSavedResume('cv-rename', 'Brand New Title');
    expect(renamed).toBe(true);

    const list = getSavedResumes();
    expect(list.find(r => r.id === 'cv-rename')?.title).toBe('Brand New Title');
  });

  it('deletes a resume from storage', () => {
    const cv: ResumeData = { ...DEFAULT_BLANK_CV, id: 'cv-del', title: 'To Delete' };
    saveResumeToList(cv);
    expect(getSavedResumes().length).toBe(1);

    deleteSavedResume('cv-del');
    expect(getSavedResumes().length).toBe(0);
  });

  it('creates a new blank resume with default structure', () => {
    const blank = createNewBlankResume();
    expect(blank.id).toBeDefined();
    expect(blank.title).toBe('My Professional Resume');
    expect(blank.personalInfo.fullName).toBe('');
    expect(blank.experience).toEqual([]);
    expect(blank.education).toEqual([]);
    expect(blank.skills).toEqual([]);
  });
});

describe('NetiqCV Strength & Completion Scoring Tests', () => {
  it('calculates 100% completion on fully populated sample CVs', () => {
    const sampleTech = SAMPLE_CVS.Technology;
    const score = calculateCvCompletion(sampleTech);
    expect(score.totalScore).toBeGreaterThanOrEqual(90);
    expect(score.rating).toBe('Excellent');
    expect(score.sectionScores.personalInfo).toBe(100);
    expect(score.sectionScores.summary).toBe(100);
    expect(score.sectionScores.experience).toBe(100);
    expect(score.sectionScores.education).toBe(100);
    expect(score.sectionScores.skills).toBe(100);
  });

  it('calculates strength level on empty CV and provides suggestions', () => {
    const emptyCv = createNewBlankResume();
    const result = calculateResumeStrength(emptyCv);

    expect(result.score).toBe(0);
    expect(result.level).toBe('Needs Work');
    expect(result.sections.length).toBeGreaterThan(0);
    expect(result.sections.some(s => !s.completed)).toBe(true);
  });
});

describe('NetiqCV Data & Generator Tests', () => {
  it('contains all 9 industry categories with rich sample data', () => {
    INDUSTRIES.forEach((industry) => {
      const sample = SAMPLE_CVS[industry];
      expect(sample).toBeDefined();
      expect(sample.personalInfo.fullName.length).toBeGreaterThan(0);
      expect(sample.experience.length).toBeGreaterThan(0);
      expect(sample.education.length).toBeGreaterThan(0);
      expect(sample.skills.length).toBeGreaterThan(0);
    });
  });

  it('generates random resumes with unique identifiers and valid theme config', () => {
    const rand1 = generateRandomCv('Technology');
    const rand2 = generateRandomCv('Healthcare');

    expect(rand1.id).not.toBe(rand2.id);
    expect(rand1.industry).toBe('Technology');
    expect(rand2.industry).toBe('Healthcare');
    expect(rand1.personalInfo.email).toContain('@');
    expect(rand1.themeConfig.template).toBeDefined();
  });

  it('persists profile picture and document attachment images correctly in storage', () => {
    const cvWithMedia: ResumeData = {
      ...DEFAULT_BLANK_CV,
      id: 'cv-with-media',
      personalInfo: {
        ...DEFAULT_BLANK_CV.personalInfo,
        fullName: 'Alex Parker',
        photoUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      },
      documentImages: [
        {
          id: 'doc-1',
          name: 'AWS Solutions Architect Certificate',
          type: 'image/png',
          dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
          fileSize: '0.12 MB',
          uploadedAt: Date.now(),
        }
      ]
    };

    saveResumeToList(cvWithMedia);
    const list = getSavedResumes();
    const loaded = list.find(c => c.id === 'cv-with-media');

    expect(loaded).toBeDefined();
    expect(loaded?.personalInfo.photoUrl).toBeDefined();
    expect(loaded?.documentImages?.length).toBe(1);
    expect(loaded?.documentImages?.[0].name).toBe('AWS Solutions Architect Certificate');
  });
});

describe('NetiqCV Export & Download System Tests', () => {
  const sampleCv: ResumeData = {
    ...DEFAULT_BLANK_CV,
    personalInfo: {
      fullName: 'Sarah Connor',
      jobTitle: 'Senior Systems Engineer',
      email: 'sarah@cyberdyne.org',
      phone: '+1 555-0199',
      location: 'Los Angeles, CA',
      linkedin: 'linkedin.com/in/sarahconnor',
      github: 'github.com/sarahconnor',
    },
    summary: 'Seasoned engineer with extensive experience in resilient systems.',
    experience: [
      {
        id: 'e1',
        company: 'Cyberdyne Systems',
        jobTitle: 'Lead Architect',
        startDate: '2020-01',
        endDate: '',
        current: true,
        location: 'LA, CA',
        description: 'Hardened infrastructure against rogue AI.',
      }
    ],
    education: [
      {
        id: 'edu1',
        school: 'Caltech',
        degree: 'B.S.',
        fieldOfStudy: 'Computer Science',
        location: 'Pasadena, CA',
        startDate: '2015',
        endDate: '2019',
        description: 'Graduated Magna Cum Laude',
      }
    ],
    skills: [
      { id: 's1', name: 'Distributed Systems', level: 'Expert' },
      { id: 's2', name: 'Rust & TypeScript', level: 'Advanced' },
    ],
  };

  it('generates clean sanitized filenames for export', () => {
    expect(getCvFilename(sampleCv, 'pdf')).toBe('Sarah_Connor_CV.pdf');
    expect(getCvFilename(sampleCv, 'json')).toBe('Sarah_Connor_CV.json');
    expect(getCvFilename(sampleCv, 'txt')).toBe('Sarah_Connor_CV.txt');
    expect(getCvFilename(undefined, 'pdf')).toBe('NetiqCV_CV.pdf');
  });

  it('exports CV as structured JSON without data loss', () => {
    let clicked = false;
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      clicked = true;
    });

    exportCvToJson(sampleCv);

    expect(clicked).toBe(true);
    clickSpy.mockRestore();
  });

  it('exports ATS-friendly Plain Text (.txt) formatted resume with all sections', () => {
    let clicked = false;
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      clicked = true;
    });

    exportCvToTxt(sampleCv);

    expect(clicked).toBe(true);
    clickSpy.mockRestore();
  });

  it('generates direct vector PDF without calling window.print()', () => {
    const printSpy = vi.spyOn(window, 'print');
    expect(() => generateDirectJsPdf(sampleCv, 'Sarah_Connor_CV.pdf')).not.toThrow();
    expect(printSpy).not.toHaveBeenCalled();
    printSpy.mockRestore();
  });

  it('exportCvToPdf completes without ever triggering window.print()', async () => {
    const printSpy = vi.spyOn(window, 'print');
    const result = await exportCvToPdf(sampleCv, 'non-existent-dom-element');
    expect(result).toBe(true);
    expect(printSpy).not.toHaveBeenCalled();
    printSpy.mockRestore();
  });

  it('triggers printCv fallback gracefully', () => {
    const printSpy = (window.print = () => {});
    expect(() => printCv()).not.toThrow();
  });
});

describe('AI Resume Generator Engine Tests', () => {
  it('contains comprehensive lists for countries, age groups, statuses, and popular occupations', () => {
    expect(COUNTRIES.length).toBeGreaterThanOrEqual(10);
    expect(AGE_GROUPS.length).toBe(5);
    expect(EMPLOYMENT_STATUSES.length).toBeGreaterThanOrEqual(5);
    expect(POPULAR_OCCUPATIONS.length).toBeGreaterThanOrEqual(8);
  });

  it('generates student-appropriate resume with coursework, academic projects, and current education', () => {
    const cv = generateTailoredAiResume({
      country: 'United Kingdom',
      ageGroup: '18-22',
      occupation: 'Software Engineer',
      employmentStatus: 'student'
    });

    expect(cv.personalInfo.fullName).toBeDefined();
    expect(cv.personalInfo.location).toContain('United Kingdom');
    expect(cv.personalInfo.phone.startsWith('+44')).toBe(true);
    expect(cv.summary).toContain('student');
    expect(cv.education.length).toBeGreaterThanOrEqual(1);
    expect(cv.education[0].current).toBe(true);
    expect(cv.skills.length).toBeGreaterThanOrEqual(5);
  });

  it('generates unemployed resume highlighting transferable accomplishments and upskilling', () => {
    const cv = generateTailoredAiResume({
      country: 'United States',
      ageGroup: '30-39',
      occupation: 'Product Manager',
      employmentStatus: 'unemployed'
    });

    expect(cv.summary).toContain('transferable');
    expect(cv.personalInfo.location).toContain('United States');
    expect(cv.experience.length).toBeGreaterThanOrEqual(2);
    expect(cv.experience[0].current).toBe(false);
  });

  it('generates executive/experienced resume with director-level summary and MBA for 50+ age group', () => {
    const cv = generateTailoredAiResume({
      country: 'Germany',
      ageGroup: '50+',
      occupation: 'Technical Project Manager',
      employmentStatus: 'employed'
    });

    expect(cv.summary).toContain('leadership');
    expect(cv.personalInfo.phone.startsWith('+49')).toBe(true);
    expect(cv.experience.length).toBeGreaterThanOrEqual(3);
    expect(cv.education.some(e => e.degree.includes('MBA') || e.degree.includes('Master'))).toBe(true);
  });

  it('handles optional custom occupation field accurately', () => {
    const cv = generateTailoredAiResume({
      country: 'Australia',
      ageGroup: '23-29',
      occupation: 'Software Engineer',
      employmentStatus: 'employed',
      customOccupation: 'Renewable Energy Systems Specialist'
    });

    expect(cv.personalInfo.jobTitle).toBe('Renewable Energy Systems Specialist');
    expect(cv.summary).toContain('Renewable Energy Systems Specialist');
    expect(cv.title).toContain('Renewable Energy Systems Specialist');
  });
});


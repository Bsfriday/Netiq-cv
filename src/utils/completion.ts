import { ResumeData } from '../types/cv';

export interface CompletionSection {
  name: string;
  weight: number;
  completed: boolean;
  score: number;
  hint: string;
}

export interface ResumeStrengthResult {
  score: number; // 0 - 100
  level: 'Needs Work' | 'Good Start' | 'Solid Profile' | 'Looking Strong' | 'All-Star Quality';
  message: string;
  sections: CompletionSection[];
}

export function calculateResumeStrength(cv: ResumeData): ResumeStrengthResult {
  const sections: CompletionSection[] = [];

  // 1. Personal Information (Weight: 25)
  const p = cv.personalInfo;
  const hasName = Boolean(p.fullName?.trim());
  const hasTitle = Boolean(p.jobTitle?.trim());
  const hasEmail = Boolean(p.email?.trim());
  const hasPhone = Boolean(p.phone?.trim());
  const hasLocation = Boolean(p.location?.trim());
  const hasLinks = Boolean(p.linkedin?.trim() || p.website?.trim() || p.github?.trim());

  let personalScore = 0;
  if (hasName) personalScore += 7;
  if (hasTitle) personalScore += 5;
  if (hasEmail) personalScore += 5;
  if (hasPhone) personalScore += 4;
  if (hasLocation) personalScore += 2;
  if (hasLinks) personalScore += 2;

  sections.push({
    name: 'Personal Information',
    weight: 25,
    completed: personalScore >= 21,
    score: personalScore,
    hint: !hasName 
      ? 'Add your full name' 
      : !hasEmail 
      ? 'Provide a valid email address' 
      : !hasTitle 
      ? 'Add your professional title' 
      : 'Contact details are complete',
  });

  // 2. Professional Summary (Weight: 15)
  const summaryLength = cv.summary?.trim().length || 0;
  let summaryScore = 0;
  if (summaryLength >= 100) {
    summaryScore = 15;
  } else if (summaryLength >= 40) {
    summaryScore = 10;
  } else if (summaryLength > 0) {
    summaryScore = 5;
  }

  sections.push({
    name: 'Professional Summary',
    weight: 15,
    completed: summaryScore >= 12,
    score: summaryScore,
    hint: summaryLength === 0 
      ? 'Add a short summary introducing your career focus' 
      : summaryLength < 80 
      ? 'Expand your summary with key strengths and accomplishments' 
      : 'Summary is well-crafted',
  });

  // 3. Work Experience (Weight: 25)
  let expScore = 0;
  const validExp = cv.experience.filter(e => e.jobTitle?.trim() && e.company?.trim());
  if (validExp.length >= 2) {
    const hasDetailedDesc = validExp.some(e => (e.description?.length || 0) > 40);
    expScore = hasDetailedDesc ? 25 : 20;
  } else if (validExp.length === 1) {
    expScore = (validExp[0].description?.length || 0) > 40 ? 18 : 12;
  }

  sections.push({
    name: 'Work Experience',
    weight: 25,
    completed: expScore >= 20,
    score: expScore,
    hint: validExp.length === 0 
      ? 'Add at least 1 work experience entry with responsibilities' 
      : validExp.length === 1 
      ? 'Add a second role or expand bullet points with measurable impact' 
      : 'Strong career history detailed',
  });

  // 4. Education (Weight: 15)
  const validEdu = cv.education.filter(e => e.school?.trim() && (e.degree?.trim() || e.fieldOfStudy?.trim()));
  let eduScore = 0;
  if (validEdu.length >= 1) {
    eduScore = 15;
  }

  sections.push({
    name: 'Education',
    weight: 15,
    completed: eduScore >= 15,
    score: eduScore,
    hint: validEdu.length === 0 
      ? 'Add your highest degree or school' 
      : 'Education section complete',
  });

  // 5. Skills (Weight: 10)
  const skillCount = cv.skills.length;
  let skillScore = 0;
  if (skillCount >= 5) {
    skillScore = 10;
  } else if (skillCount >= 3) {
    skillScore = 7;
  } else if (skillCount >= 1) {
    skillScore = 4;
  }

  sections.push({
    name: 'Skills & Competencies',
    weight: 10,
    completed: skillScore >= 8,
    score: skillScore,
    hint: skillCount < 3 
      ? `Add ${3 - skillCount} more core skills` 
      : 'Key competencies highlighted',
  });

  // 6. Certifications & Projects (Weight: 10)
  const hasCerts = cv.certifications.length > 0;
  const hasProjects = cv.projects.length > 0;
  let extraScore = 0;
  if (hasCerts && hasProjects) {
    extraScore = 10;
  } else if (hasCerts || hasProjects) {
    extraScore = 7;
  }

  sections.push({
    name: 'Certifications / Projects',
    weight: 10,
    completed: extraScore >= 7,
    score: extraScore,
    hint: !hasCerts && !hasProjects 
      ? 'Add a certification or project to boost credibility' 
      : 'Credentials and portfolio added',
  });

  const totalScore = Math.min(
    100,
    sections.reduce((acc, curr) => acc + curr.score, 0)
  );

  let level: ResumeStrengthResult['level'] = 'Needs Work';
  let message = 'Complete missing sections to strengthen your resume.';

  if (totalScore >= 90) {
    level = 'All-Star Quality';
    message = 'Your resume is in top shape! Ready to export and apply.';
  } else if (totalScore >= 75) {
    level = 'Looking Strong';
    message = 'Your resume is looking strong! A few touches will make it shine.';
  } else if (totalScore >= 55) {
    level = 'Solid Profile';
    message = 'Good progress! Add more details to stand out to hiring managers.';
  } else if (totalScore >= 35) {
    level = 'Good Start';
    message = 'You have a good foundation. Fill in remaining sections.';
  }

  return {
    score: totalScore,
    level,
    message,
    sections,
  };
}

/** Legacy alias for compatibility */
export const calculateCvCompletion = (cv: ResumeData) => {
  const res = calculateResumeStrength(cv);
  return {
    totalScore: res.score,
    rating: res.level === 'All-Star Quality' ? 'Excellent' : res.level,
    sectionScores: {
      personalInfo: Math.round((res.sections[0].score / res.sections[0].weight) * 100),
      summary: Math.round((res.sections[1].score / res.sections[1].weight) * 100),
      experience: Math.round((res.sections[2].score / res.sections[2].weight) * 100),
      education: Math.round((res.sections[3].score / res.sections[3].weight) * 100),
      skills: Math.round((res.sections[4].score / res.sections[4].weight) * 100),
    },
    recommendations: res.sections.filter(s => !s.completed).map(s => s.hint),
  };
};

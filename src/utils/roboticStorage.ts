import { RoboticResumeDraft, RoboticResumeVersion } from '../types/roboticResume';
import { createInitialRoboticDraft, draftToResumeData, calculateAtsScore } from './roboticAiEngine';

const ROBOTIC_DRAFT_KEY = 'netiqcv_robotic_draft';
const ROBOTIC_VERSIONS_KEY = 'netiqcv_robotic_versions';

export function saveRoboticDraft(draft: RoboticResumeDraft): void {
  try {
    const updated = { ...draft, updatedAt: Date.now() };
    localStorage.setItem(ROBOTIC_DRAFT_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to save Robotic Resume draft to localStorage', err);
  }
}

export function loadRoboticDraft(): RoboticResumeDraft {
  try {
    const raw = localStorage.getItem(ROBOTIC_DRAFT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.personalInfo && parsed.careerTarget) {
        return parsed as RoboticResumeDraft;
      }
    }
  } catch (err) {
    console.warn('Failed to load Robotic Resume draft from localStorage', err);
  }
  return createInitialRoboticDraft();
}

export function clearRoboticDraft(): void {
  try {
    localStorage.removeItem(ROBOTIC_DRAFT_KEY);
  } catch (err) {
    console.warn('Failed to clear Robotic Resume draft', err);
  }
}

export function getRoboticVersions(): RoboticResumeVersion[] {
  try {
    const raw = localStorage.getItem(ROBOTIC_VERSIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to load Robotic Resume versions', err);
    return [];
  }
}

export function saveRoboticVersion(draft: RoboticResumeDraft, customName?: string): RoboticResumeVersion {
  const versions = getRoboticVersions();
  const atsAnalysis = calculateAtsScore(draft);
  const versionName = customName?.trim() || draft.versionName || `${draft.careerTarget.targetRole} Resume`;

  const newVersion: RoboticResumeVersion = {
    id: `ver-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    name: versionName,
    targetRole: draft.careerTarget.targetRole,
    updatedAt: Date.now(),
    atsScore: atsAnalysis.totalScore,
    resumeData: draftToResumeData(draft),
    draftState: JSON.parse(JSON.stringify(draft))
  };

  // Prepend to top
  const updatedList = [newVersion, ...versions.filter(v => v.id !== newVersion.id)].slice(0, 20);
  try {
    localStorage.setItem(ROBOTIC_VERSIONS_KEY, JSON.stringify(updatedList));
  } catch (err) {
    console.warn('Failed to save Robotic Resume version', err);
  }

  return newVersion;
}

export function deleteRoboticVersion(id: string): boolean {
  try {
    const versions = getRoboticVersions();
    const filtered = versions.filter(v => v.id !== id);
    localStorage.setItem(ROBOTIC_VERSIONS_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.warn('Failed to delete Robotic Resume version', err);
    return false;
  }
}

export function duplicateRoboticVersion(id: string): RoboticResumeVersion | null {
  try {
    const versions = getRoboticVersions();
    const source = versions.find(v => v.id === id);
    if (!source) return null;

    const copy: RoboticResumeVersion = {
      ...JSON.parse(JSON.stringify(source)),
      id: `ver-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: `${source.name} (Copy)`,
      updatedAt: Date.now()
    };

    const updatedList = [copy, ...versions].slice(0, 20);
    localStorage.setItem(ROBOTIC_VERSIONS_KEY, JSON.stringify(updatedList));
    return copy;
  } catch (err) {
    console.warn('Failed to duplicate Robotic Resume version', err);
    return null;
  }
}

export function renameRoboticVersion(id: string, newName: string): boolean {
  try {
    const versions = getRoboticVersions();
    const item = versions.find(v => v.id === id);
    if (!item) return false;

    item.name = newName.trim();
    item.updatedAt = Date.now();
    localStorage.setItem(ROBOTIC_VERSIONS_KEY, JSON.stringify(versions));
    return true;
  } catch (err) {
    console.warn('Failed to rename Robotic Resume version', err);
    return false;
  }
}

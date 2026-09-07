import React, { useState, useEffect } from 'react';
import { ResumeData } from '../types/cv';
import { RoboticResumeDraft, RoboticResumeVersion } from '../types/roboticResume';
import { RoboticDashboard } from '../components/robotic/RoboticDashboard';
import { RoboticBuilder } from '../components/robotic/RoboticBuilder';
import { RandomResumeGenerator } from '../components/robotic/RandomResumeGenerator';
import { RoboticVersionManager } from '../components/robotic/RoboticVersionManager';
import { 
  loadRoboticDraft, 
  saveRoboticDraft, 
  getRoboticVersions, 
  saveRoboticVersion 
} from '../utils/roboticStorage';
import { createInitialRoboticDraft, draftToResumeData } from '../utils/roboticAiEngine';
import { findRoleDefinition } from '../data/roboticResumeData';

interface RoboticResumePageProps {
  onEditCv?: (cv: ResumeData) => void;
  onNavigate?: (route: string) => void;
}

type RoboticView = 'dashboard' | 'builder' | 'random' | 'versions';

export const RoboticResumePage: React.FC<RoboticResumePageProps> = ({ onEditCv, onNavigate }) => {
  const [activeView, setActiveView] = useState<RoboticView>('dashboard');
  const [draft, setDraft] = useState<RoboticResumeDraft>(() => loadRoboticDraft());
  const [savedVersions, setSavedVersions] = useState<RoboticResumeVersion[]>(() => getRoboticVersions());

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  const refreshVersions = () => {
    setSavedVersions(getRoboticVersions());
  };

  const handleStartBuilder = (preselectedRole?: string) => {
    let currentDraft = loadRoboticDraft();
    if (preselectedRole) {
      const def = findRoleDefinition(preselectedRole);
      currentDraft = {
        ...currentDraft,
        careerTarget: {
          ...currentDraft.careerTarget,
          targetRole: preselectedRole,
          targetIndustry: def ? def.defaultIndustry : currentDraft.careerTarget.targetIndustry
        },
        personalInfo: {
          ...currentDraft.personalInfo,
          jobTitle: currentDraft.personalInfo.jobTitle || preselectedRole
        },
        selectedTemplate: def?.defaultTemplate || currentDraft.selectedTemplate,
        accentColor: def?.defaultAccent || currentDraft.accentColor
      };
      if (def) {
        const existingNames = new Set(currentDraft.skills.map(s => s.name.toLowerCase()));
        const additions = def.suggestedSkills
          .filter(s => !existingNames.has(s.name.toLowerCase()))
          .map((s, idx) => ({
            id: `sk-init-${idx}`,
            name: s.name,
            category: s.category,
            level: s.level || 'Advanced'
          }));
        currentDraft.skills = [...currentDraft.skills, ...additions];
      }
      saveRoboticDraft(currentDraft);
    }
    setDraft(currentDraft);
    setActiveView('builder');
  };

  const handleStartRandom = () => {
    setActiveView('random');
  };

  const handleOpenVersions = () => {
    refreshVersions();
    setActiveView('versions');
  };

  const handleCustomizeRandomProfile = (sampleDraft: RoboticResumeDraft) => {
    saveRoboticDraft(sampleDraft);
    setDraft(sampleDraft);
    setActiveView('builder');
  };

  const handleSaveVersionFromRandom = (sampleDraft: RoboticResumeDraft, name?: string) => {
    saveRoboticVersion(sampleDraft, name);
    refreshVersions();
  };

  const handleLoadVersionInBuilder = (versionDraft: RoboticResumeDraft) => {
    saveRoboticDraft(versionDraft);
    setDraft(versionDraft);
    setActiveView('builder');
  };

  const handleNewResumeFromVersions = () => {
    const fresh = createInitialRoboticDraft();
    saveRoboticDraft(fresh);
    setDraft(fresh);
    setActiveView('builder');
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeView === 'dashboard' && (
          <RoboticDashboard
            onStartBuilder={handleStartBuilder}
            onStartRandom={handleStartRandom}
            onOpenVersions={handleOpenVersions}
            savedVersionsCount={savedVersions.length}
          />
        )}

        {activeView === 'builder' && (
          <RoboticBuilder
            initialDraft={draft}
            onExit={() => setActiveView('dashboard')}
            onOpenVersions={handleOpenVersions}
          />
        )}

        {activeView === 'random' && (
          <RandomResumeGenerator
            onCustomizeInBuilder={handleCustomizeRandomProfile}
            onSaveVersion={handleSaveVersionFromRandom}
            onExit={() => setActiveView('dashboard')}
          />
        )}

        {activeView === 'versions' && (
          <RoboticVersionManager
            onLoadVersion={handleLoadVersionInBuilder}
            onNewResume={handleNewResumeFromVersions}
            onExit={() => setActiveView('dashboard')}
          />
        )}
      </main>
    </div>
  );
};

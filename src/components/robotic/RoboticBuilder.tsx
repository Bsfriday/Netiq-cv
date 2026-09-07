import React, { useState, useEffect } from 'react';
import { RoboticResumeDraft } from '../../types/roboticResume';
import { saveRoboticDraft } from '../../utils/roboticStorage';
import { saveRoboticVersion } from '../../utils/roboticStorage';
import { findRoleDefinition } from '../../data/roboticResumeData';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { CareerTargetStep } from './steps/CareerTargetStep';
import { ExperienceStep } from './steps/ExperienceStep';
import { SkillsStep } from './steps/SkillsStep';
import { EducationStep } from './steps/EducationStep';
import { CertificationsAndAddonsStep } from './steps/CertificationsAndAddonsStep';
import { OptimizeAndAtsStep } from './steps/OptimizeAndAtsStep';
import { PreviewAndExportStep } from './steps/PreviewAndExportStep';
import { 
  ArrowLeft, 
  ArrowRight, 
  Eye, 
  Sparkles, 
  Check, 
  Save, 
  FileCheck2,
  ChevronLeft
} from 'lucide-react';

interface RoboticBuilderProps {
  initialDraft: RoboticResumeDraft;
  onExit: () => void;
  onOpenVersions?: () => void;
}

const STEPS = [
  { id: 1, title: 'Personal Info', short: 'Contact' },
  { id: 2, title: 'Career Target', short: 'Role' },
  { id: 3, title: 'Experience', short: 'Work' },
  { id: 4, title: 'Skills Matrix', short: 'Skills' },
  { id: 5, title: 'Education', short: 'Education' },
  { id: 6, title: 'Certifications', short: 'Certs' },
  { id: 7, title: 'AI & ATS Check', short: 'Optimize' },
  { id: 8, title: 'Preview & Export', short: 'Export' }
];

export const RoboticBuilder: React.FC<RoboticBuilderProps> = ({
  initialDraft,
  onExit,
  onOpenVersions
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [draft, setDraft] = useState<RoboticResumeDraft>(initialDraft);
  const [lastSavedTime, setLastSavedTime] = useState<string>('Just now');

  // Auto-save draft changes to localStorage
  useEffect(() => {
    saveRoboticDraft(draft);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLastSavedTime(time);
  }, [draft]);

  const handleUpdateDraft = (partial: Partial<RoboticResumeDraft>) => {
    setDraft(prev => ({
      ...prev,
      ...partial,
      updatedAt: Date.now()
    }));
  };

  const handleRoleDefaults = (roleTitle: string) => {
    const roleDef = findRoleDefinition(roleTitle);
    if (!roleDef) return;

    // Suggest new skills without duplicating
    const currentSkillNames = new Set(draft.skills.map(s => s.name.toLowerCase()));
    const newSuggested = roleDef.suggestedSkills
      .filter(s => !currentSkillNames.has(s.name.toLowerCase()))
      .map(s => ({
        id: `sk-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: s.name,
        category: s.category,
        level: s.level || 'Advanced'
      }));

    handleUpdateDraft({
      careerTarget: {
        ...draft.careerTarget,
        targetRole: roleTitle,
        targetIndustry: roleDef.defaultIndustry
      },
      personalInfo: {
        ...draft.personalInfo,
        jobTitle: draft.personalInfo.jobTitle || roleTitle
      },
      skills: [...draft.skills, ...newSuggested],
      selectedTemplate: draft.selectedTemplate || roleDef.defaultTemplate,
      accentColor: draft.accentColor || roleDef.defaultAccent
    });
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveVersion = (customName?: string) => {
    saveRoboticVersion(draft, customName);
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn pb-24" id="robotic-resume-builder">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onExit}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Return to Robotic Resume Dashboard"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Robotic Resume Builder
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">
                Auto-saved ({lastSavedTime})
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              {draft.careerTarget.targetRole || 'Custom Resume'} • Step {currentStep} of {STEPS.length}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {currentStep !== 8 && (
            <button
              type="button"
              onClick={() => setCurrentStep(8)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-blue-600" />
              <span>Jump to Preview</span>
            </button>
          )}

          {onOpenVersions && (
            <button
              type="button"
              onClick={onOpenVersions}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Saved Versions</span>
            </button>
          )}
        </div>
      </div>

      {/* Step Indicators */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
        <div className="flex items-center min-w-max gap-2 sm:gap-3">
          {STEPS.map((step) => {
            const isCurrent = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setCurrentStep(step.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-xs'
                    : isCompleted
                    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    isCurrent
                      ? 'bg-white text-blue-600'
                      : isCompleted
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3 text-blue-700" /> : step.id}
                </span>
                <span className="hidden sm:inline">{step.title}</span>
                <span className="sm:hidden">{step.short}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Step Component Content */}
      <div className="bg-white p-5 sm:p-8 rounded-3xl border border-slate-200 shadow-xs min-h-[420px]">
        {currentStep === 1 && (
          <PersonalInfoStep
            data={draft.personalInfo}
            onChange={(personalInfo) => handleUpdateDraft({ personalInfo })}
          />
        )}

        {currentStep === 2 && (
          <CareerTargetStep
            data={draft.careerTarget}
            onChange={(careerTarget) => handleUpdateDraft({ careerTarget })}
            onSelectRoleDefaults={handleRoleDefaults}
          />
        )}

        {currentStep === 3 && (
          <ExperienceStep
            experience={draft.experience}
            onChange={(experience) => handleUpdateDraft({ experience })}
            targetRole={draft.careerTarget.targetRole}
          />
        )}

        {currentStep === 4 && (
          <SkillsStep
            skills={draft.skills}
            onChange={(skills) => handleUpdateDraft({ skills })}
            targetRole={draft.careerTarget.targetRole}
          />
        )}

        {currentStep === 5 && (
          <EducationStep
            education={draft.education}
            onChange={(education) => handleUpdateDraft({ education })}
          />
        )}

        {currentStep === 6 && (
          <CertificationsAndAddonsStep
            certifications={draft.certifications}
            onCertificationsChange={(certifications) => handleUpdateDraft({ certifications })}
            additionalInfo={draft.additionalInfo}
            onAdditionalInfoChange={(additionalInfo) => handleUpdateDraft({ additionalInfo })}
          />
        )}

        {currentStep === 7 && (
          <OptimizeAndAtsStep
            draft={draft}
            onUpdateDraft={handleUpdateDraft}
          />
        )}

        {currentStep === 8 && (
          <PreviewAndExportStep
            draft={draft}
            onUpdateDraft={handleUpdateDraft}
            onSaveVersion={handleSaveVersion}
          />
        )}
      </div>

      {/* Sticky Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:p-4 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={currentStep === 1 ? onExit : handleBack}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStep === 1 ? 'Back to Dashboard' : 'Previous Step'}</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <span>Step {currentStep} of {STEPS.length}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>{STEPS[currentStep - 1].title}</span>
          </div>

          <div className="flex items-center gap-2">
            {currentStep < STEPS.length ? (
              <button
                type="button"
                onClick={handleNext}
                id="btn-robotic-next-step"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <span>Continue to {STEPS[currentStep].title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleSaveVersion()}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Save Final Resume</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

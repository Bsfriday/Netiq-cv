import React from 'react';
import { RoboticSkill } from '../../../types/roboticResume';
import { MultiSkillSelector, SelectedSkillItem } from '../MultiSkillSelector';
import { findRoleDefinition } from '../../../data/roboticResumeData';
import { Cpu, Sparkles, Plus, Check } from 'lucide-react';

interface SkillsStepProps {
  skills: RoboticSkill[];
  onChange: (updated: RoboticSkill[]) => void;
  targetRole?: string;
}

export const SkillsStep: React.FC<SkillsStepProps> = ({
  skills,
  onChange,
  targetRole
}) => {
  const roleDef = targetRole ? findRoleDefinition(targetRole) : undefined;
  const roleSuggestions = roleDef ? roleDef.suggestedSkills : [];

  // Convert RoboticSkill[] to SelectedSkillItem[]
  const selectedSkillsForSelector: SelectedSkillItem[] = skills.map(s => ({
    name: s.name,
    category: s.category,
    isPrimary: s.isPrimary
  }));

  const handleSelectorChange = (newSelected: SelectedSkillItem[]) => {
    // Preserve existing ids and levels where possible
    const updatedRoboticSkills: RoboticSkill[] = newSelected.map(item => {
      const existing = skills.find(s => s.name.toLowerCase() === item.name.toLowerCase());
      return {
        id: existing?.id || `skill-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: item.name,
        category: item.category || existing?.category || 'Technical Skills',
        level: existing?.level || (item.isPrimary ? 'Expert' : 'Advanced'),
        isPrimary: !!item.isPrimary
      };
    });

    onChange(updatedRoboticSkills);
  };

  const handleAddRoleSkill = (skillName: string, category?: string) => {
    if (skills.length >= 30) return;
    if (skills.some(s => s.name.toLowerCase() === skillName.toLowerCase())) return;

    const newSkill: RoboticSkill = {
      id: `skill-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: skillName,
      category: category || 'AI Skills',
      level: 'Advanced',
      isPrimary: skills.length < 3
    };

    onChange([...skills, newSkill]);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-blue-600" />
          <span>Skills Matrix (100+ AI, Testing & Digital Skills)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Select up to 30 skills across 7 categories. Star your top abilities to designate them as <strong>Primary Skills</strong> for prominence in your resume summary.
        </p>
      </div>

      {/* Role Recommendations Banner if target role is known */}
      {roleSuggestions.length > 0 && skills.length < 30 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-200 space-y-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
              Recommended for {targetRole || 'Your Target Role'}
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {roleSuggestions.map((rec) => {
              const isAdded = skills.some(s => s.name.toLowerCase() === rec.name.toLowerCase());
              return (
                <button
                  key={rec.name}
                  type="button"
                  onClick={() => !isAdded && handleAddRoleSkill(rec.name, rec.category)}
                  disabled={isAdded || skills.length >= 30}
                  className={`px-2.5 py-1 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 opacity-85 cursor-default'
                      : 'bg-white hover:bg-indigo-600 hover:text-white text-indigo-900 border border-indigo-200 shadow-2xs'
                  }`}
                >
                  {isAdded ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Plus className="w-3.5 h-3.5" />
                  )}
                  <span>{rec.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Full MultiSkillSelector Component */}
      <MultiSkillSelector
        selectedSkills={selectedSkillsForSelector}
        onChange={handleSelectorChange}
        maxSkills={30}
        showCategoryFilters={true}
        showRecommendations={true}
        showPrimaryToggles={true}
        id="robotic-builder-skills"
      />
    </div>
  );
};

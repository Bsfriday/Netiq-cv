import React, { useState } from 'react';
import { 
  RoboticCareerTarget, 
  ExperienceLevel, 
  WorkPreference, 
  TargetIndustry 
} from '../../../types/roboticResume';
import { 
  ROBOTIC_ROLES_MASTER, 
  TARGET_INDUSTRIES, 
  EXPERIENCE_LEVELS, 
  WORK_PREFERENCES,
  findRoleDefinition 
} from '../../../data/roboticResumeData';
import { Target, Search, Check, Sparkles, Laptop, Building2 } from 'lucide-react';

interface CareerTargetStepProps {
  data: RoboticCareerTarget;
  onChange: (updated: RoboticCareerTarget) => void;
  onSelectRoleDefaults?: (roleTitle: string) => void;
}

export const CareerTargetStep: React.FC<CareerTargetStepProps> = ({
  data,
  onChange,
  onSelectRoleDefaults
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCustomRole, setIsCustomRole] = useState(
    !ROBOTIC_ROLES_MASTER.some(r => r.title === data.targetRole)
  );

  const filteredRoles = ROBOTIC_ROLES_MASTER.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedDef = findRoleDefinition(data.targetRole);

  const handleRoleSelect = (roleTitle: string) => {
    setIsCustomRole(false);
    const def = findRoleDefinition(roleTitle);
    onChange({
      ...data,
      targetRole: roleTitle,
      targetIndustry: def ? def.defaultIndustry : data.targetIndustry
    });
    if (onSelectRoleDefaults) {
      onSelectRoleDefaults(roleTitle);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          <span>Target Role & Career Calibration</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Select your target role and work arrangement. This calibrates ATS keyword scoring, recommended skills, and AI action verbs.
        </p>
      </div>

      {/* Target Role Selection */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Target Job Role <span className="text-rose-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => {
              setIsCustomRole(!isCustomRole);
              if (!isCustomRole) {
                onChange({ ...data, targetRole: '' });
              } else {
                onChange({ ...data, targetRole: 'AI Data Annotator' });
              }
            }}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline cursor-pointer"
          >
            {isCustomRole ? 'Choose from 42+ curated roles' : '+ Enter custom job title'}
          </button>
        </div>

        {isCustomRole ? (
          <div>
            <input
              type="text"
              value={data.targetRole}
              onChange={(e) => onChange({ ...data, targetRole: e.target.value })}
              placeholder="e.g. AI Prompt Specialist / Synthetic Data Engineer"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm font-semibold text-slate-900 bg-white"
              id="input-robotic-custom-role"
            />
            <p className="text-[11px] text-slate-500 mt-1.5">
              Custom job title enabled. You can manually assign skills and keywords in the upcoming steps.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Search filter */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 42+ AI, testing, data, and remote roles..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Quick role grid */}
            <div className="max-h-56 overflow-y-auto border border-slate-200 rounded-xl p-2 bg-slate-50/50 space-y-1 divide-y divide-slate-100">
              {filteredRoles.map((role) => {
                const isSelected = data.targetRole === role.title;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleRoleSelect(role.title)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white font-bold shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div>
                      <span className="text-xs">{role.title}</span>
                      <span className={`block text-[10px] ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                        {role.category} • {role.defaultIndustry}
                      </span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Selected Role Meta Preview */}
      {selectedDef && !isCustomRole && (
        <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/80 text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Role Intelligence Activated: {selectedDef.title}</span>
          </div>
          <div className="text-slate-600">
            <span className="font-semibold text-slate-700">Recommended Action Verbs: </span>
            {selectedDef.actionVerbs.join(', ')}
          </div>
          <div className="text-slate-600">
            <span className="font-semibold text-slate-700">Target Keywords: </span>
            {selectedDef.keywords.join(', ')}
          </div>
        </div>
      )}

      {/* Experience Level & Work Preference */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {/* Experience Level */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Experience Level <span className="text-rose-500">*</span>
          </label>
          <select
            value={data.experienceLevel}
            onChange={(e) => onChange({ ...data, experienceLevel: e.target.value as ExperienceLevel })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm font-medium text-slate-900 bg-white"
            id="select-robotic-experience-level"
          >
            {EXPERIENCE_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        {/* Work Preference */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Work Preference <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {WORK_PREFERENCES.map((pref) => {
              const isSelected = data.workPreference === pref;
              return (
                <button
                  key={pref}
                  type="button"
                  onClick={() => onChange({ ...data, workPreference: pref })}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {pref}
                </button>
              );
            })}
          </div>
        </div>

        {/* Target Industry */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Target Industry <span className="text-rose-500">*</span>
          </label>
          <select
            value={data.targetIndustry}
            onChange={(e) => onChange({ ...data, targetIndustry: e.target.value as TargetIndustry })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm font-medium text-slate-900 bg-white"
            id="select-robotic-target-industry"
          >
            {TARGET_INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

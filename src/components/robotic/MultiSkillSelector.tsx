import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  X, 
  Star, 
  Sparkles, 
  Check, 
  AlertCircle, 
  SlidersHorizontal,
  FolderTree,
  Zap,
  RotateCcw
} from 'lucide-react';
import { 
  ROBOTIC_SKILLS_LIBRARY, 
  SKILL_CATEGORIES_INFO, 
  SkillDefinition, 
  SkillCategoryName,
  getRecommendedSkills,
  findSkillByName
} from '../../data/roboticSkillsLibrary';

export interface SelectedSkillItem {
  name: string;
  category?: string;
  isPrimary?: boolean;
}

interface MultiSkillSelectorProps {
  selectedSkills: SelectedSkillItem[];
  onChange: (skills: SelectedSkillItem[]) => void;
  maxSkills?: number;
  id?: string;
  className?: string;
  showCategoryFilters?: boolean;
  showRecommendations?: boolean;
  showPrimaryToggles?: boolean;
}

export const MultiSkillSelector: React.FC<MultiSkillSelectorProps> = ({
  selectedSkills,
  onChange,
  maxSkills = 30,
  id = 'multi-skill-selector',
  className = '',
  showCategoryFilters = true,
  showRecommendations = true,
  showPrimaryToggles = true
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isMaxReached = selectedSkills.length >= maxSkills;

  // Selected names set for quick O(1) checks
  const selectedNameSet = useMemo(() => {
    return new Set(selectedSkills.map(s => s.name.toLowerCase()));
  }, [selectedSkills]);

  // Dynamic recommendations based on current selection
  const recommendations = useMemo(() => {
    if (!showRecommendations) return [];
    return getRecommendedSkills(selectedSkills.map(s => s.name), 6);
  }, [selectedSkills, showRecommendations]);

  // Filter skills by search query and category
  const filteredLibrary = useMemo(() => {
    let list = ROBOTIC_SKILLS_LIBRARY;

    if (selectedCategory !== 'All') {
      list = list.filter(s => s.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q)) ||
        s.category.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      );
    }

    return list;
  }, [searchQuery, selectedCategory]);

  const handleAddSkill = (skillName: string, category?: string) => {
    setErrorMessage(null);
    const trimmed = skillName.trim();
    if (!trimmed) return;

    if (selectedNameSet.has(trimmed.toLowerCase())) {
      setErrorMessage(`"${trimmed}" is already added to your skills.`);
      return;
    }

    if (selectedSkills.length >= maxSkills) {
      setErrorMessage(`Maximum of ${maxSkills} skills reached. Remove a skill to add another.`);
      return;
    }

    const def = findSkillByName(trimmed);
    const resolvedCategory = category || def?.category || 'General Technical';

    // Mark first 3-5 as primary automatically if none are primary yet
    const hasPrimary = selectedSkills.some(s => s.isPrimary);
    const isPrimary = !hasPrimary && selectedSkills.length < 3;

    onChange([...selectedSkills, { name: trimmed, category: resolvedCategory, isPrimary }]);
  };

  const handleRemoveSkill = (skillName: string) => {
    setErrorMessage(null);
    onChange(selectedSkills.filter(s => s.name.toLowerCase() !== skillName.toLowerCase()));
  };

  const handleTogglePrimary = (skillName: string) => {
    onChange(
      selectedSkills.map(s => 
        s.name.toLowerCase() === skillName.toLowerCase() 
          ? { ...s, isPrimary: !s.isPrimary } 
          : s
      )
    );
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillInput.trim()) return;
    handleAddSkill(customSkillInput.trim());
    setCustomSkillInput('');
  };

  const handleClearAll = () => {
    setErrorMessage(null);
    onChange([]);
  };

  return (
    <div className={`space-y-4 ${className}`} id={id}>
      {/* Top Header & Counter Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                Selected Skills
              </h3>
              <span 
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border transition-colors ${
                  isMaxReached 
                    ? 'bg-amber-100 text-amber-800 border-amber-300' 
                    : selectedSkills.length > 0 
                    ? 'bg-blue-100 text-blue-800 border-blue-200' 
                    : 'bg-slate-200 text-slate-600 border-slate-300'
                }`}
              >
                {selectedSkills.length} / {maxSkills}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Select up to {maxSkills} AI, data, testing, and technical skills. Click the star <Star className="w-3 h-3 inline text-amber-500 fill-amber-500" /> to prioritize skills for your resume summary.
            </p>
          </div>

          {selectedSkills.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs font-medium text-slate-500 hover:text-red-600 flex items-center gap-1 self-start sm:self-center transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Skills</span>
            </button>
          )}
        </div>

        {/* Visual Progress Meter */}
        <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              isMaxReached 
                ? 'bg-amber-500' 
                : selectedSkills.length >= 20 
                ? 'bg-emerald-600' 
                : 'bg-blue-600'
            }`}
            style={{ width: `${Math.min(100, (selectedSkills.length / maxSkills) * 100)}%` }}
          />
        </div>

        {/* Max reached warning banner */}
        {isMaxReached && (
          <div className="mt-3 p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-900 font-medium">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Maximum of {maxSkills} skills reached. Remove a skill to add another.</span>
          </div>
        )}

        {/* Error message banner */}
        {errorMessage && !isMaxReached && (
          <div className="mt-3 p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-800 font-medium">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Selected skills pills grid */}
        {selectedSkills.length === 0 ? (
          <div className="mt-3 py-4 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl bg-white">
            No skills selected yet. Search the 133+ skills library below, pick a recommendation, or add a custom skill.
          </div>
        ) : (
          <div className="mt-3 flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
            {selectedSkills.map((skill) => (
              <span
                key={skill.name}
                className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-xl border transition-all ${
                  skill.isPrimary
                    ? 'bg-amber-50 border-amber-300 text-amber-950 font-semibold shadow-2xs'
                    : 'bg-white border-slate-300 text-slate-800 font-medium'
                }`}
              >
                {showPrimaryToggles && (
                  <button
                    type="button"
                    onClick={() => handleTogglePrimary(skill.name)}
                    className="cursor-pointer transition-transform active:scale-90"
                    title={skill.isPrimary ? 'Primary skill (emphasized in summary)' : 'Mark as primary skill'}
                  >
                    <Star 
                      className={`w-3.5 h-3.5 ${
                        skill.isPrimary 
                          ? 'text-amber-500 fill-amber-500' 
                          : 'text-slate-300 hover:text-amber-400'
                      }`} 
                    />
                  </button>
                )}
                <span>{skill.name}</span>
                {skill.isPrimary && (
                  <span className="text-[9px] px-1 py-0.2 bg-amber-200/70 text-amber-900 rounded font-bold uppercase">
                    Primary
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill.name)}
                  className="p-0.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded cursor-pointer transition-colors"
                  title={`Remove ${skill.name}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Skills Section */}
      {showRecommendations && recommendations.length > 0 && !isMaxReached && (
        <div className="p-3.5 bg-gradient-to-r from-blue-50/70 to-indigo-50/70 border border-blue-100 rounded-2xl">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Recommended for Your Profile:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {recommendations.map((rec) => (
              <button
                key={rec.id}
                type="button"
                onClick={() => handleAddSkill(rec.name, rec.category)}
                disabled={isMaxReached}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-white hover:bg-blue-600 hover:text-white border border-blue-200 text-blue-800 rounded-xl font-medium transition-all shadow-2xs hover:shadow-sm cursor-pointer disabled:opacity-50"
              >
                <Plus className="w-3 h-3" />
                <span>{rec.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom Skill Input */}
      <form onSubmit={handleAddCustomSkill} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={customSkillInput}
            onChange={(e) => setCustomSkillInput(e.target.value)}
            disabled={isMaxReached}
            placeholder="Type a custom skill (e.g. Prompt Optimization, LlamaIndex, DVC)..."
            className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900 disabled:bg-slate-100"
            id={`${id}-custom-input`}
          />
        </div>
        <button
          type="submit"
          disabled={!customSkillInput.trim() || isMaxReached}
          className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0 cursor-pointer shadow-2xs"
          id={`${id}-add-custom-btn`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Custom Skill</span>
        </button>
      </form>

      {/* Search & Category Filter Section */}
      <div className="space-y-2.5">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 133+ AI, Data, Testing, and Tech skills (e.g. 'annotation', 'sql', 'qa')..."
            className="w-full pl-9.5 pr-4 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-slate-900"
            id={`${id}-search-input`}
          />
        </div>

        {/* Category tabs */}
        {showCategoryFilters && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`text-xs px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All ({ROBOTIC_SKILLS_LIBRARY.length})
            </button>
            {SKILL_CATEGORIES_INFO.map(cat => (
              <button
                key={cat.name}
                type="button"
                onClick={() => setSelectedCategory(cat.name)}
                className={`text-xs px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.name
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Skills Catalog Grid */}
      <div className="border border-slate-200 rounded-2xl p-3 bg-white max-h-72 overflow-y-auto space-y-3">
        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
          <span>Available skills ({filteredLibrary.length})</span>
          {isMaxReached && <span className="text-amber-600 font-bold">Limit of {maxSkills} reached</span>}
        </div>

        {filteredLibrary.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No matching skills found. Type above to add it as a custom skill!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {filteredLibrary.map((skill) => {
              const isSelected = selectedNameSet.has(skill.name.toLowerCase());
              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      handleRemoveSkill(skill.name);
                    } else {
                      handleAddSkill(skill.name, skill.category);
                    }
                  }}
                  disabled={!isSelected && isMaxReached}
                  className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-blue-50 border-blue-400 ring-1 ring-blue-500/20 text-blue-900'
                      : isMaxReached
                      ? 'bg-slate-50 border-slate-200 text-slate-400 opacity-50 cursor-not-allowed'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 text-slate-800 cursor-pointer shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <span className="text-xs font-semibold leading-tight line-clamp-1">
                      {skill.name}
                    </span>
                    <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 text-[10px] ${
                      isSelected ? 'bg-blue-600 text-white' : 'border border-slate-300 group-hover:border-blue-400 text-transparent'
                    }`}>
                      <Check className="w-3 h-3" />
                    </div>
                  </div>

                  <div className="mt-1.5 flex items-center justify-between gap-1 text-[10px] text-slate-500">
                    <span className="truncate">{skill.category}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

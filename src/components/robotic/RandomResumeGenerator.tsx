import React, { useState } from 'react';
import { RoboticResumeDraft, ExperienceLevel, RoboticSkill } from '../../types/roboticResume';
import { CvTemplate, CvFont, CvFontSize, ResumeData } from '../../types/cv';
import { 
  draftToResumeData, 
  generateRoboticSummary,
  generateProfessionalExperience,
  generateProfessionalProjects,
  generateProfessionalCertifications,
  generateProfessionalEducation
} from '../../utils/roboticAiEngine';
import { ROBOTIC_ROLES_MASTER, findRoleDefinition } from '../../data/roboticResumeData';
import { ALL_COUNTRIES, getRandomCountry, findCountryByName, CountryInfo } from '../../data/countriesData';
import { 
  ROBOTIC_SKILLS_LIBRARY, 
  getRecommendedSkills, 
  findSkillByName,
  SkillDefinition 
} from '../../data/roboticSkillsLibrary';
import { CountrySelector } from './CountrySelector';
import { MultiSkillSelector, SelectedSkillItem } from './MultiSkillSelector';
import { ResponsiveCvPreview } from '../common/ResponsiveCvPreview';
import { CvTypographyToolbar } from '../common/CvTypographyToolbar';
import { exportCvToPdf } from '../../utils/pdfExport';
import { 
  Dice5, 
  Sparkles, 
  Download, 
  Edit3, 
  AlertTriangle, 
  ChevronLeft, 
  Check, 
  Bookmark,
  Layers,
  ArrowRight,
  Globe,
  Sliders,
  Filter,
  CheckCircle2,
  Wand2,
  Shuffle
} from 'lucide-react';

interface RandomResumeGeneratorProps {
  onCustomizeInBuilder: (draft: RoboticResumeDraft) => void;
  onSaveVersion: (draft: RoboticResumeDraft, name?: string) => void;
  onExit: () => void;
}

const CATEGORIES = [
  'Any Category (Random)',
  'AI & Data Annotation',
  'AI & Machine Learning Support',
  'AI Quality & Evaluation',
  'Software Quality & Testing',
  'Security & IT Infrastructure',
  'Content & Moderation',
  'Digital & Remote Work',
  'Creative & Marketing',
  'Development & Engineering'
];

const EXPERIENCE_LEVELS: { label: string; value: string }[] = [
  { label: '🎲 Any Level (Random)', value: 'ANY' },
  { label: 'Entry Level (0-1 yrs)', value: 'Entry Level' },
  { label: 'Junior (1-3 yrs)', value: 'Junior' },
  { label: 'Mid-Level (3-5 yrs)', value: 'Mid-Level' },
  { label: 'Senior (5+ yrs)', value: 'Senior' },
  { label: 'Expert / Lead (8+ yrs)', value: 'Expert' }
];

type SkillMode = 'random' | 'custom' | 'mix';

const SAMPLE_FIRST_NAMES = [
  'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Sam', 'Alex', 'Cameron', 'Dakota',
  'Jamie', 'Kendall', 'Quinn', 'Skyler', 'Logan', 'Rowan', 'Harper', 'Jesse', 'Reese', 'Drew',
  'Priya', 'Mateo', 'Fatima', 'Daisuke', 'Chukwu', 'Elena', 'Amara', 'Lucas', 'Leila', 'Kwame'
];

const SAMPLE_LAST_NAMES = [
  'Chen', 'Miller', 'Johnson', 'Patel', 'Davis', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Jackson',
  'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Okonkwo', 'Takahashi',
  'Müller', 'Santos', 'Diallo', 'Dubois', 'Kowalski', 'Novak', 'Al-Mansoor', 'Silva', 'Kim', 'Tanaka'
];

export const RandomResumeGenerator: React.FC<RandomResumeGeneratorProps> = ({
  onCustomizeInBuilder,
  onSaveVersion,
  onExit
}) => {
  // Randomization controls state
  const [isCountryRandom, setIsCountryRandom] = useState(true);
  const [selectedCountryName, setSelectedCountryName] = useState<string>('United States');
  
  const [selectedCategory, setSelectedCategory] = useState('Any Category (Random)');
  const [selectedLevelSetting, setSelectedLevelSetting] = useState<string>('ANY');
  const [selectedTemplate, setSelectedTemplate] = useState<CvTemplate>('technical');
  
  // Skill configuration mode
  const [skillMode, setSkillMode] = useState<SkillMode>('random');
  const [targetSkillCount, setTargetSkillCount] = useState<number>(12);
  const [userSelectedSkills, setUserSelectedSkills] = useState<SelectedSkillItem[]>([
    { name: 'Prompt Engineering', category: 'AI & Machine Learning', isPrimary: true },
    { name: 'Data Annotation', category: 'Data Annotation & Labeling', isPrimary: true },
    { name: 'Quality Assurance (QA)', category: 'Software Testing & QA', isPrimary: false }
  ]);

  const [showSkillConfigModal, setShowSkillConfigModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Typography & Wording configuration state
  const [selectedFont, setSelectedFont] = useState<CvFont>('sans');
  const [selectedFontSize, setSelectedFontSize] = useState<CvFontSize>('md');
  const [selectedSpacing, setSelectedSpacing] = useState<'compact' | 'normal' | 'spacious'>('normal');
  const [wordingTone, setWordingTone] = useState<'executive' | 'technical' | 'modern'>('executive');

  // Resume draft state
  const [currentDraft, setCurrentDraft] = useState<RoboticResumeDraft>(() => 
    generateConfiguredDraft(true, 'United States', 'Any Category (Random)', 'ANY', 'random', 12, [])
  );

  function generateConfiguredDraft(
    countryRandom: boolean,
    specificCountry: string,
    categorySetting: string,
    levelSetting: string,
    mode: SkillMode,
    skillCount: number,
    chosenSkills: SelectedSkillItem[],
    templateSetting?: CvTemplate
  ): RoboticResumeDraft {
    // 1. Resolve Country
    let countryInfo: CountryInfo;
    if (countryRandom) {
      countryInfo = getRandomCountry();
    } else {
      countryInfo = findCountryByName(specificCountry) || getRandomCountry();
    }

    // 2. Resolve Category & Role
    let candidateRoles = ROBOTIC_ROLES_MASTER;
    if (categorySetting !== 'Any Category (Random)') {
      candidateRoles = ROBOTIC_ROLES_MASTER.filter(r => r.category === categorySetting);
      if (candidateRoles.length === 0) candidateRoles = ROBOTIC_ROLES_MASTER;
    }
    const role = candidateRoles[Math.floor(Math.random() * candidateRoles.length)];

    // 3. Resolve Experience Level
    const resolvedLevel: ExperienceLevel = levelSetting === 'ANY'
      ? (['Entry Level', 'Junior', 'Mid-Level', 'Senior', 'Expert'][Math.floor(Math.random() * 5)] as ExperienceLevel)
      : (levelSetting as ExperienceLevel);

    // 4. Resolve Identity & Contact
    const firstName = SAMPLE_FIRST_NAMES[Math.floor(Math.random() * SAMPLE_FIRST_NAMES.length)];
    const lastName = SAMPLE_LAST_NAMES[Math.floor(Math.random() * SAMPLE_LAST_NAMES.length)];
    const fullName = `${firstName} ${lastName}`;
    const cleanRole = role.title.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Select city from country's real metadata
    const city = countryInfo.majorCities && countryInfo.majorCities.length > 0
      ? countryInfo.majorCities[Math.floor(Math.random() * countryInfo.majorCities.length)]
      : countryInfo.capital || 'Remote';

    // Select university from country's real metadata
    const university = countryInfo.universities && countryInfo.universities.length > 0
      ? countryInfo.universities[Math.floor(Math.random() * countryInfo.universities.length)]
      : `${countryInfo.name} National University`;

    // Select companies
    const company1 = countryInfo.companies && countryInfo.companies.length > 0
      ? countryInfo.companies[0]
      : `${countryInfo.name} Global Systems`;
    const company2 = countryInfo.companies && countryInfo.companies.length > 1
      ? countryInfo.companies[1]
      : `Nexus Digital ${countryInfo.alpha2}`;

    const currentYear = new Date().getFullYear();
    const isSenior = resolvedLevel === 'Senior' || resolvedLevel === 'Expert';
    const isEntry = resolvedLevel === 'Entry Level';

    const exp1Years = isSenior ? `${currentYear - 2}-01 to Present` : `${currentYear - 1}-03 to Present`;
    const exp2Years = isSenior ? `${currentYear - 5}-04 to ${currentYear - 2}-12` : `${currentYear - 3}-06 to ${currentYear - 1}-02`;

    // 5. Resolve Skills according to SkillMode
    let finalSkills: RoboticSkill[] = [];

    if (mode === 'custom' && chosenSkills.length > 0) {
      // User picks all skills
      finalSkills = chosenSkills.slice(0, 30).map((cs, idx) => ({
        id: `sk-rand-${idx}`,
        name: cs.name,
        category: cs.category || 'Technical Skills',
        level: cs.isPrimary ? 'Expert' : 'Advanced',
        isPrimary: !!cs.isPrimary
      }));
    } else if (mode === 'mix') {
      // Mix: start with user chosen skills, fill remainder up to skillCount from library
      const chosenNames = new Set(chosenSkills.map(s => s.name.toLowerCase()));
      const skillsFromUser: RoboticSkill[] = chosenSkills.map((cs, idx) => ({
        id: `sk-user-${idx}`,
        name: cs.name,
        category: cs.category || 'Technical Skills',
        level: cs.isPrimary ? 'Expert' : 'Advanced',
        isPrimary: !!cs.isPrimary
      }));

      // Get smart recommendations matching current role and chosen skills
      const recs = getRecommendedSkills(chosenSkills.map(s => s.name), 20);
      const remainingNeeded = Math.max(0, skillCount - skillsFromUser.length);

      const fillerSkills: RoboticSkill[] = [];
      for (const rec of recs) {
        if (!chosenNames.has(rec.name.toLowerCase())) {
          fillerSkills.push({
            id: `sk-fill-${fillerSkills.length}`,
            name: rec.name,
            category: rec.category,
            level: 'Advanced',
            isPrimary: false
          });
          if (fillerSkills.length >= remainingNeeded) break;
        }
      }

      // If still need more, pick from library
      if (fillerSkills.length < remainingNeeded) {
        for (const libSkill of ROBOTIC_SKILLS_LIBRARY) {
          if (!chosenNames.has(libSkill.name.toLowerCase()) && !fillerSkills.some(f => f.name.toLowerCase() === libSkill.name.toLowerCase())) {
            fillerSkills.push({
              id: `sk-fill-${fillerSkills.length}`,
              name: libSkill.name,
              category: libSkill.category,
              level: 'Advanced',
              isPrimary: false
            });
            if (fillerSkills.length >= remainingNeeded) break;
          }
        }
      }

      finalSkills = [...skillsFromUser, ...fillerSkills].slice(0, 30);
    } else {
      // Random skills mode: pick matching role suggested skills + library skills up to skillCount
      const pickedSet = new Set<string>();
      const generated: RoboticSkill[] = [];

      // 1. Role suggested skills first
      role.suggestedSkills.forEach((s) => {
        if (!pickedSet.has(s.name.toLowerCase()) && generated.length < skillCount) {
          pickedSet.add(s.name.toLowerCase());
          generated.push({
            id: `sk-rand-${generated.length}`,
            name: s.name,
            category: s.category,
            level: 'Advanced',
            isPrimary: generated.length < 3
          });
        }
      });

      // 2. Recommendations matching the role
      const recs = getRecommendedSkills(generated.map(s => s.name), 25);
      for (const r of recs) {
        if (!pickedSet.has(r.name.toLowerCase()) && generated.length < skillCount) {
          pickedSet.add(r.name.toLowerCase());
          generated.push({
            id: `sk-rand-${generated.length}`,
            name: r.name,
            category: r.category,
            level: 'Advanced',
            isPrimary: false
          });
        }
      }

      // 3. Fallback library picks if needed
      if (generated.length < skillCount) {
        for (const s of ROBOTIC_SKILLS_LIBRARY) {
          if (!pickedSet.has(s.name.toLowerCase()) && generated.length < skillCount) {
            pickedSet.add(s.name.toLowerCase());
            generated.push({
              id: `sk-rand-${generated.length}`,
              name: s.name,
              category: s.category,
              level: 'Intermediate',
              isPrimary: false
            });
          }
        }
      }

      finalSkills = generated.slice(0, 30);
    }

    // 6. Build Draft
    const template = templateSetting || selectedTemplate;

    const draft: RoboticResumeDraft = {
      id: `random-${Date.now()}`,
      versionName: `Sample: ${role.title} (${countryInfo.name})`,
      personalInfo: {
        fullName,
        jobTitle: role.title,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
        phone: `${countryInfo.phonePrefix} ${Math.floor(100 + Math.random() * 900)} ${Math.floor(1000 + Math.random() * 9000)}`,
        location: `${city}, ${countryInfo.name}`,
        country: countryInfo.name,
        linkedin: `linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
        portfolio: `https://${firstName.toLowerCase()}${cleanRole}.dev`,
        website: `https://${firstName.toLowerCase()}${cleanRole}.dev`
      },
      careerTarget: {
        targetRole: role.title,
        experienceLevel: resolvedLevel,
        workPreference: 'Remote',
        targetIndustry: role.defaultIndustry
      },
      experience: generateProfessionalExperience(
        role.title,
        role.defaultIndustry,
        resolvedLevel,
        countryInfo.name,
        company1,
        company2
      ),
      skills: finalSkills,
      education: generateProfessionalEducation(
        university,
        city,
        role.title,
        isSenior
      ),
      certifications: generateProfessionalCertifications(
        role.title,
        role.defaultIndustry,
        countryInfo.alpha2
      ),
      additionalInfo: {
        projects: generateProfessionalProjects(role.title, role.defaultIndustry),
        languages: [
          { language: 'English', proficiency: 'Professional Working' },
          ...(countryInfo.name !== 'United States' && countryInfo.name !== 'United Kingdom' && countryInfo.name !== 'Australia' 
            ? [{ language: `${countryInfo.name} Primary`, proficiency: 'Native' }] 
            : [])
        ]
      },
      professionalSummary: '',
      selectedTemplate: template,
      accentColor: role.defaultAccent,
      selectedFont,
      fontSize: selectedFontSize,
      spacing: selectedSpacing,
      wordingTone,
      updatedAt: Date.now()
    };

    draft.professionalSummary = generateRoboticSummary(draft, wordingTone);
    return draft;
  }

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const fresh = generateConfiguredDraft(
        isCountryRandom,
        selectedCountryName,
        selectedCategory,
        selectedLevelSetting,
        skillMode,
        targetSkillCount,
        userSelectedSkills,
        selectedTemplate
      );
      setCurrentDraft(fresh);
      setIsGenerating(false);
    }, 250);
  };

  const handleSaveToVersions = () => {
    onSaveVersion(currentDraft, currentDraft.versionName);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleFontChange = (font: CvFont) => {
    setSelectedFont(font);
    setCurrentDraft(prev => ({
      ...prev,
      selectedFont: font,
      updatedAt: Date.now()
    }));
  };

  const handleFontSizeChange = (size: CvFontSize) => {
    setSelectedFontSize(size);
    setCurrentDraft(prev => ({
      ...prev,
      fontSize: size,
      updatedAt: Date.now()
    }));
  };

  const handleSpacingChange = (spacing: 'compact' | 'normal' | 'spacious') => {
    setSelectedSpacing(spacing);
    setCurrentDraft(prev => ({
      ...prev,
      spacing,
      updatedAt: Date.now()
    }));
  };

  const handleToneChange = (tone: 'executive' | 'technical' | 'modern') => {
    setWordingTone(tone);
    setCurrentDraft(prev => {
      const updatedSummary = generateRoboticSummary({ ...prev, wordingTone: tone }, tone);
      return {
        ...prev,
        wordingTone: tone,
        professionalSummary: updatedSummary,
        updatedAt: Date.now()
      };
    });
  };

  const handleRegenerateWording = () => {
    setCurrentDraft(prev => {
      const updatedSummary = generateRoboticSummary(prev, wordingTone);
      return {
        ...prev,
        professionalSummary: updatedSummary,
        updatedAt: Date.now()
      };
    });
  };

  const resumeData: ResumeData = draftToResumeData(currentDraft);

  return (
    <div className="w-full space-y-6 animate-fadeIn pb-16" id="robotic-random-generator">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onExit}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Back to Robotic Resume Hub"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Random Resume Generator
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Global Edition • 250+ Countries
              </span>
            </div>
            <h1 className="text-base sm:text-xl font-bold text-slate-900 leading-tight mt-0.5">
              Instant AI Resume Generator
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow-md"
            id="btn-regenerate-random-resume"
          >
            <Dice5 className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating...' : 'Regenerate Resume'}</span>
          </button>
        </div>
      </div>

      {/* Prominent Sample Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs leading-relaxed shadow-2xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Demonstration Notice:</span> This profile is an AI-generated sample demonstration. Never submit fictional employment or educational history to real employers. Click <strong>“Customize in Builder”</strong> below to customize every field and replace with your verified background.
        </div>
      </div>

      {/* Advanced Control Panel */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-5" id="random-controls-panel">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Randomization Controls & Filters
            </h2>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Tweak settings and click <strong>Regenerate</strong> anytime
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Country Setting - Always clearly visible and selectable */}
          <div className="space-y-1.5">
            <CountrySelector
              label="Country / Territory"
              value={isCountryRandom ? 'Any Country (Random)' : selectedCountryName}
              onChange={(country) => {
                if (!country || country === 'Any Country (Random)') {
                  setIsCountryRandom(true);
                  setSelectedCountryName('Any Country (Random)');
                } else {
                  setIsCountryRandom(false);
                  setSelectedCountryName(country);
                  // Immediately update draft to the selected country
                  const fresh = generateConfiguredDraft(
                    false,
                    country,
                    selectedCategory,
                    selectedLevelSetting,
                    skillMode,
                    targetSkillCount,
                    userSelectedSkills,
                    selectedTemplate
                  );
                  setCurrentDraft(fresh);
                }
              }}
              allowAnyRandom={true}
              showRandomButton={true}
              onRandomSelect={(randomCountry) => {
                setIsCountryRandom(false);
                setSelectedCountryName(randomCountry);
                const fresh = generateConfiguredDraft(
                  false,
                  randomCountry,
                  selectedCategory,
                  selectedLevelSetting,
                  skillMode,
                  targetSkillCount,
                  userSelectedSkills,
                  selectedTemplate
                );
                setCurrentDraft(fresh);
              }}
              placeholder="Search 250+ countries..."
              id="random-control-country"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-0.5">
              <span>Resume Country:</span>
              <span className="font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                {currentDraft.personalInfo.country}
              </span>
            </div>
          </div>

          {/* 2. Career Category */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Career Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              id="random-control-category"
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* 3. Experience Level */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Experience Level
            </label>
            <select
              value={selectedLevelSetting}
              onChange={(e) => setSelectedLevelSetting(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              id="random-control-level"
            >
              {EXPERIENCE_LEVELS.map(lvl => (
                <option key={lvl.value} value={lvl.value}>{lvl.label}</option>
              ))}
            </select>
          </div>

          {/* 4. Resume Style */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Resume Layout Style
            </label>
            <select
              value={selectedTemplate}
              onChange={(e) => {
                const val = e.target.value as CvTemplate;
                setSelectedTemplate(val);
                setCurrentDraft(prev => ({ ...prev, selectedTemplate: val }));
              }}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              id="random-control-template"
            >
              <option value="technical">Technical (AI/Data)</option>
              <option value="classic">ATS Classic</option>
              <option value="modern">Modern Professional</option>
              <option value="minimal">Clean Minimal</option>
              <option value="executive">Executive Leadership</option>
            </select>
          </div>
        </div>

        {/* Skill Selection Mode Strip */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Wand2 className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Skill Generation Mode:
              </span>
              <span className="text-xs text-slate-500">
                (Current: {currentDraft.skills.length} skills generated)
              </span>
            </div>

            {/* Target Skill Count Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-600">Target Skills:</span>
              <div className="flex items-center gap-1">
                {[6, 10, 15, 20, 25, 30].map(count => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setTargetSkillCount(count)}
                    className={`text-xs px-2 py-0.5 rounded-md font-bold transition-colors cursor-pointer ${
                      targetSkillCount === count
                        ? 'bg-purple-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {/* Mode 1: Random Skills */}
            <div
              onClick={() => setSkillMode('random')}
              className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                skillMode === 'random'
                  ? 'bg-purple-50 border-purple-300 ring-2 ring-purple-500/20 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">🎲 Random Skills</span>
                {skillMode === 'random' && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                System automatically selects {targetSkillCount} relevant skills from the 100+ skills library.
              </p>
            </div>

            {/* Mode 2: Select My Skills */}
            <div
              onClick={() => {
                setSkillMode('custom');
                setShowSkillConfigModal(true);
              }}
              className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                skillMode === 'custom'
                  ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-500/20 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">🎯 Select My Skills</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded">
                  {userSelectedSkills.length} Chosen
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Pick your exact skills (up to 30) from the full library. Click to edit.
              </p>
            </div>

            {/* Mode 3: Mix Skills */}
            <div
              onClick={() => {
                setSkillMode('mix');
                setShowSkillConfigModal(true);
              }}
              className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                skillMode === 'mix'
                  ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">⚡ Mix Skills</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                  Hybrid
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Keep {userSelectedSkills.length} core skills + AI auto-completes up to {targetSkillCount} skills.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onCustomizeInBuilder(currentDraft)}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
              id="btn-random-customize-builder"
            >
              <Edit3 className="w-4 h-4" />
              <span>Customize in Builder</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleSaveToVersions}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              id="btn-random-save-version"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Saved!</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4 text-slate-600" />
                  <span>Save to My Resumes</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => exportCvToPdf(resumeData)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              id="btn-random-export-pdf"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>

            <button
              type="button"
              onClick={handleRegenerate}
              disabled={isGenerating}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              title="Re-roll with current filters"
            >
              <Dice5 className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal / Drawer for Custom / Mix Skills Configuration */}
      {showSkillConfigModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl p-6 shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Configure Skills for Resume Generation
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {skillMode === 'custom'
                    ? 'Pick the exact skills to include on your generated profile.'
                    : 'Select your preferred anchor skills. AI will fill the remainder up to ' + targetSkillCount + ' skills.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSkillConfigModal(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto py-4 flex-1">
              <MultiSkillSelector
                selectedSkills={userSelectedSkills}
                onChange={(skills) => setUserSelectedSkills(skills)}
                maxSkills={30}
                id="random-modal-skill-selector"
              />
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {userSelectedSkills.length} skills selected
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowSkillConfigModal(false);
                  handleRegenerate();
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
              >
                Apply & Regenerate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generated Resume Live Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Live Interactive Preview ({currentDraft.selectedTemplate.toUpperCase()} Style)
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {currentDraft.personalInfo.fullName} • {currentDraft.personalInfo.location}
          </span>
        </div>

        {/* Typography & Readability Toolbar */}
        <CvTypographyToolbar
          selectedFont={currentDraft.selectedFont || selectedFont}
          selectedFontSize={currentDraft.fontSize || selectedFontSize}
          selectedSpacing={currentDraft.spacing || selectedSpacing}
          wordingTone={currentDraft.wordingTone || wordingTone}
          onFontChange={handleFontChange}
          onFontSizeChange={handleFontSizeChange}
          onSpacingChange={handleSpacingChange}
          onToneChange={handleToneChange}
          onRegenerateWording={handleRegenerateWording}
        />

        <div className="bg-slate-100/70 p-3 sm:p-6 rounded-3xl border border-slate-200">
          <ResponsiveCvPreview data={resumeData} />
        </div>
      </div>
    </div>
  );
};

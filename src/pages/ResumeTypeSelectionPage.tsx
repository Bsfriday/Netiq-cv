import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  ArrowLeft, 
  Bot, 
  Activity, 
  Cpu, 
  Code2, 
  Database, 
  Shield, 
  LineChart, 
  Coins, 
  Briefcase, 
  HeartPulse, 
  Stethoscope, 
  PenTool, 
  Palette, 
  Crown, 
  Building2, 
  GraduationCap, 
  Truck, 
  DraftingCompass, 
  Wrench, 
  SunMedium, 
  FileText, 
  Compass, 
  Zap, 
  CheckCircle2, 
  SlidersHorizontal,
  X,
  Plus
} from 'lucide-react';
import { 
  ResumeTypeItem, 
  RESUME_TYPES, 
  RESUME_CATEGORIES, 
  ResumeCategory, 
  resolveResumeRoute 
} from '../data/resumeTypes';

interface ResumeTypeSelectionPageProps {
  onNavigate: (route: string) => void;
  onSelectResumeType: (item: ResumeTypeItem) => void;
  onSelectCustomProfession: (customProfession: string) => void;
}

// Icon dictionary component for type safety
const TypeIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Bot': return <Bot className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'Code2': return <Code2 className={className} />;
    case 'Database': return <Database className={className} />;
    case 'Shield': return <Shield className={className} />;
    case 'LineChart': return <LineChart className={className} />;
    case 'Coins': return <Coins className={className} />;
    case 'Briefcase': return <Briefcase className={className} />;
    case 'HeartPulse': return <HeartPulse className={className} />;
    case 'Stethoscope': return <Stethoscope className={className} />;
    case 'PenTool': return <PenTool className={className} />;
    case 'Palette': return <Palette className={className} />;
    case 'Crown': return <Crown className={className} />;
    case 'Building2': return <Building2 className={className} />;
    case 'GraduationCap': return <GraduationCap className={className} />;
    case 'Truck': return <Truck className={className} />;
    case 'DraftingCompass': return <DraftingCompass className={className} />;
    case 'Wrench': return <Wrench className={className} />;
    case 'SunMedium': return <SunMedium className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'Compass': return <Compass className={className} />;
    case 'Zap': return <Zap className={className} />;
    default: return <Sparkles className={className} />;
  }
};

export const ResumeTypeSelectionPage: React.FC<ResumeTypeSelectionPageProps> = ({
  onNavigate,
  onSelectResumeType,
  onSelectCustomProfession
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResumeCategory>('All');
  const [filterType, setFilterType] = useState<'all' | 'dedicated' | 'dynamic' | 'popular'>('all');
  const [customRoleInput, setCustomRoleInput] = useState('');

  // Filter and search logic
  const filteredTypes = useMemo(() => {
    return RESUME_TYPES.filter((item) => {
      // 1. Category Filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // 2. Type Filter (all, dedicated, dynamic, popular)
      if (filterType === 'dedicated' && !item.isDedicated) return false;
      if (filterType === 'dynamic' && item.isDedicated) return false;
      if (filterType === 'popular' && !item.popular) return false;

      // 3. Search Query Filter
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(query);
      const matchDesc = item.description.toLowerCase().includes(query);
      const matchCat = item.category.toLowerCase().includes(query);
      const matchKeywords = item.keywords.some((kw) => kw.toLowerCase().includes(query));
      const matchTarget = item.targetProfession?.toLowerCase().includes(query);

      return matchName || matchDesc || matchCat || matchKeywords || matchTarget;
    });
  }, [searchQuery, selectedCategory, filterType]);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customRoleInput.trim()) return;
    onSelectCustomProfession(customRoleInput.trim());
  };

  const dedicatedCount = useMemo(() => RESUME_TYPES.filter(t => t.isDedicated).length, []);
  const dynamicCount = useMemo(() => RESUME_TYPES.filter(t => !t.isDedicated).length, []);

  return (
    <main className="flex-1 flex flex-col bg-slate-50 min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Top Breadcrumbs & Back Action */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 bg-white hover:bg-slate-100 border border-slate-200/80 px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
          id="btn-back-to-dashboard"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span className="hidden sm:inline">Intelligent Routing:</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
            {dedicatedCount} Dedicated Studios
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
            {dynamicCount}+ Dynamic AI Profiles
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Resume Type Selection</span>
        </div>

        <h1 
          className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3"
          id="selection-page-title"
        >
          Choose Your Resume Type
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Select the type of professional resume you want to generate. If a dedicated generator exists in the studio, we’ll take you there directly; otherwise our AI will customize one for your target profession.
        </p>
      </div>

      {/* Search & Filter Bar Controls */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 mb-8 space-y-4">
        {/* Search Input and Sub-filter toggles */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by job title, category, or keyword (e.g. Biomedical Engineer, Robotic, Software, Finance)..."
              className="w-full pl-10 pr-10 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all font-medium"
              id="input-resume-type-search"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Sub-Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 shrink-0">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                filterType === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setFilterType('popular')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                filterType === 'popular'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => setFilterType('dedicated')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                filterType === 'dedicated'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Dedicated Studios
            </button>
            <button
              onClick={() => setFilterType('dynamic')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                filterType === 'dynamic'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Dynamic AI
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1">
          {RESUME_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = cat === 'All' 
              ? RESUME_TYPES.length 
              : RESUME_TYPES.filter(t => t.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Resume Types */}
      {filteredTypes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {filteredTypes.map((item) => {
            const isDedicated = item.isDedicated;

            return (
              <div
                key={item.id}
                onClick={() => onSelectResumeType(item)}
                id={`card-resume-type-${item.id}`}
                className="group cursor-pointer p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
              >
                {/* 3D Gloss Highlight Bar */}
                <div 
                  className={`absolute inset-x-0 top-0 h-1.5 ${
                    isDedicated 
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500' 
                      : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500'
                  }`} 
                />

                <div>
                  {/* Card Header: Icon + Badges */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform ${
                      isDedicated 
                        ? 'bg-gradient-to-br from-blue-600 to-indigo-700 shadow-blue-500/20' 
                        : 'bg-gradient-to-br from-slate-900 to-blue-900 shadow-slate-900/20'
                    }`}>
                      <TypeIcon name={item.iconName} className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.popular && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          Popular
                        </span>
                      )}
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        isDedicated 
                          ? 'bg-blue-50 text-blue-700 border-blue-200' 
                          : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      }`}>
                        {item.badge || (isDedicated ? 'Dedicated Studio' : 'Dynamic AI')}
                      </span>
                    </div>
                  </div>

                  {/* Title & Category */}
                  <div className="mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>
                    <h2 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {item.name}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-5">
                    {item.description}
                  </p>
                </div>

                {/* Card Action Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectResumeType(item);
                  }}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs ${
                    isDedicated
                      ? 'bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white group-hover:bg-blue-600 group-hover:text-white'
                      : 'bg-slate-100 hover:bg-slate-900 text-slate-800 hover:text-white group-hover:bg-slate-900 group-hover:text-white'
                  }`}
                  id={`btn-select-type-${item.id}`}
                >
                  <span>{isDedicated ? 'Open Dedicated Studio' : 'Generate with AI'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* No Search Results */
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 mb-12">
          <Sparkles className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-800 mb-1">
            No matching resume types found for "{searchQuery}"
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
            You can enter your exact target job title below and our dynamic AI generator will craft a specialized resume for you!
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setFilterType('all');
            }}
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* "Can't find your profession?" Custom Role Generator Card */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden mb-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Custom Dynamic Profession</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
            Can't find your specific job title?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            Enter your exact target profession below (e.g. <em>Biomedical Engineer</em>, <em>Quantum Computing Researcher</em>, <em>Marine Biologist</em>, or <em>Urban Planner</em>). Our dynamic AI engine will generate customized skills, accomplishments, and metrics for your career.
          </p>

          <form onSubmit={handleCustomSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={customRoleInput}
                onChange={(e) => setCustomRoleInput(e.target.value)}
                placeholder="Enter any target profession (e.g. Biomedical Engineer, Acoustic Consultant)..."
                className="w-full px-4 py-3.5 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 placeholder:text-slate-400 rounded-2xl text-xs sm:text-sm border border-white/20 focus:border-white focus:ring-2 focus:ring-blue-400 focus:outline-hidden transition-all font-medium"
                id="input-custom-profession"
              />
            </div>

            <button
              type="submit"
              disabled={!customRoleInput.trim()}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-blue-600/40 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              id="btn-generate-custom-ai"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Custom AI Resume</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Feature Guarantee Callout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
            Intelligent Category Detection
          </div>
          <p className="text-[11px] text-slate-500">
            Dedicated generators route directly to their studio; others adapt naturally via AI.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
            250+ Global Country Standards
          </div>
          <p className="text-[11px] text-slate-500">
            Localized universities, regional contact formats, and international conventions.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
            Zero False Claims & ATS Verified
          </div>
          <p className="text-[11px] text-slate-500">
            Realistic, industry-tested action verbs and quantifiable impact frameworks.
          </p>
        </div>
      </div>
    </main>
  );
};

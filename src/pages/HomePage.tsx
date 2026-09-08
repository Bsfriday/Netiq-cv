import React, { useState } from 'react';
import { Sparkles, PlusCircle, ArrowRight, Compass, FileText, CheckCircle2, ShieldCheck, Zap, Bot, X, Loader2 } from 'lucide-react';
import { ResumeData } from '../types/cv';
import { generateTailoredAiResume } from '../data/aiGenerator';
import { CountrySelector } from '../components/robotic/CountrySelector';
import { CountryCityRegionSelector } from '../components/common/CountryCityRegionSelector';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onGenerateRandom: () => void;
  onCreateNew: () => void;
  onCvGenerated?: (cv: ResumeData) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onNavigate, 
  onGenerateRandom, 
  onCreateNew,
  onCvGenerated
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [modalFullName, setModalFullName] = useState('');
  const [modalJobTitle, setModalJobTitle] = useState('Software Engineer');
  const [modalCountry, setModalCountry] = useState('United States');
  const [modalCity, setModalCity] = useState('Washington, D.C.');
  const [modalRegion, setModalRegion] = useState('North America');
  const [modalAgeGroup, setModalAgeGroup] = useState('23-29');
  const [modalEmploymentStatus, setModalEmploymentStatus] = useState('employed');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateAndRedirect = () => {
    setIsGenerating(true);
    const titleToUse = modalJobTitle.trim() || 'Software Engineer';
    const nameToUse = modalFullName.trim() || 'Alex Morgan';
    const countryToUse = modalCountry.trim() || 'United States';
    const cityToUse = modalCity.trim() || undefined;
    const regionToUse = modalRegion.trim() || undefined;

    setTimeout(() => {
      try {
        const generated = generateTailoredAiResume({
          occupation: titleToUse,
          customOccupation: titleToUse,
          country: countryToUse,
          city: cityToUse,
          region: regionToUse,
          ageGroup: modalAgeGroup,
          employmentStatus: modalEmploymentStatus,
          customFullName: nameToUse
        });

        setIsCreateModalOpen(false);
        if (onCvGenerated) {
          onCvGenerated(generated);
        } else {
          onNavigate('/view-cv');
        }
      } finally {
        setIsGenerating(false);
      }
    }, 400);
  };
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 py-10 sm:py-16 max-w-6xl mx-auto w-full">
      {/* Brand & Hero Header with 3D aesthetic */}
      <div className="text-center mb-10 sm:mb-14 relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>A CreatIQ Products Suite</span>
        </div>

        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-3 sm:mb-4"
          id="homepage-title"
        >
          <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 bg-clip-text text-transparent">
            NetiqCV
          </span>
        </h1>
        
        <p 
          className="text-lg sm:text-xl md:text-2xl text-slate-700 font-bold max-w-xl mx-auto tracking-tight"
          id="homepage-subtitle"
        >
          Professional Resume Studio by <span className="text-blue-600">CreatIQ Products</span>
        </p>

        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-2">
          Create, edit, preview, and export polished professional resumes with real-time feedback, custom themes, and ATS-friendly templates.
        </p>
      </div>

      {/* The Main 3D Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* OPTION 1: AI Resume Generator */}
        <div 
          onClick={() => onNavigate('/resume/type-selection')}
          id="card-ai-generator"
          className="group cursor-pointer p-6 sm:p-8 rounded-3xl bg-white border border-blue-200/90 shadow-[0_10px_30px_-10px_rgba(37,99,235,0.2),0_4px_6px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.35)] hover:border-blue-400 hover:-translate-y-1.5 transition-all duration-200 flex flex-col items-start relative overflow-hidden"
        >
          {/* 3D Gloss highlight at top */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400" />

          <div className="flex justify-between items-start w-full mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              New AI Feature
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
            AI Resume Generator
          </h2>
          
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
            Generate a targeted resume tailored to your country, age group, occupation, and employment status with smart localized metrics.
          </p>

          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('/resume/type-selection');
            }}
            className="mt-auto w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-1.5"
            id="btn-ai-generator-action"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Resume with AI</span>
            <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* OPTION 2: Create My CV */}
        <div 
          onClick={() => setIsCreateModalOpen(true)}
          id="card-create-my-cv"
          className="group cursor-pointer p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_10px_30px_-10px_rgba(37,99,235,0.15),0_4px_6px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.28)] hover:border-blue-400 hover:-translate-y-1.5 transition-all duration-200 flex flex-col items-start relative overflow-hidden"
        >
          {/* 3D Gloss highlight at top */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500" />

          <div className="flex justify-between items-start w-full mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <PlusCircle className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-600 text-white shadow-xs">
              Studio Builder
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
            Create My CV
          </h2>

          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
            Instantly generate a tailored professional CV with personalized metrics, or build step-by-step with real-time feedback and PDF export.
          </p>

          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsCreateModalOpen(true);
            }}
            className="mt-auto w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-blue-600/30 hover:shadow-lg hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-1.5"
            id="btn-create-my-cv-action"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create My CV</span>
            <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* OPTION 3: Generate Random CV */}
        <div 
          onClick={onGenerateRandom}
          id="card-generate-random"
          className="group cursor-pointer p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_10px_30px_-10px_rgba(37,99,235,0.12),0_4px_6px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.25)] hover:border-blue-300 hover:-translate-y-1.5 transition-all duration-200 flex flex-col items-start relative overflow-hidden"
        >
          {/* 3D Gloss highlight at top */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 opacity-80" />

          <div className="flex justify-between items-start w-full mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-sky-100 border border-blue-200 flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Instant
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
            Random CV
          </h2>
          
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
            Instantly generate a complete, realistic fictional CV across tech, healthcare, finance, or design to explore templates.
          </p>

          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onGenerateRandom();
            }}
            className="mt-auto w-full py-3.5 px-4 bg-slate-900 hover:bg-blue-600 active:bg-blue-700 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md shadow-slate-900/10 hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-1.5 group-hover:bg-blue-600"
            id="btn-generate-random-action"
          >
            <Sparkles className="w-4 h-4" />
            <span>Random CV</span>
            <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Feature highlights bar */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <div className="font-bold text-slate-800">Live Interactive Preview</div>
            <div className="text-slate-500 text-[11px]">Instant updates as you type</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <div className="font-bold text-slate-800">Resume Strength Meter</div>
            <div className="text-slate-500 text-[11px]">Actionable section scores</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <div className="font-bold text-slate-800">Local Auto-Save</div>
            <div className="text-slate-500 text-[11px]">Your work stays safe locally</div>
          </div>
        </div>
      </div>

      {/* Secondary Navigation Links */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => onNavigate('/robotic-resume')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 hover:text-blue-800 py-2 px-4 rounded-xl bg-blue-50/90 hover:bg-blue-100 border border-blue-200 transition-all shadow-xs"
          id="link-robotic-resume-home"
        >
          <Bot className="w-4 h-4 text-blue-600" />
          <span>Robotic Resume: AI & ATS Studio</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-600 text-white font-bold">New</span>
        </button>

        <button
          onClick={() => onNavigate('/samples')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 py-2 px-4 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-all shadow-xs"
          id="link-browse-samples"
        >
          <Compass className="w-4 h-4 text-blue-600" />
          <span>Explore 9 Industry Sample CVs</span>
        </button>

        <button
          onClick={() => onNavigate('/saved')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 py-2 px-4 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 transition-all shadow-xs"
          id="link-view-saved"
        >
          <FileText className="w-4 h-4 text-blue-600" />
          <span>My Saved Resumes</span>
        </button>
      </div>

      {/* Create My CV Modal */}
      {isCreateModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs no-print overflow-y-auto"
          onClick={() => setIsCreateModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8 border border-slate-100 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
            id="modal-create-my-cv"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                  <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-slate-900">Create & Generate My CV</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      Instant
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Synthesizes a complete, professional CV tailored for your target role & country.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                id="btn-close-home-create-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick suggestions */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Popular Roles
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Software Engineer',
                  'Registered Nurse (RN)',
                  'Project Manager',
                  'Certified Public Accountant',
                  'Civil Engineer',
                  'Data Scientist',
                  'Marketing Specialist'
                ].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setModalJobTitle(role)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      modalJobTitle === role
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={modalFullName}
                  onChange={(e) => setModalFullName(e.target.value)}
                  placeholder="e.g. Jordan Mitchell"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  id="home-modal-input-name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Job Title / Profession <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={modalJobTitle}
                  onChange={(e) => setModalJobTitle(e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  id="home-modal-input-role"
                />
              </div>

              <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200">
                <CountryCityRegionSelector
                  country={modalCountry}
                  city={modalCity}
                  region={modalRegion}
                  onChange={(payload) => {
                    setModalCountry(payload.country);
                    setModalCity(payload.city);
                    setModalRegion(payload.region);
                  }}
                  idPrefix="home-modal-loc"
                  compact={true}
                  showQuickCities={true}
                  showRegionField={true}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Experience</label>
                  <select
                    value={modalAgeGroup}
                    onChange={(e) => setModalAgeGroup(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="18-22">Junior (0-2 yrs)</option>
                    <option value="23-29">Mid-Level (3-5 yrs)</option>
                    <option value="30-39">Senior (6-10 yrs)</option>
                    <option value="40-49">Lead / Principal</option>
                    <option value="50+">Executive (15+ yrs)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Status</label>
                  <select
                    value={modalEmploymentStatus}
                    onChange={(e) => setModalEmploymentStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="employed">Employed</option>
                    <option value="unemployed">Seeking Role</option>
                    <option value="recent_grad">Recent Graduate</option>
                    <option value="freelancer">Freelancer</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  onCreateNew();
                }}
                className="text-xs font-semibold text-slate-500 hover:text-blue-600 underline"
                id="btn-manual-studio-open"
              >
                Or build manually in Studio →
              </button>

              <button
                type="button"
                onClick={handleGenerateAndRedirect}
                disabled={isGenerating}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 active:from-blue-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                id="btn-home-generate-redirect"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generating Professional CV...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
                    <span>⚡ Generate & View My CV →</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

import React from 'react';
import { 
  Bot, 
  Sparkles, 
  FileText, 
  Dice5, 
  ShieldCheck, 
  CheckCircle2, 
  Search, 
  ArrowRight, 
  Layers, 
  Cpu, 
  Award, 
  Clock, 
  ChevronRight,
  Briefcase
} from 'lucide-react';
import { ROBOTIC_ROLES_MASTER } from '../../data/roboticResumeData';

interface RoboticDashboardProps {
  onStartBuilder: (preselectedRole?: string) => void;
  onStartRandom: () => void;
  onOpenVersions: () => void;
  savedVersionsCount: number;
}

export const RoboticDashboard: React.FC<RoboticDashboardProps> = ({
  onStartBuilder,
  onStartRandom,
  onOpenVersions,
  savedVersionsCount
}) => {
  const popularRoles = [
    'AI Data Annotator',
    'QA Tester',
    'Prompt Specialist',
    'Search Quality Rater',
    'Content Reviewer',
    'Cybersecurity Analyst',
    'Remote Digital Specialist',
    'Software Tester'
  ];

  return (
    <div className="w-full space-y-8 animate-fadeIn" id="robotic-resume-dashboard">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-indigo-900/50">
        {/* Subtle decorative background grid */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold uppercase tracking-wider mb-4">
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>AI-Powered Career Tools</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-3">
            Robotic Resume
          </h1>

          <p className="text-lg sm:text-xl font-medium text-indigo-200/90 mb-2">
            “Build an AI-optimized resume for the future of work.”
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mb-8">
            Create a professional, ATS-friendly resume tailored to the modern AI, data, testing, and remote digital workforce. Generate a customized professional resume based on your experience, skills, target role, and career background.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
            <button
              type="button"
              onClick={() => onStartBuilder()}
              id="btn-robotic-create-resume"
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all flex items-center gap-2.5 group cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-blue-200 group-hover:rotate-12 transition-transform" />
              <span>Create My Resume</span>
              <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={onStartRandom}
              id="btn-robotic-random-resume"
              className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 active:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-700/80 transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <Dice5 className="w-5 h-5 text-indigo-400" />
              <span>Generate Random Resume</span>
            </button>

            {savedVersionsCount > 0 && (
              <button
                type="button"
                onClick={onOpenVersions}
                id="btn-robotic-view-versions"
                className="px-4 py-3.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-sm border border-slate-700/50 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Saved Versions ({savedVersionsCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Feature Pills */}
        <div className="relative z-10 mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>42+ AI & Digital Roles</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Smart ATS Scoring</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Client-Side Privacy</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>A4 Vector PDF Ready</span>
          </div>
        </div>
      </section>

      {/* Quick Launch by Popular Roles */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <span>Choose Your Target Role</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Select an AI or digital specialty to pre-populate industry skills and optimized action verbs:
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {popularRoles.map(role => (
            <button
              key={role}
              type="button"
              onClick={() => onStartBuilder(role)}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200/80 hover:border-blue-300 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{role}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          ))}
          <button
            type="button"
            onClick={() => onStartBuilder()}
            className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>+ View all 42+ roles & custom titles</span>
          </button>
        </div>
      </section>

      {/* Two Modes Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Custom Resume Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-all">
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Custom Resume Builder
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Step-by-step guided workflow to construct your resume. Input your genuine experience, select curated AI and technical skills, paste job descriptions for match analysis, and get real-time ATS scoring.
            </p>
            <ul className="text-xs text-slate-600 space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Never fabricates fake employers or degrees</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Action-verb bullet point enhancement</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Detailed ATS Scorecard (0-100) & tips</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => onStartBuilder()}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Launch Step-by-Step Builder</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Random Resume Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition-all">
          <div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 font-bold">
              <Dice5 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Random Resume Generator
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Instantly generate realistic sample resumes for inspiration across AI, QA testing, cybersecurity, digital marketing, and remote operations. Perfect for exploring layouts and standard phrasing.
            </p>
            <ul className="text-xs text-slate-600 space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>Clearly labeled fictional sample profile</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>Customizable by role, level, country & template</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>One-click load into Custom Builder for editing</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={onStartRandom}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Generate Sample Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Trust & Privacy Statement */}
      <section className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <span className="font-bold text-slate-800">Your Career Data Belongs to You:</span>{' '}
            Robotic Resume processes your resume entirely within your browser. No personal resume data is sent to external advertising networks or unauthorized third parties.
          </div>
        </div>
        <div className="shrink-0 font-medium text-slate-500">
          NetiqCV Privacy Standard
        </div>
      </section>
    </div>
  );
};

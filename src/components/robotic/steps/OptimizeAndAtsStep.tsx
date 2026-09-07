import React, { useState } from 'react';
import { RoboticResumeDraft, AtsScoreBreakdown, JobMatchResult } from '../../../types/roboticResume';
import { 
  generateRoboticSummary, 
  calculateAtsScore, 
  analyzeJobDescription 
} from '../../../utils/roboticAiEngine';
import { 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  BarChart3, 
  FileSearch, 
  RefreshCw,
  Lightbulb
} from 'lucide-react';

interface OptimizeAndAtsStepProps {
  draft: RoboticResumeDraft;
  onUpdateDraft: (updated: Partial<RoboticResumeDraft>) => void;
}

export const OptimizeAndAtsStep: React.FC<OptimizeAndAtsStepProps> = ({
  draft,
  onUpdateDraft
}) => {
  const [jobDescriptionInput, setJobDescriptionInput] = useState('');
  const [jobMatchResult, setJobMatchResult] = useState<JobMatchResult | null>(null);
  const [isAnalyzingJD, setIsAnalyzingJD] = useState(false);

  // Compute live ATS score
  const atsScore: AtsScoreBreakdown = calculateAtsScore(draft);

  const handleGenerateSummary = () => {
    const summary = generateRoboticSummary(draft);
    onUpdateDraft({ professionalSummary: summary });
  };

  const handleAnalyzeJD = () => {
    if (!jobDescriptionInput.trim()) return;
    setIsAnalyzingJD(true);
    setTimeout(() => {
      const result = analyzeJobDescription(jobDescriptionInput, draft);
      setJobMatchResult(result);
      setIsAnalyzingJD(false);
    }, 350);
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <span>AI Resume Optimization & ATS Intelligence</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review your ATS score, generate an aligned professional summary, and analyze keyword overlap with your target job description.
        </p>
      </div>

      {/* 1. Professional Summary Generator */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Professional Summary (ATS Hook)</span>
            </h3>
            <p className="text-xs text-slate-500">
              A 2-4 sentence overview of your career target, competencies, and execution style.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGenerateSummary}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            id="btn-robotic-generate-summary"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Generate Aligned Summary</span>
          </button>
        </div>

        <textarea
          rows={4}
          value={draft.professionalSummary}
          onChange={(e) => onUpdateDraft({ professionalSummary: e.target.value })}
          placeholder="Detail-focused and analytical AI Data Annotator with foundational expertise in machine learning workflows, rigorous quality standards, and rapid adaptability..."
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans bg-white"
          id="textarea-robotic-summary"
        />

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>{draft.professionalSummary.length} characters (ideal: 180 - 450)</span>
          <span>Verified & editable</span>
        </div>
      </div>

      {/* 2. ATS Scorecard (0 - 100) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white shadow-md border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">
                ATS Compatibility Scorecard
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Evaluates parser readability, section structure, keyword density, and action verbs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className={`text-2xl sm:text-3xl font-black ${
                atsScore.totalScore >= 80 ? 'text-emerald-400' :
                atsScore.totalScore >= 60 ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {atsScore.totalScore}/100
              </span>
              <span className={`block text-[10px] font-bold uppercase tracking-wider ${
                atsScore.totalScore >= 80 ? 'text-emerald-300' :
                atsScore.totalScore >= 60 ? 'text-amber-300' : 'text-rose-300'
              }`}>
                {atsScore.status} Profile
              </span>
            </div>
          </div>
        </div>

        {/* Breakdown Metric Bars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <div className="text-slate-400 text-[10px] uppercase font-bold">Job Title Match</div>
            <div className="text-sm font-bold text-white mt-0.5">
              {atsScore.breakdown.jobTitleMatch} / 15
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <div className="text-slate-400 text-[10px] uppercase font-bold">Keyword Relevance</div>
            <div className="text-sm font-bold text-white mt-0.5">
              {atsScore.breakdown.keywordRelevance} / 15
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <div className="text-slate-400 text-[10px] uppercase font-bold">Summary Quality</div>
            <div className="text-sm font-bold text-white mt-0.5">
              {atsScore.breakdown.summaryQuality} / 15
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <div className="text-slate-400 text-[10px] uppercase font-bold">Skills Alignment</div>
            <div className="text-sm font-bold text-white mt-0.5">
              {atsScore.breakdown.skillsAlignment} / 15
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <div className="text-slate-400 text-[10px] uppercase font-bold">Experience & Action Verbs</div>
            <div className="text-sm font-bold text-white mt-0.5">
              {atsScore.breakdown.experienceQuality} / 20
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <div className="text-slate-400 text-[10px] uppercase font-bold">Formatting & Completeness</div>
            <div className="text-sm font-bold text-white mt-0.5">
              {atsScore.breakdown.formattingScore + atsScore.breakdown.completenessScore} / 20
            </div>
          </div>
        </div>

        {/* Actionable Recommendations */}
        {atsScore.recommendations.length > 0 && (
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-2">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Recommended ATS Optimizations:</span>
            </span>
            <ul className="text-xs text-slate-300 space-y-1.5">
              {atsScore.recommendations.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 3. Job Description Matcher */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <FileSearch className="w-4 h-4 text-blue-600" />
            <span>Target Job Description Matcher</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Paste a job posting below to identify matching keywords and discover potential gaps before you submit.
          </p>
        </div>

        <textarea
          rows={4}
          value={jobDescriptionInput}
          onChange={(e) => setJobDescriptionInput(e.target.value)}
          placeholder="Paste job requirements or listing text here (e.g. 'Looking for an AI Data Annotator experienced in RLHF, prompt evaluation, Jira, and high-accuracy labeling...')"
          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 font-sans bg-white"
        />

        <button
          type="button"
          onClick={handleAnalyzeJD}
          disabled={isAnalyzingJD || !jobDescriptionInput.trim()}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          id="btn-robotic-analyze-jd"
        >
          <Search className="w-3.5 h-3.5" />
          <span>{isAnalyzingJD ? 'Analyzing Keywords...' : 'Analyze Job Match'}</span>
        </button>

        {jobMatchResult && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">
                Job Alignment: <span className="text-blue-600">{jobMatchResult.status} ({jobMatchResult.score}%)</span>
              </span>
            </div>

            {/* Strong matches */}
            {jobMatchResult.strongMatches.length > 0 && (
              <div>
                <span className="text-[11px] font-semibold text-emerald-700 block mb-1">
                  ✓ Matched Keywords ({jobMatchResult.strongMatches.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {jobMatchResult.strongMatches.map(m => (
                    <span key={m} className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-medium">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Potential Gaps */}
            {jobMatchResult.potentialGaps.length > 0 && (
              <div>
                <span className="text-[11px] font-semibold text-amber-700 block mb-1">
                  ⚠ Keywords In Job Not Found In Your Resume ({jobMatchResult.potentialGaps.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {jobMatchResult.potentialGaps.map(g => (
                    <span key={g} className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[11px] font-medium">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {jobMatchResult.recommendations.length > 0 && (
              <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-200">
                {jobMatchResult.recommendations.map((rec, i) => (
                  <p key={i} className="mt-1">💡 {rec}</p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

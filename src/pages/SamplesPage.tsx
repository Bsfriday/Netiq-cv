import React, { useState } from 'react';
import { SAMPLE_CVS } from '../data/sampleCvs';
import { IndustryCategory, ResumeData } from '../types/cv';
import { CvRenderer } from '../components/cv-templates/CvRenderer';
import { ResponsiveCvPreview } from '../components/common/ResponsiveCvPreview';
import { exportCvToPdf, exportCvToJson, exportCvToTxt, printCv } from '../utils/pdfExport';
import { 
  Code, 
  Shield, 
  HeartPulse, 
  TrendingUp, 
  Megaphone, 
  Briefcase, 
  Palette, 
  Kanban, 
  Headset, 
  Edit3, 
  Download, 
  Eye, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
  Loader2,
  ChevronDown,
  FileJson,
  FileText,
  Printer
} from 'lucide-react';

interface SamplesPageProps {
  onSelectSample: (cv: ResumeData) => void;
  onNavigate: (route: string) => void;
}

const CATEGORY_META: Record<IndustryCategory, { icon: React.ComponentType<{ className?: string }>; color: string; desc: string }> = {
  Technology: { icon: Code, color: '#2563eb', desc: 'Full-Stack, Cloud Architecture & DevOps' },
  Cybersecurity: { icon: Shield, color: '#1e3a8a', desc: 'SOC Operations, Threat Hunting & Cloud Security' },
  Healthcare: { icon: HeartPulse, color: '#059669', desc: 'Clinical Care, Nursing & Health Admin' },
  Finance: { icon: TrendingUp, color: '#0f172a', desc: 'Valuation, Equity Research & Analytics' },
  Marketing: { icon: Megaphone, color: '#db2777', desc: 'Growth Marketing, Acquisition & SEO' },
  Sales: { icon: Briefcase, color: '#d97706', desc: 'Enterprise SaaS & Account Execution' },
  Design: { icon: Palette, color: '#7c3aed', desc: 'UX/UI Architecture & Design Systems' },
  'Project Management': { icon: Kanban, color: '#0284c7', desc: 'Agile Coaching & Technical Programs' },
  'Customer Support': { icon: Headset, color: '#10b981', desc: 'CX Leadership & Omnichannel Support' },
};

export const SamplesPage: React.FC<SamplesPageProps> = ({ onSelectSample, onNavigate }) => {
  const categories = Object.keys(SAMPLE_CVS) as IndustryCategory[];
  const [activeCategory, setActiveCategory] = useState<IndustryCategory>('Technology');
  const [viewMode, setViewMode] = useState<'standard' | 'expanded'>('standard');
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const selectedCv = SAMPLE_CVS[activeCategory] || SAMPLE_CVS['Technology'];

  const handleUseTemplate = (cv: ResumeData) => {
    // Clone with fresh ID
    const cloned: ResumeData = JSON.parse(JSON.stringify(cv));
    cloned.id = `user-${Date.now()}`;
    cloned.title = `My ${cv.industry || 'Professional'} Resume`;
    onSelectSample(cloned);
  };

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    setShowExportMenu(false);
    try {
      await exportCvToPdf(selectedCv);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadJson = () => {
    exportCvToJson(selectedCv);
    setShowExportMenu(false);
  };

  const handleDownloadTxt = () => {
    exportCvToTxt(selectedCv);
    setShowExportMenu(false);
  };

  const handlePrint = () => {
    printCv();
    setShowExportMenu(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      {/* Header Banner with 3D aesthetic */}
      <div className="no-print bg-white border-b border-slate-200 px-4 sm:px-8 py-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Inspiration Library</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Sample Industry Resumes
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Explore professionally formatted, realistic resume examples tailored for 9 major industries. Use any sample as a starting foundation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('/random')}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Generate Random CV
            </button>
            <button
              onClick={() => onNavigate('/create')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/20"
            >
              <span>Build From Scratch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8">
        {/* Industry Category Nav Tabs */}
        <div className="no-print flex overflow-x-auto gap-2 pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat] || { icon: Layers, desc: cat };
            const Icon = meta.icon;
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 shadow-xs'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sample Overview & Action Card (lg:col-span-5) */}
          <div className="no-print lg:col-span-5 min-w-0 w-full space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_10px_30px_-10px_rgba(37,99,235,0.12)] space-y-6 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 to-sky-500" />

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-3">
                  <span>{activeCategory} Blueprint</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {selectedCv.title}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Targeted for: {CATEGORY_META[activeCategory]?.desc}
                </p>
              </div>

              {/* Candidate Info Highlights */}
              <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 space-y-2.5 text-xs">
                <div className="font-bold text-slate-900 text-sm">{selectedCv.personalInfo.fullName}</div>
                <div className="text-slate-600 font-medium">{selectedCv.personalInfo.jobTitle}</div>
                <div className="text-slate-500">{selectedCv.personalInfo.location} • {selectedCv.personalInfo.email}</div>
              </div>

              {/* Sample Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Included In This Sample</h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{selectedCv.experience.length} high-impact work experience records with quantified metrics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{selectedCv.skills.length} curated industry skills categorized by proficiency</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Degree details, verified certifications, and project records</span>
                  </li>
                </ul>
              </div>

              {/* Primary Actions */}
              <div className="pt-2 space-y-3">
                <button
                  onClick={() => handleUseTemplate(selectedCv)}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/25"
                  id="btn-use-sample-template"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Use This Sample & Edit</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setViewMode(v => v === 'standard' ? 'expanded' : 'standard')}
                    className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{viewMode === 'expanded' ? 'Standard Scale' : 'Fit to Width'}</span>
                  </button>

                  <div className="relative">
                    <div className="flex items-center w-full">
                      <button
                        onClick={handleDownloadPdf}
                        disabled={isExporting}
                        className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-l-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-75"
                        id="btn-download-sample-pdf"
                      >
                        {isExporting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Exporting...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>Download PDF</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setShowExportMenu(prev => !prev)}
                        className="py-2.5 px-2 bg-blue-700 hover:bg-blue-800 text-white rounded-r-xl border-l border-blue-500 transition-all text-xs"
                        title="More export options"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {showExportMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-30 animate-in fade-in slide-in-from-top-2">
                        <button
                          onClick={handleDownloadPdf}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
                        >
                          <Download className="w-3.5 h-3.5 text-blue-600" />
                          <span>Download PDF (.pdf)</span>
                        </button>
                        <button
                          onClick={handleDownloadJson}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
                        >
                          <FileJson className="w-3.5 h-3.5 text-amber-600" />
                          <span>Export JSON (.json)</span>
                        </button>
                        <button
                          onClick={handleDownloadTxt}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-600" />
                          <span>Export Text (.txt)</span>
                        </button>
                        <button
                          onClick={handlePrint}
                          className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2 border-t border-slate-100"
                        >
                          <Printer className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Print via Browser</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Industry Switch Cards */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Other Industry Samples</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.filter(c => c !== activeCategory).slice(0, 4).map((otherCat) => (
                  <button
                    key={otherCat}
                    onClick={() => setActiveCategory(otherCat)}
                    className="text-left p-3 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 text-xs transition-all"
                  >
                    <div className="font-bold text-slate-800">{otherCat}</div>
                    <div className="text-[11px] text-slate-400 truncate">{CATEGORY_META[otherCat]?.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live CV Preview (lg:col-span-7) */}
          <div className="lg:col-span-7 min-w-0 w-full flex justify-center">
            <ResponsiveCvPreview data={selectedCv} />
          </div>
        </div>
      </div>
    </div>
  );
};

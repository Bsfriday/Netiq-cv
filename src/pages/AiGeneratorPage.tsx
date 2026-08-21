import React, { useState } from 'react';
import { 
  Sparkles, 
  Globe, 
  UserCheck, 
  Briefcase, 
  GraduationCap, 
  Edit3, 
  Download, 
  Bookmark, 
  Check, 
  RotateCcw, 
  Sliders, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  ArrowRight,
  ChevronDown,
  Loader2,
  Layers,
  Palette,
  FileText
} from 'lucide-react';
import { ResumeData, CvTemplate, CvFont } from '../types/cv';
import { 
  COUNTRIES, 
  AGE_GROUPS, 
  EMPLOYMENT_STATUSES, 
  POPULAR_OCCUPATIONS, 
  AiGeneratorInput, 
  generateTailoredAiResume 
} from '../data/aiGenerator';
import { CvRenderer } from '../components/cv-templates/CvRenderer';
import { ResponsiveCvPreview } from '../components/common/ResponsiveCvPreview';
import { exportCvToPdf, exportCvToJson, exportCvToTxt, printCv } from '../utils/pdfExport';
import { saveResumeToList } from '../utils/storage';
import { triggerReviewPrompt } from '../utils/reviewStorage';

interface AiGeneratorPageProps {
  onEditCv: (cv: ResumeData) => void;
  onNavigate: (route: string) => void;
}

export const AiGeneratorPage: React.FC<AiGeneratorPageProps> = ({ onEditCv, onNavigate }) => {
  // Input states for the 5 parameters
  const [selectedCountry, setSelectedCountry] = useState<string>('United States');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('23-29');
  const [selectedOccupation, setSelectedOccupation] = useState<string>('Software Engineer');
  const [selectedEmploymentStatus, setSelectedEmploymentStatus] = useState<string>('employed');
  const [customOccupation, setCustomOccupation] = useState<string>('');

  // Generated Resume & Preview Controls
  const [generatedCv, setGeneratedCv] = useState<ResumeData | null>(() => {
    // Generate an initial high-quality sample on load
    return generateTailoredAiResume({
      country: 'United States',
      ageGroup: '23-29',
      occupation: 'Software Engineer',
      employmentStatus: 'employed'
    });
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [showExportMenu, setShowExportMenu] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [previewScale, setPreviewScale] = useState<number>(0.85);
  const [activeTab, setActiveTab] = useState<'form' | 'preview' | 'both'>('both');

  // Handle generation action
  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const input: AiGeneratorInput = {
        country: selectedCountry,
        ageGroup: selectedAgeGroup,
        occupation: selectedOccupation,
        employmentStatus: selectedEmploymentStatus,
        customOccupation: customOccupation.trim() || undefined
      };
      const newCv = generateTailoredAiResume(input);
      setGeneratedCv(newCv);
      setIsGenerating(false);
      triggerReviewPrompt('ai_generated', 2500);
      
      // On small screens, automatically switch to preview tab to view results
      if (window.innerWidth < 1024) {
        setActiveTab('preview');
      }
    }, 350);
  };

  // Template and Theme modification handlers on generated CV
  const handleTemplateChange = (template: CvTemplate) => {
    if (!generatedCv) return;
    setGeneratedCv({
      ...generatedCv,
      themeConfig: {
        ...generatedCv.themeConfig,
        template
      }
    });
  };

  const handleColorChange = (accentColor: string) => {
    if (!generatedCv) return;
    setGeneratedCv({
      ...generatedCv,
      themeConfig: {
        ...generatedCv.themeConfig,
        accentColor
      }
    });
  };

  const handleFontChange = (font: CvFont) => {
    if (!generatedCv) return;
    setGeneratedCv({
      ...generatedCv,
      themeConfig: {
        ...generatedCv.themeConfig,
        font
      }
    });
  };

  // Export handlers
  const handleDownloadPdf = async () => {
    if (!generatedCv) return;
    setIsExporting(true);
    setShowExportMenu(false);
    try {
      await exportCvToPdf(generatedCv);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadJson = () => {
    if (!generatedCv) return;
    exportCvToJson(generatedCv);
    setShowExportMenu(false);
  };

  const handleDownloadTxt = () => {
    if (!generatedCv) return;
    exportCvToTxt(generatedCv);
    setShowExportMenu(false);
  };

  const handlePrint = () => {
    printCv();
    setShowExportMenu(false);
  };

  const handleSaveToList = () => {
    if (!generatedCv) return;
    saveResumeToList(generatedCv);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleOpenInEditor = () => {
    if (!generatedCv) return;
    onEditCv(generatedCv);
  };

  const TEMPLATES: { id: CvTemplate; label: string; desc: string }[] = [
    { id: 'modern', label: 'Modern', desc: 'Sleek, tech-forward with timeline visual accents' },
    { id: 'classic', label: 'Classic', desc: 'Traditional centered elegance with formal typography' },
    { id: 'professional', label: 'Professional', desc: 'Two-column layout with solid accent banner' },
    { id: 'minimal', label: 'Minimal', desc: 'Understated, airy, typography-first aesthetic' },
    { id: 'executive', label: 'Executive', desc: 'High-level leadership layout with credential grids' },
    { id: 'creative', label: 'Creative', desc: 'Vibrant sidebar layout for design and marketing' },
    { id: 'compact', label: 'Compact', desc: 'High-density format for comprehensive 1-page CVs' }
  ];

  const COLOR_PALETTES = [
    { name: 'Royal Blue', hex: '#2563eb' },
    { name: 'Deep Navy', hex: '#1e3a8a' },
    { name: 'Emerald', hex: '#059669' },
    { name: 'Teal', hex: '#0f766e' },
    { name: 'Slate Gray', hex: '#334155' },
    { name: 'Midnight', hex: '#0f172a' },
    { name: 'Purple', hex: '#7c3aed' },
    { name: 'Crimson', hex: '#dc2626' },
    { name: 'Amber Bronze', hex: '#d97706' }
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      {/* Top Header & Action Bar */}
      <div className="no-print bg-white border-b border-slate-200/90 sticky top-[65px] z-20 px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          {/* Title & Brand */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">
                  AI Resume Generator
                </h1>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  CreatIQ Engine
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Tailor-made resumes based on country, age, occupation & employment status
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {/* Mobile Tab Switcher */}
            <div className="lg:hidden flex items-center bg-slate-100 p-0.5 rounded-xl text-xs font-bold text-slate-600">
              <button
                onClick={() => setActiveTab('form')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'form' ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-slate-900'}`}
              >
                Inputs
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'preview' ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-slate-900'}`}
              >
                Preview
              </button>
            </div>

            {/* Save to list button */}
            <button
              onClick={handleSaveToList}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                savedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-blue-200'
              }`}
              id="btn-ai-save-draft"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Saved!</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Save Draft</span>
                </>
              )}
            </button>

            {/* Open in Full Editor */}
            <button
              onClick={handleOpenInEditor}
              className="flex items-center gap-1.5 px-3 py-2 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-blue-200 rounded-xl text-xs font-bold transition-all shadow-xs"
              id="btn-ai-open-editor"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Edit in Studio</span>
            </button>

            {/* Export / Download PDF Menu */}
            <div className="relative">
              <div className="flex items-center">
                <button
                  onClick={handleDownloadPdf}
                  disabled={isExporting || !generatedCv}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-l-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 disabled:opacity-75"
                  id="btn-ai-download-pdf"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Exporting...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Export PDF</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowExportMenu(prev => !prev)}
                  className="px-2 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-r-xl text-xs border-l border-blue-500 transition-all shadow-md shadow-blue-500/20"
                  title="More export options"
                  id="btn-ai-export-menu"
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
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export JSON Backup (.json)</span>
                  </button>
                  <button
                    onClick={handleDownloadTxt}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>Plain Text ATS (.txt)</span>
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button
                    onClick={handlePrint}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>Print Dialog (Browser)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Dual-Pane Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 5 Input Parameters Form */}
        <div className={`lg:col-span-5 min-w-0 w-full space-y-6 ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
          {/* Card Container */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Sliders className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Parameters</span>
              </div>
              <h2 className="text-xl font-black text-slate-900">
                Configure Tailored Resume
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Select your parameters below. Our engine adapts wording, structure, skills, and metrics to match your exact profile.
              </p>
            </div>

            {/* 1. Country Selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700" htmlFor="ai-select-country">
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>1. Country & Region</span>
              </label>
              <select
                id="ai-select-country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full text-xs font-semibold bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.name} ({c.cities[0]})
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-slate-400">
                Adapts university formats, phone prefixes, addresses, and localized company standards.
              </p>
            </div>

            {/* 2. Age Group Selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700" htmlFor="ai-select-age">
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>2. Age Group & Career Stage</span>
              </label>
              <select
                id="ai-select-age"
                value={selectedAgeGroup}
                onChange={(e) => setSelectedAgeGroup(e.target.value)}
                className="w-full text-xs font-semibold bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all"
              >
                {AGE_GROUPS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-slate-400">
                Calibrates total years of experience, leadership seniority, and degree graduation timelines.
              </p>
            </div>

            {/* 3. Occupation Selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700" htmlFor="ai-select-occupation">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>3. Primary Occupation</span>
              </label>
              <select
                id="ai-select-occupation"
                value={selectedOccupation}
                onChange={(e) => setSelectedOccupation(e.target.value)}
                className="w-full text-xs font-semibold bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all"
              >
                {POPULAR_OCCUPATIONS.map((o) => (
                  <option key={o.id} value={o.title}>
                    {o.title} — ({o.category})
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Employment Status Selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700" htmlFor="ai-select-status">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>4. Employment Status</span>
              </label>
              <select
                id="ai-select-status"
                value={selectedEmploymentStatus}
                onChange={(e) => setSelectedEmploymentStatus(e.target.value)}
                className="w-full text-xs font-semibold bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all"
              >
                {EMPLOYMENT_STATUSES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100/80 text-[11px] text-blue-900 leading-snug">
                {EMPLOYMENT_STATUSES.find(s => s.id === selectedEmploymentStatus)?.description}
              </div>
            </div>

            {/* 5. Custom Occupation (Optional manual entry) */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700" htmlFor="ai-input-custom-occupation">
                  <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                  <span>5. Custom Occupation (Optional)</span>
                </label>
                <span className="text-[10px] text-slate-400 font-medium">Custom override</span>
              </div>
              <input
                id="ai-input-custom-occupation"
                type="text"
                value={customOccupation}
                onChange={(e) => setCustomOccupation(e.target.value)}
                placeholder="e.g. AI Prompt Engineer, Renewable Energy Specialist..."
                className="w-full text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all font-medium"
              />
              <p className="text-[10px] text-slate-400">
                Leave blank to use the selected occupation from the dropdown list, or enter any custom title to generate a personalized role.
              </p>
            </div>

            {/* Primary Generate Action Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] text-white rounded-2xl font-black text-sm shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 mt-2"
              id="btn-ai-generate-action"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating Tailored Resume...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Tailored Resume</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>

          {/* Quick Info Feature Box */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 text-xs text-slate-600 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Smart Profile Adaptation Highlights:</span>
            </div>
            <ul className="space-y-1 text-[11px] text-slate-500 pl-5 list-disc">
              <li><strong>Students</strong>: Prominently highlights university courses, academic clubs, honors, and internship projects.</li>
              <li><strong>Unemployed / Career Break</strong>: Maximizes transferable achievements and upskilling certifications.</li>
              <li><strong>Employed / Active</strong>: Quantifies measurable revenue impact, promotions, and strategic oversight.</li>
              <li><strong>Localized</strong>: Realistic domestic universities, cities, and regional phone conventions.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Live Resume Preview & Template Selector */}
        <div className={`lg:col-span-7 min-w-0 w-full space-y-4 ${activeTab === 'form' ? 'hidden lg:block' : 'block'}`}>
          {/* Template & Styling Control Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-800">Template Style</span>
              </div>

              {/* Zoom & Font Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleFontChange(generatedCv?.themeConfig.font === 'serif' ? 'sans' : 'serif')}
                  className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                  title="Toggle Serif / Sans Font"
                >
                  Font: <span className="text-blue-600">{generatedCv?.themeConfig.font === 'serif' ? 'Serif' : 'Sans'}</span>
                </button>

                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-slate-600">
                  <button
                    onClick={() => setPreviewScale(prev => Math.max(0.5, prev - 0.05))}
                    className="p-1 hover:bg-white rounded text-slate-700 transition-colors"
                    title="Zoom out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-bold px-1">{Math.round(previewScale * 100)}%</span>
                  <button
                    onClick={() => setPreviewScale(prev => Math.min(1.2, prev + 0.05))}
                    className="p-1 hover:bg-white rounded text-slate-700 transition-colors"
                    title="Zoom in"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Template Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {TEMPLATES.map((t) => {
                const isActive = generatedCv?.themeConfig.template === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleTemplateChange(t.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* Accent Color Picker Palette */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                <Palette className="w-3.5 h-3.5 text-slate-400" />
                <span>Color:</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {COLOR_PALETTES.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => handleColorChange(c.hex)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-5 h-5 rounded-full transition-transform hover:scale-110 ${
                      generatedCv?.themeConfig.accentColor === c.hex ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : ''
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Render Sheet Preview */}
          <div className="w-full">
            {generatedCv ? (
              <ResponsiveCvPreview data={generatedCv} />
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-slate-400 text-center bg-white rounded-3xl border border-slate-200 shadow-xs">
                <Sparkles className="w-8 h-8 mb-2 animate-pulse text-blue-500" />
                <p className="font-semibold text-sm">Select options and click "Generate Tailored Resume"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

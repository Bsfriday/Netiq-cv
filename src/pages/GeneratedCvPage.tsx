import React, { useState } from 'react';
import { ResumeData, CvTemplate, CvFont } from '../types/cv';
import { ResponsiveCvPreview } from '../components/common/ResponsiveCvPreview';
import { exportCvToPdf, exportCvToJson, exportCvToTxt, printCv } from '../utils/pdfExport';
import { saveResumeToList } from '../utils/storage';
import { triggerReviewPrompt } from '../utils/reviewStorage';
import { generateTailoredAiResume } from '../data/aiGenerator';
import { CountrySelector } from '../components/robotic/CountrySelector';
import { 
  Sparkles, 
  Download, 
  Printer, 
  Edit3, 
  Bookmark, 
  Check, 
  ArrowLeft, 
  Palette, 
  Share2, 
  FileText, 
  CheckCircle2, 
  RefreshCw,
  Layers,
  ChevronDown,
  FileJson,
  PlusCircle,
  X,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Award,
  Sliders,
  ExternalLink
} from 'lucide-react';

interface GeneratedCvPageProps {
  cv: ResumeData;
  onUpdateCv: (updated: ResumeData) => void;
  onEditInStudio: (cv: ResumeData) => void;
  onNavigate: (route: string) => void;
}

export const GeneratedCvPage: React.FC<GeneratedCvPageProps> = ({
  cv,
  onUpdateCv,
  onEditInStudio,
  onNavigate
}) => {
  const [currentCv, setCurrentCv] = useState<ResumeData>(cv);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showGeneratorModal, setShowGeneratorModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'customize'>('preview');

  // Modal Generator states
  const [modalJobTitle, setModalJobTitle] = useState(currentCv.personalInfo.jobTitle || 'Software Engineer');
  const [modalFullName, setModalFullName] = useState(currentCv.personalInfo.fullName || '');
  const [modalCountry, setModalCountry] = useState(currentCv.personalInfo.country || 'United States');
  const [modalAgeGroup, setModalAgeGroup] = useState('23-29');
  const [modalEmploymentStatus, setModalEmploymentStatus] = useState('employed');
  const [isGeneratingModal, setIsGeneratingModal] = useState(false);

  // Synchronize when prop changes
  React.useEffect(() => {
    setCurrentCv(cv);
  }, [cv]);

  // Handle template change
  const handleTemplateChange = (template: CvTemplate) => {
    const updated: ResumeData = {
      ...currentCv,
      themeConfig: {
        ...currentCv.themeConfig,
        template
      },
      updatedAt: Date.now()
    };
    setCurrentCv(updated);
    onUpdateCv(updated);
    saveResumeToList(updated);
  };

  // Handle color change
  const handleColorChange = (accentColor: string) => {
    const updated: ResumeData = {
      ...currentCv,
      themeConfig: {
        ...currentCv.themeConfig,
        accentColor
      },
      updatedAt: Date.now()
    };
    setCurrentCv(updated);
    onUpdateCv(updated);
    saveResumeToList(updated);
  };

  // Handle font change
  const handleFontChange = (font: CvFont) => {
    const updated: ResumeData = {
      ...currentCv,
      themeConfig: {
        ...currentCv.themeConfig,
        font
      },
      updatedAt: Date.now()
    };
    setCurrentCv(updated);
    onUpdateCv(updated);
    saveResumeToList(updated);
  };

  // Handle save
  const handleSaveToStorage = () => {
    saveResumeToList(currentCv);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Export handlers
  const handleDownloadPdf = async () => {
    setIsExporting(true);
    setShowExportMenu(false);
    try {
      await exportCvToPdf(currentCv);
      triggerReviewPrompt('cv_download', 1500);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadJson = () => {
    exportCvToJson(currentCv);
    setShowExportMenu(false);
  };

  const handleDownloadTxt = () => {
    exportCvToTxt(currentCv);
    setShowExportMenu(false);
  };

  const handlePrint = () => {
    printCv();
    setShowExportMenu(false);
    triggerReviewPrompt('cv_download', 1500);
  };

  // Handle modal generate another
  const handleGenerateNewCv = () => {
    setIsGeneratingModal(true);
    setTimeout(() => {
      try {
        const fresh = generateTailoredAiResume({
          occupation: modalJobTitle.trim() || 'Software Engineer',
          customOccupation: modalJobTitle.trim(),
          country: modalCountry,
          ageGroup: modalAgeGroup,
          employmentStatus: modalEmploymentStatus,
          customFullName: modalFullName.trim() || undefined
        });

        setCurrentCv(fresh);
        onUpdateCv(fresh);
        saveResumeToList(fresh);
        setShowGeneratorModal(false);
        triggerReviewPrompt('ai_generated', 2500);
      } finally {
        setIsGeneratingModal(false);
      }
    }, 400);
  };

  const TEMPLATES: { id: CvTemplate; label: string; desc: string }[] = [
    { id: 'modern', label: 'Modern', desc: 'Timeline accents' },
    { id: 'classic', label: 'Classic', desc: 'Centered formal' },
    { id: 'professional', label: 'Professional', desc: '2-column corporate' },
    { id: 'minimal', label: 'Minimal', desc: 'Clean typography' },
    { id: 'executive', label: 'Executive', desc: 'Leadership grid' },
    { id: 'creative', label: 'Creative', desc: 'Vibrant sidebar' },
    { id: 'compact', label: 'Compact', desc: 'Dense 1-page' }
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
    <div className="flex-1 flex flex-col bg-slate-100 min-h-screen">
      {/* Top Banner: Success Notification */}
      <div className="no-print bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white px-4 sm:px-8 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 shadow-inner">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                <span className="font-extrabold text-sm sm:text-base">
                  Professional CV Generated Successfully!
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/25 text-white">
                  ATS Verified
                </span>
              </div>
              <p className="text-xs text-emerald-100 mt-0.5">
                Targeted for <strong>{currentCv.personalInfo.jobTitle}</strong> in <strong>{currentCv.personalInfo.country}</strong>. Ready for download, print, or customization.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap justify-center">
            <button
              onClick={() => onEditInStudio(currentCv)}
              className="px-3.5 py-1.5 bg-white text-emerald-900 hover:bg-emerald-50 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              id="btn-banner-edit-studio"
            >
              <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Edit Details in Studio</span>
            </button>
            <button
              onClick={() => setShowGeneratorModal(true)}
              className="px-3.5 py-1.5 bg-emerald-800/80 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              id="btn-banner-generate-another"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Generate Another</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Action Header */}
      <div className="no-print bg-white border-b border-slate-200 sticky top-[65px] z-30 px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          {/* Left: Back & Candidate summary */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onNavigate('/')}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-1 text-xs font-bold shrink-0"
              title="Return to Home"
              id="btn-viewcv-back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </button>

            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/20 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h1 className="font-extrabold text-slate-900 text-sm sm:text-base truncate leading-tight">
                  {currentCv.personalInfo.fullName || 'Professional'}
                </h1>
                <p className="text-[11px] text-slate-500 truncate">
                  {currentCv.personalInfo.jobTitle} • {currentCv.personalInfo.location || currentCv.personalInfo.country}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
            {/* Save Button */}
            <button
              onClick={handleSaveToStorage}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                savedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-blue-300'
              }`}
              id="btn-viewcv-save"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved to Library!</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                  <span>Save to My CVs</span>
                </>
              )}
            </button>

            {/* Edit in Studio */}
            <button
              onClick={() => onEditInStudio(currentCv)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-blue-300 rounded-xl text-xs font-bold transition-all shadow-xs"
              id="btn-viewcv-edit-studio"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-600" />
              <span>Edit Details</span>
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all shadow-xs"
              title="Print document"
              id="btn-viewcv-print"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Print</span>
            </button>

            {/* Export / Download Menu */}
            <div className="relative">
              <div className="flex items-center">
                <button
                  onClick={handleDownloadPdf}
                  disabled={isExporting}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-l-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 disabled:opacity-75"
                  id="btn-viewcv-download-pdf"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isExporting ? 'Exporting PDF...' : 'Download PDF'}</span>
                </button>
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="p-2 bg-blue-700 hover:bg-blue-800 text-white rounded-r-xl border-l border-blue-500 transition-colors"
                  aria-label="Export formats"
                  id="btn-viewcv-export-options"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={handleDownloadPdf}
                    className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-600" />
                    <span>Download PDF Document</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-500" />
                    <span>Print Clean Copy</span>
                  </button>
                  <button
                    onClick={handleDownloadTxt}
                    className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Export Plain Text (.txt)</span>
                  </button>
                  <button
                    onClick={handleDownloadJson}
                    className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2"
                  >
                    <FileJson className="w-3.5 h-3.5 text-amber-600" />
                    <span>Export JSON Backup</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 space-y-6">
        {/* Style & Customization Toolbar */}
        <div className="no-print bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Template Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Template:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleTemplateChange(t.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    currentCv.themeConfig.template === t.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Palette Colors & Font */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-blue-600" />
              <span>Accent:</span>
            </span>
            <div className="flex items-center gap-1.5">
              {COLOR_PALETTES.map((c) => (
                <button
                  key={c.name}
                  onClick={() => handleColorChange(c.hex)}
                  className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${
                    currentCv.themeConfig.accentColor === c.hex
                      ? 'ring-2 ring-offset-2 ring-blue-600 scale-110'
                      : ''
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>

            {/* Font switcher */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-700 ml-2">
              <button
                onClick={() => handleFontChange('sans')}
                className={`px-2 py-1 rounded-lg transition-all ${
                  currentCv.themeConfig.font === 'sans' ? 'bg-white shadow-xs text-blue-600' : 'hover:text-slate-900'
                }`}
              >
                Sans
              </button>
              <button
                onClick={() => handleFontChange('serif')}
                className={`px-2 py-1 rounded-lg font-serif transition-all ${
                  currentCv.themeConfig.font === 'serif' ? 'bg-white shadow-xs text-blue-600' : 'hover:text-slate-900'
                }`}
              >
                Serif
              </button>
              <button
                onClick={() => handleFontChange('mono')}
                className={`px-2 py-1 rounded-lg font-mono transition-all ${
                  currentCv.themeConfig.font === 'mono' ? 'bg-white shadow-xs text-blue-600' : 'hover:text-slate-900'
                }`}
              >
                Mono
              </button>
            </div>
          </div>
        </div>

        {/* The Live Rendered Document */}
        <div className="flex justify-center pb-12">
          <div className="w-full max-w-4xl bg-white rounded-3xl p-3 sm:p-6 shadow-xl border border-slate-200">
            <ResponsiveCvPreview data={currentCv} />
          </div>
        </div>

        {/* Quality & ATS Assurance Highlights */}
        <div className="no-print grid grid-cols-1 md:grid-cols-3 gap-4 pb-12">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">ATS Parsing Ready</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Standard headers, hierarchical sectioning, and machine-readable typography conform to modern Applicant Tracking Systems.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Quantifiable Metrics Included</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Experience records feature specific KPIs, percentage gains, and business impact to maximize interview callbacks.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Localized Credentials</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                University degrees, regional phone prefixes, and industry certifications tailored to {currentCv.personalInfo.country}.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Generator Modal for regenerating another profession */}
      {showGeneratorModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs no-print overflow-y-auto"
          onClick={() => setShowGeneratorModal(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8 border border-slate-100 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Generate Another CV</h3>
                  <p className="text-xs text-slate-500">Pick any target job title or country</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGeneratorModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  value={modalFullName}
                  onChange={(e) => setModalFullName(e.target.value)}
                  placeholder="e.g. Jordan Mitchell"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Job Title</label>
                <input
                  type="text"
                  value={modalJobTitle}
                  onChange={(e) => setModalJobTitle(e.target.value)}
                  placeholder="e.g. Senior Product Manager"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Country</label>
                <CountrySelector
                  value={modalCountry}
                  onChange={(c) => setModalCountry(c)}
                  showRandomButton={true}
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowGeneratorModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleGenerateNewCv}
                disabled={isGeneratingModal}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-500/20"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isGeneratingModal ? 'Generating...' : 'Generate New CV'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { ResumeData, IndustryCategory } from '../types/cv';
import { generateRandomCv, INDUSTRIES } from '../data/randomCvs';
import { CvRenderer } from '../components/cv-templates/CvRenderer';
import { ResponsiveCvPreview } from '../components/common/ResponsiveCvPreview';
import { exportCvToPdf, exportCvToJson, exportCvToTxt, printCv } from '../utils/pdfExport';
import { saveResumeToList } from '../utils/storage';
import { triggerReviewPrompt } from '../utils/reviewStorage';
import { CountrySelector } from '../components/robotic/CountrySelector';
import { 
  Sparkles, 
  Edit3, 
  Download, 
  Bookmark, 
  Check, 
  Filter, 
  ZoomIn, 
  ZoomOut,
  Palette,
  AlertCircle,
  Loader2,
  ChevronDown,
  FileJson,
  FileText,
  Printer,
  Globe
} from 'lucide-react';

interface RandomPageProps {
  initialCv?: ResumeData;
  onEditCv: (cv: ResumeData) => void;
  onNavigate: (route: string) => void;
}

export const RandomPage: React.FC<RandomPageProps> = ({ 
  initialCv, 
  onEditCv, 
  onNavigate 
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryCategory | 'Any'>('Any');
  const [selectedCountry, setSelectedCountry] = useState<string>('Any Country (Random)');
  const [currentCv, setCurrentCv] = useState<ResumeData>(() => initialCv || generateRandomCv(undefined, undefined));
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.85);
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleGenerateAnother = () => {
    const nextCv = generateRandomCv(
      selectedIndustry === 'Any' ? undefined : selectedIndustry,
      selectedCountry === 'Any Country (Random)' ? undefined : selectedCountry
    );
    setCurrentCv(nextCv);
    setSavedSuccess(false);
    triggerReviewPrompt('random_generated', 2500);
  };

  const handleSaveLocally = () => {
    saveResumeToList(currentCv);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    setShowExportMenu(false);
    try {
      await exportCvToPdf(currentCv);
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
  };

  const handleTemplateChange = (template: ResumeData['themeConfig']['template']) => {
    setCurrentCv(prev => ({
      ...prev,
      themeConfig: {
        ...prev.themeConfig,
        template,
      }
    }));
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      {/* Top Action & Control Bar */}
      <div className="no-print bg-white border-b border-slate-200 sticky top-[65px] z-20 px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          {/* Left: Info & Industry Filter */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Random Generator
              </span>
              <span className="text-xs font-medium text-slate-500 hidden sm:inline">
                Industry: <strong className="text-slate-800">{currentCv.industry}</strong>
              </span>
            </div>

            {/* Industry Filter */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <Filter className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
              <select
                value={selectedIndustry}
                onChange={(e) => {
                  const val = e.target.value as IndustryCategory | 'Any';
                  setSelectedIndustry(val);
                  const nextCv = generateRandomCv(
                    val === 'Any' ? undefined : val,
                    selectedCountry === 'Any Country (Random)' ? undefined : selectedCountry
                  );
                  setCurrentCv(nextCv);
                }}
                className="bg-transparent text-xs font-medium text-slate-700 focus:outline-hidden pr-2 cursor-pointer"
                id="select-industry-filter"
              >
                <option value="Any">All Industries (Random)</option>
                {INDUSTRIES.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {/* Country Filter / Selector */}
            <div className="w-48 sm:w-64">
              <CountrySelector
                value={selectedCountry}
                onChange={(countryName) => {
                  setSelectedCountry(countryName || 'Any Country (Random)');
                  const nextCv = generateRandomCv(
                    selectedIndustry === 'Any' ? undefined : selectedIndustry,
                    countryName === 'Any Country (Random)' ? undefined : countryName
                  );
                  setCurrentCv(nextCv);
                }}
                allowAnyRandom={true}
                showRandomButton={false}
                placeholder="Filter by country..."
                id="random-page-country-selector"
              />
            </div>
          </div>

          {/* Right: Actions (Generate Another, Edit, Download, Save) */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
            {/* Generate Another */}
            <button
              onClick={handleGenerateAnother}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
              id="btn-generate-another"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Generate Another CV</span>
            </button>

            {/* Edit CV */}
            <button
              onClick={() => onEditCv(currentCv)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors shadow-xs"
              id="btn-edit-random-cv"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit CV</span>
            </button>

            {/* Download / Export Menu */}
            <div className="relative">
              <div className="flex items-center">
                <button
                  onClick={handleDownloadPdf}
                  disabled={isExporting}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-l-xl text-xs font-bold transition-all shadow-xs disabled:opacity-75"
                  id="btn-download-pdf-random"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Exporting PDF...</span>
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
                  className="px-2 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-r-xl text-xs border-l border-blue-500 transition-all"
                  title="More export options"
                  id="btn-export-menu-random"
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

            {/* Save Locally */}
            <button
              onClick={handleSaveLocally}
              disabled={savedSuccess}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-xs ${
                savedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
              id="btn-save-locally-random"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save Locally</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area: Preview & Controls */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 flex flex-col items-center">
        {/* Notice Badge */}
        <div className="no-print mb-6 max-w-2xl w-full bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2.5 rounded-xl text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Fictional sample generated for testing & inspiration. You can edit any details or customize styling.</span>
          </div>
          <button 
            onClick={() => onEditCv(currentCv)}
            className="text-indigo-700 font-bold underline ml-2 whitespace-nowrap hover:text-indigo-900"
          >
            Customize in Editor →
          </button>
        </div>

        {/* Template Quick Switcher Bar */}
        <div className="no-print mb-4 flex flex-wrap items-center justify-between gap-3 w-full max-w-4xl bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 flex-wrap">
            <Palette className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="hidden sm:inline">Theme:</span>
            <div className="flex flex-wrap gap-1">
              {(['modern', 'minimal', 'executive', 'creative', 'compact'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => handleTemplateChange(t)}
                  className={`capitalize px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    currentCv.themeConfig.template === t
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* The Live Document Sheet */}
        <div className="w-full max-w-4xl flex justify-center pb-12">
          <ResponsiveCvPreview data={currentCv} />
        </div>
      </div>
    </div>
  );
};

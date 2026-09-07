import React, { useState } from 'react';
import { RoboticResumeDraft } from '../../../types/roboticResume';
import { CvTemplate, CvFont, CvFontSize, ResumeData } from '../../../types/cv';
import { draftToResumeData, generateRoboticSummary } from '../../../utils/roboticAiEngine';
import { ResponsiveCvPreview } from '../../common/ResponsiveCvPreview';
import { CvTypographyToolbar } from '../../common/CvTypographyToolbar';
import { exportCvToPdf, exportCvToTxt, printCv } from '../../../utils/pdfExport';
import { 
  Download, 
  Printer, 
  Copy, 
  Check, 
  Bookmark, 
  Palette, 
  Layers, 
  CheckCircle2,
  FileText
} from 'lucide-react';

interface PreviewAndExportStepProps {
  draft: RoboticResumeDraft;
  onUpdateDraft: (updated: Partial<RoboticResumeDraft>) => void;
  onSaveVersion: (customName?: string) => void;
}

export const PreviewAndExportStep: React.FC<PreviewAndExportStepProps> = ({
  draft,
  onUpdateDraft,
  onSaveVersion
}) => {
  const [copied, setCopied] = useState(false);
  const [versionNameInput, setVersionNameInput] = useState(
    draft.versionName || `${draft.careerTarget.targetRole} Resume`
  );
  const [versionSaved, setVersionSaved] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const resumeData: ResumeData = draftToResumeData(draft);

  const handleRegenerateWording = () => {
    const tone = draft.wordingTone || 'executive';
    const deepSummary = generateRoboticSummary(draft, tone);
    onUpdateDraft({
      professionalSummary: deepSummary
    });
  };

  const templates: { id: CvTemplate; label: string }[] = [
    { id: 'technical', label: 'Technical (AI/Data)' },
    { id: 'classic', label: 'ATS Classic' },
    { id: 'modern', label: 'Modern Professional' },
    { id: 'minimal', label: 'Clean Minimal' },
    { id: 'executive', label: 'Executive' },
    { id: 'creative', label: 'Creative' }
  ];

  const accentColors = [
    { name: 'Royal Blue', hex: '#2563eb' },
    { name: 'Cyan Tech', hex: '#0284c7' },
    { name: 'Violet AI', hex: '#7c3aed' },
    { name: 'Emerald', hex: '#059669' },
    { name: 'Slate Dark', hex: '#334155' },
    { name: 'Crimson', hex: '#dc2626' }
  ];

  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    try {
      await exportCvToPdf(resumeData);
    } catch (err) {
      console.error('Failed to export PDF', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleDownloadTxt = () => {
    exportCvToTxt(resumeData);
  };

  const handlePrint = () => {
    printCv();
  };

  const handleCopyText = () => {
    const textContent = [
      resumeData.personalInfo.fullName,
      resumeData.personalInfo.jobTitle,
      `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}`,
      '\nSUMMARY',
      resumeData.summary,
      '\nSKILLS',
      resumeData.skills.map(s => s.name).join(', '),
      '\nEXPERIENCE',
      ...resumeData.experience.map(e => `${e.jobTitle} - ${e.company} (${e.startDate} - ${e.current ? 'Present' : e.endDate})\n${e.description}`),
      '\nEDUCATION',
      ...resumeData.education.map(ed => `${ed.degree} in ${ed.fieldOfStudy} - ${ed.school} (${ed.endDate})`)
    ].join('\n');

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveVersionClick = () => {
    onSaveVersion(versionNameInput);
    setVersionSaved(true);
    setTimeout(() => setVersionSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Final Review, Customization & Export</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Choose your preferred ATS template, adjust accents, and download your production-ready A4 resume.
          </p>
        </div>
      </div>

      {/* Control Bar: Templates & Colors */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Template Switcher */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>ATS Template Layout</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {templates.map((tmpl) => {
                const isSelected = (draft.selectedTemplate || 'technical') === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => onUpdateDraft({ selectedTemplate: tmpl.id })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tmpl.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accent Color Picker */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-blue-600" />
              <span>Accent Color</span>
            </label>
            <div className="flex items-center gap-2">
              {accentColors.map((col) => {
                const isSelected = (draft.accentColor || '#2563eb') === col.hex;
                return (
                  <button
                    key={col.hex}
                    type="button"
                    onClick={() => onUpdateDraft({ accentColor: col.hex })}
                    className={`w-6 h-6 rounded-full transition-all cursor-pointer ${
                      isSelected ? 'ring-2 ring-offset-2 ring-slate-900 scale-110' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            id="btn-robotic-download-pdf"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isExportingPdf ? 'Exporting...' : 'Download PDF (A4)'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            id="btn-robotic-print"
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>

          <button
            type="button"
            onClick={handleCopyText}
            id="btn-robotic-copy-text"
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadTxt}
            className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-xs transition-colors cursor-pointer"
          >
            Download .TXT
          </button>

          {/* Version Save Pill */}
          <div className="ml-auto flex items-center gap-2">
            <input
              type="text"
              value={versionNameInput}
              onChange={(e) => setVersionNameInput(e.target.value)}
              placeholder="Version name..."
              className="w-40 px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
            />
            <button
              type="button"
              onClick={handleSaveVersionClick}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                versionSaved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {versionSaved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              <span>{versionSaved ? 'Saved!' : 'Save Version'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Typography & Readability Toolbar */}
      <CvTypographyToolbar
        selectedFont={draft.selectedFont || (draft.selectedTemplate === 'classic' || draft.selectedTemplate === 'executive' ? 'serif' : 'sans')}
        selectedFontSize={draft.fontSize || 'md'}
        selectedSpacing={draft.spacing || 'normal'}
        wordingTone={draft.wordingTone || 'executive'}
        onFontChange={(selectedFont) => onUpdateDraft({ selectedFont })}
        onFontSizeChange={(fontSize) => onUpdateDraft({ fontSize })}
        onSpacingChange={(spacing) => onUpdateDraft({ spacing })}
        onToneChange={(wordingTone) => {
          const deepSummary = generateRoboticSummary({ ...draft, wordingTone }, wordingTone);
          onUpdateDraft({ wordingTone, professionalSummary: deepSummary });
        }}
        onRegenerateWording={handleRegenerateWording}
      />

      {/* Live Preview Container */}
      <div className="w-full bg-slate-100/70 p-4 sm:p-6 rounded-2xl border border-slate-200 overflow-hidden">
        <div className="max-w-4xl mx-auto shadow-lg rounded-xl overflow-hidden bg-white">
          <ResponsiveCvPreview data={resumeData} />
        </div>
      </div>
    </div>
  );
};

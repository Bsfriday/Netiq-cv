import React, { useState, useEffect } from 'react';
import { 
  ResumeData, 
  ExperienceItem, 
  EducationItem, 
  SkillItem, 
  CertificationItem, 
  ProjectItem,
  DocumentAttachment,
  CvTemplate
} from '../types/cv';
import { CvRenderer } from '../components/cv-templates/CvRenderer';
import { ResponsiveCvPreview } from '../components/common/ResponsiveCvPreview';
import { exportCvToPdf, exportCvToJson, exportCvToTxt, printCv } from '../utils/pdfExport';
import { saveDraftToStorage, saveResumeToList } from '../utils/storage';
import { calculateResumeStrength } from '../utils/completion';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  Award, 
  FolderGit2, 
  Palette, 
  Download, 
  Bookmark, 
  Check, 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Eye, 
  ZoomIn, 
  ZoomOut,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Camera,
  Upload,
  Paperclip,
  X,
  FileText,
  FileJson,
  Printer,
  Loader2,
  Image as ImageIcon,
  ExternalLink
} from 'lucide-react';

interface CreatePageProps {
  initialCv: ResumeData;
  onNavigate: (route: string) => void;
}

const COLOR_OPTIONS = [
  { name: 'Royal Blue', value: '#2563eb' },
  { name: 'Deep Blue', value: '#1e3a8a' },
  { name: 'Sky Cyan', value: '#0284c7' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Warm Amber', value: '#d97706' },
  { name: 'Rose', value: '#db2777' },
  { name: 'Violet', value: '#7c3aed' },
  { name: 'Slate Navy', value: '#0f172a' },
];

const TEMPLATE_OPTIONS: { id: CvTemplate; label: string; desc: string }[] = [
  { id: 'modern', label: 'Modern', desc: 'Timeline dots & clean headers' },
  { id: 'professional', label: 'Professional', desc: 'Sleek dark banner header' },
  { id: 'classic', label: 'Classic', desc: 'Traditional serif structure' },
  { id: 'minimal', label: 'Minimal', desc: 'Understated elegance & spacing' },
  { id: 'executive', label: 'Executive', desc: 'Formal framed borders' },
  { id: 'creative', label: 'Creative', desc: 'Two-column colored sidebar' },
  { id: 'compact', label: 'Compact', desc: 'Dense 1-page high yield' },
];

export const CreatePage: React.FC<CreatePageProps> = ({ initialCv, onNavigate }) => {
  const [cv, setCv] = useState<ResumeData>(initialCv);
  const [activeTab, setActiveTab] = useState<'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'certifications' | 'projects' | 'attachments' | 'theme'>('personal');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.85);
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);
  const [showStrengthTips, setShowStrengthTips] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState<string | null>(null);
  const [docUploadError, setDocUploadError] = useState<string | null>(null);
  const [selectedDocForPreview, setSelectedDocForPreview] = useState<DocumentAttachment | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    setShowExportMenu(false);
    try {
      await exportCvToPdf(cv);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadJson = () => {
    exportCvToJson(cv);
    setShowExportMenu(false);
  };

  const handleDownloadTxt = () => {
    exportCvToTxt(cv);
    setShowExportMenu(false);
  };

  const handlePrint = () => {
    printCv();
    setShowExportMenu(false);
  };

  // Resume strength calculation
  const strength = calculateResumeStrength(cv);

  // Auto-save to localStorage on change
  useEffect(() => {
    saveDraftToStorage(cv);
  }, [cv]);

  const handleSaveToList = () => {
    saveResumeToList(cv);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Profile Photo Upload Handlers
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPhotoUploadError(null);
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPhotoUploadError('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setPhotoUploadError('Photo file size must be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setCv(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            photoUrl: dataUrl,
          },
          updatedAt: Date.now(),
        }));
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handlePhotoRemove = () => {
    setCv(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        photoUrl: undefined,
      },
      updatedAt: Date.now(),
    }));
  };

  // Document Attachment Handlers
  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setDocUploadError(null);
    if (!files || files.length === 0) return;

    const fileList: File[] = Array.from(files);
    const maxFiles = fileList.slice(0, 5); // limit batch

    for (const file of maxFiles) {
      if (!file.type.startsWith('image/')) {
        setDocUploadError('Document attachments must be image format (PNG, JPG, WebP).');
        continue;
      }
      if (file.size > 6 * 1024 * 1024) {
        setDocUploadError(`File ${file.name} is larger than 6MB limit.`);
        continue;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          const doc: DocumentAttachment = {
            id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            name: file.name.replace(/\.[^/.]+$/, ''),
            type: file.type,
            dataUrl: dataUrl,
            fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            uploadedAt: Date.now(),
          };
          setCv(prev => ({
            ...prev,
            documentImages: [...(prev.documentImages || []), doc],
            updatedAt: Date.now(),
          }));
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const handleDeleteDoc = (id: string) => {
    setCv(prev => ({
      ...prev,
      documentImages: (prev.documentImages || []).filter(d => d.id !== id),
      updatedAt: Date.now(),
    }));
  };

  // Field change handlers
  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], val: string) => {
    setCv(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: val },
      updatedAt: Date.now(),
    }));
  };

  // Experience handlers
  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    setCv(prev => ({
      ...prev,
      experience: [newExp, ...prev.experience],
      updatedAt: Date.now(),
    }));
  };

  const updateExperience = (id: string, field: keyof ExperienceItem, val: any) => {
    setCv(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, [field]: val } : e),
      updatedAt: Date.now(),
    }));
  };

  const deleteExperience = (id: string) => {
    setCv(prev => ({
      ...prev,
      experience: prev.experience.filter(e => e.id !== id),
      updatedAt: Date.now(),
    }));
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    const list = [...cv.experience];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    setCv(prev => ({ ...prev, experience: list, updatedAt: Date.now() }));
  };

  // Education handlers
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: '',
      fieldOfStudy: '',
      school: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    setCv(prev => ({
      ...prev,
      education: [...prev.education, newEdu],
      updatedAt: Date.now(),
    }));
  };

  const updateEducation = (id: string, field: keyof EducationItem, val: any) => {
    setCv(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, [field]: val } : e),
      updatedAt: Date.now(),
    }));
  };

  const deleteEducation = (id: string) => {
    setCv(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id),
      updatedAt: Date.now(),
    }));
  };

  // Skills handlers
  const addSkill = (name: string = '') => {
    if (!name.trim()) return;
    const newSkill: SkillItem = {
      id: `skill-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      name: name.trim(),
      level: 'Advanced',
    };
    setCv(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill],
      updatedAt: Date.now(),
    }));
  };

  const deleteSkill = (id: string) => {
    setCv(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id),
      updatedAt: Date.now(),
    }));
  };

  // Certifications handlers
  const addCertification = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      credentialId: '',
    };
    setCv(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCert],
      updatedAt: Date.now(),
    }));
  };

  const updateCertification = (id: string, field: keyof CertificationItem, val: string) => {
    setCv(prev => ({
      ...prev,
      certifications: prev.certifications.map(c => c.id === id ? { ...c, [field]: val } : c),
      updatedAt: Date.now(),
    }));
  };

  const deleteCertification = (id: string) => {
    setCv(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id),
      updatedAt: Date.now(),
    }));
  };

  // Projects handlers
  const addProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: '',
      role: '',
      link: '',
      githubUrl: '',
      technologies: '',
      description: '',
    };
    setCv(prev => ({
      ...prev,
      projects: [...prev.projects, newProj],
      updatedAt: Date.now(),
    }));
  };

  const updateProject = (id: string, field: keyof ProjectItem, val: string) => {
    setCv(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, [field]: val } : p),
      updatedAt: Date.now(),
    }));
  };

  const deleteProject = (id: string) => {
    setCv(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
      updatedAt: Date.now(),
    }));
  };

  const [skillInput, setSkillInput] = useState('');

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      {/* Top Action Bar with 3D aesthetic */}
      <div className="no-print bg-white border-b border-slate-200/80 sticky top-[65px] z-20 px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              type="text"
              value={cv.title || 'My Professional Resume'}
              onChange={(e) => setCv(prev => ({ ...prev, title: e.target.value }))}
              className="font-bold text-slate-900 text-sm sm:text-base bg-transparent hover:bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-xl px-2.5 py-1 transition-all border border-transparent hover:border-slate-200"
              placeholder="Resume Name..."
              id="input-resume-title"
            />
            <div className="hidden md:flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Autosaved</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-between sm:justify-end flex-wrap">
            {/* Mobile View Mode Switcher (Pill tab) */}
            <div className="lg:hidden flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 shrink-0">
              <button
                type="button"
                onClick={() => setMobilePreviewOpen(false)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  !mobilePreviewOpen
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                id="btn-mobile-mode-edit"
              >
                <User className="w-3.5 h-3.5" />
                <span>Form</span>
              </button>
              <button
                type="button"
                onClick={() => setMobilePreviewOpen(true)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  mobilePreviewOpen
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                id="btn-mobile-mode-preview"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Save to Local list */}
              <button
                onClick={handleSaveToList}
                className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                  savedSuccess
                    ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-blue-200'
                }`}
                id="btn-save-draft"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span className="hidden xs:inline">Saved!</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                    <span className="hidden xs:inline">Save Draft</span>
                    <span className="xs:hidden">Save</span>
                  </>
                )}
              </button>

              {/* Export / Download Menu */}
              <div className="relative">
                <div className="flex items-center">
                  <button
                    onClick={handleDownloadPdf}
                    disabled={isExporting}
                    className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-l-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 disabled:opacity-75"
                    id="btn-download-pdf-create"
                  >
                    {isExporting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>PDF...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowExportMenu(prev => !prev)}
                    className="px-2 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-r-xl text-xs border-l border-blue-500 transition-all shadow-md shadow-blue-500/20"
                    title="More export options"
                    id="btn-export-menu-create"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-30 animate-in fade-in slide-in-from-top-2">
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
      </div>

      {/* Main Split Layout: Editor & Live Preview */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Section Editor (lg:col-span-6) */}
        <div className={`lg:col-span-6 min-w-0 w-full space-y-5 ${mobilePreviewOpen ? 'hidden lg:block' : 'block'}`}>
          {/* Resume Strength Score Widget */}
          <div className="no-print bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden">
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs">
                  {strength.score}%
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                    <span>Resume Strength</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80">
                      {strength.level}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">{strength.message}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowStrengthTips(!showStrengthTips)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>{showStrengthTips ? 'Hide Tips' : 'Checklist'}</span>
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-sky-500 rounded-full transition-all duration-300"
                style={{ width: `${strength.score}%` }}
              />
            </div>

            {/* Dropdown Checklist / Tips */}
            {showStrengthTips && (
              <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                {strength.sections.map((sec) => (
                  <div key={sec.name} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      {sec.completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      )}
                      <span className={sec.completed ? 'text-slate-700 font-medium' : 'text-slate-600 font-medium'}>
                        {sec.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {sec.score}/{sec.weight} pts
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section Navigation Tabs */}
          <div className="no-print bg-white p-2 rounded-2xl border border-slate-200/90 shadow-xs flex overflow-x-auto gap-1 scrollbar-none">
            {[
              { id: 'personal', label: 'Personal', icon: User },
              { id: 'summary', label: 'Summary', icon: Sliders },
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'education', label: 'Education', icon: GraduationCap },
              { id: 'skills', label: 'Skills', icon: Wrench },
              { id: 'certifications', label: 'Certs', icon: Award },
              { id: 'projects', label: 'Projects', icon: FolderGit2 },
              { id: 'attachments', label: `Docs (${cv.documentImages?.length || 0})`, icon: Paperclip },
              { id: 'theme', label: 'Design', icon: Palette },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  id={`tab-${tab.id}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: Personal Information */}
          {activeTab === 'personal' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">Personal Information</h2>
                <p className="text-xs text-slate-500 mt-0.5">Your contact details, profile photo, and header presence.</p>
              </div>

              {/* Profile Photo Upload Section */}
              <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80 flex flex-col sm:flex-row items-center gap-5">
                <div className="relative group shrink-0">
                  {cv.personalInfo.photoUrl ? (
                    <img
                      src={cv.personalInfo.photoUrl}
                      alt="Profile Preview"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-blue-500 shadow-md shadow-blue-500/10"
                    />
                  ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
                      <Camera className="w-7 h-7 mb-1 text-slate-400" />
                      <span className="text-[10px] font-semibold">No Photo</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <div className="text-sm font-bold text-slate-800">
                    {cv.personalInfo.photoUrl ? 'Profile Photo' : 'Upload Profile Picture (Optional)'}
                  </div>
                  <p className="text-xs text-slate-500">
                    Supports PNG, JPG, or WebP up to 5MB. Rendered cleanly across all 7 resume layouts.
                  </p>

                  {photoUploadError && (
                    <div className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                      {photoUploadError}
                    </div>
                  )}

                  <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{cv.personalInfo.photoUrl ? 'Replace Photo' : 'Upload Photo'}</span>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="input-photo-upload"
                      />
                    </label>

                    {cv.personalInfo.photoUrl && (
                      <button
                        type="button"
                        onClick={handlePhotoRemove}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-600 hover:text-rose-700 border border-slate-200 hover:border-rose-200 rounded-xl text-xs font-bold transition-all"
                        id="btn-remove-photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={cv.personalInfo.fullName}
                    onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                    placeholder="e.g. Jordan Mitchell"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    id="input-fullname"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={cv.personalInfo.jobTitle}
                    onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                    placeholder="e.g. Senior Software Architect"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    id="input-jobtitle"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={cv.personalInfo.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    id="input-email"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={cv.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    id="input-phone"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={cv.personalInfo.location}
                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                    placeholder="City, State or Country"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    id="input-location"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={cv.personalInfo.linkedin || ''}
                    onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                    placeholder="linkedin.com/in/username"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    id="input-linkedin"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">GitHub / Code Link</label>
                  <input
                    type="text"
                    value={cv.personalInfo.github || ''}
                    onChange={(e) => updatePersonalInfo('github', e.target.value)}
                    placeholder="github.com/username"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    id="input-github"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Portfolio or Website</label>
                  <input
                    type="text"
                    value={cv.personalInfo.website || ''}
                    onChange={(e) => updatePersonalInfo('website', e.target.value)}
                    placeholder="portfolio.example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    id="input-website"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Summary */}
          {activeTab === 'summary' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
              <div>
                <h2 className="text-xl font-black text-slate-900">Professional Summary</h2>
                <p className="text-xs text-slate-500 mt-0.5">A concise overview of your background, strengths, and career highlights.</p>
              </div>

              <div>
                <textarea
                  rows={6}
                  value={cv.summary}
                  onChange={(e) => setCv(prev => ({ ...prev, summary: e.target.value, updatedAt: Date.now() }))}
                  placeholder="Experienced professional with proven track record in..."
                  className="w-full px-3.5 py-3 rounded-2xl border border-slate-200 text-sm leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  id="textarea-summary"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Work Experience */}
          {activeTab === 'experience' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Work Experience</h2>
                  <p className="text-xs text-slate-500">Add, edit, or reorder your employment history.</p>
                </div>
                <button
                  onClick={addExperience}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                  id="btn-add-experience"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Role</span>
                </button>
              </div>

              {cv.experience.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 text-center border border-dashed border-slate-300">
                  <p className="text-xs text-slate-500 mb-3">No work experiences added yet.</p>
                  <button
                    onClick={addExperience}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                  >
                    + Add First Work Experience
                  </button>
                </div>
              ) : (
                cv.experience.map((exp, index) => (
                  <div key={exp.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
                    {/* Header with Reordering & Delete */}
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Experience #{index + 1}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveExperience(index, 'up')}
                          disabled={index === 0}
                          className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30 rounded-md"
                          title="Move up"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveExperience(index, 'down')}
                          disabled={index === cv.experience.length - 1}
                          className="p-1 text-slate-400 hover:text-slate-800 disabled:opacity-30 rounded-md"
                          title="Move down"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteExperience(exp.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-md ml-1"
                          title="Delete role"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Job Title</label>
                        <input
                          type="text"
                          value={exp.jobTitle}
                          onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                          placeholder="e.g. Lead Engineer"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          placeholder="e.g. Acme Corp"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Location</label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                          placeholder="e.g. San Francisco, CA"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Start Date</label>
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            placeholder="2021-03"
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">End Date</label>
                          <input
                            type="text"
                            value={exp.endDate}
                            disabled={exp.current}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            placeholder={exp.current ? 'Present' : '2023-11'}
                            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs disabled:bg-slate-100 focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          id={`current-${exp.id}`}
                          checked={exp.current}
                          onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor={`current-${exp.id}`} className="text-xs font-medium text-slate-700 cursor-pointer">
                          I currently work in this role
                        </label>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Description & Bullet Points</label>
                        <textarea
                          rows={3}
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          placeholder="• Led cross-functional team of 6 engineers...&#10;• Increased system reliability by 30%..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs leading-relaxed focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: Education */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Education</h2>
                  <p className="text-xs text-slate-500">Your academic degrees, colleges, and honors.</p>
                </div>
                <button
                  onClick={addEducation}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                  id="btn-add-education"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Degree</span>
                </button>
              </div>

              {cv.education.map((edu, index) => (
                <div key={edu.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Education #{index + 1}</span>
                    <button
                      onClick={() => deleteEducation(edu.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Degree / Qualification</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        placeholder="e.g. B.S. in Computer Science"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Field of Study / Major</label>
                      <input
                        type="text"
                        value={edu.fieldOfStudy || ''}
                        onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                        placeholder="e.g. Software Engineering & Systems"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">School / University</label>
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                        placeholder="e.g. University of California, Berkeley"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Location</label>
                      <input
                        type="text"
                        value={edu.location}
                        onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                        placeholder="e.g. Berkeley, CA"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Start Date</label>
                        <input
                          type="text"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                          placeholder="2016-09"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">End Date</label>
                        <input
                          type="text"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                          placeholder="2020-06"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Honors / Extra Info</label>
                      <input
                        type="text"
                        value={edu.description}
                        onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                        placeholder="Graduated Magna Cum Laude, Dean's Honor List"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: Skills */}
          {activeTab === 'skills' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">Skills & Competencies</h2>
                <p className="text-xs text-slate-500 mt-0.5">Type a skill and press Enter or click Add.</p>
              </div>

              {/* Add Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(skillInput);
                      setSkillInput('');
                    }
                  }}
                  placeholder="e.g. TypeScript, React, SQL, Cloud Architecture..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  id="input-skill-name"
                />
                <button
                  type="button"
                  onClick={() => {
                    addSkill(skillInput);
                    setSkillInput('');
                  }}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                  id="btn-add-skill-tag"
                >
                  Add Skill
                </button>
              </div>

              {/* Skills Tags List */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Current Skills ({cv.skills.length})
                </div>
                <div className="flex flex-wrap gap-2 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 min-h-[100px]">
                  {cv.skills.length === 0 ? (
                    <span className="text-xs text-slate-400 italic">No skills added yet.</span>
                  ) : (
                    cv.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-800 rounded-xl text-xs font-medium shadow-2xs group"
                      >
                        <span>{skill.name}</span>
                        <button
                          type="button"
                          onClick={() => deleteSkill(skill.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors ml-0.5"
                        >
                          ×
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Certifications */}
          {activeTab === 'certifications' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Certifications & Credentials</h2>
                  <p className="text-xs text-slate-500">Professional credentials, licenses, and verified certifications.</p>
                </div>
                <button
                  onClick={addCertification}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Certification</span>
                </button>
              </div>

              {cv.certifications.map((cert) => (
                <div key={cert.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">Certification Record</span>
                    <button
                      onClick={() => deleteCertification(cert.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Certification Name</label>
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                        placeholder="e.g. AWS Certified Solutions Architect – Associate"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Issuing Organization</label>
                      <input
                        type="text"
                        value={cert.issuer}
                        onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                        placeholder="e.g. Amazon Web Services"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Date Issued</label>
                      <input
                        type="text"
                        value={cert.date}
                        onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                        placeholder="2023-04"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Credential ID or URL (Optional)</label>
                      <input
                        type="text"
                        value={cert.credentialId || ''}
                        onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                        placeholder="e.g. AWS-8923471"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 7: Projects */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Projects & Portfolio</h2>
                  <p className="text-xs text-slate-500">Showcase relevant personal, open-source, or client projects.</p>
                </div>
                <button
                  onClick={addProject}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              {cv.projects.map((proj) => (
                <div key={proj.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">Project Record</span>
                    <button
                      onClick={() => deleteProject(proj.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Project Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => updateProject(proj.id, 'title', e.target.value)}
                        placeholder="e.g. OpenPulse Telemetry"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Role / Subtitle</label>
                      <input
                        type="text"
                        value={proj.role || ''}
                        onChange={(e) => updateProject(proj.id, 'role', e.target.value)}
                        placeholder="e.g. Lead Author"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Technologies Used</label>
                      <input
                        type="text"
                        value={proj.technologies || ''}
                        onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                        placeholder="e.g. React, Node.js, TypeScript, PostgreSQL"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                        placeholder="Brief summary of what you built and the impact..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 8: Attachments & Document Images */}
          {activeTab === 'attachments' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">Document Attachments</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Attach certificate scans, diplomas, recommendations, or credential images.
                    </p>
                  </div>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      multiple
                      onChange={handleDocUpload}
                      className="hidden"
                      id="input-doc-upload"
                    />
                  </label>
                </div>
              </div>

              {docUploadError && (
                <div className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-2 rounded-xl border border-rose-200">
                  {docUploadError}
                </div>
              )}

              {(!cv.documentImages || cv.documentImages.length === 0) ? (
                <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center space-y-3 bg-slate-50/50">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                    <Paperclip className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-bold text-slate-800">No Document Images Attached</div>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Upload image credentials (AWS certificates, degrees, awards) to store securely with your resume.
                  </p>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-blue-600 border border-blue-200 rounded-xl text-xs font-bold transition-all shadow-2xs">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Choose Images to Upload</span>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      multiple
                      onChange={handleDocUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cv.documentImages.map((doc) => (
                    <div
                      key={doc.id}
                      className="bg-slate-50/70 group p-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 transition-all flex flex-col justify-between"
                    >
                      <div className="flex gap-3 items-start">
                        <div
                          onClick={() => setSelectedDocForPreview(doc)}
                          className="w-16 h-16 rounded-xl bg-white border border-slate-200 overflow-hidden cursor-pointer shrink-0 shadow-2xs hover:opacity-90"
                        >
                          <img
                            src={doc.dataUrl}
                            alt={doc.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate" title={doc.name}>
                            {doc.name}
                          </h4>
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            {doc.fileSize || 'Image'}
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedDocForPreview(doc)}
                            className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-1.5"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Preview</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-200/80 text-[10px] text-slate-400">
                        <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteDoc(doc.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Remove attachment"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 9: Theme & Design */}
          {activeTab === 'theme' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">Design & Layout</h2>
                <p className="text-xs text-slate-500 mt-0.5">Customize typography, accent colors, and template layout.</p>
              </div>

              {/* Template Choice */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Choose Template (7 Layouts)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {TEMPLATE_OPTIONS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setCv(prev => ({ ...prev, themeConfig: { ...prev.themeConfig, template: t.id } }))}
                      className={`p-3 rounded-2xl border text-left font-bold text-xs transition-all ${
                        cv.themeConfig.template === t.id
                          ? 'border-blue-600 bg-blue-50/70 text-blue-950 shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="capitalize">{t.label}</div>
                      <div className="text-[10px] font-normal text-slate-400 mt-0.5">
                        {t.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent Color Picker */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Accent Color</label>
                <div className="flex flex-wrap gap-3">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setCv(prev => ({ ...prev, themeConfig: { ...prev.themeConfig, accentColor: c.value } }))}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-xs"
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                    >
                      {cv.themeConfig.accentColor === c.value && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Choice */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Typography Font Family</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCv(prev => ({ ...prev, themeConfig: { ...prev.themeConfig, font: 'sans' } }))}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                      cv.themeConfig.font === 'sans'
                        ? 'border-blue-600 bg-blue-50/70 text-blue-950 font-bold'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="font-sans font-bold">Sans-Serif</div>
                    <div className="text-[10px] text-slate-400">Plus Jakarta Sans</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCv(prev => ({ ...prev, themeConfig: { ...prev.themeConfig, font: 'serif' } }))}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                      cv.themeConfig.font === 'serif'
                        ? 'border-blue-600 bg-blue-50/70 text-blue-950 font-bold'
                        : 'border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="font-serif font-bold">Serif</div>
                    <div className="text-[10px] text-slate-400">Merriweather Classic</div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Live Interactive Document Preview (lg:col-span-6) */}
        <div className={`lg:col-span-6 min-w-0 w-full space-y-4 ${mobilePreviewOpen ? 'block' : 'hidden lg:block'}`}>
          <ResponsiveCvPreview data={cv} />
        </div>
      </div>

      {/* Document Image Modal Preview */}
      {selectedDocForPreview && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs no-print"
          onClick={() => setSelectedDocForPreview(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedDocForPreview.name}</h3>
                <p className="text-xs text-slate-500">Document Attachment Preview ({selectedDocForPreview.fileSize || 'Image'})</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={selectedDocForPreview.dataUrl}
                  download={`${selectedDocForPreview.name}.png`}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedDocForPreview(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
                  title="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center bg-slate-100/60 rounded-2xl p-4 min-h-[300px]">
              <img
                src={selectedDocForPreview.dataUrl}
                alt={selectedDocForPreview.name}
                className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

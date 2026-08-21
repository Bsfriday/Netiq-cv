import React, { useState, useEffect } from 'react';
import { ResumeData } from '../types/cv';
import { getSavedResumesList, deleteSavedResume, duplicateSavedResume, renameSavedResume } from '../utils/storage';
import { exportCvToPdf, exportCvToJson } from '../utils/pdfExport';
import { 
  Bookmark, 
  Trash2, 
  Edit3, 
  FileText, 
  Calendar, 
  ArrowRight,
  Plus,
  Copy,
  Pencil,
  Sparkles,
  Paperclip,
  User,
  Download,
  Loader2
} from 'lucide-react';

interface SavedPageProps {
  onSelectResume: (cv: ResumeData) => void;
  onNavigate: (route: string) => void;
  onCreateNew: () => void;
}

export const SavedPage: React.FC<SavedPageProps> = ({ 
  onSelectResume, 
  onNavigate, 
  onCreateNew 
}) => {
  const [savedList, setSavedList] = useState<ResumeData[]>([]);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameTitle, setRenameTitle] = useState('');
  const [exportingId, setExportingId] = useState<string | null>(null);

  const refreshList = () => {
    setSavedList(getSavedResumesList());
  };

  useEffect(() => {
    refreshList();
  }, []);

  const handleExportDirect = async (cv: ResumeData, e: React.MouseEvent) => {
    e.stopPropagation();
    setExportingId(cv.id);
    try {
      await exportCvToPdf(cv);
    } finally {
      setExportingId(null);
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this saved resume from local storage?')) {
      deleteSavedResume(id);
      refreshList();
    }
  };

  const handleDuplicate = (cv: ResumeData, e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateSavedResume(cv);
    refreshList();
  };

  const startRename = (cv: ResumeData, e: React.MouseEvent) => {
    e.stopPropagation();
    setRenamingId(cv.id);
    setRenameTitle(cv.title || cv.personalInfo.fullName || 'My Resume');
  };

  const saveRename = (id: string, e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (renameTitle.trim()) {
      renameSavedResume(id, renameTitle.trim());
      setRenamingId(null);
      refreshList();
    }
  };

  const formatDate = (timestamp: number) => {
    try {
      return new Date(timestamp).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-8 shadow-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Bookmark className="w-4 h-4" />
              <span>Browser Storage Vault</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              My Saved Resumes
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Stored securely in your local browser. Edit, duplicate, rename, or export at any time.
            </p>
          </div>

          <button
            onClick={onCreateNew}
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-2xl text-xs font-bold transition-all shadow-md shadow-blue-500/20"
            id="btn-create-new-saved-page"
          >
            <Plus className="w-4 h-4" />
            <span>Create New CV</span>
          </button>
        </div>
      </div>

      {/* Main Saved Resumes List */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-8">
        {savedList.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] max-w-md mx-auto my-8 space-y-4">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Saved Resumes Yet</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              When you generate random CVs or create your own, click "Save Draft" to keep them safely stored here.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => onNavigate('/random')}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
              >
                Try Random CV
              </button>
              <button
                onClick={onCreateNew}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                Create My CV
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {savedList.map((cv) => (
              <div
                key={cv.id}
                onClick={() => onSelectResume(cv)}
                className="bg-white group cursor-pointer p-6 rounded-3xl border border-slate-200/90 shadow-[0_10px_30px_-10px_rgba(37,99,235,0.08)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.18)] hover:border-blue-300 hover:-translate-y-1 transition-all flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-sky-400 opacity-60" />

                <div>
                  <div className="flex justify-between items-start mb-2 gap-2">
                    {renamingId === cv.id ? (
                      <form onSubmit={(e) => saveRename(cv.id, e)} className="flex items-center gap-1.5 w-full">
                        <input
                          type="text"
                          value={renameTitle}
                          onChange={(e) => setRenameTitle(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          autoFocus
                          className="text-sm font-bold text-slate-900 border border-blue-400 rounded-lg px-2 py-1 flex-1 focus:outline-hidden"
                        />
                        <button
                          type="submit"
                          className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold"
                        >
                          Save
                        </button>
                      </form>
                    ) : (
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                          {cv.title || cv.personalInfo.fullName || 'Untitled CV'}
                        </h3>
                        <button
                          onClick={(e) => startRename(cv, e)}
                          className="text-slate-400 hover:text-slate-700 p-0.5"
                          title="Rename"
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-blue-50 text-blue-700 uppercase tracking-wider border border-blue-100 shrink-0">
                      {cv.themeConfig?.template || 'modern'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    {cv.personalInfo.photoUrl ? (
                      <img
                        src={cv.personalInfo.photoUrl}
                        alt={cv.personalInfo.fullName}
                        className="w-11 h-11 rounded-2xl object-cover border border-slate-200 shadow-xs shrink-0"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                        {cv.personalInfo.fullName ? cv.personalInfo.fullName.charAt(0).toUpperCase() : <User className="w-5 h-5 text-blue-500" />}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-slate-800 truncate">
                        {cv.personalInfo.fullName || 'Unnamed Candidate'}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {cv.personalInfo.jobTitle || 'No title set'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formatDate(cv.updatedAt)}</span>
                    </div>

                    {(cv.documentImages && cv.documentImages.length > 0) && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">
                        <Paperclip className="w-3 h-3" />
                        <span>{cv.documentImages.length} {cv.documentImages.length === 1 ? 'Doc' : 'Docs'}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Open in Editor</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleExportDirect(cv, e)}
                      disabled={exportingId === cv.id}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                      title="Download PDF"
                    >
                      {exportingId === cv.id ? (
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={(e) => handleDuplicate(cv, e)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                      title="Duplicate resume"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(cv.id, e)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                      title="Delete saved resume"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { RoboticResumeVersion, RoboticResumeDraft } from '../../types/roboticResume';
import { 
  getRoboticVersions, 
  deleteRoboticVersion, 
  duplicateRoboticVersion, 
  renameRoboticVersion 
} from '../../utils/roboticStorage';
import { exportCvToPdf } from '../../utils/pdfExport';
import { 
  Layers, 
  Edit3, 
  Copy, 
  Trash2, 
  Download, 
  ChevronLeft, 
  Plus, 
  FileText, 
  Check, 
  Edit2
} from 'lucide-react';

interface RoboticVersionManagerProps {
  onLoadVersion: (draft: RoboticResumeDraft) => void;
  onNewResume: () => void;
  onExit: () => void;
}

export const RoboticVersionManager: React.FC<RoboticVersionManagerProps> = ({
  onLoadVersion,
  onNewResume,
  onExit
}) => {
  const [versions, setVersions] = useState<RoboticResumeVersion[]>(() => getRoboticVersions());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNameValue, setEditNameValue] = useState('');

  const refreshList = () => {
    setVersions(getRoboticVersions());
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteRoboticVersion(id);
      refreshList();
    }
  };

  const handleDuplicate = (id: string) => {
    duplicateRoboticVersion(id);
    refreshList();
  };

  const handleStartRename = (ver: RoboticResumeVersion) => {
    setEditingId(ver.id);
    setEditNameValue(ver.name);
  };

  const handleSaveRename = (id: string) => {
    if (editNameValue.trim()) {
      renameRoboticVersion(id, editNameValue.trim());
      refreshList();
    }
    setEditingId(null);
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn pb-16" id="robotic-version-manager">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onExit}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Resume Management
            </span>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              My Saved Resume Versions ({versions.length})
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={onNewResume}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Resume</span>
        </button>
      </div>

      {versions.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border-2 border-dashed border-slate-200 bg-white shadow-xs space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">No Saved Resume Versions Yet</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mt-1">
              Create tailored resume versions for different jobs (e.g. one for AI Data Annotator, one for QA Tester).
            </p>
          </div>
          <button
            type="button"
            onClick={onNewResume}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Launch Resume Builder</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {versions.map((ver) => {
            const isEditing = editingId === ver.id;
            const updatedDate = new Date(ver.updatedAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });

            return (
              <div
                key={ver.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    {isEditing ? (
                      <div className="flex items-center gap-1 grow">
                        <input
                          type="text"
                          value={editNameValue}
                          onChange={(e) => setEditNameValue(e.target.value)}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-blue-500 bg-white grow"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveRename(ver.id)}
                          className="p-1 rounded text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="grow">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900 leading-snug">
                            {ver.name}
                          </h3>
                          <button
                            type="button"
                            onClick={() => handleStartRename(ver)}
                            className="text-slate-400 hover:text-slate-600 p-0.5"
                            title="Rename"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                          {ver.targetRole} • Updated {updatedDate}
                        </span>
                      </div>
                    )}

                    {ver.atsScore !== undefined && (
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold shrink-0 ${
                        ver.atsScore >= 80 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        ver.atsScore >= 60 ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {ver.atsScore}% ATS
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-600 line-clamp-2 mt-1">
                    {ver.resumeData?.summary || 'No summary configured.'}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onLoadVersion(ver.draftState)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => exportCvToPdf(ver.resumeData)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs flex items-center gap-1 transition-colors cursor-pointer"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">PDF</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDuplicate(ver.id)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs flex items-center gap-1 transition-colors cursor-pointer"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Copy</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(ver.id, ver.name)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Version"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

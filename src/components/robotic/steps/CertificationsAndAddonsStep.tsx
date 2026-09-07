import React, { useState } from 'react';
import { RoboticCertificationItem, RoboticAdditionalInfo } from '../../../types/roboticResume';
import { Award, Plus, Trash2, Globe, FolderGit2, Check } from 'lucide-react';

interface CertificationsAndAddonsStepProps {
  certifications: RoboticCertificationItem[];
  onCertificationsChange: (updated: RoboticCertificationItem[]) => void;
  additionalInfo: RoboticAdditionalInfo;
  onAdditionalInfoChange: (updated: RoboticAdditionalInfo) => void;
}

export const CertificationsAndAddonsStep: React.FC<CertificationsAndAddonsStepProps> = ({
  certifications,
  onCertificationsChange,
  additionalInfo,
  onAdditionalInfoChange
}) => {
  const [showProjects, setShowProjects] = useState((additionalInfo.projects || []).length > 0);
  const [showLanguages, setShowLanguages] = useState((additionalInfo.languages || []).length > 0);

  // Certifications handlers
  const handleAddCert = () => {
    const newCert: RoboticCertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      date: '',
      credentialId: '',
      url: ''
    };
    onCertificationsChange([...certifications, newCert]);
  };

  const handleUpdateCert = (index: number, field: keyof RoboticCertificationItem, value: string) => {
    const copy = [...certifications];
    copy[index] = { ...copy[index], [field]: value };
    onCertificationsChange(copy);
  };

  const handleRemoveCert = (index: number) => {
    onCertificationsChange(certifications.filter((_, i) => i !== index));
  };

  // Projects handlers
  const handleAddProject = () => {
    const projects = additionalInfo.projects || [];
    const newProj = {
      id: `proj-${Date.now()}`,
      title: '',
      description: '',
      tech: '',
      link: ''
    };
    onAdditionalInfoChange({ ...additionalInfo, projects: [...projects, newProj] });
  };

  const handleUpdateProject = (index: number, field: string, value: string) => {
    const projects = [...(additionalInfo.projects || [])];
    projects[index] = { ...projects[index], [field]: value };
    onAdditionalInfoChange({ ...additionalInfo, projects });
  };

  const handleRemoveProject = (index: number) => {
    const projects = (additionalInfo.projects || []).filter((_, i) => i !== index);
    onAdditionalInfoChange({ ...additionalInfo, projects });
  };

  // Languages handlers
  const handleAddLanguage = () => {
    const langs = additionalInfo.languages || [];
    const newLang = {
      id: `lang-${Date.now()}`,
      language: '',
      proficiency: 'Fluent' as const
    };
    onAdditionalInfoChange({ ...additionalInfo, languages: [...langs, newLang] });
  };

  const handleUpdateLanguage = (index: number, field: string, value: any) => {
    const langs = [...(additionalInfo.languages || [])];
    langs[index] = { ...langs[index], [field]: value };
    onAdditionalInfoChange({ ...additionalInfo, languages: langs });
  };

  const handleRemoveLanguage = (index: number) => {
    const langs = (additionalInfo.languages || []).filter((_, i) => i !== index);
    onAdditionalInfoChange({ ...additionalInfo, languages: langs });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          <span>Certifications & Additional Sections</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Add industry credentials (e.g. AWS, ISTQB, Google, Coursera) and showcase projects or languages.
        </p>
      </div>

      {/* Certifications Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Certifications & Licenses ({certifications.length})
          </label>
          <button
            type="button"
            onClick={handleAddCert}
            className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Certification</span>
          </button>
        </div>

        {certifications.length === 0 ? (
          <div className="p-4 text-center rounded-xl border border-dashed border-slate-200 text-xs text-slate-500 bg-slate-50">
            No certifications added. You can skip this or add relevant credentials.
          </div>
        ) : (
          <div className="space-y-3">
            {certifications.map((cert, idx) => (
              <div
                key={cert.id || idx}
                className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">
                    Certification #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCert(idx)}
                    className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Certificate Name
                    </label>
                    <input
                      type="text"
                      value={cert.name}
                      onChange={(e) => handleUpdateCert(idx, 'name', e.target.value)}
                      placeholder="e.g. ISTQB Certified Tester Foundation Level"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Issuing Organization
                    </label>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => handleUpdateCert(idx, 'issuer', e.target.value)}
                      placeholder="e.g. ASTQB / Google / DeepLearning.AI"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Issue Date / Year
                    </label>
                    <input
                      type="text"
                      value={cert.date}
                      onChange={(e) => handleUpdateCert(idx, 'date', e.target.value)}
                      placeholder="e.g. 2023"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Credential ID or URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={cert.credentialId || cert.url || ''}
                      onChange={(e) => handleUpdateCert(idx, 'credentialId', e.target.value)}
                      placeholder="e.g. ID: 89410 or verification link"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Projects Toggle & List */}
      <div className="pt-3 border-t border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Technical / AI Projects
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              if (!showProjects && (additionalInfo.projects || []).length === 0) {
                handleAddProject();
              }
              setShowProjects(!showProjects);
            }}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline cursor-pointer"
          >
            {showProjects ? 'Hide Projects' : '+ Add Projects Section'}
          </button>
        </div>

        {showProjects && (
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            {(additionalInfo.projects || []).map((proj, idx) => (
              <div key={proj.id || idx} className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-700">Project #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(idx)}
                    className="text-xs text-rose-500 hover:text-rose-700 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => handleUpdateProject(idx, 'title', e.target.value)}
                    placeholder="Project Title (e.g. LLM Evaluation Benchmark)"
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  />
                  <input
                    type="text"
                    value={proj.tech || ''}
                    onChange={(e) => handleUpdateProject(idx, 'tech', e.target.value)}
                    placeholder="Technologies (e.g. Python, Promptfoo, JSON)"
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                  />
                </div>
                <textarea
                  rows={2}
                  value={proj.description}
                  onChange={(e) => handleUpdateProject(idx, 'description', e.target.value)}
                  placeholder="Summary of deliverables and quantitative outcomes..."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddProject}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Another Project</span>
            </button>
          </div>
        )}
      </div>

      {/* Languages Toggle & List */}
      <div className="pt-3 border-t border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Languages
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              if (!showLanguages && (additionalInfo.languages || []).length === 0) {
                handleAddLanguage();
              }
              setShowLanguages(!showLanguages);
            }}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline cursor-pointer"
          >
            {showLanguages ? 'Hide Languages' : '+ Add Languages Section'}
          </button>
        </div>

        {showLanguages && (
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            {(additionalInfo.languages || []).map((lang, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={lang.language}
                  onChange={(e) => handleUpdateLanguage(idx, 'language', e.target.value)}
                  placeholder="e.g. English, Spanish, German"
                  className="grow px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                />
                <select
                  value={lang.proficiency}
                  onChange={(e) => handleUpdateLanguage(idx, 'proficiency', e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                >
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Professional">Professional</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                </select>
                <button
                  type="button"
                  onClick={() => handleRemoveLanguage(idx)}
                  className="text-slate-400 hover:text-rose-500 cursor-pointer p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddLanguage}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Another Language</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

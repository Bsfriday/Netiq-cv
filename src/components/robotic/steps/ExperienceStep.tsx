import React, { useState } from 'react';
import { RoboticExperienceItem } from '../../../types/roboticResume';
import { enhanceExperienceBullets } from '../../../utils/roboticAiEngine';
import { Briefcase, Plus, Trash2, Sparkles, Calendar, MapPin, Building, Wrench } from 'lucide-react';

interface ExperienceStepProps {
  experience: RoboticExperienceItem[];
  onChange: (updated: RoboticExperienceItem[]) => void;
  targetRole?: string;
}

export const ExperienceStep: React.FC<ExperienceStepProps> = ({
  experience,
  onChange,
  targetRole
}) => {
  const [polishingIndex, setPolishingIndex] = useState<number | null>(null);

  const handleAddExperience = () => {
    const newEntry: RoboticExperienceItem = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: '',
      achievements: '',
      toolsUsed: ''
    };
    onChange([...experience, newEntry]);
  };

  const handleUpdate = (index: number, field: keyof RoboticExperienceItem, value: any) => {
    const copy = [...experience];
    copy[index] = {
      ...copy[index],
      [field]: value
    };
    onChange(copy);
  };

  const handleRemove = (index: number) => {
    onChange(experience.filter((_, idx) => idx !== index));
  };

  const handlePolishBullets = (index: number) => {
    setPolishingIndex(index);
    const item = experience[index];
    setTimeout(() => {
      const enhanced = enhanceExperienceBullets(item.responsibilities, targetRole);
      if (enhanced.length > 0) {
        handleUpdate(index, 'responsibilities', enhanced.map(b => `• ${b}`).join('\n'));
      }
      setPolishingIndex(null);
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <span>Professional Work Experience</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Add your genuine career history. Use the AI Action-Verb Polish to format your responsibilities into high-impact ATS bullet points without inventing claims.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddExperience}
          className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          id="btn-robotic-add-exp"
        >
          <Plus className="w-4 h-4" />
          <span>Add Position</span>
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-10 px-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-700 mb-1">No Experience Added Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            If you are a student or career changer, you can add internships, freelance projects, or relevant academic lab work.
          </p>
          <button
            type="button"
            onClick={handleAddExperience}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-500 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Position</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {experience.map((exp, idx) => (
            <div
              key={exp.id || idx}
              className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4 transition-all"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Position #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Job Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Job Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => handleUpdate(idx, 'jobTitle', e.target.value)}
                    placeholder="e.g. AI Data Evaluator or Junior QA Analyst"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-xs font-semibold text-slate-900 bg-white"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Company / Organization <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleUpdate(idx, 'company', e.target.value)}
                      placeholder="e.g. Outlier AI, Telus Digital, or Acme Labs"
                      className="w-full pl-8 pr-3.5 py-2 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-xs font-medium text-slate-900 bg-white"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => handleUpdate(idx, 'location', e.target.value)}
                      placeholder="e.g. Remote or San Francisco, CA"
                      className="w-full pl-8 pr-3.5 py-2 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-xs font-medium text-slate-900 bg-white"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Timeline (YYYY-MM)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => handleUpdate(idx, 'startDate', e.target.value)}
                      placeholder="2023-06"
                      className="w-1/2 px-2.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900"
                    />
                    <span className="text-xs text-slate-400">to</span>
                    {exp.current ? (
                      <span className="w-1/2 py-2 px-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700 text-center">
                        Present
                      </span>
                    ) : (
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => handleUpdate(idx, 'endDate', e.target.value)}
                        placeholder="2024-08"
                        className="w-1/2 px-2.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900"
                      />
                    )}
                  </div>
                  <label className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-600 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => handleUpdate(idx, 'current', e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>I currently work here</span>
                  </label>
                </div>
              </div>

              {/* Responsibilities with AI Polish Button */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Responsibilities & Deliverables
                  </label>
                  <button
                    type="button"
                    onClick={() => handlePolishBullets(idx)}
                    disabled={polishingIndex === idx || !exp.responsibilities.trim()}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 disabled:opacity-50 text-indigo-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{polishingIndex === idx ? 'Polishing...' : 'Polish with Action Verbs'}</span>
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={exp.responsibilities}
                  onChange={(e) => handleUpdate(idx, 'responsibilities', e.target.value)}
                  placeholder="• Evaluated generative model responses across truthfulness and instruction-following metrics.&#10;• Identified 45+ subtle hallucinations in complex legal and technical queries."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-xs text-slate-800 leading-relaxed font-sans"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Tip: Start each line with an action verb (e.g. Evaluated, Validated, Tested, Documented, Investigated).
                </p>
              </div>

              {/* Tools & Technologies Used */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Wrench className="w-3 h-3 text-slate-400" />
                  <span>Tools & Technologies Used In This Role (Optional)</span>
                </label>
                <input
                  type="text"
                  value={exp.toolsUsed || ''}
                  onChange={(e) => handleUpdate(idx, 'toolsUsed', e.target.value)}
                  placeholder="e.g. Labelbox, Postman, Jira, Python, Google Sheets"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-xs text-slate-900"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddExperience}
            className="w-full py-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/50 text-slate-600 hover:text-blue-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Experience</span>
          </button>
        </div>
      )}
    </div>
  );
};

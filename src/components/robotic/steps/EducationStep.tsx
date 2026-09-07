import React from 'react';
import { RoboticEducationItem } from '../../../types/roboticResume';
import { GraduationCap, Plus, Trash2, Building, Calendar, MapPin } from 'lucide-react';

interface EducationStepProps {
  education: RoboticEducationItem[];
  onChange: (updated: RoboticEducationItem[]) => void;
}

export const EducationStep: React.FC<EducationStepProps> = ({ education, onChange }) => {
  const handleAdd = () => {
    const newEdu: RoboticEducationItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startYear: '',
      graduationYear: '',
      current: false,
      coursework: '',
      achievements: ''
    };
    onChange([...education, newEdu]);
  };

  const handleUpdate = (index: number, field: keyof RoboticEducationItem, value: any) => {
    const copy = [...education];
    copy[index] = {
      ...copy[index],
      [field]: value
    };
    onChange(copy);
  };

  const handleRemove = (index: number) => {
    onChange(education.filter((_, idx) => idx !== index));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <span>Education & Degrees</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Add your degrees, diplomas, or relevant secondary education. ATS parsers extract degree level and major for minimum requirement checks.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-10 px-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50">
          <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-700 mb-1">No Education Entries Added</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            If you are self-taught or bootcamp-educated, add your high school diploma, collegiate credits, or program completion here.
          </p>
          <button
            type="button"
            onClick={handleAdd}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-500 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Education</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {education.map((edu, idx) => (
            <div
              key={edu.id || idx}
              className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Education Entry #{idx + 1}
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
                {/* Institution */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Institution / University / School <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleUpdate(idx, 'institution', e.target.value)}
                      placeholder="e.g. University of Texas at Austin"
                      className="w-full pl-8 pr-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white"
                    />
                  </div>
                </div>

                {/* Degree */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Degree / Certification Program <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleUpdate(idx, 'degree', e.target.value)}
                    placeholder="e.g. Bachelor of Science (B.S.)"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white"
                  />
                </div>

                {/* Field of Study */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Field of Study / Major <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) => handleUpdate(idx, 'fieldOfStudy', e.target.value)}
                    placeholder="e.g. Information Technology or Linguistics"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white"
                  />
                </div>

                {/* Graduation Year */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Graduation Year
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={edu.graduationYear}
                      onChange={(e) => handleUpdate(idx, 'graduationYear', e.target.value)}
                      placeholder="e.g. 2023"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white"
                    />
                  </div>
                  <label className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-600 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={edu.current}
                      onChange={(e) => handleUpdate(idx, 'current', e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>Currently pursuing this degree</span>
                  </label>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Campus Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={edu.location || ''}
                      onChange={(e) => handleUpdate(idx, 'location', e.target.value)}
                      placeholder="e.g. Austin, TX or Online"
                      className="w-full pl-8 pr-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white"
                    />
                  </div>
                </div>

                {/* Relevant Coursework */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Relevant Coursework & Projects (Optional)
                  </label>
                  <input
                    type="text"
                    value={edu.coursework || ''}
                    onChange={(e) => handleUpdate(idx, 'coursework', e.target.value)}
                    placeholder="e.g. Data Analysis, AI Ethics, Computer Systems, Technical Writing"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 bg-white"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAdd}
            className="w-full py-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50/50 text-slate-600 hover:text-blue-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Degree</span>
          </button>
        </div>
      )}
    </div>
  );
};

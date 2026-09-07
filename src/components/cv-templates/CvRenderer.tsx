import React from 'react';
import { ResumeData } from '../../types/cv';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Globe, 
  Github, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  Award, 
  FolderGit2,
  ExternalLink,
  Calendar,
  Sparkles
} from 'lucide-react';

interface CvRendererProps {
  data: ResumeData;
  scale?: number;
  isPrint?: boolean;
}

export const CvRenderer: React.FC<CvRendererProps> = ({ data, scale = 1, isPrint = false }) => {
  const { personalInfo, summary, experience, education, skills, certifications, projects, themeConfig } = data;
  const accent = themeConfig?.accentColor || '#2563eb';
  const template = themeConfig?.template || 'modern';
  
  // Dynamic font class mapping
  const fontClass = 
    themeConfig?.font === 'serif' ? 'font-cv-serif' :
    themeConfig?.font === 'grotesk' ? 'font-cv-grotesk' :
    themeConfig?.font === 'mono' ? 'font-cv-mono' :
    themeConfig?.font === 'classic' ? 'font-cv-classic' :
    themeConfig?.font === 'modern' ? 'font-cv-modern' :
    'font-cv-sans';

  // Dynamic font size scaling class mapping
  const fontSizeClass = 
    themeConfig?.fontSize === 'sm' ? 'cv-size-sm' :
    themeConfig?.fontSize === 'lg' ? 'cv-size-lg' :
    themeConfig?.fontSize === 'xl' ? 'cv-size-xl' :
    'cv-size-md';

  // Dynamic spacing padding
  const paddingClass = 
    themeConfig?.spacing === 'compact' ? 'p-6 sm:p-8' :
    themeConfig?.spacing === 'spacious' ? 'p-9 sm:p-12' :
    'p-8 sm:p-10';

  // Helper to format date strings like "2022-03" into "Mar 2022"
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 2) {
        const year = parts[0];
        const month = parseInt(parts[1], 10);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if (month >= 1 && month <= 12) {
          return `${monthNames[month - 1]} ${year}`;
        }
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  };

  const containerStyle: React.CSSProperties = isPrint ? {} : {
    transform: scale !== 1 ? `scale(${scale})` : undefined,
    transformOrigin: 'top center',
  };

  return (
    <div 
      className={`cv-preview-sheet bg-white text-slate-800 transition-all ${fontClass} ${fontSizeClass} ${
        isPrint ? 'w-full' : `w-[210mm] min-h-[297mm] shadow-2xl rounded-sm mx-auto ${paddingClass}`
      }`}
      style={containerStyle}
      id="cv-printable-area"
    >
      {/* ============================================================ */}
      {/* 1. TEMPLATE: MODERN */}
      {/* ============================================================ */}
      {template === 'modern' && (
        <div className="space-y-6">
          {/* Header */}
          <header className="border-b border-slate-200 pb-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                {personalInfo.photoUrl && (
                  <img
                    src={personalInfo.photoUrl}
                    alt={personalInfo.fullName || 'Profile'}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 shadow-xs shrink-0"
                    style={{ borderColor: accent }}
                  />
                )}
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: accent }}>
                    {personalInfo.fullName || 'Your Full Name'}
                  </h1>
                  <p className="text-base font-semibold text-slate-700 mt-1">
                    {personalInfo.jobTitle || 'Professional Job Title'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-col sm:items-end gap-x-4 gap-y-1 text-xs text-slate-600">
                {personalInfo.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" style={{ color: accent }} />
                    <span className="font-medium">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" style={{ color: accent }} />
                    <span className="font-medium">{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" style={{ color: accent }} />
                    <span className="font-medium">{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.linkedin && (
                  <div className="flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5" style={{ color: accent }} />
                    <span className="font-medium">{personalInfo.linkedin}</span>
                  </div>
                )}
                {personalInfo.github && (
                  <div className="flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5" style={{ color: accent }} />
                    <span className="font-medium">{personalInfo.github}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" style={{ color: accent }} />
                    <span className="font-medium">{personalInfo.website}</span>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Professional Summary */}
          {summary && (
            <section className="page-break-avoid space-y-2">
              <h2 className="text-xs uppercase tracking-widest font-bold flex items-center gap-2" style={{ color: accent }}>
                <span>Professional Summary</span>
                <span className="flex-1 h-px bg-slate-200"></span>
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
            </section>
          )}

          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs uppercase tracking-widest font-bold flex items-center gap-2" style={{ color: accent }}>
                <Briefcase className="w-3.5 h-3.5" />
                <span>Work Experience</span>
                <span className="flex-1 h-px bg-slate-200"></span>
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="page-break-avoid border-l-2 pl-3.5 space-y-1" style={{ borderColor: accent }}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                      <h3 className="text-sm font-bold text-slate-900">{exp.jobTitle}</h3>
                      <span className="text-xs font-semibold text-slate-500">
                        {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-600">
                      <span>{exp.company}</span>
                      {exp.location && <span className="text-slate-400 font-normal"> • {exp.location}</span>}
                    </div>
                    <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line pt-0.5">
                      {exp.description}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Grid: Education & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Education */}
            {education && education.length > 0 && (
              <section className="space-y-3 page-break-avoid">
                <h2 className="text-xs uppercase tracking-widest font-bold flex items-center gap-2" style={{ color: accent }}>
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Education</span>
                  <span className="flex-1 h-px bg-slate-200"></span>
                </h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-xs space-y-0.5">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-slate-900">
                          {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                        </h3>
                        <span className="text-[11px] text-slate-500 font-medium">
                          {formatDate(edu.startDate)} — {edu.current ? 'Present' : formatDate(edu.endDate)}
                        </span>
                      </div>
                      <div className="text-slate-600 font-medium">{edu.school} {edu.location ? `• ${edu.location}` : ''}</div>
                      {edu.description && <p className="text-slate-600 text-[11px] leading-relaxed pt-0.5">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <section className="space-y-3 page-break-avoid">
                <h2 className="text-xs uppercase tracking-widest font-bold flex items-center gap-2" style={{ color: accent }}>
                  <Award className="w-3.5 h-3.5" />
                  <span>Certifications</span>
                  <span className="flex-1 h-px bg-slate-200"></span>
                </h2>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="text-xs">
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span>{cert.name}</span>
                        {cert.date && <span className="text-[11px] text-slate-500 font-normal">{formatDate(cert.date)}</span>}
                      </div>
                      <div className="text-slate-600 font-medium">{cert.issuer}</div>
                      {cert.credentialId && (
                        <div className="text-[10px] text-slate-400">ID: {cert.credentialId}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="page-break-avoid space-y-2.5">
              <h2 className="text-xs uppercase tracking-widest font-bold flex items-center gap-2" style={{ color: accent }}>
                <Wrench className="w-3.5 h-3.5" />
                <span>Skills & Expertise</span>
                <span className="flex-1 h-px bg-slate-200"></span>
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span 
                    key={skill.id}
                    className="text-xs px-2.5 py-1 rounded-md font-semibold border border-slate-200 bg-slate-50 text-slate-800"
                  >
                    {skill.name} {skill.level ? <span className="text-slate-500 font-normal">({skill.level})</span> : ''}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="page-break-avoid space-y-3">
              <h2 className="text-xs uppercase tracking-widest font-bold flex items-center gap-2" style={{ color: accent }}>
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Featured Projects</span>
                <span className="flex-1 h-px bg-slate-200"></span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 text-xs space-y-1">
                    <div className="font-bold text-slate-900 flex justify-between items-start">
                      <span>{proj.title}</span>
                      {proj.link && <span className="text-[10px] text-blue-600 truncate max-w-[120px] font-normal">{proj.link}</span>}
                    </div>
                    {proj.role && <div className="text-[11px] font-semibold text-slate-600">{proj.role}</div>}
                    <p className="text-slate-700 leading-relaxed text-[11px]">{proj.description}</p>
                    {proj.technologies && (
                      <div className="text-[10px] font-semibold text-slate-500 pt-0.5">
                        Tech: {proj.technologies}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. TEMPLATE: CLASSIC */}
      {/* ============================================================ */}
      {template === 'classic' && (
        <div className="space-y-5 text-slate-900">
          {/* Centered Classic Header */}
          <header className="pb-4 border-b-2 border-slate-900 text-center">
            {personalInfo.photoUrl && (
              <div className="flex justify-center mb-3">
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName || 'Profile'}
                  className="w-18 h-18 rounded-lg object-cover border border-slate-400 p-0.5 shadow-2xs"
                />
              </div>
            )}
            <h1 className="text-3xl font-bold tracking-tight uppercase text-slate-950">
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
            <p className="text-sm font-semibold tracking-wider uppercase mt-1" style={{ color: accent }}>
              {personalInfo.jobTitle || 'Professional Job Title'}
            </p>
            <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 text-xs text-slate-700 mt-2.5 font-medium">
              {personalInfo.location && <span>{personalInfo.location}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.email && <span>• {personalInfo.email}</span>}
              {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
              {personalInfo.github && <span>• {personalInfo.github}</span>}
              {personalInfo.website && <span>• {personalInfo.website}</span>}
            </div>
          </header>

          {/* Professional Summary */}
          {summary && (
            <section className="page-break-avoid">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1.5" style={{ color: accent }}>
                Executive Profile
              </h2>
              <p className="text-xs text-slate-800 leading-relaxed">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5" style={{ color: accent }}>
                Professional Experience
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="page-break-avoid text-xs space-y-0.5">
                  <div className="flex justify-between items-baseline font-bold text-slate-950">
                    <div><span className="font-bold text-slate-900">{exp.jobTitle}</span> — <span className="font-semibold text-slate-700">{exp.company}</span></div>
                    <span className="text-[11px] text-slate-600 font-normal">
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.location && <div className="text-[11px] italic text-slate-600">{exp.location}</div>}
                  <div className="text-slate-800 leading-relaxed whitespace-pre-line pt-0.5">
                    {exp.description}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section className="space-y-2 page-break-avoid">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5" style={{ color: accent }}>
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</span>, {edu.school} {edu.location ? `(${edu.location})` : ''}
                    {edu.description && <p className="text-slate-600 text-[11px] mt-0.5">{edu.description}</p>}
                  </div>
                  <span className="text-[11px] text-slate-600 font-medium">
                    {formatDate(edu.startDate)} – {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </span>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="page-break-avoid">
              <h2 className="text-xs font-bold uppercase tracking-wider border-b border-slate-300 pb-0.5 mb-1.5" style={{ color: accent }}>
                Skills & Areas of Expertise
              </h2>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                {skills.map(s => s.name).join(' • ')}
              </p>
            </section>
          )}

          {/* Certifications & Projects */}
          {(certifications?.length > 0 || projects?.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {certifications && certifications.length > 0 && (
                <div className="page-break-avoid space-y-1">
                  <h3 className="font-bold uppercase tracking-wider text-[11px] border-b border-slate-300 pb-0.5 mb-1" style={{ color: accent }}>
                    Certifications
                  </h3>
                  <div className="space-y-1">
                    {certifications.map(c => (
                      <div key={c.id} className="text-slate-800">
                        <span className="font-bold">{c.name}</span> — {c.issuer} ({formatDate(c.date)})
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {projects && projects.length > 0 && (
                <div className="page-break-avoid space-y-1">
                  <h3 className="font-bold uppercase tracking-wider text-[11px] border-b border-slate-300 pb-0.5 mb-1" style={{ color: accent }}>
                    Notable Projects
                  </h3>
                  <div className="space-y-1">
                    {projects.map(p => (
                      <div key={p.id}>
                        <span className="font-bold">{p.title}: </span>
                        <span className="text-slate-700">{p.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. TEMPLATE: PROFESSIONAL */}
      {/* ============================================================ */}
      {template === 'professional' && (
        <div className="space-y-6">
          {/* Top Banner Header */}
          <header className="p-6 rounded-2xl text-white shadow-xs" style={{ backgroundColor: accent }}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                {personalInfo.photoUrl && (
                  <img
                    src={personalInfo.photoUrl}
                    alt={personalInfo.fullName || 'Profile'}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-white/80 shadow-md shrink-0"
                  />
                )}
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-white">
                    {personalInfo.fullName || 'Your Full Name'}
                  </h1>
                  <p className="text-sm font-medium text-white/90 mt-0.5">
                    {personalInfo.jobTitle || 'Professional Job Title'}
                  </p>
                </div>
              </div>
              <div className="text-xs text-white/90 space-y-1 text-left sm:text-right font-medium">
                {personalInfo.email && <div>{personalInfo.email}</div>}
                {personalInfo.phone && <div>{personalInfo.phone}</div>}
                {personalInfo.location && <div>{personalInfo.location}</div>}
              </div>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/80 mt-4 pt-3 border-t border-white/20">
              {personalInfo.linkedin && <span>LinkedIn: {personalInfo.linkedin}</span>}
              {personalInfo.github && <span>GitHub: {personalInfo.github}</span>}
              {personalInfo.website && <span>Portfolio: {personalInfo.website}</span>}
            </div>
          </header>

          {/* Main 2-column split */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
            {/* Left Sidebar: Skills, Education, Certs */}
            <div className="sm:col-span-4 space-y-5 text-xs">
              {/* Skills */}
              {skills && skills.length > 0 && (
                <section className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h3 className="font-bold uppercase tracking-wider text-xs" style={{ color: accent }}>
                    Key Competencies
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map(s => (
                      <span key={s.id} className="px-2 py-0.5 bg-white border border-slate-200 text-slate-800 rounded font-medium text-[11px]">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {education && education.length > 0 && (
                <section className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2.5">
                  <h3 className="font-bold uppercase tracking-wider text-xs" style={{ color: accent }}>
                    Education
                  </h3>
                  {education.map(edu => (
                    <div key={edu.id} className="space-y-0.5">
                      <div className="font-bold text-slate-900">{edu.degree}</div>
                      <div className="text-slate-600">{edu.school}</div>
                      <div className="text-[10px] text-slate-500 font-medium">{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</div>
                    </div>
                  ))}
                </section>
              )}

              {/* Certifications */}
              {certifications && certifications.length > 0 && (
                <section className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h3 className="font-bold uppercase tracking-wider text-xs" style={{ color: accent }}>
                    Certifications
                  </h3>
                  {certifications.map(c => (
                    <div key={c.id} className="space-y-0.5">
                      <div className="font-bold text-slate-900">{c.name}</div>
                      <div className="text-slate-600 text-[11px]">{c.issuer} ({formatDate(c.date)})</div>
                    </div>
                  ))}
                </section>
              )}
            </div>

            {/* Right Main Column: Summary, Experience, Projects */}
            <div className="sm:col-span-8 space-y-5">
              {summary && (
                <section className="page-break-avoid space-y-1.5">
                  <h2 className="text-xs uppercase tracking-widest font-bold pb-1 border-b border-slate-200" style={{ color: accent }}>
                    Executive Summary
                  </h2>
                  <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
                </section>
              )}

              {experience && experience.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-xs uppercase tracking-widest font-bold pb-1 border-b border-slate-200" style={{ color: accent }}>
                    Professional Experience
                  </h2>
                  {experience.map((exp) => (
                    <div key={exp.id} className="page-break-avoid text-xs space-y-0.5">
                      <div className="flex justify-between font-bold text-slate-900 text-sm">
                        <span>{exp.jobTitle}</span>
                        <span className="text-xs font-semibold text-slate-500">
                          {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </span>
                      </div>
                      <div className="font-semibold text-slate-600">{exp.company} {exp.location ? `• ${exp.location}` : ''}</div>
                      <div className="text-slate-700 leading-relaxed whitespace-pre-line pt-0.5">
                        {exp.description}
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {projects && projects.length > 0 && (
                <section className="page-break-avoid space-y-3">
                  <h2 className="text-xs uppercase tracking-widest font-bold pb-1 border-b border-slate-200" style={{ color: accent }}>
                    Key Projects & Achievements
                  </h2>
                  <div className="space-y-2">
                    {projects.map((proj) => (
                      <div key={proj.id} className="text-xs p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                        <div className="font-bold text-slate-900">{proj.title}</div>
                        <p className="text-slate-700 text-[11px] leading-relaxed">{proj.description}</p>
                        {proj.technologies && <div className="text-[10px] font-semibold text-slate-500">Tech: {proj.technologies}</div>}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. TEMPLATE: MINIMAL */}
      {/* ============================================================ */}
      {template === 'minimal' && (
        <div className="space-y-6">
          <header className="text-center pb-4 border-b border-slate-200">
            {personalInfo.photoUrl && (
              <div className="flex justify-center mb-3">
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName || 'Profile'}
                  className="w-18 h-18 rounded-full object-cover border border-slate-300 shadow-2xs"
                />
              </div>
            )}
            <h1 className="text-3xl font-light tracking-tight text-slate-900">
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
            <p className="text-sm font-semibold tracking-wider uppercase mt-1" style={{ color: accent }}>
              {personalInfo.jobTitle || 'Professional Job Title'}
            </p>
            <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 mt-3 font-medium">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.location && <span>• {personalInfo.location}</span>}
              {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
              {personalInfo.github && <span>• {personalInfo.github}</span>}
              {personalInfo.website && <span>• {personalInfo.website}</span>}
            </div>
          </header>

          {summary && (
            <section className="page-break-avoid space-y-1.5">
              <h2 className="text-xs uppercase tracking-widest font-bold text-slate-900 border-b border-slate-200 pb-1">
                Summary
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
            </section>
          )}

          {experience && experience.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs uppercase tracking-widest font-bold text-slate-900 border-b border-slate-200 pb-1">
                Experience
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="page-break-avoid text-xs space-y-0.5">
                  <div className="flex justify-between items-baseline font-bold text-slate-900">
                    <div><span className="font-bold text-slate-900">{exp.jobTitle}</span> — <span className="font-normal text-slate-700">{exp.company}</span></div>
                    <span className="text-[11px] text-slate-500 font-normal">
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.location && <div className="text-[11px] text-slate-500">{exp.location}</div>}
                  <div className="text-slate-700 leading-relaxed whitespace-pre-line pt-0.5">
                    {exp.description}
                  </div>
                </div>
              ))}
            </section>
          )}

          {education && education.length > 0 && (
            <section className="space-y-2 page-break-avoid">
              <h2 className="text-xs uppercase tracking-widest font-bold text-slate-900 border-b border-slate-200 pb-1">
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{edu.degree}</span>, {edu.school} {edu.location ? `(${edu.location})` : ''}
                    {edu.description && <p className="text-slate-600 text-[11px] mt-0.5">{edu.description}</p>}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {formatDate(edu.startDate)} – {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </span>
                </div>
              ))}
            </section>
          )}

          {skills && skills.length > 0 && (
            <section className="page-break-avoid space-y-1.5">
              <h2 className="text-xs uppercase tracking-widest font-bold text-slate-900 border-b border-slate-200 pb-1">
                Core Competencies
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {skills.map(s => s.name).join(' • ')}
              </p>
            </section>
          )}

          {certifications && certifications.length > 0 && (
            <section className="page-break-avoid space-y-1.5">
              <h2 className="text-xs uppercase tracking-widest font-bold text-slate-900 border-b border-slate-200 pb-1">
                Certifications
              </h2>
              <div className="space-y-1 text-xs">
                {certifications.map(c => (
                  <div key={c.id} className="flex justify-between text-slate-700">
                    <span><strong className="text-slate-900">{c.name}</strong> — {c.issuer}</span>
                    <span className="text-slate-500 font-medium">{formatDate(c.date)}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects && projects.length > 0 && (
            <section className="page-break-avoid space-y-2">
              <h2 className="text-xs uppercase tracking-widest font-bold text-slate-900 border-b border-slate-200 pb-1">
                Selected Projects
              </h2>
              {projects.map((proj) => (
                <div key={proj.id} className="text-xs space-y-0.5">
                  <div className="font-bold text-slate-900">
                    {proj.title} {proj.role ? `(${proj.role})` : ''}
                  </div>
                  <p className="text-slate-700">{proj.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. TEMPLATE: EXECUTIVE */}
      {/* ============================================================ */}
      {template === 'executive' && (
        <div className="space-y-6">
          <header className="border-b-2 border-slate-900 pb-4 text-center">
            {personalInfo.photoUrl && (
              <div className="flex justify-center mb-3">
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName || 'Profile'}
                  className="w-18 h-18 sm:w-20 sm:h-20 rounded-md object-cover border-2 p-0.5 shadow-2xs"
                  style={{ borderColor: accent }}
                />
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
            <p className="text-base italic text-slate-700 mt-1 font-medium">
              {personalInfo.jobTitle || 'Executive Leadership'}
            </p>
            <div className="flex justify-center flex-wrap gap-4 text-xs text-slate-600 mt-3 pt-2 border-t border-slate-200 font-medium">
              {personalInfo.location && <span>{personalInfo.location}</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
              {personalInfo.github && <span>{personalInfo.github}</span>}
            </div>
          </header>

          {summary && (
            <section className="page-break-avoid space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-slate-200" style={{ color: accent }}>
                Executive Profile
              </h2>
              <p className="text-xs text-slate-800 leading-relaxed">{summary}</p>
            </section>
          )}

          {experience && experience.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-slate-200" style={{ color: accent }}>
                Professional History
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="page-break-avoid text-xs space-y-0.5">
                  <div className="flex justify-between font-bold text-slate-900 text-sm">
                    <span>{exp.jobTitle}</span>
                    <span className="font-semibold text-xs text-slate-600">
                      {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div className="italic text-slate-600 font-medium">
                    {exp.company} {exp.location ? `| ${exp.location}` : ''}
                  </div>
                  <div className="text-slate-800 leading-relaxed whitespace-pre-line pt-0.5">
                    {exp.description}
                  </div>
                </div>
              ))}
            </section>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {education && education.length > 0 && (
              <section className="page-break-avoid space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-slate-200" style={{ color: accent }}>
                  Education & Credentials
                </h2>
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600 italic">{edu.school}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</div>
                  </div>
                ))}
              </section>
            )}

            {skills && skills.length > 0 && (
              <section className="page-break-avoid space-y-2">
                <h2 className="text-xs font-bold uppercase tracking-widest pb-1 border-b border-slate-200" style={{ color: accent }}>
                  Core Competencies
                </h2>
                <div className="grid grid-cols-2 gap-1 text-xs text-slate-800 font-medium">
                  {skills.map((s) => (
                    <div key={s.id} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }}></span>
                      <span>{s.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 6. TEMPLATE: CREATIVE */}
      {/* ============================================================ */}
      {template === 'creative' && (
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="sm:col-span-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-6 text-xs">
            {personalInfo.photoUrl && (
              <div className="flex justify-center">
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName || 'Profile'}
                  className="w-22 h-22 sm:w-26 sm:h-26 rounded-2xl object-cover shadow-sm border-2 border-white"
                />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: accent }}>
                {personalInfo.fullName || 'Your Full Name'}
              </h1>
              <p className="font-semibold text-slate-700 mt-1">
                {personalInfo.jobTitle || 'Creative Professional'}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold uppercase tracking-widest text-[10px]" style={{ color: accent }}>Contact</h3>
              <div className="space-y-1.5 text-slate-700 text-[11px] font-medium">
                {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
                {personalInfo.phone && <div>{personalInfo.phone}</div>}
                {personalInfo.location && <div>{personalInfo.location}</div>}
                {personalInfo.linkedin && <div className="break-all">{personalInfo.linkedin}</div>}
                {personalInfo.github && <div className="break-all">{personalInfo.github}</div>}
                {personalInfo.website && <div className="break-all">{personalInfo.website}</div>}
              </div>
            </div>

            {skills && skills.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-bold uppercase tracking-widest text-[10px]" style={{ color: accent }}>Key Skills</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map(s => (
                    <span key={s.id} className="px-2 py-0.5 bg-white shadow-2xs rounded text-[11px] font-semibold text-slate-800 border border-slate-200">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {education && education.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-bold uppercase tracking-widest text-[10px]" style={{ color: accent }}>Education</h3>
                {education.map(edu => (
                  <div key={edu.id} className="space-y-0.5">
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600">{edu.school}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Main Area */}
          <div className="sm:col-span-8 space-y-6">
            {summary && (
              <section className="page-break-avoid space-y-1.5">
                <h2 className="text-xs uppercase tracking-widest font-extrabold" style={{ color: accent }}>
                  About Me
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
              </section>
            )}

            {experience && experience.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xs uppercase tracking-widest font-extrabold" style={{ color: accent }}>
                  Experience
                </h2>
                {experience.map((exp) => (
                  <div key={exp.id} className="page-break-avoid text-xs space-y-0.5">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{exp.jobTitle}</span>
                      <span className="text-slate-500 font-medium">{formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                    </div>
                    <div className="font-semibold text-slate-600">{exp.company}</div>
                    <div className="text-slate-700 leading-relaxed whitespace-pre-line pt-0.5">
                      {exp.description}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {projects && projects.length > 0 && (
              <section className="page-break-avoid space-y-3">
                <h2 className="text-xs uppercase tracking-widest font-extrabold" style={{ color: accent }}>
                  Projects & Portfolio
                </h2>
                <div className="space-y-2">
                  {projects.map((p) => (
                    <div key={p.id} className="text-xs p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                      <div className="font-bold text-slate-900">{p.title}</div>
                      <p className="text-slate-700 text-[11px]">{p.description}</p>
                      {p.technologies && <div className="text-[10px] font-semibold text-slate-500">Tech: {p.technologies}</div>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 7. TEMPLATE: COMPACT */}
      {/* ============================================================ */}
      {template === 'compact' && (
        <div className="space-y-4 text-xs">
          <header className="flex justify-between items-center border-b pb-2.5 border-slate-200">
            <div className="flex items-center gap-3">
              {personalInfo.photoUrl && (
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName || 'Profile'}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover border border-slate-300 shrink-0"
                />
              )}
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{personalInfo.fullName || 'Your Full Name'}</h1>
                <div className="font-semibold text-xs" style={{ color: accent }}>{personalInfo.jobTitle}</div>
              </div>
            </div>
            <div className="text-right text-[11px] text-slate-600 font-medium">
              <div>{personalInfo.email} • {personalInfo.phone}</div>
              <div>{personalInfo.location} {personalInfo.linkedin ? `• ${personalInfo.linkedin}` : ''}</div>
            </div>
          </header>

          {summary && (
            <p className="text-slate-700 text-[11px] leading-relaxed page-break-avoid">{summary}</p>
          )}

          {experience && experience.length > 0 && (
            <section className="space-y-2.5">
              <h2 className="font-bold uppercase tracking-wider text-[11px] border-b pb-0.5 border-slate-200" style={{ color: accent }}>
                Experience
              </h2>
              {experience.map((exp) => (
                <div key={exp.id} className="page-break-avoid space-y-0.5">
                  <div className="flex justify-between font-bold text-slate-900">
                    <div><span className="font-bold text-slate-900">{exp.jobTitle}</span> — <span className="font-semibold text-slate-700">{exp.company}</span></div>
                    <span className="text-[10px] text-slate-500 font-medium">{formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}</span>
                  </div>
                  <div className="text-[11px] text-slate-700 whitespace-pre-line leading-normal">
                    {exp.description}
                  </div>
                </div>
              ))}
            </section>
          )}

          <div className="grid grid-cols-2 gap-4">
            {education && education.length > 0 && (
              <section className="page-break-avoid">
                <h2 className="font-bold uppercase tracking-wider text-[11px] border-b pb-0.5 mb-1.5 border-slate-200" style={{ color: accent }}>
                  Education
                </h2>
                {education.map(edu => (
                  <div key={edu.id} className="text-[11px]">
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600">{edu.school} ({formatDate(edu.startDate)}–{formatDate(edu.endDate)})</div>
                  </div>
                ))}
              </section>
            )}

            {skills && skills.length > 0 && (
              <section className="page-break-avoid">
                <h2 className="font-bold uppercase tracking-wider text-[11px] border-b pb-0.5 mb-1.5 border-slate-200" style={{ color: accent }}>
                  Skills
                </h2>
                <div className="text-[11px] text-slate-700 leading-normal font-medium">
                  {skills.map(s => s.name).join(', ')}
                </div>
              </section>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 8. TEMPLATE: TECHNICAL (AI, Data & Engineering Optimized)   */}
      {/* ============================================================ */}
      {template === 'technical' && (
        <div className="space-y-4 font-sans text-slate-800">
          {/* Header */}
          <header className="border-b-2 pb-3.5" style={{ borderColor: accent }}>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900 font-mono">
                  {personalInfo.fullName || 'Candidate Name'}
                </h1>
                <p className="text-sm font-bold tracking-wide mt-0.5" style={{ color: accent }}>
                  {personalInfo.jobTitle || 'Technical Specialist'}
                </p>
              </div>

              {/* Quick Contacts */}
              <div className="text-[11px] text-slate-600 font-mono sm:text-right space-y-0.5">
                <div className="flex flex-wrap sm:justify-end gap-x-2 gap-y-0.5">
                  {personalInfo.email && <span>{personalInfo.email}</span>}
                  {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                  {personalInfo.location && <span>• {personalInfo.location}</span>}
                </div>
                <div className="flex flex-wrap sm:justify-end gap-x-2 gap-y-0.5 text-slate-500">
                  {personalInfo.linkedin && <span>in: {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</span>}
                  {personalInfo.github && <span>gh: {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>}
                  {personalInfo.website && <span>web: {personalInfo.website.replace(/^https?:\/\//, '')}</span>}
                </div>
              </div>
            </div>
          </header>

          {/* Professional Summary */}
          {summary && (
            <section className="page-break-avoid">
              <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded-sm inline-block mb-1.5 border-l-2" style={{ borderLeftColor: accent }}>
                Summary & Core Profile
              </h2>
              <p className="text-[11.5px] leading-relaxed text-slate-700">
                {summary}
              </p>
            </section>
          )}

          {/* Technical Skills Matrix */}
          {skills && skills.length > 0 && (
            <section className="page-break-avoid">
              <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded-sm inline-block mb-1.5 border-l-2" style={{ borderLeftColor: accent }}>
                Technical Skills & Tools
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 border border-slate-200/80 text-slate-800"
                  >
                    <span className="font-semibold">{s.name}</span>
                    {s.level && (
                      <span className="ml-1 text-[9.5px] text-slate-500">[{s.level}]</span>
                    )}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded-sm inline-block border-l-2" style={{ borderLeftColor: accent }}>
                Professional Experience
              </h2>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id} className="page-break-avoid pl-2 border-l border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900 text-[12.5px]">{exp.jobTitle}</span>
                        <span className="text-slate-500 font-medium"> @ </span>
                        <span className="font-semibold" style={{ color: accent }}>{exp.company}</span>
                        {exp.location && <span className="text-slate-500 text-[11px]"> ({exp.location})</span>}
                      </div>
                      <span className="text-[10.5px] font-mono text-slate-500 mt-0.5 sm:mt-0 shrink-0">
                        {formatDate(exp.startDate)} – {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>

                    {exp.description && (
                      <div className="mt-1 text-[11.5px] text-slate-700 space-y-0.5 leading-relaxed">
                        {exp.description.split('\n').map((line, lIdx) => {
                          const trimmed = line.trim();
                          if (!trimmed) return null;
                          const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*');
                          const clean = isBullet ? trimmed.replace(/^[•\-*]\s*/, '') : trimmed;
                          return (
                            <div key={lIdx} className="flex items-start gap-1.5">
                              <span className="text-slate-400 font-mono text-[10px] mt-0.5">›</span>
                              <span>{clean}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Projects */}
          {projects && projects.length > 0 && (
            <section className="space-y-2 page-break-avoid">
              <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded-sm inline-block border-l-2" style={{ borderLeftColor: accent }}>
                Technical Projects
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-2 rounded bg-slate-50/80 border border-slate-200/60 text-xs">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-bold text-slate-900">{proj.title}</span>
                      {proj.link && (
                        <span className="text-[10px] font-mono text-blue-600 truncate max-w-[200px]">
                          {proj.link}
                        </span>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-[11px] text-slate-600 mt-0.5">{proj.description}</p>
                    )}
                    {proj.technologies && (
                      <div className="mt-1 text-[10px] font-mono text-slate-500">
                        <span className="font-bold text-slate-700">Stack:</span> {proj.technologies}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education & Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {education && education.length > 0 && (
              <section className="page-break-avoid">
                <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded-sm inline-block mb-1.5 border-l-2" style={{ borderLeftColor: accent }}>
                  Education
                </h2>
                <div className="space-y-1.5">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-xs">
                      <div className="font-bold text-slate-900 text-[12px]">{edu.degree}</div>
                      <div className="text-[11px] text-slate-600 font-medium">
                        {edu.school}{edu.location ? `, ${edu.location}` : ''}
                      </div>
                      <div className="text-[10.5px] font-mono text-slate-400">
                        {formatDate(edu.startDate)} – {edu.current ? 'Present' : formatDate(edu.endDate)}
                      </div>
                      {edu.description && (
                        <div className="text-[10.5px] text-slate-500 mt-0.5">{edu.description}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certifications && certifications.length > 0 && (
              <section className="page-break-avoid">
                <h2 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded-sm inline-block mb-1.5 border-l-2" style={{ borderLeftColor: accent }}>
                  Certifications
                </h2>
                <div className="space-y-1.5">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="text-xs">
                      <div className="font-bold text-slate-900 text-[11.5px]">{cert.name}</div>
                      <div className="text-[11px] text-slate-600">
                        {cert.issuer} {cert.date && <span className="font-mono text-slate-400">({formatDate(cert.date)})</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

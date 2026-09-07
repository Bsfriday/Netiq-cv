import React from 'react';
import { RoboticPersonalInfo } from '../../../types/roboticResume';
import { CountrySelector } from '../CountrySelector';
import { findCountryByName } from '../../../data/countriesData';
import { User, Mail, Phone, MapPin, Globe, Linkedin, Github, Briefcase } from 'lucide-react';

interface PersonalInfoStepProps {
  data: RoboticPersonalInfo;
  onChange: (updated: RoboticPersonalInfo) => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof RoboticPersonalInfo, value: string) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const handleCountryChange = (countryName: string) => {
    const countryInfo = findCountryByName(countryName);
    const updated = {
      ...data,
      country: countryName
    };

    // If location is blank, suggest capital or city
    if (!data.location && countryInfo && countryInfo.capital) {
      updated.location = `${countryInfo.capital}, ${countryInfo.name}`;
    }

    // If phone is blank, pre-fill country code prefix
    if (!data.phone && countryInfo && countryInfo.phonePrefix) {
      updated.phone = `${countryInfo.phonePrefix} `;
    }

    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          <span>Personal & Contact Information</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Provide your contact details. ATS parsers extract these fields first to catalog your candidate profile.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm font-medium text-slate-900 bg-white"
              id="input-robotic-fullname"
            />
          </div>
        </div>

        {/* Professional Job Title */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Professional Title / Header <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={data.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              placeholder="e.g. AI Data Annotator & Quality Evaluator"
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm font-medium text-slate-900 bg-white"
              id="input-robotic-jobtitle"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            This should closely mirror your target position for maximum ATS keyword relevance.
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="alex.morgan@example.com"
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm font-medium text-slate-900 bg-white"
              id="input-robotic-email"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 019-2834"
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm font-medium text-slate-900 bg-white"
              id="input-robotic-phone"
            />
          </div>
        </div>

        {/* Geographic Location & Country Selection */}
        <div className="md:col-span-2 p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-blue-600" />
              <span>Country & Location Details</span>
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              250+ global countries with localized phone codes & cities
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Country Selector */}
            <div>
              <CountrySelector
                label="Country / Territory"
                value={data.country || 'United States'}
                onChange={handleCountryChange}
                showRandomButton={true}
                onRandomSelect={handleCountryChange}
                required={true}
                id="robotic-personal-country"
              />
            </div>

            {/* Location (City, State) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                City & State / Region <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={data.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g. Austin, TX (or Remote)"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm font-medium text-slate-900 bg-white"
                  id="input-robotic-location"
                />
              </div>
            </div>
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>LinkedIn Profile</span>
            <span className="text-[10px] font-normal text-slate-400">Optional</span>
          </label>
          <div className="relative">
            <Linkedin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={data.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/alexmorgan"
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm font-medium text-slate-900 bg-white"
              id="input-robotic-linkedin"
            />
          </div>
        </div>

        {/* Portfolio / GitHub / Website */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>Portfolio / GitHub / Website</span>
            <span className="text-[10px] font-normal text-slate-400">Optional</span>
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={data.portfolio || data.website || data.github || ''}
              onChange={(e) => {
                const val = e.target.value;
                onChange({
                  ...data,
                  portfolio: val,
                  website: val,
                  github: val.includes('github.com') ? val : data.github
                });
              }}
              placeholder="alexmorgan.dev or github.com/alex"
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm font-medium text-slate-900 bg-white"
              id="input-robotic-portfolio"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useMemo } from 'react';
import { CountrySelector } from '../robotic/CountrySelector';
import { getCountryLocationDetails, findCountryByName } from '../../data/countriesData';
import { MapPin, Compass, Building2, Sparkles } from 'lucide-react';

export interface LocationChangePayload {
  country: string;
  city: string;
  region: string;
  location: string;
  phone?: string;
}

interface CountryCityRegionSelectorProps {
  country: string;
  city?: string;
  region?: string;
  location?: string;
  phone?: string;
  onChange: (payload: LocationChangePayload) => void;
  idPrefix?: string;
  compact?: boolean;
  showQuickCities?: boolean;
  showRegionField?: boolean;
  className?: string;
}

export const CountryCityRegionSelector: React.FC<CountryCityRegionSelectorProps> = ({
  country,
  city,
  region,
  location,
  phone,
  onChange,
  idPrefix = 'loc',
  compact = false,
  showQuickCities = true,
  showRegionField = true,
  className = ''
}) => {
  const currentCountry = country || 'United States';
  const countryDetails = useMemo(() => {
    return getCountryLocationDetails(currentCountry);
  }, [currentCountry]);

  // Derived current city & region if not explicitly provided
  const currentCity = city !== undefined && city !== null && city !== ''
    ? city
    : (location ? location.split(',')[0].trim() : countryDetails.city);

  const currentRegion = region !== undefined && region !== null && region !== ''
    ? region
    : countryDetails.region;

  // Handler when Country changes: automatically updates city and region directly
  const handleCountryChange = (newCountryName: string) => {
    const details = getCountryLocationDetails(newCountryName);
    const newCity = details.city || '';
    const newRegion = details.region || '';
    const newLocation = newCity ? `${newCity}, ${details.countryName}` : details.countryName;

    let updatedPhone = phone;
    if (phone !== undefined) {
      if (!phone || phone.trim().length <= 5) {
        updatedPhone = `${details.phonePrefix} `;
      }
    }

    onChange({
      country: details.countryName,
      city: newCity,
      region: newRegion,
      location: newLocation,
      phone: updatedPhone
    });
  };

  // Handler when City is manually typed or changed
  const handleCityChange = (newCity: string) => {
    const newLocation = newCity.trim()
      ? `${newCity.trim()}, ${currentCountry}`
      : currentCountry;

    onChange({
      country: currentCountry,
      city: newCity,
      region: currentRegion,
      location: newLocation,
      phone
    });
  };

  // Handler when Region is manually changed
  const handleRegionChange = (newRegion: string) => {
    const newLocation = currentCity
      ? `${currentCity}, ${currentCountry}`
      : currentCountry;

    onChange({
      country: currentCountry,
      city: currentCity,
      region: newRegion,
      location: newLocation,
      phone
    });
  };

  // Quick select a major city
  const handleSelectQuickCity = (quickCity: string) => {
    handleCityChange(quickCity);
  };

  return (
    <div className={`space-y-3.5 ${className}`} id={`${idPrefix}-container`}>
      {/* Country Selector */}
      <div>
        <CountrySelector
          label="Country / Territory"
          value={currentCountry}
          onChange={handleCountryChange}
          showRandomButton={true}
          onRandomSelect={handleCountryChange}
          id={`${idPrefix}-country`}
        />
      </div>

      {/* City & Region Dual Inputs */}
      <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-3`}>
        {/* City Input (with manual edit capability) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label 
              htmlFor={`${idPrefix}-city-input`}
              className="text-xs font-bold text-slate-700 flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>City</span>
            </label>
            <span className="text-[10px] text-blue-600 font-semibold flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              <span>Auto-filled / Editable</span>
            </span>
          </div>
          <div className="relative">
            <input
              type="text"
              id={`${idPrefix}-city-input`}
              value={currentCity}
              onChange={(e) => handleCityChange(e.target.value)}
              placeholder="e.g. London, Paris, Tokyo, Austin..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Region / State Input (auto-follows country, editable) */}
        {showRegionField && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label 
                htmlFor={`${idPrefix}-region-input`}
                className="text-xs font-bold text-slate-700 flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-indigo-600" />
                <span>Region / State / Province</span>
              </label>
              <span className="text-[10px] text-slate-400">
                {countryDetails.region || 'Continental'}
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                id={`${idPrefix}-region-input`}
                value={currentRegion}
                onChange={(e) => handleRegionChange(e.target.value)}
                placeholder="e.g. Europe, California, Ontario..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 bg-slate-50/70 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* Major Cities Quick Suggestions for the selected country */}
      {showQuickCities && countryDetails.majorCities && countryDetails.majorCities.length > 0 && (
        <div className="bg-slate-50/80 rounded-xl p-2.5 border border-slate-200/80">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-500" />
              <span>Major Cities in {currentCountry}:</span>
            </span>
            <span className="text-[10px] text-slate-400">Click to apply</span>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto pr-1">
            {countryDetails.majorCities.slice(0, 8).map((mc) => {
              const isSelected = currentCity.toLowerCase() === mc.toLowerCase();
              return (
                <button
                  key={mc}
                  type="button"
                  onClick={() => handleSelectQuickCity(mc)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-2xs scale-102'
                      : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200/90'
                  }`}
                  id={`${idPrefix}-quick-city-${mc.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                >
                  <span>{mc}</span>
                  {isSelected && <span className="text-[9px]">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Live CV location display badge */}
      <div className="flex items-center justify-between text-[11px] px-3 py-1.5 rounded-lg bg-blue-50/70 border border-blue-100 text-blue-800">
        <span className="font-medium flex items-center gap-1">
          <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
          <span>Rendered on CV:</span>
          <strong className="font-bold text-slate-900 ml-1">
            {currentCity ? `${currentCity}, ${currentCountry}` : currentCountry}
          </strong>
        </span>
        <span className="text-[10px] text-blue-600/80 uppercase font-bold tracking-wider">
          {currentRegion}
        </span>
      </div>
    </div>
  );
};

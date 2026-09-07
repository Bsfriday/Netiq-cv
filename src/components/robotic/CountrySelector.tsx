import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, Globe, ChevronDown, Check, Shuffle, X, Sparkles } from 'lucide-react';
import { ALL_COUNTRIES, CountryInfo, getRandomCountry } from '../../data/countriesData';

export function getFlagEmoji(alpha2: string): string {
  if (!alpha2 || alpha2.length !== 2) return '🌐';
  const codePoints = alpha2
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

interface CountrySelectorProps {
  value: string;
  onChange: (countryName: string) => void;
  showRandomButton?: boolean;
  onRandomSelect?: (countryName: string) => void;
  allowAnyRandom?: boolean;
  id?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  value,
  onChange,
  showRandomButton = false,
  onRandomSelect,
  allowAnyRandom = false,
  id = 'country-selector',
  label,
  placeholder = 'Search 250+ countries or territories...',
  className = '',
  disabled = false,
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const isAnyRandomSelected = allowAnyRandom && (value === 'Any Country (Random)' || value === 'ANY' || value === '');

  // Find currently selected country info
  const selectedCountry = useMemo(() => {
    if (!value || isAnyRandomSelected) return undefined;
    return ALL_COUNTRIES.find(c => c.name.toLowerCase() === value.toLowerCase());
  }, [value, isAnyRandomSelected]);

  // Filter countries by query
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return ALL_COUNTRIES;
    const q = searchQuery.toLowerCase().trim();
    return ALL_COUNTRIES.filter(c => 
      c.name.toLowerCase().includes(q) ||
      c.alpha2.toLowerCase() === q ||
      c.alpha3.toLowerCase() === q ||
      c.region.toLowerCase().includes(q) ||
      c.capital.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // When opening, focus search input and reset highlight
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setHighlightedIndex(0);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.min(prev + 1, filteredCountries.length - 1));
      scrollHighlightedIntoView(highlightedIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.max(prev - 1, 0));
      scrollHighlightedIntoView(highlightedIndex - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCountries[highlightedIndex]) {
        handleSelect(filteredCountries[highlightedIndex].name);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  const scrollHighlightedIntoView = (index: number) => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll('[role="option"]');
    if (items[index]) {
      items[index].scrollIntoView({ block: 'nearest' });
    }
  };

  const handleSelect = (countryName: string) => {
    onChange(countryName);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleTriggerRandom = (e: React.MouseEvent) => {
    e.stopPropagation();
    const random = getRandomCountry();
    if (onRandomSelect) {
      onRandomSelect(random.name);
    } else {
      onChange(random.name);
    }
  };

  return (
    <div className={`relative ${className}`} ref={containerRef} id={id}>
      {label && (
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>{label}</span>
            {required && <span className="text-rose-500">*</span>}
          </label>
          {showRandomButton && (
            <button
              type="button"
              onClick={handleTriggerRandom}
              disabled={disabled}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
              title="Pick a random country from around the world"
              id={`${id}-random-btn`}
            >
              <Shuffle className="w-3 h-3" />
              <span>Surprise Me (Random)</span>
            </button>
          )}
        </div>
      )}

      {/* Main trigger button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(prev => !prev)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          id={`${id}-trigger`}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 bg-white border rounded-xl text-left text-sm font-medium transition-all shadow-2xs ${
            isOpen 
              ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-sm' 
              : 'border-slate-300 hover:border-slate-400 text-slate-900'
          } ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-50' : 'cursor-pointer'}`}
        >
          <div className="flex items-center gap-2.5 truncate">
            {isAnyRandomSelected ? (
              <>
                <span className="text-base leading-none">🎲</span>
                <span className="font-bold text-slate-800">Any Country (Random)</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                  Global
                </span>
              </>
            ) : selectedCountry ? (
              <>
                <span className="text-base leading-none">
                  {getFlagEmoji(selectedCountry.alpha2)}
                </span>
                <span className="font-semibold text-slate-900 truncate">
                  {selectedCountry.name}
                </span>
                <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                  ({selectedCountry.phonePrefix})
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 hidden md:inline">
                  {selectedCountry.region}
                </span>
              </>
            ) : value ? (
              <>
                <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-semibold text-slate-900 truncate">{value}</span>
              </>
            ) : (
              <>
                <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-400 font-normal">Select Country / Territory...</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 shrink-0 ml-2">
            {value && !disabled && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(allowAnyRandom ? 'Any Country (Random)' : '');
                }}
                className="hover:text-slate-600 p-0.5 rounded"
                title="Clear selection"
              >
                <X className="w-3.5 h-3.5" />
              </span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
          </div>
        </button>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div 
          className="absolute z-50 left-0 right-0 mt-1.5 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
          style={{ minWidth: '280px' }}
        >
          {/* Search box header */}
          <div className="p-2.5 border-b border-slate-100 bg-slate-50/80">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setHighlightedIndex(0);
                }}
                placeholder={placeholder}
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                id={`${id}-search-input`}
              />
            </div>
            <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-slate-500 font-medium">
              <span>{filteredCountries.length} countries found</span>
              <button
                type="button"
                onClick={handleTriggerRandom}
                className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Shuffle className="w-3 h-3" />
                <span>Random pick</span>
              </button>
            </div>
          </div>

          {/* Quick Option: Any Country (Random) if enabled */}
          {allowAnyRandom && !searchQuery.trim() && (
            <div className="p-1 border-b border-slate-100 bg-purple-50/40">
              <div
                role="option"
                aria-selected={isAnyRandomSelected}
                onClick={() => handleSelect('Any Country (Random)')}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-xs transition-colors ${
                  isAnyRandomSelected 
                    ? 'bg-purple-100 text-purple-900 font-bold' 
                    : 'text-purple-900 hover:bg-purple-100/70 font-semibold'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">🎲</span>
                  <div>
                    <div className="font-bold">Any Country (Random)</div>
                    <div className="text-[10px] text-purple-700 font-normal">
                      Picks a fresh country from all 250+ countries on each generation
                    </div>
                  </div>
                </div>
                {isAnyRandomSelected && <Check className="w-4 h-4 text-purple-600 shrink-0" />}
              </div>
            </div>
          )}

          {/* Countries list */}
          <div 
            ref={listRef} 
            className="max-h-64 overflow-y-auto p-1.5 divide-y divide-slate-50 focus:outline-hidden"
            role="listbox"
          >
            {filteredCountries.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                <Globe className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="font-medium">No country found matching &ldquo;{searchQuery}&rdquo;</p>
                <p className="text-[11px] text-slate-400 mt-1">Try searching by official name, code (e.g. US, NG, GB), or capital city.</p>
              </div>
            ) : (
              filteredCountries.map((c, idx) => {
                const isSelected = selectedCountry?.name.toLowerCase() === c.name.toLowerCase();
                const isHighlighted = idx === highlightedIndex;

                return (
                  <div
                    key={c.name}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(c.name)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-colors ${
                      isSelected 
                        ? 'bg-blue-50 text-blue-950 font-bold' 
                        : isHighlighted 
                        ? 'bg-slate-100 text-slate-900' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-base leading-none shrink-0">
                        {getFlagEmoji(c.alpha2)}
                      </span>
                      <div className="truncate">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate">{c.name}</span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {c.alpha2}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-normal truncate">
                          {c.capital ? `${c.capital}, ` : ''}{c.region} • Dial: {c.phonePrefix}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                        {c.region}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer note */}
          <div className="p-2 border-t border-slate-100 bg-slate-50 text-[10px] text-slate-400 flex items-center justify-between px-3">
            <span>250+ Global Countries & Territories</span>
            <span>Use ↑↓ arrows to navigate, Enter to select</span>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { CvFont, CvFontSize } from '../../types/cv';
import { Type, ALargeSmall, AlignLeft, Sparkles, Check, SlidersHorizontal } from 'lucide-react';

interface CvTypographyToolbarProps {
  selectedFont: CvFont;
  selectedFontSize: CvFontSize;
  selectedSpacing?: 'compact' | 'normal' | 'spacious';
  wordingTone?: 'executive' | 'technical' | 'modern';
  onFontChange: (font: CvFont) => void;
  onFontSizeChange: (size: CvFontSize) => void;
  onSpacingChange?: (spacing: 'compact' | 'normal' | 'spacious') => void;
  onToneChange?: (tone: 'executive' | 'technical' | 'modern') => void;
  onRegenerateWording?: () => void;
  compact?: boolean;
}

const FONTS: { id: CvFont; label: string; sample: string; desc: string }[] = [
  { id: 'sans', label: 'Modern Sans', sample: 'Aa', desc: 'Inter / Crisp & Clean' },
  { id: 'serif', label: 'Executive Serif', sample: 'Gg', desc: 'Merriweather / Editorial' },
  { id: 'grotesk', label: 'Clean Grotesk', sample: 'Kk', desc: 'Plus Jakarta / Contemporary' },
  { id: 'mono', label: 'Technical Mono', sample: '01', desc: 'JetBrains / Precision Tech' },
  { id: 'classic', label: 'Classic Formal', sample: 'Rr', desc: 'Libre Baskerville / Academic' },
  { id: 'modern', label: 'High-Impact', sample: 'Qq', desc: 'Contemporary Executive' }
];

const FONT_SIZES: { id: CvFontSize; label: string; badge: string; desc: string }[] = [
  { id: 'sm', label: 'Compact', badge: '12.5px', desc: 'Dense, fit maximum content' },
  { id: 'md', label: 'Standard', badge: '14px', desc: 'Balanced, clear & highly legible' },
  { id: 'lg', label: 'Large', badge: '15.5px', desc: 'Crisp readability, easy to scan' },
  { id: 'xl', label: 'Extra', badge: '17px', desc: 'Large font, bold presentation' }
];

const SPACING_OPTIONS: { id: 'compact' | 'normal' | 'spacious'; label: string }[] = [
  { id: 'compact', label: 'Tight' },
  { id: 'normal', label: 'Balanced' },
  { id: 'spacious', label: 'Spacious' }
];

const TONES: { id: 'executive' | 'technical' | 'modern'; label: string; desc: string }[] = [
  { id: 'executive', label: 'Executive Leadership', desc: 'Strategic, authority-driven wording' },
  { id: 'technical', label: 'Technical & AI Platform', desc: 'Metric-dense, algorithmic rigor' },
  { id: 'modern', label: 'High-Impact Modern', desc: 'Articulate, contemporary phrasing' }
];

export const CvTypographyToolbar: React.FC<CvTypographyToolbarProps> = ({
  selectedFont,
  selectedFontSize,
  selectedSpacing = 'normal',
  wordingTone = 'executive',
  onFontChange,
  onFontSizeChange,
  onSpacingChange,
  onToneChange,
  onRegenerateWording,
  compact = false
}) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Type className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              Typography & Font Controller
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                Page-Fitted
              </span>
            </h4>
            <p className="text-[11px] text-slate-500">
              Customize font family, scale sizes, adjust spacing, and refine professional wording.
            </p>
          </div>
        </div>

        {onRegenerateWording && (
          <button
            type="button"
            onClick={onRegenerateWording}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold cursor-pointer transition-colors shrink-0"
            title="Re-generate wording with high-depth professional phrasing"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Polish & Deepen Wording</span>
          </button>
        )}
      </div>

      {/* Grid Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {/* 1. Font Family Selector */}
        <div className="space-y-1.5">
          <label className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-slate-500" />
              Font Family
            </span>
            <span className="text-[10px] text-blue-600 font-semibold">
              {FONTS.find(f => f.id === selectedFont)?.label || 'Modern Sans'}
            </span>
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {FONTS.map(font => {
              const isSelected = selectedFont === font.id;
              return (
                <button
                  key={font.id}
                  type="button"
                  onClick={() => onFontChange(font.id)}
                  className={`px-2 py-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-500/20 text-blue-900 shadow-2xs'
                      : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold truncate">{font.label}</span>
                    <span className="text-xs opacity-70 font-serif">{font.sample}</span>
                  </div>
                  <span className="text-[10px] opacity-60 truncate mt-0.5">{font.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Font Size & Readability Scale */}
        <div className="space-y-1.5">
          <label className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <ALargeSmall className="w-3.5 h-3.5 text-slate-500" />
              Font Size & Readability
            </span>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
              {FONT_SIZES.find(s => s.id === selectedFontSize)?.badge}
            </span>
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {FONT_SIZES.map(size => {
              const isSelected = selectedFontSize === size.id;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => onFontSizeChange(size.id)}
                  className={`py-2 px-1.5 rounded-xl text-center border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-500/20 text-emerald-950 font-bold shadow-2xs'
                      : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-100/80'
                  }`}
                  title={size.desc}
                >
                  <div className="text-xs font-bold">{size.label}</div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">{size.badge}</div>
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-slate-500 italic pt-0.5">
            Tip: Select "Standard" for crystal-clear readability, or "Compact" to fit deep multi-year records on 1 page.
          </p>
        </div>

        {/* 3. Margins & Wording Tone */}
        <div className="space-y-1.5">
          <label className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <AlignLeft className="w-3.5 h-3.5 text-slate-500" />
              Spacing & Margins
            </span>
            {onSpacingChange && (
              <span className="text-[10px] text-slate-500 font-medium">
                {selectedSpacing}
              </span>
            )}
          </label>

          {onSpacingChange && (
            <div className="grid grid-cols-3 gap-1.5">
              {SPACING_OPTIONS.map(sp => {
                const isSelected = selectedSpacing === sp.id;
                return (
                  <button
                    key={sp.id}
                    type="button"
                    onClick={() => onSpacingChange(sp.id)}
                    className={`py-2 px-1.5 rounded-xl text-center border text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 font-bold shadow-2xs'
                        : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-100/80'
                    }`}
                  >
                    {sp.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Wording Tone */}
          {onToneChange && (
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
                <span>Wording Style:</span>
                <span className="text-purple-700 capitalize font-bold">
                  {wordingTone}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {TONES.map(t => {
                  const isSelected = wordingTone === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => onToneChange(t.id)}
                      className={`py-1 px-1 rounded-lg text-[10px] font-medium border text-center transition-all cursor-pointer truncate ${
                        isSelected
                          ? 'bg-purple-50 text-purple-800 border-purple-300 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                      title={t.desc}
                    >
                      {t.label.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

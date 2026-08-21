import React from 'react';
import { Star } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleOpenReview = () => {
    window.dispatchEvent(new CustomEvent('netiqcv:show-review-prompt', {
      detail: { actionTrigger: 'manual' }
    }));
  };

  return (
    <footer className="no-print mt-auto px-6 sm:px-12 py-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row justify-between items-center gap-3">
      <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        <span>Drafts Auto-Saved Locally in Browser</span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500">
        <button
          onClick={handleOpenReview}
          className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
          title="Rate & Review Experience"
          id="btn-footer-review"
        >
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>Rate & Review</span>
        </button>
        <span className="text-slate-300 hidden sm:inline">•</span>
        <span className="font-semibold text-slate-700">
          Created with precision by <strong className="text-blue-600 font-bold">CreatIQ Products</strong>
        </span>
        <span className="text-slate-300 hidden sm:inline">•</span>
        <span className="text-slate-400">A4 Vector PDF Ready</span>
        <span className="text-slate-300 hidden sm:inline">•</span>
        <span className="text-slate-400">© {new Date().getFullYear()} CreatIQ Products</span>
      </div>
    </footer>
  );
};

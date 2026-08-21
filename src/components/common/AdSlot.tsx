import React, { useState, useEffect } from 'react';
import { Megaphone, X } from 'lucide-react';
import { AD_SCHEDULE } from '../../config/adSchedule';

interface AdSlotProps {
  slotId: string;
  title?: string;
  badge?: string;
  isActive: boolean;
  closeCountdown?: number;
  onDismiss?: (slotId: string) => void;
  children: React.ReactNode;
}

/**
 * AdSlot Component
 * Strictly bounded advertisement container with reliable user dismiss/close control.
 * - Renders ONLY when isActive is true and not dismissed.
 * - Starts a 5-second countdown upon becoming active.
 * - Enables Close button after countdown reaches 0.
 * - Clicking Close immediately dismisses the ad slot.
 * - Does NOT create modals, overlays, popups, floating layers, or body-appended elements.
 * - Responsive layout matching website styling.
 */
export const AdSlot: React.FC<AdSlotProps> = ({
  slotId,
  title = 'Advertisement',
  badge = 'Sponsored',
  isActive,
  closeCountdown = AD_SCHEDULE.closeCountdown,
  onDismiss,
  children,
}) => {
  const [countdown, setCountdown] = useState<number>(closeCountdown);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    if (!isActive || isDismissed) {
      return;
    }

    setCountdown(closeCountdown);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isActive, isDismissed, closeCountdown]);

  if (!isActive || isDismissed) {
    return null;
  }

  const handleCloseAd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (countdown > 0) return;
    setIsDismissed(true);
    if (onDismiss) {
      onDismiss(slotId);
    }
  };

  return (
    <section
      id={`ad-slot-section-${slotId}`}
      aria-label={`${title} Section`}
      className="w-full max-w-[300px] md:max-w-7xl mx-auto px-1 sm:px-4 md:px-6 lg:px-8 my-1 md:my-6 transition-all duration-300"
    >
      <div 
        id={`ad-box-${slotId}`}
        className="w-full bg-white rounded-lg md:rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col"
      >
        {/* Ad Slot Header Strip */}
        <div className="px-2 py-1 md:px-4 md:py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] md:text-xs text-slate-500">
          <div className="flex items-center gap-1.5 md:gap-2 font-medium text-slate-700">
            <Megaphone className="w-3 h-3 md:w-3.5 md:h-3.5 text-blue-600 shrink-0" />
            <span className="font-semibold text-[11px] md:text-xs">{title}</span>
            <span className="text-[9px] md:text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-600">
              {badge}
            </span>
          </div>

          {/* Close / Dismiss Control */}
          <div className="flex items-center gap-1.5">
            <button
              id={`close-ad-btn-${slotId}`}
              type="button"
              onClick={handleCloseAd}
              disabled={countdown > 0}
              aria-label={countdown > 0 ? `Close advertisement in ${countdown} seconds` : 'Close advertisement'}
              className={`px-2 py-0.5 md:px-3 md:py-1.5 rounded md:rounded-lg text-[11px] md:text-xs font-semibold transition-all flex items-center gap-1 shrink-0 ${
                countdown > 0
                  ? 'bg-slate-200/80 text-slate-500 cursor-not-allowed opacity-80'
                  : 'bg-slate-800 hover:bg-slate-900 text-white shadow-xs cursor-pointer active:scale-95'
              }`}
            >
              <X className="w-3 h-3 md:w-3.5 md:h-3.5" />
              <span className="whitespace-nowrap">{countdown > 0 ? `Close in ${countdown}` : 'Close'}</span>
            </button>
          </div>
        </div>

        {/* Ad Content Container */}
        <div className="w-full max-w-[300px] md:max-w-none h-[35px] min-h-[35px] max-h-[40px] md:h-auto md:min-h-[120px] md:max-h-none mx-auto bg-slate-50/40 flex items-center justify-center p-0.5 md:p-4 overflow-hidden">
          {children}
        </div>
      </div>
    </section>
  );
};

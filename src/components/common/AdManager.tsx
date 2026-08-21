import React from 'react';
import { useAdScheduler } from '../../hooks/useAdScheduler';
import { Quge5AdSlot } from './Quge5AdSlot';
import { EffectiveCpmAdSlot } from './EffectiveCpmAdSlot';

/**
 * AdManager Component
 * Centralized manager for all advertising network slots.
 * - Governed strictly by the single scheduler config (30s initial delay, 20s sequential interval).
 * - Renders only dedicated, responsive advertisement boxes.
 * - Each ad slot provides a 5-second close countdown and reliable user dismiss button.
 * - Completely avoids any popups, modal overlays, or body-level script injections.
 */
export const AdManager: React.FC = () => {
  const { isSlotActive, dismissSlot } = useAdScheduler();

  return (
    <div id="ad-slots-container" className="w-full flex flex-col gap-1 md:gap-4 my-1 md:my-0">
      {/* Ad Slot 1: Network 1 (quge5) */}
      <Quge5AdSlot 
        isActive={isSlotActive('ad-slot-1')} 
        onDismiss={dismissSlot}
      />

      {/* Ad Slot 2: Network 2 (Effective CPM) */}
      <EffectiveCpmAdSlot 
        isActive={isSlotActive('ad-slot-2')} 
        onDismiss={dismissSlot}
      />
    </div>
  );
};

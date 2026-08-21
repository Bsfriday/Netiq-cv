import { useState, useEffect, useCallback } from 'react';
import { AD_SCHEDULE, AdScheduleConfig } from '../config/adSchedule';

/**
 * Custom React hook for centralized ad scheduling.
 * - Manages one centralized set of timers.
 * - Activates slot 1 after initialDelay (30s).
 * - Activates each subsequent slot after interval (20s).
 * - Tracks dismissed slots cleanly.
 * - Cleans up all pending timers on unmount.
 */
export function useAdScheduler(config: AdScheduleConfig = AD_SCHEDULE) {
  const [activeSlots, setActiveSlots] = useState<string[]>([]);
  const [dismissedSlots, setDismissedSlots] = useState<string[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    config.slots.forEach((slotId, index) => {
      // Slot 0 activates at initialDelay (e.g. 30s)
      // Slot 1 activates at initialDelay + 1 * interval (e.g. 50s)
      // Slot n activates at initialDelay + n * interval
      const delay = config.initialDelay + index * config.interval;

      const timer = setTimeout(() => {
        setActiveSlots((prev) => (prev.includes(slotId) ? prev : [...prev, slotId]));
      }, delay);

      timers.push(timer);
    });

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [config]);

  const dismissSlot = useCallback((slotId: string) => {
    setDismissedSlots((prev) => (prev.includes(slotId) ? prev : [...prev, slotId]));
  }, []);

  const isSlotActive = useCallback((slotId: string): boolean => {
    return activeSlots.includes(slotId) && !dismissedSlots.includes(slotId);
  }, [activeSlots, dismissedSlots]);

  return { activeSlots, dismissedSlots, isSlotActive, dismissSlot, closeCountdown: config.closeCountdown };
}

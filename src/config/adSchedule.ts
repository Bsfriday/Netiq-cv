export interface AdScheduleConfig {
  initialDelay: number;
  interval: number;
  closeCountdown: number;
  slots: readonly string[];
}

/**
 * Centralized Single Source of Truth for Advertisement Scheduling
 * - Initial website load: wait 30 seconds before activating Slot 1
 * - Sequential interval: wait 20 seconds between each subsequent ad slot activation
 * - Close countdown: 5 seconds before close control enables
 */
export const AD_SCHEDULE: AdScheduleConfig = {
  initialDelay: 30000, // 30 seconds
  interval: 20000,     // 20 seconds
  closeCountdown: 5,   // 5 seconds
  slots: [
    'ad-slot-1', // Network 1: quge5.com
    'ad-slot-2', // Network 2: Effective CPM Network
  ] as const,
};

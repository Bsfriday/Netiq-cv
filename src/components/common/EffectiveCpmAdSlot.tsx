import React, { useEffect, useRef } from 'react';
import { AdSlot } from './AdSlot';

interface EffectiveCpmAdSlotProps {
  isActive: boolean;
  onDismiss?: (slotId: string) => void;
}

const SCRIPT_SRC = 'https://pl30943467.effectivecpmnetwork.com/169d659922ca3cb3f03ee17ab8b9c4cd/invoke.js';
const CONTAINER_ID = 'container-169d659922ca3cb3f03ee17ab8b9c4cd';

/**
 * Ad Slot 2: Effective CPM Network
 * - Activated after 30s + 20s (50s total) via centralized scheduler.
 * - Injects script only once into its dedicated container when active.
 * - Has 5-second close countdown and reliable dismiss control.
 * - Container ID: container-169d659922ca3cb3f03ee17ab8b9c4cd
 */
export const EffectiveCpmAdSlot: React.FC<EffectiveCpmAdSlotProps> = ({ isActive, onDismiss }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    // Check if script is already present to prevent duplicate injection
    const existingScript = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    let scriptElement: HTMLScriptElement | null = null;

    if (!existingScript && containerRef.current) {
      try {
        const script = document.createElement('script');
        script.src = SCRIPT_SRC;
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.id = 'effectivecpm-invoke-script';

        containerRef.current.appendChild(script);
        scriptElement = script;
      } catch (err) {
        console.warn('EffectiveCPM Network script init notice:', err);
      }
    }

    return () => {
      if (scriptElement && scriptElement.parentNode) {
        try {
          scriptElement.parentNode.removeChild(scriptElement);
        } catch {
          // Ignore cleanup errors
        }
      }
    };
  }, [isActive]);

  return (
    <AdSlot
      slotId="ad-slot-2"
      title="Advertisement"
      badge="Sponsored Network"
      isActive={isActive}
      onDismiss={onDismiss}
    >
      <div 
        ref={containerRef}
        className="w-full max-w-[300px] md:max-w-none h-[35px] min-h-[35px] max-h-[40px] md:h-auto md:min-h-[120px] flex items-center justify-center p-0 md:p-4 overflow-hidden"
      >
        <div 
          id={CONTAINER_ID} 
          className="w-full flex items-center justify-center min-h-[35px] max-h-[40px] md:min-h-[60px]" 
        />
      </div>
    </AdSlot>
  );
};

import React from 'react';
import { AdSlot } from './AdSlot';

interface Quge5AdSlotProps {
  isActive: boolean;
  onDismiss?: (slotId: string) => void;
}

/**
 * Ad Slot 1: Quge5 Network
 * - Activated after initial delay (30 seconds) via centralized scheduler.
 * - Rendered in a sandboxed iframe to prevent page-level overlays, body mutation, or click interception.
 * - Has 5-second close countdown and reliable dismiss control.
 */
export const Quge5AdSlot: React.FC<Quge5AdSlotProps> = ({ isActive, onDismiss }) => {
  return (
    <AdSlot
      slotId="ad-slot-1"
      title="Advertisement"
      badge="Partner Network"
      isActive={isActive}
      onDismiss={onDismiss}
    >
      <div 
        id="quge5-ad-container"
        className="relative w-full max-w-[300px] md:max-w-none h-[35px] min-h-[35px] max-h-[40px] md:h-auto md:min-h-[220px] lg:min-h-[260px] flex items-center justify-center overflow-hidden"
      >
        <iframe
          id="quge5-isolated-frame"
          title="Advertisement Content"
          srcDoc={`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      font-family: system-ui, -apple-system, sans-serif;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <script src="https://quge5.com/88/tag.min.js" data-zone="271817" async data-cfasync="false"><\/script>
</body>
</html>`}
          className="w-full h-[35px] max-h-[40px] md:h-[220px] lg:h-[260px] border-0 block"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          loading="lazy"
        />
      </div>
    </AdSlot>
  );
};

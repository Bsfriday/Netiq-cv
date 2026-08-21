import React, { useState, useEffect, useRef } from 'react';
import { ResumeData } from '../../types/cv';
import { CvRenderer } from '../cv-templates/CvRenderer';
import { ZoomIn, ZoomOut, Maximize2, Minimize2, RefreshCw } from 'lucide-react';

interface ResponsiveCvPreviewProps {
  data: ResumeData;
  className?: string;
  initialScale?: number;
  showControls?: boolean;
}

export const ResponsiveCvPreview: React.FC<ResponsiveCvPreviewProps> = ({
  data,
  className = '',
  initialScale,
  showControls = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Base A4 width in pixels at standard 96 DPI: 210mm ≈ 794px
  const BASE_WIDTH = 794;
  // Base A4 height in pixels: 297mm ≈ 1123px
  const BASE_HEIGHT = 1123;

  const calculateAutoFitScale = () => {
    if (typeof window === 'undefined') return 0.85;
    const windowW = window.innerWidth;
    const padding = windowW < 640 ? 20 : windowW < 1024 ? 32 : 48;
    const containerW = containerRef.current?.clientWidth || windowW;
    const usableW = Math.min(containerW, windowW) - padding;
    return Math.min(1.0, Math.max(0.30, Number((Math.max(220, usableW) / BASE_WIDTH).toFixed(3))));
  };

  const [autoScale, setAutoScale] = useState<number>(calculateAutoFitScale);
  const [customScale, setCustomScale] = useState<number | null>(initialScale || null);
  const [fitMode, setFitMode] = useState<'fit' | 'actual'>('fit');
  const [renderedHeight, setRenderedHeight] = useState<number>(BASE_HEIGHT);

  useEffect(() => {
    const updateScaleAndHeight = () => {
      if (!containerRef.current) return;
      const windowW = window.innerWidth;
      const clientW = containerRef.current.clientWidth;
      const padding = windowW < 640 ? 20 : windowW < 1024 ? 32 : 48;
      const usableW = Math.min(clientW || windowW, windowW) - padding;
      
      const newScale = Math.min(1.0, Math.max(0.30, Number((Math.max(220, usableW) / BASE_WIDTH).toFixed(3))));
      setAutoScale(newScale);

      if (innerRef.current) {
        const measured = innerRef.current.offsetHeight || innerRef.current.scrollHeight;
        if (measured > 100) {
          setRenderedHeight(measured);
        }
      }
    };

    updateScaleAndHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateScaleAndHeight();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    if (innerRef.current) {
      resizeObserver.observe(innerRef.current);
    }

    window.addEventListener('resize', updateScaleAndHeight);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateScaleAndHeight);
    };
  }, [data]);

  const activeScale = customScale !== null ? customScale : (fitMode === 'actual' ? 1.0 : autoScale);

  const handleZoomIn = () => {
    setCustomScale(prev => {
      const current = prev !== null ? prev : activeScale;
      return Math.min(1.4, Number((current + 0.1).toFixed(2)));
    });
  };

  const handleZoomOut = () => {
    setCustomScale(prev => {
      const current = prev !== null ? prev : activeScale;
      return Math.max(0.30, Number((current - 0.1).toFixed(2)));
    });
  };

  const handleToggleFit = () => {
    if (customScale !== null || fitMode === 'actual') {
      setCustomScale(null);
      setFitMode('fit');
    } else {
      setCustomScale(1.0);
      setFitMode('actual');
    }
  };

  const handleResetFit = () => {
    setCustomScale(null);
    setFitMode('fit');
  };

  // Dimensions of the scaled box
  const scaledWidth = Math.round(BASE_WIDTH * activeScale);
  const scaledHeight = Math.round(renderedHeight * activeScale);

  return (
    <div className={`w-full max-w-full min-w-0 flex flex-col items-center overflow-hidden ${className}`} ref={containerRef}>
      {/* Zoom / Viewport Bar */}
      {showControls && (
        <div className="no-print w-full max-w-full flex items-center justify-between bg-white/95 backdrop-blur-xs px-3 py-2 rounded-2xl border border-slate-200/90 shadow-xs mb-3 text-xs gap-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-700">
            <span className="hidden xs:inline text-slate-500 uppercase tracking-wider text-[10px]">Preview:</span>
            <span className="text-blue-600 font-extrabold">{Math.round(activeScale * 100)}%</span>
            {customScale === null && fitMode === 'fit' && (
              <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                Auto-Fit
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 rounded-lg transition-colors"
              title="Zoom out"
              id="btn-preview-zoom-out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleToggleFit}
              className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all flex items-center gap-1 ${
                customScale === null && fitMode === 'fit'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title={fitMode === 'fit' ? 'Switch to 100% view' : 'Fit to screen'}
              id="btn-preview-toggle-fit"
            >
              {fitMode === 'fit' && customScale === null ? (
                <>
                  <Minimize2 className="w-3 h-3 text-blue-600" />
                  <span>Fit Width</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3 h-3" />
                  <span>100% View</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 rounded-lg transition-colors"
              title="Zoom in"
              id="btn-preview-zoom-in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            {customScale !== null && (
              <button
                type="button"
                onClick={handleResetFit}
                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Reset to Fit Screen"
                id="btn-preview-reset-fit"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Outer Container with strict max-w-full and scroll safety */}
      <div 
        className="w-full max-w-full min-w-0 flex justify-center overflow-x-auto overflow-y-visible pb-6 scrollbar-none"
        style={{
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {/* Scaled bounding wrapper that adjusts layout size to match visual scale */}
        <div 
          style={{
            width: `${scaledWidth}px`,
            maxWidth: '100%',
            height: `${scaledHeight}px`,
            position: 'relative',
            transition: 'width 0.15s ease, height 0.15s ease',
            flexShrink: 0
          }}
          className="mx-auto"
        >
          <div
            ref={innerRef}
            style={{
              width: `${BASE_WIDTH}px`,
              transform: `scale(${activeScale})`,
              transformOrigin: 'top left',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <CvRenderer data={data} scale={1} />
          </div>
        </div>
      </div>
    </div>
  );
};

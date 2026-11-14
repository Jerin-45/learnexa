import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface PreloaderProps {
  onLoaded?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing career graph...');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Stage 1
    const t1 = setTimeout(() => {
      setProgress(35);
      setStatusText('Calibrating multi-agent intelligence mesh...');
    }, 250);

    // Stage 2
    const t2 = setTimeout(() => {
      setProgress(75);
      setStatusText('Synchronizing roadmap architecture...');
    }, 600);

    // Stage 3
    const t3 = setTimeout(() => {
      setProgress(100);
      setStatusText('Ready.');
    }, 950);

    // Fade out
    const t4 = setTimeout(() => {
      setIsFadingOut(true);
      if (onLoaded) onLoaded();
    }, 1200);

    // Completely remove from DOM
    const t5 = setTimeout(() => {
      setIsHidden(true);
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onLoaded]);

  if (isHidden) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAFAFA] dark:bg-[#0A0A0A] text-neutral-900 dark:text-neutral-100 transition-opacity duration-300 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-xs w-full px-6 space-y-6 text-center animate-fade-in">
        
        {/* Brand Icon & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white dark:text-black animate-pulse" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-white">
                Learnexa
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold">
                v2.4
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 font-medium">
              Autonomous Career Intelligence
            </p>
          </div>
        </div>

        {/* Minimal Linear Progress Bar */}
        <div className="w-full space-y-2">
          <div className="w-full h-[2px] bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-neutral-900 dark:bg-white transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Micro Status Text */}
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
            <span>{statusText}</span>
            <span>{progress}%</span>
          </div>
        </div>

      </div>
    </div>
  );
};

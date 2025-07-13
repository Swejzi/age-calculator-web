'use client';

import { useState } from 'react';

interface RealTimeControlsProps {
  isUpdating: boolean;
  onPause: () => void;
  onResume: () => void;
  onForceUpdate: () => void;
  locale: 'cs' | 'en' | 'de' | 'ja';
}

const translations = {
  cs: {
    realTimeControls: '⚡ Ovládání živých čísel',
    pause: '⏸️ Pozastavit',
    resume: '▶️ Obnovit',
    forceUpdate: '🔄 Aktualizovat nyní',
    status: 'Stav:',
    updating: 'Aktualizuje se',
    paused: 'Pozastaveno'
  },
  en: {
    realTimeControls: '⚡ Real-time Controls',
    pause: '⏸️ Pause',
    resume: '▶️ Resume',
    forceUpdate: '🔄 Update Now',
    status: 'Status:',
    updating: 'Updating',
    paused: 'Paused'
  },
  de: {
    realTimeControls: '⚡ Echtzeit-Steuerung',
    pause: '⏸️ Pausieren',
    resume: '▶️ Fortsetzen',
    forceUpdate: '🔄 Jetzt aktualisieren',
    status: 'Status:',
    updating: 'Aktualisiert',
    paused: 'Pausiert'
  },
  ja: {
    realTimeControls: '⚡ リアルタイム制御',
    pause: '⏸️ 一時停止',
    resume: '▶️ 再開',
    forceUpdate: '🔄 今すぐ更新',
    status: 'ステータス:',
    updating: '更新中',
    paused: '一時停止中'
  }
};

export function RealTimeControls({ 
  isUpdating, 
  onPause, 
  onResume, 
  onForceUpdate, 
  locale 
}: RealTimeControlsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const t = translations[locale];

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        title={t.realTimeControls}
      >
        ⚡
        <span className={`ml-1 w-2 h-2 rounded-full ${
          isUpdating ? 'bg-green-500 animate-pulse' : 'bg-red-500'
        }`}></span>
      </button>

      {/* Controls Panel */}
      {isVisible && (
        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 min-w-[200px] z-10">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            {t.realTimeControls}
          </h4>
          
          {/* Status */}
          <div className="flex items-center justify-between mb-3 text-sm">
            <span className="text-gray-600 dark:text-gray-400">{t.status}</span>
            <span className={`font-medium ${
              isUpdating ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {isUpdating ? t.updating : t.paused}
            </span>
          </div>

          {/* Control Buttons */}
          <div className="space-y-2">
            {isUpdating ? (
              <button
                type="button"
                onClick={onPause}
                className="w-full px-3 py-2 text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
              >
                {t.pause}
              </button>
            ) : (
              <button
                type="button"
                onClick={onResume}
                className="w-full px-3 py-2 text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
              >
                {t.resume}
              </button>
            )}

            <button
              type="button"
              onClick={onForceUpdate}
              className="w-full px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              {t.forceUpdate}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

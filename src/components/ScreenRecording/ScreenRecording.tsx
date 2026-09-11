import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const ScreenRecording: React.FC<{ isOpen?: boolean }> = ({ isOpen = true }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [micEnabled, setMicEnabled] = useState(true);
  const [systemAudioEnabled, setSystemAudioEnabled] = useState(true);
  const [mode, setMode] = useState<'fullscreen' | 'window' | 'area'>('fullscreen');

  useEffect(() => {
    let timer: any;
    if (isRecording && !isPaused) {
      timer = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording, isPaused]);

  const formatTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  };

  const handleStart = () => {
    setIsRecording(true);
    setSeconds(0);
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsRecording(false);
    setIsPaused(false);
  };

  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-[#051650]/95 backdrop-blur-xl border border-[#0A2472] rounded-xl p-5 text-[#F8FAFC] flex flex-col justify-between select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#0A2472]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#EF4444]">videocam</span>
          <h2 className="font-semibold text-base tracking-wide">Screen Recording</h2>
        </div>
        {isRecording ? (
          <div className="flex items-center gap-2 bg-[#EF4444]/20 border border-[#EF4444] px-3 py-1 rounded-full text-xs font-mono text-[#EF4444]">
            <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping"></span>
            REC • {formatTime(seconds)}
          </div>
        ) : (
          <span className="text-xs text-[#94A3B8] font-mono">Idle • Ready</span>
        )}
      </div>

      {/* Main Body Control Panel */}
      <div className="my-4 flex-1 bg-[#000720]/80 rounded-xl border border-[#0A2472] p-4 flex flex-col items-center justify-center space-y-4">
        {isRecording ? (
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#EF4444]/10 border border-[#EF4444] flex items-center justify-center text-[#EF4444] mx-auto animate-pulse">
              <span className="material-symbols-outlined text-3xl">videocam</span>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold text-white tracking-widest">{formatTime(seconds)}</div>
              <p className="text-xs text-[#94A3B8]">Capturing {mode} • PipeWire Audio Stream Active</p>
            </div>
          </div>
        ) : (
          <div className="w-full space-y-4">
            {/* Mode selection */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setMode('fullscreen')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  mode === 'fullscreen'
                    ? 'bg-[#4361EE] border-[#4895EF] text-white'
                    : 'bg-[#000720] border-[#0A2472] text-[#94A3B8]'
                }`}
              >
                <span className="material-symbols-outlined text-xl block mb-1">desktop_windows</span>
                <span className="text-xs">Full Screen</span>
              </button>
              <button
                onClick={() => setMode('window')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  mode === 'window'
                    ? 'bg-[#4361EE] border-[#4895EF] text-white'
                    : 'bg-[#000720] border-[#0A2472] text-[#94A3B8]'
                }`}
              >
                <span className="material-symbols-outlined text-xl block mb-1">web_asset</span>
                <span className="text-xs">Window</span>
              </button>
              <button
                onClick={() => setMode('area')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  mode === 'area'
                    ? 'bg-[#4361EE] border-[#4895EF] text-white'
                    : 'bg-[#000720] border-[#0A2472] text-[#94A3B8]'
                }`}
              >
                <span className="material-symbols-outlined text-xl block mb-1">crop</span>
                <span className="text-xs">Custom Area</span>
              </button>
            </div>

            {/* Audio Toggles */}
            <div className="flex items-center justify-around bg-[#000720] p-3 rounded-xl border border-[#0A2472]">
              <button
                onClick={() => setMicEnabled(!micEnabled)}
                className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                  micEnabled ? 'bg-[#26B170]/20 border-[#26B170] text-[#26B170]' : 'bg-[#0A2472] border-transparent text-[#94A3B8]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{micEnabled ? 'mic' : 'mic_off'}</span>
                Mic Audio
              </button>

              <button
                onClick={() => setSystemAudioEnabled(!systemAudioEnabled)}
                className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                  systemAudioEnabled ? 'bg-[#26B170]/20 border-[#26B170] text-[#26B170]' : 'bg-[#0A2472] border-transparent text-[#94A3B8]'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{systemAudioEnabled ? 'volume_up' : 'volume_off'}</span>
                System Audio
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-[#0A2472] flex items-center justify-between">
        {!isRecording ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="w-full py-2.5 bg-[#4361EE] hover:bg-[#4895EF] text-white text-xs font-semibold rounded-xl shadow-lg shadow-[#4361EE]/30 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">fiber_manual_record</span>
            Start Recording
          </motion.button>
        ) : (
          <div className="w-full flex items-center gap-3">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex-1 py-2 bg-[#0A2472] hover:bg-[#4895EF] text-white text-xs font-medium rounded-xl flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">{isPaused ? 'play_arrow' : 'pause'}</span>
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={handleStop}
              className="flex-1 py-2 bg-[#EF4444] hover:bg-red-600 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-red-500/20"
            >
              <span className="material-symbols-outlined text-base">stop</span>
              Stop & Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

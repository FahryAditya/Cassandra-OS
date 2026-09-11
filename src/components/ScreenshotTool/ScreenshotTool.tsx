import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const ScreenshotTool: React.FC<{ isOpen?: boolean }> = ({ isOpen = true }) => {
  const [mode, setMode] = useState<'fullscreen' | 'window' | 'area'>('area');
  const [delay, setDelay] = useState<number>(0);
  const [captured, setCaptured] = useState<boolean>(false);

  const handleCapture = () => {
    setCaptured(true);
    setTimeout(() => setCaptured(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-[#051650]/95 backdrop-blur-xl border border-[#0A2472] rounded-xl p-5 text-[#F8FAFC] flex flex-col justify-between select-none overflow-hidden">
      {/* Floating Toolbar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#0A2472]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#4CC9F0]">screenshot</span>
          <h2 className="font-semibold text-base tracking-wide">Screenshot Tool</h2>
        </div>
        <div className="flex items-center gap-1.5 bg-[#000720]/60 p-1 rounded-xl border border-[#0A2472]">
          <button
            onClick={() => setMode('fullscreen')}
            className={`px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 transition-colors ${
              mode === 'fullscreen' ? 'bg-[#4361EE] text-white font-medium' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">fullscreen</span> Full Screen
          </button>
          <button
            onClick={() => setMode('window')}
            className={`px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 transition-colors ${
              mode === 'window' ? 'bg-[#4361EE] text-white font-medium' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">filter_none</span> Window
          </button>
          <button
            onClick={() => setMode('area')}
            className={`px-2.5 py-1 rounded-lg text-xs flex items-center gap-1 transition-colors ${
              mode === 'area' ? 'bg-[#4361EE] text-white font-medium' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">crop</span> Selected Area
          </button>
        </div>
      </div>

      {/* Simulated Screen Selection Region Box */}
      <div className="my-4 flex-1 bg-[#000720]/80 rounded-xl border border-[#0A2472] p-4 relative flex items-center justify-center overflow-hidden">
        {mode === 'area' && (
          <div className="w-4/5 h-3/4 border-2 border-dashed border-[#4CC9F0] bg-[#4361EE]/10 rounded-lg flex flex-col items-center justify-center relative shadow-lg">
            <span className="font-mono text-xs bg-[#000720] text-[#4CC9F0] px-2 py-1 rounded border border-[#4CC9F0]/40 absolute top-2 right-2">
              820 x 460 px
            </span>
            <span className="material-symbols-outlined text-3xl text-[#4CC9F0] animate-pulse">crop_free</span>
            <p className="text-xs text-[#94A3B8] mt-1">Drag handles to adjust capture viewport</p>
          </div>
        )}

        {mode === 'fullscreen' && (
          <div className="text-center space-y-1">
            <span className="material-symbols-outlined text-4xl text-[#4361EE]">desktop_windows</span>
            <p className="text-xs text-[#94A3B8]">Entire 1920x1080 desktop screen will be captured</p>
          </div>
        )}

        {mode === 'window' && (
          <div className="text-center space-y-1">
            <span className="material-symbols-outlined text-4xl text-[#4895EF]">web_asset</span>
            <p className="text-xs text-[#94A3B8]">Click any active window frame to capture</p>
          </div>
        )}

        {captured && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-[#26B170]/90 backdrop-blur-md flex items-center justify-center flex-col text-white font-semibold gap-2"
          >
            <span className="material-symbols-outlined text-4xl">check_circle</span>
            <span>Screenshot Saved to /Pictures/Screenshots!</span>
          </motion.div>
        )}
      </div>

      {/* Controls & Delay Timer */}
      <div className="pt-3 border-t border-[#0A2472] flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <span>Delay:</span>
          <select
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            className="bg-[#000720] border border-[#0A2472] text-white rounded-lg px-2 py-1 focus:outline-none"
          >
            <option value={0}>0s (Instant)</option>
            <option value={3}>3 Seconds</option>
            <option value={5}>5 Seconds</option>
            <option value={10}>10 Seconds</option>
          </select>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleCapture}
          className="px-5 py-2 bg-[#4361EE] hover:bg-[#4895EF] text-white text-xs font-semibold rounded-xl shadow-lg shadow-[#4361EE]/30 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-base">photo_camera</span>
          Capture Screenshot
        </motion.button>
      </div>
    </div>
  );
};

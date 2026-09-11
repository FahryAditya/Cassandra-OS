import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MicrophoneSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MicrophoneSettings: React.FC<MicrophoneSettingsProps> = ({ isOpen, onClose }) => {
  const [selectedMic, setSelectedMic] = useState('mic-1');
  const [inputVolume, setInputVolume] = useState(80);
  const [noiseSuppression, setNoiseSuppression] = useState(true);
  const [meterLevel, setMeterLevel] = useState(45);
  const [isTesting, setIsTesting] = useState(false);

  const mics = [
    { id: 'mic-1', name: 'USB Studio Condenser Microphone (ALSA HDA)' },
    { id: 'mic-2', name: 'Integrated Array Microphones (Noise-Canceling)' },
    { id: 'mic-3', name: 'Bluetooth Headset Mic (PulseAudio PipeWire)' },
  ];

  const micPermissions = ['Voice Call Studio', 'Web Cam Studio', 'Chromium Browser'];

  // Simulate audio level meter fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setMeterLevel(Math.floor(Math.random() * 40) + 30);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto relative w-full max-w-[840px] h-[640px] bg-surface-container-low/95 rounded-xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl border border-surface-container-high/60"
          >
            {/* Titlebar */}
            <div className="h-9 px-4 bg-surface-container-lowest/90 flex items-center justify-between shrink-0 select-none border-b border-surface-container-high/40">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-[#EF4444] hover:opacity-80 transition-opacity flex items-center justify-center group cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[8px] text-surface-container-lowest opacity-0 group-hover:opacity-100">
                      close
                    </span>
                  </button>
                  <button className="w-3 h-3 rounded-full bg-[#F5C400] hover:opacity-80 transition-opacity flex items-center justify-center group cursor-pointer">
                    <span className="material-symbols-outlined text-[8px] text-surface-container-lowest opacity-0 group-hover:opacity-100">
                      remove
                    </span>
                  </button>
                  <button className="w-3 h-3 rounded-full bg-[#26B170] hover:opacity-80 transition-opacity flex items-center justify-center group cursor-pointer">
                    <span className="material-symbols-outlined text-[8px] text-surface-container-lowest opacity-0 group-hover:opacity-100">
                      fullscreen
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-2 ml-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">mic</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Microphone Input Settings
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-[#4CC9F0]">
                PipeWire Audio Engine
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Mic Device Selector & Meter Card */}
              <div className="bg-[#051650] border border-surface-container-high/40 rounded-xl p-6 space-y-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary">mic</span>
                    Audio Input Source
                  </h3>
                  <select
                    value={selectedMic}
                    onChange={(e) => setSelectedMic(e.target.value)}
                    className="bg-surface-container-high text-on-surface text-xs rounded-lg px-3 py-1.5 outline-none border border-surface-container-high/60 cursor-pointer"
                  >
                    {mics.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Live Input Level Meter */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#94A3B8] font-medium">
                    <span>Input Level Meter</span>
                    <span className="font-mono text-on-surface">{meterLevel} dB</span>
                  </div>

                  {/* Segmented Meter Bar */}
                  <div className="w-full h-4 bg-surface-container-lowest/80 rounded-md border border-surface-container-high/40 p-0.5 flex gap-1 overflow-hidden">
                    {Array.from({ length: 30 }).map((_, idx) => {
                      const isActive = (idx / 30) * 100 <= meterLevel;
                      let color = '#26B170'; // green
                      if (idx > 20) color = '#F5C400'; // amber
                      if (idx > 26) color = '#EF4444'; // red
                      return (
                        <div
                          key={idx}
                          className="flex-1 h-full rounded-xs transition-colors duration-75"
                          style={{
                            backgroundColor: isActive ? color : '#0A2472',
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Volume Slider & Controls */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-lg">tune</span>
                  Input Gain & Filtering
                </h3>

                <div className="space-y-4 pt-1">
                  {/* Gain Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-[#94A3B8]">
                      <span>Microphone Gain</span>
                      <span className="font-mono text-on-surface font-semibold">{inputVolume}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={inputVolume}
                      onChange={(e) => setInputVolume(Number(e.target.value))}
                      className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-[#4361EE]"
                    />
                  </div>

                  {/* Toggles & Test */}
                  <div className="flex items-center justify-between pt-2 border-t border-surface-container-high/30">
                    <div>
                      <p className="text-sm text-on-surface font-medium">AI Noise Suppression (eBPF Filter)</p>
                      <p className="text-xs text-[#94A3B8]">Filter background fan & ambient noise in real-time</p>
                    </div>
                    <button
                      onClick={() => setNoiseSuppression(!noiseSuppression)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        noiseSuppression ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          noiseSuppression ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-[#94A3B8]">Test Input Channel</span>
                    <button
                      onClick={() => setIsTesting(!isTesting)}
                      className="px-4 py-1.5 bg-[#4361EE] hover:bg-[#4361EE]/90 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-sm"
                    >
                      {isTesting ? 'Stop Loopback' : 'Test Microphone'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Permissions list */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-4 space-y-2">
                <p className="text-xs font-semibold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-base">lock</span>
                  Apps Authorized to Access Microphone
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {micPermissions.map((app) => (
                    <span
                      key={app}
                      className="px-2.5 py-1 rounded-md bg-surface-container-high/60 text-on-surface-variant text-xs font-medium border border-surface-container-high/40"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

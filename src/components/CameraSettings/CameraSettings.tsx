import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CameraSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CameraSettings: React.FC<CameraSettingsProps> = ({ isOpen, onClose }) => {
  const [selectedCamera, setSelectedCamera] = useState('cam-1');
  const [brightness, setBrightness] = useState(100);
  const [resolution, setResolution] = useState('1080p');
  const [isMirrored, setIsMirrored] = useState(true);

  const cameras = [
    { id: 'cam-1', name: 'Integrated HD Webcam (4K HDR)' },
    { id: 'cam-2', name: 'USB CyberCam Pro 60fps' },
    { id: 'cam-3', name: 'Virtual OBS Stream Camera' },
  ];

  const authorizedApps = [
    'Web Cam Studio (Active)',
    'Chromium Browser Engine',
    'Security Center Guard',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto relative w-full max-w-[880px] h-[660px] bg-surface-container-low/95 rounded-xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl border border-surface-container-high/60"
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">videocam</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Camera & Live Feed
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-[#4CC9F0]">
                V4L2 Video Device Pipeline
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 flex flex-col">
              {/* Large Camera Preview Feed Frame */}
              <div className="relative w-full h-[280px] bg-[#000720] border-2 border-[#0A2472] rounded-xl overflow-hidden flex flex-col items-center justify-center shadow-lg group">
                <div
                  className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#051650]/40 to-[#0A2472]/40 transition-transform duration-300"
                  style={{
                    transform: isMirrored ? 'scaleX(-1)' : 'none',
                    filter: `brightness(${brightness}%)`,
                  }}
                >
                  <span className="material-symbols-outlined text-7xl text-[#4CC9F0] animate-pulse">
                    photo_camera
                  </span>
                  <p className="text-xs text-[#94A3B8] mt-2 font-mono">
                    LIVE CAMERA FEED PREVIEW ({resolution})
                  </p>
                </div>

                {/* HUD Overlay Badge */}
                <div className="absolute top-3 left-3 bg-[#051650]/80 backdrop-blur-md px-3 py-1 rounded-full border border-surface-container-high/40 text-[11px] font-mono text-[#26B170] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#26B170] animate-ping" />
                  REC FEED ONLINE
                </div>
              </div>

              {/* Quick Controls Card */}
              <div className="bg-[#051650] border border-surface-container-high/40 rounded-xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary text-lg">tune</span>
                    Camera Controls & Settings
                  </h3>

                  {/* Camera Device Selector */}
                  <select
                    value={selectedCamera}
                    onChange={(e) => setSelectedCamera(e.target.value)}
                    className="bg-surface-container-high text-on-surface text-xs rounded-lg px-3 py-1.5 outline-none border border-surface-container-high/60 cursor-pointer"
                  >
                    {cameras.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-1">
                  {/* Brightness */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-[#94A3B8]">
                      <span>Brightness</span>
                      <span className="font-mono text-on-surface">{brightness}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={brightness}
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-[#4361EE]"
                    />
                  </div>

                  {/* Resolution */}
                  <div className="space-y-1.5">
                    <span className="text-xs text-[#94A3B8] block">Resolution</span>
                    <select
                      value={resolution}
                      onChange={(e) => setResolution(e.target.value)}
                      className="w-full h-8 bg-surface-container-high text-on-surface text-xs rounded-lg px-2 outline-none border border-surface-container-high/60 cursor-pointer font-mono"
                    >
                      <option value="720p">1280 x 720 (720p HD)</option>
                      <option value="1080p">1920 x 1080 (1080p Full HD)</option>
                      <option value="4K">3840 x 2160 (4K Ultra HD)</option>
                    </select>
                  </div>

                  {/* Mirror Toggle */}
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-xs text-[#94A3B8]">Mirror Video</span>
                    <button
                      onClick={() => setIsMirrored(!isMirrored)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        isMirrored ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          isMirrored ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Permissions Note Card */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-4 space-y-2">
                <p className="text-xs font-semibold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-base">lock</span>
                  Applications with Active Camera Permission
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {authorizedApps.map((app) => (
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

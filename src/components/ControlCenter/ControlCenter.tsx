import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ControlCenter: React.FC<ControlCenterProps> = ({ isOpen, onClose }) => {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airplane, setAirplane] = useState(false);
  const [dnd, setDnd] = useState(false);
  const [nightLight, setNightLight] = useState(true);
  const [mesh, setMesh] = useState(true);

  const [brightness, setBrightness] = useState(85);
  const [volume, setVolume] = useState(70);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Scrim */}
          <div className="fixed inset-0 z-40" onClick={onClose} />

          {/* Right Floating Control Center Panel */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-16 right-4 z-50 w-[368px] bg-surface-container/95 backdrop-blur-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col gap-4 p-4 border border-surface-container-high/60"
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between px-1 pb-1 border-b border-surface-container-high/40">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[18px]">tune</span>
                <span className="font-label-md text-label-md text-on-surface tracking-wide uppercase font-semibold">
                  Control Center
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-surface-container-high px-2.5 py-1 rounded-full border border-surface-container-highest">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary shadow-[0_0_6px_#5bd5fc]" />
                <span className="font-code-sm text-code-sm text-tertiary font-medium">
                  PRO_PROFILE
                </span>
              </div>
            </div>

            {/* Quick Toggle Tiles 2x3 Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Wi-Fi */}
              <div
                onClick={() => setWifi(!wifi)}
                className={`group relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  wifi
                    ? 'bg-primary-container text-on-primary-container shadow-md'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-surface-container-lowest/30 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px] text-white">wifi</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-md text-label-md font-medium truncate">Wi-Fi</span>
                  <span className="font-body-sm text-[11px] opacity-80 truncate">
                    {wifi ? 'Cassandra_5G' : 'Off'}
                  </span>
                </div>
              </div>

              {/* Bluetooth */}
              <div
                onClick={() => setBluetooth(!bluetooth)}
                className={`group relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  bluetooth
                    ? 'bg-primary-container text-on-primary-container shadow-md'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-surface-container-lowest/30 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px] text-white">
                    bluetooth
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-md text-label-md font-medium truncate">
                    Bluetooth
                  </span>
                  <span className="font-body-sm text-[11px] opacity-80 truncate">
                    {bluetooth ? 'WH-1000XM5' : 'Off'}
                  </span>
                </div>
              </div>

              {/* Airplane Mode */}
              <div
                onClick={() => setAirplane(!airplane)}
                className={`group relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  airplane
                    ? 'bg-primary-container text-on-primary-container shadow-md'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-surface-container-lowest/30 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">flight</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-md text-label-md font-medium truncate">
                    Airplane
                  </span>
                  <span className="font-body-sm text-[11px] opacity-80 truncate">
                    {airplane ? 'On' : 'Off'}
                  </span>
                </div>
              </div>

              {/* Do Not Disturb */}
              <div
                onClick={() => setDnd(!dnd)}
                className={`group relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  dnd
                    ? 'bg-primary-container text-on-primary-container shadow-md'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-surface-container-lowest/30 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">do_not_disturb_on</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-md text-label-md font-medium truncate">DND</span>
                  <span className="font-body-sm text-[11px] opacity-80 truncate">
                    {dnd ? 'Silent' : 'Off'}
                  </span>
                </div>
              </div>

              {/* Night Light */}
              <div
                onClick={() => setNightLight(!nightLight)}
                className={`group relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  nightLight
                    ? 'bg-primary-container text-on-primary-container shadow-md'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-surface-container-lowest/30 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">nightlight</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-md text-label-md font-medium truncate">
                    Night Light
                  </span>
                  <span className="font-body-sm text-[11px] opacity-80 truncate">
                    {nightLight ? 'Warm 65%' : 'Off'}
                  </span>
                </div>
              </div>

              {/* Security Mesh */}
              <div
                onClick={() => setMesh(!mesh)}
                className={`group relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] ${
                  mesh
                    ? 'bg-primary-container text-on-primary-container shadow-md'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-surface-container-lowest/30 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">security</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline-md text-label-md font-medium truncate">
                    Sec Mesh
                  </span>
                  <span className="font-body-sm text-[11px] opacity-80 truncate">
                    {mesh ? 'Protected' : 'Off'}
                  </span>
                </div>
              </div>
            </div>

            {/* Sliders Section */}
            <div className="space-y-3 pt-2 border-t border-surface-container-high/40">
              {/* Brightness Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">
                      light_mode
                    </span>
                    <span>Display Brightness</span>
                  </div>
                  <span className="font-mono text-tertiary">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full accent-tertiary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>

              {/* Volume Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">
                      volume_up
                    </span>
                    <span>System Volume</span>
                  </div>
                  <span className="font-mono text-tertiary">{volume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full accent-tertiary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

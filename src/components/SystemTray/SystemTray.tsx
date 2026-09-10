import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WindowId } from '../../types/os';

interface SystemTrayProps {
  isOpen: boolean;
  onClose: () => void;
  toggleWindow: (id: WindowId) => void;
}

export const SystemTray: React.FC<SystemTrayProps> = ({
  isOpen,
  onClose,
  toggleWindow,
}) => {
  const [wifiActive, setWifiActive] = useState(true);
  const [btActive, setBtActive] = useState(true);
  const [batterySaver, setBatterySaver] = useState(false);
  const [vpnActive, setVpnActive] = useState(true);

  const [masterVolume, setMasterVolume] = useState(82);
  const [micVolume, setMicVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Scrim */}
          <div onClick={onClose} className="fixed inset-0 z-40 bg-transparent" />

          {/* Floating System Tray Quick Indicator Detail Popover (Bottom-Right Anchored) */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-6 bottom-16 z-50 w-[400px] bg-surface-container-low/95 backdrop-blur-2xl rounded-2xl shadow-[0_24px_64px_rgba(1,15,31,0.95)] border border-surface-container-high/60 flex flex-col p-5 overflow-hidden"
          >
            {/* Top Header & Primary Network Context */}
            <div className="flex flex-col gap-1 pb-3 border-b border-surface-container-high/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">hub</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                    Network & Hardware Tray
                  </h2>
                </div>
                <span className="font-code-sm text-code-sm px-2 py-0.5 rounded bg-surface-container-high text-tertiary">
                  SYS-ONLINE
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 bg-surface-container-lowest/80 px-3 py-1.5 rounded-lg border border-surface-container-high/30">
                <span className="material-symbols-outlined text-tertiary text-[16px] animate-pulse">
                  wifi
                </span>
                <span className="font-label-sm text-label-sm text-on-surface truncate">
                  Connected: <strong className="text-secondary font-medium">CASS-NET-5G</strong> (Wi-Fi 6E, 1.2 Gbps)
                </span>
              </div>
            </div>

            {/* Quick Toggle Bento Matrix (4 Cards) */}
            <div className="grid grid-cols-2 gap-2.5 py-3">
              {/* Quick Toggle 1: Wi-Fi */}
              <button
                onClick={() => setWifiActive((prev) => !prev)}
                className={`group flex flex-col justify-between p-3 rounded-xl transition-all text-left cursor-pointer border shadow-sm ${
                  wifiActive
                    ? 'bg-primary-container text-on-primary-container border-primary-container/40'
                    : 'bg-surface-container text-on-surface-variant border-surface-container-high/40 hover:bg-surface-container-high'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="material-symbols-outlined text-[20px]">wifi</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      wifiActive ? 'bg-tertiary-fixed shadow-[0_0_8px_#5bd5fc]' : 'bg-outline-variant'
                    }`}
                  />
                </div>
                <div className="mt-3">
                  <p className="font-headline-md text-sm leading-none font-semibold">Wi-Fi</p>
                  <p className="font-code-sm text-[11px] opacity-80 mt-1 truncate">
                    {wifiActive ? 'CASS-NET-5G' : 'Disabled'}
                  </p>
                </div>
              </button>

              {/* Quick Toggle 2: Bluetooth */}
              <button
                onClick={() => setBtActive((prev) => !prev)}
                className={`group flex flex-col justify-between p-3 rounded-xl transition-all text-left cursor-pointer border shadow-sm ${
                  btActive
                    ? 'bg-surface-container-high text-on-surface border-secondary/40'
                    : 'bg-surface-container text-on-surface-variant border-surface-container-high/40 hover:bg-surface-container-high'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="material-symbols-outlined text-secondary text-[20px]">
                    bluetooth_connected
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      btActive ? 'bg-secondary shadow-[0_0_8px_#a4c9ff]' : 'bg-outline-variant'
                    }`}
                  />
                </div>
                <div className="mt-3">
                  <p className="font-headline-md text-sm leading-none font-semibold">Bluetooth</p>
                  <p className="font-code-sm text-[11px] text-on-surface-variant mt-1 truncate">
                    {btActive ? 'WH-1000XM5' : 'Disabled'}
                  </p>
                </div>
              </button>

              {/* Quick Toggle 3: Battery Saver */}
              <button
                onClick={() => setBatterySaver((prev) => !prev)}
                className={`group flex flex-col justify-between p-3 rounded-xl transition-all text-left cursor-pointer border shadow-sm ${
                  batterySaver
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-surface-container text-on-surface-variant border-surface-container-high/40 hover:bg-surface-container-high'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="material-symbols-outlined text-[20px]">battery_saver</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      batterySaver ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : 'bg-outline-variant'
                    }`}
                  />
                </div>
                <div className="mt-3">
                  <p className="font-headline-md text-sm leading-none font-semibold">Battery Saver</p>
                  <p className="font-code-sm text-[11px] opacity-80 mt-1">
                    {batterySaver ? 'Active Mode' : 'Performance'}
                  </p>
                </div>
              </button>

              {/* Quick Toggle 4: VPN Shield */}
              <button
                onClick={() => setVpnActive((prev) => !prev)}
                className={`group flex flex-col justify-between p-3 rounded-xl transition-all text-left cursor-pointer border shadow-sm ${
                  vpnActive
                    ? 'bg-surface-container-high text-on-surface border-tertiary/40'
                    : 'bg-surface-container text-on-surface-variant border-surface-container-high/40 hover:bg-surface-container-high'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">security</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      vpnActive ? 'bg-tertiary shadow-[0_0_8px_#5bd5fc]' : 'bg-outline-variant'
                    }`}
                  />
                </div>
                <div className="mt-3">
                  <p className="font-headline-md text-sm leading-none font-semibold">VPN Shield</p>
                  <p className="font-code-sm text-[11px] text-tertiary mt-1 truncate">
                    {vpnActive ? 'WireGuard [Active]' : 'Off'}
                  </p>
                </div>
              </button>
            </div>

            {/* Sliders: Master Audio Output & Mic Input */}
            <div className="flex flex-col gap-3 py-3 bg-surface-container-lowest/50 p-3 rounded-xl border border-surface-container-high/30 mt-1">
              {/* Audio Output Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-on-surface">
                    <span className="material-symbols-outlined text-[18px] text-tertiary">
                      {isMuted ? 'volume_off' : 'volume_up'}
                    </span>
                    <span className="font-body-sm text-xs font-medium">Master Audio (Speakers)</span>
                  </div>
                  <span className="font-code-sm text-xs text-tertiary">
                    {isMuted ? 'Muted' : `${masterVolume}%`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted((prev) => !prev)}
                    className="p-1 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                    title="Mute Output"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isMuted ? 'volume_off' : 'volume_down'}
                    </span>
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : masterVolume}
                    onChange={(e) => {
                      setIsMuted(false);
                      setMasterVolume(Number(e.target.value));
                    }}
                    className="w-full accent-tertiary cursor-pointer h-1.5 bg-surface-container-highest rounded-lg"
                  />
                </div>
              </div>

              {/* Microphone Input Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-on-surface">
                    <span className="material-symbols-outlined text-[18px] text-secondary">mic</span>
                    <span className="font-body-sm text-xs font-medium">Microphone Input Array</span>
                  </div>
                  <span className="font-code-sm text-xs text-secondary">{micVolume}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                    mic_none
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={micVolume}
                    onChange={(e) => setMicVolume(Number(e.target.value))}
                    className="w-full accent-secondary cursor-pointer h-1.5 bg-surface-container-highest rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Device Battery Telemetry Section */}
            <div className="flex flex-col gap-2 py-3">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
                  Connected Power & Peripherals
                </span>
                <span className="font-code-sm text-xs text-tertiary">100W USB-PD</span>
              </div>

              <div className="p-2.5 rounded-xl bg-surface-container flex items-center justify-between border border-surface-container-high/30">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined text-[18px]">laptop_mac</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-sm text-xs font-medium text-on-surface">
                      Cassandra Pro 16"
                    </span>
                    <span className="font-code-sm text-[11px] text-tertiary">
                      Charging · 6h 24m remaining
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 font-code-sm text-xs text-on-surface font-bold">
                  <span className="material-symbols-outlined text-tertiary text-[16px]">bolt</span>
                  <span>98%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg bg-surface-container-low flex items-center justify-between border border-surface-container-high/30">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
                      mouse
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface truncate">
                      MX Master 3S
                    </span>
                  </div>
                  <span className="font-code-sm text-[11px] text-secondary">85%</span>
                </div>

                <div className="p-2 rounded-lg bg-surface-container-low flex items-center justify-between border border-surface-container-high/30">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
                      headphones
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface truncate">
                      WH-1000XM5
                    </span>
                  </div>
                  <span className="font-code-sm text-[11px] text-secondary">90%</span>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-surface-container-high/40 mt-1">
              <button
                onClick={() => {
                  toggleWindow('system-monitor');
                  onClose();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-sm text-xs transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-tertiary">tune</span>
                <span>Diagnostics</span>
              </button>

              <button
                onClick={() => {
                  toggleWindow('settings');
                  onClose();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container hover:bg-primary text-on-primary-container hover:text-on-primary font-body-sm text-xs transition-all cursor-pointer shadow-md"
              >
                <span className="material-symbols-outlined text-[16px]">settings</span>
                <span>All Settings</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

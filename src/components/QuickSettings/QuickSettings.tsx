import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface QuickSettingsProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpenSettings?: () => void;
}

interface ToggleTile {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  active: boolean;
}

export const QuickSettings: React.FC<QuickSettingsProps> = ({ isOpen = true, onClose, onOpenSettings }) => {
  const [tiles, setTiles] = useState<ToggleTile[]>([
    { id: 'wifi', label: 'Wi-Fi 6E', sublabel: 'CyberNet_5G', icon: 'wifi', active: true },
    { id: 'bluetooth', label: 'Bluetooth', sublabel: '3 Connected', icon: 'bluetooth', active: true },
    { id: 'airplane', label: 'Airplane Mode', sublabel: 'Off', icon: 'flight', active: false },
    { id: 'dnd', label: 'Do Not Disturb', sublabel: 'Focus Active', icon: 'do_not_disturb_on', active: true },
    { id: 'darkmode', label: 'Dark Theme', sublabel: 'Cyber Navy', icon: 'dark_mode', active: true },
    { id: 'hotspot', label: 'Mobile Hotspot', sublabel: 'Disabled', icon: 'cell_tower', active: false },
  ]);

  const [volume, setVolume] = useState(78);
  const [brightness, setBrightness] = useState(85);

  const toggleTile = (id: string) => {
    setTiles((prev) =>
      prev.map((tile) => (tile.id === id ? { ...tile, active: !tile.active } : tile))
    );
  };

  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-[#051650]/95 backdrop-blur-xl border border-[#0A2472] rounded-xl p-5 text-[#F8FAFC] flex flex-col justify-between shadow-2xl select-none overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#0A2472]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#4CC9F0]">tune</span>
          <h2 className="font-semibold text-lg tracking-wide">Quick Settings</h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
          <span className="flex items-center gap-1 bg-[#0A2472]/60 px-2 py-1 rounded-md">
            <span className="material-symbols-outlined text-sm text-[#26B170]">battery_charging_full</span>
            94%
          </span>
        </div>
      </div>

      {/* Grid Toggles */}
      <div className="grid grid-cols-2 gap-3 my-4">
        {tiles.map((tile) => (
          <motion.button
            key={tile.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => toggleTile(tile.id)}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
              tile.active
                ? 'bg-[#4361EE] border-[#4895EF] text-white shadow-lg shadow-[#4361EE]/20'
                : 'bg-[#000720]/40 border-[#0A2472] text-[#94A3B8] hover:border-[#4895EF]/50 hover:text-white'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                tile.active ? 'bg-white/20' : 'bg-[#0A2472]'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{tile.icon}</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium truncate">{tile.label}</div>
              <div className={`text-xs truncate ${tile.active ? 'text-white/80' : 'text-[#94A3B8]'}`}>
                {tile.sublabel}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Sliders */}
      <div className="space-y-4 my-2 bg-[#000720]/40 p-4 rounded-xl border border-[#0A2472]">
        {/* Brightness Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#F5C400]">wb_sunny</span>
              Display Brightness
            </span>
            <span className="font-mono text-white font-medium">{brightness}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full accent-[#4CC9F0] bg-[#0A2472] rounded-lg h-2 cursor-pointer"
          />
        </div>

        {/* Volume Slider */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#4CC9F0]">
                {volume === 0 ? 'volume_off' : volume < 50 ? 'volume_down' : 'volume_up'}
              </span>
              Master Output Volume
            </span>
            <span className="font-mono text-white font-medium">{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full accent-[#4361EE] bg-[#0A2472] rounded-lg h-2 cursor-pointer"
          />
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-3 border-t border-[#0A2472] flex items-center justify-between text-xs">
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-2 text-[#4895EF] hover:text-[#4CC9F0] font-medium transition-colors"
        >
          <span className="material-symbols-outlined text-base">settings</span>
          Open All System Settings
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#0A2472] hover:bg-[#0A2472]/80 text-[#94A3B8] hover:text-white rounded-lg transition-colors"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioDevicesProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AudioDeviceItem {
  id: string;
  name: string;
  icon: string;
  type: 'output' | 'input';
  volume: number;
}

export const AudioDevices: React.FC<AudioDevicesProps> = ({ isOpen, onClose }) => {
  const [selectedOutput, setSelectedOutput] = useState('out-1');
  const [selectedInput, setSelectedInput] = useState('in-1');

  const [outputDevices, setOutputDevices] = useState<AudioDeviceItem[]>([
    { id: 'out-1', name: 'Sony WH-1000XM5 Headphones (Bluetooth LDAC)', icon: 'headphones', type: 'output', volume: 65 },
    { id: 'out-2', name: 'Realtek High Definition Audio Speakers', icon: 'speaker', type: 'output', volume: 45 },
    { id: 'out-3', name: 'HDMI Output - 4K Monitor Audio', icon: 'tv', type: 'output', volume: 80 },
  ]);

  const [inputDevices, setInputDevices] = useState<AudioDeviceItem[]>([
    { id: 'in-1', name: 'USB Studio Condenser Microphone', icon: 'mic', type: 'input', volume: 80 },
    { id: 'in-2', name: 'Sony WH-1000XM5 Headset Mic', icon: 'headset_mic', type: 'input', volume: 70 },
  ]);

  const handleVolumeChange = (id: string, type: 'output' | 'input', newVol: number) => {
    if (type === 'output') {
      setOutputDevices((prev) =>
        prev.map((d) => (d.id === id ? { ...d, volume: newVol } : d))
      );
    } else {
      setInputDevices((prev) =>
        prev.map((d) => (d.id === id ? { ...d, volume: newVol } : d))
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto relative w-full max-w-[860px] h-[660px] bg-surface-container-low/95 rounded-xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl border border-surface-container-high/60"
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">volume_up</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Audio Devices & Routing
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-[#4CC9F0]">
                PipeWire WirePlumber Core
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Output Section */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-lg">speaker</span>
                  Sound Output Devices
                </h3>

                <div className="space-y-2.5">
                  {outputDevices.map((dev) => {
                    const isSelected = selectedOutput === dev.id;
                    return (
                      <div
                        key={dev.id}
                        onClick={() => setSelectedOutput(dev.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#4361EE]/15 border-[#4361EE] shadow-md'
                            : 'bg-[#051650]/60 border-surface-container-high/40 hover:border-surface-container-high/70'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-[#4361EE] bg-[#4361EE]' : 'border-[#94A3B8]'
                            }`}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <span className="material-symbols-outlined text-[#4CC9F0] text-xl">
                              {dev.icon}
                            </span>
                            <span className="text-sm font-bold text-on-surface">{dev.name}</span>
                          </div>

                          <span className="font-mono text-xs text-[#94A3B8]">{dev.volume}%</span>
                        </div>

                        {isSelected && (
                          <div className="mt-3 pt-3 border-t border-surface-container-high/30 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                            <span className="material-symbols-outlined text-xs text-[#94A3B8]">volume_down</span>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={dev.volume}
                              onChange={(e) => handleVolumeChange(dev.id, 'output', Number(e.target.value))}
                              className="flex-1 h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-[#4CC9F0]"
                            />
                            <span className="material-symbols-outlined text-xs text-[#94A3B8]">volume_up</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Input Section */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-lg">mic</span>
                  Sound Input Devices
                </h3>

                <div className="space-y-2.5">
                  {inputDevices.map((dev) => {
                    const isSelected = selectedInput === dev.id;
                    return (
                      <div
                        key={dev.id}
                        onClick={() => setSelectedInput(dev.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#4361EE]/15 border-[#4361EE] shadow-md'
                            : 'bg-[#051650]/60 border-surface-container-high/40 hover:border-surface-container-high/70'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-[#4361EE] bg-[#4361EE]' : 'border-[#94A3B8]'
                            }`}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <span className="material-symbols-outlined text-[#4CC9F0] text-xl">
                              {dev.icon}
                            </span>
                            <span className="text-sm font-bold text-on-surface">{dev.name}</span>
                          </div>

                          <span className="font-mono text-xs text-[#94A3B8]">{dev.volume}%</span>
                        </div>

                        {isSelected && (
                          <div className="mt-3 pt-3 border-t border-surface-container-high/30 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                            <span className="material-symbols-outlined text-xs text-[#94A3B8]">mic</span>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={dev.volume}
                              onChange={(e) => handleVolumeChange(dev.id, 'input', Number(e.target.value))}
                              className="flex-1 h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-[#4CC9F0]"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

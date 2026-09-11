import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BluetoothDevicesProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BtDevice {
  id: string;
  name: string;
  type: 'headphones' | 'mouse' | 'keyboard' | 'phone';
  icon: string;
  connected: boolean;
  battery?: string;
}

export const BluetoothDevices: React.FC<BluetoothDevicesProps> = ({ isOpen, onClose }) => {
  const [btEnabled, setBtEnabled] = useState(true);

  const [pairedDevices, setPairedDevices] = useState<BtDevice[]>([
    {
      id: 'bt-1',
      name: 'Sony WH-1000XM5 Headphones',
      type: 'headphones',
      icon: 'headphones',
      connected: true,
      battery: '85%',
    },
    {
      id: 'bt-2',
      name: 'Logitech MX Master 3S',
      type: 'mouse',
      icon: 'mouse',
      connected: true,
      battery: '92%',
    },
    {
      id: 'bt-3',
      name: 'Keychron K2 Cyber Mechanical Keyboard',
      type: 'keyboard',
      icon: 'keyboard',
      connected: false,
    },
    {
      id: 'bt-4',
      name: 'Pixel 9 Pro Mobile',
      type: 'phone',
      icon: 'smartphone',
      connected: false,
    },
  ]);

  const [availableDevices, setAvailableDevices] = useState<BtDevice[]>([
    {
      id: 'bt-unpaired-1',
      name: 'Bose SoundLink Revolve',
      type: 'headphones',
      icon: 'speaker',
      connected: false,
    },
    {
      id: 'bt-unpaired-2',
      name: 'Xbox Wireless Controller',
      type: 'mouse',
      icon: 'sports_esports',
      connected: false,
    },
  ]);

  const [pairingId, setPairingId] = useState<string | null>(null);

  const toggleConnectPaired = (id: string) => {
    setPairedDevices((prev) =>
      prev.map((d) => (d.id === id ? { ...d, connected: !d.connected } : d))
    );
  };

  const handlePairNew = (device: BtDevice) => {
    setPairingId(device.id);
    setTimeout(() => {
      setPairingId(null);
      setAvailableDevices((prev) => prev.filter((d) => d.id !== device.id));
      setPairedDevices((prev) => [...prev, { ...device, connected: true }]);
    }, 1500);
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">bluetooth</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Bluetooth Devices
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-[#4CC9F0]">
                Bluetooth 5.3 BLE Active
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Header Toggle */}
              <div className="bg-[#051650] border border-surface-container-high/40 rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary text-2xl">bluetooth</span>
                  <div>
                    <h2 className="text-base font-bold text-on-surface">Bluetooth Radio</h2>
                    <p className="text-xs text-[#94A3B8]">
                      {btEnabled ? 'Discoverable as "CassandraOS Workstation Pro"' : 'Bluetooth disabled.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setBtEnabled(!btEnabled)}
                  className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer ${
                    btEnabled ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                      btEnabled ? 'translate-x-5.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {btEnabled && (
                <>
                  {/* Paired Devices */}
                  <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-3">
                    <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-tertiary text-lg">devices</span>
                      My Paired Devices
                    </h3>

                    <div className="space-y-2">
                      {pairedDevices.map((dev) => (
                        <div
                          key={dev.id}
                          className="bg-[#051650]/60 border border-surface-container-high/40 rounded-xl p-3.5 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3.5">
                            <span className="material-symbols-outlined text-[#4CC9F0] text-xl">
                              {dev.icon}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-on-surface">{dev.name}</p>
                                {dev.connected && (
                                  <span className="w-2 h-2 rounded-full bg-[#26B170] shadow-sm shadow-[#26B170]/50" />
                                )}
                              </div>
                              <p className="text-xs text-[#94A3B8]">
                                {dev.connected ? 'Connected' : 'Not Connected'}{' '}
                                {dev.battery && `· Battery ${dev.battery}`}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => toggleConnectPaired(dev.id)}
                            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                              dev.connected
                                ? 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                                : 'bg-[#4361EE] text-white hover:bg-[#4361EE]/90'
                            }`}
                          >
                            {dev.connected ? 'Disconnect' : 'Connect'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Available Devices */}
                  <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-3">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-lg animate-spin">
                          bluetooth_searching
                        </span>
                        Available Nearby Devices
                      </h3>
                      <span className="text-xs text-[#94A3B8]">Scanning...</span>
                    </div>

                    <div className="space-y-2">
                      {availableDevices.map((dev) => (
                        <div
                          key={dev.id}
                          className="bg-[#051650]/40 border border-surface-container-high/30 rounded-xl p-3.5 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#94A3B8] text-xl">
                              {dev.icon}
                            </span>
                            <span className="text-sm font-semibold text-on-surface">{dev.name}</span>
                          </div>

                          <button
                            onClick={() => handlePairNew(dev)}
                            disabled={pairingId === dev.id}
                            className="px-3.5 py-1.5 bg-[#4361EE] hover:bg-[#4361EE]/90 disabled:bg-surface-container-high text-white text-xs rounded-lg font-semibold transition-colors cursor-pointer shadow-sm"
                          >
                            {pairingId === dev.id ? 'Pairing...' : 'Pair'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

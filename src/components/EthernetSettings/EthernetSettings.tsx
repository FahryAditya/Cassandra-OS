import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EthernetSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EthernetSettings: React.FC<EthernetSettingsProps> = ({ isOpen, onClose }) => {
  const [ethernetEnabled, setEthernetEnabled] = useState(true);
  const [ipMode, setIpMode] = useState<'dhcp' | 'manual'>('dhcp');

  // Manual IP fields
  const [ipAddress, setIpAddress] = useState('192.168.1.150');
  const [subnetMask, setSubnetMask] = useState('255.255.255.0');
  const [gateway, setGateway] = useState('192.168.1.1');
  const [dnsPrimary, setDnsPrimary] = useState('1.1.1.1');
  const [dnsSecondary, setDnsSecondary] = useState('8.8.8.8');

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
                  <span className="material-symbols-outlined text-secondary text-[16px]">lan</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Ethernet Settings
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-[#26B170]">
                eth0 · 10GbE PCI Express
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Connection Status Card */}
              <div className="bg-[#051650] border border-surface-container-high/40 rounded-xl p-6 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center border ${
                    ethernetEnabled
                      ? 'bg-[#26B170]/10 border-[#26B170]/30 text-[#26B170]'
                      : 'bg-surface-container-high text-[#94A3B8]'
                  }`}>
                    <span className="material-symbols-outlined text-3xl">cable</span>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
                      Ethernet (eth0)
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        ethernetEnabled
                          ? 'bg-[#26B170]/20 text-[#26B170]'
                          : 'bg-surface-container-high text-[#94A3B8]'
                      }`}>
                        {ethernetEnabled ? 'Connected' : 'Disconnected'}
                      </span>
                    </h2>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      {ethernetEnabled
                        ? 'Speed: 10 Gbps Full Duplex · IP: 192.168.1.150 · MAC: 00:1A:2B:3C:4D:5E'
                        : 'Wired Ethernet interface disabled.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#94A3B8]">Enable Ethernet</span>
                  <button
                    onClick={() => setEthernetEnabled(!ethernetEnabled)}
                    className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer ${
                      ethernetEnabled ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                        ethernetEnabled ? 'translate-x-5.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {ethernetEnabled && (
                <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-tertiary text-lg">settings_ethernet</span>
                      IP Addressing Configuration
                    </h3>

                    {/* Segmented Control */}
                    <div className="flex bg-surface-container-high/60 p-1 rounded-lg">
                      <button
                        onClick={() => setIpMode('dhcp')}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                          ipMode === 'dhcp'
                            ? 'bg-[#4361EE] text-white shadow-sm font-semibold'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        Automatic (DHCP)
                      </button>
                      <button
                        onClick={() => setIpMode('manual')}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                          ipMode === 'manual'
                            ? 'bg-[#4361EE] text-white shadow-sm font-semibold'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        Manual Configuration
                      </button>
                    </div>
                  </div>

                  {/* Manual Fields */}
                  {ipMode === 'manual' ? (
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8] font-medium">IPv4 Address</label>
                        <input
                          type="text"
                          value={ipAddress}
                          onChange={(e) => setIpAddress(e.target.value)}
                          className="w-full h-9 px-3 bg-[#051650] text-[#F8FAFC] font-mono text-xs rounded-lg outline-none border border-surface-container-high/60 focus:border-[#4361EE]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8] font-medium font-mono">Subnet Mask</label>
                        <input
                          type="text"
                          value={subnetMask}
                          onChange={(e) => setSubnetMask(e.target.value)}
                          className="w-full h-9 px-3 bg-[#051650] text-[#F8FAFC] font-mono text-xs rounded-lg outline-none border border-surface-container-high/60 focus:border-[#4361EE]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8] font-medium font-mono">Default Gateway</label>
                        <input
                          type="text"
                          value={gateway}
                          onChange={(e) => setGateway(e.target.value)}
                          className="w-full h-9 px-3 bg-[#051650] text-[#F8FAFC] font-mono text-xs rounded-lg outline-none border border-surface-container-high/60 focus:border-[#4361EE]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs text-[#94A3B8] font-medium font-mono">Primary DNS</label>
                        <input
                          type="text"
                          value={dnsPrimary}
                          onChange={(e) => setDnsPrimary(e.target.value)}
                          className="w-full h-9 px-3 bg-[#051650] text-[#F8FAFC] font-mono text-xs rounded-lg outline-none border border-surface-container-high/60 focus:border-[#4361EE]"
                        />
                      </div>

                      <div className="space-y-1.5 col-span-2">
                        <label className="text-xs text-[#94A3B8] font-medium font-mono">Secondary DNS</label>
                        <input
                          type="text"
                          value={dnsSecondary}
                          onChange={(e) => setDnsSecondary(e.target.value)}
                          className="w-full h-9 px-3 bg-[#051650] text-[#F8FAFC] font-mono text-xs rounded-lg outline-none border border-surface-container-high/60 focus:border-[#4361EE]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#051650]/60 p-4 rounded-xl border border-surface-container-high/30 space-y-2 text-xs text-[#94A3B8]">
                      <p className="text-on-surface font-semibold">DHCP Lease Active</p>
                      <div className="flex justify-between">
                        <span>Assigned IP:</span>
                        <span className="font-mono text-[#F8FAFC]">192.168.1.150 / 24</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DHCP Server:</span>
                        <span className="font-mono text-[#F8FAFC]">192.168.1.1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lease Expiration:</span>
                        <span className="font-mono text-[#F8FAFC]">23 hours 45 mins remaining</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

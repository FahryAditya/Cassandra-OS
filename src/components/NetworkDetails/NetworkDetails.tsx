import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NetworkDetailsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NetworkDetails: React.FC<NetworkDetailsProps> = ({ isOpen, onClose }) => {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const details = [
    { label: 'Connection Status', value: 'Connected (Internet Access)', isMonospace: false },
    { label: 'Connection Type', value: 'Wired Ethernet (eth0 / IEEE 802.3)', isMonospace: false },
    { label: 'Interface Name', value: 'eth0', isMonospace: true },
    { label: 'IPv4 Address', value: '192.168.1.150', isMonospace: true },
    { label: 'IPv6 Address', value: 'fe80::001a:2bff:fe3c:4d5e / 64', isMonospace: true },
    { label: 'Subnet Mask', value: '255.255.255.0 (/24)', isMonospace: true },
    { label: 'Default Gateway', value: '192.168.1.1', isMonospace: true },
    { label: 'Primary DNS Server', value: '1.1.1.1 (Cloudflare Secure)', isMonospace: true },
    { label: 'Secondary DNS Server', value: '8.8.8.8 (Google Public DNS)', isMonospace: true },
    { label: 'Hardware MAC Address', value: '00:1A:2B:3C:4D:5E', isMonospace: true },
    { label: 'Link Speed', value: '10,000 Mbps Full Duplex (10 GbE)', isMonospace: true },
    { label: 'MTU Packet Size', value: '1500 bytes', isMonospace: true },
  ];

  const handleCopy = (label: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 1200);
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
            className="pointer-events-auto relative w-full max-w-[800px] h-[640px] bg-surface-container-low/95 rounded-xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl border border-surface-container-high/60"
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">fingerprint</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Technical Network Details
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-on-surface-variant/70">
                Interface Diagnostics
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="bg-[#051650] border border-surface-container-high/40 rounded-xl p-5 shadow-sm space-y-2">
                {details.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-2 border-b border-surface-container-high/20 last:border-0 hover:bg-surface-container-high/30 px-2 rounded-md group transition-colors"
                  >
                    <span className="text-xs text-[#94A3B8] font-medium">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs text-[#F8FAFC] ${
                          item.isMonospace ? 'font-mono font-semibold' : 'font-medium'
                        }`}
                      >
                        {item.value}
                      </span>
                      <button
                        onClick={() => handleCopy(item.label, item.value)}
                        className="opacity-0 group-hover:opacity-100 text-[#4CC9F0] hover:text-[#4CC9F0]/80 transition-opacity cursor-pointer"
                        title="Copy to clipboard"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {copiedLabel === item.label ? 'check' : 'content_copy'}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

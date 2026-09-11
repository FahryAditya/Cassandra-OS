import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SecurityCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityCenter: React.FC<SecurityCenterProps> = ({ isOpen, onClose }) => {
  const [firewallActive, setFirewallActive] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [lastScan, setLastScan] = useState('2 hours ago');

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setLastScan('Just now');
          return 100;
        }
        return prev + 20;
      });
    }, 300);
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">security</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Security Center
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#26B170] font-code-sm text-code-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#26B170] animate-pulse" />
                <span>Protected</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Security Status Banner */}
              <div className="bg-[#051650] border border-[#26B170]/40 rounded-xl p-5 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#26B170]/20 flex items-center justify-center text-[#26B170]">
                    <span className="material-symbols-outlined text-3xl">verified</span>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
                      System Security Status: Protected
                    </h2>
                    <p className="text-xs text-on-surface-variant/80 mt-0.5">
                      All protection modules, kernel eBPF filters, and encryption guards are functioning normally.
                    </p>
                  </div>
                </div>

                <button
                  onClick={startScan}
                  disabled={isScanning}
                  className="px-4 py-2 bg-[#4361EE] hover:bg-[#4361EE]/90 disabled:bg-surface-container-high text-white text-xs font-medium rounded-lg transition-colors shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">
                    {isScanning ? 'sync' : 'search'}
                  </span>
                  {isScanning ? `Scanning (${scanProgress}%)` : 'Scan Now'}
                </button>
              </div>

              {/* Progress Bar when scanning */}
              {isScanning && (
                <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-on-surface">Scanning system binaries & storage...</span>
                    <span className="text-tertiary">{scanProgress}%</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#4361EE] h-full rounded-full transition-all duration-300"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Security Feature Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Feature 1: Firewall */}
                <div className="bg-[#051650] border border-[#0A2472] rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-tertiary text-xl">local_fire_department</span>
                      <h3 className="text-sm font-semibold text-on-surface">eBPF Firewall</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#26B170]/20 text-[#26B170] text-[10px] font-bold">
                      PROTECTED
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant/80">
                    Filters incoming and outgoing kernel network packets at high speed.
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-surface-container-high/30">
                    <span className="text-xs text-on-surface-variant">Firewall Status</span>
                    <button
                      onClick={() => setFirewallActive(!firewallActive)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        firewallActive ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          firewallActive ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Feature 2: Encryption */}
                <div className="bg-[#051650] border border-[#0A2472] rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-tertiary text-xl">lock</span>
                      <h3 className="text-sm font-semibold text-on-surface">LUKS2 Encryption</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#26B170]/20 text-[#26B170] text-[10px] font-bold">
                      ENCRYPTED
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant/80">
                    AES-256-XTS volume encryption with hardware TPM 2.0 PCR attestation.
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-surface-container-high/30">
                    <span className="text-xs text-on-surface-variant">Volume Health</span>
                    <span className="text-xs font-semibold text-on-surface">Secure Vault</span>
                  </div>
                </div>

                {/* Feature 3: Threat Scanner */}
                <div className="bg-[#051650] border border-[#0A2472] rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-tertiary text-xl">bug_report</span>
                      <h3 className="text-sm font-semibold text-on-surface">Threat Scanner</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#26B170]/20 text-[#26B170] text-[10px] font-bold">
                      NO THREATS
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant/80">
                    Real-time malware signature detection and heuristic behavior scanner.
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-surface-container-high/30">
                    <span className="text-xs text-on-surface-variant">Last Scan</span>
                    <span className="text-xs font-semibold text-on-surface">{lastScan}</span>
                  </div>
                </div>

                {/* Feature 4: App Sandboxing */}
                <div className="bg-[#051650] border border-[#0A2472] rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-tertiary text-xl">grid_view</span>
                      <h3 className="text-sm font-semibold text-on-surface">App Sandbox Isolation</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#26B170]/20 text-[#26B170] text-[10px] font-bold">
                      ENFORCED
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant/80">
                    Isolates third-party applications in separate unprivileged namespaces.
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-surface-container-high/30">
                    <span className="text-xs text-on-surface-variant">Active Sandboxes</span>
                    <span className="text-xs font-semibold text-on-surface">8 Isolation Cells</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

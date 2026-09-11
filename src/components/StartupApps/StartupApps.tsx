import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StartupAppsProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface StartupAppItem {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  impact: 'high' | 'medium' | 'low';
  desc: string;
}

export const StartupApps: React.FC<StartupAppsProps> = ({ isOpen = true, onClose }) => {
  const [apps, setApps] = useState<StartupAppItem[]>([
    {
      id: 'app-1',
      name: 'System Telemetry & Monitor Daemon',
      icon: 'monitoring',
      enabled: true,
      impact: 'low',
      desc: 'Real-time CPU/RAM telemetry background service',
    },
    {
      id: 'app-2',
      name: 'LUKS Crypt Enclave Vault Auto-Mount',
      icon: 'lock',
      enabled: true,
      impact: 'medium',
      desc: 'Attest TPM 2.0 PCR[7] and mount secure vault',
    },
    {
      id: 'app-3',
      name: 'Chromium Background Engine',
      icon: 'language',
      enabled: true,
      impact: 'high',
      desc: 'Pre-load web browser process into memory',
    },
    {
      id: 'app-4',
      name: 'eBPF Packet Filter Shield',
      icon: 'shield',
      enabled: true,
      impact: 'low',
      desc: 'Kernel zero-trust packet filtering rules',
    },
    {
      id: 'app-5',
      name: 'Docker Desktop Container Daemon',
      icon: 'view_in_ar',
      enabled: false,
      impact: 'high',
      desc: 'Container virtualization runtime engine',
    },
  ]);

  const toggleApp = (id: string) => {
    setApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  const activeCount = apps.filter((a) => a.enabled).length;

  const getImpactBadge = (impact: 'high' | 'medium' | 'low') => {
    if (impact === 'high') return { label: 'High Impact', bg: 'bg-[#EF4444]/20 text-[#EF4444]' };
    if (impact === 'medium') return { label: 'Medium Impact', bg: 'bg-[#F5C400]/20 text-[#F5C400]' };
    return { label: 'Low Impact', bg: 'bg-[#26B170]/20 text-[#26B170]' };
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
            className="pointer-events-auto relative w-full max-w-[860px] h-[640px] bg-surface-container-low/95 rounded-xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl border border-surface-container-high/60"
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">power_settings_new</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Startup Applications
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-[#4CC9F0]">
                systemd Init Target
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Header Summary Card */}
              <div className="bg-[#051650] border border-surface-container-high/40 rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3.5">
                  <span className="material-symbols-outlined text-tertiary text-2xl">rocket_launch</span>
                  <div>
                    <h2 className="text-base font-bold text-on-surface">System Boot Startup Apps</h2>
                    <p className="text-xs text-[#94A3B8]">
                      <span className="text-[#4CC9F0] font-semibold">{activeCount} apps</span> set to run automatically at user session launch.
                    </p>
                  </div>
                </div>
              </div>

              {/* Startup Apps List */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-3">
                <div className="space-y-3">
                  {apps.map((app) => {
                    const badge = getImpactBadge(app.impact);
                    return (
                      <div
                        key={app.id}
                        className="bg-[#051650]/60 border border-surface-container-high/40 rounded-xl p-4 flex items-center justify-between shadow-sm"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-lg bg-surface-container-high/60 flex items-center justify-center text-[#4CC9F0]">
                            <span className="material-symbols-outlined text-xl">{app.icon}</span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-on-surface">{app.name}</h4>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${badge.bg}`}>
                                {badge.label}
                              </span>
                            </div>
                            <p className="text-xs text-[#94A3B8] mt-0.5">{app.desc}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleApp(app.id)}
                          className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                            app.enabled ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                          }`}
                        >
                          <span
                            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                              app.enabled ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
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

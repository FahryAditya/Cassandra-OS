import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ErrorCrashCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ErrorItem {
  id: string;
  app: string;
  desc: string;
  time: string;
  severity: 'critical' | 'warning' | 'info';
  icon: string;
  stackTrace: string;
}

export const ErrorCrashCenter: React.FC<ErrorCrashCenterProps> = ({ isOpen, onClose }) => {
  const [expandedId, setExpandedId] = useState<string | null>('err-1');

  const [errors, setErrors] = useState<ErrorItem[]>([
    {
      id: 'err-1',
      app: 'Disk Enclave Vault Daemon',
      desc: 'LUKS Keyring timeout during volume attestation PCR[7]',
      time: '20 mins ago',
      severity: 'critical',
      icon: 'report',
      stackTrace:
        'Error 0x80041002: TPM 2.0 PCR Quote verification failed\n  at luks_vault_mount (enclave_daemon.c:142)\n  at pcr_attestation_verify (tpm_guard.c:89)\n  at sys_main (main.c:42)',
    },
    {
      id: 'err-[#2]',
      app: 'eBPF Packet Filter',
      desc: 'High packet drop rate on wlan0 interface',
      time: '2 hours ago',
      severity: 'warning',
      icon: 'warning',
      stackTrace:
        'Warning: eBPF ring buffer capacity reached 98%\n  at ebpf_ring_poll (filter_mesh.c:310)\n  at net_ingress_dispatch (net_core.c:512)',
    },
    {
      id: 'err-3',
      app: 'Chromium Web Engine',
      desc: 'GPU Process crashed and was automatically restarted',
      time: 'Yesterday, 10:15 PM',
      severity: 'info',
      icon: 'info',
      stackTrace:
        'Info: GPU process segfault signal 11\n  at viz::GpuProcessHost::OnProcessCrashed()\n  at content::GpuDataManagerImpl::FallbackToSoftware()',
    },
  ]);

  const handleDismiss = (id: string) => {
    setErrors((prev) => prev.filter((e) => e.id !== id));
  };

  const getSeverityBadge = (severity: 'critical' | 'warning' | 'info') => {
    if (severity === 'critical')
      return { label: 'CRITICAL', color: '#EF4444', bg: 'bg-[#EF4444]/20 text-[#EF4444]' };
    if (severity === 'warning')
      return { label: 'WARNING', color: '#F5C400', bg: 'bg-[#F5C400]/20 text-[#F5C400]' };
    return { label: 'INFO', color: '#4CC9F0', bg: 'bg-[#4CC9F0]/20 text-[#4CC9F0]' };
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">bug_report</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Error & Crash Diagnostics Center
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-on-surface-variant/70">
                System Telemetry Logs
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Summary Banner */}
              <div className="bg-[#051650] border border-surface-container-high/40 rounded-xl p-5 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center justify-center text-[#EF4444]">
                    <span className="material-symbols-outlined text-3xl">error_med</span>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-on-surface">
                      {errors.length} system issues logged in the last 7 days
                    </h2>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      Review diagnostic stack traces and report crash dumps to CassandraOS telemetry hub.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setErrors([])}
                  disabled={errors.length === 0}
                  className="px-4 py-2 bg-surface-container-high hover:bg-surface-container-highest disabled:opacity-50 text-on-surface text-xs font-semibold rounded-lg transition-colors shadow-sm shrink-0 cursor-pointer"
                >
                  Clear All Logs
                </button>
              </div>

              {/* Log List */}
              <div className="space-y-3">
                {errors.length === 0 ? (
                  <div className="p-8 text-center bg-surface-container-lowest/50 rounded-xl border border-surface-container-high/30 text-xs text-[#94A3B8]">
                    No recent system crashes or errors logged.
                  </div>
                ) : (
                  errors.map((item) => {
                    const badge = getSeverityBadge(item.severity);
                    const isExpanded = expandedId === item.id;
                    return (
                      <div
                        key={item.id}
                        className="bg-[#051650] border rounded-xl overflow-hidden shadow-sm transition-all"
                        style={{ borderColor: `${badge.color}40` }}
                      >
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : item.id)}
                          className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-surface-container-high/30 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-xl" style={{ color: badge.color }}>
                              {item.icon}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-on-surface">{item.app}</span>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${badge.bg}`}>
                                  {badge.label}
                                </span>
                              </div>
                              <p className="text-xs text-[#94A3B8] mt-0.5">{item.desc}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs text-[#94A3B8] font-mono">{item.time}</span>
                            <span className="material-symbols-outlined text-on-surface-variant text-base">
                              {isExpanded ? 'expand_less' : 'expand_more'}
                            </span>
                          </div>
                        </button>

                        {/* Stack Trace Details */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-4 pb-4 pt-2 border-t border-surface-container-high/30 bg-surface-container-lowest/50 space-y-3"
                            >
                              <div className="bg-black/60 p-3 rounded-lg border border-surface-container-high/30 font-mono text-[11px] text-[#4CC9F0] overflow-x-auto whitespace-pre">
                                {item.stackTrace}
                              </div>

                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleDismiss(item.id)}
                                  className="px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs rounded-lg font-medium cursor-pointer"
                                >
                                  Dismiss
                                </button>
                                <button className="px-3.5 py-1.5 bg-[#4361EE] hover:bg-[#4361EE]/90 text-white text-xs rounded-lg font-semibold cursor-pointer shadow-sm">
                                  Report Issue
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

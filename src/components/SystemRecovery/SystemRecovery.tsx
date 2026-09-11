import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SystemRecoveryProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemRecovery: React.FC<SystemRecoveryProps> = ({ isOpen, onClose }) => {
  const [confirmReset, setConfirmReset] = useState(false);

  const recoveryActions = [
    {
      id: 'restart',
      title: 'Restart Normally',
      desc: 'Reboot CassandraOS into standard desktop environment.',
      icon: 'restart_alt',
      buttonText: 'Restart',
      color: '#4CC9F0',
      isDestructive: false,
    },
    {
      id: 'safemode',
      title: 'Safe Mode Boot',
      desc: 'Start with minimal system drivers and disabled third-party startup applications.',
      icon: 'shield_mode',
      buttonText: 'Boot Safe Mode',
      color: '#F5C400',
      isDestructive: false,
    },
    {
      id: 'restore',
      title: 'Restore from Backup Snapshot',
      desc: 'Revert kernel, system files, and settings to a previous healthy backup state.',
      icon: 'settings_backup_restore',
      buttonText: 'Choose Snapshot',
      color: '#4361EE',
      isDestructive: false,
    },
    {
      id: 'bootrepair',
      title: 'GRUB / EFI Boot Repair',
      desc: 'Rebuild system bootloader configuration and repair partition table pointers.',
      icon: 'build',
      buttonText: 'Run Repair',
      color: '#26B170',
      isDestructive: false,
    },
    {
      id: 'reset',
      title: 'Reset to Factory Settings',
      desc: 'Completely wipe all user data, installed apps, and system settings. Irreversible action.',
      icon: 'warning',
      buttonText: 'Factory Reset',
      color: '#EF4444',
      isDestructive: true,
    },
  ];

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
                  <span className="material-symbols-outlined text-secondary text-[16px]">medical_services</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    System Recovery Environment
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-[#F5C400]">
                Rescue Mode v3.4
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Caution Banner */}
              <div className="bg-[#051650] border border-[#F5C400]/40 rounded-xl p-5 flex items-center gap-4 shadow-md">
                <div className="w-12 h-12 rounded-xl bg-[#F5C400]/10 border border-[#F5C400]/30 flex items-center justify-center text-[#F5C400] shrink-0">
                  <span className="material-symbols-outlined text-3xl">warning</span>
                </div>
                <div>
                  <h2 className="text-base font-bold text-on-surface">CassandraOS Recovery Options</h2>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    If your system is experiencing critical instability or boot failures, select a recovery option below. Ensure important data is backed up before selecting destructive procedures.
                  </p>
                </div>
              </div>

              {/* Action Cards List */}
              <div className="space-y-3">
                {recoveryActions.map((action) => (
                  <div
                    key={action.id}
                    className={`rounded-xl p-4 flex items-center justify-between border transition-all ${
                      action.isDestructive
                        ? 'bg-[#EF4444]/10 border-[#EF4444]/40 hover:border-[#EF4444]'
                        : 'bg-[#051650] border-surface-container-high/40 hover:border-surface-container-high/80'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: `${action.color}15`,
                          color: action.color,
                        }}
                      >
                        <span className="material-symbols-outlined text-xl">{action.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface flex items-center gap-2">
                          {action.title}
                          {action.isDestructive && (
                            <span className="px-2 py-0.5 rounded-full bg-[#EF4444]/20 text-[#EF4444] text-[10px] font-bold">
                              DESTRUCTIVE
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-[#94A3B8] mt-0.5">{action.desc}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => action.isDestructive && setConfirmReset(true)}
                      className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors shrink-0 cursor-pointer shadow-sm ${
                        action.isDestructive
                          ? 'bg-[#EF4444] hover:bg-[#EF4444]/90 text-white'
                          : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface'
                      }`}
                    >
                      {action.buttonText}
                    </button>
                  </div>
                ))}
              </div>

              {/* Confirmation Modal overlay for reset */}
              <AnimatePresence>
                {confirmReset && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-[#EF4444]/15 border border-[#EF4444]/40 rounded-xl space-y-3"
                  >
                    <p className="text-xs font-bold text-[#EF4444] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-base">report_problem</span>
                      Are you sure you want to perform a Factory Reset?
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      All files, LUKS2 vault keys, and desktop configurations will be permanently erased.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setConfirmReset(false)}
                        className="px-3 py-1.5 bg-[#EF4444] text-white text-xs rounded-md font-semibold cursor-pointer"
                      >
                        Confirm Erase & Reset
                      </button>
                      <button
                        onClick={() => setConfirmReset(false)}
                        className="px-3 py-1.5 bg-surface-container-high text-on-surface text-xs rounded-md font-medium cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

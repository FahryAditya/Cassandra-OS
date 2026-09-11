import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BackupRestoreProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BackupSnapshot {
  id: string;
  date: string;
  size: string;
  type: string;
}

export const BackupRestore: React.FC<BackupRestoreProps> = ({ isOpen, onClose }) => {
  const [autoBackup, setAutoBackup] = useState(true);
  const [frequency, setFrequency] = useState('daily');
  const [isExpandedIncluded, setIsExpandedIncluded] = useState(true);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const [snapshots, setSnapshots] = useState<BackupSnapshot[]>([
    { id: 'snap-1', date: 'Today, 04:30 AM', size: '14.2 GB', type: 'Full System Snapshot' },
    { id: 'snap-2', date: 'Yesterday, 11:00 PM', size: '13.8 GB', type: 'Automated Daily' },
    { id: 'snap-3', date: '3 days ago (Sep 8)', size: '12.5 GB', type: 'Automated Daily' },
    { id: 'snap-4', date: '1 week ago (Sep 4)', size: '10.1 GB', type: 'Manual Snapshot' },
  ]);

  const handleBackupNow = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      setSnapshots((prev) => [
        {
          id: `snap-${Date.now()}`,
          date: 'Just now',
          size: '14.5 GB',
          type: 'Manual Snapshot',
        },
        ...prev,
      ]);
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">backup</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Backup & Restore
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-[#4CC9F0]">
                LUKS Vault Snapshot Engine
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Backup Status Card */}
              <div className="bg-[#051650] border border-surface-container-high/40 rounded-xl p-6 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#4CC9F0]/10 border border-[#4CC9F0]/30 flex items-center justify-center text-[#4CC9F0]">
                    <span className="material-symbols-outlined text-3xl">cloud_done</span>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
                      Backup Status: Protected
                    </h2>
                    <p className="text-xs text-on-surface-variant/80 mt-1">
                      Last Backup: <span className="text-on-surface font-semibold">Today at 04:30 AM</span> · Destination: <span className="text-tertiary font-medium">External Enclave Vault (/dev/sdb1)</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleBackupNow}
                  disabled={isBackingUp}
                  className="px-5 py-2.5 bg-[#4361EE] hover:bg-[#4361EE]/90 disabled:bg-surface-container-high text-white text-xs font-semibold rounded-lg transition-colors shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">
                    {isBackingUp ? 'sync' : 'backup'}
                  </span>
                  {isBackingUp ? 'Backing Up...' : 'Back Up Now'}
                </button>
              </div>

              {/* Automatic Backup Preferences */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-lg">history_toggle_off</span>
                  Automated Backup Schedule
                </h3>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <p className="text-sm text-on-surface font-medium">Automatic system & document backup</p>
                    <p className="text-xs text-on-surface-variant/70">Create incremental encrypted snapshots automatically</p>
                  </div>
                  <button
                    onClick={() => setAutoBackup(!autoBackup)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      autoBackup ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        autoBackup ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-surface-container-high/30">
                  <span className="text-xs text-on-surface-variant">Backup Frequency</span>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="bg-surface-container-high text-on-surface text-xs rounded-lg px-3 py-1.5 outline-none border border-surface-container-high/60 cursor-pointer"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>

              {/* Backup Snapshots History */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-3">
                <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-tertiary text-lg">restore</span>
                  Previous Backup Snapshots
                </h3>

                <div className="space-y-2">
                  {snapshots.map((snap) => (
                    <div
                      key={snap.id}
                      className="bg-[#051650]/60 border border-surface-container-high/40 rounded-lg p-3.5 flex items-center justify-between hover:border-surface-container-high/70 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#4CC9F0] text-xl">folder_zip</span>
                        <div>
                          <p className="text-sm font-semibold text-on-surface">{snap.type}</p>
                          <p className="text-xs text-[#94A3B8]">{snap.date} · {snap.size}</p>
                        </div>
                      </div>

                      <button className="px-3 py-1.5 border border-[#4361EE] text-[#4361EE] hover:bg-[#4361EE]/10 text-xs rounded-lg font-medium transition-colors cursor-pointer">
                        Restore
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included Section */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl overflow-hidden">
                <button
                  onClick={() => setIsExpandedIncluded(!isExpandedIncluded)}
                  className="w-full p-4 flex items-center justify-between hover:bg-surface-container-high/40 transition-colors cursor-pointer text-left"
                >
                  <span className="text-sm font-semibold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary text-lg">checklist</span>
                    What's included in Backup?
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant text-base">
                    {isExpandedIncluded ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                <AnimatePresence>
                  {isExpandedIncluded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4 border-t border-surface-container-high/30 space-y-2 pt-2 text-xs text-[#94A3B8]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-on-surface">Documents & User Workspace</span>
                        <span className="text-[#26B170]">Included (45.8 GB)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-on-surface">System & User Settings</span>
                        <span className="text-[#26B170]">Included (1.2 GB)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-on-surface">Applications Data & Configurations</span>
                        <span className="text-[#26B170]">Included (95.2 GB)</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

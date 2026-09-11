import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UpdateCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AppUpdate {
  id: string;
  name: string;
  icon: string;
  currentVersion: string;
  newVersion: string;
  size: string;
  updating: boolean;
  updated: boolean;
}

export const UpdateCenter: React.FC<UpdateCenterProps> = ({ isOpen, onClose }) => {
  const [checking, setChecking] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [updateSchedule, setUpdateSchedule] = useState('daily');
  const [osUpToDate, setOsUpToDate] = useState(true);

  const [pendingUpdates, setPendingUpdates] = useState<AppUpdate[]>([
    {
      id: 'app-1',
      name: 'Chromium Web Engine',
      icon: 'language',
      currentVersion: '128.0.1',
      newVersion: '129.0.0',
      size: '84.2 MB',
      updating: false,
      updated: false,
    },
    {
      id: 'app-2',
      name: 'Terminal Studio',
      icon: 'terminal',
      currentVersion: '2.3.0',
      newVersion: '2.4.1',
      size: '12.5 MB',
      updating: false,
      updated: false,
    },
    {
      id: 'app-3',
      name: 'Disk Enclave Crypt Tool',
      icon: 'lock',
      currentVersion: '1.8.0',
      newVersion: '2.0.0',
      size: '34.1 MB',
      updating: false,
      updated: false,
    },
  ]);

  const checkUpdates = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      setOsUpToDate(true);
    }, 1200);
  };

  const handleUpdateApp = (id: string) => {
    setPendingUpdates((prev) =>
      prev.map((app) => (app.id === id ? { ...app, updating: true } : app))
    );

    setTimeout(() => {
      setPendingUpdates((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, updating: false, updated: true } : app
        )
      );
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">system_update</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Update Center
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-on-surface-variant/70">
                CassandraOS Rolling Channel
              </span>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* OS Status Card */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-6 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center border ${
                      osUpToDate
                        ? 'bg-[#26B170]/10 border-[#26B170]/30 text-[#26B170]'
                        : 'bg-[#4361EE]/10 border-[#4361EE]/30 text-[#4361EE]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-3xl">
                      {osUpToDate ? 'check_circle' : 'update'}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
                      CassandraOS 3.4.0-LTS
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          osUpToDate
                            ? 'bg-[#26B170]/20 text-[#26B170]'
                            : 'bg-[#4361EE]/20 text-[#4361EE]'
                        }`}
                      >
                        {osUpToDate ? 'Up to date' : 'Update Available'}
                      </span>
                    </h2>
                    <p className="text-xs text-on-surface-variant/80 mt-1">
                      Last checked: Today at 05:45 AM · Kernel 6.10 LTS-cyber
                    </p>
                  </div>
                </div>

                <button
                  onClick={checkUpdates}
                  disabled={checking}
                  className="px-4 py-2 bg-[#4361EE] hover:bg-[#4361EE]/90 disabled:bg-surface-container-high text-white text-xs font-medium rounded-lg transition-colors shadow-sm flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">
                    {checking ? 'sync' : 'refresh'}
                  </span>
                  {checking ? 'Checking...' : 'Check for Updates'}
                </button>
              </div>

              {/* Pending Application Updates List */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary text-lg">download</span>
                    Pending Application Updates
                  </h3>
                  <span className="text-xs text-on-surface-variant">
                    {pendingUpdates.filter((u) => !u.updated).length} pending
                  </span>
                </div>

                <div className="space-y-3">
                  {pendingUpdates.map((app) => (
                    <div
                      key={app.id}
                      className="bg-surface-container-high/30 border border-surface-container-high/40 rounded-xl p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-surface-container-high/60 flex items-center justify-center text-tertiary">
                          <span className="material-symbols-outlined text-xl">{app.icon}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-on-surface">{app.name}</p>
                          <p className="text-xs text-on-surface-variant/70">
                            Version: {app.currentVersion}{' '}
                            <span className="text-tertiary font-semibold">→ {app.newVersion}</span> · {app.size}
                          </p>
                        </div>
                      </div>

                      {app.updated ? (
                        <span className="px-3 py-1.5 bg-[#26B170]/20 text-[#26B170] text-xs font-semibold rounded-lg flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">check</span>
                          Updated
                        </span>
                      ) : (
                        <button
                          onClick={() => handleUpdateApp(app.id)}
                          disabled={app.updating}
                          className="px-3.5 py-1.5 bg-[#4361EE] hover:bg-[#4361EE]/90 disabled:bg-surface-container-high text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <span className="material-symbols-outlined text-sm">
                            {app.updating ? 'sync' : 'download'}
                          </span>
                          {app.updating ? 'Updating...' : 'Update'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Automatic Updates Schedule */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-lg">schedule</span>
                  Automatic Update Preferences
                </h3>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <p className="text-sm text-on-surface font-medium">Automatic system & app updates</p>
                    <p className="text-xs text-on-surface-variant/70">Download and install updates in background</p>
                  </div>
                  <button
                    onClick={() => setAutoUpdate(!autoUpdate)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      autoUpdate ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        autoUpdate ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-surface-container-high/30">
                  <span className="text-xs text-on-surface-variant">Update Frequency</span>
                  <select
                    value={updateSchedule}
                    onChange={(e) => setUpdateSchedule(e.target.value)}
                    className="bg-surface-container-high text-on-surface text-xs rounded-lg px-3 py-1.5 outline-none border border-surface-container-high/60 cursor-pointer"
                  >
                    <option value="daily">Check Daily</option>
                    <option value="weekly">Check Weekly</option>
                    <option value="manual">Manual Only</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState('system');
  const [darkMode, setDarkMode] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [telemetry, setTelemetry] = useState(false);

  const categories = [
    { id: 'system', name: 'System & Kernel', icon: 'tune' },
    { id: 'network', name: 'Network & Mesh', icon: 'wifi' },
    { id: 'display', name: 'Display & Graphics', icon: 'desktop_windows' },
    { id: 'sound', name: 'Sound & Audio', icon: 'volume_up' },
    { id: 'security', name: 'Security & Enclave', icon: 'security' },
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
            className="pointer-events-auto relative w-full max-w-[1020px] h-[660px] bg-surface-container-low/95 rounded-xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl border border-surface-container-high/60"
          >
            {/* Window Chrome / Titlebar */}
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">settings</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    System Settings
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-code-sm text-code-sm text-on-surface-variant/70">
                  CassandraOS Build 24.10.3
                </span>
                <div className="flex items-center gap-1 text-tertiary font-code-sm text-code-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                  <span>Synced</span>
                </div>
              </div>
            </div>

            {/* Window Body Split Layout */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Navigation Sidebar */}
              <aside className="w-64 bg-surface-container/70 flex flex-col shrink-0 p-4 border-r border-surface-container-high/40 overflow-hidden">
                <div className="relative mb-4 shrink-0">
                  <span className="material-symbols-outlined absolute left-2.5 top-2 text-on-surface-variant text-[18px]">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Search settings..."
                    className="w-full h-8 pl-8 pr-3 bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/60 font-body-sm text-body-sm rounded-lg outline-none focus:bg-surface-container-high transition-colors border border-surface-container-high/40"
                  />
                </div>

                <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left font-body-sm text-body-sm cursor-pointer ${
                        activeCategory === cat.id
                          ? 'bg-surface-container-high text-tertiary font-semibold shadow-sm'
                          : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </aside>

              {/* Right Settings Content */}
              <main className="flex-1 p-6 overflow-y-auto bg-surface-container-lowest/30 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-on-surface tracking-tight mb-1">
                    System & Kernel Configuration
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Manage system preferences, performance profiles, and telemetry options.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Setting Card 1 */}
                  <div className="p-4 rounded-xl bg-surface-container-high/40 border border-surface-container-high/40 flex items-center justify-between">
                    <div>
                      <span className="font-body-sm text-body-sm font-semibold text-on-surface block">
                        High Contrast Dark Mode
                      </span>
                      <span className="font-body-sm text-[11px] text-on-surface-variant">
                        Apply deep cobalt and pitch-black glass theme across all workspaces.
                      </span>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                        darkMode ? 'bg-tertiary' : 'bg-surface-container-highest'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                          darkMode ? 'left-7' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Setting Card 2 */}
                  <div className="p-4 rounded-xl bg-surface-container-high/40 border border-surface-container-high/40 flex items-center justify-between">
                    <div>
                      <span className="font-body-sm text-body-sm font-semibold text-on-surface block">
                        Automatic Kernel Updates
                      </span>
                      <span className="font-body-sm text-[11px] text-on-surface-variant">
                        Seamless background patch installation for LTS kernel releases.
                      </span>
                    </div>
                    <button
                      onClick={() => setAutoUpdate(!autoUpdate)}
                      className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                        autoUpdate ? 'bg-tertiary' : 'bg-surface-container-highest'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                          autoUpdate ? 'left-7' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Setting Card 3 */}
                  <div className="p-4 rounded-xl bg-surface-container-high/40 border border-surface-container-high/40 flex items-center justify-between">
                    <div>
                      <span className="font-body-sm text-body-sm font-semibold text-on-surface block">
                        Anonymous Telemetry Sharing
                      </span>
                      <span className="font-body-sm text-[11px] text-on-surface-variant">
                        Help improve CassandraOS memory scheduler by submitting crash dumps.
                      </span>
                    </div>
                    <button
                      onClick={() => setTelemetry(!telemetry)}
                      className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                        telemetry ? 'bg-tertiary' : 'bg-surface-container-highest'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                          telemetry ? 'left-7' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </main>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

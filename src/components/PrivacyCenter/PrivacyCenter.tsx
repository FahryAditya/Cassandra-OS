import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrivacyCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPermissions?: () => void;
}

export const PrivacyCenter: React.FC<PrivacyCenterProps> = ({
  isOpen,
  onClose,
  onOpenPermissions,
}) => {
  const [telemetry, setTelemetry] = useState(false);
  const [activityHistory, setActivityHistory] = useState(true);
  const [locationServices, setLocationServices] = useState(true);

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
                  <span className="material-symbols-outlined text-secondary text-[16px]">verified_user</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Privacy Center
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-[#26B170]">
                Zero-Telemetry Shield Active
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Privacy Shield Banner */}
              <div className="bg-[#051650] border border-[#0A2472] rounded-xl p-6 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#26B170]/10 border border-[#26B170]/30 flex items-center justify-center text-[#26B170]">
                    <span className="material-symbols-outlined text-3xl">shield</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
                      Your Privacy is Well Protected
                      <span className="px-2 py-0.5 rounded-full bg-[#26B170]/20 text-[#26B170] text-xs font-semibold">
                        Score: 94 / 100
                      </span>
                    </h2>
                    <p className="text-xs text-on-surface-variant/80 mt-1">
                      No unauthorized telemetry or location tracking detected. All sandbox isolation rules are enforced.
                    </p>
                  </div>
                </div>

                <button
                  onClick={onOpenPermissions}
                  className="px-4 py-2 bg-[#4361EE] hover:bg-[#4361EE]/90 text-white text-xs font-medium rounded-lg transition-colors shadow-sm shrink-0 cursor-pointer"
                >
                  Manage App Permissions
                </button>
              </div>

              {/* Grid of Privacy Category Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* Category 1: App Permissions */}
                <div className="bg-[#051650] border border-[#0A2472] rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="material-symbols-outlined text-tertiary text-xl">admin_panel_settings</span>
                      <h3 className="text-sm font-semibold text-on-surface">App Permissions</h3>
                    </div>
                    <p className="text-xs text-on-surface-variant/80">
                      Control hardware access (camera, microphone, location) per application.
                    </p>
                  </div>
                  <button
                    onClick={onOpenPermissions}
                    className="text-xs font-medium text-tertiary hover:underline flex items-center gap-1 cursor-pointer pt-2"
                  >
                    Review active permissions
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>

                {/* Category 2: Activity History */}
                <div className="bg-[#051650] border border-[#0A2472] rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="material-symbols-outlined text-tertiary text-xl">history</span>
                      <h3 className="text-sm font-semibold text-on-surface">Activity History</h3>
                    </div>
                    <p className="text-xs text-on-surface-variant/80">
                      Stores local search, app launches, and command history on this device only.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-on-surface-variant">Save activity history</span>
                    <button
                      onClick={() => setActivityHistory(!activityHistory)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        activityHistory ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          activityHistory ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Category 3: Data & Diagnostics */}
                <div className="bg-[#051650] border border-[#0A2472] rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="material-symbols-outlined text-tertiary text-xl">insights</span>
                      <h3 className="text-sm font-semibold text-on-surface">Data & Diagnostics</h3>
                    </div>
                    <p className="text-xs text-on-surface-variant/80">
                      Send anonymous error reports and crash dumps to help improve CassandraOS.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-on-surface-variant">Send diagnostics</span>
                    <button
                      onClick={() => setTelemetry(!telemetry)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        telemetry ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          telemetry ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Category 4: Location Services */}
                <div className="bg-[#051650] border border-[#0A2472] rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span className="material-symbols-outlined text-tertiary text-xl">location_on</span>
                      <h3 className="text-sm font-semibold text-on-surface">Location Services</h3>
                    </div>
                    <p className="text-xs text-on-surface-variant/80">
                      Allow system and web applications to estimate device location.
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-on-surface-variant">Enable Location</span>
                    <button
                      onClick={() => setLocationServices(!locationServices)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        locationServices ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          locationServices ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
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

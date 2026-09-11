import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DoNotDisturbProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DoNotDisturb: React.FC<DoNotDisturbProps> = ({ isOpen, onClose }) => {
  const [dndActive, setDndActive] = useState(false);
  const [scheduled, setScheduled] = useState(true);
  const [startTime, setStartTime] = useState('22:00');
  const [endTime, setEndTime] = useState('07:00');

  const [days, setDays] = useState([
    { label: 'M', active: true },
    { label: 'T', active: true },
    { label: 'W', active: true },
    { label: 'T', active: true },
    { label: 'F', active: true },
    { label: 'S', active: false },
    { label: 'S', active: false },
  ]);

  const [allowFavorites, setAllowFavorites] = useState(true);
  const [allowRepeatedCalls, setAllowRepeatedCalls] = useState(true);
  const [allowEmergencyApps, setAllowEmergencyApps] = useState(false);

  const toggleDay = (idx: number) => {
    setDays((prev) =>
      prev.map((d, i) => (i === idx ? { ...d, active: !d.active } : d))
    );
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">do_not_disturb_on</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Do Not Disturb
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-[#4CC9F0]">
                Focus Mode Engine
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Main Banner Toggle */}
              <div className="bg-[#051650] border border-surface-container-high/40 rounded-xl p-6 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#4CC9F0]/10 border border-[#4CC9F0]/30 flex items-center justify-center text-[#4CC9F0]">
                    <span className="material-symbols-outlined text-3xl">bedtime</span>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
                      Do Not Disturb Status:
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        dndActive ? 'bg-[#4361EE]/20 text-[#4361EE]' : 'bg-surface-container-high text-[#94A3B8]'
                      }`}>
                        {dndActive ? 'Active' : 'Off'}
                      </span>
                    </h2>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      Mutes all sound notifications, popups, and desktop badges while focus mode is enabled.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setDndActive(!dndActive)}
                  className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer ${
                    dndActive ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                      dndActive ? 'translate-x-5.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Schedule Section */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary text-lg">schedule</span>
                    Automated Schedule
                  </h3>

                  <button
                    onClick={() => setScheduled(!scheduled)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      scheduled ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        scheduled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {scheduled && (
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-[#94A3B8]">Start Time</label>
                        <input
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full h-9 px-3 bg-[#051650] text-[#F8FAFC] font-mono text-xs rounded-lg outline-none border border-surface-container-high/60"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-[#94A3B8]">End Time</label>
                        <input
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="w-full h-9 px-3 bg-[#051650] text-[#F8FAFC] font-mono text-xs rounded-lg outline-none border border-surface-container-high/60"
                        />
                      </div>
                    </div>

                    {/* Day Pills */}
                    <div>
                      <label className="text-xs text-[#94A3B8] block mb-2">Repeat Days</label>
                      <div className="flex gap-2">
                        {days.map((day, idx) => (
                          <button
                            key={idx}
                            onClick={() => toggleDay(idx)}
                            className={`w-9 h-9 rounded-full text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                              day.active
                                ? 'bg-[#4361EE] text-white shadow-sm'
                                : 'bg-surface-container-high text-[#94A3B8] hover:bg-surface-container-highest'
                            }`}
                          >
                            {day.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Exceptions Section */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-3">
                <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-tertiary text-lg">star</span>
                  Allowed Exceptions
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#051650]/60 rounded-lg">
                    <div>
                      <p className="text-xs font-semibold text-on-surface">Calls from favorite contacts</p>
                      <p className="text-[11px] text-[#94A3B8]">Allow VIP contacts to bypass DND</p>
                    </div>
                    <button
                      onClick={() => setAllowFavorites(!allowFavorites)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        allowFavorites ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          allowFavorites ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#051650]/60 rounded-lg">
                    <div>
                      <p className="text-xs font-semibold text-on-surface">Repeated callers</p>
                      <p className="text-[11px] text-[#94A3B8]">Allow second call from same caller within 3 minutes</p>
                    </div>
                    <button
                      onClick={() => setAllowRepeatedCalls(!allowRepeatedCalls)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        allowRepeatedCalls ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          allowRepeatedCalls ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#051650]/60 rounded-lg">
                    <div>
                      <p className="text-xs font-semibold text-on-surface">Emergency system alerts</p>
                      <p className="text-[11px] text-[#94A3B8]">Critical security & disk enclave warnings</p>
                    </div>
                    <button
                      onClick={() => setAllowEmergencyApps(!allowEmergencyApps)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        allowEmergencyApps ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          allowEmergencyApps ? 'translate-x-5' : 'translate-x-0'
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

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DateTimeSettingsProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const DateTimeSettings: React.FC<DateTimeSettingsProps> = ({ isOpen = true, onClose }) => {
  const [autoTime, setAutoTime] = useState(true);
  const [is24Hour, setIs24Hour] = useState(true);
  const [timeZone, setTimeZone] = useState('GMT+8');
  const [timeString, setTimeString] = useState('');
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour12: !is24Hour,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
      setDateString(
        now.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [is24Hour]);

  const timezones = [
    { id: 'GMT+8', name: 'WITA (GMT+8) — Balikpapan / Makassar' },
    { id: 'GMT+7', name: 'WIB (GMT+7) — Jakarta / Surabaya' },
    { id: 'GMT+9', name: 'WIT (GMT+9) — Jayapura / Tokyo' },
    { id: 'GMT+0', name: 'UTC (GMT+0) — London / Universal' },
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">schedule</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Date & Time Settings
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-[#4CC9F0]">
                NTP Synced (pool.ntp.org)
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Live Digital Clock Header */}
              <div className="bg-[#051650] border border-[#0A2472] rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-md">
                <h1 className="text-4xl font-mono font-bold text-[#F8FAFC] tracking-wider">
                  {timeString || '06:06:45 AM'}
                </h1>
                <p className="text-sm font-medium text-[#4CC9F0] mt-1 font-body">
                  {dateString || 'Friday, September 11, 2026'}
                </p>
              </div>

              {/* Automatic Time Sync */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-on-surface">Set time automatically</h3>
                    <p className="text-xs text-[#94A3B8]">Synchronize date and time with NTP network server</p>
                  </div>
                  <button
                    onClick={() => setAutoTime(!autoTime)}
                    className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer ${
                      autoTime ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                        autoTime ? 'translate-x-5.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {!autoTime && (
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-surface-container-high/30">
                    <div className="space-y-1">
                      <label className="text-xs text-[#94A3B8]">Manual Date</label>
                      <input
                        type="date"
                        defaultValue="2026-09-11"
                        className="w-full h-9 px-3 bg-[#051650] text-[#F8FAFC] font-mono text-xs rounded-lg outline-none border border-surface-container-high/60"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-[#94A3B8]">Manual Time</label>
                      <input
                        type="time"
                        defaultValue="06:06"
                        className="w-full h-9 px-3 bg-[#051650] text-[#F8FAFC] font-mono text-xs rounded-lg outline-none border border-surface-container-high/60"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Timezone & Format Card */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-on-surface">Time Zone</h3>
                    <p className="text-xs text-[#94A3B8]">Select system time zone location</p>
                  </div>
                  <select
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                    className="bg-[#051650] text-[#F8FAFC] text-xs rounded-lg px-3 py-2 outline-none border border-surface-container-high/60 cursor-pointer font-medium"
                  >
                    {timezones.map((tz) => (
                      <option key={tz.id} value={tz.id}>
                        {tz.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-surface-container-high/30">
                  <span className="text-xs text-[#94A3B8] font-medium">Clock Display Format</span>
                  <div className="flex bg-surface-container-high/60 p-1 rounded-lg">
                    <button
                      onClick={() => setIs24Hour(false)}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                        !is24Hour
                          ? 'bg-[#4361EE] text-white shadow-sm font-semibold'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      12-Hour (AM/PM)
                    </button>
                    <button
                      onClick={() => setIs24Hour(true)}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                        is24Hour
                          ? 'bg-[#4361EE] text-white shadow-sm font-semibold'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      24-Hour (18:06)
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

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BatteryPowerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BatteryPower: React.FC<BatteryPowerProps> = ({ isOpen, onClose }) => {
  const [batteryLevel] = useState(78);
  const [isPluggedIn] = useState(true);
  const [powerMode, setPowerMode] = useState<'saver' | 'balanced' | 'performance'>('balanced');
  const [batterySaver20, setBatterySaver20] = useState(true);
  const [dimWhenIdle, setDimWhenIdle] = useState(true);
  const [sleepTimeout, setSleepTimeout] = useState('15');

  // SVG Gauge calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (batteryLevel / 100) * circumference;

  const appUsages = [
    { name: 'Web Engine & Browser', percentage: 42, icon: 'language', color: '#4361EE' },
    { name: 'Terminal Studio', percentage: 24, icon: 'terminal', color: '#4895EF' },
    { name: 'Disk Enclave Vault', percentage: 15, icon: 'lock', color: '#4CC9F0' },
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">battery_charging_full</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Battery & Power
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-code-sm text-code-sm text-on-surface-variant/70">
                  PMU Core v2.4
                </span>
                <div className="flex items-center gap-1 text-[#26B170] font-code-sm text-code-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#26B170] animate-pulse" />
                  <span>Healthy</span>
                </div>
              </div>
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Circular Gauge Card */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-6 flex flex-col items-center justify-center relative shadow-sm">
                <div className="relative flex items-center justify-center w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      stroke="#0A2472"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      stroke={batteryLevel > 30 ? '#26B170' : batteryLevel > 15 ? '#F5C400' : '#EF4444'}
                      strokeWidth="10"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-500 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-1">
                      <span className="text-3xl font-bold font-title text-on-surface">{batteryLevel}%</span>
                      {isPluggedIn && (
                        <span className="material-symbols-outlined text-[#26B170] text-xl animate-pulse">
                          bolt
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-on-surface-variant/80 font-body mt-0.5">
                      {isPluggedIn ? 'Connected to AC' : 'On Battery'}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm font-body text-on-surface-variant font-medium">
                  {isPluggedIn ? '1h 10m until fully charged' : '4h 12m estimated remaining'}
                </p>
              </div>

              {/* Power Mode Selector */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-3">
                <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-lg">electric_bolt</span>
                  Power Mode & Profile
                </h3>
                <div className="grid grid-cols-3 gap-2 bg-surface-container-high/50 p-1 rounded-lg">
                  <button
                    onClick={() => setPowerMode('saver')}
                    className={`py-2 px-3 rounded-md text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      powerMode === 'saver'
                        ? 'bg-[#4361EE] text-white shadow-md'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">eco</span>
                    Power Saver
                  </button>
                  <button
                    onClick={() => setPowerMode('balanced')}
                    className={`py-2 px-3 rounded-md text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      powerMode === 'balanced'
                        ? 'bg-[#4361EE] text-white shadow-md'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">balance</span>
                    Balanced
                  </button>
                  <button
                    onClick={() => setPowerMode('performance')}
                    className={`py-2 px-3 rounded-md text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      powerMode === 'performance'
                        ? 'bg-[#4361EE] text-white shadow-md'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">speed</span>
                    Performance
                  </button>
                </div>
              </div>

              {/* Toggles List */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-lg">tune</span>
                  Power Saver Settings
                </h3>

                <div className="space-y-3 divide-y divide-surface-container-high/30">
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-sm text-on-surface font-medium">Turn on battery saver automatically at 20%</p>
                      <p className="text-xs text-on-surface-variant/70">Reduces background activity and visual effects</p>
                    </div>
                    <button
                      onClick={() => setBatterySaver20(!batterySaver20)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        batterySaver20 ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          batterySaver20 ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <p className="text-sm text-on-surface font-medium">Dim screen when idle</p>
                      <p className="text-xs text-on-surface-variant/70">Lowers display brightness after 2 minutes of inactivity</p>
                    </div>
                    <button
                      onClick={() => setDimWhenIdle(!dimWhenIdle)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        dimWhenIdle ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          dimWhenIdle ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <p className="text-sm text-on-surface font-medium">Sleep after inactivity</p>
                      <p className="text-xs text-on-surface-variant/70">Put system to sleep when not in use</p>
                    </div>
                    <select
                      value={sleepTimeout}
                      onChange={(e) => setSleepTimeout(e.target.value)}
                      className="bg-surface-container-high text-on-surface text-xs rounded-lg px-3 py-1.5 outline-none border border-surface-container-high/60 cursor-pointer"
                    >
                      <option value="5">After 5 minutes</option>
                      <option value="15">After 15 minutes</option>
                      <option value="30">After 30 minutes</option>
                      <option value="60">After 1 hour</option>
                      <option value="0">Never</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Usage by App Chart */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-3">
                <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-lg">bar_chart</span>
                  Battery Usage by App
                </h3>
                <div className="space-y-3 pt-1">
                  {appUsages.map((app) => (
                    <div key={app.name} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="flex items-center gap-2 text-on-surface">
                          <span className="material-symbols-outlined text-sm text-on-surface-variant">
                            {app.icon}
                          </span>
                          {app.name}
                        </span>
                        <span className="text-on-surface-variant">{app.percentage}%</span>
                      </div>
                      <div className="w-full bg-surface-container-high/60 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${app.percentage}%`, backgroundColor: app.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

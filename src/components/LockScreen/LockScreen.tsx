import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LockScreenProps {
  isLocked: boolean;
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ isLocked, onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [timeStr, setTimeStr] = useState('14:28');
  const [dateStr, setDateStr] = useState('Thursday, October 24');

  // Real-time clock update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
      setDateStr(
        now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length > 0) {
      setPassword('');
      setError(false);
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <AnimatePresence>
      {isLocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex flex-col justify-between items-center px-8 py-10 bg-surface-container-lowest overflow-hidden select-none"
        >
          {/* Ambient Wallpaper & Glows */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 filter blur-2xl pointer-events-none"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuADfRwYxtZTm7KPyp6dLid_D-RbYDqIlXFWgBTrIOYD8eyD_jmHi_kKBOdJZq1i4LYxfwEK7D6uKaBpvw9rb86kzsMaZZgc1IMAYQPEvMzqwXB4rtKiZrBTa_jwo0M1n5_hoWohsp9WZT9fpHTs8EXrR1-2JGlwl8cFujppr7vFOeGnIFw8sGTjjZZWHaCBxibpiJ9u9mhVcFQxbSQcRt0ugwXJmJi080Hv50UZK-Twv8tI1NEBsyiM')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-container-lowest/80 via-surface/75 to-surface-container-lowest pointer-events-none" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-container/15 rounded-full blur-3xl pointer-events-none" />

          {/* Clock Header Widget */}
          <header className="relative z-10 flex flex-col items-center mt-6 text-center">
            <div className="font-headline-xl text-[76px] leading-[80px] font-bold text-on-surface tracking-tight drop-shadow-lg font-mono">
              {timeStr}
            </div>
            <div className="flex items-center gap-2 mt-2 font-body-lg text-secondary tracking-wide text-lg">
              <span>{dateStr}</span>
            </div>
            <div className="flex items-center gap-4 mt-2 text-on-surface-variant font-body-sm text-xs">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-tertiary">wb_sunny</span>
                <span>24°C Sunny</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-outline-variant" />
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  battery_charging_full
                </span>
                <span>98% Power</span>
              </span>
            </div>
          </header>

          {/* Centered User Auth Card */}
          <main className="relative z-10 w-full max-w-[420px] flex flex-col items-center my-auto">
            <div className="w-full bg-surface-container-low/85 backdrop-blur-xl rounded-2xl p-8 shadow-2xl flex flex-col items-center border border-surface-container-high/60">
              {/* User Avatar */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-primary via-tertiary to-primary shadow-lg shadow-tertiary/20">
                  <div className="w-full h-full rounded-full overflow-hidden bg-surface-container-highest flex items-center justify-center">
                    <span className="material-symbols-outlined text-[48px] text-tertiary">person</span>
                  </div>
                </div>
                <div className="absolute bottom-0 right-1 w-6 h-6 rounded-full bg-tertiary flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[14px] text-on-tertiary">terminal</span>
                </div>
              </div>

              {/* User Title */}
              <div className="text-center mb-6">
                <h1 className="font-headline-md text-xl font-bold text-on-surface tracking-tight">
                  Cassandra Developer
                </h1>
                <p className="font-code-sm text-xs text-secondary-fixed-dim mt-1">
                  @cass_dev · <span className="text-on-surface-variant">System Administrator</span>
                </p>
              </div>

              {/* Password Form */}
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">keyboard</span>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                    placeholder="Enter password (any key)"
                    className={`w-full bg-surface-container-lowest text-on-surface placeholder:text-outline font-code-md text-code-md rounded-xl pl-10 pr-12 py-3 focus:outline-none transition-colors border ${
                      error ? 'border-red-500' : 'border-surface-container-high/40 focus:border-tertiary'
                    }`}
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-tertiary hover:text-tertiary-fixed transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>
                </div>

                <div className="text-center">
                  <span className="font-code-sm text-[11px] text-on-surface-variant">
                    Press Enter or click arrow to unlock session
                  </span>
                </div>
              </form>
            </div>
          </main>

          {/* Footer Security Badge */}
          <footer className="relative z-10 font-code-sm text-xs text-on-surface-variant flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span>CassandraOS Enclave Guard Protected</span>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

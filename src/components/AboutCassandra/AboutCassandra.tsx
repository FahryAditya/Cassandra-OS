import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AboutCassandraProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenUpdates?: () => void;
}

export const AboutCassandra: React.FC<AboutCassandraProps> = ({
  isOpen,
  onClose,
  onOpenUpdates,
}) => {
  const infoItems = [
    { label: 'Edition', value: 'CassandraOS Cybernetic Workstation Pro' },
    { label: 'Version', value: '3.4.0-LTS (Long Term Support)' },
    { label: 'Kernel Build', value: 'Linux 6.10.0-cassandra-lts-x86_64' },
    { label: 'License Type', value: 'Apache 2.0 Open-Source License' },
    { label: 'Registered System', value: 'Fahry Aditya (Root Admin)' },
    { label: 'System Uptime', value: '4 days, 18 hours, 32 minutes' },
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
            className="pointer-events-auto relative w-full max-w-[680px] h-[580px] bg-surface-container-low/95 rounded-xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl border border-surface-container-high/60"
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">info</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    About CassandraOS
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-[#4CC9F0]">
                v3.4.0-LTS
              </span>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center justify-between relative text-center">
              {/* Background Watermark Glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                <span className="material-symbols-outlined text-[280px] text-[#4CC9F0]">
                  cyclone
                </span>
              </div>

              {/* Header Logo Section */}
              <div className="space-y-3 z-10">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#4361EE] to-[#4CC9F0] p-0.5 mx-auto shadow-lg shadow-[#4361EE]/30">
                  <div className="w-full h-full bg-[#000720] rounded-[14px] flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-[#4CC9F0]">
                      cyclone
                    </span>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold font-title text-[#F8FAFC] tracking-tight">
                    CassandraOS
                  </h1>
                  <p className="text-xs text-[#4CC9F0] font-mono mt-0.5">
                    Cybernetic Glassmorphism Web OS v3.4.0-LTS
                  </p>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">
                    Build 24.10.3 · Rolling Kernel Release
                  </p>
                </div>
              </div>

              {/* Info List Card */}
              <div className="w-full bg-[#051650]/80 border border-[#0A2472] rounded-xl p-4 space-y-2 text-left z-10 shadow-sm">
                {infoItems.map((item) => (
                  <div key={item.label} className="flex justify-between items-center text-xs py-1 border-b border-surface-container-high/20 last:border-0">
                    <span className="text-[#94A3B8] font-medium">{item.label}</span>
                    <span className="text-[#F8FAFC] font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Links Footer */}
              <div className="flex items-center gap-6 text-xs text-[#4CC9F0] font-medium z-10 pt-2">
                <button
                  onClick={onOpenUpdates}
                  className="hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">system_update</span>
                  Check for updates
                </button>
                <span>·</span>
                <a href="#license" className="hover:underline">
                  View License
                </a>
                <span>·</span>
                <a href="#terms" className="hover:underline">
                  Terms of Service
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

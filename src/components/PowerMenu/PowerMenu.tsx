import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PowerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLock: () => void;
}

export const PowerMenu: React.FC<PowerMenuProps> = ({ isOpen, onClose, onLock }) => {
  const actions = [
    {
      id: 'lock',
      title: 'Lock Session',
      desc: 'Secure workspace & require password',
      icon: 'lock',
      color: 'text-tertiary',
      bgColor: 'bg-tertiary/10 hover:bg-tertiary/20 border-tertiary/30',
      action: () => {
        onLock();
        onClose();
      },
    },
    {
      id: 'suspend',
      title: 'Suspend Node',
      desc: 'Sleep system to low-power state',
      icon: 'bedtime',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10 hover:bg-secondary/20 border-secondary/30',
      action: () => onClose(),
    },
    {
      id: 'restart',
      title: 'Restart Kernel',
      desc: 'Reboot CassandraOS system kernel',
      icon: 'restart_alt',
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/10 hover:bg-amber-400/20 border-amber-400/30',
      action: () => onClose(),
    },
    {
      id: 'shutdown',
      title: 'Power Off',
      desc: 'Safely terminate all system processes',
      icon: 'power_settings_new',
      color: 'text-red-400',
      bgColor: 'bg-red-400/10 hover:bg-red-400/20 border-red-400/30',
      action: () => onClose(),
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-surface-container-lowest/80 backdrop-blur-xl"
          />

          {/* Power Capsule Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-20 w-full max-w-[540px] bg-surface-container-low/95 backdrop-blur-2xl rounded-2xl shadow-[0_24px_64px_rgba(0,7,32,0.85),_0_0_24px_rgba(67,97,238,0.2)] flex flex-col overflow-hidden border border-surface-container-high/60"
          >
            {/* Top Accent Highlight */}
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-tertiary to-transparent opacity-80" />

            {/* Header */}
            <div className="p-6 pb-4 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center p-2 shadow-inner shrink-0 border border-surface-container-highest">
                  <span className="material-symbols-outlined text-tertiary text-[28px]">power_settings_new</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h2 className="font-headline-md text-xl font-bold text-on-surface tracking-tight">
                      Session Control
                    </h2>
                    <span className="px-2 py-0.5 bg-surface-container-highest rounded font-code-sm text-[10px] text-tertiary uppercase font-semibold">
                      Active
                    </span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                    Choose an action for session <span className="font-code-sm text-secondary font-medium">node-station-07</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="font-code-sm text-[10px] text-outline">USER</span>
                <span className="font-code-md text-sm text-secondary font-semibold">cass_dev</span>
              </div>
            </div>

            {/* Micro Telemetry Strip */}
            <div className="px-6 pb-4">
              <div className="grid grid-cols-3 gap-2 bg-surface-container-lowest/80 p-2.5 rounded-xl text-center border border-surface-container-high/40">
                <div className="flex flex-col items-center">
                  <span className="font-code-sm text-[10px] text-on-surface-variant">Uptime</span>
                  <span className="font-code-sm text-xs text-on-surface font-semibold">14d 08h</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-code-sm text-[10px] text-on-surface-variant">Processes</span>
                  <span className="font-code-sm text-xs text-tertiary font-semibold">184 Tasks</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-code-sm text-[10px] text-on-surface-variant">Status</span>
                  <span className="font-code-sm text-xs text-emerald-400 font-semibold">NOMINAL</span>
                </div>
              </div>
            </div>

            {/* Action Grid */}
            <div className="p-6 pt-0 grid grid-cols-2 gap-3">
              {actions.map((act) => (
                <button
                  key={act.id}
                  onClick={act.action}
                  className={`group p-4 rounded-xl border transition-all text-left flex flex-col justify-between h-28 cursor-pointer ${act.bgColor}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`material-symbols-outlined text-[24px] ${act.color}`}>
                      {act.icon}
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-outline group-hover:text-on-surface transition-colors">
                      chevron_right
                    </span>
                  </div>
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface font-bold block mb-0.5">
                      {act.title}
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant block">
                      {act.desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-surface-container-lowest flex items-center justify-between border-t border-surface-container-high/40 font-code-sm text-xs">
              <span className="text-on-surface-variant">Cassandra OS Power Management</span>
              <button onClick={onClose} className="text-tertiary hover:underline cursor-pointer">
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

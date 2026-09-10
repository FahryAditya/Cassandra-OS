import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SystemSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemSearch: React.FC<SystemSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  // Handle ESC and Ctrl+Space shortcut globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const recentLogs = [
    { title: 'root@cassandra-core:~# rustc --version', category: 'Terminal Command', tag: 'bash' },
    { title: 'SYS_LOAD: 0.28, 0.44, 0.51 | MEM: 4122MiB', category: 'Telemetry', tag: 'kernel' },
    { title: '/home/cass/Documents/Projects/cassandra-os', category: 'Directory', tag: 'ext4' },
    { title: 'Network Security Mesh Tunnel #12', category: 'VPN Config', tag: 'security' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop Scrim Veil */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-surface-container-lowest/80 backdrop-blur-xl"
          />

          {/* Centered Command Palette Window */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-20 w-full max-w-[680px] bg-surface-container-low rounded-xl shadow-[0_24px_64px_rgba(0,0,0,0.7),0_0_0_1px_rgba(91,213,252,0.25),0_0_32px_rgba(67,97,238,0.25)] flex flex-col overflow-hidden"
          >
            {/* Top Interactive Search Input Strip */}
            <div className="px-6 py-4 bg-surface-container-high/90 flex items-center gap-4 shadow-sm border-b border-surface-container-highest">
              <div className="relative flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary text-[24px] drop-shadow-[0_0_10px_rgba(91,213,252,0.8)]">
                  terminal
                </span>
                <span className="absolute -inset-1 bg-tertiary/20 rounded-full blur-sm" />
              </div>
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command, file name, or setting..."
                className="w-full bg-transparent text-on-surface placeholder:text-outline font-code-md text-code-md outline-none"
              />
              <button
                onClick={onClose}
                className="px-2 py-1 bg-surface-container rounded text-on-surface-variant font-code-sm text-[11px] uppercase cursor-pointer hover:bg-surface-container-highest transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Results / Suggestions List */}
            <div className="p-4 max-h-[380px] overflow-y-auto space-y-3">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold block">
                {query ? 'Search Results' : 'Recent Telemetry & Commands'}
              </span>

              <div className="space-y-1.5">
                {recentLogs
                  .filter((log) => log.title.toLowerCase().includes(query.toLowerCase()))
                  .map((item, idx) => (
                    <div
                      key={idx}
                      onClick={onClose}
                      className="group flex items-center justify-between p-3 rounded-lg bg-surface-container-high/40 hover:bg-surface-container-high transition-colors cursor-pointer border border-surface-container-high/30"
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-tertiary text-[18px]">
                          chevron_right
                        </span>
                        <div className="flex flex-col">
                          <span className="font-code-sm text-code-sm text-on-surface font-medium group-hover:text-tertiary transition-colors">
                            {item.title}
                          </span>
                          <span className="font-body-sm text-[11px] text-on-surface-variant">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <span className="font-code-sm text-[10px] px-2 py-0.5 rounded bg-surface-container-highest text-tertiary border border-tertiary/20">
                        {item.tag}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Command Palette Footer */}
            <div className="px-6 py-2.5 bg-surface-container-lowest flex items-center justify-between border-t border-surface-container-highest font-code-sm text-[11px] text-on-surface-variant">
              <span>Cassandra Command Mesh</span>
              <div className="flex gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>esc Close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { NotificationItem } from '../../types/os';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Security Mesh Active',
      time: '2m ago',
      message: 'Zero-trust VPN tunnel established with node-eu-central-09 (AES-256).',
      source: 'Security Engine',
      type: 'security',
      icon: 'shield',
      read: false,
    },
    {
      id: '2',
      title: 'Kernel Update Ready',
      time: '15m ago',
      message: 'CassandraOS v3.4.1-LTS patch ready for background installation.',
      source: 'System Update',
      type: 'update',
      icon: 'system_update',
      read: false,
    },
    {
      id: '3',
      title: 'High I/O Throughput',
      time: '1h ago',
      message: 'Storage Node 01 reached 4.2 GB/s peak burst write speed.',
      source: 'Disk Enclave',
      type: 'system',
      icon: 'database',
      read: true,
    },
    {
      id: '4',
      title: 'LSP Server Synced',
      time: '2h ago',
      message: 'Rust Language Server connected for CassandraOS Code Studio.',
      source: 'Code Studio',
      type: 'app',
      icon: 'code',
      read: true,
    },
  ]);

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Scrim */}
          <div className="fixed inset-0 z-40 bg-surface-container-lowest/30 backdrop-blur-sm" onClick={onClose} />

          {/* Right Floating Notification Panel */}
          <motion.aside
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-14 right-0 bottom-0 z-50 w-[420px] max-w-[90vw] bg-surface-container-lowest/90 backdrop-blur-2xl shadow-2xl flex flex-col justify-between overflow-hidden border-l border-surface-container-high/40"
          >
            <div className="flex flex-col flex-1 min-h-0">
              {/* Header */}
              <div className="px-6 pt-6 pb-4 bg-surface-container-low/70 flex flex-col gap-4 border-b border-surface-container-high/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight font-bold">
                      Notifications
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-xs font-semibold shadow-sm">
                      {notifications.filter((n) => !n.read).length} New
                    </span>
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAll}
                      className="font-code-sm text-xs text-tertiary hover:text-tertiary-fixed transition-colors cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Telemetry Micro Summary Card */}
                <div className="p-3 rounded-xl bg-surface-container/70 border border-surface-container-high/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                    <span className="font-code-sm text-xs text-on-surface font-medium">
                      Kernel Telemetry Nominal
                    </span>
                  </div>
                  <span className="font-code-sm text-[11px] text-tertiary">LATENCY: 1.2ms</span>
                </div>
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {notifications.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 text-on-surface-variant space-y-2">
                    <span className="material-symbols-outlined text-[48px] text-outline">notifications_off</span>
                    <span className="font-body-sm text-body-sm">No new notifications</span>
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-xl border transition-all ${
                        item.read
                          ? 'bg-surface-container-high/30 border-surface-container-high/30 opacity-70'
                          : 'bg-surface-container-high/70 border-tertiary/30 shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-tertiary">
                            {item.icon}
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface font-semibold">
                            {item.title}
                          </span>
                        </div>
                        <span className="font-code-sm text-[10px] text-outline">{item.time}</span>
                      </div>
                      <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed mb-2">
                        {item.message}
                      </p>
                      <span className="font-code-sm text-[10px] px-2 py-0.5 rounded bg-surface-container text-tertiary">
                        {item.source}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-surface-container-low/80 border-t border-surface-container-high/40 flex items-center justify-between text-on-surface-variant font-code-sm text-xs">
              <span>Cassandra Notification Bus</span>
              <button onClick={onClose} className="hover:text-on-surface transition-colors cursor-pointer">
                Close Panel
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

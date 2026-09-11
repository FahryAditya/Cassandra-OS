import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WindowId } from '../../types/os';

interface AppLauncherProps {
  isOpen: boolean;
  onClose: () => void;
  toggleWindow: (id: WindowId) => void;
  onOpenSearch: () => void;
}

export const AppLauncher: React.FC<AppLauncherProps> = ({
  isOpen,
  onClose,
  toggleWindow,
  onOpenSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const pinnedApps = [
    { id: 'file-manager' as WindowId, name: 'Files', icon: 'folder_open', color: 'text-secondary' },
    { id: 'terminal' as WindowId, name: 'Terminal', icon: 'terminal', color: 'text-tertiary' },
    { id: 'settings' as WindowId, name: 'Settings', icon: 'settings', color: 'text-secondary' },
    { id: 'calculator' as WindowId, name: 'Calculator', icon: 'calculate', color: 'text-secondary' },
    { id: 'text-editor' as WindowId, name: 'Text Editor', icon: 'description', color: 'text-tertiary' },
    { id: 'software-center' as WindowId, name: 'Software', icon: 'shopping_bag', color: 'text-secondary' },
    { id: 'battery-power' as WindowId, name: 'Battery', icon: 'battery_charging_full', color: 'text-tertiary' },
    { id: 'storage-manager' as WindowId, name: 'Storage', icon: 'hard_drive', color: 'text-secondary' },
    { id: 'app-permissions' as WindowId, name: 'Permissions', icon: 'admin_panel_settings', color: 'text-secondary' },
    { id: 'privacy-center' as WindowId, name: 'Privacy', icon: 'verified_user', color: 'text-tertiary' },
    { id: 'security-center' as WindowId, name: 'Security', icon: 'security', color: 'text-tertiary' },
    { id: 'update-center' as WindowId, name: 'Updates', icon: 'system_update', color: 'text-secondary' },
    { id: 'backup-restore' as WindowId, name: 'Backup', icon: 'backup', color: 'text-tertiary' },
    { id: 'system-recovery' as WindowId, name: 'Recovery', icon: 'medical_services', color: 'text-secondary' },
    { id: 'hardware-info' as WindowId, name: 'Hardware', icon: 'hardware', color: 'text-secondary' },
    { id: 'about-cassandra' as WindowId, name: 'About OS', icon: 'info', color: 'text-tertiary' },
    { id: 'error-crash-center' as WindowId, name: 'Crash Logs', icon: 'bug_report', color: 'text-secondary' },
    { id: 'wifi-networks' as WindowId, name: 'Wi-Fi', icon: 'wifi', color: 'text-tertiary' },
    { id: 'ethernet-settings' as WindowId, name: 'Ethernet', icon: 'lan', color: 'text-secondary' },
    { id: 'vpn-settings' as WindowId, name: 'VPN', icon: 'vpn_key', color: 'text-tertiary' },
    { id: 'network-details' as WindowId, name: 'Net Info', icon: 'fingerprint', color: 'text-secondary' },
    { id: 'bluetooth-devices' as WindowId, name: 'Bluetooth', icon: 'bluetooth', color: 'text-tertiary' },
    { id: 'printers-scanners' as WindowId, name: 'Printers', icon: 'print', color: 'text-secondary' },
    { id: 'camera-settings' as WindowId, name: 'Camera', icon: 'videocam', color: 'text-[#4CC9F0]' },
    { id: 'microphone-settings' as WindowId, name: 'Microphone', icon: 'mic', color: 'text-[#4895EF]' },
    { id: 'audio-devices' as WindowId, name: 'Audio Routing', icon: 'volume_up', color: 'text-tertiary' },
    { id: 'notifications-settings' as WindowId, name: 'Alerts', icon: 'notifications', color: 'text-secondary' },
    { id: 'do-not-disturb' as WindowId, name: 'DND Focus', icon: 'do_not_disturb_on', color: 'text-tertiary' },
    { id: 'accessibility-settings' as WindowId, name: 'Accessibility', icon: 'accessibility_new', color: 'text-secondary' },
    { id: 'language-region' as WindowId, name: 'Language', icon: 'language', color: 'text-tertiary' },
    { id: 'date-time' as WindowId, name: 'Date & Time', icon: 'schedule', color: 'text-[#4CC9F0]' },
    { id: 'default-apps' as WindowId, name: 'Default Apps', icon: 'apps', color: 'text-[#4895EF]' },
    { id: 'startup-apps' as WindowId, name: 'Startup Apps', icon: 'launch', color: 'text-secondary' },
    { id: 'app-storage' as WindowId, name: 'App Storage', icon: 'storage', color: 'text-tertiary' },
    { id: 'app-details' as WindowId, name: 'App Details', icon: 'info', color: 'text-secondary' },
    { id: 'system-diagnostics' as WindowId, name: 'Diagnostics', icon: 'verified', color: 'text-[#26B170]' },
  ];

  const categories = [
    {
      title: 'System & Utilities',
      apps: [
        { name: 'System Monitor', icon: 'monitoring', desc: 'Realtime telemetry & resource usage' },
        { name: 'Disk Enclave', icon: 'hard_drive', desc: 'Encrypted storage partition manager' },
        { name: 'Network Mesh', icon: 'hub', desc: 'Zero-trust VPN & proxy manager' },
      ],
    },
    {
      title: 'Developer Tools',
      apps: [
        { name: 'VS Code Web', icon: 'code', desc: 'Integrated IDE environment' },
        { name: 'Docker Console', icon: 'view_in_ar', desc: 'Container orchestration manager' },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-surface-container-lowest/40 backdrop-blur-sm"
          />

          {/* Floating Glass Launcher Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-14 left-64 z-50 w-[540px] max-h-[620px] h-[620px] bg-surface-container-low/95 backdrop-blur-2xl rounded-xl shadow-[0_24px_60px_-12px_rgba(0,7,32,0.95),0_0_0_1px_rgba(91,213,252,0.2)] flex flex-col overflow-hidden"
          >
            {/* Top Decorative Accent Bar */}
            <div className="h-1 w-full bg-gradient-to-r from-tertiary via-primary-container to-tertiary" />

            {/* Header: Quick Search Field */}
            <div className="p-4 pb-3 border-b border-surface-container-high/40">
              <div className="relative flex items-center w-full bg-surface-container-lowest/90 rounded-lg px-3 py-2.5 group focus-within:shadow-[0_0_16px_rgba(91,213,252,0.3)] transition-all border border-surface-container-high/40">
                <span className="material-symbols-outlined text-tertiary text-[20px] mr-3">search</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search applications, files, settings..."
                  className="w-full bg-transparent text-on-surface placeholder:text-outline font-body-sm text-body-sm outline-none"
                />
                <button
                  onClick={onOpenSearch}
                  className="flex items-center gap-1 ml-2 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <kbd className="px-1.5 py-0.5 bg-surface-container-high rounded text-on-surface-variant font-code-sm text-[10px] uppercase border border-surface-container-highest">
                    Ctrl
                  </kbd>
                  <span className="text-outline font-code-sm text-[10px]">+</span>
                  <kbd className="px-1.5 py-0.5 bg-surface-container-high rounded text-on-surface-variant font-code-sm text-[10px] uppercase border border-surface-container-highest">
                    Space
                  </kbd>
                </button>
              </div>
            </div>

            {/* Main Scrollable Application Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-none">
              {/* Pinned Apps Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-tertiary text-[14px]">push_pin</span>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                      Pinned
                    </span>
                  </div>
                  <span className="font-code-sm text-code-sm text-outline">6 items</span>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {pinnedApps.map((app) => (
                    <button
                      key={app.name}
                      onClick={() => {
                        toggleWindow(app.id);
                        onClose();
                      }}
                      className="group flex flex-col items-center gap-1.5 p-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest transition-all duration-200 hover:-translate-y-0.5 focus:outline-none cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shadow-sm group-hover:shadow-[0_0_12px_rgba(91,213,252,0.3)] transition-all border border-surface-container-high/40">
                        <span className={`material-symbols-outlined text-[22px] ${app.color}`}>
                          {app.icon}
                        </span>
                      </div>
                      <span className="font-body-sm text-[11px] text-on-surface truncate w-full text-center group-hover:text-tertiary">
                        {app.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              {categories.map((cat) => (
                <div key={cat.title} className="space-y-2">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold block">
                    {cat.title}
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {cat.apps.map((item) => (
                      <div
                        key={item.name}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2.5 rounded-lg bg-surface-container-high/50 hover:bg-surface-container-high transition-colors cursor-pointer border border-surface-container-high/30"
                      >
                        <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-tertiary">
                          <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-body-sm text-body-sm text-on-surface font-medium">
                            {item.name}
                          </span>
                          <span className="font-body-sm text-[11px] text-on-surface-variant truncate">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-surface-container-lowest/80 border-t border-surface-container-high/40 flex items-center justify-between text-on-surface-variant font-code-sm text-code-sm">
              <span>CassandraOS Core Apps</span>
              <span className="text-tertiary">System Online</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

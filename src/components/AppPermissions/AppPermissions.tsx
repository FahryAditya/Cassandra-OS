import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AppPermissionsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PermissionCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface AppPermissionItem {
  id: string;
  name: string;
  icon: string;
  granted: boolean;
  lastUsed: string;
}

export const AppPermissions: React.FC<AppPermissionsProps> = ({ isOpen, onClose }) => {
  const [selectedPerm, setSelectedPerm] = useState('camera');

  const categories: PermissionCategory[] = [
    { id: 'camera', name: 'Camera', icon: 'videocam', count: 3 },
    { id: 'microphone', name: 'Microphone', icon: 'mic', count: 4 },
    { id: 'location', name: 'Location Services', icon: 'location_on', count: 2 },
    { id: 'contacts', name: 'Contacts & People', icon: 'contacts', count: 1 },
    { id: 'files', name: 'Files & Folders', icon: 'folder', count: 5 },
    { id: 'notifications', name: 'Notifications', icon: 'notifications', count: 6 },
    { id: 'background', name: 'Background Activity', icon: 'sync', count: 4 },
  ];

  const [appsMap, setAppsMap] = useState<Record<string, AppPermissionItem[]>>({
    camera: [
      { id: 'app-1', name: 'Web Cam Studio', icon: 'camera', granted: true, lastUsed: 'Accessed 10 mins ago' },
      { id: 'app-2', name: 'Security Enclave', icon: 'security', granted: true, lastUsed: 'Accessed 2 hours ago' },
      { id: 'app-3', name: 'Chromium Browser', icon: 'language', granted: true, lastUsed: 'Accessed yesterday' },
      { id: 'app-4', name: 'Terminal Studio', icon: 'terminal', granted: false, lastUsed: 'Never accessed' },
    ],
    microphone: [
      { id: 'app-1', name: 'Voice Call Engine', icon: 'call', granted: true, lastUsed: 'Active now' },
      { id: 'app-2', name: 'Web Cam Studio', icon: 'camera', granted: true, lastUsed: 'Accessed 10 mins ago' },
      { id: 'app-3', name: 'Chromium Browser', icon: 'language', granted: true, lastUsed: 'Accessed 3 hours ago' },
      { id: 'app-4', name: 'Screen Recorder', icon: 'videocam', granted: true, lastUsed: 'Accessed 1 day ago' },
    ],
    location: [
      { id: 'app-1', name: 'Network Mesh Shield', icon: 'wifi_tethering', granted: true, lastUsed: 'Active in background' },
      { id: 'app-2', name: 'Chromium Browser', icon: 'language', granted: true, lastUsed: 'Accessed 5 mins ago' },
    ],
    contacts: [
      { id: 'app-1', name: 'UserProfile Manager', icon: 'account_circle', granted: true, lastUsed: 'Accessed 1 hour ago' },
    ],
    files: [
      { id: 'app-1', name: 'File Explorer Vault', icon: 'folder_zip', granted: true, lastUsed: 'Active now' },
      { id: 'app-2', name: 'Text Editor Studio', icon: 'edit_note', granted: true, lastUsed: 'Accessed 20 mins ago' },
      { id: 'app-3', name: 'Terminal Studio', icon: 'terminal', granted: true, lastUsed: 'Accessed 1 hour ago' },
      { id: 'app-4', name: 'Software Store', icon: 'shopping_bag', granted: true, lastUsed: 'Accessed 4 hours ago' },
      { id: 'app-5', name: 'Disk Enclave', icon: 'lock', granted: true, lastUsed: 'Accessed yesterday' },
    ],
    notifications: [
      { id: 'app-1', name: 'System Monitor', icon: 'monitoring', granted: true, lastUsed: 'Active' },
      { id: 'app-2', name: 'Security Center', icon: 'shield', granted: true, lastUsed: 'Active' },
      { id: 'app-3', name: 'Update Center', icon: 'system_update', granted: true, lastUsed: 'Active' },
      { id: 'app-4', name: 'Network Mesh', icon: 'hub', granted: true, lastUsed: 'Active' },
      { id: 'app-5', name: 'Software Store', icon: 'shopping_bag', granted: true, lastUsed: 'Active' },
      { id: 'app-6', name: 'Chromium Browser', icon: 'language', granted: true, lastUsed: 'Active' },
    ],
    background: [
      { id: 'app-1', name: 'System Telemetry Daemon', icon: 'developer_board', granted: true, lastUsed: 'Running background service' },
      { id: 'app-2', name: 'LUKS Crypt Enclave', icon: 'lock', granted: true, lastUsed: 'Running background service' },
      { id: 'app-3', name: 'eBPF Packet Filter', icon: 'shield', granted: true, lastUsed: 'Running background service' },
      { id: 'app-4', name: 'Network Mesh Sync', icon: 'sync', granted: true, lastUsed: 'Running background service' },
    ],
  });

  const togglePermission = (permId: string, appId: string) => {
    setAppsMap((prev) => ({
      ...prev,
      [permId]: prev[permId].map((app) =>
        app.id === appId ? { ...app, granted: !app.granted } : app
      ),
    }));
  };

  const activeApps = appsMap[selectedPerm] || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto relative w-full max-w-[900px] h-[640px] bg-surface-container-low/95 rounded-xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl border border-surface-container-high/60"
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">admin_panel_settings</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    App Permissions
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-on-surface-variant/70">
                Sandboxed Privacy Matrix
              </span>
            </div>

            {/* Split View */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Sidebar */}
              <aside className="w-64 bg-surface-container/70 flex flex-col shrink-0 p-3 border-r border-surface-container-high/40 overflow-y-auto space-y-1">
                <p className="px-3 py-1.5 text-xs font-semibold text-on-surface-variant/60 uppercase tracking-wider">
                  Permission Types
                </p>
                {categories.map((cat) => {
                  const isSelected = selectedPerm === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedPerm(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-left text-xs font-medium cursor-pointer ${
                        isSelected
                          ? 'bg-[#4361EE] text-white shadow-sm font-semibold'
                          : 'text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-lg">{cat.icon}</span>
                        <span>{cat.name}</span>
                      </div>
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-surface-container-high text-on-surface-variant'
                        }`}
                      >
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </aside>

              {/* Right Panel */}
              <main className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container-high/40">
                  <div>
                    <h2 className="text-base font-semibold text-on-surface capitalize flex items-center gap-2">
                      <span className="material-symbols-outlined text-tertiary">
                        {categories.find((c) => c.id === selectedPerm)?.icon}
                      </span>
                      {categories.find((c) => c.id === selectedPerm)?.name} Permission
                    </h2>
                    <p className="text-xs text-on-surface-variant/80 mt-0.5">
                      Manage which applications can access this hardware/system capability.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {activeApps.map((app) => (
                    <div
                      key={app.id}
                      className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-4 flex items-center justify-between shadow-sm hover:border-surface-container-high/70 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-surface-container-high/60 flex items-center justify-center text-tertiary">
                          <span className="material-symbols-outlined text-xl">{app.icon}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-on-surface">{app.name}</p>
                          <p className="text-xs text-on-surface-variant/70">{app.lastUsed}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => togglePermission(selectedPerm, app.id)}
                        className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                          app.granted ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                            app.granted ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </main>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWindowManager } from '../../context/WindowContext';
import type { WindowId } from '../../types/os';

interface AllApplicationsProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface AppInfo {
  id: WindowId;
  name: string;
  category: string;
  icon: string;
  desc: string;
  letter: string;
}

export const AllApplications: React.FC<AllApplicationsProps> = ({ isOpen = true }) => {
  const { openWindow } = useWindowManager();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const allAppsList: AppInfo[] = [
    { id: 'about-cassandra', name: 'About CassandraOS', category: 'System', icon: 'info', desc: 'OS system details & credits', letter: 'A' },
    { id: 'accessibility-settings', name: 'Accessibility Options', category: 'Settings', icon: 'accessibility_new', desc: 'Vision & screen assistance', letter: 'A' },
    { id: 'app-details', name: 'Application Inspector', category: 'System', icon: 'info', desc: 'Permissions & security audit', letter: 'A' },
    { id: 'audio-devices', name: 'Audio Routing & Volume', category: 'Hardware', icon: 'volume_up', desc: 'PipeWire sound server manager', letter: 'A' },
    { id: 'backup-restore', name: 'Backup & Recovery Vault', category: 'System', icon: 'settings_backup_restore', desc: 'LUKS encrypted system snapshots', letter: 'B' },
    { id: 'battery-power', name: 'Battery & Power Saver', category: 'Hardware', icon: 'battery_saver', desc: 'Power profiles & battery health', letter: 'B' },
    { id: 'bluetooth-devices', name: 'Bluetooth 5.3 Manager', category: 'Hardware', icon: 'bluetooth', desc: 'BLE peripheral connectivity', letter: 'B' },
    { id: 'calculator', name: 'Calculator Scientific', category: 'Utility', icon: 'calculate', desc: 'Trigonometry & algebra calculator', letter: 'C' },
    { id: 'camera-settings', name: 'Camera & Video Pipeline', category: 'Hardware', icon: 'videocam', desc: 'V4L2 camera preview & permissions', letter: 'C' },
    { id: 'control-center', name: 'Control Center Toggles', category: 'System', icon: 'tune', desc: 'Quick hardware & network toggles', letter: 'C' },
    { id: 'date-time', name: 'Date & Time Sync', category: 'Settings', icon: 'schedule', desc: 'NTP sync & timezone selector', letter: 'D' },
    { id: 'default-apps', name: 'Default Applications', category: 'Settings', icon: 'star', desc: 'Configure default app associations', letter: 'D' },
    { id: 'disk-enclave', name: 'Disk Enclave LUKS Vault', category: 'Security', icon: 'security', desc: 'TPM 2.0 PCR attestation vault', letter: 'D' },
    { id: 'ethernet-settings', name: 'Ethernet 10GbE Settings', category: 'Network', icon: 'lan', desc: 'Wired connection IP configuration', letter: 'E' },
    { id: 'file-manager', name: 'File Explorer Studio', category: 'Utility', icon: 'database', desc: 'Cryptographic storage navigator', letter: 'F' },
    { id: 'hardware-info', name: 'Hardware Specifications', category: 'Hardware', icon: 'memory', desc: 'CPU, GPU, RAM & UEFI BIOS info', letter: 'H' },
    { id: 'lock-screen', name: 'Lock Screen Protection', category: 'Security', icon: 'lock', desc: 'Cybernetic lock screen overlay', letter: 'L' },
    { id: 'network-mesh', name: 'Network Mesh & eBPF', category: 'Network', icon: 'hub', desc: 'Zero-trust network packet filter', letter: 'N' },
    { id: 'personalization', name: 'Personalization & Themes', category: 'Settings', icon: 'palette', desc: 'Glassmorphism wallpapers & accent colors', letter: 'P' },
    { id: 'privacy-center', name: 'Privacy & Telemetry Shield', category: 'Security', icon: 'shield', desc: 'Anonymous telemetry & permissions', letter: 'P' },
    { id: 'security-center', name: 'Security & Firewall Center', category: 'Security', icon: 'admin_panel_settings', desc: 'eBPF firewall & threat scanner', letter: 'S' },
    { id: 'software-center', name: 'Software Center Store', category: 'Utility', icon: 'inventory_2', desc: 'Package marketplace & installer', letter: 'S' },
    { id: 'system-monitor', name: 'System Telemetry Monitor', category: 'System', icon: 'monitoring', desc: 'Real-time CPU/RAM telemetry', letter: 'S' },
    { id: 'terminal', name: 'Terminal Console', category: 'Utility', icon: 'terminal', desc: 'Interactive shell environment', letter: 'T' },
    { id: 'text-editor', name: 'Text & Code Editor Studio', category: 'Developer', icon: 'code', desc: 'Lightweight code studio', letter: 'T' },
    { id: 'user-profile', name: 'User Profile & Identity', category: 'System', icon: 'badge', desc: 'FIDO2 passkey & account settings', letter: 'U' },
    { id: 'wifi-networks', name: 'Wi-Fi 6E Wireless', category: 'Network', icon: 'wifi', desc: 'Wireless network scanner & connect', letter: 'W' },
  ];

  const alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  const filteredApps = allAppsList.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLetter = activeLetter ? app.letter === activeLetter : true;
    return matchesSearch && matchesLetter;
  });

  // Group apps by letter
  const groupedApps: Record<string, AppInfo[]> = {};
  filteredApps.forEach((app) => {
    if (!groupedApps[app.letter]) {
      groupedApps[app.letter] = [];
    }
    groupedApps[app.letter].push(app);
  });

  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-[#051650]/95 backdrop-blur-xl border border-[#0A2472] rounded-xl p-5 text-[#F8FAFC] flex flex-col justify-between select-none overflow-hidden">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#0A2472]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#4361EE] flex items-center justify-center text-white shadow-lg">
            <span className="material-symbols-outlined">apps</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-wide">All Applications</h2>
            <p className="text-xs text-[#94A3B8]">Browse all installed system & user packages</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search Field */}
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-sm text-[#94A3B8]">
              search
            </span>
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#000720]/60 border border-[#0A2472] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#4CC9F0] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-[#94A3B8] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#000720]/60 border border-[#0A2472] rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-[#4361EE] text-white' : 'text-[#94A3B8] hover:text-white'
              }`}
              title="Grid View"
            >
              <span className="material-symbols-outlined text-sm">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-[#4361EE] text-white' : 'text-[#94A3B8] hover:text-white'
              }`}
              title="List View"
            >
              <span className="material-symbols-outlined text-sm">format_list_bulleted</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex gap-4 my-4 overflow-hidden">
        {/* Left Sidebar: Alphabet Quick-Jump */}
        <div className="w-10 bg-[#000720]/40 border border-[#0A2472] rounded-xl py-2 px-1 flex flex-col items-center justify-between text-[11px] font-mono text-[#94A3B8] overflow-y-auto">
          <button
            onClick={() => setActiveLetter(null)}
            className={`w-full py-0.5 text-center rounded transition-colors ${
              activeLetter === null ? 'bg-[#4361EE] text-white font-bold' : 'hover:text-white'
            }`}
          >
            ALL
          </button>
          {alphabet.map((letter) => {
            const hasApps = allAppsList.some((a) => a.letter === letter);
            const isActive = activeLetter === letter;
            return (
              <button
                key={letter}
                disabled={!hasApps}
                onClick={() => setActiveLetter(letter)}
                className={`w-full py-0.5 text-center rounded transition-colors ${
                  isActive
                    ? 'bg-[#4CC9F0] text-[#000720] font-bold'
                    : hasApps
                    ? 'hover:bg-[#0A2472] hover:text-white'
                    : 'opacity-20 cursor-not-allowed'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Right Main Grid / List */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-[#0A2472]">
          {Object.keys(groupedApps).length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 text-[#94A3B8]">
              <span className="material-symbols-outlined text-5xl mb-2 text-[#0A2472]">search_off</span>
              <p className="text-sm">No applications found matching "{searchQuery}"</p>
            </div>
          ) : (
            Object.keys(groupedApps)
              .sort()
              .map((letter) => (
                <div key={letter} className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#4CC9F0] border-b border-[#0A2472]/60 pb-1">
                    <span className="w-6 h-6 rounded-md bg-[#0A2472] flex items-center justify-center font-mono text-xs">
                      {letter}
                    </span>
                    <span>Section {letter}</span>
                  </div>

                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {groupedApps[letter].map((app) => (
                        <motion.button
                          key={app.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => openWindow(app.id)}
                          className="flex items-start gap-3 p-3 bg-[#000720]/40 border border-[#0A2472] hover:border-[#4895EF] rounded-xl text-left transition-all hover:bg-[#0A2472]/40 group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#0A2472] group-hover:bg-[#4361EE] text-[#4CC9F0] group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                            <span className="material-symbols-outlined text-xl">{app.icon}</span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-semibold text-white truncate group-hover:text-[#4CC9F0] transition-colors">
                              {app.name}
                            </h4>
                            <p className="text-xs text-[#94A3B8] line-clamp-1 mt-0.5">{app.desc}</p>
                            <span className="inline-block mt-1 text-[10px] font-mono text-[#4895EF] bg-[#0A2472]/60 px-2 py-0.5 rounded">
                              {app.category}
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {groupedApps[letter].map((app) => (
                        <motion.button
                          key={app.id}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => openWindow(app.id)}
                          className="w-full flex items-center justify-between p-3 bg-[#000720]/40 border border-[#0A2472] hover:border-[#4895EF] rounded-xl text-left transition-all hover:bg-[#0A2472]/40 group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-[#0A2472] group-hover:bg-[#4361EE] text-[#4CC9F0] group-hover:text-white flex items-center justify-center transition-colors">
                              <span className="material-symbols-outlined text-lg">{app.icon}</span>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-white group-hover:text-[#4CC9F0] transition-colors">
                                {app.name}
                              </h4>
                              <p className="text-xs text-[#94A3B8]">{app.desc}</p>
                            </div>
                          </div>
                          <span className="text-xs font-mono text-[#4895EF] bg-[#0A2472] px-3 py-1 rounded-md">
                            {app.category}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              ))
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-[#0A2472] flex items-center justify-between text-xs text-[#94A3B8]">
        <span>Showing {filteredApps.length} of {allAppsList.length} applications</span>
        <span className="font-mono text-[#4CC9F0]">CassandraOS App Registry v3.4</span>
      </div>
    </div>
  );
};

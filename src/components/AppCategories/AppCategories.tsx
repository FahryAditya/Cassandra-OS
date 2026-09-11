import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWindowManager } from '../../context/WindowContext';
import type { WindowId } from '../../types/os';

interface AppCategoriesProps {
  isOpen?: boolean;
}

interface CategoryApp {
  id: WindowId;
  name: string;
  category: string;
  icon: string;
  desc: string;
}

export const AppCategories: React.FC<AppCategoriesProps> = ({ isOpen = true }) => {
  const { openWindow } = useWindowManager();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'System',
    'Utilities',
    'Hardware',
    'Security',
    'Network',
    'Developer',
    'Settings',
  ];

  const apps: CategoryApp[] = [
    { id: 'system-monitor', name: 'System Telemetry', category: 'System', icon: 'monitoring', desc: 'Real-time CPU, RAM, & Network telemetry' },
    { id: 'user-profile', name: 'User Identity & Profile', category: 'System', icon: 'badge', desc: 'Manage user access tokens & passkeys' },
    { id: 'about-cassandra', name: 'About CassandraOS', category: 'System', icon: 'info', desc: 'System specs & version release info' },
    { id: 'file-manager', name: 'File Explorer', category: 'Utilities', icon: 'database', desc: 'Cryptographic file vault navigator' },
    { id: 'text-editor', name: 'IDE Code Studio', category: 'Developer', icon: 'code', desc: 'Lightweight text & code studio' },
    { id: 'terminal', name: 'Terminal Console', category: 'Developer', icon: 'terminal', desc: 'Cybernetic bash shell console' },
    { id: 'calculator', name: 'Scientific Calculator', category: 'Utilities', icon: 'calculate', desc: 'Trigonometric & scientific math tool' },
    { id: 'software-center', name: 'Software Marketplace', category: 'Utilities', icon: 'inventory_2', desc: 'Package marketplace & app store' },
    { id: 'hardware-info', name: 'Hardware Specifications', category: 'Hardware', icon: 'memory', desc: 'CPU, GPU, RAM, & motherboard info' },
    { id: 'battery-power', name: 'Battery Power Saver', category: 'Hardware', icon: 'battery_saver', desc: 'Power profiles & battery health' },
    { id: 'bluetooth-devices', name: 'Bluetooth Peripheral', category: 'Hardware', icon: 'bluetooth', desc: 'BLE device pairing & manager' },
    { id: 'audio-devices', name: 'Audio Routing', category: 'Hardware', icon: 'volume_up', desc: 'PipeWire audio input & output' },
    { id: 'security-center', name: 'Security & Firewall', category: 'Security', icon: 'admin_panel_settings', desc: 'Kernel zero-trust packet shield' },
    { id: 'disk-enclave', name: 'Disk Enclave Vault', category: 'Security', icon: 'security', desc: 'LUKS2 AES-256 partition manager' },
    { id: 'privacy-center', name: 'Privacy Center Shield', category: 'Security', icon: 'shield', desc: 'App permissions & telemetry toggles' },
    { id: 'wifi-networks', name: 'Wi-Fi 6E Wireless', category: 'Network', icon: 'wifi', desc: 'Wireless network scanner' },
    { id: 'network-mesh', name: 'Network Mesh eBPF', category: 'Network', icon: 'hub', desc: 'Zero-trust network topology' },
    { id: 'vpn-settings', name: 'VPN Tunnel Manager', category: 'Network', icon: 'vpn_key', desc: 'WireGuard & OpenVPN tunnels' },
    { id: 'personalization', name: 'Personalization Theme', category: 'Settings', icon: 'palette', desc: 'Desktop theme & wallpaper engine' },
    { id: 'settings', name: 'System Settings', category: 'Settings', icon: 'settings', desc: 'Global system preference center' },
  ];

  const filteredApps = selectedCategory === 'All'
    ? apps
    : apps.filter((app) => app.category === selectedCategory);

  const getCategoryCount = (cat: string) => {
    if (cat === 'All') return apps.length;
    return apps.filter((a) => a.category === cat).length;
  };

  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-[#051650]/95 backdrop-blur-xl border border-[#0A2472] rounded-xl p-5 text-[#F8FAFC] flex flex-col justify-between select-none overflow-hidden">
      {/* Header */}
      <div className="pb-4 border-b border-[#0A2472]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#4361EE] text-white flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined">category</span>
            </div>
            <div>
              <h2 className="font-semibold text-lg tracking-wide">Application Categories</h2>
              <p className="text-xs text-[#94A3B8]">Browse software packages by category domain</p>
            </div>
          </div>
          <span className="text-xs font-mono bg-[#0A2472] text-[#4CC9F0] px-3 py-1 rounded-full">
            {filteredApps.length} Apps Shown
          </span>
        </div>

        {/* Category Pills Header */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const count = getCategoryCount(cat);
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex-shrink-0 ${
                  isActive
                    ? 'bg-[#4361EE] text-white shadow-lg shadow-[#4361EE]/20 font-semibold'
                    : 'bg-[#000720]/40 border border-[#0A2472] text-[#94A3B8] hover:border-[#4895EF] hover:text-white'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#0A2472] text-[#4CC9F0]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 overflow-y-auto py-4 pr-1 scrollbar-thin scrollbar-thumb-[#0A2472]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredApps.map((app) => (
            <motion.div
              key={app.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openWindow(app.id)}
              className="cursor-pointer p-4 bg-[#000720]/40 border border-[#0A2472] hover:border-[#4895EF] rounded-xl flex items-start gap-3.5 transition-all hover:bg-[#0A2472]/30 group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#0A2472] group-hover:bg-[#4361EE] text-[#4CC9F0] group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0 shadow-md">
                <span className="material-symbols-outlined text-2xl">{app.icon}</span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-white truncate group-hover:text-[#4CC9F0] transition-colors">
                  {app.name}
                </h3>
                <p className="text-xs text-[#94A3B8] line-clamp-2 mt-1 leading-relaxed">
                  {app.desc}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#4895EF] bg-[#0A2472]/60 px-2 py-0.5 rounded">
                    {app.category}
                  </span>
                  <span className="text-xs text-[#4CC9F0] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                    Launch <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#0A2472] flex items-center justify-between text-xs text-[#94A3B8]">
        <span>Category: <strong className="text-white font-semibold">{selectedCategory}</strong></span>
        <span>Click any app card to launch window</span>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWindowManager } from '../../context/WindowContext';
import type { WindowId } from '../../types/os';

interface GlobalSearchResultsProps {
  isOpen?: boolean;
}

export const GlobalSearchResults: React.FC<GlobalSearchResultsProps> = ({ isOpen = true }) => {
  const { openWindow } = useWindowManager();
  const [query, setQuery] = useState('sys');

  const apps = [
    { id: 'system-monitor' as WindowId, name: 'System Telemetry & Monitor', category: 'System', icon: 'monitoring' },
    { id: 'system-diagnostics' as WindowId, name: 'System Diagnostics Center', category: 'Hardware', icon: 'verified' },
    { id: 'system-recovery' as WindowId, name: 'System Recovery Environment', category: 'Recovery', icon: 'restart_alt' },
  ];

  const files = [
    { name: 'system_config.json', path: '/etc/cassandra/system_config.json', size: '14 KB' },
    { name: 'sys_diagnostics_report.log', path: '/var/log/sys_diagnostics_report.log', size: '128 KB' },
  ];

  const settings = [
    { id: 'settings' as WindowId, name: 'System Settings Preferences', cat: 'Settings' },
    { id: 'security-center' as WindowId, name: 'Security & Kernel Firewall', cat: 'Security' },
  ];

  const commands = [
    { cmd: 'systemctl status cassandra-kernel.service', desc: 'Check Cassandra OS kernel service health' },
    { cmd: 'sysctl -w net.ipv4.ip_forward=1', desc: 'Enable IP packet routing' },
  ];

  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-[#051650]/95 backdrop-blur-xl border border-[#0A2472] rounded-xl p-5 text-[#F8FAFC] flex flex-col justify-between select-none overflow-hidden">
      {/* Header */}
      <div className="pb-4 border-b border-[#0A2472] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#4361EE] text-white flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined">travel_explore</span>
            </div>
            <div>
              <h2 className="font-semibold text-lg tracking-wide">Global Search Results</h2>
              <p className="text-xs text-[#94A3B8]">Unified search across apps, files, settings, and shell commands</p>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#4CC9F0]">
            search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search system-wide (e.g. sys, term, network)..."
            className="w-full bg-[#000720]/80 border border-[#4895EF] rounded-xl pl-10 pr-10 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4CC9F0]/50"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-3 text-xs text-[#94A3B8] hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Grid Sections */}
      <div className="flex-1 overflow-y-auto py-4 space-y-6 scrollbar-thin scrollbar-thumb-[#0A2472]">
        {/* Section 1: Apps */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#4361EE]">
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">apps</span> Applications ({apps.length})
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {apps.map((app) => (
              <motion.button
                key={app.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => openWindow(app.id)}
                className="p-3 bg-[#000720]/50 border border-[#0A2472] hover:border-[#4361EE] rounded-xl text-left flex items-center gap-3 transition-colors group"
              >
                <span className="material-symbols-outlined text-[#4CC9F0] group-hover:text-white transition-colors">{app.icon}</span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white truncate">{app.name}</div>
                  <div className="text-[10px] text-[#94A3B8]">{app.category}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Section 2: Files */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#4895EF]">
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">description</span> Files & Logs ({files.length})
            </span>
          </div>
          <div className="space-y-2">
            {files.map((file, idx) => (
              <div key={idx} className="p-2.5 bg-[#000720]/40 border border-[#0A2472] rounded-xl flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 truncate min-w-0">
                  <span className="material-symbols-outlined text-[#4895EF] text-base">insert_drive_file</span>
                  <span className="text-white font-medium">{file.name}</span>
                  <span className="text-[#94A3B8] text-[11px] truncate">({file.path})</span>
                </div>
                <span className="text-[#4CC9F0]">{file.size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Settings */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#4CC9F0]">
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">settings</span> Settings Preferences ({settings.length})
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {settings.map((stg) => (
              <button
                key={stg.id}
                onClick={() => openWindow(stg.id)}
                className="p-3 bg-[#000720]/40 border border-[#0A2472] hover:border-[#4CC9F0] rounded-xl text-left flex items-center justify-between transition-colors"
              >
                <span className="text-xs text-white font-medium">{stg.name}</span>
                <span className="text-[10px] font-mono text-[#4CC9F0] bg-[#0A2472] px-2 py-0.5 rounded">{stg.cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 4: Commands */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#26B170]">
            <span className="flex items-center gap-1.5 uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">terminal</span> Shell Commands ({commands.length})
            </span>
          </div>
          <div className="space-y-2">
            {commands.map((cmd, idx) => (
              <div key={idx} className="p-3 bg-[#000720]/60 border border-[#0A2472] rounded-xl flex items-center justify-between text-xs">
                <code className="text-[#26B170] font-mono bg-[#000720] px-2 py-1 rounded border border-[#26B170]/30">{cmd.cmd}</code>
                <span className="text-[#94A3B8] text-[11px]">{cmd.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#0A2472] flex items-center justify-between text-xs text-[#94A3B8]">
        <span>Unified Query Engine v3.4</span>
        <span className="font-mono text-[#4CC9F0]">Results across 4 system domains</span>
      </div>
    </div>
  );
};

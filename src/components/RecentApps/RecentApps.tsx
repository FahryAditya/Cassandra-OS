import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWindowManager } from '../../context/WindowContext';

interface RecentAppsProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const RecentApps: React.FC<RecentAppsProps> = ({ isOpen = true, onClose }) => {
  const { windows, focusWindow } = useWindowManager();
  const windowList = Object.values(windows);
  const activeWindows = windowList.filter((w) => w.isOpen);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Fallback mock items if no windows are currently open
  const mockRecentApps = [
    { id: 'file-manager', title: 'File Explorer & Storage', icon: 'database', category: 'System' },
    { id: 'text-editor', title: 'IDE Code Studio', icon: 'code', category: 'Developer' },
    { id: 'terminal', title: 'Terminal Console', icon: 'terminal', category: 'System' },
    { id: 'system-monitor', title: 'System Telemetry', icon: 'monitoring', category: 'System' },
    { id: 'software-center', title: 'Software Marketplace', icon: 'inventory_2', category: 'Store' },
  ];

  const appList = activeWindows.length > 0
    ? activeWindows.map((w) => ({ id: w.id, title: w.title, icon: w.icon, category: 'Active Window' }))
    : mockRecentApps;

  const handleSelectApp = (index: number) => {
    setSelectedIndex(index);
    const selected = appList[index];
    if (selected) {
      focusWindow(selected.id as any);
      if (onClose) onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-[#000720]/90 backdrop-blur-2xl border border-[#0A2472] rounded-xl p-6 text-[#F8FAFC] flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#0A2472]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#4361EE]/20 border border-[#4361EE]/50 flex items-center justify-center text-[#4CC9F0]">
            <span className="material-symbols-outlined">view_carousel</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-wide">Recent Applications</h2>
            <p className="text-xs text-[#94A3B8]">Spatial Task Switcher • Use arrow keys or click to select</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-[#0A2472] px-3 py-1 rounded-full text-[#4CC9F0]">
            {appList.length} Active Tasks
          </span>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex-1 flex items-center justify-center overflow-x-auto py-6 px-4 gap-5 scrollbar-thin scrollbar-thumb-[#0A2472]">
        {appList.map((app, idx) => {
          const isSelected = idx === selectedIndex;
          return (
            <motion.div
              key={app.id + idx}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelectApp(idx)}
              className={`cursor-pointer min-w-[220px] max-w-[240px] rounded-2xl border p-4 transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#051650] border-[#4CC9F0] shadow-xl shadow-[#4CC9F0]/20 ring-2 ring-[#4CC9F0]/50 scale-105'
                  : 'bg-[#000720]/60 border-[#0A2472] opacity-75 hover:opacity-100 hover:border-[#4895EF]/50'
              }`}
            >
              {/* Window Preview Card Box */}
              <div className="w-full h-32 rounded-xl bg-[#000720] border border-[#0A2472] p-3 flex flex-col justify-between relative overflow-hidden group">
                <div className="flex items-center justify-between text-xs text-[#94A3B8] border-b border-[#0A2472]/60 pb-1.5">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] truncate">
                    <span className="w-2 h-2 rounded-full bg-[#26B170]"></span>
                    {app.id}
                  </div>
                  <span className="material-symbols-outlined text-sm text-[#4CC9F0]">open_in_full</span>
                </div>
                {/* Mock UI lines */}
                <div className="space-y-1.5 my-auto">
                  <div className="w-3/4 h-2 bg-[#0A2472] rounded"></div>
                  <div className="w-1/2 h-2 bg-[#4361EE]/30 rounded"></div>
                  <div className="w-5/6 h-2 bg-[#0A2472]/60 rounded"></div>
                </div>
                {/* Icon Badge */}
                <div className="absolute bottom-2 right-2 w-8 h-8 rounded-lg bg-[#4361EE] text-white flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-lg">{app.icon}</span>
                </div>
              </div>

              {/* Title & Category */}
              <div className="mt-3 text-center">
                <h3 className="text-sm font-semibold text-white truncate">{app.title}</h3>
                <span className="text-[11px] text-[#94A3B8] font-mono">{app.category}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="pt-3 border-t border-[#0A2472] flex items-center justify-between text-xs text-[#94A3B8]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <kbd className="px-2 py-0.5 bg-[#0A2472] rounded text-white font-mono text-[10px]">Alt</kbd>
            +
            <kbd className="px-2 py-0.5 bg-[#0A2472] rounded text-white font-mono text-[10px]">Tab</kbd>
            Switch Window
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0A2472] hover:bg-[#4361EE] text-white rounded-lg transition-colors font-medium"
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};

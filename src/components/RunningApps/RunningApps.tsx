import React from 'react';
import { motion } from 'framer-motion';
import { useWindowManager } from '../../context/WindowContext';

export const RunningApps: React.FC<{ isOpen?: boolean }> = ({ isOpen = true }) => {
  const { windows, focusWindow, closeWindow } = useWindowManager();

  const openWindowsList = Object.values(windows).filter((w) => w.isOpen);

  // Group open windows by application type if needed
  const mockRunningDetails: Record<string, { cpu: string; memory: string; windowsCount: number }> = {
    'file-manager': { cpu: '0.4%', memory: '48 MB', windowsCount: 1 },
    terminal: { cpu: '1.2%', memory: '32 MB', windowsCount: 1 },
    'system-monitor': { cpu: '3.5%', memory: '96 MB', windowsCount: 1 },
    settings: { cpu: '0.1%', memory: '24 MB', windowsCount: 1 },
    'text-editor': { cpu: '0.8%', memory: '64 MB', windowsCount: 1 },
  };

  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-[#051650]/95 backdrop-blur-xl border border-[#0A2472] rounded-xl p-5 text-[#F8FAFC] flex flex-col justify-between select-none overflow-hidden">
      {/* Header & Resource Summary */}
      <div className="pb-4 border-b border-[#0A2472] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#4361EE] text-white flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined">format_list_bulleted</span>
            </div>
            <div>
              <h2 className="font-semibold text-lg tracking-wide">Running Applications</h2>
              <p className="text-xs text-[#94A3B8]">Dedicated active window & process supervisor</p>
            </div>
          </div>
          <span className="text-xs font-mono bg-[#0A2472] text-[#4CC9F0] px-3 py-1 rounded-full font-bold">
            {openWindowsList.length} Active Windows
          </span>
        </div>

        {/* Resource Summary Bar */}
        <div className="grid grid-cols-3 gap-3 bg-[#000720]/60 p-3 rounded-xl border border-[#0A2472] text-xs">
          <div>
            <div className="text-[#94A3B8]">Total Active Apps</div>
            <div className="text-base font-bold text-white mt-0.5">{openWindowsList.length}</div>
          </div>
          <div>
            <div className="text-[#94A3B8]">Aggregate Memory</div>
            <div className="text-base font-bold text-[#4CC9F0] mt-0.5 font-mono">264 MB</div>
          </div>
          <div>
            <div className="text-[#94A3B8]">CPU Consumption</div>
            <div className="text-base font-bold text-[#26B170] mt-0.5 font-mono">6.0%</div>
          </div>
        </div>
      </div>

      {/* Main List */}
      <div className="flex-1 overflow-y-auto py-3 space-y-2.5 scrollbar-thin scrollbar-thumb-[#0A2472]">
        {openWindowsList.length > 0 ? (
          openWindowsList.map((win) => {
            const details = mockRunningDetails[win.id] || { cpu: '0.2%', memory: '30 MB', windowsCount: 1 };
            return (
              <motion.div
                key={win.id}
                whileHover={{ x: 2 }}
                className="p-3.5 bg-[#000720]/40 border border-[#0A2472] hover:border-[#4895EF] rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-[#0A2472]/30"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#0A2472] text-[#4CC9F0] flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-xl">{win.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate">{win.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-[#94A3B8] font-mono mt-0.5">
                      <span>RAM: <strong className="text-white">{details.memory}</strong></span>
                      <span>CPU: <strong className="text-[#26B170]">{details.cpu}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => focusWindow(win.id)}
                    className="px-3 py-1.5 bg-[#4361EE] hover:bg-[#4895EF] text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>Switch To</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                  <button
                    onClick={() => closeWindow(win.id)}
                    className="px-3 py-1.5 bg-[#EF4444]/20 hover:bg-[#EF4444] text-[#EF4444] hover:text-white text-xs font-medium rounded-lg transition-colors border border-[#EF4444]/40"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-12 text-[#94A3B8]">
            <span className="material-symbols-outlined text-4xl text-[#0A2472] mb-2">web_asset_off</span>
            <p className="text-sm">No applications currently open</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#0A2472] flex items-center justify-between text-xs text-[#94A3B8]">
        <span>CassandraOS Window Manager</span>
        <span className="font-mono text-[#4CC9F0]">All processes healthy</span>
      </div>
    </div>
  );
};

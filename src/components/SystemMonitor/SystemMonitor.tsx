import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SystemProcess } from '../../types/os';

interface SystemMonitorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemMonitor: React.FC<SystemMonitorProps> = ({ isOpen, onClose }) => {
  const [processes] = useState<SystemProcess[]>([
    { pid: 1482, name: 'cassandra-kernel', user: 'root', cpu: 4.2, memory: '128 MB', status: 'running' },
    { pid: 2049, name: 'wayland-compositor', user: 'cass', cpu: 3.8, memory: '340 MB', status: 'running' },
    { pid: 3102, name: 'vscode-web-server', user: 'cass', cpu: 2.1, memory: '512 MB', status: 'running' },
    { pid: 4092, name: 'rust-analyzer-lsp', user: 'cass', cpu: 1.5, memory: '210 MB', status: 'running' },
    { pid: 5120, name: 'docker-daemon', user: 'root', cpu: 0.9, memory: '180 MB', status: 'sleeping' },
    { pid: 6184, name: 'network-mesh-vpn', user: 'root', cpu: 0.4, memory: '64 MB', status: 'idle' },
  ]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto relative w-full max-w-[1020px] h-[660px] bg-surface-container-low/95 backdrop-blur-2xl rounded-xl shadow-[0_24px_50px_rgba(1,15,31,0.9)] flex flex-col overflow-hidden border border-surface-container-high/60"
          >
            {/* Titlebar Chrome */}
            <div className="h-9 bg-surface-container px-4 flex items-center justify-between shrink-0 select-none border-b border-surface-container-high/40">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-[#EF4444] opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                  />
                  <button className="w-3 h-3 rounded-full bg-[#F5C400] opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
                  <button className="w-3 h-3 rounded-full bg-[#26B170] opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
                </div>
                <div className="flex items-center gap-1.5 text-secondary">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">query_stats</span>
                  <span className="font-body-sm text-body-sm text-on-surface font-semibold tracking-tight">
                    System Monitor
                  </span>
                  <span className="font-code-sm text-xs text-on-surface-variant ml-2">
                    cass_dev@arch-cluster
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-highest text-tertiary font-code-sm text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary shadow-[0_0_6px_#5bd5fc]" />
                  <span>LIVE</span>
                </div>
              </div>
            </div>

            {/* Main Window Inner Content */}
            <div className="p-6 flex flex-col gap-6 bg-surface/90 overflow-y-auto flex-1">
              {/* Top 4 Summary Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* CPU Card */}
                <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-high/40 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                      CPU Utilization
                    </span>
                    <span className="font-code-sm text-xs text-on-surface-variant">16 Cores</span>
                  </div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-headline-lg text-2xl font-bold text-on-surface">18.4%</span>
                    <span className="font-code-sm text-xs text-tertiary">3.82 GHz</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: '18.4%' }} />
                  </div>
                </div>

                {/* RAM Card */}
                <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-high/40 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                      Memory (RAM)
                    </span>
                    <span className="font-code-sm text-xs text-on-surface-variant">DDR5</span>
                  </div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-headline-lg text-2xl font-bold text-on-surface">4.12 GB</span>
                    <span className="font-code-sm text-xs text-tertiary">/ 16 GB</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary rounded-full transition-all duration-500" style={{ width: '25.7%' }} />
                  </div>
                </div>

                {/* Disk I/O Card */}
                <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-high/40 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                      Storage Throughput
                    </span>
                    <span className="font-code-sm text-xs text-on-surface-variant">NVMe</span>
                  </div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-headline-lg text-2xl font-bold text-on-surface">4.2 GB/s</span>
                    <span className="font-code-sm text-xs text-amber-400">Peak Burst</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full transition-all duration-500" style={{ width: '65%' }} />
                  </div>
                </div>

                {/* GPU Card */}
                <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-high/40 shadow-sm flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                      GPU Scheduler
                    </span>
                    <span className="font-code-sm text-xs text-on-surface-variant">Vulkan</span>
                  </div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-headline-lg text-2xl font-bold text-on-surface">12.0%</span>
                    <span className="font-code-sm text-xs text-purple-400">60 FPS</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-purple-400 rounded-full transition-all duration-500" style={{ width: '12%' }} />
                  </div>
                </div>
              </div>

              {/* Active Process Table */}
              <div className="bg-surface-container-low rounded-xl border border-surface-container-high/40 overflow-hidden">
                <div className="p-4 border-b border-surface-container-high/40 flex items-center justify-between">
                  <h3 className="font-headline-md text-sm font-bold text-on-surface">Active System Tasks</h3>
                  <span className="font-code-sm text-xs text-tertiary font-mono">{processes.length} Processes Running</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-code-sm text-xs">
                    <thead className="bg-surface-container border-b border-surface-container-high/40 text-on-surface-variant">
                      <tr>
                        <th className="p-3">PID</th>
                        <th className="p-3">Process Name</th>
                        <th className="p-3">User</th>
                        <th className="p-3">CPU %</th>
                        <th className="p-3">Memory</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container-high/20">
                      {processes.map((proc) => (
                        <tr key={proc.pid} className="hover:bg-surface-container-high/40 transition-colors">
                          <td className="p-3 font-mono text-outline">{proc.pid}</td>
                          <td className="p-3 font-semibold text-on-surface">{proc.name}</td>
                          <td className="p-3 text-secondary">{proc.user}</td>
                          <td className="p-3 text-tertiary font-bold">{proc.cpu}%</td>
                          <td className="p-3 text-on-surface-variant">{proc.memory}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase font-bold">
                              {proc.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

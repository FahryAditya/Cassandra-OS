import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WindowId, Workspace } from '../../types/os';

interface WorkspaceSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  workspaces: Workspace[];
  onSelectWorkspace: (id: string) => void;
  toggleWindow: (id: WindowId) => void;
}

export const WorkspaceSwitcher: React.FC<WorkspaceSwitcherProps> = ({
  isOpen,
  onClose,
  workspaces,
  onSelectWorkspace,
  toggleWindow,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState<'tiling' | 'cascade'>('tiling');

  const windowsList = [
    { id: 'terminal' as WindowId, name: 'Code Studio', path: '~/opt/cassandra-runtime/distributed_sync.rs', pid: '4091', icon: 'code', color: 'text-tertiary' },
    { id: 'system-monitor' as WindowId, name: 'System Monitor', path: 'Kernel Telemetry & eBPF', pid: '1092', icon: 'monitoring', color: 'text-emerald-400' },
    { id: 'file-manager' as WindowId, name: 'File Manager', path: '/data/secure/nvme0n1', pid: '8841', icon: 'database', color: 'text-secondary' },
    { id: 'network-mesh' as WindowId, name: 'Network Shield', path: 'wg0-tunnel (10.0.4.1)', pid: '3312', icon: 'shield_lock', color: 'text-tertiary' },
  ];

  const filteredWindows = windowsList.filter(
    (w) =>
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-start p-6 overflow-y-auto backdrop-blur-xl bg-surface-container-lowest/80">
          {/* Ambient Glow Backdrop */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-primary-container/20 via-tertiary/10 to-transparent blur-3xl pointer-events-none rounded-full" />

          {/* Floating Command / Omni Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 w-full max-w-2xl flex items-center gap-3 bg-surface-container-high/90 backdrop-blur-2xl rounded-xl px-4 py-3 shadow-2xl border border-surface-container-highest mb-6"
          >
            <span className="material-symbols-outlined text-tertiary text-[20px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search windows, active tabs, sockets, and open processes..."
              className="bg-transparent border-none outline-none font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 flex-1"
            />
            <div className="flex items-center gap-1.5">
              <span className="font-label-sm text-[10px] px-2 py-0.5 bg-surface-container-lowest/80 text-tertiary rounded border border-surface-container-highest">
                Super + Tab
              </span>
              <button
                onClick={onClose}
                className="font-label-sm text-[10px] px-2 py-0.5 bg-surface-container-lowest/80 text-on-surface-variant hover:text-on-surface rounded border border-surface-container-highest cursor-pointer"
              >
                Esc
              </button>
            </div>
          </motion.div>

          {/* Top Workspaces Virtual Strip */}
          <div className="relative z-10 w-full max-w-6xl flex flex-col gap-3 mb-8">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[18px]">layers</span>
                <span className="font-label-md text-xs uppercase tracking-wider text-on-surface font-semibold">
                  Mission Grid · Virtual Spaces
                </span>
              </div>
              <div className="flex items-center gap-2 font-code-sm text-xs text-on-surface-variant">
                <span>Spatial Layout:</span>
                <span className="text-tertiary font-medium capitalize">{layoutMode}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full">
              {workspaces.map((ws) => (
                <div
                  key={ws.id}
                  onClick={() => {
                    onSelectWorkspace(ws.id);
                    onClose();
                  }}
                  className={`group relative flex flex-col gap-2 p-3 rounded-xl transition-all duration-200 cursor-pointer border shadow-md ${
                    ws.active
                      ? 'bg-surface-container-high border-tertiary/50 shadow-[0_0_20px_rgba(91,213,252,0.15)]'
                      : 'bg-surface-container-low hover:bg-surface-container-high border-surface-container-high/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`font-code-sm text-xs font-bold ${ws.active ? 'text-tertiary' : 'text-on-surface-variant'}`}>
                        {ws.num}
                      </span>
                      <span className="font-body-sm text-xs text-on-surface font-medium truncate">
                        {ws.name}
                      </span>
                    </div>
                    {ws.active && (
                      <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_#5bd5fc]" />
                    )}
                  </div>

                  {/* Mini Preview Canvas */}
                  <div className="relative h-20 w-full bg-surface-container-lowest/90 rounded-lg p-1.5 overflow-hidden flex gap-1 border border-surface-container-high/30">
                    <div className="flex-1 h-full bg-surface-container-high/60 rounded flex flex-col p-1 gap-1">
                      <div className="h-1.5 w-6 bg-tertiary/60 rounded" />
                      <div className="h-1 w-full bg-outline-variant/40 rounded" />
                      <div className="h-1 w-4/5 bg-outline-variant/30 rounded" />
                    </div>
                    <div className="w-2/5 h-full bg-surface-container-highest/60 rounded flex flex-col p-1 gap-1">
                      <div className="h-1.5 w-4 bg-primary-container/70 rounded" />
                      <div className="h-1 w-full bg-tertiary/40 rounded" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-on-surface-variant font-code-sm text-[11px]">
                    <span>Active Apps</span>
                    <span className={ws.active ? 'text-secondary font-medium' : 'text-outline'}>
                      {ws.active ? 'Focused' : 'Idle'}
                    </span>
                  </div>
                </div>
              ))}

              {/* Add Space Slot */}
              <div className="group relative flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-surface-container-lowest/50 hover:bg-surface-container-high transition-all duration-200 cursor-pointer border border-dashed border-surface-container-high">
                <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </div>
                <span className="font-body-sm text-xs text-on-surface-variant group-hover:text-on-surface font-medium">
                  New Space
                </span>
              </div>
            </div>
          </div>

          {/* Main Overview Canvas: Active Windows Grid */}
          <div className="relative z-10 w-full max-w-6xl flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-3">
                <span className="font-headline-md text-base text-on-surface font-semibold">
                  Active Workspace Windows
                </span>
                <span className="bg-surface-container-high font-code-sm text-xs text-tertiary px-2 py-0.5 rounded-lg border border-surface-container-highest">
                  {filteredWindows.length} Active Instances
                </span>
              </div>

              <div className="flex items-center gap-3 text-on-surface-variant font-label-sm text-xs">
                <button
                  onClick={() => setLayoutMode('tiling')}
                  className={`flex items-center gap-1 cursor-pointer hover:text-tertiary ${
                    layoutMode === 'tiling' ? 'text-tertiary font-bold' : ''
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">grid_view</span> Tiling
                </button>
                <button
                  onClick={() => setLayoutMode('cascade')}
                  className={`flex items-center gap-1 cursor-pointer hover:text-tertiary ${
                    layoutMode === 'cascade' ? 'text-tertiary font-bold' : ''
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    picture_in_picture_alt
                  </span>{' '}
                  Cascade
                </button>
                <button
                  onClick={onClose}
                  className="hover:text-error flex items-center gap-1 cursor-pointer ml-2"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span> Close Switcher
                </button>
              </div>
            </div>

            {/* Bento Tiling Interactive Windows Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {filteredWindows.map((win) => (
                <div
                  key={win.id}
                  onClick={() => {
                    toggleWindow(win.id);
                    onClose();
                  }}
                  className="group relative flex flex-col bg-surface-container-high rounded-xl shadow-xl overflow-hidden hover:scale-[1.01] transition-all duration-200 border border-surface-container-highest cursor-pointer"
                >
                  {/* Window Bar */}
                  <div className="h-9 px-3 bg-surface-container-highest flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-error" />
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                        <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
                      </div>
                      <div className="flex items-center gap-1.5 min-w-0 ml-2">
                        <span className={`material-symbols-outlined text-[16px] ${win.color}`}>
                          {win.icon}
                        </span>
                        <span className="font-body-sm text-xs text-on-surface font-medium truncate">
                          {win.name} — {win.path}
                        </span>
                      </div>
                    </div>
                    <span className="font-code-sm text-[10px] text-outline px-1.5 py-0.5 bg-surface-container-low rounded">
                      PID: {win.pid}
                    </span>
                  </div>

                  {/* Window Body Simulation */}
                  <div className="p-4 bg-surface-container-lowest/90 font-code-sm text-xs min-h-[160px] flex flex-col justify-between">
                    <div className="space-y-1 text-on-surface-variant">
                      <p className="text-tertiary font-mono">
                        &gt; {win.name} instance connected on tty1
                      </p>
                      <p className="text-outline text-[11px]">
                        Target buffer: {win.path}
                      </p>
                      <p className="text-emerald-400 text-[11px]">
                        State: RUNNING (Memory 84MB)
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-surface-container-high/40 text-[11px] text-outline">
                      <span>Click to switch window</span>
                      <span className="text-tertiary font-mono group-hover:underline">Focus &gt;&gt;</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

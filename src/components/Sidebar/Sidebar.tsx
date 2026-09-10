import React from 'react';
import type { Workspace, WindowId } from '../../types/os';

interface SidebarProps {
  workspaces: Workspace[];
  onSelectWorkspace: (id: string) => void;
  toggleWindow: (id: WindowId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  workspaces,
  onSelectWorkspace,
  toggleWindow,
}) => {
  return (
    <aside className="fixed left-0 top-14 bottom-0 w-64 bg-surface-container-low/85 backdrop-blur-xl z-30 flex flex-col justify-between py-4 border-r border-surface-container-high/40 shadow-[4px_0_24px_rgba(0,0,0,0.3)]">
      <div className="flex flex-col gap-4">
        {/* Workspace Section Header */}
        <div className="px-6 flex items-center justify-between">
          <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
            Workspaces
          </span>
          <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface cursor-pointer text-[18px] transition-colors">
            add
          </button>
        </div>

        {/* Workspaces List */}
        <nav className="flex flex-col px-3 gap-1">
          {workspaces.map((ws) => (
            <button
              key={ws.id}
              onClick={() => {
                onSelectWorkspace(ws.id);
                if (ws.id === '02') toggleWindow('terminal');
                if (ws.id === '03') toggleWindow('file-manager');
                if (ws.id === '04') toggleWindow('system-monitor');
                if (ws.id === '05') toggleWindow('settings');
              }}
              className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all text-left cursor-pointer ${
                ws.active
                  ? 'bg-surface-container-high text-tertiary font-medium border-l-2 border-tertiary shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-body-sm text-xs'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-code-sm text-xs opacity-70">{ws.num}</span>
                <span>{ws.name}</span>
              </div>

              {ws.active ? (
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary shadow-[0_0_6px_#5bd5fc]" />
              ) : ws.badge ? (
                <span className="font-code-sm text-xs text-outline">{ws.badge}</span>
              ) : null}
            </button>
          ))}
        </nav>

        {/* Quick App Launch Shortcuts */}
        <div className="px-6 pt-2 border-t border-surface-container-high/40">
          <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold block mb-2">
            Active Utilities
          </span>
          <div className="space-y-1">
            {[
              { id: 'software-center' as WindowId, name: 'Software Center', icon: 'inventory_2' },
              { id: 'calculator' as WindowId, name: 'Calculator', icon: 'calculate' },
              { id: 'user-profile' as WindowId, name: 'User Profile', icon: 'badge' },
              { id: 'personalization' as WindowId, name: 'Personalization', icon: 'palette' },
            ].map((app) => (
              <button
                key={app.id}
                onClick={() => toggleWindow(app.id)}
                className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-tertiary text-xs transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-tertiary">{app.icon}</span>
                <span>{app.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Telemetry & System Status */}
      <div className="px-4 flex flex-col gap-3">
        <div className="p-3 rounded-lg bg-surface-container-lowest/80 border border-surface-container-high/40">
          <div className="flex items-center justify-between mb-1.5 font-label-sm text-xs text-on-surface-variant">
            <span>CPU Load</span>
            <span className="text-tertiary font-code-sm text-xs">18.4%</span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
            <div
              className="h-full bg-tertiary rounded-full transition-all duration-500"
              style={{ width: '18.4%' }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-on-surface-variant font-code-sm text-xs px-2">
          <span>Uptime: 14d 08h</span>
          <span className="material-symbols-outlined text-[16px] text-tertiary">shield</span>
        </div>
      </div>
    </aside>
  );
};

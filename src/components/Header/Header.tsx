import React from 'react';
import type { WindowId } from '../../types/os';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  toggleWindow: (id: WindowId) => void;
  toggleControlCenter: () => void;
  isControlCenterOpen: boolean;
  unreadNotificationsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  toggleWindow,
  toggleControlCenter,
  isControlCenterOpen,
  unreadNotificationsCount,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface-container-low/70 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,7,32,0.6)] border-b border-surface-container-high/40">
      <div className="h-14 w-full px-4 sm:px-6 flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-tertiary to-primary-container p-0.5 shadow-[0_0_12px_rgba(91,213,252,0.3)]">
            <div className="w-full h-full bg-surface-container-lowest rounded-[7px] flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary text-[18px]">adjust</span>
            </div>
          </div>
          <span className="font-headline-md text-headline-md text-on-surface tracking-tight font-bold">
            CassandraOS
          </span>
          <span className="hidden sm:inline-block font-code-sm text-code-sm text-tertiary bg-surface-container-high px-2 py-0.5 rounded border border-surface-container-highest">
            v3.4.0-LTS
          </span>
        </div>

        {/* Navigation Bar */}
        <nav className="hidden xl:flex items-center gap-1 bg-surface-container-lowest/60 p-1 rounded-lg border border-surface-container-high/30">
          {[
            { id: 'desktop-workspace', label: 'Workspace', action: () => setActiveTab('desktop-workspace') },
            { id: 'file-manager', label: 'Files', action: () => toggleWindow('file-manager') },
            { id: 'terminal', label: 'Terminal', action: () => toggleWindow('terminal') },
            { id: 'system-monitor', label: 'Monitor', action: () => toggleWindow('system-monitor') },
            { id: 'software-center', label: 'Software', action: () => toggleWindow('software-center') },
            { id: 'calculator', label: 'Calculator', action: () => toggleWindow('calculator') },
            { id: 'notification-center', label: 'Notifications', action: () => toggleWindow('notification-center') },
            { id: 'system-settings', label: 'Settings', action: () => toggleWindow('settings') },
            { id: 'power-menu', label: 'Power', action: () => toggleWindow('power-menu') },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`px-3 py-1.5 font-body-sm text-xs rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-medium shadow-[0_0_12px_rgba(67,97,238,0.4)]'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Telemetry & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-surface-container-lowest/80 rounded-lg text-on-surface-variant font-code-sm text-xs border border-surface-container-high/40">
            <span className="material-symbols-outlined text-tertiary text-[16px]">memory</span>
            <span>32% RAM</span>
          </div>

          {/* Personalization Trigger */}
          <button
            onClick={() => toggleWindow('personalization')}
            className="p-2 rounded-lg bg-surface-container-lowest/80 text-on-surface-variant hover:text-tertiary border border-surface-container-high/40 cursor-pointer"
            title="Personalization Theme"
          >
            <span className="material-symbols-outlined text-[18px]">palette</span>
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={() => toggleWindow('notification-center')}
            className="relative p-2 rounded-lg bg-surface-container-lowest/80 text-on-surface-variant hover:text-on-surface border border-surface-container-high/40 cursor-pointer"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[18px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-tertiary text-slate-950 font-mono text-[9px] font-bold flex items-center justify-center shadow-md">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Control Center Toggle Button */}
          <button
            onClick={toggleControlCenter}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-code-sm text-xs border transition-all cursor-pointer ${
              isControlCenterOpen
                ? 'bg-tertiary/20 text-tertiary border-tertiary/40 shadow-[0_0_10px_rgba(91,213,252,0.3)]'
                : 'bg-surface-container-lowest/80 text-on-surface-variant border-surface-container-high/40 hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span className="hidden sm:inline">Controls</span>
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => toggleWindow('user-profile')}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_10px_rgba(186,195,255,0.35)] cursor-pointer hover:scale-105 transition-transform"
            title="User Profile & Account"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};

import { useState } from 'react';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { AppLauncher } from './components/AppLauncher/AppLauncher';
import { SystemSearch } from './components/SystemSearch/SystemSearch';
import { FileManager } from './components/FileManager/FileManager';
import { Settings } from './components/Settings/Settings';
import { ControlCenter } from './components/ControlCenter/ControlCenter';
import type { WindowId, Workspace } from './types/os';

export default function App() {
  const [activeTab, setActiveTab] = useState('desktop-workspace');
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFileManagerOpen, setIsFileManagerOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);

  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    { id: '01', num: '01', name: 'Dev Environment', active: true },
    { id: '02', num: '02', name: 'Telemetry & Ops', active: false, badge: '3' },
    { id: '03', num: '03', name: 'Storage Nodes', active: false },
    { id: '04', num: '04', name: 'Kernel Conf', active: false },
  ]);

  const handleSelectWorkspace = (id: string) => {
    setWorkspaces((prev) =>
      prev.map((ws) => ({ ...ws, active: ws.id === id }))
    );
  };

  const toggleWindow = (id: WindowId) => {
    if (id === 'file-manager') setIsFileManagerOpen((prev) => !prev);
    if (id === 'settings') setIsSettingsOpen((prev) => !prev);
    if (id === 'app-launcher') setIsLauncherOpen((prev) => !prev);
    if (id === 'system-search') setIsSearchOpen((prev) => !prev);
    if (id === 'control-center') setIsControlCenterOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-body-md text-on-surface select-none overflow-x-hidden relative">
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleWindow={toggleWindow}
        toggleControlCenter={() => setIsControlCenterOpen((prev) => !prev)}
        isControlCenterOpen={isControlCenterOpen}
      />

      {/* Sidebar */}
      <Sidebar
        workspaces={workspaces}
        onSelectWorkspace={handleSelectWorkspace}
        toggleWindow={toggleWindow}
      />

      {/* Desktop Main Workspace Area */}
      <div className="pl-64 pt-14 pb-4 min-h-screen relative">
        <main className="w-full h-[calc(100vh-3.5rem)] relative overflow-hidden flex flex-col items-center justify-center p-4">
          {/* Cybernetic Wallpaper Ambience */}
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-40 -z-10"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQ-1PrQKEBCPQHMEwutXCi5FAKnm8r2OjxBZgmJ2MtqWIEe5cfzRtT8wO92fNlkLRx5HVdiAsr-Y1NrVGY21qwE1PPmpdXRj9DhjLk3nHgeyTfMC26A7stVjjcLShNAr4MDK1DANi5gCQ6VOik-Lh789-xgqqX-BQ1PcncjWp7rmHfeB8K72d8N-W-w_NeKsLKbMKMWgvcfZPGtirHG1Spc-QD9B2spqpOvdJ3KoTclWem_ukF0FME')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-surface via-surface/60 to-transparent" />
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#5bd5fc_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>

          {/* Desktop Shortcuts */}
          <div className="absolute top-6 right-8 grid grid-cols-1 gap-6 pointer-events-auto">
            <button
              onClick={() => setIsFileManagerOpen(true)}
              className="group flex flex-col items-center gap-1 w-20 cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container-high/80 backdrop-blur-md flex items-center justify-center text-tertiary shadow-lg group-hover:scale-105 group-hover:border group-hover:border-tertiary/40 transition-all border border-surface-container-high">
                <span className="material-symbols-outlined text-[26px]">database</span>
              </div>
              <span className="font-label-sm text-[11px] text-on-surface text-center tracking-tight group-hover:text-tertiary">
                Mainframe_01
              </span>
            </button>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="group flex flex-col items-center gap-1 w-20 cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container-high/80 backdrop-blur-md flex items-center justify-center text-secondary shadow-lg group-hover:scale-105 group-hover:border group-hover:border-secondary/40 transition-all border border-surface-container-high">
                <span className="material-symbols-outlined text-[26px]">cloud_sync</span>
              </div>
              <span className="font-label-sm text-[11px] text-on-surface text-center tracking-tight group-hover:text-secondary">
                Sync_Vault
              </span>
            </button>

            <button
              onClick={() => setIsLauncherOpen(true)}
              className="group flex flex-col items-center gap-1 w-20 cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container-high/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant shadow-lg group-hover:scale-105 transition-all border border-surface-container-high">
                <span className="material-symbols-outlined text-[26px]">apps</span>
              </div>
              <span className="font-label-sm text-[11px] text-on-surface text-center tracking-tight">
                Launcher
              </span>
            </button>
          </div>

          {/* Windows Rendering */}
          <FileManager
            isOpen={isFileManagerOpen}
            onClose={() => setIsFileManagerOpen(false)}
          />

          <Settings
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          />
        </main>
      </div>

      {/* Popovers & Overlays */}
      <AppLauncher
        isOpen={isLauncherOpen}
        onClose={() => setIsLauncherOpen(false)}
        toggleWindow={toggleWindow}
        onOpenSearch={() => {
          setIsLauncherOpen(false);
          setIsSearchOpen(true);
        }}
      />

      <SystemSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <ControlCenter
        isOpen={isControlCenterOpen}
        onClose={() => setIsControlCenterOpen(false)}
      />
    </div>
  );
}

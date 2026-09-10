import { useState } from 'react';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { AppLauncher } from './components/AppLauncher/AppLauncher';
import { SystemSearch } from './components/SystemSearch/SystemSearch';
import { FileManager } from './components/FileManager/FileManager';
import { Settings } from './components/Settings/Settings';
import { ControlCenter } from './components/ControlCenter/ControlCenter';
import { NotificationCenter } from './components/NotificationCenter/NotificationCenter';
import { LockScreen } from './components/LockScreen/LockScreen';
import { PowerMenu } from './components/PowerMenu/PowerMenu';
import { Terminal } from './components/Terminal/Terminal';
import { SystemMonitor } from './components/SystemMonitor/SystemMonitor';
import { TextEditor } from './components/TextEditor/TextEditor';
import { Calculator } from './components/Calculator/Calculator';
import { SoftwareCenter } from './components/SoftwareCenter/SoftwareCenter';
import { UserProfile } from './components/UserProfile/UserProfile';
import { Personalization } from './components/Personalization/Personalization';
import { ContextMenu } from './components/ContextMenu/ContextMenu';
import { SystemTray } from './components/SystemTray/SystemTray';
import { WorkspaceSwitcher } from './components/WorkspaceSwitcher/WorkspaceSwitcher';
import { DiskEnclave } from './components/DiskEnclave/DiskEnclave';
import { NetworkMesh } from './components/NetworkMesh/NetworkMesh';
import type { WindowId, Workspace } from './types/os';

export default function App() {
  const [activeTab, setActiveTab] = useState('desktop-workspace');

  // Window states
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFileManagerOpen, setIsFileManagerOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isPowerMenuOpen, setIsPowerMenuOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isSystemMonitorOpen, setIsSystemMonitorOpen] = useState(false);
  const [isTextEditorOpen, setIsTextEditorOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSoftwareCenterOpen, setIsSoftwareCenterOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [isPersonalizationOpen, setIsPersonalizationOpen] = useState(false);
  const [isSystemTrayOpen, setIsSystemTrayOpen] = useState(false);
  const [isWorkspaceSwitcherOpen, setIsWorkspaceSwitcherOpen] = useState(false);
  const [isDiskEnclaveOpen, setIsDiskEnclaveOpen] = useState(false);
  const [isNetworkMeshOpen, setIsNetworkMeshOpen] = useState(false);

  // Context menu state
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });

  const [workspaces, setWorkspaces] = useState<Workspace[]>([
    { id: '01', num: '01', name: 'Dev Environment', active: true },
    { id: '02', num: '02', name: 'Telemetry & Ops', active: false, badge: '3' },
    { id: '03', num: '03', name: 'Storage Nodes', active: false },
    { id: '04', num: '04', name: 'System Monitor', active: false },
    { id: '05', num: '05', name: 'Kernel Conf', active: false },
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
    if (id === 'notification-center') setIsNotificationOpen((prev) => !prev);
    if (id === 'lock-screen') setIsLocked(true);
    if (id === 'power-menu') setIsPowerMenuOpen((prev) => !prev);
    if (id === 'terminal') setIsTerminalOpen((prev) => !prev);
    if (id === 'system-monitor') setIsSystemMonitorOpen((prev) => !prev);
    if (id === 'text-editor') setIsTextEditorOpen((prev) => !prev);
    if (id === 'calculator') setIsCalculatorOpen((prev) => !prev);
    if (id === 'software-center') setIsSoftwareCenterOpen((prev) => !prev);
    if (id === 'user-profile') setIsUserProfileOpen((prev) => !prev);
    if (id === 'personalization') setIsPersonalizationOpen((prev) => !prev);
    if (id === 'system-tray') setIsSystemTrayOpen((prev) => !prev);
    if (id === 'workspace-switcher') setIsWorkspaceSwitcherOpen((prev) => !prev);
    if (id === 'disk-enclave') setIsDiskEnclaveOpen((prev) => !prev);
    if (id === 'network-mesh') setIsNetworkMeshOpen((prev) => !prev);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
    setIsContextMenuOpen(true);
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-body-md text-on-surface select-none overflow-x-hidden relative">
      {/* Full-screen Lock Screen Overlay */}
      <LockScreen isLocked={isLocked} onUnlock={() => setIsLocked(false)} />

      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleWindow={toggleWindow}
        toggleControlCenter={() => setIsControlCenterOpen((prev) => !prev)}
        isControlCenterOpen={isControlCenterOpen}
        unreadNotificationsCount={2}
      />

      {/* Sidebar */}
      <Sidebar
        workspaces={workspaces}
        onSelectWorkspace={handleSelectWorkspace}
        toggleWindow={toggleWindow}
      />

      {/* Desktop Main Workspace Area */}
      <div className="pl-64 pt-14 pb-4 min-h-screen relative">
        <main
          onContextMenu={handleContextMenu}
          className="w-full h-[calc(100vh-3.5rem)] relative overflow-hidden flex flex-col items-center justify-center p-4"
        >
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
          <div className="absolute top-6 right-8 grid grid-cols-1 gap-4 pointer-events-auto">
            <button
              onClick={() => setIsFileManagerOpen(true)}
              className="group flex flex-col items-center gap-1 w-20 cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container-high/80 backdrop-blur-md flex items-center justify-center text-tertiary shadow-lg group-hover:scale-105 group-hover:border group-hover:border-tertiary/40 transition-all border border-surface-container-high">
                <span className="material-symbols-outlined text-[26px]">database</span>
              </div>
              <span className="font-label-sm text-[11px] text-on-surface text-center tracking-tight group-hover:text-tertiary">
                Files
              </span>
            </button>

            <button
              onClick={() => setIsTerminalOpen(true)}
              className="group flex flex-col items-center gap-1 w-20 cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container-high/80 backdrop-blur-md flex items-center justify-center text-secondary shadow-lg group-hover:scale-105 group-hover:border group-hover:border-secondary/40 transition-all border border-surface-container-high">
                <span className="material-symbols-outlined text-[26px]">terminal</span>
              </div>
              <span className="font-label-sm text-[11px] text-on-surface text-center tracking-tight group-hover:text-secondary">
                Terminal
              </span>
            </button>

            <button
              onClick={() => setIsSystemMonitorOpen(true)}
              className="group flex flex-col items-center gap-1 w-20 cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container-high/80 backdrop-blur-md flex items-center justify-center text-emerald-400 shadow-lg group-hover:scale-105 transition-all border border-surface-container-high">
                <span className="material-symbols-outlined text-[26px]">monitoring</span>
              </div>
              <span className="font-label-sm text-[11px] text-on-surface text-center tracking-tight">
                Monitor
              </span>
            </button>

            <button
              onClick={() => setIsDiskEnclaveOpen(true)}
              className="group flex flex-col items-center gap-1 w-20 cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container-high/80 backdrop-blur-md flex items-center justify-center text-amber-400 shadow-lg group-hover:scale-105 transition-all border border-surface-container-high">
                <span className="material-symbols-outlined text-[26px]">hard_drive</span>
              </div>
              <span className="font-label-sm text-[11px] text-on-surface text-center tracking-tight">
                Enclave
              </span>
            </button>

            <button
              onClick={() => setIsNetworkMeshOpen(true)}
              className="group flex flex-col items-center gap-1 w-20 cursor-pointer focus:outline-none"
            >
              <div className="w-12 h-12 rounded-xl bg-surface-container-high/80 backdrop-blur-md flex items-center justify-center text-sky-400 shadow-lg group-hover:scale-105 transition-all border border-surface-container-high">
                <span className="material-symbols-outlined text-[26px]">shield_lock</span>
              </div>
              <span className="font-label-sm text-[11px] text-on-surface text-center tracking-tight">
                Mesh Shield
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

          <Terminal
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
          />

          <SystemMonitor
            isOpen={isSystemMonitorOpen}
            onClose={() => setIsSystemMonitorOpen(false)}
          />

          <TextEditor
            isOpen={isTextEditorOpen}
            onClose={() => setIsTextEditorOpen(false)}
          />

          <Calculator
            isOpen={isCalculatorOpen}
            onClose={() => setIsCalculatorOpen(false)}
          />

          <SoftwareCenter
            isOpen={isSoftwareCenterOpen}
            onClose={() => setIsSoftwareCenterOpen(false)}
          />

          <UserProfile
            isOpen={isUserProfileOpen}
            onClose={() => setIsUserProfileOpen(false)}
          />

          <Personalization
            isOpen={isPersonalizationOpen}
            onClose={() => setIsPersonalizationOpen(false)}
          />

          <DiskEnclave
            isOpen={isDiskEnclaveOpen}
            onClose={() => setIsDiskEnclaveOpen(false)}
          />

          <NetworkMesh
            isOpen={isNetworkMeshOpen}
            onClose={() => setIsNetworkMeshOpen(false)}
          />
        </main>
      </div>

      {/* Popovers & Overlays */}
      <ContextMenu
        isOpen={isContextMenuOpen}
        position={contextMenuPos}
        onClose={() => setIsContextMenuOpen(false)}
        toggleWindow={toggleWindow}
      />

      <SystemTray
        isOpen={isSystemTrayOpen}
        onClose={() => setIsSystemTrayOpen(false)}
        toggleWindow={toggleWindow}
      />

      <WorkspaceSwitcher
        isOpen={isWorkspaceSwitcherOpen}
        onClose={() => setIsWorkspaceSwitcherOpen(false)}
        workspaces={workspaces}
        onSelectWorkspace={handleSelectWorkspace}
        toggleWindow={toggleWindow}
      />

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

      <NotificationCenter
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      <PowerMenu
        isOpen={isPowerMenuOpen}
        onClose={() => setIsPowerMenuOpen(false)}
        onLock={() => setIsLocked(true)}
      />
    </div>
  );
}



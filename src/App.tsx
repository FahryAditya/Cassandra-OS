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
import { BatteryPower } from './components/BatteryPower/BatteryPower';
import { StorageManager } from './components/StorageManager/StorageManager';
import { AppPermissions } from './components/AppPermissions/AppPermissions';
import { PrivacyCenter } from './components/PrivacyCenter/PrivacyCenter';
import { SecurityCenter } from './components/SecurityCenter/SecurityCenter';
import { UpdateCenter } from './components/UpdateCenter/UpdateCenter';
import { BackupRestore } from './components/BackupRestore/BackupRestore';
import { SystemRecovery } from './components/SystemRecovery/SystemRecovery';
import { HardwareInfo } from './components/HardwareInfo/HardwareInfo';
import { AboutCassandra } from './components/AboutCassandra/AboutCassandra';
import { ErrorCrashCenter } from './components/ErrorCrashCenter/ErrorCrashCenter';
import { WifiNetworks } from './components/WifiNetworks/WifiNetworks';
import { EthernetSettings } from './components/EthernetSettings/EthernetSettings';
import { VpnSettings } from './components/VpnSettings/VpnSettings';
import { NetworkDetails } from './components/NetworkDetails/NetworkDetails';
import { BluetoothDevices } from './components/BluetoothDevices/BluetoothDevices';
import { PrintersScanners } from './components/PrintersScanners/PrintersScanners';
import { CameraSettings } from './components/CameraSettings/CameraSettings';
import { MicrophoneSettings } from './components/MicrophoneSettings/MicrophoneSettings';
import { AudioDevices } from './components/AudioDevices/AudioDevices';
import { NotificationsSettings } from './components/NotificationsSettings/NotificationsSettings';
import { DoNotDisturb } from './components/DoNotDisturb/DoNotDisturb';
import { AccessibilitySettings } from './components/AccessibilitySettings/AccessibilitySettings';
import { LanguageRegion } from './components/LanguageRegion/LanguageRegion';
import { DateTimeSettings } from './components/DateTimeSettings/DateTimeSettings';
import { DefaultApps } from './components/DefaultApps/DefaultApps';
import { StartupApps } from './components/StartupApps/StartupApps';
import { AppStorage } from './components/AppStorage/AppStorage';
import { AppDetails } from './components/AppDetails/AppDetails';
import { SystemDiagnostics } from './components/SystemDiagnostics/SystemDiagnostics';
import { QuickSettings } from './components/QuickSettings/QuickSettings';
import { RecentApps } from './components/RecentApps/RecentApps';
import { AllApplications } from './components/AllApplications/AllApplications';
import { AppCategories } from './components/AppCategories/AppCategories';
import { AppSearchResults } from './components/AppSearchResults/AppSearchResults';
import { FileSearchResults } from './components/FileSearchResults/FileSearchResults';
import { GlobalSearchResults } from './components/GlobalSearchResults/GlobalSearchResults';
import { ClipboardHistory } from './components/ClipboardHistory/ClipboardHistory';
import { ScreenshotTool } from './components/ScreenshotTool/ScreenshotTool';
import { ScreenRecording } from './components/ScreenRecording/ScreenRecording';
import { ColorPicker } from './components/ColorPicker/ColorPicker';
import { EmojiPicker } from './components/EmojiPicker/EmojiPicker';
import { OnScreenKeyboard } from './components/OnScreenKeyboard/OnScreenKeyboard';
import { NotificationHistory } from './components/NotificationHistory/NotificationHistory';
import { RunningApps } from './components/RunningApps/RunningApps';

import { WindowProvider, useWindowManager } from './context/WindowContext';
import { WindowFrame } from './components/WindowFrame/WindowFrame';
import { SnapPreview } from './components/WindowFrame/SnapPreview';
import { WindowSwitcherModal } from './components/WindowSwitcherModal/WindowSwitcherModal';
import type { WindowId, Workspace } from './types/os';

function DesktopContent() {
  const {
    openWindow,
    closeWindow,
    snapPreviewState,
    snapPreviewRect,
  } = useWindowManager();

  const [activeTab, setActiveTab] = useState('desktop-workspace');

  // Popover overlays
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isPowerMenuOpen, setIsPowerMenuOpen] = useState(false);
  const [isSystemTrayOpen, setIsSystemTrayOpen] = useState(false);
  const [isWorkspaceSwitcherOpen, setIsWorkspaceSwitcherOpen] = useState(false);

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

  const handleToggleWindow = (id: WindowId) => {
    if (id === 'app-launcher') setIsLauncherOpen((prev) => !prev);
    else if (id === 'system-search') setIsSearchOpen((prev) => !prev);
    else if (id === 'control-center') setIsControlCenterOpen((prev) => !prev);
    else if (id === 'notification-center') setIsNotificationOpen((prev) => !prev);
    else if (id === 'lock-screen') setIsLocked(true);
    else if (id === 'power-menu') setIsPowerMenuOpen((prev) => !prev);
    else if (id === 'system-tray') setIsSystemTrayOpen((prev) => !prev);
    else if (id === 'workspace-switcher') setIsWorkspaceSwitcherOpen((prev) => !prev);
    else {
      openWindow(id);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
    setIsContextMenuOpen(true);
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-body-md text-on-surface select-none overflow-x-hidden relative">
      {/* Ghost Snap Area Overlay */}
      <SnapPreview snapState={snapPreviewState} rect={snapPreviewRect} />

      {/* Alt + Tab Window Switcher Modal */}
      <WindowSwitcherModal />

      {/* Full-screen Lock Screen Overlay */}
      <LockScreen isLocked={isLocked} onUnlock={() => setIsLocked(false)} />

      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleWindow={handleToggleWindow}
        toggleControlCenter={() => setIsControlCenterOpen((prev) => !prev)}
        isControlCenterOpen={isControlCenterOpen}
        unreadNotificationsCount={2}
      />

      {/* Sidebar */}
      <Sidebar
        workspaces={workspaces}
        onSelectWorkspace={handleSelectWorkspace}
        toggleWindow={handleToggleWindow}
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
          <div className="absolute top-6 right-8 grid grid-cols-1 gap-4 pointer-events-auto z-10">
            <button
              onClick={() => openWindow('file-manager')}
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
              onClick={() => openWindow('terminal')}
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
              onClick={() => openWindow('system-monitor')}
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
              onClick={() => openWindow('disk-enclave')}
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
              onClick={() => openWindow('network-mesh')}
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

          {/* Interactive Window Frames Stacking Engine */}
          <WindowFrame id="file-manager">
            <FileManager isOpen={true} onClose={() => closeWindow('file-manager')} />
          </WindowFrame>

          <WindowFrame id="settings">
            <Settings isOpen={true} onClose={() => closeWindow('settings')} />
          </WindowFrame>

          <WindowFrame id="terminal">
            <Terminal isOpen={true} onClose={() => closeWindow('terminal')} />
          </WindowFrame>

          <WindowFrame id="system-monitor">
            <SystemMonitor isOpen={true} onClose={() => closeWindow('system-monitor')} />
          </WindowFrame>

          <WindowFrame id="text-editor">
            <TextEditor isOpen={true} onClose={() => closeWindow('text-editor')} />
          </WindowFrame>

          <WindowFrame id="calculator">
            <Calculator isOpen={true} onClose={() => closeWindow('calculator')} />
          </WindowFrame>

          <WindowFrame id="software-center">
            <SoftwareCenter isOpen={true} onClose={() => closeWindow('software-center')} />
          </WindowFrame>

          <WindowFrame id="user-profile">
            <UserProfile isOpen={true} onClose={() => closeWindow('user-profile')} />
          </WindowFrame>

          <WindowFrame id="personalization">
            <Personalization isOpen={true} onClose={() => closeWindow('personalization')} />
          </WindowFrame>

          <WindowFrame id="disk-enclave">
            <DiskEnclave isOpen={true} onClose={() => closeWindow('disk-enclave')} />
          </WindowFrame>

          <WindowFrame id="network-mesh">
            <NetworkMesh isOpen={true} onClose={() => closeWindow('network-mesh')} />
          </WindowFrame>

          <WindowFrame id="battery-power">
            <BatteryPower isOpen={true} onClose={() => closeWindow('battery-power')} />
          </WindowFrame>

          <WindowFrame id="storage-manager">
            <StorageManager isOpen={true} onClose={() => closeWindow('storage-manager')} />
          </WindowFrame>

          <WindowFrame id="app-permissions">
            <AppPermissions isOpen={true} onClose={() => closeWindow('app-permissions')} />
          </WindowFrame>

          <WindowFrame id="privacy-center">
            <PrivacyCenter
              isOpen={true}
              onClose={() => closeWindow('privacy-center')}
              onOpenPermissions={() => {
                closeWindow('privacy-center');
                openWindow('app-permissions');
              }}
            />
          </WindowFrame>

          <WindowFrame id="security-center">
            <SecurityCenter isOpen={true} onClose={() => closeWindow('security-center')} />
          </WindowFrame>

          <WindowFrame id="update-center">
            <UpdateCenter isOpen={true} onClose={() => closeWindow('update-center')} />
          </WindowFrame>

          <WindowFrame id="backup-restore">
            <BackupRestore isOpen={true} onClose={() => closeWindow('backup-restore')} />
          </WindowFrame>

          <WindowFrame id="system-recovery">
            <SystemRecovery isOpen={true} onClose={() => closeWindow('system-recovery')} />
          </WindowFrame>

          <WindowFrame id="hardware-info">
            <HardwareInfo isOpen={true} onClose={() => closeWindow('hardware-info')} />
          </WindowFrame>

          <WindowFrame id="about-cassandra">
            <AboutCassandra
              isOpen={true}
              onClose={() => closeWindow('about-cassandra')}
              onOpenUpdates={() => {
                closeWindow('about-cassandra');
                openWindow('update-center');
              }}
            />
          </WindowFrame>

          <WindowFrame id="error-crash-center">
            <ErrorCrashCenter isOpen={true} onClose={() => closeWindow('error-crash-center')} />
          </WindowFrame>

          <WindowFrame id="wifi-networks">
            <WifiNetworks isOpen={true} onClose={() => closeWindow('wifi-networks')} />
          </WindowFrame>

          <WindowFrame id="ethernet-settings">
            <EthernetSettings isOpen={true} onClose={() => closeWindow('ethernet-settings')} />
          </WindowFrame>

          <WindowFrame id="vpn-settings">
            <VpnSettings isOpen={true} onClose={() => closeWindow('vpn-settings')} />
          </WindowFrame>

          <WindowFrame id="network-details">
            <NetworkDetails isOpen={true} onClose={() => closeWindow('network-details')} />
          </WindowFrame>

          <WindowFrame id="bluetooth-devices">
            <BluetoothDevices isOpen={true} onClose={() => closeWindow('bluetooth-devices')} />
          </WindowFrame>

          <WindowFrame id="printers-scanners">
            <PrintersScanners isOpen={true} onClose={() => closeWindow('printers-scanners')} />
          </WindowFrame>

          <WindowFrame id="camera-settings">
            <CameraSettings isOpen={true} onClose={() => closeWindow('camera-settings')} />
          </WindowFrame>

          <WindowFrame id="microphone-settings">
            <MicrophoneSettings isOpen={true} onClose={() => closeWindow('microphone-settings')} />
          </WindowFrame>

          <WindowFrame id="audio-devices">
            <AudioDevices isOpen={true} onClose={() => closeWindow('audio-devices')} />
          </WindowFrame>

          <WindowFrame id="notifications-settings">
            <NotificationsSettings isOpen={true} onClose={() => closeWindow('notifications-settings')} />
          </WindowFrame>

          <WindowFrame id="do-not-disturb">
            <DoNotDisturb isOpen={true} onClose={() => closeWindow('do-not-disturb')} />
          </WindowFrame>

          <WindowFrame id="accessibility-settings">
            <AccessibilitySettings isOpen={true} onClose={() => closeWindow('accessibility-settings')} />
          </WindowFrame>

          <WindowFrame id="language-region">
            <LanguageRegion isOpen={true} onClose={() => closeWindow('language-region')} />
          </WindowFrame>

          <WindowFrame id="date-time">
            <DateTimeSettings />
          </WindowFrame>

          <WindowFrame id="default-apps">
            <DefaultApps />
          </WindowFrame>

          <WindowFrame id="startup-apps">
            <StartupApps />
          </WindowFrame>

          <WindowFrame id="app-storage">
            <AppStorage />
          </WindowFrame>

          <WindowFrame id="app-details">
            <AppDetails />
          </WindowFrame>

          <WindowFrame id="system-diagnostics">
            <SystemDiagnostics />
          </WindowFrame>

          <WindowFrame id="quick-settings">
            <QuickSettings onClose={() => closeWindow('quick-settings')} onOpenSettings={() => { closeWindow('quick-settings'); openWindow('settings'); }} />
          </WindowFrame>

          <WindowFrame id="recent-apps">
            <RecentApps onClose={() => closeWindow('recent-apps')} />
          </WindowFrame>

          <WindowFrame id="all-applications">
            <AllApplications onClose={() => closeWindow('all-applications')} />
          </WindowFrame>

          <WindowFrame id="app-categories">
            <AppCategories />
          </WindowFrame>

          <WindowFrame id="app-search-results">
            <AppSearchResults />
          </WindowFrame>

          <WindowFrame id="file-search-results">
            <FileSearchResults />
          </WindowFrame>

          <WindowFrame id="global-search-results">
            <GlobalSearchResults />
          </WindowFrame>

          <WindowFrame id="clipboard-history">
            <ClipboardHistory />
          </WindowFrame>

          <WindowFrame id="screenshot-tool">
            <ScreenshotTool />
          </WindowFrame>

          <WindowFrame id="screen-recording">
            <ScreenRecording />
          </WindowFrame>

          <WindowFrame id="color-picker">
            <ColorPicker />
          </WindowFrame>

          <WindowFrame id="emoji-picker">
            <EmojiPicker />
          </WindowFrame>

          <WindowFrame id="on-screen-keyboard">
            <OnScreenKeyboard />
          </WindowFrame>

          <WindowFrame id="notification-history">
            <NotificationHistory />
          </WindowFrame>

          <WindowFrame id="running-applications">
            <RunningApps />
          </WindowFrame>
        </main>
      </div>

      {/* Popovers & Overlays */}
      <ContextMenu
        isOpen={isContextMenuOpen}
        position={contextMenuPos}
        onClose={() => setIsContextMenuOpen(false)}
        toggleWindow={handleToggleWindow}
      />

      <SystemTray
        isOpen={isSystemTrayOpen}
        onClose={() => setIsSystemTrayOpen(false)}
        toggleWindow={handleToggleWindow}
      />

      <WorkspaceSwitcher
        isOpen={isWorkspaceSwitcherOpen}
        onClose={() => setIsWorkspaceSwitcherOpen(false)}
        workspaces={workspaces}
        onSelectWorkspace={handleSelectWorkspace}
        toggleWindow={handleToggleWindow}
      />

      <AppLauncher
        isOpen={isLauncherOpen}
        onClose={() => setIsLauncherOpen(false)}
        toggleWindow={handleToggleWindow}
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

export default function App() {
  return (
    <WindowProvider>
      <DesktopContent />
    </WindowProvider>
  );
}

export type WindowId =
  | 'file-manager'
  | 'settings'
  | 'app-launcher'
  | 'system-search'
  | 'control-center'
  | 'notification-center'
  | 'lock-screen'
  | 'power-menu'
  | 'terminal'
  | 'system-monitor'
  | 'text-editor'
  | 'calculator'
  | 'software-center'
  | 'user-profile'
  | 'personalization'
  | 'system-tray'
  | 'workspace-switcher'
  | 'disk-enclave'
  | 'network-mesh'
  | 'battery-power'
  | 'storage-manager'
  | 'app-permissions'
  | 'privacy-center'
  | 'security-center'
  | 'update-center'
  | 'backup-restore'
  | 'system-recovery'
  | 'hardware-info'
  | 'about-cassandra'
  | 'error-crash-center'
  | 'wifi-networks'
  | 'ethernet-settings'
  | 'vpn-settings'
  | 'network-details'
  | 'bluetooth-devices'
  | 'printers-scanners'
  | 'camera-settings'
  | 'microphone-settings'
  | 'audio-devices'
  | 'notifications-settings'
  | 'do-not-disturb'
  | 'accessibility-settings'
  | 'language-region'
  | 'date-time'
  | 'default-apps'
  | 'startup-apps'
  | 'app-storage'
  | 'app-details'
  | 'system-diagnostics'
  | 'quick-settings'
  | 'recent-apps'
  | 'all-applications'
  | 'app-categories'
  | 'app-search-results'
  | 'file-search-results'
  | 'global-search-results'
  | 'clipboard-history'
  | 'screenshot-tool'
  | 'screen-recording'
  | 'color-picker'
  | 'emoji-picker'
  | 'on-screen-keyboard'
  | 'notification-history'
  | 'running-applications';

export interface AppWindow {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface Workspace {
  id: string;
  num: string;
  name: string;
  active: boolean;
  badge?: string;
}

export interface QuickToggle {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  active: boolean;
}

export interface PinnedApp {
  id: WindowId;
  name: string;
  icon: string;
  color: string;
  action?: () => void;
}

export interface FileItem {
  name: string;
  type: 'folder' | 'file' | 'code' | 'image' | 'archive';
  size?: string;
  modified: string;
  icon: string;
  color?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  time: string;
  message: string;
  source: string;
  type: 'system' | 'security' | 'update' | 'app';
  icon: string;
  read: boolean;
}

export interface SystemProcess {
  pid: number;
  name: string;
  user: string;
  cpu: number;
  memory: string;
  status: 'running' | 'sleeping' | 'idle';
}

export interface SoftwareApp {
  id: string;
  name: string;
  category: string;
  icon: string;
  installed: boolean;
  version: string;
  rating: number;
  description: string;
}

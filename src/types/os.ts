export type WindowId = 'file-manager' | 'settings' | 'app-launcher' | 'system-search' | 'control-center';

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
  id: string;
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

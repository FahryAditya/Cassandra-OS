import type { WindowId } from './os';

export type SnapState =
  | 'none'
  | 'left'
  | 'right'
  | 'top'
  | 'corner-top-left'
  | 'corner-top-right'
  | 'corner-bottom-left'
  | 'corner-bottom-right';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowState {
  id: WindowId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isAlwaysOnTop: boolean;
  zIndex: number;
  position: Position;
  size: Size;
  prevPosition?: Position;
  prevSize?: Size;
  snapState: SnapState;
}

export interface WindowManagerContextType {
  windows: Record<WindowId, WindowState>;
  activeWindowId: WindowId | null;
  snapPreviewState: SnapState;
  snapPreviewRect: { x: number; y: number; width: number; height: number } | null;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  maximizeWindow: (id: WindowId) => void;
  restoreWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  updateWindowBounds: (id: WindowId, pos: Position, size: Size) => void;
  snapWindow: (id: WindowId, snap: SnapState) => void;
  toggleAlwaysOnTop: (id: WindowId) => void;
  setSnapPreview: (snap: SnapState, rect?: { x: number; y: number; width: number; height: number } | null) => void;
  showDesktop: () => void;
  restoreDesktop: () => void;
}

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { WindowId } from '../types/os';
import type { WindowState, WindowManagerContextType, SnapState, Position, Size } from '../types/window';

const WindowContext = createContext<WindowManagerContextType | null>(null);

const DEFAULT_WINDOWS: Record<WindowId, Omit<WindowState, 'id' | 'zIndex'>> = {
  'file-manager': {
    title: 'File Manager',
    icon: 'database',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    isAlwaysOnTop: false,
    position: { x: 120, y: 70 },
    size: { width: 920, height: 600 },
    snapState: 'none',
  },
  terminal: {
    title: 'Terminal - bash',
    icon: 'terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    isAlwaysOnTop: false,
    position: { x: 180, y: 100 },
    size: { width: 780, height: 500 },
    snapState: 'none',
  },
  'system-monitor': {
    title: 'System Telemetry & Resource Monitor',
    icon: 'monitoring',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    isAlwaysOnTop: false,
    position: { x: 220, y: 80 },
    size: { width: 980, height: 620 },
    snapState: 'none',
  },
  settings: {
    title: 'System Settings',
    icon: 'settings',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    isAlwaysOnTop: false,
    position: { x: 250, y: 90 },
    size: { width: 880, height: 580 },
    snapState: 'none',
  },
  'text-editor': {
    title: 'IDE Code Studio',
    icon: 'code',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    isAlwaysOnTop: false,
    position: { x: 160, y: 75 },
    size: { width: 900, height: 580 },
    snapState: 'none',
  },
  calculator: {
    title: 'Calculator',
    icon: 'calculate',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    isAlwaysOnTop: false,
    position: { x: 300, y: 120 },
    size: { width: 420, height: 520 },
    snapState: 'none',
  },
  'software-center': {
    title: 'Software Center Marketplace',
    icon: 'inventory_2',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    isAlwaysOnTop: false,
    position: { x: 200, y: 85 },
    size: { width: 960, height: 620 },
    snapState: 'none',
  },
  'user-profile': {
    title: 'User Profile & Identity Security',
    icon: 'badge',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    isAlwaysOnTop: false,
    position: { x: 280, y: 110 },
    size: { width: 720, height: 540 },
    snapState: 'none',
  },
  personalization: {
    title: 'Personalization & Visual Engine',
    icon: 'palette',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    isAlwaysOnTop: false,
    position: { x: 240, y: 95 },
    size: { width: 860, height: 580 },
    snapState: 'none',
  },
  'disk-enclave': {
    title: 'CassandraOS Disk Utility & Enclave Manager',
    icon: 'hard_drive',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    isAlwaysOnTop: false,
    position: { x: 190, y: 80 },
    size: { width: 980, height: 640 },
    snapState: 'none',
  },
  'network-mesh': {
    title: 'Cassandra Network Shield & Mesh Topology',
    icon: 'shield_lock',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    isAlwaysOnTop: false,
    position: { x: 170, y: 75 },
    size: { width: 1040, height: 660 },
    snapState: 'none',
  },
  'app-launcher': {
    title: 'App Launcher',
    icon: 'apps',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    isAlwaysOnTop: true,
    position: { x: 0, y: 0 },
    size: { width: 540, height: 620 },
    snapState: 'none',
  },
  'system-search': {
    title: 'System Search',
    icon: 'search',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    isAlwaysOnTop: true,
    position: { x: 0, y: 0 },
    size: { width: 640, height: 480 },
    snapState: 'none',
  },
  'control-center': {
    title: 'Control Center',
    icon: 'tune',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    isAlwaysOnTop: true,
    position: { x: 0, y: 0 },
    size: { width: 360, height: 540 },
    snapState: 'none',
  },
  'notification-center': {
    title: 'Notification Center',
    icon: 'notifications',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    isAlwaysOnTop: true,
    position: { x: 0, y: 0 },
    size: { width: 380, height: 580 },
    snapState: 'none',
  },
  'lock-screen': {
    title: 'Lock Screen',
    icon: 'lock',
    isOpen: false,
    isMinimized: false,
    isMaximized: true,
    isAlwaysOnTop: true,
    position: { x: 0, y: 0 },
    size: { width: window.innerWidth, height: window.innerHeight },
    snapState: 'none',
  },
  'power-menu': {
    title: 'Power Menu',
    icon: 'power_settings_new',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    isAlwaysOnTop: true,
    position: { x: 0, y: 0 },
    size: { width: 440, height: 380 },
    snapState: 'none',
  },
  'system-tray': {
    title: 'System Tray',
    icon: 'hub',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    isAlwaysOnTop: true,
    position: { x: 0, y: 0 },
    size: { width: 400, height: 560 },
    snapState: 'none',
  },
  'workspace-switcher': {
    title: 'Workspace Switcher',
    icon: 'layers',
    isOpen: false,
    isMinimized: false,
    isMaximized: true,
    isAlwaysOnTop: true,
    position: { x: 0, y: 0 },
    size: { width: window.innerWidth, height: window.innerHeight },
    snapState: 'none',
  },
};

export const WindowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [topZIndex, setTopZIndex] = useState(10);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>('file-manager');
  const [snapPreviewState, setSnapPreviewState] = useState<SnapState>('none');
  const [snapPreviewRect, setSnapPreviewRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(() => {
    const initial: Record<string, WindowState> = {};
    let z = 10;
    Object.entries(DEFAULT_WINDOWS).forEach(([id, config]) => {
      initial[id] = {
        id: id as WindowId,
        ...config,
        zIndex: z++,
      };
    });
    return initial as Record<WindowId, WindowState>;
  });

  const focusWindow = useCallback((id: WindowId) => {
    setActiveWindowId(id);
    setWindows((prev) => {
      const win = prev[id];
      if (!win) return prev;
      const newZ = topZIndex + 1;
      setTopZIndex(newZ);
      return {
        ...prev,
        [id]: {
          ...win,
          isMinimized: false,
          zIndex: win.isAlwaysOnTop ? newZ + 1000 : newZ,
        },
      };
    });
  }, [topZIndex]);

  const openWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const win = prev[id];
      if (!win) return prev;
      return {
        ...prev,
        [id]: {
          ...win,
          isOpen: true,
          isMinimized: false,
        },
      };
    });
    focusWindow(id);
  }, [focusWindow]);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const win = prev[id];
      if (!win) return prev;
      return {
        ...prev,
        [id]: {
          ...win,
          isOpen: false,
        },
      };
    });
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  }, [activeWindowId]);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const win = prev[id];
      if (!win) return prev;
      return {
        ...prev,
        [id]: {
          ...win,
          isMinimized: true,
        },
      };
    });
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  }, [activeWindowId]);

  const maximizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const win = prev[id];
      if (!win) return prev;

      if (win.isMaximized) {
        // Restore
        return {
          ...prev,
          [id]: {
            ...win,
            isMaximized: false,
            position: win.prevPosition || win.position,
            size: win.prevSize || win.size,
            snapState: 'none',
          },
        };
      } else {
        // Maximize
        return {
          ...prev,
          [id]: {
            ...win,
            isMaximized: true,
            prevPosition: win.position,
            prevSize: win.size,
            snapState: 'none',
          },
        };
      }
    });
    focusWindow(id);
  }, [focusWindow]);

  const restoreWindow = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const win = prev[id];
      if (!win) return prev;
      return {
        ...prev,
        [id]: {
          ...win,
          isMinimized: false,
          isMaximized: false,
          position: win.prevPosition || win.position,
          size: win.prevSize || win.size,
          snapState: 'none',
        },
      };
    });
    focusWindow(id);
  }, [focusWindow]);

  const updateWindowBounds = useCallback((id: WindowId, pos: Position, size: Size) => {
    setWindows((prev) => {
      const win = prev[id];
      if (!win) return prev;
      return {
        ...prev,
        [id]: {
          ...win,
          position: pos,
          size: size,
          snapState: 'none',
        },
      };
    });
  }, []);

  const snapWindow = useCallback((id: WindowId, snap: SnapState) => {
    const screenW = window.innerWidth - 256; // Sidebar space
    const screenH = window.innerHeight - 56; // Header bar space
    const startX = 256;
    const startY = 56;

    let pos: Position = { x: startX + 40, y: startY + 40 };
    let size: Size = { width: 800, height: 600 };

    if (snap === 'left') {
      pos = { x: startX, y: startY };
      size = { width: screenW / 2, height: screenH };
    } else if (snap === 'right') {
      pos = { x: startX + screenW / 2, y: startY };
      size = { width: screenW / 2, height: screenH };
    } else if (snap === 'top') {
      pos = { x: startX, y: startY };
      size = { width: screenW, height: screenH };
    } else if (snap === 'corner-top-left') {
      pos = { x: startX, y: startY };
      size = { width: screenW / 2, height: screenH / 2 };
    } else if (snap === 'corner-top-right') {
      pos = { x: startX + screenW / 2, y: startY };
      size = { width: screenW / 2, height: screenH / 2 };
    } else if (snap === 'corner-bottom-left') {
      pos = { x: startX, y: startY + screenH / 2 };
      size = { width: screenW / 2, height: screenH / 2 };
    } else if (snap === 'corner-bottom-right') {
      pos = { x: startX + screenW / 2, y: startY + screenH / 2 };
      size = { width: screenW / 2, height: screenH / 2 };
    }

    setWindows((prev) => {
      const win = prev[id];
      if (!win) return prev;
      return {
        ...prev,
        [id]: {
          ...win,
          position: pos,
          size: size,
          snapState: snap,
        },
      };
    });
    focusWindow(id);
  }, [focusWindow]);

  const toggleAlwaysOnTop = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const win = prev[id];
      if (!win) return prev;
      return {
        ...prev,
        [id]: {
          ...win,
          isAlwaysOnTop: !win.isAlwaysOnTop,
        },
      };
    });
  }, []);

  const setSnapPreview = useCallback((snap: SnapState, rect?: { x: number; y: number; width: number; height: number } | null) => {
    setSnapPreviewState(snap);
    setSnapPreviewRect(rect || null);
  }, []);

  const showDesktop = useCallback(() => {
    setWindows((prev) => {
      const updated: Record<string, WindowState> = {};
      Object.entries(prev).forEach(([id, win]) => {
        updated[id] = { ...win, isMinimized: true };
      });
      return updated as Record<WindowId, WindowState>;
    });
  }, []);

  const restoreDesktop = useCallback(() => {
    setWindows((prev) => {
      const updated: Record<string, WindowState> = {};
      Object.entries(prev).forEach(([id, win]) => {
        updated[id] = { ...win, isMinimized: false };
      });
      return updated as Record<WindowId, WindowState>;
    });
  }, []);

  return (
    <WindowContext.Provider
      value={{
        windows,
        activeWindowId,
        snapPreviewState,
        snapPreviewRect,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        restoreWindow,
        focusWindow,
        updateWindowBounds,
        snapWindow,
        toggleAlwaysOnTop,
        setSnapPreview,
        showDesktop,
        restoreDesktop,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindowManager = (): WindowManagerContextType => {
  const ctx = useContext(WindowContext);
  if (!ctx) {
    throw new Error('useWindowManager must be used within a WindowProvider');
  }
  return ctx;
};

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { WindowId } from '../../types/os';
import type { Position, Size } from '../../types/window';
import { useWindowManager } from '../../context/WindowContext';

interface WindowFrameProps {
  id: WindowId;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({ id, children }) => {
  const {
    windows,
    activeWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    updateWindowBounds,
    snapWindow,
    setSnapPreview,
    toggleAlwaysOnTop,
  } = useWindowManager();

  const win = windows[id];
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initPos: Position }>({
    startX: 0,
    startY: 0,
    initPos: { x: 0, y: 0 },
  });
  const resizeRef = useRef<{
    direction: string;
    startX: number;
    startY: number;
    initPos: Position;
    initSize: Size;
  }>({
    direction: '',
    startX: 0,
    startY: 0,
    initPos: { x: 0, y: 0 },
    initSize: { width: 0, height: 0 },
  });

  if (!win || !win.isOpen || win.isMinimized) return null;

  // Window bounds calculation
  const isMax = win.isMaximized;
  const isFocused = activeWindowId === id;

  const currentPos = isMax ? { x: 256, y: 56 } : win.position;
  const currentSize = isMax
    ? { width: window.innerWidth - 256, height: window.innerHeight - 56 }
    : win.size;

  // Mouse Drag Handler for Titlebar
  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || isMax) return;
    focusWindow(id);
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initPos: { ...win.position },
    };
  };

  // Mouse Move Event Listener for Dragging & Resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;

        const newX = Math.max(256, Math.min(window.innerWidth - 100, dragRef.current.initPos.x + dx));
        const newY = Math.max(56, Math.min(window.innerHeight - 80, dragRef.current.initPos.y + dy));

        updateWindowBounds(id, { x: newX, y: newY }, win.size);

        // Edge Snap Detection Preview
        const screenW = window.innerWidth - 256;
        const screenH = window.innerHeight - 56;
        const startX = 256;
        const startY = 56;

        if (e.clientX <= 265 && e.clientY <= 90) {
          setSnapPreview('corner-top-left', { x: startX, y: startY, width: screenW / 2, height: screenH / 2 });
        } else if (e.clientX >= window.innerWidth - 20 && e.clientY <= 90) {
          setSnapPreview('corner-top-right', { x: startX + screenW / 2, y: startY, width: screenW / 2, height: screenH / 2 });
        } else if (e.clientX <= 265) {
          setSnapPreview('left', { x: startX, y: startY, width: screenW / 2, height: screenH });
        } else if (e.clientX >= window.innerWidth - 20) {
          setSnapPreview('right', { x: startX + screenW / 2, y: startY, width: screenW / 2, height: screenH });
        } else if (e.clientY <= 65) {
          setSnapPreview('top', { x: startX, y: startY, width: screenW, height: screenH });
        } else {
          setSnapPreview('none', null);
        }
      }

      if (isResizing) {
        const dx = e.clientX - resizeRef.current.startX;
        const dy = e.clientY - resizeRef.current.startY;
        const { direction, initPos, initSize } = resizeRef.current;

        let newW = initSize.width;
        let newH = initSize.height;
        let newX = initPos.x;
        let newY = initPos.y;

        if (direction.includes('e')) newW = Math.max(340, initSize.width + dx);
        if (direction.includes('s')) newH = Math.max(220, initSize.height + dy);
        if (direction.includes('w')) {
          const possibleW = initSize.width - dx;
          if (possibleW >= 340) {
            newW = possibleW;
            newX = initPos.x + dx;
          }
        }
        if (direction.includes('n')) {
          const possibleH = initSize.height - dy;
          if (possibleH >= 220) {
            newH = possibleH;
            newY = initPos.y + dy;
          }
        }

        updateWindowBounds(id, { x: newX, y: newY }, { width: newW, height: newH });
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isDragging) {
        setIsDragging(false);

        // Perform Snap on Drag Release if near screen edge
        if (e.clientX <= 265 && e.clientY <= 90) {
          snapWindow(id, 'corner-top-left');
        } else if (e.clientX >= window.innerWidth - 20 && e.clientY <= 90) {
          snapWindow(id, 'corner-top-right');
        } else if (e.clientX <= 265) {
          snapWindow(id, 'left');
        } else if (e.clientX >= window.innerWidth - 20) {
          snapWindow(id, 'right');
        } else if (e.clientY <= 65) {
          maximizeWindow(id);
        }
        setSnapPreview('none', null);
      }

      if (isResizing) {
        setIsResizing(false);
      }
    };

    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, id, win.size, updateWindowBounds, snapWindow, maximizeWindow, setSnapPreview]);

  // Start 8-Direction Resizing
  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (isMax) return;
    focusWindow(id);
    setIsResizing(true);
    resizeRef.current = {
      direction,
      startX: e.clientX,
      startY: e.clientY,
      initPos: { ...win.position },
      initSize: { ...win.size },
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        left: currentPos.x,
        top: currentPos.y,
        width: currentSize.width,
        height: currentSize.height,
        zIndex: win.zIndex,
      }}
      onMouseDown={() => focusWindow(id)}
      className={`rounded-xl backdrop-blur-2xl shadow-[0_24px_60px_-12px_rgba(0,7,32,0.95)] flex flex-col overflow-hidden border transition-shadow duration-200 ${
        isFocused
          ? 'border-tertiary/60 shadow-[0_0_24px_rgba(91,213,252,0.25)] bg-surface-container-low/95'
          : 'border-surface-container-high/60 bg-surface-container-low/85 opacity-90'
      }`}
    >
      {/* Titlebar Chrome */}
      <div
        onMouseDown={handleTitleMouseDown}
        onDoubleClick={() => maximizeWindow(id)}
        className="h-10 px-4 bg-surface-container-lowest flex items-center justify-between select-none cursor-move border-b border-surface-container-high/40"
      >
        <div className="flex items-center gap-3">
          {/* Window Traffic Lights */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(id);
              }}
              className="w-3 h-3 rounded-full bg-[#EF4444] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center group"
              title="Close"
            >
              <span className="material-symbols-outlined text-[8px] text-slate-950 opacity-0 group-hover:opacity-100">
                close
              </span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(id);
              }}
              className="w-3 h-3 rounded-full bg-[#F5C400] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center group"
              title="Minimize"
            >
              <span className="material-symbols-outlined text-[8px] text-slate-950 opacity-0 group-hover:opacity-100">
                remove
              </span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                maximizeWindow(id);
              }}
              className="w-3 h-3 rounded-full bg-[#26B170] hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center group"
              title="Maximize / Restore"
            >
              <span className="material-symbols-outlined text-[8px] text-slate-950 opacity-0 group-hover:opacity-100">
                aspect_ratio
              </span>
            </button>
          </div>

          <div className="h-3.5 w-px bg-outline-variant/30" />

          {/* Window Title & Icon */}
          <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-xs">
            <span className="material-symbols-outlined text-[16px] text-tertiary">
              {win.icon}
            </span>
            <span className="text-on-surface font-semibold tracking-tight truncate max-w-[360px]">
              {win.title}
            </span>
          </div>
        </div>

        {/* Window Quick Tools */}
        <div className="flex items-center gap-2 text-on-surface-variant font-code-sm text-xs">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleAlwaysOnTop(id);
            }}
            className={`p-1 rounded transition-colors cursor-pointer ${
              win.isAlwaysOnTop ? 'text-tertiary bg-tertiary/20' : 'hover:text-on-surface'
            }`}
            title="Always On Top"
          >
            <span className="material-symbols-outlined text-[16px]">push_pin</span>
          </button>
          <span className="font-code-sm text-[10px] text-outline px-1.5 py-0.5 bg-surface-container-high rounded">
            PID: {Math.floor(1000 + Math.random() * 8999)}
          </span>
        </div>
      </div>

      {/* Window Body Container */}
      <div className="flex-1 overflow-auto bg-surface-container-lowest/90 relative">
        {children}
      </div>

      {/* 8-Direction Resizing Handles (Only if not maximized) */}
      {!isMax && (
        <>
          <div
            onMouseDown={(e) => handleResizeStart(e, 'n')}
            className="absolute top-0 left-2 right-2 h-1.5 cursor-n-resize hover:bg-tertiary/40"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 's')}
            className="absolute bottom-0 left-2 right-2 h-1.5 cursor-s-resize hover:bg-tertiary/40"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'w')}
            className="absolute top-2 bottom-2 left-0 w-1.5 cursor-w-resize hover:bg-tertiary/40"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'e')}
            className="absolute top-2 bottom-2 right-0 w-1.5 cursor-e-resize hover:bg-tertiary/40"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'nw')}
            className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize hover:bg-tertiary/60 rounded-tl"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'ne')}
            className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize hover:bg-tertiary/60 rounded-tr"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize hover:bg-tertiary/60 rounded-bl"
          />
          <div
            onMouseDown={(e) => handleResizeStart(e, 'se')}
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize hover:bg-tertiary/60 rounded-br"
          />
        </>
      )}
    </motion.div>
  );
};

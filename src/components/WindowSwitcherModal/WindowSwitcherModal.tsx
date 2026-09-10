import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowManager } from '../../context/WindowContext';

export const WindowSwitcherModal: React.FC = () => {
  const { windows, openWindow } = useWindowManager();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openWindowsList = Object.values(windows).filter((w) => w.isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setSelectedIndex(0);
        } else {
          setSelectedIndex((prev) => (prev + 1) % Math.max(1, openWindowsList.length));
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Alt' && isOpen) {
        setIsOpen(false);
        const target = openWindowsList[selectedIndex];
        if (target) {
          openWindow(target.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, selectedIndex, openWindowsList, openWindow]);

  if (!isOpen || openWindowsList.length === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-surface-container-lowest/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-surface-container-low/95 backdrop-blur-2xl rounded-2xl shadow-[0_24px_64px_rgba(0,7,32,0.95)] border border-tertiary/40 p-5 flex flex-col gap-4 max-w-3xl w-full"
        >
          <div className="flex items-center justify-between border-b border-surface-container-high/40 pb-3">
            <div className="flex items-center gap-2 text-tertiary">
              <span className="material-symbols-outlined text-[20px]">flip_to_front</span>
              <span className="font-headline-md text-sm font-bold tracking-tight">
                Window Switcher (Alt + Tab)
              </span>
            </div>
            <span className="font-code-sm text-xs text-outline">
              Release Alt to select
            </span>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {openWindowsList.map((win, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={win.id}
                  onClick={() => {
                    openWindow(win.id);
                    setIsOpen(false);
                  }}
                  className={`p-3 rounded-xl flex flex-col items-center gap-2 cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-surface-container-high border-tertiary shadow-[0_0_16px_rgba(91,213,252,0.3)] scale-105'
                      : 'bg-surface-container hover:bg-surface-container-high/60 border-surface-container-high/40'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-tertiary shadow-md">
                    <span className="material-symbols-outlined text-[26px]">
                      {win.icon}
                    </span>
                  </div>
                  <span className="font-body-sm text-xs font-semibold text-on-surface text-center truncate w-full">
                    {win.title}
                  </span>
                  <span className="font-code-sm text-[10px] text-outline">
                    {win.isMinimized ? 'Minimized' : 'Active'}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

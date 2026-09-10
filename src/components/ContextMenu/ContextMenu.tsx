import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WindowId } from '../../types/os';

interface ContextMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  onClose: () => void;
  toggleWindow: (id: WindowId) => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  isOpen,
  position,
  onClose,
  toggleWindow,
}) => {
  const [activeSubmenu, setActiveSubmenu] = useState<'none' | 'sort' | 'view'>('none');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Transparent Backdrop to capture clicks outside */}
          <div
            onClick={onClose}
            onContextMenu={(e) => {
              e.preventDefault();
              onClose();
            }}
            className="fixed inset-0 z-50 bg-transparent"
          />

          {/* Floating Context Menu Overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            style={{
              top: Math.min(position.y, window.innerHeight - 340),
              left: Math.min(position.x, window.innerWidth - 280),
            }}
            className="fixed z-50 w-[270px] rounded-xl bg-surface-container/95 backdrop-blur-2xl shadow-[0_24px_50px_-12px_rgba(0,7,32,0.9),0_0_24px_rgba(91,213,252,0.15)] p-1.5 flex flex-col gap-1 border border-surface-container-high/60"
          >
            {/* Section 1: File & Directory Actions */}
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => {
                  toggleWindow('file-manager');
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-on-surface hover:bg-surface-container-high transition-colors group text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-tertiary group-hover:scale-110 transition-transform">
                    create_new_folder
                  </span>
                  <span className="font-body-sm text-xs font-medium">New Folder</span>
                </div>
                <span className="font-code-sm text-[10px] text-outline group-hover:text-on-surface-variant">
                  Shift+Ctrl+N
                </span>
              </button>

              <button
                onClick={() => {
                  toggleWindow('text-editor');
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-on-surface hover:bg-surface-container-high transition-colors group text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-secondary group-hover:scale-110 transition-transform">
                    note_add
                  </span>
                  <span className="font-body-sm text-xs">New Document</span>
                </div>
                <span className="font-code-sm text-[10px] text-outline group-hover:text-on-surface-variant">
                  Ctrl+N
                </span>
              </button>

              <button
                onClick={() => {
                  toggleWindow('terminal');
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-primary-container text-on-primary-container shadow-[0_0_16px_rgba(67,97,238,0.5)] transition-transform group text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">
                    terminal
                  </span>
                  <span className="font-body-sm text-xs font-semibold tracking-tight">
                    Open Terminal Here
                  </span>
                </div>
                <span className="font-code-sm text-[10px] bg-surface-container-lowest/60 text-tertiary-fixed px-1.5 py-0.5 rounded">
                  Alt+T
                </span>
              </button>
            </div>

            {/* Inset Divider */}
            <div className="h-px bg-surface-container-highest my-0.5 mx-1" />

            {/* Section 2: View Modes & Submenus */}
            <div className="flex flex-col gap-0.5 relative">
              {/* View Submenu Trigger */}
              <div
                onMouseEnter={() => setActiveSubmenu('view')}
                className="relative"
              >
                <button
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-on-surface hover:bg-surface-container-high transition-colors group text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-on-surface">
                      grid_view
                    </span>
                    <span className="font-body-sm text-xs">View & Grid Align</span>
                  </div>
                  <div className="flex items-center gap-1 text-outline group-hover:text-on-surface">
                    <span className="font-code-sm text-[10px]">Med</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </div>
                </button>
              </div>

              {/* Sort By Cascading Submenu */}
              <div
                onMouseEnter={() => setActiveSubmenu('sort')}
                className="relative"
              >
                <button
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg transition-colors text-left cursor-pointer ${
                    activeSubmenu === 'sort'
                      ? 'bg-surface-container-high text-tertiary'
                      : 'text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px]">sort</span>
                    <span className="font-body-sm text-xs">Sort By</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>

                {/* Submenu Floating Card */}
                {activeSubmenu === 'sort' && (
                  <motion.div
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute left-full -top-1 ml-1 w-48 rounded-xl bg-surface-container-high/95 backdrop-blur-2xl shadow-[0_16px_36px_rgba(0,7,32,0.85)] p-1.5 flex flex-col gap-0.5 z-50 border border-surface-container-highest"
                  >
                    <div className="px-3 py-1 font-label-sm text-[10px] text-outline uppercase tracking-wider">
                      Criteria
                    </div>
                    {[
                      { id: 'name', label: 'Name', code: 'A-Z' },
                      { id: 'date', label: 'Date Modified', code: 'Time' },
                      { id: 'size', label: 'Size', code: 'MB' },
                      { id: 'type', label: 'Type & Extension', code: 'Ext' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSortBy(item.id)}
                        className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs cursor-pointer ${
                          sortBy === item.id
                            ? 'bg-surface-container text-tertiary font-medium'
                            : 'text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {sortBy === item.id ? (
                            <span className="material-symbols-outlined text-[16px] text-tertiary">
                              check
                            </span>
                          ) : (
                            <span className="w-4" />
                          )}
                          <span>{item.label}</span>
                        </div>
                        <span className="font-code-sm text-[10px] text-outline">{item.code}</span>
                      </button>
                    ))}
                    <div className="h-px bg-surface-container my-1" />
                    <div className="flex items-center justify-between px-2 py-1">
                      <span className="font-code-sm text-[10px] text-outline">Order</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setSortOrder('asc')}
                          className={`px-2 py-0.5 rounded font-code-sm text-[10px] cursor-pointer ${
                            sortOrder === 'asc'
                              ? 'bg-surface text-tertiary font-bold'
                              : 'text-outline hover:text-on-surface'
                          }`}
                        >
                          Asc
                        </button>
                        <button
                          onClick={() => setSortOrder('desc')}
                          className={`px-2 py-0.5 rounded font-code-sm text-[10px] cursor-pointer ${
                            sortOrder === 'desc'
                              ? 'bg-surface text-tertiary font-bold'
                              : 'text-outline hover:text-on-surface'
                          }`}
                        >
                          Desc
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <button
                onClick={onClose}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-on-surface hover:bg-surface-container-high transition-colors group text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-on-surface">
                    auto_awesome_mosaic
                  </span>
                  <span className="font-body-sm text-xs">Snap to Grid</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-tertiary">
                  check_circle
                </span>
              </button>
            </div>

            {/* Inset Divider */}
            <div className="h-px bg-surface-container-highest my-0.5 mx-1" />

            {/* Section 3: System Utilities & Personalization */}
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => {
                  toggleWindow('personalization');
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-on-surface hover:bg-surface-container-high transition-colors group text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">
                    palette
                  </span>
                  <span className="font-body-sm text-xs">Change Wallpaper & Theme</span>
                </div>
              </button>

              <button
                onClick={() => {
                  toggleWindow('disk-enclave');
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-on-surface hover:bg-surface-container-high transition-colors group text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    hard_drive
                  </span>
                  <span className="font-body-sm text-xs">Disk Enclave Vault</span>
                </div>
              </button>

              <button
                onClick={() => {
                  toggleWindow('network-mesh');
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-on-surface hover:bg-surface-container-high transition-colors group text-left cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-emerald-400">
                    shield_lock
                  </span>
                  <span className="font-body-sm text-xs">Network Security Mesh</span>
                </div>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

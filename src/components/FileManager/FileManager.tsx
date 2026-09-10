import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FileItem } from '../../types/os';

interface FileManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FileManager: React.FC<FileManagerProps> = ({ isOpen, onClose }) => {
  const [currentPath, setCurrentPath] = useState('/home/cass/Documents/Projects');

  const files: FileItem[] = [
    { name: 'src', type: 'folder', modified: 'Today, 20:06', icon: 'folder', color: 'text-tertiary' },
    { name: 'public', type: 'folder', modified: 'Today, 20:06', icon: 'folder', color: 'text-secondary' },
    { name: 'node_modules', type: 'folder', modified: 'Today, 20:09', icon: 'folder_zip', color: 'text-outline' },
    { name: 'package.json', type: 'code', size: '713 B', modified: 'Just now', icon: 'javascript', color: 'text-amber-400' },
    { name: 'vite.config.ts', type: 'code', size: '210 B', modified: 'Today, 20:10', icon: 'code', color: 'text-purple-400' },
    { name: 'README.md', type: 'file', size: '1.2 KB', modified: 'Today, 20:06', icon: 'description', color: 'text-cyan-400' },
    { name: 'tsconfig.json', type: 'code', size: '119 B', modified: 'Today, 20:06', icon: 'settings', color: 'text-blue-400' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto relative w-full max-w-[960px] h-[640px] bg-surface-container-low/95 backdrop-blur-2xl rounded-xl shadow-[0_24px_50px_-12px_rgba(0,7,32,0.95),0_0_24px_rgba(67,97,238,0.18)] flex flex-col overflow-hidden border border-surface-container-high/60"
          >
            {/* Window Title Bar */}
            <header className="h-9 w-full bg-surface-container px-4 flex items-center justify-between cursor-move shrink-0 border-b border-surface-container-high/40">
              <div className="flex items-center gap-3 min-w-0">
                {/* Traffic lights window controls */}
                <div className="flex items-center gap-1.5 mr-2">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-[#EF4444] hover:brightness-125 transition-all flex items-center justify-center group cursor-pointer shadow-[0_0_6px_rgba(239,68,68,0.6)]"
                  >
                    <span className="material-symbols-outlined text-[8px] text-[#450a0a] opacity-0 group-hover:opacity-100 font-bold">
                      close
                    </span>
                  </button>
                  <button className="w-3 h-3 rounded-full bg-[#F5C400] hover:brightness-125 transition-all flex items-center justify-center group cursor-pointer shadow-[0_0_6px_rgba(245,196,0,0.6)]">
                    <span className="material-symbols-outlined text-[8px] text-[#451a03] opacity-0 group-hover:opacity-100 font-bold">
                      remove
                    </span>
                  </button>
                  <button className="w-3 h-3 rounded-full bg-[#26B170] hover:brightness-125 transition-all flex items-center justify-center group cursor-pointer shadow-[0_0_6px_rgba(38,177,112,0.6)]">
                    <span className="material-symbols-outlined text-[8px] text-[#052e16] opacity-0 group-hover:opacity-100 font-bold">
                      fullscreen
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5 truncate text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    folder_managed
                  </span>
                  <span className="font-body-sm text-body-sm tracking-tight text-on-surface font-semibold">
                    File Manager
                  </span>
                  <span className="font-code-sm text-code-sm text-outline px-1.5 py-0.5 rounded bg-surface-container-highest">
                    {currentPath}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-on-surface-variant font-code-sm text-code-sm">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-surface-container-highest text-tertiary">
                  ext4
                </span>
              </div>
            </header>

            {/* App Toolbar */}
            <div className="bg-surface-container-low px-4 py-2 flex flex-wrap items-center justify-between gap-3 shrink-0 border-b border-surface-container-high/40">
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-surface-container rounded-lg p-0.5">
                  <button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  </button>
                  <button className="p-1 rounded hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
                  </button>
                </div>

                {/* Breadcrumb Bar */}
                <div className="flex items-center gap-1 bg-surface-container px-3 py-1 rounded-lg font-code-sm text-code-sm border border-surface-container-high/30">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">home</span>
                  <span className="text-on-surface-variant hover:text-tertiary cursor-pointer">cass</span>
                  <span className="text-outline">/</span>
                  <span className="text-on-surface-variant hover:text-tertiary cursor-pointer">Documents</span>
                  <span className="text-outline">/</span>
                  <span className="text-tertiary font-medium">Projects</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1 rounded-lg bg-tertiary/20 text-tertiary border border-tertiary/30 font-code-sm text-code-sm hover:bg-tertiary/30 transition-colors cursor-pointer flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">create_new_folder</span>
                  <span>New Folder</span>
                </button>
              </div>
            </div>

            {/* Body Split Layout */}
            <div className="flex-1 flex overflow-hidden">
              {/* Storage Sidebar */}
              <aside className="w-52 bg-surface-container/60 p-3 border-r border-surface-container-high/40 flex flex-col justify-between shrink-0">
                <div className="space-y-3">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold block">
                    Storage Nodes
                  </span>
                  <div className="space-y-1">
                    {[
                      { name: 'Root OS', icon: 'hard_drive', active: true },
                      { name: 'Projects Vault', icon: 'folder', active: false },
                      { name: 'Network Share', icon: 'cloud', active: false },
                      { name: 'Trash Enclave', icon: 'delete', active: false },
                    ].map((node) => (
                      <button
                        key={node.name}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg font-body-sm text-body-sm transition-colors text-left cursor-pointer ${
                          node.active
                            ? 'bg-surface-container-high text-tertiary font-medium'
                            : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">{node.icon}</span>
                        <span>{node.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Main File Content Grid */}
              <main className="flex-1 p-4 overflow-y-auto bg-surface-container-lowest/30">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {files.map((file) => (
                    <div
                      key={file.name}
                      className="group p-3 rounded-xl bg-surface-container-high/40 hover:bg-surface-container-high border border-surface-container-high/40 transition-all cursor-pointer hover:shadow-lg flex flex-col justify-between h-28"
                    >
                      <div className="flex items-start justify-between">
                        <span className={`material-symbols-outlined text-[28px] ${file.color}`}>
                          {file.icon}
                        </span>
                        {file.size && (
                          <span className="font-code-sm text-[10px] text-outline px-1.5 py-0.5 rounded bg-surface-container-lowest">
                            {file.size}
                          </span>
                        )}
                      </div>

                      <div>
                        <span className="font-body-sm text-body-sm text-on-surface font-medium block truncate group-hover:text-tertiary transition-colors">
                          {file.name}
                        </span>
                        <span className="font-body-sm text-[10px] text-on-surface-variant block">
                          {file.modified}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </main>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

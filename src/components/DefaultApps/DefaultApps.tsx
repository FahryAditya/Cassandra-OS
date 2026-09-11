import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DefaultAppsProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface DefaultAppCategory {
  id: string;
  label: string;
  icon: string;
  currentApp: string;
  options: string[];
}

export const DefaultApps: React.FC<DefaultAppsProps> = ({ isOpen = true, onClose }) => {
  const [categories, setCategories] = useState<DefaultAppCategory[]>([
    {
      id: 'browser',
      label: 'Web Browser',
      icon: 'language',
      currentApp: 'Chromium Web Engine',
      options: ['Chromium Web Engine', 'Firefox Cyber-Edition', 'Brave Browser'],
    },
    {
      id: 'editor',
      label: 'Text & Code Editor',
      icon: 'code',
      currentApp: 'Text Editor Studio',
      options: ['Text Editor Studio', 'VS Code Web', 'Vim Terminal'],
    },
    {
      id: 'terminal',
      label: 'Command Console',
      icon: 'terminal',
      currentApp: 'Terminal Studio',
      options: ['Terminal Studio', 'Alacritty Emulator', 'XTerm'],
    },
    {
      id: 'music',
      label: 'Music Player',
      icon: 'music_note',
      currentApp: 'Cassandra Sound Player',
      options: ['Cassandra Sound Player', 'VLC Media Player'],
    },
    {
      id: 'video',
      label: 'Video Player',
      icon: 'movie',
      currentApp: 'VLC Media Player',
      options: ['VLC Media Player', 'MPV Cyber-Player'],
    },
    {
      id: 'photo',
      label: 'Photo Viewer',
      icon: 'image',
      currentApp: 'Graphene Image Studio',
      options: ['Graphene Image Studio', 'GIMP Photo Editor'],
    },
    {
      id: 'pdf',
      label: 'PDF Document Viewer',
      icon: 'picture_as_pdf',
      currentApp: 'Evince PDF Reader',
      options: ['Evince PDF Reader', 'Chromium PDF Reader'],
    },
    {
      id: 'archive',
      label: 'Archive Tool',
      icon: 'folder_zip',
      currentApp: 'File Roller Unarchiver',
      options: ['File Roller Unarchiver', '7-Zip Cyber Engine'],
    },
  ]);

  const handleSelectApp = (catId: string, newApp: string) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === catId ? { ...cat, currentApp: newApp } : cat))
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto relative w-full max-w-[860px] h-[640px] bg-surface-container-low/95 rounded-xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl border border-surface-container-high/60"
          >
            {/* Titlebar */}
            <div className="h-9 px-4 bg-surface-container-lowest/90 flex items-center justify-between shrink-0 select-none border-b border-surface-container-high/40">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-[#EF4444] hover:opacity-80 transition-opacity flex items-center justify-center group cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[8px] text-surface-container-lowest opacity-0 group-hover:opacity-100">
                      close
                    </span>
                  </button>
                  <button className="w-3 h-3 rounded-full bg-[#F5C400] hover:opacity-80 transition-opacity flex items-center justify-center group cursor-pointer">
                    <span className="material-symbols-outlined text-[8px] text-surface-container-lowest opacity-0 group-hover:opacity-100">
                      remove
                    </span>
                  </button>
                  <button className="w-3 h-3 rounded-full bg-[#26B170] hover:opacity-80 transition-opacity flex items-center justify-center group cursor-pointer">
                    <span className="material-symbols-outlined text-[8px] text-surface-container-lowest opacity-0 group-hover:opacity-100">
                      fullscreen
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-2 ml-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">apps</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Default Applications
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-[#4CC9F0]">
                MIME Associations Core
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="bg-[#051650] border border-surface-container-high/40 rounded-xl p-5 space-y-3 shadow-sm">
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-4 flex items-center justify-between hover:border-surface-container-high/70 transition-colors"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="material-symbols-outlined text-[#4CC9F0] text-xl">
                          {cat.icon}
                        </span>
                        <span className="text-sm font-semibold text-on-surface">{cat.label}</span>
                      </div>

                      <select
                        value={cat.currentApp}
                        onChange={(e) => handleSelectApp(cat.id, e.target.value)}
                        className="bg-[#051650] text-[#F8FAFC] text-xs rounded-lg px-3 py-1.5 outline-none border border-surface-container-high/60 cursor-pointer font-medium"
                      >
                        {cat.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

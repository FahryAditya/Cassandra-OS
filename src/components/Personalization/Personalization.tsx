import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PersonalizationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Personalization: React.FC<PersonalizationProps> = ({ isOpen, onClose }) => {
  const [accentColor, setAccentColor] = useState('cyan');
  const [blurAmount, setBlurAmount] = useState(24);

  const colors = [
    { id: 'cyan', name: 'Cobalt Cyan', bg: 'bg-[#5bd5fc]', border: 'border-[#5bd5fc]' },
    { id: 'indigo', name: 'Deep Indigo', bg: 'bg-[#4361ee]', border: 'border-[#4361ee]' },
    { id: 'emerald', name: 'Emerald Cyber', bg: 'bg-[#26b170]', border: 'border-[#26b170]' },
    { id: 'purple', name: 'Neon Purple', bg: 'bg-[#aa3bff]', border: 'border-[#aa3bff]' },
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
            className="pointer-events-auto relative w-full max-w-[1020px] h-[640px] bg-surface-container-low/95 backdrop-blur-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-surface-container-high/60"
          >
            {/* Titlebar Chrome */}
            <div className="h-9 px-4 bg-surface-container flex items-center justify-between shrink-0 select-none border-b border-surface-container-high/40">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-[#EF4444] opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                  />
                  <button className="w-3 h-3 rounded-full bg-[#F5C400] opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
                  <button className="w-3 h-3 rounded-full bg-[#26B170] opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-xs">
                  <span className="material-symbols-outlined text-tertiary text-[16px]">palette</span>
                  <span className="font-semibold text-on-surface">System Settings / Personalization</span>
                </div>
              </div>

              <span className="font-code-sm text-[10px] text-tertiary px-2 py-0.5 rounded bg-surface-container-high">
                Theme Engine Active
              </span>
            </div>

            {/* Split Layout */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Sub-nav */}
              <aside className="w-64 bg-surface-container/70 p-4 flex flex-col shrink-0 border-r border-surface-container-high/40">
                <div className="space-y-1">
                  <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider block px-2 mb-1">
                    Appearance
                  </span>
                  {[
                    { name: 'Personalization & Theme', icon: 'palette', active: true },
                    { name: 'Display & Resolution', icon: 'display_settings', active: false },
                    { name: 'Dock & Workspace', icon: 'dock', active: false },
                  ].map((item) => (
                    <button
                      key={item.name}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-body-sm text-xs transition-colors text-left cursor-pointer ${
                        item.active
                          ? 'bg-surface-container-high text-tertiary font-bold shadow-sm'
                          : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </aside>

              {/* Main Customization Content */}
              <main className="flex-1 p-6 overflow-y-auto bg-surface-container-lowest/30 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-on-surface tracking-tight mb-1">
                    System Theme & Color Accent
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Customize background wallpaper, accent highlight colors, and glassmorphism blur density.
                  </p>
                </div>

                {/* Accent Color Selection */}
                <div className="p-5 rounded-2xl bg-surface-container-high/40 border border-surface-container-high/40 space-y-3">
                  <span className="font-body-sm text-xs font-bold text-on-surface block">
                    Select Accent Color Highlight
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {colors.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setAccentColor(c.id)}
                        className={`p-3 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                          accentColor === c.id
                            ? `${c.border} bg-surface-container-high shadow-md`
                            : 'border-surface-container-high/40 hover:bg-surface-container-high/50'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full ${c.bg} shadow-sm`} />
                        <span className="font-body-sm text-xs text-on-surface font-semibold">
                          {c.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Glassmorphism Blur Slider */}
                <div className="p-5 rounded-2xl bg-surface-container-high/40 border border-surface-container-high/40 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-body-sm font-bold text-on-surface">
                      Window Backdrop Blur Density
                    </span>
                    <span className="font-mono text-tertiary">{blurAmount}px</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="48"
                    value={blurAmount}
                    onChange={(e) => setBlurAmount(Number(e.target.value))}
                    className="w-full accent-tertiary h-1.5 bg-surface-container-highest rounded-lg cursor-pointer"
                  />
                </div>
              </main>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

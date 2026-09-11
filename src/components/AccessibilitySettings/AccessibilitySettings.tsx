import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccessibilitySettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilitySettings: React.FC<AccessibilitySettingsProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'vision' | 'hearing' | 'interaction'>('vision');

  // Vision options
  const [magnifier, setMagnifier] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(150);
  const [textSize, setTextSize] = useState(14);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);

  // Interaction options
  const [stickyKeys, setStickyKeys] = useState(false);
  const [slowKeys, setSlowKeys] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto relative w-full max-w-[880px] h-[640px] bg-surface-container-low/95 rounded-xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl border border-surface-container-high/60"
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">accessibility_new</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Accessibility & Assistive Tech
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-[#4CC9F0]">
                Universal Assistive Core
              </span>
            </div>

            {/* Split View */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Sidebar */}
              <aside className="w-56 bg-surface-container/70 flex flex-col shrink-0 p-3 border-r border-surface-container-high/40 overflow-y-auto space-y-1">
                <p className="px-3 py-1.5 text-xs font-semibold text-on-surface-variant/60 uppercase tracking-wider">
                  Assistive Modes
                </p>

                <button
                  onClick={() => setActiveTab('vision')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left text-xs font-medium cursor-pointer ${
                    activeTab === 'vision'
                      ? 'bg-[#4361EE] text-white shadow-sm font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">visibility</span>
                  <span>Vision & Screen</span>
                </button>

                <button
                  onClick={() => setActiveTab('hearing')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left text-xs font-medium cursor-pointer ${
                    activeTab === 'hearing'
                      ? 'bg-[#4361EE] text-white shadow-sm font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">hearing</span>
                  <span>Hearing & Audio</span>
                </button>

                <button
                  onClick={() => setActiveTab('interaction')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left text-xs font-medium cursor-pointer ${
                    activeTab === 'interaction'
                      ? 'bg-[#4361EE] text-white shadow-sm font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container-high/60 hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">touch_app</span>
                  <span>Interaction & Input</span>
                </button>
              </aside>

              {/* Right Panel */}
              <main className="flex-1 overflow-y-auto p-6 space-y-5">
                {activeTab === 'vision' && (
                  <>
                    {/* Screen Magnifier */}
                    <div className="bg-[#051650] border border-surface-container-high/40 rounded-xl p-5 space-y-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-tertiary text-xl">zoom_in</span>
                          <h3 className="text-sm font-bold text-on-surface">Screen Magnifier</h3>
                        </div>
                        <button
                          onClick={() => setMagnifier(!magnifier)}
                          className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                            magnifier ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                          }`}
                        >
                          <span
                            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                              magnifier ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      {magnifier && (
                        <div className="space-y-1.5 pt-2 border-t border-surface-container-high/30">
                          <div className="flex justify-between text-xs text-[#94A3B8]">
                            <span>Default Zoom Level</span>
                            <span className="font-mono text-on-surface">{zoomLevel}%</span>
                          </div>
                          <input
                            type="range"
                            min="100"
                            max="300"
                            value={zoomLevel}
                            onChange={(e) => setZoomLevel(Number(e.target.value))}
                            className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-[#4CC9F0]"
                          />
                        </div>
                      )}
                    </div>

                    {/* Text Size Live Preview */}
                    <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-3">
                      <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-lg">format_size</span>
                        Text Scaling & Font Size
                      </h3>

                      <div className="space-y-3 pt-1">
                        <input
                          type="range"
                          min="12"
                          max="20"
                          value={textSize}
                          onChange={(e) => setTextSize(Number(e.target.value))}
                          className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-[#4361EE]"
                        />

                        <div className="bg-[#051650] p-4 rounded-xl border border-surface-container-high/40 flex flex-col justify-center min-h-[60px]">
                          <p className="text-on-surface font-medium transition-all" style={{ fontSize: `${textSize}px` }}>
                            Live Text Preview: CassandraOS Cybernetic Interface
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* High Contrast & Motion */}
                    <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-surface-container-high/30">
                        <div>
                          <p className="text-xs font-bold text-on-surface">High Contrast Mode</p>
                          <p className="text-[11px] text-[#94A3B8]">Increase color contrast for enhanced legibility</p>
                        </div>
                        <button
                          onClick={() => setHighContrast(!highContrast)}
                          className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                            highContrast ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                          }`}
                        >
                          <span
                            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                              highContrast ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-xs font-bold text-on-surface">Reduce Window Motion</p>
                          <p className="text-[11px] text-[#94A3B8]">Minimize UI animations and desktop transition effects</p>
                        </div>
                        <button
                          onClick={() => setReduceMotion(!reduceMotion)}
                          className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                            reduceMotion ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                          }`}
                        >
                          <span
                            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                              reduceMotion ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'interaction' && (
                  <div className="bg-[#051650] border border-surface-container-high/40 rounded-xl p-5 space-y-4">
                    <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-tertiary">keyboard</span>
                      Keyboard Assistance
                    </h3>

                    <div className="flex items-center justify-between py-2 border-b border-surface-container-high/30">
                      <div>
                        <p className="text-xs font-bold text-on-surface">Sticky Keys</p>
                        <p className="text-[11px] text-[#94A3B8]">Press modifier keys sequentially instead of simultaneously</p>
                      </div>
                      <button
                        onClick={() => setStickyKeys(!stickyKeys)}
                        className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                          stickyKeys ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                            stickyKeys ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-xs font-bold text-on-surface">Slow Keys</p>
                        <p className="text-[11px] text-[#94A3B8]">Require key press duration threshold before registering input</p>
                      </div>
                      <button
                        onClick={() => setSlowKeys(!slowKeys)}
                        className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                          slowKeys ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                            slowKeys ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'hearing' && (
                  <div className="bg-[#051650] p-5 rounded-xl border border-surface-container-high/40 space-y-2 text-xs text-[#94A3B8]">
                    <h3 className="text-sm font-bold text-on-surface">Mono Audio & Visual Alerts</h3>
                    <p>Combine left and right audio channels into a single mono output, and flash the display screen whenever sound notifications trigger.</p>
                  </div>
                )}
              </main>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

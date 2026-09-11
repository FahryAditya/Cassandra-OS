import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LanguageRegionProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageRegion: React.FC<LanguageRegionProps> = ({ isOpen, onClose }) => {
  const [language, setLanguage] = useState('id');
  const [region, setRegion] = useState('ID');
  const [is24Hour, setIs24Hour] = useState(true);

  const languages = [
    { id: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { id: 'en-US', name: 'English (United States)', flag: '🇺🇸' },
    { id: 'en-GB', name: 'English (United Kingdom)', flag: '🇬🇧' },
    { id: 'ja', name: '日本語 (Japanese)', flag: '🇯🇵' },
  ];

  const regions = [
    { id: 'ID', name: 'Indonesia (WITA - GMT+8)' },
    { id: 'US', name: 'United States (PST / EST)' },
    { id: 'JP', name: 'Japan (JST - GMT+9)' },
    { id: 'DE', name: 'Germany (CET - GMT+1)' },
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
            className="pointer-events-auto relative w-full max-w-[840px] h-[640px] bg-surface-container-low/95 rounded-xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl border border-surface-container-high/60"
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">language</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Language & Region Format
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-[#4CC9F0]">
                ICU Locale Core (id_ID.UTF-8)
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Language Selection Card */}
              <div className="bg-[#051650] border border-surface-container-high/40 rounded-xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary text-2xl">translate</span>
                    <div>
                      <h2 className="text-base font-bold text-on-surface">System Display Language</h2>
                      <p className="text-xs text-[#94A3B8]">Applies to desktop shell, menus, and system apps</p>
                    </div>
                  </div>

                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-surface-container-high text-on-surface text-xs rounded-lg px-3 py-2 outline-none border border-surface-container-high/60 cursor-pointer font-medium"
                  >
                    {languages.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.flag} {l.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Region Selection Card */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary text-2xl">public</span>
                    <div>
                      <h3 className="text-sm font-semibold text-on-surface">Regional Locale</h3>
                      <p className="text-xs text-[#94A3B8]">Formats date, currency, and number representations</p>
                    </div>
                  </div>

                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="bg-surface-container-high text-on-surface text-xs rounded-lg px-3 py-2 outline-none border border-surface-container-high/60 cursor-pointer font-medium"
                  >
                    {regions.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Formats Preview Cards Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-surface-container-high/30">
                  <div className="bg-[#051650] p-3.5 rounded-xl border border-surface-container-high/30">
                    <span className="text-[11px] text-[#94A3B8] block">Date Format Preview</span>
                    <span className="font-mono text-xs text-[#F8FAFC] font-semibold block mt-1">
                      {region === 'ID' ? '11/09/2026 (DD/MM/YYYY)' : '09/11/2026 (MM/DD/YYYY)'}
                    </span>
                  </div>

                  <div className="bg-[#051650] p-3.5 rounded-xl border border-surface-container-high/30 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#94A3B8] block">Time Format Preview</span>
                      <span className="font-mono text-xs text-[#F8FAFC] font-semibold block mt-1">
                        {is24Hour ? '18:04:20 WITA' : '06:04:20 PM'}
                      </span>
                    </div>
                    <button
                      onClick={() => setIs24Hour(!is24Hour)}
                      className="px-2 py-1 bg-surface-container-high text-[10px] text-[#4CC9F0] rounded font-mono font-bold cursor-pointer"
                    >
                      {is24Hour ? '24-HOUR' : '12-HOUR'}
                    </button>
                  </div>

                  <div className="bg-[#051650] p-3.5 rounded-xl border border-surface-container-high/30">
                    <span className="text-[11px] text-[#94A3B8] block">Number Format</span>
                    <span className="font-mono text-xs text-[#F8FAFC] font-semibold block mt-1">
                      {region === 'ID' ? '1.234.567,89' : '1,234,567.89'}
                    </span>
                  </div>

                  <div className="bg-[#051650] p-3.5 rounded-xl border border-surface-container-high/30">
                    <span className="text-[11px] text-[#94A3B8] block">Currency Standard</span>
                    <span className="font-mono text-xs text-[#F8FAFC] font-semibold block mt-1">
                      {region === 'ID' ? 'Rp 1.500.000,00 (IDR)' : '$1,500.00 (USD)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

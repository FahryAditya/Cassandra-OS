import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWindowManager } from '../../context/WindowContext';
import type { WindowId } from '../../types/os';

interface AppSearchResultsProps {
  isOpen?: boolean;
}

interface AppSearchItem {
  id: WindowId;
  name: string;
  category: string;
  icon: string;
  desc: string;
}

export const AppSearchResults: React.FC<AppSearchResultsProps> = ({ isOpen = true }) => {
  const { openWindow } = useWindowManager();
  const [query, setQuery] = useState('term');

  const dataset: AppSearchItem[] = [
    { id: 'terminal', name: 'Terminal Console', category: 'Developer Utility', icon: 'terminal', desc: 'Interactive Linux bash shell environment' },
    { id: 'text-editor', name: 'Text & Code Editor Studio', category: 'Developer Tools', icon: 'code', desc: 'IDE text editor for scripts and config files' },
    { id: 'system-monitor', name: 'System Telemetry & Monitor', category: 'System Diagnostics', icon: 'monitoring', desc: 'Monitor CPU, Memory, & Network process load' },
    { id: 'system-diagnostics', name: 'System Diagnostics Center', category: 'System Hardware', icon: 'verified', desc: 'Stress test hardware components and sensors' },
    { id: 'network-mesh', name: 'Network Mesh Shield', category: 'Security Network', icon: 'hub', desc: 'Zero-trust eBPF packet inspection' },
    { id: 'file-manager', name: 'File Explorer Vault', category: 'Storage Utility', icon: 'database', desc: 'Cryptographic file manager for LUKS volumes' },
  ];

  const matches = dataset.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const suggestions = dataset.filter((item) => !matches.includes(item)).slice(0, 2);

  // Highlight helper
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, idx) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={idx} className="text-[#4CC9F0] font-bold bg-[#4361EE]/30 px-1 rounded">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-[#051650]/95 backdrop-blur-xl border border-[#0A2472] rounded-xl p-5 text-[#F8FAFC] flex flex-col justify-between select-none overflow-hidden">
      {/* Search Header */}
      <div className="pb-4 border-b border-[#0A2472]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#4361EE] text-white flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined">manage_search</span>
            </div>
            <div>
              <h2 className="font-semibold text-lg tracking-wide">App Search Results</h2>
              <p className="text-xs text-[#94A3B8]">Dedicated application query & execution portal</p>
            </div>
          </div>
          <span className="text-xs font-mono bg-[#0A2472] text-[#4CC9F0] px-3 py-1 rounded-full">
            {matches.length} Matches Found
          </span>
        </div>

        {/* Input Bar */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#4CC9F0]">
            search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type application query (e.g. term, sys, net)..."
            className="w-full bg-[#000720]/80 border border-[#4895EF] rounded-xl pl-10 pr-10 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4CC9F0]/50"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-3 text-xs text-[#94A3B8] hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto py-4 space-y-3 scrollbar-thin scrollbar-thumb-[#0A2472]">
        {matches.length > 0 ? (
          matches.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ x: 3 }}
              className="p-3.5 bg-[#000720]/50 border border-[#0A2472] hover:border-[#4895EF] rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-[#0A2472]/40 group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#0A2472] group-hover:bg-[#4361EE] text-[#4CC9F0] group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">
                      {highlightText(item.name, query)}
                    </h3>
                    <span className="text-[10px] font-mono text-[#4895EF] bg-[#0A2472]/80 px-2 py-0.5 rounded">
                      {highlightText(item.category, query)}
                    </span>
                  </div>
                  <p className="text-xs text-[#94A3B8] truncate mt-0.5">
                    {highlightText(item.desc, query)}
                  </p>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => openWindow(item.id)}
                className="px-4 py-1.5 bg-[#4361EE] hover:bg-[#4895EF] text-white text-xs font-medium rounded-lg shadow-md flex items-center gap-1.5 flex-shrink-0"
              >
                <span>Open</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </motion.button>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-10 text-[#94A3B8] space-y-2">
            <span className="material-symbols-outlined text-4xl text-[#0A2472]">search_off</span>
            <p className="text-sm">No direct application matches found for "{query}"</p>
          </div>
        )}

        {/* Suggestions Box if few or no matches */}
        {suggestions.length > 0 && (
          <div className="mt-4 pt-4 border-t border-[#0A2472]/60">
            <div className="text-xs font-mono text-[#94A3B8] mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#F5C400]">lightbulb</span>
              Suggested Applications:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => openWindow(item.id)}
                  className="flex items-center gap-2.5 p-2.5 bg-[#000720]/30 border border-[#0A2472] rounded-lg hover:border-[#4895EF] text-left transition-colors"
                >
                  <span className="material-symbols-outlined text-base text-[#4CC9F0]">{item.icon}</span>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-white truncate">{item.name}</div>
                    <div className="text-[10px] text-[#94A3B8] truncate">{item.category}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#0A2472] flex items-center justify-between text-xs text-[#94A3B8]">
        <span>Query: <strong className="text-white font-mono">{query || 'none'}</strong></span>
        <span>Press <kbd className="px-1.5 py-0.5 bg-[#0A2472] text-white rounded text-[10px]">Enter</kbd> to launch top result</span>
      </div>
    </div>
  );
};

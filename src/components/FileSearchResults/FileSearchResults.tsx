import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FileSearchResultsProps {
  isOpen?: boolean;
}

interface FileSearchResultItem {
  id: string;
  name: string;
  path: string;
  type: 'document' | 'image' | 'code' | 'video' | 'folder';
  size: string;
  modified: string;
}

export const FileSearchResults: React.FC<FileSearchResultsProps> = ({ isOpen = true }) => {
  const [query, setQuery] = useState('config');
  const [activeFilter, setActiveFilter] = useState<'all' | 'document' | 'image' | 'code' | 'video'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'name' | 'date' | 'size'>('relevance');

  const fileDatabase: FileSearchResultItem[] = [
    { id: '1', name: 'system_config.json', path: '/etc/cassandra/system_config.json', type: 'code', size: '14 KB', modified: '2026-09-11 11:20' },
    { id: '2', name: 'network_mesh_config.yaml', path: '/etc/ebpf/network_mesh_config.yaml', type: 'code', size: '28 KB', modified: '2026-09-10 18:45' },
    { id: '3', name: 'luks_vault_attestation.pdf', path: '/vault/docs/luks_vault_attestation.pdf', type: 'document', size: '2.4 MB', modified: '2026-09-08 14:12' },
    { id: '4', name: 'cyber_wallpaper_config.png', path: '/usr/share/backgrounds/cyber_wallpaper_config.png', type: 'image', size: '4.8 MB', modified: '2026-09-05 09:30' },
    { id: '5', name: 'kernel_diagnostic_config.log', path: '/var/log/kernel_diagnostic_config.log', type: 'code', size: '156 KB', modified: '2026-09-11 12:01' },
    { id: '6', name: 'cassandra_os_presentation.mp4', path: '/home/user/Videos/cassandra_os_presentation.mp4', type: 'video', size: '142 MB', modified: '2026-09-01 16:00' },
  ];

  const filteredFiles = fileDatabase
    .filter((f) => {
      const matchesQuery =
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.path.toLowerCase().includes(query.toLowerCase());
      const matchesType = activeFilter === 'all' ? true : f.type === activeFilter;
      return matchesQuery && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'date') return b.modified.localeCompare(a.modified);
      return 0;
    });

  const getFileIcon = (type: FileSearchResultItem['type']) => {
    switch (type) {
      case 'code':
        return { icon: 'code', color: 'text-[#4CC9F0]' };
      case 'document':
        return { icon: 'description', color: 'text-[#4895EF]' };
      case 'image':
        return { icon: 'image', color: 'text-[#26B170]' };
      case 'video':
        return { icon: 'movie', color: 'text-[#F5C400]' };
      case 'folder':
        return { icon: 'folder', color: 'text-[#4361EE]' };
      default:
        return { icon: 'insert_drive_file', color: 'text-[#94A3B8]' };
    }
  };

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
      {/* Header */}
      <div className="pb-4 border-b border-[#0A2472] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#4361EE] text-white flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined">saved_search</span>
            </div>
            <div>
              <h2 className="font-semibold text-lg tracking-wide">File Search Results</h2>
              <p className="text-xs text-[#94A3B8]">Deep file system & storage volume search</p>
            </div>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#94A3B8]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#000720]/80 border border-[#0A2472] text-white rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#4CC9F0]"
            >
              <option value="relevance">Relevance</option>
              <option value="name">Name (A-Z)</option>
              <option value="date">Date Modified</option>
            </select>
          </div>
        </div>

        {/* Input & Filters Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#4CC9F0]">
              search
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search file name or path (e.g. config, log, pdf)..."
              className="w-full bg-[#000720]/80 border border-[#0A2472] rounded-xl pl-10 pr-10 py-2 text-xs text-white focus:outline-none focus:border-[#4CC9F0]"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-2.5 text-xs text-[#94A3B8] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(['all', 'document', 'image', 'code', 'video'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs capitalize transition-colors flex-shrink-0 ${
                  activeFilter === filter
                    ? 'bg-[#4361EE] text-white font-medium shadow-sm'
                    : 'bg-[#000720]/40 border border-[#0A2472] text-[#94A3B8] hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Results Table */}
      <div className="flex-1 overflow-y-auto py-3 scrollbar-thin scrollbar-thumb-[#0A2472]">
        {filteredFiles.length > 0 ? (
          <div className="space-y-2">
            {filteredFiles.map((file) => {
              const { icon, color } = getFileIcon(file.type);
              return (
                <motion.div
                  key={file.id}
                  whileHover={{ x: 2 }}
                  className="p-3 bg-[#000720]/40 border border-[#0A2472] hover:border-[#4895EF] rounded-xl flex items-center justify-between gap-4 transition-all hover:bg-[#0A2472]/30 group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`w-9 h-9 rounded-lg bg-[#0A2472] flex items-center justify-center flex-shrink-0 ${color}`}>
                      <span className="material-symbols-outlined text-lg">{icon}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-white group-hover:text-[#4CC9F0] transition-colors truncate">
                        {highlightText(file.name, query)}
                      </div>
                      <div className="text-xs text-[#94A3B8] font-mono truncate">
                        {highlightText(file.path, query)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-xs text-[#94A3B8] font-mono flex-shrink-0">
                    <span>{file.size}</span>
                    <span className="hidden sm:inline">{file.modified}</span>
                    <button
                      className="p-1.5 hover:bg-[#4361EE] hover:text-white rounded-lg transition-colors text-[#4CC9F0]"
                      title="Open File Folder"
                    >
                      <span className="material-symbols-outlined text-base">folder_open</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-12 text-[#94A3B8]">
            <span className="material-symbols-outlined text-4xl text-[#0A2472] mb-2">folder_off</span>
            <p className="text-sm">No files found matching "{query}"</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#0A2472] flex items-center justify-between text-xs text-[#94A3B8]">
        <span>Found {filteredFiles.length} file results</span>
        <span className="font-mono text-[#4CC9F0]">LUKS Vault Indexed</span>
      </div>
    </div>
  );
};

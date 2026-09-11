import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ClipboardItem {
  id: string;
  type: 'text' | 'code' | 'image';
  content: string;
  timestamp: string;
  isPinned: boolean;
}

export const ClipboardHistory: React.FC<{ isOpen?: boolean }> = ({ isOpen = true }) => {
  const [items, setItems] = useState<ClipboardItem[]>([
    { id: '1', type: 'code', content: 'sudo systemctl restart ebpf-shield.service', timestamp: '2 mins ago', isPinned: true },
    { id: '2', type: 'text', content: 'https://github.com/FahryAditya/Cassandra-OS', timestamp: '15 mins ago', isPinned: true },
    { id: '3', type: 'text', content: 'LUKS2 Vault PCR[7] verification key hash: 0x9f8b4a7...', timestamp: '1 hour ago', isPinned: false },
    { id: '4', type: 'code', content: 'const { openWindow } = useWindowManager();', timestamp: '2 hours ago', isPinned: false },
    { id: '5', type: 'text', content: 'CassandraOS v3.4.0-LTS Release Notes Documentation', timestamp: '3 hours ago', isPinned: false },
  ]);

  const togglePin = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isPinned: !item.isPinned } : item))
    );
  };

  const clearAll = () => {
    setItems((prev) => prev.filter((item) => item.isPinned));
  };

  const pinnedItems = items.filter((i) => i.isPinned);
  const recentItems = items.filter((i) => !i.isPinned);

  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-[#051650]/95 backdrop-blur-xl border border-[#0A2472] rounded-xl p-5 text-[#F8FAFC] flex flex-col justify-between select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#0A2472]">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[#4CC9F0]">content_paste</span>
          <h2 className="font-semibold text-lg tracking-wide">Clipboard History</h2>
        </div>
        <button
          onClick={clearAll}
          className="text-xs text-[#EF4444] hover:text-red-300 font-medium transition-colors flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">delete_sweep</span> Clear Unpinned
        </button>
      </div>

      {/* List Area */}
      <div className="flex-1 overflow-y-auto py-3 space-y-4 scrollbar-thin scrollbar-thumb-[#0A2472]">
        {/* Pinned Section */}
        {pinnedItems.length > 0 && (
          <div className="space-y-2">
            <div className="text-[11px] font-mono font-semibold text-[#4CC9F0] uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">push_pin</span> Pinned Snippets ({pinnedItems.length})
            </div>
            {pinnedItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.01 }}
                className="p-3 bg-[#000720]/60 border border-[#4CC9F0]/40 rounded-xl space-y-2 relative group"
              >
                <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                  <span className="font-mono text-[10px] text-[#4895EF] uppercase">{item.type}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px]">{item.timestamp}</span>
                    <button
                      onClick={() => togglePin(item.id)}
                      className="text-[#4CC9F0] hover:text-white"
                      title="Unpin"
                    >
                      <span className="material-symbols-outlined text-sm">push_pin</span>
                    </button>
                  </div>
                </div>
                <div className="text-xs font-mono text-white bg-[#000720]/80 p-2 rounded-lg border border-[#0A2472] truncate">
                  {item.content}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Recent Chronological Section */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono font-semibold text-[#94A3B8] uppercase tracking-wider">
            Recent History ({recentItems.length})
          </div>
          {recentItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.01 }}
              className="p-3 bg-[#000720]/40 border border-[#0A2472] hover:border-[#4895EF] rounded-xl space-y-2 transition-all group"
            >
              <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                <span className="font-mono text-[10px] text-[#4895EF] uppercase">{item.type}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px]">{item.timestamp}</span>
                  <button
                    onClick={() => togglePin(item.id)}
                    className="text-[#94A3B8] hover:text-[#4CC9F0] opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Pin snippet"
                  >
                    <span className="material-symbols-outlined text-sm">push_pin</span>
                  </button>
                </div>
              </div>
              <div className="text-xs font-mono text-white bg-[#000720]/80 p-2 rounded-lg border border-[#0A2472] truncate">
                {item.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#0A2472] flex items-center justify-between text-xs text-[#94A3B8]">
        <span>Click snippet to copy into active focus</span>
        <span className="font-mono text-[#4CC9F0]">{items.length} items total</span>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StorageManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StorageManager: React.FC<StorageManagerProps> = ({ isOpen, onClose }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('apps');

  const categories = [
    {
      id: 'system',
      name: 'System Core & Kernel',
      size: '120.5 GB',
      percentage: 23.5,
      color: '#4361EE',
      icon: 'terminal',
      details: ['Linux Kernel 6.10', 'CassandraOS System Files', 'Driver Modules', 'System Cache'],
    },
    {
      id: 'apps',
      name: 'Applications & Binaries',
      size: '95.2 GB',
      percentage: 18.6,
      color: '#4895EF',
      icon: 'apps',
      details: ['Chromium Web Engine (14.2 GB)', 'VS Code Studio (8.5 GB)', 'Docker Containers (42.0 GB)', 'Other Apps (30.5 GB)'],
    },
    {
      id: 'documents',
      name: 'Documents & Workspace',
      size: '45.8 GB',
      percentage: 8.9,
      color: '#4CC9F0',
      icon: 'description',
      details: ['Projects & Repositories (32.1 GB)', 'PDF Documents (8.4 GB)', 'Text Files & Notes (5.3 GB)'],
    },
    {
      id: 'media',
      name: 'Media & Asset Vault',
      size: '50.4 GB',
      percentage: 9.8,
      color: '#26B170',
      icon: 'movie',
      details: ['Video Recordings (30.1 GB)', 'Images & Screenshots (14.3 GB)', 'Audio Assets (6.0 GB)'],
    },
    {
      id: 'downloads',
      name: 'Downloads & Packages',
      size: '18.1 GB',
      percentage: 3.5,
      color: '#F5C400',
      icon: 'download',
      details: ['Installer ISOs (12.0 GB)', 'Compressed Archives (6.1 GB)'],
    },
    {
      id: 'other',
      name: 'Other & Temporary Files',
      size: '12.0 GB',
      percentage: 2.3,
      color: '#94A3B8',
      icon: 'folder_open',
      details: ['Browser Cache (6.2 GB)', 'Crash Dumps (3.8 GB)', 'Log Files (2.0 GB)'],
    },
    {
      id: 'free',
      name: 'Free Space Available',
      size: '170.0 GB',
      percentage: 33.4,
      color: '#0A2472',
      icon: 'storage',
      details: ['Unallocated Free Space ready for storage volume expansion.'],
    },
  ];

  const totalUsed = '342.0 GB';
  const totalCapacity = '512 GB SSD';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto relative w-full max-w-[880px] h-[660px] bg-surface-container-low/95 rounded-xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl border border-surface-container-high/60"
          >
            {/* Window Chrome */}
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">hard_drive</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Storage Manager
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-code-sm text-code-sm text-on-surface-variant/70">
                  Btrfs / LUKS Enclave
                </span>
                <div className="flex items-center gap-1 text-tertiary font-code-sm text-code-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                  <span>Optimal</span>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Storage Capacity Bar Card */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-tertiary">sd_storage</span>
                      NVMe System Storage
                    </h3>
                    <p className="text-xs text-on-surface-variant/80 mt-0.5">
                      {totalCapacity} — <span className="text-on-surface font-semibold">{totalUsed} used</span> ({Math.round((342 / 512) * 100)}%)
                    </p>
                  </div>
                  <button className="px-3 py-1.5 bg-[#4361EE] hover:bg-[#4361EE]/90 text-white text-xs rounded-lg font-medium transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer">
                    <span className="material-symbols-outlined text-sm">cleaning_services</span>
                    Clean Disk
                  </button>
                </div>

                {/* Segmented Bar */}
                <div className="w-full bg-surface-container-high/40 h-4 rounded-full overflow-hidden flex p-0.5 gap-0.5 border border-surface-container-high/30">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className="h-full rounded-sm transition-all duration-300 relative group cursor-pointer"
                      style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                      title={`${cat.name}: ${cat.size}`}
                    />
                  ))}
                </div>
              </div>

              {/* Legend & Breakdown List */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-3">
                <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-tertiary text-lg">pie_chart</span>
                  Category Breakdown
                </h3>

                <div className="space-y-2">
                  {categories.map((cat) => {
                    const isExpanded = expandedCategory === cat.id;
                    return (
                      <div
                        key={cat.id}
                        className="bg-surface-container-high/30 border border-surface-container-high/40 rounded-lg overflow-hidden transition-colors"
                      >
                        <button
                          onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                          className="w-full p-3 flex items-center justify-between hover:bg-surface-container-high/50 transition-colors text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="w-3.5 h-3.5 rounded-full shrink-0"
                              style={{ backgroundColor: cat.color }}
                            />
                            <span className="material-symbols-outlined text-on-surface-variant text-lg">
                              {cat.icon}
                            </span>
                            <span className="text-sm font-medium text-on-surface">{cat.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-on-surface-variant">{cat.size}</span>
                            <span className="material-symbols-outlined text-on-surface-variant text-base">
                              {isExpanded ? 'expand_less' : 'expand_more'}
                            </span>
                          </div>
                        </button>

                        {/* Expanded Details */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="px-4 pb-3 pt-1 border-t border-surface-container-high/30 bg-surface-container-high/20"
                            >
                              <ul className="space-y-1.5 mt-2">
                                {cat.details.map((item, idx) => (
                                  <li key={idx} className="text-xs text-on-surface-variant/90 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-surface-container-high shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

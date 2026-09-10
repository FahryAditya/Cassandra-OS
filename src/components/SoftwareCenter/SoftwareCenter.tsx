import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SoftwareApp } from '../../types/os';

interface SoftwareCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SoftwareCenter: React.FC<SoftwareCenterProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const [apps, setApps] = useState<SoftwareApp[]>([
    {
      id: 'vscode',
      name: 'VS Code Studio',
      category: 'Development',
      icon: 'code',
      installed: true,
      version: 'v1.94.0',
      rating: 4.9,
      description: 'Streamlined code editor with support for Rust, TypeScript, and Docker.',
    },
    {
      id: 'docker',
      name: 'Docker Engine',
      category: 'Development',
      icon: 'view_in_ar',
      installed: true,
      version: 'v27.3.1',
      rating: 4.8,
      description: 'Container management platform for microservices and cloud deployments.',
    },
    {
      id: 'obs',
      name: 'OBS Studio',
      category: 'Media',
      icon: 'videocam',
      installed: false,
      version: 'v30.2.2',
      rating: 4.7,
      description: 'Free and open-source software for video recording and live streaming.',
    },
    {
      id: 'gimp',
      name: 'GIMP Image Editor',
      category: 'Graphics',
      icon: 'palette',
      installed: false,
      version: 'v2.10.38',
      rating: 4.5,
      description: 'GNU Image Manipulation Program for professional graphic creation.',
    },
    {
      id: 'wireshark',
      name: 'Wireshark Mesh Monitor',
      category: 'System',
      icon: 'hub',
      installed: false,
      version: 'v4.2.6',
      rating: 4.9,
      description: 'Network protocol analyzer for security inspection & telemetry debug.',
    },
  ]);

  const toggleInstall = (id: string) => {
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, installed: !app.installed } : app))
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
            className="pointer-events-auto relative w-full max-w-[1100px] h-[680px] bg-surface-container-lowest/90 backdrop-blur-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-surface-container-high/60"
          >
            {/* Titlebar Chrome */}
            <header className="h-9 px-4 bg-surface-container-low flex items-center justify-between select-none shrink-0 border-b border-surface-container-high/40">
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
                  <span className="material-symbols-outlined text-tertiary text-[16px]">inventory_2</span>
                  <span className="font-semibold text-on-surface">Cassandra Software Center</span>
                  <span className="font-code-sm text-[10px] text-outline px-1.5 py-0.5 rounded bg-surface-container">
                    arch: x86_64
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-tertiary font-code-sm text-xs">
                <span className="material-symbols-outlined text-[14px]">cloud_done</span>
                <span>Flathub + Core Mirror Synced</span>
              </div>
            </header>

            {/* Split View */}
            <div className="flex-1 flex overflow-hidden">
              {/* Sidebar Categories */}
              <aside className="w-64 bg-surface-container-low/70 p-4 flex flex-col justify-between shrink-0 border-r border-surface-container-high/40">
                <div className="space-y-4">
                  {/* Search Input */}
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">
                      search
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search flatpaks..."
                      className="w-full bg-surface-container-highest/70 text-on-surface text-xs font-body-sm pl-9 pr-3 py-2 rounded-lg outline-none focus:bg-surface-container-highest transition-colors border border-surface-container-high/40"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider block px-2 mb-1">
                      Catalog
                    </span>
                    {[
                      { id: 'all', name: 'Discover / All', icon: 'explore' },
                      { id: 'Development', name: 'Development', icon: 'terminal' },
                      { id: 'System', name: 'System & Mesh', icon: 'hub' },
                      { id: 'Graphics', name: 'Graphics & Design', icon: 'palette' },
                      { id: 'Media', name: 'Media & Video', icon: 'videocam' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-body-sm text-xs transition-colors text-left cursor-pointer ${
                          activeCategory === cat.id
                            ? 'bg-primary-container text-on-primary-container font-bold shadow-md'
                            : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Main Content Grid */}
              <main className="flex-1 p-6 overflow-y-auto bg-surface-container-lowest/30 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-on-surface tracking-tight mb-1">
                    Featured Applications & Flatpaks
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Verified software packages for CassandraOS Wayland environment.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {apps
                    .filter(
                      (app) =>
                        (activeCategory === 'all' || app.category === activeCategory) &&
                        app.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((app) => (
                      <div
                        key={app.id}
                        className="p-4 rounded-xl bg-surface-container-high/40 border border-surface-container-high/40 hover:border-tertiary/40 transition-all flex items-start gap-4 shadow-sm"
                      >
                        <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-tertiary shrink-0 border border-surface-container-high">
                          <span className="material-symbols-outlined text-[28px]">{app.icon}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-body-sm text-sm font-bold text-on-surface truncate">
                              {app.name}
                            </span>
                            <span className="font-code-sm text-[10px] text-tertiary font-mono">
                              ★ {app.rating}
                            </span>
                          </div>
                          <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed mb-3 line-clamp-2">
                            {app.description}
                          </p>

                          <div className="flex items-center justify-between pt-2 border-t border-surface-container-high/30">
                            <span className="font-code-sm text-[10px] text-outline font-mono">
                              {app.version}
                            </span>
                            <button
                              onClick={() => toggleInstall(app.id)}
                              className={`px-3 py-1 rounded-lg font-code-sm text-xs font-semibold transition-all cursor-pointer ${
                                app.installed
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-primary-container text-on-primary-container hover:brightness-110 shadow-md'
                              }`}
                            >
                              {app.installed ? '✓ Installed' : 'Install Flatpak'}
                            </button>
                          </div>
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

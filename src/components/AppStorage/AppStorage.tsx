import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HardDrive,
  Search,
  Trash2,
  Filter,
  Check
} from 'lucide-react';

interface AppStorageItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  appSizeMB: number;
  dataSizeMB: number;
  cacheSizeMB: number;
}

const INITIAL_APPS: AppStorageItem[] = [
  { id: '1', name: 'CyberTerminal Pro', category: 'System Tools', icon: '💻', appSizeMB: 420, dataSizeMB: 180, cacheSizeMB: 65 },
  { id: '2', name: 'Quantum Code IDE', category: 'Developer Tools', icon: '⚡', appSizeMB: 1250, dataSizeMB: 890, cacheSizeMB: 340 },
  { id: '3', name: 'Synthetix Browser', category: 'Web Browsers', icon: '🌐', appSizeMB: 680, dataSizeMB: 1420, cacheSizeMB: 920 },
  { id: '4', name: 'Neon Studio FX', category: 'Graphics & Design', icon: '🎨', appSizeMB: 2100, dataSizeMB: 640, cacheSizeMB: 410 },
  { id: '5', name: 'Aether Audio Workstation', category: 'Media Creation', icon: '🎧', appSizeMB: 1850, dataSizeMB: 1120, cacheSizeMB: 280 },
  { id: '6', name: 'Cassandra System Diagnostics', category: 'System Utilities', icon: '🛡️', appSizeMB: 120, dataSizeMB: 45, cacheSizeMB: 15 },
];

export const AppStorage: React.FC = () => {
  const [apps, setApps] = useState<AppStorageItem[]>(INITIAL_APPS);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'size' | 'name' | 'cache'>('size');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleClearCache = (id: string, name: string) => {
    setApps(prev => prev.map(app => app.id === id ? { ...app, cacheSizeMB: 0 } : app));
    showToast(`Cleared cache for ${name}`);
  };

  const handleClearAllCache = () => {
    setApps(prev => prev.map(app => ({ ...app, cacheSizeMB: 0 })));
    showToast('Cleared cache for all applications');
  };

  const filteredApps = apps
    .filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase()) || app.category.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'size') {
        const totalA = a.appSizeMB + a.dataSizeMB + a.cacheSizeMB;
        const totalB = b.appSizeMB + b.dataSizeMB + b.cacheSizeMB;
        return totalB - totalA;
      }
      if (sortBy === 'cache') {
        return b.cacheSizeMB - a.cacheSizeMB;
      }
      return a.name.localeCompare(b.name);
    });

  const totalStorageMB = apps.reduce((acc, app) => acc + app.appSizeMB + app.dataSizeMB + app.cacheSizeMB, 0);
  const totalCacheMB = apps.reduce((acc, app) => acc + app.cacheSizeMB, 0);
  const totalAppsMB = apps.reduce((acc, app) => acc + app.appSizeMB, 0);
  const totalDataMB = apps.reduce((acc, app) => acc + app.dataSizeMB, 0);

  return (
    <div className="h-full w-full bg-[#000720] text-slate-100 p-6 overflow-y-auto flex flex-col gap-6 selection:bg-[#4361EE] selection:text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#4361EE]/10 border border-[#4361EE]/30 text-[#4CC9F0]">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide text-white">App Storage Management</h1>
              <p className="text-xs text-slate-400">Inspect space usage, user data, and clear system app caches</p>
            </div>
          </div>
        </div>

        {totalCacheMB > 0 && (
          <button
            onClick={handleClearAllCache}
            className="flex items-center gap-2 px-4 py-2 bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444] rounded-xl text-xs font-semibold transition-all shadow-lg shadow-[#EF4444]/5"
          >
            <Trash2 className="w-4 h-4" />
            Clear All Caches ({(totalCacheMB / 1024).toFixed(2)} GB)
          </button>
        )}
      </div>

      {/* Storage Overview Card */}
      <div className="p-5 rounded-2xl bg-[#051650]/40 border border-slate-800/80 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-200">System App Storage Breakdown</span>
          <span className="text-sm font-bold text-[#4CC9F0]">{(totalStorageMB / 1024).toFixed(2)} GB Total</span>
        </div>

        {/* Stacked Progress Bar */}
        <div className="h-3.5 w-full bg-slate-900 rounded-full overflow-hidden flex p-0.5 border border-slate-800">
          <div
            className="h-full bg-[#4361EE] rounded-l-full transition-all duration-500"
            style={{ width: `${(totalAppsMB / totalStorageMB) * 100}%` }}
            title={`Application Binaries: ${(totalAppsMB / 1024).toFixed(2)} GB`}
          />
          <div
            className="h-full bg-[#4CC9F0] transition-all duration-500"
            style={{ width: `${(totalDataMB / totalStorageMB) * 100}%` }}
            title={`User Data: ${(totalDataMB / 1024).toFixed(2)} GB`}
          />
          <div
            className="h-full bg-[#F5C400] rounded-r-full transition-all duration-500"
            style={{ width: `${(totalCacheMB / totalStorageMB) * 100}%` }}
            title={`Temporary Caches: ${(totalCacheMB / 1024).toFixed(2)} GB`}
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 pt-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#4361EE]" />
            <span>App Binaries ({(totalAppsMB / 1024).toFixed(2)} GB)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#4CC9F0]" />
            <span>User Data ({(totalDataMB / 1024).toFixed(2)} GB)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#F5C400]" />
            <span>Temporary Caches ({(totalCacheMB / 1024).toFixed(2)} GB)</span>
          </div>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#4361EE]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs text-slate-400">
          <Filter className="w-3.5 h-3.5" />
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-900/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#4361EE]"
          >
            <option value="size">Total Size</option>
            <option value="cache">Cache Size</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-4 py-2.5 rounded-xl bg-[#26B170]/20 border border-[#26B170]/40 text-[#26B170] text-xs font-semibold flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* App List */}
      <div className="space-y-3">
        {filteredApps.map(app => {
          const totalAppMB = app.appSizeMB + app.dataSizeMB + app.cacheSizeMB;
          return (
            <div
              key={app.id}
              className="p-4 rounded-xl bg-[#051650]/30 border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-xl border border-slate-800">
                  {app.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">{app.name}</h3>
                  <p className="text-xs text-slate-400">{app.category}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                {/* Size breakdown mini bar */}
                <div className="flex flex-col gap-1 w-full sm:w-48">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Usage</span>
                    <span className="font-semibold text-slate-200">
                      {totalAppMB >= 1024 ? `${(totalAppMB / 1024).toFixed(2)} GB` : `${totalAppMB} MB`}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex">
                    <div className="bg-[#4361EE]" style={{ width: `${(app.appSizeMB / totalAppMB) * 100}%` }} title={`App: ${app.appSizeMB} MB`} />
                    <div className="bg-[#4CC9F0]" style={{ width: `${(app.dataSizeMB / totalAppMB) * 100}%` }} title={`Data: ${app.dataSizeMB} MB`} />
                    <div className="bg-[#F5C400]" style={{ width: `${(app.cacheSizeMB / totalAppMB) * 100}%` }} title={`Cache: ${app.cacheSizeMB} MB`} />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>App: {app.appSizeMB}M</span>
                    <span>Data: {app.dataSizeMB}M</span>
                    <span>Cache: {app.cacheSizeMB}M</span>
                  </div>
                </div>

                <button
                  disabled={app.cacheSizeMB === 0}
                  onClick={() => handleClearCache(app.id, app.name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                    app.cacheSizeMB > 0
                      ? 'bg-slate-900 hover:bg-[#F5C400]/10 border-slate-700 hover:border-[#F5C400]/40 text-slate-300 hover:text-[#F5C400]'
                      : 'bg-slate-900/40 border-slate-800 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Cache
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppStorage;

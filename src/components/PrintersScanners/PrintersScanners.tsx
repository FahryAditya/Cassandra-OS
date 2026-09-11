import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PrintersScannersProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PrinterDevice {
  id: string;
  name: string;
  type: 'printer' | 'scanner' | 'multifunction';
  status: 'ready' | 'offline' | 'low_ink';
  location: string;
  inkLevel?: number;
}

export const PrintersScanners: React.FC<PrintersScannersProps> = ({ isOpen, onClose }) => {
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [testPrintSuccess, setTestPrintSuccess] = useState<string | null>(null);

  const [devices, setDevices] = useState<PrinterDevice[]>([
    {
      id: 'pr-1',
      name: 'HP LaserJet Enterprise M507 (Network CUPS)',
      type: 'printer',
      status: 'ready',
      location: 'Office Network · 192.168.1.200',
      inkLevel: 88,
    },
    {
      id: 'pr-2',
      name: 'Epson EcoTank L3250 Scanner & Printer',
      type: 'multifunction',
      status: 'low_ink',
      location: 'USB Port 02',
      inkLevel: 15,
    },
    {
      id: 'pr-3',
      name: 'Canon ImageFORMULA DR-C225 II Scanner',
      type: 'scanner',
      status: 'offline',
      location: 'Workstation USB',
    },
  ]);

  const handleAddDevice = () => {
    setIsDiscovering(true);
    setTimeout(() => {
      setIsDiscovering(false);
      setDevices((prev) => [
        ...prev,
        {
          id: `pr-${Date.now()}`,
          name: 'Brother HL-L2350DW Laser Printer',
          type: 'printer',
          status: 'ready',
          location: 'AirPrint Network',
          inkLevel: 95,
        },
      ]);
    }, 1500);
  };

  const handlePrintTestPage = (name: string) => {
    setTestPrintSuccess(name);
    setTimeout(() => setTestPrintSuccess(null), 2000);
  };

  const getStatusBadge = (status: 'ready' | 'offline' | 'low_ink') => {
    if (status === 'ready') return { label: 'READY', bg: 'bg-[#26B170]/20 text-[#26B170]' };
    if (status === 'low_ink') return { label: 'LOW INK', bg: 'bg-[#F5C400]/20 text-[#F5C400]' };
    return { label: 'OFFLINE', bg: 'bg-surface-container-high text-[#94A3B8]' };
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">print</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Printers & Scanners
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-[#4CC9F0]">
                CUPS Spooler Daemon
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Top Banner / Add Device */}
              <div className="bg-[#051650] border border-surface-container-high/40 rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div>
                  <h2 className="text-base font-bold text-on-surface">Printers & Document Scanners</h2>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    CUPS printing system active. Manage print queues and scanner drivers.
                  </p>
                </div>

                <button
                  onClick={handleAddDevice}
                  disabled={isDiscovering}
                  className="px-4 py-2 border border-[#4361EE] text-[#4361EE] hover:bg-[#4361EE]/10 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">
                    {isDiscovering ? 'sync' : 'add'}
                  </span>
                  {isDiscovering ? 'Searching...' : 'Add Printer or Scanner'}
                </button>
              </div>

              {testPrintSuccess && (
                <div className="bg-[#26B170]/15 border border-[#26B170]/40 p-3 rounded-xl text-xs text-[#26B170] flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  Test page sent to <span className="font-semibold">{testPrintSuccess}</span> queue successfully.
                </div>
              )}

              {/* Devices Cards Grid */}
              <div className="space-y-4">
                {devices.map((dev) => {
                  const badge = getStatusBadge(dev.status);
                  return (
                    <div
                      key={dev.id}
                      className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-xl bg-surface-container-high/60 flex items-center justify-center text-[#4CC9F0]">
                            <span className="material-symbols-outlined text-2xl">
                              {dev.type === 'scanner' ? 'scanner' : 'print'}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-bold text-on-surface">{dev.name}</h3>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${badge.bg}`}>
                                {badge.label}
                              </span>
                            </div>
                            <p className="text-xs text-[#94A3B8] mt-0.5">{dev.location}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handlePrintTestPage(dev.name)}
                            className="px-3 py-1.5 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs rounded-lg font-medium cursor-pointer"
                          >
                            Print Test Page
                          </button>
                          <button className="px-3 py-1.5 bg-[#4361EE] hover:bg-[#4361EE]/90 text-white text-xs rounded-lg font-semibold cursor-pointer shadow-sm">
                            Manage Queue
                          </button>
                        </div>
                      </div>

                      {dev.inkLevel !== undefined && (
                        <div className="pt-3 border-t border-surface-container-high/30 flex items-center justify-between text-xs">
                          <span className="text-[#94A3B8]">Toner / Ink Level:</span>
                          <div className="flex items-center gap-2 w-48">
                            <div className="flex-1 bg-surface-container-high h-2 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  dev.inkLevel > 20 ? 'bg-[#26B170]' : 'bg-[#F5C400]'
                                }`}
                                style={{ width: `${dev.inkLevel}%` }}
                              />
                            </div>
                            <span className="font-mono text-on-surface font-semibold">{dev.inkLevel}%</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

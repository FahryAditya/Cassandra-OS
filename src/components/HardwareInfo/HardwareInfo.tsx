import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HardwareInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HardwareInfo: React.FC<HardwareInfoProps> = ({ isOpen, onClose }) => {
  const components = [
    {
      title: 'Processor (CPU)',
      icon: 'memory',
      color: '#4361EE',
      specs: [
        { label: 'Model', value: 'AMD Ryzen 9 7950X3D' },
        { label: 'Cores / Threads', value: '16 Cores / 32 Threads' },
        { label: 'Base / Boost Clock', value: '4.20 GHz / 5.70 GHz' },
        { label: 'L3 Cache', value: '128 MB 3D V-Cache' },
      ],
    },
    {
      title: 'Graphics Processor (GPU)',
      icon: 'developer_board',
      color: '#4895EF',
      specs: [
        { label: 'GPU Model', value: 'NVIDIA GeForce RTX 4090' },
        { label: 'VRAM Memory', value: '24 GB GDDR6X' },
        { label: 'Driver Version', value: 'NVIDIA 555.58.02 Vulkan 1.3' },
        { label: 'PCIe Interface', value: 'PCIe 4.0 x16' },
      ],
    },
    {
      title: 'System Memory (RAM)',
      icon: 'reorder',
      color: '#4CC9F0',
      specs: [
        { label: 'Total Capacity', value: '64 GB DDR5' },
        { label: 'Memory Speed', value: '6000 MT/s CL30' },
        { label: 'Channel Mode', value: 'Dual-Channel 2x32GB' },
        { label: 'Form Factor', value: 'UDIMM ECC' },
      ],
    },
    {
      title: 'Motherboard & System',
      icon: 'settings_input_component',
      color: '#26B170',
      specs: [
        { label: 'Board Model', value: 'ASUS ROG Crosshair X670E Hero' },
        { label: 'BIOS Version', value: 'v2204 (UEFI TPM 2.0)' },
        { label: 'System Architecture', value: 'x86_64 AMD64' },
      ],
    },
    {
      title: 'Storage Drives',
      icon: 'hard_drive',
      color: '#F5C400',
      specs: [
        { label: 'Drive 01 (Root System)', value: 'Samsung 990 PRO 2TB NVMe PCIe 4.0' },
        { label: 'Drive 02 (Vault Enclave)', value: 'WD Black SN850X 4TB NVMe PCIe 4.0' },
      ],
    },
    {
      title: 'Display & Graphics Output',
      icon: 'desktop_windows',
      color: '#94A3B8',
      specs: [
        { label: 'Primary Display', value: '3840 x 2160 (4K UHD) @ 144Hz' },
        { label: 'Color Depth & HDR', value: '10-bit RGB · HDR10 Enabled' },
        { label: 'Compositor', value: 'CassandraOS Wayland Cyber-GL' },
      ],
    },
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
            className="pointer-events-auto relative w-full max-w-[900px] h-[660px] bg-surface-container-low/95 rounded-xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl border border-surface-container-high/60"
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">hardware</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Hardware Information
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-on-surface-variant/70">
                System DMI & Hardware Telemetry
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {components.map((comp) => (
                  <div
                    key={comp.title}
                    className="bg-[#051650] border border-[#0A2472] rounded-xl p-5 space-y-3 shadow-sm hover:border-surface-container-high/60 transition-colors"
                  >
                    <div className="flex items-center gap-3 pb-2 border-b border-surface-container-high/30">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${comp.color}20`, color: comp.color }}
                      >
                        <span className="material-symbols-outlined text-lg">{comp.icon}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-on-surface">{comp.title}</h3>
                    </div>

                    <div className="space-y-2">
                      {comp.specs.map((spec) => (
                        <div key={spec.label} className="flex justify-between items-baseline text-xs">
                          <span className="text-[#94A3B8] font-medium">{spec.label}</span>
                          <span className="font-mono text-[#F8FAFC] font-semibold text-right">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

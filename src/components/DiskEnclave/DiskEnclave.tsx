import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DiskEnclaveProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiskEnclave: React.FC<DiskEnclaveProps> = ({ isOpen, onClose }) => {
  const [selectedDrive, setSelectedDrive] = useState('drive-2');
  const [isEncryptedVaultLocked, setIsEncryptedVaultLocked] = useState(false);

  const drives = [
    {
      id: 'drive-1',
      name: 'NVMe Drive 01 · System Root',
      device: '/dev/nvme0n1',
      fs: 'Btrfs Multi-Subvol',
      size: '512 GB',
      used: '348.1 GB',
      percentage: 68,
      icon: 'memory',
      color: 'text-tertiary',
    },
    {
      id: 'drive-2',
      name: 'NVMe Drive 02 · Crypt Enclave',
      device: '/dev/nvme1n1p1 · /data/secure',
      fs: 'LUKS2 AES-XTS-256',
      size: '1.5 TB',
      used: '630.0 GB',
      percentage: 42,
      icon: 'lock',
      color: 'text-tertiary',
      isSecure: true,
    },
    {
      id: 'drive-3',
      name: 'USB Vault-Ext-64G',
      device: '/dev/sdb1',
      fs: 'ExFAT Portable',
      size: '64 GB',
      used: '12.4 GB',
      percentage: 19,
      icon: 'usb',
      color: 'text-secondary',
    },
    {
      id: 'drive-4',
      name: 'Ceph / NFS Cluster Matrix',
      device: 'pool://os-storage-san04',
      fs: 'Ceph Distributed',
      size: '18.4 TB',
      used: '14.9 TB',
      percentage: 81,
      icon: 'cloud_sync',
      color: 'text-primary',
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
            className="pointer-events-auto relative w-full max-w-5xl bg-surface-container-low/95 backdrop-blur-2xl rounded-2xl shadow-[0_24px_60px_-12px_rgba(0,7,32,0.95)] flex flex-col overflow-hidden border border-surface-container-high/60 max-h-[85vh]"
          >
            {/* Titlebar Chrome */}
            <div className="h-10 px-4 bg-surface-container-lowest flex items-center justify-between cursor-move select-none border-b border-surface-container-high/40">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-[#EF4444] hover:opacity-80 transition-opacity cursor-pointer"
                  />
                  <button className="w-3 h-3 rounded-full bg-[#F5C400] hover:opacity-80 transition-opacity cursor-pointer" />
                  <button className="w-3 h-3 rounded-full bg-[#26B170] hover:opacity-80 transition-opacity cursor-pointer" />
                </div>
                <div className="h-4 w-px bg-outline-variant/30" />
                <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-xs">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    hard_drive
                  </span>
                  <span className="text-on-surface font-semibold tracking-tight">
                    CassandraOS Disk Utility & Enclave Manager
                  </span>
                  <span className="font-code-sm text-[10px] text-tertiary bg-surface-container-high px-1.5 py-0.5 rounded">
                    v3.4
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 font-code-sm text-xs text-on-surface-variant">
                <span>nodes</span>
                <span className="text-outline">/</span>
                <span>nvme0n1</span>
                <span className="text-outline">/</span>
                <span className="text-secondary font-medium">p4-luks-vault</span>
                <span className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-label-sm text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" />
                  ACTIVE_SESSION
                </span>
              </div>
            </div>

            {/* Top Telemetry & Enclave Summary Bar */}
            <div className="bg-surface-container p-4 grid grid-cols-1 md:grid-cols-4 gap-3 border-b border-surface-container-high/40">
              {/* Total Block Array */}
              <div className="flex items-center gap-3 bg-surface-container-low p-3 rounded-xl border border-surface-container-high/30">
                <div className="p-2.5 bg-primary-container/20 rounded-lg text-primary">
                  <span className="material-symbols-outlined text-[24px]">storage</span>
                </div>
                <div className="min-w-0">
                  <div className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                    Total Block Storage
                  </div>
                  <div className="font-headline-md text-sm text-on-surface font-bold tracking-tight truncate">
                    2.0 TB NVMe Gen4
                  </div>
                  <div className="font-code-sm text-[11px] text-tertiary truncate">
                    PCIe 4.0 x4 · 64 GT/s
                  </div>
                </div>
              </div>

              {/* Enclave Security Status */}
              <div className="flex items-center gap-3 bg-surface-container-low p-3 rounded-xl border border-surface-container-high/30 md:col-span-2">
                <div className="p-2.5 bg-tertiary-container/20 rounded-lg text-tertiary">
                  <span className="material-symbols-outlined text-[24px]">verified_user</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                      Cryptographic Attestation
                    </span>
                    <span className="font-code-sm text-[10px] text-tertiary bg-tertiary-container/40 px-1.5 rounded font-mono">
                      TPM 2.0 PCR[7]
                    </span>
                  </div>
                  <div className="font-body-md text-xs text-on-surface font-semibold truncate mt-0.5">
                    LUKS2 Hardware-Bound Enclave: Active & Encrypted
                  </div>
                  <div className="font-code-sm text-[11px] text-on-surface-variant flex items-center gap-2 truncate mt-0.5">
                    <span>Cipher: aes-xts-plain64</span>
                    <span className="text-outline">·</span>
                    <span>Argon2id (1024 MiB)</span>
                  </div>
                </div>
              </div>

              {/* Drive Health & Thermal */}
              <div className="flex items-center gap-3 bg-surface-container-low p-3 rounded-xl border border-surface-container-high/30">
                <div className="p-2.5 bg-surface-container-highest rounded-lg text-secondary">
                  <span className="material-symbols-outlined text-[24px]">health_metrics</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                      Array Health
                    </span>
                    <span className="font-code-sm text-xs text-tertiary font-bold">99% OK</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div className="bg-tertiary h-full rounded-full" style={{ width: '99%' }} />
                  </div>
                  <div className="font-code-sm text-[10px] text-on-surface-variant mt-1 flex justify-between">
                    <span>SMART Passed</span>
                    <span className="text-secondary font-medium">38°C Stable</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Workspace Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto bg-surface-container-lowest min-h-[420px]">
              {/* Left Column: Registered Drives */}
              <div className="lg:col-span-5 bg-surface-container-low p-4 flex flex-col justify-between gap-4 border-r border-surface-container-high/40">
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                      Registered Drives & Pools
                    </span>
                    <div className="flex items-center gap-1 text-tertiary">
                      <button className="p-1 rounded hover:bg-surface-container-high transition-colors cursor-pointer" title="Rescan Bus">
                        <span className="material-symbols-outlined text-[16px]">sync</span>
                      </button>
                    </div>
                  </div>

                  {/* Drive List Cards */}
                  {drives.map((drv) => {
                    const isSelected = selectedDrive === drv.id;
                    return (
                      <div
                        key={drv.id}
                        onClick={() => setSelectedDrive(drv.id)}
                        className={`p-3 rounded-xl transition-all cursor-pointer border shadow-sm ${
                          isSelected
                            ? 'bg-surface-container-high border-tertiary/50 shadow-[0_0_12px_rgba(91,213,252,0.15)]'
                            : 'bg-surface-container hover:bg-surface-container-high/60 border-surface-container-high/30'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <span className={`material-symbols-outlined text-[20px] ${drv.color}`}>
                              {drv.icon}
                            </span>
                            <div>
                              <div className="font-body-sm text-xs text-on-surface font-semibold flex items-center gap-1.5">
                                {drv.name}
                                {drv.isSecure && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary shadow-[0_0_6px_#5bd5fc]" />
                                )}
                              </div>
                              <div className="font-code-sm text-[11px] text-on-surface-variant">
                                {drv.device}
                              </div>
                            </div>
                          </div>
                          <span className="font-code-sm text-xs text-secondary bg-surface-container-highest px-2 py-0.5 rounded font-mono">
                            {drv.size}
                          </span>
                        </div>

                        <div className="mt-2.5">
                          <div className="flex justify-between font-label-sm text-[10px] text-on-surface-variant mb-1">
                            <span>{drv.used} allocated</span>
                            <span className="text-tertiary font-code-sm text-xs">{drv.percentage}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                            <div
                              className="h-full bg-tertiary rounded-full"
                              style={{ width: `${drv.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Selected Drive Inspector */}
              <div className="lg:col-span-7 p-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-surface-container-high/40">
                    <div>
                      <h3 className="font-headline-md text-base text-on-surface font-bold">
                        LUKS2 Hardware Vault Inspector
                      </h3>
                      <p className="font-code-sm text-xs text-tertiary">
                        Target: /dev/nvme1n1p1 (Mounted at /data/secure)
                      </p>
                    </div>

                    <button
                      onClick={() => setIsEncryptedVaultLocked((prev) => !prev)}
                      className={`px-3 py-1.5 rounded-lg font-body-sm text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                        isEncryptedVaultLocked
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-tertiary/20 text-tertiary border border-tertiary/40 shadow-[0_0_12px_rgba(91,213,252,0.3)]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isEncryptedVaultLocked ? 'lock' : 'lock_open'}
                      </span>
                      <span>{isEncryptedVaultLocked ? 'Vault Locked' : 'Vault Unlocked'}</span>
                    </button>
                  </div>

                  {/* Encryption Details Table */}
                  <div className="grid grid-cols-2 gap-4 my-6">
                    <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-high/40">
                      <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider block mb-1">
                        Cipher Algorithm
                      </span>
                      <span className="font-code-sm text-xs text-on-surface font-bold">
                        AES-256-XTS-PLAIN64
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-high/40">
                      <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider block mb-1">
                        Key Slot Matrix
                      </span>
                      <span className="font-code-sm text-xs text-tertiary font-bold">
                        Slot 0 [TPM2] · Slot 1 [FIDO2 Key]
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-high/40">
                      <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider block mb-1">
                        Sector Payload
                      </span>
                      <span className="font-code-sm text-xs text-on-surface font-bold">
                        4096-byte Native Direct IO
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-surface-container-low border border-surface-container-high/40">
                      <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider block mb-1">
                        Mount Flags
                      </span>
                      <span className="font-code-sm text-xs text-emerald-400 font-bold">
                        rw,noatime,compress=zstd:1
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Partition Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-container-high/40">
                  <button className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-body-sm text-xs hover:bg-surface-container-highest cursor-pointer border border-surface-container-highest">
                    Check File System
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-body-sm text-xs font-semibold hover:bg-primary cursor-pointer shadow-md">
                    Rekey Enclave
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

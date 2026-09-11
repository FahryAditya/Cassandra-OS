import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VpnSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VpnProfile {
  id: string;
  name: string;
  protocol: 'WireGuard' | 'OpenVPN' | 'eBPF Mesh';
  server: string;
  location: string;
  connected: boolean;
}

export const VpnSettings: React.FC<VpnSettingsProps> = ({ isOpen, onClose }) => {
  const [profiles, setProfiles] = useState<VpnProfile[]>([
    {
      id: 'vpn-1',
      name: 'CyberShield Tokyo Node 01',
      protocol: 'WireGuard',
      server: 'tokyo-jp01.cassandra-mesh.net',
      location: 'Tokyo, Japan',
      connected: true,
    },
    {
      id: 'vpn-2',
      name: 'Secure Vault Frankfurt',
      protocol: 'WireGuard',
      server: 'fra-de04.cassandra-mesh.net',
      location: 'Frankfurt, Germany',
      connected: false,
    },
    {
      id: 'vpn-3',
      name: 'Enterprise OpenVPN Bridge',
      protocol: 'OpenVPN',
      server: 'ovpn-us.corp-enclave.io',
      location: 'Virginia, USA',
      connected: false,
    },
    {
      id: 'vpn-4',
      name: 'Zero-Trust eBPF Mesh Shield',
      protocol: 'eBPF Mesh',
      server: 'ebpf-cluster.internal',
      location: 'Spatial Mesh Node',
      connected: false,
    },
  ]);

  const [connectingId, setConnectingId] = useState<string | null>(null);

  const activeVpn = profiles.find((p) => p.connected);

  const toggleConnect = (id: string) => {
    setConnectingId(id);
    setTimeout(() => {
      setConnectingId(null);
      setProfiles((prev) =>
        prev.map((p) => ({
          ...p,
          connected: p.id === id ? !p.connected : false,
        }))
      );
    }, 1200);
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">vpn_key</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    VPN & Mesh Tunnel Manager
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-[#4CC9F0]">
                WireGuard / eBPF Tunnel
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* VPN Status Banner */}
              <div className="bg-[#051650] border border-surface-container-high/40 rounded-xl p-6 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center border ${
                    activeVpn
                      ? 'bg-[#26B170]/10 border-[#26B170]/30 text-[#26B170]'
                      : 'bg-surface-container-high text-[#94A3B8]'
                  }`}>
                    <span className="material-symbols-outlined text-3xl">shield_lock</span>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
                      VPN Connection: {activeVpn ? 'Protected' : 'Disconnected'}
                    </h2>
                    <p className="text-xs text-[#94A3B8] mt-1">
                      {activeVpn ? (
                        <>
                          Connected to <span className="text-[#4CC9F0] font-semibold">{activeVpn.name}</span> ({activeVpn.location}) · Uptime: 03h 42m
                        </>
                      ) : (
                        'System traffic is unencrypted. Connect to a VPN tunnel below.'
                      )}
                    </p>
                  </div>
                </div>

                {activeVpn && (
                  <button
                    onClick={() => toggleConnect(activeVpn.id)}
                    className="px-4 py-2 bg-[#EF4444] hover:bg-[#EF4444]/90 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm shrink-0 cursor-pointer"
                  >
                    Disconnect
                  </button>
                )}
              </div>

              {/* Saved Profiles List */}
              <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary text-lg">vpn_lock</span>
                    Saved VPN Configurations
                  </h3>
                  <button className="px-3 py-1.5 border border-[#4361EE] text-[#4361EE] hover:bg-[#4361EE]/10 text-xs rounded-lg font-semibold transition-colors flex items-center gap-1 cursor-pointer">
                    <span className="material-symbols-outlined text-sm">add</span>
                    Add VPN Connection
                  </button>
                </div>

                <div className="space-y-3">
                  {profiles.map((p) => (
                    <div
                      key={p.id}
                      className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${
                        p.connected
                          ? 'bg-[#4361EE]/15 border-[#4361EE]'
                          : 'bg-[#051650]/60 border-surface-container-high/40 hover:border-surface-container-high/80'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="material-symbols-outlined text-[#4CC9F0] text-2xl">
                          public
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-on-surface">{p.name}</span>
                            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-[#4CC9F0] text-[10px] font-mono font-bold">
                              {p.protocol}
                            </span>
                          </div>
                          <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
                            {p.server} · {p.location}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleConnect(p.id)}
                        disabled={connectingId === p.id}
                        className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-sm ${
                          p.connected
                            ? 'bg-[#26B170] text-white'
                            : 'bg-[#4361EE] hover:bg-[#4361EE]/90 text-white'
                        }`}
                      >
                        {connectingId === p.id
                          ? 'Connecting...'
                          : p.connected
                          ? 'Active'
                          : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

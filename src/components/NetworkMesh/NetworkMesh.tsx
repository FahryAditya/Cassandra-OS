import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NetworkMeshProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NetworkMesh: React.FC<NetworkMeshProps> = ({ isOpen, onClose }) => {
  const [activePolicy, setActivePolicy] = useState<'strict' | 'balanced' | 'permissive'>('strict');
  const [wireguardActive, setWireguardActive] = useState(true);

  const nics = [
    {
      id: 'wlan0',
      name: 'wlan0',
      type: 'Wi-Fi 6E',
      status: 'UP',
      ip: '192.168.10.42/24',
      ssid: 'CASS-NET-5G',
      speed: '1.2 Gbps link',
      color: 'text-tertiary',
      active: true,
    },
    {
      id: 'eth0',
      name: 'eth0',
      type: '10 GbE SFP+',
      status: 'UP',
      ip: '10.0.1.100/16',
      ssid: 'Trunk Optical Mesh',
      speed: '10.0 Gbps link',
      color: 'text-primary',
      active: true,
    },
    {
      id: 'wg0',
      name: 'wg0',
      type: 'WireGuard Tunnel',
      status: wireguardActive ? 'UP' : 'DOWN',
      ip: '10.4.0.1/32',
      ssid: 'Zero-Trust Overlay',
      speed: 'Overlay Mesh',
      color: 'text-emerald-400',
      active: wireguardActive,
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
            className="pointer-events-auto relative w-full max-w-6xl bg-surface-container-low/95 backdrop-blur-2xl rounded-2xl shadow-[0_24px_60px_-12px_rgba(0,7,32,0.95)] flex flex-col overflow-hidden border border-surface-container-high/60 max-h-[88vh]"
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
                    shield_lock
                  </span>
                  <span className="text-on-surface font-semibold tracking-tight">
                    Cassandra Network Shield & Mesh Topology
                  </span>
                  <span className="font-code-sm text-[10px] text-tertiary bg-surface-container-high px-1.5 py-0.5 rounded">
                    v3.4-prod
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-on-surface-variant font-code-sm text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_#5bd5fc]" />
                  <span className="uppercase text-[11px]">ACTIVE MESH // 0.04ms Latency</span>
                </div>
                <div className="h-3 w-px bg-surface-container-highest" />
                <button
                  onClick={() => setWireguardActive((prev) => !prev)}
                  className="flex items-center gap-1 text-tertiary cursor-pointer hover:underline"
                >
                  <span className="material-symbols-outlined text-[15px]">vpn_key</span>
                  <span>{wireguardActive ? 'WG0-ACTIVE' : 'WG0-OFF'}</span>
                </button>
              </div>
            </div>

            {/* Subheader Telemetry */}
            <div className="bg-surface-container px-6 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-surface-container-high/40">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded bg-surface-container-high text-tertiary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">security</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-[10px] text-on-surface-variant font-semibold">
                      eBPF PACKET FILTER
                    </span>
                    <span className="font-code-md text-xs text-on-surface font-medium flex items-center gap-1">
                      ACTIVE KERNEL HOOK
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded bg-surface-container-high text-tertiary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">health_and_safety</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-[10px] text-on-surface-variant font-semibold">
                      THREAT LEVEL ASSESS
                    </span>
                    <span className="font-code-md text-xs text-[#26B170] font-bold">
                      0.02% (NOMINAL)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded bg-surface-container-high text-tertiary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">dns</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-[10px] text-on-surface-variant font-semibold">
                      ENCRYPTED RESOLVER
                    </span>
                    <span className="font-code-md text-xs text-on-surface font-mono">
                      DoH 1.1.1.1 + Pi-hole Mirror
                    </span>
                  </div>
                </div>
              </div>

              {/* Policy Selectors */}
              <div className="flex items-center gap-2">
                {(['strict', 'balanced', 'permissive'] as const).map((pol) => (
                  <button
                    key={pol}
                    onClick={() => setActivePolicy(pol)}
                    className={`font-code-sm text-xs px-2.5 py-1 rounded capitalize transition-all cursor-pointer border ${
                      activePolicy === pol
                        ? 'bg-primary-container text-on-primary-container font-bold border-primary-container/40 shadow-md'
                        : 'bg-surface-container-highest text-on-surface-variant border-surface-container-highest hover:text-on-surface'
                    }`}
                  >
                    Policy: {pol}
                  </button>
                ))}
              </div>
            </div>

            {/* Metric Ribbon */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-surface-container-low border-b border-surface-container-high/40">
              {/* Throughput Card */}
              <div className="bg-surface-container p-4 rounded-xl flex flex-col justify-between shadow-sm border border-surface-container-high/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-semibold">
                    Throughput (Live)
                  </span>
                  <span className="material-symbols-outlined text-tertiary text-[18px]">
                    swap_vert
                  </span>
                </div>
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline-md text-xl text-tertiary font-bold">48.2</span>
                      <span className="font-code-sm text-[10px] text-on-surface-variant">MB/s IN</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-headline-md text-xl text-secondary font-bold">12.6</span>
                      <span className="font-code-sm text-[10px] text-on-surface-variant">MB/s OUT</span>
                    </div>
                  </div>

                  <svg className="w-24 h-10 text-tertiary" fill="none" viewBox="0 0 100 40">
                    <path
                      d="M0 32 Q 15 35, 25 18 T 50 24 T 75 8 T 100 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0 32 Q 15 35, 25 18 T 50 24 T 75 8 T 100 12 L 100 40 L 0 40 Z"
                      fill="currentColor"
                      fillOpacity="0.12"
                    />
                  </svg>
                </div>
                <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full" style={{ width: '68%' }} />
                </div>
              </div>

              {/* Sockets Card */}
              <div className="bg-surface-container p-4 rounded-xl flex flex-col justify-between shadow-sm border border-surface-container-high/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-semibold">
                    Active Sockets
                  </span>
                  <span className="material-symbols-outlined text-primary text-[18px]">hub</span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-headline-xl text-2xl text-on-surface font-bold">418</span>
                  <span className="font-code-sm text-[11px] text-tertiary">ESTABLISHED</span>
                </div>
                <div className="flex items-center justify-between font-code-sm text-[11px] text-on-surface-variant">
                  <span>TCP: 362</span>
                  <span>UDP: 48</span>
                  <span>RAW: 8</span>
                </div>
              </div>

              {/* Blocked Threats Card */}
              <div className="bg-surface-container p-4 rounded-xl flex flex-col justify-between shadow-sm border border-surface-container-high/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-semibold">
                    Blocked Threats (24H)
                  </span>
                  <span className="material-symbols-outlined text-[#EF4444] text-[18px]">
                    gpp_bad
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-headline-xl text-2xl text-[#EF4444] font-bold">142</span>
                  <span className="font-code-sm text-[11px] text-on-surface-variant">UNAUTH PROBES</span>
                </div>
                <div className="flex items-center justify-between font-code-sm text-[11px] text-on-surface-variant">
                  <span className="text-tertiary font-mono">45.143.22.9</span>
                  <span>DROP AUTO</span>
                </div>
              </div>

              {/* Topology Convergence */}
              <div className="bg-surface-container p-4 rounded-xl flex flex-col justify-between shadow-sm border border-surface-container-high/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-semibold">
                    Topology Convergence
                  </span>
                  <span className="material-symbols-outlined text-[#26B170] text-[18px]">lan</span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-headline-xl text-2xl text-[#26B170] font-bold">100%</span>
                  <span className="font-code-sm text-[11px] text-on-surface-variant">3/3 PEERS SYNC</span>
                </div>
                <div className="flex items-center justify-between font-code-sm text-[11px] text-on-surface-variant">
                  <span>MTU: 1420 (WG)</span>
                  <span className="text-secondary font-medium">eBGP Mesh v4/v6</span>
                </div>
              </div>
            </div>

            {/* Main Workspace Split */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 p-6 overflow-y-auto bg-surface">
              {/* Left: Hardware NICs */}
              <div className="xl:col-span-5 flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary text-[18px]">
                      settings_ethernet
                    </span>
                    <span className="font-headline-md text-sm text-on-surface font-semibold">
                      Physical & Virtual Interfaces
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  {nics.map((nic) => (
                    <div
                      key={nic.id}
                      className="bg-surface-container p-3.5 rounded-xl flex flex-col gap-2 border border-surface-container-high/40 hover:border-tertiary/40 transition-all shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className={`material-symbols-outlined text-[20px] ${nic.color}`}>
                            {nic.id === 'wlan0' ? 'wifi' : nic.id === 'eth0' ? 'cable' : 'vpn_key'}
                          </span>
                          <span className="font-code-md text-xs text-on-surface font-bold">
                            {nic.name}
                          </span>
                          <span className="font-code-sm text-[10px] bg-surface-container-lowest text-tertiary px-1.5 py-0.5 rounded font-mono">
                            {nic.type}
                          </span>
                        </div>
                        <span
                          className={`font-code-sm text-xs flex items-center gap-1 font-bold ${
                            nic.active ? 'text-[#26B170]' : 'text-error'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              nic.active ? 'bg-[#26B170]' : 'bg-error'
                            }`}
                          />
                          {nic.status}
                        </span>
                      </div>

                      <div className="flex justify-between font-code-sm text-[11px] text-on-surface-variant">
                        <span>{nic.ssid}</span>
                        <span className="text-tertiary font-mono">{nic.speed}</span>
                      </div>
                      <div className="flex justify-between font-code-sm text-[11px] text-on-surface-variant font-mono">
                        <span>IP: {nic.ip}</span>
                        <span>MTU: 1500</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Security Matrix & Realtime Logs */}
              <div className="xl:col-span-7 flex flex-col justify-between gap-4">
                <div className="bg-surface-container-low p-4 rounded-xl border border-surface-container-high/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-surface-container-high/40 pb-2">
                    <span className="font-headline-md text-sm text-on-surface font-bold">
                      Zero-Trust Firewall Matrix Logs
                    </span>
                    <span className="font-code-sm text-[10px] text-tertiary">
                      Tail: 100 events/sec
                    </span>
                  </div>

                  <div className="bg-surface-container-lowest p-3 rounded-lg font-code-sm text-xs space-y-1.5 text-on-surface font-mono overflow-x-auto">
                    <p className="text-emerald-400">
                      [PASS] ACCEPT IN=wlan0 SRC=192.168.10.1 DST=192.168.10.42 PROTO=TCP SPT=443 DPT=52190
                    </p>
                    <p className="text-red-400">
                      [DROP] REJECT IN=eth0 SRC=45.143.22.9 DST=10.0.1.100 PROTO=TCP SPT=42100 DPT=22 SYN-FLOOD
                    </p>
                    <p className="text-tertiary">
                      [VPN] MESH-HANDSHAKE wg0 PEER=[sg-ap-east-gw.cassandra.net:51820] LATENCY=0.04ms
                    </p>
                    <p className="text-on-surface-variant">
                      [DNS] RESOLVED doh.1.1.1.1 query="api.github.com" A=140.82.121.4
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-body-sm text-xs hover:bg-surface-container-highest cursor-pointer border border-surface-container-highest">
                    Flush eBPF Cache
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-body-sm text-xs font-semibold hover:bg-primary cursor-pointer shadow-md">
                    Update Mesh Rules
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

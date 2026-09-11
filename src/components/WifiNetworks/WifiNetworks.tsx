import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WifiNetworksProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WifiNetwork {
  id: string;
  name: string;
  signal: number; // 1 to 4
  isLocked: boolean;
  isConnected?: boolean;
  security?: string;
}

export const WifiNetworks: React.FC<WifiNetworksProps> = ({ isOpen, onClose }) => {
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [connectingId, setConnectingId] = useState<string | null>(null);

  const [connectedNetwork, setConnectedNetwork] = useState<WifiNetwork>({
    id: 'wifi-active',
    name: 'CassandraOS-5G-Node',
    signal: 4,
    isLocked: true,
    isConnected: true,
    security: 'WPA3 Enterprise',
  });

  const [availableNetworks, setAvailableNetworks] = useState<WifiNetwork[]>([
    { id: 'wifi-1', name: 'CyberLab_Mesh_Alpha', signal: 4, isLocked: true, security: 'WPA2 Personal' },
    { id: 'wifi-2', name: 'Quantum_Air_Guest', signal: 3, isLocked: false, security: 'Open' },
    { id: 'wifi-3', name: 'Matrix_Starlink_04', signal: 2, isLocked: true, security: 'WPA3 Personal' },
    { id: 'wifi-4', name: 'CassandraOS-2.4G-Legacy', signal: 1, isLocked: true, security: 'WPA2 Personal' },
  ]);

  const handleConnect = (net: WifiNetwork) => {
    if (!net.isLocked) {
      // Connect directly
      setConnectingId(net.id);
      setTimeout(() => {
        setConnectingId(null);
        const prevConnected = connectedNetwork;
        setConnectedNetwork({ ...net, isConnected: true });
        setAvailableNetworks((prev) =>
          prev.filter((n) => n.id !== net.id).concat(prevConnected ? [{ ...prevConnected, isConnected: false }] : [])
        );
      }, 1000);
      return;
    }

    if (selectedNetwork === net.id) {
      if (!passwordInput) return;
      setConnectingId(net.id);
      setTimeout(() => {
        setConnectingId(null);
        setSelectedNetwork(null);
        setPasswordInput('');
        const prevConnected = connectedNetwork;
        setConnectedNetwork({ ...net, isConnected: true });
        setAvailableNetworks((prev) =>
          prev.filter((n) => n.id !== net.id).concat(prevConnected ? [{ ...prevConnected, isConnected: false }] : [])
        );
      }, 1200);
    } else {
      setSelectedNetwork(net.id);
      setPasswordInput('');
    }
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
            className="pointer-events-auto relative w-full max-w-[840px] h-[640px] bg-surface-container-low/95 rounded-xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl border border-surface-container-high/60"
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">wifi</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Wi-Fi Networks
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-[#4CC9F0]">
                wlan0 · 802.11ax Wi-Fi 6E
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Wi-Fi Switch Header */}
              <div className="bg-[#051650] border border-surface-container-high/40 rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary text-2xl">wifi</span>
                  <div>
                    <h2 className="text-base font-bold text-on-surface">Wi-Fi Wireless Adapter</h2>
                    <p className="text-xs text-[#94A3B8]">
                      {wifiEnabled ? 'Searching for 2.4GHz & 5GHz wireless networks...' : 'Wi-Fi radio disabled.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setWifiEnabled(!wifiEnabled)}
                  className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer ${
                    wifiEnabled ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                      wifiEnabled ? 'translate-x-5.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {wifiEnabled && (
                <>
                  {/* Connected Network Card */}
                  {connectedNetwork && (
                    <div className="bg-[#4361EE]/15 border border-[#4361EE] rounded-xl p-5 shadow-md flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#4361EE]/20 flex items-center justify-center text-[#4CC9F0]">
                          <span className="material-symbols-outlined text-2xl">wifi_tethering</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-on-surface">{connectedNetwork.name}</h3>
                            <span className="px-2 py-0.5 rounded-full bg-[#26B170]/20 text-[#26B170] text-[10px] font-bold">
                              CONNECTED
                            </span>
                          </div>
                          <p className="text-xs text-[#94A3B8] mt-0.5">
                            {connectedNetwork.security} · Signal Strong (1200 Mbps) · IP 192.168.1.104
                          </p>
                        </div>
                      </div>

                      <button className="p-2 rounded-lg bg-surface-container-high/60 text-on-surface hover:bg-surface-container-high transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-lg">settings</span>
                      </button>
                    </div>
                  )}

                  {/* Available Networks List */}
                  <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-3">
                    <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-tertiary text-lg">network_wifi</span>
                      Available Networks
                    </h3>

                    <div className="space-y-2">
                      {availableNetworks.map((net) => {
                        const isExpanded = selectedNetwork === net.id;
                        return (
                          <div
                            key={net.id}
                            className="bg-[#051650]/60 border border-surface-container-high/40 rounded-lg overflow-hidden transition-all"
                          >
                            <div
                              onClick={() => handleConnect(net)}
                              className="p-3.5 flex items-center justify-between hover:bg-surface-container-high/40 transition-colors cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#4CC9F0] text-xl">
                                  network_wifi
                                </span>
                                <div>
                                  <p className="text-sm font-semibold text-on-surface flex items-center gap-2">
                                    {net.name}
                                    {net.isLocked && (
                                      <span className="material-symbols-outlined text-[#94A3B8] text-xs">
                                        lock
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-xs text-[#94A3B8]">{net.security}</p>
                                </div>
                              </div>

                              <button className="px-3.5 py-1.5 bg-[#4361EE] hover:bg-[#4361EE]/90 text-white text-xs rounded-lg font-medium transition-colors cursor-pointer shadow-sm">
                                {connectingId === net.id ? 'Connecting...' : 'Connect'}
                              </button>
                            </div>

                            {/* Inline Password Entry if locked & selected */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="px-4 pb-3 pt-1 border-t border-surface-container-high/30 bg-surface-container-lowest flex items-center gap-2"
                                >
                                  <input
                                    type="password"
                                    placeholder="Enter Wi-Fi Password..."
                                    value={passwordInput}
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                    className="flex-1 h-8 px-3 bg-surface-container-high text-on-surface text-xs rounded-lg outline-none border border-surface-container-high/60"
                                  />
                                  <button
                                    onClick={() => handleConnect(net)}
                                    className="h-8 px-3 bg-[#4361EE] text-white text-xs rounded-lg font-medium cursor-pointer"
                                  >
                                    Join
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>

                    <button className="w-full pt-3 text-center text-xs font-semibold text-[#4CC9F0] hover:underline flex items-center justify-center gap-1 cursor-pointer">
                      <span className="material-symbols-outlined text-sm">wifi_find</span>
                      Connect to hidden network...
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [sshKeys] = useState([
    { name: 'id_ed25519_cass_dev', fingerprint: 'SHA256:8f4a...9b12', added: '2 days ago' },
    { name: 'id_rsa_workstation', fingerprint: 'SHA256:1c92...4e80', added: '1 month ago' },
  ]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto relative w-full max-w-[1020px] h-[640px] bg-surface-container-low/95 backdrop-blur-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-surface-container-high/60"
          >
            {/* Window Chrome */}
            <div className="h-9 px-4 bg-surface-container-lowest/90 flex items-center justify-between shrink-0 select-none border-b border-surface-container-high/40">
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
                  <span className="material-symbols-outlined text-tertiary text-[16px]">badge</span>
                  <span className="font-semibold text-on-surface">User Profile & Access Control</span>
                  <span className="font-code-sm text-[10px] text-tertiary px-1.5 py-0.5 rounded bg-surface-container">
                    UID: 1000
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 font-code-sm text-xs text-on-surface-variant">
                <span className="text-tertiary">PAM Auth: Strict</span>
                <span className="text-outline">|</span>
                <span>Enclave Keyring Secured</span>
              </div>
            </div>

            {/* Main Split Layout */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Sub-nav */}
              <aside className="w-64 bg-surface-container/70 p-4 flex flex-col justify-between shrink-0 border-r border-surface-container-high/40">
                <div className="space-y-2">
                  <span className="font-label-sm text-[10px] text-outline uppercase tracking-wider block px-2 mb-1">
                    Identity & Security
                  </span>
                  {[
                    { id: 'profile', name: 'Profile & Identity', icon: 'badge' },
                    { id: 'mfa', name: 'Auth & MFA (FIDO2)', icon: 'key' },
                    { id: 'ssh', name: 'SSH Public Keys', icon: 'terminal', badge: '2 Active' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-body-sm text-xs transition-colors text-left cursor-pointer ${
                        activeTab === item.id
                          ? 'bg-surface-container-high text-tertiary font-bold shadow-sm'
                          : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="font-code-sm text-[10px] px-1.5 py-0.5 rounded bg-surface-container-highest text-tertiary">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </aside>

              {/* Right Content */}
              <main className="flex-1 p-6 overflow-y-auto bg-surface-container-lowest/30 space-y-6">
                {/* User Identity Banner Card */}
                <div className="p-6 rounded-2xl bg-surface-container-high/40 border border-surface-container-high/40 flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full p-[3px] bg-gradient-to-tr from-primary via-tertiary to-primary shadow-lg shrink-0">
                    <div className="w-full h-full rounded-full bg-surface-container-highest flex items-center justify-center">
                      <span className="material-symbols-outlined text-[40px] text-tertiary">person</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-on-surface tracking-tight">
                      Cassandra Developer
                    </h2>
                    <p className="font-code-sm text-xs text-secondary font-mono">
                      @cass_dev · System Administrator (sudo wheel group)
                    </p>
                    <span className="inline-block font-code-sm text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 mt-1">
                      ● Session Active (Wayland x64)
                    </span>
                  </div>
                </div>

                {/* SSH Keys List Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-md text-sm font-bold text-on-surface">
                      Registered SSH Keys & Public Enclaves
                    </h3>
                    <button className="px-3 py-1 rounded-lg bg-tertiary/20 text-tertiary border border-tertiary/30 font-code-sm text-xs hover:bg-tertiary/30 transition-colors cursor-pointer">
                      + Add SSH Key
                    </button>
                  </div>

                  <div className="space-y-2">
                    {sshKeys.map((key) => (
                      <div
                        key={key.name}
                        className="p-4 rounded-xl bg-surface-container-high/40 border border-surface-container-high/40 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-tertiary text-[20px]">
                            key
                          </span>
                          <div>
                            <span className="font-mono text-xs font-bold text-on-surface block">
                              {key.name}
                            </span>
                            <span className="font-mono text-[11px] text-on-surface-variant">
                              {key.fingerprint}
                            </span>
                          </div>
                        </div>
                        <span className="font-code-sm text-[10px] text-outline">{key.added}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </main>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

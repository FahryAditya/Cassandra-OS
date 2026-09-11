import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  ShieldCheck,
  Play,
  Octagon,
  Trash2,
  Lock,
  Globe,
  Camera,
  Folder,
  Zap,
  Cpu,
  CheckCircle2
} from 'lucide-react';

interface AppPermission {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

export const AppDetails: React.FC = () => {
  const [permissions, setPermissions] = useState<AppPermission[]>([
    { id: 'network', name: 'Network Access', description: 'Allow app to send and receive socket packets', icon: <Globe className="w-4 h-4 text-[#4CC9F0]" />, enabled: true },
    { id: 'filesystem', name: 'File System Access', description: 'Full access to user Documents and Downloads', icon: <Folder className="w-4 h-4 text-[#F5C400]" />, enabled: true },
    { id: 'media', name: 'Camera & Microphone', description: 'Capture audio streams and video feeds', icon: <Camera className="w-4 h-4 text-[#EF4444]" />, enabled: false },
    { id: 'background', name: 'Background Execution', description: 'Run worker threads when app window is closed', icon: <Zap className="w-4 h-4 text-[#26B170]" />, enabled: true },
    { id: 'gpu', name: 'Hardware Acceleration', description: 'Direct access to Vulkan / WebGPU pipelines', icon: <Cpu className="w-4 h-4 text-[#4361EE]" />, enabled: true },
  ]);

  const [isRunning, setIsRunning] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const togglePermission = (id: string) => {
    setPermissions(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleForceStop = () => {
    setIsRunning(false);
    showToast('Application process terminated');
  };

  const handleLaunch = () => {
    setIsRunning(true);
    showToast('Application launched successfully');
  };

  return (
    <div className="h-full w-full bg-[#000720] text-slate-100 p-6 overflow-y-auto flex flex-col gap-6 selection:bg-[#4361EE] selection:text-white">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#051650]/80 via-[#051650]/40 to-slate-900/60 border border-slate-800/80 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4361EE] to-[#4CC9F0] p-0.5 flex items-center justify-center shadow-lg shadow-[#4361EE]/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-3xl">
              ⚡
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-wide text-white">Quantum Code IDE</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#26B170]/10 border border-[#26B170]/30 text-[#26B170] text-[11px] font-semibold">
                v2.8.4 Stable
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Developer Tools • Vendor: Cassandra Open Systems • Open Source License</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {isRunning ? (
            <button
              onClick={handleForceStop}
              className="px-4 py-2 rounded-xl bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/30 text-[#EF4444] text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Octagon className="w-4 h-4" />
              Force Stop
            </button>
          ) : (
            <button
              onClick={handleLaunch}
              className="px-4 py-2 rounded-xl bg-[#26B170]/10 hover:bg-[#26B170]/20 border border-[#26B170]/30 text-[#26B170] text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <Play className="w-4 h-4" />
              Launch App
            </button>
          )}

          <button
            onClick={() => showToast('App uninstallation initiated')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Trash2 className="w-4 h-4 text-slate-400" />
            Uninstall
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="px-4 py-2.5 rounded-xl bg-[#26B170]/20 border border-[#26B170]/40 text-[#26B170] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {toastMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Metadata & Details */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#051650]/40 border border-slate-800/80 space-y-4">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Package className="w-4 h-4 text-[#4CC9F0]" />
              App Specifications
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Installed Date</span>
                <span className="font-semibold text-slate-200">2026-08-14</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Architecture</span>
                <span className="font-semibold text-slate-200">x86_64 / WebAssembly</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">Total Binary Size</span>
                <span className="font-semibold text-slate-200">1.25 GB</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800/60">
                <span className="text-slate-400">User Data Size</span>
                <span className="font-semibold text-slate-200">890 MB</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">Sandbox Isolation</span>
                <span className="px-2 py-0.5 rounded bg-[#26B170]/20 text-[#26B170] text-[10px] font-bold">
                  Strict Sandbox
                </span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#051650]/40 border border-slate-800/80 space-y-4">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#F5C400]" />
              Security Integrity
            </h2>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#26B170]">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-semibold">Cryptographically Signed</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Publisher certificate verified by Cassandra Security Authority. SHA-256 binary fingerprint matches release manifest.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Permissions & Capabilities */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-2xl bg-[#051650]/40 border border-slate-800/80 space-y-4">
            <div>
              <h2 className="text-sm font-bold text-slate-200">Permissions & Capabilities</h2>
              <p className="text-xs text-slate-400 mt-0.5">Control system access rights granted to this application</p>
            </div>

            <div className="space-y-3">
              {permissions.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      {p.icon}
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-slate-200">{p.name}</h3>
                      <p className="text-[11px] text-slate-400">{p.description}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => togglePermission(p.id)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
                      p.enabled ? 'bg-[#4361EE]' : 'bg-slate-800'
                    }`}
                  >
                    <motion.div
                      layout
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className={`bg-white w-4 h-4 rounded-full shadow-md ${
                        p.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetails;

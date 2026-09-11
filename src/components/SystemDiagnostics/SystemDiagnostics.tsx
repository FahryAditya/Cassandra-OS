import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  BatteryCharging,
  ShieldCheck,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Zap
} from 'lucide-react';

interface DiagnosticCheck {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  status: 'passed' | 'warning' | 'error' | 'pending';
  value: string;
  details: string;
}

export const SystemDiagnostics: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(100);
  const [lastScanTime, setLastScanTime] = useState<string>('Today at 05:45 AM');

  const [checks, setChecks] = useState<DiagnosticCheck[]>([
    {
      id: 'cpu',
      name: 'CPU & Multi-Core Thermal Stress Test',
      category: 'Processor',
      icon: <Cpu className="w-5 h-5 text-[#4361EE]" />,
      status: 'passed',
      value: '42°C • 0 Throttling',
      details: 'All 8 logical cores passed load testing without frequency throttling'
    },
    {
      id: 'ram',
      name: 'Memory Integrity & Allocation Test',
      category: 'RAM',
      icon: <Activity className="w-5 h-5 text-[#4CC9F0]" />,
      status: 'passed',
      value: '16.0 GB • 0 Bit Errors',
      details: 'Page buffer allocations verified with zero memory faults detected'
    },
    {
      id: 'storage',
      name: 'NVMe Storage SMART Health & Read/Write',
      category: 'Storage',
      icon: <HardDrive className="w-5 h-5 text-[#26B170]" />,
      status: 'passed',
      value: '99% Health • 3450 MB/s',
      details: 'SMART self-test passed, no bad blocks or degraded sectors'
    },
    {
      id: 'network',
      name: 'Network Adapter & Packet Loss Latency',
      category: 'Network',
      icon: <Wifi className="w-5 h-5 text-[#F5C400]" />,
      status: 'warning',
      value: '1.2% Packet Loss (wlan0)',
      details: 'Slight packet drop detected on wireless link; ethernet cable recommended'
    },
    {
      id: 'battery',
      name: 'Battery Cycle & Controller Calibration',
      category: 'Power Subsystem',
      icon: <BatteryCharging className="w-5 h-5 text-[#26B170]" />,
      status: 'passed',
      value: '94% Original Capacity',
      details: 'Battery controller reports healthy voltage curves across all 4 cells'
    },
    {
      id: 'sensors',
      name: 'Hardware Thermal & System Bus Sensors',
      category: 'Motherboard',
      icon: <Zap className="w-5 h-5 text-[#4361EE]" />,
      status: 'passed',
      value: '12 Sensors Synchronized',
      details: 'Voltage rails (12V, 5V, 3.3V) stable within ±0.5% tolerance'
    }
  ]);

  const runFullDiagnostics = () => {
    setIsRunning(true);
    setProgress(0);

    // Reset checks to pending state during test
    setChecks(prev => prev.map(c => ({ ...c, status: 'pending' })));

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setIsRunning(false);
        setLastScanTime('Just now');
        // Restore check statuses
        setChecks([
          {
            id: 'cpu',
            name: 'CPU & Multi-Core Thermal Stress Test',
            category: 'Processor',
            icon: <Cpu className="w-5 h-5 text-[#4361EE]" />,
            status: 'passed',
            value: '40°C • 0 Throttling',
            details: 'All 8 logical cores passed load testing without frequency throttling'
          },
          {
            id: 'ram',
            name: 'Memory Integrity & Allocation Test',
            category: 'RAM',
            icon: <Activity className="w-5 h-5 text-[#4CC9F0]" />,
            status: 'passed',
            value: '16.0 GB • 0 Bit Errors',
            details: 'Page buffer allocations verified with zero memory faults detected'
          },
          {
            id: 'storage',
            name: 'NVMe Storage SMART Health & Read/Write',
            category: 'Storage',
            icon: <HardDrive className="w-5 h-5 text-[#26B170]" />,
            status: 'passed',
            value: '99% Health • 3480 MB/s',
            details: 'SMART self-test passed, no bad blocks or degraded sectors'
          },
          {
            id: 'network',
            name: 'Network Adapter & Packet Loss Latency',
            category: 'Network',
            icon: <Wifi className="w-5 h-5 text-[#F5C400]" />,
            status: 'warning',
            value: '1.2% Packet Loss (wlan0)',
            details: 'Slight packet drop detected on wireless link; ethernet cable recommended'
          },
          {
            id: 'battery',
            name: 'Battery Cycle & Controller Calibration',
            category: 'Power Subsystem',
            icon: <BatteryCharging className="w-5 h-5 text-[#26B170]" />,
            status: 'passed',
            value: '94% Original Capacity',
            details: 'Battery controller reports healthy voltage curves across all 4 cells'
          },
          {
            id: 'sensors',
            name: 'Hardware Thermal & System Bus Sensors',
            category: 'Motherboard',
            icon: <Zap className="w-5 h-5 text-[#4361EE]" />,
            status: 'passed',
            value: '12 Sensors Synchronized',
            details: 'Voltage rails (12V, 5V, 3.3V) stable within ±0.5% tolerance'
          }
        ]);
      }
      setProgress(currentProgress);
    }, 400);
  };

  const warningCount = checks.filter(c => c.status === 'warning').length;
  const passedCount = checks.filter(c => c.status === 'passed').length;

  return (
    <div className="h-full w-full bg-[#000720] text-slate-100 p-6 overflow-y-auto flex flex-col gap-6 selection:bg-[#4361EE] selection:text-white">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#4361EE]/10 border border-[#4361EE]/30 text-[#4CC9F0]">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide text-white">System Diagnostics</h1>
            <p className="text-xs text-slate-400">Run comprehensive hardware stress tests and health checks</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={runFullDiagnostics}
            disabled={isRunning}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-lg ${
              isRunning
                ? 'bg-slate-800 border border-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#4361EE] to-[#4CC9F0] text-white hover:brightness-110 shadow-[#4361EE]/20'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning ? 'Running Scan...' : 'Run Diagnostics'}
          </button>
        </div>
      </div>

      {/* Diagnostic Scan Summary Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#051650]/50 via-[#051650]/30 to-slate-900/60 border border-slate-800/80 backdrop-blur-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl border ${
              warningCount > 0
                ? 'bg-[#F5C400]/10 border-[#F5C400]/30 text-[#F5C400]'
                : 'bg-[#26B170]/10 border-[#26B170]/30 text-[#26B170]'
            }`}>
              {warningCount > 0 ? <AlertTriangle className="w-7 h-7" /> : <ShieldCheck className="w-7 h-7" />}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-100">
                  {isRunning ? 'Diagnostic Scan In Progress' : warningCount > 0 ? 'System Operational (1 Notice)' : 'All Systems Nominal'}
                </h2>
              </div>
              <p className="text-xs text-slate-400">
                Last completed check: <span className="text-slate-300 font-medium">{lastScanTime}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#26B170]" />
              <span className="text-slate-300 font-semibold">{passedCount} Passed</span>
            </div>
            {warningCount > 0 && (
              <div className="px-3 py-1.5 rounded-xl bg-[#F5C400]/10 border border-[#F5C400]/30 flex items-center gap-2 text-[#F5C400]">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-semibold">{warningCount} Warning</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar when running */}
        {isRunning && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Scanning hardware components...</span>
              <span className="font-bold text-[#4CC9F0]">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-[#4361EE] to-[#4CC9F0]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Diagnostic Checklist */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hardware Health Checklist</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {checks.map(check => (
            <div
              key={check.id}
              className="p-4 rounded-xl bg-[#051650]/30 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    {check.icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-200">{check.name}</h3>
                    <p className="text-[11px] text-slate-400">{check.category}</p>
                  </div>
                </div>

                {check.status === 'passed' && (
                  <span className="px-2 py-0.5 rounded-full bg-[#26B170]/10 border border-[#26B170]/30 text-[#26B170] text-[10px] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Pass
                  </span>
                )}
                {check.status === 'warning' && (
                  <span className="px-2 py-0.5 rounded-full bg-[#F5C400]/10 border border-[#F5C400]/30 text-[#F5C400] text-[10px] font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Warning
                  </span>
                )}
                {check.status === 'pending' && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-semibold animate-pulse">
                    Checking...
                  </span>
                )}
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs">
                <div className="font-semibold text-slate-200">{check.value}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{check.details}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemDiagnostics;

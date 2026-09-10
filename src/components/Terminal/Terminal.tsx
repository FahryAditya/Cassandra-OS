import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  command: string;
  output: string | React.ReactNode;
}

export const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      command: 'cass system',
      output: (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-3 rounded-lg bg-surface-container/40 border border-surface-container-high/40">
          <div className="md:col-span-5 flex flex-col justify-center text-tertiary font-mono text-xs leading-tight">
            <div>C A S S A N D R A</div>
            <div>O P E R A T I N G  S Y S T E M</div>
            <div className="text-outline mt-1">=======================</div>
            <div className="text-secondary">v3.4.0-LTS (Wayland x64)</div>
          </div>
          <div className="md:col-span-7 flex flex-col gap-1 font-mono text-xs text-on-surface-variant">
            <div><span className="text-tertiary font-bold">OS:</span> CassandraOS 3.4.0 LTS x86_64</div>
            <div><span className="text-tertiary font-bold">Kernel:</span> Linux 6.11.4-cs-x64</div>
            <div><span className="text-tertiary font-bold">Uptime:</span> 14 days, 8 hours, 22 mins</div>
            <div><span className="text-tertiary font-bold">Packages:</span> 1482 (pacman), 12 (flatpak)</div>
            <div><span className="text-tertiary font-bold">Shell:</span> zsh 5.9 (x86_64-pc-linux-gnu)</div>
            <div><span className="text-tertiary font-bold">RAM:</span> 4122MiB / 16384MiB (25%)</div>
          </div>
        </div>
      ),
    },
    {
      command: 'rustc --version',
      output: <div className="text-secondary font-mono text-xs">rustc 1.78.0-nightly (c56a81bf9 2026-09-10)</div>,
    },
  ]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    let out: React.ReactNode = '';
    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (cmd === 'help') {
      out = (
        <div className="text-xs text-on-surface-variant space-y-1 font-mono">
          <div>Available commands:</div>
          <div>- <span className="text-tertiary font-bold">cass system</span>: Show system summary fetch</div>
          <div>- <span className="text-tertiary font-bold">uname -a</span>: Print kernel details</div>
          <div>- <span className="text-tertiary font-bold">clear</span>: Clear terminal screen</div>
          <div>- <span className="text-tertiary font-bold">help</span>: List available commands</div>
        </div>
      );
    } else if (cmd === 'uname -a') {
      out = <div className="text-xs text-secondary font-mono">Linux cassandra 6.11.4-cs-x64 #1 SMP PREEMPT_DYNAMIC Thu Oct 24 14:00:00 UTC 2026 x86_64 GNU/Linux</div>;
    } else {
      out = <div className="text-xs text-red-400 font-mono">zsh: command not found: {cmd}. Type 'help' for available commands.</div>;
    }

    setHistory((prev) => [...prev, { command: cmd, output: out }]);
    setInputVal('');
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
            className="pointer-events-auto relative w-full max-w-5xl h-[620px] rounded-xl bg-surface-container-lowest/95 backdrop-blur-2xl shadow-[0_24px_60px_-12px_rgba(0,7,32,0.9),0_0_35px_rgba(67,97,238,0.18)] flex flex-col overflow-hidden border border-surface-container-high/60"
          >
            {/* Titlebar Chrome */}
            <div className="h-9 bg-surface-container-low/90 px-4 flex items-center justify-between shrink-0 border-b border-surface-container-high/40 select-none">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-[#EF4444] hover:opacity-80 transition-opacity flex items-center justify-center cursor-pointer"
                  />
                  <button className="w-3 h-3 rounded-full bg-[#F5C400] hover:opacity-80 transition-opacity cursor-pointer" />
                  <button className="w-3 h-3 rounded-full bg-[#26B170] hover:opacity-80 transition-opacity cursor-pointer" />
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-xs">
                  <span className="material-symbols-outlined text-tertiary text-[16px]">terminal</span>
                  <span className="font-semibold text-on-surface">cass@cassandra: ~ (zsh)</span>
                  <span className="font-code-sm text-[10px] text-outline px-1 py-0.5 rounded bg-surface-container">
                    /dev/pts/1
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 font-code-sm text-[11px]">
                <span className="text-outline">SESSION #1849</span>
                <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_6px_#5bd5fc]" />
              </div>
            </div>

            {/* Tab Bar */}
            <div className="bg-surface-container-low px-4 pt-1 flex items-center gap-1 border-b border-surface-container-high/40 shrink-0">
              <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-lowest text-tertiary rounded-t-lg font-code-sm text-xs font-semibold border-t border-x border-surface-container-high/40">
                <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_6px_#5bd5fc]" />
                <span>1: cass@cassandra: ~/workspace</span>
              </div>
            </div>

            {/* Terminal Body Screen */}
            <div className="flex-1 p-6 bg-surface-container-lowest font-code-md text-sm leading-relaxed text-on-surface overflow-y-auto space-y-4 font-mono">
              {history.map((log, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-tertiary font-bold">cass@cassandra</span>
                    <span className="text-outline">:</span>
                    <span className="text-secondary font-medium">~</span>
                    <span className="text-primary-container font-bold">$</span>
                    <span className="text-on-surface font-semibold">{log.command}</span>
                  </div>
                  <div>{log.output}</div>
                </div>
              ))}

              {/* Active Command Input Line */}
              <form onSubmit={handleCommandSubmit} className="flex items-center gap-1.5 pt-2">
                <span className="text-tertiary font-bold">cass@cassandra</span>
                <span className="text-outline">:</span>
                <span className="text-secondary font-medium">~</span>
                <span className="text-primary-container font-bold">$</span>
                <input
                  type="text"
                  autoFocus
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="flex-1 bg-transparent text-on-surface font-mono text-sm outline-none caret-tertiary"
                  placeholder="type command ('help', 'cass system', 'clear')..."
                />
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

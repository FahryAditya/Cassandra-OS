import React, { useState } from 'react';

interface HistoryNotification {
  id: string;
  app: string;
  icon: string;
  title: string;
  message: string;
  dateGroup: 'Today' | 'Yesterday' | 'This Week';
  timestamp: string;
}

export const NotificationHistory: React.FC<{ isOpen?: boolean }> = ({ isOpen = true }) => {
  const [filterDate, setFilterDate] = useState<string>('all');

  const historyItems: HistoryNotification[] = [
    { id: '1', app: 'Security Shield', icon: 'shield', title: 'eBPF Firewall Rule Applied', message: 'Blocked 12 unauthenticated inbound SYN packets on port 8080.', dateGroup: 'Today', timestamp: '10:42 AM' },
    { id: '2', app: 'Update Center', icon: 'system_update', title: 'Kernel Security Patch Installed', message: 'Cassandra Kernel v3.4.1-patch has been successfully applied.', dateGroup: 'Today', timestamp: '09:15 AM' },
    { id: '3', app: 'Disk Enclave', icon: 'lock', title: 'TPM 2.0 PCR[7] Verified', message: 'LUKS Crypt Enclave volume auto-mounted safely.', dateGroup: 'Yesterday', timestamp: 'Yesterday 04:30 PM' },
    { id: '4', app: 'Software Store', icon: 'inventory_2', title: 'Developer Tools Suite Updated', message: 'Node.js runtime and Rust compiler packages updated.', dateGroup: 'Yesterday', timestamp: 'Yesterday 11:20 AM' },
    { id: '5', app: 'Power Manager', icon: 'battery_saver', title: 'Battery Power Saver Engaged', message: 'Switched to power saver mode at 15% remaining battery.', dateGroup: 'This Week', timestamp: 'Sep 09, 08:10 PM' },
  ];

  const filtered = filterDate === 'all' ? historyItems : historyItems.filter((i) => i.dateGroup === filterDate);

  const groups = Array.from(new Set(filtered.map((i) => i.dateGroup)));

  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-[#051650]/95 backdrop-blur-xl border border-[#0A2472] rounded-xl p-5 text-[#F8FAFC] flex flex-col justify-between select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#0A2472]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#4361EE] text-white flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined">manage_history</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-wide">Notification History</h2>
            <p className="text-xs text-[#94A3B8]">Archive of previously dismissed system alerts</p>
          </div>
        </div>

        {/* Date Filter */}
        <select
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="bg-[#000720]/80 border border-[#0A2472] text-xs text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#4CC9F0]"
        >
          <option value="all">All Dates</option>
          <option value="Today">Today</option>
          <option value="Yesterday">Yesterday</option>
          <option value="This Week">This Week</option>
        </select>
      </div>

      {/* Main List Grouped by Date */}
      <div className="flex-1 overflow-y-auto py-4 space-y-5 scrollbar-thin scrollbar-thumb-[#0A2472]">
        {groups.map((groupName) => (
          <div key={groupName} className="space-y-2">
            <div className="text-xs font-bold text-[#4CC9F0] border-b border-[#0A2472]/60 pb-1 font-mono uppercase tracking-wider">
              {groupName}
            </div>
            <div className="space-y-2">
              {filtered
                .filter((item) => item.dateGroup === groupName)
                .map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#000720]/40 border border-[#0A2472] rounded-xl flex items-start gap-3 opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#0A2472] text-[#4895EF] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-base">{item.icon}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-white truncate">{item.title}</span>
                        <span className="text-[10px] font-mono text-[#94A3B8] flex-shrink-0 ml-2">{item.timestamp}</span>
                      </div>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">{item.message}</p>
                      <span className="inline-block mt-1 text-[10px] font-mono text-[#4CC9F0] bg-[#0A2472]/60 px-2 py-0.5 rounded">
                        {item.app}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[#0A2472] flex items-center justify-between text-xs text-[#94A3B8]">
        <span>Showing {filtered.length} archived notifications</span>
        <button className="text-[#EF4444] hover:underline font-medium">Clear History Archive</button>
      </div>
    </div>
  );
};

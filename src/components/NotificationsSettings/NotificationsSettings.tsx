import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationsSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AppNotificationRule {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  showOnLockScreen: boolean;
  showBadge: boolean;
  playSound: boolean;
  priority: 'low' | 'normal' | 'high';
}

export const NotificationsSettings: React.FC<NotificationsSettingsProps> = ({
  isOpen,
  onClose,
}) => {
  const [masterToggle, setMasterToggle] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>('app-1');

  const [appRules, setAppRules] = useState<AppNotificationRule[]>([
    {
      id: 'app-1',
      name: 'System Security Center',
      icon: 'shield',
      enabled: true,
      showOnLockScreen: true,
      showBadge: true,
      playSound: true,
      priority: 'high',
    },
    {
      id: 'app-2',
      name: 'Update Center',
      icon: 'system_update',
      enabled: true,
      showOnLockScreen: false,
      showBadge: true,
      playSound: false,
      priority: 'normal',
    },
    {
      id: 'app-3',
      name: 'Chromium Browser',
      icon: 'language',
      enabled: true,
      showOnLockScreen: false,
      showBadge: true,
      playSound: true,
      priority: 'normal',
    },
    {
      id: 'app-4',
      name: 'Terminal Studio',
      icon: 'terminal',
      enabled: false,
      showOnLockScreen: false,
      showBadge: false,
      playSound: false,
      priority: 'low',
    },
  ]);

  const toggleAppNotifications = (id: string) => {
    setAppRules((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  const updateRuleOption = (
    id: string,
    key: keyof AppNotificationRule,
    value: boolean | string
  ) => {
    setAppRules((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [key]: value } : a))
    );
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
                  <span className="material-symbols-outlined text-secondary text-[16px]">notifications</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-semibold">
                    Notifications Settings
                  </span>
                </div>
              </div>

              <span className="font-code-sm text-code-sm text-[#4CC9F0]">
                Desktop Alert Matrix
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Master Toggle Banner */}
              <div className="bg-[#051650] border border-surface-container-high/40 rounded-xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-tertiary text-2xl">notifications_active</span>
                  <div>
                    <h2 className="text-base font-bold text-on-surface">Allow System Notifications</h2>
                    <p className="text-xs text-[#94A3B8]">
                      {masterToggle ? 'App badges, sound alerts, and popups enabled.' : 'All notification alerts muted globally.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setMasterToggle(!masterToggle)}
                  className={`w-12 h-6.5 rounded-full transition-colors relative cursor-pointer ${
                    masterToggle ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                      masterToggle ? 'translate-x-5.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {masterToggle && (
                <div className="bg-surface-container-lowest/80 border border-surface-container-high/40 rounded-xl p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-tertiary text-lg">apps</span>
                    Per-Application Notification Rules
                  </h3>

                  <div className="space-y-3">
                    {appRules.map((app) => {
                      const isExpanded = expandedId === app.id;
                      return (
                        <div
                          key={app.id}
                          className="bg-[#051650]/60 border border-surface-container-high/40 rounded-xl overflow-hidden shadow-sm"
                        >
                          <div className="p-4 flex items-center justify-between">
                            <div
                              onClick={() => setExpandedId(isExpanded ? null : app.id)}
                              className="flex items-center gap-3.5 flex-1 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[#4CC9F0] text-xl">
                                {app.icon}
                              </span>
                              <div>
                                <h4 className="text-sm font-bold text-on-surface">{app.name}</h4>
                                <p className="text-xs text-[#94A3B8]">
                                  Priority: <span className="uppercase text-on-surface font-semibold">{app.priority}</span>
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => toggleAppNotifications(app.id)}
                                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                                  app.enabled ? 'bg-[#4361EE]' : 'bg-surface-container-high'
                                }`}
                              >
                                <span
                                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                                    app.enabled ? 'translate-x-5' : 'translate-x-0'
                                  }`}
                                />
                              </button>

                              <button
                                onClick={() => setExpandedId(isExpanded ? null : app.id)}
                                className="text-on-surface-variant cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-lg">
                                  {isExpanded ? 'expand_less' : 'expand_more'}
                                </span>
                              </button>
                            </div>
                          </div>

                          {/* Expanded Options */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-4 pb-4 pt-2 border-t border-surface-container-high/30 bg-surface-container-lowest/50 space-y-2.5 text-xs text-[#94A3B8]"
                              >
                                <div className="flex items-center justify-between">
                                  <span>Show notifications on lock screen</span>
                                  <input
                                    type="checkbox"
                                    checked={app.showOnLockScreen}
                                    onChange={(e) => updateRuleOption(app.id, 'showOnLockScreen', e.target.checked)}
                                    className="accent-[#4361EE] cursor-pointer"
                                  />
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>Show app badge counter</span>
                                  <input
                                    type="checkbox"
                                    checked={app.showBadge}
                                    onChange={(e) => updateRuleOption(app.id, 'showBadge', e.target.checked)}
                                    className="accent-[#4361EE] cursor-pointer"
                                  />
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>Play sound alert</span>
                                  <input
                                    type="checkbox"
                                    checked={app.playSound}
                                    onChange={(e) => updateRuleOption(app.id, 'playSound', e.target.checked)}
                                    className="accent-[#4361EE] cursor-pointer"
                                  />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

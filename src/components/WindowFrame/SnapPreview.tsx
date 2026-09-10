import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SnapState } from '../../types/window';

interface SnapPreviewProps {
  snapState: SnapState;
  rect: { x: number; y: number; width: number; height: number } | null;
}

export const SnapPreview: React.FC<SnapPreviewProps> = ({ snapState, rect }) => {
  if (snapState === 'none' || !rect) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        style={{
          left: rect.x,
          top: rect.y,
          width: rect.width,
          height: rect.height,
        }}
        className="fixed z-50 pointer-events-none rounded-xl bg-tertiary/20 border-2 border-tertiary shadow-[0_0_30px_rgba(91,213,252,0.35)] backdrop-blur-xs flex items-center justify-center"
      >
        <div className="px-4 py-2 rounded-lg bg-surface-container-low/90 backdrop-blur-md text-tertiary font-code-sm text-xs font-bold border border-tertiary/40 shadow-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">space_dashboard</span>
          <span className="uppercase tracking-wider">Snap Area: {snapState}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [mode, setMode] = useState<'std' | 'sci'>('sci');
  const [angleMode, setAngleMode] = useState<'RAD' | 'DEG'>('RAD');

  const handleBtnClick = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
      setExpression('');
    } else if (val === '=') {
      try {
        const exprClean = expression.replace(/×/g, '*').replace(/÷/g, '/');
        // Simple evaluation safely
        const res = Function(`"use strict"; return (${exprClean || display})`)();
        setDisplay(String(res));
        setExpression((prev) => (prev ? `${prev} =` : `${display} =`));
      } catch {
        setDisplay('Error');
      }
    } else if (['+', '-', '×', '÷'].includes(val)) {
      setExpression(`${display} ${val}`);
      setDisplay('0');
    } else {
      setDisplay((prev) => (prev === '0' || prev === 'Error' ? val : prev + val));
      setExpression((prev) => (prev.endsWith('=') ? val : prev + val));
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
            className="pointer-events-auto relative w-full max-w-[420px] bg-surface-container-low/95 backdrop-blur-2xl rounded-2xl shadow-[0_24px_60px_-12px_rgba(0,7,32,0.9)] flex flex-col overflow-hidden border border-surface-container-high/60"
          >
            {/* Titlebar Chrome */}
            <div className="h-9 px-4 bg-surface-container/70 flex items-center justify-between cursor-move select-none border-b border-surface-container-high/40">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-[#EF4444] hover:opacity-80 transition-opacity cursor-pointer"
                  />
                  <button className="w-3 h-3 rounded-full bg-[#F5C400] hover:opacity-80 transition-opacity cursor-pointer" />
                  <button className="w-3 h-3 rounded-full bg-[#26B170] hover:opacity-80 transition-opacity cursor-pointer" />
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">calculate</span>
                  <span className="font-body-sm text-body-sm text-on-surface font-semibold tracking-tight">
                    Calculator
                  </span>
                </div>
              </div>

              {/* Mode Toggle */}
              <div className="flex items-center bg-surface-container-lowest p-0.5 rounded-lg border border-surface-container-high/40">
                <button
                  onClick={() => setMode('std')}
                  className={`px-2 py-0.5 rounded font-code-sm text-[10px] transition-colors cursor-pointer ${
                    mode === 'std' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant'
                  }`}
                >
                  Std
                </button>
                <button
                  onClick={() => setMode('sci')}
                  className={`px-2 py-0.5 rounded font-code-sm text-[10px] transition-colors cursor-pointer ${
                    mode === 'sci' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant'
                  }`}
                >
                  Sci
                </button>
              </div>
            </div>

            {/* Display Screen */}
            <div className="p-5 bg-surface-container-lowest/60 flex flex-col justify-end min-h-[120px] relative border-b border-surface-container-high/40">
              <div className="absolute top-2 left-5 flex items-center gap-2 font-code-sm text-[11px] text-outline">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary/70 animate-pulse" />
                <button
                  onClick={() => setAngleMode((prev) => (prev === 'RAD' ? 'DEG' : 'RAD'))}
                  className="tracking-widest uppercase text-tertiary font-bold hover:underline cursor-pointer"
                >
                  {angleMode}
                </button>
                <span>·</span>
                <span>DEC</span>
                <span>·</span>
                <span>FP64</span>
              </div>
              <div className="w-full text-right font-code-md text-xs text-on-surface-variant truncate font-mono h-5">
                {expression}
              </div>
              <div className="w-full text-right font-code-md text-3xl font-bold text-on-surface font-mono tracking-tight overflow-hidden">
                {display}
              </div>
            </div>

            {/* Keypad Grid */}
            <div className="p-4 space-y-2 bg-surface-container-low">
              {mode === 'sci' && (
                <div className="grid grid-cols-4 gap-1.5 font-code-sm text-xs mb-1">
                  {['sin', 'cos', 'tan', 'sqrt'].map((fn) => (
                    <button
                      key={fn}
                      onClick={() => handleBtnClick(fn)}
                      className="py-2 rounded-lg bg-surface-container-high/40 hover:bg-surface-container-high text-tertiary font-mono transition-colors cursor-pointer border border-surface-container-high/30"
                    >
                      {fn}
                    </button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-4 gap-2 font-code-md text-sm">
                {['C', '(', ')', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((btn) => {
                  const isOp = ['÷', '×', '-', '+', '='].includes(btn);
                  const isClear = btn === 'C';
                  return (
                    <button
                      key={btn}
                      onClick={() => handleBtnClick(btn)}
                      className={`py-3 rounded-xl font-mono font-bold transition-all active:scale-95 cursor-pointer border shadow-sm ${
                        btn === '0' ? 'col-span-1' : ''
                      } ${
                        isClear
                          ? 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30'
                          : isOp
                          ? 'bg-primary-container text-on-primary-container border-primary-container/40 hover:brightness-110 shadow-purple-500/20'
                          : 'bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface border-surface-container-high/40'
                      }`}
                    >
                      {btn}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

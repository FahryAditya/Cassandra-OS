import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const OnScreenKeyboard: React.FC<{ isOpen?: boolean }> = ({ isOpen = true }) => {
  const [capsLock, setCapsLock] = useState(false);
  const [shift, setShift] = useState(false);

  const row1 = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'];
  const row2 = ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'];
  const row3 = ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'];
  const row4 = ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'];

  const handleKeyPress = (key: string) => {
    if (key === 'Caps') setCapsLock(!capsLock);
    if (key === 'Shift') setShift(!shift);
  };

  const isUppercase = capsLock || shift;

  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-[#051650]/95 backdrop-blur-xl border border-[#0A2472] rounded-xl p-4 text-[#F8FAFC] flex flex-col justify-between select-none overflow-hidden shadow-2xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-[#0A2472] text-xs text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#4CC9F0] text-base">keyboard</span>
          <span className="font-semibold text-white">On-Screen Virtual Keyboard</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className={capsLock ? 'text-[#4CC9F0] font-bold' : ''}>CAPS: {capsLock ? 'ON' : 'OFF'}</span>
          <span className={shift ? 'text-[#4CC9F0] font-bold' : ''}>SHIFT: {shift ? 'ON' : 'OFF'}</span>
        </div>
      </div>

      {/* Keyboard Layout Rows */}
      <div className="space-y-1.5 my-auto">
        {/* Row 1 */}
        <div className="flex gap-1">
          {row1.map((k, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleKeyPress(k)}
              className={`py-2 rounded-lg text-xs font-mono transition-colors shadow-sm ${
                k === 'Backspace'
                  ? 'flex-1 bg-[#0A2472] text-[#4CC9F0] font-bold flex items-center justify-center gap-1'
                  : 'w-10 bg-[#000720]/80 border border-[#0A2472] hover:bg-[#4361EE] hover:text-white'
              }`}
            >
              {k === 'Backspace' ? <><span className="material-symbols-outlined text-sm">backspace</span> Delete</> : isUppercase ? k.toUpperCase() : k}
            </motion.button>
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex gap-1">
          {row2.map((k, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleKeyPress(k)}
              className={`py-2 rounded-lg text-xs font-mono transition-colors shadow-sm ${
                k === 'Tab'
                  ? 'w-14 bg-[#0A2472] text-[#4895EF] font-bold'
                  : 'flex-1 bg-[#000720]/80 border border-[#0A2472] hover:bg-[#4361EE] hover:text-white'
              }`}
            >
              {isUppercase && k.length === 1 ? k.toUpperCase() : k}
            </motion.button>
          ))}
        </div>

        {/* Row 3 */}
        <div className="flex gap-1">
          {row3.map((k, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleKeyPress(k)}
              className={`py-2 rounded-lg text-xs font-mono transition-colors shadow-sm ${
                k === 'Caps'
                  ? `w-16 ${capsLock ? 'bg-[#4361EE] text-white' : 'bg-[#0A2472] text-[#4CC9F0]'}`
                  : k === 'Enter'
                  ? 'w-20 bg-[#4361EE] text-white font-bold'
                  : 'flex-1 bg-[#000720]/80 border border-[#0A2472] hover:bg-[#4361EE] hover:text-white'
              }`}
            >
              {isUppercase && k.length === 1 ? k.toUpperCase() : k}
            </motion.button>
          ))}
        </div>

        {/* Row 4 */}
        <div className="flex gap-1">
          {row4.map((k, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleKeyPress(k)}
              className={`py-2 rounded-lg text-xs font-mono transition-colors shadow-sm ${
                k === 'Shift'
                  ? `w-20 ${shift ? 'bg-[#4361EE] text-white' : 'bg-[#0A2472] text-[#4CC9F0]'}`
                  : 'flex-1 bg-[#000720]/80 border border-[#0A2472] hover:bg-[#4361EE] hover:text-white'
              }`}
            >
              {isUppercase && k.length === 1 ? k.toUpperCase() : k}
            </motion.button>
          ))}
        </div>

        {/* Row 5 Spacebar */}
        <div className="flex gap-1">
          <button className="w-16 py-2 bg-[#0A2472] text-xs font-mono text-[#94A3B8] rounded-lg">Ctrl</button>
          <button className="w-14 py-2 bg-[#0A2472] text-xs font-mono text-[#94A3B8] rounded-lg">Alt</button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-2 bg-[#000720]/90 border border-[#0A2472] hover:bg-[#4361EE] text-xs font-mono text-center rounded-lg tracking-widest text-[#94A3B8] hover:text-white"
          >
            SPACEBAR
          </motion.button>
          <button className="w-14 py-2 bg-[#0A2472] text-xs font-mono text-[#94A3B8] rounded-lg">Alt</button>
          <button className="w-16 py-2 bg-[#0A2472] text-xs font-mono text-[#94A3B8] rounded-lg">Ctrl</button>
        </div>
      </div>
    </div>
  );
};

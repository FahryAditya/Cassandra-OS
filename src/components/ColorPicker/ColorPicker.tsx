import React, { useState } from 'react';

export const ColorPicker: React.FC<{ isOpen?: boolean }> = ({ isOpen = true }) => {
  const [selectedColor, setSelectedColor] = useState({
    hex: '#4CC9F0',
    rgb: 'rgb(76, 201, 240)',
    hsl: 'hsl(194, 85%, 62%)',
  });

  const [recentColors] = useState<string[]>([
    '#4CC9F0',
    '#4361EE',
    '#4895EF',
    '#051650',
    '#26B170',
    '#F5C400',
    '#EF4444',
  ]);

  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-[#051650]/95 backdrop-blur-xl border border-[#0A2472] rounded-xl p-5 text-[#F8FAFC] flex flex-col justify-between select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#0A2472]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#4CC9F0]">colorize</span>
          <h2 className="font-semibold text-base tracking-wide">Color Eyedropper</h2>
        </div>
        <span className="text-xs font-mono text-[#94A3B8]">Screen Picker</span>
      </div>

      {/* Magnifier Circle & Color Swatch */}
      <div className="my-4 flex items-center justify-around bg-[#000720]/80 p-4 rounded-xl border border-[#0A2472]">
        {/* Magnifier Circle Graphic */}
        <div className="w-24 h-24 rounded-full border-4 border-[#4CC9F0] shadow-xl relative overflow-hidden bg-[#051650] flex items-center justify-center">
          <div className="grid grid-cols-5 grid-rows-5 w-full h-full opacity-60">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className={`border border-black/20 ${
                  i === 12 ? 'bg-[#4CC9F0] ring-2 ring-white z-10' : i % 2 === 0 ? 'bg-[#4361EE]/40' : 'bg-[#0A2472]/60'
                }`}
              ></div>
            ))}
          </div>
          {/* Target crosshair */}
          <div className="absolute w-3 h-3 border-2 border-white rounded-full pointer-events-none z-20"></div>
        </div>

        {/* Large Swatch Display */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-16 h-16 rounded-2xl shadow-xl border-2 border-white/20 transition-colors"
            style={{ backgroundColor: selectedColor.hex }}
          ></div>
          <span className="font-mono text-xs font-bold text-white tracking-widest">{selectedColor.hex}</span>
        </div>
      </div>

      {/* Values List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between p-2.5 bg-[#000720]/60 border border-[#0A2472] rounded-xl text-xs font-mono">
          <span className="text-[#94A3B8]">HEX:</span>
          <span className="text-white font-semibold">{selectedColor.hex}</span>
          <button
            onClick={() => copyToClipboard(selectedColor.hex, 'HEX')}
            className="text-[#4CC9F0] hover:text-white"
          >
            <span className="material-symbols-outlined text-base">
              {copiedFormat === 'HEX' ? 'check' : 'content_copy'}
            </span>
          </button>
        </div>

        <div className="flex items-center justify-between p-2.5 bg-[#000720]/60 border border-[#0A2472] rounded-xl text-xs font-mono">
          <span className="text-[#94A3B8]">RGB:</span>
          <span className="text-white font-semibold">{selectedColor.rgb}</span>
          <button
            onClick={() => copyToClipboard(selectedColor.rgb, 'RGB')}
            className="text-[#4CC9F0] hover:text-white"
          >
            <span className="material-symbols-outlined text-base">
              {copiedFormat === 'RGB' ? 'check' : 'content_copy'}
            </span>
          </button>
        </div>

        <div className="flex items-center justify-between p-2.5 bg-[#000720]/60 border border-[#0A2472] rounded-xl text-xs font-mono">
          <span className="text-[#94A3B8]">HSL:</span>
          <span className="text-white font-semibold">{selectedColor.hsl}</span>
          <button
            onClick={() => copyToClipboard(selectedColor.hsl, 'HSL')}
            className="text-[#4CC9F0] hover:text-white"
          >
            <span className="material-symbols-outlined text-base">
              {copiedFormat === 'HSL' ? 'check' : 'content_copy'}
            </span>
          </button>
        </div>
      </div>

      {/* Recent Color Swatches */}
      <div className="pt-3 border-t border-[#0A2472] space-y-1.5">
        <span className="text-[11px] text-[#94A3B8]">Recent Palette:</span>
        <div className="flex items-center gap-2">
          {recentColors.map((color, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedColor({ hex: color, rgb: 'rgb(...)', hsl: 'hsl(...)' })}
              className="w-7 h-7 rounded-full border border-white/20 hover:scale-110 transition-transform shadow-md"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

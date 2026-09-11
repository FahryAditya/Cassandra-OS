import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const EmojiPicker: React.FC<{ isOpen?: boolean }> = ({ isOpen = true }) => {
  const [activeCategory, setActiveCategory] = useState<string>('smileys');
  const [search, setSearch] = useState('');

  const categories = [
    { id: 'smileys', icon: 'sentiment_satisfied', name: 'Smileys' },
    { id: 'animals', icon: 'pets', name: 'Animals' },
    { id: 'food', icon: 'fastfood', name: 'Food' },
    { id: 'objects', icon: 'lightbulb', name: 'Objects' },
    { id: 'symbols', icon: 'extension', name: 'Symbols' },
  ];

  const emojiData: Record<string, string[]> = {
    smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '😮‍💨', '🤥'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋'],
    food: ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🌽', '🥕', '🍔', '🍟', '🍕', '🌮'],
    objects: ['💻', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '🗜️', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '⏱️', '⏲️', '⏰', '🕰️'],
    symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐'],
  };

  const recentEmojis = ['🛸', '💻', '🚀', '⚡', '🔥', '✨', '🛡️', '⚙️'];

  const emojis = emojiData[activeCategory] || emojiData['smileys'];

  if (!isOpen) return null;

  return (
    <div className="w-full h-full bg-[#051650]/95 backdrop-blur-xl border border-[#0A2472] rounded-xl p-5 text-[#F8FAFC] flex flex-col justify-between select-none overflow-hidden">
      {/* Search Header */}
      <div className="pb-3 border-b border-[#0A2472] space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4CC9F0]">mood</span>
            <h2 className="font-semibold text-base tracking-wide">Emoji & Symbols</h2>
          </div>
        </div>

        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-2 text-sm text-[#94A3B8]">
            search
          </span>
          <input
            type="text"
            placeholder="Search emoji..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#000720]/80 border border-[#0A2472] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#4CC9F0]"
          />
        </div>
      </div>

      {/* Category Icons Bar */}
      <div className="flex items-center justify-around py-2 border-b border-[#0A2472]/60">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${
              activeCategory === cat.id ? 'bg-[#4361EE] text-white shadow-md' : 'text-[#94A3B8] hover:text-white'
            }`}
            title={cat.name}
          >
            <span className="material-symbols-outlined text-lg">{cat.icon}</span>
          </button>
        ))}
      </div>

      {/* Emoji Grid */}
      <div className="flex-1 overflow-y-auto py-3 scrollbar-thin scrollbar-thumb-[#0A2472]">
        <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 text-2xl text-center">
          {emojis.map((emoji, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigator.clipboard.writeText(emoji)}
              className="p-2 hover:bg-[#0A2472] rounded-xl transition-colors cursor-pointer"
              title="Click to copy"
            >
              {emoji}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recently Used Bar */}
      <div className="pt-2 border-t border-[#0A2472] space-y-1">
        <span className="text-[10px] text-[#94A3B8] font-mono">Recently Used:</span>
        <div className="flex items-center gap-2 text-xl">
          {recentEmojis.map((e, idx) => (
            <button
              key={idx}
              onClick={() => navigator.clipboard.writeText(e)}
              className="hover:scale-110 transition-transform"
            >
              {e}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

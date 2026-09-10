import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TextEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TextEditor: React.FC<TextEditorProps> = ({ isOpen, onClose }) => {
  const [activeFile, setActiveFile] = useState('main.rs');

  const codeSnippets: Record<string, string[]> = {
    'main.rs': [
      '// CassandraOS Kernel Engine — Rust Core Module',
      'use std::sync::Arc;',
      'use tokio::sync::Mutex;',
      '',
      '#[derive(Debug)]',
      'pub struct KernelTelemetry {',
      '    pub cpu_load: f32,',
      '    pub memory_used_mb: u64,',
      '    pub active_threads: u32,',
      '}',
      '',
      'impl KernelTelemetry {',
      '    pub fn new() -> Self {',
      '        Self {',
      '            cpu_load: 18.4,',
      '            memory_used_mb: 4122,',
      '            active_threads: 1482,',
      '        }',
      '    }',
      '}',
      '',
      '#[tokio::main]',
      'async fn main() -> Result<(), Box<dyn std::error::Error>> {',
      '    let telemetry = Arc::new(Mutex::new(KernelTelemetry::new()));',
      '    println!("CassandraOS Core Engine v3.4.0-LTS initialized.");',
      '    Ok(())',
      '}',
    ],
    'App.tsx': [
      'import React from "react";',
      'import { Header } from "./components/Header/Header";',
      'import { Sidebar } from "./components/Sidebar/Sidebar";',
      '',
      'export default function App() {',
      '  return (',
      '    <div className="min-h-screen bg-surface">',
      '      <Header />',
      '      <Sidebar />',
      '    </div>',
      '  );',
      '}',
    ],
  };

  const lines = codeSnippets[activeFile] || codeSnippets['main.rs'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto relative w-full max-w-6xl h-[660px] bg-surface-container-lowest/95 backdrop-blur-2xl rounded-xl shadow-[0_24px_60px_-12px_rgba(0,7,32,0.9)] flex flex-col overflow-hidden border border-surface-container-high/60"
          >
            {/* Window Chrome / Titlebar */}
            <div className="h-9 w-full bg-surface-container-low/90 px-4 flex items-center justify-between select-none shrink-0 border-b border-surface-container-high/40">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-[#EF4444] opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                  />
                  <button className="w-3 h-3 rounded-full bg-[#F5C400] opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
                  <button className="w-3 h-3 rounded-full bg-[#26B170] opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[16px]">code</span>
                  <span className="font-body-sm text-body-sm text-on-surface font-semibold">
                    {activeFile}
                  </span>
                  <span className="font-code-sm text-[10px] text-outline">
                    — CassandraOS Code Studio
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 font-code-sm text-xs text-on-surface-variant">
                <span className="flex items-center gap-1 text-tertiary">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                  LSP Sync 12ms
                </span>
              </div>
            </div>

            {/* Tabs & Toolbar Bar */}
            <div className="bg-surface-container/70 flex items-center justify-between px-4 border-b border-surface-container-high/40 shrink-0">
              <div className="flex items-center gap-1 pt-1">
                {['main.rs', 'App.tsx'].map((fileName) => (
                  <button
                    key={fileName}
                    onClick={() => setActiveFile(fileName)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-t-lg font-code-sm text-xs cursor-pointer border-t border-x ${
                      activeFile === fileName
                        ? 'bg-surface-container-lowest text-tertiary font-bold border-surface-container-high/60 shadow-sm'
                        : 'bg-surface-container-high/40 text-on-surface-variant hover:bg-surface-container-high border-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">description</span>
                    <span>{fileName}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 font-code-sm text-xs">
                <span className="px-2 py-0.5 rounded bg-surface-container text-secondary">UTF-8</span>
                <span className="px-2 py-0.5 rounded bg-surface-container text-tertiary">Rust / TSX</span>
              </div>
            </div>

            {/* Code Editor Body */}
            <div className="flex-1 bg-surface-container-lowest p-4 overflow-y-auto font-mono text-sm leading-relaxed text-on-surface flex">
              {/* Line Numbers */}
              <div className="select-none text-outline-variant pr-4 text-right space-y-1 font-mono text-xs border-r border-surface-container-high/30 mr-4">
                {lines.map((_, idx) => (
                  <div key={idx}>{idx + 1}</div>
                ))}
              </div>

              {/* Code Contents */}
              <div className="flex-1 space-y-1 font-mono text-xs text-on-surface">
                {lines.map((line, idx) => (
                  <div key={idx} className="hover:bg-surface-container-high/30 px-1 rounded transition-colors">
                    {line.startsWith('//') ? (
                      <span className="text-outline italic">{line}</span>
                    ) : line.includes('fn') || line.includes('pub') || line.includes('use') || line.includes('struct') || line.includes('import') || line.includes('export') ? (
                      <span className="text-purple-400 font-semibold">{line}</span>
                    ) : line.includes('println!') || line.includes('return') ? (
                      <span className="text-tertiary">{line}</span>
                    ) : (
                      <span>{line}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Status Footer */}
            <div className="px-4 py-2 bg-surface-container-low border-t border-surface-container-high/40 flex items-center justify-between text-on-surface-variant font-code-sm text-xs">
              <span>Ln {lines.length}, Col 1</span>
              <span>CassandraOS Code Studio IDE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React, { useState, useEffect } from 'react';
import { THEMES } from './constants.tsx';
import ThemePreview from './components/ThemePreview';
import { exportProjectAsZip } from './services/exportService';

const App: React.FC = () => {
  const [showDevMenu, setShowDevMenu] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Hidden Dev Menu Shortcut: Ctrl + Shift + L or Cmd + Shift + L
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
        e.preventDefault();
        setShowDevMenu(prev => !prev);
      }
      if (e.key === 'Escape') {
        setShowDevMenu(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportProjectAsZip();
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to bundle project.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative">
      <ThemePreview />

      {/* Hidden Dev Menu */}
      {showDevMenu && (
        <div className="fixed inset-0 z-[500] bg-black/90 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300">
          <div className="max-w-md w-full p-12 bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono shadow-2xl">
            <div className="flex justify-between items-center mb-12">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">System Oversight</div>
              <button onClick={() => setShowDevMenu(false)} className="hover:text-white transition-colors">✕</button>
            </div>
            
            <div className="space-y-8">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">Build Manifest</div>
                <div className="bg-black p-4 text-[10px] space-y-1 rounded border border-zinc-800">
                  <div className="flex justify-between"><span>Version</span><span className="text-white">v2.5.2-redux</span></div>
                  <div className="flex justify-between"><span>Environment</span><span className="text-emerald-500">Production</span></div>
                  <div className="flex justify-between"><span>Access Key</span><span className="text-white">Shift+Cmd+L</span></div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs leading-relaxed italic">
                  Generate a complete source bundle of the current architecture including all logic, components, and design systems.
                </p>
                <button 
                  onClick={handleExport}
                  disabled={isExporting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isExporting ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    "Package & Export Project"
                  )}
                </button>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-zinc-800 text-center">
              <span className="text-[9px] uppercase tracking-widest text-zinc-700 font-bold">Access restricted to authorized architects.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
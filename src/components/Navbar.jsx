import React from 'react';
import { Satellite, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fbfbfd]/90 backdrop-blur-md border-b border-zinc-200/80">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        
        {/* Brand: OSD */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center shadow-sm">
            <Satellite className="w-5 h-5 animate-pulse text-cyan-400" />
          </div>
          <div>
            <div className="text-sm font-black tracking-wider text-zinc-900 flex items-center gap-2 font-mono">
              OSD
              <span className="text-[10px] font-mono uppercase bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-full border border-zinc-200 font-semibold">
                KPRIET CSE
              </span>
            </div>
            <div className="text-xs text-zinc-500 font-mono">
              AI Autonomous Spill Detection & Response
            </div>
          </div>
        </div>

        

      </div>
    </header>
  );
}
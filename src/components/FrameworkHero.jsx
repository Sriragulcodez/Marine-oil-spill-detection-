import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Satellite, ShieldCheck, Sparkles } from 'lucide-react';

export default function FrameworkHero() {
  return (
    <section className="pt-36 pb-20 bg-[#fbfbfd] text-zinc-900 border-b border-zinc-200/80 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10">

        {/* Tracked Monospace Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-red-600 font-semibold bg-red-50 px-3.5 py-1.5 rounded-full border border-red-100">
            PRECISION SATELLITE AI FOR MARINE MONITORING
          </span>
        </motion.div>

        {/* Editorial Headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light tracking-tight text-zinc-900 leading-[1.08]">
            AI-Driven Marine Oil Spill Detection with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 font-normal">
              IoT-Enabled Intelligent Alerting
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed font-normal">
            A high-precision operational framework converting raw satellite SAR backscatter into 
            instant spill boundary segmentation, oil type classification, physical area triage, 
            and autonomous Coast Guard emergency dispatch.
          </p>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#workflow"
            className="px-6 py-3.5 rounded-full bg-black text-white text-xs font-semibold hover:bg-zinc-800 transition-all shadow-sm active:scale-95 flex items-center gap-2"
          >
            <span>Explore 3D Architecture Workflow</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          <a
            href="#console"
            className="px-6 py-3.5 rounded-full bg-white border border-zinc-300 hover:border-black text-zinc-900 text-xs font-semibold transition-all hover:bg-zinc-50 active:scale-95 flex items-center gap-2"
          >
            <span>Test Live Operations Console</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Authors Line */}
        <div className="mt-16 pt-8 border-t border-zinc-200/80 text-center text-xs text-zinc-500 font-mono">
          Final Year Research • Department of Computer Science and Engineering, KPRIET Coimbatore[cite: 2]
        </div>

      </div>
    </section>
  );
}
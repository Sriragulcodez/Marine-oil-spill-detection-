import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Sparkles, Terminal, Activity, Disc3 } from 'lucide-react';
import AoseCircleRadar from './AoseCircleRadar';

export default function AoseHero() {
  const tickerItems = [
    "SENTINEL-1 SAR ACQUISITION",
    "RESNET-18 BINARY SCREENING [97.69% ACCURACY]",
    "U-NET 4-STAGE BOUNDARY SEGMENTATION [DICE 0.7985]",
    "BACKSCATTER DAMPING DEPTH PROFILING",
    "10m GSD PHYSICAL AREA TRIAGE",
    "IOT BUOY HYDROCARBON CROSS-CHECK [MQTT]",
    "AUTONOMOUS COAST GUARD DISPATCH"
  ];

  return (
    <section className="pt-28 pb-12 bg-[#fbfbfd] text-zinc-900 overflow-hidden border-b border-zinc-200">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10">

        {/* Header Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between py-3 mb-8 border-b border-zinc-200/80 text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-zinc-900 font-bold">KPRIET RESEARCH</span>
            <span>// COIMBATORE, TN</span>
          </div>
          <div>EST. 2026 • FINAL YEAR CSE RESEARCH</div>
          <div className="hidden sm:block">SYSTEM RUNTIME: CUDA 11.8 • FP16 AMP</div>
        </div>

        {/* Main Grid: Editorial Typography Left + 3D Orbital Centerpiece Right */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Typography Column */}
          <div className="lg:col-span-7 space-y-6">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-800 text-xs font-mono font-semibold"
            >
              <Disc3 className="w-3.5 h-3.5 text-red-600 animate-spin [animation-duration:8s]" />
              <span>[ 01 / 04 ] SURVEILLANCE AUTOMATION</span>
            </motion.div>

            {/* Kinetic Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl xl:text-7xl font-serif font-light tracking-tight text-zinc-900 leading-[1.06]"
            >
              Detecting Marine Oil Slicks with{' '}
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500">
                Satellite SAR
              </span>{' '}
              & Intelligent IoT Alerting.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-base sm:text-lg text-zinc-600 max-w-xl leading-relaxed font-normal"
            >
              A two-tier deep-learning pipeline connecting raw Synthetic Aperture Radar 
              backscatter to fine-tuned ResNet-18 classification, U-Net boundary segmentation, 
              and automated maritime rescue dispatch.
            </motion.p>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-200 max-w-lg font-mono"
            >
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase">Spill Recall</span>
                <span className="text-xl sm:text-2xl font-bold text-zinc-900">98.16%</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase">Dice Coeff</span>
                <span className="text-xl sm:text-2xl font-bold text-zinc-900">0.7985</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase">Detection ROC</span>
                <span className="text-xl sm:text-2xl font-bold text-zinc-900">0.9977</span>
              </div>
            </motion.div>

            {/* Interactive Magnetic CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#console"
                className="px-7 py-4 rounded-full bg-zinc-950 text-white text-xs font-semibold hover:bg-zinc-800 transition-all shadow-md active:scale-95 flex items-center gap-2 group"
              >
                <span>Launch Operations Console</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#workflow"
                className="px-7 py-4 rounded-full bg-white border border-zinc-300 hover:border-zinc-900 text-zinc-900 text-xs font-semibold transition-all hover:bg-zinc-50 active:scale-95 flex items-center gap-2"
              >
                <span>3D System Architecture</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </motion.div>

          </div>

          {/* Circle Radar Component Right */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <AoseCircleRadar />
          </div>

        </div>

      </div>

      {/* Infinite Kinetic Ticker Tape matching Aose style */}
      <div className="mt-14 py-3 bg-zinc-950 text-zinc-300 overflow-hidden select-none border-y border-zinc-900">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-10 font-mono text-xs tracking-wider"
        >
          {[...tickerItems, ...tickerItems].map((text, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span>{text}</span>
              <span className="text-cyan-400">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
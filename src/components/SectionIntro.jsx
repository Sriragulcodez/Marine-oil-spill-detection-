import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowDown } from 'lucide-react';

export default function SectionIntro({ onStartMentorMode }) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-ocean-950">
      {/* Radar sweep background */}
      <div className="absolute inset-0 radar-grid opacity-35" />

      {/* Sweeping concentric rings */}
      <div className="absolute w-[680px] h-[680px] rounded-full border border-cyan-500/20 pointer-events-none flex items-center justify-center">
        <div className="w-[520px] h-[520px] rounded-full border border-cyan-500/15" />
        <div className="w-[360px] h-[360px] rounded-full border border-cyan-500/20" />
        <div className="w-[200px] h-[200px] rounded-full border border-cyan-500/25" />
        <div className="absolute inset-0 origin-center animate-radar-sweep bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Academic Ribbon */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          KPR INSTITUTE OF ENGINEERING AND TECHNOLOGY • FINAL YEAR CSE RESEARCH
        </div>

        {/* Research Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
          AI-Driven Marine Oil Spill Detection with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
            IoT-Enabled Intelligent Alerting
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          An integrated two-stage deep-learning framework combining fine-tuned <strong>ResNet-18</strong> classification 
          (97.69% accuracy, 98.16% recall) with a four-stage <strong>U-Net</strong> segmentation model (Dice: 0.7985), 
          coupled to an automated severity triage engine and a proposed IoT-MQTT alerting architecture[cite: 2].
        </p>

        {/* Verified Academic Metrics Cards */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-3xl mx-auto text-left">
          <div className="bg-slate-900/85 border border-slate-800 p-3.5 rounded-xl backdrop-blur-md">
            <span className="text-xs text-slate-400 block">Classifier Accuracy</span>
            <span className="text-2xl font-bold text-cyan-400 font-mono">97.69%</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">ResNet-18 (5,630 Samples)[cite: 2]</span>
          </div>

          <div className="bg-slate-900/85 border border-slate-800 p-3.5 rounded-xl backdrop-blur-md">
            <span className="text-xs text-slate-400 block">Spill Recall</span>
            <span className="text-2xl font-bold text-emerald-400 font-mono">98.16%</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">374/381 Spills Caught[cite: 2]</span>
          </div>

          <div className="bg-slate-900/85 border border-slate-800 p-3.5 rounded-xl backdrop-blur-md">
            <span className="text-xs text-slate-400 block">Segmentation Dice</span>
            <span className="text-2xl font-bold text-blue-400 font-mono">0.7985</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">U-Net (8,070 Pairs)[cite: 2]</span>
          </div>

          <div className="bg-slate-900/85 border border-slate-800 p-3.5 rounded-xl backdrop-blur-md">
            <span className="text-xs text-slate-400 block">ROC-AUC Score</span>
            <span className="text-2xl font-bold text-teal-300 font-mono">0.9977</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">High Separation[cite: 2]</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onStartMentorMode}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all"
          >
            <Play className="w-4 h-4 fill-current text-slate-950" />
            <span>Start Mentor Guided Presentation</span>
          </button>

          <a
            href="#lab"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium text-sm transition-all"
          >
            <span>Launch AI Detection Lab</span>
            <ArrowDown className="w-4 h-4 text-cyan-400" />
          </a>
        </div>

        {/* Academic Details */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-xs text-slate-400 font-mono">
          <span>Project Mentor: <strong className="text-slate-200">Ms. Sasikala C</strong>[cite: 2]</span>
          <span className="text-slate-600">•</span>
          <span>Students: <strong className="text-slate-200">Sriragul S, Yadaw K, Thangapandi E</strong>[cite: 2]</span>
          <span className="text-slate-600">•</span>
          <span>KPR Institute of Eng. & Tech</span>
        </div>
      </div>
    </section>
  );
}
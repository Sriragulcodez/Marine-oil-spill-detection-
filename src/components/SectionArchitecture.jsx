import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight, Layers, FileCode, Workflow } from 'lucide-react';
import { ARCHITECTURE_PIPELINE } from '../data/projectData';
import StatusBadge from './StatusBadge';

export default function SectionArchitecture() {
  const [selectedStage, setSelectedStage] = useState(ARCHITECTURE_PIPELINE[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setSelectedStage((prev) => {
          const nextIndex = (prev.id % ARCHITECTURE_PIPELINE.length);
          return ARCHITECTURE_PIPELINE[nextIndex];
        });
      }, 2400);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section id="architecture" className="py-20 bg-ocean-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <StatusBadge status="Implemented" />
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The 11-Stage Pipeline Architecture
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-2xl">
              An animated, step-by-step walkthrough of the 4-tier KPRIET architectural blueprint[cite: 2].
              Click any stage to inspect its inputs, outputs, and corresponding script.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-semibold text-xs shadow-md transition-all"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause Workflow' : 'Play Workflow'}</span>
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setSelectedStage(ARCHITECTURE_PIPELINE[0]);
              }}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2-Column interactive grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Stage List */}
          <div className="lg:col-span-7 space-y-2">
            {ARCHITECTURE_PIPELINE.map((stage) => {
              const isSelected = selectedStage.id === stage.id;
              return (
                <div
                  key={stage.id}
                  onClick={() => {
                    setIsPlaying(false);
                    setSelectedStage(stage);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-950/70 border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.2)] translate-x-1'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                        isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {stage.id}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-100">{stage.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{stage.pillar}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <StatusBadge status={stage.status} />
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Node Inspector */}
          <div className="lg:col-span-5 sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedStage.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase">{selectedStage.pillar}</span>
                    <h3 className="text-lg font-bold text-white">{selectedStage.title}</h3>
                  </div>
                  <StatusBadge status={selectedStage.status} />
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 block text-[11px] uppercase font-semibold font-mono">Role in Pipeline</span>
                    <p className="text-slate-200 mt-0.5 leading-relaxed">{selectedStage.summary}</p>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div>
                      <span className="text-cyan-400 font-mono text-[11px] block font-semibold">INPUT CONTRACT</span>
                      <p className="text-slate-300 font-mono text-xs">{selectedStage.inputs}</p>
                    </div>
                    <div className="border-t border-slate-800 pt-2">
                      <span className="text-emerald-400 font-mono text-[11px] block font-semibold">OUTPUT CONTRACT</span>
                      <p className="text-slate-300 font-mono text-xs">{selectedStage.outputs}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[11px] uppercase font-semibold font-mono">Underlying Codebase File</span>
                    <div className="flex items-center gap-2 mt-1">
                      <FileCode className="w-4 h-4 text-cyan-400" />
                      <span className="font-mono text-xs text-cyan-300 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                        {selectedStage.script}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between font-mono">
                  <span>Part of two-stage conditional processing</span>
                  <span className="text-cyan-400">{selectedStage.id} of 11</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
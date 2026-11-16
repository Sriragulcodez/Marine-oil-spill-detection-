import React, { useState } from 'react';
import { Database, Layers, CheckCircle2 } from 'lucide-react';
import { DATASETS_INFO } from '../data/projectData';
import StatusBadge from './StatusBadge';

export default function SectionDatasets() {
  const [activeDataset, setActiveDataset] = useState(DATASETS_INFO[0]);

  return (
    <section id="datasets" className="py-20 bg-ocean-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <StatusBadge status="Implemented" />
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Five-Dataset Traceability Matrix
          </h2>
          <p className="mt-2 text-slate-400 text-sm leading-relaxed">
            As documented in Section IV-E and Table II of the research paper[cite: 2], each dataset fulfills a specific purpose:
            binary classification, pixel segmentation, external benchmarking, coastal drone validation, and historical incident tracking.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Dataset list tabs */}
          <div className="lg:col-span-6 space-y-3">
            {DATASETS_INFO.map((ds) => {
              const isActive = activeDataset.id === ds.id;
              return (
                <div
                  key={ds.id}
                  onClick={() => setActiveDataset(ds)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.15)]'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">{ds.title}</span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                      {ds.size}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-slate-400">{ds.role}</div>
                </div>
              );
            })}
          </div>

          {/* Dataset Inspector */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">DATASET PROFILE</span>
                <h3 className="text-lg font-bold text-white mt-1">{activeDataset.title}</h3>
              </div>
              <StatusBadge status={activeDataset.status} />
            </div>

            <div className="mt-5 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-500 block uppercase font-mono">Modality</span>
                  <span className="text-slate-200 font-medium">{activeDataset.modality}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-500 block uppercase font-mono">Sample Count</span>
                  <span className="text-slate-200 font-medium font-mono">{activeDataset.size}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-500 block uppercase font-mono">Description & Usage</span>
                <span className="text-slate-200 mt-1 block leading-relaxed">{activeDataset.description}</span>
              </div>

              <div className="p-3.5 bg-ocean-950 rounded-xl border border-cyan-900/40 text-xs text-slate-300">
                <span className="font-semibold text-cyan-300 block mb-1">Academic Integrity Note:</span>
                Classifier (5,630 images) and Segmenter (8,070 pairs) are evaluated on distinct datasets[cite: 2]. 
                Their performance metrics are reported independently to reflect their specific tasks[cite: 2].
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
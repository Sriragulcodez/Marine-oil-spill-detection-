import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Award, ShieldAlert, Target } from 'lucide-react';
import { PROJECT_METRICS } from '../data/projectData';
import StatusBadge from './StatusBadge';

export default function SectionMetrics() {
  const clfData = [
    { name: 'Accuracy', value: PROJECT_METRICS.classifier.metrics.accuracy, fill: '#00e5ff' },
    { name: 'Recall', value: PROJECT_METRICS.classifier.metrics.recall, fill: '#10b981' },
    { name: 'Precision', value: PROJECT_METRICS.classifier.metrics.precision, fill: '#3b82f6' },
    { name: 'F1-Score', value: PROJECT_METRICS.classifier.metrics.f1Score * 100, fill: '#eab308' },
  ];

  const segData = [
    { name: 'Pixel Accuracy', value: PROJECT_METRICS.segmenter.metrics.pixelAccuracy, fill: '#00e5ff' },
    { name: 'Dice Coeff', value: PROJECT_METRICS.segmenter.metrics.dice * 100, fill: '#8b5cf6' },
    { name: 'Mean IoU', value: PROJECT_METRICS.segmenter.metrics.mIoU * 100, fill: '#ec4899' },
    { name: 'Pixel Recall', value: PROJECT_METRICS.segmenter.metrics.pixelRecall, fill: '#10b981' },
  ];

  return (
    <section id="metrics" className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <StatusBadge status="Model Evaluated" />
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Verified Experimental Metrics
          </h2>
          <p className="mt-2 text-slate-400 text-sm leading-relaxed">
            Reported performance values from Table II and Section VI of the research paper[cite: 2].
            Evaluations are reported separately to distinguish image-level classification from pixel-level segmentation[cite: 2].
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* ResNet-18 Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase">MODEL 1: BINARY CLASSIFIER</span>
                <h3 className="text-lg font-bold text-white">ResNet-18 Performance</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">5,630 Images[cite: 2]</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
              <div className="p-3 bg-slate-900 rounded-xl">
                <span className="text-[11px] text-slate-400 block font-sans">Accuracy</span>
                <span className="text-xl font-bold text-cyan-400">97.69%</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl">
                <span className="text-[11px] text-slate-400 block font-sans">Recall</span>
                <span className="text-xl font-bold text-emerald-400">98.16%</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl">
                <span className="text-[11px] text-slate-400 block font-sans">Precision</span>
                <span className="text-xl font-bold text-blue-400">95.17%</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl">
                <span className="text-[11px] text-slate-400 block font-sans">ROC-AUC</span>
                <span className="text-xl font-bold text-teal-300">0.9977</span>
              </div>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={clfData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis domain={[90, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {clfData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-3">
              <strong>Recall Justification:</strong> In operational surveillance, missed spills (false negatives) cause 
              uncontained ecological harm[cite: 2]. A dynamic class penalty (Oil Weight = 1.96) helped catch 374 out of 381 spills[cite: 2].
            </div>
          </div>

          {/* U-Net Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-purple-400 font-bold uppercase">MODEL 2: BOUNDARY SEGMENTER</span>
                <h3 className="text-lg font-bold text-white">4-Stage U-Net Performance</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">8,070 Mask Pairs[cite: 2]</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
              <div className="p-3 bg-slate-900 rounded-xl">
                <span className="text-[11px] text-slate-400 block font-sans">Pixel Acc</span>
                <span className="text-xl font-bold text-cyan-400">89.17%</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl">
                <span className="text-[11px] text-slate-400 block font-sans">Dice Coeff</span>
                <span className="text-xl font-bold text-purple-400">0.7985</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl">
                <span className="text-[11px] text-slate-400 block font-sans">Mean IoU</span>
                <span className="text-xl font-bold text-pink-400">0.6684</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl">
                <span className="text-[11px] text-slate-400 block font-sans">Pixel Recall</span>
                <span className="text-xl font-bold text-emerald-400">85.67%</span>
              </div>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={segData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis domain={[60, 100]} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {segData.map((entry, index) => (
                      <Cell key={`cell-seg-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="text-xs text-slate-400 leading-relaxed border-t border-slate-800 pt-3">
              <strong>Dice & IoU Justification:</strong> Background seawater covers over 85% of each SAR patch[cite: 2]. 
              A model predicting blank masks could achieve ~85% pixel accuracy, making Dice (0.7985) and mIoU (0.6684) the critical measures of spatial overlap[cite: 2].
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
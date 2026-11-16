import React from 'react';
import { PROJECT_METRICS } from '../data/projectData';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-10 text-xs text-slate-500 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-slate-300 font-semibold">{PROJECT_METRICS.institution}</div>
          <div className="text-slate-500">{PROJECT_METRICS.department}</div>
        </div>
        <div className="text-center md:text-right">
          <div>Mentored by {PROJECT_METRICS.authors[0].name}[cite: 2]</div>
          <div>Implemented by {PROJECT_METRICS.authors[1].name}, {PROJECT_METRICS.authors[2].name}, {PROJECT_METRICS.authors[3].name}[cite: 2]</div>
        </div>
      </div>
    </footer>
  );
}
import React from 'react';

export default function StatusBadge({ status }) {
  const getBadgeStyle = () => {
    switch (status) {
      case 'Model Evaluated':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40';
      case 'Implemented':
        return 'bg-cyan-950/80 text-cyan-400 border-cyan-500/40';
      case 'Simulated Workflow':
      case 'Simulated Verification':
        return 'bg-amber-950/80 text-amber-400 border-amber-500/40';
      case 'External Benchmark':
        return 'bg-blue-950/80 text-blue-400 border-blue-500/40';
      case 'UAV Validation':
        return 'bg-purple-950/80 text-purple-400 border-purple-500/40';
      case 'Historical Reference':
      case 'NOAA Historical Archive':
        return 'bg-slate-800 text-slate-300 border-slate-600';
      default:
        return 'bg-slate-900 text-slate-400 border-slate-700';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border ${getBadgeStyle()}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {status}
    </span>
  );
}
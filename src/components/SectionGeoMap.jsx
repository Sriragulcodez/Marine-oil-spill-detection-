import React, { useState } from 'react';
import { MapPin, Navigation, Radio, ShieldCheck, Compass, Info } from 'lucide-react';
import { MOCK_INCIDENTS } from '../data/projectData';
import StatusBadge from './StatusBadge';

export default function SectionGeoMap() {
  const [selectedIncident, setSelectedIncident] = useState(MOCK_INCIDENTS[0]);

  return (
    <section id="geospatial" className="py-20 bg-ocean-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <StatusBadge status="Implemented" />
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Geospatial Operations & Incident Context
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-2xl">
              Integrates GPS bounding coordinates with 4,929 NOAA historical records and commercial maritime corridors[cite: 2].
              Select an incident marker to inspect its verified coordinates and risk details.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Regional Focus: Bay of Bengal & Indian Ocean</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Radar GIS Map Surface */}
          <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                OFFSHORE SURVEILLANCE GRID
              </span>
              <span>Mercator Projection • 10m GSD Calibration</span>
            </div>

            {/* Visual SVG Map Interface */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#061529] border border-cyan-900/30">
              <svg className="w-full h-full" viewBox="0 0 650 380">
                {/* Coastal Outlines (Illustrative Coromandel Coast & Sri Lanka) */}
                <path
                  d="M 120,0 Q 140,90 150,170 Q 170,240 210,310 Q 230,350 250,380 L 0,380 L 0,0 Z"
                  fill="#0e2744"
                  stroke="#1c4875"
                  strokeWidth="1.5"
                />
                {/* Sri Lanka representation */}
                <path
                  d="M 230,290 C 255,270 270,300 260,330 C 245,350 225,330 230,290 Z"
                  fill="#0e2744"
                  stroke="#1c4875"
                  strokeWidth="1.5"
                />
                
                {/* Major Shipping Lanes (Corridor lines) */}
                <path d="M 180,60 L 450,220" stroke="#00e5ff" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
                <path d="M 230,340 L 520,310" stroke="#00e5ff" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
                <text x="320" y="145" fill="#38bdf8" fontSize="10" opacity="0.5" fontFamily="monospace">Major Oil Tanker Transit Corridor</text>

                {/* Grid coordinates */}
                <text x="20" y="360" fill="#64748b" fontSize="10" fontFamily="monospace">80°E - 85°E | 8°N - 15°N</text>

                {/* Markers */}
                {/* Marker 1: Chennai Port */}
                <g
                  className="cursor-pointer transition-transform hover:scale-125"
                  onClick={() => setSelectedIncident(MOCK_INCIDENTS[0])}
                >
                  <circle cx="210" cy="110" r="14" fill="rgba(245, 158, 11, 0.25)" className="animate-ping" />
                  <circle cx="210" cy="110" r="7" fill="#f59e0b" />
                  <text x="225" y="115" fill="#fef08a" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
                    INC-2026-081 (Severe)
                  </text>
                </g>

                {/* Marker 2: Gulf of Mannar */}
                <g
                  className="cursor-pointer transition-transform hover:scale-125"
                  onClick={() => setSelectedIncident(MOCK_INCIDENTS[1])}
                >
                  <circle cx="215" cy="285" r="12" fill="rgba(6, 182, 212, 0.2)" className="animate-ping" />
                  <circle cx="215" cy="285" r="6" fill="#06b6d4" />
                  <text x="230" y="290" fill="#a5f3fc" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
                    INC-2026-044 (Moderate)
                  </text>
                </g>

                {/* Marker 3: NOAA Historical Record */}
                <g
                  className="cursor-pointer transition-transform hover:scale-125"
                  onClick={() => setSelectedIncident(MOCK_INCIDENTS[2])}
                >
                  <circle cx="410" cy="200" r="6" fill="#f43f5e" />
                  <text x="425" y="205" fill="#fda4af" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
                    NOAA Ground-Truth (Tier 5)
                  </text>
                </g>
              </svg>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-3">
              <span>Markers represent verified project test coordinates and NOAA historical incidents[cite: 2].</span>
              <span className="font-mono text-cyan-400">Click marker to inspect data</span>
            </div>
          </div>

          {/* Incident Detail Inspector */}
          <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold">INCIDENT TELEMETRY</span>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedIncident.id}</h3>
              </div>
              <StatusBadge status={selectedIncident.status} />
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Location</span>
                <span className="text-slate-100 font-medium">{selectedIncident.location}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-slate-950 rounded-lg">
                  <span className="text-slate-500 block text-[11px]">Coordinates</span>
                  <span className="font-mono text-cyan-300">
                    {selectedIncident.coordinates[0]}°N, {selectedIncident.coordinates[1]}°E
                  </span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg">
                  <span className="text-slate-500 block text-[11px]">Confidence</span>
                  <span className="font-mono text-emerald-400 font-bold">{selectedIncident.confidence}</span>
                </div>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg">
                <span className="text-slate-500 block text-[11px]">Estimated Area</span>
                <span className="font-mono text-slate-200 font-bold">{selectedIncident.coverageRatio}</span>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg">
                <span className="text-slate-500 block text-[11px]">In-Situ Buoy Telemetry (PPM)</span>
                <span className="font-mono text-amber-300 font-semibold">{selectedIncident.buoyReading}</span>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-lg">
                <span className="text-slate-500 block text-[11px]">Hydrocarbon Classification</span>
                <span className="font-mono text-slate-200">{selectedIncident.oilType}</span>
              </div>

              <div className="p-3 bg-ocean-950 rounded-xl border border-cyan-900/50">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-300 font-semibold">Composite Risk Score</span>
                  <span className="font-mono font-bold text-sm text-cyan-300">{selectedIncident.riskScore} / 100</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${selectedIncident.riskScore}%` }} />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              Evaluated via <code className="text-cyan-300 font-mono">decision_engine.py</code> & <code className="text-cyan-300 font-mono">geolocation.py</code>[cite: 1, 2].
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
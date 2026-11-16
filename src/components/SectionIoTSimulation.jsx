import React, { useState } from 'react';
import { Radio, AlertOctagon, Send, CheckCircle2, RefreshCw, Smartphone, Mail } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function SectionIoTSimulation() {
  const [simStep, setSimStep] = useState(0); // 0: Idle, 1: Satellite, 2: AI inference, 3: Buoy check, 4: Alert drafted
  const [isSimulating, setIsSimulating] = useState(false);

  const startSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);
    setTimeout(() => setSimStep(2), 1500);
    setTimeout(() => setSimStep(3), 3000);
    setTimeout(() => {
      setSimStep(4);
      setIsSimulating(false);
    }, 4500);
  };

  const resetSimulation = () => {
    setSimStep(0);
    setIsSimulating(false);
  };

  return (
    <section id="simulation" className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <StatusBadge status="Simulated Workflow" />
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              IoT Telemetry & Intelligent Alert Simulation
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-2xl">
              Demonstrates the proposed closed loop connecting satellite detection to in-situ buoy verification 
              and automated SMS/Email incident dispatch[cite: 2].
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={startSimulation}
              disabled={isSimulating}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isSimulating
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(0,229,255,0.35)]'
              }`}
            >
              {isSimulating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Radio className="w-3.5 h-3.5" />}
              <span>{isSimulating ? 'Processing Pipeline...' : 'Run Simulation'}</span>
            </button>
            <button
              onClick={resetSimulation}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
            >
              Reset
            </button>
          </div>
        </div>

        {/* 4-Step Interactive Progress Tracker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { step: 1, title: "1. SAR Ingestion", desc: "Sentinel-1 GRD patch received" },
            { step: 2, title: "2. Dual-AI Inference", desc: "ResNet-18 (98.16%) & U-Net (Dice: 0.7985)" },
            { step: 3, title: "3. Buoy Cross-Check", desc: "Simulated MQTT reading: 42.1 ppm" },
            { step: 4, title: "4. Alert Generation", desc: "Emergency SMS/Email drafted" },
          ].map((item) => {
            const isCompleted = simStep >= item.step;
            const isCurrent = simStep === item.step;
            return (
              <div
                key={item.step}
                className={`p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                    : isCompleted
                    ? 'bg-slate-950/80 border-emerald-500/50'
                    : 'bg-slate-950/40 border-slate-800 text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold font-mono ${isCompleted ? 'text-cyan-400' : 'text-slate-500'}`}>
                    {item.title}
                  </span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="text-[11px] text-slate-400">{item.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Simulation Output Area */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Simulated MQTT Terminal */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-5 font-mono text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                SIMULATED MQTT BROKER CONSOLE (tcp://broker.hivemq.com:1883)
              </span>
              <span>Topic: marine/oilspill/telemetry</span>
            </div>

            <div className="space-y-2 text-slate-300 min-h-[220px]">
              <div>[SYSTEM INIT] Broker client connected to coastal telemetry mesh...</div>
              {simStep >= 1 && (
                <div className="text-cyan-400">
                  [10:14:02 UTC] &gt;&gt; INGEST: Sentinel-1 SAR Granule S1A_IW_GRDH_1SDV_20261010T0345...
                </div>
              )}
              {simStep >= 2 && (
                <div className="text-emerald-400">
                  [10:14:04 UTC] &gt;&gt; INFERENCE: ResNet-18 Conf: 98.16% (Class 1: Oil Spill) | U-Net Mask generated.
                  <br />[10:14:04 UTC] &gt;&gt; SEVERITY: Calculated 14.8% Coverage (~18.4 km²) -&gt; Tier 4 (Severe).
                </div>
              )}
              {simStep >= 3 && (
                <div className="text-amber-400">
                  [10:14:06 UTC] &gt;&gt; MQTT VERIFY: Subscribed Buoy #BY-42 (13.12°N, 80.35°E).
                  <br />[10:14:06 UTC] &gt;&gt; SENSOR TELEMETRY: Dissolved Hydrocarbon: 42.1 ppm (Threshold &gt; 25.0 ppm EXCEEDED).
                </div>
              )}
              {simStep >= 4 && (
                <div className="text-rose-400 font-bold">
                  [10:14:08 UTC] &gt;&gt; DECISION ENGINE: Composite Risk Score: 84/100.
                  <br />[10:14:08 UTC] &gt;&gt; DISPATCH: Triggering automated SMS and Email Maritime Incident Dispatch...
                </div>
              )}
              {simStep === 0 && (
                <div className="text-slate-600 italic">Waiting for simulation trigger. Click 'Run Simulation' above.</div>
              )}
            </div>
          </div>

          {/* Simulated SMS / Email Alert Card */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-white">DISPATCH PREVIEW (Simulated)</span>
              </div>
              <span className="text-[10px] font-mono bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800">
                Not Sent (Simulated)
              </span>
            </div>

            <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span>To: Coast Guard MRCC Chennai</span>
                <span className="font-mono">Priority: HIGH</span>
              </div>

              <div className="font-mono text-slate-200 leading-relaxed space-y-1">
                <div className="text-rose-400 font-bold">🚨 EMERGENCY OIL SPILL ALERT</div>
                <div><strong>Location:</strong> Bay of Bengal (13.12°N, 80.35°E)</div>
                <div><strong>Severity:</strong> Tier 4 (Severe) • ~18.4 km² Spread</div>
                <div><strong>Confidence:</strong> 98.16% (ResNet-18)[cite: 2]</div>
                <div><strong>Buoy Telemetry:</strong> 42.1 ppm Hydrocarbons (Confirmed)</div>
                <div><strong>Suspected Source:</strong> Coromandel Shipping Route</div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 leading-relaxed font-mono">
              <strong>Academic Integrity Notice:</strong> Physical SMS/Email credentials and live offshore sensor buoys 
              are simulated for this review. Model inference is real and validated[cite: 2].
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
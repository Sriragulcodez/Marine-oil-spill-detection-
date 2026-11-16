import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Cpu, Eye, Radio, ShieldAlert, Sparkles, Sliders } from 'lucide-react';

const FRAMEWORK_PILLARS = [
  {
    step: "01",
    tag: "RADAR INGESTION & SPECKLE FILTERING",
    title: "All-Weather SAR Satellite Acquisition",
    subtitle: "Sentinel-1 C-Band GRD & High-Res Drone Imagery",
    description:
      "Captures oceanic backscatter irrespective of severe monsoon cloud cover and nighttime conditions. Incoming granules undergo radiometric calibration and Lee-filter speckle suppression to produce normalized 256x256 float tensors.",
    badge: "Input Pipeline",
    stats: [
      { label: "Sensor Mode", value: "IW GRD (VV/VH)" },
      { label: "Spatial Res", value: "10m GSD" },
      { label: "Preprocess", value: "Speckle Denoising" }
    ],
    visualType: "radar"
  },
  {
    step: "02",
    tag: "TWO-TIER DEEP LEARNING CORE",
    title: "Dual-Stage AI Screening & Segmentation",
    subtitle: "ResNet-18 Classifier + 4-Stage Symmetric U-Net",
    description:
      "Filters clean ocean water instantly through a fine-tuned ResNet-18 backbone (97.69% accuracy, 98.16% recall). Only flagged positive slicks activate the 4-stage U-Net (Dice: 0.7985, mIoU: 0.6684), isolating pixel boundaries via skip connections.",
    badge: "Model Evaluated",
    stats: [
      { label: "Classification Recall", value: "98.16%" },
      { label: "Segmentation Dice", value: "0.7985" },
      { label: "VRAM Footprint", value: "< 2.8 GB (AMP)" }
    ],
    visualType: "ai"
  },
  {
    step: "03",
    tag: "QUANTITATIVE DAMAGE TRIAGE",
    title: "Hydrocarbon Profiling & Severity Rating",
    subtitle: "Backscatter Damping Analysis & 10m GSD Area Mapping",
    description:
      "Computes pixel coverage ratios and projects physical contaminated area in km² using satellite ground sampling metadata. Simultaneously analyzes radar damping depth to distinguish heavy crude oil from diesel sheens and biogenic look-alikes.",
    badge: "Decision Engine",
    stats: [
      { label: "Severity Tiers", value: "5-Level Risk" },
      { label: "Area Formula", value: "Px × 100m² / 1e6" },
      { label: "Type Engine", value: "Damping Variance" }
    ],
    visualType: "triage"
  },
  {
    step: "04",
    tag: "AUTONOMOUS RESPONSE & DISPATCH",
    title: "IoT Buoy Verification & Maritime Dispatch",
    subtitle: "Geospatial Correlator & Coast Guard Alerting",
    description:
      "Cross-verifies satellite slick detections against in-situ marine buoy telemetry. When risk thresholds are confirmed, automated emergency dispatch payloads with exact coordinates and shipping lane proximity are transmitted to Maritime Rescue Coordination Centres.",
    badge: "Response Network",
    stats: [
      { label: "Broker Protocol", value: "MQTT / Telemetry" },
      { label: "GIS Integration", value: "Leaflet Auto-Zoom" },
      { label: "Dispatch Latency", value: "< 2.4 Seconds" }
    ],
    visualType: "dispatch"
  }
];

export default function FrameworkShowcase() {
  const [activePillar, setActivePillar] = useState(0);

  return (
    <section id="framework" className="py-24 bg-[#fbfbfd] text-zinc-900 border-b border-zinc-200/80">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10">

        {/* Section Heading matching Robixx style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-red-600 font-semibold mb-3">
              INTEGRATED ARCHITECTURAL FRAMEWORK
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-900 font-serif max-w-2xl leading-[1.15]">
              Built for precision maritime surveillance.
            </h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-md leading-relaxed font-normal">
            A four-pillar operational pipeline bridging satellite remote sensing, dual-tier deep learning,
            and automated coastal emergency response.
          </p>
        </div>

        {/* Massive Robixx Showcase Cards */}
        <div className="space-y-8">
          {FRAMEWORK_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white border border-zinc-200/90 rounded-[32px] p-8 sm:p-12 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden"
            >
              <div className="grid lg:grid-cols-12 gap-10 items-center">

                {/* Left Visual Stage */}
                <div className="lg:col-span-5 bg-[#090d16] rounded-2xl overflow-hidden aspect-video sm:aspect-[4/3] relative flex items-center justify-center p-6 border border-zinc-800 shadow-inner">
                  
                  {/* Procedural Canvas Based on Visual Type */}
                  {pillar.visualType === "radar" && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:16px_16px]" />
                      <div className="w-48 h-48 rounded-full border border-cyan-500/25 flex items-center justify-center relative">
                        <div className="w-32 h-32 rounded-full border border-cyan-500/20" />
                        <div className="w-16 h-16 rounded-full border border-cyan-500/30" />
                        <div className="absolute inset-0 origin-center animate-spin [animation-duration:5s] bg-gradient-to-tr from-cyan-400/20 via-transparent to-transparent rounded-full" />
                      </div>
                      <span className="absolute bottom-3 left-4 text-[10px] font-mono text-cyan-400">
                        C-BAND SAR // 10m RESOLUTION
                      </span>
                    </div>
                  )}

                  {pillar.visualType === "ai" && (
                    <div className="w-full h-full relative flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 300 200">
                        <rect width="300" height="200" fill="#060c18" />
                        {/* Simulated SAR image slice */}
                        <path d="M 20,40 Q 150,20 280,50 L 280,180 Q 150,160 20,180 Z" fill="#0d1b2a" opacity="0.6" />
                        {/* U-Net segmented spill slick in cyan glow */}
                        <path
                          d="M 80,70 C 130,50 190,80 220,60 C 250,110 200,150 160,130 C 110,140 70,110 80,70 Z"
                          fill="rgba(0, 229, 255, 0.35)"
                          stroke="#00e5ff"
                          strokeWidth="2.5"
                        />
                        <circle cx="160" cy="100" r="3" fill="#fff" />
                        <text x="30" y="30" fill="#00e5ff" fontSize="10" fontFamily="monospace">
                          RESNET-18 (97.69%) → U-NET (DICE: 0.7985)
                        </text>
                      </svg>
                    </div>
                  )}

                  {pillar.visualType === "triage" && (
                    <div className="w-full h-full flex flex-col justify-between p-2 font-mono text-xs">
                      <div className="flex justify-between text-slate-400 border-b border-zinc-800 pb-2">
                        <span>HYDROCARBON FINGERPRINT</span>
                        <span className="text-amber-400">TIER 4 (SEVERE)</span>
                      </div>
                      <div className="space-y-2 py-4">
                        <div className="flex justify-between text-zinc-300">
                          <span>Crude Damping Depth:</span>
                          <span className="text-cyan-300">-18.4 dB</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-amber-400 h-full rounded-full" style={{ width: '74%' }} />
                        </div>
                        <div className="flex justify-between text-zinc-300 text-[11px] pt-1">
                          <span>Physical Extent:</span>
                          <span className="text-cyan-400 font-bold">20.7039 km²</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-zinc-500">
                        DECISION ENGINE // PROJECTION: WGS84
                      </div>
                    </div>
                  )}

                  {pillar.visualType === "dispatch" && (
                    <div className="w-full h-full p-3 font-mono text-[11px] text-zinc-300 flex flex-col justify-between">
                      <div className="text-red-400 font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        <span>EMERGENCY DISPATCH PROTOCOL</span>
                      </div>
                      <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-zinc-400 space-y-1">
                        <div>TO: MRCC COAST GUARD CHENNAI</div>
                        <div>LAT: 13.2500°N | LON: 80.3400°E</div>
                        <div className="text-emerald-400">STATUS: VERIFIED BY IN-SITU BUOY</div>
                      </div>
                      <div className="text-cyan-400 text-[10px]">
                        BROKER: MQTT // LATENCY: 2.1s
                      </div>
                    </div>
                  )}

                </div>

                {/* Right Content Column */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono font-bold text-red-600 tracking-wider">
                        PILLAR {pillar.step}
                      </span>
                      <span className="text-zinc-300">•</span>
                      <span className="text-xs font-mono text-zinc-500 uppercase">
                        {pillar.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-serif font-light text-zinc-900 tracking-tight mb-2">
                      {pillar.title}
                    </h3>

                    <h4 className="text-sm font-medium text-zinc-700 mb-4">
                      {pillar.subtitle}
                    </h4>

                    <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-xl font-normal">
                      {pillar.description}
                    </p>

                    {/* Stats strip */}
                    <div className="grid grid-cols-3 gap-3 my-6 pt-6 border-t border-zinc-100 max-w-lg">
                      {pillar.stats.map((s, i) => (
                        <div key={i}>
                          <span className="text-[10px] font-mono uppercase text-zinc-600 block">
                            {s.label}
                          </span>
                          <span className="text-sm sm:text-base font-bold text-zinc-900 font-mono">
                            {s.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Circular Robixx Link Button */}
                  <div className="flex items-center justify-between pt-4">
                    <a
                      href="#console"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-900 hover:text-red-600 transition-colors"
                    >
                      <span>Simulate in Operations Console</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    <div className="w-12 h-12 rounded-full bg-zinc-900 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-red-600 transition-all shadow-sm">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
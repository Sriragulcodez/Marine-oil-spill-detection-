import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Satellite, 
  Cpu, 
  Radio, 
  ArrowDown, 
  CheckCircle2, 
  Sparkles, 
  Terminal, 
  X, 
  ChevronRight, 
  ShieldAlert, 
  Activity, 
  ChevronsDown,
  ChevronsUp,
  Layers,
  Compass,
  RotateCcw,
  Zap,
  Info
} from 'lucide-react';

// ============================================================================
// 1. KPRIET PIPELINE DATA TAXONOMY
// ============================================================================
const WORKFLOW_DATA = {
  coins: [
    { id: "c1", title: "SAR INGEST", sub: "Sentinel-1 C-Band", symbol: "雷", pillar: "INPUT" },
    { id: "c2", title: "RESNET-18", sub: "98.16% Recall", symbol: "智", pillar: "AI PROCESSING" },
    { id: "c3", title: "U-NET MASK", sub: "Dice: 0.7985", symbol: "界", pillar: "AI PROCESSING" },
    { id: "c4", title: "SEVERITY", sub: "10m GSD / km²", symbol: "算", pillar: "DECISION & VERIFICATION" },
    { id: "c5", title: "IOT BUOY", sub: "MQTT Telemetry", symbol: "警", pillar: "ALERT & RESPONSE" },
  ],
  pillars: [
    {
      id: "input",
      pillarNumber: "01",
      title: "INPUT",
      subtitle: "Raw Ocean Observation",
      badge: "Pillar 1",
      headerColor: "text-emerald-700",
      accentBg: "bg-emerald-50",
      borderColor: "border-emerald-200",
      description: "Acquires multi-spectral and synthetic radar backscatter through heavy monsoon cloud covers, standardizing granules into high-precision analysis tensors.",
      nodes: [
        {
          id: "node-sat",
          label: "Satellite / UAV Images",
          script: "Copernicus API / Drone Ingestion",
          codeFile: "datasets/Sentinel-1 SAR Detection / Drone Zenodo",
          inputs: "Sentinel-1 C-Band GRD Granules (IW Mode, VV+VH) & 1080p Drone RGB",
          outputs: "Calibrated SAR backscatter matrix (16-bit float intensity)",
          metrics: {
            "Resolution": "10m GSD (Ground Sampling Distance)",
            "Polarization": "VV / VH Dual Polarization",
            "Swath Width": "250 km (Interferometric Wide Swath)",
            "Lighting": "All-Weather Day/Night Active Radar"
          },
          details: "Acquires Sentinel-1 radar backscatter and high-altitude drone captures independent of solar illumination or atmospheric cloud obstructions, preventing observational blackout during coastal monsoon squalls."
        },
        {
          id: "arrow-in-1",
          type: "connector"
        },
        {
          id: "node-preprocess",
          label: "Image Preprocessing",
          script: "src/inspect_dataset.py",
          codeFile: "src/inspect_dataset.py",
          inputs: "Raw 16-bit SAR Amplitude / Decibel Array",
          outputs: "Normalized 256x256 FP16 Float Tensors",
          metrics: {
            "Filter Type": "Refined Lee Speckle Filter (5x5)",
            "Decibel Conversion": "sigma_0 (dB) = 10 * log10(DN^2 + eps)",
            "Normalization": "Min-Max Standard Scaled [-25dB, 0dB]",
            "Patch Size": "256 x 256 Window Slicing"
          },
          details: "Eliminates multiplicative speckle noise inherent to coherent microwave imaging using an adaptive spatial Lee filter, scaling backscatter intensity to logarithmic decibel values for neural network ingestion."
        }
      ]
    },
    {
      id: "ai",
      pillarNumber: "02",
      title: "AI PROCESSING",
      subtitle: "Dual-Stage Deep Learning",
      badge: "Pillar 2",
      headerColor: "text-blue-700",
      accentBg: "bg-blue-50",
      borderColor: "border-blue-200",
      description: "Executes a conditional two-stage deep learning pipeline: instant binary screening via ResNet-18 followed by pixel boundary segmentation via U-Net.",
      nodes: [
        {
          id: "node-backbone",
          label: "Lightweight AI Model",
          script: "models/oil_spill_classifier.pth",
          codeFile: "src/train_classifier.py",
          inputs: "Preprocessed 256x256x3 Normalized Tensors",
          outputs: "Deep Feature Representations (512-dim embedding)",
          metrics: {
            "Backbone": "PyTorch ImageNet Pre-trained ResNet-18",
            "Hardware Opt": "FP16 Automatic Mixed Precision (torch.amp)",
            "Custom Head": "Dropout(p=0.3) -> Linear(in=512, out=2)",
            "VRAM Footprint": "2.8 GB VRAM (RTX 2050 CUDA 11.8)"
          },
          details: "Leverages residual skip connections to extract hierarchical textural features while maintaining a compact memory footprint optimized for resource-constrained edge machines."
        },
        {
          id: "arrow-ai-1",
          type: "connector"
        },
        {
          id: "node-classifier",
          label: "Oil Spill Detection",
          script: "src/predict.py",
          codeFile: "models/oil_spill_classifier.pth",
          inputs: "Feature Embeddings from ResNet-18 Backbone",
          outputs: "Binary Decision: Class 0 (Clean Water) vs Class 1 (Oil Spill)",
          metrics: {
            "Validation Accuracy": "97.69% (1,100 / 1,126 Correct)",
            "Spill Recall": "98.16% (374 / 381 Caught)",
            "Spill Precision": "95.17% (19 False Alarms)",
            "Class Weight": "Oil Penalty Factor = 1.96"
          },
          details: "High-speed binary classifier acting as an operational filter. Class weighting heavily penalizes false negatives, catching 374 out of 381 spills to prevent uncontained ecological damage."
        },
        {
          id: "arrow-ai-2",
          type: "connector"
        },
        {
          id: "node-segmenter",
          label: "Spill Segmentation",
          script: "src/train_segmentation.py",
          codeFile: "models/oil_spill_segmentation.pth",
          inputs: "Positive Flagged SAR Patches (Class 1 Only)",
          outputs: "256x256 Binary Pixel Mask (P_ij in {0, 1})",
          metrics: {
            "Dice Coefficient": "0.7985 (Spatial Overlap F1)",
            "Mean IoU": "0.6684 (Jaccard Index)",
            "Pixel Accuracy": "89.17% (Across 8,070 Deep-SAR Pairs)",
            "Loss Function": "0.5 * BCE Loss + 0.5 * Dice Loss"
          },
          details: "4-Stage symmetric encoder-decoder U-Net with lateral skip connections. Delineates complex fractal contours of slicks by fusing low-level spatial geometry with high-level semantic context."
        }
      ]
    },
    {
      id: "decision",
      pillarNumber: "03",
      title: "DECISION & VERIFICATION",
      subtitle: "Quantitative Spatial Triage",
      badge: "Pillar 3",
      headerColor: "text-cyan-700",
      accentBg: "bg-cyan-50",
      borderColor: "border-cyan-200",
      description: "Transforms raw pixel masks into physical contamination areas, classifies hydrocarbon types, cross-references NOAA historical archives, and validates in-situ buoy telemetry.",
      nodes: [
        {
          id: "node-area",
          label: "Spill Area Estimation",
          script: "src/severity.py",
          codeFile: "src/severity.py",
          inputs: "Binary Segmentation Mask (256x256) & 10m GSD metadata",
          outputs: "Pixel Coverage % and Physical Contamination (km²)",
          metrics: {
            "Area Formula": "Area = (Positive Pixels * GSD^2) / 1,000,000",
            "Single Pixel Area": "100 m² per pixel (at 10m GSD)",
            "Calibration Mode": "Affine Geospatial Transform Calibration",
            "Coverage Metric": "Contaminated Ratio against Swath Bounding"
          },
          details: "Computes pixel occupancy and translates image coordinates into square kilometers using satellite orbital geometry."
        },
        {
          id: "node-subgrid",
          type: "subgrid",
          left: {
            id: "node-severity",
            label: "Severity",
            script: "src/severity.py",
            codeFile: "src/severity.py",
            inputs: "Calculated Coverage Ratio %",
            outputs: "5-Tier Threat Classification",
            metrics: {
              "Tier 1 (Minor)": "< 1% Coverage (< 1.5 km²)",
              "Tier 2 (Moderate)": "1% - 5% Coverage (1.5 - 6 km²)",
              "Tier 3 (Significant)": "5% - 15% Coverage (6 - 18 km²)",
              "Tier 4 (Severe)": "15% - 30% Coverage (18 - 35 km²)",
              "Tier 5 (Critical)": "> 30% Coverage (> 35 km²)"
            },
            details: "Standardized five-tier environmental hazard triage enabling maritime authorities to escalate resources proportionally."
          },
          right: {
            id: "node-gps",
            label: "GPS",
            script: "src/geolocation.py",
            codeFile: "src/geolocation.py",
            inputs: "Granule Corner Coordinates (Lat/Long)",
            outputs: "Geocoded Corridor & NOAA Correlation",
            metrics: {
              "Reference Archive": "4,929 NOAA Historical Records",
              "Database File": "datasets/NOAA Historical Incidents.csv",
              "Proximity Radius": "25 km Commercial Shipping Corridors",
              "Address Engine": "Autonomous Geodetic Maritime Resolver"
            },
            details: "Binds satellite bounding boxes to global coordinates and checks proximity against maritime trade corridors and NOAA historical tanker incidents."
          }
        },
        {
          id: "node-iot",
          label: "IoT Verification",
          type: "blue",
          script: "src/decision_engine.py",
          codeFile: "src/decision_engine.py",
          inputs: "Simulated MQTT Buoy Hydrocarbon Telemetry Feed",
          outputs: "In-situ Confirmation Flag (Confirmed / Look-Alike)",
          metrics: {
            "Sensor Node": "Oceanic Buoy Hydrocarbon Probe",
            "Alert Threshold": "Dissolved VOCs > 25.0 PPM",
            "Protocol": "MQTT tcp://broker.hivemq.com:1883",
            "Cross-Check": "Eliminates Low-Wind SAR Look-Alikes"
          },
          details: "Validates satellite slick detections using in-situ ocean surface buoy sensors. Hydrocarbon readings above 25 ppm confirm active petroleum release, ruling out biogenic films and wind shadows."
        },
        {
          id: "node-risk",
          label: "Risk Assessment",
          script: "src/decision_engine.py",
          codeFile: "src/decision_engine.py",
          inputs: "Severity Tier, Oil Type Damping, and Buoy Telemetry",
          outputs: "Composite Environmental Danger Index (0 - 100%)",
          metrics: {
            "Risk Weighting": "40% Area + 30% Hydrocarbon + 30% Proximity",
            "Damping Analysis": "Heavy Crude Oil vs Surface Diesel Sheen",
            "Biosphere Warning": "Proximity to Coral & Estuary Reserves",
            "Composite Scale": "0-40 Low | 40-75 High | 75-100 Critical"
          },
          details: "Synthesizes multi-source data into a defensible environmental danger index used to prioritize automated emergency response."
        }
      ]
    },
    {
      id: "alert",
      pillarNumber: "04",
      title: "ALERT & RESPONSE",
      subtitle: "Automated Emergency Dispatch",
      badge: "Pillar 4",
      headerColor: "text-rose-700",
      accentBg: "bg-rose-50",
      borderColor: "border-rose-200",
      description: "Compiles verified incident intelligence into microservice REST endpoints, dispatches emergency alerts, and updates live command consoles.",
      nodes: [
        {
          id: "node-alertgen",
          label: "Intelligent Alert Gen.",
          type: "teal",
          script: "api/main.py",
          codeFile: "api/main.py (Port 8000)",
          inputs: "Verified Tier 4/5 Incident Payload",
          outputs: "Structured JSON Maritime Dispatch Packet",
          metrics: {
            "FastAPI Endpoint": "POST /predict & GET /health",
            "Execution Latency": "1.84s (Inference + Geo Triage)",
            "Dispatch Standard": "IMO / MARPOL Emergency Annex I",
            "Payload Format": "REST JSON + Base64 Visual Overlay"
          },
          details: "Compiles georeferenced incident metadata, spatial damage projections, and oil classification into automated dispatch packets."
        },
        {
          id: "arrow-alt-1",
          type: "connector"
        },
        {
          id: "node-dispatch",
          label: "SMS + Email + Dashboard",
          type: "teal",
          script: "api/main.py Webhooks",
          codeFile: "dashboard/index.html & SMS Dispatch",
          inputs: "Formatted Incident Packet",
          outputs: "Multi-Channel Emergency Notification",
          metrics: {
            "Cellular Channel": "Automated SMS to Duty Operations Officer",
            "Official Channel": "SMTP Encrypted Email with Attached PDF",
            "Dashboard Feed": "Live WebSocket GIS Map Auto-Center",
            "Dispatch Urgency": "IMMEDIATE (Action Required < 30 Mins)"
          },
          details: "Distributes alerts across SMS, official email channels, and the live Leaflet GIS monitoring console with exact coordinates and estimated arrival times."
        },
        {
          id: "arrow-alt-2",
          type: "connector"
        },
        {
          id: "node-authorities",
          label: "Authorities / Response",
          type: "maroon",
          script: "Coast Guard MRCC Interception",
          codeFile: "External Maritime Response Protocol",
          inputs: "Emergency Dispatch Packet & Incident Coordinates",
          outputs: "Field Containment & Vessel Interception Order",
          metrics: {
            "Primary Recipient": "MRCC Coast Guard (Chennai / Gulf Sector)",
            "Port Control": "Pollution Response Vessel Flotilla",
            "Containment Action": "Offshore Boom & Skimmer Deployment",
            "Target En Route": "Intercept Suspected Cargo/Tanker Route"
          },
          details: "Final emergency deployment action. Directs Coast Guard interceptor craft and containment skimmers directly to the spill center."
        }
      ]
    }
  ]
};

// ============================================================================
// 2. BIDIRECTIONAL TACTILE TALISMAN CHARM COMPONENT
// ============================================================================
function CoinTasselCharm({ isExpanded, onToggle, onSelectPillar }) {
  const dragY = useMotionValue(0);
  const springY = useSpring(dragY, { stiffness: 280, damping: 20 });
  const tasselStretch = useTransform(dragY, [-50, 160], [0.85, 1.45]);
  const coinSway = useTransform(dragY, [-50, 160], [-5, 8]);

  const handleDragEnd = (event, info) => {
    // If pulled down past +50px, deploy!
    if (info.offset.y > 50 && !isExpanded) {
      onToggle(true);
    } 
    // If pushed up past -40px when open, retract!
    else if (info.offset.y < -40 && isExpanded) {
      onToggle(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none py-6">
      
      {/* Draggable Charm Rig */}
      <motion.div
        drag="y"
        dragConstraints={{ top: isExpanded ? -80 : 0, bottom: isExpanded ? 0 : 160 }}
        dragElastic={0.22}
        onDragEnd={handleDragEnd}
        style={{ y: springY }}
        className="relative flex flex-col items-center cursor-grab active:cursor-grabbing group"
      >
        
        {/* TOP: Detailed Red Silk Endless Mystic Knot (SVG) */}
        <div className="relative w-32 h-24 flex items-center justify-center drop-shadow-[0_8px_20px_rgba(220,38,38,0.35)]">
          <svg className="w-full h-full" viewBox="0 0 120 90" fill="none">
            {/* Top hanging loop */}
            <path
              d="M 60,6 C 45,6 42,26 60,32 C 78,26 75,6 60,6 Z"
              stroke="#991b1b"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Symmetrical Butterfly side loops */}
            <path
              d="M 36,32 C 8,14 4,50 32,50 C 48,50 48,32 60,38 C 72,32 72,50 88,50 C 116,50 112,14 84,32"
              stroke="#dc2626"
              strokeWidth="4.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Center woven flower core */}
            <circle cx="60" cy="44" r="16" fill="#991b1b" stroke="#ef4444" strokeWidth="2.5" />
            <circle cx="60" cy="44" r="9" fill="#7f1d1d" />
            <path d="M 52,44 L 68,44 M 60,36 L 60,52" stroke="#fca5a5" strokeWidth="2" />
          </svg>
        </div>

        {/* MIDDLE: 5 Embossed Brass Coins threaded with Red Silk Ribbon */}
        <div className="relative flex flex-col items-center -mt-4">
          
          {/* Silk Cord through coin centers */}
          <motion.div 
            style={{ scaleY: tasselStretch }}
            className="absolute top-0 bottom-0 w-3 bg-gradient-to-b from-[#dc2626] via-[#b91c1c] to-[#991b1b] rounded-full z-20 shadow-md"
          />

          {WORKFLOW_DATA.coins.map((coin, index) => (
            <motion.div
              key={coin.id}
              style={{ rotateZ: coinSway }}
              whileHover={{ scale: 1.12, y: -4, zIndex: 40 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onSelectPillar(coin.pillar);
              }}
              className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#b88628] via-[#f3df9b] to-[#c99732] border-[3px] border-[#7a5513] shadow-[0_10px_22px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center cursor-pointer transition-transform ${
                index !== 0 ? "-mt-10 sm:-mt-12" : ""
              }`}
              style={{ zIndex: 10 + index }}
            >
              {/* Embossed Inner Ring */}
              <div className="w-[88%] h-[88%] rounded-full border border-[#6b470a]/60 flex flex-col items-center justify-center relative p-1 bg-gradient-to-br from-amber-100/20 to-transparent">
                
                {/* Ancient Square Hole */}
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-[3px] border-2 border-[#543806] bg-[#080d1a] flex items-center justify-center shadow-inner z-30">
                  <span className="text-[10px] font-bold text-[#fef08a] font-serif">
                    {coin.symbol}
                  </span>
                </div>

                {/* Engraved Stage Labels */}
                <span className="text-[8px] sm:text-[9px] font-mono font-black text-[#3d2703] tracking-tighter uppercase mt-0.5 z-10">
                  {coin.title}
                </span>
                <span className="text-[7px] font-mono text-[#523506] font-bold z-10">
                  {coin.sub}
                </span>

              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM: Carved Wooden Bead & Silk Tassel Fringe */}
        <div className="relative flex flex-col items-center -mt-3">
          
          {/* Thread knot */}
          <div className="w-3.5 h-3.5 rounded-full bg-[#991b1b] border border-[#ef4444] z-20 shadow-sm" />

          {/* Wooden Bead with rich grain gradient */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#3b2318] via-[#5c3724] to-[#7c4d32] border-2 border-[#24150e] shadow-xl flex items-center justify-center z-20 my-1 group-hover:scale-110 transition-transform">
            <div className="w-2.5 h-2.5 rounded-full bg-[#170c07]" />
          </div>

          <div className="w-3 h-3 rounded-full bg-[#7f1d1d] z-20" />

          {/* Flowing Red Silk Tassel Strands */}
          <motion.div 
            style={{ scaleY: tasselStretch }}
            className="flex gap-1.5 pt-1 origin-top"
          >
            <div className="w-1.5 h-16 sm:h-22 bg-gradient-to-b from-[#dc2626] to-[#7f1d1d] rounded-full shadow-md" />
            <div className="w-2 h-20 sm:h-28 bg-gradient-to-b from-[#ef4444] via-[#dc2626] to-[#7f1d1d] rounded-full shadow-lg" />
            <div className="w-1.5 h-16 sm:h-22 bg-gradient-to-b from-[#dc2626] to-[#7f1d1d] rounded-full shadow-md" />
          </motion.div>

        </div>

      </motion.div>

      {/* Dynamic Interaction Pill */}
      <div className="mt-8 text-center space-y-1">
        <button
          type="button"
          onClick={() => onToggle(!isExpanded)}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-zinc-300 hover:border-black text-zinc-900 font-mono text-xs shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          {isExpanded ? (
            <>
              <ChevronsUp className="w-4 h-4 text-rose-600 animate-bounce" />
              <span className="font-bold">Drag Bead Up or Click to Retract</span>
            </>
          ) : (
            <>
              <ChevronsDown className="w-4 h-4 text-emerald-600 animate-bounce" />
              <span className="font-bold">Drag Bead Down or Click to Expand Workflow</span>
            </>
          )}
        </button>
        <p className="text-[11px] text-zinc-500 font-mono">
          Bidirectional tactile drag physics • Click coins to jump directly to any pillar
        </p>
      </div>

    </div>
  );
}

// ============================================================================
// 3. MAIN WORKFLOW ARENA WITH LUMINOUS WHITE GRADIENT THEME
// ============================================================================
export default function InteractiveOrbWorkflow() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [focusedPillar, setFocusedPillar] = useState(null);

  const handleToggle = (state) => {
    setIsExpanded(state);
  };

  const handleSelectPillar = (pillarName) => {
    setFocusedPillar(pillarName);
    setIsExpanded(true);
  };

  return (
    <section id="workflow" className="py-24 bg-gradient-to-b from-[#fbfbfd] via-white to-slate-100 text-zinc-900 border-b border-zinc-200/90 relative overflow-hidden select-none">
      
      {/* Background Soft Dot Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-[1550px] mx-auto px-4 sm:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>KPRIET FINAL YEAR RESEARCH WORKFLOW // CSE REVIEW 3</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 font-sans">
            AI-Driven Marine Oil Spill Architecture
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
            Drag the talisman charm vertically up or down to reveal and retract the complete 4-pillar operational pipeline.
          </p>
        </div>

        {/* --- 1. TACTILE CHINESE COIN TASSEL CHARM RIG --- */}
        <CoinTasselCharm
          isExpanded={isExpanded}
          onToggle={handleToggle}
          onSelectPillar={handleSelectPillar}
        />

        {/* --- 2. THE 4-PILLAR EXPANDED WORKFLOW IN LUMINOUS WHITE THEME --- */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -30 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -30 }}
              transition={{ type: "spring", stiffness: 240, damping: 25 }}
              className="mt-8 pt-10 border-t border-zinc-200"
            >
              
              {/* Tactical Status Bar */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-200 text-xs font-mono">
                <div className="flex items-center gap-2 text-emerald-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-bold">TACTICAL WORKFLOW DEPLOYED // PIPELINE ACTIVE</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition font-semibold"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Retract Charm</span>
                </button>
              </div>

              {/* 4 Pillar Cards with Clean White / Porcelain Finish */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch relative">
                {WORKFLOW_DATA.pillars.map((pillar, colIdx) => {
                  const isHighlighted = focusedPillar === pillar.title;

                  return (
                    <motion.div
                      key={pillar.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: colIdx * 0.08 }}
                      className={`relative bg-white rounded-[32px] p-6 sm:p-7 border transition-all flex flex-col justify-between shadow-sm hover:shadow-xl ${
                        isHighlighted
                          ? "border-emerald-500 shadow-[0_0_35px_rgba(16,185,129,0.25)] ring-2 ring-emerald-500"
                          : `\${pillar.borderColor} hover:border-zinc-400`
                      }`}
                    >
                      {/* Chevron Ring Connector for Desktop */}
                      {colIdx < 3 && (
                        <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white border border-zinc-300 shadow-md items-center justify-center text-zinc-500 pointer-events-none">
                          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                        </div>
                      )}

                      {/* Header */}
                      <div>
                        <div className="text-center pb-5 mb-5 border-b border-zinc-100">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1 font-semibold">
                            {pillar.badge} • {pillar.subtitle}
                          </span>
                          <h3 className={`text-base sm:text-lg font-black tracking-wider font-sans ${pillar.headerColor}`}>
                            {pillar.title}
                          </h3>
                        </div>

                        {/* Stacked Node Buttons */}
                        <div className="space-y-3.5 flex flex-col items-center">
                          {pillar.nodes.map((node, nIdx) => {
                            
                            // Arrow Down
                            if (node.type === "connector") {
                              return (
                                <div key={node.id || nIdx} className="py-0.5 text-emerald-600">
                                  <motion.div
                                    animate={{ y: [0, 4, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                                  >
                                    <ArrowDown className="w-5 h-5 stroke-[2.5]" />
                                  </motion.div>
                                </div>
                              );
                            }

                            // Subgrid: Severity & GPS
                            if (node.type === "subgrid") {
                              return (
                                <div key={node.id || nIdx} className="grid grid-cols-2 gap-2.5 w-full">
                                  <button
                                    type="button"
                                    onClick={() => setSelectedNode({ ...node.left, pillarTitle: pillar.title })}
                                    className="w-full py-4 px-2 rounded-2xl text-xs font-bold transition-all text-center border bg-[#0f172a] text-white border-slate-800 hover:border-emerald-500 hover:bg-[#1e293b] active:scale-95 shadow-md"
                                  >
                                    <span>{node.left.label}</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => setSelectedNode({ ...node.right, pillarTitle: pillar.title })}
                                    className="w-full py-4 px-2 rounded-2xl text-xs font-bold transition-all text-center border bg-[#0f172a] text-white border-slate-800 hover:border-emerald-500 hover:bg-[#1e293b] active:scale-95 shadow-md"
                                  >
                                    <span>{node.right.label}</span>
                                  </button>
                                </div>
                              );
                            }

                            // Distinct Node Pill Styles
                            let pillStyle = "bg-[#0f172a] text-white border-slate-800 hover:bg-[#1e293b] hover:border-slate-700";
                            if (node.type === "blue") {
                              pillStyle = "bg-[#0077b6] hover:bg-[#0096c7] text-white border-cyan-400 shadow-[0_0_20px_rgba(0,119,182,0.35)]";
                            } else if (node.type === "teal") {
                              pillStyle = "bg-[#0f8b8d] hover:bg-[#139a9c] text-white border-teal-300 shadow-[0_0_20px_rgba(15,139,141,0.35)]";
                            } else if (node.type === "maroon") {
                              pillStyle = "bg-[#8b1d24] hover:bg-[#a5222b] text-white border-rose-400 shadow-[0_0_25px_rgba(139,29,36,0.4)]";
                            }

                            return (
                              <button
                                key={node.id}
                                type="button"
                                onClick={() => setSelectedNode({ ...node, pillarTitle: pillar.title })}
                                className={`w-full py-4 px-4 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 border text-center shadow-md active:scale-95 flex items-center justify-center relative group ${pillStyle}`}
                              >
                                <span className="group-hover:tracking-wider transition-all duration-200">
                                  {node.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Footer Description */}
                      <div className="mt-8 pt-4 border-t border-zinc-100 text-[11px] text-zinc-500 leading-relaxed font-sans">
                        {pillar.description}
                      </div>

                    </motion.div>
                  );
                })}
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* --- 3. DETAIL NODE INSPECTION DRAWER --- */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-zinc-200 relative max-h-[90vh] overflow-y-auto text-zinc-900"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedNode(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Tag Header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-mono uppercase font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {selectedNode.pillarTitle}
                </span>
                <span className="text-[11px] font-mono text-zinc-400">Tactical Node Profile</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black text-zinc-900 mt-1">
                {selectedNode.label}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
                {selectedNode.details}
              </p>

              {/* Codebase File Reference */}
              <div className="mt-4 p-3.5 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-xs flex items-center gap-2 border border-slate-800">
                <Terminal className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="truncate">Source Script: {selectedNode.codeFile}</span>
              </div>

              {/* Input / Output Contracts */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block font-bold">Input Contract</span>
                  <span className="text-zinc-800 font-medium mt-1 block">{selectedNode.inputs}</span>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block font-bold">Output Contract</span>
                  <span className="text-zinc-800 font-medium mt-1 block">{selectedNode.outputs}</span>
                </div>
              </div>

              {/* Technical Parameters */}
              {selectedNode.metrics && (
                <div className="mt-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block mb-2 font-bold">
                    Reported Technical Parameters:
                  </span>
                  <div className="bg-zinc-50 rounded-2xl p-3 border border-zinc-200 space-y-1.5 text-xs font-mono">
                    {Object.entries(selectedNode.metrics).map(([key, val]) => (
                      <div key={key} className="flex justify-between items-center text-zinc-700">
                        <span className="text-zinc-500">{key}:</span>
                        <span className="font-bold text-zinc-900">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400 font-mono">KPRIET Validated Milestone[cite: 2]</span>
                <button
                  type="button"
                  onClick={() => setSelectedNode(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition active:scale-95"
                >
                  Close Inspection
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
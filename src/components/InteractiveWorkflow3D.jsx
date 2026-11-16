import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowDown, ChevronRight, Sparkles, Terminal, X, ArrowRight, ChevronsRight, Layers, Sliders } from 'lucide-react';

// Circular Chain Modules matching your reference design
const CIRCULAR_STAGES = [
  { id: "sat", name: "SENTINEL-1", count: "SAR C-Band", pillar: "INPUT" },
  { id: "drone", name: "UAV DRONE", count: "1080p RGB", pillar: "INPUT" },
  { id: "resnet", name: "RESNET-18", count: "98.16% Recall", pillar: "AI PROCESSING" },
  { id: "unet", name: "U-NET 4-STAGE", count: "Dice: 0.7985", pillar: "AI PROCESSING" },
  { id: "triage", name: "SEVERITY", count: "5-Tier Scale", pillar: "DECISION & VERIFICATION" },
  { id: "buoy", name: "IOT BUOY", count: "MQTT Telemetry", pillar: "DECISION & VERIFICATION" }
];

const WORKFLOW_COLUMNS = [
  {
    id: "input",
    title: "INPUT",
    titleColor: "text-emerald-700",
    badge: "Pillar 1",
    subtitle: "Raw Ocean Observation",
    nodes: [
      {
        id: "in-1",
        label: "Satellite / UAV Images",
        type: "dark",
        script: "datasets/ & Copernicus SAR Ingestion",
        details: "Ingests Sentinel-1 C-band Synthetic Aperture Radar (SAR) granules and high-resolution UAV drone orthomosaic RGB imagery."
      },
      { id: "in-arrow-1", type: "arrow-down" },
      {
        id: "in-2",
        label: "Image Preprocessing",
        type: "dark",
        script: "src/inspect_dataset.py",
        details: "Applies radiometric calibration, Lee speckle noise suppression, and min-max intensity normalization into 256x256 float tensors."
      }
    ]
  },
  {
    id: "ai",
    title: "AI PROCESSING",
    titleColor: "text-emerald-700",
    badge: "Pillar 2",
    subtitle: "Dual-Stage Deep Learning",
    nodes: [
      {
        id: "ai-1",
        label: "Lightweight AI Model",
        type: "dark",
        script: "models/oil_spill_classifier.pth",
        details: "Pre-trained ImageNet ResNet-18 feature extractor fine-tuned with FP16 Automatic Mixed Precision on NVIDIA GeForce RTX 2050."
      },
      { id: "ai-arrow-1", type: "arrow-down" },
      {
        id: "ai-2",
        label: "Oil Spill Detection",
        type: "dark",
        script: "src/predict.py",
        details: "Binary screening classifier distinguishing clean water from oil spills. Validated at 97.69% accuracy and 98.16% recall with class weight 1.96."
      },
      { id: "ai-arrow-2", type: "arrow-down" },
      {
        id: "ai-3",
        label: "Spill Segmentation",
        type: "dark",
        script: "src/train_segmentation.py",
        details: "4-Stage Symmetric U-Net with skip connections. Minimizes combined BCE + Dice loss to predict pixel-level boundary masks (Dice: 0.7985, mIoU: 0.6684)."
      }
    ]
  },
  {
    id: "decision",
    title: "DECISION & VERIFICATION",
    titleColor: "text-emerald-700",
    badge: "Pillar 3",
    subtitle: "Quantitative Spatial Triage",
    nodes: [
      {
        id: "dec-1",
        label: "Spill Area Estimation",
        type: "dark",
        script: "src/severity.py",
        details: "Calculates spatial pixel count and projects physical surface area in km² using 10m Ground Sampling Distance (GSD)."
      },
      {
        id: "dec-subgrid",
        type: "subgrid",
        left: {
          label: "Severity",
          type: "dark",
          script: "src/severity.py",
          details: "5-Tier risk classification scale: Minor (<1%), Moderate (1-5%), Significant (5-15%), Severe (15-30%), and Critical (>30%)."
        },
        right: {
          label: "GPS",
          type: "dark",
          script: "src/geolocation.py",
          details: "Binds satellite bounding boxes to global marine coordinates and cross-references against 4,929 NOAA historical spill records."
        }
      },
      {
        id: "dec-2",
        label: "IoT Verification",
        type: "blue",
        script: "src/decision_engine.py",
        details: "Simulated in-situ marine buoy telemetry (dissolved hydrocarbons in PPM). Readings above 25.0 ppm cross-verify satellite slicks against SAR look-alikes."
      },
      {
        id: "dec-3",
        label: "Risk Assessment",
        type: "dark",
        script: "src/decision_engine.py",
        details: "Synthesizes physical area, oil type damping profile, proximity to shipping lanes, and buoy telemetry into a 0-100% composite danger index."
      }
    ]
  },
  {
    id: "alert",
    title: "ALERT & RESPONSE",
    titleColor: "text-emerald-700",
    badge: "Pillar 4",
    subtitle: "Automated Emergency Dispatch",
    nodes: [
      {
        id: "alt-1",
        label: "Intelligent Alert Gen.",
        type: "teal",
        script: "api/main.py",
        details: "FastAPI inference microservice automatically compiles georeferenced incident metadata into structured dispatch packets."
      },
      { id: "alt-arrow-1", type: "arrow-down" },
      {
        id: "alt-2",
        label: "SMS + Email + Dashboard",
        type: "teal",
        script: "dashboard/index.html & Webhooks",
        details: "Triggers automated cellular SMS and SMTP email dispatches while updating the Leaflet GIS surveillance operations console in real time."
      },
      { id: "alt-arrow-2", type: "arrow-down" },
      {
        id: "alt-3",
        label: "Authorities / Response",
        type: "maroon",
        script: "MRCC Coast Guard Interception",
        details: "Immediate dispatch to Indian Coast Guard Maritime Rescue Coordination Centre (MRCC) and port pollution control teams for containment boom deployment."
      }
    ]
  }
];

function InteractiveTiltColumn({ col, index, onSelectNode, isSelectedCol }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["9deg", "-9deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-9deg", "9deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative rounded-[32px] p-7 transition-all duration-300 backdrop-blur-xl ${
        isSelectedCol
          ? "bg-white ring-2 ring-emerald-500 shadow-2xl scale-[1.02]"
          : "bg-white/95 hover:bg-white border border-zinc-200/90 hover:border-zinc-300 shadow-sm hover:shadow-2xl"
      }`}
    >
      <div style={{ transform: "translateZ(30px)" }}>
        <div className="text-center pb-5 mb-5 border-b border-zinc-100">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1 font-semibold">
            {col.badge} • {col.subtitle}
          </span>
          <h3 className={`text-base sm:text-lg font-black tracking-wider font-sans ${col.titleColor}`}>
            {col.title}
          </h3>
        </div>

        <div className="space-y-3.5 flex flex-col items-center">
          {col.nodes.map((node, nIdx) => {
            if (node.type === "arrow-down") {
              return (
                <div key={node.id || nIdx} className="py-0.5 text-emerald-600">
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  >
                    <ArrowDown className="w-5 h-5 stroke-[2.5]" />
                  </motion.div>
                </div>
              );
            }

            if (node.type === "subgrid") {
              return (
                <div key={node.id || nIdx} className="grid grid-cols-2 gap-2.5 w-full">
                  <button
                    type="button"
                    onClick={() => onSelectNode(node.left, col.title)}
                    className="w-full py-4 px-3 rounded-2xl bg-[#0f172a] text-white text-xs font-bold shadow-md hover:bg-[#1e293b] active:scale-95 transition-all text-center border border-slate-800 hover:border-emerald-500 group"
                  >
                    <span className="group-hover:text-emerald-400 transition-colors">{node.left.label}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectNode(node.right, col.title)}
                    className="w-full py-4 px-3 rounded-2xl bg-[#0f172a] text-white text-xs font-bold shadow-md hover:bg-[#1e293b] active:scale-95 transition-all text-center border border-slate-800 hover:border-emerald-500 group"
                  >
                    <span className="group-hover:text-emerald-400 transition-colors">{node.right.label}</span>
                  </button>
                </div>
              );
            }

            let pillClass = "bg-[#0f172a] text-white border-slate-800 hover:bg-[#1e293b]";
            if (node.type === "blue") {
              pillClass = "bg-[#0077b6] hover:bg-[#0096c7] text-white border-cyan-400 shadow-[0_0_20px_rgba(0,119,182,0.35)]";
            } else if (node.type === "teal") {
              pillClass = "bg-[#0f8b8d] hover:bg-[#139a9c] text-white border-teal-300 shadow-[0_0_20px_rgba(15,139,141,0.35)]";
            } else if (node.type === "maroon") {
              pillClass = "bg-[#8b1d24] hover:bg-[#a5222b] text-white border-rose-400 shadow-[0_0_25px_rgba(139,29,36,0.4)]";
            }

            return (
              <button
                key={node.id}
                type="button"
                onClick={() => onSelectNode(node, col.title)}
                className={`w-full py-4 px-4 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 border text-center shadow-md hover:shadow-xl active:scale-95 flex items-center justify-center ${pillClass}`}
              >
                <span>{node.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function InteractiveWorkflow3D() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeChainId, setActiveChainId] = useState(null);

  // Framer Motion Drag Hook State
  const dragX = useMotionValue(0);
  const hookSpringX = useSpring(dragX, { stiffness: 350, damping: 25 });
  const pullOpacity = useTransform(dragX, [0, 140], [1, 0.2]);

  const handleDragEnd = (event, info) => {
    // If dragged right past 80px, snap open!
    if (info.offset.x > 70) {
      setIsExpanded(true);
    }
  };

  return (
    <section id="workflow" className="py-20 bg-gradient-to-b from-[#fbfbfd] via-white to-slate-100 text-zinc-900 border-b border-zinc-200 relative overflow-hidden select-none">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 relative z-10">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>KPRIET END-TO-END RESEARCH BLUEPRINT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 font-sans">
            Interactive Architecture & Workflow
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Drag the orange trigger puck or click any circular stage below to expand the complete 3D pipeline.
          </p>
        </div>

        {/* --- SIGNATURE DRAGGABLE CIRCULAR HOOK CHAIN --- */}
        <div className="relative py-8 flex flex-col items-center">
          <div className="w-full max-w-6xl overflow-x-auto pb-4 pt-2 no-scrollbar">
            <div className="flex items-center justify-center min-w-[850px] px-4">
              
              {/* Overlapping White Circles */}
              {CIRCULAR_STAGES.map((item, idx) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.08, y: -6, zIndex: 30 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={() => {
                    setActiveChainId(item.pillar);
                    setIsExpanded(true);
                  }}
                  className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white border border-zinc-200/90 shadow-[0_10px_25px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center p-3 cursor-pointer select-none relative transition-colors duration-200 ${
                    idx !== 0 ? "-ml-6 sm:-ml-10" : ""
                  } ${
                    activeChainId === item.pillar && isExpanded
                      ? "ring-2 ring-emerald-500 bg-emerald-50/50"
                      : "hover:bg-zinc-50"
                  }`}
                  style={{ zIndex: 10 + idx }}
                >
                  <span className="text-xs sm:text-sm font-black font-sans text-zinc-900 tracking-tight block">
                    {item.name}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500 mt-0.5 block">
                    {item.count}
                  </span>
                  <span className="text-[9px] font-mono uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-2 font-semibold">
                    {item.pillar}
                  </span>
                </motion.div>
              ))}

              {/* Glowing Draggable Orange Action Hook Puck */}
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 180 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                style={{ x: hookSpringX }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="-ml-6 sm:-ml-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-[#ea3810] to-[#f95738] text-white shadow-[0_15px_35px_rgba(234,56,16,0.38)] flex flex-col items-center justify-center text-center p-4 cursor-grab active:cursor-grabbing relative z-30 select-none group"
              >
                <motion.div style={{ opacity: pullOpacity }} className="flex flex-col items-center">
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider font-mono">
                    {isExpanded ? "COLLAPSE" : "DRAG // POP UP"}
                  </span>
                  <span className="text-[9px] font-mono text-orange-100 uppercase mt-0.5">
                    {isExpanded ? "PIPELINE" : "WORKFLOW"}
                  </span>
                  <div className="flex items-center gap-1 mt-2 bg-black/20 px-2.5 py-1 rounded-full text-[10px] font-mono">
                    <span>{isExpanded ? "CLOSE" : "PULL"}</span>
                    <ChevronsRight className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs font-mono text-zinc-500">
            <ChevronsRight className="w-4 h-4 text-[#ea3810] animate-bounce" />
            <span>Click any circle or drag the orange puck right to reveal the full 3D pipeline</span>
          </div>
        </div>

        {/* --- EXPANDING 3D 4-PILLAR WORKFLOW VIEW --- */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 30 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="mt-8 pt-10 border-t border-zinc-200"
            >
              {/* Header inside expanded view */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-800">
                    Active System Pipeline Telemetry
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-mono font-semibold transition"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close Drawer</span>
                </button>
              </div>

              {/* 4 Interactive Columns with Connectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch relative">
                {WORKFLOW_COLUMNS.map((col, idx) => (
                  <div key={col.id} className="relative">
                    <InteractiveTiltColumn
                      col={col}
                      index={idx}
                      isSelectedCol={activeChainId === col.title || selectedNode?.pillar === col.title}
                      onSelectNode={(node, pillarTitle) =>
                        setSelectedNode({ ...node, pillar: pillarTitle })
                      }
                    />
                    {idx < 3 && (
                      <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white border border-zinc-300 shadow-md items-center justify-center text-zinc-500 pointer-events-none">
                        <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Detail Inspection Modal Drawer */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 relative"
            >
              <button
                type="button"
                onClick={() => setSelectedNode(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-mono uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {selectedNode.pillar}
                </span>
                <span className="text-[11px] font-mono text-slate-400">Pipeline Node</span>
              </div>

              <h3 className="text-xl font-black text-slate-900 mt-2">
                {selectedNode.label}
              </h3>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {selectedNode.details}
              </p>

              <div className="mt-5 p-3.5 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-xs flex items-center gap-2 border border-slate-800">
                <Terminal className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="truncate">File: {selectedNode.script}</span>
              </div>

              <div className="mt-6 flex justify-end">
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
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Satellite, Radio, Compass, Activity } from 'lucide-react';

export default function AoseCircleRadar() {
  const containerRef = useRef(null);

  // Mouse physics for magnetic tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["18deg", "-18deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-18deg", "18deg"]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[560px] aspect-square mx-auto flex items-center justify-center cursor-crosshair select-none"
      style={{ perspective: 1000 }}
    >
      {/* 3D Tilted Orbital Canvas */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Ring 1: Outer Dashed Geodetic Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          className="absolute w-[94%] h-[94%] rounded-full border border-dashed border-zinc-400/40 pointer-events-none"
        />

        {/* Ring 2: Primary Orbit Track */}
        <div className="absolute w-[82%] h-[82%] rounded-full border border-zinc-300 pointer-events-none shadow-[0_0_40px_rgba(0,102,204,0.08)]" />

        {/* Ring 3: Counter-Rotating Fine Calibrated Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[68%] h-[68%] rounded-full border border-zinc-400/60 pointer-events-none flex items-center justify-between px-2 text-[9px] font-mono text-zinc-500"
        >
          <span className="bg-white px-1">00°N</span>
          <span className="bg-white px-1">90°E</span>
          <span className="bg-white px-1">180°</span>
          <span className="bg-white px-1">270°</span>
        </motion.div>

        {/* Ring 4: Pulsing Sensor Perimeter */}
        <motion.div
          animate={{ scale: [1, 1.04, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[52%] h-[52%] rounded-full border-2 border-zinc-900 pointer-events-none"
        />

        {/* Ring 5: Inner Deep Sea Target Core */}
        <div className="absolute w-[36%] h-[36%] rounded-full bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800 text-white flex flex-col items-center justify-center p-4 shadow-2xl z-20">
          <Satellite className="w-6 h-6 text-cyan-400 animate-pulse mb-1" />
          <span className="text-[10px] font-mono tracking-widest text-zinc-300 font-bold uppercase">
            SENTINEL-1
          </span>
          <span className="text-[8px] font-mono text-cyan-400 mt-0.5">
            C-BAND IW // 10m GSD
          </span>
        </div>

        {/* 360-Degree Continuous Radar Sweep Beam */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="w-1/2 h-1/2 ml-auto origin-bottom-left bg-gradient-to-br from-cyan-400/25 via-cyan-400/5 to-transparent rounded-tr-full" />
        </motion.div>

        {/* Orbiting Satellite Marker Node 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className="absolute w-full h-full pointer-events-none"
        >
          <div className="absolute top-[8%] left-[50%] -translate-x-1/2 flex items-center gap-1.5 bg-black text-white text-[9px] font-mono px-2 py-0.5 rounded-full shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>RESNET-18: 98.16%</span>
          </div>
        </motion.div>

        {/* Orbiting Sensor Node 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute w-full h-full pointer-events-none"
        >
          <div className="absolute bottom-[14%] right-[22%] flex items-center gap-1.5 bg-white border border-zinc-300 text-zinc-900 text-[9px] font-mono px-2 py-0.5 rounded-full shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            <span>U-NET DICE: 0.7985</span>
          </div>
        </motion.div>

        {/* Live Coordinate Crosshairs */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />
          <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-zinc-300 to-transparent" />
        </div>
      </motion.div>

      {/* Floating Monospace Taglets matching Aose */}
      <div className="absolute bottom-2 left-2 text-[10px] font-mono text-zinc-600 flex items-center gap-2">
        <Radio className="w-3.5 h-3.5 text-zinc-900 animate-pulse" />
        <span>AUTONOMOUS ORBITAL STREAM</span>
      </div>
      <div className="absolute top-2 right-2 text-[10px] font-mono text-zinc-600">
        [ 28.7366° N, 88.3659° W ]
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, GraduationCap, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MENTOR_PRESENTATION_SLIDES } from '../data/projectData';

export default function SectionMentorMode({ isOpen, onClose }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIdx]);

  if (!isOpen) return null;

  const currentSlide = MENTOR_PRESENTATION_SLIDES[currentIdx];

  const handleNext = () => {
    if (currentIdx < MENTOR_PRESENTATION_SLIDES.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-ocean-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-cyan-900/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              MENTOR GUIDED PRESENTATION MODE
              <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                Slide {currentIdx + 1} of {MENTOR_PRESENTATION_SLIDES.length}
              </span>
            </div>
            <div className="text-xs text-slate-400">
              KPRIET Final Year Research Project • Ms. Sasikala C & Team[cite: 2]
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
          title="Exit Presentation"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Content Area */}
      <div className="max-w-4xl mx-auto w-full my-auto py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6"
          >
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
                {currentSlide.subtitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                {currentSlide.title}
              </h2>
            </div>

            <ul className="space-y-4 text-sm sm:text-base text-slate-300">
              {currentSlide.bullets.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            {/* Guide Takeaway Box */}
            <div className="mt-8 p-4 bg-ocean-950 rounded-xl border border-cyan-900/60 flex items-start gap-3">
              <span className="text-cyan-400 font-mono text-xs uppercase font-bold mt-0.5">Key Takeaway:</span>
              <p className="text-xs sm:text-sm text-cyan-200 font-medium leading-relaxed">
                {currentSlide.takeaway}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between border-t border-slate-800 pt-4">
        <div className="text-xs text-slate-500 font-mono hidden sm:block">
          Use ← and → arrow keys or spacebar to navigate
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              currentIdx === 0
                ? 'bg-slate-900 text-slate-600 cursor-not-allowed'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg transition-all"
          >
            <span>{currentIdx === MENTOR_PRESENTATION_SLIDES.length - 1 ? 'Finish & Celebrate' : 'Next Slide'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
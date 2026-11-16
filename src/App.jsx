import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AoseHero from './components/AoseHero';
import InteractiveOrbWorkflow from './components/InteractiveOrbWorkflow';
import OperationsConsole from './components/OperationsConsole';
import SectionMentorMode from './components/SectionMentorMode';
import Footer from './components/Footer';

export default function App() {
  const [isMentorModeOpen, setIsMentorModeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-zinc-900 selection:bg-cyan-500 selection:text-black antialiased">
      {/* OSD Minimal Header */}
      <Navbar />

      {/* Hero with Interactive Radar Centerpiece */}
      <AoseHero />

      {/* The Singular Orbital Quantum Sensor & Morphing Workflow Engine */}
      <InteractiveOrbWorkflow />

      {/* Live Operations Console with Autonomous Geolocation & Leaflet Tracking */}
      <OperationsConsole />

      {/* Project Footer */}
      <Footer />

      {/* Guided Mentor Walkthrough Modal */}
      <SectionMentorMode
        isOpen={isMentorModeOpen}
        onClose={() => setIsMentorModeOpen(false)}
      />
    </div>
  );
}
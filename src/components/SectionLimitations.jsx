import React from 'react';
import { AlertTriangle, Wrench, ShieldAlert } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function SectionLimitations() {
  return (
    <section id="limitations" className="py-20 bg-ocean-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <StatusBadge status="Implemented" />
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Research Limitations & Future Roadmap
          </h2>
          <p className="mt-2 text-slate-400 text-sm leading-relaxed">
            As emphasized in Section VII and IX of the research paper[cite: 2], this project maintains scientific honesty 
            by distinguishing evaluated deep-learning models from planned hardware and field integrations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Current Limitations */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Current Technical Limitations (Section VII)[cite: 2]</span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>SAR Look-Alikes:</strong> Low-wind areas (&lt; 2-3 m/s) and biogenic surface slicks cause low radar backscatter resembling petroleum oils[cite: 2].</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>GSD & Spatial Calibration:</strong> Pixel count accurately measures image coverage, but physical km² conversion requires calibrated satellite geometry metadata[cite: 2].</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Simulated IoT Verification:</strong> Buoy hydrocarbon telemetry and dispatch webhooks are simulated via software rather than physical buoy hardware[cite: 2].</span>
              </li>
            </ul>
          </div>

          {/* Future Scope */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Wrench className="w-4 h-4" />
              <span>Planned Enhancements (Section IX)[cite: 2]</span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Physical IoT Sensor Node:</strong> Deploy real ESP32/hydrocarbon probe buoys communicating over an active MQTT broker[cite: 2].</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Edge Deployment on Patrol Boats:</strong> Quantize MobileNetV3 (<code className="text-cyan-300">lightweight_model.py</code>) to run on low-power Jetson Nano edge modules[cite: 1, 2].</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Automated Twilio/SendGrid Webhook:</strong> Connect live cellular SMS gateways for automated disaster team mobilization.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
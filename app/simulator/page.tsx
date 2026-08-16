'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { FiZap, FiPlay } from 'react-icons/fi';
import VerilogSimulator from '@/components/simulator/VerilogSimulator';
import WaveformViewer from '@/components/simulator/WaveformViewer';

interface Signal {
  name: string;
  values: boolean[];
  color: string;
}

export default function SimulatorPage() {
  const router = useRouter();
  const { user } = useStore();
  const [code, setCode] = useState(`module and_gate(
  input a, b,
  output y
);
  assign y = a & b;
endmodule`);
  const [signals, setSignals] = useState<Signal[]>([
    { name: 'clk', values: [false, true, false, true, false], color: '#ff6b6b' },
    { name: 'reset', values: [true, true, false, false, false], color: '#4ecdc4' },
    { name: 'out', values: [false, false, true, true, true], color: '#45b7d1' },
  ]);

  if (!user) {
    router.push('/auth/signin');
    return null;
  }

  const handleSimulate = (steps: any[]) => {
    // Generate waveforms from simulation steps
    const newSignals: Signal[] = [
      {
        name: 'clk',
        values: steps.map((s) => s.inputs.clk),
        color: '#ff6b6b',
      },
      {
        name: 'reset',
        values: steps.map((s) => s.inputs.reset),
        color: '#4ecdc4',
      },
      {
        name: 'out',
        values: steps.map((s) => s.outputs.out),
        color: '#45b7d1',
      },
    ];
    setSignals(newSignals);
  };

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
            <FiZap className="text-primary" /> Verilog Simulator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Simulate and visualize your Verilog code with interactive waveforms
          </p>
        </div>

        {/* Simulator Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Code Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Verilog Code</h2>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm border border-gray-700 focus:border-primary outline-none"
              placeholder="Enter your Verilog code here"
            />
          </div>

          {/* Simulator */}
          <VerilogSimulator code={code} onSimulate={handleSimulate} />
        </div>

        {/* Waveform Viewer */}
        <div className="mb-8">
          <WaveformViewer signals={signals} timeScale={10} />
        </div>

        {/* Info Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-primary to-secondary text-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-2">How to Use</h3>
            <ul className="space-y-2">
              <li>✓ Write or paste your Verilog code</li>
              <li>✓ Enter testbench code for simulation</li>
              <li>✓ Click "Run Simulation" to execute</li>
              <li>✓ View waveforms and signals in real-time</li>
              <li>✓ Use zoom controls to inspect details</li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-secondary to-accent text-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-2">Features</h3>
            <ul className="space-y-2">
              <li>🔏 Real-time simulation results</li>
              <li>📈 Interactive waveform viewer</li>
              <li>🔍 Zoom and pan controls</li>
              <li>📊 Detailed timing analysis</li>
              <li>⚡ Instant feedback and validation</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

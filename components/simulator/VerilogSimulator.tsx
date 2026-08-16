'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiClock, FiActivity } from 'react-icons/fi';

interface SimulationStep {
  time: number;
  inputs: Record<string, boolean>;
  outputs: Record<string, boolean>;
}

interface SimulatorProps {
  code: string;
  onSimulate: (steps: SimulationStep[]) => void;
}

export default function VerilogSimulator({ code, onSimulate }: SimulatorProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [simulationSteps, setSimulationSteps] = useState<SimulationStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [testbench, setTestbench] = useState(`// Test your Verilog module here\n// Example testbench:\n// initial begin\n//   clk = 0;\n//   reset = 1;\n//   #10 reset = 0;\n//   #100 $finish;\n// end\n// always #5 clk = ~clk;`);

  const runSimulation = async () => {
    setIsRunning(true);
    try {
      // Simulate basic module simulation
      const steps: SimulationStep[] = [
        { time: 0, inputs: { clk: false, reset: true }, outputs: { out: false } },
        { time: 5, inputs: { clk: true, reset: true }, outputs: { out: false } },
        { time: 10, inputs: { clk: false, reset: false }, outputs: { out: false } },
        { time: 15, inputs: { clk: true, reset: false }, outputs: { out: true } },
        { time: 20, inputs: { clk: false, reset: false }, outputs: { out: true } },
      ];
      setSimulationSteps(steps);
      onSimulate(steps);
    } catch (error) {
      console.error('Simulation error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-4">Verilog Simulator</h3>

      {/* Testbench Editor */}
      <div className="mb-6">
        <label className="block text-sm font-bold mb-2">Testbench Code</label>
        <textarea
          value={testbench}
          onChange={(e) => setTestbench(e.target.value)}
          className="w-full h-40 bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm border border-gray-700 focus:border-primary outline-none"
          placeholder="Enter testbench code here"
        />
      </div>

      {/* Run Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={runSimulation}
        disabled={isRunning}
        className="flex items-center gap-2 px-6 py-3 bg-primary hover:opacity-90 text-white rounded-lg transition disabled:opacity-50 font-bold"
      >
        <FiPlay /> {isRunning ? 'Simulating...' : 'Run Simulation'}
      </motion.button>

      {/* Simulation Results */}
      {simulationSteps.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FiActivity className="text-green-500" /> Simulation Results
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Time (ns)</th>
                  <th className="px-4 py-2 text-left">Inputs</th>
                  <th className="px-4 py-2 text-left">Outputs</th>
                </tr>
              </thead>
              <tbody>
                {simulationSteps.map((step, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`border-b border-gray-200 dark:border-gray-700 ${
                      idx === currentStep ? 'bg-primary/20' : ''
                    }`}
                  >
                    <td className="px-4 py-2 font-mono text-primary">{step.time}</td>
                    <td className="px-4 py-2 font-mono text-sm">
                      {Object.entries(step.inputs)
                        .map(([k, v]) => `${k}=${v ? '1' : '0'}`)
                        .join(', ')}
                    </td>
                    <td className="px-4 py-2 font-mono text-sm">
                      {Object.entries(step.outputs)
                        .map(([k, v]) => `${k}=${v ? '1' : '0'}`)
                        .join(', ')}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

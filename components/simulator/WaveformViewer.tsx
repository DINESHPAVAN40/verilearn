'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiRotateCcw, FiZoomIn, FiZoomOut } from 'react-icons/fi';

interface Signal {
  name: string;
  values: boolean[];
  color: string;
}

interface WaveformViewerProps {
  signals: Signal[];
  timeScale: number;
}

export default function WaveformViewer({ signals, timeScale }: WaveformViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [zoom, setZoom] = useState(1);
  const maxTime = 100;

  const handlePlay = () => setIsPlaying(!isPlaying);
  const handleReset = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };
  const handleZoomIn = () => setZoom(zoom * 1.2);
  const handleZoomOut = () => setZoom(Math.max(0.5, zoom / 1.2));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-4">Waveform Viewer</h3>
        
        {/* Controls */}
        <div className="flex gap-2 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlay}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
          >
            {isPlaying ? <FiPause /> : <FiPlay />}
            {isPlaying ? 'Pause' : 'Play'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
          >
            <FiRotateCcw /> Reset
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleZoomIn}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
          >
            <FiZoomIn /> Zoom In
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleZoomOut}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
          >
            <FiZoomOut /> Zoom Out
          </motion.button>
        </div>

        {/* Time Display */}
        <div className="mb-4 text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
          Time: {currentTime} / {maxTime} ns | Zoom: {zoom.toFixed(1)}x
        </div>

        {/* Waveform Canvas */}
        <div className="overflow-x-auto border border-gray-300 dark:border-gray-600 rounded-lg bg-black p-4">
          <svg width={Math.max(800, 800 * zoom)} height={signals.length * 80 + 40} className="min-w-full">
            {/* Time Grid */}
            {Array.from({ length: Math.floor(maxTime / 10) + 1 }).map((_, i) => (
              <line
                key={`grid-${i}`}
                x1={i * 80 * zoom}
                y1="20"
                x2={i * 80 * zoom}
                y2={signals.length * 80 + 20}
                stroke="#444"
                strokeDasharray="2,2"
              />
            ))}

            {/* Time Labels */}
            {Array.from({ length: Math.floor(maxTime / 10) + 1 }).map((_, i) => (
              <text
                key={`time-${i}`}
                x={i * 80 * zoom}
                y="15"
                fill="#888"
                fontSize="12"
                textAnchor="middle"
              >
                {i * 10}
              </text>
            ))}

            {/* Signals */}
            {signals.map((signal, signalIdx) => {
              const y = signalIdx * 80 + 40;
              return (
                <g key={signal.name}>
                  {/* Signal Name */}
                  <text x="10" y={y + 15} fill={signal.color} fontSize="12" fontWeight="bold">
                    {signal.name}
                  </text>

                  {/* Waveform */}
                  {signal.values.map((value, i) => {
                    const x1 = i * (80 * zoom) / signal.values.length;
                    const x2 = (i + 1) * (80 * zoom) / signal.values.length;
                    const y1 = value ? y - 15 : y + 15;
                    const y2 = y1;

                    return (
                      <g key={`signal-${i}`}>
                        {/* Horizontal line */}
                        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={signal.color} strokeWidth="2" />
                        {/* Vertical line */}
                        {i < signal.values.length - 1 && signal.values[i] !== signal.values[i + 1] && (
                          <line x1={x2} y1={y1} x2={x2} y2={!value ? y - 15 : y + 15} stroke={signal.color} strokeWidth="2" />
                        )}
                      </g>
                    );
                  })}
                </g>
              );
            })}

            {/* Current Time Marker */}
            <line
              x1={currentTime * (800 * zoom) / maxTime}
              y1="20"
              x2={currentTime * (800 * zoom) / maxTime}
              y2={signals.length * 80 + 20}
              stroke="#ff6b6b"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

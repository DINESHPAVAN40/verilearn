import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Simulator - VeriLearn',
  description: 'Simulate Verilog code with interactive waveform visualization and timing analysis',
};

export default function SimulatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

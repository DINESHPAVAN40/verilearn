import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guides - VeriLearn',
  description: 'Comprehensive Verilog HDL learning guides and tutorials',
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

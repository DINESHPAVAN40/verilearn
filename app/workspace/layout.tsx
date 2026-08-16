import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workspace - VeriLearn',
  description: 'Interactive Verilog code editor and workspace',
};

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

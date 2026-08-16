import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - VeriLearn',
  description: 'Your VeriLearn dashboard to manage projects and learning progress',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

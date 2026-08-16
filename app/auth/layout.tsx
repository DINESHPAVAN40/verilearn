import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auth - VeriLearn',
  description: 'Sign in or create your VeriLearn account',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

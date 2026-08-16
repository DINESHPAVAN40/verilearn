import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quizzes - VeriLearn',
  description: 'Test your Verilog knowledge with interactive quizzes and get detailed explanations',
};

export default function QuizzesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

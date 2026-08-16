'use client';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

const variants = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-500 text-white',
  danger: 'bg-red-500 text-white',
};

export default function Badge({ children, variant = 'primary' }: BadgeProps) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
}

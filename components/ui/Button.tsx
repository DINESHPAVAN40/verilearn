'use client';

import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const variants = {
  primary: 'bg-primary hover:opacity-90 text-white',
  secondary: 'bg-secondary hover:opacity-90 text-white',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
};

const sizes = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`${
        variants[variant]
      } ${sizes[size]} rounded-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </motion.button>
  );
}

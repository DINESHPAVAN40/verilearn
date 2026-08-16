'use client';

import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02 } : {}}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition ${
        hover ? 'hover:shadow-xl' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}

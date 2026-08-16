'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCode, FiBook, FiZap, FiLock } from 'react-icons/fi';

const features = [
  {
    icon: FiCode,
    title: 'Interactive Workspace',
    description: 'Write and test Verilog code with real-time feedback and syntax highlighting',
  },
  {
    icon: FiBook,
    title: 'Comprehensive Guides',
    description: 'Learn from detailed guides covering basics to advanced Verilog topics',
  },
  {
    icon: FiZap,
    title: 'Quick Learning',
    description: 'Fast-paced tutorials and examples to accelerate your learning journey',
  },
  {
    icon: FiLock,
    title: 'Secure Accounts',
    description: 'Save your progress, projects, and access them from anywhere with Firebase auth',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent">
        <motion.div
          className="text-center px-4 max-w-3xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Master Verilog HDL
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8">
            Learn digital design with interactive workspace, comprehensive guides, and hands-on practice
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition"
              >
                Get Started Free
              </motion.button>
            </Link>
            <Link href="/guides">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition"
              >
                Explore Guides
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-light dark:bg-dark">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose VeriLearn?</h2>
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition"
                  variants={itemVariants}
                >
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Learn Verilog?</h2>
          <p className="text-lg mb-8 text-gray-100">
            Join thousands of students mastering digital design with VeriLearn
          </p>
          <Link href="/auth/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition"
            >
              Start Learning Now
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}

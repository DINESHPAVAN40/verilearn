'use client';

import { useState } from 'react';
import { verilogGuides } from '@/lib/verilogGuides';
import { motion } from 'framer-motion';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

export default function GuidesPage() {
  const [expandedGuide, setExpandedGuide] = useState<string | null>('basics');
  const [expandedSection, setExpandedSection] = useState<string | null>('intro');

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Learning Guides</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Master Verilog HDL with our comprehensive guides covering basics to advanced topics
          </p>
        </div>

        {/* Guides Container */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Topics</h2>
              <div className="space-y-2">
                {Object.entries(verilogGuides).map(([key, guide]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setExpandedGuide(key);
                      setExpandedSection(guide.sections[0]?.id || null);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      expandedGuide === key
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {guide.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            {expandedGuide && verilogGuides[expandedGuide as keyof typeof verilogGuides] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
              >
                <h2 className="text-3xl font-bold mb-6">
                  {verilogGuides[expandedGuide as keyof typeof verilogGuides].title}
                </h2>

                {/* Sections */}
                <div className="space-y-4">
                  {verilogGuides[expandedGuide as keyof typeof verilogGuides].sections.map(
                    (section) => (
                      <div key={section.id}>
                        <button
                          onClick={() =>
                            setExpandedSection(
                              expandedSection === section.id ? null : section.id
                            )
                          }
                          className="w-full flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                        >
                          <span className="font-semibold text-lg">{section.title}</span>
                          {expandedSection === section.id ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </button>

                        {/* Section Content */}
                        {expandedSection === section.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 space-y-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                          >
                            <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 mb-4">
                              {section.content}
                            </div>
                            <div>
                              <h4 className="font-bold mb-2">Example:</h4>
                              <pre className="bg-dark dark:bg-black text-green-400 p-4 rounded-lg overflow-x-auto">
                                <code>{section.example}</code>
                              </pre>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

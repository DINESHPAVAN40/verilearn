'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiBook } from 'react-icons/fi';
import Link from 'next/link';
import Quiz from '@/components/quiz/Quiz';
import { quizzes } from '@/lib/quizzes';

export default function QuizzesPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);
  const [userScores, setUserScores] = useState<Record<string, { score: number; total: number }>({});

  const handleQuizComplete = (quizId: string, score: number, total: number) => {
    setUserScores({
      ...userScores,
      [quizId]: { score, total },
    });
  };

  if (selectedQuiz && quizzes[selectedQuiz as keyof typeof quizzes]) {
    return (
      <div className="min-h-screen bg-light dark:bg-dark px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedQuiz(null)}
            className="mb-6 px-4 py-2 text-primary hover:text-primary/80 transition"
          >
            ← Back to Quizzes
          </button>
          <Quiz
            questions={quizzes[selectedQuiz as keyof typeof quizzes].questions}
            onComplete={(score, total) => {
              handleQuizComplete(selectedQuiz, score, total);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 flex items-center gap-3">
            <FiAward className="text-primary" /> Quizzes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Test your Verilog knowledge with our comprehensive quizzes
          </p>
        </div>

        {/* Quizzes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(quizzes).map(([key, quiz]) => {
            const score = userScores[key];
            const percentage = score ? Math.round((score.score / score.total) * 100) : null;

            return (
              <motion.div
                key={key}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer transition"
                onClick={() => setSelectedQuiz(key)}
              >
                <div className="flex items-start justify-between mb-4">
                  <FiBook className="w-8 h-8 text-primary" />
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    quiz.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                    quiz.difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                    'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  }`}>
                    {quiz.difficulty.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{quiz.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                  {quiz.questions.length} Questions
                </p>
                {score && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Best Score:</span>
                      <span className="text-primary font-bold">{score.score}/{score.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{percentage}%</p>
                  </div>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-4 px-4 py-2 bg-primary hover:opacity-90 text-white rounded-lg transition font-semibold"
                >
                  {score ? 'Retake Quiz' : 'Start Quiz'}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiVolume2, FiAward } from 'react-icons/fi';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
}

export default function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    if (answered[currentQuestion]) return;

    const newAnswered = [...answered];
    const newSelectedAnswers = [...selectedAnswers];
    newAnswered[currentQuestion] = true;
    newSelectedAnswers[currentQuestion] = optionIndex;
    setAnswered(newAnswered);
    setSelectedAnswers(newSelectedAnswers);

    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      setCompleted(true);
      onComplete(score + (selectedAnswers[currentQuestion] === questions[currentQuestion].correctAnswer ? 1 : 0), questions.length);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  if (completed) {
    const finalScore = score + (selectedAnswers[currentQuestion] === questions[currentQuestion].correctAnswer ? 1 : 0);
    const percentage = Math.round((finalScore / questions.length) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-primary to-secondary text-white rounded-lg shadow-lg p-8 text-center"
      >
        <FiAward className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
        <p className="text-xl mb-6">Your Score: {finalScore} / {questions.length}</p>
        <div className="mb-6">
          <div className="w-full bg-white/20 rounded-full h-4 mb-2">
            <div
              className="bg-white h-4 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-lg font-semibold">{percentage}%</p>
        </div>
        <p className="text-lg mb-6">
          {percentage >= 80 && "Excellent work! You've mastered this topic!"}
          {percentage >= 60 && percentage < 80 && "Good job! Keep practicing to improve."}
          {percentage < 60 && "Keep learning! Review the material and try again."}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition"
        >
          Retake Quiz
        </motion.button>
      </motion.div>
    );
  }

  const question = questions[currentQuestion];
  const isAnswered = answered[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-semibold text-primary">
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">{question.question}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            question.difficulty === 'easy' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
            question.difficulty === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
            'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
          }`}>
            {question.difficulty.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === question.correctAnswer;
          let bgColor = 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600';

          if (isAnswered) {
            if (isCorrectOption) {
              bgColor = 'bg-green-100 dark:bg-green-900 border-2 border-green-500';
            } else if (isSelected && !isCorrect) {
              bgColor = 'bg-red-100 dark:bg-red-900 border-2 border-red-500';
            }
          }

          return (
            <motion.button
              key={index}
              whileHover={{ scale: isAnswered ? 1 : 1.02 }}
              whileTap={{ scale: isAnswered ? 1 : 0.98 }}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-lg transition text-left font-semibold disabled:cursor-not-allowed ${
                bgColor
              } ${
                isSelected && isAnswered ? (isCorrect ? 'ring-2 ring-green-500' : 'ring-2 ring-red-500') : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {isAnswered && isSelected && (
                  isCorrect ? <FiCheck className="text-green-500 text-xl" /> : <FiX className="text-red-500 text-xl" />
                )}
                {isAnswered && isCorrectOption && !isSelected && (
                  <FiCheck className="text-green-500 text-xl" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg mb-6 flex gap-3 ${
            isCorrect
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
          }`}
        >
          <FiVolume2 className="flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold mb-1">{isCorrect ? 'Correct!' : 'Explanation:'}</p>
            <p>{question.explanation}</p>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </motion.button>

        {isAnswered && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </motion.button>
        )}
      </div>
    </div>
  );
}

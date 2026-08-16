'use client';

export const quizzes = {
  basics: {
    title: 'Verilog Basics Quiz',
    description: 'Test your knowledge of Verilog fundamentals',
    difficulty: 'easy',
    questions: [
      {
        id: '1',
        question: 'What does HDL stand for?',
        options: [
          'High Description Language',
          'Hardware Description Language',
          'High-level Digital Logic',
          'Hardware Design Language',
        ],
        correctAnswer: 1,
        explanation: 'HDL stands for Hardware Description Language. It is used to describe digital hardware circuits.',
        difficulty: 'easy',
      },
      {
        id: '2',
        question: 'Which keyword is used to declare a module in Verilog?',
        options: ['def', 'module', 'class', 'function'],
        correctAnswer: 1,
        explanation: 'The "module" keyword is used to declare a module in Verilog. Every design in Verilog is organized as a module.',
        difficulty: 'easy',
      },
      {
        id: '3',
        question: 'What is the purpose of the "endmodule" statement?',
        options: [
          'To declare a module',
          'To end a module definition',
          'To begin a module',
          'To define a function',
        ],
        correctAnswer: 1,
        explanation: 'The "endmodule" statement marks the end of a module definition in Verilog.',
        difficulty: 'easy',
      },
    ],
  },
  datatypes: {
    title: 'Verilog Data Types Quiz',
    description: 'Test your understanding of Verilog data types',
    difficulty: 'medium',
    questions: [
      {
        id: '1',
        question: 'What is the difference between "wire" and "reg" in Verilog?',
        options: [
          'They are the same',
          'Wire is for continuous assignment, reg is for procedural blocks',
          'Reg is for connections, wire is for storage',
          'Wire stores values, reg transmits values',
        ],
        correctAnswer: 1,
        explanation:
          'Wire is used for continuous assignments and represents physical wires. Reg is used in procedural blocks (always, initial) and represents data storage.',
        difficulty: 'medium',
      },
      {
        id: '2',
        question: 'How many bits can a Verilog integer store by default?',
        options: ['8 bits', '16 bits', '32 bits', '64 bits'],
        correctAnswer: 2,
        explanation: 'A Verilog integer is 32 bits by default and is signed.',
        difficulty: 'medium',
      },
      {
        id: '3',
        question: 'What is a vector in Verilog?',
        options: [
          'A mathematical vector',
          'Multiple bits grouped together',
          'A dynamic array',
          'A pointer to memory',
        ],
        correctAnswer: 1,
        explanation:
          'A vector is multiple bits grouped together, declared as [7:0] for an 8-bit vector, for example: wire [7:0] data;',
        difficulty: 'medium',
      },
    ],
  },
  sequential: {
    title: 'Sequential Logic Quiz',
    description: 'Test your knowledge of sequential logic in Verilog',
    difficulty: 'hard',
    questions: [
      {
        id: '1',
        question: 'What is the purpose of "always @(posedge clk)"?',
        options: [
          'Runs on falling edge of clock',
          'Runs continuously',
          'Runs on rising edge of clock',
          'Runs when reset is high',
        ],
        correctAnswer: 2,
        explanation:
          '"always @(posedge clk)" triggers on the rising edge (positive edge) of the clock signal, which is the most common way to implement sequential logic.',
        difficulty: 'hard',
      },
      {
        id: '2',
        question: 'What is the difference between blocking and non-blocking assignments?',
        options: [
          'They are the same',
          'Blocking (=) executes immediately, non-blocking (<=) defers execution',
          'Non-blocking (=) executes immediately, blocking (<=) defers',
          'Blocking is for modules, non-blocking is for functions',
        ],
        correctAnswer: 1,
        explanation:
          'Blocking assignment (=) executes immediately, while non-blocking assignment (<=) schedules the assignment to happen at the end of the time step. Non-blocking is preferred for sequential logic.',
        difficulty: 'hard',
      },
      {
        id: '3',
        question: 'What does a D flip-flop do?',
        options: [
          'Amplifies digital signals',
          'Captures input on clock edge and holds it',
          'Inverts digital signals',
          'Counts pulses',
        ],
        correctAnswer: 1,
        explanation:
          'A D flip-flop captures the value on its D input when triggered by a clock edge and holds (stores) that value until the next clock edge.',
        difficulty: 'hard',
      },
    ],
  },
};

export type Quizzes = typeof quizzes;

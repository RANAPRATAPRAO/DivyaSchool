import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Example: Class=>Subject=>Quiz
const quizSets = {
  "Class 4": {
    Math: [
      { q: "7 + 5 = ?", options: ["10", "12", "13"], a: 1 },
      { q: "14 - 4 = ?", options: ["10", "12", "7"], a: 0 }
    ],
    Science: [
      { q: "What do plants need for photosynthesis?", options: ["Sunlight", "Moonlight", "Wind"], a: 0 },
      { q: "The largest organ in the human body?", options: ["Skin", "Brain", "Heart"], a: 0 }
    ]
  },
  "Class 8": {
    Math: [
      { q: "Square root of 64?", options: ["8", "6", "7"], a: 0 },
      { q: "Value of π (approx)?", options: ["2", "3.14", "4.2"], a: 1 }
    ],
    Computers: [
      { q: "CPU stands for?", options: ["Central Processing Unit", "Computer Personal Unit"], a: 0 },
      { q: "Shortcut to copy?", options: ["Ctrl+C", "Ctrl+X", "Ctrl+V"], a: 0 }
    ]
  }
};

const classList = Object.keys(quizSets);

export default function PracticeLab() {
  // Navigation state
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [timer, setTimer] = useState(30);
  const [showAnswer, setShowAnswer] = useState(null);

  // Get current quiz or return empty
  const quiz =
    (quizSets[selectedClass] &&
      quizSets[selectedClass][selectedSubject]) ||
    [];

  // Timer countdown
  useEffect(() => {
    if (done || showAnswer !== null) return;
    if (timer === 0) {
      setShowAnswer("timeout");
      setTimeout(() => nextQuestion(false), 1200);
      return;
    }
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, done, showAnswer]);

  function handleAns(idx) {
    setShowAnswer(idx === quiz[current]?.a ? "correct" : idx);
    setTimeout(() => nextQuestion(idx === quiz[current]?.a), 1200);
  }

  function nextQuestion(isCorrect) {
    if (isCorrect) setScore(prev => prev + 1);
    if (current === quiz.length - 1) {
      setDone(true);
    } else {
      setCurrent(prev => prev + 1);
      setShowAnswer(null);
      setTimer(30);
    }
  }

  function handleReset() {
    setScore(0);
    setCurrent(0);
    setDone(false);
    setTimer(30);
    setShowAnswer(null);
  }

  // On class/subject change: reset state
  function startSubject(cls, subject) {
    setSelectedClass(cls);
    setSelectedSubject(subject);
    setScore(0);
    setCurrent(0);
    setDone(false);
    setTimer(30);
    setShowAnswer(null);
  }

  // Progress for quiz
  const progress = quiz.length ? ((current + (done ? 1 : 0)) / quiz.length) * 100 : 0;

  // Main layout
  return (
    <main className="pt-24 px-2 pb-10 min-h-[70vh] bg-gradient-to-br from-emerald-50 via-yellow-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 transition-colors duration-700 flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: 30, scale: 0.91 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="text-2xl md:text-3xl font-bold mb-7 text-emerald-700 dark:text-cyan-200 drop-shadow"
      >
        Practice Lab
      </motion.h2>

      {/* Step 1: Choose class */}
      {!selectedClass && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white/80 dark:bg-gray-800/80 shadow-lg ring-1 ring-cyan-300 px-7 py-6 mb-7 w-full max-w-md flex flex-col items-center"
        >
          <div className="text-xl font-bold mb-4 text-cyan-800 dark:text-cyan-100">Pick Your Class</div>
          <div className="w-full flex flex-wrap gap-4 justify-center">
            {classList.map(cls => (
              <motion.button
                key={cls}
                whileHover={{ scale: 1.1, backgroundColor: "#2dd4bf" }}
                className="px-7 py-3 rounded-xl font-bold bg-cyan-100 dark:bg-cyan-800 text-cyan-800 dark:text-cyan-100 shadow transition"
                onClick={() => setSelectedClass(cls)}
              >
                {cls}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 2: Choose subject */}
      {selectedClass && !selectedSubject && (
        <motion.div
          key={selectedClass}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl bg-white/80 dark:bg-gray-800/80 shadow-lg ring-1 ring-green-300 px-7 py-6 mb-7 w-full max-w-md flex flex-col items-center"
        >
          <div className="text-xl font-bold mb-3 text-green-700 dark:text-green-100">Choose Subject</div>
          <div className="w-full flex flex-wrap gap-4 justify-center">
            {Object.keys(quizSets[selectedClass]).map(sub => (
              <motion.button
                key={sub}
                whileHover={{ scale: 1.09, backgroundColor: "#fbbf24" }}
                className="px-6 py-3 rounded-xl font-bold bg-yellow-50 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 shadow"
                onClick={() => startSubject(selectedClass, sub)}
              >
                {sub}
              </motion.button>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.07 }}
            className="mt-5 text-sm px-4 py-2 rounded-full bg-cyan-700 text-white font-semibold shadow"
            onClick={() => setSelectedClass("")}
          >← Back to class</motion.button>
        </motion.div>
      )}

      {/* Step 3: Show quiz */}
      {selectedClass && selectedSubject && (
        <div className="w-full max-w-md">
          {/* Animated progress bar */}
          <div className="mb-6">
            <div className="h-3 rounded-full bg-blue-200 dark:bg-gray-700 transition overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-blue-400 dark:bg-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, type: "spring" }}
              />
            </div>
            <div className="text-xs text-right text-blue-600 dark:text-cyan-300 mt-1">
              {Math.round(progress)}% completed
            </div>
          </div>
          <AnimatePresence>
            {done ? (
              <motion.div
                initial={{ scale: 0, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-green-100 dark:bg-green-900 py-10 px-8 rounded-2xl mb-4 text-center shadow-lg"
              >
                <div className="text-6xl mb-2">🎉</div>
                <p className="text-2xl font-bold text-green-800 dark:text-green-200">Completed!</p>
                <p className="mb-4 text-lg dark:text-green-100">
                  Your Score: {score} / {quiz.length}
                </p>
                <button
                  onClick={() => startSubject(selectedClass, selectedSubject)}
                  className="px-5 py-2 rounded-full bg-blue-600 dark:bg-cyan-700 text-white font-bold shadow hover:bg-blue-700 dark:hover:bg-cyan-900 transition"
                >
                  Try Again
                </button>
                <button
                  onClick={() => {
                    setSelectedSubject("");
                    setScore(0);
                    setDone(false);
                  }}
                  className="ml-3 px-5 py-2 rounded-full bg-gray-300 dark:bg-gray-700 text-blue-900 dark:text-cyan-200 font-semibold shadow hover:bg-gray-400 dark:hover:bg-gray-900 transition"
                >
                  Choose another subject
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={current}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                className="bg-white dark:bg-gray-800 py-8 px-7 rounded-2xl shadow-xl transition"
              >
                <p className="text-lg md:text-xl mb-5 text-blue-900 dark:text-cyan-100 font-semibold text-center">
                  {quiz[current]?.q}
                </p>
                <div className="flex justify-center mb-3">
                  <span className={`px-3 py-1 rounded-full font-bold
                    ${timer < 10 ? "bg-red-200 dark:bg-red-500 text-red-800" : "bg-blue-100 dark:bg-cyan-900 text-blue-600 dark:text-cyan-300"} transition`}
                  >
                    ⏰ {timer}s
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {quiz[current]?.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      className={`w-full text-lg px-6 py-2 rounded-lg font-semibold transition border border-blue-300 dark:border-cyan-700
                        ${showAnswer === null ? "bg-blue-200 dark:bg-cyan-800 hover:scale-105 dark:hover:bg-cyan-900 hover:bg-blue-300"
                        : showAnswer === "correct" && i === quiz[current]?.a ? "bg-green-200 dark:bg-green-600 text-green-900 dark:text-green-100"
                        : showAnswer !== null && i === showAnswer ? "bg-red-200 dark:bg-red-600 text-red-900 dark:text-red-100"
                        : "bg-gray-100 dark:bg-gray-700"
                        }`}
                      disabled={showAnswer !== null}
                      onClick={() => handleAns(i)}
                      whileTap={{ scale: 0.95 }}
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
                <AnimatePresence>
                  {showAnswer === "correct" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 text-green-700 dark:text-green-200 text-lg font-bold text-center"
                    >
                      ✓ Correct!
                    </motion.div>
                  )}
                  {showAnswer !== null && typeof showAnswer === "number" && showAnswer !== "correct" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-4 text-red-700 dark:text-red-200 text-lg font-bold text-center"
                    >
                      ✗ Wrong!
                    </motion.div>
                  )}
                  {showAnswer === "timeout" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-4 text-yellow-700 dark:text-yellow-300 text-lg font-bold text-center"
                    >
                      ⏰ Time's up!
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      {/* Back to home/class/subject */}
      {(selectedClass || selectedSubject) && (
        <div className="mt-6">
          {(selectedSubject || done) && (
            <button
              className="mr-4 px-5 py-2 rounded-full bg-gray-300 dark:bg-gray-700 text-blue-900 dark:text-cyan-200 font-semibold shadow hover:bg-gray-400 dark:hover:bg-gray-900 transition"
              onClick={() => {
                setSelectedSubject("");
                setDone(false);
                setScore(0);
              }}>Back to Subjects</button>
          )}
          {selectedClass && (
            <button
              className="px-5 py-2 rounded-full bg-gray-300 dark:bg-gray-700 text-blue-900 dark:text-cyan-200 font-semibold shadow hover:bg-gray-400 dark:hover:bg-gray-900 transition"
              onClick={() => {
                setSelectedClass("");
                setSelectedSubject("");
                setDone(false);
                setScore(0);
              }}>Back to Classes</button>
          )}
        </div>
      )}
    </main>
  );
}

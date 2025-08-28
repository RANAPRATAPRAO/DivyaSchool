import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// Example data
const progress = 78; // percent
const leaderboard = [
  { name: "Amit", score: 320 },
  { name: "Divya", score: 285 },
  { name: "You", score: 278 },
  { name: "Riya", score: 250 },
  { name: "Kabir", score: 230 }
];

const pastResults = [
  { month: "Mar", value: 48 },
  { month: "Apr", value: 65 },
  { month: "May", value: 72 },
  { month: "Jun", value: 77 },
  { month: "Jul", value: 62 },
  { month: "Aug", value: 78 }
];

const subjects = ["Math", "Science", "English", "Social Science"];
const subjectProgress = {
  "Math": 82,
  "Science": 64,
  "English": 88,
  "Social Science": 75
};

const size = 200; // Progress circle
const stroke = 18;
const radius = (size / 2) - (stroke / 2);
const circumference = 2 * Math.PI * radius;

export default function Dashboard() {
  const { t } = useTranslation();
  const [activeSubject, setActiveSubject] = useState(subjects[0]);
  
  return (
    <main className="min-h-screen w-full bg-gradient-to-tr from-sky-50 via-blue-100 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 transition-colors flex flex-col items-center px-2 py-5">
      <div className="w-full max-w-6xl py-7 flex flex-col items-center">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-9 text-blue-900 dark:text-cyan-100 text-center drop-shadow-lg">
          {t('dashboard') || "Dashboard"}
        </h2>

        {/* Main responsive area */}
        <div className="flex flex-col lg:flex-row w-full gap-10 lg:gap-16 items-center justify-between">
          
          {/* Left: Progress Circle + Subject Selector */}
          <div className="flex flex-col items-center gap-6 min-w-[170px] w-full max-w-xs">
            
            {/* Progress Circle */}
            <div className="relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]">
              <svg width={size} height={size} className="absolute top-0 left-0">
                {/* Bg ring */}
                <circle
                  r={radius}
                  cx={size/2}
                  cy={size/2}
                  fill="none"
                  stroke="#e0e7ef"
                  strokeWidth={stroke}
                />
                {/* Progress ring */}
                <motion.circle
                  r={radius}
                  cx={size/2}
                  cy={size/2}
                  fill="none"
                  stroke="url(#grad1)"
                  strokeWidth={stroke}
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress / 100)}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: circumference * (1 - progress / 100) }}
                  transition={{ duration: 1.2, type: "spring" }}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="60%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Percent label */}
              <div className="absolute w-full h-full flex flex-col justify-center items-center left-0 top-0">
                <span className="text-3xl sm:text-6xl font-extrabold text-blue-500 dark:text-cyan-200 drop-shadow-lg">{progress}%</span>
                <span className="text-lg sm:text-xl mt-2 sm:mt-3 font-bold text-gray-600 dark:text-cyan-400 uppercase tracking-wider">
                  {t('completion') || "Completion"}
                </span>
              </div>
            </div>

            {/* Subject selection */}
            <div className="flex gap-2 sm:gap-3 mt-3 flex-wrap justify-center w-full">
              {subjects.map(subj => (
                <button
                  key={subj}
                  onClick={() => setActiveSubject(subj)}
                  className={`px-3 py-1 sm:px-5 sm:py-2 rounded-full text-base sm:text-lg font-bold transition
                    ${activeSubject === subj
                      ? "bg-blue-700 text-white dark:bg-cyan-600"
                      : "bg-blue-100 dark:bg-gray-800 text-blue-700 dark:text-cyan-200 hover:bg-blue-200 dark:hover:bg-gray-700"}`}
                >
                  {subj}
                </button>
              ))}
            </div>
            
            {/* Subject progress graph */}
            <motion.div
              key={activeSubject}
              initial={{ opacity: 0, scale: 0.6, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-2 sm:mt-4 w-[110px] sm:w-[160px] h-[110px] sm:h-[160px] 
                         bg-gradient-to-br from-blue-100 via-emerald-100 to-yellow-100 
                         dark:from-gray-800 dark:via-cyan-900 dark:to-gray-800 
                         rounded-full flex flex-col justify-center items-center 
                         border-4 border-blue-200 dark:border-cyan-700 shadow-lg"
            >
              <span className="text-2xl sm:text-4xl font-bold
                text-blue-700 dark:text-cyan-300">{subjectProgress[activeSubject]}%</span>
              <span className="text-base sm:text-lg font-semibold text-blue-700 dark:text-cyan-300">{activeSubject}</span>
              <span className="text-xs sm:text-sm text-gray-600 dark:text-cyan-400">Progress</span>
            </motion.div>
          </div>
          
          {/* Right: Rankings & Chart */}
          <div className="flex-1 w-full max-w-xl flex flex-col gap-7 sm:gap-10">
            
            {/* Leaderboard */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mb-6 sm:mb-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 sm:p-8"
            >
              <span className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-cyan-200 mb-4 sm:mb-6 block text-center">
                {t('dashboard_rankings') || "Class Rankings"}
              </span>
              <table className="w-full text-left text-base sm:text-xl">
                <thead>
                  <tr>
                    <th className="py-2 sm:py-3 font-bold text-blue-800 dark:text-cyan-200">Rank</th>
                    <th className="py-2 sm:py-3 font-bold text-blue-800 dark:text-cyan-200">Name</th>
                    <th className="py-2 sm:py-3 font-bold text-blue-800 dark:text-cyan-200">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((row, i) => (
                    <motion.tr
                      key={row.name}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.07 * i }}
                      className={row.name === "You" ? "font-extrabold bg-emerald-100 dark:bg-cyan-900" : ""}
                    >
                      <td className="py-2 pl-1 sm:py-3 sm:pl-3">{i + 1}</td>
                      <td className="py-2 sm:py-3">{row.name}</td>
                      <td className="py-2 sm:py-3">{row.score}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Past Results: Responsive Scrollable Bar Chart */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="bg-blue-50 dark:bg-gray-900 rounded-2xl shadow-lg px-2 sm:px-8 py-5 sm:py-8"
            >
              <span className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-cyan-200 mb-3 sm:mb-6 block text-center">
                {t('dashboard_results') || "Past Results"}
              </span>
              <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-cyan-200 scrollbar-track-transparent">
                <div className="flex gap-3 sm:gap-4 justify-start items-end h-[110px] sm:h-[120px] min-w-[410px] sm:min-w-0">
                  {pastResults.map(({ month, value }, i) => (
                    <motion.div
                      key={month}
                      initial={{ opacity: 0, height: 12 }}
                      animate={{ opacity: 1, height: 30 + value * 1.2 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex flex-col justify-end items-center flex-shrink-0"
                    >
                      <div
                        className="w-7 sm:w-12 rounded-xl bg-gradient-to-b from-blue-400 via-emerald-400 to-yellow-400 dark:from-cyan-700 dark:via-cyan-400 dark:to-cyan-200 shadow-md mb-2 transition-all"
                        style={{ height: `${30 + value * 1.2}px` }}
                      ></div>
                      <span className="text-center text-blue-900 dark:text-cyan-200 mt-1 font-bold text-[15px] sm:text-lg">
                        {month}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-cyan-400">{value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
}

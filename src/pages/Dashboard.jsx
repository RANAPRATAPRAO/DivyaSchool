import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// EXAMPLE DATA - connect to backend/localStorage for real use!
const progress = 78; // percent of all course completion

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

const size = 200; // for progress circle
const stroke = 18;
const radius = (size / 2) - (stroke / 2);
const circumference = 2 * Math.PI * radius;

export default function Dashboard() {
  const { t } = useTranslation();
  const [activeSubject, setActiveSubject] = useState(subjects[0]);

  return (
    <main className="min-h-screen w-full bg-gradient-to-tr from-sky-50 via-blue-100 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 transition-colors flex flex-col items-center justify-center px-2">
      <div className="w-full max-w-6xl py-14 flex flex-col items-center">
        {/* Title */}
        <h2 className="text-5xl font-extrabold mb-12 text-blue-900 dark:text-cyan-100 text-center drop-shadow-lg">
          {t('dashboard') || "Dashboard"}
        </h2>

        <div className="flex flex-col lg:flex-row w-full gap-16 items-center justify-between">
          {/* Left: Progress Circle + Subject Selector */}
          <div className="flex flex-col items-center gap-8 min-w-[220px]">
            <div className="relative w-[200px] h-[200px]">
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
                <span className="text-6xl font-extrabold text-blue-500 dark:text-cyan-200 drop-shadow-lg">{progress}%</span>
                <span className="text-xl mt-3 font-bold text-gray-600 dark:text-cyan-400 uppercase tracking-wider">
                  {t('completion') || "Completion"}
                </span>
              </div>
            </div>
            {/* Subject selection */}
            <div className="flex gap-3 mt-4 flex-wrap justify-center">
              {subjects.map(subj => (
                <button
                  key={subj}
                  onClick={() => setActiveSubject(subj)}
                  className={`px-5 py-2 rounded-full text-lg font-bold transition
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
              className="mt-4 w-[160px] h-[160px] bg-gradient-to-br from-blue-100 via-emerald-100 to-yellow-100 dark:from-gray-800 dark:via-cyan-900 dark:to-gray-800 rounded-full flex flex-col justify-center items-center border-4 border-blue-200 dark:border-cyan-700 shadow-lg"
            >
              <span className="text-4xl font-bold text-blue-700 dark:text-cyan-300">{subjectProgress[activeSubject]}%</span>
              <span className="text-lg font-semibold text-blue-700 dark:text-cyan-300">{activeSubject}</span>
              <span className="text-sm text-gray-600 dark:text-cyan-400">Progress</span>
            </motion.div>
          </div>

          {/* Right: Rankings & Chart */}
          <div className="flex-1 w-full max-w-xl flex flex-col gap-10">
            {/* Leaderboard */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mb-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8"
            >
              <span className="text-3xl font-bold text-blue-700 dark:text-cyan-200 mb-6 block text-center">
                {t('dashboard_rankings') || "Class Rankings"}
              </span>
              <table className="w-full text-left text-xl">
                <thead>
                  <tr>
                    <th className="py-3 font-bold text-blue-800 dark:text-cyan-200">Rank</th>
                    <th className="py-3 font-bold text-blue-800 dark:text-cyan-200">Name</th>
                    <th className="py-3 font-bold text-blue-800 dark:text-cyan-200">Score</th>
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
                      <td className="py-3 pl-3">{i + 1}</td>
                      <td className="py-3">{row.name}</td>
                      <td className="py-3">{row.score}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Past Results Chart (Bar graph) */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="bg-blue-50 dark:bg-gray-900 rounded-2xl shadow-lg p-8"
            >
              <span className="text-3xl font-bold text-blue-700 dark:text-cyan-200 mb-6 block text-center">
                {t('dashboard_results') || "Past Results"}
              </span>
              <div className="flex gap-4 justify-center items-end h-[120px]">
                {pastResults.map(({ month, value }, i) => (
                  <motion.div
                    key={month}
                    initial={{ opacity: 0, height: 12 }}
                    animate={{ opacity: 1, height: 30 + value * 1.2 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex flex-col justify-end items-center"
                  >
                    <div
                      className="w-12 rounded-xl bg-gradient-to-b from-blue-400 via-emerald-400 to-yellow-400 dark:from-cyan-700 dark:via-cyan-400 dark:to-cyan-200 shadow-md mb-2 transition-all"
                      style={{ height: `${30 + value * 1.2}px` }}
                    ></div>
                    <span className="text-center text-blue-900 dark:text-cyan-200 mt-1 font-bold text-lg">{month}</span>
                    <span className="text-sm text-gray-500 dark:text-cyan-400">{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}

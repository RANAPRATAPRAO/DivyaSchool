import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaLightbulb, FaQuestionCircle, FaUserGraduate } from "react-icons/fa";

const careerFaqs = [
  {
    q: "What is career guidance?",
    a: "Career guidance helps you discover your interests, strengths, and suitable educational or job paths for your future."
  },
  {
    q: "How do I choose a career after 10th or 12th?",
    a: "Think about what subjects and activities you enjoy, talk with mentors or teachers, and explore new fields through workshops or online resources."
  },
  {
    q: "Can I get help for entrance exams?",
    a: "Yes, our mentors can guide you on exam strategies, practice questions, and help reduce your stress with smart study plans."
  }
];

function Blob({ className, color }) {
  return (
    <svg viewBox="0 0 200 200" className={`absolute ${className}`}>
      <motion.path
        d="M45.6,-66.2C62.8,-62.5,80.9,-54.2,84,-41.7C87.1,-29.1,75.1,-12.3,67.3,6.4C59.4,25.1,55.9,45.7,43.6,62.7C31.3,79.6,10.2,93,-6.5,94.2C-23.3,95.4,-46.7,84.4,-53,68.6C-59.3,52.7,-48.6,32.1,-49.3,13.1C-50,-5.9,-62,-23.2,-61.1,-41C-60.1,-58.7,-46.2,-76.8,-29.2,-80.7C-12.2,-84.7,7.9,-74.7,27.6,-72.4C47.3,-70,66.6,-75.4,45.6,-66.2Z"
        fill={color}
        animate={{ scale: [1, 1.14, 1] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function CareerGuidance() {
  const { t } = useTranslation();
  const [faqOpen, setFaqOpen] = useState(null);

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center px-2 pb-12 bg-gradient-to-tr from-[#e0fcef] via-blue-100 to-blue-50 dark:from-[#192c23] dark:via-gray-900 dark:to-slate-900 transition-colors overflow-hidden">
      <Blob className="top-[-90px] left-[-130px] w-[340px] opacity-45 z-0" color="#7fffd4" />
      <Blob className="bottom-[-100px] right-[-70px] w-[350px] opacity-30 z-0" color="#6ce0f1" />

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, scale: 0.96, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, type: "spring" }}
        className="relative z-10 w-full max-w-2xl mx-auto text-center mt-16 mb-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] via-cyan-500 to-yellow-300 dark:from-cyan-400 dark:via-blue-400 dark:to-yellow-200 mb-6 drop-shadow flex justify-center items-center"
        >
          <FaUserGraduate className="mr-3 text-cyan-400 drop-shadow" />
          {t('careerGuidance')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.7 }}
          className="text-2xl font-semibold text-cyan-700 dark:text-cyan-100 mb-5 tracking-wide"
        >
          {t('guidanceDesc')}
        </motion.p>
        <div className="flex flex-col items-center">
          <motion.a
            whileHover={{ scale: 1.07, backgroundColor: "#22d3ee", color: "#fff" }}
            href="/career-guidance/apply"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-emerald-400 dark:bg-blue-700 text-white text-lg font-bold shadow-lg mb-2 transition"
          >
            <FaLightbulb className="mr-2 -mt-1 text-yellow-200 dark:text-yellow-400" />
            {t('getGuidance')}
          </motion.a>
          <span className="text-sm text-cyan-600 dark:text-cyan-200 mt-2 opacity-80">{t('joinMentorshipDesc')}</span>
        </div>
      </motion.section>

      {/* Highlights */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.97, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.26, duration: 0.6 }}
        className="w-full max-w-2xl mx-auto bg-white/80 dark:bg-gray-900/80 rounded-2xl px-7 py-6 shadow-xl backdrop-blur-xl ring-2 ring-cyan-200/25 mb-8"
      >
        <ul className="text-lg text-cyan-900 dark:text-cyan-100 font-bold mb-0 list-disc pl-5 space-y-2">
          <li>{t('expertPanel')}</li>
          <li>{t('streamSelection')}</li>
          <li>{t('examPrep')}</li>
        </ul>
      </motion.section>
      
      {/* FAQ */}
      <section className="z-10 w-full max-w-xl mx-auto mt-3 mb-2">
        <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-100 mb-4 flex items-center gap-2">
          <FaQuestionCircle className="text-cyan-300 mb-1" />
          Frequently Asked Questions
        </h2>
        {careerFaqs.map((faq, i) => (
          <div key={faq.q} className="mb-2">
            <button
              onClick={() => setFaqOpen(faqOpen === i ? null : i)}
              className="w-full text-left py-3 px-4 rounded-lg font-medium transition bg-cyan-50 dark:bg-gray-800 text-cyan-800 dark:text-cyan-200 hover:bg-emerald-50 dark:hover:bg-cyan-800 shadow-sm focus:outline-none"
              aria-expanded={faqOpen === i}
            >
              {faq.q}
            </button>
            <AnimatePresence>
              {faqOpen === i && (
                <motion.div
                  initial={{ opacity: 0, y: 12, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 12, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="px-5 pt-2 pb-3 text-cyan-800 dark:text-cyan-100 text-base bg-cyan-50 dark:bg-gray-800 rounded-b-xl"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </section>
    </main>
  );
}

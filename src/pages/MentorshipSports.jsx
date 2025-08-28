import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// Animated SVG Blobs
function RippleBG({ className = "" }) {
  return (
    <svg viewBox="0 0 800 600" className={`absolute left-0 top-0 w-full h-full z-0 pointer-events-none ${className}`}>
      <circle cx="400" cy="250" r="150" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.10" />
      <circle cx="400" cy="250" r="235" fill="none" stroke="#a7f3d0" strokeWidth="1.8" opacity="0.08" />
      <circle cx="400" cy="250" r="320" fill="none" stroke="#a5b4fc" strokeWidth="2" opacity="0.07" />
    </svg>
  );
}
const Blob = ({ className, color = "#06b6d4" }) => (
  <svg viewBox="0 0 200 200" className={`absolute ${className}`}>
    <motion.path
      d="M43.6,-57.2C58.3,-51.9,73.7,-43.4,76.9,-31.2C80.1,-18.9,71,-3,62.1,12.4C53.1,27.8,44.3,42.8,32.1,50.2C20,57.5,4.6,57.2,-13.1,57.8C-30.7,58.5,-50.5,60.1,-57.5,50.2C-64.4,40.3,-58.6,19,-55.4,1.2C-52.1,-16.5,-51.3,-33,-43.4,-41.8C-35.4,-50.6,-20.2,-51.6,-6.5,-48.6C7.2,-45.5,14.3,-38.4,23,-36.1C31.8,-33.7,43.6,-57.2,43.6,-57.2Z"
      fill={color}
      animate={{ scale: [1, 1.12, 1] }}
      transition={{ duration: 9, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    />
  </svg>
);

export default function MentorshipSports() {
  const { t } = useTranslation();

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#f0fdfa] via-blue-100 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 overflow-hidden pb-7 pt-20">
      <Blob className="top-[-88px] left-[-120px] w-[330px] opacity-50 z-0" color="#7dd3fc" />
      <Blob className="bottom-[-100px] right-[-96px] w-[390px] opacity-35 z-0" color="#a7f3d0" />
      <RippleBG />

      {/* Hero Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, type: "spring" }}
        className="z-10 text-3xl md:text-5xl text-center font-black tracking-tight text-[#22223b] dark:text-cyan-100 mt-14 mb-5 px-2 drop-shadow"
      >
        <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-yellow-200 text-transparent bg-clip-text">
          {t('mentorTagline')}
        </span>
      </motion.h1>

      {/* Cards grid; stack vertically on mobile, split on large screens */}
      <div className="relative w-full max-w-6xl min-h-[440px] flex flex-col md:grid md:grid-cols-2 gap-5 z-10">
        {/* Mentorship Card */}
        <motion.section
          id="mentorship"
          initial={{ opacity: 0, x: -40, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ duration: 1.05, type: "spring" }}
          whileHover={{ y: -6, scale: 1.035, boxShadow: "0 8px 44px -8px #38bdf8" }}
          className="mb-4 md:mb-0 mx-auto w-full max-w-md rounded-3xl shadow-xl bg-gradient-to-br from-white/90 dark:from-cyan-900/85 via-rose-100/70 dark:via-sky-900/50 to-pink-200/70 dark:to-cyan-900/80 border-2 border-white/40 dark:border-cyan-900/40 group p-6 md:p-8 overflow-hidden"
        >
          <span className="text-[56px] absolute -top-6 right-6 drop-shadow-lg pointer-events-none select-none opacity-15">👨‍🏫</span>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#393970] dark:text-cyan-100">{t('mentorshipHighlight')}</h2>
          <div className="text-cyan-800 dark:text-cyan-100 font-semibold mb-2 text-base md:text-lg ">
            {t('mentorshipDesc')}
          </div>
          <ul className="text-base font-medium pl-5 space-y-1 mb-5">
            <li className="list-disc opacity-90">{t('personalMentor')}</li>
            <li className="list-disc opacity-90">{t('regularSessions')}</li>
            <li className="list-disc opacity-90">{t('subjectMentors')}</li>
          </ul>
          <p className="italic text-cyan-700 dark:text-cyan-200 text-base opacity-80 mb-3">
            {t("mentorshipHow")}
          </p>
          <motion.a
            whileHover={{ scale: 1.06 }}
            href="#join-mentorship"
            className="inline-block mt-1 px-7 py-2.5 font-bold rounded-full shadow-lg bg-cyan-600 dark:bg-cyan-800 text-white text-base md:text-lg transition-all"
          >
            {t('joinMentorship')}
          </motion.a>
        </motion.section>
        {/* Sports Card */}
        <motion.section
          id="sports"
          initial={{ opacity: 0, x: 40, y: 32, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ duration: 1.1, type: "spring" }}
          whileHover={{ y: 7, scale: 1.035, boxShadow: "0 10px 60px -2px #fbbf24" }}
          className="mx-auto w-full max-w-md rounded-3xl shadow-xl bg-gradient-to-br from-white/90 dark:from-cyan-900/80 via-yellow-100/75 dark:via-blue-900/30 to-amber-100/70 dark:to-cyan-900/70 border-2 border-white/40 dark:border-yellow-900/40 group p-6 md:p-9 overflow-hidden"
        >
          <span className="text-[56px] absolute -bottom-7 left-8 drop-shadow-lg pointer-events-none select-none opacity-15">🏆</span>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-amber-900 dark:text-amber-100">{t('sports')} {t('joinSportsTitle')}</h2>
          <div className="text-amber-800 dark:text-amber-100 font-semibold mb-2 text-base md:text-lg">
            {t('sportsDesc')}
          </div>
          <ul className="text-base font-medium pl-5 space-y-1 mb-5">
            <li className="list-disc opacity-90">Mentorship from national-level coaches</li>
            <li className="list-disc opacity-90">Regular fitness and sporting events</li>
            <li className="list-disc opacity-90">Mind + body holistic growth</li>
          </ul>
          <p className="italic text-orange-700 dark:text-amber-200 text-base opacity-80 mb-3">
            {t('sportsHow')}
          </p>
          <motion.a
            whileHover={{ scale: 1.06 }}
            href="#join-sports"
            className="inline-block mt-1 px-7 py-2.5 font-bold rounded-full shadow-lg bg-amber-400 dark:bg-amber-700 text-white text-base md:text-lg transition-all"
          >
            {t('joinSports')}
          </motion.a>
        </motion.section>
      </div>

      {/* Join sections */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-5 mt-7 mb-3 z-20 max-w-4xl">
        <motion.section
          id="join-mentorship"
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12, duration: 0.5 }}
          className="flex-1 bg-white/80 dark:bg-cyan-900/90 rounded-3xl p-6 shadow-xl ring-1 ring-cyan-600/10 w-full text-center mx-auto max-w-xl"
        >
          <h3 className="text-xl md:text-2xl font-bold text-cyan-800 dark:text-cyan-100 mb-2">
            {t('joinMentorship')}
          </h3>
          <p className="text-sm md:text-base text-gray-700 dark:text-cyan-100 mb-1">
            {t('joinMentorshipDesc')}
          </p>
          <motion.a
            whileHover={{ scale: 1.04 }}
            href="/enroll/mentorship"
            className="inline-block px-5 py-2 rounded-full bg-cyan-700 text-white font-bold mt-2 shadow hover:bg-cyan-900 transition"
          >
            {t('enrollNow')}
          </motion.a>
        </motion.section>
        <motion.section
          id="join-sports"
          initial={{ opacity: 0, scale: 0.97, y: 32 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.22, duration: 0.5 }}
          className="flex-1 bg-yellow-50 dark:bg-amber-900/80 rounded-3xl p-6 shadow-xl ring-1 ring-amber-600/10 w-full text-center mx-auto max-w-xl"
        >
          <h3 className="text-xl md:text-2xl font-bold text-amber-800 dark:text-amber-100 mb-2">
            {t('joinSportsTitle')}
          </h3>
          <p className="text-sm md:text-base text-amber-900 dark:text-amber-100 mb-1">
            {t('joinSportsDesc')}
          </p>
          <motion.a
            whileHover={{ scale: 1.04 }}
            href="/enroll/sports"
            className="inline-block px-5 py-2 rounded-full bg-amber-500 text-white font-bold mt-2 shadow hover:bg-amber-700 transition"
          >
            {t('enrollNow')}
          </motion.a>
        </motion.section>
      </div>
    </main>
  );
}

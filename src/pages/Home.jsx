import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";

// -- Comet SVG across card top
function CometDecoration({color="#06b6d4"}) {
  return (
    <svg width="210" height="38" viewBox="0 0 210 38" fill="none" className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none select-none" style={{zIndex:2}}>
      <ellipse cx="105" cy="18" rx="93" ry="10" fill={color} opacity="0.11"/>
      <ellipse cx="165" cy="19" rx="20" ry="7" fill={color} opacity="0.23" className="animate-pulse"/>
      <ellipse cx="30" cy="14" rx="22" ry="8" fill="#fbbf24" opacity="0.1" />
      <ellipse cx="116" cy="7" rx="7" ry="3" fill={color} opacity="0.35"/>
      <ellipse cx="63" cy="22" rx="8" ry="2" fill={color} opacity="0.28"/>
    </svg>
  );
}

// Obys/Comet Card
function CometCard({ emoji, title, subtitle, points, btn, cometColor, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.11 + index * 0.17, duration: 0.8, type: "spring" }}
      whileHover={{ y: -12, scale: 1.045, boxShadow: `0 10px 64px -10px ${cometColor}` }}
      whileTap={{ scale: 0.97 }}
      className={`relative rounded-3xl shadow-xl p-8 md:p-10 flex flex-col justify-between bg-gradient-to-br from-white/90 dark:from-cyan-900/80 via-white/70 dark:via-cyan-900/50 to-blue-100/70 dark:to-sky-950/50 border-2 border-white/40 dark:border-cyan-900/40 group min-h-[340px] max-w-sm w-full mx-auto`}
    >
      <CometDecoration color={cometColor} />
      <div>
        <span className="text-5xl block mb-2 drop-shadow-lg relative z-10">{emoji}</span>
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-cyan-100 mb-1 relative z-10">{subtitle}</h2>
        <ul className="text-base text-gray-700 dark:text-cyan-100 font-semibold mt-3 mb-3 pl-5 flex flex-col gap-2 relative z-10">
          {points.map((p, ii) => (
            <li key={ii} className="list-disc">{p}</li>
          ))}
        </ul>
      </div>
      <a
        href={btn.href}
        className={`mt-5 inline-block px-7 py-3 rounded-full text-lg font-extrabold shadow hover:scale-105 focus:outline-none transition text-white ${btn.color} relative z-10`}
      >
        {btn.label}
      </a>
    </motion.div>
  );
}

export default function ObysEnhancedCometPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // -- Card configs --
  const features = [
    {
      emoji: "👨‍🏫",
      subtitle: t('mentorshipHighlight'),
      points: [t('personalMentor'), t('regularSessions'), t('subjectMentors')],
      cometColor: "#22d3ee",
      btn: { href: "/#mentorship", label: t('joinMentorship'), color: "bg-cyan-600 dark:bg-cyan-700 hover:bg-cyan-700 dark:hover:bg-cyan-950" },
    },
    {
      emoji: "🚀",
      subtitle: t('careerGuidanceHighlight'),
      points: [t('expertPanel'), t('streamSelection'), t('examPrep')],
      cometColor: "#fbbf24",
      btn: { href: "/#career-guidance", label: t('getGuidance'), color: "bg-yellow-400 dark:bg-yellow-700 hover:bg-yellow-500 dark:hover:bg-yellow-900" },
    },
    {
      emoji: "🏆",
      subtitle: (t('sports') || "Sports") + " Mentorship",
      points: [
        "Mentorship from national-level coaches",
        "Regular fitness and sporting events",
        "Holistic development for mind + body"
      ],
      cometColor: "#34d399",
      btn: { href: "/#sports", label: t('exploreSports') || "Explore Sports", color: "bg-emerald-400 dark:bg-emerald-700 hover:bg-emerald-600 dark:hover:bg-emerald-900" },
    },
  ];

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center pb-16 bg-gradient-to-tl from-[#e0e7ef] via-white dark:from-slate-900 dark:via-slate-800 to-blue-100 dark:to-blue-950 overflow-hidden">
      {/* Animated blobs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, x: -120, y: -60 }}
        animate={{ opacity: 0.19, scale: 1.14, x: 0, y: 0 }}
        transition={{ duration: 1.3 }}
        className="absolute left-[-70px] top-[-80px] w-[350px] h-[295px] bg-gradient-to-br from-emerald-300 via-teal-400 to-cyan-300
               rounded-full blur-3xl pointer-events-none"
        style={{ zIndex: 1 }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.7, x: 120, y: 100 }}
        animate={{ opacity: 0.16, scale: 1.09, x: 0, y: 0 }}
        transition={{ duration: 1.7 }}
        className="absolute right-[-80px] bottom-[-110px] w-[310px] h-[245px] bg-gradient-to-tr from-blue-300 to-cyan-100
               rounded-full blur-3xl pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, type: "spring" }}
        className="z-10 text-4xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-cyan-100 mb-8 mt-16 md:mt-20 drop-shadow"
        style={{ letterSpacing: "0.01em", lineHeight: 1.05 }}
      >
        <span className="inline-block bg-gradient-to-r from-cyan-400 via-emerald-400 to-yellow-200 text-transparent bg-clip-text">
          {t('mentorTitle')}
        </span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.7 }}
        className="z-10 text-xl md:text-2xl text-emerald-800 dark:text-cyan-100 text-center font-semibold max-w-3xl mb-10 px-2"
      >
        {t('mentorTagline')}
      </motion.p>

      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.27, duration: 0.6 }}
        className="flex justify-center items-center w-full mb-10"
      >
        <button
          tabIndex={0}
          className="flex items-center gap-3 w-full max-w-md bg-white/80 dark:bg-cyan-900/90 backdrop-blur text-lg font-semibold px-7 py-5 rounded-full shadow-xl ring-2 ring-cyan-400/60 dark:ring-cyan-800 focus:outline-none focus:ring-emerald-400 group transition-all hover:scale-105"
          onClick={() => navigate("/chat")}
          onKeyDown={e => e.key === 'Enter' && navigate("/chat")}
        >
          <FaSearch className="text-cyan-400 text-xl group-hover:scale-110 transition" />
          <span className="text-gray-700 dark:text-cyan-100 text-lg">{t('askAnything') || "Ask anything..."}</span>
        </button>
      </motion.div>

      {/* Card grid */}
      <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl px-3">
        {features.map((f, i) => (
          <CometCard key={f.subtitle} {...f} index={i} />
        ))}
      </div>
    </main>
  );
}

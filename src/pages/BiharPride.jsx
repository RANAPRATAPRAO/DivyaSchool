import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export default function BiharPride() {
  const { t } = useTranslation();
  const legends = t("legends", { returnObjects: true });
  const facts = t("facts", { returnObjects: true });
  const [current, setCurrent] = useState(0);

  function nextLegend() {
    setCurrent(c => (c + 1) % legends.length);
  }
  function prevLegend() {
    setCurrent(c => (c - 1 + legends.length) % legends.length);
  }

  return (
    <section className="pt-24 pb-12 max-w-5xl mx-auto px-3 flex flex-col items-center min-h-screen bg-gradient-to-br from-yellow-50 via-emerald-50 to-cyan-100 dark:from-gray-950 dark:via-slate-900 dark:to-blue-950 transition-colors relative">
      <motion.h2
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-4xl font-extrabold mb-10 px-2 text-emerald-700 dark:text-cyan-200 text-center drop-shadow"
      >
        {t('biharPride')}
      </motion.h2>
      {/* Animated carousel of legends */}
      <div className="w-full flex flex-row items-center justify-center mb-6 select-none">
        <button
          className="mr-1 px-3 py-2 rounded-full bg-cyan-100 dark:bg-cyan-800 text-cyan-800 dark:text-cyan-200 shadow-lg hover:bg-cyan-300 transition"
          onClick={prevLegend}
          aria-label="Previous"
        >
          ◀
        </button>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={legends[current].name}
            initial={{ opacity: 0, scale: 0.92, x: 70 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.92, x: -70 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-7 w-full max-w-xs ring-2 ring-emerald-100 dark:ring-cyan-600"
          >
            <img
              src={legends[current].img}
              className="mb-3 w-20 h-20 rounded-full shadow-lg border-4 border-emerald-100 dark:border-cyan-600 object-cover"
              alt={legends[current].name}
            />
            <h3 className="text-lg md:text-xl font-extrabold text-emerald-700 dark:text-cyan-100 text-center mb-1">{legends[current].name}</h3>
            <span className="text-xs font-bold text-blue-600 dark:text-cyan-400 mb-2">{legends[current].field}</span>
            <motion.p
              className="mb-0 text-base text-gray-700 dark:text-cyan-100 text-center line-clamp-2 mt-1 transition-all duration-300 h-12 group-hover:h-auto"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              title={legends[current].desc}
            >
              {legends[current].desc}
            </motion.p>
          </motion.div>
        </AnimatePresence>
        <button
          className="ml-1 px-3 py-2 rounded-full bg-cyan-100 dark:bg-cyan-800 text-cyan-800 dark:text-cyan-200 shadow-lg hover:bg-cyan-300 transition"
          onClick={nextLegend}
          aria-label="Next"
        >
          ▶
        </button>
      </div>
      {/* Legend indicators */}
      <div className="flex gap-2 mb-9 mt-2 justify-center">
        {legends.map((leg, i) => (
          <span
            key={leg.name}
            className={`w-3 h-3 rounded-full transition-all ${current === i ? "bg-emerald-400 dark:bg-cyan-400 shadow" : "bg-gray-300 dark:bg-gray-700"}`}
            aria-label={leg.name}
            onClick={() => setCurrent(i)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
      {/* Fun Facts Section */}
      <motion.h3
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg md:text-2xl font-bold mb-5 text-blue-700 dark:text-cyan-200 text-center"
      >
        {t("knowBihar") || "Get to know Bihar!"}
      </motion.h3>
      <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-10">
        {facts.map(fact => (
          <motion.div
            key={fact.title}
            initial={{ opacity: 0.7, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center ring-1 ring-blue-100 dark:ring-cyan-800"
          >
            <div className="text-3xl mb-2">{fact.icon}</div>
            <div className="font-bold text-blue-700 dark:text-cyan-200 mb-1">{fact.title}</div>
            <div className="text-sm text-gray-700 dark:text-cyan-100 text-center">{fact.desc}</div>
          </motion.div>
        ))}
      </div>
      {/* Section footer/caption */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-emerald-700 dark:text-cyan-200 text-lg font-medium mt-5 max-w-2xl mx-auto px-3"
      >
        {t("biharPrideDesc")}
      </motion.div>
    </section>
  );
}

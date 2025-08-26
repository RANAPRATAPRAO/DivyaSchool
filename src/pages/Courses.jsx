import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Courses() {
  const { t } = useTranslation();
  const classes = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="pt-24 pb-10 px-2 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-4xl font-extrabold text-center mb-14 text-indigo-800 dark:text-cyan-100 drop-shadow-lg">
        {t('courses')}
      </h2>
      {/* Enhanced Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-9">
        {classes.map((cls, i) => (
          <motion.div
            key={cls}
            initial={{ opacity: 0, scale: 0.7, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ scale: 1.1, boxShadow: "0 8px 36px 0 rgba(34,213,238,.20)" }}
            className="bg-white/90 dark:bg-gray-900 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-between
              transition min-h-[250px] hover:bg-blue-50 dark:hover:bg-cyan-900 ring-1 ring-blue-200 dark:ring-cyan-700"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 via-blue-600 to-cyan-400 dark:from-cyan-700 dark:via-cyan-400 dark:to-cyan-200 rounded-full flex items-center justify-center font-extrabold text-4xl mb-5 text-white shadow-lg ring-2 ring-blue-300 dark:ring-cyan-600">
              {cls}
            </div>
            <h3 className="text-2xl font-bold mb-2 text-indigo-900 dark:text-cyan-200 drop-shadow">{t('classX', { number: cls })}</h3>
            <Link
              to={`/courses/${cls}`}
              className="mt-6 px-6 py-2 rounded-full bg-blue-600 dark:bg-cyan-700 text-white text-lg font-bold shadow hover:bg-blue-900 dark:hover:bg-cyan-900 transition-all"
            >
              {t('explore')}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

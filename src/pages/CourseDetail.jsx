import React from 'react';
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

// Example subjects per class, extend as needed
const subjects = {
  1: ["हिंदी", "English", "गणित"],
  2: ["हिंदी", "English", "गणित"],
  10: ["Math", "Science", "Social Science", "English", "हिंदी"]
  // ... Add for all classes
};

export default function CourseDetail() {
  const { classId } = useParams();
  const { t } = useTranslation();
  const subjArr = subjects[classId] || [];

  return (
    <section className="pt-24 px-2 max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-indigo-800 dark:text-cyan-100 text-center drop-shadow">
        {t('classSubjects', { number: classId })}
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-7 mb-10">
        {subjArr.map((sub, i) => (
          <motion.li
            key={sub}
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.08 * i }}
            whileHover={{ scale: 1.09, boxShadow: "0 8px 32px 0 rgba(67,191,191,.14)" }}
            className="bg-blue-50 dark:bg-gray-900 py-5 px-7 rounded-2xl shadow-lg text-2xl font-bold text-blue-700 dark:text-cyan-200 transition-all cursor-pointer flex justify-center items-center"
          >
            {sub}
          </motion.li>
        ))}
      </ul>
      <div className="mt-5 mb-8">
        <h2 className="text-2xl font-semibold text-indigo-700 dark:text-cyan-100 mb-4 text-center">{t('downloads')}</h2>
        <ul className="flex flex-wrap gap-5 justify-center">
          <li>
            <a
              href={`/downloads/sample_${classId}.pdf`}
              download
              className="px-5 py-2 rounded-full bg-blue-600 dark:bg-cyan-700 text-white font-bold shadow hover:bg-blue-900 dark:hover:bg-cyan-900 transition text-lg"
            >
              {t('download')} {t('samplePapers')}
            </a>
          </li>
          {/* Add more links if needed */}
        </ul>
      </div>
    </section>
  );
}

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";



// Example resources, extend as needed!
const resources = [
  { class: "10", subject: "Math", type: "PDF", link: "/notes/math10.pdf" },
  { class: "10", subject: "Science", type: "PDF", link: "/notes/science10.pdf" },
  { class: "9", subject: "Science", type: "DOCX", link: "/notes/science9.docx" },
  { class: "9", subject: "Math", type: "PDF", link: "/notes/math9.pdf" }
];

export default function DownloadCenter() {
  const [flt, setFlt] = useState({ class: "", subject: "", type: "" });
  const { t } = useTranslation();

  const classOptions = [...new Set(resources.map(r => r.class))];
  const subjectOptions = [...new Set(resources.map(r => r.subject))];
  const typeOptions = [...new Set(resources.map(r => r.type))];

  const filtered = resources.filter(r =>
    (!flt.class || r.class === flt.class) &&
    (!flt.subject || r.subject === flt.subject) &&
    (!flt.type || r.type === flt.type)
  );

  return (
    <section className="pt-24 pb-10 max-w-5xl mx-auto px-2">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-blue-800 dark:text-cyan-200 text-center">{t('downloadCenter')}</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-7 justify-center items-center">
        {/* Class Filter */}
        <select
          value={flt.class}
          onChange={e => setFlt(f => ({ ...f, class: e.target.value }))}
          className="rounded-md bg-white dark:bg-gray-900 border border-blue-300 dark:border-cyan-700 px-4 py-2 text-blue-700 dark:text-cyan-300 shadow focus:ring-2 focus:ring-blue-300 dark:focus:ring-cyan-700 focus:outline-none transition"
        >
          <option value="">{t('allClasses')}</option>
          {classOptions.map(c => (
            <option key={c} value={c}>{t('classX', { number: c })}</option>
          ))}
        </select>
        {/* Subject Filter */}
        <select
          value={flt.subject}
          onChange={e => setFlt(f => ({ ...f, subject: e.target.value }))}
          className="rounded-md bg-white dark:bg-gray-900 border border-blue-300 dark:border-cyan-700 px-4 py-2 text-blue-700 dark:text-cyan-300 shadow focus:ring-2 focus:ring-blue-300 dark:focus:ring-cyan-700 focus:outline-none transition"
        >
          <option value="">{t('allSubjects') || "All Subjects"}</option>
          {subjectOptions.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {/* Type Filter */}
        <select
          value={flt.type}
          onChange={e => setFlt(f => ({ ...f, type: e.target.value }))}
          className="rounded-md bg-white dark:bg-gray-900 border border-blue-300 dark:border-cyan-700 px-4 py-2 text-blue-700 dark:text-cyan-300 shadow focus:ring-2 focus:ring-blue-300 dark:focus:ring-cyan-700 focus:outline-none transition"
        >
          <option value="">{t('allTypes') || "All Types"}</option>
          {typeOptions.map(topt => (
            <option key={topt} value={topt}>{topt}</option>
          ))}
        </select>
      </div>

      {/* Resource List */}
      <ul className="flex flex-col gap-4 w-full">
        {filtered.length === 0 ? (
          <li className="bg-red-50 dark:bg-gray-700 text-red-700 dark:text-red-300 p-4 rounded shadow text-center font-semibold">
            {t("noResources") || "No resources found for your selection."}
          </li>
        ) : (
          filtered.map((r, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between
                        p-4 bg-white dark:bg-gray-900 rounded-xl shadow border border-blue-100 dark:border-cyan-700"
            >
              <span className="font-medium text-blue-800 dark:text-cyan-200 mb-2 sm:mb-0">
                {t('classX', { number: r.class })} • {r.subject} <span className="inline-block text-xs bg-blue-100 dark:bg-cyan-700 text-blue-700 dark:text-cyan-50 px-2 py-0.5 rounded ml-2">{r.type}</span>
              </span>
              <a
                href={r.link}
                download
                className="py-2 px-5 rounded-lg bg-blue-600 dark:bg-cyan-700 text-white font-bold shadow hover:bg-blue-800 dark:hover:bg-cyan-900 transition focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-cyan-600"
              >
                {t('download')}
              </a>
            </motion.li>
          ))
        )}
      </ul>
    </section>
  );
}

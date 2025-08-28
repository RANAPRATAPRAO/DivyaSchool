import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

// Main Enrollment component (Obys design inspired)
export default function EnrollObysCard({
  icon = "📝",
  programKey = "mentorship",            // e.g., mentorship, career, sports
  primaryColor = "bg-cyan-700",         // e.g., bg-cyan-700, bg-yellow-500
  gradient = "from-cyan-200 to-cyan-500", // bg-gradient-to-r colors
  features = [],                        // Array of t() keys for feature list
  onEnroll = () => {}
}) {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    more: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    // onEnroll(form); // You can pass the form to parent if needed!
    setTimeout(() => setSubmitted(false), 3500);
  }

  return (
    <main className={`min-h-screen w-full pt-24 pb-14 flex flex-col items-center justify-center bg-gradient-to-tr ${gradient} dark:from-gray-950 dark:via-slate-900 dark:to-cyan-950 px-2`}>
      <motion.section
        initial={{ opacity: 0, scale: 0.96, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, type: "spring" }}
        className="relative w-full max-w-xl mx-auto rounded-3xl shadow-2xl bg-white/90 dark:bg-cyan-950/95 ring-2 ring-cyan-300/30 dark:ring-cyan-800 p-7 pb-10"
      >
        {/* Glow/Emoji */}
        <div className="absolute left-1/2 top-[-44px] -translate-x-1/2">
          <span className="text-6xl drop-shadow-lg select-none">{icon}</span>
        </div>
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-center mb-4 text-cyan-800 dark:text-cyan-50 mt-8">
          {t(`${programKey}EnrollTitle`)}
        </h1>
        {/* Subtitle/desc */}
        <p className="text-base md:text-lg text-center font-medium text-cyan-700 dark:text-cyan-200 mb-5 opacity-90">
          {t(`${programKey}EnrollDesc`)}
        </p>
        {/* Feature list (optional) */}
        {features.length > 0 && (
          <ul className="mb-6 px-2 flex flex-col gap-2">
            {features.map((fk, idx) => (
              <li key={fk} className="flex items-center gap-2 text-cyan-800 dark:text-cyan-200 font-semibold">
                <FaCheckCircle className="text-cyan-500" /> {t(fk)}
              </li>
            ))}
          </ul>
        )}

        {/* Form */}
        <form className="flex flex-col gap-5 mt-3" onSubmit={handleSubmit} autoComplete="off">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder={t("formName")}
            className="p-3 rounded-xl border border-cyan-200 dark:border-cyan-700 bg-white dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder={t("formEmail")}
            className="p-3 rounded-xl border border-cyan-200 dark:border-cyan-700 bg-white dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200"
          />
          <input
            name="mobile"
            type="tel"
            value={form.mobile}
            onChange={handleChange}
            required
            placeholder={t("formMobile")}
            className="p-3 rounded-xl border border-cyan-200 dark:border-cyan-700 bg-white dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200"
          />
          <textarea
            name="more"
            value={form.more}
            onChange={handleChange}
            placeholder={t("formMore")}
            className="p-3 rounded-xl border border-cyan-200 dark:border-cyan-700 bg-white dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 min-h-[90px]"
          />
          <button
            type="submit"
            className={`font-bold text-lg rounded-full py-3 shadow-md focus:outline-none transition ${primaryColor} text-white mt-2`}
          >
            {t("formSubmit")}
          </button>
        </form>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-5 text-center text-green-600 dark:text-green-400 font-bold text-lg flex flex-col items-center gap-2"
          >
            <FaCheckCircle className="mx-auto text-2xl mb-1" />
            {t("formSuccess")}
          </motion.div>
        )}
      </motion.section>
    </main>
  );
}

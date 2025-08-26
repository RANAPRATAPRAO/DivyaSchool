import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);

  return (
    <main className="pt-24 min-h-screen px-2 flex items-center justify-center bg-gradient-to-tr from-blue-50 via-emerald-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 transition-colors">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 items-start">
        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 flex flex-col justify-center items-start mb-6 md:mb-0"
        >
          <h2 className="text-3xl font-bold mb-6 text-blue-800 dark:text-cyan-200">{t('getInTouch') || "Get in Touch"}</h2>
          <p className="text-lg mb-6 text-gray-700 dark:text-cyan-100">
            {t('contactInfoDesc') || "We love hearing from you! Reach out for questions, feedback, or support."}
          </p>
          <div className="flex flex-col gap-5 items-start">
            <div className="flex items-center gap-3 text-blue-900 dark:text-cyan-300 text-base">
              <FaEnvelope className="text-xl" />
              <span>school@divya.org</span>
            </div>
            <div className="flex items-center gap-3 text-blue-900 dark:text-cyan-300 text-base">
              <FaPhoneAlt className="text-xl" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 text-blue-900 dark:text-cyan-300 text-base">
              <FaMapMarkerAlt className="text-xl" />
              <span>{t('address') || "Patna, Bihar, India"}</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          className="flex-1 bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 w-full max-w-xl"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          onSubmit={e => { e.preventDefault(); setSent(true); }}
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-800 dark:text-cyan-200">
            {t('contactUs')}
          </h2>
          <input
            required
            placeholder={t('yourName')}
            className="block w-full p-3 rounded shadow mb-4 border border-blue-200 dark:border-cyan-700 bg-white dark:bg-gray-800 text-lg"
          />
          <input
            required
            type="email"
            placeholder={t('yourEmail')}
            className="block w-full p-3 rounded shadow mb-4 border border-blue-200 dark:border-cyan-700 bg-white dark:bg-gray-800 text-lg"
          />
          <textarea
            required
            placeholder={t('yourMessage')}
            className="block w-full p-3 rounded shadow mb-4 border border-blue-200 dark:border-cyan-700 bg-white dark:bg-gray-800 text-lg"
            rows={5}
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 dark:bg-cyan-700 text-white font-bold rounded-lg text-xl mt-2 hover:bg-blue-800 dark:hover:bg-cyan-900 transition"
          >
            {t('sendMessage')}
          </button>
          {sent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 dark:text-green-400 mt-6 text-center text-lg font-semibold"
            >
              {t('thankYou')}
            </motion.div>
          )}
        </motion.form>
      </div>
    </main>
  );
}

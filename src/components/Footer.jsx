import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import logo from '../assets/generated-image.png';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full px-3 pt-9 pb-4 bg-gradient-to-tr from-blue-50 via-cyan-100 to-emerald-50 dark:from-gray-950 dark:via-slate-900 dark:to-cyan-950 text-blue-900 dark:text-cyan-200 shadow-xl border-t border-blue-100 dark:border-gray-800 transition-colors z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-5">
        {/* Logo & Tagline */}
        <div className="flex-1 mb-4 md:mb-0 flex flex-col items-center md:items-start">
          <img src={logo} alt={t("appName")} className="w-14 h-14 rounded-full border-2 border-cyan-300 dark:border-cyan-500 mb-2 shadow-2xl" />
          <span className="font-bold text-2xl tracking-wide mb-2 obys-font">{t("appName")}</span>
          <p className="text-sm text-blue-800 dark:text-cyan-100 transition">{t("tagline")}</p>
        </div>

        {/* Quick Links */}
        <nav className="flex-1 flex flex-row flex-wrap md:flex-col gap-x-6 gap-y-3 justify-center items-center md:items-start">
          <FooterLink href="/courses" label={t('courses')} />
          <FooterLink href="/practice-lab" label={t('practiceLab')} />
          <FooterLink href="/bihar-pride" label={t('biharPride')} />
          <FooterLink href="/download-center" label={t('downloadCenter')} />
          <FooterLink href="/dashboard" label={t('dashboard')} />
          <FooterLink href="/contact" label={t('contact')} />
        </nav>

        {/* Social & Newsletter */}
        <div className="flex-1 flex flex-col items-center md:items-end gap-3 w-full max-w-xs">
          <div className="flex gap-5 mb-2">
            <FooterIcon link="https://facebook.com" label="Facebook" color="text-blue-600 dark:text-cyan-300" Icon={FaFacebook} />
            <FooterIcon link="https://instagram.com" label="Instagram" color="text-pink-500 dark:text-pink-400" Icon={FaInstagram} />
            <FooterIcon link="https://twitter.com" label="Twitter" color="text-cyan-500 dark:text-cyan-300" Icon={FaTwitter} />
            <FooterIcon link="https://youtube.com" label="YouTube" color="text-red-600 dark:text-red-400" Icon={FaYoutube} />
          </div>
          {/* Newsletter signup */}
          <form className="flex w-full">
            <input
              type="email"
              placeholder={t("newsletterPlaceholder") || "Your email..."}
              className="flex-1 px-3 py-1 rounded-l-xl bg-white/90 dark:bg-gray-900 border border-cyan-200 dark:border-cyan-800 placeholder:text-blue-400 dark:placeholder:text-cyan-300 focus:outline-none text-blue-700 dark:text-cyan-100"
            />
            <button
              type="submit"
              className="font-semibold px-4 py-1 bg-gradient-to-br from-cyan-400 to-blue-400 dark:from-cyan-700 dark:to-blue-900 text-white rounded-r-xl hover:bg-emerald-500 dark:hover:bg-cyan-800 transition"
            >
              {t("newsletterSubscribe") || "Subscribe"}
            </button>
          </form>
        </div>
      </div>
      {/* Copyright */}
      <div className="w-full text-center text-xs mt-7 text-blue-700 dark:text-cyan-400 opacity-70">
        © {new Date().getFullYear()} {t("appName")}. {t("rightsReserved") || "All rights reserved."}
      </div>
    </footer>
  );
}

function FooterLink({ href, label }) {
  return (
    <a
      href={href}
      className="text-base font-semibold px-2 py-1 rounded transition
        hover:bg-cyan-100 dark:hover:bg-cyan-900 hover:text-cyan-600 dark:hover:text-cyan-200 hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-400
        "
    >
      {label}
    </a>
  );
}

function FooterIcon({ link, label, color, Icon }) {
  return (
    <a
      href={link}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={`${color} rounded-full p-2 bg-white/60 dark:bg-cyan-950/50 shadow hover:scale-110 transition
        focus:outline-none focus:ring-2 focus:ring-cyan-300`}
      tabIndex={0} // accessibility
    >
      <Icon size={22} />
    </a>
  );
}

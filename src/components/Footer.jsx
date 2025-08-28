import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import logo from "../assets/generated-image.png";

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Basic email validation
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      setError(t("invalidEmail") || "Please enter a valid email address.");
      setSubmitted(false);
      return;
    }
    setSubmitted(true);
    setError("");
    // You can handle submitting to API here
  }

  return (
    <footer className="w-full px-2 pt-9 pb-4 bg-gradient-to-tr from-blue-50 via-cyan-100 to-emerald-50 dark:from-gray-950 dark:via-slate-900 dark:to-cyan-950 text-blue-900 dark:text-cyan-200 shadow-xl border-t border-blue-100 dark:border-gray-800 transition-colors z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-stretch gap-y-10 gap-x-5">
        {/* Logo & Tagline */}
        <div className="flex-1 flex flex-col items-center md:items-start mb-1">
          <img
            src={logo}
            alt={t("appName")}
            className="w-14 h-14 rounded-full border-2 border-cyan-300 dark:border-cyan-500 mb-2 shadow-2xl"
          />
          <span className="font-bold text-2xl tracking-wide mb-2 obys-font">
            {t("appName")}
          </span>
          <p className="text-sm text-blue-800 dark:text-cyan-100 transition text-center md:text-left">
            {t("tagline")}
          </p>
        </div>

        {/* Quick Links */}
        <nav
          className="flex-1 flex flex-wrap flex-row md:flex-col gap-x-6 gap-y-2
            items-center md:items-start justify-center md:justify-normal"
          aria-label={t("quickLinks") || "Quick Links"}
        >
          <FooterLink to="/courses" label={t("courses")} />
          <FooterLink to="/practice-lab" label={t("practiceLab")} />
          <FooterLink to="/bihar-pride" label={t("biharPride")} />
          <FooterLink to="/download-center" label={t("downloadCenter")} />
          <FooterLink to="/dashboard" label={t("dashboard")} />
          <FooterLink to="/contact" label={t("contact")} />
        </nav>

        {/* Social & Newsletter */}
        <div className="flex-1 flex flex-col w-full max-w-md items-center md:items-end">
          <div className="flex gap-4 mb-3 mt-1 md:justify-end justify-center w-full">
            <FooterIcon
              link="https://facebook.com"
              label="Facebook"
              color="text-blue-600 dark:text-cyan-300"
              Icon={FaFacebook}
            />
            <FooterIcon
              link="https://instagram.com"
              label="Instagram"
              color="text-pink-500 dark:text-pink-400"
              Icon={FaInstagram}
            />
            <FooterIcon
              link="https://twitter.com"
              label="Twitter"
              color="text-cyan-500 dark:text-cyan-300"
              Icon={FaTwitter}
            />
            <FooterIcon
              link="https://youtube.com"
              label="YouTube"
              color="text-red-600 dark:text-red-400"
              Icon={FaYoutube}
            />
          </div>
          {/* Newsletter signup */}
          <form
            className="flex flex-col sm:flex-row w-full gap-2"
            onSubmit={handleSubmit}
            aria-label={t("newsletterSignup") || "Newsletter Signup"}
            autoComplete="off"
          >
            <label htmlFor="footer-email-input" className="sr-only">
              {t("newsletterPlaceholder") || "Your email"}
            </label>
            <input
              id="footer-email-input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={submitted}
              placeholder={t("newsletterPlaceholder") || "Your email..."}
              className="flex-1 px-3 py-2 rounded-xl bg-white/90 dark:bg-gray-900 border border-cyan-200 dark:border-cyan-800 placeholder:text-blue-400 dark:placeholder:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-blue-700 dark:text-cyan-100
               transition"
              required
            />
            <button
              type="submit"
              disabled={submitted}
              className="font-semibold px-4 py-2 bg-gradient-to-br from-cyan-400 to-blue-400 dark:from-cyan-700 dark:to-blue-900 text-white rounded-xl
                hover:bg-emerald-500 dark:hover:bg-cyan-800 transition shadow disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label={t("newsletterSubscribe") || "Subscribe"}
            >
              {submitted
                ? t("subscribed") || "Subscribed"
                : t("newsletterSubscribe") || "Subscribe"}
            </button>
          </form>
          <div className="w-full">
            {error && (
              <span className="block text-xs text-red-500 mt-2">{error}</span>
            )}
            {submitted && !error && (
              <span className="block text-xs text-green-600 mt-2">
                {t("newsletterThanks") || "Thank you for subscribing!"}
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="w-full text-center text-xs mt-7 text-blue-700 dark:text-cyan-400 opacity-70">
        © {new Date().getFullYear()} {t("appName")}.{" "}
        {t("rightsReserved") || "All rights reserved."}
      </div>
    </footer>
  );
}

// Use <Link> for internal navigation!
function FooterLink({ to, label }) {
  return (
    <Link
      to={to}
      className="text-base font-semibold px-2 py-1 rounded transition
      hover:bg-cyan-100 dark:hover:bg-cyan-950 hover:text-cyan-600 dark:hover:text-cyan-200 hover:underline focus:outline-none
      focus:ring-2 focus:ring-cyan-400"
      tabIndex={0}
    >
      {label}
    </Link>
  );
}

// For social icons (external links only!)
function FooterIcon({ link, label, color, Icon }) {
  return (
    <a
      href={link}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={`${color} rounded-full p-3 bg-white/80 dark:bg-cyan-950/50 shadow
      hover:scale-110 transition
      focus:outline-none focus:ring-2 focus:ring-cyan-300`}
      tabIndex={0}
      role="button"
      style={{ minWidth: 44, minHeight: 44 }}
    >
      <Icon size={22} />
    </a>
  );
}

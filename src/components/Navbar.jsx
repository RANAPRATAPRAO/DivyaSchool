import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaMoon, FaSun, FaBars } from 'react-icons/fa';

const LANG_OPTIONS = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'hi_en', label: 'Hinglish' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [dark, setDark] = useState(() =>
    localStorage.getItem('dark-mode') === 'true' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  // Toggle dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('dark-mode', dark);
  }, [dark]);

  // Close language dropdown on outside click
  useEffect(() => {
    const handler = () => setLangOpen(false);
    if (langOpen) document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [langOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 w-full z-30 bg-opacity-90 bg-blue-50 dark:bg-gray-800 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-2">
        {/* Logo/Brand */}
        <Link to="/" className="text-2xl font-extrabold text-blue-800 dark:text-cyan-200 drop-shadow">
          {t('appName')}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5">
          <NavLinks t={t} />
          <DarkToggle dark={dark} setDark={setDark} />
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={e => { e.stopPropagation(); setLangOpen(l => !l); }}
              className="ml-2 px-3 py-1 rounded-full bg-white/80 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-600 shadow hover:bg-blue-100 dark:hover:bg-gray-600 transition"
            >
              🌐 {LANG_OPTIONS.find(l => l.code === i18n.resolvedLanguage)?.label || 'Language'}
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-700 rounded shadow-xl border dark:border-gray-600 min-w-[120px] overflow-hidden z-50"
                onClick={e => e.stopPropagation()}
              >
                {LANG_OPTIONS.map(opt => (
                  <button
                    key={opt.code}
                    className="w-full px-4 py-2 text-left hover:bg-blue-100/70 dark:hover:bg-gray-600 transition"
                    onClick={() => { i18n.changeLanguage(opt.code); setLangOpen(false); }}
                  >{opt.label}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center md:hidden gap-2">
          <DarkToggle dark={dark} setDark={setDark} />
          <button
            className="p-2 rounded-md hover:bg-blue-100/60 dark:hover:bg-gray-700 transition outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => setMenuOpen(m => !m)}
            aria-label="Open navigation menu"
          >
            <FaBars className="text-2xl text-blue-700 dark:text-cyan-200" />
          </button>
        </div>
      </div>
      {/* Mobile Nav Drawer */}
      <div className={`md:hidden transition-[max-height,padding] duration-300 bg-blue-50/95 dark:bg-gray-800 backdrop-blur-lg shadow-lg overflow-hidden ${menuOpen ? 'max-h-[400px] py-3' : 'max-h-0 py-0'}`}>
        <div className="flex flex-col gap-2 px-5 pb-2">
          <NavLinks t={t} onClick={() => setMenuOpen(false)} />
          {/* Language button in mobile dropdown */}
          <div className="relative">
            <button
              onClick={e => { e.stopPropagation(); setLangOpen(l => !l); }}
              className="w-full mt-2 px-3 py-1 rounded-full bg-white/80 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 shadow hover:bg-blue-100/70 dark:hover:bg-gray-600 transition"
            >
              🌐 {LANG_OPTIONS.find(l => l.code === i18n.resolvedLanguage)?.label || 'Language'}
            </button>
            {langOpen && (
              <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-700 rounded shadow-xl border dark:border-gray-600 min-w-[120px] overflow-hidden z-50"
                onClick={e => e.stopPropagation()}
              >
                {LANG_OPTIONS.map(opt => (
                  <button
                    key={opt.code}
                    className="w-full px-4 py-2 text-left hover:bg-blue-100/70 dark:hover:bg-gray-600 transition"
                    onClick={() => { i18n.changeLanguage(opt.code); setLangOpen(false); setMenuOpen(false); }}
                  >{opt.label}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Navigation links component for reuse
function NavLinks({ t, onClick = () => {} }) {
  return (
    <>
      <Link to="/courses"        className="py-1 px-2 text-blue-700 dark:text-cyan-200 rounded hover:bg-blue-100 dark:hover:bg-cyan-900 transition" onClick={onClick}>{t('courses')}</Link>
      <Link to="/practice-lab"   className="py-1 px-2 text-blue-700 dark:text-cyan-200 rounded hover:bg-blue-100 dark:hover:bg-cyan-900 transition" onClick={onClick}>{t('practiceLab')}</Link>
      <Link to="/bihar-pride"    className="py-1 px-2 text-blue-700 dark:text-cyan-200 rounded hover:bg-blue-100 dark:hover:bg-cyan-900 transition" onClick={onClick}>{t('biharPride')}</Link>
      <Link to="/download-center" className="py-1 px-2 text-blue-700 dark:text-cyan-200 rounded hover:bg-blue-100 dark:hover:bg-cyan-900 transition" onClick={onClick}>{t('downloadCenter')}</Link>
      <Link to="/dashboard"      className="py-1 px-2 text-blue-700 dark:text-cyan-200 rounded hover:bg-blue-100 dark:hover:bg-cyan-900 transition" onClick={onClick}>{t('dashboard')}</Link>
      <Link to="/tuteVideo"      className="py-1 px-2 text-blue-700 dark:text-cyan-200 rounded hover:bg-blue-100 dark:hover:bg-cyan-900 transition" onClick={onClick}>{t('Videos')}</Link>
      <Link to="/contact"        className="py-1 px-2 text-blue-700 dark:text-cyan-200 rounded hover:bg-blue-100 dark:hover:bg-cyan-900 transition" onClick={onClick}>{t('contact')}</Link>
      <Link to="/events"         className="py-1 px-2 text-blue-700 dark:text-cyan-200 rounded hover:bg-blue-100 dark:hover:bg-cyan-900 transition" onClick={onClick}>{t('Events')}</Link>
    </>
  );
}

// Dark mode toggle
function DarkToggle({ dark, setDark }) {
  return (
    <button
      className="p-2 rounded-md hover:bg-blue-100/70 dark:hover:bg-gray-700 transition mx-1"
      onClick={() => setDark(d => !d)}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      {dark
        ? <FaMoon className="text-lg text-blue-900 dark:text-cyan-300" />
        : <FaSun className="text-lg text-yellow-500" />}
    </button>
  );
}

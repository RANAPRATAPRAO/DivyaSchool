import React from 'react';
import { useTranslation } from 'react-i18next';
export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const langs = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'hi_en', label: 'Hinglish' }
  ];
  return (
    <div className="flex gap-2">
      {langs.map(lang => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className="px-3 py-1 rounded bg-blue-100 hover:bg-blue-300 focus:outline-none"
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}

import React from 'react';
import { useTranslation } from "react-i18next";
export default function AdminPanel() {
  const { t } = useTranslation();
  return (
    <main className="pt-24 px-6">
      <h2 className="text-2xl font-bold mb-4">{t('adminPanel')}</h2>
      <div className="bg-blue-50 p-6 rounded-xl"> {/* Add upload forms & resource editors here */} {t('adminFeature')}</div>
    </main>
  );
}

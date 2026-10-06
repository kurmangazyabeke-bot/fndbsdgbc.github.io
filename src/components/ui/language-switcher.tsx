'use client';

import React from 'react';
import { useTranslation, Locale } from '@/lib/i18n/context';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();

  return (
    <div className="flex items-center gap-1 rounded-full bg-slate-100 p-1 border border-slate-200/80 dark:bg-slate-800 dark:border-slate-700">
      <Globe className="h-3.5 w-3.5 text-slate-400 ml-1.5 mr-0.5" />
      <button
        onClick={() => setLocale('kk')}
        className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition-all ${
          locale === 'kk'
            ? 'bg-emerald-600 text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
        }`}
      >
        ҚАЗ
      </button>
      <button
        onClick={() => setLocale('ru')}
        className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition-all ${
          locale === 'ru'
            ? 'bg-emerald-600 text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
        }`}
      >
        РУС
      </button>
    </div>
  );
}

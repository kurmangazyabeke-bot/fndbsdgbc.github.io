'use client';

import React, { createContext, useContext, useState } from 'react';
import { kk, TranslationKeys } from './locales/kk';
import { ru } from './locales/ru';

export type Locale = 'kk' | 'ru';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('kk');

  const translations: Record<Locale, TranslationKeys> = {
    kk,
    ru,
  };

  const value = {
    locale,
    setLocale,
    t: translations[locale],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}

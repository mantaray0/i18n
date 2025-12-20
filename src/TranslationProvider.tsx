'use client';

import React, { createContext, ReactNode, useEffect, useState } from 'react';

export interface TranslationContextProps {
  translations: any;
  language: string;
  changeLanguage: (lang: string) => void;
}

export const TranslationContext = createContext<TranslationContextProps | null>(
  null
);

export interface TranslationProviderProps {
  translations: any;
  locale: string;
  reloadKey?: string | number;
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  translations,
  locale,
  reloadKey,
  children
}) => {
  const [language, setLanguage] = useState(locale);
  const [lastReloadKey, setLastReloadKey] = useState(reloadKey);
  const [lastLocale, setLastLocale] = useState(locale);

  useEffect(() => {
    if (reloadKey !== undefined && reloadKey !== lastReloadKey) {
      setLanguage(locale);
      setLastReloadKey(reloadKey);
      setLastLocale(locale);
    }
  }, [reloadKey, lastReloadKey, locale]);

  useEffect(() => {
    if (locale !== lastLocale && reloadKey === undefined) {
      setLanguage(locale);
      setLastLocale(locale);
    }
  }, [locale, lastLocale, reloadKey]);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <TranslationContext.Provider
      value={{ translations, language, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

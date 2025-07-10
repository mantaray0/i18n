'use client';

import React, { createContext, ReactNode, useEffect, useState } from 'react';

export interface TranslationsContextProps {
    translations: any;
    language: string;
    changeLanguage: (lang: string) => void;
}

export const TranslationsContext =
    createContext<TranslationsContextProps | null>(null);

export interface TranslationsProviderProps {
    translations: any;
    locale: string;
    reloadKey?: string | number;
    children: ReactNode;
}

export const TranslationsProvider: React.FC<TranslationsProviderProps> = ({
    translations,
    locale,
    reloadKey,
    children
}) => {
    const [language, setLanguage] = useState(locale);
    const [lastReloadKey, setLastReloadKey] = useState(reloadKey);

    useEffect(() => {
        if (reloadKey !== undefined && reloadKey !== lastReloadKey) {
            setLanguage(locale);
            setLastReloadKey(reloadKey);
        }
    }, [reloadKey, lastReloadKey, locale]);

    useEffect(() => {
        if (locale !== language && reloadKey === undefined) {
            setLanguage(locale);
        }
    }, [locale, language, reloadKey]);

    const changeLanguage = (lang: string) => {
        setLanguage(lang);
    };

    return (
        <TranslationsContext.Provider
            value={{ translations, language, changeLanguage }}>
            {children}
        </TranslationsContext.Provider>
    );
};

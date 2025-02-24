'use client';

import React, { createContext, ReactNode, useState } from 'react';

interface TranslationsContextProps {
    translations: any;
    language: string;
    changeLanguage: (lang: string) => void;
}

export const TranslationsContext =
    createContext<TranslationsContextProps | null>(null);

interface TranslationsProviderProps {
    translations: any;
    locale: string;
    children: ReactNode;
}

export const TranslationsProvider: React.FC<TranslationsProviderProps> = ({
    translations,
    locale,
    children
}) => {
    const [language, setLanguage] = useState(locale);

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

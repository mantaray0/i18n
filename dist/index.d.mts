import React, { ReactNode } from 'react';

interface TranslationsContextProps {
    translations: any;
    language: string;
    changeLanguage: (lang: string) => void;
}
declare const TranslationsContext: React.Context<TranslationsContextProps | null>;
interface TranslationsProviderProps {
    translations: any;
    locale: string;
    children: ReactNode;
}
declare const TranslationsProvider: React.FC<TranslationsProviderProps>;

declare const getNestedTranslation: (obj: any, path: string) => any;
declare const useTranslation: () => {
    t: (key: string) => any;
    changeLanguage: (lang: string) => void;
};

export { TranslationsContext, type TranslationsContextProps, TranslationsProvider, type TranslationsProviderProps, getNestedTranslation, useTranslation };

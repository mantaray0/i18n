import * as React from 'react';
import React__default, { ReactNode } from 'react';

interface TranslationsContextProps {
    translations: any;
    language: string;
    changeLanguage: (lang: string) => void;
}
declare const TranslationsContext: React__default.Context<TranslationsContextProps | null>;
interface TranslationsProviderProps {
    translations: any;
    locale: string;
    reloadKey?: string | number;
    children: ReactNode;
}
declare const TranslationsProvider: React__default.FC<TranslationsProviderProps>;

declare const getNestedTranslation: (obj: any, path: string) => any;
declare const interpolateVariables: (text: string, variables?: Record<string, any>, parseHtml?: boolean) => string | React.JSX.Element | React.JSX.Element[];
declare const useTranslation: () => {
    t: (key: string, variables?: Record<string, any>, parseHtml?: boolean) => any;
    changeLanguage: (lang: string) => void;
};

export { TranslationsContext, type TranslationsContextProps, TranslationsProvider, type TranslationsProviderProps, getNestedTranslation, interpolateVariables, useTranslation };

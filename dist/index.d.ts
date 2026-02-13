import * as React from 'react';
import React__default, { ReactNode } from 'react';

interface TranslationContextProps {
    translations: any;
    language: string;
    changeLanguage: (lang: string) => void;
}
declare const TranslationContext: React__default.Context<TranslationContextProps | null>;
interface TranslationProviderProps {
    translations: any;
    locale: string;
    reloadKey?: string | number;
    children: ReactNode;
}
declare const TranslationProvider: React__default.FC<TranslationProviderProps>;

declare const getNestedTranslation: (obj: any, path: string) => any;
declare const interpolateVariables: (text: string, variables?: Record<string, any>, parseHtml?: boolean) => string | React.JSX.Element | React.JSX.Element[];
declare const useTranslation: () => {
    t: (key: string, variables?: Record<string, any>, parseHtml?: boolean) => any;
    changeLanguage: (lang: string) => void;
};

export { TranslationContext, TranslationProvider, getNestedTranslation, interpolateVariables, useTranslation };
export type { TranslationContextProps, TranslationProviderProps };

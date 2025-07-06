import { useContext } from 'react';
import { TranslationsContext } from './TranslationsProvider';

export const getNestedTranslation = (obj: any, path: string) => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

export const interpolateVariables = (text: string, variables: Record<string, any> = {}) => {
    if (typeof text !== 'string') {
        return text;
    }

    return text.replace(/\{([^}]+)\}/g, (match, variableName) => {
        if (variables.hasOwnProperty(variableName)) {
            return String(variables[variableName]);
        }
        return match;
    }).replace(/\\\{([^}]+)\\\}/g, (match, variableName) => {
        return `{${variableName}}`;
    });
};

export const useTranslation = () => {
    const context = useContext(TranslationsContext);
    if (!context) {
        throw new Error(
            'useTranslations must be used within a TranslationsProvider'
        );
    }
    const { translations, language } = context;

    return {
        t: (key: string, variables?: Record<string, any>) => {
            const translation = getNestedTranslation(
                translations?.[language],
                key
            );

            if (!translation) {
                return key;
            }

            if (variables && Object.keys(variables).length > 0) {
                return interpolateVariables(translation, variables);
            }

            return translation;
        },
        changeLanguage: context.changeLanguage
    };
};
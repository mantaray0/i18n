import { useContext } from 'react';
import parse from 'html-react-parser';
import { TranslationsContext } from './TranslationsProvider';

export const getNestedTranslation = (obj: any, path: string) => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

export const interpolateVariables = (
    text: string,
    variables: Record<string, any> = {},
    parseHtml: boolean = true
) => {
    if (typeof text !== 'string') {
        return text;
    }

    let processedText = text
        .replace(/\{([^}]+)\}/g, (match, variableName) => {
            if (variables.hasOwnProperty(variableName)) {
                return String(variables[variableName]);
            }
            return match;
        })
        .replace(/\\\{([^}]+)\\\}/g, (match, variableName) => {
            return `{${variableName}}`;
        });

    // Parse HTML if requested
    if (parseHtml && processedText.includes('<')) {
        return parse(processedText);
    }

    return processedText;
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
        t: (key: string, variables?: Record<string, any>, parseHtml: boolean = true) => {
            const translation = getNestedTranslation(
                translations?.[language],
                key
            );

            if (!translation) {
                return key;
            }

            if (variables && Object.keys(variables).length > 0) {
                return interpolateVariables(translation, variables, parseHtml);
            }

            if (parseHtml) {
                return interpolateVariables(translation, {}, parseHtml);
            }

            return translation;
        },
        changeLanguage: context.changeLanguage
    };
};

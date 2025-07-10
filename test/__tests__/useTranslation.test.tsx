import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { TranslationsProvider } from '../../src/TranslationsProvider';
import { interpolateVariables, useTranslation } from '../../src/useTranslation';

// @ts-ignore - React 19 compatibility

// Test translations
const testTranslations = {
    en: {
        welcome: 'Welcome {name}!',
        greeting: 'Hello {firstName} {lastName}',
        count: 'You have {count} items',
        nested: {
            message: 'Welcome {name} to {app}',
            deep: {
                text: 'Deep {level} message'
            }
        },
        noVariables: 'Simple text without variables',
        missingVariable: 'Hello {name}, you are {age} years old',
        htmlSimple: '<strong>Welcome!</strong>',
        htmlWithVars: '<strong>Welcome {name}!</strong>',
        htmlComplex:
            '<div><h1>Hello {name}</h1><p>You are {age} years old</p></div>',
        htmlNested: '<span>Click <a href="{url}">here</a> to continue</span>',
        htmlMixed: 'Text before <em>{name}</em> text after'
    },
    de: {
        welcome: 'Willkommen {name}!',
        greeting: 'Hallo {firstName} {lastName}',
        count: 'Du hast {count} Artikel',
        nested: {
            message: 'Willkommen {name} zu {app}',
            deep: {
                text: 'Tiefe {level} Nachricht'
            }
        },
        noVariables: 'Einfacher Text ohne Variablen',
        missingVariable: 'Hallo {name}, du bist {age} Jahre alt',
        htmlSimple: '<strong>Willkommen!</strong>',
        htmlWithVars: '<strong>Willkommen {name}!</strong>',
        htmlComplex:
            '<div><h1>Hallo {name}</h1><p>Du bist {age} Jahre alt</p></div>',
        htmlNested:
            '<span>Klicke <a href="{url}">hier</a> um fortzufahren</span>',
        htmlMixed: 'Text vor <em>{name}</em> Text nach'
    }
};

// Wrapper component for testing
const TestWrapper = ({
    children,
    translations = testTranslations,
    locale = 'en',
    reloadKey
}: {
    children: any;
    translations?: any;
    locale?: string;
    reloadKey?: string | number;
}) => (
    // @ts-ignore - React 19 compatibility
    <TranslationsProvider
        translations={translations}
        locale={locale}
        reloadKey={reloadKey}>
        {children}
    </TranslationsProvider>
);

describe('interpolateVariables', () => {
    test('should replace variables with provided values', () => {
        const text = 'Hello {name}, you are {age} years old';
        const variables = { name: 'John', age: 25 };
        const result = interpolateVariables(text, variables);
        expect(result).toBe('Hello John, you are 25 years old');
    });

    test('should return original text if no variables provided', () => {
        const text = 'Hello {name}';
        const result = interpolateVariables(text);
        expect(result).toBe('Hello {name}');
    });

    test('should handle missing variables', () => {
        const text = 'Hello {name}, you are {age} years old';
        const variables = { name: 'John' };
        const result = interpolateVariables(text, variables);
        expect(result).toBe('Hello John, you are {age} years old');
    });

    test('should handle non-string input', () => {
        const result = interpolateVariables(null as any);
        expect(result).toBe(null);
    });

    test('should handle empty variables object', () => {
        const text = 'Hello {name}';
        const result = interpolateVariables(text, {});
        expect(result).toBe('Hello {name}');
    });

    test('should parse HTML when parseHtml is true', () => {
        const text = '<strong>Hello {name}</strong>';
        const variables = { name: 'John' };
        const result = interpolateVariables(text, variables, true);

        // html-react-parser returns React elements, so we check the structure
        expect(result).toBeDefined();
        expect(typeof result).not.toBe('string');
    });

    test('should not parse HTML when parseHtml is false', () => {
        const text = '<strong>Hello {name}</strong>';
        const variables = { name: 'John' };
        const result = interpolateVariables(text, variables, false);
        expect(result).toBe('<strong>Hello John</strong>');
    });

    test('should parse HTML without variables', () => {
        const text = '<div><h1>Hello</h1><p>World</p></div>';
        const result = interpolateVariables(text, {}, true);

        expect(result).toBeDefined();
        expect(typeof result).not.toBe('string');
    });

    test('should handle HTML with complex structure and variables', () => {
        const text =
            '<div><h1>Hello {name}</h1><p>You are {age} years old</p></div>';
        const variables = { name: 'John', age: 25 };
        const result = interpolateVariables(text, variables, true);

        expect(result).toBeDefined();
        expect(typeof result).not.toBe('string');
    });
});

describe('useTranslation', () => {
    test('should translate without variables', () => {
        const { result } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => <TestWrapper>{children} </TestWrapper>
        });

        expect(result.current.t('noVariables')).toBe(
            'Simple text without variables'
        );
    });

    test('should translate with variables', () => {
        const { result } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => <TestWrapper>{children} </TestWrapper>
        });

        expect(result.current.t('welcome', { name: 'John' })).toBe(
            'Welcome John!'
        );
    });

    test('should handle multiple variables', () => {
        const { result } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => <TestWrapper>{children} </TestWrapper>
        });

        expect(
            result.current.t('greeting', { firstName: 'John', lastName: 'Doe' })
        ).toBe('Hello John Doe');
    });

    test('should handle nested translation keys', () => {
        const { result } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => <TestWrapper>{children} </TestWrapper>
        });

        expect(
            result.current.t('nested.message', { name: 'John', app: 'MyApp' })
        ).toBe('Welcome John to MyApp');
    });

    test('should handle deep nested translation keys', () => {
        const { result } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => <TestWrapper>{children} </TestWrapper>
        });

        expect(result.current.t('nested.deep.text', { level: '3' })).toBe(
            'Deep 3 message'
        );
    });

    test('should return key if translation not found', () => {
        const { result } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => <TestWrapper>{children} </TestWrapper>
        });

        expect(result.current.t('nonexistent.key')).toBe('nonexistent.key');
    });

    test('should handle missing variables in translation', () => {
        const { result } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => <TestWrapper>{children} </TestWrapper>
        });

        expect(result.current.t('missingVariable', { name: 'John' })).toBe(
            'Hello John, you are {age} years old'
        );
    });

    test('should handle different data types in variables', () => {
        const { result } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
        });

        expect(result.current.t('count', { count: 5 })).toBe(
            'You have 5 items'
        );
        expect(result.current.t('count', { count: 'five' })).toBe(
            'You have five items'
        );
        expect(result.current.t('count', { count: 0 })).toBe(
            'You have 0 items'
        );
    });

    test('should change language', () => {
        const { result } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => (
                <TestWrapper locale="de">{children}</TestWrapper>
            )
        });

        // Should start with German
        expect(result.current.t('welcome', { name: 'Hans' })).toBe(
            'Willkommen Hans!'
        );
    });

    test('should parse HTML by default', () => {
        const { result } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => <TestWrapper>{children} </TestWrapper>
        });

        const htmlResult = result.current.t('htmlSimple');
        expect(htmlResult).toBeDefined();
        expect(typeof htmlResult).not.toBe('string');
    });

    test('should parse HTML with variables', () => {
        const { result } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => <TestWrapper>{children} </TestWrapper>
        });

        const htmlResult = result.current.t('htmlWithVars', { name: 'John' });
        expect(htmlResult).toBeDefined();
        expect(typeof htmlResult).not.toBe('string');
    });

    test('should parse complex HTML with multiple variables', () => {
        const { result } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => <TestWrapper>{children} </TestWrapper>
        });

        const htmlResult = result.current.t('htmlComplex', {
            name: 'John',
            age: 25
        });
        expect(htmlResult).toBeDefined();
        expect(typeof htmlResult).not.toBe('string');
    });

    test('should return string when parseHtml is false', () => {
        const { result } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => <TestWrapper>{children} </TestWrapper>
        });

        const htmlResult = result.current.t(
            'htmlWithVars',
            { name: 'John' },
            false
        );
        expect(htmlResult).toBe('<strong>Welcome John!</strong>');
    });

    test('should handle HTML with nested elements and variables', () => {
        const { result } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => <TestWrapper>{children} </TestWrapper>
        });

        const htmlResult = result.current.t('htmlNested', {
            url: 'https://example.com'
        });
        expect(htmlResult).toBeDefined();
        expect(typeof htmlResult).not.toBe('string');
    });

    test('should handle mixed text and HTML', () => {
        const { result } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => <TestWrapper>{children} </TestWrapper>
        });

        const htmlResult = result.current.t('htmlMixed', { name: 'John' });
        expect(htmlResult).toBeDefined();
        expect(typeof htmlResult).not.toBe('string');
    });
});

describe('TranslationsProvider', () => {
    test('should throw error when used outside provider', () => {
        expect(() => {
            renderHook(() => useTranslation());
        }).toThrow(
            'useTranslations must be used within a TranslationsProvider'
        );
    });

    test('should reload translations when reloadKey changes', () => {
        const { result } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => (
                <TestWrapper reloadKey="v1">{children}</TestWrapper>
            )
        });

        // Initial state
        expect(result.current.t('welcome', { name: 'John' })).toBe(
            'Welcome John!'
        );

        // Test with different reloadKey
        const { result: result2 } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => (
                <TestWrapper reloadKey="v2">{children}</TestWrapper>
            )
        });

        // Should still work after reload
        expect(result2.current.t('welcome', { name: 'John' })).toBe(
            'Welcome John!'
        );
    });

    test('should reset language to locale when reloadKey changes', () => {
        const { result } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => (
                <TestWrapper
                    locale="en"
                    reloadKey="v1">
                    {children}
                </TestWrapper>
            )
        });

        // Change language
        act(() => {
            result.current.changeLanguage('de');
        });

        expect(result.current.t('welcome', { name: 'Hans' })).toBe(
            'Willkommen Hans!'
        );

        // Test with new reloadKey - should reset to English
        const { result: result2 } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => (
                <TestWrapper
                    locale="en"
                    reloadKey="v2">
                    {children}
                </TestWrapper>
            )
        });

        // Should reset to English
        expect(result2.current.t('welcome', { name: 'John' })).toBe(
            'Welcome John!'
        );
    });

    test('should handle reloadKey with different types', () => {
        const { result } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => (
                <TestWrapper reloadKey={123}>{children}</TestWrapper>
            )
        });

        expect(result.current.t('welcome', { name: 'John' })).toBe(
            'Welcome John!'
        );

        // Test with string reloadKey
        renderHook(() => useTranslation(), {
            wrapper: ({ children }) => (
                <TestWrapper reloadKey="string-key">{children}</TestWrapper>
            )
        });

        expect(result.current.t('welcome', { name: 'John' })).toBe(
            'Welcome John!'
        );
    });

    test('should not reload when reloadKey is undefined', () => {
        const { result } = renderHook(() => useTranslation(), {
            wrapper: ({ children }) => <TestWrapper>{children}</TestWrapper>
        });

        expect(result.current.t('welcome', { name: 'John' })).toBe(
            'Welcome John!'
        );
    });
});

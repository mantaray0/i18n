# Beluga i18n

A lightweight and flexible internationalization package for NextJS apps and the Beluga stack. This package provides a simple yet powerful way to handle translations in your React applications.

## Features

- 🚀 **Lightweight**: Minimal bundle size with zero runtime dependencies
- 🔧 **Flexible**: Support for nested translation keys and variable interpolation
- 🎨 **HTML Support**: Optional HTML parsing for rich text translations
- ⚡ **Type Safe**: Full TypeScript support
- 🔄 **Dynamic Language Switching**: Change languages at runtime
- 🎯 **NextJS Ready**: Optimized for NextJS applications

## Installation

```bash
npm install beluga-i18n
# or
yarn add beluga-i18n
# or
pnpm add beluga-i18n
```

## Quick Start

### 1. Setup the TranslationsProvider

First, wrap your application with the `TranslationsProvider`:

```tsx
import { TranslationsProvider } from 'beluga-i18n';

const translations = {
    en: {
        welcome: 'Welcome to our app!',
        greeting: 'Hello, {name}!',
        description: 'This is a <strong>great</strong> app.',
        nested: {
            key: 'This is a nested translation'
        }
    },
    de: {
        welcome: 'Willkommen in unserer App!',
        greeting: 'Hallo, {name}!',
        description: 'Das ist eine <strong>tolle</strong> App.',
        nested: {
            key: 'Das ist eine verschachtelte Übersetzung'
        }
    }
};

function App() {
    return (
        <TranslationsProvider
            translations={translations}
            locale="en">
            <YourApp />
        </TranslationsProvider>
    );
}
```

### 2. Use the useTranslation Hook

Now you can use the `useTranslation` hook in any component within the provider:

```tsx
import { useTranslation } from 'beluga-i18n';

function WelcomeComponent() {
    const { t, changeLanguage } = useTranslation();

    return (
        <div>
            <h1>{t('welcome')}</h1>
            <p>{t('greeting', { name: 'John' })}</p>
            <div>{t('description')}</div>
            <p>{t('nested.key')}</p>

            <button onClick={() => changeLanguage('de')}>
                Switch to German
            </button>
        </div>
    );
}
```

## API Reference

### TranslationsProvider

The main provider component that wraps your application and provides translation context.

#### Props

| Prop           | Type                  | Required | Description                                                |
| -------------- | --------------------- | -------- | ---------------------------------------------------------- |
| `translations` | `Record<string, any>` | ✅       | Object containing translations for all supported languages |
| `locale`       | `string`              | ✅       | Initial language code (e.g., 'en', 'de', 'fr')             |
| `reloadKey`    | `string \| number`    | ❌       | Optional key to force reload translations                  |
| `children`     | `ReactNode`           | ✅       | Your application components                                |

#### Example

```tsx
<TranslationsProvider
    translations={translations}
    locale="en"
    reloadKey={reloadKey} // Optional
>
    {children}
</TranslationsProvider>
```

### useTranslation Hook

Returns translation functions and language utilities.

#### Returns

| Property         | Type                                                                         | Description                             |
| ---------------- | ---------------------------------------------------------------------------- | --------------------------------------- |
| `t`              | `(key: string, variables?: Record<string, any>, parseHtml?: boolean) => any` | Translation function                    |
| `changeLanguage` | `(lang: string) => void`                                                     | Function to change the current language |

#### Translation Function Parameters

| Parameter   | Type                  | Default | Description                                              |
| ----------- | --------------------- | ------- | -------------------------------------------------------- |
| `key`       | `string`              | -       | Translation key (supports nested keys with dot notation) |
| `variables` | `Record<string, any>` | `{}`    | Variables to interpolate into the translation            |
| `parseHtml` | `boolean`             | `true`  | Whether to parse HTML in the translation                 |

## Advanced Usage

### Nested Translation Keys

You can organize your translations in nested objects and access them using dot notation:

```tsx
const translations = {
    en: {
        common: {
            buttons: {
                save: 'Save',
                cancel: 'Cancel',
                delete: 'Delete'
            },
            messages: {
                success: 'Operation completed successfully',
                error: 'An error occurred'
            }
        }
    }
};

// Usage
const { t } = useTranslation();
t('common.buttons.save'); // "Save"
t('common.messages.success'); // "Operation completed successfully"
```

### Variable Interpolation

You can include variables in your translations using curly braces:

```tsx
const translations = {
    en: {
        greeting: 'Hello, {name}!',
        items: 'You have {count} items in your cart',
        welcome: 'Welcome back, {firstName} {lastName}!'
    }
};

// Usage
const { t } = useTranslation();
t('greeting', { name: 'John' }); // "Hello, John!"
t('items', { count: 5 }); // "You have 5 items in your cart"
t('welcome', { firstName: 'John', lastName: 'Doe' }); // "Welcome back, John Doe!"
```

### HTML Parsing

By default, HTML in translations is automatically parsed. You can disable this behavior:

```tsx
const translations = {
    en: {
        description:
            'This is a <strong>bold</strong> text with <em>emphasis</em>.',
        link: 'Click <a href="/help">here</a> for help.'
    }
};

// Usage
const { t } = useTranslation();
t('description'); // Renders as HTML: This is a <strong>bold</strong> text with <em>emphasis</em>.
t('description', {}, false); // Returns raw string: "This is a <strong>bold</strong> text with <em>emphasis</em>."
```

### Dynamic Language Switching

You can change the language at runtime:

```tsx
function LanguageSwitcher() {
    const { changeLanguage } = useTranslation();

    return (
        <div>
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('de')}>Deutsch</button>
            <button onClick={() => changeLanguage('fr')}>Français</button>
        </div>
    );
}
```

### Controlled Reloading

Use the `reloadKey` prop to force a reload of translations:

```tsx
function App() {
    const [reloadKey, setReloadKey] = useState(0);

    const handleReloadTranslations = () => {
        setReloadKey((prev) => prev + 1);
    };

    return (
        <TranslationsProvider
            translations={translations}
            locale="en"
            reloadKey={reloadKey}>
            <YourApp />
            <button onClick={handleReloadTranslations}>
                Reload Translations
            </button>
        </TranslationsProvider>
    );
}
```

## NextJS Integration

### App Router (App Directory)

For NextJS 13+ with the app directory:

```tsx
// app/layout.tsx
import { TranslationsProvider } from 'beluga-i18n';

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <TranslationsProvider
                    translations={translations}
                    locale="en">
                    {children}
                </TranslationsProvider>
            </body>
        </html>
    );
}
```

### Pages Router

For traditional NextJS pages:

```tsx
// pages/_app.tsx
import { TranslationsProvider } from 'beluga-i18n';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <TranslationsProvider
            translations={translations}
            locale="en">
            <Component {...pageProps} />
        </TranslationsProvider>
    );
}
```

## TypeScript Support

The package includes full TypeScript support. You can type your translations for better development experience:

```tsx
interface Translations {
    en: {
        welcome: string;
        greeting: string;
        nested: {
            key: string;
        };
    };
    de: {
        welcome: string;
        greeting: string;
        nested: {
            key: string;
        };
    };
}

const translations: Translations = {
    en: {
        welcome: 'Welcome!',
        greeting: 'Hello, {name}!',
        nested: {
            key: 'Nested translation'
        }
    },
    de: {
        welcome: 'Willkommen!',
        greeting: 'Hallo, {name}!',
        nested: {
            key: 'Verschachtelte Übersetzung'
        }
    }
};
```

## Best Practices

### 1. Organize Your Translations

Keep your translations well-organized and use consistent naming conventions:

```tsx
const translations = {
    en: {
        common: {
            buttons: {
                /* button texts */
            },
            messages: {
                /* status messages */
            },
            errors: {
                /* error messages */
            }
        },
        pages: {
            home: {
                /* home page texts */
            },
            about: {
                /* about page texts */
            }
        }
    }
};
```

### 2. Use Meaningful Keys

Choose descriptive and consistent translation keys:

```tsx
// Good
t('common.buttons.save');
t('pages.home.welcome.title');

// Avoid
t('btn1');
t('text1');
```

### 3. Missing Translation Handling

The hook automatically handles missing translations by:

- Returning `[key]` as a fallback when a translation is missing
- Logging a warning in development (localhost) to help identify missing translations
- Providing clear visual feedback in the UI

```tsx
const { t } = useTranslation();

// If 'welcome.message' is missing, it will return '[welcome.message]'
// and log a warning in development
t('welcome.message'); // Returns '[welcome.message]' if missing
```

### 4. Performance Considerations

- Keep your translation objects as small as possible
- Consider code-splitting translations by route or feature
- Use the `reloadKey` prop sparingly

## Contributing

We welcome contributions! Please see our [contributing guidelines](CONTRIBUTING.md) for more details.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/beluga-labs/beluga-i18n/issues) on GitHub.

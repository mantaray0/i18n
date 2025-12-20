# @beluga-labs/i18n

Internationalization support for React applications with translation management. Works with any React framework including Next.js, Remix, Gatsby, Vite, Create React App, and any other React-based application.

## Features

- **Lightweight**: Minimal bundle size with zero runtime dependencies
- **Flexible**: Support for nested translation keys and variable interpolation
- **HTML Support**: Optional HTML parsing for rich text translations
- **Type Safe**: Full TypeScript support
- **Dynamic Language Switching**: Change languages at runtime
- **Simple API**: Clean and intuitive translation hook

## Installation

```bash
npm install @beluga-labs/i18n
# or
pnpm add @beluga-labs/i18n
# or
yarn add @beluga-labs/i18n
```

## What is this package?

When building React applications, you often need to support multiple languages. This package provides a simple and flexible way to manage translations with support for:

- Nested translation keys
- Variable interpolation
- HTML parsing
- Dynamic language switching
- TypeScript support

## Usage

### Basic Setup

Wrap your application with the `TranslationProvider`:

```tsx
import { TranslationProvider, useTranslation } from '@beluga-labs/i18n';

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
    <TranslationProvider
      translations={translations}
      locale="en">
      <YourApp />
    </TranslationProvider>
  );
}
```

### Using Translations

Use the `useTranslation` hook in any component:

```tsx
import { useTranslation } from '@beluga-labs/i18n';

function WelcomeComponent() {
  const { t, changeLanguage } = useTranslation();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('greeting', { name: 'John' })}</p>
      <div>{t('description')}</div>
      <p>{t('nested.key')}</p>

      <button onClick={() => changeLanguage('de')}>Switch to German</button>
    </div>
  );
}
```

## API Reference

### TranslationProvider

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
<TranslationProvider
  translations={translations}
  locale="en"
  reloadKey={reloadKey} // Optional
>
  {children}
</TranslationProvider>
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
    description: 'This is a <strong>bold</strong> text with <em>emphasis</em>.',
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
    <TranslationProvider
      translations={translations}
      locale="en"
      reloadKey={reloadKey}>
      <YourApp />
      <button onClick={handleReloadTranslations}>Reload Translations</button>
    </TranslationProvider>
  );
}
```

## Framework Integration

This package works with any React framework. Here are examples for popular frameworks:

### Next.js

#### App Router (Next.js 13+)

For Next.js 13+ with the app directory:

```tsx
// app/layout.tsx
'use client';

import { TranslationProvider } from '@beluga-labs/i18n';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TranslationProvider
          translations={translations}
          locale="en">
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
```

#### Pages Router

For traditional Next.js pages:

```tsx
// pages/_app.tsx
import { TranslationProvider } from '@beluga-labs/i18n';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TranslationProvider
      translations={translations}
      locale="en">
      <Component {...pageProps} />
    </TranslationProvider>
  );
}
```

### Remix

```tsx
// app/root.tsx
import { TranslationProvider } from '@beluga-labs/i18n';

export default function App() {
  return (
    <html>
      <body>
        <TranslationProvider
          translations={translations}
          locale="en">
          <Outlet />
        </TranslationProvider>
      </body>
    </html>
  );
}
```

### Vite / Create React App

```tsx
// src/main.tsx or src/index.tsx
import { TranslationProvider } from '@beluga-labs/i18n';
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TranslationProvider
      translations={translations}
      locale="en">
      <App />
    </TranslationProvider>
  </React.StrictMode>
);
```

### Gatsby

```tsx
// gatsby-browser.js or gatsby-ssr.js
import { TranslationProvider } from '@beluga-labs/i18n';
import React from 'react';

export const wrapRootElement = ({ element }) => (
  <TranslationProvider
    translations={translations}
    locale="en">
    {element}
  </TranslationProvider>
);
```

### Any React Application

Since this package is framework-agnostic, you can use it anywhere React components are used:

```tsx
import { TranslationProvider } from '@beluga-labs/i18n';

function App() {
  return (
    <TranslationProvider
      translations={translations}
      locale="en">
      <YourApp />
    </TranslationProvider>
  );
}
```

## TypeScript Support

Full TypeScript support is included. You can type your translations for better development experience:

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

## Migration Guide

### Migrating from 1.0.1 to 2.0.0

Version 2.0.0 introduces several breaking changes. Follow this guide to update your code:

#### 1. Package Name Change

The package has been renamed from `beluga-i18n` to `@beluga-labs/i18n`.

**Before:**

```bash
npm install beluga-i18n
```

**After:**

```bash
npm install @beluga-labs/i18n
```

**Update imports:**

```tsx
// Before
import { TranslationsProvider, useTranslation } from 'beluga-i18n';

// After
import { TranslationProvider, useTranslation } from '@beluga-labs/i18n';
```

#### 2. Component Rename

The main provider component has been renamed from `TranslationsProvider` (plural) to `TranslationProvider` (singular).

**Before:**

```tsx
import { TranslationsProvider } from 'beluga-i18n';

<TranslationsProvider
  translations={translations}
  locale="en">
  {children}
</TranslationsProvider>;
```

**After:**

```tsx
import { TranslationProvider } from '@beluga-labs/i18n';

<TranslationProvider
  translations={translations}
  locale="en">
  {children}
</TranslationProvider>;
```

#### 3. Context and Type Names

All related types and context names have been updated to use singular form:

- `TranslationsContext` → `TranslationContext`
- `TranslationsContextProps` → `TranslationContextProps`
- `TranslationsProviderProps` → `TranslationProviderProps`

If you were using these types directly, update your imports:

```tsx
// Before
import { TranslationsContext, TranslationsProviderProps } from 'beluga-i18n';

// After
import {
  TranslationContext,
  TranslationProviderProps
} from '@beluga-labs/i18n';
```

#### Summary of Changes

| Item               | Before (1.0.1)         | After (2.0.0)         |
| ------------------ | ---------------------- | --------------------- |
| Package name       | `beluga-i18n`          | `@beluga-labs/i18n`   |
| Provider component | `TranslationsProvider` | `TranslationProvider` |
| Context            | `TranslationsContext`  | `TranslationContext`  |
| Build system       | `tsup`                 | `rollup`              |

#### Migration Checklist

- [ ] Update package name in `package.json`
- [ ] Update all imports from `beluga-i18n` to `@beluga-labs/i18n`
- [ ] Rename `TranslationsProvider` to `TranslationProvider` in all files
- [ ] Update any direct usage of context or types
- [ ] Test your application thoroughly

## Contributing

We welcome contributions! Please see our [contributing guidelines](CONTRIBUTING.md) for more details.

## License

MIT License - see [LICENSE](LICENSE) file for details.

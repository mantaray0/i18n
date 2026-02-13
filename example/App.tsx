import { useState } from 'react';
import { TranslationProvider, useTranslation } from '../src';

// Sample translations
const translations = {
  en: {
    welcome: 'Welcome {name}!',
    greeting: 'Hello {firstName} {lastName}',
    description: 'This is a demo of the @mantaray0/i18n translation system.',
    features: {
      title: 'Features',
      variable: 'Variable interpolation: {count} items',
      nested: 'Nested keys work perfectly',
      html: 'HTML parsing: <strong>Bold text</strong> and <em>italic text</em>',
      htmlWithVars: 'HTML with variables: <strong>Hello {name}!</strong>'
    },
    actions: {
      changeLanguage: 'Change Language',
      currentLanguage: 'Current Language: {lang}'
    }
  },
  de: {
    welcome: 'Willkommen {name}!',
    greeting: 'Hallo {firstName} {lastName}',
    description:
      'Dies ist eine Demo des @mantaray0/i18n Übersetzungssystems.',
    features: {
      title: 'Funktionen',
      variable: 'Variablen-Interpolation: {count} Artikel',
      nested: 'Verschachtelte Schlüssel funktionieren perfekt',
      html: 'HTML-Parsing: <strong>Fetter Text</strong> und <em>kursiver Text</em>',
      htmlWithVars: 'HTML mit Variablen: <strong>Hallo {name}!</strong>'
    },
    actions: {
      changeLanguage: 'Sprache ändern',
      currentLanguage: 'Aktuelle Sprache: {lang}'
    }
  }
};

// Demo component that uses translations
const DemoContent = () => {
  const { t, changeLanguage } = useTranslation();
  const [currentLang, setCurrentLang] = useState('en');

  const handleLanguageChange = () => {
    const newLang = currentLang === 'en' ? 'de' : 'en';
    setCurrentLang(newLang);
    changeLanguage(newLang);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="header__title">@mantaray0/i18n Example</h1>
        <span className="header__package">@mantaray0/i18n</span>
      </header>

      <section className="section">
        <h2 className="section__title">Basic Translation</h2>
        <p className="section__label">Simple text without variables</p>
        <div className="demo-item">
          <div className="demo-item__label">Description</div>
          <div className="demo-item__content">{t('description')}</div>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">Variable Interpolation</h2>
        <p className="section__label">Translations with dynamic variables</p>
        <div className="demo-item">
          <div className="demo-item__label">Welcome Message</div>
          <div className="demo-item__content">
            {t('welcome', { name: 'John' })}
          </div>
        </div>
        <div className="demo-item">
          <div className="demo-item__label">Greeting</div>
          <div className="demo-item__content">
            {t('greeting', { firstName: 'Jane', lastName: 'Doe' })}
          </div>
        </div>
        <div className="demo-item">
          <div className="demo-item__label">Count</div>
          <div className="demo-item__content">
            {t('features.variable', { count: 42 })}
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">Nested Keys</h2>
        <p className="section__label">
          Access nested translation keys with dot notation
        </p>
        <div className="demo-item">
          <div className="demo-item__label">Nested Title</div>
          <div className="demo-item__content">{t('features.title')}</div>
        </div>
        <div className="demo-item">
          <div className="demo-item__label">Nested Message</div>
          <div className="demo-item__content">{t('features.nested')}</div>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">HTML Parsing</h2>
        <p className="section__label">
          Parse HTML in translations (default behavior)
        </p>
        <div className="demo-item">
          <div className="demo-item__label">HTML Content</div>
          <div className="demo-item__content">{t('features.html')}</div>
        </div>
        <div className="demo-item">
          <div className="demo-item__label">HTML with Variables</div>
          <div className="demo-item__content">
            {t('features.htmlWithVars', { name: 'World' })}
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">Language Switching</h2>
        <p className="section__label">Change language dynamically</p>
        <div className="demo-item">
          <div className="demo-item__label">Current Language</div>
          <div className="demo-item__content">
            {t('actions.currentLanguage', { lang: currentLang.toUpperCase() })}
          </div>
        </div>
        <div className="btn-group">
          <button
            className="btn btn--primary"
            onClick={handleLanguageChange}>
            {t('actions.changeLanguage')} ({currentLang === 'en' ? 'DE' : 'EN'})
          </button>
        </div>
      </section>
    </div>
  );
};

// Main App component
function App() {
  return (
    <TranslationProvider
      translations={translations}
      locale="en">
      <DemoContent />
    </TranslationProvider>
  );
}

export default App;

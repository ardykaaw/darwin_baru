import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Locale, TranslationKey } from './translations';
import { translations } from './translations';

const STORAGE_KEY = 'dc-locale';

interface LanguageContextValue {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
    locale: 'id',
    setLocale: () => {},
    t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    // Always start with 'id' so SSR and initial client hydration match exactly
    const [locale, setLocaleState] = useState<Locale>('id');

    // After hydration completes on client, read stored preference
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored === 'en' || stored === 'id') {
                setLocaleState(stored);
                document.documentElement.lang = stored;
            }
        } catch {
            // ignore localStorage errors
        }
    }, []);

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);
        try {
            localStorage.setItem(STORAGE_KEY, newLocale);
        } catch {
            // ignore
        }
        document.documentElement.lang = newLocale;
    }, []);

    const t = useCallback(
        (key: TranslationKey): string => {
            return translations[locale][key] ?? translations.id[key] ?? key;
        },
        [locale],
    );

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useTranslation() {
    return useContext(LanguageContext);
}

export { type Locale, type TranslationKey };

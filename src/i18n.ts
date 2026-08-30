import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next'

void i18n
    .use(initReactI18next)
    .use(
        resourcesToBackend(
            async (language: string, namespace: string): Promise<Record<string, unknown>> =>
                (await import(`./locales/${language}/${namespace}.json`)) as Record<string, unknown>
        )
    )
    .use(LanguageDetector)
    .init({
        ns: ['common'],
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
        defaultNS: 'common',
        fallbackLng: 'de',
        detection: {
            lookupLocalStorage: 'language',
        },
    })

export default i18n

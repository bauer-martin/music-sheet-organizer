import { defineConfig } from 'i18next-cli'

import { supportedLanguageCodes } from './src/supportedLanguageCodes'

export default defineConfig({
    locales: supportedLanguageCodes as unknown as string[],
    extract: {
        input: 'src/**/*.{ts,tsx}',
        output: 'src/locales/{{language}}/{{namespace}}.json',
        defaultNS: 'common',
        primaryLanguage: 'de',
        secondaryLanguages: supportedLanguageCodes.filter(l => l !== 'de') as unknown as string[],
    },
})

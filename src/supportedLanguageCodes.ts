export const supportedLanguageCodes = ['de'] as const
export type SupportedLanguageCode = (typeof supportedLanguageCodes)[number]

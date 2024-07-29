interface I18nConfig {
  defaultLocale: 'en'
  locales: ('en' | 'ar')[]
}

export const i18n: I18nConfig = {
  defaultLocale: 'en',
  locales: ['en', 'ar']
}

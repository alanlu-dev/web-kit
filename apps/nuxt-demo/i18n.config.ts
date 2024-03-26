import en from './locales/en.json'
import zh from './locales/zh.json'

// https://vue-i18n.intlify.dev/api/general.html#createi18n
// You can use `defineI18nConfig` to get type inferences for options to pass to vue-i18n.
export default defineI18nConfig(() => ({
  legacy: false, // for composition API, you must specify 'legacy: false' option
  locale: 'zh',
  messages: {
    en,
    zh,
  },
}))

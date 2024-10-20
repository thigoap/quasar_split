import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import { LocalStorage } from 'quasar'
import messages from 'src/i18n'

const savedLocale = LocalStorage.getItem('locale') || 'en-US'
// console.log('boot language', savedLocale)

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: savedLocale,
    fallbackLocale: 'en-US', // Fallback locale
    globalInjection: true,
    messages
  })

  // Set i18n instance on app
  app.use(i18n)
})

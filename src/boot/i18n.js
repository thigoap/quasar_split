import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import { LocalStorage, Lang } from 'quasar'
import messages from 'src/i18n'

let savedLocale = ''
if (Lang.getLocale() == 'en-US' || Lang.getLocale() == 'pt-BR') {
  savedLocale = LocalStorage.getItem('locale') || Lang.getLocale()
} else {
  savedLocale = LocalStorage.getItem('locale') || 'en-US' 
}

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

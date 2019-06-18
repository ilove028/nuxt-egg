export const state = () => ({
  locales: ['en', 'zh-CN'],
  locale: 'en'
})

export const mutations = {
  setLang(state, locale) {
    if (state.locales.indexOf(locale) > -1) {
      state.locale = locale
    }
  }
}

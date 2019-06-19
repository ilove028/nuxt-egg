export const state = () => ({
  locales: ['en', 'zh-CN'],
  locale: 'en',
  user: null
})

export const mutations = {
  setLang(state, locale) {
    if (state.locales.indexOf(locale) > -1) {
      state.locale = locale
    }
  },
  setUser(state, payload) {
    state.user = payload
  }
}

export const actions = {
  // 只会在服务器端运行，如果用这个表明用户登录状态则会出现登录状态不一致
  async nuxtServerInit({ commit }, { req }) {
    await new Promise(resolve => {
      setTimeout(() => {
        if (req) {
          commit('setUser', { token: +new Date() })
        }
        resolve()
      }, 100)
    })
  }
}

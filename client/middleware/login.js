export default ({ app, req, redirect, store }) => {
  new Promise((resolve, reject) => {
    // 此处应该有一个统一的服务来运行在Client Server检测登录状态
    // if (process.server && req) {
    //   reject(new Error())
    // } else {
    // }
    if (store.state.user) {
      // 此处需要使用服务来检测user是否过期
      const { token } = store.state.user
      // 模拟一分钟超时
      if (+new Date() - token < 60 * 1000) {
        resolve()
      } else {
        reject(new Error('Login expire'))
      }
    } else {
      reject(new Error('Need Login'))
    }
    // if (store.state.user) {
    //   resolve()
    // } else {
    //   reject(new Error('401'))
    // }
  }).then(
    () => {},
    () => {
      redirect(app.i18n.path('login'))
    }
  )
}

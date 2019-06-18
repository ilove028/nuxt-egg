module.exports = {
  logger: {
    level: 'DEBUG'
  },
  middleware: ['compress', 'helmet', 'nuxt'], // Proxy 现在在coremiddleware之前。https://github.com/nodejitsu/node-http-proxy/issues/168
  proxies: {
    '/api/v1': {
      target: 'https://cnodejs.org',
      secure: false,
      changeOrigin: true
    }
  }
}

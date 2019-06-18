module.exports = app => {
  if (app.config.env === 'local') {
    app.config.coreMiddleware.unshift('proxies')
  }
}

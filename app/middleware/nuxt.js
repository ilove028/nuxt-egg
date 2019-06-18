const { Nuxt, Builder } = require('nuxt')
const config = require('../../nuxt.config')

module.exports = (options, app) => {
  const isDev = app.config.env === 'local'
  config.dev = isDev
  const nuxt = new Nuxt(config)

  if (isDev) {
    new Builder(nuxt).build()
  }

  return async function(ctx, next) {
    const stack = app.router.stack
    if (stack.some(router => router.regexp.test(ctx.path))) {
      const result = await next()
      return result
    } else {
      ctx.status = 200 // koa defaults to 404 when it sees that status is unset
      return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)
        nuxt.render(ctx.req, ctx.res, promise => {
          promise.then(resolve).catch(reject)
        })
      })
    }
  }
}

const url = require('url')
const HttpProxy = require('http-proxy')
const pathMatch = require('path-match')

const proxy = HttpProxy.createProxyServer()
const route = pathMatch({
  // path-to-regexp options
  sensitive: false,
  strict: false,
  end: false
})

let eventRegistered = false

module.exports = (option, app) => {
  const matchs = Object.keys(option).map(context => ({
    context,
    regexp: route(context)
  }))
  return (ctx, next) => {
    const matched = matchs.find(match => match.regexp(ctx.path))
    if (matched) {
      let contextOption = Object.assign({}, option[matched.context])
      if (typeof contextOption === 'function') {
        const params = matched.regexp(ctx.path)
        contextOption = contextOption.call(contextOption, params)
      }
      const { rewrite, events } = contextOption
      const httpProxyOpts = Object.keys(contextOption)
        .filter(n => ['rewrite', 'events'].indexOf(n) < 0)
        .reduce((prev, cur) => {
          prev[cur] = contextOption[cur]
          return prev
        }, {})

      return new Promise((resolve, reject) => {
        ctx.req.oldPath = ctx.req.url

        if (typeof rewrite === 'function') {
          ctx.req.url = rewrite(ctx.req.url, ctx)
        }

        ctx.logger.debug(
          `${new Date().toISOString()} - ${ctx.req.method} ${
            ctx.req.oldPath
            /* eslint-disable node/no-deprecated-api */
          } proxy to ${url.resolve(contextOption.target, ctx.req.url)}`
        )

        if (events && typeof events === 'object' && !eventRegistered) {
          Object.entries(events).forEach(([event, handler]) => {
            proxy.on(event, handler)
          })
          eventRegistered = true
        }

        ctx.res.on('close', () => {
          reject(
            new Error(`Http response closed while proxying ${ctx.req.oldPath}`)
          )
        })
        ctx.res.on('finish', () => {
          resolve()
        })
        proxy.web(ctx.req, ctx.res, httpProxyOpts, e => {
          const status = {
            ECONNREFUSED: 503,
            ETIMEOUT: 504
          }[e.code]
          ctx.status = status || 500
          resolve()
        })
      })
    } else {
      return next()
    }
  }
}

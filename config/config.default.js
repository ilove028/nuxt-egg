module.exports = {
  keys: 'mx',
  security: {
    csrf: false
  },
  middleware: ['compress', 'helmet', 'nuxt']
}

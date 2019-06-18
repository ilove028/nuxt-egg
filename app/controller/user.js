const { Controller } = require('egg')

module.exports = class UserController extends Controller {
  /* eslint-disable require-await */
  async getById() {
    const { ctx } = this
    ctx.body = {
      name: `hello ${ctx.params.id}`
    }
  }
  async getAll() {
    this.ctx.body = [{ name: 'Mx', age: 29 }, { name: 'Zyx', age: 27 }]
  }
  async query() {
    this.ctx.body = { token: this.ctx.request.body.account }
  }
}

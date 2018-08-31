const UserModel = require('../../mongon/user')

module.exports = {
  async register (ctx, next) {
    let { name, password } = ctx.request.body
    const user = {
      name,
      password
    }
    console.log('user', user)
    const result = await UserModel.create(user)
    if (result) {
      ctx.body = {
        code: 1,
        data: '注册成功'
      }
    }
  },
  async login (ctx, next) {
    let { name, password } = ctx.request.body
    const user = await UserModel.findOne({ name })
    if (user && (password === user.password)) {
      ctx.session.user = {
        _id: user._id,
        name: user.name,
        isAdmin: user.isAdmin
      }
      ctx.body = { success: '登录成功' }
    } else {
      ctx.body = { fail: '用户名或者密码错误' }
    }
  },
  async loginOut (ctx, next) {
    if (ctx.session.user) {
      ctx.session.user = ''
      ctx.body = {
        code: 1,
        title: '操作成功'
      }
    }
  }
}

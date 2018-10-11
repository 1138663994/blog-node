const UserModel = require('../../mongon/user')
const jwt = require('jwt-simple') // token生成 有毒这个，有效期要转化为时间戳为秒的形式。也就是得把时间戳除以1000
const jwtSecret = require('../constant').jwtSecret // 秘钥

const getToken = () => {
  let payload = {
    exp: (Date.now() + 1000 * 60 * 60 * 1) / 1000, // token有效期, 有效期为一个小时
    name: 'lisi'
  }
  let token = jwt.encode(payload, jwtSecret) // 编码token，解码用jwt.decode(token.split(' ')[1], jwtSecret)。传过来的token=Bearer token。
  return token
}

module.exports = {
  async register (ctx, next) {
    let { name, password } = ctx.request.body
    const user = {
      name,
      password
    }
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
      let token = getToken()
      ctx.body = {
        code: '1',
        token
      }
    } else {
      ctx.body = { fail: '用户名或者密码错误' }
    }
  },
  async loginOut (ctx, next) {
    if (ctx.session.user) {
      ctx.session.user = ''
      getToken()
      ctx.body = {
        code: 1,
        title: '操作成功'
      }
    }
  }
}

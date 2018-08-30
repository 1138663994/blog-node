// const UserModel = require('../../mongon/user')

module.exports = {
  async add (ctx, next) {
    let { txtVal } = ctx.request.body
    console.log('txt', txtVal)
    ctx.body = {
      code: 1,
      data: '添加成功'
    }
    // const result = await UserModel.create(user)
    // if (result) {
    //   ctx.body = {
    //     code: 1,
    //     data: '注册成功'
    //   }
    // }
  }
}

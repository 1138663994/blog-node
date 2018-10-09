const MessageModel = require('../../mongon/message')

module.exports = {
  async create (ctx, next) {
    let {fromId, name, content, email} = ctx.request.body
    let message = {
      fromId,
      name,
      content,
      email
    }
    let result = await MessageModel.create(message)
    ctx.body = result
  },

  async detail (ctx, next) {
    let {fromId} = ctx.request.body
    let result = await MessageModel.find({fromId})
    ctx.body = result
  }
}

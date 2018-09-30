const MessageModel = require('../../mongon/message')

module.exports = {
  async create (ctx, next) {
    let {fromId, content, email} = ctx.request.body
    let message = {
      fromId,
      content,
      email
    }
    let result = await MessageModel.create(message)
    ctx.body = result
  }
}

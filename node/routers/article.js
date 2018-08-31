const articleModel = require('../../mongon/article')

module.exports = {
  async add (ctx, next) {
    let { content, title } = ctx.request.body
    let article = {
      authorId: ctx.session.user._id,
      author: ctx.session.user.name,
      title,
      content
    }
    const result = await articleModel.create(article)
    if (result) {
      ctx.body = result
    }
  },
  async list (ctx, next) {
    const result = await articleModel.find({})
    ctx.body = result
  },
  async remove (ctx, next) {
    let {id} = ctx.request.body
    console.log('id', id)
    const result = await articleModel.findByIdAndRemove(id)
    ctx.body = result
  },
  async edit (ctx, next) {
    let {id, title, content} = ctx.request.body
    const result = await articleModel.findByIdAndUpdate(id, {
      title,
      content
    })
    ctx.body = result
  }
}

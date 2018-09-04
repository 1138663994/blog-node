const articleCategoryModel = require('../../mongon/articleCategory')

module.exports = {
  async add (ctx, next) {
    let { name } = ctx.request.body
    let category = {
      name
    }
    const result = await articleCategoryModel.create(category)
    if (result) {
      ctx.body = result
    }
  },
  async list (ctx, next) {
    const result = await articleCategoryModel.find({})
    if (result) {
      ctx.body = result
    }
  }
}

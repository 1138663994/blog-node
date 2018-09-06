const articleModel = require('../../mongon/article')
const categoryModel = require('../../mongon/articleCategory')
const constants = require('../constant')
module.exports = {
  async add (ctx, next) {
    let { content, title, category, isOpen } = ctx.request.body
    let article = {
      authorId: ctx.session.user._id,
      author: ctx.session.user.name,
      title,
      content,
      category,
      isOpen
    }
    const cateogry = await categoryModel.findById(category)
    if (!cateogry) {
      ctx.throw(404, '该分类不存在')
      return
    }
    const result = await articleModel.create(article)
    if (result) {
      ctx.body = result
    }
  },
  async list (ctx, next) {
    let {order, title} = ctx.request.body
    let result
    let norder
    if (order === 'desc') {
      norder = -1
    } else {
      norder = 1
    }
    let obj = {}
    if (title) {
      obj = Object.assign(obj, {
        title: new RegExp(title, 'i')
      })
    }
    result = await articleModel.find(obj, null, {sort: {'_id': norder}}).populate({path: 'category', select: 'name'})
    let size = await articleModel.count(obj, null, {sort: {'_id': norder}}).populate({path: 'category', select: 'name'})
    // let result = await articleModel.find({}).populate({path: 'category', select: 'name'})
    let pageSize = constants.pageSize
    let pageCount = Math.ceil(size / pageSize)
    ctx.body = {
      rows: result,
      total: size,
      pageSize,
      pageCount
    }
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

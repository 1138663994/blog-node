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
  async list (ctx, next) { // TODO: 分页，时间查询还没实现
    let {order, title, pageIndex} = ctx.request.body
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
        title: new RegExp(title, 'i') // 模糊搜索
      })
    }
    let count = pageIndex || 1
    let pageSize = constants.pageSize
    result = await articleModel.find(obj, null, {sort: {'_id': norder}}).populate({path: 'category', select: 'name'}).skip((count - 1) * pageSize).limit(pageSize)
    let size = await articleModel.count(obj, null, {sort: {'_id': norder}}).populate({path: 'category', select: 'name'})
    // let result = await articleModel.find({}).populate({path: 'category', select: 'name'})
    let pageCount = Math.ceil(size / pageSize)
    ctx.body = {
      rows: result,
      total: size,
      pageSize,
      pageCount
    }
  },
  async blogHomeList (ctx, next) {
    let result = await articleModel.find({'isOpen': true}).populate({path: 'category', select: 'name'}).limit(10)
    ctx.body = result
  },
  async remove (ctx, next) {
    let {id} = ctx.request.body
    const result = await articleModel.findByIdAndRemove(id)
    ctx.body = result
  },
  async edit (ctx, next) {
    let {id, title, content, category, isOpen} = ctx.request.body
    const result = await articleModel.findByIdAndUpdate(id, {
      title,
      content,
      category,
      isOpen
    })
    ctx.body = result
  },
  async detail (ctx, next) {
    let {id} = ctx.request.body
    const result = await articleModel.findById(id).populate({path: 'category', select: 'name'})
    ctx.body = result
  }
}

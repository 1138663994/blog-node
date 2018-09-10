const diaryModel = require('../../mongon/diary')

module.exports = {
  async add (ctx, next) {
    let {content, createTime} = ctx.request.body
    if (!content || !createTime) {
      ctx.body = {
        code: -1,
        message: '参数不对'
      }
      return
    }
    let diaryData = {
      content,
      createTime
    }
    console.log('diaryData', diaryData)
    const result = await diaryModel.create(diaryData)
    ctx.body = result
  },
  async list (ctx, next) {
    const result = await diaryModel.find({})
    ctx.body = result
  }

}

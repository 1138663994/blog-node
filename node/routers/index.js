const router = require('koa-router')()
async function isLoginUser (ctx, next) {
  if (!ctx.session.user) {
    ctx.body = {
      code: -1,
      title: '未登录, 请先登录'
    }
    return
  }
  await next()
}
module.exports = (app) => {
  router.post('/blog/register', require('./user').register)
  router.post('/blog/login', require('./user').login)
  router.post('/blog/loginout', require('./user').loginOut)
  router.post('/blog/article/add', isLoginUser, require('./article').add)
  app
    .use(router.routes())
    .use(router.allowedMethods())

  // 404
  app.use(async (ctx, next) => {
    ctx.body = {
      code: -1,
      title: 404
    }
  })
}

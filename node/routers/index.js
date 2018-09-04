const Router = require('koa-router')
async function isLoginUser (ctx, next) {
  if (!ctx.session.user) {
    ctx.status = 401
    ctx.body = {
      code: -1,
      title: '未登录, 请先登录'
    }
    return
  }
  await next()
}
const router = new Router({
  prefix: '/blog'
})
module.exports = (app) => {
  router.post('/register', require('./user').register)
  router.post('/login', require('./user').login)
  router.post('/loginout', require('./user').loginOut)
  router.post('/article/add', isLoginUser, require('./article').add)
  router.post('/article/list', isLoginUser, require('./article').list)
  router.post('/article/remove', isLoginUser, require('./article').remove)
  router.post('/article/edit', isLoginUser, require('./article').edit)
  router.post('/articleCategory/list', isLoginUser, require('./articleCategory').list)
  router.post('/articleCategory/add', isLoginUser, require('./articleCategory').add)
  app
    .use(router.routes())
    .use(router.allowedMethods())

  // 404
  app.use(async (ctx, next) => {
    ctx.body = {
      code: -1,
      status: 404
    }
  })
}

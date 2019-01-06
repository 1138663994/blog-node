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
  console.log('需要验证')
  await next()
}
const router = new Router({
  prefix: '/blogapi'
})
module.exports = (app) => {
  router.get('/public/abc', async (ctx, next) =>{
    ctx.body={
      code: 1,
      message: 'sss'
    }
  })
  router.post('/public/register', require('./user').register)
  router.post('/public/login', require('./user').login)
  router.post('/public/loginout', require('./user').loginOut)
  router.post('/public/message/create', require('./message').create)
  router.post('/public/message/detail', require('./message').detail)
  router.post('/public/article/blogHomeList', require('./article').blogHomeList)
  router.post('/public/article/getDetail', require('./article').blogDetail)
  router.post('/public/sign', require('./sign').getSign)
  router.post('/public/blogArticleCategory/list', isLoginUser, require('./articleCategory').blogList)

  router.post('/article/add', isLoginUser, require('./article').add)
  router.post('/article/list', isLoginUser, require('./article').list)
  router.post('/article/remove', isLoginUser, require('./article').remove)
  router.post('/article/edit', isLoginUser, require('./article').edit)
  router.post('/article/getDetail', require('./article').detail)
  router.post('/articleCategory/list', isLoginUser, require('./articleCategory').list)
  router.post('/articleCategory/add', isLoginUser, require('./articleCategory').add)
  router.post('/diary/add', isLoginUser, require('./diary').add)
  router.post('/diary/list', isLoginUser, require('./diary').list)
  

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

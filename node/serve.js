const Koa = require('koa')
// 注意 require('koa-router') 返回的是函数:
const router = require('koa-router')()
const app = new Koa()
const user = require('./user')
const CONFIG = require('../mongon/')
const mongoose = require('mongoose')

mongoose.connect(CONFIG.mongodb)

// 添加路由
router.get('/login', user.signup)
router.get('/', async (ctx, next) => {
  ctx.response.body = '<h1>index passge</h1>'
})
let json = [{
  name: 'zhangsan3'
}, {
  name: 'zhangsan2'
}]
router.get('/home/:id', async (ctx, next) => {
  // console.log('ctx', ctx.req)
  let id = ctx.req.params
  console.log('id', id)
  ctx.response.body = json
})

router.get('/404', async (ctx, next) => {
  ctx.response.body = '<h1>404 Not Found</h1>'
})

// 调用路由中间件
app.use(router.routes())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
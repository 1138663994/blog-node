const Koa = require('koa')
// 注意 require('koa-router') 返回的是函数:
// const router = require('koa-router')()

const session = require('koa-session') // 可以让koa使用session 例如ctx.session.user = {}
const bodyParser = require('koa-bodyparser') // 解析post参数

const app = new Koa()
// const user = require('./routers/user')
const CONFIG = require('../mongon/')
const mongoose = require('mongoose')
const router = require('./routers')

mongoose.connect(CONFIG.mongodb)

app.keys = ['nodeDemo']
app.use(bodyParser())

app.use(session({
  key: CONFIG.session.key,
  maxAge: CONFIG.session.maxAge
}, app))

// 添加路由
// router.post('/login', user.signup)

router(app)
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})

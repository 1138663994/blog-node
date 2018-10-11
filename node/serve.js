const Koa = require('koa')
// 注意 require('koa-router') 返回的是函数:
// const router = require('koa-router')()

const session = require('koa-session') // 可以让koa使用session 例如ctx.session.user = {}
const bodyParser = require('koa-bodyparser') // 解析post参数
const path = require('path')
const static = require('koa-static')

const koaJwt = require('koa-jwt') // 路由权限控制
const jwt = require('jwt-simple') // token生成 有毒这个，有效期要转化为时间戳为秒的形式。也就是得把时间戳除以1000
const jwtSecret = require('./constant').jwtSecret // 秘钥

const app = new Koa()

// const user = require('./routers/user')
const CONFIG = require('../mongon/')
const mongoose = require('mongoose')
const router = require('./routers')

mongoose.connect(CONFIG.mongodb)

app.keys = ['nodeDemo']
app.use(bodyParser())


// 验证token
app.use(koaJwt({secret: jwtSecret}).unless({
  path: [/^\/blogapi\/public/] // 不验证的接口
}))


const staticPath = '../dist'
 
app.use(static(
  path.join( __dirname,  staticPath)
))

app.use(session({
  key: CONFIG.session.key,
  maxAge: CONFIG.session.maxAge
}, app))

router(app)
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})

const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const cors = require('koa2-cors')
const ENV = 'alongmusic-test-12345'

// 跨域
app.use(cors({
  origin: ['http://localhost:9528'],
  credentials: true
}))

const playlist = require('./controller/playlist.js')
router.use('/playlist', playlist.routes())

app.use(router.routes())
app.use(router.allowedMethods())

app.use(async (ctx, next)=>{
  console.log('全局中间件')
  // ctx.body = 'Hello Wolrd'
  ctx.state.env = ENV
  await next()
})

app.listen(3000, () => {
  console.log('当前服务运行在 3000 端口号')
})
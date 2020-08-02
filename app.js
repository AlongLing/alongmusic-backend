const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  ctx.body = 'hello world'
})

app.listen(3000, () => {
  console.log('当前服务运行在 3000 端口号')
})
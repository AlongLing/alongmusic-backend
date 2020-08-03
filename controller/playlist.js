const Router = require('koa-router')
const router = new Router()
const callCloudFn = require('../utils/callCloudFn')


/** router.get('/list', async(ctx, next) => {
    const access_token = await getAccessToken()
    console.log(`access_token: ${access_token}`)
    const query = ctx.request.query
    // 查询歌单列表
    const url = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&env=${ENV}&name=music`
    const options = {
        method: 'POST',
        uri: url,
        body: {
            $url: 'playlist',
            start: parseInt(query.start),
            count: parseInt(query.count)
        },
        json: true // Automatically stringifies the body to JSON
    };
    
    // 返回歌单列表数据
    const data = await rp(options)
        .then((res) => {
            console.log(res)
            return JSON.parse(res.resp_data).data
        })
        .catch((err) => {

        });
        ctx.body = {
            data,
            code: 20000
        }    
}) */

// get post
router.get('/list', async (ctx, next) => {
    const query = ctx.request.query
    console.log(`start = ${query.start} count = ${query.count}`)
    const res = await callCloudFn(ctx, 'music', {
        $url: 'playlist',
        start: parseInt(query.start),
        count: parseInt(query.count)
    })
    let data = []
    if (res.resp_data) {
        data = JSON.parse(res.resp_data).data
    }
    ctx.body = {
        data,
        code: 20000,
    }
})


module.exports = router
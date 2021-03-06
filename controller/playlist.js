const Router = require('koa-router')
const router = new Router()
const callCloudFn = require('../utils/callCloudFn')
const callCloudDB = require('../utils/callCloudDB.js')


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

// 根据歌单id查询云数据库中的歌单信息, 直接通过 HTTP api 调用云数据库查询数据
router.get('/getById', async(ctx, next)=>{
    const query = `db.collection('playlist').doc('${ctx.request.query.id}').get()`
    const res = await callCloudDB(ctx, 'databasequery', query)
    ctx.body = {
        code: 20000,
        data: JSON.parse(res.data)
    }
})

// 更新歌单列表数据
router.post('/updatePlaylist', async(ctx, next)=>{
    const params = ctx.request.body
    console.log(params)
    const query = `
        db.collection('playlist').doc('${params._id}').update({
            data: {
                name: '${params.name}',
                copywriter: '${params.copywriter}'
            }
        })
    `
    const res = await callCloudDB(ctx, 'databaseupdate', query)
    ctx.body = {
        code: 20000,
        data: res
    }
})

// 删除歌单列表(单项删除)
router.get('/del', async(ctx, next)=>{
    const params = ctx.request.query
    const query = `db.collection('playlist').doc('${params.id}').remove()`
    const res = await callCloudDB(ctx, 'databasedelete', query)
    ctx.body = {
        code: 20000,
        data: res
    }
})


module.exports = router
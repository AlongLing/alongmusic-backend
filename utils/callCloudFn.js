const getAccessToken = require('./getAccessToken.js')
const rp = require('request-promise')
const ENV = 'alongmusic-test-12345'

const callCloudFn = async (ctx, fnName, params) => {
    const ACCESS_TOKEN = await getAccessToken()
    const options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${ACCESS_TOKEN}&env=${ENV}&name=${fnName}`,
        body: {
            ...params
        },
        json: true // Automatically stringifies the body to JSON
    }

    return await rp(options)
        .then((res) => {
            return res
        })
        .catch(function (err) {
        })
}

module.exports = callCloudFn
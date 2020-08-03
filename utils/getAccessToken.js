const rp = require('request-promise')
const APPID = 'wx8d05fba36317ab2c'
const APPSECRET = 'f0a2dc3c36c081245458eed927e1fa8d'
const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`

const updateAccessToken = async () => {
  const resStr = await rp(URL)
  const res = JSON.parse(resStr)
  console.log(res)
}

updateAccessToken()
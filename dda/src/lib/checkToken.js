const request = require('superagent')
const express = require('express')
const router = express.Router()

const CLOUD_BASE_URL = 'http://localhost:3000'

// 验证 ddaToken
module.exports = async options => {
  // {
  //   "type": "authRequest",
  //   "uuid": "请求的UUID，由DDA设备⽣成",
  //   "request": {
  //   "op": "read",
  //   "bizType": "",
  //   "bizid": "",
  //   "objectid": "", 
  //   "checksum": "⽂件或⽂件块的checksum",
  //   "timestamp": "请求的时间戳",
  //   "token": "客户端的dda token",
  //   "signature": "客户端使⽤dda的signingKey对request内容的签名"
  //   }, 
  // }
  const res = await request
    .post(`${CLOUD_BASE_URL}/v1/token/check`)
    .send({ 
      clientId: options.clientId,
      ddaToken: options.ddaToken
    })
    .set('Accept', 'application/json')
  console.log(res.body)
}
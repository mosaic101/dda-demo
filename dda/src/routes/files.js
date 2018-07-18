const request = require('superagent')
const express = require('express')
const router = express.Router()

const CLOUD_BASE_URL = 'http://localhost:3000'

// 下载文件
router.get('/', (req, res) => {
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
  request
    .post(`${CLOUD_BASE_URL}/v1/users`)
    .send({
        phoneNO: '13112345678',
        password: '123456'
    })
    .set('Accept', 'application/json')
    .end((err, res) => {
      console.log(err, res.body)
      token = res.body.data
    })
})

/**
 * 上传文件 传递给 dda， dda 请求 cloud 认证！ 
 * 明文部分:
 * 加密部分:
 */
router.post('/', (req, res) => {

  const request = {
    "type": "authRequest",
    "uuid": "请求的UUID，由DDA设备⽣成",
    "request": {
    "op": "read",
    "bizType": "",
    "bizid": "",
    "objectid": "",
    "checksum": "⽂件或⽂件块的checksum",
    "timestamp": "请求的时间戳",
    "token": "客户端的dda token",
    "signature": "客户端使⽤dda的signingKey对request内容的签名"
    },
  }
  const qs = {
    fileuuid: 's',

  }
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
  request
    .post(`${CLOUD_BASE_URL}/v1/users`)
    .send({
        phoneNO: '13112345678',
        password: '123456'
    })
    .set('Accept', 'application/json')
    .end((err, res) => {
      console.log(err, res.body);
      // TODO: 获取 cloudToken、ddaToken
      token = res.body.data
    })
})

module.exports = router

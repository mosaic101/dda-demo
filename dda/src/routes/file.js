const request = require('superagent')
const express = require('express')
const router = express.Router()

const checkToken = require('../lib/checkToken')
const CLOUD_BASE_URL = 'http://localhost:3000'

// 下载文件
router.get('/', async (req, res) => {
  try {
    const 
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
    const options = {
      clientId: '284b77ea-fcc2-40bd-aa0f-7d576c4ae8f5',
      ddaToken: ''
    }
    const flag = await checkToken(options)
    if (!flag) return res.error('authrization filed', 401)
    // TODO: download file
  } catch(err) {
    return res.error(err)
  }
})

/**
 * 上传文件 传递给 dda， dda 请求 cloud 认证！ 
 * 明文部分:
 * 加密部分:
 */
router.post('/', async (req, res) => {
  try {
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
    const options = {
      clientId: '284b77ea-fcc2-40bd-aa0f-7d576c4ae8f5',
      ddaToken: ''
    }
    const flag = await checkToken(options)
    if (!flag) return res.error('authrization filed', 401)
    // TODO: upload file
  } catch (err) {
    return res.error(err)
  }
})

module.exports = router

const uuid = require('uuid')
const request = require('superagent')
const express = require('express')
const router = express.Router()

const CLOUD_BASE_URL = 'http://localhost:3000'

// 下载文件,  * 明文部分: * 加密部分:
router.get('/', async (req, res) => {
  try {
    const { clientId, ddaToken, request } = req.query
    /**
     * 明文部分：
     * 1. 
     */
    const rs = {
      'type': 'authRequest',
      'uuid':  uuid.v4(), // '请求的UUID，由DDA设备⽣成',
      'request': {
        'op': 'read',
        'bizType': '', // 明文
        'bizid': '', // 明文
        'objectid': '', // 明文
        'checksum': '⽂件或⽂件块的checksum', // 明文
        encrypted: {
          timestamp: '请求的时间戳',
          token: '客户端的dda token',
          signature: '客户端使⽤dda的signingKey对request内容的签名'
        }
      }
    }
    // {
    //   "type": "authReply",
    //   "uuid": "请求的uuid",
    //   "status": 200,
    //   "body": {
    //   }
    //   }
    // TODO: download file
    return res.success()
  } catch (err) {
    return res.error(err)
  }
})

// 上传文件
router.post('/', async (req, res) => {
  try {
    // TODO: upload file
    return res.success()
  } catch (err) {
    return res.error(err)
  }
})

module.exports = router

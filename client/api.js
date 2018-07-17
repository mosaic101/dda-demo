/**
 * client 与 cloud 之间的认证:
 * 1. 注册账号获取 token
 * 2. 
 */
const request = require('superagent')

const CLIENT_ID = 'client_' + Math.random().toString(16).substr(2, 8)
const CLOUD_BASE_URL = 'http://localhost:3000'
const DDA_BASE_URL = 'http://localhost:4000'

let token

class API {

  getToken() {
   request
      .post(`${CLOUD_BASE_URL}/v1/users`)
      .send({
         phoneNO: '13112345678',
         password: '123456'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log(err, res.body);
        // 获取 cloudToken、ddaToken
        token = res.body.data
      })
  }

}

const api = new API()
api.getToken()
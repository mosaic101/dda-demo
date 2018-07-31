const path = require('path')
const fs = require('fs')
const assert = require('power-assert')
const request = require('supertest')
const rt = require('superagent')

const app = require('src/app')
// const CLIENT_ID = 'client_' + Math.random().toString(16).substr(2, 8)
const CLOUD_BASE_URL = 'http://localhost:3000'
const clientId = '284b77ea-fcc2-40bd-aa0f-7d576c4ae8f5'
const phoneNO = '13112345678'
const password = '123456'

// 1. 用户登录 - 获取 clientInfo
// 2. 选择 DDA - 获取 ddaToken
const getClientInfo = async () => {
   const res = await rt
    .post(`${CLOUD_BASE_URL}/c/v1/users`)
    .send({ phoneNO, password })
    .set('Accept', 'application/json')

  return res.body.data
}

const getToken = async () => {
  const data = await getClientInfo()
  if (!data) throw new Error('user not found')
  const cToken = data.token
  const deviceId = data.user.devices[0]

  const res = await rt
    .get(`${CLOUD_BASE_URL}/c/v1/devices/${deviceId}/token`)
    .set('Accept', 'application/json')
    .set('authorization', cToken)

  return res.body.data.token
}

let ddaToken

describe(path.basename(__filename), () => {

  beforeEach(async () => {
    ddaToken = await getToken()
  })

  it('upload file should return succcess', done => {
    request(app)
      .post(`/v1/files?clientId=${clientId}`)
      .send({
        request: '13112345678',
      })
      .set('Accept', 'application/json')
      .set('authorization', ddaToken)
      .end((err, res) => {
        return res.body.data
      })
    done()
  })

  it('download file should return succcess', done => {
    request(app)
      .get(`/v1/files?clientId=${clientId}`)
      .set('Accept', 'application/json')
      .set('authorization', ddaToken)
      .end((err, res) => {
        return res.body.data
      })
    done()
  })

})

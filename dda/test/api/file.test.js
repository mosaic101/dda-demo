
const path = require('path')
const fs = require('fs')
const assert = require('power-assert')
const request = require('supertest')
const rt = require('superagent')

const app = require('src/app')
// const CLIENT_ID = 'client_' + Math.random().toString(16).substr(2, 8)
const CLOUD_BASE_URL = 'http://localhost:3000'
const DDA_BASE_URL = 'http://localhost:4000'

const rs = fs.createReadStream('test')

// 获取 cloudToken、ddaToken
const getToken = () => {
  rt
    .post(`${CLOUD_BASE_URL}/v1/users`)
    .send({
        phoneNO: '13112345678',
        password: '123456'
    })
    .set('Accept', 'application/json')
    .end((err, res) => {
      console.log(err, res.body)
      return res.body.data
    })
}

let ddaToken

describe(path.basename(__filename), () => {

  beforeEach(async () => {
    ddaToken = await getToken()
  })

  it('upload file should return succcess', done => {
    request(app)
      .post(`${DDA_BASE_URL}/v1/files`)
      .send({
        phoneNO: '13112345678',
        password: '123456'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log(err, res.body)
        return res.body.data
      })
    done()
  })

  it('download file should return succcess', done => {
    request(app)
      .get(`${DDA_BASE_URL}/v1/files`)
      .send({
        phoneNO: '13112345678',
        password: '123456'
      })
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log(err, res.body)
        return res.body.data
      })
    done()
  })

})

const path = require('path')
const fs = require('fs')
const assert = require('power-assert')
const request = require('supertest')
const rt = require('superagent')

const app = require('src/app')
// const CLIENT_ID = 'client_' + Math.random().toString(16).substr(2, 8)
const CLOUD_BASE_URL = 'http://localhost:3000'
const clientId = '284b77ea-fcc2-40bd-aa0f-7d576c4ae8f5'
const ddaToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkZXZpY2UiOnsiX2lkIjoiMmY2ZjdjNDItYzA5ZC00MDAxLTgyZmUtMGY4ZjQ3OGJkMjU4IiwiY3JlZGVudGlhbCI6Ii0tLS0tQkVHSU4gUFVCTElDIEtFWS0tLS0tXG5NSUlCSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQVE4QU1JSUJDZ0tDQVFFQXprQzhTTXFFNkNHcW5RVzE2UzgrXG40SjkzOThNY3VOdzJHU1VBbUNtbDZqTHRjSVN1Q1dYemxFSyt2YjhhM0pEbjUyZUZ1K1dBL0NnVGJFbG1kb2tPXG4xS3lZcUlZaXdIVDdLV0V5ejlMRmE1cUcvaDJGZ2FneTNiZ1NlSmdzYmhvdkVGMytkOEFDR1d0eXlBQXlsUlU0XG5ZaXY2eWRPdUZEQitDckZPcTlvQkhvUFI1blpRbE1abjBRV1l2MkhlVUxnQ2xra0ZYcW1zQmZSeHlTZjNRTnF1XG5PY3M0ZzAvc21WMERFZ2pzMFUwa0UxVndISW9NTXBabmw1UmF6cmwyVU9aZmF3d0wvMGtldVR1RElZa2pLRGUvXG5XQ3QyVmlaK2QrYlVqOGNPMmFhWU5pSGppbXNyaUpDbFE0NUx6RHdyK0pSekpiMUVOZkZXbFhDd3AzREY0c3NlXG45UUlEQVFBQlxuLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tXG4ifSwiZXhwIjoxNTM1MTAwOTI1MDA4fQ.0W4bA35vwnCQxHQK4rTvPEvM0R8UIfvFHo72HVDbTB0'
// 获取 cloudToken、ddaToken
const client = () => {
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

// let ddaToken

describe(path.basename(__filename), () => {

  beforeEach(async () => {
    // ddaToken = await getToken()
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
        console.log(123123, err, res.body)
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
        console.log(err, res.body)
        return res.body.data
      })
    done()
  })

})

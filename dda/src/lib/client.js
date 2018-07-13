const https = require('https')
const fs = require('fs')

const options = {
  hostname: '127.0.0.1',
  port: 3001,
  path: '/',
  method: 'GET',
  key: fs.readFileSync('../../ca/ca-key.pem'),
  // cert: fs.readFileSync('../../ca/ca-cert.pem'),
  requestCert: true,  // 请求客户端证书
  rejectUnauthorized: false // 不拒绝不受信任的证书
}

// options.agent = new https.Agent(options)

const req = https.request(options, (res) => {
  console.log('状态码：', res.statusCode)
  console.log('请求头：', res.headers)

  res.on('data', (d) => {
    process.stdout.write(d)
  })
})

req.on('error', (e) => {
  console.error(e)
})
req.end()
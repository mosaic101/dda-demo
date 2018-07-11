const tls = require('tls')
const fs = require('fs')
const path = require('path')

const options = {
  key: fs.readFileSync(path.join(process.cwd(), '../testdata/ssl/ca-key.pem')),
  cert: fs.readFileSync(path.join(process.cwd(),'../testdata/ssl/ca-cert.pem')),

  // This is necessary only if using the client certificate authentication.
  requestCert: true,
  // This option only has an effect when requestCert is true and defaults to true.
  // rejectUnauthorized: true,

  ca: [ fs.readFileSync(path.join(process.cwd(),'../testdata/ssl/ca-cert.pem')) ]
}

let client = null

const server = tls.createServer(options, socket => {
  client = socket
  // console.log('server connected', socket.authorized ? 'authorized' : 'unauthorized')
  socket.write(`hello, welcome to server!\n`)
  socket.setEncoding('utf8')
  socket.on('data', data => {
    process.send && process.send(data)
  })
  socket.on('error', err => console.log('error', err))
})

server.listen(3001, () => {
  // console.log('server bound')
  process.send && process.send(JSON.stringify({ type:"ServerStarted"}))
})
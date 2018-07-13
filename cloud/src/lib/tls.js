const tls = require('tls')
const fs = require('fs')
const path = require('path')

class Cloud {
  constructor() {
    const options = {
  
      key: fs.readFileSync(path.join(process.cwd(), 'testdata/ssl/server-key.pem')),
      cert: fs.readFileSync(path.join(process.cwd(),'testdata/ssl/server-cert.pem')),
    
      // This is necessary only if using the client certificate authentication.
      requestCert: false, // 不要求客服端有CA证书
    
      // This option only has an effect when requestCert is true and defaults to true.
      // rejectUnauthorized: true,
    
      // This is necessary only if the client uses the self-signed certificate.
      ca: [ fs.readFileSync(path.join(process.cwd(),'testdata/ssl/ca-cert.pem')) ]
    }
    this.client = null
    const server = tls.createServer(options, socket => {
      this.client = socket
      console.log('server connected', socket.authorized ? 'authorized' : 'unauthorized')
      socket.write(`hello, welcome to server!\n`)
      socket.setEncoding('utf8')
      socket.on('data', data => this.handleDataEvent(data))
      socket.on('error', err => console.log('error', err))
    })
    
    server.listen(3001, () => {
      console.log('server bound')
    })
  }

  handleDataEvent (data) {
    console.log(data, Buffer.from(data))
    const msg = {
      type: 'connected',
      // deviceUUID: uuid.v4()
    }
    // 云下发随机数挑战
    // this.client.write(JSON.stringify(msg))
  }

}

new Cloud()
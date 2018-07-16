const tls = require('tls')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const ursa = require('ursa')
const _ = require('lodash')
const devices = require('../config/devices')

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
      // socket.write(`hello, welcome to server!\n`)
      socket.setEncoding('utf8')
      socket.on('data', data => this.handleDataEvent(data))
      socket.on('error', err => console.log('error', err))
      socket.on('close', () => console.log('Disconnect', new Error('server closed')))
    })
    
    server.listen(3001, () => {
      console.log('server bound')
    })
  }

  sendMsg(data) {
    this.client.write(JSON.stringify(data)) 
  }

  handleDataEvent (data) {
    // Buffer.from(data)
    console.log(data.toString('utf8'))
    data = JSON.parse(data)
    const { type, value } = data
    switch (type) {
      case 'identity':
        this.client.device = _.find(devices, o => o.id === value)
        this.client.seed = uuid.v4()
        this.sendMsg({
          type: 'challenge',
          value: this.client.seed
        })
        break
      case 'response':
        const pub = this.client.device.credential
        const crt = ursa.createPublicKey(pub)
        const seed = crt.publicDecrypt(value, 'base64', 'utf8')
        if (this.client.seed === seed) {
          // 验证成功后钉盘向DDA设备下发其帐号资源中⽤于通讯的密钥和证书，
          // ⽤于存储的密钥，然后断开连接； 
          // ? 存在内存里， 每次登录的时候renew证书跟密钥
          this.client.end()
        }
        break
      default:
        return this.destroy()
    }
  }

  exit() {
    this.client.removeAllListeners()
    this.client.on('error', () => {})
    this.client = undefined
  }

  destroy () {
    this.exit()
    this.client.end()
  }

}

new Cloud()
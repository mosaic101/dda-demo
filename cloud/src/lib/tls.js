const tls = require('tls')
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const jwt = require('jwt-simple')
const ursa = require('ursa')

const { Device } = require('../models')

// TODO: tls map
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
      socket.  on('data', data => this.handleDataEvent(data))
      socket.on('error', err => console.log('error', err))
      socket.on('close', () => console.log('Disconnect', new Error('server closed')))
    })
    server.listen(3001, () => console.log('server bound'))
  }

  sendMsg(data) {
    this.client.write(JSON.stringify(data)) 
  }

  async handleDataEvent (data) {
    // Buffer.from(data)
    // console.log(data.toString('utf8'))
    data = JSON.parse(data)
    const { type, value } = data 
    switch (type) {
      case 'identity':
        // get device information from database
        const device = await Device.findOne({ _id: value }).lean()
        if (!device) return this.client.end()
        this.client.device = device
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
        // 验证成功后钉盘向DDA设备下发其帐号资源中⽤于通讯的密钥、证书、token、⽤于存储的密钥，然后断开连接； 
        // DDA 将之存于内存， 每次登录的时候 renew 证书、密钥
        if (this.client.seed === seed) {
          const token = jwt.encode({ device: this.client.device, exp: Date.now() + 1000 * 3600 * 24 * 30 }, 'DDA')
          // TODO: update device status、 ddaToken 

          this.sendMsg({
            type: 'authorization',
            value: {
              device: this.client.device,
              token: token
            }
          })
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
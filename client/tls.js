const tls = require('tls')
const EventEmitter = require('events').EventEmitter
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const ursa = require('ursa')

const DEVICE_ID = '123456'
const TPM_KEY = fs.readFileSync(path.join(process.cwd(), `testdata/dda/dda-${DEVICE_ID}.key.pem`))


class Channel extends EventEmitter {
  constructor(port, host) { 
    super()
    const options = {
      // key: fs.readFileSync(path.join(process.cwd(), 'testdata/ssl/client-key.pem')),
      // cert: fs.readFileSync(path.join(process.cwd(),'testdata/ssl/client-cert.pem')),
      // ca: [fs.readFileSync(path.join(process.cwd(),'testdata/ssl/ca-cert.pem'))],
      requestCert: true, // 要求服务器有CA签署的证书
      rejectUnauthorized: false
    }
    this.socket = tls.connect(port, host, options, () => {
      console.log('*****client connected*****', this.socket.authorized ? 'authorized' : 'unauthorized')
      // process.stdin.pipe(this.socket)
      // process.stdin.resume()
      const msg = {
        type: 'identity',
        value: DEVICE_ID
      }
      this.sendMsg(msg)
    })  
    this.socket.setEncoding('utf8')
    this.socket.on('data', data => this.handleDataEvent(data))
    this.socket.on('error', err => console.log('Disconnect', err))
    this.socket.on('end', () => console.log('Disconnect', new Error('server end')))
    this.socket.on('close', () => console.log('Disconnect', new Error('server closed')))
    this.socket.setKeepAlive(true, 100)
  }

  sendMsg(data) {
    this.socket.write(JSON.stringify(data)) 
  }

  handleDataEvent(data) {
    // Buffer.from(data)
    console.log(data)
    data = JSON.parse(data.toString('utf8'))
    const { type, value } = data
    switch (type) {
      case 'challenge':
        // DDA设备⽤设备密钥计算结果并应答
        const key = ursa.coercePrivateKey(TPM_KEY)
        const encryptData = key.privateEncrypt(value, 'utf8', 'base64')
        const msg = {
          type: 'response',
          value: encryptData
        }
        this.sendMsg(msg)
        break
      default:
        return this.close()
    }

  }

  
}

new Channel(3001, 'localhost')

module.exports = Channel
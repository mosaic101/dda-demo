const tls = require('tls')
const EventEmitter = require('events').EventEmitter
const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const ursa = require('ursa')

const DEVICE_ID = '2f6f7c42-c09d-4001-82fe-0f8f478bd258' // uuid.v4()
const TPM_KEY = fs.readFileSync(path.join(process.cwd(), `testdata/dda/dda-123456.key.pem`))

const PORT = 3001
const HOST = 'localhost'

// 在系统启动时
// 1. DDA设备向钉盘发起TLS/SSL连接，DDA设备会要求服务器具有CA签署的证书；服务器不要求DDA设备提供证书；
// 2. DDA设备上报设备ID；
// 3. 云下发随机数挑战； 
// 4. DDA设备⽤设备密钥计算结果并应答；
// 5. 钉盘使⽤设备帐号的公钥验证；
// 6. 验证成功后钉盘向DDA设备下发其帐号资源中⽤于通讯的密钥和证书，⽤于存储的密钥，然后断开连接； 

class Client {
  constructor() { 
    super()
    const options = {
      // key: fs.readFileSync(path.join(process.cwd(), 'testdata/ssl/client-key.pem')),
      // cert: fs.readFileSync(path.join(process.cwd(),'testdata/ssl/client-cert.pem')),
      // ca: [fs.readFileSync(path.join(process.cwd(),'testdata/ssl/ca-cert.pem'))],
      requestCert: true, // 要求服务器有CA签署的证书
      rejectUnauthorized: false
    }
    this.socket = tls.connect(PORT, HOST, options, () => {
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
    // console.log(data)
    data = JSON.parse(data.toString('utf8'))
    const { type, value } = data
    switch (type) { 
      case 'challenge':
        // DDA设备⽤设备密钥计算结果并应答
        const key = ursa.coercePrivateKey(TPM_KEY)
        const encryptData = key.privateEncrypt(value, 'utf8', 'base64')
        const msg = { type: 'response', value: encryptData }
        return this.sendMsg(msg)
      case 'authorization':
        // global config
        global.deviceId = value.deviceId
        return this.close()
      default:
        return this.close()
    }
  }

  close() {
    this.socket.end()
  }

  destroy() {
    this.exit()
    this.socket.end()
  }
}

class Channel extends EventEmitter {
  constructor() {
    super()
    this.msgQueue = new Map()
    new Client(this)
  }

  handleCloudMessage(message) {
    // console.log(data)
    message = JSON.parse(message.toString('utf8'))
    const { type, value } = message
    switch (type) {
      // DDA设备⽤设备密钥计算结果并应答
      case 'challenge':
        const key = ursa.coercePrivateKey(TPM_KEY)
        const encryptData = key.privateEncrypt(value, 'utf8', 'base64')
        const msg = { type: 'response', value: encryptData }
        return this.sendMsg(msg)
      case 'authorization':
        
        global.deviceId = value.deviceId
        return this.close()
      default:
        return this.close()
    }
  }

  connecting() {

  }

  disconnect() {

  }

  reconnect() {

  }

  destroy() {

  }
}


module.exports = new Channel()
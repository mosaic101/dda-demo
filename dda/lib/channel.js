const tls = require('tls')
const EventEmitter = require('events').EventEmitter

// 在系统启动时
// 1. DDA设备向钉盘发起TLS/SSL连接，DDA设备会要求服务器具有CA签署的证书；服务器不要求DDA设备提供证书；
// 2. DDA设备上报设备ID；
// 3. 云下发随机数挑战；
// 4. DDA设备⽤设备密钥计算结果并应答；
// 5. 钉盘使⽤设备帐号的公钥验证；
// 6. 验证成功后钉盘向DDA设备下发其帐号资源中⽤于通讯的密钥和证书，⽤于存储的密钥，然后断开连接；

const connected = () => {
  const options = {
    host: '127.0.0.1',
    port: 3001,
  }
  const socket = tls.connect(options, () => {
    console.log('*****client connected*****', socket.authorized ? 'authorized' : 'unauthorized')
  })
  socket.setEncoding('utf8')
  socket.on('error', err => console.log('Disconnect', err))
  socket.on('end', () => console.log('Disconnect', new Error('server end')))
  socket.on('close', () => console.log('Disconnect', new Error('server closed')))
  socket.setKeepAlive(true, 100)
}

connected()

class Channel extends EventEmitter {
  constructor() {
    
  }

  connect() {

  }

  handleCloudMessage(message) {

  }

  sendToken() {

  }  
}

module.exports = Channel
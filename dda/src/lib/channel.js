const tls = require('tls')
const EventEmitter = require('events').EventEmitter
const uuid = require('uuid')
const fs = require('fs')
const path = require('path')

const TPM_SECRET = '123456'
// 在系统启动时
// 1. DDA设备向钉盘发起TLS/SSL连接，DDA设备会要求服务器具有CA签署的证书；服务器不要求DDA设备提供证书；
// 2. DDA设备上报设备ID；
// 3. 云下发随机数挑战； 
// 4. DDA设备⽤设备密钥计算结果并应答；
// 5. 钉盘使⽤设备帐号的公钥验证；
// 6. 验证成功后钉盘向DDA设备下发其帐号资源中⽤于通讯的密钥和证书，⽤于存储的密钥，然后断开连接； ? 存在内存里， 每次登录的时候renew证书跟密钥

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
    })  
    this.socket.setEncoding('utf8')
    this.socket.on('data', data => this.handleDataEvent(data))
    this.socket.on('error', err => console.log('Disconnect', err))
    this.socket.on('end', () => console.log('Disconnect', new Error('server end')))
    this.socket.on('close', () => console.log('Disconnect', new Error('server closed')))
    this.socket.setKeepAlive(true, 100)
  }

  handleDataEvent (data) {
    console.log(data, Buffer.from(data))
    const msg = {
      type: 'connected',
      deviceUUID: uuid.v4()
    }
    //
    this.socket.write(JSON.stringify(msg)) 
    
    // let bufArr = this.spliceBuffer(Buffer.from(data))

    // let notify = (buf) => {
    //   let message 
    //   try {
    //     message = JSON.parse(buf)
    //   } catch (error) {
    //     return
    //   }
    //   this.ctx.handleCloudMessage(message)
    // }

    // //msgSep not found
    // if (bufArr.length === 1) {
    //   if (bufArr[0].length)
    //     this.msgBuf = this.msgBuf ? Buffer.concat([this.msgBuf, buf]) : bufArr[0]
    //   else if (this.msgBuf) {
    //     notify(this.msgBuf.toString())
    //     this.msgBuf = null
    //   }      
    //   return 
    // }

    // // bufArr length > 1
    // for (let i = 0; i < bufArr.length; i++) {
    //   if (i === 0) {
    //     let msg = this.msgBuf ? Buffer.concat([this.msgBuf, bufArr[i]]).toString() : bufArr[i].toString()
    //     this.msgBuf = null
    //     notify(msg)
    //     continue
    //   }

    //   // do check endpoint.
    //   // if empty string, mean last-1 is complete message
    //   // else buffer last-1 item
    //   if (i === bufArr.length -1) {
    //     if (bufArr[i].length) {
    //       this.msgBuf = bufArr[i]
    //     } else {
    //       this.msgBuf = null
    //     }
    //     return 
    //   }

    //   notify(bufArr[i].toString())
    // }
  }

  handleCloudMessage(message) {

  }

  sendToken() {

  }  
}

new Channel(3001, 'localhost')

module.exports = Channel
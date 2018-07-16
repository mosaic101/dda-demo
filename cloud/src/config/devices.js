const fs = require('fs')
const path = require('path')
const uuid = require('uuid')

module.exports = [
  {
    id: '123456',
    credential:  fs.readFileSync(path.join(process.cwd(), 'testdata/dda/dda-123456.pub')),
    trusted: {
      privateKey: fs.readFileSync(path.join(process.cwd(), 'testdata/ssl/dda-key.pem')),
      cert: fs.readFileSync(path.join(process.cwd(), 'testdata/ssl/dda-cert.pem')),
    },
    storage: {
      key: 'key used to encrypt data volume'
    }
  }
]

// 其中 trusted 对象包含DDA设备通讯需要的密钥和证书； 
// storage 对象包含DDA设备⽂件系统密钥；
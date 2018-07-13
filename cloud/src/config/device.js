const uuid = require('uuid')

module.exports = [
  {
    deviceUUID: uuid.v4(),
    credential: 'public key or cert',
    trusted: {
      'privateKey': 'private key in PEM format',
      'cert': 'certificate in PEM format',
    },
    storage: {
      'key': 'key used to encrypt data volume'
    }
  }
]

// 其中 trusted 对象包含DDA设备通讯需要的密钥和证书； 
// storage 对象包含DDA设备⽂件系统密钥；
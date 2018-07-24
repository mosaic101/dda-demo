
// init device information 
const fs = require('fs')
const path = require('path')
const { User, Device } = require('./models')

const user = {
  _id: '284b77ea-fcc2-40bd-aa0f-7d576c4ae8f5',
  nickName: 'test',
  avatarUrl: 'http://www.wisnuc.com',
  phoneNO: '13112345678',
  password: '123456',
  devices: [ '2f6f7c42-c09d-4001-82fe-0f8f478bd258' ]
}

const device = {
  _id: '2f6f7c42-c09d-4001-82fe-0f8f478bd258',
  credential:  fs.readFileSync(path.join(process.cwd(), 'testdata/dda/dda-123456.pub')).toString('utf8'),
  privateKey: fs.readFileSync(path.join(process.cwd(), 'testdata/ssl/dda-key.pem')).toString('utf8'),
  cert: fs.readFileSync(path.join(process.cwd(), 'testdata/ssl/dda-cert.pem')).toString('utf8'),
  storageKey: fs.readFileSync(path.join(process.cwd(), 'testdata/dda/dda-123456.storagekey.pem')).toString('utf8'),
  signingKey: 'DDA-2f6f7c42-c09d-4001-82fe-0f8f478bd258'
}

const initdb = () => {
  return new Promise(async (resolve, reject) => {
    await User.create(user)
    await Device.create(device)
  })
}

initdb()

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
  ddaToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkZXZpY2UiOnsiX2lkIjoiMmY2ZjdjNDItYzA5ZC00MDAxLTgyZmUtMGY4ZjQ3OGJkMjU4Iiwic3RhdHVzIjoxLCJjcmVkZW50aWFsIjoiLS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS1cbk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBemtDOFNNcUU2Q0dxblFXMTZTOCtcbjRKOTM5OE1jdU53MkdTVUFtQ21sNmpMdGNJU3VDV1h6bEVLK3ZiOGEzSkRuNTJlRnUrV0EvQ2dUYkVsbWRva09cbjFLeVlxSVlpd0hUN0tXRXl6OUxGYTVxRy9oMkZnYWd5M2JnU2VKZ3NiaG92RUYzK2Q4QUNHV3R5eUFBeWxSVTRcbllpdjZ5ZE91RkRCK0NyRk9xOW9CSG9QUjVuWlFsTVpuMFFXWXYySGVVTGdDbGtrRlhxbXNCZlJ4eVNmM1FOcXVcbk9jczRnMC9zbVYwREVnanMwVTBrRTFWd0hJb01NcFpubDVSYXpybDJVT1pmYXd3TC8wa2V1VHVESVlraktEZS9cbldDdDJWaVorZCtiVWo4Y08yYWFZTmlIamltc3JpSkNsUTQ1THpEd3IrSlJ6SmIxRU5mRldsWEN3cDNERjRzc2VcbjlRSURBUUFCXG4tLS0tLUVORCBQVUJMSUMgS0VZLS0tLS1cbiIsInByaXZhdGVLZXkiOiItLS0tLUJFR0lOIFJTQSBQUklWQVRFIEtFWS0tLS0tXG5NSUlDWEFJQkFBS0JnUUN1dFhXREJmaU5WenNqdno1Rkw4dVlrREVqOXo4a0JSeHkydUtXTVc4aE56Z3phVFB1XG5sZCtiQXFWay8xTGVONTl1QytnMXJEbmpPYWRRR3ljUEQ3R096WU4yL0JzaFBOWXJJb1FVd2R2WlRMa255NjJKXG4zUzBmN0VKT2pCNzFKM2UrY2c4dHg2VnNFbWFTWitGUXNJd2hNOHBXbXpYTmErd2M1ZUo3SEZHQ3dRSURBUUFCXG5Bb0dCQUkveUNIRTh3UzVMT2ZuWS8waG4rZHFvcXlSVCtWMEhMUXBnMkNJaGRzdXFRSTd6Vmd0MHhyaGo5THdEXG5ObGJMQTN2YkthYlhVUmFya1BRS2V5TUlyaVI2c0YxY2tBQUJhUEZ4S3djRUxMSXE0WkRQUkVlMjRnOUZKWjhLXG5UdUp0MkcyTXJDVFZCN2V6aEd3V051L3ZVRkM5T0sxMTVGZm0xV0t5a0xGaTZEUEZBa0VBM3FwQk51K25jQUE2XG5UdW9SWDRMUWdXZVF6WXB3REEvbVljc2M1S09lRHB0MUVWalZ3M3hCeWh3ZTdyMW1xcUZEVDlBd3FWbk5UNDMyXG5TVjNBOFdIcFd3SkJBTWpkUWpUSkcxTC9NOC9LMkQxMW0xVEgySjBmRytnb0VSU0dMeU1ZSjZqdmdBTThRRWIzXG42cmt1MndYd1FwekJqSFRkY0M1elNXOHhGdjF5U2lpZFl4TUNRRHpnazUvdmVmblhOaG5wU1FLeUEwdStBd3NQXG5OSDgzd2Fjdkh5RXIwc1R2bjl3MFM0MTg1WWZhbEdKMWlpSlFvTlNyZVFKME9QdnROazdzd1JtOXlVMENRQkRpXG5jSDlKYkcrVW5rRllWc2NMek12YXBMM0ljS3NhT3gxVGprRFA5ZjJBYkcxWk1qb0Urd2tvQkNkQ3BBYlRTa0JFXG5vUHAybkhTcFZycGxVaENKOGxzQ1FFVnRCZm9hWU92N1RvRXBvNEpHRDVpZEFQWXlwMmZHTFZGSlc0VlRrWVZzXG5OZGhPRkVpMWVoazdqelRHM1dqWTUzelM0QXk0QitaeXUzK2N6QUJ2aHMwPVxuLS0tLS1FTkQgUlNBIFBSSVZBVEUgS0VZLS0tLS1cbiIsImNlcnQiOiItLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS1cbk1JSUQvakNDQWVZQ0FRRXdEUVlKS29aSWh2Y05BUUVMQlFBd2dZUXhDekFKQmdOVkJBWVRBa05PTVJFd0R3WURcblZRUUlEQWh6YUdGdVoyaGhhVEVQTUEwR0ExVUVCd3dHY0hWa2IyNW5NUTh3RFFZRFZRUUtEQVozYVhOdWRXTXhcbkN6QUpCZ05WQkFzTUFtTmhNUkl3RUFZRFZRUUREQWxzYjJOaGJHaHZjM1F4SHpBZEJna3Foa2lHOXcwQkNRRVdcbkVHNXZZbTlrZVVCc2IyTmhiR2h2YzNRd0hoY05NVGd3TnpFMk1EY3pOakUyV2hjTk1Ua3dOekUyTURjek5qRTJcbldqQ0JpREVMTUFrR0ExVUVCaE1DUTA0eEVUQVBCZ05WQkFnTUNITm9ZVzVuYUdGcE1ROHdEUVlEVlFRSERBWndcbmRXUnZibWN4RHpBTkJnTlZCQW9NQm5kcGMyNTFZekVQTUEwR0ExVUVDd3dHWTJ4cFpXNTBNUkl3RUFZRFZRUURcbkRBbHNiMk5oYkdodmMzUXhIekFkQmdrcWhraUc5dzBCQ1FFV0VHNXZZbTlrZVVCc2IyTmhiR2h2YzNRd2daOHdcbkRRWUpLb1pJaHZjTkFRRUJCUUFEZ1kwQU1JR0pBb0dCQUs2MWRZTUYrSTFYT3lPL1BrVXZ5NWlRTVNQM1B5UUZcbkhITGE0cFl4YnlFM09ETnBNKzZWMzVzQ3BXVC9VdDQzbjI0TDZEV3NPZU01cDFBYkp3OFBzWTdOZzNiOEd5RThcbjFpc2loQlRCMjlsTXVTZkxyWW5kTFIvc1FrNk1IdlVuZDc1eUR5M0hwV3dTWnBKbjRWQ3dqQ0V6eWxhYk5jMXJcbjdCemw0bnNjVVlMQkFnTUJBQUV3RFFZSktvWklodmNOQVFFTEJRQURnZ0lCQUtTc0YyZmMwM3hGOVZNbThyL1FcbnlQMkF0dGs5MCtqZUlXUjYyV3Y0WnFtUkViYWMySktuTDB5RDJnOU1DaUV0QkVBU09FR3Fpa3NHWXBva2lLa2Jcbk9VVDlSK3p0dG95b0VqSWhOMHExZnpsUHBxOTJNZkhnTFUydTBSbVpyUjc5RTU2bWJyUy9MZFA4WGZTbVNnZmlcbkhmejVxelc3NU8ra1p2cHdtaEUwZHVGUW5EaGhpNnU1REM1QmpLMVZHcmM2K1N0Zk1uVE9vNmVxRUoxVC9DT0lcbmhCeVZvaFFLejlQZVZmcXlBTy9RRFJzaEFadTJ6U0dJbElXaFBGMjJ4R1dWM3A4a09IdE9qUWNDZ254TWE4alhcbmpINnJVR2JuYUJBcDVaUmpPQnJSYVNqWEhvQmRzSGRoMDFLTUFmMURGS2h',
  signingKey: 'DDA-284b77ea-fcc2-40bd-aa0f-7d576c4ae8f5'
}

const device = {
  _id: '2f6f7c42-c09d-4001-82fe-0f8f478bd258',
  credential:  fs.readFileSync(path.join(process.cwd(), 'testdata/dda/dda-123456.pub')).toString('utf8'),
  privateKey: fs.readFileSync(path.join(process.cwd(), 'testdata/ssl/dda-key.pem')).toString('utf8'),
  cert: fs.readFileSync(path.join(process.cwd(), 'testdata/ssl/dda-cert.pem')).toString('utf8'),
  storageKey: fs.readFileSync(path.join(process.cwd(), 'testdata/dda/dda-123456.storagekey.pem')).toString('utf8')
}

const initdb = () => {
  return new Promise(async (resolve, reject) => {
    await User.create(user)
    await Device.create(device)
  })
}

initdb()
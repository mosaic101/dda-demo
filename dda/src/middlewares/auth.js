const debug = require('debug')('dda:auth')
const request = require('superagent')

const CLOUD_BASE_URL = 'http://localhost:3000'

module.exports = () => {
  return async (req, res, next) => {
    try {
      const deviceId = global.device ? global.device.id : '2f6f7c42-c09d-4001-82fe-0f8f478bd258'
      const ddaToken = req.query.ddaToken
      const response = await request
        .post(`${CLOUD_BASE_URL}/v1/token/check`)
        .send({
          deviceId: deviceId,
          ddaToken
        })
        .set('Accept', 'application/json')
        debug(11, response.body)
      if (response.status === 200 && !!response.body.data.checked) return next()
      return res.error('cloud authrization filed', 401)
    } catch (err) {
      debug('error: ', err)
      return res.error('cloud authrization filed', 401)
    }
  }
}
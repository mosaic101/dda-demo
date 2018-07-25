const debug = require('debug')('dda:auth')
const request = require('superagent')

const CLOUD_BASE_URL = 'http://localhost:3000'

module.exports = () => {
  return async (req, res, next) => {
    try {
      const deviceId = global.deviceId
      const ddaToken = req.headers.authorization
      const { clientId } = req.query
      const response = await request
        .post(`${CLOUD_BASE_URL}/v1/token/check`)
        .send({
          clientId,
          deviceId,
          ddaToken
        })
        .set('Accept', 'application/json')
      if (response.status === 200 && !!response.body.data.checked) return next()
      return res.error('cloud authrization filed', 401)
    } catch (err) {
      debug('error: ', err)
      return res.error('cloud authrization filed', 401)
    }
  }
}
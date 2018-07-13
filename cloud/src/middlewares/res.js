const debug = require('debug')('app:res')

const DEFAULT_SUCCESS_STATUS = 200
const DEFAULT_ERROR_STATUS = 403

//http code 
const httpCode = {
  200: 'ok',
  400: 'invalid parameters',
  401: 'Authentication failed',
  403: 'forbidden',
  404: 'not found',
  500: 'system error'
}

module.exports = (req, res, next) => {
  /**
  * success response
  * @param {any} data 
  * @param {number} status - default 200
  */
  res.success = (data, status) => {
    status = status || DEFAULT_SUCCESS_STATUS
    return res.status(status).json({
      url: req.originalUrl,
      code: 1,
      message: 'ok',
      data: data || null
    })
  }
  /**
	* error response
  * @param {any} error 
  * @param {number} status - default 403
  * @param {boolean} loggerFlag - default true
  */
  res.error = (error, status, loggerFlag) => {
    let code, message, data
    status = status || DEFAULT_ERROR_STATUS
    loggerFlag = loggerFlag === undefined ? true : !!loggerFlag
    if (error) {
      if (error instanceof Error) {
        code = error.code || status
        message = error.message
      } else if (typeof error === 'string') {
        // string
        code = status || 403
        message = error 
      } else if (status === 400) {
        // 400
        code = 400
        message = httpCode[status]
        data = error
      } else {
        // others
        code = error.code || status || 403
        message = error.message || httpCode[status] || 'forbidden'
      }
    }
    const response = {
      url: req.originalUrl,
      code: code,
      message: message,
      data: data
    }
    // show stack in production environment
    // if (getconfig['env'] === 'production' && loggerFlag) fundebug.notifyError(error)
    debug(`error: ${error}`)
    return res.status(status).json(response)
  }
  next()
}

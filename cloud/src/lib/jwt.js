const jwt = require('jwt-simple')

const DEFAULT_SECRET = 'DDA'
/**
 * JWT (JSON Web Token)
 * @class
 */
class Jwt {
	/**
	 * 加密
	 * @param {Object} payload
	 * @param {String} 
	 * @returns {Object} token
	 * @memberof Jwt
	 */
  encode(payload, SECRET) {
    // exp: default 30d
		payload.exp = Date.now() + 1000 * 3600 * 24 * 30
		SECRET = SECRET || DEFAULT_SECRET
    return jwt.encode(payload, SECRET)
  }
	/**
	 * 解密
	 * @param {Object} token 
	 * @returns {Object} decoded data
	 * @memberof Jwt
	 */
  decode(token, SECRET) {
		SECRET = SECRET || DEFAULT_SECRET
    return jwt.decode(token, SECRET)
  }
}


module.exports = new Jwt()
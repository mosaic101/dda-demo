const jwt = require('jwt-simple')

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
    return jwt.encode(payload, SECRET)
  }
	/**
	 * 解密
	 * @param {Object} token 
	 * @returns {Object} decoded data
	 * @memberof Jwt
	 */
  decode(token, SECRET) {
    return jwt.decode(token, SECRET)
  }
}


module.exports = new Jwt()
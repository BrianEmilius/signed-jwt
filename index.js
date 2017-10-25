const hmacSha = (message, secret) => {
	const crypto = require('crypto');
	const hmac = crypto.createHmac('sha512', secret);
	hmac.update(message);
	return hmac.digest('base64');
};

const createTokenData = function (customObj, validTime) {
	const crypto = require('crypto');
	const data = {
		'data': customObj,
		'expires': (new Date()).getTime() + validTime,
		'randomData': (crypto.randomBytes(24)).toString('base64')
	};
	return (JSON.stringify(data)).toString('base64');
};

/**
 * @class Token
 * @param {object} customObj - an object literal which contains customized information
 * @param {string} secret - secret key
 * @param {number} [validTime] - the amount of miliseconds the token is valid for. Defaults to 2592000000 (30 days)
 */
const Token = function (customObj, secret, validTime) {
	this.customObj = customObj;
	this.secret = secret;
	this.validTime = typeof validTime === 'undefined' || validTime === null || validTime < 0 ? 2592000000 : validTime;
	
	const tokendata64 = createTokenData(this.customObj, this.validTime);
	const signature = hmacSha(tokendata64, this.secret);
	return `${signature}~${tokendata64}`;
};

/**
 * validate
 * Checks if an access token is valid
 * @param {string} token - the access token
 * @param {string} secret - secret key
 * @returns {boolean}
 */
Token.validate = (token, secret) => {
	const parseToken = (token) => {
		const parts = token.split('~');
		const signature = parts[0];
		const data = parts[1];

		const verifySig = hmacSha(data, secret);
		const tokenInformation = {
			'data': JSON.parse(data),
			signature,
			'valid': false
		};

		if (signature === verifySig) {
			tokenInformation.valid = true;
		}
		return tokenInformation;
	};

	const parsed = parseToken(token);

	return parsed.valid && (new Date()).getTime() < parsed.data.expires;
};

module.exports = Token;
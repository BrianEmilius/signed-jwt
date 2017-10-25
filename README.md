# signed-jwt

Create and validate signed JSON Web Tokens using SHA-512.

## Usage

```JavaScript
const Token = require('signed-jwt');
const secret = 'iXytm8N6ZFmcWbCUfHC3u7mDmX4e0M1b';

const myToken = Token({ 'id': 1, 'role': 'admin' }, secret);

console.log(`Your token: ${myToken}`);

if (Token.validate(myToken, secret))
	console.log('Your token is valid!');
else
	console.log('Your token is not valid.');
```

## Documentation
<a name="Token"></a>

## Token
**Kind**: global class

* [Token](#Token)
    * [new Token(customObj, secret, [validTime])](#new_Token_new)
    * [.validate(token, secret)](#Token.validate) ⇒ <code>boolean</code>

<a name="new_Token_new"></a>

### new Token(customObj, secret, [validTime])

| Param | Type | Description |
| --- | --- | --- |
| customObj | <code>object</code> | an object literal which contains customized information |
| secret | <code>string</code> | secret key |
| [validTime] | <code>number</code> | the amount of miliseconds the token is valid for. Defaults to 2592000000 (30 days) |

<a name="Token.validate"></a>

### Token.validate(token, secret) ⇒ <code>boolean</code>
Checks if an access token is valid

**Kind**: static method of [<code>Token</code>](#Token)

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | the access token |
| secret | <code>string</code> | secret key |
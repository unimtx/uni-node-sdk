const pkg = require('../package.json')

export const DEFAULT_ENDPOINT = 'https://api.unimtx.com'
export const DEFAULT_SIGNING_ALGORITHM = 'hmac-sha256'
export const REQUEST_ID_HEADER_KEY = 'x-uni-request-id'
export const USER_AGENT = `uni-node-sdk/${pkg.version}`

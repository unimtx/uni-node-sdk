import createHmac, { Algorithm } from 'create-hmac'

export class UniSigner {
  algorithm: Algorithm
  key: string

  constructor(opts: { algorithm: Algorithm; key: string }) {
    const { algorithm, key } = opts
    this.algorithm = algorithm
    this.key = key
  }

  createSignature(strToSign: string, encoding: 'base64' | 'hex' = 'base64') {
    return createHmac(this.algorithm, this.key).update(strToSign).digest(encoding)
  }
}

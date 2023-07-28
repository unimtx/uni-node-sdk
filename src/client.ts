import axios, { AxiosResponse } from 'axios'
import { ENV, DEFAULT_ENDPOINT, DEFAULT_SIGNING_ALGORITHM, REQUEST_ID_HEADER_KEY, USER_AGENT } from './constant'
import { UniSigner } from './signer'
import { UniConfig, UniSigningAlgorithm } from './types'
import MessageService from './services/messages'
import OtpService from './services/otp'

export class UniRequestError extends Error {
  requestId?: string
  code: string
  status: number
  raw: any

  constructor(opts: { message: string; code: string | number; status: number; raw?: any }) {
    const { message, code, status, raw } = opts
    super(message)
    this.code = code + ''
    this.status = status || 0
    this.requestId = raw?.headers && raw.headers[REQUEST_ID_HEADER_KEY]

    Object.defineProperty(this, 'raw', {
      enumerable: false,
      writable: false,
      value: raw,
    })
  }
}

export class UniResponse {
  requestId: string
  code: string
  status: number
  data: any
  raw: any

  constructor(response: any) {
    this.code = response.data.code
    this.data = response.data.data
    this.status = response.status
    this.requestId = response.headers && response.headers[REQUEST_ID_HEADER_KEY]

    Object.defineProperty(this, 'raw', {
      enumerable: false,
      writable: false,
      value: response,
    })
  }
}

const validateStatus = (status: number) => {
  return status >= 200 && status < 300
}

export class UniClient {
  endpoint: string
  accessKeyId: string
  signingAlgorithm: UniSigningAlgorithm
  signer?: UniSigner
  userAgent: string
  messages: MessageService
  otp: OtpService

  constructor(config?: UniConfig) {
    const {
      accessKeyId = ENV.UNIMTX_ACCESS_KEY_ID,
      accessKeySecret = ENV.UNIMTX_ACCESS_KEY_SECRET,
      endpoint = ENV.UNIMTX_ENDPOINT,
      signingAlgorithm,
      userAgent,
    } = config || {}

    this.endpoint = endpoint || DEFAULT_ENDPOINT
    this.accessKeyId = accessKeyId as string
    this.signingAlgorithm = signingAlgorithm || DEFAULT_SIGNING_ALGORITHM
    this.userAgent = userAgent || USER_AGENT

    if (accessKeySecret) {
      this.signer = new UniSigner({
        // @ts-ignore
        algorithm: this.signingAlgorithm.split('-')[1],
        key: accessKeySecret,
      })
    }

    this.messages = new MessageService(this)
    this.otp = new OtpService(this)
  }

  private sign(query: any) {
    if (this.signer) {
      query.algorithm = this.signingAlgorithm
      query.timestamp = Date.now()
      query.nonce = Math.random().toString(16).substr(2)

      const strToSign = Object.keys(query)
        .sort()
        .map(k => `${k}=${encodeURIComponent(query[k])}`)
        .join('&')

      query.signature = this.signer.createSignature(strToSign)
    }

    return query
  }

  async request(action: string, data: any) {
    const query = {
      action,
      accessKeyId: this.accessKeyId,
    }
    let res: AxiosResponse<any>

    try {
      res = await axios({
        method: 'POST',
        url: this.endpoint,
        params: this.sign(query),
        headers: {
          'User-Agent': this.userAgent,
          'Content-Type': 'application/json;charset=utf-8',
          Accept: 'application/json',
        },
        data,
        validateStatus: () => true,
      })
    } catch (e) {
      throw new UniRequestError({
        code: -1,
        message: e.message,
        status: e.status,
        raw: e,
      })
    }

    if (res.data?.code != 0) {
      throw new UniRequestError({
        code: res.data.code,
        message: res.data.message,
        status: res.status,
        raw: res,
      })
    } else if (!validateStatus(res.status)) {
      throw new UniRequestError({
        code: -2,
        message: res.statusText,
        status: res.status,
        raw: res,
      })
    }

    return new UniResponse(res)
  }
}

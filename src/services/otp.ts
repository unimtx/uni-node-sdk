import { UniClient, UniResponse } from '../client'
import { UniMessage } from './messages'

type OtpChannel = 'auto' | 'sms' | 'call' | 'voice' | 'whatsapp'

export type OtpSendParams = {
  to: string
  code?: string
  ttl?: number
  digits?: number
  intent?: string
  channel?: OtpChannel
  signature?: string
  templateId?: string
}

export type OtpVerifyParams = {
  to: string
  code: string
  ttl?: number
  intent?: string
}

export interface OtpSendResponse extends UniResponse {
  data: UniMessage
}

export interface OtpVerifyResponse extends UniResponse {
  data: {
    to: string
    valid: boolean
  } | undefined
  valid: boolean
}

export default class OtpService {
  client: UniClient

  constructor(client: UniClient) {
    this.client = client
  }

  send(params: OtpSendParams): Promise<OtpSendResponse> {
    return this.client.request('otp.send', params)
  }

  async verify(params: OtpVerifyParams): Promise<OtpVerifyResponse> {
    const res = (await this.client.request('otp.verify', params)) as OtpVerifyResponse
    res.valid = res.data?.valid === true
    return res
  }
}

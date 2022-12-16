import { UniClient, UniResponse } from '../client'

type KVMap = { [key: string]: string | number }

export type SendByTemplateParams = {
  to: string | string[]
  signature: string
  templateId: string
  templateData?: KVMap
}

export type SendByContentParams = {
  to: string | string[]
  signature: string
  content: string
  templateData?: KVMap
}

export type SendByTextParams = {
  to: string | string[]
  text: string
}

export type SendParams = SendByTemplateParams | SendByContentParams | SendByTextParams

export interface UniMessage {
  id: string
  to: string
  iso: string
  cc: string
  count: number
  price: string
}

export interface SendResponse extends UniResponse {
  data: {
    recipients: number
    messageCount: number
    currency: string
    totalAmount: string
    messages: UniMessage[]
  }
}

export default class MessageService {
  client: UniClient

  constructor(client: UniClient) {
    this.client = client
  }

  send(params: SendParams): Promise<SendResponse> {
    return this.client.request('sms.message.send', params)
  }
}

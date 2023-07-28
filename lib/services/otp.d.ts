import { UniClient, UniResponse } from '../client';
import { UniMessage } from './messages';
declare type OtpChannel = 'auto' | 'sms' | 'call' | 'voice' | 'whatsapp';
export declare type OtpSendParams = {
    to: string;
    code?: string;
    ttl?: number;
    digits?: number;
    intent?: string;
    channel?: OtpChannel;
    signature?: string;
    templateId?: string;
};
export declare type OtpVerifyParams = {
    to: string;
    code: string;
    ttl?: number;
    intent?: string;
};
export interface OtpSendResponse extends UniResponse {
    data: UniMessage;
}
export interface OtpVerifyResponse extends UniResponse {
    data: {
        to: string;
        valid: boolean;
    } | undefined;
    valid: boolean;
}
export default class OtpService {
    client: UniClient;
    constructor(client: UniClient);
    send(params: OtpSendParams): Promise<OtpSendResponse>;
    verify(params: OtpVerifyParams): Promise<OtpVerifyResponse>;
}
export {};

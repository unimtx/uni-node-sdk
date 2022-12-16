import { UniClient, UniResponse } from '../client';
declare type KVMap = {
    [key: string]: string | number;
};
export declare type SendByTemplateParams = {
    to: string | string[];
    signature: string;
    templateId: string;
    templateData?: KVMap;
};
export declare type SendByContentParams = {
    to: string | string[];
    signature: string;
    content: string;
    templateData?: KVMap;
};
export declare type SendByTextParams = {
    to: string | string[];
    text: string;
};
export declare type SendParams = SendByTemplateParams | SendByContentParams | SendByTextParams;
export interface UniMessage {
    id: string;
    to: string;
    iso: string;
    cc: string;
    count: number;
    price: string;
}
export interface SendResponse extends UniResponse {
    data: {
        recipients: number;
        messageCount: number;
        currency: string;
        totalAmount: string;
        messages: UniMessage[];
    };
}
export default class MessageService {
    client: UniClient;
    constructor(client: UniClient);
    send(params: SendParams): Promise<SendResponse>;
}
export {};

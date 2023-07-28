import { UniSigner } from './signer';
import { UniConfig, UniSigningAlgorithm } from './types';
import MessageService from './services/messages';
import OtpService from './services/otp';
export declare class UniRequestError extends Error {
    requestId?: string;
    code: string;
    status: number;
    raw: any;
    constructor(opts: {
        message: string;
        code: string | number;
        status: number;
        raw?: any;
    });
}
export declare class UniResponse {
    requestId: string;
    code: string;
    status: number;
    data: any;
    raw: any;
    constructor(response: any);
}
export declare class UniClient {
    endpoint: string;
    accessKeyId: string;
    signingAlgorithm: UniSigningAlgorithm;
    signer?: UniSigner;
    userAgent: string;
    messages: MessageService;
    otp: OtpService;
    constructor(config?: UniConfig);
    private sign;
    request(action: string, data: any): Promise<UniResponse>;
}

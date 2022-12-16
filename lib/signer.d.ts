import { Algorithm } from 'create-hmac';
export declare class UniSigner {
    algorithm: Algorithm;
    key: string;
    constructor(opts: {
        algorithm: Algorithm;
        key: string;
    });
    createSignature(strToSign: string, encoding?: 'base64' | 'hex'): string;
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniSigner = void 0;
const create_hmac_1 = __importDefault(require("create-hmac"));
class UniSigner {
    constructor(opts) {
        const { algorithm, key } = opts;
        this.algorithm = algorithm;
        this.key = key;
    }
    createSignature(strToSign, encoding = 'base64') {
        return create_hmac_1.default(this.algorithm, this.key).update(strToSign).digest(encoding);
    }
}
exports.UniSigner = UniSigner;
//# sourceMappingURL=signer.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniClient = exports.UniResponse = exports.UniRequestError = void 0;
const axios_1 = __importDefault(require("axios"));
const constant_1 = require("./constant");
const signer_1 = require("./signer");
const messages_1 = __importDefault(require("./services/messages"));
const otp_1 = __importDefault(require("./services/otp"));
class UniRequestError extends Error {
    constructor(opts) {
        const { message, code, status, raw } = opts;
        super(message);
        this.code = code + '';
        this.status = status || 0;
        this.requestId = (raw === null || raw === void 0 ? void 0 : raw.headers) && raw.headers[constant_1.REQUEST_ID_HEADER_KEY];
        Object.defineProperty(this, 'raw', {
            enumerable: false,
            writable: false,
            value: raw,
        });
    }
}
exports.UniRequestError = UniRequestError;
class UniResponse {
    constructor(response) {
        this.code = response.data.code;
        this.data = response.data.data;
        this.status = response.status;
        this.requestId = response.headers && response.headers[constant_1.REQUEST_ID_HEADER_KEY];
        Object.defineProperty(this, 'raw', {
            enumerable: false,
            writable: false,
            value: response,
        });
    }
}
exports.UniResponse = UniResponse;
const validateStatus = (status) => {
    return status >= 200 && status < 300;
};
class UniClient {
    constructor(config) {
        const { accessKeyId = constant_1.ENV.UNIMTX_ACCESS_KEY_ID, accessKeySecret = constant_1.ENV.UNIMTX_ACCESS_KEY_SECRET, endpoint = constant_1.ENV.UNIMTX_ENDPOINT, signingAlgorithm, userAgent, } = config || {};
        this.endpoint = endpoint || constant_1.DEFAULT_ENDPOINT;
        this.accessKeyId = accessKeyId;
        this.signingAlgorithm = signingAlgorithm || constant_1.DEFAULT_SIGNING_ALGORITHM;
        this.userAgent = userAgent || constant_1.USER_AGENT;
        if (accessKeySecret) {
            this.signer = new signer_1.UniSigner({
                algorithm: this.signingAlgorithm.split('-')[1],
                key: accessKeySecret,
            });
        }
        this.messages = new messages_1.default(this);
        this.otp = new otp_1.default(this);
    }
    sign(query) {
        if (this.signer) {
            query.algorithm = this.signingAlgorithm;
            query.timestamp = Date.now();
            query.nonce = Math.random().toString(16).substr(2);
            const strToSign = Object.keys(query)
                .sort()
                .map(k => `${k}=${encodeURIComponent(query[k])}`)
                .join('&');
            query.signature = this.signer.createSignature(strToSign);
        }
        return query;
    }
    request(action, data) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                action,
                accessKeyId: this.accessKeyId,
            };
            let res;
            try {
                res = yield axios_1.default({
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
                });
            }
            catch (e) {
                throw new UniRequestError({
                    code: -1,
                    message: e.message,
                    status: e.status,
                    raw: e,
                });
            }
            if (((_a = res.data) === null || _a === void 0 ? void 0 : _a.code) != 0) {
                throw new UniRequestError({
                    code: res.data.code,
                    message: res.data.message,
                    status: res.status,
                    raw: res,
                });
            }
            else if (!validateStatus(res.status)) {
                throw new UniRequestError({
                    code: -2,
                    message: res.statusText,
                    status: res.status,
                    raw: res,
                });
            }
            return new UniResponse(res);
        });
    }
}
exports.UniClient = UniClient;
//# sourceMappingURL=client.js.map
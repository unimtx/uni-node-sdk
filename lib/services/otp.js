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
Object.defineProperty(exports, "__esModule", { value: true });
class OtpService {
    constructor(client) {
        this.client = client;
    }
    send(params) {
        return this.client.request('otp.send', params);
    }
    verify(params) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const res = (yield this.client.request('otp.verify', params));
            res.valid = ((_a = res.data) === null || _a === void 0 ? void 0 : _a.valid) === true;
            return res;
        });
    }
}
exports.default = OtpService;
//# sourceMappingURL=otp.js.map
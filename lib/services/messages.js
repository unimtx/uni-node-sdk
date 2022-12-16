"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessageService {
    constructor(client) {
        this.client = client;
    }
    send(params) {
        return this.client.request('sms.message.send', params);
    }
}
exports.default = MessageService;
//# sourceMappingURL=messages.js.map
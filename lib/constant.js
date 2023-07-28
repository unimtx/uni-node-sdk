"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_AGENT = exports.REQUEST_ID_HEADER_KEY = exports.DEFAULT_SIGNING_ALGORITHM = exports.DEFAULT_ENDPOINT = exports.ENV = void 0;
const pkg = require('../package.json');
exports.ENV = typeof process === 'object' && typeof process.env === 'object' ? process.env : {};
exports.DEFAULT_ENDPOINT = 'https://api.unimtx.com';
exports.DEFAULT_SIGNING_ALGORITHM = 'hmac-sha256';
exports.REQUEST_ID_HEADER_KEY = 'x-uni-request-id';
exports.USER_AGENT = `uni-node-sdk/${pkg.version}`;
//# sourceMappingURL=constant.js.map
# Unimatrix Node.js SDK

[![Version](https://img.shields.io/npm/v/uni-sdk.svg)](https://www.npmjs.com/package/uni-sdk) [![Release](https://img.shields.io/github/release/unimtx/uni-node-sdk.svg)](https://github.com/unimtx/uni-node-sdk/releases/latest) [![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/unimtx/uni-node-sdk/blob/main/LICENSE)

The Unimatrix Node.js SDK provides convenient access to integrate communication capabilities into your Node.js applications using the Unimatrix HTTP API. The SDK provides support for sending SMS, 2FA verification, and phone number lookup.

## Getting started

Before you begin, you need an [Unimatrix](https://www.unimtx.com/) account. If you don't have one yet, you can [sign up](https://www.unimtx.com/signup?s=node.sdk.gh) for an Unimatrix account and get free credits to get you started.

## Documentation

Check out the documentation at [unimtx.com/docs](https://www.unimtx.com/docs) for a quick overview.

## Installation

The recommended way to install the Unimatrix SDK for Node.js is to use the npm package manager, which is available on [npm](https://www.npmjs.com/package/uni-sdk).

Run the following command to add `uni-sdk` as a dependency to your project:

```bash
npm i uni-sdk
```

or use Yarn:
```bash
yarn add uni-sdk
```

## Usage

The following example shows how to use the Unimatrix Node.js SDK to interact with Unimatrix services.

### Send SMS

Send a text message to a single recipient.

```js

const { UniClient } = require('uni-sdk')

const client = new UniClient({
  accessKeyId: 'your access key id',
  accessKeySecret: 'your access key secret',
})

client.messages.send({
  to: 'your phone number', // in E.164 format
  signature: 'your sender name',
  content: 'Your verification code is 2048.',
})
  .then(ret => {
    console.log('Result:', ret)
  })
  .catch(e => {
    console.error(e)
  })

```

## Reference

### Other Unimatrix SDKs

To find Unimatrix SDKs in other programming languages, check out the list below:

- [Java](https://github.com/unimtx/uni-java-sdk)
- [Go](https://github.com/unimtx/uni-go-sdk)
- [Python](https://github.com/unimtx/uni-python-sdk)
- [PHP](https://github.com/unimtx/uni-php-sdk/)
- [Ruby](https://github.com/unimtx/uni-ruby-sdk)
- [.NET](https://github.com/unimtx/uni-dotnet-sdk)

## License

This library is released under the [MIT License](https://github.com/unimtx/uni-node-sdk/blob/main/LICENSE).

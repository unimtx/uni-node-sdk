const { UniClient } = require('../lib')

// initialization
const client = new UniClient({
  accessKeyId: 'your access key id',
  accessKeySecret: 'your access key secret',
})

// send a text message to a single recipient
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

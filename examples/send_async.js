const { UniClient } = require('../lib')

// initialization
const client = new UniClient({
  accessKeyId: 'your access key id',
  accessKeySecret: 'your access key secret'
})

;(async () => {
  // send a text message to a single recipient
  try {
    const ret = await client.messages.send({
      to: 'your phone number', // in E.164 format
      text: 'Your verification code is 2048.'
    })
    console.log('Result:', ret)
  } catch (e) {
    console.error(e)
  }

})()

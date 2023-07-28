const { UniClient } = require('../lib')

// initialization
const client = new UniClient({
  accessKeyId: 'your access key id',
  accessKeySecret: 'your access key secret'
})

;(async () => {
  // send a verification code to a recipient
  try {
    const ret = await client.otp.send({
      to: 'your phone number' // in E.164 format
    })
    console.log('Result:', ret)
  } catch (e) {
    console.error(e)
  }

  // verify a verification code
  try {
    const { valid } = await client.otp.verify({
      to: 'your phone number', // in E.164 format
      code: 'the code you received'
    })
    console.log('Valid:', valid)
  } catch (e) {
    console.error(e)
  }

})()


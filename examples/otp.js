const { UniClient } = require('../lib')

// initialization
const client = new UniClient({
  accessKeyId: 'your access key id',
  accessKeySecret: 'your access key secret'
})

// send a verification code to a recipient
client.otp.send({
  to: 'your phone number' // in E.164 format
})
  .then(ret => {
    console.log('Result:', ret)
  })
  .catch(e => {
    console.error(e)
  })

// verify a verification code
client.otp.verify({
  to: 'your phone number', // in E.164 format
  code: 'the code you received'
})
  .then(ret => {
    console.log('Valid:', ret.valid)
  })
  .catch(e => {
    console.error(e)
  })

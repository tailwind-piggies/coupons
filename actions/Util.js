const moment = require('moment')
const ALY = require('aliyun-sdk')

const crypto = require('crypto')

const sts = new ALY.STS({
  accessKeyId: 'LTAIQXU5hVE8CKy3',
  secretAccessKey: 'sAIWFp6TSwvnN0NUGYQuDuMWxFaUYD',
  endpoint: 'https://sts.aliyuncs.com',
  apiVersion: '2015-04-01'
})

module.exports = function(router) {
  router.get('/utils/aliyun/uploadtoken', async ctx => {
    ctx.body = await new Promise(resolve => {
      sts.assumeRole({
        Action: 'AssumeRole',
        RoleArn: 'acs:ram::1369455791263491:role/marketing',
        DurationSeconds: 900,
        RoleSessionName: 'RoleSessionName'
      }, function (err, res) {
        if (!err) {
          const aks = res.Credentials.AccessKeySecret
          const policy = new Buffer(JSON.stringify({
            expiration: moment(moment().valueOf() + 15 * 60 * 1000),
            conditions: [{
              bucket: 'planetoid'
            }]
          })).toString('base64')
          const signature = new Buffer(crypto.createHmac('sha1', aks).update(policy).digest()).toString('base64')

          resolve({
            success: true,
            data: {
              akId: res.Credentials.AccessKeyId,
              token: res.Credentials.SecurityToken,
              policy,
              signature
            }
          })
        } else {
          resolve({
            success: false,
            err
          })
        }
      })
    })
  })
}

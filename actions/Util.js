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
          const date = `${moment().utc().format('ddd, DD MMM YYYY hh:mm:ss')} GMT`
          const filename = new Buffer(date).toString('base64')
          const fileType = ctx.request.query.type || ''
          const aks = res.Credentials.AccessKeySecret
          const akid = res.Credentials.AccessKeyId
          const st = res.Credentials.SecurityToken
          const args =
`PUT

${fileType}
${date}
x-oss-security-token:${st}
/planetoid/${filename}`
          const sign = new Buffer(crypto.createHmac('sha1', aks).update(args).digest()).toString('base64')

          resolve({
            success: true,
            data: {
              token: res,
              authorization: `OSS ${akid}:${sign}`,
              date,
              filename,
              fileType
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

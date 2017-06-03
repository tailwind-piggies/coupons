const ALY = require('aliyun-sdk')

const sts = new ALY.STS({
  accessKeyId: 'LTAIQXU5hVE8CKy3',
  secretAccessKey: 'sAIWFp6TSwvnN0NUGYQuDuMWxFaUYD',
  endpoint: 'https://sts.aliyuncs.com',
  apiVersion: '2015-04-01'
})

module.exports = function(router) {
  router.get('/utils/aliyun/sts/token', async ctx => {
    ctx.body = await new Promise(resolve => {
      sts.assumeRole({
        Action: 'AssumeRole',
        RoleArn: 'acs:ram::1369455791263491:role/marketing',
        DurationSeconds: 900,
        RoleSessionName: 'RoleSessionName'
      }, function (err, res) {
        if (!err) {
          resolve({
            success: true,
            data: {
              token: res
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

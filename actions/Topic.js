// Import controller
const topicController = require('../controllers/Topic')

module.exports = function(router) {
  router.get('/topics', async ctx => {
    ctx.body = await topicController.getTopics({
      offset: ctx.query.offset || 0,
      limit: ctx.query.limit || 10
    })
  })

  router.post('/topics', async ctx => {
    ctx.body = await topicController.postTopic({
      title: ctx.request.body.title,
      content: ctx.request.body.content || null
    })
  })

  router.put('/topics/:id', async ctx => {
    ctx.body = await topicController.putTopic({
      _id: ctx.params.id,
      title: ctx.request.body.title,
      content: ctx.request.body.content || null
    })
  })

  router.delete('/topics/:id', async ctx => {
    ctx.body = await topicController.deleteTopic({
      _id: ctx.params.id
    })
  })

  router.put('/topics/:id/online', async ctx => {
    ctx.body = await topicController.putTopicOnline({
      _id: ctx.params.id,
      online: true
    })
  })

  router.put('/topics/:id/offline', async ctx => {
    ctx.body = await topicController.putTopicOnline({
      _id: ctx.params.id,
      online: false
    })
  })
}

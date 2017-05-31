const mongoose = require('mongoose')

module.exports = function (router) {
  // Register model
  const Topic = mongoose.model('Topic', new mongoose.Schema(require('../model/Topic')))

  // Register model actions
  router.get('/topics', async ctx => {
    const offset = parseInt(ctx.query.offset) || 0
    const limit = parseInt(ctx.query.limit) || 10

    ctx.body = await Topic.find().limit(limit).skip(offset).then((topics, err) => {
      if (!err) {
        return {
          success: true,
          pagination: {
            offset,
            limit
          },
          data: {
            topics
          }
        }
      } else {
        return err
      }
    })
  })

  router.post('/topics', async ctx => {
    const topic = new Topic()

    topic.title = ctx.request.body.title
    topic.content = ctx.request.body.content || null

    ctx.body = await topic.save().then((topic, err) => {
      if (!err) {
        return {
          success: true,
          data: {
            topic
          }
        }
      } else {
        return err
      }
    })
  })

  router.put('/topics/:id', async ctx => {
    ctx.body = await Topic.findOneAndUpdate({
      _id: ctx.params.id
    }, {
      title: ctx.request.body.title,
      content: ctx.request.body.content || null
    }).then((topic, err) => {
      if (!err) {
        return {
          success: true,
          data: Object.assign(topic, {
            title: ctx.request.body.title,
            content: ctx.request.body.content || null
          })
        }
      } else {
        return err
      }
    })
  })
}

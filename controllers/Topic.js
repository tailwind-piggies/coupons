const mongoose = require('mongoose')

// Register model
const Topic = mongoose.model('Topic', new mongoose.Schema(require('../models/Topic')))

function responseFactory(res, err) {
  if (!err) {
    return Object.assign(res, {
      success: true
    })
  } else {
    return {
      success: false,
      err
    }
  }
}

function getTopics({
  offset,
  limit
}) {
  const query = Topic.find().sort({createTime: -1}).limit(limit).skip(offset)

  return query.then((topics, err) => {
    return responseFactory({
      data: {
        topics
      },
      pagination: {
        offset,
        limit
      }
    }, err)
  })
}

async function postTopic({
  title,
  content
}) {
  const query = Topic.create({
    title,
    content
  })

  return query.then((topic, err) => {
    return responseFactory({
      data: {
        topic
      }
    }, err)
  })
}

async function putTopic({
  _id,
  title,
  content
}) {
  const query = Topic.findOneAndUpdate({
    _id
  }, {
    title,
    content
  }, {
    new: true
  })

  return query.then((topic, err) => {
    return responseFactory({
      data: {
        topic
      }
    }, err)
  })
}

async function putTopicOnline({
  _id,
  online
}) {
  const query = Topic.findOneAndUpdate({
    _id
  }, {
    online
  }, {
    new: true
  })

  return query.then((topic, err) => {
    return responseFactory({
      data: {
        topic
      }
    }, err)
  })
}

function deleteTopic({
  _id
}) {
  const query = Topic.findOneAndRemove({
    _id
  })

  return query.then((topic, err) => {
    return responseFactory({
      data: {
        topic
      }
    }, err)
  })
}

module.exports = {
  getTopics,
  postTopic,
  putTopic,
  putTopicOnline,
  deleteTopic
}

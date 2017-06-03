// Import libs
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const Koa = require('koa')
const KoaRouter = require('koa-router')
const bodyParser = require('koa-bodyparser')

// Connect db
mongoose.connect('mongodb://localhost:27017/coupons')

// New app
const app = new Koa()
const apiRouter = new KoaRouter({
  prefix: '/api'
})

// Import modules
const topicAction = require('./actions/Topic')
topicAction(apiRouter)

// Start
app
  .use(bodyParser())
  .use(apiRouter.routes())
  .listen(10080)

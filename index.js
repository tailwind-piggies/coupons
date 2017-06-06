// Import libs
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const Koa = require('koa')
const KoaRouter = require('koa-router')
const bodyParser = require('koa-bodyparser')

// Connect db
mongoose.connect('mongodb://localhost:27017/coupons')

// Use port
const port = {
  development: '10101',
  production: '10100'
}[process.env.NODE_ENV]

// New app
const app = new Koa()
const apiRouter = new KoaRouter({
  prefix: '/api'
})

// Import modules
const topicAction = require('./actions/Topic')
const utilAction = require('./actions/Util')
topicAction(apiRouter)
utilAction(apiRouter)

// Start
app
  .use(bodyParser())
  .use(apiRouter.routes())
  .listen(port)

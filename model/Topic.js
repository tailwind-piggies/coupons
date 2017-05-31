module.exports = {
  title: {
    type: String,
    default: ''
  },
  content: {
    type: Object,
    default: null
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
}

module.exports = {
  title: {
    type: String,
    default: ''
  },
  content: {
    type: Object,
    default: null
  },
  online: {
    type: Boolean,
    default: false
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  },
  stick: {
    type: Boolean,
    default: false
  }
}

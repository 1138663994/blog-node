const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messageSchema = new Schema({
  fromId: {
    type: Schema.Types.ObjectId,
    ref: 'article',
    require: true
  },
  name: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  email: {
    type: String
  },
  createTime: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('mongoose', messageSchema)

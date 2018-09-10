const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DiarySchema = new Schema({
  createTime: {
    type: String,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  content: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('diary', DiarySchema)

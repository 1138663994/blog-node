const mongoose = require('mongoose')
const Schema = mongoose.Schema
const date = new Date()
var moment = require('moment')
let time = moment(new Date()).format('YYYY-MM-DD H:mm:ss')
const articleSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  author: {
    type: String,
    require: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  pv: {
    type: Number,
    default: 0
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'articleCategory'
  },
  meta: {
    createdAt: {
      type: String,
      default: moment(new Date()).format('YYYY-MM-DD H:mm:ss')
    },
    updatedAt: {
      type: String,
      default: moment(new Date()).format('YYYY-MM-DD H:mm:ss')
    }
  }
})

articleSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = moment(new Date()).format('YYYY-MM-DD H:mm:ss')
  } else {
    this.meta.updatedAt = moment(new Date()).format('YYYY-MM-DD H:mm:ss')
  }
  next()
})

module.exports = mongoose.model('article', articleSchema)

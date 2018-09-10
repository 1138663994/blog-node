const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

articleSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

module.exports = mongoose.model('article', articleSchema)

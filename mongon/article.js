const mongoose = require('mongoose')
const Schema = mongoose.Schema
const date = new Date()
console.log('date', date.getTime())
console.log('date', date)
console.log('date', new Date(date.getTime()+8*60*60*1000))
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
      default: new Date(date.getTime()+8*60*60*1000)
    },
    updatedAt: {
      type: Date,
      default: new Date(date.getTime()+8*60*60*1000)
    }
  }
})

articleSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = new Date(date.getTime()+8*60*60*1000)
  } else {
    this.meta.updatedAt = new Date(date.getTime()+8*60*60*1000)
  }
  next()
})

module.exports = mongoose.model('article', articleSchema)

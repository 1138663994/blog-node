const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: 'string',
    required: true
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    }
  }
})

module.exports = mongoose.model('User', UserSchema) // 会自动生成一个叫users的mongondb集合

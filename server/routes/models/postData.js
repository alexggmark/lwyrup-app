const mongoose = require('mongoose')

const postData = new mongoose.Schema({
  title: String,
  content: String,
  updated_date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('posts', postData)
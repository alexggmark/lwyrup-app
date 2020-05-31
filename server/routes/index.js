const routes = require('express').Router()
const mongoose = require('mongoose')
const postData = require('./models/postData.js')

routes.get('/test', (req, res) => {
  postData.find((err, posts) => {
    res.json(posts)
  })
})

routes.post('/test', (req, res) => {
  postData.create(req.body, (err, post) => {
    res.json(post)
  })
})

routes.delete('/test/:id', (req, res) => {
  postData.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    res.json(post)
  })
})

routes.get('/test2', (req, res) => {
  res.json('Oh my lord this also werk')
})

module.exports = routes
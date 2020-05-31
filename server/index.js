const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const fs = require('fs')
const path = require('path')
const https = require('https')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

const options = config.dev ? {
    key: fs.readFileSync(path.resolve(__dirname, './devCerts/server.key')),
    cert: fs.readFileSync(path.resolve(__dirname, './devCerts/server.crt'))
  } : {}

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  https
    .createServer(options, app)
    .listen(port, () => {
      console.log('Running server')
    })
  // app
  //   .listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()

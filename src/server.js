const path = require('path')

const express = require('express')
const morgan = require('morgan')

const app = express()
app.set('x-powered-by', false)
app.set('trust proxy', process.env.TRUST_PROXY || 'loopback')

app.on('droppedPrivileges', () => {
  app.set('views', path.resolve(__dirname, '..', 'views'))
  app.set('view engine', 'ejs')

  app.use(morgan('combined'))

  const routes = require('./routes')
  app.use('/register', routes.register)
  app.use('/api/auth', routes.api.auth)
  app.use('/api/up', routes.api.up)
  app.use('/api/hist', routes.api.hist)
  app.use('/', routes.viewfile)
})

module.exports = app

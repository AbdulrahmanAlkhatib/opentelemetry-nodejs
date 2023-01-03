/* eslint-disable no-unused-vars */
const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
require('express-async-errors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const tracing = require('./utils/tracer')
const monitoring = require('./utils/monitor')


const app = express()

const mongoose = require('mongoose')

const { tracer } = tracing('notes-service')
const { meter, requestCounter} = monitoring('notes-service')


logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then( () => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use((req, res, next) => {
  requestCounter.add(1, { environment: config.NODE_ENV })
  next()
})
app.use('/api/notes', notesRouter)
//app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
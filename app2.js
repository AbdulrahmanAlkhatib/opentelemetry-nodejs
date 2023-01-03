const express = require('express')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const cors = require('cors')
const http = require('http')
const tracing = require('./utils/tracer')

tracing('replies-service')

const replies = [
  {
    id: 1,
    content: 'first reply'
  },
  {
    id: 2,
    content: 'second reply'
  }
]
  
const app = express()

app.get('/', (req, res) => {
  res.status(200).send('This is Service B')
})

app.get('/replies', (req, res) => {
  res.status(200).json(replies)
})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

const server = http.createServer(app)

server.listen(config.PORT2, () => {
  logger.info('Server running on port 3020')
})



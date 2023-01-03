/* eslint-disable no-undef */
require('dotenv').config()

const PORT = process.env.PORT
const PORT2 = process.env.PORT2
const MONGODB_URI = process.env.MONGODB_URI
const TRACING_EXPORTER_URL = process.env.TRACING_EXPORTER_URL
const MONITORING_EXPORTER_URL = process.env.MONITORING_EXPORTER_URL
const NODE_ENV = process.env.NODE_ENV

module.exports = {
  PORT,
  PORT2,
  MONGODB_URI,
  TRACING_EXPORTER_URL,
  MONITORING_EXPORTER_URL,
  NODE_ENV
}
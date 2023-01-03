const { MeterProvider, PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics')
const { Resource } = require('@opentelemetry/resources')
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions')
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-http')
const config = require('../utils/config')

const monitoring = (serviceName) => {
// Define metrics
  const metricExporter = new OTLPMetricExporter({
    url: config.MONITORING_EXPORTER_URL,
  })
  const meterProvider = new MeterProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
  })
  meterProvider.addMetricReader(new PeriodicExportingMetricReader({
    exporter: metricExporter,
    exportIntervalMillis: 1000,
  }))
  const meter = meterProvider.getMeter(serviceName)

  const requestCounter = meter.createCounter('requests', {
    description: 'http requests counter',
  })

  return {meter, requestCounter}
}

module.exports = monitoring
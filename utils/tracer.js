const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node')
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base')
const { trace } = require('@opentelemetry/api')
const { Resource } = require('@opentelemetry/resources')
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions')
const { registerInstrumentations } = require('@opentelemetry/instrumentation')
const { ExpressInstrumentation } = require('opentelemetry-instrumentation-express')
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http')
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http')
const config = require('../utils/config')

const tracing = (serviceName) => {
    
  // Define traces
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName
    })
  })
  const traceExporter = new OTLPTraceExporter({
    url: config.TRACING_EXPORTER_URL,
  })
  provider.addSpanProcessor(new SimpleSpanProcessor(traceExporter))
  provider.register()
  registerInstrumentations({
    instrumentations: [
      new ExpressInstrumentation(),
      new HttpInstrumentation(),
    ],
    tracerProvider: provider,
  })
  const tracer = trace.getTracer(serviceName)
  
  return {tracer}

}

module.exports = tracing

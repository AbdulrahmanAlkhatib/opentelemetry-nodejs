# opentelemetry-nodejs
Observability demo project, demonstrating Observability using :
* NodeJS
* Opentelemetry
* Prometheus
* Jaeger

### Running the code
start by running the `command docker-compose up` to spin up all the needed services.

install all dependencies by running `npm install`

run both services 
* `npm run dev` to start notes service (service A)
* `node app2.js` to start service B

notes service has a UI that can be accessed at http://localhost:3001

send API call to the following endpoint: http://localhost:3001/api/notes/replies

#### important: service A uses mongodb, so you have to provide a valid MONGODB_URI in the environment variables file.

### View traces, logs and metrics:
* View metrics in prometheus at http://localhost:9090, search for "prom_requests" and itwill show the count of request received by notes-service
* View traces and logs in Jaeger at http://localhost:16686

'use strict';

var fs = require('fs'),
path = require('path'),
http = require('http');



var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var cors = require('cors');


// Cross Origin Requests - must have this, as we are an API.
// Without it, browsers running SPWAs from domains different to ours (e.g. github pages)
// will reject HTTP requests during pre-flight check.
app.use(cors());

var serverPort = process.env.PORT || 8080;
var PUSH_DOMAIN = process.env.PUSH_DOMAIN || null;
var PARK_DOMAIN = process.env.PARK_DOMAIN || null;
var SPWA_URL = process.env.SPWA_URL || null;
var database = require('./service/database');
var dbUrl = process.env.DATABASE_URL;

if( PUSH_DOMAIN && PARK_DOMAIN && SPWA_URL){
  console.log("Environment vars ok");
}
else{
  throw("Environment variables unset");
}

var stickerURLConfig = {PUSH_DOMAIN:PUSH_DOMAIN, PARK_DOMAIN:PARK_DOMAIN, SPWA_URL:SPWA_URL};
// database connection
database.initialise(dbUrl, stickerURLConfig, true);

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());



  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });
});
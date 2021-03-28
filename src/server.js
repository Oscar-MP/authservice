'use strict'

/**
 *  Autor: Sleider
 *  Date: 20/02/21
 *  Desription:
 */


var express     = require('express');
var bodyParser  = require('body-parser');
var helmet      = require('helmet');
var { handleError, logError }  = require('./common/middlewares/error-handler.middleware.js');
var { log_request } = require('./common/middlewares/request-logger.middleware.js')
const server    = express();

server.use(helmet());

// Helmet config
server.disable('x-powered-by');

// Here we will implement the cors
server.use(bodyParser.json());
server.use(bodyParser.urlencoded( {extended: true }));

server.use(log_request);

// Setting up the routes into the API
require('./routes.js').set_routes(server);

// Error handlers
server.use(logError, handleError);

module.exports = {server}

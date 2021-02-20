'use strict'

/**
 *  Autor: Sleider
 *  Date: 20/02/21
 *  Desription:
 */


var express     = require('express');
var bodyParser  = require('body-parser');
var helmet      = require('helmet');

const server    = express();

server.use(helmet());

// Here we will implement the cors

server.use(bodyParser.json());


module.exports = {server}

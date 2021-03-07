'use strict'

const { Logger } = require('../helpers/logger.js');
const chalk = require('chalk');

var log_request = (req, res, next) => {
  let message = chalk.bold(chalk.yellow('[REQUEST]: ')) +
                req.originalUrl + chalk.blue(`(${req.method})`) +
                chalk.bold(chalk.yellow(' [FROM]: ')) +
                `${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`;
  console.log(message);
  next();
}

module.exports = { log_request }

'use strict'

const chalk = require('chalk');
const { ErrorHandler } = require('./error.js');
const utils = require('../utils.js')

class Logger {

  constructor() {
    this.store_log = false;
  }

  static error (message, error, isCritical) {

    if ( error instanceof ErrorHandler && error.status === 404) {
      Logger.warning(message, error, false);
      return;
    }

    let output = chalk.bold('[!] ') + message;

    output = isCritical ? chalk.bgRed(chalk.white(output)) : chalk.red(output);

    console.log(output);

    Logger.print_error_info(error);
  }

  static info ( message, banner) {

    let output = chalk.bold('[-] ') + message;

    console.log((!banner ? chalk.blue(output) : chalk.bgBlue(chalk.white(output))));
  }

  static warning ( message, error, banner ) {

    try {
      let output = chalk.bold('[!] ') + message;

      output = banner ? chalk.bgYellow(chalk.red(output)) : chalk.yellow(output);

      console.log(output)

      Logger.print_error_info(error, 'warning');
    } catch (e){ console.log( 'FAILED AGAIN', e)}
  }

  static message ( message ) {

  }


  static print_error_info ( error, level) {

    level = level || 'error';

    if (!utils.isEmpty(error)) {
      let message = chalk.bold.red('[-] ');

      let error_message = utils.isEmpty(error.message) ? error : error.message;

      switch (level) {
        case 'error':
          message += chalk.italic.red(error.message);
          break;
        case 'warning':
          message += chalk.italic.yellow(error.message);
          break;
        case 'info':
          message += chalk.italic.blue(error.message);
          break;
      }

      console.log(message);

    }
  }
}

module.exports = { Logger }

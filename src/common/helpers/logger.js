'use strict'

const chalk = require('chalk');
const { ErrorHandler } = require('./error.js');
const { Utils } = require('../lib');
const Log = console.log;


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

    Log(output);

    Logger.print_error_info(error);
  }

  static info ( message, banner) {

    let output = chalk.bold('[-] ') + message;

    Log((!banner ? chalk.blue(output) : chalk.bgBlue(chalk.white(output))));
  }

  static warning ( message, error, banner ) {

    let output = chalk.bold('[!] ') + message;

    output = banner ? chalk.bgYellow(chalk.red(output)) : chalk.yellow(output);

    Log(output)

    Logger.print_error_info(error, 'warning');
  }

  static message ( message ) {

  }

  static success ( message ) {
    let output = chalk.green(chalk.bold('[*] ') + message);

    Log(output);

  }


  static print_error_info ( error, level) {

    level = level || 'error';

    if (!Utils.isEmpty(error)) {
      let header   = chalk.bold.red(' -  ');

      const colors = {
        error: 'red',
        warning: 'yellow',
        info: 'blue'
      };


      if ( error instanceof ErrorHandler && error.trace.length > 0) {
        // We will print the stack
        error.trace.forEach( (e) => {
          Log(chalk.italic[colors[level]](`${header}${e}`));
        });
      }

      let error_message = Utils.isEmpty(error.message) ? error : error.message;
      Log(chalk.italic[colors[level]](`${header}${error_message}`));
    }
  }
}

module.exports = { Logger }

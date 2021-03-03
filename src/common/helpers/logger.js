'use strict'

const chalk = require('chalk');
const { ErrorHandler } = require('./error.js');

class Logger {

  constructor() {
    this.store_log = false;
  }

  static error (message, error, isCritical) {

    let output = chalk.bold('[!] ') + message;

    output = isCritical ? chalk.bgRed(chalk.white(output)) : chalk.red(output);

    console.log(output);

    if (error) {
      if (error instanceof ErrorHandler) {
        console.log(chalk.red('[-] ') + chalk.bold(chalk.red(error.message)) + '\n') // Por terminar
      } else {
        console.log( chalk.red('[-] ') + (error.message ? chalk.bold(chalk.red(error.message)): error));
      }
    }
  }

  static info ( message, banner) {

    let output = chalk.bold('[-] ') + message;

    console.log((!banner ? chalk.blue(output) : chalk.bgBlue(chalk.white(output))));
  }
}

module.exports = { Logger }

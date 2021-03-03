'use strict'
const chalk = require('chalk');
const log = console.log;


module.exports = {
  info: ( msg ) => {
    console.log(chalk.bold.blue('[-] ') + chalk.blue(msg));
  },
  success: ( msg) => {
    console.log(chalk.green(chalk.bold('[*] ') + msg))
  },
  error: (msg) => {

  },
  warning: (msg) => {

  },
  banner: {
    info: ( msg ) => {

    },
    success: ( msg) => {

    },
    error: (msg) => {

    },
    warning: (msg) => {

    }
  }

};

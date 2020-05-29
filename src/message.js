const chalk = require('chalk');
const logSymbols = require('log-symbols');

exports.logError = data => {
	console.error(chalk.red(logSymbols.error, data));
};

exports.logInfo = data => {
	console.info(chalk.blue(logSymbols.info, data));
};

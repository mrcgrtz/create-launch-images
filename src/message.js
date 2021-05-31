import chalk from 'chalk';
import logSymbols from 'log-symbols';

export const logError = data => {
	console.error(chalk.red(logSymbols.error, data));
};

export const logInfo = data => {
	console.info(chalk.blue(logSymbols.info, data));
};

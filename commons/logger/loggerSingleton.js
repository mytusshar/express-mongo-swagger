const Logger = require('./logger');

class LoggerSingleton {
	constructor() {
		throw new Error('Use LoggerSingleton.getLogger()');
	}
	static getLogger() {
		if (!this.logger) {
			this.logger = new Logger();
		}
		return this.logger;
	}
}
module.exports = LoggerSingleton;

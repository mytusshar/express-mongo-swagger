class Logger {
	constructor() {}

	log({ message, details }) {
		message = message ?? arguments[0] ?? '(no message)';
		details = details ?? arguments[1] ?? '(no details)';
		console.log(
			'DEBUG:',
			`\n message: ${message}`,
			`\n details: ${details}`
		);
	}

	logError({ message, error }) {
		message = message ?? arguments[0] ?? '(no message)';
		error = error ?? arguments[1];
		const errorMessage = (error && error.message) ?? '(no error message)';
		const stack = (error && error.stack) ?? '(no error stack)';

		console.error(
			'ERROR:',
			`\n message: ${message}`,
			`\n errorMessage: ${errorMessage}`,
			`\n errorStack: ${stack}`
		);
	}

	logInfo({ message, details }) {
		message = message ?? arguments[0] ?? '(no message)';
		details = details ?? arguments[1] ?? '(no details)';
		console.info(
			'INFO:',
			`\n message: ${message}`,
			`\n details: ${details}`
		);
	}

	logWarn({ message, details }) {
		message = message ?? arguments[0] ?? '(no message)';
		details = details ?? arguments[1] ?? '(no details)';
		console.info(
			'WARN:',
			`\n message: ${message}`,
			`\n details: ${details}`
		);
	}
}

module.exports = Logger;

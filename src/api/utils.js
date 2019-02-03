const { send } = require("micro");

const sendError = (resp, mainMsg, err) => {
	// a validation or storage error that allready has a statusCode
	const error = {
		error: err.statusCode,
		message: `${mainMsg} : ${err.message}`,
		data: err.data
	};
	send(resp, err.statusCode || 500, error);
}

module.exports = { sendError }

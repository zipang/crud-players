const store = require("../store")("players");
const { send, createError, sendError } = require('micro');

/**
 * RETRIEVE A LIST OF PLAYERS
 */
module.exports = async (req, resp) => {

	try {
		// Retrieve the Players
		const players = await store.find();
		return players;
		// send(resp, 200, players);

	} catch (err) {
		if (err.statusCode) {
			// Probably a storage error with a nicely formatted message
			sendError(req, resp, err);

		} else {
			console.error(err);
			sendError(req, resp, createError(500, `Couldn't get these players`, err));
		}
	}
};

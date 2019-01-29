const store = require("../store")("players");
const { send, createError, sendError } = require('micro');

/**
 * RETRIEVE A SINGLE PLAYER
 */
module.exports = async (req, resp) => {

	const playerId = new URL(req.url).pathname.split("/").pop();

	try {

		// Retrieve the Player by its key
		const player = await store.get(playerId);

		if (!player) {
			send(resp, 404, `Player ${playerId} was not found`);
		} else {
			return player;
		}

	} catch (err) {
		if (err.statusCode) {
			// Probably a storage error with a nicely formatted message
			sendError(req, resp, err);

		} else {
			sendError(req, resp, createError(500, `Couldn't get that player ${playerId}`, err));
		}
	}
};

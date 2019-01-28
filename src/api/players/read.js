const store = require("../store")("players");
const { json, send, createError } = require('micro');

/**
 * RETRIEVE A SINGLE PLAYER
 */
module.exports = async (req, resp) => {

	try {
		const playerId = new URL(req.path).pathname.split("/").pop();

		// Retrieve the Player by its key
		const player = await store.get(playerId);

		if (!player) {
			send(resp, 404, `Player ${playerId} was not found`);
		} else {
			return player;
		}

	} catch (err) {
		// Probably a store error
		sendError(req, resp, createError(500, `Couldn't get that player ${playerId}`, err));
	}
};

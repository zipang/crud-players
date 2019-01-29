const store = require("../store")("players");
const { json, send, sendError, createError } = require('micro');

/**
 * UPDATE A SINGLE PLAYER
 */
module.exports = async (req, resp) => {

	try {
		// Get the body
		const playerData = await json(req);

		// Get the key
		const playerId = new URL(req.path).pathname.split("/").pop();

		// Retrieve the Player by its key
		await store.set(playerId);

		if (!player) {
			send(resp, 404, `Player ${playerId} was not found`);
		} else {
			return player;
		}

	} catch (err) {
		if (err instanceof ValidationError) {
			// a validation error that allready has a statusCode
			sendError(req, resp, err);
		} else {
			createError(500, `Update of Player ${playerId} failed`, err);
		}
	}
};

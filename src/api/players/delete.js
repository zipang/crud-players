const store = require("../store")("players");
const { send, createError, sendError } = require('micro');
const parseUrl = require("url").parse;

/**
 * DELETE A SINGLE PLAYER
 */
module.exports = async (req, resp) => {

	let playerId;

	try {
		playerId = parseUrl(req.url).pathname.split("/").pop();

		// Retrieve the Player by its key
		const deleted = await store.delete(playerId);

		if (!deleted) {
			send(resp, 404, `Player #${playerId} was not found`);
		} else {
			send(resp, 200, deleted);
		}

	} catch (err) {
		if (err.statusCode) {
			// Probably a storage error with a nicely formatted message
			sendError(req, resp, err);

		} else {
			sendError(req, resp, createError(500, `Delete action failed on player ${playerId}`, err));
		}
	}
};

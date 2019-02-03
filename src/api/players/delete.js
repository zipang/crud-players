const store = require("../store")("players");
const { send } = require("micro");
const { sendError } = require("../utils");
const parseUrl = require("url").parse;

/**
 * DELETE A SINGLE PLAYER
 */
module.exports = async (req, resp) => {
	let playerId;

	try {
		playerId = parseUrl(req.url)
			.pathname.split("/")
			.pop();

		// Retrieve the Player by its key
		const deleted = await store.delete(playerId);

		if (!deleted) {
			send(resp, 404, `Player #${playerId} was not found`);
		} else {
			send(resp, 200, deleted);
		}
	} catch (err) {
		sendError(resp, `Suppression of player ${playerId} failed`, err);
	}
};

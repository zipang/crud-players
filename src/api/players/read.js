const store = require("../store")("players");
const { send } = require("micro");
const { sendError } = require("../utils");
const parseUrl = require("url").parse;

/**
 * RETRIEVE A SINGLE PLAYER
 */
module.exports = async (req, resp) => {
	let playerId;

	try {
		playerId = parseUrl(req.url)
			.pathname.split("/")
			.pop();

		// Retrieve the Player by its key
		const player = await store.get(playerId);

		if (!player) {
			send(resp, 404, `Player #${playerId} was not found`);
		} else {
			send(resp, 200, player);
		}
	} catch (err) {
		sendError(resp, `Player ${playerId} couldn't be retrieved`, err);
	}
};

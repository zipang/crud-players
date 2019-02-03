const store = require("../store")("players");
const { json, send } = require("micro");
const { sendError } = require("../utils");
const parseUrl = require("url").parse;

/**
 * UPDATE A SINGLE PLAYER
 */
module.exports = async (req, resp) => {
	let playerId;

	try {
		// Get the body
		const playerData = await json(req);

		// Get the key
		playerId = parseUrl(req.url).pathname.split("/").pop();

		// Retrieve the Player by its key
		const player = await store.get(playerId);

		if (!player) {
			send(resp, 404, `Player ${playerId} was not found`);
		} else {
			const updated = await store.set(playerId, Object.assign(player, playerData));
			send(resp, 200, updated);
		}

	} catch (err) {
		sendError(resp, `Update of Player ${playerId} failed`, err);
	}
};

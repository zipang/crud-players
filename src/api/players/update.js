const store = require("../store")("players");
const { json, send, sendError, createError } = require("micro");
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
			return updated;
		}

	} catch (err) {
		if (err.statusCode) {
			// a validation or storage error that allready has a statusCode
			sendError(req, resp, err);
		} else {
			sendError(
				req,
				resp,
				createError(
					500,
					`Update of Player ${playerId} failed : ${err.message}`,
					err
				)
			);
		}
	}
};

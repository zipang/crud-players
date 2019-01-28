const store = require("../store")("players");
const { json, send, createError } = require('micro');

/**
 * CREATE A NEW PLAYER
 */
module.exports = async (req, resp) => {
	const data = await json(req);

	try {
		// Store the new item in the key-value store
		const newPlayer = await store.create(data);

		// Tell the client where the new ressource is located
		resp.setHeader(
			"Location",
			new URL(`/api/players/${newPlayer.id}`, "http://localhost:8080")
		);

		// Send HTTP Status 201 : CREATED
		send(resp, 201, newPlayer);

	} catch (err) {
		// Bad request
		sendError(req, resp, createError(400, "CREATION FAILED", err));
	}
};

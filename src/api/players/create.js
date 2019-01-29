const store = require("../store")("players");
const { json, send, sendError, createError } = require('micro');

/**
 * CREATE A NEW PLAYER
 */
module.exports = async (req, resp) => {

	try {
		// Get the POST body
		const data = await json(req);

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
		if (err.statusCode) {
			// a validation or storage error that allready has a statusCode
			sendError(req, resp, err);
		} else {
			// Bad request
			sendError(req, resp, createError(400, `Player creation failed : ${err.message}`, err));
		}
	}
};

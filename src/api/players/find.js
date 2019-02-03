const store = require("../store")("players");
const { send } = require("micro");
const { sendError } = require("../utils");


/**
 * RETRIEVE A LIST OF PLAYERS
 */
module.exports = async (req, resp) => {

	try {
		// Retrieve the Players
		const players = await store.find();
		send(resp, 200, players);

	} catch (err) {
		sendError(resp, `Couldn't get these players`, err);
	}
};

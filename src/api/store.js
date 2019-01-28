
const Store = require("../store");

/**
 * Return the store to be used depending of the environment variables
 */
module.exports = (collectionName) => {
	if (!process.env.PLAYER_API_SECRET) {
		console.log(`Delivering an in-memory data store for ${collectionName}`)
		return Store.get(collectionName);
	} else {
		return Store.get(collectionName, {
			db: "faunadb",
			faunadb: {
				secret: process.env.PLAYER_API_SECRET
			}
		});
	}
};

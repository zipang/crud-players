
const Store = require("../store");
const StorageError = require("../store/StorageError");

/**
 * Return the store to be used depending of the environment variables
 */
module.exports = (collectionName) => {
	if (!process.env.PLAYER_API_SECRET) {
		throw new Error("No player api secret !");
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

module.exports.StorageError = StorageError;

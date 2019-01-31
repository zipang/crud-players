const FaunaDbStore = require("../store/faunadb");
const InmemoryDbStore = require("../store/in-memory");
const StorageError = require("../store/StorageError");

/**
 * Return the store to be used depending of the environment variables
 */
module.exports = (collectionName) => {
	if (!process.env.PLAYERS_API_SECRET) {
		console.log(`Delivering an in-memory data store for ${collectionName}`);
		return InmemoryDbStore.create(collectionName);
	} else {
		return FaunaDbStore.create(collectionName, {
			secret: process.env.PLAYERS_API_SECRET,
		});
	}
};

module.exports.StorageError = StorageError;
module.exports.schema = (collectionName) =>
	require(`../models/${collectionName}/schema.json`);

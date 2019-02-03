const createStore  = require("../store");
const { validate } = require("../models");
const StorageError = require("../store/StorageError");

/**
 * Return the store to be used depending of the environment variables
 */
module.exports = (collectionName) => {

	// Retrieve the validation method linkde to this model
	const validateModel = validate(collectionName);

	if (!process.env.PLAYERS_API_SECRET) {
		console.log(`Delivering an in-memory data store for ${collectionName}`);
		return createStore(collectionName, {
			db: "in-memory",
			validate: validateModel
		});
	} else {
		return createStore(collectionName, {
			db: "faunadb",
			conf: {
				secret: process.env.PLAYERS_API_SECRET,
			},
			validate: validateModel
		});
	}
};

module.exports.StorageError = StorageError;
module.exports.schema = (collectionName) =>
	require(`../models/${collectionName}/schema.json`);

const DEFAULT_STORE = {
	db: 'in-memory',
	conf: {}
};
const StorageError = require("./StorageError");

const StoreFactory = {
	/**
	 * Retrieves (and create if needed) a datastore for the given domain
	 * @param {String} domain - name of the collection/model
	 * @param {Object} conf - a configuration object specific to every store implementation
	 */
	get: (domain, conf) => {

		// We'll have to create one
		store = Object.assign({}, DEFAULT_STORE, conf);

		// Load the store factory
		let storeAdapter;
		try {
			storeAdapter = require(`./${store.db}`);
		} catch (err) {
			throw new StorageError(domain, "load", null, `${store.db} data store is unknown`);
		}
		try {
			return storeAdapter.create(domain, conf);
		} catch (err) {
			throw new StorageError(domain, "init", null, `Initialisation of the ${store.db} data store failed : ${err.message}`);
		}
	}
}

module.exports = StoreFactory;


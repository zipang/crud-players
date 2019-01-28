const DEFAULT_STORE = {
	db: 'in-memory',
	conf: {}
};
const stores = {};

/**
 * Retrieves (and create if needed) a datastore for the given domain
 * @param {String} domain - name of the collection/model
 * @param {Object} conf - a configuration object specific to every store implementation
 */
const Store = {
	get: (domain, conf) => {

		let store = stores[domain]; // access loaded stores

		if (!store) {
			// We'll have to create one
			store = Object.assign({}, DEFAULT_STORE, conf);
			// Load the store factory
			let storeFactory;
			try {
				storeFactory = require(`./${store.db}`);
			} catch (err) {
				throw new Error(`${store.db} data store is unknown`);
			}
			stores[domain] = store = storeFactory.create(domain, store[conf]);
		}

		return store;
	}
}

module.exports = Store;

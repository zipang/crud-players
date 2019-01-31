const DEFAULT_STORE = {
	db: "in-memory",
	conf: {},
};
const StorageError = require("./StorageError");

const StoreFactory = {

	/**
	 * Create a datastore for the given domain and with a specific adapter
	 * @param {String} domain - name of the collection/model
	 * @param {Object} spec - an object containing the name and conf
	 *                        of the adapter to use :
	 *   - db {String}
	 *   - conf {Object}
	 *   - data {Array}
	 */
	get: (domain, spec) => {
		// Which store should we create ?
		const { db, conf, data } = Object.assign({}, DEFAULT_STORE, spec);

		// Step 1. Load the store adapter
		let storeAdapter;
		try {
			storeAdapter = require(`./${db}`);
		} catch (err) {
			throw new StorageError(domain, "load", null,
				`${db} data store is unknown`
			);
		}
		// Step 2. Create the store for the specific domain
		try {
			let storeInst = storeAdapter.create(domain, conf);
			// Step 3. If some data is provided (key => value), load it
			if (typeof data === "object") {
				// Add suplied data
				Object.keys(data).forEach((key) => {
					storeInst.set(key, data[key]);
				});
			}
			return storeInst;
		} catch (err) {
			throw new StorageError(domain, "init", null,
				`Initialisation of the ${store.db} data store failed :
				${err.message}`
			);
		}
	}
};

module.exports = StoreFactory;

const DEFAULT_STORE = {
	db: "in-memory",
	conf: {},
};
const StorageError = require("./StorageError");

/**
 * Create a datastore for the given domain and with a specific adapter
 * @param {String} domain - name of the collection/model
 * @param {Object} spec - an object containing the name and conf
 *                        of the adapter to use :
 *   - db {String} name of the store adapter
 *   - conf {Object} configuration needed to connect to the store
 *   - data {Array}
 *   - validate {Function}
 */
module.exports = (domain, spec) => {
	// Which store should we create ?
	const { db, conf, data, validate } = Object.assign({}, DEFAULT_STORE, spec);

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
		let store = addValidatingLayer(
			storeAdapter(domain, conf),
			validate
		);

		// add some aliases for a more convenient API (?)
		store.add = store.create;
		store.update = store.set;

		// Step 3. If some data is provided (key => value), load it
		if (typeof data === "object") {
			// Add suplied data
			Object.keys(data).forEach((key) => {
				store.set(key, data[key]);
			});
		}
		return store;
	} catch (err) {
		throw new StorageError(domain, "init", null,
			`Initialisation of the ${db} data store failed :
			${err.message}`
		);
	}
};

/**
 * Decorate the store so that the create and update methods validate the data
 * @param {Store} store
 * @param {Function} validate
 */
function addValidatingLayer(store, validate) {

	if (typeof validate === "function") {
		const { create, set, get } = store;

		store.create = async (data) => {
			if (!data.id) data.id = "temporaryId";
			validate(data);
			return await create(data);
		}
		store.set = async (key, data) => {
			const updated = Object.assign({}, get(key), data);
			validate(updated);
			return await set(key, updated);
		}
	}
	return store;
}

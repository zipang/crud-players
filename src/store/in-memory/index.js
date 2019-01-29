/**
 * Creates a new in-memory data store
 * @param {Object} conf
 * @return {Store}
 */
const create = (domain, conf) => {
	const map = new Map();

	const store = {
		get: (key) => map.get(key),
		has: (key) => map.has(key),
		set: (key, value) => map.set(key, value),
		delete: (key) => map.delete(key),
		find: (flt) => flt ? Array.from(map.values()).filter(flt) : Array.from(map.values()),
		clear: () => map.clear()
	}

	// Add the validating layer
	if (conf && typeof conf.validate === 'function') {
		const set = store.set;
		const validate = conf.validate;
		store.set = (key, value) => {
			validate(value);
			return set(key, value);
		}
	}

	store.create = store.set;

	if (conf && conf.data) { // Add suplied data
		Object.keys(conf.data).forEach(key => {
			store.set(key, conf.data[key]);
		});
	}

	return store;
}

module.exports = { create };

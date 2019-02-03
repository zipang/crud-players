/**
 * Creates a new in-memory data store
 * @param {String} domain
 * @param {Object} conf
 * @return {Store}
 */
module.exports = (domain, conf) => {
	const map = new Map();

	const store = {
		get: (key) => map.get(key),
		has: (key) => map.has(key),
		create: (data) => {
			data.id = (Date.now() + map.size).toString(32);
			map.set(data.id, data);
			return data;
		},
		set: (key, data) => map.set(key, data),
		delete: (key) => map.delete(key),
		find: (flt) => flt ? Array.from(map.values()).filter(flt) : Array.from(map.values()),
		clear: () => map.clear()
	}

	return store;
}

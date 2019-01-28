const faunadb = require("faunadb");
const StorageError = require("../StorageError");

/**
 * Retrieves a new FaunaDB data store for a specific domain
 * @param {String} domain - Usually the collection or view name
 * @param {Object} conf - a specific configuration object
 * @return {Store}
 */
const create = (domain, conf) => {
	// Check the given configuration
	if (!conf || !conf.secret) {
		throw new Error(
			"Missing configuration for faunadb store ! Expected some secret : { faunadb : { secret : app_secret_here } }"
		);
	}

	const client = new faunadb.Client(conf);
	const q = faunadb.query;

	const store = {
		/**
		 * Create the database and indexes
		 */
		init: async () => {
			await client.query(q.CreateClass({ name: domain }));
			await client.query(
				q.CreateIndex({
					name: `all_${domain}`,
					source: q.Class(domain)
				})
			);
			await client.query(
				q.CreateIndex({
					name: `${domain}_by_id`,
					source: q.Class(domain),
					unique: true,
					terms: [
						{
							field: ["data", "id"]
						}
					]
				})
			);
		},
		/**
		 * Append a new element to the store
		 * @param {Object} data
		 */
		add: async data => {
			try {
				const result = await client.query(
					q.Create(q.Class(domain), { data })
				);
				const created = Object.assign({ id: result.ref.id }, data);
				return created;
			} catch (err) {
				throw new StorageError(domain, "create", data, err);
			}
		},
		set: async (key, data) => {
			try {
				return await client.query(
					q.Select("data", q.Replace(q.Ref(`classes/${domain}/${key}`), { data }))
				);
			} catch (err) {
				throw new StorageError(domain, "update", data, err);
			}
		},
		get: async key => {
			try {
				return await client.query(
					q.Select("data", q.Get(q.Ref(`classes/${domain}/${key}`)))
				);
			} catch (err) {
				throw new StorageError(domain, "get", key, err);
			}
		},
		has: async key => {
			try {
				return await client.query(
					q.Exists(q.Ref(`classes/${domain}/${key}`))
				);
			} catch (err) {
				throw new StorageError(domain, "has", key, err);
			}
		},
		delete: async key => {
			try {
				const result = await client.query(
					q.Delete(q.Ref(`classes/${domain}/${key}`))
				);
			} catch (err) {
				throw new StorageError(domain, "delete", key, err);
			}
		},
		find: async flt => {
			const result = await client.query(
				q.Paginate(q.Match(q.Ref(`indexes/all_${domain}`)))
			);
			return result.filter(flt);
		},
		clear: async () => {
			const client = await getClient();
		},
		teardrop: async () => {
			try {
				await client.query(
					q.Delete(q.Ref(`indexes/all_${domain}`))
				);
			} catch (err) { }
			try {
				await client.query(
					q.Delete(q.Ref(`indexes/${domain}_by_id`))
				);
			} catch (err) { }
			try {
				await client.query(
					q.Delete(q.Ref(`classes/${domain}`))
				);
			} catch (err) {}
		}
	};

	if (conf && typeof conf.validate === "function") {
		const set = store.set;
		const validate = conf.validate;
		store.set = (key, data) => {
			validate(data);
			return set(key, data);
		};
	}

	if (conf && conf.data) {
		// Add suplied data
		Object.keys(conf.data).forEach(key => {
			store.set(key, conf.data[key]);
		});
	}

	return store;
};

module.exports = { create };

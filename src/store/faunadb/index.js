const faunadb = require("faunadb");
const StorageError = require("../StorageError");

const FIND_OPTIONS = {
	size: 50,
};

/**
 * Store factory
 * Retrieves a new FaunaDB data store for a specific domain ()
 * @param {String} domain - Usually the collection name, in FaunaDb : the class
 * @param {Object} conf - configuration object to connect to the database
 * @return {Store}
 */
module.exports = (domain, conf) => {

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
					source: q.Class(domain),
				})
			);
			await client.query(
				q.CreateIndex({
					name: `${domain}_by_id`,
					source: q.Class(domain),
					unique: true,
					terms: [
						{
							field: ["data", "id"],
						},
					],
				})
			);
		},
		/**
		 * Append a new element to the store
		 * @param {Object} data
		 * @return {Object} the updated element with the generated `id`
		 */
		create: async (data) => {
			try {
				const result = await client.query(
					q.Create(q.Class(domain), { data })
				);
				return Object.assign(data, { id: result.ref.id });
			} catch (err) {
				throw new StorageError(domain, "create", data, err);
			}
		},
		/**
		 * Update some properties of an existing element in the store
		 * @param {String} key
		 * @param {Object} data
		 * @return {Object} the updated element
		 */
		set: async (key, data) => {
			try {
				const updated = await client.query(
					q.Select(
						"data",
						q.Update(q.Ref(`classes/${domain}/${key}`), { data })
					)
				);
				return Object.assign(updated, { id: key });
			} catch (err) {
				if (err.name === "NotFound") {
					// That's in fact a 404
					return undefined;
				} else {
					throw new StorageError(domain, "update", data, err);
				}
			}
		},
		/**
		 * Retrieve an element from the store
		 * @param {String} key
		 */
		get: async (key) => {
			try {
				const player = await client.query(
					q.Select("data", q.Get(q.Ref(`classes/${domain}/${key}`)))
				);
				// the ref id is not stored inside the data...
				return Object.assign(player, { id: key });
			} catch (err) {
				if (err.name === "NotFound") {
					// That's in fact a 404
					return undefined;
				} else {
					throw new StorageError(domain, "get", key, err);
				}
			}
		},
		/**
		 * Test the existence of an element in the store
		 * @param {String} key
		 */
		has: async (key) => {
			try {
				return await client.query(
					q.Exists(q.Ref(`classes/${domain}/${key}`))
				);
			} catch (err) {
				throw new StorageError(domain, "has", key, err);
			}
		},
		/**
		 * Delete an element from the store
		 * @param {String} key
		 */
		delete: async (key) => {
			try {
				return await client.query(
					q.Delete(q.Ref(`classes/${domain}/${key}`))
				);
			} catch (err) {
				if (err.name === "NotFound") {
					// There was nothing to delete
					return undefined;
				} else {
					throw new StorageError(domain, "delete", key, err);
				}
			}
		},
		/**
		 * Retrieves a list of elements from the store
		 * @param {Function} flt - an optional filter function
		 * @param {Object} opts - More options like
		 *   - {Number} size - the size of pages
		 *   - {Number} page - the number of the page to retrieve
		 *   - {Function} sortBy -
		 *   - {Array} fields - the name of the fields to retrieve
		 * @return {Array}
		 */
		find: async (flt, opts) => {
			try {
				const options = Object.assign({}, FIND_OPTIONS, opts);
				const page = await client.query(
					q.Map(
						q.Paginate(
							q.Match(q.Ref(`indexes/all_${domain}`)),
							options
						),
						(ref) => [
							q.Select("id", ref),
							q.Select("data", q.Get(ref)),
						]
					)
				);
				// Rebuild the full id+data representation
				const data = page.data.map((elt) =>
					Object.assign({ id: elt[0] }, elt[1])
				);
				return typeof flt === "function" ? data.filter(flt) : data;
			} catch (err) {
				throw new StorageError(domain, "find", key, err);
			}
		},
		clear: async () => {
			try {
				await client.query(q.Delete(q.Ref(`indexes/all_${domain}`)));
			} catch (err) {
				throw new StorageError(domain, "clear", key, err);
			}
		},
		teardrop: async () => {
			try {
				await client.query(q.Delete(q.Ref(`indexes/all_${domain}`)));
			} catch (err) {}
			try {
				await client.query(q.Delete(q.Ref(`indexes/${domain}_by_id`)));
			} catch (err) {}
			try {
				await client.query(q.Delete(q.Ref(`classes/${domain}`)));
			} catch (err) {}
		},
	};

	return store;
};

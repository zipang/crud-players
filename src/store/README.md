# Universal Data Store

## Store API

```js
class Store {
	/**
	 * Create the database and indexes
	 */
	async init() {}

	/**
	 * Append a new element to the store
	 * @param {Object} data
	 * @return {Object} the updated element with the generated `id`
	 */
	async add(data) {}

	/**
	 * Replace an existing element in the store
	 * @param {String} key
	 * @param {Object} data
	 * @return {Object} the updated element
	 */
	async set(key, data) {}

	/**
	 * Retrieves an element from the store
	 * @param {String} key
	 * @return {Object} the element if it exists or undefined
	 */
	async get(key) {}

	/**
	 * Test the existence of an element in the store
	 * @param {String} key
	 */
	async has(key) {}

	/**
	 * Delete an element from the store
	 * @param {String} key
	 */
	async delete(key) {}

	/**
	 * Retrieves a list of elements from the store
	 * @param {Function} flt - an optional filter function
	 * @param {Object} options - More options like
	 *   - {Number} size - the size of pages
	 *   - {Number} page - the number of the page to retrieve
	 *   - {Function} sortBy -
	 *   - {Array} fields - the name of the fields to retrieve
	 * @return {Array}
	 */
	async find(flt, options) {}

	async clear() {}

	async teardrop() {}
};
```

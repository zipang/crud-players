# Universal Data Store

There are many, many options regarding the choice of a storage service around there.  
However, while almost all of these services provide at least the same basic functionalities (like the CRUD operations and the ability to find data according to specific criterias), the problem arise when it comes to write the code to call these services !  
The APIs provided by the various libraries encapsulating these services are really diverses in their approach, and accessing a new service usually means learning a new API for the same basic operations.

The intent of this project is to provide a simple abstraction layer and a clean and minimal API to access _any_ data storage service :

```js
// create
await store.add(newData);
// read
data = await store.get(key);
// delete
await store.delete(key);
// update
await store.set(key, updatedData);
// find by criteria, sort and paginate
page = await store.find(elt => elt.valid, { 
  sort: { created: "desc" },
  size: 10, 
  page: 2
});
```


## Store factory

Retrieves a store adapter for a given storage service.

```js
const StoreFactory = {
  /**
   * Retrieves (and create if needed) a datastore for the given domain
   * @param {String} domain - name of the collection/model
   * @param {Object|Array} conf - one or several configuration objects (specific to their storage service)
   */
  get: (domain, conf) {}
}
```

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
   *   - {Number} page - the zero-based index of the page to retrieve
   *   - {Function} sortBy - an optional sort function
   *   - {Array} fields - the name of the fields to retrieve
   * @return {Array}
   */
  async find(flt, options) {}

  /**
   * Clears (empty) a given colletion
   * @param {Function} flt - an optional filter function
   */
  async clear(flt) {}

  /**
   * Drop the database schemas and indexes
   */
  async teardrop() {}
}
```

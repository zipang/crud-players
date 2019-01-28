
module.exports = class StorageError extends Error {

	/**
	 * A storage error when accessing a store
	 * @param  {String} modelName
	 * @param  {Object} data
	 * @param  {String|Array} error[s] (multiple error messages can pe passed)
	 */
	constructor(modelName, action, data, errors) {
		super(`${modelName}'s ${action} action failed.`);
		this.data = data;
		this.statusCode = 500;
		if (Array.isArray(errors)) {
			this.errors = errors;
		} else {
			this.errors = [errors];
		}
	}
}

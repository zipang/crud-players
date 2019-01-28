
module.exports = class StorageError extends Error {

	/**
	 * A storage error when accessing a store's method like create(), init(), ..
	 * @param  {String} modelName
	 * @param  {String} action - the name of the action performed
	 * @param  {Object} data
	 * @param  {String|Array} error[s] (multiple error messages can pe passed)
	 */
	constructor(modelName, action, data, errors) {
		super(`Store ${modelName}'s '${action}' action failed : ${Array.isArray(errors) ? errors : [errors]}`);
		this.data = data;
		this.statusCode = 500;
	}
}

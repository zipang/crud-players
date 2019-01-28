
module.exports = class ValidationError extends TypeError {

	/**
	 * A straightforward validation error on a model
	 * @param  {String} modelName
	 * @param  {Object} data
	 * @param  {String|Array} error[s] (multiple error messages can pe passed)
	 */
	constructor(modelName, data, errors) {
		super(`The data does not conform to ${modelName} schema`);
		this.data = data;
		if (Array.isArray(errors)) {
			this.errors = errors;
		} else {
			this.errors = [errors];
		}
	}
}


module.exports = class ValidationError extends TypeError {

	/**
	 * A straightforward validation error on a model
	 * @param  {String} modelName
	 * @param  {Object} data
	 * @param  {String|Array} error[s] (multiple error messages can pe passed)
	 */
	constructor(modelName, data, errors) {
		super(`${modelName}'s schema validation failed :
  - ` + errors.join("\n  - "));
		this.data = data;
		this.statusCode = 400; // Bad Request
		this.errors = errors;
	}
}

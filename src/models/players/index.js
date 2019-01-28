const schema   = require('./schema.json');
const validate = require('./validate');

/**
 * Players factory
 * @param {Object} data - raw data object
 * @return {Player} a validating model
 * @throws {ValidationError} when input data does not conform to model's schema
 */
const create = (data) => {
	// 1st check that the data is valid
	validate(data);

	// 2. Define a validating proxy for each setter
	const ValidatingProxy = {
		set: (obj, prop, value) => {
			let modified = Object.assign({}, data);
			modified[prop] = value;
			validate(modified);
			// seems ok
			obj[prop] = value;
			return true;
		}
	};

	return new Proxy(data, ValidatingProxy);
}

module.exports = { create, validate, schema };

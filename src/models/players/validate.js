const ValidationError = require('../ValidationError');
const schema = require("./schema.json");

/**
 * Validate some data against the players schema
 * @param {Object} data
 * @throws {ValidationError} when data does not conform to model's schema
 */
const validate = (data) => {
	const errors = [];

	if (typeof data !== 'object' || data === null) {
		throw new ValidationError('players', data, 'players must be an object');
	}
	schema.required.forEach(propertyName => {
		let expectedType = schema.properties[propertyName].type;
		if (expectedType === 'integer') expectedType = 'number'; // integers can't be validated as js numbers are floats
		if (typeof data[propertyName] !== expectedType) {
			errors.push(`${propertyName} must be a ${expectedType} and is ${data[propertyName]}`);
		}
	})
	if (data.birthDate) {
		try {
			let date = new Date(data.birthDate);
		} catch (err) {
			errors.push(`birthDate should be a date in ISO format : YYYY-MM-DD`);
		}
	}
	if (errors.length) {
		throw new ValidationError('players', data, errors);
	}

	return true;
}


module.exports = validate;

const ValidationError = require('../ValidationError');
const schema = require("./schema.json");

const JSON_NUMBERS = {
	integer: true,
	number: true
}

function checkDate(property, val, errors) {
	try {
		new Date(val);
	} catch (err) {
		errors.push(`${property} must be a date (in ISO format) and is ${val}`);
	}
}
function checkNumber(property, val, errors) {
	if (typeof val !== 'number') {
		errors.push(`${property} must be a number and is ${val}`);
	}
}

/**
 * Validate some data against the players schema
 * @param {Object} data
 * @throws {ValidationError} when data does not conform to model's schema
 */
const validate = (data) => {
	const errors = [];

	if (typeof data !== 'object' || data === null) {
		throw new ValidationError('players', data, ['players must be an object']);
	}
	// Check the required properties
	schema.required.forEach(propertyName => {
		let expectedType = schema.properties[propertyName].type;
		if (expectedType === 'integer') expectedType = 'number'; // integers can't be validated as js numbers are floats
		if (typeof data[propertyName] !== expectedType) {
			errors.push(`${propertyName} must be a ${expectedType} and is ${data[propertyName]}`);
		}
	});
	// Check the constraint on remaining properties
	const remaining = Object.keys(schema.properties).filter(
		propertyName => schema.required.indexOf(propertyName) < 0
	);
	remaining.forEach(propertyName => {
		if (data[propertyName] !== undefined) {
			if (schema.properties[propertyName].format === "date") {
				checkDate(propertyName, data[propertyName], errors);
			}
			if (schema.properties[propertyName].type in JSON_NUMBERS) {
				checkNumber(propertyName, data[propertyName], errors);
			}
		}
	});
	if (errors.length) {
		throw new ValidationError('players', data, errors);
	}

	return true;
}


module.exports = validate;

const ValidationError = require('./ValidationError');

const models = {};

const getModel = (domain) => {

	if (!models[domain]) {
		try {
			// instanciate the factory
			models[domain] = require(`./${domain}/`);
		} catch(err) {
			throw new Error(`${domain} model doesn't exist`);
		}
	}
	return models[domain];
}

/**
 * Model factory
 * Usage example :
 *   const { create } = require('./models/');
 *   let newTodo = create('todos', { id: 'lets-do-it', content: 'Let s do It !' });
 * @param  {String} domain - name of
 * @param  {Object} data
 * @returns {Object} instance of domain hydrated with passed data
 * @throws {ValidationError} If the data doesn't conform to the model's schema
 */
const create = (domain, data) => {

	try {
		return getModel(domain).create(data);
	} catch (err) {
		if (err instanceof ValidationError) {
			throw err;
		} else {
			throw new ValidationError(domain, data, err.message);
		}
	}
}

/**
 * Retrieves only the validate method of a domain
 * @param  {String} domain - name of
 * @returns {Function} validate method
 * @throws {DomainError} If the data doesn't conform to the model's schema
 */
const validate = (domain) => {

	return getModel(domain).validate;
}

module.exports = { create, validate };

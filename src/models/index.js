const ValidationError = require('./ValidationError');

const models = {};

/**
 * Models factory
 * Usage example :
 *   const Models = require('./Models/');
 *   let newTodo = Models.create('todos', { id: 'lets-do-it', content: 'Let s do It !' });
 * @param  {String} modelName
 * @param  {Object} data
 * @returns {Object} instance of modelName hydrated with passed data
 * @throws {ValidationError} If the data doesn't conform to the model's schema
 */
const create = (modelName, data) => {

	if (!models[modelName]) {
		// instanciate the factory
		models[modelName] = require(`./${modelName}/`).create;
	}

	try {
		let newInstance = models[modelName](data);
		return newInstance;
	} catch (err) {
		if (err instanceof ValidationError) {
			throw err;
		} else {
			throw new ValidationError(modelName, data, err.message);
		}
	}
}

module.exports = { create };

const schema = require("./schema.json");
const validate = require("./validate");
const ValidationError = require("../ValidationError");
const { expect } = require("code");

describe("Data validation", function() {
	it(`Data in the examples section
	of the JSON schema should validate`, () => {
		const examples = schema.examples;
		examples.forEach(data => {
			expect(validate(data)).to.be.true();
		});
		// expect.assertions(examples.length);
	});

	it(`An empty, null or undefined object should not validate`, function() {
		const examples = [null, undefined, {}];
		examples.forEach(data => {
			expect(() => validate(data)).to.throw(ValidationError);
		});
		// expect.assertions(examples.length);
	});

	it(`Objects with missing properties should not validate`, function() {
		const required = {};
		required[schema.required[0]] = null;
		const examples = schema.examples.map(data =>
			Object.assign({}, data, required)
		);
		examples.forEach(data => {
			expect(() => validate(data)).to.throw(ValidationError);
		});
		// expect.assertions(examples.length);
	});
});

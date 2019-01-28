const { create, schema } = require('./index');
const ValidationError = require('../ValidationError');
const { expect } = require("code");

describe("Model validation", function() {

	it(`A new Player object should be created with valid data`, function() {
		const examples = schema.examples;
		examples.forEach(data => {
			expect(create(data)).to.equal(data);
		});
		//expect.assertions(examples.length);
	});

	it(`A Player object can only be modified with valid data`, function() {

		const Player = create(schema.examples[0]);

		// Changing for another value of the same type is allowed
		Player.lastName = 'X';
		expect(Player.lastName).to.equal('X');

		expect(() => { Player.firstName = 42 }).to.throw(ValidationError);

	});
})


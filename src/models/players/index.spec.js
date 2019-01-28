const { create, schema } = require('./index');
const ValidationError = require('../ValidationError');
const { expect } = require("code");

describe("Model validation", function() {

	it(`A new Player validating proxy should be return by the factory on the sample data`, function() {
		const examples = schema.examples;
		examples.forEach(data => {
			expect(create(data)).to.equal(data);
		});
		//expect.assertions(examples.length);
	});

	describe(`An object returned by the factory can only be modified with valid data`, function() {

		const Player = create(schema.examples[0]);

		it("Setting a property to another value of the same type is allowed", function() {
			Player.lastName = 'X';
			expect(Player.lastName).to.equal('X');
		});

		it ("Setting a wrong data-type on a property will automatically throw", function() {
			expect(() => { Player.firstName = 42 }).to.throw(ValidationError);
		});

	});
})


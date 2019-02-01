const micro = require("micro");
const listen = require("test-listen");
const createService = require("./create");
const fetch = require("node-fetch");
const { expect } = require("code");

describe("CREATE API entry point", function() {

	const service = micro(createService);

	it("Respond with a newly created object with an id on POST requests", async function() {

		const testUrl = await listen(service);

		const resp = await fetch(testUrl, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstName: "John",
			}),
		});

		console.dir(resp.body);

		expect(resp.body).to.contain(["id", "firstName"]);
	});
});

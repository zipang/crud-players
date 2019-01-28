const micro = require("micro");
const listen = require("test-listen");
const createService = require("./create");
const fetch = require("node-fetch");

describe("CREATE API entry point", async function() {
	const service = micro(createService);
	const testUrl = await listen(service);

	it("Respond to POST requests", async function() {
		const resp = await fetch(testUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: {
				firstName: "John"
			}
		});

	});
});

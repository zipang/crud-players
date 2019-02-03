const micro = require("micro");
const listen = require("test-listen");
const createService = require("./create");
const fetch = require("node-fetch");
const { expect } = require("code");

describe("CREATE API entry point", async function() {

	let service = micro(createService);
	let testUrl;

	before(async function() {
		testUrl = await listen(service);
	});
	after(async function() {
		service.close();
	});

	it("Respond with new newly created object", async function() {

		const resp = await fetch(testUrl, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstName: "John",
				lastName: "DOE",
				birthDate: "1970-01-01",
				number: 8,
				team: "St Louis",
			}),
		});

		const body = await resp.json();

		expect(body).to.contain(["id", "firstName", "lastName", "birthDate", "number", "team"]);
		expect(resp.status).to.equal(201);
		return;
	});

	it("Respond with an error if the posted object fails the validation rules", async function() {

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

		const body = await resp.json();

		expect(body).to.contain(["error", "message", "data"]);
		expect(resp.status).to.equal(400);
	});
});

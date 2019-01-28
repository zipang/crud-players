const storeFactory = require("./index");
const { expect } = require("code");

// Test Data
const data = {
	johnDoe: { firstName: "John", lastName: "DOE", gender: "M" },
	janeDoe: { firstName: "Jane", lastName: "DOE", gender: "F" },
	hank: { firstName: "Hank" },
	dumb: { firstName: "J.", lastName: "C." },
}

describe("FAUNADB STORE", function() {

	// We need a unique domain name, because cleaning
	// after tests needs 1mn to propagate in the cluster
	// so, relaunching the tests to soon would throw an error..
	const domainName = "test-domain-" + Date.now();

	const store = storeFactory.create(domainName, {
		secret: process.env.FAUNADB_TEST_SECRET
	});

	before(async function initSchema() {
		console.log("Initializing Test schema..");
		try {
			await store.init();
		} catch (err) {
			console.error(err);
		}
	});

	after(async function() {
		console.log("Dropping Test schema..");
		await store.teardrop();
	})


	it("Add some data and returns an id", async function() {
		const created = await store.add(data.johnDoe);
		expect(created).to.include(data.johnDoe);
		expect(created).to.include("id");
		return;
	});

	it("Create, update and read back some data", async function() {
		const Hank  = await store.add(data.hank);
		Hank.profession = "Writer";
		const updated = await store.set(Hank.id, Hank);
		//const updated = await store.get(Hank.id);
		expect(updated.profession).to.equal("Writer");
		return;
	});

	it("Can update an existing data", async function() {
		const created  = await store.add(data.janeDoe);
		const readback = await store.get(created.id);
		expect(readback).to.equal(data.janeDoe);
		return;
	});

	it("Can delete and test existence of data", async function() {
		const dumb  = await store.add(data.dumb);
		await store.delete(dumb.id);
		//const updated = await store.get(Hank.id);
		const exist = await store.has(dumb.id);
		expect(exist).to.be.false();
		return;
	});

});

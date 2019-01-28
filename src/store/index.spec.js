const Store = require("./index");
const StorageError = require("./StorageError");
const { expect } = require("code");

const someData = {
	notFound: { code: "404", text: "Not Found" },
	serverError: { code: "500", text: "Server Error" }
};

describe("Universal Data Store", function() {

	it("A data store has an universal API", function() {
		const store = Store.get("todos");
		expect(store).to.contain([
			"get",
			"set",
			"has",
			"delete",
			"find",
			"clear"
		]);
	});

	it("Retrieve a store with some pre-initialized data", async function() {
		const store = Store.get("tests", { data: someData });
		const dataKeys = Object.keys(someData);
		dataKeys.forEach(async key => {
			const retrieved = await store.get(key);
			expect(retrieved).to.equal(someData[key]);
		});
	});

	it("Trying to access an unknow adapter will throw a nice message", async function() {
		const initStore = () => Store.get("tests", { db: "future-db" });

		expect(initStore).to.throw(StorageError);

		try {
			initStore();
		} catch (err) {
			const msg = err.message;
			console.log(msg);
			expect(msg).to.contain(["tests", "load", "future-db"]);
		}
	});

})


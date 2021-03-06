const createStore = require("./index");
const StorageError = require("./StorageError");
const { expect } = require("code");

const someData = {
	john: { firstName: "John", lastName: "DOE" },
	jane: { firstName: "Jane", lastName: "DOE" },
	herb: { firstName: "Herbert", lastName: "WEST" }
};

describe("Universal Data Store", function() {
	const storeAPI = ["create", "get", "set", "has", "delete", "find", "clear"];

	it(`A data store has an universal API (${storeAPI})`, function() {
		const store = createStore("todos");
		expect(store).to.contain(storeAPI);
		storeAPI.forEach(apiMethod => {
			expect(typeof store[apiMethod]).to.equal("function");
		});
	});

	it("Can retrieve a store with some pre-initialized data", async function() {
		const store = createStore("tests", { data: someData });
		const dataKeys = Object.keys(someData);
		dataKeys.forEach(async key => {
			const retrieved = await store.get(key);
			expect(retrieved).to.equal(someData[key]);
		});
	});

	it("Trying to access an unknow adapter will throw a nice message", async function() {
		const initStore = () =>
			createStore("tests", { db: "future-db" });

		expect(initStore).to.throw(StorageError);

		try {
			initStore();
		} catch (err) {
			const msg = err.message;
			console.log(msg);
			expect(msg).to.contain(["tests", "load", "future-db"]);
		}
	});
});

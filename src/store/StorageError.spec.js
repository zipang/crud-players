const StorageError = require("./StorageError");

describe("A Storage error", function() {
	it ("Should display a nicely formatted error message and stack trace", function() {
		try {
			throw new StorageError("Person", "save", { name: "john" }, "Just kidding");
		} catch (err) {
			console.dir(err);
		}
	})
})

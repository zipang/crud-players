const Store = require('./index');

const someData = {
	'notFound': { code: '404', text: 'Not Found' },
	'serverError': { code: '500', text: 'Server Error' }
}

describe('When no option given, retrieve an in memory data store', async (expect) => {
	const store = await Store.get('todos');
	expect.assertions(2);
	expect(store).toBeDefined();
	expect(store).toHaveMethods(['get', 'set', 'has', 'delete', 'find', 'clear']);
});

describe('Retrieve an in memory store with some pre-initialized data', async (expect) => {
	const store = await Store.get('todos', { data: someData });
	const dataKeys = Object.keys(someData);
	expect.assertions(dataKeys.length);
	dataKeys.forEach(async (key) => {
		expect(await store.get(key)).toEqual(someData[key]);
	});
});

describe('Can set and retrieve some data in the store', async (expect) => {
	const store = await Store.get('todos');

	await store.set('1', 1);
	await store.set('2', 2);

	expect.assertions(2);
	expect(await store.get('1')).toBe(1);
	expect(await store.get('2')).toBe(2);
});

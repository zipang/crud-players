require('now-env'); // Load the environment vaérs and secrets from now.json
const { send } = require("micro");
/**
 * Route everything to the correct API endpoint
 * Launch it with `yarn dev:api`
 */
module.exports = (req, resp) => {

	const path = require('url').parse(req.url).pathname.split("/");

	path.shift(); // the firsty path element is empty
	const api = path.shift();
	if (api !== "api") {
		throw new Error("To call the local api, start your path with /api/domain/*")
	}
	const domain = path.shift();
	const param  = path.shift();
	const method = req.method;

	// implementing a very simple CRUD router
	switch (method) {
		case "GET":
			if (param) {
				return require(`./${domain}/read`)(req, resp);
			} else {
				return require(`./${domain}/find`)(req, resp);
			}

		case "POST":
			return require(`./${domain}/create`)(req, resp);

		case "PUT":
			return require(`./${domain}/update`)(req, resp);

		case "DELETE":
			return require(`./${domain}/delete`)(req, resp);

		default:
			send(resp, 404, `Path not found : ${method} ${req.url}`)
			break;
	}

}
